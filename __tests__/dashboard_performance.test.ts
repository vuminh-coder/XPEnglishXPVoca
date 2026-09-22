import { describe, it, expect, beforeEach, vi } from "vitest";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { getLocalDateString } from "@/shared/utils/dateUtils";

// Hoist mock objects for Vitest
const { mockPrisma, mockAuth } = vi.hoisted(() => ({
  mockPrisma: {
    profile: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    dailySkillPractice: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    $transaction: vi.fn(),
  },
  mockAuth: {
    userId: null as string | null,
  },
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  safeDbExecute: async <T>(fn: () => Promise<T>) => await fn(),
}));

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: async () => mockAuth.userId,
}));

// Import route handlers after mocks
import { GET as getDashboardOverview } from "@/app/api/dashboard/overview/route";
import { GET as getDailyCheckin, POST as postDailyCheckin } from "@/app/api/user/daily-checkin/route";

describe("Stage 2: Dashboard Performance & Single Root Query Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern(".*");
    mockAuth.userId = null;
  });

  describe("1. Memory Cache Invalidation Engine (infrastructure/cache/dashboardCache.ts)", () => {
    it("should invalidate user dashboard cache by exact key and pattern", () => {
      const userId = "user_perf_123";
      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, "0");
      const d = String(today.getDate()).padStart(2, "0");
      const todayStr = `${y}-${m}-${d}`;

      const key1 = `dashboard_overview:${userId}:${todayStr}`;
      const key2 = `dashboard_overview:${userId}:2026-01-01`;
      const otherKey = `dashboard_overview:other_user:${todayStr}`;

      memoryCache.set(key1, { data: "cached_data_1" }, 60);
      memoryCache.set(key2, { data: "cached_data_2" }, 60);
      memoryCache.set(otherKey, { data: "cached_data_other" }, 60);

      expect(memoryCache.has(key1)).toBe(true);
      expect(memoryCache.has(key2)).toBe(true);
      expect(memoryCache.has(otherKey)).toBe(true);

      invalidateDashboardCache(userId);

      expect(memoryCache.has(key1)).toBe(false);
      expect(memoryCache.has(key2)).toBe(false);
      expect(memoryCache.has(otherKey)).toBe(true);
    });

    it("should gracefully ignore guest or empty user IDs without error", () => {
      expect(() => invalidateDashboardCache("")).not.toThrow();
      expect(() => invalidateDashboardCache("guest_user")).not.toThrow();
      expect(() => invalidateDashboardCache("local_user")).not.toThrow();
    });
  });

  describe("2. Single Root Query for Dashboard Overview (app/api/dashboard/overview/route.ts)", () => {
    it("should return immediate fallback structure for guest users without database roundtrips", async () => {
      mockAuth.userId = "guest_user";
      const req = new Request("http://localhost:3000/api/dashboard/overview");
      const res = await getDashboardOverview(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.checkin).toBeDefined();
      expect(json.data.checkin.isCheckedInToday).toBe(false);
      expect(json.data.challenges).toHaveLength(5);
      expect(json.data.studyPlan).toBeDefined();
      expect(json.data.skillPractice.skills.dictation).toBeDefined();
      expect(mockPrisma.profile.findUnique).not.toHaveBeenCalled();
    });

    it("should execute exactly 1 single root query on Profile for authenticated users", async () => {
      const userId = "user_root_query_1";
      mockAuth.userId = userId;

      const today = new Date();
      const todayStr = getLocalDateString(today);

      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        id: userId,
        currentStreak: 5,
        longestStreak: 12,
        totalXp: 850,
        coins: 140,
        minutesStudied: 120,
        updatedAt: today,
        dailySkillPractices: [
          { date: todayStr, skill: "checkin", minutes: 5, xpEarned: 15 },
          { date: todayStr, skill: "speaking", minutes: 10, xpEarned: 30 },
          { date: todayStr, skill: "dictation", minutes: 15, xpEarned: 40 },
          { date: todayStr, skill: "challenge_claim_speak_practice", minutes: 0, xpEarned: 25 },
        ],
        examAttempts: [
          { startedAt: today },
        ],
        listeningProgresses: [
          { lastPracticedAt: today, timeSpent: 600 },
        ],
        vocabularies: [
          { lastPracticed: today },
        ],
        studyPlan: {
          dailyTasks: [
            { date: today, description: "Học 10 từ vựng Chủ đề Công nghệ" },
          ],
        },
        _count: {
          vocabularies: 45,
          matchHistories: 2,
        },
      });

      const req = new Request("http://localhost:3000/api/dashboard/overview");
      const res = await getDashboardOverview(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(res.headers.get("X-Cache")).toBe("MISS");

      // Verify Single Root Query: exactly 1 database call
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);
      const queryArgs = mockPrisma.profile.findUnique.mock.calls[0][0];
      expect(queryArgs.where).toEqual({ id: userId });
      expect(queryArgs.select.dailySkillPractices).toBeDefined();
      expect(queryArgs.select.examAttempts).toBeDefined();
      expect(queryArgs.select.listeningProgresses).toBeDefined();
      expect(queryArgs.select.vocabularies).toBeDefined();
      expect(queryArgs.select.studyPlan).toBeDefined();
      expect(queryArgs.select._count).toBeDefined();

      // Checkin metrics verification
      expect(json.data.checkin.isCheckedInToday).toBe(true);
      expect(json.data.checkin.currentStreak).toBe(5);
      expect(json.data.checkin.longestStreak).toBe(12);
      expect(json.data.checkin.totalXp).toBe(850);
      expect(json.data.checkin.coins).toBe(140);
      expect(json.data.checkin.wordsLearned).toBe(45);

      // Challenge completion & claim verification
      const speakChallenge = json.data.challenges.find((c: any) => c.id === "speak_practice");
      expect(speakChallenge.progress).toBe(10);
      expect(speakChallenge.isCompleted).toBe(true);
      expect(speakChallenge.isClaimed).toBe(true);

      const pvpChallenge = json.data.challenges.find((c: any) => c.id === "win_pvp");
      expect(pvpChallenge.progress).toBe(2);
      expect(pvpChallenge.isCompleted).toBe(true);

      // Study Plan task verification
      expect(json.data.studyPlan.todayTask).toBe("Học 10 từ vựng Chủ đề Công nghệ");

      // Skill practice chart verification
      expect(json.data.skillPractice.skills.dictation[todayStr]).toBeGreaterThanOrEqual(10);
    });

    it("should return cached response with X-Cache HIT on subsequent requests within TTL", async () => {
      const userId = "user_cache_test";
      mockAuth.userId = userId;

      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        id: userId,
        currentStreak: 3,
        longestStreak: 5,
        totalXp: 300,
        coins: 50,
        minutesStudied: 40,
        dailySkillPractices: [],
        examAttempts: [],
        listeningProgresses: [],
        vocabularies: [],
        studyPlan: null,
        _count: { vocabularies: 10, matchHistories: 0 },
      });

      const req1 = new Request("http://localhost:3000/api/dashboard/overview");
      const res1 = await getDashboardOverview(req1);
      expect(res1.headers.get("X-Cache")).toBe("MISS");
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);

      // Second request immediately after
      const req2 = new Request("http://localhost:3000/api/dashboard/overview");
      const res2 = await getDashboardOverview(req2);
      expect(res2.headers.get("X-Cache")).toBe("HIT");
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1); // No second DB call!
    });
  });

  describe("3. Single Root Query for Daily Checkin (app/api/user/daily-checkin/route.ts)", () => {
    it("should execute exactly 1 single root query on Profile for GET daily-checkin", async () => {
      const userId = "user_checkin_perf";
      mockAuth.userId = userId;

      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, "0");
      const d = String(today.getDate()).padStart(2, "0");
      const todayStr = `${y}-${m}-${d}`;

      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        id: userId,
        currentStreak: 7,
        longestStreak: 14,
        totalXp: 1200,
        coins: 250,
        minutesStudied: 180,
        dailySkillPractices: [
          { date: todayStr, skill: "checkin" },
        ],
        examAttempts: [],
        listeningProgresses: [],
        vocabularies: [],
        _count: {
          vocabularies: 60,
        },
      });

      const req = new Request("http://localhost:3000/api/user/daily-checkin");
      const res = await getDailyCheckin(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledTimes(1);

      expect(json.data.isCheckedInToday).toBe(true);
      expect(json.data.currentStreak).toBe(7);
      expect(json.data.longestStreak).toBe(14);
      expect(json.data.totalXp).toBe(1200);
      expect(json.data.coins).toBe(250);
      expect(json.data.wordsLearned).toBe(60);
    });

    it("should invalidate dashboard overview cache upon successful check-in POST", async () => {
      const userId = "user_checkin_mutation";
      mockAuth.userId = userId;

      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, "0");
      const d = String(today.getDate()).padStart(2, "0");
      const todayStr = `${y}-${m}-${d}`;

      const cacheKey = `dashboard_overview:${userId}:${todayStr}`;
      memoryCache.set(cacheKey, { dummy: "stale_overview" }, 60);
      expect(memoryCache.has(cacheKey)).toBe(true);

      mockPrisma.$transaction.mockImplementationOnce(async (callback: any) => {
        const tx = {
          dailySkillPractice: {
            findUnique: vi.fn().mockResolvedValue(null),
            findFirst: vi.fn().mockResolvedValue(null),
            create: vi.fn().mockResolvedValue({ id: "dsp_new" }),
          },
          profile: {
            findUnique: vi.fn().mockResolvedValue({
              id: userId,
              currentStreak: 1,
              longestStreak: 1,
              totalXp: 100,
              coins: 50,
              minutesStudied: 10,
            }),
            update: vi.fn().mockResolvedValue({
              id: userId,
              currentStreak: 2,
              longestStreak: 2,
              totalXp: 115,
              coins: 70,
              minutesStudied: 15,
            }),
          },
        };
        return await callback(tx);
      });

      const req = new Request("http://localhost:3000/api/user/daily-checkin", {
        method: "POST",
      });
      const res = await postDailyCheckin(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.xpAwarded).toBe(15);
      expect(json.data.coinsAwarded).toBe(20);

      // Verify that dashboard cache was actively purged
      expect(memoryCache.has(cacheKey)).toBe(false);
    });
  });
});
