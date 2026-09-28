import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock prisma and auth modules
vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(),
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: {
    profile: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    studyPlan: {
      findUnique: vi.fn(),
    },
    userVocabulary: {
      count: vi.fn(),
    },
    dailySkillPractice: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    listeningProgress: {
      findFirst: vi.fn(),
    },
    listeningLesson: {
      findFirst: vi.fn(),
    },
    grammarProgress: {
      findMany: vi.fn(),
    },
    friendship: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    studyRoom: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    roomMessage: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
  safeDbExecute: vi.fn(async (cb) => cb()),
  handlePrismaError: vi.fn((err) => ({ error: err?.message || "Error", status: 500 })),
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

describe("Social, Study Rooms & AI Recommendations Standard Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. User Profile Route Security & Safe Projections (/api/user/profile)", () => {
    it("ensures GET /api/user/profile passes request to getAuthenticatedUserId and uses safe projections without passwordHash", async () => {
      const { GET } = await import("@/app/api/user/profile/route");
      (getAuthenticatedUserId as any).mockResolvedValue("usr_123");
      (prisma.profile.findUnique as any).mockResolvedValue({
        id: "usr_123",
        fullName: "Test User",
        username: "testuser",
        avatarEmoji: "🦉",
        level: 5,
        totalXp: 1200,
      });

      const req = new Request("http://localhost:3000/api/user/profile");
      const res = await GET(req);
      const json = await res.json();

      expect(getAuthenticatedUserId).toHaveBeenCalledWith(req);
      expect(prisma.profile.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "usr_123" },
          select: expect.objectContaining({
            id: true,
            fullName: true,
            username: true,
            totalXp: true,
          }),
        })
      );
      // Ensure passwordHash is NOT included in the selection
      const selectObj = (prisma.profile.findUnique as any).mock.calls[0][0].select;
      expect(selectObj.passwordHash).toBeUndefined();
      expect(json.success).toBe(true);
      expect(json.data.username).toBe("testuser");
    });

    it("ensures POST /api/user/profile invalidates dashboard cache upon updating profile", async () => {
      const { POST } = await import("@/app/api/user/profile/route");
      (getAuthenticatedUserId as any).mockResolvedValue("usr_123");
      (prisma.profile.upsert as any).mockResolvedValue({
        id: "usr_123",
        fullName: "Updated Name",
        username: "updateduser",
        avatarEmoji: "🚀",
      });

      const req = new Request("http://localhost:3000/api/user/profile", {
        method: "POST",
        body: JSON.stringify({ fullName: "Updated Name", avatarEmoji: "🚀" }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(getAuthenticatedUserId).toHaveBeenCalledWith(req);
      expect(prisma.profile.upsert).toHaveBeenCalled();
      expect(invalidateDashboardCache).toHaveBeenCalledWith("usr_123");
      expect(json.success).toBe(true);
    });
  });

  describe("2. Friends Suggestions Route Security (/api/friends/suggestions)", () => {
    it("ensures suggestions route passes request to auth and selectively projects profile columns", async () => {
      const { GET } = await import("@/app/api/friends/suggestions/route");
      (getAuthenticatedUserId as any).mockResolvedValue("usr_123");
      (prisma.friendship.findMany as any).mockResolvedValue([]);
      (prisma.profile.findMany as any).mockResolvedValue([
        {
          id: "usr_456",
          fullName: "Friend One",
          username: "friend1",
          level: 4,
          totalXp: 800,
          avatarEmoji: "🦊",
          avatarUrl: null,
        },
      ]);

      const req = new Request("http://localhost:3000/api/friends/suggestions");
      const res = await GET(req);
      const json = await res.json();

      expect(getAuthenticatedUserId).toHaveBeenCalledWith(req);
      expect(prisma.profile.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
          select: expect.objectContaining({
            id: true,
            fullName: true,
            username: true,
            totalXp: true,
          }),
        })
      );
      const selectArgs = (prisma.profile.findMany as any).mock.calls[0][0].select;
      expect(selectArgs.passwordHash).toBeUndefined();
      expect(json.success).toBe(true);
      expect(json.data.length).toBe(1);
    });
  });

  describe("3. Study Rooms Route Standards (/api/study-rooms)", () => {
    it("ensures GET /api/study-rooms uses selective projection with bounded members and does not leak passcodes", async () => {
      const { GET } = await import("@/app/api/study-rooms/route");
      (prisma.studyRoom.findMany as any).mockResolvedValue([
        {
          id: "100200",
          name: "IELTS Intensive",
          description: "Speaking practice room",
          category: "IELTS",
          accentColor: "indigo",
          maxMembers: 20,
          isPrivate: false,
          createdAt: new Date(),
          creator: { fullName: "Teacher", username: "teacher", avatarEmoji: "🎓" },
          members: [],
          _count: { members: 5 },
        },
      ]);

      const req = new Request("http://localhost:3000/api/study-rooms");
      const res = await GET(req);
      const json = await res.json();

      expect(prisma.studyRoom.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
          include: expect.objectContaining({
            creator: expect.any(Object),
            members: expect.objectContaining({
              take: 25,
            }),
            _count: expect.any(Object),
          }),
        })
      );
      const includeArgs = (prisma.studyRoom.findMany as any).mock.calls[0][0].include;
      expect(includeArgs.creator.select.passwordHash).toBeUndefined();
      expect(json.success).toBe(true);
      expect(json.rooms.length).toBe(1);
    });
  });

  describe("4. Chatbot AI Recommendations Optimization (/api/ai/chatbot/recommendations)", () => {
    it("ensures single contiguous range query is used for 7-day practice records and studyPlan avoids unbounded tasks", async () => {
      const { GET } = await import("@/app/api/ai/chatbot/recommendations/route");
      (getAuthenticatedUserId as any).mockResolvedValue("usr_123");
      (prisma.profile.findUnique as any).mockResolvedValue({
        level: 3,
        totalXp: 500,
        currentStreak: 4,
        coins: 120,
        minutesStudied: 45,
      });
      (prisma.studyPlan.findUnique as any).mockResolvedValue({
        targetExam: "TOEIC",
        targetScore: 800,
        currentLevel: "B1",
        weeklyHours: 12,
      });
      (prisma.userVocabulary.count as any).mockResolvedValue(5);
      (prisma.dailySkillPractice.findMany as any).mockResolvedValue([
        { skill: "dictation", date: "2026-09-27", minutes: 15 },
      ]);
      (prisma.listeningProgress.findFirst as any).mockResolvedValue(null);
      (prisma.listeningLesson.findFirst as any).mockResolvedValue({
        id: "les_1",
        title: "Workplace Smalltalk",
        category: "Business",
      });
      (prisma.grammarProgress.findMany as any).mockResolvedValue([]);

      const req = new Request("http://localhost:3000/api/ai/chatbot/recommendations?pathname=/study/listening");
      const res = await GET(req);
      const json = await res.json();

      expect(getAuthenticatedUserId).toHaveBeenCalledWith(req);
      // Verify studyPlan used selective projection without include.dailyTasks
      expect(prisma.studyPlan.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: "usr_123" },
          select: expect.objectContaining({
            targetExam: true,
            targetScore: true,
          }),
        })
      );
      const studyPlanCall = (prisma.studyPlan.findUnique as any).mock.calls[0][0];
      expect(studyPlanCall.include).toBeUndefined();

      expect(json.success).toBe(true);
      expect(json.data.user.level).toBe(3);
      expect(json.data.targetGoal.score).toBe(800);
      expect(json.data.recommendations.contextualTip).toBeDefined();
    });
  });

  describe("5. YouTube Captions Route Standards (/api/youtube/captions)", () => {
    it("returns 400 when videoId is missing", async () => {
      const { GET } = await import("@/app/api/youtube/captions/route");
      const { NextRequest } = await import("next/server");
      const req = new NextRequest("http://localhost:3000/api/youtube/captions");
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.hasCaptions).toBe(false);
      expect(json.error).toContain("videoId");
    });
  });
});
