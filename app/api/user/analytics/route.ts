import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export const dynamic = "force-dynamic";

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

function getLocalDateStr(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET() {
  try {
    const authUserId = await getAuthenticatedUserId();
    const userId = authUserId || "local_user";

    const today = new Date();
    const todayStr = getLocalDateStr(today);

    // 1. GENERATE 30-DAY MILESTONE DATES (-19, -14, -9, -4, 0 [Hôm nay], +3, +6, +10)
    const offsets = [-19, -14, -9, -4, 0, 3, 6, 10];
    const milestoneDates: string[] = [];
    const milestoneIsoDates: string[] = [];

    offsets.forEach((offset) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      const dayNum = d.getDate();
      const monthNum = d.getMonth() + 1;
      const iso = getLocalDateStr(d);

      milestoneIsoDates.push(iso);
      if (offset === 0) {
        milestoneDates.push("Hôm nay");
      } else {
        milestoneDates.push(`${dayNum} thg ${monthNum}`);
      }
    });

    // Initialize per-skill series maps
    const perSkillMinutes: Record<SkillKey, number[]> = {
      dictation: new Array(8).fill(0),
      shadowing: new Array(8).fill(0),
      speaking: new Array(8).fill(0),
      vocab: new Array(8).fill(0),
      writing: new Array(8).fill(0),
    };

    const perSkillXp: Record<SkillKey, number[]> = {
      dictation: new Array(8).fill(0),
      shadowing: new Array(8).fill(0),
      speaking: new Array(8).fill(0),
      vocab: new Array(8).fill(0),
      writing: new Array(8).fill(0),
    };

    const overallMinutes: number[] = new Array(8).fill(0);
    const overallXp: number[] = new Array(8).fill(0);

    // 2. GENERATE 6-MONTH HEATMAP TIMELINE (24 WEEKS x 7 DAYS = 168 DAYS)
    const totalHeatmapDays = 24 * 7; // 168 days
    const heatmapStartDate = new Date(today);
    heatmapStartDate.setDate(heatmapStartDate.getDate() - totalHeatmapDays + 1);

    const minQueryDate = getLocalDateStr(heatmapStartDate);
    const maxQueryDate = milestoneIsoDates[milestoneIsoDates.length - 1] || todayStr;

    // Database Results
    const dbData = await safeDbExecute(async () => {
      if (userId === "local_user") return null;

      // 1. Fetch Profile
      const profile = await prisma.profile.findUnique({
        where: { id: userId },
      });

      // 2. Calculate Weekly Rank (Last 7 Days Practice XP to match /api/leaderboard?period=week)
      const weekStartDate = new Date(today);
      weekStartDate.setDate(weekStartDate.getDate() - 7);
      const weekStartStr = getLocalDateStr(weekStartDate);

      const weeklyXpAggregations = await prisma.dailySkillPractice.groupBy({
        by: ["userId"],
        where: {
          date: {
            gte: weekStartStr,
            lte: todayStr,
          },
        },
        _sum: {
          xpEarned: true,
        },
      });

      const userWeeklyRecord = weeklyXpAggregations.find((a) => a.userId === userId);
      const userWeeklyXp = userWeeklyRecord?._sum?.xpEarned || 0;
      const higherWeeklyUsers = weeklyXpAggregations.filter(
        (a) => (a._sum?.xpEarned || 0) > userWeeklyXp
      ).length;
      const weeklyRankStr = `#${higherWeeklyUsers + 1}`;

      // 3. Count Learned / Memorized Words
      const wordsLearnedCount = await prisma.userVocabulary.count({
        where: {
          userId: userId,
          OR: [
            { isFavorite: true },
            { proficiency: { gt: 0 } },
          ],
        },
      });

      // 4. Query DailySkillPractice for 168 days
      const practiceRecords = await prisma.dailySkillPractice.findMany({
        where: {
          userId,
          date: {
            gte: minQueryDate,
            lte: maxQueryDate,
          },
        },
      });

      // 5. Query ExamAttempts in 168 days (to enrich activity heatmap)
      const examAttempts = await prisma.examAttempt.findMany({
        where: {
          userId,
          startedAt: {
            gte: heatmapStartDate,
          },
        },
        select: {
          startedAt: true,
          totalScore: true,
        },
      });

      // 6. Query ListeningProgress in 168 days (to enrich activity heatmap)
      const listeningProgresses = await prisma.listeningProgress.findMany({
        where: {
          userId,
          lastPracticedAt: {
            gte: heatmapStartDate,
          },
        },
        select: {
          lastPracticedAt: true,
          timeSpent: true,
        },
      });

      return {
        profile,
        weeklyRankStr,
        wordsLearnedCount,
        practiceRecords,
        examAttempts,
        listeningProgresses,
      };
    });

    const profile = dbData?.profile;
    const weeklyRankStr = dbData?.weeklyRankStr || "#1";
    const finalWordsLearned = dbData?.wordsLearnedCount || 0;
    const totalXp = profile?.totalXp || 0;
    const minutesStudied = profile?.minutesStudied || 0;
    const currentStreak = profile?.currentStreak || 1;
    const longestStreak = profile?.longestStreak || profile?.currentStreak || 1;

    // Practice date mapping
    const practiceDateMap: Record<
      string,
      {
        totalMinutes: number;
        totalXp: number;
        skills: Record<SkillKey, { minutes: number; xp: number }>;
        extraActivityCount: number;
      }
    > = {};

    if (dbData?.practiceRecords) {
      dbData.practiceRecords.forEach((rec: any) => {
        const sk = normalizeSkill(rec.skill);
        const dt = rec.date;
        if (!practiceDateMap[dt]) {
          practiceDateMap[dt] = {
            totalMinutes: 0,
            totalXp: 0,
            skills: {
              dictation: { minutes: 0, xp: 0 },
              shadowing: { minutes: 0, xp: 0 },
              speaking: { minutes: 0, xp: 0 },
              vocab: { minutes: 0, xp: 0 },
              writing: { minutes: 0, xp: 0 },
            },
            extraActivityCount: 0,
          };
        }
        const mins = rec.minutes || 0;
        const xp = rec.xpEarned || 0;

        practiceDateMap[dt].totalMinutes += mins;
        practiceDateMap[dt].totalXp += xp;
        if (practiceDateMap[dt].skills[sk]) {
          practiceDateMap[dt].skills[sk].minutes += mins;
          practiceDateMap[dt].skills[sk].xp += xp;
        }
      });
    }

    // Integrate Exam Attempts into date map
    if (dbData?.examAttempts) {
      dbData.examAttempts.forEach((exam: any) => {
        const examDate = getLocalDateStr(new Date(exam.startedAt));
        if (!practiceDateMap[examDate]) {
          practiceDateMap[examDate] = {
            totalMinutes: 0,
            totalXp: 0,
            skills: {
              dictation: { minutes: 0, xp: 0 },
              shadowing: { minutes: 0, xp: 0 },
              speaking: { minutes: 0, xp: 0 },
              vocab: { minutes: 0, xp: 0 },
              writing: { minutes: 0, xp: 0 },
            },
            extraActivityCount: 0,
          };
        }
        practiceDateMap[examDate].extraActivityCount += 2;
      });
    }

    // Integrate Listening Progress into date map
    if (dbData?.listeningProgresses) {
      dbData.listeningProgresses.forEach((lp: any) => {
        const lpDate = getLocalDateStr(new Date(lp.lastPracticedAt));
        if (!practiceDateMap[lpDate]) {
          practiceDateMap[lpDate] = {
            totalMinutes: 0,
            totalXp: 0,
            skills: {
              dictation: { minutes: 0, xp: 0 },
              shadowing: { minutes: 0, xp: 0 },
              speaking: { minutes: 0, xp: 0 },
              vocab: { minutes: 0, xp: 0 },
              writing: { minutes: 0, xp: 0 },
            },
            extraActivityCount: 0,
          };
        }
        practiceDateMap[lpDate].extraActivityCount += 1;
      });
    }

    // 3. POPULATE 30-DAY MILESTONE BUCKETS WITH INTERVAL AGGREGATION
    // Buckets correspond to 8 points on the SVG waveform chart:
    // Bucket 0: d-21 to d-17 (centered at -19)
    // Bucket 1: d-16 to d-12 (centered at -14)
    // Bucket 2: d-11 to d-7  (centered at -9)
    // Bucket 3: d-6 to d-2   (centered at -4)
    // Bucket 4: d-1 to d-0   (yesterday & today - "Hôm nay")
    // Bucket 5..7: future projection
    const bucketRanges: { startOffset: number; endOffset: number }[] = [
      { startOffset: -21, endOffset: -17 },
      { startOffset: -16, endOffset: -12 },
      { startOffset: -11, endOffset: -7 },
      { startOffset: -6, endOffset: -2 },
      { startOffset: -1, endOffset: 0 },
      { startOffset: 1, endOffset: 3 },
      { startOffset: 4, endOffset: 6 },
      { startOffset: 7, endOffset: 10 },
    ];

    bucketRanges.forEach((range, mIdx) => {
      if (range.startOffset > 0) {
        // Future milestones remain 0
        overallMinutes[mIdx] = 0;
        overallXp[mIdx] = 0;
        VALID_SKILLS.forEach((sk) => {
          perSkillMinutes[sk][mIdx] = 0;
          perSkillXp[sk][mIdx] = 0;
        });
        return;
      }

      let bucketMinutes = 0;
      let bucketXp = 0;
      const skillMins: Record<SkillKey, number> = { dictation: 0, shadowing: 0, speaking: 0, vocab: 0, writing: 0 };
      const skillXps: Record<SkillKey, number> = { dictation: 0, shadowing: 0, speaking: 0, vocab: 0, writing: 0 };

      for (let dayOffset = range.startOffset; dayOffset <= range.endOffset; dayOffset++) {
        const d = new Date(today);
        d.setDate(d.getDate() + dayOffset);
        const iso = getLocalDateStr(d);
        const dayData = practiceDateMap[iso];

        if (dayData) {
          bucketMinutes += dayData.totalMinutes;
          bucketXp += dayData.totalXp;
          VALID_SKILLS.forEach((sk) => {
            skillMins[sk] += dayData.skills[sk]?.minutes || 0;
            skillXps[sk] += dayData.skills[sk]?.xp || 0;
          });
        }
      }

      overallMinutes[mIdx] = bucketMinutes;
      overallXp[mIdx] = bucketXp;
      VALID_SKILLS.forEach((sk) => {
        perSkillMinutes[sk][mIdx] = skillMins[sk];
        perSkillXp[sk][mIdx] = skillXps[sk];
      });
    });

    // 4. CONSTRUCT 6-MONTH HEATMAP MATRIX (24 WEEKS x 7 DAYS = 168 DAYS)
    const monthNames = ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"];
    let heatmapTotalActivities = 0;
    const heatmapDaysData: any[] = [];

    for (let i = 0; i < totalHeatmapDays; i++) {
      const d = new Date(heatmapStartDate);
      d.setDate(d.getDate() + i);

      const isoDate = getLocalDateStr(d);
      const dayNum = d.getDate();
      const monthName = monthNames[d.getMonth()];
      const year = d.getFullYear();
      const dateStr = `Ngày ${dayNum} ${monthName}, ${year}`;

      const dayData = practiceDateMap[isoDate];
      const dayMin = dayData?.totalMinutes || 0;
      const dayXp = dayData?.totalXp || 0;
      const extraCount = dayData?.extraActivityCount || 0;

      let count = 0;
      if (dayMin > 0 || dayXp > 0 || extraCount > 0) {
        count = Math.max(1, Math.floor(dayMin / 3) + Math.floor(dayXp / 15) + extraCount);
      }

      heatmapTotalActivities += count;

      let intensity = 0;
      if (count >= 5) intensity = 3;
      else if (count >= 3) intensity = 2;
      else if (count >= 1) intensity = 1;

      heatmapDaysData.push({ intensity, count, dateStr, isoDate });
    }

    const heatmapWeeks: any[][] = [];
    for (let w = 0; w < 24; w++) {
      heatmapWeeks.push(heatmapDaysData.slice(w * 7, (w + 1) * 7));
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          currentStreak,
          longestStreak,
          wordsLearned: finalWordsLearned,
          minutesStudied,
          totalXp,
          weeklyRank: weeklyRankStr,
        },
        series: {
          dates: milestoneDates,
          isoDates: milestoneIsoDates,
          minutesSeries: overallMinutes,
          xpSeries: overallXp,
        },
        perSkill: {
          dictation: { minutes: perSkillMinutes.dictation, xp: perSkillXp.dictation },
          shadowing: { minutes: perSkillMinutes.shadowing, xp: perSkillXp.shadowing },
          speaking: { minutes: perSkillMinutes.speaking, xp: perSkillXp.speaking },
          vocab: { minutes: perSkillMinutes.vocab, xp: perSkillXp.vocab },
          writing: { minutes: perSkillMinutes.writing, xp: perSkillXp.writing },
        },
        heatmap: {
          weeks: heatmapWeeks,
          totalActivities: heatmapTotalActivities,
        },
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/user/analytics:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          stats: {
            currentStreak: 1,
            longestStreak: 1,
            wordsLearned: 0,
            minutesStudied: 0,
            totalXp: 0,
            weeklyRank: "#1",
          },
          series: {
            dates: ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"],
            minutesSeries: [0, 0, 0, 0, 0, 0, 0, 0],
            xpSeries: [0, 0, 0, 0, 0, 0, 0, 0],
          },
          perSkill: {
            dictation: { minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] },
            shadowing: { minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] },
            speaking: { minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] },
            vocab: { minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] },
            writing: { minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] },
          },
          heatmap: {
            weeks: [],
            totalActivities: 0,
          },
        },
      },
      { status: 200 }
    );
  }
}
