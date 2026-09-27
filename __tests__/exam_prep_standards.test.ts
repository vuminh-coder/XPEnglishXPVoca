import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";

// Hoist mocks
const { mockPrisma, mockAuth, mockCache } = vi.hoisted(() => ({
  mockPrisma: {
    examAttempt: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    examType: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    exam: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    profile: {
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
import { GET as getAttempts, POST as postAttempt } from "@/app/api/exams/attempts/route";
import { GET as getExamStats } from "@/app/api/exams/stats/route";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";

describe("Exam Prep Performance Standards & Database Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.userId = null;
  });

  describe("1. Standardized 37-Exam Bank Integrity", () => {
    it("should load all 37 official standardized papers with valid metadata", () => {
      expect(MOCK_EXAM_PAPERS.length).toBe(37);
      MOCK_EXAM_PAPERS.forEach((paper) => {
        expect(paper.id).toBeDefined();
        expect(paper.title).toBeDefined();
        expect(paper.type).toMatch(/TOEIC|IELTS/);
        expect(paper.timeLimitMinutes).toBeGreaterThan(0);
        expect(Array.isArray(paper.questions)).toBe(true);
        expect(Array.isArray(paper.supportedSkills)).toBe(true);
        expect(paper.supportedSkills.length).toBeGreaterThan(0);
      });
    });
  });

  describe("2. Exam Attempt Submission & Database Sync (POST /api/exams/attempts)", () => {
    it("should compute verified scores, upsert dailySkillPractice, and invalidate dashboard cache atomically", async () => {
      const userId = "exam_taker_001";
      mockAuth.userId = userId;

      mockPrisma.$transaction.mockImplementationOnce(async (txFn: any) => {
        return await txFn({
          examType: mockPrisma.examType,
          exam: mockPrisma.exam,
          examAttempt: mockPrisma.examAttempt,
          profile: mockPrisma.profile,
          dailySkillPractice: mockPrisma.dailySkillPractice,
        });
      });

      mockPrisma.examType.findFirst.mockResolvedValueOnce({ id: "t_toeic", name: "TOEIC" });
      mockPrisma.exam.findUnique.mockResolvedValueOnce({ id: "toeic_lr_2026_01" });
      mockPrisma.examAttempt.create.mockResolvedValueOnce({
        id: "att_12345",
        userId,
        examId: "toeic_lr_2026_01",
        totalScore: 850,
      });

      const payload = {
        examId: "toeic_lr_2026_01",
        timeSpentSeconds: 3600, // 60 minutes
        userAnswers: {
          q_toeic_lr_2026_01_001: "A",
          q_toeic_lr_2026_01_002: "B",
        },
      };

      const req = new NextRequest("http://localhost:3000/api/exams/attempts", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const res = await postAttempt(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(false);
      expect(json.attemptId).toBe("att_12345");

      // Verify transaction executed
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);

      // Verify Profile updated
      expect(mockPrisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
          data: expect.objectContaining({
            totalXp: expect.anything(),
            minutesStudied: expect.anything(),
          }),
        })
      );

      // Verify DailySkillPractice upserted
      expect(mockPrisma.dailySkillPractice.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId_skill_date: expect.objectContaining({
              userId,
            }),
          }),
        })
      );

      // Verify atomic cache invalidation
      expect(mockCache.invalidateDashboardCache).toHaveBeenCalledWith(userId);
    });

    it("should handle guest submissions gracefully without database mutation", async () => {
      mockAuth.userId = null; // Guest user

      const payload = {
        examId: "toeic_mini_speed_01",
        timeSpentSeconds: 600,
        userAnswers: {},
      };

      const req = new NextRequest("http://localhost:3000/api/exams/attempts", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const res = await postAttempt(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.guest).toBe(true);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });
  });

  describe("3. Exam Attempt History Query with Selective Projection (GET /api/exams/attempts)", () => {
    it("should query attempts with selective projection and bounding", async () => {
      const userId = "exam_taker_002";
      mockAuth.userId = userId;

      mockPrisma.examAttempt.findMany.mockResolvedValueOnce([
        {
          id: "att_01",
          examId: "toeic_lr_2026_01",
          totalScore: 880,
          maxScore: 990,
          percentage: 88,
          estimatedScore: 880,
          timeSpent: 3400,
          status: "COMPLETED",
          completedAt: new Date(),
          exam: {
            id: "toeic_lr_2026_01",
            title: "TOEIC LR 2026 Paper 01",
            totalQuestions: 200,
            examType: { name: "TOEIC" },
          },
        },
      ]);

      const req = new NextRequest("http://localhost:3000/api/exams/attempts?limit=10");
      const res = await getAttempts(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(Array.isArray(json.attempts)).toBe(true);
      expect(json.attempts.length).toBe(1);
      expect(json.attempts[0].examTitle).toBe("TOEIC LR 2026 Paper 01");

      // Verify selective projection was used (Rule 3)
      expect(mockPrisma.examAttempt.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
          select: expect.objectContaining({
            id: true,
            examId: true,
            totalScore: true,
            exam: expect.anything(),
          }),
        })
      );
    });
  });

  describe("4. Exam Statistics Query with Selective Projection (GET /api/exams/stats)", () => {
    it("should query completed attempts using selective columns and calculate stats", async () => {
      const userId = "exam_taker_003";
      mockAuth.userId = userId;

      mockPrisma.examAttempt.findMany.mockResolvedValueOnce([
        {
          estimatedScore: 890,
          estimatedBand: null,
          totalScore: 890,
          percentage: 90,
          timeSpent: 3600,
          startedAt: new Date(),
          completedAt: new Date(),
        },
      ]);

      const res = await getExamStats();
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.stats.bestToeicScore).toBe(890);
      expect(json.stats.totalCompleted).toBe(1);

      // Verify selective projection was used (Rule 3)
      expect(mockPrisma.examAttempt.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            userId,
            status: "COMPLETED",
          },
          select: expect.objectContaining({
            estimatedScore: true,
            totalScore: true,
            percentage: true,
          }),
        })
      );
    });
  });
});
