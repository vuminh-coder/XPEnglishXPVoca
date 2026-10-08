import { READING_PASSAGES_DATA, ReadingPassage } from "../data/readingMockData";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";

export interface ReadingQuestionGradingResult {
  questionId: string;
  questionText: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation: string;
}

export interface ReadingGradingSummary {
  passageId: string;
  passageTitle: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  accuracy: number;
  xpEarned: number;
  accuracyBonus: number;
  breakdown: {
    baseXp: number;
    perQuestionXp: number;
    accuracyBonus: number;
  };
  timeSpentSeconds: number;
  isPassed: boolean;
  completedAt: string;
}

export interface ReadingGradingResult {
  success: boolean;
  summary: ReadingGradingSummary;
  results: ReadingQuestionGradingResult[];
}

/**
 * Resolves a reading passage from mock dataset by canonical ID, case-insensitive ID,
 * or numeric shorthand (e.g. "5" -> "r5").
 */
export function resolveReadingPassage(passageId: string): ReadingPassage | null {
  if (!passageId) return null;
  const cleanId = passageId.trim();

  // 1. Direct match
  const direct = READING_PASSAGES_DATA.find(
    (p) => p.id === cleanId || p.id.toLowerCase() === cleanId.toLowerCase()
  );
  if (direct) return direct;

  // 2. Numeric shorthand fallback (e.g., "5" -> "r5")
  if (/^\d+$/.test(cleanId)) {
    const prefixed = READING_PASSAGES_DATA.find((p) => p.id === `r${cleanId}`);
    if (prefixed) return prefixed;
  }

  return null;
}

/**
 * Server-side grading logic for a reading passage quiz attempt.
 * Evaluates submitted answer indices against server dataset, prevents client-side tampering,
 * calculates accuracy, XP reward, and returns full question explanations.
 */
export function gradeReadingPassageAttempt(
  passageId: string,
  answers: Record<string, number> | Array<{ questionId: string; selectedOption: number }>,
  timeSpentSeconds: number = 60
): ReadingGradingResult {
  const passage = resolveReadingPassage(passageId);
  if (!passage) {
    throw new Error(`Reading passage not found: "${passageId}"`);
  }

  if (!passage.questions || passage.questions.length === 0) {
    throw new Error(`Bài đọc "${passage.title}" không có câu hỏi trắc nghiệm.`);
  }

  // Normalize answers into a lookup map: { [questionId]: optionIndex }
  const answersMap: Record<string, number> = {};
  if (Array.isArray(answers)) {
    answers.forEach((item) => {
      if (item && item.questionId) {
        answersMap[item.questionId] = Number(item.selectedOption);
      }
    });
  } else if (typeof answers === "object" && answers !== null) {
    Object.entries(answers).forEach(([qId, optIdx]) => {
      answersMap[qId] = Number(optIdx);
    });
  }

  // Anti-cheat sanitization: time spent must be positive and reasonable
  const sanitizedTimeSeconds = Math.max(
    5,
    Math.min(7200, isNaN(timeSpentSeconds) ? 60 : Math.round(timeSpentSeconds))
  );

  let correctCount = 0;

  const results: ReadingQuestionGradingResult[] = passage.questions.map((q) => {
    const userAnswerIndex = answersMap[q.id];
    const hasAnswered = typeof userAnswerIndex === "number" && !isNaN(userAnswerIndex);

    // Validate bounds against available options
    const isValidOptionRange =
      hasAnswered && userAnswerIndex >= 0 && userAnswerIndex < q.options.length;

    const isCorrect = isValidOptionRange && userAnswerIndex === q.correct;
    if (isCorrect) {
      correctCount++;
    }

    return {
      questionId: q.id,
      questionText: q.text,
      selectedOption: isValidOptionRange ? userAnswerIndex : -1,
      correctOption: q.correct,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const totalQuestions = passage.questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  // XP Reward Formula:
  // Base completion XP = 20 XP
  // Per correct question = 15 XP
  // Accuracy Bonus: 100% -> +15 XP bonus, >= 80% -> +10 XP bonus
  const baseXp = 20;
  const perQuestionXp = correctCount * 15;
  let accuracyBonus = 0;
  if (scorePercentage >= 100) {
    accuracyBonus = 15;
  } else if (scorePercentage >= 80) {
    accuracyBonus = 10;
  }

  const xpEarned = baseXp + perQuestionXp + accuracyBonus;
  const isPassed = scorePercentage >= 60;

  return {
    success: true,
    summary: {
      passageId: passage.id,
      passageTitle: passage.title,
      totalQuestions,
      correctCount,
      scorePercentage,
      accuracy: scorePercentage,
      xpEarned,
      accuracyBonus,
      breakdown: {
        baseXp,
        perQuestionXp,
        accuracyBonus,
      },
      timeSpentSeconds: sanitizedTimeSeconds,
      isPassed,
      completedAt: new Date().toISOString(),
    },
    results,
  };
}

/**
 * Persists the graded attempt and user rewards into the PostgreSQL database via Prisma.
 * Increments Profile total XP, study minutes, and upserts DailySkillPractice for reading.
 */
export async function persistReadingAttemptToDatabase(
  userId: string,
  summary: ReadingGradingSummary
): Promise<boolean> {
  if (!userId || userId.startsWith("guest_")) {
    return false; // Skip database persistence for unauthenticated guest sessions
  }

  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const minutesStudied = Math.max(1, Math.round(summary.timeSpentSeconds / 60));

    await prisma.$transaction(async (tx) => {
      // 1. Update Profile totals
      await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: summary.xpEarned },
          minutesStudied: { increment: minutesStudied },
        },
      });

      // 2. Upsert DailySkillPractice entry for "reading"
      await tx.dailySkillPractice.upsert({
        where: {
          userId_skill_date: {
            userId,
            skill: "reading",
            date: todayStr,
          },
        },
        create: {
          userId,
          date: todayStr,
          skill: "reading",
          xpEarned: summary.xpEarned,
          minutes: minutesStudied,
        },
        update: {
          xpEarned: { increment: summary.xpEarned },
          minutes: { increment: minutesStudied },
        },
      });
    });

    // Invalidate cached dashboard metrics
    invalidateDashboardCache(userId);
    return true;
  } catch (err) {
    console.warn("[Reading Backend DB Persist Error]:", err);
    return false;
  }
}

/**
 * Retrieves the aggregated reading progress for a given user.
 */
export async function getUserReadingStats(userId?: string | null): Promise<{
  totalReadingMinutes: number;
  totalReadingXp: number;
  todayMinutes: number;
  todayXp: number;
}> {
  if (!userId || userId.startsWith("guest_")) {
    return {
      totalReadingMinutes: 0,
      totalReadingXp: 0,
      todayMinutes: 0,
      todayXp: 0,
    };
  }

  try {
    const todayStr = new Date().toISOString().split("T")[0];

    const allPractice = await prisma.dailySkillPractice.findMany({
      where: {
        userId,
        skill: "reading",
      },
    });

    let totalReadingMinutes = 0;
    let totalReadingXp = 0;
    let todayMinutes = 0;
    let todayXp = 0;

    allPractice.forEach((record) => {
      totalReadingMinutes += record.minutes;
      totalReadingXp += record.xpEarned;
      if (record.date === todayStr) {
        todayMinutes += record.minutes;
        todayXp += record.xpEarned;
      }
    });

    return {
      totalReadingMinutes,
      totalReadingXp,
      todayMinutes,
      todayXp,
    };
  } catch (err) {
    console.warn("[Reading Stats Fetch Error]:", err);
    return {
      totalReadingMinutes: 0,
      totalReadingXp: 0,
      todayMinutes: 0,
      todayXp: 0,
    };
  }
}
