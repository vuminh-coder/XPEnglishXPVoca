import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { ensureVocabularyExists } from "@/infrastructure/database/vocabHelper";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const favoriteParam = searchParams.get("favorite");
    const dueParam = searchParams.get("due");
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") || "200", 10)));

    const cacheKey = `user_vocab:${userId}:${favoriteParam || "all"}:${dueParam || "all"}:${limit}`;
    const cached = memoryCache.get<any[]>(cacheKey);
    if (cached) {
      return NextResponse.json(
        { success: true, data: cached },
        {
          headers: {
            "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60",
            "X-Cache": "HIT",
          },
        }
      );
    }

    // Leverage composite indexes: @@index([userId, isFavorite]), @@index([userId, nextReview]), @@index([userId, lastPracticed(sort: Desc)])
    const whereClause: any = { userId };
    if (favoriteParam === "true") {
      whereClause.isFavorite = true;
    }
    if (dueParam === "true") {
      whereClause.nextReview = { lte: new Date() };
    }

    const vocabList = await prisma.userVocabulary.findMany({
      where: whereClause,
      orderBy: { lastPracticed: "desc" },
      select: {
        userId: true,
        vocabId: true,
        proficiency: true,
        isFavorite: true,
        lastPracticed: true,
        nextReview: true,
        vocabulary: {
          select: {
            word: true,
            phonetic: true,
            definition: true,
            definitionVn: true,
            pos: true,
            difficulty: true,
            frequency: true,
            themeId: true,
            examples: true,
            synonyms: true,
            antonyms: true,
          },
        },
      },
      take: limit,
    });

    // Convert BigInt id to String/Number for JSON serialization
    const serializedData = vocabList
      .filter(v => v.vocabulary !== null)
      .map(v => ({
        userId: v.userId,
        vocabId: v.vocabId,
        proficiency: v.proficiency,
        isFavorite: v.isFavorite,
        lastPracticed: v.lastPracticed ? v.lastPracticed.toISOString() : null,
        nextReview: v.nextReview ? v.nextReview.toISOString() : null,
        // Embedded vocabulary fields
        word: v.vocabulary.word,
        phonetic: v.vocabulary.phonetic,
        definition: v.vocabulary.definition,
        definitionVn: v.vocabulary.definitionVn,
        pos: v.vocabulary.pos,
        difficulty: v.vocabulary.difficulty,
        frequency: v.vocabulary.frequency,
        themeId: v.vocabulary.themeId,
        examples: v.vocabulary.examples,
        synonyms: v.vocabulary.synonyms,
        antonyms: v.vocabulary.antonyms,
      }));

    memoryCache.set(cacheKey, serializedData, 30);

    return NextResponse.json(
      { success: true, data: serializedData },
      {
        headers: {
          "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vocabId, proficiency, isFavorite, lastPracticed, nextReview } = body;

    if (!vocabId) {
      return NextResponse.json({ error: "Missing vocabId" }, { status: 400 });
    }

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
          proficiency: proficiency ?? 0,
          isFavorite: Boolean(isFavorite),
          lastPracticed: lastPracticed || new Date().toISOString(),
          nextReview: nextReview || null,
          isLocal: true,
        },
      });
    }

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
          proficiency: proficiency ?? 0,
          isFavorite: Boolean(isFavorite),
          lastPracticed: lastPracticed || new Date().toISOString(),
          nextReview: nextReview || null,
          isLocal: true,
        },
      });
    }

    const targetVocab = await ensureVocabularyExists(vocabId, {
      word: body.word,
      phonetic: body.phonetic,
      definition: body.definition,
      definitionVn: body.definitionVn,
      pos: body.pos,
      themeId: body.themeId,
      examples: body.examples,
      synonyms: body.synonyms,
      antonyms: body.antonyms,
    });

    if (!targetVocab) {
      return NextResponse.json({
        success: true,
        data: {
          userId,
          vocabId,
          proficiency: proficiency ?? 0,
          isFavorite: Boolean(isFavorite),
          lastPracticed: lastPracticed || new Date().toISOString(),
          nextReview: nextReview || null,
          isLocal: true,
        },
      });
    }

    const upsertedVocab = await prisma.userVocabulary.upsert({
      where: {
        userId_vocabId: {
          userId: userId,
          vocabId: targetVocab.id,
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
        vocabId: targetVocab.id,
        proficiency: proficiency !== undefined ? proficiency : 0,
        isFavorite: isFavorite !== undefined ? isFavorite : false,
        lastPracticed: lastPracticed ? new Date(lastPracticed) : null,
        nextReview: nextReview ? new Date(nextReview) : null,
      },
      select: {
        userId: true,
        vocabId: true,
        proficiency: true,
        isFavorite: true,
        lastPracticed: true,
        nextReview: true,
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

    memoryCache.invalidatePattern(`user_vocab:${userId}`);
    invalidateDashboardCache(userId);

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
