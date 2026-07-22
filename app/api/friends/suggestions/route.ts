import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// High-res realistic Google (lh3.googleusercontent.com), Facebook (graph.facebook.com), Apple OAuth profile avatars
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
      imageUrl: (s as any).imageUrl || OAUTH_USER_AVATARS[index % OAUTH_USER_AVATARS.length],
    }));

    return NextResponse.json({ success: true, data: formattedSuggestions });
  } catch (error: any) {
    console.error("GET /api/friends/suggestions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}