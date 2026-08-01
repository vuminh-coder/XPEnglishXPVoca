import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OAUTH_USER_AVATARS = [
  "https://lh3.googleusercontent.com/a/ACg8ocL3g1X7N4sQ8Yw7V-3nK9jQzE2m1L_5k=s96-c",
  "https://graph.facebook.com/100008392019283/picture?type=square&height=150&width=150",
  "https://lh3.googleusercontent.com/a-/ALV-UjW8bZ0Yx5k1m9V2w3X4Y5Z6a7b8c9d0=s96-c",
  "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=102241908239012&height=150&width=150&ext=1700000000&hash=AeR",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://lh3.googleusercontent.com/a/ACg8ocK_m8v8X5L_9n0m1k2j3h4g5f6e7d8=s96-c",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
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
      const avatarImage = (l as any).avatarUrl || OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length];
      return {
        id: l.id,
        rank: index + 1,
        fullName: l.fullName || l.username || "Học viên XP",
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
