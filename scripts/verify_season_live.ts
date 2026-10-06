/**
 * Live verification for the season feature (safe: claim flow runs inside a transaction that is rolled back).
 * Run: npx tsx scripts/verify_season_live.ts
 */
import { prisma } from "../infrastructure/database/prisma";
import { signAuthToken } from "../infrastructure/auth/jwt";
import { ensureSeasonClaimsTable, getUserSeasonXp, getUserSeasonRank } from "../infrastructure/database/seasonStore";
import { getSeasonForDate } from "../features/gamification/utils/seasonRank";

async function main() {
  await ensureSeasonClaimsTable();

  const profile = await prisma.profile.findFirst({ select: { id: true, coins: true, username: true } });
  if (!profile) throw new Error("No profile in DB to test with");
  console.log("Using profile:", profile.username, "coins:", profile.coins);

  // 1) Authenticated GET /api/season as that user
  const token = signAuthToken({ userId: profile.id });
  const res = await fetch("http://localhost:3000/api/season", { headers: { cookie: `xp_voca_session=${token}` } });
  const json = await res.json();
  console.log("GET /api/season ->", res.status, JSON.stringify(json.data?.me ?? null));
  if (!json.success || !json.data?.me) throw new Error("Authenticated season payload missing");

  // 2) Direct SQL helpers agree with API
  const s = getSeasonForDate();
  const xp = await getUserSeasonXp(profile.id, s.startDate, s.endDate);
  const rank = await getUserSeasonRank(xp, s.startDate, s.endDate);
  console.log("helpers: xp", xp, "rank", rank);
  if (xp !== json.data.me.xp || rank !== json.data.me.rank) throw new Error("API vs helper mismatch");

  // 3) Claim SQL inside a rolled-back transaction: first insert works, second conflicts, coins credited once
  const marker = "__rollback__";
  try {
    await prisma.$transaction(async (tx) => {
      const a = await tx.$executeRaw`INSERT INTO season_reward_claims (user_id, season_id, tier_id, coins) VALUES (${profile.id}, '1999-01', 'silver', 50) ON CONFLICT (user_id, season_id) DO NOTHING`;
      const b = await tx.$executeRaw`INSERT INTO season_reward_claims (user_id, season_id, tier_id, coins) VALUES (${profile.id}, '1999-01', 'silver', 50) ON CONFLICT (user_id, season_id) DO NOTHING`;
      console.log("first insert rows:", a, "second insert rows:", b);
      if (a !== 1 || b !== 0) throw new Error("Idempotency guard failed");
      const p = await tx.profile.update({ where: { id: profile.id }, data: { coins: { increment: 50 } }, select: { coins: true } });
      console.log("coins in tx:", p.coins, "(expected", profile.coins + 50, ")");
      if (p.coins !== profile.coins + 50) throw new Error("Coin credit mismatch");
      throw new Error(marker);
    });
  } catch (e: any) {
    if (e.message !== marker) throw e;
  }

  const after = await prisma.profile.findUnique({ where: { id: profile.id }, select: { coins: true } });
  const leftover = await prisma.$queryRaw<{ c: number }[]>`SELECT COUNT(*)::int AS c FROM season_reward_claims WHERE season_id = '1999-01'`;
  console.log("after rollback coins:", after?.coins, "leftover test claims:", leftover[0].c);
  if (after?.coins !== profile.coins || leftover[0].c !== 0) throw new Error("Rollback left residue!");

  console.log("SEASON LIVE VERIFY: ALL OK");
}

main()
  .catch((e) => {
    console.error("FAILED:", e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
