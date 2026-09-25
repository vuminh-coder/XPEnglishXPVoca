import { NextRequest, NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { formatCleanName } from "@/shared/utils/formatName";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { getLocalDateString } from "@/shared/utils/dateUtils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "week"; // "week" | "month" | "all"
    const criterion = searchParams.get("criterion") === "time" ? "time" : "xp"; // "xp" | "time"
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 50 : limitParam, 1), 100);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const page = Math.max(isNaN(pageParam) ? 1 : pageParam, 1);
    const skip = (page - 1) * limit;

    // 0. Check in-memory TTL cache (60s) to return in < 2ms
    const cacheKey = `leaderboard:${period}:${criterion}:${page}:${limit}`;
    const cachedResponse = memoryCache.get<any>(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "HIT",
        },
      });
    }

    const today = new Date();
    const daysOffset = period === "month" ? 30 : 7;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysOffset);
    const startDateStr = getLocalDateString(startDate);
    const todayStr = getLocalDateString(today);

    const formattedLeaders = await safeDbExecute(async () => {
      if (period === "week" || period === "month") {
        // Query top periodic learners directly using SQL aggregation with LIMIT and OFFSET
        // Level 1 Query optimization: computes SUM in PostgreSQL engine and only transfers the needed page
        let periodicRows: { user_id: string; periodic_xp: number; periodic_minutes: number }[] = [];
        try {
          if (criterion === "time") {
            periodicRows = await prisma.$queryRaw<
              { user_id: string; periodic_xp: number; periodic_minutes: number }[]
            >`
              SELECT
                user_id,
                COALESCE(SUM(xp_earned), 0)::int as periodic_xp,
                COALESCE(SUM(minutes), 0)::int as periodic_minutes
              FROM daily_skill_practice
              WHERE date >= ${startDateStr} AND date <= ${todayStr}
              GROUP BY user_id
              ORDER BY periodic_minutes DESC, periodic_xp DESC, user_id ASC
              LIMIT ${limit} OFFSET ${skip};
            `;
          } else {
            periodicRows = await prisma.$queryRaw<
              { user_id: string; periodic_xp: number; periodic_minutes: number }[]
            >`
              SELECT
                user_id,
                COALESCE(SUM(xp_earned), 0)::int as periodic_xp,
                COALESCE(SUM(minutes), 0)::int as periodic_minutes
              FROM daily_skill_practice
              WHERE date >= ${startDateStr} AND date <= ${todayStr}
              GROUP BY user_id
              ORDER BY periodic_xp DESC, periodic_minutes DESC, user_id ASC
              LIMIT ${limit} OFFSET ${skip};
            `;
          }
        } catch (rawErr) {
          console.warn("[leaderboard] Raw query fallback:", rawErr);
        }

        const topUserIds = periodicRows.map((r) => r.user_id);
        const profiles = topUserIds.length > 0
          ? await prisma.profile.findMany({
              where: { id: { in: topUserIds } },
              select: {
                id: true,
                fullName: true,
                username: true,
                level: true,
                title: true,
                totalXp: true,
                avatarEmoji: true,
                avatarUrl: true,
                minutesStudied: true,
              },
            })
          : [];

        const profileMap = new Map(profiles.map((p) => [p.id, p]));

        const leaders = periodicRows.map((r, idx) => {
          const p = profileMap.get(r.user_id);
          const rawName = p?.fullName || p?.username || "Học viên XP";
          const cleanName = formatCleanName(rawName);
          const dbAvatar = p?.avatarUrl || undefined;

          return {
            id: r.user_id,
            rank: skip + idx + 1,
            fullName: cleanName,
            username: p?.username || "user",
            level: p?.level || 1,
            title: p?.title || "Học viên",
            xp: r.periodic_xp,
            totalXp: p?.totalXp || 0,
            minutesStudied: r.periodic_minutes,
            avatarEmoji: p?.avatarEmoji || undefined,
            avatar: dbAvatar,
            imageUrl: dbAvatar,
            avatarUrl: dbAvatar,
          };
        });

        // Fallback for empty active practice records
        if (leaders.length === 0 && page === 1) {
          const fallbackLeaders = await prisma.profile.findMany({
            select: {
              id: true,
              fullName: true,
              username: true,
              level: true,
              title: true,
              totalXp: true,
              avatarEmoji: true,
              avatarUrl: true,
              minutesStudied: true,
            },
            orderBy: criterion === "time"
              ? [{ minutesStudied: "desc" }, { totalXp: "desc" }, { id: "asc" }]
              : [{ totalXp: "desc" }, { minutesStudied: "desc" }, { id: "asc" }],
            take: limit,
          });

          return fallbackLeaders.map((l, index) => {
            const rawName = l.fullName || l.username || "Học viên XP";
            const cleanName = formatCleanName(rawName);
            const dbAvatar = l.avatarUrl || undefined;

            return {
              id: l.id,
              rank: skip + index + 1,
              fullName: cleanName,
              username: l.username || "user",
              level: l.level || 1,
              title: l.title || "Học viên",
              xp: l.totalXp || 0,
              totalXp: l.totalXp || 0,
              minutesStudied: l.minutesStudied || 0,
              avatarEmoji: l.avatarEmoji || undefined,
              avatar: dbAvatar,
              imageUrl: dbAvatar,
              avatarUrl: dbAvatar,
            };
          });
        }

        return leaders;
      }

      // Default All-time Leaderboard query
      const leaders = await prisma.profile.findMany({
        select: {
          id: true,
          fullName: true,
          username: true,
          level: true,
          title: true,
          totalXp: true,
          avatarEmoji: true,
          avatarUrl: true,
          minutesStudied: true,
        },
        orderBy: criterion === "time"
          ? [{ minutesStudied: "desc" }, { totalXp: "desc" }, { id: "asc" }]
          : [{ totalXp: "desc" }, { minutesStudied: "desc" }, { id: "asc" }],
        take: limit,
        skip: skip,
      });

      return leaders.map((l, index) => {
        const rawName = l.fullName || l.username || "Học viên XP";
        const cleanName = formatCleanName(rawName);
        const dbAvatar = l.avatarUrl || undefined;

        return {
          id: l.id,
          rank: skip + index + 1,
          fullName: cleanName,
          username: l.username || "user",
          level: l.level || 1,
          title: l.title || "Học viên",
          xp: l.totalXp || 0,
          totalXp: l.totalXp || 0,
          minutesStudied: l.minutesStudied || 0,
          avatarEmoji: l.avatarEmoji || undefined,
          avatar: dbAvatar,
          imageUrl: dbAvatar,
          avatarUrl: dbAvatar,
        };
      });
    }, "Leaderboard Query");

    const responsePayload = {
      success: true,
      data: formattedLeaders || [],
      meta: {
        period,
        criterion,
        page,
        limit,
        totalReturned: formattedLeaders?.length || 0,
      },
    };

    if (formattedLeaders && formattedLeaders.length > 0) {
      memoryCache.set(cacheKey, responsePayload, 60);
    }

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
