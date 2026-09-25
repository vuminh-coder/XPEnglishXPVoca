import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError, safeDbExecute } from "@/infrastructure/database/prisma";
import { LEVEL_TITLES } from "@/shared/constants";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

function calculateLevelFromXp(totalXp: number): { level: number; title: string } {
  let level = 1;
  for (let i = 1; i < LEVEL_XP.length; i++) {
    if (totalXp >= LEVEL_XP[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const title = LEVEL_TITLES[level] || "Master Learner";
  return { level, title };
}

/**
 * Server-Authoritative User Activity Award Endpoint
 * Securely increments XP, Coins, and Practice Time in PostgreSQL
 * and updates DailySkillPractice records with bounds checking.
 */
export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json().catch(() => ({}));
    const { xp = 0, coins = 0, minutes = 0, skill = "vocab" } = body;

    // Bounds checking & sanity validation (prevent client spoofing absurd values)
    const safeXp = Math.max(0, Math.min(500, Math.round(Number(xp) || 0)));
    const safeCoins = Math.max(0, Math.min(200, Math.round(Number(coins) || 0)));
    const safeMinutes = Math.max(0, Math.min(180, Math.round(Number(minutes) || 0)));
    const safeSkill = String(skill || "vocab").toLowerCase().slice(0, 30);

    // If unauthenticated (Guest / Local User Mode), return accepted payload without DB mutation
    if (!userId || userId === "local_user" || userId.startsWith("local_user") || userId === "guest_user") {
      return NextResponse.json({
        success: true,
        guest: true,
        message: "Activity tracked in guest mode.",
        data: {
          awardedXp: safeXp,
          awardedCoins: safeCoins,
          awardedMinutes: safeMinutes,
        },
      });
    }

    const todayStr = getLocalDateString(new Date());

    const result = await safeDbExecute(async () => {
      // 1. Atomically increment stats on profile
      const updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: safeXp },
          coins: { increment: safeCoins },
          minutesStudied: { increment: safeMinutes },
          updatedAt: new Date(),
        },
        select: {
          id: true,
          totalXp: true,
          level: true,
          title: true,
          coins: true,
          minutesStudied: true,
          currentStreak: true,
          longestStreak: true,
        },
      });

      // 2. Check for level up
      const { level: computedLevel, title: computedTitle } = calculateLevelFromXp(updatedProfile.totalXp);
      let levelUp = false;
      let finalLevel = updatedProfile.level;
      let finalTitle = updatedProfile.title;

      if (computedLevel > updatedProfile.level) {
        levelUp = true;
        finalLevel = computedLevel;
        finalTitle = computedTitle;
        const levelUpCoinsBonus = 100 * computedLevel;

        await prisma.profile.update({
          where: { id: userId },
          data: {
            level: finalLevel,
            title: finalTitle,
            coins: { increment: levelUpCoinsBonus },
          },
        });
      }

      // 3. Upsert DailySkillPractice entry for today
      if (safeMinutes > 0 || safeXp > 0) {
        await prisma.dailySkillPractice.upsert({
          where: {
            userId_skill_date: {
              userId,
              skill: safeSkill,
              date: todayStr,
            },
          },
          update: {
            minutes: { increment: safeMinutes },
            xpEarned: { increment: safeXp },
            updatedAt: new Date(),
          },
          create: {
            userId,
            skill: safeSkill,
            date: todayStr,
            minutes: safeMinutes,
            xpEarned: safeXp,
          },
        });
      }

      return {
        totalXp: updatedProfile.totalXp,
        level: finalLevel,
        title: finalTitle,
        coins: updatedProfile.coins + (levelUp ? 100 * computedLevel : 0),
        minutesStudied: updatedProfile.minutesStudied,
        levelUp,
      };
    }, "Activity Award Persistence");

    // Invalidate RAM cache for dashboard and analytics to immediately reflect new XP/Level/Coins
    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
