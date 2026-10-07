import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { EXTENDED_SHADOWING_LESSONS } from "@/features/shadowing/data/extendedShadowingData";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

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
        // 0. Ensure foreign key constraint is satisfied: Self-heal if lesson is a video lesson or known mock/shadowing lesson
        let targetLessonId = lessonId;
        const existingLesson = await tx.listeningLesson.findUnique({
          where: { id: lessonId },
          select: { id: true },
        });

        if (!existingLesson) {
          // Check if it's a VideoLesson in DB (match by id, slug, or externalId)
          const videoLesson = await tx.videoLesson.findFirst({
            where: {
              OR: [
                { id: lessonId },
                { slug: lessonId },
                { externalId: lessonId },
              ],
            },
            include: { category: true, segments: { orderBy: { orderIndex: "asc" } } },
          });

          if (videoLesson) {
            targetLessonId = videoLesson.id;
            const existingVideoInListening = await tx.listeningLesson.findUnique({
              where: { id: videoLesson.id },
              select: { id: true },
            });

            if (!existingVideoInListening) {
              await tx.listeningLesson.create({
                data: {
                  id: videoLesson.id,
                  title: videoLesson.title,
                  category: videoLesson.category?.name || "Video Catalog",
                  level: videoLesson.cefrLevel || "Intermediate",
                  duration: videoLesson.durationFormatted || "05:00",
                  accent: videoLesson.accent || "en-US",
                  audioUrl: videoLesson.externalId ? `https://www.youtube.com/watch?v=${videoLesson.externalId}` : "",
                  imageUrl: videoLesson.thumbnailUrl || "",
                  transcript: videoLesson.segments.map((seg, idx) => ({
                    id: seg.id || `seg_${idx + 1}`,
                    startTime: seg.startTime,
                    endTime: seg.endTime,
                    text: seg.text,
                    ipaUs: seg.ipaUs || "",
                    ipaUk: seg.ipaUk || "",
                    translationVi: seg.translationVi,
                    explanationVi: seg.explanationAi || "",
                    properNouns: seg.properNouns || [],
                    keywords: seg.keywords || [],
                  })),
                  vocabList: [],
                  grammarNotes: [],
                  orderIndex: 9999,
                },
              });
            }
          } else {
            const known =
              MOCK_LESSONS_DATA.find((l) => l.id === lessonId) ||
              (EXTENDED_SHADOWING_LESSONS as any[]).find((l) => l.id === lessonId);

            const mockVideo = MOCK_VIDEO_LESSONS.find(
              (v) => v.id === lessonId || v.slug === lessonId || v.externalId === lessonId
            );

            if (known) {
              targetLessonId = known.id;
              const existingKnownInListening = await tx.listeningLesson.findUnique({
                where: { id: known.id },
                select: { id: true },
              });
              if (!existingKnownInListening) {
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
            } else if (mockVideo) {
              targetLessonId = mockVideo.id;
              const existingMockInListening = await tx.listeningLesson.findUnique({
                where: { id: mockVideo.id },
                select: { id: true },
              });
              if (!existingMockInListening) {
                await tx.listeningLesson.create({
                  data: {
                    id: mockVideo.id,
                    title: mockVideo.title,
                    category: mockVideo.categoryName || "Video Catalog",
                    level: mockVideo.cefrLevel || "Intermediate",
                    duration: mockVideo.durationFormatted || "05:00",
                    accent: mockVideo.accent || "en-US",
                    audioUrl: `https://www.youtube.com/watch?v=${mockVideo.externalId}`,
                    imageUrl: mockVideo.thumbnailUrl || "",
                    transcript: mockVideo.segments.map((seg, idx) => ({
                      id: `seg_${idx + 1}`,
                      startTime: seg.startTime,
                      endTime: seg.endTime,
                      text: seg.text,
                      ipaUs: seg.ipaUs || "",
                      ipaUk: "",
                      translationVi: seg.translationVi,
                      explanationVi: seg.explanationAi || "",
                      properNouns: seg.properNouns || [],
                      keywords: seg.keywords || [],
                    })),
                    vocabList: [],
                    grammarNotes: [],
                    orderIndex: 9999,
                  },
                });
              }
            }
          }
        }

        // Fetch previous timeSpent to calculate session delta instead of accumulating total quadratically
        const prevProgress = await tx.listeningProgress.findFirst({
          where: {
            userId,
            OR: [
              { lessonId: targetLessonId },
              ...(targetLessonId !== lessonId ? [{ lessonId }] : []),
            ],
          },
          select: { timeSpent: true },
        });

        const prevTime = prevProgress?.timeSpent || 0;
        const updatedTime = Math.max(prevTime, safeTimeSpent);
        const deltaSeconds = Math.max(0, updatedTime - prevTime);
        const dynamicAddedMinutes = Math.floor(deltaSeconds / 60);

        // 1. Upsert ListeningProgress
        const progress = await tx.listeningProgress.upsert({
          where: {
            userId_lessonId: { userId, lessonId: targetLessonId },
          },
          update: {
            status,
            completedSentences,
            bookmarkedSentences,
            inlineAiScores,
            timeSpent: updatedTime,
            lastPracticedAt: new Date(),
          },
          create: {
            userId,
            lessonId: targetLessonId,
            status,
            completedSentences,
            bookmarkedSentences,
            inlineAiScores,
            timeSpent: updatedTime,
          },
        });

        // Increment videoLesson studyCount if this is a video lesson
        if (status === "COMPLETED") {
          try {
            await tx.videoLesson.updateMany({
              where: {
                OR: [
                  { id: targetLessonId },
                  { id: lessonId },
                ],
              },
              data: { studyCount: { increment: 1 } },
            });
          } catch {}
        }

        // 2. Award XP and update profile metrics for real authenticated users
        if (
          userId &&
          userId !== "guest_user" &&
          userId !== "guest-user" &&
          userId !== "local_user" &&
          !userId.startsWith("guest")
        ) {
          // Update Profile
          if (safeXpEarned > 0 || dynamicAddedMinutes > 0) {
            await tx.profile.update({
              where: { id: userId },
              data: {
                ...(safeXpEarned > 0 ? { totalXp: { increment: safeXpEarned } } : {}),
                ...(dynamicAddedMinutes > 0 ? { minutesStudied: { increment: dynamicAddedMinutes } } : {}),
                updatedAt: new Date(),
              },
            });
          }

          // Upsert DailySkillPractice for "dictation" or "shadowing"
          if (dynamicAddedMinutes > 0 || safeXpEarned > 0) {
            await tx.dailySkillPractice.upsert({
              where: {
                userId_skill_date: {
                  userId,
                  skill: skill || "dictation",
                  date: todayStr,
                },
              },
              update: {
                ...(dynamicAddedMinutes > 0 ? { minutes: { increment: dynamicAddedMinutes } } : {}),
                ...(safeXpEarned > 0 ? { xpEarned: { increment: safeXpEarned } } : {}),
                updatedAt: new Date(),
              },
              create: {
                userId,
                skill: skill || "dictation",
                date: todayStr,
                minutes: Math.max(1, dynamicAddedMinutes),
                xpEarned: safeXpEarned,
              },
            });
          }
        }

        return { ...progress, targetLessonId };
    });

    if (userId && !userId.startsWith("guest") && userId !== "local_user") {
      invalidateDashboardCache(userId);
    }

    // Invalidate detail cache for both input lessonId and canonical targetLessonId
    const resolvedId = (result as any)?.targetLessonId || lessonId;
    memoryCache.delete(`listening_lesson_detail:${lessonId}:${userId}`);
    memoryCache.delete(`listening_lesson_detail:${resolvedId}:${userId}`);
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${lessonId}`));
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${resolvedId}`));
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

    let targetLessonId = lessonId;
    const existing = await prisma.listeningLesson.findFirst({
      where: { id: lessonId },
      select: { id: true },
    });
    if (!existing) {
      const video = await prisma.videoLesson.findFirst({
        where: {
          OR: [{ id: lessonId }, { slug: lessonId }, { externalId: lessonId }],
        },
        select: { id: true },
      });
      if (video) targetLessonId = video.id;
    }

    const deleteResult = await prisma.listeningProgress.deleteMany({
      where: {
        userId,
        lessonId: { in: [lessonId, targetLessonId] },
      },
    });

    memoryCache.delete(`listening_lesson_detail:${lessonId}:${userId}`);
    memoryCache.delete(`listening_lesson_detail:${targetLessonId}:${userId}`);
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${lessonId}`));
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${targetLessonId}`));
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
