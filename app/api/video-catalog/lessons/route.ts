import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const playlist = searchParams.get("playlist");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "18", 10)));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category) {
      where.OR = [
        { categoryId: category },
        { category: { slug: category } },
      ];
    }

    if (playlist) {
      where.playlist = {
        OR: [{ id: playlist }, { slug: playlist }],
      };
    }

    if (level && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(level.toUpperCase())) {
      where.cefrLevel = level.toUpperCase();
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Determine sort order
    let orderBy: any = { createdAt: "desc" };
    if (sort === "popular") {
      orderBy = { studyCount: "desc" };
    } else if (sort === "views") {
      orderBy = { viewCount: "desc" };
    } else if (sort === "duration_asc") {
      orderBy = { durationSeconds: "asc" };
    } else if (sort === "duration_desc") {
      orderBy = { durationSeconds: "desc" };
    } else if (sort === "oldest") {
      orderBy = { createdAt: "asc" };
    }

    const [totalCount, lessons] = await Promise.all([
      prisma.videoLesson.count({ where }),
      prisma.videoLesson.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: {
            select: { id: true, slug: true, name: true, icon: true },
          },
          playlist: {
            select: { id: true, slug: true, title: true, channelName: true },
          },
          _count: {
            select: { segments: true },
          },
        },
      }),
    ]);

    const formatted = lessons.map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      description: l.description,
      sourceType: l.sourceType,
      externalId: l.externalId,
      thumbnailUrl: l.thumbnailUrl,
      durationSeconds: l.durationSeconds,
      durationFormatted: l.durationFormatted,
      cefrLevel: l.cefrLevel,
      supportedTypes: l.supportedTypes,
      accent: l.accent,
      wpmSpeed: l.wpmSpeed,
      viewCount: l.viewCount,
      studyCount: l.studyCount,
      isCommunityCurated: l.isCommunityCurated,
      segmentCount: l._count.segments,
      category: l.category,
      playlist: l.playlist,
      createdAt: l.createdAt,
    }));

    return NextResponse.json({
      success: true,
      lessons: formatted,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("[API video-catalog/lessons] Error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể tải danh sách bài học video" },
      { status: 500 }
    );
  }
}
