import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

// Level threshold milestones
const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

function calculateLevelAndTitle(xp: number, currentLevel: number) {
  let newLevel = currentLevel;
  while (newLevel < LEVEL_XP.length && xp >= LEVEL_XP[newLevel]) {
    newLevel++;
  }
  return { level: newLevel, title: LEVEL_TITLES[newLevel] || "Grandmaster" };
}

// Anti-Cheat constraints
const MIN_PLAY_DURATION_SECONDS = 8;
const MIN_COOLDOWN_MS = 12 * 1000; // Minimum 12s between consecutive game score recordings
const MAX_SERVER_XP_CAP = 60;
const MAX_SERVER_COINS_CAP = 15;

// In-memory rate limiting map: userId -> lastSubmissionTimestampMs
const userLastGameTimestamp = new Map<string, number>();

// Periodic cleanup every 10 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [uid, time] of userLastGameTimestamp.entries()) {
      if (now - time > 10 * 60 * 1000) {
        userLastGameTimestamp.delete(uid);
      }
    }
  }, 10 * 60 * 1000).unref?.();
}

/**
 * Server-authoritative reward calculation based on game rules
 */
function calculateAuthorizedRewards(
  gameType: string,
  score: number,
  wordsCompleted: number,
  attempts: number,
  durationSeconds: number
): { xp: number; coins: number } {
  // If duration is suspiciously short (< 8s), reject rewards
  if (durationSeconds < MIN_PLAY_DURATION_SECONDS) {
    return { xp: 0, coins: 0 };
  }

  let xp = 0;
  let coins = 0;

  switch (gameType) {
    case "memory": {
      // Memory match: 6 pairs = 12 cards
      xp = 30;
      if (score >= 40) xp += 10; // High score bonus for low moves
      coins = 8;
      break;
    }
    case "scramble": {
      // Word scramble: 5-8 words per round
      const words = Math.max(1, Math.min(wordsCompleted || 5, 10));
      xp = Math.min(50, words * 8);
      coins = Math.min(12, words * 2);
      break;
    }
    case "wordle": {
      // Wordle attempts: 1st guess: 50XP, 2nd: 45XP, 3rd: 40XP, 4th: 35XP, 5th: 30XP, 6th: 25XP
      const attemptIdx = Math.max(1, Math.min(attempts || 6, 6));
      const wordleXp = [50, 45, 40, 35, 30, 25];
      xp = wordleXp[attemptIdx - 1] || 25;
      coins = 5;
      break;
    }
    default: {
      xp = Math.min(30, Math.max(10, Math.floor(score / 5)));
      coins = 5;
      break;
    }
  }

  return {
    xp: Math.min(MAX_SERVER_XP_CAP, Math.max(0, xp)),
    coins: Math.min(MAX_SERVER_COINS_CAP, Math.max(0, coins)),
  };
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json().catch(() => ({}));

    const gameType = typeof body?.gameType === "string" ? body.gameType : "unknown";
    const score = typeof body?.score === "number" ? Math.max(0, body.score) : 0;
    const wordsCompleted = typeof body?.wordsCompleted === "number" ? Math.max(0, body.wordsCompleted) : 0;
    const attempts = typeof body?.attempts === "number" ? Math.max(1, body.attempts) : 6;
    const durationSeconds = typeof body?.durationSeconds === "number" ? Math.max(0, body.durationSeconds) : 0;

    // Server authoritative reward computation
    const { xp: authorizedXp, coins: authorizedCoins } = calculateAuthorizedRewards(
      gameType,
      score,
      wordsCompleted,
      attempts,
      durationSeconds
    );

    // Guest mode: return computed reward without DB mutation
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        data: {
          gameType,
          score,
          xpGained: authorizedXp,
          coinsGained: authorizedCoins,
        },
      });
    }

    // Rate Limiting & Cooldown Protection
    const now = Date.now();
    const lastPlayed = userLastGameTimestamp.get(userId) || 0;
    if (now - lastPlayed < MIN_COOLDOWN_MS) {
      return NextResponse.json(
        {
          success: false,
          code: "GAME_COOLDOWN_ACTIVE",
          error: "Vui lòng nghỉ ngơi giây lát trước khi bắt đầu ván chơi mới.",
        },
        { status: 429, headers: { "Retry-After": "10" } }
      );
    }

    userLastGameTimestamp.set(userId, now);

    // If duration was too fast, acknowledge game over but grant 0 rewards
    if (durationSeconds < MIN_PLAY_DURATION_SECONDS) {
      return NextResponse.json({
        success: true,
        antiCheatFlagged: true,
        data: {
          gameType,
          score,
          xpGained: 0,
          coinsGained: 0,
          message: "Ván chơi quá ngắn để ghi nhận phần thưởng.",
        },
      });
    }

    // Atomic database update with resilience
    const updatedProfile = await prisma.$transaction(
      async (tx) => {
        const profile = await tx.profile.findUnique({
          where: { id: userId },
          select: { id: true, totalXp: true, level: true, coins: true },
        });

        if (!profile) return null;

        const newXp = profile.totalXp + authorizedXp;
        const newCoins = (profile.coins ?? 100) + authorizedCoins;
        const { level: newLevel, title: newTitle } = calculateLevelAndTitle(newXp, profile.level);

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
      },
      {
        maxWait: 10000,
        timeout: 15000,
      }
    );

    if (userId) {
      invalidateDashboardCache(userId);
    }

    return NextResponse.json({
      success: true,
      data: {
        gameType,
        score,
        xpGained: authorizedXp,
        coinsGained: authorizedCoins,
        updatedProfile,
      },
    });
  } catch (error: any) {
    console.error("POST /api/games/record error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể lưu kết quả ván chơi." },
      { status: 500 }
    );
  }
}
