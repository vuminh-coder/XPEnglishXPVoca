import { NextRequest, NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { formatCleanName } from "@/shared/utils/formatName";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: groupId } = await params;
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "week"; // "week" | "month"
    const criterion = searchParams.get("criterion") === "time" ? "time" : "xp"; // "xp" | "time"

    const cacheKey = `group_stats:${groupId}:${period}:${criterion}`;
    const cachedResponse = memoryCache.get<any>(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
          "X-Cache": "HIT",
        },
      });
    }

    const today = new Date();
    // 7-day rolling window (-4 to +2) matching Dashboard & Analytics
    const rollingDates: string[] = [];
    for (let offset = -4; offset <= 2; offset++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      rollingDates.push(getLocalDateString(d));
    }

    const groupStats = await safeDbExecute(async () => {
      // 1. Single Root Query for Group and Member Profiles
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        select: {
          id: true,
          name: true,
          description: true,
          themeName: true,
          accent: true,
          maxMembers: true,
          createdById: true,
          createdAt: true,
          members: {
            select: {
              userId: true,
              role: true,
              joinedAt: true,
              user: {
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
              },
            },
          },
        },
      });

      if (!group) return null;

      const memberUserIds = group.members.map((m) => m.userId).filter(Boolean);

      // 2. Bounded Query: Practice records for group members within rolling window
      const practiceRecords = memberUserIds.length > 0
        ? await prisma.dailySkillPractice.findMany({
            where: {
              userId: { in: memberUserIds },
              date: { in: rollingDates },
            },
            select: {
              userId: true,
              date: true,
              minutes: true,
              xpEarned: true,
            },
          })
        : [];

      // 3. Compute Group Daily Minutes & Member Totals in-memory (0ms)
      const groupDailyMinutes: Record<string, number> = {};
      const groupDailyXp: Record<string, number> = {};
      rollingDates.forEach((dt) => {
        groupDailyMinutes[dt] = 0;
        groupDailyXp[dt] = 0;
      });

      const memberPracticeMinutes: Record<string, number> = {};
      const memberPracticeXp: Record<string, number> = {};

      practiceRecords.forEach((rec) => {
        const dt = rec.date;
        const mins = rec.minutes || 0;
        const xp = rec.xpEarned || 0;

        if (dt in groupDailyMinutes) {
          groupDailyMinutes[dt] += mins;
          groupDailyXp[dt] += xp;
        }

        memberPracticeMinutes[rec.userId] = (memberPracticeMinutes[rec.userId] || 0) + mins;
        memberPracticeXp[rec.userId] = (memberPracticeXp[rec.userId] || 0) + xp;
      });

      const chartMinutesSeries = rollingDates.map((dt) => groupDailyMinutes[dt] || 0);
      const totalGroupMinutes = chartMinutesSeries.reduce((acc, curr) => acc + curr, 0);
      const bestDayMinutes = Math.max(...chartMinutesSeries, 0);
      const averageDayMinutes = Math.round(totalGroupMinutes / rollingDates.length);

      // 4. Rank Group Members (Group Leaderboard)
      const memberList = group.members.map((m) => {
        const u = m.user;
        const rawName = u?.fullName || u?.username || "Thành viên";
        const cleanName = formatCleanName(rawName);
        const weeklyMins = memberPracticeMinutes[m.userId] || 0;
        const weeklyXp = memberPracticeXp[m.userId] || 0;

        return {
          id: m.userId,
          role: m.role,
          joinedAt: m.joinedAt,
          fullName: cleanName,
          username: u?.username || "user",
          level: u?.level || 1,
          title: u?.title || "Học viên",
          totalXp: u?.totalXp || 0,
          minutesStudied: u?.minutesStudied || 0,
          weeklyMinutes: weeklyMins,
          weeklyXp: weeklyXp,
          avatarEmoji: u?.avatarEmoji || undefined,
          avatarUrl: u?.avatarUrl || undefined,
          score: criterion === "time" ? (weeklyMins > 0 ? weeklyMins : (u?.minutesStudied || 0)) : (weeklyXp > 0 ? weeklyXp : (u?.totalXp || 0)),
        };
      });

      // Sort by criterion
      memberList.sort((a, b) => {
        if (criterion === "time") {
          return b.weeklyMinutes - a.weeklyMinutes || b.minutesStudied - a.minutesStudied || b.totalXp - a.totalXp;
        }
        return b.weeklyXp - a.weeklyXp || b.totalXp - a.totalXp || b.minutesStudied - a.minutesStudied;
      });

      const rankedMembers = memberList.map((m, idx) => ({
        ...m,
        rank: idx + 1,
      }));

      return {
        group: {
          id: group.id,
          name: group.name,
          description: group.description,
          themeName: group.themeName,
          accent: group.accent,
          memberCount: group.members.length,
          maxMembers: group.maxMembers,
          createdById: group.createdById,
          createdAt: group.createdAt,
        },
        chart: {
          dates: rollingDates,
          minutesSeries: chartMinutesSeries,
          totalMinutes: totalGroupMinutes,
          bestDayMinutes,
          averageMinutes: averageDayMinutes,
        },
        leaderboard: rankedMembers,
      };
    }, "Group Stats Query");

    if (!groupStats) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const responsePayload = {
      success: true,
      data: groupStats,
      meta: {
        groupId,
        period,
        criterion,
      },
    };

    memoryCache.set(cacheKey, responsePayload, 30);

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    console.error("GET /api/groups/[id]/stats error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
