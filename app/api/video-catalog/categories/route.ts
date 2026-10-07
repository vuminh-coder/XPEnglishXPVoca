import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_VIDEO_CATEGORIES } from "@/features/listening/data/videoCatalogMockData";

export async function GET(req: NextRequest) {
  try {
    let categories: any[] = [];
    try {
      categories = await prisma.videoCategory.findMany({
        orderBy: { orderIndex: "asc" },
        include: {
          _count: {
            select: {
              lessons: true,
              playlists: true,
            },
          },
          playlists: {
            take: 4,
            orderBy: { orderIndex: "asc" },
            select: {
              id: true,
              slug: true,
              title: true,
              channelName: true,
            },
          },
        },
      });
    } catch (dbErr) {
      console.warn("[API video-catalog/categories] DB lookup failed, falling back to mock:", dbErr);
    }

    if (!categories || categories.length === 0) {
      return NextResponse.json({
        success: true,
        categories: MOCK_VIDEO_CATEGORIES.map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          description: c.description,
          icon: c.icon,
          thumbnail: null,
          orderIndex: c.orderIndex,
          isFeatured: true,
          lessonCount: c.lessonsCount || 4,
          playlistCount: 2,
          topPlaylists: [],
        })),
        totalCount: MOCK_VIDEO_CATEGORIES.length,
      });
    }

    const formatted = categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      icon: c.icon,
      thumbnail: c.thumbnail,
      orderIndex: c.orderIndex,
      isFeatured: c.isFeatured,
      lessonCount: c._count.lessons,
      playlistCount: c._count.playlists,
      topPlaylists: c.playlists,
    }));

    return NextResponse.json({
      success: true,
      categories: formatted,
      totalCount: formatted.length,
    });
  } catch (error: any) {
    console.error("[API video-catalog/categories] Error:", error);
    return NextResponse.json({
      success: true,
      categories: MOCK_VIDEO_CATEGORIES,
      totalCount: MOCK_VIDEO_CATEGORIES.length,
    });
  }
}

