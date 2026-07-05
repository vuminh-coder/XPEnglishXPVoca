import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plan = await prisma.studyPlan.findUnique({
      where: { userId: userId },
      include: {
        dailyTasks: {
          orderBy: { date: "asc" },
        },
      },
    });

    if (!plan) {
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    console.error("GET /api/study-plan/current error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
