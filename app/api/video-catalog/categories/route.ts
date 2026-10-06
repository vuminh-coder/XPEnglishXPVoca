import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.videoCategory.findMany({
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
    return NextResponse.json(
      { success: false, error: "Không thể lấy danh sách danh mục video" },
      { status: 500 }
    );
  }
}
