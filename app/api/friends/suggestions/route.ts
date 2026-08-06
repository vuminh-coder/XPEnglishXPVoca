import { getAuthenticatedUserId } from "@/lib/auth";
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

// GET /api/friends/suggestions - Get friend suggestions for the current user
export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find all friendships involving the current user (accepted or pending)
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      select: {
        senderId: true,
        receiverId: true,
      },
    });

    // Collect all user IDs connected to the current user
    const connectedUserIds = new Set<string>();
    friendships.forEach((f) => {
      connectedUserIds.add(f.senderId);
      connectedUserIds.add(f.receiverId);
    });
    connectedUserIds.add(userId); // Exclude current user from suggestions

    // Query profiles not in the connected list
    const suggestions = await prisma.profile.findMany({
      where: {
        id: {
          notIn: Array.from(connectedUserIds),
        },
      },
      take: 10, // Suggest up to 10 users
      orderBy: {
        totalXp: "desc", // Suggest higher level users first
      },
    });

    const formattedSuggestions = suggestions.map((s, index) => ({
      id: s.id,
      fullName: s.fullName || "User",
      username: s.username || "user",
      level: s.level,
      xp: s.totalXp,
      avatarEmoji: s.avatarEmoji || "🦉",
      avatar: (s as any).avatarUrl || (s as any).imageUrl || (s as any).avatar || OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length],
      avatarUrl: (s as any).avatarUrl || (s as any).imageUrl || (s as any).avatar || OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length],
      imageUrl: (s as any).avatarUrl || (s as any).imageUrl || (s as any).avatar || OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length],
    }));

    return NextResponse.json({ success: true, data: formattedSuggestions });
  } catch (error: any) {
    console.error("GET /api/friends/suggestions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}