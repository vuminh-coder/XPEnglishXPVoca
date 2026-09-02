import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

export const dynamic = "force-dynamic";

function getLocalDateStr(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface AiSessionPayload {
  sessionId?: string;
  mode: "tutor" | "conversation";
  topicId?: string;
  personaId?: string;
  messages: Array<{
    id: string;
    role: "ai" | "user";
    text: string;
    vietnameseTranslation?: string;
    grammarCorrection?: any;
    betterPhrasing?: string;
    pronunciationScore?: number;
    pronunciationFeedback?: any;
    suggestedWords?: any;
    suggestedPhrases?: any;
    timestamp?: number;
  }>;
  overallScore?: number;
  grade?: string; // "S" | "A" | "B" | "C"
  evaluationMetrics?: any;
  timeSpentSeconds: number;
  xpEarned: number;
  status: "COMPLETED" | "IN_PROGRESS";
  createdAt?: string;
}

// In-memory fallback cache per user when offline/local
const sessionMemoryStore: Record<string, AiSessionPayload[]> = {};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "all";
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "guest_ai_user";

    const userSessions = sessionMemoryStore[userId] || [];
    const filtered = mode === "all"
      ? userSessions
      : userSessions.filter((s) => s.mode === mode);

    // Return newest sessions first
    const sorted = [...filtered].sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      sessions: sorted.slice(0, 30),
    });
  } catch (error: any) {
    console.error("[AiSessions] Error in GET:", error);
    return NextResponse.json({ success: true, sessions: [] });
  }
}

export async function POST(request: Request) {
  try {
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "guest_ai_user";
    const body: AiSessionPayload = await request.json();

    const {
      sessionId = `ai_sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      mode = "tutor",
      topicId,
      personaId,
      messages = [],
      overallScore = 0,
      grade = "C",
      evaluationMetrics = {},
      timeSpentSeconds = 0,
      xpEarned = 0,
      status = "COMPLETED",
    } = body;

    const sessionRecord: AiSessionPayload = {
      sessionId,
      mode,
      topicId,
      personaId,
      messages,
      overallScore,
      grade,
      evaluationMetrics,
      timeSpentSeconds: Math.max(0, Number(timeSpentSeconds) || 0),
      xpEarned: Math.max(0, Number(xpEarned) || 0),
      status,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    // 1. Save to in-memory session cache for instant retrieval
    if (!sessionMemoryStore[userId]) {
      sessionMemoryStore[userId] = [];
    }

    const existingIdx = sessionMemoryStore[userId].findIndex((s) => s.sessionId === sessionId);
    if (existingIdx >= 0) {
      sessionMemoryStore[userId][existingIdx] = sessionRecord;
    } else {
      sessionMemoryStore[userId].unshift(sessionRecord);
    }

    // Keep top 50 sessions per user
    if (sessionMemoryStore[userId].length > 50) {
      sessionMemoryStore[userId] = sessionMemoryStore[userId].slice(0, 50);
    }

    // 2. If session is COMPLETED and user is authenticated, sync to PostgreSQL Neon database
    if (status === "COMPLETED" && authUserId && authUserId !== "guest_ai_user") {
      try {
        const skillKey = mode === "tutor" ? "speaking" : "writing";
        const todayDate = getLocalDateStr();
        const minutes = Math.max(1, Math.ceil(timeSpentSeconds / 60));

        await prisma.$transaction(async (tx) => {
          // Upsert daily_skill_practice
          if ((tx as any).dailySkillPractice) {
            await (tx as any).dailySkillPractice.upsert({
              where: {
                userId_skill_date: {
                  userId: authUserId,
                  skill: skillKey,
                  date: todayDate,
                },
              },
              create: {
                userId: authUserId,
                skill: skillKey,
                date: todayDate,
                minutes,
                xpEarned,
              },
              update: {
                minutes: { increment: minutes },
                xpEarned: { increment: xpEarned },
              },
            });
          }

          // Increment Profile metrics
          await tx.profile.update({
            where: { id: authUserId },
            data: {
              minutesStudied: { increment: minutes },
              totalXp: { increment: xpEarned },
            },
          });
        });
      } catch (dbErr: any) {
        console.warn("[AiSessions] Database persistence notice:", dbErr?.message || dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId,
      savedAt: sessionRecord.createdAt,
      status: sessionRecord.status,
    });
  } catch (error: any) {
    console.error("[AiSessions] Error in POST:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Lỗi lưu phiên học" },
      { status: 500 }
    );
  }
}
