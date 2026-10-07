import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

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

    let totalCount = 0;
    let lessons: any[] = [];

    try {
      const [count, list] = await Promise.all([
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
      totalCount = count;
      lessons = list;
    } catch (dbErr) {
      console.warn("[API video-catalog/lessons] DB query error, falling back to mock:", dbErr);
    }

    // Fallback to MOCK_VIDEO_LESSONS if DB is empty
    if (!lessons || lessons.length === 0) {
      let filtered = [...MOCK_VIDEO_LESSONS];

      if (category && category !== "all") {
        filtered = filtered.filter(
          (l) => l.categoryId === category || l.categorySlug === category
        );
      }

      if (level && level !== "Tất cả") {
        filtered = filtered.filter((l) => l.cefrLevel.toUpperCase() === level.toUpperCase());
      }

      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.categoryName.toLowerCase().includes(q)
        );
      }

      if (sort === "views" || sort === "popular") {
        filtered.sort((a, b) => b.viewCount - a.viewCount);
      } else if (sort === "duration") {
        filtered.sort((a, b) => a.durationSeconds - b.durationSeconds);
      }

      const total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      const formattedMock = paginated.map((l) => ({
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
        isCommunityCurated: false,
        segmentCount: l.segments.length,
        totalSentences: l.segments.length,
        category: {
          id: l.categoryId,
          slug: l.categorySlug,
          name: l.categoryName,
        },
        playlist: null,
        createdAt: new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        lessons: formattedMock,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    }

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
      totalSentences: l._count.segments,
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
    return NextResponse.json({
      success: true,
      lessons: MOCK_VIDEO_LESSONS.map((l) => ({
        ...l,
        segmentCount: l.segments.length,
        totalSentences: l.segments.length,
        category: { id: l.categoryId, slug: l.categorySlug, name: l.categoryName },
      })),
      pagination: {
        total: MOCK_VIDEO_LESSONS.length,
        page: 1,
        limit: 20,
        totalPages: 1,
      },
    });
  }
}

