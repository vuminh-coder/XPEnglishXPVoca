import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const lesson = await prisma.listeningLesson.findUnique({
      where: { id },
      include: userId
        ? {
            progresses: {
              where: { userId },
              take: 1,
            },
            notes: {
              where: { userId },
              take: 1,
            },
          }
        : undefined,
    });

    if (!lesson) {
      return NextResponse.json({ success: false, error: "Bài nghe không tồn tại" }, { status: 404 });
    }

    const userProgress = (lesson as any).progresses?.[0] || null;
    const userNote = (lesson as any).notes?.[0] || null;

    return NextResponse.json({
      success: true,
      data: {
        ...lesson,
        userProgress: userProgress
          ? {
              status: userProgress.status,
              completedSentences: userProgress.completedSentences || [],
              bookmarkedSentences: userProgress.bookmarkedSentences || [],
              inlineAiScores: userProgress.inlineAiScores || {},
              timeSpent: userProgress.timeSpent || 0,
              lastPracticedAt: userProgress.lastPracticedAt,
            }
          : null,
        userNote: userNote?.content || "",
      },
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json({ success: false, error: prismaErr.error }, { status: prismaErr.status });
  }
}
