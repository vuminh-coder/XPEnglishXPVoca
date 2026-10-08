import { NextRequest, NextResponse } from "next/server";
import { getUserReadingStats } from "@/features/reading/services/readingGradingService";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    const stats = await getUserReadingStats(userId);

    return NextResponse.json(
      {
        success: true,
        userId: userId || null,
        isGuest: !userId || userId.startsWith("guest_"),
        stats,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("[API Reading Progress GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Không thể tải tiến độ đọc lúc này.",
      },
      { status: 500 }
    );
  }
}
