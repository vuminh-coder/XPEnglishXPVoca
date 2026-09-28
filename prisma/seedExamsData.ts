import { PrismaClient } from "@prisma/client";
import { MOCK_EXAM_PAPERS, ExamPaper } from "@/features/exam-prep/data/exam-papers";

/**
 * Seeds standardized Exam Papers, Exam Sections, and Questions into PostgreSQL database.
 * Idempotent: Can be run multiple times safely without corrupting or duplicating data.
 */
export async function seedExamsData(prisma: PrismaClient) {
  console.log(`📦 Seeding ${MOCK_EXAM_PAPERS.length} standardized exam papers into database...`);

  // 1. Ensure ExamTypes ("TOEIC", "IELTS")
  const toeicType = await prisma.examType.upsert({
    where: { id: "type_toeic" },
    update: { name: "TOEIC", description: "ETS TOEIC Standardized Examination Bank" },
    create: { id: "type_toeic", name: "TOEIC", description: "ETS TOEIC Standardized Examination Bank" },
  });

  const ieltsType = await prisma.examType.upsert({
    where: { id: "type_ielts" },
    update: { name: "IELTS", description: "Cambridge IELTS Standardized Examination Bank" },
    create: { id: "type_ielts", name: "IELTS", description: "Cambridge IELTS Standardized Examination Bank" },
  });

  const typeMap: Record<string, string> = {
    TOEIC: toeicType.id,
    IELTS: ieltsType.id,
  };

  let totalQuestionsCount = 0;

  for (const paper of MOCK_EXAM_PAPERS) {
    const isIelts = paper.type.includes("IELTS");
    const examTypeId = isIelts ? typeMap.IELTS : typeMap.TOEIC;
    const difficultyLevel =
      paper.level === "Advanced" ? 4 : paper.level === "Intermediate" ? 3 : 2;

    // 2. Upsert Exam
    const dbExam = await prisma.exam.upsert({
      where: { id: paper.id },
      update: {
        title: paper.title,
        description: paper.description,
        duration: paper.timeLimitMinutes,
        totalQuestions: paper.totalQuestions,
        difficulty: difficultyLevel,
        isFullTest: paper.type.includes("FULL") || paper.type.includes("LR"),
        examTypeId,
      },
      create: {
        id: paper.id,
        examTypeId,
        title: paper.title,
        description: paper.description,
        duration: paper.timeLimitMinutes,
        totalQuestions: paper.totalQuestions,
        difficulty: difficultyLevel,
        isFullTest: paper.type.includes("FULL") || paper.type.includes("LR"),
      },
    });

    // 3. Group questions by section/part
    const sectionMap = new Map<number, { name: string; sectionType: string; questions: any[] }>();

    paper.questions.forEach((q, idx) => {
      const partNum = q.partNumber || 1;
      const partName = q.partTitle || `Part ${partNum}`;
      const secType = (q.section || "READING").toLowerCase();

      if (!sectionMap.has(partNum)) {
        sectionMap.set(partNum, {
          name: partName,
          sectionType: secType,
          questions: [],
        });
      }

      sectionMap.get(partNum)!.questions.push({ ...q, globalIndex: idx + 1 });
    });

    // 4. Create Sections & Questions
    for (const [partNum, secData] of sectionMap.entries()) {
      const sectionId = `${paper.id}_part_${partNum}`;

      await prisma.examSection.upsert({
        where: { id: sectionId },
        update: {
          name: secData.name,
          sectionType: secData.sectionType,
          orderIndex: partNum,
        },
        create: {
          id: sectionId,
          examId: dbExam.id,
          name: secData.name,
          sectionType: secData.sectionType,
          orderIndex: partNum,
        },
      });

      const questionData = secData.questions.map((q, qIdx) => ({
        id: q.id,
        sectionId,
        questionType:
          q.section === "SPEAKING"
            ? "speaking"
            : q.section === "WRITING"
            ? "writing"
            : "multiple_choice",
        content: q.questionText || `Question ${q.globalIndex}`,
        options: q.options ? JSON.parse(JSON.stringify(q.options)) : null,
        correctAnswer: q.correctAnswer || null,
        explanation: q.explanation || null,
        audioUrl: q.audioUrl || null,
        imageUrl: q.imageUrl || null,
        points: 1,
        orderIndex: q.globalIndex || qIdx + 1,
      }));

      await prisma.question.createMany({
        data: questionData,
        skipDuplicates: true,
      });

      totalQuestionsCount += questionData.length;
    }
  }

  console.log(`✅ Exam Bank Seeded: ${MOCK_EXAM_PAPERS.length} papers, ${totalQuestionsCount} questions.`);
}
