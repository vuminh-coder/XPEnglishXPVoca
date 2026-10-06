import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import {
  ensureSeasonClaimsTable,
  getUserSeasonXp,
  getUserSeasonRank,
  hasClaimedSeason,
} from "@/infrastructure/database/seasonStore";
import {
  RANK_TIERS,
  getPreviousSeason,
  getSeasonForDate,
  getTierProgress,
} from "@/features/gamification/utils/seasonRank";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const now = new Date();
  const season = getSeasonForDate(now);
  const prevSeason = getPreviousSeason(now);
  const base = { season, tiers: RANK_TIERS };

  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ success: true, data: { ...base, me: null } }, { headers: NO_STORE });
    }

    await ensureSeasonClaimsTable();

    const [xp, prevXp, prevClaimed] = await Promise.all([
      getUserSeasonXp(userId, season.startDate, season.endDate),
      getUserSeasonXp(userId, prevSeason.startDate, prevSeason.endDate),
      hasClaimedSeason(userId, prevSeason.id),
    ]);
    const rank = await getUserSeasonRank(xp, season.startDate, season.endDate);

    const progress = getTierProgress(xp);
    const prevTier = getTierProgress(prevXp).tier;

    return NextResponse.json(
      {
        success: true,
        data: {
          ...base,
          me: {
            xp,
            rank, // 0 = unranked (no XP this season)
            progress,
            previousSeason: {
              season: prevSeason,
              xp: prevXp,
              tier: prevTier,
              rewardCoins: prevTier.rewardCoins,
              claimed: prevClaimed,
              claimable: !prevClaimed && prevTier.rewardCoins > 0,
            },
          },
        },
      },
      { headers: NO_STORE }
    );
  } catch (error: any) {
    console.error("[Season] GET error:", error);
    return NextResponse.json({ success: true, data: { ...base, me: null } }, { headers: NO_STORE });
  }
}
