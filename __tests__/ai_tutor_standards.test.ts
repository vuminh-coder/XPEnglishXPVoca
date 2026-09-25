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
import { POST as postTutor } from "@/app/api/ai/tutor/route";

describe("AI Tutor & Practice Sessions Performance Standards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    memoryCache.invalidatePattern("");
    mockAuth.userId = null;
  });

  describe("1. AI Session Invalidation & Persistence (POST /api/ai/sessions)", () => {
    it("should invalidate dashboard and analytics cache upon COMPLETED session", async () => {
      const userId = "tutor_user_001";
      mockAuth.userId = userId;

      mockPrisma.$transaction.mockImplementationOnce(async (txFn: any) => {
        await txFn({
          dailySkillPractice: mockPrisma.dailySkillPractice,
          profile: mockPrisma.profile,
        });
      });

      const payload = {
        sessionId: "session_done_123",
        mode: "tutor",
        personaId: "emma",
        messages: [
          { id: "1", role: "ai", text: "Hello!" },
          { id: "2", role: "user", text: "I want to practice IELTS speaking." },
        ],
        overallScore: 90,
        grade: "S",
        timeSpentSeconds: 180,
        xpEarned: 60,
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
      expect(mockPrisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
          data: {
            minutesStudied: { increment: 3 },
            totalXp: { increment: 60 },
          },
        })
      );
      // Performance standard: Cache MUST be invalidated for the user
      expect(mockCache.invalidateDashboardCache).toHaveBeenCalledWith(userId);
    });

    it("should save IN_PROGRESS session without prematurely busting cache", async () => {
      const userId = "tutor_user_002";
      mockAuth.userId = userId;

      const payload = {
        sessionId: "session_prog_456",
        mode: "tutor",
        personaId: "alex",
        messages: [
          { id: "1", role: "ai", text: "How's your day?" },
          { id: "2", role: "user", text: "Pretty good!" },
        ],
        timeSpentSeconds: 30,
        xpEarned: 0,
        status: "IN_PROGRESS",
      };

      const req = new NextRequest("http://localhost:3000/api/ai/sessions", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const res = await postSession(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
      expect(mockCache.invalidateDashboardCache).not.toHaveBeenCalled();
    });
  });

  describe("2. Bounded Query & Hydration (GET /api/ai/sessions)", () => {
    it("should query single session by ID with bounded LIMIT 1", async () => {
      const userId = "tutor_user_003";
      mockAuth.userId = userId;

      mockPrisma.$queryRawUnsafe.mockResolvedValueOnce([
        {
          id: "session_target_999",
          user_id: userId,
          mode: "tutor",
          topic_id: null,
          persona_id: "emma",
          messages: JSON.stringify([{ id: "1", role: "ai", text: "Welcome back" }]),
          overall_score: 88,
          grade: "A",
          evaluation_metrics: JSON.stringify({}),
          time_spent_seconds: 120,
          xp_earned: 45,
          status: "COMPLETED",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      const req = new NextRequest("http://localhost:3000/api/ai/sessions?sessionId=session_target_999");
      const res = await getSessions(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(json.session).toBeDefined();
      expect(json.session.sessionId).toBe("session_target_999");
      expect(json.session.messages).toHaveLength(1);
    });

    it("should hydrate active in-progress session with bounded LIMIT 1", async () => {
      const userId = "tutor_user_004";
      mockAuth.userId = userId;

      mockPrisma.$queryRawUnsafe.mockResolvedValueOnce([
        {
          id: "session_active_777",
          user_id: userId,
          mode: "tutor",
          topic_id: null,
          persona_id: "chloe",
          messages: JSON.stringify([{ id: "1", role: "ai", text: "G'day!" }]),
          overall_score: 0,
          grade: "C",
          evaluation_metrics: JSON.stringify({}),
          time_spent_seconds: 40,
          xp_earned: 0,
          status: "IN_PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      const req = new NextRequest("http://localhost:3000/api/ai/sessions?mode=tutor&status=active");
      const res = await getSessions(req);
      const json = await res.json();

      expect(json.success).toBe(true);
      expect(json.activeSession).toBeDefined();
      expect(json.activeSession.sessionId).toBe("session_active_777");
    });
  });

  describe("3. AI Speech Coach Response Engine (POST /api/ai/tutor)", () => {
    it("should handle polymorphic payload format and return fallback suggestion bank if no API key", async () => {
      const req = new NextRequest("http://localhost:3000/api/ai/tutor", {
        method: "POST",
        body: JSON.stringify({
          message: "I love watching movies on weekends",
          persona: "alex",
          history: [],
        }),
      });

      const res = await postTutor(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.reply).toBeDefined();
      expect(json.vietnameseTranslation).toBeDefined();
      expect(json.suggestedWords).toBeDefined();
      expect(json.suggestedWords.length).toBeGreaterThan(0);
    });

    it("should return 400 when empty message is provided", async () => {
      const req = new NextRequest("http://localhost:3000/api/ai/tutor", {
        method: "POST",
        body: JSON.stringify({
          messages: [],
        }),
      });

      const res = await postTutor(req);
      expect(res.status).toBe(400);
    });
  });
});
