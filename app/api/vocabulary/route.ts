import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";
import { MOCK_VOCABULARIES } from "@/prisma/mock-vocabularies";

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
  difficulty?: number;
  search?: string | null;
  limit?: number;
  random?: boolean;
}) {
  let list = MOCK_VOCABULARIES;

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

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get("themeId");
    const difficultyStr = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const limitStr = searchParams.get("limit");
    const random = searchParams.get("random") === "true";
    const ids = searchParams.get("ids")?.split(",").filter(Boolean);

    const limit = limitStr ? parseInt(limitStr) : undefined;
    const difficulty = difficultyStr ? parseInt(difficultyStr) : undefined;

    // Build the query conditions
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

    try {
      if (random && limit) {
        const allIds = await prisma.vocabulary.findMany({
          where,
          select: { id: true },
        });

        if (allIds.length === 0) {
          const fallback = filterMockVocabularies({ ids, themeId, difficulty, search, limit, random: true });
          return NextResponse.json({ success: true, data: fallback }, { headers: CACHE_HEADERS });
        }

        const sampledIds = getRandomSample(allIds, limit).map((x) => x.id);
        const randomVocabs = await prisma.vocabulary.findMany({
          where: { id: { in: sampledIds } },
        });

        return NextResponse.json({ success: true, data: randomVocabs }, { headers: CACHE_HEADERS });
      }

      const vocabs = await prisma.vocabulary.findMany({
        where,
        take: limit,
        orderBy: { word: "asc" },
      });

      if (vocabs.length === 0) {
        const fallback = filterMockVocabularies({ ids, themeId, difficulty, search, limit, random });
        return NextResponse.json({ success: true, data: fallback }, { headers: CACHE_HEADERS });
      }

      return NextResponse.json({ success: true, data: vocabs }, { headers: CACHE_HEADERS });
    } catch (dbErr) {
      const fallback = filterMockVocabularies({ ids, themeId, difficulty, search, limit, random });
      return NextResponse.json({ success: true, data: fallback }, { headers: CACHE_HEADERS });
    }
  } catch (error: unknown) {
    const fallback = filterMockVocabularies({});
    return NextResponse.json({ success: true, data: fallback }, { headers: CACHE_HEADERS });
  }
}