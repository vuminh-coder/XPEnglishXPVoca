import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vocabList = await prisma.userVocabulary.findMany({
      where: { userId: userId },
    });

    // Convert BigInt id to String/Number for JSON serialization
    const serializedData = vocabList.map(v => ({
      userId: v.userId,
      vocabId: v.vocabId,
      proficiency: v.proficiency,
      isFavorite: v.isFavorite,
      lastPracticed: v.lastPracticed ? v.lastPracticed.toISOString() : null,
      nextReview: v.nextReview ? v.nextReview.toISOString() : null,
    }));

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: any) {
    console.error("GET /api/user/vocab error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vocabId, proficiency, isFavorite, lastPracticed, nextReview } = body;

    if (!vocabId) {
      return NextResponse.json({ error: "Missing vocabId" }, { status: 400 });
    }

    const upsertedVocab = await prisma.userVocabulary.upsert({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: vocabId,
        },
      },
      update: {
        proficiency: proficiency !== undefined ? proficiency : undefined,
        isFavorite: isFavorite !== undefined ? isFavorite : undefined,
        lastPracticed: lastPracticed ? new Date(lastPracticed) : undefined,
        nextReview: nextReview ? new Date(nextReview) : undefined,
      },
      create: {
        userId: userId,
        vocabId: vocabId,
        proficiency: proficiency !== undefined ? proficiency : 0,
        isFavorite: isFavorite !== undefined ? isFavorite : false,
        lastPracticed: lastPracticed ? new Date(lastPracticed) : null,
        nextReview: nextReview ? new Date(nextReview) : null,
      },
    });

    const serializedData = {
      userId: upsertedVocab.userId,
      vocabId: upsertedVocab.vocabId,
      proficiency: upsertedVocab.proficiency,
      isFavorite: upsertedVocab.isFavorite,
      lastPracticed: upsertedVocab.lastPracticed ? upsertedVocab.lastPracticed.toISOString() : null,
      nextReview: upsertedVocab.nextReview ? upsertedVocab.nextReview.toISOString() : null,
    };

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: any) {
    console.error("POST /api/user/vocab error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
