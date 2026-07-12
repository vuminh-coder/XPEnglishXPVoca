export const VALID_RESULTS = ["WIN", "LOSE", "DRAW"] as const;
export type MatchResult = (typeof VALID_RESULTS)[number];

/**
 * Server-side XP calculation — NEVER trust client-sent XP values.
 * - WIN: 50 base + bonus (capped at 30) based on score margin
 * - DRAW: 25 flat
 * - LOSE: 10 flat (participation reward)
 * - Total XP per match capped at 80, minimum 0
 */
export function calculateXp(result: MatchResult, userScore: number, oppScore: number): number {
  const BASE_XP: Record<MatchResult, number> = { WIN: 50, DRAW: 25, LOSE: 10 };
  const baseXp = BASE_XP[result];
  if (!baseXp) return 0;
  const bonusXp = result === "WIN" ? Math.min(Math.floor((userScore - oppScore) * 2), 30) : 0;
  return Math.max(Math.min(baseXp + bonusXp, 80), 0);
}
