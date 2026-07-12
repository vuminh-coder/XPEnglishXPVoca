import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";

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

    if (random && limit) {
      // Direct raw query or select random elements from DB for gaming/PVP
      // For simplicity and PostgreSQL efficiency: retrieve ids first, then select randomly
      const allIds = await prisma.vocabulary.findMany({
        where,
        select: { id: true },
      });

      if (allIds.length === 0) {
        return NextResponse.json({ success: true, data: [] });
      }

      const shuffledIds = allIds
        .map((x) => x.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);

      const randomVocabs = await prisma.vocabulary.findMany({
        where: { id: { in: shuffledIds } },
      });

      // Maintain random order
      const orderedRandomVocabs = shuffledIds
        .map((id) => randomVocabs.find((v) => v.id === id))
        .filter(Boolean);

      return NextResponse.json({ success: true, data: orderedRandomVocabs });
    }

    const vocabs = await prisma.vocabulary.findMany({
      where,
      take: limit,
      orderBy: { word: "asc" },
    });

    return NextResponse.json({ success: true, data: vocabs });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}