import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameVn: { contains: search, mode: "insensitive" } },
      ];
    }

    const themes = await prisma.vocabularyTheme.findMany({
      where,
      orderBy: { orderIndex: "asc" },
      include: {
        _count: {
          select: { vocabularies: true },
        },
      },
    });

    // Format output to match client requirements
    const formattedThemes = themes.map((theme) => ({
      id: theme.id,
      name: theme.nameVn,
      nameEn: theme.name,
      icon: theme.icon,
      totalVocabs: theme._count.vocabularies,
    }));

    return NextResponse.json({ success: true, data: formattedThemes });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
