import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { calculateSM2 } from "@/shared/utils/sm2";

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

    const rating = Math.min(5, Math.max(0, parseInt(quality) || 3));
    const sm2Result = calculateSM2(rating, 1, 2.5, 0);
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + sm2Result.interval);
    const proficiencyGain = rating >= 3 ? rating * 10 : -10;

    // 1. Handle local or guest users without database foreign key violation
    const isLocalUser =
      userId === "guest_user" ||
      userId === "local_user" ||
      userId.startsWith("local_user");

    if (isLocalUser) {
      return NextResponse.json({
        success: true,
        data: {
          userId,
          vocabId,
          proficiency: Math.min(100, Math.max(0, 50 + proficiencyGain)),
          interval: sm2Result.interval,
          easeFactor: sm2Result.easeFactor,
          repetitions: sm2Result.repetitions,
          lastPracticed: new Date().toISOString(),
          nextReview: nextReviewDate.toISOString(),
          isLocal: true,
        },
      });
    }

    // 2. Check if user profile actually exists in PostgreSQL
    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: {
          userId,
          vocabId,
          proficiency: Math.min(100, Math.max(0, 50 + proficiencyGain)),
          interval: sm2Result.interval,
          easeFactor: sm2Result.easeFactor,
          repetitions: sm2Result.repetitions,
          lastPracticed: new Date().toISOString(),
          nextReview: nextReviewDate.toISOString(),
          isLocal: true,
        },
      });
    }

    // 3. Resolve actual vocabulary in database by ID or by Word text
    let targetVocab = await prisma.vocabulary.findUnique({
      where: { id: vocabId },
      select: { id: true },
    });

    if (!targetVocab) {
      targetVocab = await prisma.vocabulary.findFirst({
        where: { word: { equals: vocabId, mode: "insensitive" } },
        select: { id: true },
      });
    }

    if (!targetVocab) {
      // Word is from a client-side mock or offline list (not in DB)
      return NextResponse.json({
        success: true,
        data: {
          userId,
          vocabId,
          proficiency: Math.min(100, Math.max(0, 50 + proficiencyGain)),
          interval: sm2Result.interval,
          easeFactor: sm2Result.easeFactor,
          repetitions: sm2Result.repetitions,
          lastPracticed: new Date().toISOString(),
          nextReview: nextReviewDate.toISOString(),
          isLocal: true,
        },
      });
    }

    // 4. Fetch existing repetition info for real vocab
    const existing = await prisma.userVocabulary.findUnique({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: targetVocab.id,
        },
      },
    });

    const prevInterval = existing?.interval ?? 1;
    const prevEaseFactor = existing?.easeFactor ?? 2.5;
    const prevRepetitions = existing?.repetitions ?? 0;

    const realSm2Result = calculateSM2(
      rating,
      prevInterval,
      prevEaseFactor,
      prevRepetitions
    );

    const realNextReviewDate = new Date();
    realNextReviewDate.setDate(realNextReviewDate.getDate() + realSm2Result.interval);

    const currentProficiency = existing?.proficiency ?? 0;
    const realNewProficiency = Math.min(100, Math.max(0, currentProficiency + proficiencyGain));

    const updated = await prisma.userVocabulary.upsert({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: targetVocab.id,
        },
      },
      update: {
        proficiency: realNewProficiency,
        lastPracticed: new Date(),
        nextReview: realNextReviewDate,
        interval: realSm2Result.interval,
        easeFactor: realSm2Result.easeFactor,
        repetitions: realSm2Result.repetitions,
      },
      create: {
        userId: userId,
        vocabId: targetVocab.id,
        proficiency: realNewProficiency,
        lastPracticed: new Date(),
        nextReview: realNextReviewDate,
        interval: realSm2Result.interval,
        easeFactor: realSm2Result.easeFactor,
        repetitions: realSm2Result.repetitions,
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
