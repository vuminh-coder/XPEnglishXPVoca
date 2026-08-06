import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OAUTH_USER_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
];

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
      const dbAvatar = (l as any).avatarUrl || (l as any).imageUrl || (l as any).avatar;
      const fallbackAvatar = OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length];
      const avatarImage = dbAvatar || fallbackAvatar;

      return {
        id: l.id,
        rank: index + 1,
        fullName: authorName,
        username: l.username || "user",
        level: l.level,
        title: l.title,
        xp: l.totalXp,
        avatarEmoji: l.avatarEmoji || "🦉",
        avatar: avatarImage,
        imageUrl: avatarImage,
        avatarUrl: avatarImage,
      };
    });

    return NextResponse.json({ success: true, data: formattedLeaders });
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
