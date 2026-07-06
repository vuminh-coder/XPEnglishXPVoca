import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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
      // Fetch user details from Clerk if available to sync profile
      let fullName = "User";
      let username = "user_" + userId.substring(Math.max(0, userId.length - 8));
      
      try {
        const clerkUser = await currentUser();
        if (clerkUser) {
          fullName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || fullName;
          username = clerkUser.username || clerkUser.firstName || username;
        }
      } catch (e) {
        console.warn("Clerk currentUser lookup failed in GET /api/user/profile:", e);
      }

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
  } catch (error: any) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, username, avatarEmoji, level, totalXp, currentStreak, longestStreak, minutesStudied, title } = body;

    let defaultFullName = "User";
    let defaultUsername = "user_" + userId.substring(Math.max(0, userId.length - 8));

    if (!fullName || !username) {
      try {
        const clerkUser = await currentUser();
        if (clerkUser) {
          defaultFullName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || defaultFullName;
          defaultUsername = clerkUser.username || clerkUser.firstName || defaultUsername;
        }
      } catch (e) {
        console.warn("Clerk currentUser lookup failed in POST /api/user/profile:", e);
      }
    }

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
        fullName: fullName || defaultFullName,
        username: username || defaultUsername,
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
