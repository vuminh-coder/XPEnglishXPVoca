import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEVEL_TITLES } from "@/lib/constants";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { opponent, userScore, oppScore, result, xpGained } = body;

    if (!opponent || userScore === undefined || oppScore === undefined || !result || xpGained === undefined) {
      return NextResponse.json({ error: "Missing required match fields" }, { status: 400 });
    }

    const transactionResult = await prisma.$transaction(async (tx) => {
      // 1. Create MatchHistory entry
      const match = await tx.matchHistory.create({
        data: {
          userId: userId,
          opponent: opponent,
          userScore: parseInt(userScore),
          oppScore: parseInt(oppScore),
          result: result,
          xpGained: parseInt(xpGained),
        },
      });

      // 2. Fetch profile
      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      // 3. Update XP and check Level up
      const newXp = profile.totalXp + parseInt(xpGained);
      let newLevel = profile.level;
      let levelUp = false;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
      }

      const newTitle = LEVEL_TITLES[newLevel] || profile.title;

      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: newXp,
          level: newLevel,
          title: newTitle,
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
  } catch (error: any) {
    console.error("POST /api/pvp/match-submit error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
