import { ExamPaper, ExamQuestion, SkillType } from "../data/examPrepData";

export interface UserExamAnswers {
  [questionId: string]: "A" | "B" | "C" | "D" | undefined;
}

export interface PartAnalysis {
  partNumber: number;
  partTitle: string;
  totalQuestions: number;
  correctCount: number;
  accuracyPercent: number;
  grade: "A+" | "A" | "B" | "C" | "D";
}

export interface QuestionResultDetail {
  questionId: string;
  questionNumber: number;
  partNumber: number;
  partTitle: string;
  section: SkillType;
  userChoice: "A" | "B" | "C" | "D" | undefined;
  correctAnswer: "A" | "B" | "C" | "D";
  isCorrect: boolean;
  isSkipped: boolean;
  isFlagged: boolean;
  question: ExamQuestion;
  explanation: string;
}

export interface ExamResultSummary {
  examId: string;
  examTitle: string;
  examType: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  scaledScore: number;
  maxScore: number;
  listeningScore?: number;
  readingScore?: number;
  speakingScore?: number;
  writingScore?: number;
  timeSpentSeconds: number;
  avgTimePerQuestion: number;
  accuracyPercent: number;
  partAnalysis: PartAnalysis[];
  questionResults: QuestionResultDetail[];
  strengths: string[];
  weaknesses: {
    partNumber?: number;
    partTitle: string;
    issue: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    accuracyPercent?: number;
    correctCount?: number;
    totalQuestions?: number;
  }[];
  recommendations: string[];
  xpAwarded: number;
  coinsAwarded: number;
}

/**
 * Converts TOEIC Listening raw correct count (0-100) to Scaled Score (5-495).
 */
export function convertToeicListeningRawToScaled(rawCorrect: number): number {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 96) return 495;
  return Math.min(495, Math.max(5, Math.round(rawCorrect * 4.9 + 15)));
}

/**
 * Converts TOEIC Reading raw correct count (0-100) to Scaled Score (5-495).
 */
export function convertToeicReadingRawToScaled(rawCorrect: number): number {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 97) return 495;
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
 * Calculates complete exam result based on selected active skills and flagged questions.
 */
export function calculateExamResult(
  exam: ExamPaper,
  userAnswers: UserExamAnswers,
  timeSpentSeconds: number,
  selectedSkills?: SkillType[],
  flaggedQuestions?: Record<string, boolean>
): ExamResultSummary {
  // Filter questions based on selected skills if provided
  const activeQuestions = selectedSkills && selectedSkills.length > 0
    ? exam.questions.filter((q) => selectedSkills.includes(q.section))
    : exam.questions;

  let totalQuestions = activeQuestions.length;
  let answeredCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  let listeningCorrect = 0;
  let readingCorrect = 0;

  const partMap: Record<number, { title: string; total: number; correct: number }> = {};
  const questionResults: QuestionResultDetail[] = [];

  activeQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[q.id];
    const isSkipped = userChoice === undefined;
    const isCorrect = !isSkipped && userChoice === q.correctAnswer;
    const isFlagged = !!(flaggedQuestions && flaggedQuestions[q.id]);
    
    if (!partMap[q.partNumber]) {
      partMap[q.partNumber] = { title: q.partTitle, total: 0, correct: 0 };
    }
    partMap[q.partNumber].total += 1;

    if (isSkipped) {
      skippedCount += 1;
    } else {
      answeredCount += 1;
      if (isCorrect) {
        correctCount += 1;
        partMap[q.partNumber].correct += 1;
        if (q.section === "LISTENING") listeningCorrect += 1;
        if (q.section === "READING") readingCorrect += 1;
      } else {
        incorrectCount += 1;
      }
    }

    questionResults.push({
      questionId: q.id,
      questionNumber: idx + 1,
      partNumber: q.partNumber,
      partTitle: q.partTitle,
      section: q.section,
      userChoice,
      correctAnswer: q.correctAnswer,
      isCorrect,
      isSkipped,
      isFlagged,
      question: q,
      explanation: q.explanation || `Đáp án đúng là ${q.correctAnswer}.`
    });
  });

  const accuracyPercent = Math.round((correctCount / (totalQuestions || 1)) * 100);
  const avgTimePerQuestion = Math.round(timeSpentSeconds / (Math.max(1, answeredCount || totalQuestions)));

  // Scaled Score calculation
  let scaledScore = 0;
  let listeningScore: number | undefined;
  let readingScore: number | undefined;
  let speakingScore: number | undefined = 170; // Sample Speaking AI Score (0-200)
  let writingScore: number | undefined = 160;  // Sample Writing AI Score (0-200)

  if (exam.type.includes("TOEIC")) {
    listeningScore = convertToeicListeningRawToScaled(listeningCorrect);
    readingScore = convertToeicReadingRawToScaled(readingCorrect);
    scaledScore = listeningScore + readingScore;
    if (exam.type === "TOEIC_SPEAKING_WRITING") {
      scaledScore = speakingScore + writingScore;
    }
  } else if (exam.type.includes("IELTS")) {
    scaledScore = convertIeltsRawToBandScore(correctCount);
  } else {
    scaledScore = Math.round((correctCount / (totalQuestions || 1)) * exam.maxScore);
  }

  // Part-by-part analysis array with grade calculation
  const partAnalysis: PartAnalysis[] = Object.keys(partMap).map((partNumStr) => {
    const pNum = Number(partNumStr);
    const pData = partMap[pNum];
    const acc = Math.round((pData.correct / (pData.total || 1)) * 100);
    
    let grade: "A+" | "A" | "B" | "C" | "D" = "D";
    if (acc >= 90) grade = "A+";
    else if (acc >= 75) grade = "A";
    else if (acc >= 60) grade = "B";
    else if (acc >= 40) grade = "C";
    else grade = "D";

    return {
      partNumber: pNum,
      partTitle: pData.title,
      totalQuestions: pData.total,
      correctCount: pData.correct,
      accuracyPercent: acc,
      grade
    };
  });

  // Diagnostic strengths & weaknesses computation
  const strengths: string[] = [];
  const weaknesses: ExamResultSummary["weaknesses"] = [];
  const recommendations: string[] = [];

  const getPartDiagnosticAdvice = (partNum: number, accuracy: number, correct: number, total: number) => {
    switch (partNum) {
      case 1:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần luyện kỹ năng quan sát tranh, bắt động từ mô tả hành động và tránh bẫy thì hiện tại tiếp diễn / bị động.`;
      case 2:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần luyện phản xạ bẫy từ đồng âm (same-sound), câu hỏi gián tiếp và câu trả lời gợi ý trá hình.`;
      case 3:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần đọc trước câu hỏi 30s, nắm bắt vai trò người nói (Who/Where/Next action) và ngữ cảnh hội thoại.`;
      case 4:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần luyện nghe đoạn độc thoại dài, bắt ý chính mở đầu và thông tin chi tiết quan trọng.`;
      case 5:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần củng cố ngữ pháp cốt lõi (từ loại N/V/Adj/Adv, đại từ quan hệ, thì động từ và liên từ).`;
      case 6:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần luyện kỹ năng liên kết ngữ cảnh toàn văn và câu điền nguyên câu văn logic.`;
      case 7:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần nâng cao tốc độ đọc quét (Skimming & Scanning) và xử lý bài đọc đôi/ba (Multiple Passages).`;
      default:
        return `Đạt ${accuracy}% (${correct}/${total} câu) • Cần củng cố kỹ năng và phương pháp làm bài chuyên sâu cho phần thi này.`;
    }
  };

  partAnalysis.forEach((p) => {
    if (p.accuracyPercent >= 75) {
      strengths.push(`${p.partTitle} (Độ chính xác ấn tượng: ${p.accuracyPercent}%)`);
    } else if (p.accuracyPercent <= 40) {
      weaknesses.push({
        partNumber: p.partNumber,
        partTitle: p.partTitle,
        issue: getPartDiagnosticAdvice(p.partNumber, p.accuracyPercent, p.correctCount, p.totalQuestions),
        priority: "HIGH",
        accuracyPercent: p.accuracyPercent,
        correctCount: p.correctCount,
        totalQuestions: p.totalQuestions
      });
    } else if (p.accuracyPercent <= 65) {
      weaknesses.push({
        partNumber: p.partNumber,
        partTitle: p.partTitle,
        issue: getPartDiagnosticAdvice(p.partNumber, p.accuracyPercent, p.correctCount, p.totalQuestions),
        priority: "MEDIUM",
        accuracyPercent: p.accuracyPercent,
        correctCount: p.correctCount,
        totalQuestions: p.totalQuestions
      });
    }
  });

  if (strengths.length === 0) {
    strengths.push("Duy trì tốc độ phản xạ và hoàn thành bài thi đúng quy trình bấm giờ.");
    strengths.push("Nắm bắt cấu trúc tổng quan của bộ đề thi chuẩn ETS/Cambridge.");
  }

  if (weaknesses.length === 0) {
    weaknesses.push({
      partTitle: "Toàn diện các phần thi",
      issue: "Phong độ rất đồng đều và xuất sắc trên tất cả các Part.",
      priority: "LOW"
    });
    recommendations.push("Tiếp tục luyện tập với bộ đề Master 4 Kỹ năng nâng cao để bứt phá band điểm tối đa 990 / 9.0.");
  } else {
    recommendations.push("Xem kỹ mục 'Lời Giải Chuyên Sâu' của từng câu làm sai ở Tab 2 để giải mã bẫy đề thi và từ vựng cốt lõi.");
    recommendations.push("Luyện thêm tính năng Dictation Nghe Chép Chính Tả để cải thiện phản xạ âm thanh cho Part 1-4.");
    recommendations.push("Ôn tập từ vựng Flashcard Spaced Repetition để mở rộng vốn từ thương mại và học thuật.");
  }

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
    speakingScore,
    writingScore,
    timeSpentSeconds,
    avgTimePerQuestion,
    accuracyPercent,
    partAnalysis,
    questionResults,
    strengths,
    weaknesses,
    recommendations,
    xpAwarded,
    coinsAwarded
  };
}
