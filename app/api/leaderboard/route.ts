import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leaders = await prisma.profile.findMany({
      orderBy: {
        totalXp: "desc",
      },
      take: 50, // Top 50 users
    });

    const formattedLeaders = leaders.map((l, index) => ({
      id: l.id,
      rank: index + 1,
      fullName: l.fullName || "User",
      username: l.username || "user",
      level: l.level,
      title: l.title,
      xp: l.totalXp,
      avatarEmoji: l.avatarEmoji || "🦉",
    }));

    return NextResponse.json({ success: true, data: formattedLeaders });
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
