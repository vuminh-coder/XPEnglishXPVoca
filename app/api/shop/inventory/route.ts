import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: userId },
      select: {
        coins: true,
        streakFreezes: true,
        activeAvatarFrame: true,
        activeChatBubble: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const purchaseLogs = await prisma.purchaseLog.findMany({
      where: { userId },
      select: {
        itemId: true,
        cost: true,
        purchasedAt: true,
        isEquipped: true,
      },
    });

    return NextResponse.json({
      success: true,
      coins: profile.coins,
      streakFreezes: profile.streakFreezes,
      activeAvatarFrame: profile.activeAvatarFrame,
      activeChatBubble: profile.activeChatBubble,
      purchaseLogs,
    });
  } catch (error) {
    console.error("Error in GET /api/shop/inventory:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
