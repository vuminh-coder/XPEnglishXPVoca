import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateSM2 } from "@/lib/utils/sm2";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vocabId, quality } = body;

    if (!vocabId || quality === undefined) {
      return NextResponse.json(
        { error: "Missing vocabId or quality rating" },
        { status: 400 }
      );
    }

    const rating = Math.min(5, Math.max(0, parseInt(quality)));

    // Fetch existing repetition info
    const existing = await prisma.userVocabulary.findUnique({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: vocabId,
        },
      },
    });

    const prevInterval = existing?.interval ?? 1;
    const prevEaseFactor = existing?.easeFactor ?? 2.5;
    const prevRepetitions = existing?.repetitions ?? 0;

    const sm2Result = calculateSM2(
      rating,
      prevInterval,
      prevEaseFactor,
      prevRepetitions
    );

    // Calculate next review datetime
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + sm2Result.interval);

    // Increment proficiency by quality points up to 100
    const currentProficiency = existing?.proficiency ?? 0;
    const proficiencyGain = rating >= 3 ? rating * 10 : -10;
    const newProficiency = Math.min(100, Math.max(0, currentProficiency + proficiencyGain));

    const updated = await prisma.userVocabulary.upsert({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: vocabId,
        },
      },
      update: {
        proficiency: newProficiency,
        lastPracticed: new Date(),
        nextReview: nextReviewDate,
        interval: sm2Result.interval,
        easeFactor: sm2Result.easeFactor,
        repetitions: sm2Result.repetitions,
      },
      create: {
        userId: userId,
        vocabId: vocabId,
        proficiency: newProficiency,
        lastPracticed: new Date(),
        nextReview: nextReviewDate,
        interval: sm2Result.interval,
        easeFactor: sm2Result.easeFactor,
        repetitions: sm2Result.repetitions,
        isFavorite: false,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        userId: updated.userId,
        vocabId: updated.vocabId,
        proficiency: updated.proficiency,
        interval: updated.interval,
        easeFactor: updated.easeFactor,
        repetitions: updated.repetitions,
        lastPracticed: updated.lastPracticed ? updated.lastPracticed.toISOString() : null,
        nextReview: updated.nextReview ? updated.nextReview.toISOString() : null,
      },
    });
  } catch (error: any) {
    console.error("POST /api/user/vocab/review-submit error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
