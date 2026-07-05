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
    const { examId } = body;

    if (!examId) {
      return NextResponse.json({ error: "Missing examId" }, { status: 400 });
    }

    // 1. Verify exam exists
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            questions: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // 2. Create ExamAttempt
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: userId,
        examId: examId,
        status: "IN_PROGRESS",
      },
    });

    // 3. Prepare questions payload (redacting correctAnswer & explanation for cheating protection)
    const sanitizedSections = exam.sections.map((section) => ({
      id: section.id,
      name: section.name,
      sectionType: section.sectionType,
      audioUrl: section.audioUrl,
      passageText: section.passageText,
      questions: section.questions.map((q) => ({
        id: q.id,
        questionType: q.questionType,
        content: q.content,
        options: q.options,
        imageUrl: q.imageUrl,
        audioUrl: q.audioUrl,
        points: q.points,
        orderIndex: q.orderIndex,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: {
        attemptId: attempt.id,
        exam: {
          id: exam.id,
          title: exam.title,
          duration: exam.duration,
          totalQuestions: exam.totalQuestions,
          sections: sanitizedSections,
        },
      },
    });
  } catch (error: any) {
    console.error("POST /api/exams/attempt/start error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
