import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { formatCleanName } from "@/shared/utils/formatName";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 50 : limitParam, 1), 100);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const page = Math.max(isNaN(pageParam) ? 1 : pageParam, 1);
    const skip = (page - 1) * limit;

    // Ultra-fast query selecting required fields with deterministic multi-level sorting
    const leaders = await prisma.profile.findMany({
      select: {
        id: true,
        fullName: true,
        username: true,
        level: true,
        title: true,
        totalXp: true,
        avatarEmoji: true,
        avatarUrl: true,
        minutesStudied: true,
      },
      orderBy: [
        { totalXp: "desc" },
        { minutesStudied: "desc" },
        { id: "asc" },
      ],
      take: limit,
      skip: skip,
    });

    const formattedLeaders = leaders.map((l, index) => {
      const rawName = l.fullName || l.username || "Học viên XP";
      const cleanName = formatCleanName(rawName);
      const dbAvatar = l.avatarUrl || undefined;

      return {
        id: l.id,
        rank: skip + index + 1,
        fullName: cleanName,
        username: l.username || "user",
        level: l.level || 1,
        title: l.title || "Học viên",
        xp: l.totalXp || 0,
        minutesStudied: l.minutesStudied || 0,
        avatarEmoji: l.avatarEmoji || undefined,
        avatar: dbAvatar,
        imageUrl: dbAvatar,
        avatarUrl: dbAvatar,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: formattedLeaders,
        meta: {
          page,
          limit,
          totalReturned: formattedLeaders.length,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
