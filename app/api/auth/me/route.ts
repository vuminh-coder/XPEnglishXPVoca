import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { verifyAuthToken } from "@/infrastructure/auth/jwt";

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
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        level: true,
        totalXp: true,
        currentStreak: true,
        longestStreak: true,
        minutesStudied: true,
        avatarEmoji: true,
        avatarUrl: true,
        title: true,
        coins: true,
        streakFreezes: true,
        isPremium: true,
        premiumTier: true,
        premiumStartedAt: true,
        premiumExpiresAt: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ success: false, data: null });
    }

    let isPremium = profile.isPremium || false;
    let premiumTier = profile.premiumTier || null;

    if (isPremium && profile.premiumExpiresAt && profile.premiumExpiresAt < new Date()) {
      isPremium = false;
      premiumTier = null;
      prisma.profile
        .update({
          where: { id: profile.id },
          data: { isPremium: false, premiumTier: null },
        })
        .catch(() => {});
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
        isPremium,
        premiumTier,
        premiumStartedAt: profile.premiumStartedAt ? profile.premiumStartedAt.toISOString() : null,
        premiumExpiresAt: profile.premiumExpiresAt ? profile.premiumExpiresAt.toISOString() : null,
        imageUrl: profile.avatarUrl || null,
        avatar: profile.avatarUrl || null,
        avatarUrl: profile.avatarUrl || null,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, data: null });
  }
}
