import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");

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

    const lessons = await prisma.listeningLesson.findMany({
      where: whereClause,
      orderBy: { orderIndex: "asc" },
      include: userId
        ? {
            progresses: {
              where: { userId },
              take: 1,
            },
          }
        : undefined,
    });

    const formattedLessons = lessons.map((lesson: any) => {
      const userProgress = lesson.progresses?.[0] || null;
      const transcriptArray = Array.isArray(lesson.transcript) ? lesson.transcript : [];
      const totalSentences = transcriptArray.length;
      const completedCount = Array.isArray(userProgress?.completedSentences)
        ? userProgress.completedSentences.length
        : 0;

      return {
        id: lesson.id,
        title: lesson.title,
        category: lesson.category,
        level: lesson.level,
        duration: lesson.duration,
        accent: lesson.accent,
        audioUrl: lesson.audioUrl,
        imageUrl: lesson.imageUrl,
        totalSentences,
        userStatus: userProgress?.status || "NOT_STARTED",
        userProgressPercent: totalSentences > 0 ? Math.round((completedCount / totalSentences) * 100) : 0,
        lastPracticedAt: userProgress?.lastPracticedAt || null,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedLessons,
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json({ success: false, error: prismaErr.error }, { status: prismaErr.status });
  }
}
