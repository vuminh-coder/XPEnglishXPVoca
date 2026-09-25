import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { EXTENDED_SHADOWING_LESSONS } from "@/features/shadowing/data/extendedShadowingData";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const {
      lessonId,
      status = "IN_PROGRESS",
      completedSentences = [],
      bookmarkedSentences = [],
      inlineAiScores = {},
      timeSpent = 0,
      xpEarned = 0,
      skill = "dictation",
    } = body;

    // Progress changes XP and personal records; the request body must not choose
    // which account is written to.
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (typeof lessonId !== "string" || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    if (
      !["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].includes(status) ||
      !Array.isArray(completedSentences) ||
      !Array.isArray(bookmarkedSentences) ||
      typeof inlineAiScores !== "object" ||
      inlineAiScores === null
    ) {
      return NextResponse.json({ success: false, error: "Invalid progress payload" }, { status: 400 });
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const safeTimeSpent = Math.min(14_400, Math.max(0, Number(timeSpent) || 0));
    const safeXpEarned = Math.min(100, Math.max(0, Math.floor(Number(xpEarned) || 0)));
    const addedMinutes = Math.ceil(safeTimeSpent / 60);

    const result = await prisma.$transaction(async (tx) => {
        // 0. Ensure foreign key constraint is satisfied: Self-heal if lesson is a known mock/shadowing lesson
        const existingLesson = await tx.listeningLesson.findUnique({
          where: { id: lessonId },
          select: { id: true },
        });

        if (!existingLesson) {
          const known =
            MOCK_LESSONS_DATA.find((l) => l.id === lessonId) ||
            (EXTENDED_SHADOWING_LESSONS as any[]).find((l) => l.id === lessonId);

          if (known) {
            await tx.listeningLesson.create({
              data: {
                id: known.id,
                title: known.title,
                category: (known as any).category || "General",
                level: known.level || "Intermediate",
                duration: known.duration || "03:00",
                accent: (known as any).accent || "en-US",
                audioUrl: (known as any).audioUrl || (known as any).audio_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                imageUrl: (known as any).imageUrl || "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
                transcript: (known as any).transcript || [],
                vocabList: (known as any).vocabList || (known as any).vocabularyList || [],
                grammarNotes: (known as any).grammarNotes || [],
                orderIndex: 9999,
              },
            });
          }
        }

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
            timeSpent: { increment: safeTimeSpent },
            lastPracticedAt: new Date(),
          },
          create: {
            userId,
            lessonId,
            status,
            completedSentences,
            bookmarkedSentences,
            inlineAiScores,
            timeSpent: safeTimeSpent,
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
          if (safeXpEarned > 0 || addedMinutes > 0) {
            await tx.profile.update({
              where: { id: userId },
              data: {
                ...(safeXpEarned > 0 ? { totalXp: { increment: safeXpEarned } } : {}),
                ...(addedMinutes > 0 ? { minutesStudied: { increment: addedMinutes } } : {}),
                updatedAt: new Date(),
              },
            });
          }

          // Upsert DailySkillPractice for "dictation" or "shadowing"
          if (addedMinutes > 0 || safeXpEarned > 0) {
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
                xpEarned: { increment: safeXpEarned },
                updatedAt: new Date(),
              },
              create: {
                userId,
                skill: skill || "dictation",
                date: todayStr,
                minutes: addedMinutes,
                xpEarned: safeXpEarned,
              },
            });
          }
        }

        return progress;
    });

    if (userId && !userId.startsWith("guest") && userId !== "local_user") {
      invalidateDashboardCache(userId);
    }

    // Invalidate detail cache for this lesson so the latest progress is returned on next fetch
    memoryCache.delete(`listening_lesson_detail:${lessonId}:${userId}`);
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${lessonId}`));
    memoryCache.invalidatePattern(/listening_lessons/);

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
    const userId = await getAuthenticatedUserId(request);
    let bodyLessonId: string | null = null;

    try {
      const body = await request.json();
      if (body) {
        bodyLessonId = body.lessonId;
      }
    } catch {
      // Body may be empty if passing query parameters
    }

    const { searchParams } = new URL(request.url);
    const queryLessonId = searchParams.get("lessonId");

    const lessonId = bodyLessonId || queryLessonId;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    const deleteResult = await prisma.listeningProgress.deleteMany({
      where: {
        userId,
        lessonId,
      },
    });

    memoryCache.delete(`listening_lesson_detail:${lessonId}:${userId}`);
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${lessonId}`));
    memoryCache.invalidatePattern(/listening_lessons/);

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
