import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { getLocalDateString, getShiftedAppDateString } from "@/shared/utils/dateUtils";

function safeEqualSecret(candidate: string | null, expected: string): boolean {
  if (!candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function verifyCronAuth(request: Request): boolean {
  const expectedSecret = process.env.CRON_SECRET?.trim();
  if (!expectedSecret) {
    // Fail closed in production; allow local/test runs without CRON_SECRET only in non-production
    return process.env.NODE_ENV !== "production";
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7).trim() : null;
  const customHeader = request.headers.get("x-cron-secret")?.trim() ?? null;

  return safeEqualSecret(bearerToken, expectedSecret) || safeEqualSecret(customHeader, expectedSecret);
}

export async function GET(request: Request) {
  return POST(request);
}

export async function POST(request: Request) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing CRON_SECRET" },
      { status: 401 }
    );
  }

  try {
    const startTime = Date.now();
    const oneDayAgo = new Date(Date.now() - 36 * 60 * 60 * 1000); // 36 hours threshold

    // 1. Maintain Streak Protection Logic
    const result = await safeDbExecute(async () => {
      const now = new Date();
      const todayStr = getLocalDateString(now);
      const yesterdayStr = getShiftedAppDateString(-1, now);

      // Find candidates with active streak
      const candidates = await prisma.profile.findMany({
        where: {
          currentStreak: { gt: 0 },
        },
        select: {
          id: true,
          currentStreak: true,
          streakFreezes: true,
          updatedAt: true,
          dailySkillPractices: {
            where: {
              date: { in: [todayStr, yesterdayStr] },
            },
            select: { id: true },
            take: 1,
          },
        },
      });

      // User is inactive if no practice recorded in current/yesterday window AND updatedAt is older than threshold
      const inactiveProfiles = candidates.filter(
        (p) => p.dailySkillPractices.length === 0 && p.updatedAt < oneDayAgo
      );

      let frozenCount = 0;
      let resetCount = 0;

      for (const p of inactiveProfiles) {
        if (p.streakFreezes > 0) {
          // Use 1 Streak Freeze to protect streak
          await prisma.profile.update({
            where: { id: p.id },
            data: {
              streakFreezes: { decrement: 1 },
              updatedAt: new Date(),
            },
          });
          frozenCount++;
        } else {
          // Reset streak to 0
          await prisma.profile.update({
            where: { id: p.id },
            data: {
              currentStreak: 0,
            },
          });
          resetCount++;
        }
      }

      return {
        totalEvaluated: inactiveProfiles.length,
        streaksPreservedWithFreeze: frozenCount,
        streaksResetToZero: resetCount,
      };
    }, "Daily Streak Maintenance Cron");

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      durationMs,
      maintenance: result || {
        totalEvaluated: 0,
        streaksPreservedWithFreeze: 0,
        streaksResetToZero: 0,
      },
      message: "Bảo trì định kỳ hằng ngày thành công.",
    });
  } catch (error: any) {
    console.error("Daily Maintenance Cron Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during cron maintenance" },
      { status: 500 }
    );
  }
}
