import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { PLANS } from "@/features/premium/constants";
import { PlanKey } from "@/features/premium/types";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const planKey = (body?.planKey || "yearly") as PlanKey;

    if (!PLANS[planKey]) {
      return NextResponse.json(
        { error: "Invalid plan key" },
        { status: 400 }
      );
    }

    const planConfig = PLANS[planKey];
    const now = new Date();

    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch current profile
      const profile = await tx.profile.findUnique({
        where: { id: userId },
        select: {
          id: true,
          isPremium: true,
          premiumTier: true,
          premiumStartedAt: true,
          premiumExpiresAt: true,
          streakFreezes: true,
        },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      // 2. Calculate expiration date with stacking support
      let baseStartDate = now;
      if (profile.isPremium && profile.premiumExpiresAt && profile.premiumExpiresAt > now) {
        // Stack on top of remaining days
        baseStartDate = profile.premiumExpiresAt;
      }

      let newExpiresAt: Date;
      let durationMonths: number;

      if (planKey === "lifetime") {
        newExpiresAt = new Date("2099-12-31T23:59:59.999Z");
        durationMonths = 999;
      } else if (planKey === "yearly") {
        // 12 months + 3 bonus months = 15 months (~456 days)
        newExpiresAt = new Date(baseStartDate.getTime() + 456 * 24 * 60 * 60 * 1000);
        durationMonths = 15;
      } else {
        // Monthly: 30 days
        newExpiresAt = new Date(baseStartDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        durationMonths = 1;
      }

      // 3. Determine gift rewards
      const freezesToAdd = planKey === "yearly" ? 3 : planKey === "lifetime" ? 99 : 1;
      const giftsAwarded: string[] = [];

      if (freezesToAdd > 0) {
        giftsAwarded.push(`+${freezesToAdd} Khiên Kim Cương bảo vệ Streak`);
      }

      // Check and award exclusive avatar items
      if (planKey === "yearly" || planKey === "lifetime") {
        const existingOwl = await tx.purchaseLog.findFirst({
          where: { userId, itemId: "premium_owl" },
        });
        if (!existingOwl) {
          await tx.purchaseLog.create({
            data: {
              userId,
              itemId: "premium_owl",
              cost: 0,
              isEquipped: true,
            },
          });
          giftsAwarded.push("Nón Cử Nhân Cú Vàng độc quyền");
        }
      }

      if (planKey === "lifetime") {
        const existingBadge = await tx.purchaseLog.findFirst({
          where: { userId, itemId: "golden_badge" },
        });
        if (!existingBadge) {
          await tx.purchaseLog.create({
            data: {
              userId,
              itemId: "golden_badge",
              cost: 0,
              isEquipped: true,
            },
          });
          giftsAwarded.push("Huy hiệu Vương Miện Vàng VIP");
        }
      }

      // 4. Update Profile
      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumTier: planKey,
          premiumStartedAt: profile.premiumStartedAt || now,
          premiumExpiresAt: newExpiresAt,
          streakFreezes: { increment: freezesToAdd },
        },
        select: {
          id: true,
          isPremium: true,
          premiumTier: true,
          premiumStartedAt: true,
          premiumExpiresAt: true,
          streakFreezes: true,
        },
      });

      // 5. Create or complete order record
      const existingPendingOrder = await tx.subscriptionOrder.findFirst({
        where: { userId, status: "pending" },
        orderBy: { createdAt: "desc" },
      });

      let completedOrder;
      if (existingPendingOrder) {
        completedOrder = await tx.subscriptionOrder.update({
          where: { id: existingPendingOrder.id },
          data: {
            planKey,
            amount: planConfig.totalPriceNum,
            status: "completed",
            durationMonths,
            activatedAt: now,
            expiresAt: newExpiresAt,
          },
        });
      } else {
        const userSuffix = userId.startsWith("usr_")
          ? userId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()
          : userId.slice(0, 8).toUpperCase();
        const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
        const transferSyntax = `XP PRO ${userSuffix}_${salt}`;

        completedOrder = await tx.subscriptionOrder.create({
          data: {
            userId,
            planKey,
            amount: planConfig.totalPriceNum,
            currency: "VND",
            transferSyntax,
            status: "completed",
            paymentMethod: "vietqr",
            durationMonths,
            activatedAt: now,
            expiresAt: newExpiresAt,
          },
        });
      }

      return {
        profile: updatedProfile,
        order: completedOrder,
        giftsAwarded,
      };
    });

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      message: `Kích hoạt gói ${planConfig.name} thành công!`,
      data: {
        isPremium: result.profile.isPremium,
        premiumTier: result.profile.premiumTier,
        premiumExpiresAt: result.profile.premiumExpiresAt,
        streakFreezes: result.profile.streakFreezes,
        orderId: result.order.id,
        giftsAwarded: result.giftsAwarded,
      },
    });
  } catch (error: any) {
    console.error("[Subscription Confirm API Error]:", error);
    return NextResponse.json(
      { error: "Confirmation Failed", message: error.message },
      { status: 500 }
    );
  }
}
