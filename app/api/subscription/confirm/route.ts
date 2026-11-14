import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId, requireAdminUser } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { PLANS } from "@/features/premium/constants";
import { PlanKey } from "@/features/premium/types";
import { activateVerifiedSubscription } from "@/features/premium/services/subscriptionActivation";

function hasValidWebhookSecret(req: NextRequest): boolean {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET?.trim();
  if (!secret) return false;
  const header = req.headers.get("x-webhook-secret")?.trim();
  if (!header || header.length !== secret.length) return false;
  return crypto.timingSafeEqual(Buffer.from(header), Buffer.from(secret));
}

/**
 * Subscription Confirmation Endpoint (Hardened).
 * Self-service VIP activation by unprivileged clients is strictly prohibited.
 * Only an authenticated ADMIN (approving a pending order) or a signed PAYMENT_WEBHOOK_SECRET caller can activate VIP.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const planKey = (body?.planKey || "yearly") as PlanKey;
    const orderId = typeof body?.orderId === "string" ? body.orderId : undefined;
    const requestedUserId = typeof body?.userId === "string" ? body.userId : undefined;

    if (!PLANS[planKey]) {
      return NextResponse.json({ error: "Invalid plan key" }, { status: 400 });
    }

    // 1. Authorized internal webhook bypass check
    if (hasValidWebhookSecret(req) && requestedUserId) {
      const activation = await activateVerifiedSubscription({
        orderId,
        userId: requestedUserId,
        planKey,
        paidAmount: typeof body?.paidAmount === "number" ? body.paidAmount : undefined,
      });
      return NextResponse.json({
        success: true,
        message: "Kích hoạt Premium thành công qua đối soát thanh toán.",
        data: {
          isPremium: activation.profile.isPremium,
          premiumTier: activation.profile.premiumTier,
          premiumExpiresAt: activation.profile.premiumExpiresAt,
          streakFreezes: activation.profile.streakFreezes,
          orderId: activation.order.id,
          giftsAwarded: activation.giftsAwarded,
        },
      });
    }

    // 2. Check authenticated caller
    const callerId = await getAuthenticatedUserId(req);
    if (!callerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Admin manual approval flow
    const adminCheck = await requireAdminUser(req);
    if (adminCheck.authorized) {
      const targetUserId = requestedUserId || callerId;
      const activation = await activateVerifiedSubscription({
        orderId,
        userId: targetUserId,
        planKey,
      });

      return NextResponse.json({
        success: true,
        message: `Admin đã phê duyệt kích hoạt gói ${PLANS[planKey].name} thành công.`,
        data: {
          isPremium: activation.profile.isPremium,
          premiumTier: activation.profile.premiumTier,
          premiumExpiresAt: activation.profile.premiumExpiresAt,
          streakFreezes: activation.profile.streakFreezes,
          orderId: activation.order.id,
          giftsAwarded: activation.giftsAwarded,
        },
      });
    }

    // 4. Unprivileged learner request -> ensure pending order is recorded WITHOUT granting VIP
    const existingPendingOrder = await prisma.subscriptionOrder.findFirst({
      where: { userId: callerId, status: "pending" },
      orderBy: { createdAt: "desc" },
      select: { id: true, transferSyntax: true, status: true, amount: true },
    });

    let pendingOrder = existingPendingOrder;
    if (!pendingOrder) {
      const userSuffix = callerId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
      const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
      const durationMonths = planKey === "yearly" ? 15 : planKey === "monthly" ? 1 : 999;
      pendingOrder = await prisma.subscriptionOrder.create({
        data: {
          userId: callerId,
          planKey,
          amount: PLANS[planKey].totalPriceNum,
          currency: "VND",
          transferSyntax: `XP PRO ${userSuffix}_${salt}`,
          status: "pending",
          paymentMethod: "vietqr",
          durationMonths,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
        select: { id: true, transferSyntax: true, status: true, amount: true },
      });
    }

    return NextResponse.json(
      {
        success: false,
        pendingVerification: true,
        error: "Đơn hàng đang chờ đối soát giao dịch ngân hàng hoặc Admin phê duyệt.",
        order: pendingOrder,
      },
      { status: 403 }
    );
  } catch (error: any) {
    console.error("[Subscription Confirm API Error]:", error);
    return NextResponse.json(
      { error: "Confirmation Failed", message: error.message },
      { status: 500 }
    );
  }
}
