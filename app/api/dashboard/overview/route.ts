import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { getLocalDateString, getWeekDateRange } from "@/shared/utils/dateUtils";
import { NextResponse } from "next/server";

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

// In-Flight Request Deduplication map: userId -> Promise<any>
const inFlightOverviewMap = new Map<string, Promise<any>>();

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const isGuest = !userId || userId === "guest_user" || userId === "local_user";
    const today = new Date();
    const todayStr = getLocalDateString(today);

    const cacheKey = `dashboard_overview:${userId}:${todayStr}`;
    if (!isGuest) {
      const cached = memoryCache.get<any>(cacheKey);
      if (cached) {
        return NextResponse.json(
          {
            success: true,
            data: cached,
          },
          {
            headers: {
              "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60",
              "X-Cache": "HIT",
            },
          }
        );
      }
    }
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

    const overviewData = await safeDbExecute(async () => {
        const startOfWeekDate = new Date(`${startOfWeekStr}T00:00:00.000Z`);
        const endOfWeekDate = new Date(`${endOfWeekStr}T23:59:59.999Z`);
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startRollingDate = new Date(`${rollingDates[0]}T00:00:00.000Z`);
        const endRollingDate = new Date(`${rollingDates[rollingDates.length - 1]}T23:59:59.999Z`);

        const minListeningDate = startOfWeekDate < startRollingDate ? startOfWeekDate : startRollingDate;
        const maxListeningDate = endOfWeekDate > endRollingDate ? endOfWeekDate : endRollingDate;

        // SINGLE ROOT QUERY ARCHITECTURE:
        // Consolidates 8 parallel queries into 1 single query on Profile using nested relations and filtered _count.
        // Drops connection checkout from 8 connections to exactly 1 connection (87.5% pool pressure reduction).
        const profile = await prisma.profile.findUnique({
          where: { id: userId },
          select: {
            currentStreak: true,
            longestStreak: true,
            totalXp: true,
            coins: true,
            minutesStudied: true,
            updatedAt: true,
            // 1. DailySkillPractice (this week + rolling chart dates)
            dailySkillPractices: {
              where: {
                OR: [
                  { date: { gte: startOfWeekStr, lte: endOfWeekStr } },
                  { date: { in: rollingDates } },
                ],
              },
              select: { date: true, skill: true, minutes: true, xpEarned: true },
            },
            // 2. ExamAttempts this week
            examAttempts: {
              where: { startedAt: { gte: startOfWeekDate, lte: endOfWeekDate } },
              select: { startedAt: true },
            },
            // 3. ListeningProgress (this week + rolling dates)
            listeningProgresses: {
              where: { lastPracticedAt: { gte: minListeningDate, lte: maxListeningDate } },
              select: { lastPracticedAt: true, timeSpent: true },
            },
            // 4. UserVocabulary this week
            vocabularies: {
              where: { lastPracticed: { gte: startOfWeekDate, lte: endOfWeekDate } },
              select: { lastPracticed: true },
            },
            // 5. StudyPlan with dailyTasks
            studyPlan: {
              include: { dailyTasks: { orderBy: { date: "asc" } } },
            },
            // 6. Filtered counts computed inside PostgreSQL engine
            _count: {
              select: {
                vocabularies: { where: { proficiency: { gt: 0 } } },
                matchHistories: { where: { result: "WIN", createdAt: { gte: startOfToday } } },
              },
            },
          },
        });

        const wordsLearnedCount = profile?._count?.vocabularies ?? 0;
        const pvpWinsTodayCount = profile?._count?.matchHistories ?? 0;
        const allDailySkillPractices = profile?.dailySkillPractices ?? [];
        const examsThisWeek = profile?.examAttempts ?? [];
        const allListeningRecords = profile?.listeningProgresses ?? [];
        const vocabThisWeek = profile?.vocabularies ?? [];
        const studyPlan = profile?.studyPlan ?? null;

      // In-memory partitioning to preserve exact logic without extra queries
      const practicesThisWeek = allDailySkillPractices.filter(
        (p) => p.date >= startOfWeekStr && p.date <= endOfWeekStr
      );
      const rollingSkillPractices = allDailySkillPractices.filter((p) =>
        rollingDates.includes(p.date)
      );

      const listeningThisWeek = allListeningRecords.filter(
        (l) => l.lastPracticedAt && l.lastPracticedAt >= startOfWeekDate && l.lastPracticedAt <= endOfWeekDate
      );
      const listeningRollingRecords = allListeningRecords.filter(
        (l) => l.lastPracticedAt && l.lastPracticedAt >= startRollingDate && l.lastPracticedAt <= endRollingDate
      );

      const wordsTodayCount = vocabThisWeek.filter(
        (v) => v.lastPracticed && v.lastPracticed >= startOfToday
      ).length;

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

    if (!isGuest && overviewData) {
      memoryCache.set(cacheKey, overviewData, 30);
    }

    return NextResponse.json(
      {
        success: true,
        data: overviewData,
      },
      {
        headers: {
          "Cache-Control": isGuest
            ? "public, s-maxage=60, stale-while-revalidate=120"
            : "private, s-maxage=30, stale-while-revalidate=60",
          "X-Cache": "MISS",
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
