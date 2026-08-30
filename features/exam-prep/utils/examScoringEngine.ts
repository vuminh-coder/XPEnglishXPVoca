import { ExamPaper, ExamQuestion, SkillType } from "../data/exam-papers/types";

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
 * Converts TOEIC Speaking completed tasks count (0-11) to Scaled Score (0-200 PTS).
 */
export function convertToeicSpeakingRawToScaled(speakingAnswered: number, totalSpeaking: number = 11): number {
  if (speakingAnswered <= 0) return 0;
  const ratio = speakingAnswered / Math.max(1, totalSpeaking);
  if (ratio >= 0.95) return 190; // Level 8 (190-200)
  if (ratio >= 0.80) return 160 + Math.round((ratio - 0.80) * 150); // Level 7 (160-180)
  if (ratio >= 0.60) return 130 + Math.round((ratio - 0.60) * 150); // Level 6 (130-150)
  if (ratio >= 0.40) return 100 + Math.round((ratio - 0.40) * 150); // Level 5 (100-120)
  if (ratio >= 0.20) return 60 + Math.round((ratio - 0.20) * 200);  // Level 3-4 (60-90)
  return Math.round(ratio * 300);
}

/**
 * Converts TOEIC Writing completed tasks count (0-8) to Scaled Score (0-200 PTS).
 */
export function convertToeicWritingRawToScaled(writingAnswered: number, totalWriting: number = 8): number {
  if (writingAnswered <= 0) return 0;
  const ratio = writingAnswered / Math.max(1, totalWriting);
  if (ratio >= 0.95) return 190; // Level 8-9 (190-200)
  if (ratio >= 0.80) return 160 + Math.round((ratio - 0.80) * 150); // Level 7 (160-180)
  if (ratio >= 0.60) return 130 + Math.round((ratio - 0.60) * 150); // Level 6 (130-150)
  if (ratio >= 0.40) return 100 + Math.round((ratio - 0.40) * 150); // Level 5 (100-120)
  if (ratio >= 0.20) return 60 + Math.round((ratio - 0.20) * 200);  // Level 3-4 (60-90)
  return Math.round(ratio * 300);
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
  let speakingAnswered = 0;
  let writingAnswered = 0;
  let totalSpeakingTasks = 0;
  let totalWritingTasks = 0;

  const partMap: Record<number, { title: string; total: number; correct: number }> = {};
  const questionResults: QuestionResultDetail[] = [];

  activeQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[q.id];
    const isSkipped = userChoice === undefined;
    const isCorrect = !isSkipped && userChoice === q.correctAnswer;
    const isFlagged = !!(flaggedQuestions && flaggedQuestions[q.id]);
    
    if (q.section === "SPEAKING") {
      totalSpeakingTasks += 1;
      if (!isSkipped) speakingAnswered += 1;
    }
    if (q.section === "WRITING") {
      totalWritingTasks += 1;
      if (!isSkipped) writingAnswered += 1;
    }

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
  let speakingScore: number | undefined;
  let writingScore: number | undefined;

  if (exam.type === "TOEIC_LR" || exam.type === "TOEIC_MINI") {
    listeningScore = convertToeicListeningRawToScaled(listeningCorrect);
    readingScore = convertToeicReadingRawToScaled(readingCorrect);
    scaledScore = listeningScore + readingScore;
  } else if (exam.type === "TOEIC_SPEAKING_WRITING") {
    speakingScore = convertToeicSpeakingRawToScaled(speakingAnswered, totalSpeakingTasks || 11);
    writingScore = convertToeicWritingRawToScaled(writingAnswered, totalWritingTasks || 8);
    scaledScore = speakingScore + writingScore;
  } else if (exam.type === "TOEIC_FULL") {
    listeningScore = convertToeicListeningRawToScaled(listeningCorrect);
    readingScore = convertToeicReadingRawToScaled(readingCorrect);
    speakingScore = convertToeicSpeakingRawToScaled(speakingAnswered, totalSpeakingTasks || 11);
    writingScore = convertToeicWritingRawToScaled(writingAnswered, totalWritingTasks || 8);
    scaledScore = listeningScore + readingScore;
  } else if (exam.type.includes("IELTS")) {
    const listBand = convertIeltsRawToBandScore(listeningCorrect);
    const readBand = convertIeltsRawToBandScore(readingCorrect);
    const speakBand = speakingAnswered > 0 ? 8.0 : 0;
    const writeBand = writingAnswered > 0 ? 7.5 : 0;

    listeningScore = listBand;
    readingScore = readBand;
    speakingScore = speakBand;
    writingScore = writeBand;

    // Cambridge IELTS Overall Band Calculation (rounded to nearest 0.5)
    if (exam.type === "IELTS_FULL") {
      const activeBands: number[] = [];
      if (listeningScore > 0) activeBands.push(listeningScore);
      if (readingScore > 0) activeBands.push(readingScore);
      if (speakingScore > 0) activeBands.push(speakingScore);
      if (writingScore > 0) activeBands.push(writingScore);
      
      const avg = activeBands.length > 0
        ? activeBands.reduce((a, b) => a + b, 0) / activeBands.length
        : convertIeltsRawToBandScore(correctCount);
      scaledScore = Math.round(avg * 2) / 2;
    } else if (exam.type === "IELTS_SPEAKING") {
      speakingScore = speakingAnswered > 0 ? 8.5 : 0;
      scaledScore = speakingScore;
      listeningScore = undefined;
      readingScore = undefined;
      writingScore = undefined;
    } else if (exam.type === "IELTS_WRITING") {
      writingScore = writingAnswered > 0 ? 8.0 : 0;
      scaledScore = writingScore;
      listeningScore = undefined;
      readingScore = undefined;
      speakingScore = undefined;
    } else if (exam.type === "IELTS_LISTENING") {
      listeningScore = convertIeltsRawToBandScore(listeningCorrect);
      scaledScore = listeningScore;
      readingScore = undefined;
      speakingScore = undefined;
      writingScore = undefined;
    } else if (exam.type === "IELTS_READING") {
      readingScore = convertIeltsRawToBandScore(readingCorrect);
      scaledScore = readingScore;
      listeningScore = undefined;
      speakingScore = undefined;
      writingScore = undefined;
    } else {
      scaledScore = convertIeltsRawToBandScore(correctCount);
    }
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

  const getPartDiagnosticAdvice = (partNum: number, partTitle: string) => {
    const titleLower = partTitle.toLowerCase();
    
    // IELTS Listening Sections 1-4
    if (titleLower.includes("listening section 1")) {
      return `Cần chú trọng bắt chính xác tên riêng (spelling), mã số định danh, số tiền, ngày tháng và địa chỉ thường gặp trong giao tiếp đời sống.`;
    }
    if (titleLower.includes("listening section 2")) {
      return `Cần rèn kỹ năng định hướng bản đồ (map labeling), nghe chỉ đường và nắm bắt các mốc thời gian của bài hướng dẫn tham quan.`;
    }
    if (titleLower.includes("listening section 3")) {
      return `Cần theo dõi sát mạch thảo luận học thuật giữa giáo sư và sinh viên, phân biệt quan điểm từng người nói và phân công nghiên cứu.`;
    }
    if (titleLower.includes("listening section 4")) {
      return `Cần luyện nghe bài giảng độc thoại học thuật tốc độ cao, bắt từ khóa chuyên ngành, số liệu thực nghiệm và kết luận then chốt.`;
    }

    // IELTS Reading Passages 1-3
    if (titleLower.includes("reading passage 1")) {
      return `Cần tăng tốc độ đọc quét (Scanning) thông tin khoa học tự nhiên, tra cứu số liệu và định vị chính xác định nghĩa thuật ngữ.`;
    }
    if (titleLower.includes("reading passage 2")) {
      return `Cần rèn kỹ năng đọc hiểu chuyên sâu tài liệu tâm lý/thần kinh học thuật, giải mã mối quan hệ nhân - quả và so sánh giả thuyết.`;
    }
    if (titleLower.includes("reading passage 3")) {
      return `Cần nâng cao khả năng xử lý bài đọc lịch sử - khảo cổ dài, xác định mốc thời gian cách mạng công nghiệp và phân tích tác động xã hội.`;
    }

    // IELTS Speaking Parts 1-3
    if (titleLower.includes("ielts speaking part 1")) {
      return `Cần trả lời trực tiếp và mở rộng 4-5 câu mạch lạc, sử dụng các collocations tự nhiên về môi trường và phát âm rõ âm đuôi.`;
    }
    if (titleLower.includes("ielts speaking part 2")) {
      return `Cần tận dụng tối đa 1 phút ghi chú theo 4 gạch đầu dòng Cue Card và duy trì bài nói liên tục 2 phút không ngập ngừng (fluency).`;
    }
    if (titleLower.includes("ielts speaking part 3")) {
      return `Cần phát triển câu trả lời học thuật 2 chiều (balanced view), dùng câu điều kiện, câu nhượng bộ và từ vựng trừu tượng C1/C2.`;
    }

    // IELTS Writing Tasks 1-2
    if (titleLower.includes("ielts writing task 1")) {
      return `Cần viết báo cáo 150+ từ có đoạn Overview nêu bật xu hướng chính, gom nhóm dữ liệu biểu đồ năng lượng tái tạo logic và so sánh chuẩn xác.`;
    }
    if (titleLower.includes("ielts writing task 2")) {
      return `Cần viết bài luận 250+ từ thảo luận 2 quan điểm (học phí vs miễn phí đại học), lập luận chặt chẽ với từ vựng học thuật C2 và nêu rõ lập trường cá nhân.`;
    }

    // TOEIC Speaking Parts
    if (titleLower.includes("read a text aloud")) {
      return `Cần chú trọng phát âm chuẩn các âm đuôi /s/, /z/, /t/, /d/, nhấn trọng âm từ khóa và ngắt hơi theo cụm nghĩa (chunking).`;
    }
    if (titleLower.includes("describe a picture")) {
      return `Cần áp dụng cấu trúc nói 4 bước: 1. Khái quát bức tranh ➔ 2. Hành động trọng tâm ➔ 3. Hậu cảnh & chi tiết ➔ 4. Cảm nhận chung.`;
    }
    if (titleLower.includes("respond to questions") && !titleLower.includes("information")) {
      return `Cần phản xạ trả lời trực diện không ậm ừ trong 15s cho Q5/Q6 và phát triển 2 luận điểm kèm ví dụ trong 30s cho Q7.`;
    }
    if (titleLower.includes("information provided") || titleLower.includes("respond using")) {
      return `Cần quét nhanh lịch trình/bảng biểu, trích xuất chuẩn xác thời gian, địa điểm, diễn giả và đính chính hiểu lầm một cách lịch sự.`;
    }
    if (titleLower.includes("express an opinion") && !titleLower.includes("writing")) {
      return `Cần lập dàn ý 60s điểm cao: Mở bài nêu lập trường ➔ 2 Luận cứ với từ vựng C1 ➔ Ví dụ thực tế ➔ Kết bài khẳng định lợi ích.`;
    }

    // TOEIC Writing Parts
    if (titleLower.includes("write a sentence")) {
      return `Cần đảm bảo đủ 2 từ khóa cho sẵn, chia đúng thì Hiện tại tiếp diễn / đơn, hòa hợp chủ-vị và tránh bẫy ngoại động từ (discuss, explain).`;
    }
    if (titleLower.includes("written request") || titleLower.includes("respond to a written")) {
      return `Cần cấu trúc Email thương mại trang trọng (Dear/Sincerely), giải quyết triệt để 2 yêu cầu của khách hàng và duy trì giọng văn lịch sự.`;
    }
    if (titleLower.includes("opinion essay") || titleLower.includes("write an opinion essay")) {
      return `Cần viết bài luận 300+ từ với cấu trúc 5 đoạn: Mở bài, 2 Thân bài lập luận, Đoạn phản biện (Counter-argument & Rebuttal) và Kết luận.`;
    }

    // TOEIC Listening & Reading Parts 1-7
    switch (partNum) {
      case 1:
        return `Cần luyện kỹ năng quan sát tranh, bắt động từ mô tả hành động và tránh bẫy thì hiện tại tiếp diễn / bị động.`;
      case 2:
        return `Cần luyện phản xạ bẫy từ đồng âm (same-sound), câu hỏi gián tiếp và câu trả lời gợi ý trá hình.`;
      case 3:
        return `Cần đọc trước câu hỏi 30s, nắm bắt vai trò người nói (Who/Where/Next action) và ngữ cảnh hội thoại.`;
      case 4:
        return `Cần luyện nghe đoạn độc thoại dài, bắt ý chính mở đầu và thông tin chi tiết quan trọng.`;
      case 5:
        return `Cần củng cố ngữ pháp cốt lõi (từ loại N/V/Adj/Adv, đại từ quan hệ, thì động từ và liên từ).`;
      case 6:
        return `Cần luyện kỹ năng liên kết ngữ cảnh toàn văn và câu điền nguyên câu văn logic.`;
      case 7:
        return `Cần nâng cao tốc độ đọc quét (Skimming & Scanning) và xử lý bài đọc đôi/ba (Multiple Passages).`;
      default:
        return `Cần củng cố kỹ năng và phương pháp làm bài chuyên sâu cho phần thi này.`;
    }
  };

  partAnalysis.forEach((p) => {
    if (p.accuracyPercent >= 75) {
      strengths.push(`${p.partTitle} (Đạt ${p.correctCount}/${p.totalQuestions} câu)`);
    } else if (p.accuracyPercent <= 40) {
      weaknesses.push({
        partNumber: p.partNumber,
        partTitle: p.partTitle,
        issue: getPartDiagnosticAdvice(p.partNumber, p.partTitle),
        priority: "HIGH",
        accuracyPercent: p.accuracyPercent,
        correctCount: p.correctCount,
        totalQuestions: p.totalQuestions
      });
    } else if (p.accuracyPercent <= 65) {
      weaknesses.push({
        partNumber: p.partNumber,
        partTitle: p.partTitle,
        issue: getPartDiagnosticAdvice(p.partNumber, p.partTitle),
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
