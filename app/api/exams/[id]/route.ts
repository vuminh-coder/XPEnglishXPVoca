import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Thiếu mã đề thi (id)." }, { status: 400 });
    }

    // 1. Attempt DB lookup with selective projection
    const dbExam = await safeDbExecute(async () => {
      return await prisma.exam.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          totalQuestions: true,
          difficulty: true,
          isFullTest: true,
          examType: {
            select: {
              id: true,
              name: true,
            },
          },
          sections: {
            orderBy: { orderIndex: "asc" },
            select: {
              id: true,
              name: true,
              sectionType: true,
              orderIndex: true,
              duration: true,
              audioUrl: true,
              passageText: true,
              questions: {
                orderBy: { orderIndex: "asc" },
                select: {
                  id: true,
                  questionType: true,
                  content: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  audioUrl: true,
                  imageUrl: true,
                  points: true,
                  orderIndex: true,
                },
              },
            },
          },
        },
      });
    });

    if (dbExam && dbExam.sections && dbExam.sections.length > 0) {
      const flattenedQuestions = dbExam.sections.flatMap((sec) =>
        sec.questions.map((q) => ({
          id: q.id,
          partNumber: sec.orderIndex,
          partTitle: sec.name,
          section: sec.sectionType.toUpperCase(),
          audioUrl: q.audioUrl || undefined,
          imageUrl: q.imageUrl || undefined,
          passageText: sec.passageText || undefined,
          questionText: q.content,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
        }))
      );

      const matchingMock = MOCK_EXAM_PAPERS.find((p) => p.id === dbExam.id);

      return NextResponse.json(
        {
          success: true,
          source: "database",
          exam: {
            id: dbExam.id,
            title: dbExam.title,
            description: dbExam.description,
            type: matchingMock?.type || (dbExam.examType?.name === "IELTS" ? "IELTS_FULL" : "TOEIC_LR"),
            level: dbExam.difficulty >= 4 ? "Advanced" : dbExam.difficulty === 3 ? "Intermediate" : "Beginner",
            timeLimitMinutes: dbExam.duration,
            totalQuestions: dbExam.totalQuestions,
            maxScore: dbExam.examType?.name === "IELTS" ? 9.0 : 990,
            categoryBadge: matchingMock?.categoryBadge || (dbExam.examType?.name === "IELTS" ? "IELTS Academic" : "ETS TOEIC L&R"),
            tags: matchingMock?.tags || [dbExam.examType?.name || "TOEIC", "Standardized Exam"],
            supportedSkills: matchingMock?.supportedSkills || ["LISTENING", "READING"],
            sections: dbExam.sections,
            questions: flattenedQuestions,
          },
        },
        {
          status: 200,
          headers: {
            "X-Response-Time": `${Date.now() - startTime}ms`,
          },
        }
      );
    }

    // 2. Fallback to Verified Question Bank
    const paper = MOCK_EXAM_PAPERS.find((p) => p.id === id);

    if (!paper) {
      return NextResponse.json(
        { error: `Không tìm thấy đề thi với mã '${id}'.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        source: "question_bank",
        exam: paper,
      },
      {
        status: 200,
        headers: {
          "X-Response-Time": `${Date.now() - startTime}ms`,
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/exams/[id] Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi tải chi tiết đề thi." },
      { status: 500 }
    );
  }
}
