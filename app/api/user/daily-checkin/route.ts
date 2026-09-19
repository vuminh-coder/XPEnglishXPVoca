import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { getLocalDateString, getWeekDateRange } from "@/shared/utils/dateUtils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const isGuest = !userId || userId === "guest_user" || userId === "local_user";
    const todayStr = getLocalDateString();
    const { startOfWeekStr, endOfWeekStr, weekDates } = getWeekDateRange();

    if (isGuest) {
      return NextResponse.json({
        success: true,
        data: {
          isCheckedInToday: false,
          activeDaysInWeek: [],
          currentStreak: 1,
          longestStreak: 1,
          todayStr,
        },
      });
    }

    const startOfWeekDate = new Date(`${startOfWeekStr}T00:00:00.000Z`);
    const endOfWeekDate = new Date(`${endOfWeekStr}T23:59:59.999Z`);

    // High-performance single root query: fetches profile, vocabulary count,
    // and weekly active practice logs in a single DB operation to eliminate pool exhaustion.
    const result = await safeDbExecute(async () => {
      const profile = await prisma.profile.findUnique({
        where: { id: userId },
        select: {
          currentStreak: true,
          longestStreak: true,
          totalXp: true,
          coins: true,
          minutesStudied: true,
          _count: {
            select: {
              vocabularies: {
                where: { proficiency: { gt: 0 } },
              },
            },
          },
          dailySkillPractices: {
            where: {
              date: {
                gte: startOfWeekStr,
                lte: endOfWeekStr,
              },
            },
            select: {
              date: true,
              skill: true,
            },
          },
          examAttempts: {
            where: {
              startedAt: {
                gte: startOfWeekDate,
                lte: endOfWeekDate,
              },
            },
            select: {
              startedAt: true,
            },
          },
          listeningProgresses: {
            where: {
              lastPracticedAt: {
                gte: startOfWeekDate,
                lte: endOfWeekDate,
              },
            },
            select: {
              lastPracticedAt: true,
            },
          },
          vocabularies: {
            where: {
              lastPracticed: {
                gte: startOfWeekDate,
                lte: endOfWeekDate,
              },
            },
            select: {
              lastPracticed: true,
            },
          },
        },
      });

      if (!profile) {
        return null;
      }

      const activeDaysSet = new Set<string>();

      profile.dailySkillPractices.forEach((p) => {
        if (p.date) activeDaysSet.add(p.date);
      });

      profile.examAttempts.forEach((e) => {
        if (e.startedAt) activeDaysSet.add(getLocalDateString(new Date(e.startedAt)));
      });

      profile.listeningProgresses.forEach((l) => {
        if (l.lastPracticedAt) activeDaysSet.add(getLocalDateString(new Date(l.lastPracticedAt)));
      });

      profile.vocabularies.forEach((v) => {
        if (v.lastPracticed) activeDaysSet.add(getLocalDateString(new Date(v.lastPracticed)));
      });

      const isCheckedInToday = profile.dailySkillPractices.some(
        (p) => p.date === todayStr && p.skill === "checkin"
      );

      return {
        isCheckedInToday,
        activeDaysInWeek: Array.from(activeDaysSet),
        currentStreak: profile.currentStreak || 1,
        longestStreak: profile.longestStreak || 1,
        totalXp: profile.totalXp || 0,
        coins: profile.coins || 0,
        wordsLearned: profile._count?.vocabularies ?? 0,
        minutesStudied: profile.minutesStudied || 0,
        todayStr,
      };
    }, "Daily Checkin Single Query");

    return NextResponse.json({
      success: true,
      data: result || {
        isCheckedInToday: false,
        activeDaysInWeek: [],
        currentStreak: 1,
        longestStreak: 1,
        totalXp: 0,
        coins: 0,
        wordsLearned: 0,
        minutesStudied: 0,
        todayStr,
      },
    });
  } catch (error: any) {
    console.error("GET /api/user/daily-checkin error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId || userId === "guest_user" || userId === "local_user") {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để điểm danh và nhận thưởng XP/Vàng." },
        { status: 401 }
      );
    }

    const todayStr = getLocalDateString();
    const XP_REWARD = 15;
    const COIN_REWARD = 20;
    const PRACTICE_MINUTES = 5;

    // The log row is protected by a unique key. Keep the log and the reward in
    // one transaction so a failed request cannot mint XP without a check-in.
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check if user already checked in today in DailySkillPractice
      const existingCheckin = await tx.dailySkillPractice.findUnique({
        where: {
          userId_skill_date: {
            userId,
            skill: "checkin",
            date: todayStr,
          },
        },
      });

      if (existingCheckin) {
        return {
          alreadyCheckedIn: true,
          message: "Bạn đã điểm danh hôm nay rồi!",
        };
      }

      // 2. Fetch current user profile
      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) {
        throw new Error("Không tìm thấy thông tin tài khoản.");
      }

      // 3. Compute streak from the previous check-in, not profile.updatedAt.
      // Profile updates can be caused by unrelated activity and must not reset a streak.
      const previousCheckin = await tx.dailySkillPractice.findFirst({
        where: { userId, skill: "checkin", date: { lt: todayStr } },
        orderBy: { date: "desc" },
        select: { date: true },
      });
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getLocalDateString(yesterday);
      const lastCheckinDate = previousCheckin?.date;

      const newStreak = lastCheckinDate === yesterdayStr
        ? Math.max(1, profile.currentStreak) + 1
        : 1;
      const newLongestStreak = Math.max(profile.longestStreak || 1, newStreak);

      // 4. Update Profile with XP, Coins, Minutes and Streak
      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: XP_REWARD },
          coins: { increment: COIN_REWARD },
          minutesStudied: { increment: PRACTICE_MINUTES },
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          updatedAt: new Date(),
        },
      });

      // 5. Record Checkin Practice Session in DailySkillPractice
      await tx.dailySkillPractice.create({
        data: {
          userId,
          skill: "checkin",
          date: todayStr,
          minutes: PRACTICE_MINUTES,
          xpEarned: XP_REWARD,
        },
      });

      return {
        alreadyCheckedIn: false,
        xpAwarded: XP_REWARD,
        coinsAwarded: COIN_REWARD,
        minutesAwarded: PRACTICE_MINUTES,
        currentStreak: updatedProfile.currentStreak,
        longestStreak: updatedProfile.longestStreak,
        totalXp: updatedProfile.totalXp,
        coins: updatedProfile.coins,
        message: `Điểm danh thành công! +${XP_REWARD} XP, +${COIN_REWARD} Vàng đã được cộng vào tài khoản.`,
      };
    });

    if (result && result.alreadyCheckedIn) {
      return NextResponse.json({
        success: true,
        alreadyCheckedIn: true,
        message: result.message,
      });
    }

    // Invalidate cached overview metrics so UI immediately displays new streak/XP/coins
    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({
        success: true,
        alreadyCheckedIn: true,
        message: "Bạn đã điểm danh hôm nay rồi!",
      });
    }
    console.error("POST /api/user/daily-checkin error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
