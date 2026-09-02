import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { sanitizeInput } from "@/infrastructure/security/validation";

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
      const safeSuffix = userId.substring(Math.max(0, userId.length - 8));
      const fullName = "Học viên XP Voca";
      const username = "user_" + safeSuffix;

      // Create a default profile if it doesn't exist
      profile = await prisma.profile.create({
        data: {
          id: userId,
          fullName,
          username,
          avatarEmoji: "🦉",
          level: 1,
          totalXp: 0,
          currentStreak: 1,
          longestStreak: 1,
          minutesStudied: 0,
          title: "Tân Binh",
          coins: 100,
          streakFreezes: 0,
        },
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}

/**
 * Update User Profile (Metadata Only).
 * Strictly prevents Mass-Assignment: totalXp, level, coins, and streak values are server-authoritative
 * and CANNOT be modified directly via this endpoint.
 */
export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      fullName,
      username,
      avatarEmoji,
      avatarUrl,
      imageUrl,
      avatar,
      bio,
      activeAvatarFrame,
      activeChatBubble,
    } = body;

    const finalAvatar = avatarUrl || imageUrl || avatar || undefined;
    const sanitizedFullName = fullName ? sanitizeInput(String(fullName).trim().slice(0, 100)) : undefined;
    const sanitizedUsername = username ? String(username).trim().toLowerCase().replace(/[^a-zA-Z0-9_]/g, "").slice(0, 30) : undefined;
    const sanitizedAvatarEmoji = avatarEmoji ? String(avatarEmoji).trim().slice(0, 10) : undefined;

    const safeSuffix = userId.substring(Math.max(0, userId.length - 8));
    const defaultFullName = "Học viên XP Voca";
    const defaultUsername = "user_" + safeSuffix;

    const updatedProfile = await prisma.profile.upsert({
      where: { id: userId },
      update: {
        ...(sanitizedFullName ? { fullName: sanitizedFullName } : {}),
        ...(sanitizedUsername ? { username: sanitizedUsername } : {}),
        ...(sanitizedAvatarEmoji ? { avatarEmoji: sanitizedAvatarEmoji } : {}),
        ...(finalAvatar ? { avatarUrl: finalAvatar } : {}),
        ...(activeAvatarFrame !== undefined ? { activeAvatarFrame } : {}),
        ...(activeChatBubble !== undefined ? { activeChatBubble } : {}),
      },
      create: {
        id: userId,
        fullName: sanitizedFullName || defaultFullName,
        username: sanitizedUsername || defaultUsername,
        avatarEmoji: sanitizedAvatarEmoji || "🦉",
        avatarUrl: finalAvatar || null,
        level: 1,
        totalXp: 0,
        currentStreak: 1,
        longestStreak: 1,
        minutesStudied: 0,
        title: "Tân Binh",
        coins: 100,
        streakFreezes: 0,
      },
    });

    return NextResponse.json({ success: true, data: updatedProfile });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}

export async function PATCH(request: Request) {
  return POST(request);
}
