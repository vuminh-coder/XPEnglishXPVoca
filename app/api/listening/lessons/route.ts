import { NextResponse } from "next/server";
import { prisma, safeDbExecute, handlePrismaError } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { isRateLimited } from "@/infrastructure/security/rateLimit";

import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    let userId = searchParams.get("userId");

    if (!userId) {
      userId = await getAuthenticatedUserId(request);
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

    let result = await safeDbExecute(async () => {
      const lessons = await prisma.listeningLesson.findMany({
        where: whereClause,
        orderBy: { orderIndex: "asc" },
        select: {
          id: true,
          title: true,
          category: true,
          level: true,
          duration: true,
          accent: true,
          audioUrl: true,
          imageUrl: true,
          transcript: true,
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
      });

      return lessons.map((lesson: any) => {
        const userProgress = lesson.progresses?.[0] || null;
        const transcriptArray = Array.isArray(lesson.transcript) ? lesson.transcript : [];
        const totalSentences = transcriptArray.length;
        const completedCount = Array.isArray(userProgress?.completedSentences)
          ? userProgress.completedSentences.length
          : 0;

        const isCompleted =
          userProgress?.status === "COMPLETED" ||
          (totalSentences > 0 && completedCount >= totalSentences);

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
          userStatus: isCompleted ? "COMPLETED" : userProgress?.status || "NOT_STARTED",
          userProgressPercent:
            totalSentences > 0 ? Math.round((completedCount / totalSentences) * 100) : 0,
          completedSentencesCount: completedCount,
          completedSentences: userProgress?.completedSentences || [],
          bookmarkedSentences: userProgress?.bookmarkedSentences || [],
          lastPracticedAt: userProgress?.lastPracticedAt || null,
        };
      });
    }, "Fetch Listening Lessons");

    // Fallback to MOCK_LESSONS_DATA if database table is empty
    if (!result || result.length === 0) {
      let filteredMocks = [...MOCK_LESSONS_DATA];
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

      result = filteredMocks.map((lesson) => {
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

    return NextResponse.json({
      success: true,
      data: result || [],
    });
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
