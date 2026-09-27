import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "@/app/api/pvp/match-submit/route";
import { DEFAULT_FALLBACK_QUESTIONS, getDifficultySettings } from "@/features/pvp/data/pvpData";
import { prisma } from "@/infrastructure/database/prisma";
import * as authModule from "@/infrastructure/auth/auth";
import * as cacheModule from "@/infrastructure/cache/dashboardCache";

describe("PvP Battle Database Performance & UI/UX Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);
  });

  describe("1. Question Bank Integrity & Difficulty Scaling", () => {
    it("provides at least 15 curated questions to support hard mode without underruns", () => {
      expect(DEFAULT_FALLBACK_QUESTIONS.length).toBeGreaterThanOrEqual(15);
    });

    it("verifies all difficulty levels have sufficient question counts", () => {
      const easySettings = getDifficultySettings("easy");
      const mediumSettings = getDifficultySettings("medium");
      const hardSettings = getDifficultySettings("hard");

      expect(easySettings.totalQuestions).toBe(5);
      expect(mediumSettings.totalQuestions).toBe(10);
      expect(hardSettings.totalQuestions).toBe(15);

      expect(DEFAULT_FALLBACK_QUESTIONS.length).toBeGreaterThanOrEqual(hardSettings.totalQuestions);
    });

    it("verifies every question has valid structure, word, IPA, and exactly one correct option", () => {
      DEFAULT_FALLBACK_QUESTIONS.forEach((pkg) => {
        expect(pkg.question.word).toBeTruthy();
        expect(pkg.question.meaning).toBeTruthy();
        expect(pkg.question.ipa).toBeTruthy();
        expect(pkg.options.length).toBe(4);

        const correctOptions = pkg.options.filter((opt) => opt.isCorrect);
        expect(correctOptions.length).toBe(1);
      });
    });
  });

  describe("2. Server-Authoritative POST /api/pvp/match-submit", () => {
    it("rejects missing required match fields with status 400", async () => {
      const req = new Request("http://localhost/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const res = await POST(req);
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toContain("Missing required match fields");
    });

    it("rejects invalid match result with status 400", async () => {
      const req = new Request("http://localhost/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: "TestBot",
          userScore: 5,
          oppScore: 2,
          result: "INVALID_RESULT",
        }),
      });

      const res = await POST(req);
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toContain("Invalid match result");
    });

    it("handles guest users safely without writing to database", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);

      const req = new Request("http://localhost/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: "TestBot",
          userScore: 5,
          oppScore: 2,
          result: "WIN",
        }),
      });

      const res = await POST(req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(true);
      expect(json.data.xpGained).toBeGreaterThan(0);
    });

    it("executes atomic transaction with selective projection and invalidates dashboard cache", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_pvp_test_123");
      const invalidateCacheSpy = vi.spyOn(cacheModule, "invalidateDashboardCache");

      const mockMatchCreated = {
        id: "match_123",
        userId: "user_pvp_test_123",
        opponent: "Opponent Bot",
        userScore: 8,
        oppScore: 3,
        result: "WIN",
        xpGained: 30,
        createdAt: new Date(),
      };

      const mockProfile = {
        id: "user_pvp_test_123",
        totalXp: 200,
        level: 1,
        title: "Tân Binh",
        coins: 100,
        minutesStudied: 10,
      };

      const mockUpdatedProfile = {
        id: "user_pvp_test_123",
        totalXp: 230,
        level: 1,
        title: "Tân Binh",
        coins: 120,
        minutesStudied: 11,
      };

      let createMatchArgs: any = null;
      let findUniqueProfileArgs: any = null;
      let updateProfileArgs: any = null;
      let upsertDailyPracticeArgs: any = null;

      const mockTx = {
        matchHistory: {
          create: vi.fn().mockImplementation((args) => {
            createMatchArgs = args;
            return Promise.resolve(mockMatchCreated);
          }),
        },
        profile: {
          findUnique: vi.fn().mockImplementation((args) => {
            findUniqueProfileArgs = args;
            return Promise.resolve(mockProfile);
          }),
          update: vi.fn().mockImplementation((args) => {
            updateProfileArgs = args;
            return Promise.resolve(mockUpdatedProfile);
          }),
        },
        dailySkillPractice: {
          upsert: vi.fn().mockImplementation((args) => {
            upsertDailyPracticeArgs = args;
            return Promise.resolve({});
          }),
        },
      };

      vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
        return callback(mockTx);
      });

      const req = new Request("http://localhost/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: "Opponent Bot",
          userScore: 8,
          oppScore: 3,
          result: "WIN",
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify Rule 3: Selective SELECT projection on matchHistory.create
      expect(createMatchArgs.select).toBeDefined();
      expect(createMatchArgs.select.id).toBe(true);
      expect(createMatchArgs.select.opponent).toBe(true);
      expect(createMatchArgs.select.userScore).toBe(true);

      // Verify Rule 3: Selective SELECT projection on profile.findUnique (NO SELECT *)
      expect(findUniqueProfileArgs.select).toBeDefined();
      expect(findUniqueProfileArgs.select.id).toBe(true);
      expect(findUniqueProfileArgs.select.totalXp).toBe(true);
      expect(findUniqueProfileArgs.select.coins).toBe(true);
      expect(findUniqueProfileArgs.select.minutesStudied).toBe(true);
      expect(findUniqueProfileArgs.select.passwordHash).toBeUndefined();

      // Verify Rule 3: Selective SELECT on profile.update & minutes increment
      expect(updateProfileArgs.select).toBeDefined();
      expect(updateProfileArgs.data.minutesStudied).toEqual({ increment: 1 });

      // Verify DailySkillPractice upsert for skill: "vocab"
      expect(upsertDailyPracticeArgs.where.userId_skill_date.skill).toBe("vocab");
      expect(upsertDailyPracticeArgs.update.minutes).toEqual({ increment: 1 });

      // Verify cache invalidation was triggered atomically
      expect(invalidateCacheSpy).toHaveBeenCalledWith("user_pvp_test_123");
    });
  });

  describe("3. GET /api/pvp/match-submit Standards", () => {
    it("returns empty stats for unauthenticated guests without error", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);

      const req = new Request("http://localhost/api/pvp/match-submit", { method: "GET" });
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(true);
      expect(json.data.stats.totalMatches).toBe(0);
      expect(json.data.recentMatches).toEqual([]);
    });

    it("executes selective projection, bounded query (take: 10), and calculates win rate", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_pvp_test_456");

      const mockRecent = [
        {
          id: "m1",
          opponent: "Bot A",
          userScore: 9,
          oppScore: 2,
          result: "WIN",
          xpGained: 30,
          createdAt: new Date(),
        },
        {
          id: "m2",
          opponent: "Bot B",
          userScore: 4,
          oppScore: 7,
          result: "LOSE",
          xpGained: 5,
          createdAt: new Date(),
        },
      ];

      let findManyArgs: any = null;
      vi.spyOn(prisma.matchHistory, "findMany").mockImplementation((args) => {
        findManyArgs = args;
        return Promise.resolve(mockRecent) as any;
      });

      vi.spyOn(prisma.matchHistory, "count")
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(7)  // wins
        .mockResolvedValueOnce(1);  // draws

      const req = new Request("http://localhost/api/pvp/match-submit", { method: "GET" });
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify Rule 3: Selective SELECT projection on matchHistory.findMany
      expect(findManyArgs.select).toBeDefined();
      expect(findManyArgs.select.id).toBe(true);
      expect(findManyArgs.select.opponent).toBe(true);
      expect(findManyArgs.select.userScore).toBe(true);
      expect(findManyArgs.select.oppScore).toBe(true);
      expect(findManyArgs.select.result).toBe(true);
      expect(findManyArgs.select.xpGained).toBe(true);

      // Verify bounded limit
      expect(findManyArgs.take).toBe(10);
      expect(findManyArgs.orderBy).toEqual({ createdAt: "desc" });

      // Verify calculated statistics
      expect(json.data.stats.totalMatches).toBe(10);
      expect(json.data.stats.wins).toBe(7);
      expect(json.data.stats.draws).toBe(1);
      expect(json.data.stats.losses).toBe(2);
      expect(json.data.stats.winRate).toBe(70);
      expect(json.data.stats.totalXpGained).toBe(35);
    });
  });
});
