import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { activateVerifiedSubscription } from "@/features/premium/services/subscriptionActivation";
import { PlanKey } from "@/features/premium/types";

function verifyWebhookToken(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET?.trim() || process.env.SEPAY_WEBHOOK_TOKEN?.trim();
  if (!secret) {
    return false;
  }

  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const headerToken = req.headers.get("x-webhook-secret")?.trim() || req.headers.get("x-api-key")?.trim();
  const signature = req.headers.get("x-webhook-signature")?.trim();

  if (bearerToken && bearerToken.length === secret.length) {
    if (crypto.timingSafeEqual(Buffer.from(bearerToken), Buffer.from(secret))) {
      return true;
    }
  }

  if (headerToken && headerToken.length === secret.length) {
    if (crypto.timingSafeEqual(Buffer.from(headerToken), Buffer.from(secret))) {
      return true;
    }
  }

  if (signature) {
    const expectedHmac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (signature.length === expectedHmac.length) {
      return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHmac));
    }
  }

  return false;
}

/**
 * Payment Webhook Receiver (VietQR / SePay / Casso / PayOS)
 * Matches incoming bank transfer content against pending SubscriptionOrder.transferSyntax.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!verifyWebhookToken(req, rawBody)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody) as {
      transferSyntax?: string;
      content?: string;
      description?: string;
      amount?: number;
      transferAmount?: number;
    };

    const rawText = String(payload.transferSyntax || payload.content || payload.description || "");
    const amount = Number(payload.amount ?? payload.transferAmount ?? 0);

    const match = rawText.toUpperCase().match(/XP\s*PRO\s*[A-Z0-9_]+/);
    if (!match) {
      return NextResponse.json(
        { success: false, error: "Transfer syntax not found in webhook payload" },
        { status: 400 }
      );
    }

    const normalizedSyntax = match[0].replace(/\s+/g, " ").trim();
    const order = await prisma.subscriptionOrder.findFirst({
      where: {
        transferSyntax: normalizedSyntax,
        status: "pending",
      },
      orderBy: { createdAt: "desc" },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Pending order not found for transfer syntax" },
        { status: 404 }
      );
    }

    if (amount < order.amount) {
      return NextResponse.json(
        { success: false, error: "Paid amount is less than order amount" },
        { status: 400 }
      );
    }

    const activation = await activateVerifiedSubscription({
      orderId: order.id,
      userId: order.userId,
      planKey: order.planKey as PlanKey,
      paidAmount: amount,
    });

    return NextResponse.json({
      success: true,
      alreadyCompleted: activation.alreadyCompleted,
      orderId: activation.order.id,
      userId: activation.profile.id,
    });
  } catch (error: any) {
    console.error("[Subscription Webhook Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
