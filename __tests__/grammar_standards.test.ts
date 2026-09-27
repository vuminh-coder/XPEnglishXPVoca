import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "@/app/api/ai/grammar/progress/route";
import { prisma } from "@/infrastructure/database/prisma";
import * as authModule from "@/infrastructure/auth/auth";
import * as cacheModule from "@/infrastructure/cache/dashboardCache";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

describe("Grammar Progress Database Performance & Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);
  });

  describe("1. POST /api/ai/grammar/progress", () => {
    it("returns 400 when topicId or score is missing", async () => {
      const req = new Request("http://localhost/api/ai/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const res = await POST(req);
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error).toContain("Missing required fields");
    });

    it("handles guest users safely without writing to database", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);

      const req = new Request("http://localhost/api/ai/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: "present_simple",
          level: "basic",
          score: 80,
          xpEarned: 25,
        }),
      });

      const res = await POST(req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(true);
      expect(json.progress.score).toBe(80);
      expect(json.progress.xpEarned).toBe(25);
    });

    it("executes atomic transaction with selective projection and invalidates dashboard cache", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_grammar_test_123");
      const invalidateCacheSpy = vi.spyOn(cacheModule, "invalidateDashboardCache");

      let findFirstArgs: any = null;
      let createArgs: any = null;
      let updateProfileArgs: any = null;
      let upsertDailyPracticeArgs: any = null;

      const mockCreatedProgress = {
        id: "gp_123",
        userId: "user_grammar_test_123",
        topicId: "present_simple",
        level: "basic",
        score: 100,
        xpEarned: 35,
        createdAt: new Date(),
      };

      const mockTx = {
        grammarProgress: {
          findFirst: vi.fn().mockImplementation((args) => {
            findFirstArgs = args;
            return Promise.resolve(null); // No existing record
          }),
          create: vi.fn().mockImplementation((args) => {
            createArgs = args;
            return Promise.resolve(mockCreatedProgress);
          }),
        },
        profile: {
          update: vi.fn().mockImplementation((args) => {
            updateProfileArgs = args;
            return Promise.resolve({ id: "user_grammar_test_123", totalXp: 500, minutesStudied: 30 });
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

      const req = new Request("http://localhost/api/ai/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: "present_simple",
          level: "basic",
          score: 100,
          xpEarned: 35,
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify Rule 3: Selective SELECT projection on findFirst (NO SELECT *)
      expect(findFirstArgs.select).toBeDefined();
      expect(findFirstArgs.select.id).toBe(true);
      expect(findFirstArgs.select.score).toBe(true);

      // Verify Rule 3: Selective SELECT projection on create (NO SELECT *)
      expect(createArgs.select).toBeDefined();
      expect(createArgs.select.id).toBe(true);
      expect(createArgs.select.topicId).toBe(true);
      expect(createArgs.select.score).toBe(true);
      expect(createArgs.select.xpEarned).toBe(true);

      // Verify Profile update increment
      expect(updateProfileArgs.select).toBeDefined();
      expect(updateProfileArgs.data.minutesStudied).toEqual({ increment: 3 });
      expect(updateProfileArgs.data.totalXp).toEqual({ increment: 35 });

      // Verify DailySkillPractice upsert for skill: "writing"
      expect(upsertDailyPracticeArgs.where.userId_skill_date.skill).toBe("writing");
      expect(upsertDailyPracticeArgs.update.minutes).toEqual({ increment: 3 });

      // Verify atomic cache invalidation
      expect(invalidateCacheSpy).toHaveBeenCalledWith("user_grammar_test_123");
    });
  });

  describe("2. GET /api/ai/grammar/progress", () => {
    it("returns empty progress for guest users", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);

      const req = new Request("http://localhost/api/ai/grammar/progress", { method: "GET" });
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(true);
      expect(json.data.completedTopicIds).toEqual([]);
      expect(json.data.stats.completed).toBe(0);
    });

    it("executes selective projection and computes completed topics and accuracy", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_grammar_test_456");

      const mockRecords = [
        {
          id: "gp_1",
          topicId: "present_simple",
          level: "basic",
          score: 80,
          xpEarned: 25,
          createdAt: new Date(),
        },
        {
          id: "gp_2",
          topicId: "past_simple",
          level: "basic",
          score: 40,
          xpEarned: 15,
          createdAt: new Date(),
        },
      ];

      let findManyArgs: any = null;
      vi.spyOn(prisma.grammarProgress, "findMany").mockImplementation((args) => {
        findManyArgs = args;
        return Promise.resolve(mockRecords) as any;
      });

      const req = new Request("http://localhost/api/ai/grammar/progress", { method: "GET" });
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify Rule 3: Selective SELECT projection on findMany
      expect(findManyArgs.select).toBeDefined();
      expect(findManyArgs.select.id).toBe(true);
      expect(findManyArgs.select.topicId).toBe(true);
      expect(findManyArgs.select.score).toBe(true);

      // Verify computed statistics
      expect(json.data.completedTopicIds).toEqual(["present_simple"]);
      expect(json.data.stats.completed).toBe(1);
      expect(json.data.stats.accuracy).toBe(60); // (80 + 40) / 2
    });
  });

  describe("3. GrammarProgressStore Server Hydration", () => {
    it("hydrates server records into store state accurately", () => {
      const store = useGrammarProgressStore.getState();
      store.resetProgress();

      store.hydrateFromServer([
        { topicId: "present_simple", score: 80 },
        { topicId: "past_continuous", score: 40 },
      ]);

      const updated = useGrammarProgressStore.getState();
      expect(updated.getTopicStatus("present_simple")).toBe("completed");
      expect(updated.getCompletedCount()).toBe(1);
      expect(updated.quizScores["present_simple"].percent).toBe(80);
      expect(updated.quizScores["past_continuous"].percent).toBe(40);
    });
  });
});
