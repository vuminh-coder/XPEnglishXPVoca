import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LEVEL_TITLES } from "@/lib/constants";
import { calculateXp, MatchResult, VALID_RESULTS } from "@/lib/utils/xp";

const LEVEL_XP = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000,
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { opponent, userScore, oppScore, result, userId: bodyUserId } = body;

    let userId: string = (await getAuthenticatedUserId(request)) || "";
    if (!userId) {
      userId = request.headers.get("x-user-id") || bodyUserId || "guest_pvp_user";
    }

    // Validate required fields
    if (!opponent || userScore === undefined || oppScore === undefined || !result) {
      return NextResponse.json({ error: "Missing required match fields" }, { status: 400 });
    }

    // Validate result is a known value
    if (!VALID_RESULTS.includes(result)) {
      return NextResponse.json({ error: "Invalid match result" }, { status: 400 });
    }

    // Validate scores are non-negative integers
    const parsedUserScore = parseInt(userScore);
    const parsedOppScore = parseInt(oppScore);
    if (isNaN(parsedUserScore) || isNaN(parsedOppScore) || parsedUserScore < 0 || parsedOppScore < 0) {
      return NextResponse.json({ error: "Invalid score values" }, { status: 400 });
    }

    // Server calculates XP — client value is ignored
    const xpGained = calculateXp(result as MatchResult, parsedUserScore, parsedOppScore);

    try {
      const transactionResult = await prisma.$transaction(async (tx) => {
        // 1. Create MatchHistory entry
        const match = await tx.matchHistory.create({
          data: {
            userId: userId,
            opponent: opponent,
            userScore: parsedUserScore,
            oppScore: parsedOppScore,
            result: result,
            xpGained: xpGained,
          },
        });

        // 2. Fetch or create profile
        let profile = await tx.profile.findUnique({
          where: { id: userId },
        });

        if (!profile) {
          const safeIdSnippet = userId.substring(Math.max(0, userId.length - 8));
          profile = await tx.profile.create({
            data: {
              id: userId,
              fullName: "Học viên XP",
              username: "user_" + safeIdSnippet,
              avatarEmoji: "🦉",
              level: 1,
              totalXp: 0,
              currentStreak: 0,
              longestStreak: 0,
              minutesStudied: 0,
              title: "Newbie",
              coins: 100,
            },
          });
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
            totalXp: newXp,
            level: newLevel,
            title: newTitle,
            coins: { increment: totalCoinsGained },
          },
        });

        return {
          match,
          profile: updatedProfile,
          levelUp,
        };
      });

      return NextResponse.json({
        success: true,
        data: transactionResult.match,
        profile: transactionResult.profile,
        levelUp: transactionResult.levelUp,
      });
    } catch (dbErr) {
      console.warn("DB update failed, returning fallback success for local user:", dbErr);
      return NextResponse.json({
        success: true,
        data: {
          id: "local_match_" + Date.now(),
          userId: userId,
          opponent,
          userScore: parsedUserScore,
          oppScore: parsedOppScore,
          result,
          xpGained,
          createdAt: new Date().toISOString(),
        },
        profile: {
          id: userId,
          fullName: "Học viên XP",
          avatarEmoji: "🦉",
          level: 1,
          totalXp: xpGained,
          title: "Newbie",
          coins: 100,
        },
        levelUp: false,
      });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("POST /api/pvp/match-submit error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
