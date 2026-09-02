import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";

function verifyCronAuth(request: Request): boolean {
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret) {
    // If no CRON_SECRET is configured in env, allow in dev/local mode
    return process.env.NODE_ENV !== "production";
  }

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const customHeader = request.headers.get("x-cron-secret");
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");

  return (
    bearerToken === expectedSecret ||
    customHeader === expectedSecret ||
    querySecret === expectedSecret
  );
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
      // Find inactive users with an active streak
      const inactiveProfiles = await prisma.profile.findMany({
        where: {
          currentStreak: { gt: 0 },
          updatedAt: { lt: oneDayAgo },
        },
        select: {
          id: true,
          currentStreak: true,
          streakFreezes: true,
        },
      });

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

export async function GET(request: Request) {
  return POST(request);
}
