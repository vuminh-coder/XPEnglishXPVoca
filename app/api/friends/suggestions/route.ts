import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const formattedSuggestions = suggestions.map((s) => ({
      id: s.id,
      fullName: s.fullName || "User",
      username: s.username || "user",
      level: s.level,
      xp: s.totalXp,
      avatarEmoji: s.avatarEmoji || "🦉",
    }));

    return NextResponse.json({ success: true, data: formattedSuggestions });
  } catch (error: any) {
    console.error("GET /api/friends/suggestions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}