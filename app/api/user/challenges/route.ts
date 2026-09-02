import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface ChallengeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  target: number;
}

const CHALLENGE_DEFINITIONS: ChallengeDef[] = [
  { id: "learn_words", title: "Học 5 từ mới", description: "Thực hành 5 từ vựng hôm nay", icon: "📚", xpReward: 15, coinReward: 10, target: 5 },
  { id: "review_cards", title: "Ôn tập 10 từ vựng", description: "Hoàn thành 10 lượt ôn tập", icon: "🔄", xpReward: 20, coinReward: 15, target: 10 },
  { id: "win_pvp", title: "Thắng 1 trận PvP", description: "Giành chiến thắng trong Đấu trường", icon: "⚔️", xpReward: 25, coinReward: 20, target: 1 },
  { id: "speak_practice", title: "Luyện nói hoặc Shadowing", description: "Luyện phát âm chuẩn ít nhất 5 phút", icon: "🎤", xpReward: 25, coinReward: 20, target: 5 },
  { id: "write_essay", title: "Luyện Dictation / Viết", description: "Luyện nghe chép hoặc viết ít nhất 5 phút", icon: "✍️", xpReward: 25, coinReward: 20, target: 5 },
];

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    const isGuest = !userId || userId === "guest_user" || userId === "local_user";
    const todayStr = getLocalDateString();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    if (isGuest) {
      return NextResponse.json({
        success: true,
        data: {
          challenges: CHALLENGE_DEFINITIONS.map((c) => ({
            ...c,
            progress: 0,
            isCompleted: false,
            isClaimed: false,
          })),
        },
      });
    }

    const data = await safeDbExecute(async () => {
      // 1. Query real progress from PostgreSQL
      // A. Learned/practiced words today
      const wordsCount = await prisma.userVocabulary.count({
        where: {
          userId,
          lastPracticed: { gte: startOfToday },
        },
      });

      // B. Total vocabulary reviewed/practiced
      const totalReviewed = await prisma.userVocabulary.count({
        where: {
          userId,
          proficiency: { gt: 0 },
        },
      });

      // C. PvP wins today
      const pvpWinsCount = await prisma.matchHistory.count({
        where: {
          userId,
          result: "WIN",
          createdAt: { gte: startOfToday },
        },
      });

      // D. Skill practices today (speaking/shadowing and writing/dictation)
      const practicesToday = await prisma.dailySkillPractice.findMany({
        where: {
          userId,
          date: todayStr,
        },
      });

      let speakingMinutes = 0;
      let writingMinutes = 0;
      const claimedChallengeIds = new Set<string>();

      practicesToday.forEach((p) => {
        if (p.skill === "speaking" || p.skill === "shadowing") {
          speakingMinutes += p.minutes || 0;
        }
        if (p.skill === "writing" || p.skill === "dictation") {
          writingMinutes += p.minutes || 0;
        }
        if (p.skill?.startsWith("challenge_claim_")) {
          claimedChallengeIds.add(p.skill.replace("challenge_claim_", ""));
        }
      });

      // Assemble challenge list with database-driven progress
      const challenges = CHALLENGE_DEFINITIONS.map((def) => {
        let actualProgress = 0;
        switch (def.id) {
          case "learn_words":
            actualProgress = wordsCount;
            break;
          case "review_cards":
            actualProgress = Math.max(wordsCount, Math.min(def.target, totalReviewed));
            break;
          case "win_pvp":
            actualProgress = pvpWinsCount;
            break;
          case "speak_practice":
            actualProgress = speakingMinutes;
            break;
          case "write_essay":
            actualProgress = writingMinutes;
            break;
          default:
            actualProgress = 0;
        }

        const isClaimed = claimedChallengeIds.has(def.id);
        const isCompleted = actualProgress >= def.target;

        return {
          ...def,
          progress: actualProgress,
          isCompleted,
          isClaimed,
        };
      });

      return { challenges };
    }, "Daily Challenges Query");

    return NextResponse.json({
      success: true,
      data: data || {
        challenges: CHALLENGE_DEFINITIONS.map((c) => ({
          ...c,
          progress: 0,
          isCompleted: false,
          isClaimed: false,
        })),
      },
    });
  } catch (error: any) {
    console.error("GET /api/user/challenges error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId || userId === "guest_user" || userId === "local_user") {
      return NextResponse.json({ error: "Vui lòng đăng nhập để nhận thưởng." }, { status: 401 });
    }

    const body = await request.json();
    const { challengeId } = body;

    const challengeDef = CHALLENGE_DEFINITIONS.find((c) => c.id === challengeId);
    if (!challengeDef) {
      return NextResponse.json({ error: "Nhiệm vụ không tồn tại." }, { status: 400 });
    }

    const todayStr = getLocalDateString();
    const claimSkillKey = `challenge_claim_${challengeId}`;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const result = await safeDbExecute(async () => {
      // 1. Check if already claimed today in DB
      const existingClaim = await prisma.dailySkillPractice.findFirst({
        where: {
          userId,
          date: todayStr,
          skill: claimSkillKey,
        },
      });

      if (existingClaim) {
        return {
          alreadyClaimed: true,
          message: "Nhiệm vụ này đã được nhận thưởng hôm nay rồi!",
        };
      }

      // 2. Verify real progress in DB before awarding (Server-Authoritative Anti-Cheat)
      let progress = 0;
      if (challengeId === "learn_words") {
        progress = await prisma.userVocabulary.count({
          where: { userId, lastPracticed: { gte: startOfToday } },
        });
      } else if (challengeId === "win_pvp") {
        progress = await prisma.matchHistory.count({
          where: { userId, result: "WIN", createdAt: { gte: startOfToday } },
        });
      } else if (challengeId === "speak_practice") {
        const practices = await prisma.dailySkillPractice.findMany({
          where: { userId, date: todayStr, skill: { in: ["speaking", "shadowing"] } },
        });
        progress = practices.reduce((acc, p) => acc + (p.minutes || 0), 0);
      } else if (challengeId === "write_essay") {
        const practices = await prisma.dailySkillPractice.findMany({
          where: { userId, date: todayStr, skill: { in: ["writing", "dictation"] } },
        });
        progress = practices.reduce((acc, p) => acc + (p.minutes || 0), 0);
      } else {
        // Fallback for review_cards
        progress = await prisma.userVocabulary.count({
          where: { userId, proficiency: { gt: 0 } },
        });
      }

      // Check threshold (allow reasonable leniency for review)
      if (progress < challengeDef.target && challengeId !== "review_cards") {
        return {
          notCompleted: true,
          message: `Chưa hoàn thành nhiệm vụ (${progress}/${challengeDef.target}).`,
        };
      }

      // 3. Record claim in DailySkillPractice
      await prisma.dailySkillPractice.create({
        data: {
          userId,
          skill: claimSkillKey,
          date: todayStr,
          minutes: 0,
          xpEarned: challengeDef.xpReward,
        },
      });

      // 4. Update Profile with real XP and Coins
      const updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          totalXp: { increment: challengeDef.xpReward },
          coins: { increment: challengeDef.coinReward },
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        challengeId,
        xpAwarded: challengeDef.xpReward,
        coinsAwarded: challengeDef.coinReward,
        totalXp: updatedProfile.totalXp,
        coins: updatedProfile.coins,
        message: `Nhận thưởng thành công: +${challengeDef.xpReward} XP, +${challengeDef.coinReward} Vàng!`,
      };
    }, "Challenge Claim Submit");

    if (result && result.alreadyClaimed) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }
    if (result && result.notCompleted) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("POST /api/user/challenges/claim error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
