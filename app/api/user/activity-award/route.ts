import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma, handlePrismaError, safeDbExecute } from "@/infrastructure/database/prisma";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { calculateLevelFromXp } from "@/shared/utils/xp";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { isRateLimited } from "@/infrastructure/security/rateLimit";

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
    const safeXp = Math.max(0, Math.min(100, Math.round(Number(xp) || 0)));
    const safeCoins = Math.max(0, Math.min(50, Math.round(Number(coins) || 0)));
    const safeMinutes = Math.max(0, Math.min(60, Math.round(Number(minutes) || 0)));
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

    if (isRateLimited(`activity_award_${userId}`, 12, 60_000)) {
      return NextResponse.json(
        { error: "Bạn đang gửi yêu cầu nhận thưởng quá nhanh. Vui lòng chờ giây lát." },
        { status: 429 }
      );
    }

    const todayStr = getLocalDateString(new Date());

    const result = await safeDbExecute(async () => {
      // 0. Check server-authoritative 2X XP multipliers (VIP Premium or active Double XP Boost)
      const bonusState = await prisma.profile.findUnique({
        where: { id: userId },
        select: { isPremium: true, doubleXpUntil: true },
      });
      const hasDoubleXp = Boolean(
        bonusState?.isPremium ||
          (bonusState?.doubleXpUntil && new Date(bonusState.doubleXpUntil).getTime() > Date.now())
      );
      const grantedXp = hasDoubleXp ? safeXp * 2 : safeXp;

      // 1. Atomically increment stats on profile
      const updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: grantedXp },
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
          streakFreezes: true,
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

      // Check whether today already has any practice recorded prior to this award
      const existingPracticeToday = await prisma.dailySkillPractice.findFirst({
        where: {
          userId,
          date: todayStr,
        },
      });
      const isFirstActivityToday = !existingPracticeToday;

      // 3. Upsert DailySkillPractice entry for today
      if (safeMinutes > 0 || grantedXp > 0) {
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
            xpEarned: { increment: grantedXp },
            updatedAt: new Date(),
          },
          create: {
            userId,
            skill: safeSkill,
            date: todayStr,
            minutes: safeMinutes,
            xpEarned: grantedXp,
          },
        });
      }

      // 4. Server-Authoritative Streak Calculation from Database Activity Records
      let finalStreak = updatedProfile.currentStreak;
      let finalLongest = updatedProfile.longestStreak;
      let finalFreezes = updatedProfile.streakFreezes ?? 0;

      if (isFirstActivityToday) {
        const previousPractice = await prisma.dailySkillPractice.findFirst({
          where: {
            userId,
            date: { lt: todayStr },
          },
          orderBy: { date: "desc" },
          select: { date: true },
        });

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = getLocalDateString(yesterday);

        const dayBeforeYesterday = new Date();
        dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
        const dayBeforeYesterdayStr = getLocalDateString(dayBeforeYesterday);

        const lastPracticeDate = previousPractice?.date;

        if (lastPracticeDate === yesterdayStr) {
          finalStreak = Math.max(1, updatedProfile.currentStreak) + 1;
        } else if (lastPracticeDate === dayBeforeYesterdayStr && finalFreezes > 0) {
          finalFreezes -= 1;
          finalStreak = Math.max(1, updatedProfile.currentStreak) + 1;
        } else {
          finalStreak = 1;
        }

        finalLongest = Math.max(finalLongest || 1, finalStreak);

        await prisma.profile.update({
          where: { id: userId },
          data: {
            currentStreak: finalStreak,
            longestStreak: finalLongest,
            streakFreezes: finalFreezes,
          },
        });
      }

      return {
        totalXp: updatedProfile.totalXp,
        awardedXp: grantedXp,
        multiplier: hasDoubleXp ? 2 : 1,
        level: finalLevel,
        title: finalTitle,
        coins: updatedProfile.coins + (levelUp ? 100 * computedLevel : 0),
        minutesStudied: updatedProfile.minutesStudied,
        currentStreak: finalStreak,
        longestStreak: finalLongest,
        streakFreezes: finalFreezes,
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
