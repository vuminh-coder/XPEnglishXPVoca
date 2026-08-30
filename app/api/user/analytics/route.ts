import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
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

    let profile: any = null;
    let weeklyRankStr = "#1";
    let wordsLearnedCount = 0;

    if (userId !== "local_user") {
      profile = await prisma.profile.findUnique({
        where: { id: userId },
      });

      if (profile) {
        // Calculate actual user rank based on totalXp in Profile DB
        const higherRankUsers = await prisma.profile.count({
          where: {
            totalXp: { gt: profile.totalXp || 0 },
          },
        });
        weeklyRankStr = `#${higherRankUsers + 1}`;

        // Count learned words from UserVocabulary table
        wordsLearnedCount = await prisma.userVocabulary.count({
          where: {
            userId: userId,
            OR: [
              { isFavorite: true },
              { proficiency: { gt: 0 } },
            ],
          },
        });
      }
    }

    const totalXp = profile?.totalXp || 0;
    const minutesStudied = profile?.minutesStudied || 0;
    const currentStreak = profile?.currentStreak || 1;
    const longestStreak = profile?.longestStreak || profile?.currentStreak || 1;
    const finalWordsLearned = Math.max(wordsLearnedCount, profile?.wordsLearned || 0);

    // 1. GENERATE 30-DAY MILESTONE DATES (-19, -14, -9, -4, 0 [Hôm nay], +3, +6, +10)
    const today = new Date();
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

    // 2. GENERATE 6-MONTH HEATMAP (24 WEEKS x 7 DAYS = 168 DAYS)
    const totalHeatmapDays = 24 * 7; // 168 days
    const heatmapStartDate = new Date(today);
    heatmapStartDate.setDate(heatmapStartDate.getDate() - totalHeatmapDays + 1);

    const minQueryDate = getLocalDateStr(heatmapStartDate);
    const maxQueryDate = milestoneIsoDates[milestoneIsoDates.length - 1] || getLocalDateStr(today);

    // Query DailySkillPractice records for the user from PostgreSQL Neon DB
    const practiceDateMap: Record<string, { totalMinutes: number; totalXp: number; skills: Record<SkillKey, { minutes: number; xp: number }> }> = {};

    if (userId !== "local_user") {
      try {
        if ((prisma as any).dailySkillPractice) {
          const records = await (prisma as any).dailySkillPractice.findMany({
            where: {
              userId,
              date: {
                gte: minQueryDate,
                lte: maxQueryDate,
              },
            },
          });

          records.forEach((rec: any) => {
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
      } catch (dbErr: any) {
        console.warn("[Analytics API] DailySkillPractice query suppressed:", dbErr?.message || dbErr);
      }
    }

    // Populate 30-Day Milestone Series from DB records
    milestoneIsoDates.forEach((isoDate, mIdx) => {
      const dayData = practiceDateMap[isoDate];
      if (dayData) {
        overallMinutes[mIdx] = dayData.totalMinutes;
        overallXp[mIdx] = dayData.totalXp;

        VALID_SKILLS.forEach((sk) => {
          perSkillMinutes[sk][mIdx] = dayData.skills[sk]?.minutes || 0;
          perSkillXp[sk][mIdx] = dayData.skills[sk]?.xp || 0;
        });
      }
    });

    // Construct 6-Month Heatmap Matrix (24 weeks x 7 days)
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

      let count = 0;
      if (dayMin > 0 || dayXp > 0) {
        count = Math.max(1, Math.floor(dayMin / 3) + Math.floor(dayXp / 15));
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
