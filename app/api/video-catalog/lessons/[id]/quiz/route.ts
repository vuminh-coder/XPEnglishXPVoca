import { NextRequest, NextResponse } from "next/server";
import { getVideoLessonQuiz } from "@/features/listening/services/videoComprehensionService";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu mã định danh bài học" },
        { status: 400 }
      );
    }

    const quizData = await getVideoLessonQuiz(id);

    // Return with safe public cache headers (questions are static for given lesson)
    return NextResponse.json(
      { success: true, quiz: quizData },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error: any) {
    console.error("[API Video Quiz GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Không thể tải bộ câu hỏi đọc hiểu cho bài học này.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { answers, timeSpentSeconds = 60 } = body as {
      answers: number[];
      timeSpentSeconds?: number;
    };

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, error: "Định dạng câu trả lời không hợp lệ" },
        { status: 400 }
      );
    }

    const quizData = await getVideoLessonQuiz(id);
    let correctCount = 0;

    const results = quizData.questions.map((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const scorePercentage = Math.round((correctCount / quizData.questions.length) * 100);
    const xpReward = Math.round((scorePercentage / 100) * quizData.xpReward);
    const userId = await getAuthenticatedUserId(req);

    if (userId && !userId.startsWith("guest_") && xpReward > 0) {
      try {
        const todayStr = new Date().toISOString().split("T")[0];
        const minutes = Math.max(1, Math.round(timeSpentSeconds / 60));

        await prisma.$transaction(async (tx) => {
          // 1. Update Profile XP
          await tx.profile.update({
            where: { id: userId },
            data: {
              totalXp: { increment: xpReward },
              minutesStudied: { increment: minutes },
            },
          });

          // 2. Upsert DailySkillPractice for reading skill
          await tx.dailySkillPractice.upsert({
            where: {
              userId_skill_date: {
                userId,
                skill: "reading",
                date: todayStr,
              },
            },
            create: {
              userId,
              date: todayStr,
              skill: "reading",
              xpEarned: xpReward,
              minutes: minutes,
            },
            update: {
              xpEarned: { increment: xpReward },
              minutes: { increment: minutes },
            },
          });
        });

        invalidateDashboardCache(userId);
      } catch (dbErr) {
        console.warn("[Video Quiz POST] Failed to update user XP in DB:", dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        summary: {
          totalQuestions: quizData.questions.length,
          correctCount,
          scorePercentage,
          xpEarned: xpReward,
          isPassed: scorePercentage >= 60,
        },
        results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API Video Quiz POST Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Không thể chấm điểm bài trắc nghiệm lúc này.",
      },
      { status: 500 }
    );
  }
}
