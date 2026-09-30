import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.subscriptionOrder.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        planKey: true,
        amount: true,
        currency: true,
        transferSyntax: true,
        status: true,
        paymentMethod: true,
        durationMonths: true,
        createdAt: true,
        activatedAt: true,
        expiresAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    console.error("[Subscription History API Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
