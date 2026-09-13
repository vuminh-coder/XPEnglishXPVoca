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

interface ChallengeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  target: number;
}

const CHALLENGE_DEFINITIONS: ChallengeDef[] = [
  { id: "learn_words", title: "Học 5 từ mới", description: "Thực hành 5 từ vựng hôm nay", icon: "📚", xpReward: 15, coinReward: 10, target: 5 },
  { id: "review_cards", title: "Ôn tập 10 từ vựng", description: "Hoàn thành 10 lượt ôn tập", icon: "🔄", xpReward: 20, coinReward: 15, target: 10 },
  { id: "win_pvp", title: "Thắng 1 trận PvP", description: "Giành chiến thắng trong Đấu trường", icon: "⚔️", xpReward: 25, coinReward: 20, target: 1 },
  { id: "speak_practice", title: "Luyện nói hoặc Shadowing", description: "Luyện phát âm chuẩn ít nhất 5 phút", icon: "🎤", xpReward: 25, coinReward: 20, target: 5 },
  { id: "write_essay", title: "Luyện Dictation / Viết", description: "Luyện nghe chép hoặc viết ít nhất 5 phút", icon: "✍️", xpReward: 25, coinReward: 20, target: 5 },
];

const VALID_SKILLS = ["dictation", "shadowing", "speaking", "vocab", "writing"] as const;
type SkillKey = typeof VALID_SKILLS[number];

function normalizeSkill(rawSkill: string | undefined | null): SkillKey {
  if (!rawSkill) return "vocab";
  const s = rawSkill.toLowerCase().trim();
  if (s.includes("dictation") || s.includes("nghe") || s.includes("listening")) return "dictation";
  if (s.includes("shadowing") || s.includes("nhại")) return "shadowing";
  if (s.includes("speaking") || s.includes("nói")) return "speaking";
  if (s.includes("writing") || s.includes("viết") || s.includes("grammar")) return "writing";
  return "vocab";
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const isGuest = !userId || userId === "guest_user" || userId === "local_user";
    const today = new Date();
    const todayStr = getLocalDateString(today);
    const { startOfWeekStr, endOfWeekStr } = getWeekDateRange();

    // Rolling 7-day window for skills (-4 to +2)
    const rollingDates: string[] = [];
    for (let offset = -4; offset <= 2; offset++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      rollingDates.push(getLocalDateString(d));
    }

    const initialSkillMap: Record<SkillKey, Record<string, number>> = {
      dictation: {},
      shadowing: {},
      speaking: {},
      vocab: {},
      writing: {},
    };
    const initialSkillXpMap: Record<SkillKey, Record<string, number>> = {
      dictation: {},
      shadowing: {},
      speaking: {},
      vocab: {},
      writing: {},
    };
    VALID_SKILLS.forEach((sk) => {
      rollingDates.forEach((dt) => {
        initialSkillMap[sk][dt] = 0;
        initialSkillXpMap[sk][dt] = 0;
      });
    });

    if (isGuest) {
      return NextResponse.json({
        success: true,
        data: {
          checkin: {
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
          challenges: CHALLENGE_DEFINITIONS.map((c) => ({
            ...c,
            progress: 0,
            isCompleted: false,
            isClaimed: false,
          })),
          studyPlan: {
            todayTask: "Luyện nghe chép Dictation 10 phút & nâng cao vốn từ",
          },
          skillPractice: {
            skills: initialSkillMap,
            xpSkills: initialSkillXpMap,
            dates: rollingDates,
            todayDate: todayStr,
          },
        },
      });
    }

    // Authenticated user: Execute all queries concurrently via Promise.all in safeDbExecute
    const overviewData = await safeDbExecute(async () => {
      const startOfWeekDate = new Date(`${startOfWeekStr}T00:00:00.000Z`);
      const endOfWeekDate = new Date(`${endOfWeekStr}T23:59:59.999Z`);
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const startRollingDate = new Date(`${rollingDates[0]}T00:00:00.000Z`);
      const endRollingDate = new Date(`${rollingDates[rollingDates.length - 1]}T23:59:59.999Z`);

      // Run 9 DB operations simultaneously in parallel
      const [
        profile,
        wordsLearnedCount,
        practicesThisWeek,
        examsThisWeek,
        listeningThisWeek,
        vocabThisWeek,
        wordsTodayCount,
        pvpWinsTodayCount,
        rollingSkillPractices,
        listeningRollingRecords,
        studyPlan,
      ] = await Promise.all([
        // 1. Profile
        prisma.profile.findUnique({
          where: { id: userId },
          select: {
            currentStreak: true,
            longestStreak: true,
            totalXp: true,
            coins: true,
            minutesStudied: true,
            updatedAt: true,
          },
        }),
        // 2. Words learned count
        prisma.userVocabulary.count({
          where: { userId, proficiency: { gt: 0 } },
        }),
        // 3. Practices this week
        prisma.dailySkillPractice.findMany({
          where: {
            userId,
            date: { gte: startOfWeekStr, lte: endOfWeekStr },
          },
          select: { date: true, skill: true, minutes: true },
        }),
        // 4. Exams this week
        prisma.examAttempt.findMany({
          where: {
            userId,
            startedAt: { gte: startOfWeekDate, lte: endOfWeekDate },
          },
          select: { startedAt: true },
        }),
        // 5. Listening this week
        prisma.listeningProgress.findMany({
          where: {
            userId,
            lastPracticedAt: { gte: startOfWeekDate, lte: endOfWeekDate },
          },
          select: { lastPracticedAt: true },
        }),
        // 6. Vocab this week
        prisma.userVocabulary.findMany({
          where: {
            userId,
            lastPracticed: { gte: startOfWeekDate, lte: endOfWeekDate },
          },
          select: { lastPracticed: true },
        }),
        // 7. Words practiced today
        prisma.userVocabulary.count({
          where: { userId, lastPracticed: { gte: startOfToday } },
        }),
        // 8. PvP wins today
        prisma.matchHistory.count({
          where: { userId, result: "WIN", createdAt: { gte: startOfToday } },
        }),
        // 9. Rolling skill practices for chart
        prisma.dailySkillPractice.findMany({
          where: { userId, date: { in: rollingDates } },
        }),
        // 10. Rolling listening for chart
        prisma.listeningProgress.findMany({
          where: {
            userId,
            lastPracticedAt: { gte: startRollingDate, lte: endRollingDate },
          },
          select: { lastPracticedAt: true, timeSpent: true },
        }),
        // 11. Study plan
        prisma.studyPlan.findUnique({
          where: { userId },
          include: { dailyTasks: { orderBy: { date: "asc" } } },
        }),
      ]);

      // --- 1. Compute Checkin Data ---
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

      const checkin = {
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

      // --- 2. Compute Challenges Data ---
      const practicesToday = practicesThisWeek.filter((p) => p.date === todayStr);
      let speakingMinutes = 0;
      let writingMinutes = 0;
      const claimedChallengeIds = new Set<string>();

      practicesToday.forEach((p) => {
        if (p.skill === "speaking" || p.skill === "shadowing") {
          speakingMinutes += p.minutes || 0;
        }
        if (p.skill === "writing" || p.skill === "dictation") {
          writingMinutes += p.minutes || 0;
        }
        if (p.skill?.startsWith("challenge_claim_")) {
          claimedChallengeIds.add(p.skill.replace("challenge_claim_", ""));
        }
      });

      const challenges = CHALLENGE_DEFINITIONS.map((def) => {
        let actualProgress = 0;
        switch (def.id) {
          case "learn_words":
            actualProgress = wordsTodayCount;
            break;
          case "review_cards":
            actualProgress = Math.max(wordsTodayCount, Math.min(def.target, wordsLearnedCount));
            break;
          case "win_pvp":
            actualProgress = pvpWinsTodayCount;
            break;
          case "speak_practice":
            actualProgress = speakingMinutes;
            break;
          case "write_essay":
            actualProgress = writingMinutes;
            break;
          default:
            actualProgress = 0;
        }

        return {
          ...def,
          progress: actualProgress,
          isCompleted: actualProgress >= def.target,
          isClaimed: claimedChallengeIds.has(def.id),
        };
      });

      // --- 3. Compute Study Plan Data ---
      let todayTask: string | null = null;
      if (studyPlan && studyPlan.dailyTasks && studyPlan.dailyTasks.length > 0) {
        const found = studyPlan.dailyTasks.find((t: any) => {
          const taskDate = new Date(t.date).toISOString().slice(0, 10);
          return taskDate === todayStr;
        });
        if (found) {
          todayTask = found.description;
        }
      }
      if (!todayTask) {
        todayTask = "Luyện nghe chép Dictation 10 phút & ôn tập từ vựng";
      }

      // --- 4. Compute Skill Practice Chart Data ---
      rollingSkillPractices.forEach((rec: any) => {
        const sk = normalizeSkill(rec.skill);
        if (initialSkillMap[sk] && rec.date) {
          initialSkillMap[sk][rec.date] = (initialSkillMap[sk][rec.date] || 0) + (rec.minutes || 0);
        }
        if (initialSkillXpMap[sk] && rec.date) {
          initialSkillXpMap[sk][rec.date] = (initialSkillXpMap[sk][rec.date] || 0) + (rec.xpEarned || 0);
        }
      });

      listeningRollingRecords.forEach((l) => {
        if (l.lastPracticedAt) {
          const dt = getLocalDateString(new Date(l.lastPracticedAt));
          if (initialSkillMap.dictation && dt in initialSkillMap.dictation) {
            const estimatedMins = Math.max(5, Math.round((l.timeSpent || 0) / 60) || 5);
            initialSkillMap.dictation[dt] = Math.max(initialSkillMap.dictation[dt] || 0, estimatedMins);
          }
        }
      });

      const skillPractice = {
        skills: initialSkillMap,
        xpSkills: initialSkillXpMap,
        dates: rollingDates,
        todayDate: todayStr,
      };

      return {
        checkin,
        challenges,
        studyPlan: { todayTask },
        skillPractice,
      };
    }, "Dashboard Overview Query");

    return NextResponse.json(
      {
        success: true,
        data: overviewData,
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Dashboard overview API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load dashboard overview" },
      { status: 500 }
    );
  }
}
