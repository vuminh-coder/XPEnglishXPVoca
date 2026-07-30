import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("xp_voca_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, data: null });
    }

    const payload = verifyAuthToken(sessionCookie);
    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, data: null });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: payload.userId },
    });

    if (!profile) {
      return NextResponse.json({ success: false, data: null });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: profile.id,
        username: profile.username || profile.id,
        fullName: profile.fullName || "Học viên XP Voca",
        email: profile.email || `${profile.id}@xpvoca.com`,
        level: profile.level,
        totalXp: profile.totalXp,
        currentStreak: profile.currentStreak,
        longestStreak: profile.longestStreak,
        minutesStudied: profile.minutesStudied,
        avatarEmoji: profile.avatarEmoji || "🦉",
        bio: "Học viên xuất sắc của XP English | XP Voca! 🚀",
        title: profile.title,
        coins: profile.coins,
        streakFreezes: profile.streakFreezes,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, data: null });
  }
}
