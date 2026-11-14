import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { extractYouTubeVideoId, formatDurationSeconds } from "@/features/listening/utils/videoUrlHelper";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const playlist = searchParams.get("playlist");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(300, Math.max(1, parseInt(searchParams.get("limit") || "150", 10)));
    const skip = (page - 1) * limit;

    // 1. Process and filter curated Mock Lessons (Curated Movie Lessons + Modular Lessons)
    let filteredMock = [...MOCK_VIDEO_LESSONS];

    if (category && category !== "all") {
      if (category === "has-data" || category === "full-data") {
        filteredMock = filteredMock.filter((l) => !l.id.startsWith("mov_"));
      } else {
        filteredMock = filteredMock.filter(
          (l) => l.categoryId === category || l.categorySlug === category
        );
      }
    }

    if (level && level !== "Tất cả") {
      filteredMock = filteredMock.filter(
        (l) => l.cefrLevel.toUpperCase() === level.toUpperCase()
      );
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filteredMock = filteredMock.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.categoryName.toLowerCase().includes(q)
      );
    }

    const formattedMock = filteredMock.map((l) => ({
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
      hasFullData: !l.id.startsWith("mov_"),
      segmentCount: l.segments.length > 2 ? l.segments.length : 8,
      totalSentences: l.segments.length > 2 ? l.segments.length : 8,
      category: {
        id: l.categoryId,
        slug: l.categorySlug,
        name: l.categoryName,
      },
      playlist: null,
      createdAt: new Date().toISOString(),
    }));

    // 2. Fetch from Database if available
    const where: any = {};

    if (category && category !== "all") {
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

    let dbLessons: any[] = [];
    let customListeningVideoLessons: any[] = [];

    try {
      const includeCustomListening =
        !category ||
        category === "all" ||
        category === "has-data" ||
        category === "full-data" ||
        category === "custom-youtube";

      const listeningWhere: any = {
        AND: [
          {
            OR: [
              { id: { startsWith: "vid_" } },
              { id: { startsWith: "yt_" } },
              { audioUrl: { contains: "youtube.com" } },
              { audioUrl: { contains: "youtu.be" } },
            ],
          },
        ],
      };
      if (level && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(level.toUpperCase())) {
        listeningWhere.AND.push({ level: level.toUpperCase() });
      }
      if (search && search.trim()) {
        const q = search.trim();
        listeningWhere.AND.push({
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { category: { contains: q, mode: "insensitive" } },
          ],
        });
      }

      const [vLessons, lVideoLessons] = await Promise.all([
        prisma.videoLesson.findMany({
          where,
          take: 50,
          orderBy: { createdAt: "desc" },
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
        includeCustomListening && !playlist
          ? prisma.listeningLesson.findMany({
              where: listeningWhere,
              take: 30,
              orderBy: { createdAt: "desc" },
              select: {
                id: true,
                title: true,
                category: true,
                level: true,
                duration: true,
                accent: true,
                audioUrl: true,
                imageUrl: true,
                transcript: true,
                createdAt: true,
              },
            })
          : Promise.resolve([]),
      ]);

      dbLessons = vLessons;
      customListeningVideoLessons = lVideoLessons;
    } catch (dbErr) {
      console.warn("[API video-catalog/lessons] DB query error, using curated mock:", dbErr);
    }

    const formattedDb = dbLessons.map((l) => ({
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
      hasFullData: l._count.segments > 0,
      segmentCount: l._count.segments,
      totalSentences: l._count.segments,
      category: l.category
        ? {
            id: l.category.id,
            slug: l.category.slug,
            name: l.category.name,
          }
        : null,
      playlist: l.playlist
        ? {
            id: l.playlist.id,
            slug: l.playlist.slug,
            title: l.playlist.title,
            channelName: l.playlist.channelName,
          }
        : null,
      createdAt: l.createdAt.toISOString(),
    }));

    const formattedCustomListening = customListeningVideoLessons
      .map((l) => {
        const ytId = extractYouTubeVideoId(l.audioUrl || "");
        if (!ytId) return null;
        const transcriptArr = Array.isArray(l.transcript) ? l.transcript : [];
        const lastEnd =
          transcriptArr.length > 0
            ? Number(transcriptArr[transcriptArr.length - 1]?.endTime || 180)
            : 180;
        const durSec = Math.max(30, Math.round(lastEnd));
        return {
          id: l.id,
          slug: l.id,
          title: l.title,
          description: `Video YouTube tự nhập (${l.category || "YouTube"})`,
          sourceType: "YOUTUBE",
          externalId: ytId,
          thumbnailUrl: l.imageUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
          durationSeconds: durSec,
          durationFormatted: formatDurationSeconds(durSec),
          cefrLevel: l.level || "B1",
          supportedTypes: "BOTH",
          accent: l.accent || "en-US",
          wpmSpeed: 130,
          viewCount: 0,
          studyCount: 0,
          isCommunityCurated: true,
          hasFullData: transcriptArr.length > 0,
          segmentCount: transcriptArr.length,
          totalSentences: transcriptArr.length,
          category: {
            id: "custom-youtube",
            slug: "custom-youtube",
            name: l.category || "Video Tự Nhập",
          },
          playlist: null,
          createdAt: l.createdAt.toISOString(),
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // 3. Merge: Custom imported videos + DB catalog lessons + Curated Mock lessons (deduplicated)
    const seenIds = new Set<string>();
    const combinedLessons: any[] = [];
    for (const candidate of [...formattedDb, ...formattedCustomListening, ...formattedMock]) {
      const key = candidate.externalId || candidate.id;
      if (seenIds.has(candidate.id) || (key && seenIds.has(key))) continue;
      seenIds.add(candidate.id);
      if (key) seenIds.add(key);
      combinedLessons.push(candidate);
    }

    // 4. Sort if requested
    if (sort === "views" || sort === "popular") {
      combinedLessons.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sort === "duration_asc") {
      combinedLessons.sort((a, b) => a.durationSeconds - b.durationSeconds);
    } else if (sort === "duration_desc") {
      combinedLessons.sort((a, b) => b.durationSeconds - a.durationSeconds);
    }

    const total = combinedLessons.length;
    const paginated = combinedLessons.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      lessons: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("[API video-catalog/lessons] Error:", error);
    return NextResponse.json({
      success: true,
      lessons: MOCK_VIDEO_LESSONS.map((l) => ({
        ...l,
        segmentCount: l.segments.length > 2 ? l.segments.length : 8,
        totalSentences: l.segments.length > 2 ? l.segments.length : 8,
        category: { id: l.categoryId, slug: l.categorySlug, name: l.categoryName },
      })),
      pagination: {
        total: MOCK_VIDEO_LESSONS.length,
        page: 1,
        limit: 48,
        totalPages: 1,
      },
    });
  }
}
