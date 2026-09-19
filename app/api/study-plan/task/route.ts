import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

// Helper to calculate level and title from XP
function calculateLevelAndTitle(xp: number, currentLevel: number) {
  const LEVEL_XP = [
    0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
    7600, 9200, 11000,
  ];
  let newLevel = currentLevel;
  while (newLevel < LEVEL_XP.length && xp >= LEVEL_XP[newLevel]) {
    newLevel++;
  }
  const newTitle = LEVEL_TITLES[newLevel] || "Grandmaster";
  return { level: newLevel, title: newTitle };
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { taskId } = body;

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    // Find the task
    const task = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      include: { plan: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Ensure current user owns the plan
    if (task.plan.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const targetState = !task.isCompleted;

    // Transactionally toggle task and update Profile XP with atomic one-time reward check
    const result = await prisma.$transaction(async (tx) => {
      if (!targetState) {
        const updatedTask = await tx.dailyTask.update({
          where: { id: taskId },
          data: { isCompleted: false },
        });
        return { updatedTask, updatedProfile: null, xpAwarded: 0 };
      }

      const claim = await tx.dailyTask.updateMany({
        where: { id: taskId, xpClaimed: false },
        data: { isCompleted: true, xpClaimed: true },
      });

      if (claim.count === 0) {
        const updatedTask = await tx.dailyTask.update({
          where: { id: taskId },
          data: { isCompleted: true },
        });
        return { updatedTask, updatedProfile: null, xpAwarded: 0 };
      }

      const xpToAdd = task.xpReward || 20;
      const profileAfterXp = await tx.profile.update({
        where: { id: userId },
        data: { totalXp: { increment: xpToAdd } },
        select: { id: true, totalXp: true, level: true, title: true, coins: true },
      });

      const { level: newLevel, title: newTitle } = calculateLevelAndTitle(
        profileAfterXp.totalXp,
        profileAfterXp.level
      );

      const updatedProfile = newLevel === profileAfterXp.level
        ? profileAfterXp
        : await tx.profile.update({
            where: { id: userId },
            data: { level: newLevel, title: newTitle },
            select: { id: true, totalXp: true, level: true, title: true, coins: true },
          });

      const updatedTask = await tx.dailyTask.findUniqueOrThrow({ where: { id: taskId } });
      return { updatedTask, updatedProfile, xpAwarded: xpToAdd };
    }, {
      maxWait: 10000,
      timeout: 15000,
    });

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      data: result.updatedTask,
      profile: result.updatedProfile,
    });
  } catch (error: any) {
    console.error("POST /api/study-plan/task error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
