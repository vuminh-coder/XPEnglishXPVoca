import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({ success: true, data: [] });
    }

    const cleanQuery = query.trim().toLowerCase();

    // High-speed search in Profile table filtering out current user
    const matchedProfiles = await prisma.profile.findMany({
      where: {
        AND: [
          userId ? { id: { not: userId } } : {},
          {
            OR: [
              { fullName: { contains: cleanQuery, mode: "insensitive" } },
              { username: { contains: cleanQuery, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        level: true,
        title: true,
        totalXp: true,
        avatarEmoji: true,
      },
      take: 10,
    });

    const formattedData = matchedProfiles.map((p) => ({
      id: p.id,
      fullName: p.fullName || p.username || "Học viên XP",
      username: p.username || "user",
      level: p.level,
      title: p.title,
      xp: p.totalXp,
      avatarEmoji: p.avatarEmoji || "🦉",
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    console.error("GET /api/friends/search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
