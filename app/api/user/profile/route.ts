import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let profile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      // Create a default profile if it doesn't exist
      profile = await prisma.profile.create({
        data: {
          id: userId,
          fullName: "User",
          username: "user_" + userId.substring(userId.length - 8),
          avatarEmoji: "🦉",
          level: 1,
          totalXp: 0,
          currentStreak: 0,
          longestStreak: 0,
          minutesStudied: 0,
          title: "Newbie",
        },
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, username, avatarEmoji, level, totalXp, currentStreak, longestStreak, minutesStudied, title } = body;

    const updatedProfile = await prisma.profile.upsert({
      where: { id: userId },
      update: {
        fullName: fullName ?? undefined,
        username: username ?? undefined,
        avatarEmoji: avatarEmoji ?? undefined,
        level: level ?? undefined,
        totalXp: totalXp ?? undefined,
        currentStreak: currentStreak ?? undefined,
        longestStreak: longestStreak ?? undefined,
        minutesStudied: minutesStudied ?? undefined,
        title: title ?? undefined,
      },
      create: {
        id: userId,
        fullName: fullName || "User",
        username: username || "user_" + userId.substring(userId.length - 8),
        avatarEmoji: avatarEmoji || "🦉",
        level: level || 1,
        totalXp: totalXp || 0,
        currentStreak: currentStreak || 0,
        longestStreak: longestStreak || 0,
        minutesStudied: minutesStudied || 0,
        title: title || "Newbie",
      },
    });

    return NextResponse.json({ success: true, data: updatedProfile });
  } catch (error: any) {
    console.error("POST /api/user/profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
