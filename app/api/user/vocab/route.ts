import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cacheKey = `user_vocab:${userId}`;
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

    const vocabList = await prisma.userVocabulary.findMany({
      where: { userId: userId },
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
      take: 200,
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
    const userId = await getAuthenticatedUserId();
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
      // Find matching item in BASIC_VOCABULARIES or construct from request payload
      const matched = BASIC_VOCABULARIES.find(
        (v) => v.id === vocabId || v.word.toLowerCase() === vocabId.toLowerCase()
      );

      const targetThemeId = matched?.themeId || body.themeId || "t_basic_greetings";

      // Ensure theme exists before vocabulary creation
      const existingTheme = await prisma.vocabularyTheme.findUnique({
        where: { id: targetThemeId },
        select: { id: true },
      });

      if (!existingTheme) {
        await prisma.vocabularyTheme.upsert({
          where: { id: targetThemeId },
          update: {},
          create: {
            id: targetThemeId,
            name: matched?.themeNameEn || "General English",
            nameVn: matched?.themeNameVn || "Tiếng Anh Tổng Quát",
            icon: "📚",
            orderIndex: 999,
          },
        });
      }

      // Automatically upsert into database table vocabularies
      const createdVocab = await prisma.vocabulary.upsert({
        where: { id: matched?.id || vocabId },
        update: {},
        create: {
          id: matched?.id || vocabId,
          word: matched?.word || body.word || vocabId,
          phonetic: matched?.phonetic || body.phonetic || null,
          definition: matched?.definition || body.definition || "Standard vocabulary term",
          definitionVn: matched?.definitionVn || body.definitionVn || "Thuật ngữ từ vựng",
          pos: matched?.pos || body.pos || "noun",
          difficulty: matched?.difficulty || 1,
          frequency: matched?.frequency || 1,
          themeId: targetThemeId,
          examples: matched?.examples || (Array.isArray(body.examples) ? body.examples : []),
          synonyms: matched?.synonyms || (Array.isArray(body.synonyms) ? body.synonyms : []),
          antonyms: matched?.antonyms || (Array.isArray(body.antonyms) ? body.antonyms : []),
        },
      });

      targetVocab = { id: createdVocab.id };
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
    });

    const serializedData = {
      userId: upsertedVocab.userId,
      vocabId: upsertedVocab.vocabId,
      proficiency: upsertedVocab.proficiency,
      isFavorite: upsertedVocab.isFavorite,
      lastPracticed: upsertedVocab.lastPracticed ? upsertedVocab.lastPracticed.toISOString() : null,
      nextReview: upsertedVocab.nextReview ? upsertedVocab.nextReview.toISOString() : null,
    };

    memoryCache.del(`user_vocab:${userId}`);

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
