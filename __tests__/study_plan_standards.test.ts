import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("@/infrastructure/auth/auth", () => ({
  getAuthenticatedUserId: vi.fn(),
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: {
    $transaction: vi.fn(),
    profile: {
      upsert: vi.fn(),
      update: vi.fn(),
    },
    studyPlan: {
      findUnique: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
    },
    dailyTask: {
      findUnique: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      deleteMany: vi.fn(),
      createMany: vi.fn(),
    },
    dailySkillPractice: {
      upsert: vi.fn(),
    },
  },
  safeDbExecute: vi.fn(async (cb) => cb()),
}));

vi.mock("@/infrastructure/cache/dashboardCache", () => ({
  invalidateDashboardCache: vi.fn(),
}));

import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { GET as getCurrentPlan } from "@/app/api/study-plan/current/route";
import { POST as toggleTask } from "@/app/api/study-plan/task/route";
import { POST as generatePlan } from "@/app/api/study-plan/generate/route";

describe("Study Plan & Daily Tasks Standards (/api/study-plan/*)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/study-plan/current", () => {
    it("1. Returns adaptive default plan for guest users without querying DB", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue(null);

      const req = new Request("http://localhost:3000/api/study-plan/current");
      const res = await getCurrentPlan(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.id).toBe("adaptive_default_plan");
      expect(prisma.studyPlan.findUnique).not.toHaveBeenCalled();
    });

    it("2. Queries study plan with selective projection and bounded daily tasks (take: 60)", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_learner_1");

      const todayStr = new Date().toISOString().slice(0, 10);
      vi.mocked(prisma.studyPlan.findUnique).mockResolvedValue({
        id: "plan_real_1",
        userId: "user_learner_1",
        targetExam: "IELTS",
        targetScore: 7,
        dailyTasks: [
          {
            id: "task_1",
            planId: "plan_real_1",
            date: todayStr,
            taskType: "reading",
            description: "Read 1 passage",
            isCompleted: false,
          },
        ],
      } as any);

      const req = new Request("http://localhost:3000/api/study-plan/current");
      const res = await getCurrentPlan(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.id).toBe("plan_real_1");

      expect(prisma.studyPlan.findUnique).toHaveBeenCalledWith({
        where: { userId: "user_learner_1" },
        select: expect.objectContaining({
          id: true,
          dailyTasks: expect.objectContaining({
            take: 60,
            orderBy: { date: "asc" },
          }),
        }),
      });
    });
  });

  describe("POST /api/study-plan/task", () => {
    it("3. Forbids non-owner from toggling someone else's daily task", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("hacker_user");
      vi.mocked(prisma.dailyTask.findUnique).mockResolvedValue({
        id: "task_victim",
        isCompleted: false,
        xpReward: 20,
        taskType: "vocabulary",
        plan: { userId: "legit_owner" },
      } as any);

      const req = new Request("http://localhost:3000/api/study-plan/task", {
        method: "POST",
        body: JSON.stringify({ taskId: "task_victim" }),
      });

      const res = await toggleTask(req);
      const json = await res.json();

      expect(res.status).toBe(403);
      expect(json.error).toBe("Forbidden");
    });

    it("4. Atomically marks task completed, awards XP once, syncs DailySkillPractice, and invalidates cache", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_learner_1");
      vi.mocked(prisma.dailyTask.findUnique).mockResolvedValue({
        id: "task_owned",
        isCompleted: false,
        xpReward: 25,
        taskType: "listening",
        plan: { userId: "user_learner_1" },
      } as any);

      const mockTx = {
        dailyTask: {
          update: vi.fn(),
          updateMany: vi.fn().mockResolvedValue({ count: 1 }), // successfully claimed
          findUniqueOrThrow: vi.fn().mockResolvedValue({
            id: "task_owned",
            isCompleted: true,
            xpClaimed: true,
          }),
        },
        profile: {
          update: vi.fn().mockResolvedValue({
            id: "user_learner_1",
            totalXp: 325,
            level: 3,
            title: "Scholar",
            coins: 100,
          }),
        },
        dailySkillPractice: {
          upsert: vi.fn().mockResolvedValue({ id: "dsp_task_1" }),
        },
      };

      vi.mocked(prisma.$transaction).mockImplementation(async (cb: any) => {
        return await cb(mockTx);
      });

      const req = new Request("http://localhost:3000/api/study-plan/task", {
        method: "POST",
        body: JSON.stringify({ taskId: "task_owned" }),
      });

      const res = await toggleTask(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      // Verify atomic claim query
      expect(mockTx.dailyTask.updateMany).toHaveBeenCalledWith({
        where: { id: "task_owned", xpClaimed: false },
        data: { isCompleted: true, xpClaimed: true },
      });

      // Verify DailySkillPractice synced with skill: "dictation" for listening tasks
      expect(mockTx.dailySkillPractice.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId_skill_date: expect.objectContaining({
              userId: "user_learner_1",
              skill: "dictation",
            }),
          }),
          update: expect.objectContaining({ xpEarned: { increment: 25 } }),
        })
      );

      // Verify dashboard cache invalidated
      expect(invalidateDashboardCache).toHaveBeenCalledWith("user_learner_1");
    });
  });

  describe("POST /api/study-plan/generate", () => {
    it("5. Generates 30-day curriculum inside transaction with selective projection and cache invalidation", async () => {
      vi.mocked(getAuthenticatedUserId).mockResolvedValue("user_gen_1");

      const mockTx = {
        studyPlan: {
          findUnique: vi.fn().mockResolvedValue({ id: "old_plan" }),
          delete: vi.fn().mockResolvedValue({ id: "old_plan" }),
          create: vi.fn().mockResolvedValue({ id: "new_plan_1" }),
        },
        dailyTask: {
          deleteMany: vi.fn().mockResolvedValue({ count: 10 }),
          createMany: vi.fn().mockResolvedValue({ count: 30 }),
        },
      };

      vi.mocked(prisma.$transaction).mockImplementation(async (cb: any) => {
        return await cb(mockTx);
      });

      const req = new Request("http://localhost:3000/api/study-plan/generate", {
        method: "POST",
        body: JSON.stringify({
          targetExam: "TOEIC",
          targetScore: 800,
          currentLevel: "Intermediate",
          weeklyHours: 8,
        }),
      });

      const res = await generatePlan(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);

      expect(mockTx.studyPlan.findUnique).toHaveBeenCalledWith({
        where: { userId: "user_gen_1" },
        select: { id: true },
      });
      expect(mockTx.dailyTask.createMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({ planId: "new_plan_1" }),
          ]),
        })
      );
      expect(invalidateDashboardCache).toHaveBeenCalledWith("user_gen_1");
    });
  });
});
