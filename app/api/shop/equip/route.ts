import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, equip } = body;

    // Check if the user has indeed purchased this item
    const purchase = await prisma.purchaseLog.findFirst({
      where: { userId, itemId },
      select: { id: true },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Item not purchased" }, { status: 400 });
    }

    // Determine field to update based on item category
    let updateField: Record<string, any> = {};
    if (itemId.includes("frame")) {
      updateField = { activeAvatarFrame: equip ? itemId : null };
    } else if (itemId.includes("bubble")) {
      updateField = { activeChatBubble: equip ? itemId : null };
    } else if (itemId === "premium_owl") {
      updateField = { avatarEmoji: equip ? "🎓" : "🦉" };
    } else if (itemId === "cyber_glasses") {
      updateField = { avatarEmoji: equip ? "🕶️" : "🦉" };
    } else if (itemId === "golden_badge") {
      updateField = { avatarEmoji: equip ? "👑" : "🦉" };
    } else if (itemId === "ielts_champion_cape") {
      updateField = { avatarEmoji: equip ? "🦸" : "🦉" };
    } else {
      return NextResponse.json({ error: "Item cannot be equipped" }, { status: 400 });
    }

    // Update profile and log equip state in a transaction
    await prisma.$transaction([
      prisma.profile.update({
        where: { id: userId },
        data: updateField,
        select: {
          id: true,
          activeAvatarFrame: true,
          activeChatBubble: true,
          avatarEmoji: true,
        },
      }),
      // Set all other items of same category to unequipped, and update current item
      prisma.purchaseLog.updateMany({
        where: { userId, itemId: { contains: itemId.includes("frame") ? "frame" : itemId.includes("bubble") ? "bubble" : "premium_owl" } },
        data: { isEquipped: false },
      }),
      prisma.purchaseLog.updateMany({
        where: { userId, itemId },
        data: { isEquipped: equip },
      }),
    ]);

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      equipped: equip,
    });
  } catch (error) {
    console.error("Error in POST /api/shop/equip:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
