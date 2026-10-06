import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import {
  claimSeasonReward,
  ensureSeasonClaimsTable,
  getUserSeasonXp,
} from "@/infrastructure/database/seasonStore";
import { getPreviousSeason, getTierForXp } from "@/features/gamification/utils/seasonRank";

export const dynamic = "force-dynamic";

/**
 * Claims the reward for the PREVIOUS (finished) season. Server-authoritative:
 * tier and coins are recomputed from the database, never trusted from the client.
 */
export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Vui lòng đăng nhập để nhận thưởng mùa giải." }, { status: 401 });
    }

    await ensureSeasonClaimsTable();

    const prev = getPreviousSeason();
    const xp = await getUserSeasonXp(userId, prev.startDate, prev.endDate);
    const tier = getTierForXp(xp);

    if (tier.rewardCoins <= 0) {
      return NextResponse.json(
        { success: false, error: "Mùa trước chưa đạt hạng có thưởng (cần từ hạng Bạc)." },
        { status: 400 }
      );
    }

    const result = await claimSeasonReward(userId, prev.id, tier.id, tier.rewardCoins);
    if (!result.claimed) {
      return NextResponse.json({ success: false, error: "Bạn đã nhận thưởng mùa này rồi." }, { status: 409 });
    }

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      data: { seasonId: prev.id, tier: tier.id, coinsAwarded: tier.rewardCoins, coins: result.coins },
    });
  } catch (error: any) {
    console.error("[Season] claim error:", error);
    return NextResponse.json({ success: false, error: "Không thể nhận thưởng, vui lòng thử lại." }, { status: 500 });
  }
}
