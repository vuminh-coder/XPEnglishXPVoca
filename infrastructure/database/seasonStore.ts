import { prisma, safeDbExecute, withPrismaRetry } from "@/infrastructure/database/prisma";

let isTableReady = false;

/**
 * Additive, idempotent table used to guarantee each user can claim a season reward only once.
 * Same lazy-init pattern as ai_practice_sessions (no prisma migrate required).
 */
export async function ensureSeasonClaimsTable(): Promise<void> {
  if (isTableReady) return;
  const ok = await safeDbExecute(async () => {
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS season_reward_claims (
        user_id VARCHAR(255) NOT NULL,
        season_id VARCHAR(10) NOT NULL,
        tier_id VARCHAR(20) NOT NULL,
        coins INT NOT NULL DEFAULT 0,
        claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, season_id)
      )
    `);
    return true;
  }, "Create season_reward_claims table");
  if (ok) isTableReady = true;
}

/** Total XP a user earned within [startDate, endDate] (YYYY-MM-DD, inclusive). */
export async function getUserSeasonXp(userId: string, startDate: string, endDate: string): Promise<number> {
  const rows = await withPrismaRetry(() =>
    prisma.$queryRaw<{ xp: number }[]>`
      SELECT COALESCE(SUM(xp_earned), 0)::int AS xp
      FROM daily_skill_practice
      WHERE user_id = ${userId} AND date >= ${startDate} AND date <= ${endDate}
    `
  );
  return Number(rows?.[0]?.xp ?? 0);
}

/** 1-based rank of a user in a season by XP (users with strictly more XP + 1). */
export async function getUserSeasonRank(
  userXp: number,
  startDate: string,
  endDate: string
): Promise<number> {
  if (userXp <= 0) return 0; // unranked
  const rows = await withPrismaRetry(() =>
    prisma.$queryRaw<{ higher: number }[]>`
      SELECT COUNT(*)::int AS higher FROM (
        SELECT user_id
        FROM daily_skill_practice
        WHERE date >= ${startDate} AND date <= ${endDate}
        GROUP BY user_id
        HAVING SUM(xp_earned) > ${userXp}
      ) t
    `
  );
  return Number(rows?.[0]?.higher ?? 0) + 1;
}

export async function hasClaimedSeason(userId: string, seasonId: string): Promise<boolean> {
  const rows = await withPrismaRetry(() =>
    prisma.$queryRaw<{ c: number }[]>`
      SELECT 1 AS c FROM season_reward_claims WHERE user_id = ${userId} AND season_id = ${seasonId} LIMIT 1
    `
  );
  return Array.isArray(rows) && rows.length > 0;
}

/**
 * Atomically records the claim and credits coins. Returns false if already claimed.
 */
export async function claimSeasonReward(
  userId: string,
  seasonId: string,
  tierId: string,
  coins: number
): Promise<{ claimed: boolean; coins: number | null }> {
  return prisma.$transaction(async (tx) => {
    const inserted = await tx.$executeRaw`
      INSERT INTO season_reward_claims (user_id, season_id, tier_id, coins)
      VALUES (${userId}, ${seasonId}, ${tierId}, ${coins})
      ON CONFLICT (user_id, season_id) DO NOTHING
    `;
    if (inserted === 0) return { claimed: false, coins: null };

    const profile = await tx.profile.update({
      where: { id: userId },
      data: { coins: { increment: coins } },
      select: { coins: true },
    });
    return { claimed: true, coins: profile.coins };
  });
}
