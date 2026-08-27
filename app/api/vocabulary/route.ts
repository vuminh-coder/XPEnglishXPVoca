import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";
import { BASIC_VOCABULARIES } from "@/lib/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/lib/data/advancedVocabularies";

const FORMATTED_BASIC_VOCABS = BASIC_VOCABULARIES.map((bv) => ({
  id: bv.id,
  word: bv.word,
  phonetic: bv.phonetic,
  definition: bv.definition,
  definitionVn: bv.definitionVn,
  pos: bv.pos,
  difficulty: bv.difficulty,
  frequency: bv.frequency,
  themeId: bv.themeId,
  examples: bv.examples,
  exampleTranslations: bv.exampleTranslations || [],
  synonyms: bv.synonyms || [],
  antonyms: bv.antonyms || [],
}));

const ALL_MOCK_VOCABULARIES = [...FORMATTED_BASIC_VOCABS, ...ADVANCED_VOCABULARIES];

// High-speed O(K) Fisher-Yates Sampling without copying or sorting full array
function getRandomSample<T>(arr: T[], limit: number): T[] {
  const len = arr.length;
  if (len <= limit) return arr;
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < limit && used.size < len) {
    const idx = Math.floor(Math.random() * len);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

function filterMockVocabularies(params: {
  ids?: string[];
  themeId?: string | null;
  level?: "basic" | "advanced" | null;
  difficulty?: number;
  search?: string | null;
  limit?: number;
  random?: boolean;
}) {
  let list = ALL_MOCK_VOCABULARIES;

  if (params.level === "basic") {
    list = FORMATTED_BASIC_VOCABS;
  } else if (params.level === "advanced") {
    list = ADVANCED_VOCABULARY_THEMES_FILTER(ADVANCED_VOCABULARIES);
  }

  if (params.ids && params.ids.length > 0) {
    const idSet = new Set(params.ids);
    list = list.filter((v) => idSet.has(v.id));
  }
  if (params.themeId) {
    list = list.filter((v) => v.themeId === params.themeId);
  }
  if (params.difficulty !== undefined && !isNaN(params.difficulty)) {
    list = list.filter((v) => v.difficulty === params.difficulty);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (v) =>
        v.word.toLowerCase().includes(q) ||
        (v.definition && v.definition.toLowerCase().includes(q)) ||
        (v.definitionVn && v.definitionVn.toLowerCase().includes(q))
    );
  }

  if (params.random && params.limit && params.limit > 0) {
    return getRandomSample(list, params.limit);
  }

  if (params.limit && params.limit > 0) {
    return list.slice(0, params.limit);
  }

  return list;
}

function ADVANCED_VOCABULARY_THEMES_FILTER(list: typeof ADVANCED_VOCABULARIES) {
  return list;
}

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get("themeId");
    const level = searchParams.get("level") as "basic" | "advanced" | null;
    const difficultyStr = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const limitStr = searchParams.get("limit");
    const random = searchParams.get("random") === "true";
    const ids = searchParams.get("ids")?.split(",").filter(Boolean);

    const limit = limitStr ? parseInt(limitStr) : undefined;
    const difficulty = difficultyStr ? parseInt(difficultyStr) : undefined;

    // Direct memory serving for 0ms ultra-fast responsiveness
    const mockFiltered = filterMockVocabularies({
      ids,
      themeId,
      level,
      difficulty,
      search,
      limit,
      random,
    });

    if (mockFiltered && mockFiltered.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: mockFiltered,
          total: mockFiltered.length,
          source: "file_store",
        },
        { headers: CACHE_HEADERS }
      );
    }

    // Build the database query conditions if not found in memory
    const where: any = {};
    if (ids && ids.length > 0) where.id = { in: ids };
    if (themeId) where.themeId = themeId;
    if (difficulty !== undefined && !isNaN(difficulty)) where.difficulty = difficulty;
    if (search) {
      where.OR = [
        { word: { contains: search, mode: "insensitive" } },
        { definition: { contains: search, mode: "insensitive" } },
        { definitionVn: { contains: search, mode: "insensitive" } },
      ];
    }

    const vocabs = await prisma.vocabulary.findMany({
      where,
      take: limit || 100,
      orderBy: { frequency: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data: vocabs,
        total: vocabs.length,
        source: "database",
      },
      { headers: CACHE_HEADERS }
    );
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    if (prismaErr) {
      return NextResponse.json(
        { success: false, error: prismaErr.error },
        { status: prismaErr.status }
      );
    }

    // Always fallback to mock vocabularies on DB error
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get("themeId");
    const level = searchParams.get("level") as "basic" | "advanced" | null;
    const difficultyStr = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const limitStr = searchParams.get("limit");
    const random = searchParams.get("random") === "true";
    const ids = searchParams.get("ids")?.split(",").filter(Boolean);

    const fallbackVocabs = filterMockVocabularies({
      ids,
      themeId,
      level,
      difficulty: difficultyStr ? parseInt(difficultyStr) : undefined,
      search,
      limit: limitStr ? parseInt(limitStr) : 100,
      random,
    });

    return NextResponse.json(
      {
        success: true,
        data: fallbackVocabs,
        total: fallbackVocabs.length,
        source: "fallback",
      },
      { headers: CACHE_HEADERS }
    );
  }
}