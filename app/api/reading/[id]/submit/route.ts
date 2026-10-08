import { NextRequest, NextResponse } from "next/server";
import {
  gradeReadingPassageAttempt,
  persistReadingAttemptToDatabase,
} from "@/features/reading/services/readingGradingService";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Thiếu mã định danh bài đọc." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { answers, timeSpentSeconds = 60 } = body as {
      answers: Record<string, number> | Array<{ questionId: string; selectedOption: number }>;
      timeSpentSeconds?: number;
    };

    if (!answers || (typeof answers !== "object" && !Array.isArray(answers))) {
      return NextResponse.json(
        { success: false, error: "Định dạng câu trả lời không hợp lệ." },
        { status: 400 }
      );
    }

    // 1. Server-side grading & verification
    const gradingResult = gradeReadingPassageAttempt(id, answers, timeSpentSeconds);

    // 2. Authentication & Database persistence
    const userId = await getAuthenticatedUserId(req);
    let isPersisted = false;

    if (userId && !userId.startsWith("guest_")) {
      isPersisted = await persistReadingAttemptToDatabase(userId, gradingResult.summary);
    }

    return NextResponse.json(
      {
        success: true,
        summary: gradingResult.summary,
        results: gradingResult.results,
        isPersisted,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API Reading Submit POST Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Không thể chấm điểm bài đọc lúc này.",
      },
      { status: 500 }
    );
  }
}
