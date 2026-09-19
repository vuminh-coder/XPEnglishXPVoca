import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

function calculateLevelAndTitle(xp: number, currentLevel: number) {
  const levelXp = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000];
  let newLevel = currentLevel;
  while (newLevel < levelXp.length && xp >= levelXp[newLevel]) newLevel++;
  return { level: newLevel, title: LEVEL_TITLES[newLevel] || "Grandmaster" };
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const taskId = typeof body?.taskId === "string" ? body.taskId : "";
    const isCompleted = body?.isCompleted;
    if (!taskId) return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
      return NextResponse.json({ error: "isCompleted must be a boolean" }, { status: 400 });
    }

    const task = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      select: { id: true, isCompleted: true, xpReward: true, plan: { select: { userId: true } } },
    });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    if (task.plan.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const targetState = typeof isCompleted === "boolean" ? isCompleted : !task.isCompleted;
    const result = await prisma.$transaction(async (tx) => {
      if (!targetState) {
        const updatedTask = await tx.dailyTask.update({
          where: { id: taskId },
          data: { isCompleted: false },
        });
        return { updatedTask, updatedProfile: null, xpAwarded: 0 };
      }

      // The predicate and flag update happen in one statement. Only one of any
      // concurrent requests can transition an unclaimed task to claimed.
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

      const xpAwarded = task.xpReward || 20;
      const profileAfterXp = await tx.profile.update({
        where: { id: userId },
        data: { totalXp: { increment: xpAwarded } },
        select: { id: true, totalXp: true, level: true, title: true, coins: true },
      });
      const next = calculateLevelAndTitle(profileAfterXp.totalXp, profileAfterXp.level);
      const updatedProfile = next.level === profileAfterXp.level
        ? profileAfterXp
        : await tx.profile.update({
            where: { id: userId },
            data: { level: next.level, title: next.title },
            select: { id: true, totalXp: true, level: true, title: true, coins: true },
          });
      const updatedTask = await tx.dailyTask.findUniqueOrThrow({ where: { id: taskId } });
      return { updatedTask, updatedProfile, xpAwarded };
    }, {
      maxWait: 10000,
      timeout: 15000,
    });

    invalidateDashboardCache(userId);

    return NextResponse.json({ success: true, data: result.updatedTask, profile: result.updatedProfile, xpAwarded: result.xpAwarded });
  } catch (error) {
    console.error("POST /api/study-plan/task-complete error:", error);
    return NextResponse.json({ error: "Unable to update task completion" }, { status: 500 });
  }
}
