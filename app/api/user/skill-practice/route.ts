import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export const dynamic = "force-dynamic";

// Valid skill keys
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

export async function GET(request: Request) {
  try {
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "local_user";

    // 7-day rolling window: -4 days to +2 days
    const today = new Date();
    const rollingDates: string[] = [];
    for (let offset = -4; offset <= 2; offset++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      rollingDates.push(getLocalDateStr(d));
    }

    const initialMap: Record<SkillKey, Record<string, number>> = {
      dictation: {},
      shadowing: {},
      speaking: {},
      vocab: {},
      writing: {},
    };

    const initialXpMap: Record<SkillKey, Record<string, number>> = {
      dictation: {},
      shadowing: {},
      speaking: {},
      vocab: {},
      writing: {},
    };

    // Initialize all dates with 0
    VALID_SKILLS.forEach((sk) => {
      rollingDates.forEach((dt) => {
        initialMap[sk][dt] = 0;
        initialXpMap[sk][dt] = 0;
      });
    });

    if (userId !== "local_user") {
      await safeDbExecute(async () => {
        const records = await prisma.dailySkillPractice.findMany({
          where: {
            userId,
            date: { in: rollingDates },
          },
        });

        records.forEach((rec: any) => {
          const sk = normalizeSkill(rec.skill);
          if (initialMap[sk] && rec.date) {
            initialMap[sk][rec.date] = (initialMap[sk][rec.date] || 0) + (rec.minutes || 0);
          }
          if (initialXpMap[sk] && rec.date) {
            initialXpMap[sk][rec.date] = (initialXpMap[sk][rec.date] || 0) + (rec.xpEarned || 0);
          }
        });

        // 2. Aggregate ListeningProgress for Dictation
        const startRollingDate = new Date(`${rollingDates[0]}T00:00:00.000Z`);
        const endRollingDate = new Date(`${rollingDates[rollingDates.length - 1]}T23:59:59.999Z`);

        const listeningRecords = await prisma.listeningProgress.findMany({
          where: {
            userId,
            lastPracticedAt: {
              gte: startRollingDate,
              lte: endRollingDate,
            },
          },
          select: {
            lastPracticedAt: true,
            timeSpent: true,
          },
        });

        listeningRecords.forEach((l) => {
          if (l.lastPracticedAt) {
            const dt = getLocalDateStr(new Date(l.lastPracticedAt));
            if (initialMap.dictation && dt in initialMap.dictation) {
              const estimatedMins = Math.max(5, Math.round((l.timeSpent || 0) / 60) || 5);
              initialMap.dictation[dt] = Math.max(initialMap.dictation[dt] || 0, estimatedMins);
            }
          }
        });
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        skills: initialMap,
        xpSkills: initialXpMap,
        dates: rollingDates,
        todayDate: getLocalDateStr(today),
      },
    });
  } catch (error: unknown) {
    console.error("Error in GET /api/user/skill-practice:", error);
    return NextResponse.json({
      success: true,
      data: {
        skills: {},
        xpSkills: {},
        dates: [],
        todayDate: getLocalDateStr(new Date()),
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "local_user";

    const body = await request.json();
    const { skill, minutes, xp, date } = body;

    const normalizedSkill = normalizeSkill(skill);
    const validMinutes = typeof minutes === "number" && !isNaN(minutes) && minutes > 0 ? Math.round(minutes) : 0;
    const validXp = typeof xp === "number" && !isNaN(xp) && xp > 0 ? Math.round(xp) : 0;
    const targetDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getLocalDateStr(new Date());

    if (validMinutes <= 0 && validXp <= 0) {
      return NextResponse.json({ success: true, message: "No minutes or XP to record" });
    }

    let updatedRecord: any = null;
    let newMinutesStudied = 0;

    if (userId !== "local_user") {
      await safeDbExecute(async () => {
        // 1. Upsert DailySkillPractice
        updatedRecord = await prisma.dailySkillPractice.upsert({
          where: {
            userId_skill_date: {
              userId,
              skill: normalizedSkill,
              date: targetDate,
            },
          },
          update: {
            minutes: { increment: validMinutes },
            xpEarned: { increment: validXp },
          },
          create: {
            userId,
            skill: normalizedSkill,
            date: targetDate,
            minutes: validMinutes,
            xpEarned: validXp,
          },
        });

        // 2. Increment Profile minutesStudied & totalXp
        const profile = await prisma.profile.update({
          where: { id: userId },
          data: {
            minutesStudied: { increment: validMinutes },
            ...(validXp > 0 ? { totalXp: { increment: validXp } } : {}),
          },
          select: {
            minutesStudied: true,
            totalXp: true,
            currentStreak: true,
          },
        });

        newMinutesStudied = profile.minutesStudied;
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        skill: normalizedSkill,
        date: targetDate,
        addedMinutes: validMinutes,
        addedXp: validXp,
        totalSkillMinutesToday: updatedRecord?.minutes ?? validMinutes,
        totalMinutesStudied: newMinutesStudied,
      },
    });
  } catch (error: unknown) {
    console.error("Error in POST /api/user/skill-practice:", error);
    return NextResponse.json({ success: true, warning: "Processed with fallback" });
  }
}
