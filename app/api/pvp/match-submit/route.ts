import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEVEL_TITLES } from "@/lib/constants";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

import { getXpProgress } from "@/lib/utils/calculateXP";
import { calculateXp, MatchResult, VALID_RESULTS } from "@/lib/utils/xp";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { opponent, userScore, oppScore, result } = body;

    // Validate required fields
    if (!opponent || userScore === undefined || oppScore === undefined || !result) {
      return NextResponse.json({ error: "Missing required match fields" }, { status: 400 });
    }

    // Validate result is a known value
    if (!VALID_RESULTS.includes(result)) {
      return NextResponse.json({ error: "Invalid match result" }, { status: 400 });
    }

    // Validate scores are non-negative integers
    const parsedUserScore = parseInt(userScore);
    const parsedOppScore = parseInt(oppScore);
    if (isNaN(parsedUserScore) || isNaN(parsedOppScore) || parsedUserScore < 0 || parsedOppScore < 0) {
      return NextResponse.json({ error: "Invalid score values" }, { status: 400 });
    }

    // Server calculates XP — client value is ignored
    const xpGained = calculateXp(result as MatchResult, parsedUserScore, parsedOppScore);

    const transactionResult = await prisma.$transaction(async (tx) => {
      // 1. Create MatchHistory entry
      const match = await tx.matchHistory.create({
        data: {
          userId: userId,
          opponent: opponent,
          userScore: parsedUserScore,
          oppScore: parsedOppScore,
          result: result,
          xpGained: xpGained,
        },
      });

      // 2. Fetch profile
      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      // 3. Update XP, check Level up, and calculate Coins
      const newXp = profile.totalXp + xpGained;
      let newLevel = profile.level;
      let levelUp = false;
      let levelUpCoins = 0;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
        levelUpCoins += 100 * newLevel;
      }

      const newTitle = LEVEL_TITLES[newLevel] || profile.title;
      const coinsGained = result === "WIN" ? 20 : result === "DRAW" ? 10 : 2;
      const totalCoinsGained = coinsGained + levelUpCoins;

      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: newXp,
          level: newLevel,
          title: newTitle,
          coins: { increment: totalCoinsGained },
        },
      });

      return {
        match,
        profile: updatedProfile,
        levelUp,
      };
    });

    return NextResponse.json({
      success: true,
      data: transactionResult.match,
      profile: transactionResult.profile,
      levelUp: transactionResult.levelUp,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("POST /api/pvp/match-submit error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
