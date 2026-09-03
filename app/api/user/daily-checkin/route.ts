import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekDateRange(): { startOfWeekStr: string; endOfWeekStr: string; weekDates: string[] } {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const dayDiff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Monday start

  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDiff);
  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
    weekDates.push(getLocalDateString(d));
  }

  return {
    startOfWeekStr: weekDates[0],
    endOfWeekStr: weekDates[6],
    weekDates,
  };
}

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

    const result = await safeDbExecute(async () => {
      const profile = await prisma.profile.findUnique({
        where: { id: userId },
        select: {
          currentStreak: true,
          longestStreak: true,
          totalXp: true,
          coins: true,
          minutesStudied: true,
          updatedAt: true,
        },
      });

      const wordsLearnedCount = await prisma.userVocabulary.count({
        where: { userId, proficiency: { gt: 0 } },
      });

      const startOfWeekDate = new Date(`${startOfWeekStr}T00:00:00.000Z`);
      const endOfWeekDate = new Date(`${endOfWeekStr}T23:59:59.999Z`);

      // 1. Query active days this week from DailySkillPractice
      const practicesThisWeek = await prisma.dailySkillPractice.findMany({
        where: {
          userId,
          date: {
            gte: startOfWeekStr,
            lte: endOfWeekStr,
          },
        },
        select: {
          date: true,
          skill: true,
        },
      });

      // 2. Query active days this week from ExamAttempt (Thi thử)
      const examsThisWeek = await prisma.examAttempt.findMany({
        where: {
          userId,
          startedAt: {
            gte: startOfWeekDate,
            lte: endOfWeekDate,
          },
        },
        select: {
          startedAt: true,
        },
      });

      // 3. Query active days this week from ListeningProgress (Luyện nghe)
      const listeningThisWeek = await prisma.listeningProgress.findMany({
        where: {
          userId,
          lastPracticedAt: {
            gte: startOfWeekDate,
            lte: endOfWeekDate,
          },
        },
        select: {
          lastPracticedAt: true,
        },
      });

      // 4. Query active days this week from UserVocabulary (Ôn tập từ vựng)
      const vocabThisWeek = await prisma.userVocabulary.findMany({
        where: {
          userId,
          lastPracticed: {
            gte: startOfWeekDate,
            lte: endOfWeekDate,
          },
        },
        select: {
          lastPracticed: true,
        },
      });

      const activeDaysSet = new Set<string>();

      practicesThisWeek.forEach((p) => {
        if (p.date) activeDaysSet.add(p.date);
      });

      examsThisWeek.forEach((e) => {
        if (e.startedAt) activeDaysSet.add(getLocalDateString(new Date(e.startedAt)));
      });

      listeningThisWeek.forEach((l) => {
        if (l.lastPracticedAt) activeDaysSet.add(getLocalDateString(new Date(l.lastPracticedAt)));
      });

      vocabThisWeek.forEach((v) => {
        if (v.lastPracticed) activeDaysSet.add(getLocalDateString(new Date(v.lastPracticed)));
      });

      const isCheckedInToday = practicesThisWeek.some(
        (p) => p.date === todayStr && p.skill === "checkin"
      );

      return {
        isCheckedInToday,
        activeDaysInWeek: Array.from(activeDaysSet),
        currentStreak: profile?.currentStreak || 1,
        longestStreak: profile?.longestStreak || 1,
        totalXp: profile?.totalXp || 0,
        coins: profile?.coins || 0,
        wordsLearned: wordsLearnedCount,
        minutesStudied: profile?.minutesStudied || 0,
        todayStr,
      };
    }, "Daily Checkin Query");

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

    const result = await safeDbExecute(async () => {
      // 1. Check if user already checked in today in DailySkillPractice
      const existingCheckin = await prisma.dailySkillPractice.findFirst({
        where: {
          userId,
          date: todayStr,
          skill: "checkin",
        },
      });

      if (existingCheckin) {
        return {
          alreadyCheckedIn: true,
          message: "Bạn đã điểm danh hôm nay rồi!",
        };
      }

      // 2. Fetch current user profile
      const profile = await prisma.profile.findUnique({
        where: { id: userId },
      });

      if (!profile) {
        throw new Error("Không tìm thấy thông tin tài khoản.");
      }

      // 3. Compute Streak Logic
      const lastUpdate = profile.updatedAt ? new Date(profile.updatedAt) : new Date(0);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getLocalDateString(yesterday);
      const lastUpdateStr = getLocalDateString(lastUpdate);

      let newStreak = profile.currentStreak || 0;
      if (lastUpdateStr === yesterdayStr || lastUpdateStr === todayStr) {
        if (lastUpdateStr === yesterdayStr) {
          newStreak += 1;
        }
      } else {
        newStreak = 1;
      }
      const newLongestStreak = Math.max(profile.longestStreak || 1, newStreak);

      // 4. Update Profile with XP, Coins, Minutes and Streak
      const updatedProfile = await prisma.profile.update({
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
      await prisma.dailySkillPractice.create({
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
    }, "Daily Checkin Submit");

    if (result && result.alreadyCheckedIn) {
      return NextResponse.json({
        success: true,
        alreadyCheckedIn: true,
        message: result.message,
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("POST /api/user/daily-checkin error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
