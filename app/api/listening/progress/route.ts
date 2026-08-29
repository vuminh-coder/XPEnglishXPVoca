import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      lessonId,
      status = "IN_PROGRESS",
      completedSentences = [],
      bookmarkedSentences = [],
      inlineAiScores = {},
      timeSpent = 0,
      xpEarned = 0,
    } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "Thiếu userId hoặc lessonId" },
        { status: 400 }
      );
    }

    // 1. Upsert ListeningProgress
    const progress = await prisma.listeningProgress.upsert({
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

    // 2. Award XP and update profile metrics if xpEarned > 0 or timeSpent > 0
    if (xpEarned > 0 || timeSpent > 0) {
      await prisma.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: xpEarned },
          minutesStudied: { increment: Math.ceil(timeSpent / 60) },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    return NextResponse.json({ success: false, error: prismaErr.error }, { status: prismaErr.status });
  }
}
