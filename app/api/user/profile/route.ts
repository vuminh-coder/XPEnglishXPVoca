import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let profile = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      // Fetch default user details if profile missing
      let fullName = "User";
      let username = "user_" + userId.substring(Math.max(0, userId.length - 8));

      // Create a default profile if it doesn't exist
      profile = await prisma.profile.create({
        data: {
          id: userId,
          fullName,
          username,
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
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, username, avatarEmoji, avatarUrl, imageUrl, avatar, level, totalXp, currentStreak, longestStreak, minutesStudied, title, coins, streakFreezes } = body;

    const finalAvatar = avatarUrl || imageUrl || avatar || undefined;

    let defaultFullName = "User";
    let defaultUsername = "user_" + userId.substring(Math.max(0, userId.length - 8));

    const updatedProfile = await prisma.profile.upsert({
      where: { id: userId },
      update: {
        fullName: fullName ?? undefined,
        username: username ?? undefined,
        avatarEmoji: avatarEmoji ?? undefined,
        avatarUrl: finalAvatar ?? undefined,
        level: level ?? undefined,
        totalXp: totalXp ?? undefined,
        currentStreak: currentStreak ?? undefined,
        longestStreak: longestStreak ?? undefined,
        minutesStudied: minutesStudied ?? undefined,
        title: title ?? undefined,
        coins: coins ?? undefined,
        streakFreezes: streakFreezes ?? undefined,
      },
      create: {
        id: userId,
        fullName: fullName || defaultFullName,
        username: username || defaultUsername,
        avatarEmoji: avatarEmoji || "🦉",
        avatarUrl: finalAvatar,
        level: level || 1,
        totalXp: totalXp || 0,
        currentStreak: currentStreak || 0,
        longestStreak: longestStreak || 0,
        minutesStudied: minutesStudied || 0,
        title: title || "Newbie",
        coins: coins || 100,
        streakFreezes: streakFreezes || 0,
      },
    });

    return NextResponse.json({ success: true, data: updatedProfile });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
