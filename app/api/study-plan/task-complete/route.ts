import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";

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
    const { taskId, isCompleted } = body;

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const task = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      include: { plan: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.plan.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const targetState = typeof isCompleted === "boolean" ? isCompleted : !task.isCompleted;

    const result = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.dailyTask.update({
        where: { id: taskId },
        data: { isCompleted: targetState },
      });

      let updatedProfile = null;
      if (targetState && !task.isCompleted) {
        const profile = await tx.profile.findUnique({
          where: { id: userId },
        });

        if (profile) {
          const xpToAdd = task.xpReward || 20;
          const newXp = profile.totalXp + xpToAdd;
          const { level: newLevel, title: newTitle } = calculateLevelAndTitle(
            newXp,
            profile.level
          );

          updatedProfile = await tx.profile.update({
            where: { id: userId },
            data: {
              totalXp: newXp,
              level: newLevel,
              title: newTitle,
            },
          });
        }
      }

      return { updatedTask, updatedProfile };
    });

    return NextResponse.json({
      success: true,
      data: result.updatedTask,
      profile: result.updatedProfile,
    });
  } catch (error: any) {
    console.error("POST /api/study-plan/task-complete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
