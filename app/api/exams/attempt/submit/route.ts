import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { attemptId, answers } = body; // answers: Array<{ questionId: string, userAnswer: string }>

    if (!attemptId || !answers) {
      return NextResponse.json({ error: "Missing attemptId or answers array" }, { status: 400 });
    }

    // 1. Fetch attempt and exam
    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: {
          include: {
            examType: true,
            sections: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      return NextResponse.json({ error: "Exam attempt not found" }, { status: 404 });
    }

    if (attempt.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (attempt.status === "COMPLETED") {
      return NextResponse.json({ error: "Attempt already submitted" }, { status: 400 });
    }

    // 2. Grade the answers
    const allQuestionsMap = new Map<string, any>();
    attempt.exam.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        allQuestionsMap.set(q.id, q);
      });
    });

    let correctCount = 0;
    let totalPoints = 0;
    let maxPoints = 0;

    const gradingData = answers.map((ans: any) => {
      const question = allQuestionsMap.get(ans.questionId);
      if (!question) return null;

      const isCorrect = question.correctAnswer?.trim().toLowerCase() === ans.userAnswer?.trim().toLowerCase();
      if (isCorrect) {
        correctCount++;
        totalPoints += question.points;
      }
      maxPoints += question.points;

      return {
        questionId: question.id,
        userAnswer: ans.userAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      };
    }).filter(Boolean) as Array<{ questionId: string; userAnswer: string; isCorrect: boolean; points: number }>;

    // Calculate score scaling (TOEIC 10-990 or IELTS 1.0-9.0)
    const percentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
    const isToeic = attempt.exam.examType.name.toUpperCase() === "TOEIC";
    let estimatedScore: number | null = null;
    let estimatedBand: number | null = null;

    if (isToeic) {
      // Linear scale from 10 to 990
      estimatedScore = Math.round(10 + (percentage / 100) * 980);
    } else {
      // IELTS scale from 1.0 to 9.0 (rounded to nearest 0.5)
      const rawBand = 1.0 + (percentage / 100) * 8.0;
      estimatedBand = Math.round(rawBand * 2) / 2;
    }

    // 3. Perform database operations in transaction
    const finalResult = await prisma.$transaction(async (tx) => {
      // Save all QuestionAnswer entries
      await tx.questionAnswer.createMany({
        data: gradingData.map((g) => ({
          attemptId: attemptId,
          questionId: g.questionId,
          userAnswer: g.userAnswer,
          isCorrect: g.isCorrect,
          points: g.points,
        })),
      });

      // Update attempt status
      const updatedAttempt = await tx.examAttempt.update({
        where: { id: attemptId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          totalScore: totalPoints,
          maxScore: maxPoints,
          percentage: percentage,
          estimatedScore: estimatedScore,
          estimatedBand: estimatedBand,
        },
      });

      // Award XP to user Profile
      const baseXp = 50; // Exam participation XP
      const bonusXp = percentage >= 70 ? 50 : 0;
      const totalXpGained = baseXp + bonusXp;

      const profile = await tx.profile.findUnique({
        where: { id: userId },
      });

      if (profile) {
        await tx.profile.update({
          where: { id: userId },
          data: {
            totalXp: profile.totalXp + totalXpGained,
          },
        });
      }

      return {
        attempt: updatedAttempt,
        xpGained: totalXpGained,
      };
    });

    // 4. Return results with full answer keys for review
    const feedbackQuestions = attempt.exam.sections.map((sec) => ({
      name: sec.name,
      questions: sec.questions.map((q) => {
        const userAns = answers.find((a: any) => a.questionId === q.id);
        const isCorrect = q.correctAnswer?.trim().toLowerCase() === userAns?.userAnswer?.trim().toLowerCase();
        return {
          id: q.id,
          content: q.content,
          options: q.options,
          imageUrl: q.imageUrl,
          audioUrl: q.audioUrl,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          userAnswer: userAns?.userAnswer || null,
          isCorrect: userAns ? isCorrect : false,
        };
      }),
    }));

    return NextResponse.json({
      success: true,
      data: {
        attempt: finalResult.attempt,
        xpGained: finalResult.xpGained,
        feedback: feedbackQuestions,
      },
    });
  } catch (error: any) {
    console.error("POST /api/exams/attempt/submit error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
