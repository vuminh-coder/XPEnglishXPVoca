import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    const body = await request.json();
    const {
      examId,
      examTitle = "Standardized English Exam",
      examType = "TOEIC",
      totalScore = 0,
      maxScore = 990,
      accuracyPercent = 0,
      timeSpentSeconds = 0,
      scaledScore = 0,
      listeningScore,
      readingScore,
      speakingScore,
      writingScore,
      answers = [] // Array of { questionId, userChoice, correctAnswer, isCorrect, section }
    } = body;

    if (!examId) {
      return NextResponse.json({ error: "Thiếu mã bài thi (examId)." }, { status: 400 });
    }

    // If user is not logged in (Guest mode), return success without persisting
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        message: "Đã hoàn thành bài thi ở chế độ Khách (Guest). Đăng nhập để lưu lịch sử thi.",
        attempt: {
          examId,
          totalScore: scaledScore || totalScore,
          maxScore,
          accuracyPercent,
          timeSpentSeconds
        }
      });
    }

    // Execute database operations safely in transaction
    const savedAttempt = await prisma.$transaction(async (tx) => {
      // 1. Ensure ExamType exists
      const typeName = examType.includes("IELTS") ? "IELTS" : "TOEIC";
      let dbExamType = await tx.examType.findFirst({
        where: { name: typeName }
      });
      if (!dbExamType) {
        dbExamType = await tx.examType.create({
          data: {
            name: typeName,
            description: `${typeName} Standardized Proficiency Examination Bank`
          }
        });
      }

      // 2. Ensure Exam record exists
      let dbExam = await tx.exam.findUnique({
        where: { id: examId }
      });
      if (!dbExam) {
        dbExam = await tx.exam.create({
          data: {
            id: examId,
            examTypeId: dbExamType.id,
            title: examTitle,
            description: `Official exam test for ${examTitle}`,
            duration: Math.ceil(timeSpentSeconds / 60) || 60,
            totalQuestions: answers.length || 100,
            difficulty: 3,
            isFullTest: true
          }
        });
      }

      // 3. Create ExamAttempt record
      const isIelts = examType.includes("IELTS");
      const attempt = await tx.examAttempt.create({
        data: {
          userId,
          examId: dbExam.id,
          totalScore: scaledScore || totalScore,
          maxScore: maxScore || (isIelts ? 9.0 : 990),
          percentage: accuracyPercent,
          estimatedBand: isIelts ? scaledScore : undefined,
          estimatedScore: !isIelts ? Math.round(scaledScore) : undefined,
          timeSpent: timeSpentSeconds,
          status: "COMPLETED",
          completedAt: new Date()
        }
      });

      // 4. Update Profile XP, Coins & Study time
      const practiceMinutes = Math.ceil(timeSpentSeconds / 60);
      const xpToAdd = Math.round(accuracyPercent * 1.5 + 20);
      const coinsToAdd = Math.round(accuracyPercent * 0.3 + 10);

      await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: xpToAdd },
          coins: { increment: coinsToAdd },
          minutesStudied: { increment: practiceMinutes }
        }
      });

      return attempt;
    });

    return NextResponse.json({
      success: true,
      guest: false,
      attemptId: savedAttempt.id,
      message: "Đã lưu kết quả thi thành công vào hệ thống."
    });
  } catch (error: any) {
    console.error("Save Exam Attempt Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi lưu kết quả bài thi." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
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
            examType: { select: { name: true } }
          }
        }
      }
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
        completedAt: att.completedAt || att.startedAt
      })),
      total: attempts.length
    });
  } catch (error: any) {
    console.error("Fetch Exam Attempts Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi tải lịch sử thi." },
      { status: 500 }
    );
  }
}
