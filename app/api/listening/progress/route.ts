import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function POST(request: Request) {
  try {
    let authUserId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const {
      userId: bodyUserId,
      lessonId,
      status = "IN_PROGRESS",
      completedSentences = [],
      bookmarkedSentences = [],
      inlineAiScores = {},
      timeSpent = 0,
      xpEarned = 0,
      skill = "dictation",
    } = body;

    const userId = authUserId || bodyUserId;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const addedMinutes = Math.max(0, Math.ceil(timeSpent / 60));

    const result = await safeDbExecute(async () => {
      return await prisma.$transaction(async (tx) => {
        // 1. Upsert ListeningProgress
        const progress = await tx.listeningProgress.upsert({
          where: {
            userId_lessonId: { userId, lessonId },
          },
          update: {
            status,
            completedSentences,
            bookmarkedSentences,
            inlineAiScores,
            timeSpent: { increment: timeSpent },
            lastPracticedAt: new Date(),
          },
          create: {
            userId,
            lessonId,
            status,
            completedSentences,
            bookmarkedSentences,
            inlineAiScores,
            timeSpent,
          },
        });

        // 2. Award XP and update profile metrics for real authenticated users
        if (
          userId &&
          userId !== "guest_user" &&
          userId !== "guest-user" &&
          userId !== "local_user" &&
          !userId.startsWith("guest")
        ) {
          // Update Profile
          if (xpEarned > 0 || addedMinutes > 0) {
            await tx.profile.update({
              where: { id: userId },
              data: {
                ...(xpEarned > 0 ? { totalXp: { increment: xpEarned } } : {}),
                ...(addedMinutes > 0 ? { minutesStudied: { increment: addedMinutes } } : {}),
                updatedAt: new Date(),
              },
            });
          }

          // Upsert DailySkillPractice for "dictation" or "shadowing"
          if (addedMinutes > 0 || xpEarned > 0) {
            await tx.dailySkillPractice.upsert({
              where: {
                userId_skill_date: {
                  userId,
                  skill: skill || "dictation",
                  date: todayStr,
                },
              },
              update: {
                minutes: { increment: addedMinutes },
                xpEarned: { increment: xpEarned },
                updatedAt: new Date(),
              },
              create: {
                userId,
                skill: skill || "dictation",
                date: todayStr,
                minutes: addedMinutes,
                xpEarned: xpEarned,
              },
            });
          }
        }

        return progress;
      });
    }, "Save Listening Progress");

    return NextResponse.json({
      success: true,
      data: result,
      message: "Tiến độ bài nghe đã được lưu vào CSDL thành công.",
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    let authUserId = await getAuthenticatedUserId(request);
    let bodyUserId: string | null = null;
    let bodyLessonId: string | null = null;

    try {
      const body = await request.json();
      if (body) {
        bodyUserId = body.userId;
        bodyLessonId = body.lessonId;
      }
    } catch {
      // Body may be empty if passing query parameters
    }

    const { searchParams } = new URL(request.url);
    const queryUserId = searchParams.get("userId");
    const queryLessonId = searchParams.get("lessonId");

    const userId = authUserId || bodyUserId || queryUserId;
    const lessonId = bodyLessonId || queryLessonId;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    const deleteResult = await safeDbExecute(async () => {
      return await prisma.listeningProgress.deleteMany({
        where: {
          userId,
          lessonId,
        },
      });
    }, "Delete Listening Progress");

    return NextResponse.json({
      success: true,
      data: deleteResult,
      message: "Đã tự động xóa bản ghi tiến độ bài nghe trong CSDL thành công.",
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
