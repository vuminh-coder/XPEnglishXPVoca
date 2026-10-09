import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { isRateLimited } from "@/infrastructure/security/rateLimit";
import { memoryCache } from "@/infrastructure/cache/memoryCache";

import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const mode = searchParams.get("mode") || "all";
    let userId = searchParams.get("userId");

    if (!userId) {
      userId = await getAuthenticatedUserId(request);
    }

    const limitParam = searchParams.get("limit");
    const takeLimit = limitParam ? Math.min(200, Math.max(1, parseInt(limitParam, 10))) : 150;

    const isPersonalized = Boolean(userId && !userId.startsWith("guest") && userId !== "guest_user");
    const cacheControlHeader = isPersonalized
      ? "private, no-cache, no-store, must-revalidate"
      : "public, s-maxage=60, stale-while-revalidate=120";

    const cacheKey = `listening_lessons:${mode}:${category || "ALL"}:${level || "ALL"}:${search || ""}:${userId || "guest"}:${takeLimit}`;
    const cached = memoryCache.get<any[]>(cacheKey);
    if (cached) {
      return NextResponse.json(
        {
          success: true,
          data: cached,
        },
        {
          headers: {
            "Cache-Control": cacheControlHeader,
            "X-Cache": "HIT",
          },
        }
      );
    }

    const whereClause: any = {};
    if (category && category !== "ALL") {
      whereClause.category = category;
    }
    if (level && level !== "ALL") {
      whereClause.level = level;
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }
    if (mode === "audio") {
      whereClause.NOT = [
        { id: { startsWith: "vid_" } },
        { audioUrl: { contains: "youtube.com" } },
        { audioUrl: { contains: "youtu.be" } },
      ];
    }

    let result = await safeDbExecute(async () => {
      const isAudioOnly = mode === "audio";
      const isVideoOnly = mode === "video";

      const [lessons, videoLessons] = await Promise.all([
        isVideoOnly
          ? Promise.resolve([])
          : prisma.listeningLesson.findMany({
              where: whereClause,
              orderBy: { orderIndex: "asc" },
              take: takeLimit,
              select: {
                id: true,
                title: true,
                category: true,
                level: true,
                duration: true,
                accent: true,
                audioUrl: true,
                imageUrl: true,
                orderIndex: true,
                progresses: userId
                  ? {
                      where: { userId },
                      take: 1,
                      select: {
                        status: true,
                        completedSentences: true,
                        bookmarkedSentences: true,
                        lastPracticedAt: true,
                      },
                    }
                  : false,
              },
            }),
        isAudioOnly
          ? Promise.resolve([])
          : prisma.videoLesson.findMany({
              take: 40,
              orderBy: { createdAt: "desc" },
              include: {
                category: true,
                _count: { select: { segments: true } },
              },
            }),
      ]);

      const listeningItems = lessons.map((lesson: any) => {
        const userProgress = lesson.progresses?.[0] || null;
        const completedCount = Array.isArray(userProgress?.completedSentences)
          ? userProgress.completedSentences.length
          : 0;

        const isCompleted = userProgress?.status === "COMPLETED";

        return {
          id: lesson.id,
          title: lesson.title,
          category: lesson.category,
          level: lesson.level,
          duration: lesson.duration,
          accent: lesson.accent,
          audioUrl: lesson.audioUrl,
          imageUrl: lesson.imageUrl,
          userStatus: isCompleted ? "COMPLETED" : userProgress?.status || "NOT_STARTED",
          completedSentencesCount: completedCount,
          completedSentences: userProgress?.completedSentences || [],
          bookmarkedSentences: userProgress?.bookmarkedSentences || [],
          lastPracticedAt: userProgress?.lastPracticedAt || null,
        };
      });

      const videoItems = videoLessons.map((vl: any) => ({
        id: vl.id,
        title: vl.title,
        category: vl.category?.name || "Video Tuyển Chọn",
        level: vl.cefrLevel || "B1",
        duration: vl.durationFormatted || "03:00",
        accent: vl.accent || "en-US",
        audioUrl: vl.externalId ? `https://www.youtube.com/watch?v=${vl.externalId}` : "",
        imageUrl: vl.thumbnailUrl,
        userStatus: "NOT_STARTED",
        completedSentencesCount: 0,
        completedSentences: [],
        bookmarkedSentences: [],
        lastPracticedAt: null,
        isVideo: true,
        externalId: vl.externalId,
        totalSentences: vl._count?.segments || 0,
      }));

      // Merge and deduplicate by id
      const seenIds = new Set<string>();
      const combined = [...listeningItems, ...videoItems].filter((item) => {
        if (seenIds.has(item.id)) return false;
        seenIds.add(item.id);
        return true;
      });

      return combined;
    }, "Fetch Listening Lessons");

    // Fallback to MOCK_LESSONS_DATA if database table is empty
    if (!result || result.length === 0) {
      let filteredMocks = [...MOCK_LESSONS_DATA];
      if (mode === "audio") {
        filteredMocks = filteredMocks.filter(
          (l: any) =>
            !l.id?.startsWith("vid_") &&
            !l.audioUrl?.includes("youtube") &&
            !l.audioUrl?.includes("youtu.be") &&
            !l.audio_url?.includes("youtube") &&
            !l.audio_url?.includes("youtu.be")
        );
      } else if (mode === "video") {
        filteredMocks = [];
      }
      if (category && category !== "ALL") {
        filteredMocks = filteredMocks.filter((l) => l.category === category);
      }
      if (level && level !== "ALL") {
        filteredMocks = filteredMocks.filter((l) => l.level === level);
      }
      if (search) {
        const q = search.toLowerCase();
        filteredMocks = filteredMocks.filter(
          (l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)
        );
      }

      result = filteredMocks.slice(0, takeLimit).map((lesson) => {
        const totalSentences = lesson.transcript?.length || 0;
        return {
          id: lesson.id,
          title: lesson.title,
          category: lesson.category,
          level: lesson.level,
          duration: lesson.duration,
          accent: lesson.accent,
          audioUrl: lesson.audioUrl,
          imageUrl: lesson.imageUrl,
          transcript: lesson.transcript,
          totalSentences,
          userStatus: "NOT_STARTED",
          userProgressPercent: 0,
          completedSentencesCount: 0,
          completedSentences: [],
          bookmarkedSentences: [],
          lastPracticedAt: null,
        };
      });
    }

    if (result && result.length > 0) {
      memoryCache.set(cacheKey, result, 60);
    }

    return NextResponse.json(
      {
        success: true,
        data: result || [],
      },
      {
        headers: {
          "Cache-Control": cacheControlHeader,
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = (await getAuthenticatedUserId(request)) || "guest_user";

    // Rate limiting: max 10 custom lessons created per minute
    if (isRateLimited(`create_lesson_${userId}`, 10, 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Bạn thao tác quá nhanh. Vui lòng chờ giây lát." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      title,
      category = "Bài học của bạn (Custom AI)",
      level = "B1",
      duration = "3 min",
      accent = "en-US",
      audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      imageUrl,
      transcript = [],
      vocabList = [],
      grammarNotes = [],
    } = body;

    if (!title || !transcript || !Array.isArray(transcript) || transcript.length === 0) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp tiêu đề và nội dung đoạn văn bài học." },
        { status: 400 }
      );
    }

    const newLesson = await safeDbExecute(async () => {
      // Find highest orderIndex
      const lastLesson = await prisma.listeningLesson.findFirst({
        orderBy: { orderIndex: "desc" },
        select: { orderIndex: true },
      });
      const nextOrder = (lastLesson?.orderIndex || 0) + 1;

      return await prisma.listeningLesson.create({
        data: {
          title: title.trim(),
          category,
          level,
          duration,
          accent,
          audioUrl,
          imageUrl:
            imageUrl ||
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60",
          transcript,
          vocabList,
          grammarNotes,
          orderIndex: nextOrder,
        },
      });
    }, "Create Custom Listening Lesson");

    // Invalidate listening lessons cache so the newly created lesson appears immediately
    memoryCache.invalidatePattern("listening_lessons:");

    return NextResponse.json({
      success: true,
      data: newLesson,
      message: "Tạo bài nghe thành công và đã lưu vào CSDL.",
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json(
      { success: false, error: prismaErr.error },
      { status: prismaErr.status }
    );
  }
}
