import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { mockPrisma, mockAuth } = vi.hoisted(() => {
  const mPrisma: any = {
    profile: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      upsert: vi.fn(),
    },
    purchaseLog: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      updateMany: vi.fn(),
    },
    vocabulary: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      upsert: vi.fn(),
    },
    vocabularyTheme: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    userVocabulary: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      count: vi.fn(),
    },
    dailySkillPractice: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    matchHistory: {
      count: vi.fn(),
    },
    ephemeralState: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
    },
    $transaction: vi.fn(async (arg: any) => {
      if (typeof arg === "function") return arg(mPrisma);
      return Promise.all(arg);
    }),
  };
  return {
    mockPrisma: mPrisma,
    mockAuth: { userId: "user_phase3" as string | null },
  };
});

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  safeDbExecute: async <T>(fn: () => Promise<T>) => fn(),
  handlePrismaError: (e: any) => ({ error: e?.message || "DB Error", status: 500 }),
}));

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(async () => mockAuth.userId),
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

import { POST as purchaseShop } from "@/app/api/shop/purchase/route";
import { POST as equipShop } from "@/app/api/shop/equip/route";
import { GET as getChallenges, POST as postChallenge } from "@/app/api/user/challenges/route";
import { POST as awardActivity } from "@/app/api/user/activity-award/route";
import { POST as updateProfile } from "@/app/api/user/profile/route";
import { POST as reviewSubmit } from "@/app/api/user/vocab/review-submit/route";
import { GET as cronGet } from "@/app/api/cron/daily-maintenance/route";
import { POST as explainGrammar } from "@/app/api/ai/grammar/explain/route";
import { sharedStore } from "@/infrastructure/cache/sharedStore";
import { getLocalDateString, getAppStartOfToday } from "@/shared/utils/dateUtils";

describe("Phase 3 Business Logic, Timezone & Serverless Hardening", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.userId = "user_phase3";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("BUG-09: Shop Purchases & Avatar Equip Atomicity", () => {
    it("double_xp sets doubleXpUntil 30 minutes ahead and returns timestamp", async () => {
      mockPrisma.profile.findUnique
        .mockResolvedValueOnce({ coins: 200, streakFreezes: 0, doubleXpUntil: null })
        .mockResolvedValueOnce({
          coins: 100,
          streakFreezes: 0,
          doubleXpUntil: new Date(Date.now() + 30 * 60_000),
        });
      mockPrisma.profile.updateMany.mockResolvedValueOnce({ count: 1 });
      mockPrisma.purchaseLog.create.mockResolvedValueOnce({ id: "log_dxp" });

      const req = new Request("http://localhost/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "double_xp" }),
      });
      const res = await purchaseShop(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.coins).toBe(100);
      expect(json.doubleXpUntil).toBeTruthy();
      expect(mockPrisma.profile.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "user_phase3", coins: { gte: 100 } },
          data: expect.objectContaining({
            coins: { decrement: 100 },
            doubleXpUntil: expect.any(Date),
          }),
        })
      );
    });

    it("super_streak_shield increments streakFreezes by 3", async () => {
      mockPrisma.profile.findUnique
        .mockResolvedValueOnce({ coins: 300, streakFreezes: 1, doubleXpUntil: null })
        .mockResolvedValueOnce({ coins: 180, streakFreezes: 4, doubleXpUntil: null });
      mockPrisma.profile.updateMany.mockResolvedValueOnce({ count: 1 });
      mockPrisma.purchaseLog.create.mockResolvedValueOnce({ id: "log_shield3" });

      const req = new Request("http://localhost/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "super_streak_shield" }),
      });
      const res = await purchaseShop(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.streakFreezes).toBe(4);
      expect(mockPrisma.profile.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ streakFreezes: { increment: 3 } }),
        })
      );
    });

    it("rejects placeholder energy_boost cleanly without deducting coins", async () => {
      const req = new Request("http://localhost/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "energy_boost" }),
      });
      const res = await purchaseShop(req);
      expect(res.status).toBe(400);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });

    it("rejects concurrent TOCTOU purchase when conditional updateMany updates 0 rows", async () => {
      mockPrisma.profile.findUnique.mockResolvedValueOnce({ coins: 100, streakFreezes: 0, doubleXpUntil: null });
      mockPrisma.profile.updateMany.mockResolvedValueOnce({ count: 0 });

      const req = new Request("http://localhost/api/shop/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId: "double_xp" }),
      });
      const res = await purchaseShop(req);
      expect(res.status).toBe(400);
      expect(mockPrisma.purchaseLog.create).not.toHaveBeenCalled();
    });

    it("equipping cyber_glasses unequips all avatar cosmetics symmetrically", async () => {
      mockPrisma.purchaseLog.findFirst.mockResolvedValueOnce({ id: "owned_cyber" });
      mockPrisma.purchaseLog.updateMany.mockResolvedValueOnce({ count: 1 });

      const req = new Request("http://localhost/api/shop/equip", {
        method: "POST",
        body: JSON.stringify({ itemId: "cyber_glasses", equip: true }),
      });
      const res = await equipShop(req);
      expect(res.status).toBe(200);
      expect(mockPrisma.purchaseLog.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            userId: "user_phase3",
            itemId: {
              in: ["premium_owl", "cyber_glasses", "golden_badge", "ielts_champion_cape"],
            },
          },
          data: { isEquipped: false },
        })
      );
    });
  });

  describe("BUG-10: Asia/Ho_Chi_Minh Timezone, Daily Challenges & Vocab Auto-Seed", () => {
    it("maps late-UTC timestamp (20:30Z -> 03:30+07) to Vietnam local calendar date", () => {
      const lateUtc = new Date("2026-11-13T20:30:00.000Z");
      expect(getLocalDateString(lateUtc)).toBe("2026-11-14");
      const startToday = getAppStartOfToday(lateUtc);
      expect(startToday.toISOString()).toBe("2026-11-13T17:00:00.000Z");
    });

    it("scopes review_cards progress to today and rejects insufficient review claims", async () => {
      mockPrisma.userVocabulary.count.mockResolvedValue(2);
      mockPrisma.matchHistory.count.mockResolvedValue(0);
      mockPrisma.dailySkillPractice.findMany.mockResolvedValue([]);

      await getChallenges(new Request("http://localhost/api/user/challenges"));
      expect(mockPrisma.userVocabulary.count).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: "user_phase3",
            proficiency: { gt: 0 },
            lastPracticed: { gte: expect.any(Date) },
          }),
        })
      );

      mockPrisma.dailySkillPractice.findFirst.mockResolvedValueOnce(null);
      mockPrisma.userVocabulary.count.mockResolvedValueOnce(3);

      const claimRes = await postChallenge(
        new Request("http://localhost/api/user/challenges", {
          method: "POST",
          body: JSON.stringify({ challengeId: "review_cards" }),
        })
      );
      expect(claimRes.status).toBe(400);
    });

    it("auto-seeds missing curated vocab before saving SM-2 review instead of dropping DB sync", async () => {
      mockPrisma.profile.findUnique.mockResolvedValueOnce({ id: "user_phase3" });
      mockPrisma.vocabulary.findUnique.mockResolvedValueOnce(null);
      mockPrisma.vocabulary.findFirst.mockResolvedValueOnce(null);
      mockPrisma.vocabularyTheme.findUnique.mockResolvedValueOnce(null);
      mockPrisma.vocabularyTheme.upsert.mockResolvedValueOnce({ id: "t_basic_greetings" });
      mockPrisma.vocabulary.upsert.mockResolvedValueOnce({ id: "hello" });
      mockPrisma.userVocabulary.findUnique.mockResolvedValueOnce(null);
      mockPrisma.userVocabulary.upsert.mockResolvedValueOnce({
        userId: "user_phase3",
        vocabId: "hello",
        proficiency: 50,
        interval: 1,
        easeFactor: 2.5,
        repetitions: 1,
        lastPracticed: new Date(),
        nextReview: new Date(),
      });

      const res = await reviewSubmit(
        new Request("http://localhost/api/user/vocab/review-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vocabId: "hello", quality: 4 }),
        })
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data.isLocal).toBeUndefined();
      expect(mockPrisma.userVocabulary.upsert).toHaveBeenCalled();
    });
  });

  describe("BUG-11: Server-Side Double XP & Unique Username Enforcement", () => {
    it("doubles awarded XP on server when doubleXpUntil is active", async () => {
      mockPrisma.profile.findUnique.mockResolvedValueOnce({
        isPremium: false,
        doubleXpUntil: new Date(Date.now() + 15 * 60_000),
      });
      mockPrisma.profile.update.mockResolvedValueOnce({
        id: "user_phase3",
        totalXp: 200,
        level: 2,
        title: "Learner",
        coins: 100,
        minutesStudied: 10,
        currentStreak: 1,
        longestStreak: 1,
        streakFreezes: 0,
      });
      mockPrisma.dailySkillPractice.findFirst.mockResolvedValueOnce({ id: "dsp_1" });
      mockPrisma.dailySkillPractice.upsert.mockResolvedValueOnce({});

      const res = await awardActivity(
        new Request("http://localhost/api/user/activity-award", {
          method: "POST",
          body: JSON.stringify({ xp: 25, skill: "vocab" }),
        })
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data.awardedXp).toBe(50);
      expect(mockPrisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ totalXp: { increment: 50 } }),
        })
      );
    });

    it("rejects duplicate username owned by another user with HTTP 409", async () => {
      mockPrisma.profile.findFirst.mockResolvedValueOnce({ id: "other_user" });

      const res = await updateProfile(
        new Request("http://localhost/api/user/profile", {
          method: "POST",
          body: JSON.stringify({ username: "taken_name" }),
        })
      );
      expect(res.status).toBe(409);
      expect(mockPrisma.profile.upsert).not.toHaveBeenCalled();
    });
  });

  describe("BUG-12: Serverless SharedStore, Fail-Closed Cron GET & Safe Grammar Cache", () => {
    it("sharedStore writes and reads via PostgreSQL ephemeralState model", async () => {
      mockPrisma.ephemeralState.upsert.mockResolvedValueOnce({});
      await sharedStore.set("room:123", { hostId: "u1" }, 60);
      expect(mockPrisma.ephemeralState.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { key: "room:123" } })
      );

      mockPrisma.ephemeralState.findUnique.mockResolvedValueOnce({
        valueJson: JSON.stringify({ hostId: "u1" }),
        expiresAt: new Date(Date.now() + 30_000),
      });
      const val = await sharedStore.get<{ hostId: string }>("room:123");
      expect(val).toEqual({ hostId: "u1" });
    });

    it("GET cron fails closed in production when CRON_SECRET missing and rejects query secret", async () => {
      delete process.env.CRON_SECRET;
      vi.stubEnv("NODE_ENV", "production");
      const unauthProd = await cronGet(new Request("http://localhost/api/cron/daily-maintenance"));
      expect(unauthProd.status).toBe(401);

      process.env.CRON_SECRET = "cron_secret_test_value";
      const queryLeakAttempt = await cronGet(
        new Request("http://localhost/api/cron/daily-maintenance?secret=cron_secret_test_value")
      );
      expect(queryLeakAttempt.status).toBe(401);

      mockPrisma.profile.findMany = vi.fn().mockResolvedValueOnce([]);
      const authedBearer = await cronGet(
        new Request("http://localhost/api/cron/daily-maintenance", {
          headers: { Authorization: "Bearer cron_secret_test_value" },
        })
      );
      expect(authedBearer.status).toBe(200);
    });

    it("rejects path traversal topicId in grammar explain route", async () => {
      const res = await explainGrammar(
        new Request("http://localhost/api/ai/grammar/explain", {
          method: "POST",
          body: JSON.stringify({ topicId: "../../secret", level: "beginner", mode: "generate_guide" }),
        }) as any
      );
      expect(res.status).toBe(400);
    });
  });
});
