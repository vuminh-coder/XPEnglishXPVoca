import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEVEL_TITLES } from "@/lib/constants";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, isCompleted } = body;

    if (!taskId) {
      return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
    }

    const task = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      include: {
        plan: true,
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.plan.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Double check if status already matches to prevent double-awarding XP
    if (task.isCompleted === isCompleted) {
      return NextResponse.json({ success: true, data: task });
    }

    const xpToModify = isCompleted ? task.xpReward : -task.xpReward;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update task completion status
      const updatedTask = await tx.dailyTask.update({
        where: { id: taskId },
        data: { isCompleted: isCompleted },
      });

      // 2. Fetch current profile
      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      // 3. Update total XP
      let newXp = Math.max(0, profile.totalXp + xpToModify);
      let newLevel = profile.level;
      let levelUp = false;

      if (isCompleted) {
        // Check for level up
        while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
          newLevel++;
          levelUp = true;
        }
      } else {
        // Check for level down (optional, but keep it bounded)
        while (newLevel > 1 && newXp < LEVEL_XP[newLevel - 1]) {
          newLevel--;
        }
      }

      const newTitle = LEVEL_TITLES[newLevel] || profile.title;

      // 4. Save updated profile
      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: newXp,
          level: newLevel,
          title: newTitle,
        },
      });

      return {
        task: updatedTask,
        profile: updatedProfile,
        levelUp,
      };
    });

    return NextResponse.json({
      success: true,
      data: result.task,
      profile: result.profile,
      levelUp: result.levelUp,
    });
  } catch (error: any) {
    console.error("POST /api/study-plan/task-complete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
