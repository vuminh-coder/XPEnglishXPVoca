import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/infrastructure/auth/auth";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { getLocalDateString } from "@/shared/utils/dateUtils";
import { MOCK_THEMES } from "@/features/vocabulary/data/mockThemes";

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

/**
 * GET /api/admin/overview
 * Server-authoritative platform telemetry, pending VIP orders, and DB vocabulary list.
 * Strictly guarded by requireAdminUser (JWT + live PostgreSQL Profile.role === "ADMIN").
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdminUser(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const today = new Date();
    const last7Dates: { dateStr: string; dayLabel: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      last7Dates.push({
        dateStr: getLocalDateString(d),
        dayLabel: DAY_LABELS[d.getDay()],
      });
    }

    const [
      totalUsers,
      totalVocabDb,
      totalExamAttempts,
      xpAggregate,
      practiceLogs,
      pendingOrders,
      dbVocabGroups,
      recentVocabs,
    ] = await Promise.all([
      prisma.profile.count(),
      prisma.vocabulary.count(),
      prisma.examAttempt.count(),
      prisma.profile.aggregate({ _sum: { totalXp: true } }),
      prisma.dailySkillPractice.findMany({
        where: { date: { in: last7Dates.map((d) => d.dateStr) } },
        select: { date: true, userId: true },
      }),
      prisma.subscriptionOrder.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
        take: 25,
        select: {
          id: true,
          userId: true,
          planKey: true,
          amount: true,
          currency: true,
          transferSyntax: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              fullName: true,
              email: true,
            },
          },
        },
      }),
      prisma.vocabulary.groupBy({
        by: ["themeId"],
        _count: { _all: true },
      }),
      prisma.vocabulary.findMany({
        orderBy: { frequency: "desc" },
        take: 50,
        select: {
          id: true,
          word: true,
          phonetic: true,
          definition: true,
          definitionVn: true,
          pos: true,
          difficulty: true,
          frequency: true,
          themeId: true,
          examples: true,
        },
      }),
    ]);

    const dauByDate = new Map<string, Set<string>>();
    for (const log of practiceLogs) {
      if (!dauByDate.has(log.date)) {
        dauByDate.set(log.date, new Set<string>());
      }
      dauByDate.get(log.date)!.add(log.userId);
    }

    const dailyActive = last7Dates.map(({ dateStr, dayLabel }) => ({
      date: dateStr,
      day: dayLabel,
      users: dauByDate.get(dateStr)?.size || 0,
    }));

    const dbCountMap = new Map<string, number>();
    for (const g of dbVocabGroups) {
      dbCountMap.set(g.themeId, g._count._all);
    }

    const themeStats = MOCK_THEMES.map((theme) => ({
      id: theme.id,
      name: theme.name,
      icon: theme.icon || "📚",
      dbCount: dbCountMap.get(theme.id) || 0,
      bankCount: theme.totalVocabs || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalVocabDb,
          totalExamAttempts,
          totalPlatformXp: xpAggregate._sum.totalXp || 0,
        },
        dailyActive,
        pendingOrders,
        themeStats,
        vocabs: recentVocabs,
      },
    });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    if (prismaErr) {
      return NextResponse.json({ error: prismaErr.error }, { status: prismaErr.status });
    }
    return NextResponse.json({ error: "Không thể tải dữ liệu quản trị" }, { status: 500 });
  }
}
