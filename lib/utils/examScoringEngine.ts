import { ExamPaper, ExamQuestion } from "../data/examPrepData";

export interface UserExamAnswers {
  [questionId: string]: "A" | "B" | "C" | "D" | undefined;
}

export interface PartAnalysis {
  partNumber: number;
  partTitle: string;
  totalQuestions: number;
  correctCount: number;
  accuracyPercent: number;
}

export interface ExamResultSummary {
  examId: string;
  examTitle: string;
  examType: "TOEIC_FULL" | "TOEIC_MINI" | "IELTS_LISTENING" | "IELTS_READING";
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  scaledScore: number;
  maxScore: number;
  listeningScore?: number;
  readingScore?: number;
  timeSpentSeconds: number;
  accuracyPercent: number;
  partAnalysis: PartAnalysis[];
  xpAwarded: number;
  coinsAwarded: number;
}

/**
 * Converts TOEIC Listening raw correct count (0-100) to Scaled Score (5-495).
 */
export function convertToeicListeningRawToScaled(rawCorrect: number): number {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 96) return 495;
  // Scaled curve estimation
  return Math.min(495, Math.max(5, Math.round(rawCorrect * 4.9 + 15)));
}

/**
 * Converts TOEIC Reading raw correct count (0-100) to Scaled Score (5-495).
 */
export function convertToeicReadingRawToScaled(rawCorrect: number): number {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 97) return 495;
  // Scaled curve estimation
  return Math.min(495, Math.max(5, Math.round(rawCorrect * 4.8 + 10)));
}

/**
 * Converts IELTS Reading/Listening raw correct count (0-40) to Band Score (1.0 - 9.0).
 */
export function convertIeltsRawToBandScore(rawCorrect: number): number {
  if (rawCorrect <= 3) return 1.0;
  if (rawCorrect <= 5) return 2.5;
  if (rawCorrect <= 9) return 3.5;
  if (rawCorrect <= 12) return 4.5;
  if (rawCorrect <= 15) return 5.0;
  if (rawCorrect <= 19) return 5.5;
  if (rawCorrect <= 22) return 6.0;
  if (rawCorrect <= 26) return 6.5;
  if (rawCorrect <= 29) return 7.0;
  if (rawCorrect <= 32) return 7.5;
  if (rawCorrect <= 34) return 8.0;
  if (rawCorrect <= 36) return 8.5;
  return 9.0;
}

/**
 * Calculates complete exam result, scaled score, part analysis, and rewards.
 */
export function calculateExamResult(
  exam: ExamPaper,
  userAnswers: UserExamAnswers,
  timeSpentSeconds: number
): ExamResultSummary {
  let totalQuestions = exam.questions.length;
  let answeredCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  let listeningCorrect = 0;
  let listeningTotal = 0;
  let readingCorrect = 0;
  let readingTotal = 0;

  const partMap: Record<number, { title: string; total: number; correct: number }> = {};

  exam.questions.forEach((q) => {
    const userChoice = userAnswers[q.id];
    
    if (!partMap[q.partNumber]) {
      partMap[q.partNumber] = { title: q.partTitle, total: 0, correct: 0 };
    }
    partMap[q.partNumber].total += 1;

    if (q.section === "LISTENING") {
      listeningTotal += 1;
    } else {
      readingTotal += 1;
    }

    if (userChoice === undefined) {
      skippedCount += 1;
    } else {
      answeredCount += 1;
      if (userChoice === q.correctAnswer) {
        correctCount += 1;
        partMap[q.partNumber].correct += 1;
        if (q.section === "LISTENING") {
          listeningCorrect += 1;
        } else {
          readingCorrect += 1;
        }
      } else {
        incorrectCount += 1;
      }
    }
  });

  const accuracyPercent = Math.round((correctCount / (totalQuestions || 1)) * 100);

  // Scaled Score calculation
  let scaledScore = 0;
  let listeningScore: number | undefined;
  let readingScore: number | undefined;

  if (exam.type === "TOEIC_FULL") {
    // If full 200 questions: 100 Listening + 100 Reading
    listeningScore = convertToeicListeningRawToScaled(listeningCorrect);
    readingScore = convertToeicReadingRawToScaled(readingCorrect);
    scaledScore = listeningScore + readingScore;
  } else if (exam.type === "TOEIC_MINI") {
    // Mini 50 questions: scaled to 990
    const scaledRatio = correctCount / (totalQuestions || 1);
    scaledScore = Math.min(990, Math.max(10, Math.round(scaledRatio * 980 + 10)));
  } else if (exam.type === "IELTS_READING" || exam.type === "IELTS_LISTENING") {
    // IELTS 40 questions -> Band 1.0 to 9.0
    scaledScore = convertIeltsRawToBandScore(correctCount);
  } else {
    scaledScore = Math.round((correctCount / (totalQuestions || 1)) * exam.maxScore);
  }

  // Part-by-part analysis array
  const partAnalysis: PartAnalysis[] = Object.keys(partMap).map((partNumStr) => {
    const pNum = Number(partNumStr);
    const pData = partMap[pNum];
    return {
      partNumber: pNum,
      partTitle: pData.title,
      totalQuestions: pData.total,
      correctCount: pData.correct,
      accuracyPercent: Math.round((pData.correct / (pData.total || 1)) * 100)
    };
  });

  // Calculate XP & Coin rewards
  const xpAwarded = Math.round(50 + (accuracyPercent / 100) * 50);
  const coinsAwarded = Math.round(20 + (accuracyPercent / 100) * 20);

  return {
    examId: exam.id,
    examTitle: exam.title,
    examType: exam.type,
    totalQuestions,
    answeredCount,
    correctCount,
    incorrectCount,
    skippedCount,
    scaledScore,
    maxScore: exam.maxScore,
    listeningScore,
    readingScore,
    timeSpentSeconds,
    accuracyPercent,
    partAnalysis,
    xpAwarded,
    coinsAwarded
  };
}
