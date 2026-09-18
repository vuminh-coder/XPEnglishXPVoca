import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = performance.now();

  try {
    const result = await safeDbExecute(async () => {
      return await prisma.$queryRaw`SELECT 1 as alive`;
    }, "Database Heartbeat Ping");

    const latencyMs = Math.round(performance.now() - startTime);

    return NextResponse.json(
      {
        status: "ok",
        healthy: Boolean(result),
        latencyMs,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "degraded",
        healthy: false,
        error: error?.message || "DB ping failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
  });
}
