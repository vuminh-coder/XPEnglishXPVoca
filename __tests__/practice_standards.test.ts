import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// Hoist mocks
const { mockPrisma, mockAuth, mockCache } = vi.hoisted(() => ({
  mockPrisma: {
    vocabulary: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    userVocabulary: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    profile: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    dailySkillPractice: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn(),
  },
  mockAuth: {
    userId: null as string | null,
  },
  mockCache: {
    invalidateDashboardCache: vi.fn(),
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

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: mockCache.invalidateDashboardCache,
}));

// Route Handlers
import { GET as getVocabulary } from "@/app/api/vocabulary/route";
import { POST as postSkillPractice } from "@/app/api/user/skill-practice/route";
import { POST as postReviewSubmit } from "@/app/api/user/vocab/review-submit/route";

describe("Vocabulary Practice Standards & Performance Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.userId = null;
  });

  describe("1. Vocabulary Retrieval API (GET /api/vocabulary)", () => {
    it("should return formatted vocabularies with 25 items limit and random sampling", async () => {
      const req = new NextRequest("http://localhost:3000/api/vocabulary?limit=25&random=true");
      const res = await getVocabulary(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);
      expect(json.data.length).toBeLessThanOrEqual(25);
      expect(json.data[0]).toHaveProperty("word");
      expect(json.data[0]).toHaveProperty("definitionVn");
    });

    it("should filter vocabularies by themeId", async () => {
      const req = new NextRequest("http://localhost:3000/api/vocabulary?themeId=t_basic_greetings");
      const res = await getVocabulary(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);
      expect(json.data.length).toBeGreaterThan(0);
      json.data.forEach((v: any) => {
        expect(v.themeId).toBe("t_basic_greetings");
      });
    });
  });

  describe("2. Skill Practice Sync & Cache Invalidation (POST /api/user/skill-practice)", () => {
    it("should record practice minutes and XP and invalidate dashboard cache atomically", async () => {
      const userId = "practice_user_999";
      mockAuth.userId = userId;

      mockPrisma.$transaction.mockImplementationOnce(async (txFn: any) => {
        return await txFn({
          dailySkillPractice: mockPrisma.dailySkillPractice,
          profile: mockPrisma.profile,
        });
      });

      mockPrisma.dailySkillPractice.upsert.mockResolvedValueOnce({
        id: 1,
        userId,
        skill: "vocab",
        minutes: 15,
        xpEarned: 120,
      });

      mockPrisma.profile.update.mockResolvedValueOnce({
        id: userId,
        minutesStudied: 150,
        totalXp: 850,
        currentStreak: 5,
      });

      const req = new NextRequest("http://localhost:3000/api/user/skill-practice", {
        method: "POST",
        body: JSON.stringify({
          skill: "vocab",
          minutes: 15,
          xp: 120,
        }),
      });

      const res = await postSkillPractice(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
      expect(mockCache.invalidateDashboardCache).toHaveBeenCalledWith(userId);
    });

    it("should reject practice recording for dates other than today", async () => {
      mockAuth.userId = "practice_user_999";

      const req = new NextRequest("http://localhost:3000/api/user/skill-practice", {
        method: "POST",
        body: JSON.stringify({
          skill: "vocab",
          minutes: 10,
          xp: 50,
          date: "2020-01-01",
        }),
      });

      const res = await postSkillPractice(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.success).toBe(false);
    });
  });

  describe("3. SM2 Spaced Repetition Review (POST /api/user/vocab/review-submit)", () => {
    it("should calculate SM2 spaced repetition and update userVocabulary with selective query", async () => {
      const userId = "srs_user_123";
      mockAuth.userId = userId;

      mockPrisma.profile.findUnique.mockResolvedValueOnce({ id: userId });
      mockPrisma.vocabulary.findUnique.mockResolvedValueOnce({ id: "v_abandon" });
      mockPrisma.userVocabulary.findUnique.mockResolvedValueOnce({
        interval: 1,
        easeFactor: 2.5,
        repetitions: 1,
        proficiency: 40,
      });

      mockPrisma.userVocabulary.upsert.mockResolvedValueOnce({
        userId,
        vocabId: "v_abandon",
        proficiency: 80,
        interval: 6,
        easeFactor: 2.6,
        repetitions: 2,
        lastPracticed: new Date(),
        nextReview: new Date(Date.now() + 6 * 86400000),
      });

      const req = new NextRequest("http://localhost:3000/api/user/vocab/review-submit", {
        method: "POST",
        body: JSON.stringify({
          vocabId: "v_abandon",
          quality: 4, // "Good"
        }),
      });

      const res = await postReviewSubmit(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.proficiency).toBe(80);
      expect(mockCache.invalidateDashboardCache).toHaveBeenCalledWith(userId);

      // Verify selective query was used
      expect(mockPrisma.userVocabulary.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            interval: true,
            easeFactor: true,
            repetitions: true,
            proficiency: true,
          }),
        })
      );
    });
  });
});
