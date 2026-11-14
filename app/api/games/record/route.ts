import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { sharedStore } from "@/infrastructure/cache/sharedStore";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { calculateLevelAndTitle } from "@/shared/utils/xp";

// Anti-Cheat constraints
const MIN_PLAY_DURATION_SECONDS = 8;
const MIN_WORDLINK_DURATION_SECONDS = 3;
const MIN_COOLDOWN_MS = 12 * 1000; // Minimum 12s between consecutive game score recordings
const MIN_FAST_GAME_COOLDOWN_MS = 3 * 1000; // 3s cooldown for multi-part roadmap studio games
const MAX_SERVER_XP_CAP = 60;
const MAX_SERVER_COINS_CAP = 15;

function getMinDurationForGame(gameType: string): number {
  if (gameType === "wordlink" || gameType === "sentence") {
    return MIN_WORDLINK_DURATION_SECONDS;
  }
  return MIN_PLAY_DURATION_SECONDS;
}

function getCooldownForGame(gameType: string): number {
  if (gameType === "wordlink" || gameType === "sentence") {
    return MIN_FAST_GAME_COOLDOWN_MS;
  }
  return MIN_COOLDOWN_MS;
}

// Cross-instance distributed rate cooldown key prefix
const GAME_COOLDOWN_PREFIX = "game_cooldown:";

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
  const minDuration = getMinDurationForGame(gameType);
  // If duration is suspiciously short, reject rewards
  if (durationSeconds < minDuration) {
    return { xp: 0, coins: 0 };
  }

  let xp = 0;
  let coins = 0;

  switch (gameType) {
    case "wordlink": {
      // Word Link: 4-5 bilingual pairs reflex matching
      const pairs = Math.max(1, Math.min(wordsCompleted || 4, 10));
      xp = Math.min(45, Math.max(15, pairs * 7 + (score >= 45 ? 2 : 0)));
      coins = Math.min(15, Math.max(10, Math.round(pairs * 3.75)));
      break;
    }
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
    case "blitz": {
      // Speed Blitz: 60s reflex speed game
      const correctWords = Math.max(0, Math.min(wordsCompleted || Math.floor(score / 15), 35));
      xp = Math.min(60, Math.max(15, correctWords * 3 + Math.floor(score / 25)));
      coins = Math.min(15, Math.max(4, Math.floor(correctWords / 2)));
      break;
    }
    case "sentence": {
      // Sentence Builder: grammar & collocation unscramble
      const completedSentences = Math.max(1, Math.min(wordsCompleted || 5, 10));
      xp = Math.min(60, completedSentences * 10);
      coins = Math.min(15, Math.round(completedSentences * 2.5));
      break;
    }
    case "picture": {
      // PictoWord Visual Match: 8 visual questions
      const correctImages = Math.max(1, Math.min(wordsCompleted || 5, 12));
      xp = Math.min(60, correctImages * 7);
      coins = Math.min(15, Math.max(4, Math.round(correctImages * 1.8)));
      break;
    }
    case "audio": {
      // Audio Ear Challenge: 8 listening questions
      const correctAudios = Math.max(1, Math.min(wordsCompleted || 5, 12));
      xp = Math.min(60, correctAudios * 7);
      coins = Math.min(15, Math.max(4, Math.round(correctAudios * 1.8)));
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

    // Rate Limiting & Cooldown Protection (serverless-safe via sharedStore)
    const now = Date.now();
    const cooldownKey = `${GAME_COOLDOWN_PREFIX}${userId}:${gameType}`;
    const lastPlayed = (await sharedStore.get<number>(cooldownKey)) || 0;
    const requiredCooldown = getCooldownForGame(gameType);
    if (now - lastPlayed < requiredCooldown) {
      return NextResponse.json(
        {
          success: false,
          code: "GAME_COOLDOWN_ACTIVE",
          error: "Vui lòng nghỉ ngơi giây lát trước khi bắt đầu ván chơi mới.",
        },
        { status: 429, headers: { "Retry-After": "10" } }
      );
    }

    await sharedStore.set(cooldownKey, now, Math.max(10, Math.ceil(requiredCooldown / 1000)));

    // If duration was too fast, acknowledge game over but grant 0 rewards
    if (durationSeconds < getMinDurationForGame(gameType)) {
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
        const practiceMinutes = Math.max(1, Math.round(durationSeconds / 60));

        const updated = await tx.profile.update({
          where: { id: userId },
          data: {
            totalXp: newXp,
            coins: newCoins,
            level: newLevel,
            title: newTitle,
            ...(authorizedXp > 0 ? { minutesStudied: { increment: practiceMinutes } } : {}),
          },
          select: {
            id: true,
            totalXp: true,
            coins: true,
            level: true,
            title: true,
          },
        });

        // Sync to DailySkillPractice for 7-day analytics & skill charts if XP earned
        if (authorizedXp > 0) {
          const todayDate = getLocalDateString(new Date());
          const practiceMinutes = Math.max(1, Math.round(durationSeconds / 60));
          await tx.dailySkillPractice.upsert({
            where: {
              userId_skill_date: {
                userId,
                skill: "vocab",
                date: todayDate,
              },
            },
            update: {
              minutes: { increment: practiceMinutes },
              xpEarned: { increment: authorizedXp },
            },
            create: {
              userId,
              skill: "vocab",
              date: todayDate,
              minutes: practiceMinutes,
              xpEarned: authorizedXp,
            },
          });
        }

        return updated;
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
