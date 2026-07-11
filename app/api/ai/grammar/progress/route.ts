import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topicId, level, score, xpEarned } = await req.json();

    if (!topicId || score === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upsert or create user progress entry in grammar_progress table
    const progress = await prisma.grammarProgress.create({
      data: {
        userId,
        topicId,
        level: level || "basic",
        score: parseInt(score),
        xpEarned: parseInt(xpEarned),
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    console.error("Failed to save grammar progress:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
