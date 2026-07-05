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
    const { targetExam, targetScore, targetDate, currentLevel, weeklyHours } = body;

    if (!targetExam || !targetScore || !targetDate) {
      return NextResponse.json(
        { error: "Missing targetExam, targetScore, or targetDate" },
        { status: 400 }
      );
    }

    const parsedDate = new Date(targetDate);
    const examType = targetExam.toUpperCase(); // "TOEIC" or "IELTS"

    // 1. Create a structured 30-day curriculum based on target exam
    const generatedTasks: Array<{
      dayIndex: number;
      taskType: string;
      description: string;
      xpReward: number;
    }> = [];

    if (examType === "TOEIC") {
      const toeicSections = [
        "Part 1: Photographs & Từ vựng Office",
        "Part 2: Question-Response & Từ vựng Marketing",
        "Part 5: Incomplete Sentences & Thì tiếng Anh",
        "Part 3: Short Conversations & Phrasal Verbs",
        "Part 4: Short Talks & Từ vựng Finance",
        "Part 6: Text Completion & Liên từ/Trạng từ",
        "Part 7: Reading Comprehension & Từ vựng Contract",
      ];

      for (let day = 1; day <= 30; day++) {
        const section = toeicSections[(day - 1) % toeicSections.length];
        let taskType = "vocabulary";
        let desc = "";
        let xp = 20;

        if (day % 3 === 1) {
          taskType = "listening";
          desc = `Luyện nghe TOEIC ${section}. Hoàn thành 10 câu trắc nghiệm nghe và ghi chú các từ mới.`;
          xp = 25;
        } else if (day % 3 === 2) {
          taskType = "reading";
          desc = `Luyện đọc hiểu ${section}. Đọc kỹ đoạn văn ngắn và giải thích các cụm từ vựng chính.`;
          xp = 25;
        } else {
          taskType = "vocabulary";
          desc = `Học 15 từ vựng mới và ôn tập Spaced Repetition các từ cũ thuộc chủ đề ${section.split(" & ")[1] || "Kinh tế"}.`;
          xp = 20;
        }

        generatedTasks.push({
          dayIndex: day,
          taskType,
          description: `Ngày ${day}: ${desc}`,
          xpReward: xp,
        });
      }
    } else {
      // IELTS Template
      const ieltsTopics = [
        "Education & Academic Vocabulary",
        "Environment & Global Warming",
        "Technology & Artificial Intelligence",
        "Health, Diet & Exercise",
        "Work, Leisure & Careers",
        "Art, Culture & Heritage",
        "Media, Advertising & News",
      ];

      for (let day = 1; day <= 30; day++) {
        const topic = ieltsTopics[(day - 1) % ieltsTopics.length];
        let taskType = "vocabulary";
        let desc = "";
        let xp = 25;

        if (day % 4 === 1) {
          taskType = "speaking";
          desc = `Luyện nói IELTS Speaking Part 1 & 2 về chủ đề ${topic}. Thu âm và kiểm tra phát âm IPA.`;
          xp = 30;
        } else if (day % 4 === 2) {
          taskType = "writing";
          desc = `Luyện viết IELTS Writing Task 1/2: Viết một đoạn văn phân tích hoặc nghị luận xã hội về ${topic}.`;
          xp = 30;
        } else if (day % 4 === 3) {
          taskType = "reading";
          desc = `Luyện đọc hiểu IELTS Reading: Skimming & Scanning bài viết học thuật về chủ đề ${topic}.`;
          xp = 25;
        } else {
          taskType = "vocabulary";
          desc = `Học 15 từ vựng IELTS Advanced (C1/C2) và làm Flashcard ôn tập về chủ đề ${topic}.`;
          xp = 20;
        }

        generatedTasks.push({
          dayIndex: day,
          taskType,
          description: `Ngày ${day}: ${desc}`,
          xpReward: xp,
        });
      }
    }

    // 2. Perform DB operations inside transaction
    const result = await prisma.$transaction(async (tx) => {
      // Delete existing plan & tasks if any
      const existingPlan = await tx.studyPlan.findUnique({
        where: { userId: userId },
      });

      if (existingPlan) {
        await tx.dailyTask.deleteMany({
          where: { planId: existingPlan.id },
        });
        await tx.studyPlan.delete({
          where: { userId: userId },
        });
      }

      // Create new StudyPlan
      const newPlan = await tx.studyPlan.create({
        data: {
          userId: userId,
          targetExam: examType,
          targetScore: parseInt(targetScore),
          targetDate: parsedDate,
          currentLevel: currentLevel || "Intermediate",
          weeklyHours: weeklyHours ? parseInt(weeklyHours) : 10,
        },
      });

      // Batch create daily tasks
      const tasksData = generatedTasks.map((t) => {
        const taskDate = new Date();
        taskDate.setDate(taskDate.getDate() + (t.dayIndex - 1));
        return {
          planId: newPlan.id,
          date: taskDate,
          taskType: t.taskType,
          description: t.description,
          isCompleted: false,
          xpReward: t.xpReward,
        };
      });

      await tx.dailyTask.createMany({
        data: tasksData,
      });

      return newPlan;
    });

    return NextResponse.json({
      success: true,
      message: "Study plan generated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("POST /api/study-plan/generate error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
