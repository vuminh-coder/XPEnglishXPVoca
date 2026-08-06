import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Ultra-fast query selecting only required fields
    const leaders = await prisma.profile.findMany({
      select: {
        id: true,
        fullName: true,
        username: true,
        level: true,
        title: true,
        totalXp: true,
        avatarEmoji: true,
      },
      orderBy: {
        totalXp: "desc",
      },
      take: 50,
    });

    const formattedLeaders = leaders.map((l, index) => {
      const authorName = l.fullName || l.username || "Học viên XP";
      const dbAvatar = (l as any).avatarUrl || (l as any).imageUrl || (l as any).avatar || undefined;

      return {
        id: l.id,
        rank: index + 1,
        fullName: authorName,
        username: l.username || "user",
        level: l.level,
        title: l.title,
        xp: l.totalXp,
        avatarEmoji: l.avatarEmoji || "🦉",
        avatar: dbAvatar,
        imageUrl: dbAvatar,
        avatarUrl: dbAvatar,
      };
    });

    return NextResponse.json({ success: true, data: formattedLeaders });
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
