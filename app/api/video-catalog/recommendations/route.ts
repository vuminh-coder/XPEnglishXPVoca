import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { getSmartVideoRecommendations } from "@/features/listening/services/videoRecommendationEngine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));

    const userId = await getAuthenticatedUserId(req);
    const recommendations = await getSmartVideoRecommendations(userId, limit);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (userId) {
      headers["Cache-Control"] = "private, no-cache, no-store, must-revalidate";
    } else {
      headers["Cache-Control"] = "public, s-maxage=60, stale-while-revalidate=120";
    }

    return NextResponse.json(
      {
        success: true,
        recommendations,
        total: recommendations.length,
      },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.error("[API Video Recommendations Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Không thể tính toán danh sách gợi ý video thông minh lúc này.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
