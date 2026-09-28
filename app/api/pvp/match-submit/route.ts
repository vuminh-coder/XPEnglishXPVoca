import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/database/prisma";
import { invalidateDashboardCache } from "@/infrastructure/cache/dashboardCache";
import { LEVEL_TITLES } from "@/shared/constants";
import { calculateXp, MatchResult, VALID_RESULTS } from "@/shared/utils/xp";
import { sanitizeInput } from "@/infrastructure/security/validation";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const body = await request.json();
    const { opponent, userScore, oppScore, result } = body;

    // Validate required fields
    if (!opponent || userScore === undefined || oppScore === undefined || !result) {
      return NextResponse.json({ error: "Missing required match fields" }, { status: 400 });
    }

    // Validate result is a known value
    if (!VALID_RESULTS.includes(result)) {
      return NextResponse.json({ error: "Invalid match result" }, { status: 400 });
    }

    // Validate scores are non-negative integers
    const parsedUserScore = parseInt(userScore, 10);
    const parsedOppScore = parseInt(oppScore, 10);
    if (isNaN(parsedUserScore) || isNaN(parsedOppScore) || parsedUserScore < 0 || parsedOppScore < 0) {
      return NextResponse.json({ error: "Invalid score values" }, { status: 400 });
    }

    const sanitizedOpponent = sanitizeInput(String(opponent).trim().slice(0, 50));

    // Server-authoritative XP calculation with hard security cap (max 50 XP per match)
    const rawXpGained = calculateXp(result as MatchResult, parsedUserScore, parsedOppScore);
    const xpGained = Math.min(50, Math.max(0, rawXpGained));

    // Handle Unauthenticated / Guest Users safely without database write
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        data: {
          id: `guest_match_${Date.now()}`,
          opponent: sanitizedOpponent,
          userScore: parsedUserScore,
          oppScore: parsedOppScore,
          result,
          xpGained,
          createdAt: new Date().toISOString(),
        },
        message: "Trận đấu đã hoàn thành ở chế độ Khách.",
      });
    }

    // Server-Authoritative Database Transaction
    const transactionResult = await prisma.$transaction(async (tx) => {
      // 1. Create MatchHistory entry with selective projection
      const match = await tx.matchHistory.create({
        data: {
          userId,
          opponent: sanitizedOpponent,
          userScore: parsedUserScore,
          oppScore: parsedOppScore,
          result,
          xpGained,
        },
        select: {
          id: true,
          userId: true,
          opponent: true,
          userScore: true,
          oppScore: true,
          result: true,
          xpGained: true,
          createdAt: true,
        },
      });

      // 2. Fetch profile with selective projection (Rule 3: Selective SELECT, eliminate SELECT *)
      let profile = await tx.profile.findUnique({
        where: { id: userId },
        select: {
          id: true,
          totalXp: true,
          level: true,
          title: true,
          coins: true,
          minutesStudied: true,
        },
      });

      if (!profile) {
        const safeSuffix = userId.substring(Math.max(0, userId.length - 8));
        const createdProfile = await tx.profile.create({
          data: {
            id: userId,
            fullName: "Học viên XP Voca",
            username: "user_" + safeSuffix,
            avatarEmoji: "🦉",
            level: 1,
            totalXp: 0,
            currentStreak: 1,
            longestStreak: 1,
            minutesStudied: 0,
            title: "Tân Binh",
            coins: 100,
            streakFreezes: 0,
          },
          select: {
            id: true,
            totalXp: true,
            level: true,
            title: true,
            coins: true,
            minutesStudied: true,
          },
        });
        profile = createdProfile;
      }

      // 3. Update XP, check Level up, and calculate Coins
      const newXp = profile.totalXp + xpGained;
      let newLevel = profile.level;
      let levelUp = false;
      let levelUpCoins = 0;

      while (newLevel < LEVEL_XP.length && newXp >= LEVEL_XP[newLevel]) {
        newLevel++;
        levelUp = true;
        levelUpCoins += 100 * newLevel;
      }

      const newTitle = LEVEL_TITLES[newLevel] || profile.title;
      const coinsGained = result === "WIN" ? 20 : result === "DRAW" ? 10 : 2;
      const totalCoinsGained = coinsGained + levelUpCoins;

      const updatedProfile = await tx.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: xpGained },
          level: newLevel,
          title: newTitle,
          coins: { increment: totalCoinsGained },
          minutesStudied: { increment: 1 },
        },
        select: {
          id: true,
          totalXp: true,
          level: true,
          title: true,
          coins: true,
          minutesStudied: true,
        },
      });

      // 4. Sync to DailySkillPractice for 7-day analytics & skill charts
      const todayDate = new Date().toISOString().split("T")[0];
      await tx.dailySkillPractice.upsert({
        where: {
          userId_skill_date: {
            userId,
            skill: "vocab",
            date: todayDate,
          },
        },
        update: {
          minutes: { increment: 1 },
          xpEarned: { increment: xpGained },
        },
        create: {
          userId,
          skill: "vocab",
          date: todayDate,
          minutes: 1,
          xpEarned: xpGained,
        },
      });

      return {
        match,
        profile: updatedProfile,
        levelUp,
        coinsGained: totalCoinsGained,
      };
    });

    invalidateDashboardCache(userId);

    return NextResponse.json({
      success: true,
      guest: false,
      data: transactionResult.match,
      profile: transactionResult.profile,
      levelUp: transactionResult.levelUp,
      coinsAwarded: transactionResult.coinsGained,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("POST /api/pvp/match-submit error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({
        success: true,
        guest: true,
        data: {
          recentMatches: [],
          stats: {
            totalMatches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            winRate: 0,
            totalXpGained: 0,
          },
        },
      });
    }

    // Leverage indexed queries (userId, createdAt DESC) with selective projection
    const [recentMatches, totalMatches, totalWins, totalDraws] = await Promise.all([
      prisma.matchHistory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          opponent: true,
          userScore: true,
          oppScore: true,
          result: true,
          xpGained: true,
          createdAt: true,
        },
      }),
      prisma.matchHistory.count({ where: { userId } }),
      prisma.matchHistory.count({ where: { userId, result: "WIN" } }),
      prisma.matchHistory.count({ where: { userId, result: "DRAW" } }),
    ]);

    const losses = Math.max(0, totalMatches - totalWins - totalDraws);
    const winRate = totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;
    const totalXpGained = recentMatches.reduce((acc, m) => acc + (m.xpGained || 0), 0);

    return NextResponse.json({
      success: true,
      guest: false,
      data: {
        recentMatches,
        stats: {
          totalMatches,
          wins: totalWins,
          draws: totalDraws,
          losses,
          winRate,
          totalXpGained,
        },
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("GET /api/pvp/match-submit error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
