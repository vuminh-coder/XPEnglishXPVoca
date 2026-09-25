import { describe, it, expect, beforeEach, vi } from "vitest";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { NextRequest } from "next/server";

// Hoist mocks
const { mockPrisma, mockAuth, mockCache } = vi.hoisted(() => ({
  mockPrisma: {
    $executeRawUnsafe: vi.fn().mockResolvedValue(1),
    $queryRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
    profile: {
      update: vi.fn(),
    },
    dailySkillPractice: {
      upsert: vi.fn(),
    },
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
  withPrismaRetry: async <T>(fn: () => Promise<T>) => await fn(),
  handlePrismaError: (e: any) => ({ error: e.message, status: 500 }),
}));

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: async () => mockAuth.userId,
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: mockCache.invalidateDashboardCache,
}));

// Route Handlers
import { GET as getSessions, POST as postSession } from "@/app/api/ai/sessions/route";
import { POST as postChat } from "@/app/api/ai/chat/route";

describe("AI Conversation Studio Performance Standards & Architecture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern("");
    mockAuth.userId = null;
  });

  describe("1. AI Conversation Session Persistence & Invalidation (POST /api/ai/sessions)", () => {
    it("should invalidate dashboard and analytics cache upon COMPLETED conversation session", async () => {
      const userId = "conv_user_001";
      mockAuth.userId = userId;

      mockPrisma.$transaction.mockImplementationOnce(async (txFn: any) => {
        await txFn({
          dailySkillPractice: mockPrisma.dailySkillPractice,
          profile: mockPrisma.profile,
        });
      });

      const payload = {
        sessionId: "conv_done_888",
        mode: "conversation",
        topicId: "at1",
        messages: [
          { id: "1", role: "ai", text: "Welcome to our restaurant!" },
          { id: "2", role: "user", text: "I'd like to order a fresh salad, please." },
        ],
        overallScore: 95,
        grade: "S",
        evaluationMetrics: {
          goalsScore: 100,
          grammarScore: 100,
          interactionScore: 90,
          vocabScore: 90,
        },
        timeSpentSeconds: 240, // 4 minutes
        xpEarned: 45,
        status: "COMPLETED",
      };

      const req = new NextRequest("http://localhost:3000/api/ai/sessions", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const res = await postSession(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);

      // Verify speaking skill is synced for conversation practice
      expect(mockPrisma.dailySkillPractice.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId_skill_date: expect.objectContaining({
              userId,
              skill: "speaking",
            }),
          }),
          create: expect.objectContaining({
            userId,
            skill: "speaking",
            minutes: 4,
            xpEarned: 45,
          }),
        })
      );

      expect(mockPrisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
          data: {
            minutesStudied: { increment: 4 },
            totalXp: { increment: 45 },
          },
        })
      );

      // Performance standard Level 5: Invalidate user caches
      expect(mockCache.invalidateDashboardCache).toHaveBeenCalledWith(userId);
    });
  });

  describe("2. Active Conversation Hydration (GET /api/ai/sessions)", () => {
    it("should hydrate active in-progress conversation session with bounded LIMIT 1", async () => {
      const userId = "conv_user_002";
      mockAuth.userId = userId;

      mockPrisma.$queryRawUnsafe.mockResolvedValueOnce([
        {
          id: "conv_active_123",
          user_id: userId,
          mode: "conversation",
          topic_id: "at2",
          persona_id: null,
          messages: JSON.stringify([
            { id: "1", role: "ai", text: "Welcome to the interview." },
            { id: "2", role: "user", text: "Thank you for having me." },
          ]),
          overall_score: 0,
          grade: "C",
          evaluation_metrics: JSON.stringify({}),
          time_spent_seconds: 60,
          xp_earned: 0,
          status: "IN_PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      const req = new NextRequest("http://localhost:3000/api/ai/sessions?mode=conversation&status=active");
      const res = await getSessions(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(json.activeSession).toBeDefined();
      expect(json.activeSession.sessionId).toBe("conv_active_123");
      expect(json.activeSession.mode).toBe("conversation");
      expect(json.activeSession.topicId).toBe("at2");
    });
  });

  describe("3. Conversation AI Turn & Goal Engine (POST /api/ai/chat)", () => {
    it("should accept conversation messages and return structured response or fallback", async () => {
      const req = new NextRequest("http://localhost:3000/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          topicId: "at1",
          mode: "conversation",
          messages: [
            { role: "ai", text: "What would you like to order today?" },
            { role: "user", text: "I'd like to have a fresh salad and a beverage, please." },
          ],
        }),
      });

      const res = await postChat(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.reply).toBeDefined();
      expect(json.vietnameseTranslation).toBeDefined();
      expect(json.suggestedWords).toBeDefined();
      expect(json.suggestedWords.length).toBeGreaterThan(0);
    });

    it("should reject requests with invalid messages array", async () => {
      const req = new NextRequest("http://localhost:3000/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          topicId: "at1",
          messages: "not-an-array",
        }),
      });

      const res = await postChat(req);
      expect(res.status).toBe(400);
    });
  });
});
