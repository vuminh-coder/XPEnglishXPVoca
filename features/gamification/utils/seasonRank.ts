/**
 * Season & Rank Tier engine (pure, no I/O).
 *
 * - A season is one calendar month, identified by "YYYY-MM".
 * - Season XP = SUM(xp_earned) from daily_skill_practice within the season date range.
 * - Tier is derived from season XP; rewards are claimable once the season has ended.
 */

export interface SeasonInfo {
  id: string; // "YYYY-MM"
  name: string; // "Mùa 10/2026"
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  totalDays: number;
  daysLeft: number; // 0 when the season has ended
}

export interface RankTier {
  id: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  name: string;
  minXp: number;
  rewardCoins: number;
  emoji: string;
}

export const RANK_TIERS: readonly RankTier[] = [
  { id: "bronze", name: "Đồng", minXp: 0, rewardCoins: 0, emoji: "🥉" },
  { id: "silver", name: "Bạc", minXp: 300, rewardCoins: 50, emoji: "🥈" },
  { id: "gold", name: "Vàng", minXp: 1000, rewardCoins: 150, emoji: "🥇" },
  { id: "platinum", name: "Bạch Kim", minXp: 2500, rewardCoins: 400, emoji: "💠" },
  { id: "diamond", name: "Kim Cương", minXp: 5000, rewardCoins: 1000, emoji: "💎" },
] as const;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function ymd(y: number, m: number, d: number): string {
  return `${y}-${pad(m)}-${pad(d)}`;
}

function buildSeason(year: number, month: number, now: Date): SeasonInfo {
  const totalDays = new Date(year, month, 0).getDate();
  const startDate = ymd(year, month, 1);
  const endDate = ymd(year, month, totalDays);

  const endOfSeason = new Date(year, month - 1, totalDays, 23, 59, 59, 999);
  const msLeft = endOfSeason.getTime() - now.getTime();
  const daysLeft = msLeft <= 0 ? 0 : Math.ceil(msLeft / 86_400_000);

  return {
    id: `${year}-${pad(month)}`,
    name: `Mùa ${month}/${year}`,
    startDate,
    endDate,
    totalDays,
    daysLeft: Math.min(daysLeft, totalDays),
  };
}

export function getSeasonForDate(now: Date = new Date()): SeasonInfo {
  return buildSeason(now.getFullYear(), now.getMonth() + 1, now);
}

export function getPreviousSeason(now: Date = new Date()): SeasonInfo {
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return buildSeason(prev.getFullYear(), prev.getMonth() + 1, now);
}

export function isValidSeasonId(id: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(id);
}

export function getTierForXp(xp: number): RankTier {
  const safe = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  let current = RANK_TIERS[0];
  for (const tier of RANK_TIERS) {
    if (safe >= tier.minXp) current = tier;
  }
  return current;
}

export interface TierProgress {
  tier: RankTier;
  nextTier: RankTier | null;
  xpIntoTier: number;
  xpToNext: number; // 0 when at max tier
  percent: number; // 0..100, max 2 decimals
}

export function getTierProgress(xp: number): TierProgress {
  const safe = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  const tier = getTierForXp(safe);
  const idx = RANK_TIERS.findIndex((t) => t.id === tier.id);
  const nextTier = idx < RANK_TIERS.length - 1 ? RANK_TIERS[idx + 1] : null;

  if (!nextTier) {
    return { tier, nextTier: null, xpIntoTier: safe - tier.minXp, xpToNext: 0, percent: 100 };
  }

  const span = nextTier.minXp - tier.minXp;
  const into = safe - tier.minXp;
  const percent = Math.round((into / span) * 10000) / 100;
  return {
    tier,
    nextTier,
    xpIntoTier: into,
    xpToNext: nextTier.minXp - safe,
    percent: Math.min(100, Math.max(0, percent)),
  };
}

export function formatRankXp(xp: number): string {
  if (xp >= 1000) {
    const k = xp / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k XP`;
  }
  return `${xp} XP`;
}

