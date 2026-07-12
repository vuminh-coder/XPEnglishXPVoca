import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, equip } = body;

    // Check if the user has indeed purchased this item
    const purchase = await prisma.purchaseLog.findFirst({
      where: { userId, itemId },
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
      // General custom theme or cosmetic
      updateField = { avatarEmoji: equip ? "🎓" : "🦉" };
    } else {
      return NextResponse.json({ error: "Item cannot be equipped" }, { status: 400 });
    }

    // Update profile and log equip state in a transaction
    await prisma.$transaction([
      prisma.profile.update({
        where: { id: userId },
        data: updateField,
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

    return NextResponse.json({
      success: true,
      equipped: equip,
    });
  } catch (error) {
    console.error("Error in POST /api/shop/equip:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
