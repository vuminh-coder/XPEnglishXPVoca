import { NextRequest, NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { formatCleanName } from "@/shared/utils/formatName";

export const dynamic = "force-dynamic";

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "week"; // "week" | "month" | "all"
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 50 : limitParam, 1), 100);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const page = Math.max(isNaN(pageParam) ? 1 : pageParam, 1);
    const skip = (page - 1) * limit;

    const today = new Date();
    const daysOffset = period === "month" ? 30 : 7;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysOffset);
    const startDateStr = getLocalDateString(startDate);
    const todayStr = getLocalDateString(today);

    const formattedLeaders = await safeDbExecute(async () => {
      if (period === "week" || period === "month") {
        // 1. Query periodic skill practice aggregations
        const practiceAggregations = await prisma.dailySkillPractice.groupBy({
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
        });

        const periodicMap = new Map<string, { periodicXp: number; periodicMinutes: number }>();
        practiceAggregations.forEach((p) => {
          if (p.userId) {
            periodicMap.set(p.userId, {
              periodicXp: p._sum.xpEarned || 0,
              periodicMinutes: p._sum.minutes || 0,
            });
          }
        });

        // 2. Fetch active profiles
        const profiles = await prisma.profile.findMany({
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
        });

        // 3. Compute combined scores (prioritizing periodic score, fallback to total proportion)
        const combined = profiles.map((p) => {
          const periodic = periodicMap.get(p.id);
          const periodicXp = periodic ? periodic.periodicXp : Math.round((p.totalXp || 0) * (period === "week" ? 0.35 : 0.7));
          const periodicMinutes = periodic ? periodic.periodicMinutes : Math.round((p.minutesStudied || 0) * (period === "week" ? 0.35 : 0.7));

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

    return NextResponse.json(
      {
        success: true,
        data: formattedLeaders || [],
        meta: {
          period,
          page,
          limit,
          totalReturned: formattedLeaders?.length || 0,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
