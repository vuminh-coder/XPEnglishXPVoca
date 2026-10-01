import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: {
    profile: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    examAttempt: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(),
}));

vi.mock("@/infrastructure/auth/password", () => ({
  hashPassword: vi.fn((pwd) => `hashed_${pwd}`),
  comparePassword: vi.fn((pwd, hash) => hash === `hashed_${pwd}`),
}));

vi.mock("@/infrastructure/auth/jwt", () => ({
  signAuthToken: vi.fn(() => "mock_jwt_token_xyz"),
  verifyAuthToken: vi.fn((token) => (token === "valid_token" ? { userId: "user_verified_1" } : null)),
}));

import { prisma } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { POST as registerUser } from "@/app/api/auth/register/route";
import { POST as loginUser } from "@/app/api/auth/login/route";
import { GET as getMe } from "@/app/api/auth/me/route";
import { GET as getExamStats } from "@/app/api/exams/stats/route";
import { NextRequest } from "next/server";

describe("Auth & Exam Query Standards (/api/auth/*, /api/exams/stats)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("1. Rejects duplicate emails using indexed unique lookup", async () => {
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({ id: "existing_user" } as any);

      const req = new NextRequest("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: "Nguyễn Văn A",
          email: "existing@example.com",
          password: "password123",
        }),
      });

      const res = await registerUser(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toContain("đã được sử dụng");
      expect(prisma.profile.findUnique).toHaveBeenCalledWith({
        where: { email: "existing@example.com" },
        select: { id: true },
      });
      expect(prisma.profile.create).not.toHaveBeenCalled();
    });

    it("2. Registers new user with selective projection and secure cookie", async () => {
      vi.mocked(prisma.profile.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.profile.create).mockResolvedValue({
        id: "usr_new_123",
        username: "learner",
        fullName: "Learner One",
        email: "learner@example.com",
        level: 1,
        totalXp: 0,
        currentStreak: 1,
        longestStreak: 1,
        minutesStudied: 0,
        avatarEmoji: "🦉",
        avatarUrl: null,
        title: "Newbie",
        coins: 100,
        streakFreezes: 0,
      } as any);

      const req = new NextRequest("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: "Learner One",
          email: "learner@example.com",
          password: "mypassword123",
        }),
      });

      const res = await registerUser(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.user.id).toBe("usr_new_123");
      expect(prisma.profile.create).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            id: true,
            email: true,
            totalXp: true,
            coins: true,
          }),
        })
      );
      expect(res.cookies.get("xp_voca_session")?.value).toBe("mock_jwt_token_xyz");
    });
  });

  describe("POST /api/auth/login", () => {
    it("3. Authenticates user with selective projection and password verification", async () => {
      vi.mocked(prisma.profile.findFirst).mockResolvedValue({
        id: "usr_login_1",
        username: "loginuser",
        fullName: "Login User",
        email: "login@example.com",
        passwordHash: "hashed_mypassword123",
        level: 2,
        totalXp: 150,
        currentStreak: 3,
        longestStreak: 5,
        minutesStudied: 45,
        avatarEmoji: "🦉",
        avatarUrl: null,
        title: "Scholar",
        coins: 120,
        streakFreezes: 1,
      } as any);

      const req = new NextRequest("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          emailOrUsername: "login@example.com",
          password: "mypassword123",
        }),
      });

      const res = await loginUser(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.user.username).toBe("loginuser");
      expect(prisma.profile.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            id: true,
            passwordHash: true,
          }),
        })
      );
    });
  });

  describe("GET /api/auth/me", () => {
    it("4. Returns verified user profile using selective projection", async () => {
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({
        id: "user_verified_1",
        username: "verified",
        fullName: "Verified User",
        email: "verified@example.com",
        level: 5,
        totalXp: 800,
        currentStreak: 10,
        longestStreak: 15,
        minutesStudied: 120,
        avatarEmoji: "🦉",
        avatarUrl: null,
        title: "Expert",
        coins: 300,
        streakFreezes: 2,
      } as any);

      const req = new NextRequest("http://localhost:3000/api/auth/me", {
        headers: {
          cookie: "xp_voca_session=valid_token",
        },
      });

      const res = await getMe(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.id).toBe("user_verified_1");
      expect(prisma.profile.findUnique).toHaveBeenCalledWith({
        where: { id: "user_verified_1" },
        select: expect.objectContaining({
          id: true,
          totalXp: true,
          coins: true,
        }),
      });
    });
  });

  describe("GET /api/exams/stats", () => {
    it("5. Computes statistics with selective projection on exam attempts", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_exam_hero");
      vi.mocked(prisma.examAttempt.findMany).mockResolvedValue([
        {
          estimatedScore: 820,
          estimatedBand: null,
          totalScore: 820,
          percentage: 85,
          timeSpent: 3600,
          startedAt: new Date("2026-09-20T10:00:00Z"),
          completedAt: new Date("2026-09-20T11:00:00Z"),
        },
      ] as any);

      const req = new Request("http://localhost:3000/api/exams/stats");
      const res = await getExamStats(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.stats.totalCompleted).toBe(1);
      expect(json.stats.bestToeicScore).toBe(820);
      expect(json.stats.avgAccuracy).toBe(85);
      expect(json.stats.totalMinutesSpent).toBe(60);

      expect(prisma.examAttempt.findMany).toHaveBeenCalledWith({
        where: { userId: "user_exam_hero", status: "COMPLETED" },
        select: expect.objectContaining({
          estimatedScore: true,
          timeSpent: true,
        }),
        orderBy: { startedAt: "desc" },
        take: 20,
      });
    });
  });
});
