import { NextResponse } from "next/server";
import { prisma, safeDbExecute, withPrismaRetry } from "@/infrastructure/database/prisma";
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
  status: "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";
  createdAt?: string;
  updatedAt?: string;
}

// In-memory fallback cache per user when offline/local
const sessionMemoryStore: Record<string, AiSessionPayload[]> = {};

let isTableInitialized = false;

/**
 * Ensures ai_practice_sessions table exists in Neon PostgreSQL without relying on prisma generate
 */
async function ensureAiSessionsTable() {
  if (isTableInitialized) return;
  try {
    const result = await safeDbExecute(async () => {
      // 1. Create table statement (single command)
      await (prisma as any).$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS ai_practice_sessions (
          id VARCHAR(100) PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          mode VARCHAR(50) NOT NULL,
          topic_id VARCHAR(100),
          persona_id VARCHAR(100),
          messages JSONB NOT NULL DEFAULT '[]'::jsonb,
          overall_score REAL,
          grade VARCHAR(10),
          evaluation_metrics JSONB,
          time_spent_seconds INT NOT NULL DEFAULT 0,
          xp_earned INT NOT NULL DEFAULT 0,
          status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      // 2. Create indexes individually
      await (prisma as any).$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS idx_ai_sessions_user_mode_status ON ai_practice_sessions(user_id, mode, status)
      `).catch(() => {});

      await (prisma as any).$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS idx_ai_sessions_user_updated ON ai_practice_sessions(user_id, updated_at DESC)
      `).catch(() => {});

      return true; // Signal success
    }, "Create ai_practice_sessions table");

    // BUG #6 FIX: Only mark initialized if safeDbExecute actually succeeded (not null)
    if (result !== null) {
      isTableInitialized = true;
    }
  } catch (e) {
    console.warn("[AiSessions] DB table init notice:", e);
  }
}

export async function GET(request: Request) {
  try {
    await ensureAiSessionsTable();

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "all";
    const statusQuery = searchParams.get("status") || "all";
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "guest_ai_user";

    // 1. If looking for active session (IN_PROGRESS) to hydrate on page reload
    if (statusQuery === "active" || statusQuery === "IN_PROGRESS") {
      let activeSession: AiSessionPayload | null = null;

      // Try database lookup first (BUG #10 FIX: wrap in withPrismaRetry for auto-reconnect)
      try {
        const rows: any[] = await withPrismaRetry(() =>
          (prisma as any).$queryRawUnsafe(
            `SELECT id, user_id, mode, topic_id, persona_id, messages, overall_score, 
                    grade, evaluation_metrics, time_spent_seconds, xp_earned, status, 
                    created_at, updated_at 
             FROM ai_practice_sessions 
             WHERE user_id = $1 AND mode = $2 AND status = 'IN_PROGRESS' 
             ORDER BY updated_at DESC LIMIT 1`,
            userId,
            mode
          )
        );

        if (rows && rows.length > 0) {
          const r = rows[0];
          activeSession = {
            sessionId: r.id,
            mode: r.mode,
            topicId: r.topic_id,
            personaId: r.persona_id,
            messages: typeof r.messages === "string" ? JSON.parse(r.messages) : r.messages || [],
            overallScore: r.overall_score,
            grade: r.grade,
            evaluationMetrics: typeof r.evaluation_metrics === "string" ? JSON.parse(r.evaluation_metrics) : r.evaluation_metrics,
            timeSpentSeconds: r.time_spent_seconds || 0,
            xpEarned: r.xp_earned || 0,
            status: r.status,
            createdAt: r.created_at ? new Date(r.created_at).toISOString() : undefined,
            updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        }
      } catch (dbErr) {
        console.warn("[AiSessions] DB read active session fallback:", dbErr);
      }

      // Memory fallback if DB returned null
      if (!activeSession && sessionMemoryStore[userId]) {
        const memActive = sessionMemoryStore[userId].find(
          (s) => s.mode === mode && s.status === "IN_PROGRESS"
        );
        if (memActive) activeSession = memActive;
      }

      return NextResponse.json({
        success: true,
        activeSession: activeSession || null,
      });
    }

    // 2. Query Completed Sessions for History Drawer
    let historySessions: AiSessionPayload[] = [];
    try {
      let querySql = `
        SELECT id, user_id, mode, topic_id, persona_id, messages, overall_score, 
               grade, evaluation_metrics, time_spent_seconds, xp_earned, status, 
               created_at, updated_at 
        FROM ai_practice_sessions 
        WHERE user_id = $1 AND status = 'COMPLETED'
      `;
      const queryParams: any[] = [userId];

      if (mode !== "all") {
        querySql += ` AND mode = $2`;
        queryParams.push(mode);
      }
      querySql += ` ORDER BY updated_at DESC LIMIT 30`;

      const rows: any[] = await withPrismaRetry(() => (prisma as any).$queryRawUnsafe(querySql, ...queryParams));
      if (rows && rows.length > 0) {
        historySessions = rows.map((r) => ({
          sessionId: r.id,
          mode: r.mode,
          topicId: r.topic_id,
          personaId: r.persona_id,
          messages: typeof r.messages === "string" ? JSON.parse(r.messages) : r.messages || [],
          overallScore: r.overall_score,
          grade: r.grade,
          evaluationMetrics: typeof r.evaluation_metrics === "string" ? JSON.parse(r.evaluation_metrics) : r.evaluation_metrics,
          timeSpentSeconds: r.time_spent_seconds || 0,
          xpEarned: r.xp_earned || 0,
          status: r.status,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : undefined,
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
        }));
      }
    } catch (dbErr) {
      console.warn("[AiSessions] DB history read fallback:", dbErr);
    }

    // Combine with memory fallback if DB history is empty
    if (historySessions.length === 0 && sessionMemoryStore[userId]) {
      historySessions = sessionMemoryStore[userId]
        .filter((s) => (mode === "all" || s.mode === mode) && s.status === "COMPLETED")
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return NextResponse.json({
      success: true,
      sessions: historySessions,
    });
  } catch (error: any) {
    console.error("[AiSessions] Error in GET:", error);
    return NextResponse.json({ success: true, sessions: [], activeSession: null });
  }
}

export async function POST(request: Request) {
  try {
    await ensureAiSessionsTable();

    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "guest_ai_user";
    const body: AiSessionPayload = await request.json();

    const {
      sessionId = `ai_${body.mode || "tutor"}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      mode = "tutor",
      topicId,
      personaId,
      messages = [],
      overallScore = 0,
      grade = "C",
      evaluationMetrics = {},
      timeSpentSeconds = 0,
      xpEarned = 0,
      status = "IN_PROGRESS",
    } = body;

    const nowIso = new Date().toISOString();

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
      createdAt: body.createdAt || nowIso,
      updatedAt: nowIso,
    };

    // 1. Save to in-memory fallback store
    if (!sessionMemoryStore[userId]) {
      sessionMemoryStore[userId] = [];
    }
    const existingIdx = sessionMemoryStore[userId].findIndex((s) => s.sessionId === sessionId);
    if (existingIdx >= 0) {
      sessionMemoryStore[userId][existingIdx] = sessionRecord;
    } else {
      sessionMemoryStore[userId].unshift(sessionRecord);
      // BUG #7 FIX: Cap memory store to 50 entries per user to prevent memory leak
      if (sessionMemoryStore[userId].length > 50) {
        sessionMemoryStore[userId] = sessionMemoryStore[userId].slice(0, 50);
      }
    }

    // 2. Real-time PostgreSQL Neon Upsert
    try {
      const messagesJson = JSON.stringify(messages);
      const metricsJson = JSON.stringify(evaluationMetrics || {});

      // BUG #10 FIX: Wrap raw upsert in withPrismaRetry for auto-reconnect when Neon sleeps
      await withPrismaRetry(() =>
        (prisma as any).$executeRawUnsafe(
          `INSERT INTO ai_practice_sessions (
             id, user_id, mode, topic_id, persona_id, messages, 
             overall_score, grade, evaluation_metrics, time_spent_seconds, 
             xp_earned, status, updated_at
           ) VALUES (
             $1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9::jsonb, $10, $11, $12, NOW()
           )
           ON CONFLICT (id) DO UPDATE SET
             messages = EXCLUDED.messages,
             time_spent_seconds = EXCLUDED.time_spent_seconds,
             status = EXCLUDED.status,
             overall_score = EXCLUDED.overall_score,
             grade = EXCLUDED.grade,
             evaluation_metrics = EXCLUDED.evaluation_metrics,
             xp_earned = EXCLUDED.xp_earned,
             updated_at = NOW()`,
          sessionId,
          userId,
          mode,
          topicId || null,
          personaId || null,
          messagesJson,
          overallScore,
          grade,
          metricsJson,
          Math.max(0, Number(timeSpentSeconds) || 0),
          Math.max(0, Number(xpEarned) || 0),
          status
        )
      );
    } catch (dbErr: any) {
      console.warn("[AiSessions] Database upsert notice:", dbErr?.message || dbErr);
    }

    // 3. If session is COMPLETED and user is authenticated, sync to DailySkillPractice & Profile
    if (status === "COMPLETED" && authUserId && authUserId !== "guest_ai_user") {
      try {
        const skillKey = mode === "tutor" ? "speaking" : "writing";
        const todayDate = getLocalDateStr();
        const minutes = Math.max(1, Math.ceil(timeSpentSeconds / 60));

        await prisma.$transaction(async (tx) => {
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

          await tx.profile.update({
            where: { id: authUserId },
            data: {
              minutesStudied: { increment: minutes },
              totalXp: { increment: xpEarned },
            },
          });
        });
      } catch (syncErr: any) {
        console.warn("[AiSessions] SkillPractice & Profile sync notice:", syncErr?.message || syncErr);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId,
      savedAt: sessionRecord.updatedAt,
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

export async function DELETE(request: Request) {
  try {
    await ensureAiSessionsTable();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const authUserId = await getAuthenticatedUserId(request);
    const userId = authUserId || "guest_ai_user";

    if (sessionId) {
      try {
        await withPrismaRetry(() =>
          (prisma as any).$executeRawUnsafe(
            `UPDATE ai_practice_sessions SET status = 'ARCHIVED', updated_at = NOW() WHERE id = $1 AND user_id = $2`,
            sessionId,
            userId
          )
        );
      } catch (dbErr) {
        console.warn("[AiSessions] DB archive error:", dbErr);
      }

      if (sessionMemoryStore[userId]) {
        const memIdx = sessionMemoryStore[userId].findIndex((s) => s.sessionId === sessionId);
        if (memIdx >= 0) {
          sessionMemoryStore[userId][memIdx].status = "ARCHIVED";
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
