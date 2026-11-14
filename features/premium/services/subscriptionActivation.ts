import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { PLANS } from "@/features/premium/constants";
import { PlanKey } from "@/features/premium/types";

export interface ActivateSubscriptionResult {
  alreadyCompleted?: boolean;
  profile: {
    id: string;
    isPremium: boolean;
    premiumTier: string | null;
    premiumStartedAt: Date | null;
    premiumExpiresAt: Date | null;
    streakFreezes: number;
  };
  order: {
    id: string;
    planKey: string;
    amount: number;
    transferSyntax: string;
    status: string;
    activatedAt: Date | null;
    expiresAt: Date | null;
  };
  giftsAwarded: string[];
}

export function computePlanExpiration(planKey: PlanKey, baseStartDate: Date): {
  newExpiresAt: Date;
  durationMonths: number;
} {
  if (planKey === "lifetime") {
    return {
      newExpiresAt: new Date("2099-12-31T23:59:59.999Z"),
      durationMonths: 999,
    };
  }
  if (planKey === "yearly") {
    return {
      newExpiresAt: new Date(baseStartDate.getTime() + 456 * 24 * 60 * 60 * 1000),
      durationMonths: 15,
    };
  }
  return {
    newExpiresAt: new Date(baseStartDate.getTime() + 30 * 24 * 60 * 60 * 1000),
    durationMonths: 1,
  };
}

/**
 * Atomically activates a VIP subscription for a verified order or admin approval.
 * Uses conditional updateMany (status: "pending" -> "completed") to eliminate double-credit races.
 */
export async function activateVerifiedSubscription(params: {
  orderId?: string;
  userId: string;
  planKey?: PlanKey;
  paidAmount?: number;
}): Promise<ActivateSubscriptionResult> {
  const { orderId, userId, planKey: explicitPlanKey, paidAmount } = params;
  const now = new Date();

  const result = await prisma.$transaction(async (tx) => {
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

    const pendingOrder = orderId
      ? await tx.subscriptionOrder.findUnique({ where: { id: orderId } })
      : await tx.subscriptionOrder.findFirst({
          where: { userId, status: "pending" },
          orderBy: { createdAt: "desc" },
        });

    if (pendingOrder && pendingOrder.status === "completed") {
      return {
        alreadyCompleted: true,
        profile,
        order: pendingOrder,
        giftsAwarded: [],
      };
    }

    const resolvedPlanKey = (pendingOrder?.planKey || explicitPlanKey || "yearly") as PlanKey;
    const planConfig = PLANS[resolvedPlanKey];
    if (!planConfig) {
      throw new Error("Invalid plan key");
    }

    if (paidAmount !== undefined && paidAmount < (pendingOrder?.amount ?? planConfig.totalPriceNum)) {
      throw new Error("Insufficient payment amount");
    }

    if (pendingOrder) {
      const claimResult = await tx.subscriptionOrder.updateMany({
        where: { id: pendingOrder.id, status: "pending" },
        data: { status: "completed", activatedAt: now },
      });
      if (claimResult.count === 0) {
        const latestOrder = await tx.subscriptionOrder.findUniqueOrThrow({ where: { id: pendingOrder.id } });
        return {
          alreadyCompleted: true,
          profile,
          order: latestOrder,
          giftsAwarded: [],
        };
      }
    }

    const baseStartDate =
      profile.isPremium && profile.premiumExpiresAt && profile.premiumExpiresAt > now
        ? profile.premiumExpiresAt
        : now;

    const { newExpiresAt, durationMonths } = computePlanExpiration(resolvedPlanKey, baseStartDate);

    const freezesToAdd = resolvedPlanKey === "yearly" ? 3 : resolvedPlanKey === "lifetime" ? 99 : 1;
    const giftsAwarded: string[] = [];
    if (freezesToAdd > 0) {
      giftsAwarded.push(`+${freezesToAdd} Khiên Kim Cương bảo vệ Streak`);
    }

    if (resolvedPlanKey === "yearly" || resolvedPlanKey === "lifetime") {
      const existingOwl = await tx.purchaseLog.findFirst({
        where: { userId, itemId: "premium_owl" },
        select: { id: true },
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

    if (resolvedPlanKey === "lifetime") {
      const existingBadge = await tx.purchaseLog.findFirst({
        where: { userId, itemId: "golden_badge" },
        select: { id: true },
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

    const updatedProfile = await tx.profile.update({
      where: { id: userId },
      data: {
        isPremium: true,
        premiumTier: resolvedPlanKey,
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

    let completedOrder;
    if (pendingOrder) {
      completedOrder = await tx.subscriptionOrder.update({
        where: { id: pendingOrder.id },
        data: {
          planKey: resolvedPlanKey,
          amount: planConfig.totalPriceNum,
          durationMonths,
          activatedAt: now,
          expiresAt: newExpiresAt,
        },
      });
    } else {
      const userSuffix = userId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
      const salt = Math.random().toString(36).substring(2, 6).toUpperCase();
      completedOrder = await tx.subscriptionOrder.create({
        data: {
          userId,
          planKey: resolvedPlanKey,
          amount: planConfig.totalPriceNum,
          currency: "VND",
          transferSyntax: `XP PRO ${userSuffix}_${salt}`,
          status: "completed",
          paymentMethod: "vietqr",
          durationMonths,
          activatedAt: now,
          expiresAt: newExpiresAt,
        },
      });
    }

    return {
      alreadyCompleted: false,
      profile: updatedProfile,
      order: completedOrder,
      giftsAwarded,
    };
  });

  invalidateDashboardCache(userId);
  return result;
}
