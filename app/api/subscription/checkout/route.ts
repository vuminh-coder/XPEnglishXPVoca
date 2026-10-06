import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { PLANS } from "@/features/premium/constants";
import { PlanKey } from "@/features/premium/types";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const planKey = body?.planKey as PlanKey;

    if (!planKey || !PLANS[planKey]) {
      return NextResponse.json(
        { error: "Invalid plan key. Must be 'monthly', 'yearly', or 'lifetime'." },
        { status: 400 }
      );
    }

    const planConfig = PLANS[planKey];
    const userSuffix = userId.startsWith("usr_")
      ? userId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()
      : userId.slice(0, 8).toUpperCase();
    let transferSyntax = `XP PRO ${userSuffix}`;

    const durationMonths = planKey === "yearly" ? 15 : planKey === "monthly" ? 1 : 999;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins checkout session window

    // Reuse or create a pending order for this user
    let order = await prisma.subscriptionOrder.findFirst({
      where: {
        userId,
        planKey,
        status: "pending",
      },
    });

    if (!order) {
      // Check if this transferSyntax is already claimed by another order
      const existingWithSyntax = await prisma.subscriptionOrder.findUnique({
        where: { transferSyntax },
        select: { id: true, userId: true, status: true },
      });

      if (existingWithSyntax) {
        const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
        transferSyntax = `XP PRO ${userSuffix}_${salt}`;
      }

      order = await prisma.subscriptionOrder.create({
        data: {
          userId,
          planKey,
          amount: planConfig.totalPriceNum,
          currency: "VND",
          transferSyntax,
          status: "pending",
          paymentMethod: "vietqr",
          durationMonths,
          expiresAt,
        },
      });
    }

    // Generate standard VietQR format
    const bank = "MB";
    const acc = "0386766688";
    const name = encodeURIComponent("XP ENGLISH VIP");
    const desc = encodeURIComponent(order.transferSyntax);
    const vietQrUrl = `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${order.amount}&addInfo=${desc}&accountName=${name}`;

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        planKey: order.planKey,
        amount: order.amount,
        transferSyntax: order.transferSyntax,
        status: order.status,
        vietQrUrl,
        expiresAt: order.expiresAt,
        durationMonths: order.durationMonths,
      },
    });
  } catch (error: any) {
    console.error("[Subscription Checkout API Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
