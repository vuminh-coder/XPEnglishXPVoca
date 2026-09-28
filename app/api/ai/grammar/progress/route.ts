import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { sanitizeInput } from "@/infrastructure/security/validation";
import { isRateLimited } from "@/infrastructure/security/rateLimit";

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);

    if (userId && isRateLimited(`ai_grammar_progress_${userId}`, 30, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await req.json();
    const { topicId, level, score, xpEarned } = body;

    if (!topicId || score === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sanitizedTopicId = sanitizeInput(String(topicId).trim().slice(0, 100));
    const parsedScore = Math.max(0, Math.min(100, parseInt(score, 10) || 0));
    const rawXp = parseInt(xpEarned, 10) || 0;
    // Server-authoritative XP security cap (max 35 XP per grammar quiz session)
    const cappedXp = Math.max(0, Math.min(35, rawXp));

    // Handle Unauthenticated / Guest Users safely
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        progress: {
          id: `guest_grammar_${Date.now()}`,
          userId: "guest",
          topicId: sanitizedTopicId,
          level: level || "basic",
          score: parsedScore,
          xpEarned: cappedXp,
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Atomic Database Transaction (Single-Root Persistence)
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check existing record with selective projection (Index: @@index([userId]))
      const existing = await tx.grammarProgress.findFirst({
        where: {
          userId,
          topicId: sanitizedTopicId,
        },
        select: {
          id: true,
          score: true,
          xpEarned: true,
        },
      });

      let progressRecord;
      if (existing) {
        // Keep best score or update with latest
        const bestScore = Math.max(existing.score, parsedScore);
        progressRecord = await tx.grammarProgress.update({
          where: { id: existing.id },
          data: {
            score: bestScore,
            level: level || "basic",
            xpEarned: Math.max(existing.xpEarned, cappedXp),
          },
          select: {
            id: true,
            userId: true,
            topicId: true,
            level: true,
            score: true,
            xpEarned: true,
            createdAt: true,
          },
        });
      } else {
        // Create new record with selective projection (Rule 3)
        progressRecord = await tx.grammarProgress.create({
          data: {
            userId,
            topicId: sanitizedTopicId,
            level: level || "basic",
            score: parsedScore,
            xpEarned: cappedXp,
          },
          select: {
            id: true,
            userId: true,
            topicId: true,
            level: true,
            score: true,
            xpEarned: true,
            createdAt: true,
          },
        });
      }

      // 2. Increment profile XP and minutes studied with selective projection
      const profile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: cappedXp },
          minutesStudied: { increment: 3 },
        },
        select: {
          id: true,
          totalXp: true,
          minutesStudied: true,
        },
      });

      // 3. Upsert DailySkillPractice for 7-day analytics (grammar maps to writing skill)
      const todayDate = new Date().toISOString().split("T")[0];
      await tx.dailySkillPractice.upsert({
        where: {
          userId_skill_date: {
            userId,
            skill: "writing",
            date: todayDate,
          },
        },
        update: {
          minutes: { increment: 3 },
          xpEarned: { increment: cappedXp },
        },
        create: {
          userId,
          skill: "writing",
          date: todayDate,
          minutes: 3,
          xpEarned: cappedXp,
        },
      });

      return { progressRecord, profile };
    });

    // Invalidate dashboard & analytics cache atomically
    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      guest: false,
      progress: result.progressRecord,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("POST /api/ai/grammar/progress error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        data: {
          progressList: [],
          completedTopicIds: [],
          stats: {
            completed: 0,
            total: 60,
            accuracy: 0,
          },
        },
      });
    }

    // Leverage index @@index([userId]) with selective projection (Rule 3)
    const records = await prisma.grammarProgress.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        topicId: true,
        level: true,
        score: true,
        xpEarned: true,
        createdAt: true,
      },
    });

    // Unique topics with best score
    const topicMap = new Map<string, typeof records[0]>();
    records.forEach((r) => {
      const existing = topicMap.get(r.topicId);
      if (!existing || r.score > existing.score) {
        topicMap.set(r.topicId, r);
      }
    });

    const uniqueRecords = Array.from(topicMap.values());
    const completedTopicIds = uniqueRecords
      .filter((r) => r.score >= 60)
      .map((r) => r.topicId);

    const totalScore = uniqueRecords.reduce((acc, r) => acc + r.score, 0);
    const accuracy = uniqueRecords.length > 0 ? Math.round(totalScore / uniqueRecords.length) : 0;

    return NextResponse.json({
      success: true,
      guest: false,
      data: {
        progressList: uniqueRecords,
        completedTopicIds,
        stats: {
          completed: completedTopicIds.length,
          total: 60,
          accuracy,
        },
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("GET /api/ai/grammar/progress error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
