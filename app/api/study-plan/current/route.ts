import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const todayStr = new Date().toISOString().slice(0, 10);

    // Smart Adaptive Fallback task if not authenticated or no plan configured yet
    const fallbackPlan = {
      id: "adaptive_default_plan",
      title: "Kế Hoạch Học Tập Toàn Diện",
      dailyTasks: [
        {
          id: `task_${todayStr}`,
          date: todayStr,
          description: "Luyện nghe chép Dictation 10 phút & nâng cao vốn từ",
          isCompleted: false,
        },
      ],
    };

    if (!userId || userId === "guest_user" || userId === "local_user") {
      return NextResponse.json({ success: true, data: fallbackPlan });
    }

    const plan = await safeDbExecute(async () => {
      return await prisma.studyPlan.findUnique({
        where: { userId },
        include: {
          dailyTasks: {
            orderBy: { date: "asc" },
          },
        },
      });
    }, "Get Current Study Plan");

    if (!plan || !plan.dailyTasks || plan.dailyTasks.length === 0) {
      return NextResponse.json({ success: true, data: fallbackPlan });
    }

    // Check if there is a task for today, otherwise inject today's adaptive task
    const hasTodayTask = plan.dailyTasks.some((t: any) => {
      const taskDate = new Date(t.date).toISOString().slice(0, 10);
      return taskDate === todayStr;
    });

    if (!hasTodayTask) {
      plan.dailyTasks.push({
        id: `auto_task_${todayStr}`,
        studyPlanId: plan.id,
        date: new Date(),
        description: "Luyện nghe chép Dictation 10 phút & ôn tập từ vựng",
        isCompleted: false,
      } as any);
    }

    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    console.error("GET /api/study-plan/current error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
