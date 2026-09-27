import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as getVocab, POST as postVocab } from "@/app/api/user/vocab/route";
import { POST as submitReview } from "@/app/api/user/vocab/review-submit/route";
import { prisma } from "@/infrastructure/database/prisma";
import * as authModule from "@/infrastructure/auth/auth";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import * as cacheModule from "@/infrastructure/cache/dashboardCache";

describe("MyVocab & SM-2 Spaced Repetition Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern("user_vocab");
    vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(null);
  });

  describe("1. GET /api/user/vocab", () => {
    it("returns 401 when user is not authenticated", async () => {
      const req = new Request("http://localhost/api/user/vocab");
      const res = await getVocab(req);
      const json = await res.json();
      expect(res.status).toBe(401);
      expect(json.error).toBe("Unauthorized");
    });

    it("queries with selective projection, orders by lastPracticed desc, and leverages cache", async () => {
      const userId = "user_vocab_test_1";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);

      let findManyArgs: any = null;
      const mockVocabData = [
        {
          userId,
          vocabId: "v_apple",
          proficiency: 3,
          isFavorite: true,
          lastPracticed: new Date("2026-09-20T10:00:00Z"),
          nextReview: new Date("2026-09-25T10:00:00Z"),
          vocabulary: {
            word: "apple",
            phonetic: "/ˈæp.əl/",
            definition: "A round fruit with firm, white flesh and a green, red, or yellow skin",
            definitionVn: "Quả táo",
            pos: "noun",
            difficulty: 1,
            frequency: 5,
            themeId: "t_food",
            examples: ["She ate a ripe apple."],
            synonyms: [],
            antonyms: [],
          },
        },
      ];

      (vi.spyOn(prisma.userVocabulary, "findMany") as any).mockImplementation(async (args: any) => {
        findManyArgs = args;
        return mockVocabData;
      });

      // 1st request: Cache MISS
      const req1 = new Request("http://localhost/api/user/vocab?favorite=true&due=true&limit=25");
      const res1 = await getVocab(req1);
      const json1 = await res1.json();

      expect(res1.status).toBe(200);
      expect(res1.headers.get("X-Cache")).toBe("MISS");
      expect(json1.success).toBe(true);
      expect(json1.data).toHaveLength(1);
      expect(json1.data[0].word).toBe("apple");

      // Verify Query Optimization Standards:
      // - Selective projection (no SELECT *)
      expect(findManyArgs.select).toBeDefined();
      expect(findManyArgs.select.vocabulary.select).toBeDefined();
      expect(findManyArgs.select.vocabulary.select.word).toBe(true);
      // - Leverages composite index: @@index([userId, lastPracticed(sort: Desc)])
      expect(findManyArgs.orderBy).toEqual({ lastPracticed: "desc" });
      // - Filters by favorite and due date
      expect(findManyArgs.where.userId).toBe(userId);
      expect(findManyArgs.where.isFavorite).toBe(true);
      expect(findManyArgs.where.nextReview).toBeDefined();
      expect(findManyArgs.take).toBe(25);

      // 2nd request: Cache HIT (no DB query)
      const res2 = await getVocab(req1);
      expect(res2.headers.get("X-Cache")).toBe("HIT");
      const json2 = await res2.json();
      expect(json2.data).toEqual(json1.data);
    });
  });

  describe("2. POST /api/user/vocab (Upsert & Cache Invalidation)", () => {
    it("returns 401 when unauthorized", async () => {
      const req = new Request("http://localhost/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabId: "v_apple" }),
      });
      const res = await postVocab(req);
      expect(res.status).toBe(401);
    });

    it("handles local/guest user gracefully", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("guest_user");
      const req = new Request("http://localhost/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabId: "v_banana", proficiency: 2, isFavorite: true }),
      });
      const res = await postVocab(req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.data.isLocal).toBe(true);
      expect(json.data.vocabId).toBe("v_banana");
    });

    it("upserts with selective projection and invalidates caches", async () => {
      const userId = "user_vocab_test_2";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);
      const invalidateDashboardSpy = vi.spyOn(cacheModule, "invalidateDashboardCache");
      const invalidateMemorySpy = vi.spyOn(memoryCache, "invalidatePattern");

      vi.spyOn(prisma.profile, "findUnique").mockResolvedValue({ id: userId } as any);
      vi.spyOn(prisma.vocabulary, "findUnique").mockResolvedValue({ id: "v_cat" } as any);

      let upsertArgs: any = null;
      (vi.spyOn(prisma.userVocabulary, "upsert") as any).mockImplementation(async (args: any) => {
        upsertArgs = args;
        return {
          userId,
          vocabId: "v_cat",
          proficiency: 4,
          isFavorite: true,
          lastPracticed: new Date("2026-09-27T10:00:00Z"),
          nextReview: new Date("2026-09-30T10:00:00Z"),
        };
      });

      const req = new Request("http://localhost/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabId: "v_cat", proficiency: 4, isFavorite: true }),
      });

      const res = await postVocab(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.proficiency).toBe(4);

      // Verify selective projection
      expect(upsertArgs.select).toEqual({
        userId: true,
        vocabId: true,
        proficiency: true,
        isFavorite: true,
        lastPracticed: true,
        nextReview: true,
      });

      // Verify Cache invalidation
      expect(invalidateMemorySpy).toHaveBeenCalledWith(`user_vocab:${userId}`);
      expect(invalidateDashboardSpy).toHaveBeenCalledWith(userId);
    });
  });

  describe("3. POST /api/user/vocab/review-submit (SM-2 Spaced Repetition)", () => {
    it("validates missing parameters", async () => {
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue("user_test_sm2");
      const req = new Request("http://localhost/api/user/vocab/review-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabId: "v_dog" }), // Missing quality
      });
      const res = await submitReview(req);
      expect(res.status).toBe(400);
    });

    it("calculates SM-2 interval, selective projection, and invalidates caches", async () => {
      const userId = "user_test_sm2_real";
      vi.spyOn(authModule, "getAuthenticatedUserId").mockResolvedValue(userId);
      const invalidateDashboardSpy = vi.spyOn(cacheModule, "invalidateDashboardCache");
      const invalidateMemorySpy = vi.spyOn(memoryCache, "invalidatePattern");

      vi.spyOn(prisma.profile, "findUnique").mockResolvedValue({ id: userId } as any);
      vi.spyOn(prisma.vocabulary, "findUnique").mockResolvedValue({ id: "v_orange" } as any);
      vi.spyOn(prisma.userVocabulary, "findUnique").mockResolvedValue({
        interval: 1,
        easeFactor: 2.5,
        repetitions: 1,
        proficiency: 30,
      } as any);

      let upsertArgs: any = null;
      (vi.spyOn(prisma.userVocabulary, "upsert") as any).mockImplementation(async (args: any) => {
        upsertArgs = args;
        return {
          userId,
          vocabId: "v_orange",
          proficiency: 80,
          interval: 6,
          easeFactor: 2.6,
          repetitions: 2,
          lastPracticed: new Date(),
          nextReview: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        };
      });

      const req = new Request("http://localhost/api/user/vocab/review-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabId: "v_orange", quality: 5 }), // Perfect recall
      });

      const res = await submitReview(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.interval).toBe(6);
      expect(json.data.repetitions).toBe(2);

      // Verify selective projection
      expect(upsertArgs.select).toBeDefined();
      expect(upsertArgs.select.interval).toBe(true);
      expect(upsertArgs.select.easeFactor).toBe(true);

      // Verify cache purge
      expect(invalidateMemorySpy).toHaveBeenCalledWith(`user_vocab:${userId}`);
      expect(invalidateDashboardSpy).toHaveBeenCalledWith(userId);
    });
  });
});
