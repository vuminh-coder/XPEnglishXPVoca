import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";
import { calculateExamResult, UserExamAnswers } from "@/features/exam-prep/utils/examScoringEngine";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const {
      examId,
      timeSpentSeconds = 0,
      userAnswers = {}, // Map { [questionId: string]: "A" | "B" | "C" | "D" }
      answers = [], // Array of { questionId, userChoice } fallback
    } = body;

    if (!examId) {
      return NextResponse.json({ error: "Thiếu mã bài thi (examId)." }, { status: 400 });
    }

    // 1. Resolve official Exam Paper from verified question bank
    const officialPaper = MOCK_EXAM_PAPERS.find((p) => p.id === examId);

    // Build unified answers map
    const unifiedAnswers: UserExamAnswers = { ...userAnswers };
    if (Array.isArray(answers)) {
      answers.forEach((ans: any) => {
        if (ans.questionId && ans.userChoice) {
          unifiedAnswers[ans.questionId] = ans.userChoice;
        }
      });
    }

    // 2. Server-Authoritative Calculation: Compute true score from official answer keys
    let verifiedScaledScore = 0;
    let verifiedAccuracyPercent = 0;
    let verifiedMaxScore = 990;
    let verifiedTotalQuestions = 100;
    let examTitle = "Standardized English Exam";
    let examType = "TOEIC";
    let isIelts = false;

    if (officialPaper) {
      examTitle = officialPaper.title;
      examType = officialPaper.type;
      isIelts = officialPaper.type.includes("IELTS");
      verifiedMaxScore = officialPaper.maxScore;
      verifiedTotalQuestions = officialPaper.questions.length;

      const scoredSummary = calculateExamResult(
        officialPaper,
        unifiedAnswers,
        Math.max(1, Number(timeSpentSeconds) || 1)
      );

      verifiedScaledScore = scoredSummary.scaledScore;
      verifiedAccuracyPercent = scoredSummary.accuracyPercent;
    } else {
      // Fallback for custom or unlisted mock exams
      verifiedScaledScore = Math.min(990, Math.max(0, Number(body.scaledScore || body.totalScore) || 0));
      verifiedAccuracyPercent = Math.min(100, Math.max(0, Number(body.accuracyPercent) || 0));
      verifiedMaxScore = isIelts ? 9.0 : 990;
    }

    // Anti-Bot & Speed Limit Check: Prevent instant 0-second script flooding
    const safeTimeSpent = Math.max(5, Math.min(18000, Number(timeSpentSeconds) || 60));

    // If user is not logged in (Guest mode), return verified result without persisting to DB
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        message: "Đã hoàn thành bài thi ở chế độ Khách. Đăng nhập để lưu kết quả vào hồ sơ.",
        attempt: {
          examId,
          totalScore: verifiedScaledScore,
          maxScore: verifiedMaxScore,
          accuracyPercent: verifiedAccuracyPercent,
          timeSpentSeconds: safeTimeSpent,
        },
      });
    }

    // 3. Server-Authoritative DB Transaction
    const savedAttempt = await prisma.$transaction(async (tx) => {
      // 3.1. Ensure ExamType exists
      const typeName = isIelts ? "IELTS" : "TOEIC";
      let dbExamType = await tx.examType.findFirst({
        where: { name: typeName },
      });
      if (!dbExamType) {
        dbExamType = await tx.examType.create({
          data: {
            name: typeName,
            description: `${typeName} Standardized Examination Bank`,
          },
        });
      }

      // 3.2. Ensure Exam record exists
      let dbExam = await tx.exam.findUnique({
        where: { id: examId },
      });
      if (!dbExam) {
        dbExam = await tx.exam.create({
          data: {
            id: examId,
            examTypeId: dbExamType.id,
            title: examTitle,
            description: `Official exam test for ${examTitle}`,
            duration: Math.ceil(safeTimeSpent / 60) || 60,
            totalQuestions: verifiedTotalQuestions,
            difficulty: 3,
            isFullTest: true,
          },
        });
      }

      // 3.3. Create ExamAttempt record with verified scores
      const attempt = await tx.examAttempt.create({
        data: {
          userId,
          examId: dbExam.id,
          totalScore: verifiedScaledScore,
          maxScore: verifiedMaxScore,
          percentage: verifiedAccuracyPercent,
          estimatedBand: isIelts ? verifiedScaledScore : undefined,
          estimatedScore: !isIelts ? Math.round(verifiedScaledScore) : undefined,
          timeSpent: safeTimeSpent,
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });

      // 3.4. Server-Calculated XP & Coin rewards (Cap limits applied)
      const practiceMinutes = Math.min(180, Math.ceil(safeTimeSpent / 60));
      const xpToAdd = Math.min(150, Math.round(verifiedAccuracyPercent * 1.0 + 20));
      const coinsToAdd = Math.min(50, Math.round(verifiedAccuracyPercent * 0.2 + 10));

      await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: xpToAdd },
          coins: { increment: coinsToAdd },
          minutesStudied: { increment: practiceMinutes },
        },
      });

      return { attempt, xpToAdd, coinsToAdd };
    });

    return NextResponse.json({
      success: true,
      guest: false,
      attemptId: savedAttempt.attempt.id,
      verifiedScore: verifiedScaledScore,
      accuracyPercent: verifiedAccuracyPercent,
      xpAwarded: savedAttempt.xpToAdd,
      coinsAwarded: savedAttempt.coinsToAdd,
      message: "Đã chấm điểm và lưu kết quả bài thi thành công vào hệ thống.",
    });
  } catch (error: any) {
    console.error("Save Exam Attempt Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi chấm điểm bài thi." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ attempts: [], total: 0 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "10", 10));

    const attempts = await prisma.examAttempt.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: limit,
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            totalQuestions: true,
            examType: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      attempts: attempts.map((att) => ({
        id: att.id,
        examId: att.examId,
        examTitle: att.exam?.title || "Bài Thi Chuẩn",
        examType: att.exam?.examType?.name || "TOEIC",
        totalScore: att.totalScore,
        maxScore: att.maxScore,
        percentage: att.percentage,
        estimatedBand: att.estimatedBand,
        estimatedScore: att.estimatedScore,
        timeSpent: att.timeSpent,
        status: att.status,
        completedAt: att.completedAt || att.startedAt,
      })),
      total: attempts.length,
    });
  } catch (error: any) {
    console.error("Fetch Exam Attempts Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi tải lịch sử thi." },
      { status: 500 }
    );
  }
}
