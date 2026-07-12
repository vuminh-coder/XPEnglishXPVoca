import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ITEM_COSTS: Record<string, number> = {
  streak_freeze: 50,
  double_xp: 100,
  premium_owl: 250,
};

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId } = body;

    const cost = ITEM_COSTS[itemId];
    if (cost === undefined) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    // Execute database updates in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.findUnique({
        where: { id: userId },
        select: { coins: true, streakFreezes: true },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      if (profile.coins < cost) {
        throw new Error("Insufficient coins");
      }

      // 1. Deduct coins from user profile
      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          coins: { decrement: cost },
          // If purchasing a streak freeze, increment streakFreezes in DB
          ...(itemId === "streak_freeze"
            ? { streakFreezes: { increment: 1 } }
            : {}),
        },
      });

      // 2. Create purchase log entry (excluding consumable streak freeze, or we can log it too)
      const log = await tx.purchaseLog.create({
        data: {
          userId,
          itemId,
          cost,
          isEquipped: false,
        },
      });

      return {
        coins: updatedProfile.coins,
        streakFreezes: updatedProfile.streakFreezes,
        log,
      };
    });

    return NextResponse.json({
      success: true,
      coins: result.coins,
      streakFreezes: result.streakFreezes,
    });
  } catch (error: any) {
    console.error("Error in POST /api/shop/purchase:", error);
    if (error.message === "Profile not found") {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    if (error.message === "Insufficient coins") {
      return NextResponse.json({ error: "Insufficient coins" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
