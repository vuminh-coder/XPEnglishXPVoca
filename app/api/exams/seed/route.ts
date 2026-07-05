import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Create or Find Exam Types
    const toeicType = await prisma.examType.upsert({
      where: { id: "toeic-type-id" },
      update: {},
      create: {
        id: "toeic-type-id",
        name: "TOEIC",
        description: "Luyện thi thử chứng chỉ TOEIC định dạng Listening & Reading mới nhất.",
      },
    });

    const ieltsType = await prisma.examType.upsert({
      where: { id: "ielts-type-id" },
      update: {},
      create: {
        id: "ielts-type-id",
        name: "IELTS",
        description: "Luyện thi thử chứng chỉ IELTS Academic Reading & Listening.",
      },
    });

    // 2. Create sample TOEIC Exam
    const toeicExam = await prisma.exam.upsert({
      where: { id: "sample-toeic-exam-id" },
      update: {},
      create: {
        id: "sample-toeic-exam-id",
        examTypeId: toeicType.id,
        title: "Đề thi thử TOEIC L&R - Đề số 01",
        description: "Đề thi mô phỏng đầy đủ cấu trúc đề thi TOEIC chuẩn năm 2026. Luyện tập quản lý thời gian.",
        duration: 120,
        totalQuestions: 6,
        difficulty: 3,
        isFullTest: true,
      },
    });

    // Create TOEIC Sections
    const section1 = await prisma.examSection.upsert({
      where: { id: "toeic-section-1" },
      update: {},
      create: {
        id: "toeic-section-1",
        examId: toeicExam.id,
        name: "Part 1: Photographs (Tranh vẽ)",
        sectionType: "listening",
        orderIndex: 1,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    });

    const section2 = await prisma.examSection.upsert({
      where: { id: "toeic-section-2" },
      update: {},
      create: {
        id: "toeic-section-2",
        examId: toeicExam.id,
        name: "Part 5: Incomplete Sentences (Điền vào chỗ trống)",
        sectionType: "reading",
        orderIndex: 2,
      },
    });

    // Create TOEIC Questions
    // Part 1 Questions
    await prisma.question.upsert({
      where: { id: "toeic-q1" },
      update: {},
      create: {
        id: "toeic-q1",
        sectionId: section1.id,
        questionType: "multiple_choice",
        content: "Hãy quan sát tranh vẽ và chọn mô tả đúng nhất về bức tranh.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        options: [
          { id: "A", text: "They are having a meeting in the conference room." },
          { id: "B", text: "They are typing on their laptops." },
          { id: "C", text: "The man is drinking coffee near the window." },
          { id: "D", text: "The office chairs are being stacked." },
        ],
        correctAnswer: "A",
        explanation: "Trong hình chúng ta thấy mọi người đang tập trung quanh bàn và thảo luận trong phòng họp, do đó đáp án A là chính xác nhất.",
        orderIndex: 1,
      },
    });

    await prisma.question.upsert({
      where: { id: "toeic-q2" },
      update: {},
      create: {
        id: "toeic-q2",
        sectionId: section1.id,
        questionType: "multiple_choice",
        content: "Hãy nghe và chọn đáp án chính xác.",
        options: [
          { id: "A", text: "He is loading boxes onto the truck." },
          { id: "B", text: "He is sweeping the hallway." },
          { id: "C", text: "He is walking down the stairs." },
          { id: "D", text: "He is repairing a photocopier." },
        ],
        correctAnswer: "A",
        explanation: "Audio mô tả người đàn ông đang chuyển hàng hóa, khớp với đáp án A.",
        orderIndex: 2,
      },
    });

    // Part 5 Questions
    await prisma.question.upsert({
      where: { id: "toeic-q3" },
      update: {},
      create: {
        id: "toeic-q3",
        sectionId: section2.id,
        questionType: "multiple_choice",
        content: "The marketing director decided to _______ the launch of the new product due to budget constraints.",
        options: [
          { id: "A", text: "postpone" },
          { id: "B", text: "postponed" },
          { id: "C", text: "postponing" },
          { id: "D", text: "postponement" },
        ],
        correctAnswer: "A",
        explanation: "Sau động từ 'decided to' chúng ta cần một động từ nguyên thể (verb infinitive). Do đó chọn 'postpone'.",
        orderIndex: 3,
      },
    });

    await prisma.question.upsert({
      where: { id: "toeic-q4" },
      update: {},
      create: {
        id: "toeic-q4",
        sectionId: section2.id,
        questionType: "multiple_choice",
        content: "The technical support team resolved the issue ________ than expected, minimizing downtime.",
        options: [
          { id: "A", text: "quick" },
          { id: "B", text: "quickly" },
          { id: "C", text: "more quickly" },
          { id: "D", text: "most quickly" },
        ],
        correctAnswer: "C",
        explanation: "Trong câu có từ so sánh 'than' và đứng sau động từ thường 'resolved' nên cần trạng từ so sánh hơn 'more quickly'.",
        orderIndex: 4,
      },
    });


    // 3. Create sample IELTS Exam
    const ieltsExam = await prisma.exam.upsert({
      where: { id: "sample-ielts-exam-id" },
      update: {},
      create: {
        id: "sample-ielts-exam-id",
        examTypeId: ieltsType.id,
        title: "IELTS Reading Practice Academic - Test 01",
        description: "Luyện đọc hiểu tiếng Anh học thuật IELTS. Tăng cường kỹ năng Skimming & Scanning.",
        duration: 60,
        totalQuestions: 2,
        difficulty: 4,
        isFullTest: false,
      },
    });

    const ieltsSection = await prisma.examSection.upsert({
      where: { id: "ielts-section-1" },
      update: {},
      create: {
        id: "ielts-section-1",
        examId: ieltsExam.id,
        name: "Reading Passage 1: The Evolution of Language",
        sectionType: "reading",
        orderIndex: 1,
        passageText: "Language is a system of communication that consists of a set of sounds and written symbols which are used by the people of a particular country or region for talking or writing. The evolution of language is closely linked to biological changes in the human brain, which allowed for complex sound production and structures...",
      },
    });

    await prisma.question.upsert({
      where: { id: "ielts-q1" },
      update: {},
      create: {
        id: "ielts-q1",
        sectionId: ieltsSection.id,
        questionType: "multiple_choice",
        content: "According to the passage, the evolution of human language is closely connected to what?",
        options: [
          { id: "A", text: "Biological changes in the brain." },
          { id: "B", text: "Migration pattern of early humans." },
          { id: "C", text: "The invention of printing presses." },
          { id: "D", text: "Trade relationships between countries." },
        ],
        correctAnswer: "A",
        explanation: "Đoạn văn ghi rõ 'The evolution of language is closely linked to biological changes in the human brain'.",
        orderIndex: 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with TOEIC & IELTS mock exams",
      toeicExamId: toeicExam.id,
      ieltsExamId: ieltsExam.id,
    });
  } catch (error: any) {
    console.error("Exams seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
