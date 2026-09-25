import { describe, it, expect, beforeEach, vi } from "vitest";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { invalidateDashboardCache, invalidateAnalyticsCache } from "@/infrastructure/cache/dashboardCache";
import { getLocalDateString } from "@/shared/utils/dateUtils";

// Hoist mocks
const { mockPrisma, mockAuth } = vi.hoisted(() => ({
  mockPrisma: {
    profile: {
      findUnique: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
    dailySkillPractice: {
      upsert: vi.fn(),
    },
    $queryRaw: vi.fn(),
  },
  mockAuth: {
    userId: null as string | null,
  },
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  safeDbExecute: async <T>(fn: () => Promise<T>) => await fn(),
  handlePrismaError: (e: any) => ({ error: e.message, status: 500 }),
}));

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: async () => mockAuth.userId,
}));

// Route Handlers
import { GET as getAnalytics } from "@/app/api/user/analytics/route";
import { POST as postActivityAward } from "@/app/api/user/activity-award/route";

describe("Analytics & Experience Points Performance Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern(".*");
    mockAuth.userId = null;
  });

  describe("1. Cache Invalidation Engine for Analytics & Dashboard", () => {
    it("should invalidate both dashboard and analytics caches when invalidateDashboardCache is called", () => {
      const userId = "learner_007";
      const todayStr = getLocalDateString(new Date());

      const dashKey = `dashboard_overview:${userId}:${todayStr}`;
      const analyticsKey = `analytics:${userId}:${todayStr}`;
      const otherKey = `dashboard_overview:other_user:${todayStr}`;

      memoryCache.set(dashKey, { test: "dash" }, 60);
      memoryCache.set(analyticsKey, { test: "analytics" }, 60);
      memoryCache.set(otherKey, { test: "keep" }, 60);

      expect(memoryCache.has(dashKey)).toBe(true);
      expect(memoryCache.has(analyticsKey)).toBe(true);
      expect(memoryCache.has(otherKey)).toBe(true);

      invalidateDashboardCache(userId);

      expect(memoryCache.has(dashKey)).toBe(false);
      expect(memoryCache.has(analyticsKey)).toBe(false);
      expect(memoryCache.has(otherKey)).toBe(true);
    });

    it("should allow independent invalidation of analytics cache via invalidateAnalyticsCache", () => {
      const userId = "learner_008";
      const todayStr = getLocalDateString(new Date());

      const dashKey = `dashboard_overview:${userId}:${todayStr}`;
      const analyticsKey = `analytics:${userId}:${todayStr}`;

      memoryCache.set(dashKey, { test: "dash" }, 60);
      memoryCache.set(analyticsKey, { test: "analytics" }, 60);

      invalidateAnalyticsCache(userId);

      expect(memoryCache.has(analyticsKey)).toBe(false);
      expect(memoryCache.has(dashKey)).toBe(true);
    });
  });

  describe("2. Single Root Query for Analytics (GET /api/user/analytics)", () => {
    it("should execute exactly 1 single root query on Profile with selective projections", async () => {
      const userId = "analytics_user_1";
      mockAuth.userId = userId;

      const today = new Date();
      const todayStr = getLocalDateString(today);

      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        totalXp: 1500,
        minutesStudied: 220,
        currentStreak: 10,
        longestStreak: 15,
        dailySkillPractices: [
          { skill: "dictation", date: todayStr, minutes: 20, xpEarned: 50 },
          { skill: "shadowing", date: todayStr, minutes: 15, xpEarned: 35 },
        ],
        examAttempts: [
          { startedAt: today, totalScore: 85 },
        ],
        listeningProgresses: [
          { lastPracticedAt: today, timeSpent: 300 },
        ],
        _count: {
          vocabularies: 120,
        },
      });

      // Mock scalar raw query returning exactly 2 users ahead in weekly ranking
      mockPrisma.$queryRaw.mockResolvedValueOnce([{ count: 2 }]);

      const res = await getAnalytics();
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(res.headers.get("X-Cache")).toBe("MISS");

      // Verify Single Root Query: exactly 1 database call to profile.findUnique
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);
      const queryArgs = mockPrisma.profile.findUnique.mock.calls[0][0];
      expect(queryArgs.where).toEqual({ id: userId });
      expect(queryArgs.select.dailySkillPractices).toBeDefined();
      expect(queryArgs.select.examAttempts).toBeDefined();
      expect(queryArgs.select.listeningProgresses).toBeDefined();
      expect(queryArgs.select._count).toBeDefined();

      // Verify raw scalar COUNT query was used instead of full-table groupBy
      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);

      // Verify payload shapes
      expect(json.data.stats.weeklyRank).toBe("#3");
      expect(json.data.stats.totalXp).toBe(1500);
      expect(json.data.stats.wordsLearned).toBe(120);
      expect(json.data.stats.minutesStudied).toBe(220);
      expect(json.data.stats.currentStreak).toBe(10);
      expect(json.data.stats.longestStreak).toBe(15);
      expect(json.data.series.minutesSeries).toBeDefined();
      expect(json.data.series.xpSeries).toBeDefined();
      expect(json.data.perSkill.dictation).toBeDefined();
      expect(json.data.heatmap.weeks).toHaveLength(24);
    });

    it("should return cached response with X-Cache HIT on subsequent calls without querying DB", async () => {
      const userId = "analytics_cache_user";
      mockAuth.userId = userId;

      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        totalXp: 500,
        minutesStudied: 80,
        currentStreak: 3,
        longestStreak: 5,
        dailySkillPractices: [],
        examAttempts: [],
        listeningProgresses: [],
        _count: { vocabularies: 25 },
      });
      mockPrisma.profile.count.mockResolvedValueOnce(0);

      const res1 = await getAnalytics();
      expect(res1.headers.get("X-Cache")).toBe("MISS");
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);

      // Subsequent call should HIT in-memory cache
      const res2 = await getAnalytics();
      expect(res2.headers.get("X-Cache")).toBe("HIT");
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("3. Activity Award Engine (POST /api/user/activity-award)", () => {
    it("should atomically update XP, Coins and bust RAM cache", async () => {
      const userId = "learner_award_test";
      mockAuth.userId = userId;

      const todayStr = getLocalDateString(new Date());
      const cacheKey = `analytics:${userId}:${todayStr}`;
      memoryCache.set(cacheKey, { cached: "old_analytics" }, 60);
      expect(memoryCache.has(cacheKey)).toBe(true);

      mockPrisma.profile.update.mockResolvedValueOnce({
        id: userId,
        totalXp: 750, // Level 5 (threshold is 700)
        level: 4,
        title: "Explorer",
        coins: 200,
        minutesStudied: 90,
        currentStreak: 5,
        longestStreak: 8,
      });

      // Second update for level-up
      mockPrisma.profile.update.mockResolvedValueOnce({
        id: userId,
        level: 5,
        title: "Achiever",
        coins: 700,
      });

      mockPrisma.dailySkillPractice.upsert.mockResolvedValueOnce({
        userId,
        skill: "dictation",
        date: todayStr,
        minutes: 15,
        xpEarned: 50,
      });

      const req = new Request("http://localhost:3000/api/user/activity-award", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xp: 50, coins: 20, minutes: 15, skill: "dictation" }),
      });

      const res = await postActivityAward(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.levelUp).toBe(true);
      expect(json.data.level).toBe(5);

      // Verify that RAM cache for analytics and dashboard was automatically invalidated
      expect(memoryCache.has(cacheKey)).toBe(false);
    });
  });
});
