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
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 50 : limitParam, 1), 100);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const page = Math.max(isNaN(pageParam) ? 1 : pageParam, 1);
    const skip = (page - 1) * limit;

    // 0. Check in-memory TTL cache (60s) to return in < 2ms
    const cacheKey = `leaderboard:${period}:${page}:${limit}`;
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
        // 1. Parallelize periodic aggregations & profile queries
        const [practiceAggregations, profiles] = await Promise.all([
          prisma.dailySkillPractice.groupBy({
            by: ["userId"],
            where: {
              date: {
                gte: startDateStr,
                lte: todayStr,
              },
            },
            _sum: {
              xpEarned: true,
              minutes: true,
            },
          }),
          prisma.profile.findMany({
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
            take: 100,
          }),
        ]);

        const periodicMap = new Map<string, { periodicXp: number; periodicMinutes: number }>();
        practiceAggregations.forEach((p) => {
          if (p.userId) {
            periodicMap.set(p.userId, {
              periodicXp: p._sum.xpEarned || 0,
              periodicMinutes: p._sum.minutes || 0,
            });
          }
        });

        // 3. Compute combined scores (prioritizing periodic score, fallback to total proportion)
        const combined = profiles.map((p) => {
          const periodic = periodicMap.get(p.id);
          const periodicXp = periodic ? periodic.periodicXp : 0;
          const periodicMinutes = periodic ? periodic.periodicMinutes : 0;

          return {
            id: p.id,
            fullName: formatCleanName(p.fullName || p.username || "Học viên XP"),
            username: p.username || "user",
            level: p.level || 1,
            title: p.title || "Học viên",
            xp: periodicXp,
            totalXp: p.totalXp || 0,
            minutesStudied: periodicMinutes,
            avatarEmoji: p.avatarEmoji || undefined,
            avatar: p.avatarUrl || undefined,
            imageUrl: p.avatarUrl || undefined,
            avatarUrl: p.avatarUrl || undefined,
          };
        });

        // Multi-level sort by periodic score
        combined.sort((a, b) => b.xp - a.xp || b.minutesStudied - a.minutesStudied || a.id.localeCompare(b.id));

        return combined.slice(skip, skip + limit).map((item, idx) => ({
          ...item,
          rank: skip + idx + 1,
        }));
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
        orderBy: [
          { totalXp: "desc" },
          { minutesStudied: "desc" },
          { id: "asc" },
        ],
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
