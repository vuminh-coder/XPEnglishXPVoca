import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const { gameType, score = 0, xpGained = 0, coinsGained = 0, wordsCompleted = 0 } = body;

    // Security hard cap: max 120 XP and 20 coins per mini-game session
    const safeXp = Math.min(120, Math.max(0, parseInt(String(xpGained), 10) || 0));
    const safeCoins = Math.min(20, Math.max(0, parseInt(String(coinsGained), 10) || 0));
    const safeScore = Math.max(0, parseInt(String(score), 10) || 0);

    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        data: {
          gameType,
          score: safeScore,
          xpGained: safeXp,
          coinsGained: safeCoins,
          wordsCompleted,
        },
      });
    }

    // Transaction to update user's profile with earned XP and Coins
    const updatedUser = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.findUnique({
        where: { id: userId },
        select: { id: true, totalXp: true, level: true, coins: true },
      });

      if (!profile) return null;

      const newXp = profile.totalXp + safeXp;
      const newCoins = (profile.coins ?? 100) + safeCoins;

      // Recalculate level
      let newLevel = profile.level;
      while (newLevel < LEVEL_XP.length - 1 && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
      }

      const newTitle = LEVEL_TITLES[newLevel - 1] || "Beginner";

      return await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: newXp,
          coins: newCoins,
          level: newLevel,
          title: newTitle,
        },
        select: {
          id: true,
          totalXp: true,
          coins: true,
          level: true,
          title: true,
        },
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        gameType,
        score: safeScore,
        xpGained: safeXp,
        coinsGained: safeCoins,
        wordsCompleted,
        updatedUser,
      },
    });
  } catch (error: any) {
    console.error("Error recording game completion:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error recording game session" },
      { status: 500 }
    );
  }
}
