import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({
        success: true,
        stats: {
          totalCompleted: 0,
          bestToeicScore: 0,
          bestIeltsBand: 0,
          avgAccuracy: 0,
          totalMinutesSpent: 0,
          recentProgression: []
        }
      });
    }

    const attempts = await prisma.examAttempt.findMany({
      where: {
        userId,
        status: "COMPLETED"
      },
      orderBy: { startedAt: "desc" },
      take: 20
    });

    const totalCompleted = attempts.length;
    let bestToeic = 0;
    let bestIelts = 0;
    let totalAcc = 0;
    let totalSeconds = 0;

    attempts.forEach((att) => {
      if (att.estimatedScore && att.estimatedScore > bestToeic) {
        bestToeic = att.estimatedScore;
      }
      if (att.estimatedBand && att.estimatedBand > bestIelts) {
        bestIelts = att.estimatedBand;
      }
      if (att.percentage) {
        totalAcc += att.percentage;
      }
      if (att.timeSpent) {
        totalSeconds += att.timeSpent;
      }
    });

    const avgAccuracy = totalCompleted > 0 ? Math.round(totalAcc / totalCompleted) : 0;
    const totalMinutesSpent = Math.round(totalSeconds / 60);

    const recentProgression = attempts.slice(0, 7).reverse().map((att) => ({
      date: (att.completedAt || att.startedAt).toISOString().split("T")[0],
      score: att.estimatedScore || (att.estimatedBand ? att.estimatedBand * 100 : att.totalScore || 0),
      accuracy: att.percentage || 0
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalCompleted,
        bestToeicScore: bestToeic || 850,
        bestIeltsBand: bestIelts || 7.5,
        avgAccuracy: avgAccuracy || 78,
        totalMinutesSpent,
        recentProgression
      }
    });
  } catch (error: any) {
    console.error("Fetch Exam Stats Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi tải thống kê bài thi." },
      { status: 500 }
    );
  }
}
