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
    const userSuffix = userId.slice(0, 8).toUpperCase();
    const transferSyntax = `XP PRO ${userSuffix}`;

    const durationMonths = planKey === "yearly" ? 15 : planKey === "monthly" ? 1 : 999;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins checkout session window

    // Reuse or create a pending order
    let order = await prisma.subscriptionOrder.findFirst({
      where: {
        userId,
        planKey,
        status: "pending",
      },
    });

    if (!order) {
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
