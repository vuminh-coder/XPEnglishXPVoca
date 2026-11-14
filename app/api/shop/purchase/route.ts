import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

const ITEM_COSTS: Record<string, number> = {
  streak_freeze: 50,
  double_xp: 100,
  premium_owl: 250,
  energy_boost: 75,
  super_streak_shield: 120,
  cyber_glasses: 200,
  golden_badge: 300,
  ielts_champion_cape: 350,
};

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId } = body;

    const cost = ITEM_COSTS[itemId];
    if (cost === undefined) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    // Reject placeholder item cleanly without deducting coins
    if (itemId === "energy_boost") {
      return NextResponse.json(
        { error: "Vật phẩm Bình Tăng Tốc Năng Lượng đang tạm khóa (chưa mở bán)." },
        { status: 400 }
      );
    }

    // Execute database updates atomically with conditional balance guard against TOCTOU races
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.findUnique({
        where: { id: userId },
        select: { coins: true, streakFreezes: true, doubleXpUntil: true },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      if (profile.coins < cost) {
        throw new Error("Insufficient coins");
      }

      const nowMs = Date.now();
      const activeUntilMs = profile.doubleXpUntil ? new Date(profile.doubleXpUntil).getTime() : 0;
      const nextDoubleXpUntil =
        itemId === "double_xp" ? new Date(Math.max(nowMs, activeUntilMs) + 30 * 60_000) : undefined;

      // Atomic conditional debit ensures concurrent requests cannot double-spend coins
      const updateManyFn = (tx.profile as { updateMany?: typeof prisma.profile.updateMany }).updateMany;
      let updatedProfile: { coins: number; streakFreezes: number; doubleXpUntil?: Date | null } | null = null;

      if (typeof updateManyFn === "function") {
        const debitResult = await updateManyFn({
          where: { id: userId, coins: { gte: cost } },
          data: {
            coins: { decrement: cost },
            ...(itemId === "streak_freeze" ? { streakFreezes: { increment: 1 } } : {}),
            ...(itemId === "super_streak_shield" ? { streakFreezes: { increment: 3 } } : {}),
            ...(nextDoubleXpUntil ? { doubleXpUntil: nextDoubleXpUntil } : {}),
          },
        });
        if (debitResult.count === 0) {
          throw new Error("Insufficient coins");
        }
        updatedProfile = await tx.profile.findUnique({
          where: { id: userId },
          select: { coins: true, streakFreezes: true, doubleXpUntil: true },
        });
      } else {
        updatedProfile = await tx.profile.update({
          where: { id: userId },
          data: {
            coins: { decrement: cost },
            ...(itemId === "streak_freeze" ? { streakFreezes: { increment: 1 } } : {}),
            ...(itemId === "super_streak_shield" ? { streakFreezes: { increment: 3 } } : {}),
            ...(nextDoubleXpUntil ? { doubleXpUntil: nextDoubleXpUntil } : {}),
          },
          select: { coins: true, streakFreezes: true, doubleXpUntil: true },
        });
      }

      const resolvedCoins = updatedProfile?.coins ?? profile.coins - cost;
      const resolvedFreezes =
        updatedProfile?.streakFreezes ??
        profile.streakFreezes + (itemId === "streak_freeze" ? 1 : itemId === "super_streak_shield" ? 3 : 0);
      const resolvedDoubleXpUntil = updatedProfile?.doubleXpUntil ?? nextDoubleXpUntil ?? null;

      // Log purchase history
      const log = await tx.purchaseLog.create({
        data: {
          userId,
          itemId,
          cost,
          isEquipped: false,
        },
        select: {
          id: true,
          itemId: true,
          cost: true,
          purchasedAt: true,
          isEquipped: true,
        },
      });

      return {
        coins: resolvedCoins,
        streakFreezes: resolvedFreezes,
        doubleXpUntil: resolvedDoubleXpUntil ? new Date(resolvedDoubleXpUntil).toISOString() : null,
        log,
      };
    });

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      coins: result.coins,
      streakFreezes: result.streakFreezes,
      doubleXpUntil: result.doubleXpUntil,
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
