import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isPremium: true,
        premiumTier: true,
        premiumStartedAt: true,
        premiumExpiresAt: true,
        streakFreezes: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const now = new Date();
    let isPremium = profile.isPremium;
    let premiumTier = profile.premiumTier;
    let daysRemaining = 0;

    // Check expiration if user has an expiry date
    if (isPremium && profile.premiumExpiresAt) {
      if (profile.premiumExpiresAt < now) {
        // Automatically downgrade expired subscription
        await prisma.profile.update({
          where: { id: userId },
          data: {
            isPremium: false,
            premiumTier: null,
          },
        });
        isPremium = false;
        premiumTier = null;
      } else {
        const diffMs = profile.premiumExpiresAt.getTime() - now.getTime();
        daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isPremium,
        premiumTier,
        premiumStartedAt: profile.premiumStartedAt,
        premiumExpiresAt: profile.premiumExpiresAt,
        daysRemaining,
        streakFreezes: profile.streakFreezes,
      },
    });
  } catch (error: any) {
    console.error("[Subscription Status API Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
