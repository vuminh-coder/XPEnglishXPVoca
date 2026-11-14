import { LEVEL_TITLES, LEVEL_XP } from "@/shared/constants";

export { LEVEL_TITLES, LEVEL_XP };

export const VALID_RESULTS = ["WIN", "LOSE", "DRAW"] as const;
export type MatchResult = (typeof VALID_RESULTS)[number];

/**
 * Computes next level, title, and level-up coin rewards from cumulative XP.
 */
export function calculateLevelProgression(
  totalXp: number,
  currentLevel: number = 1,
  fallbackTitle: string = "Grandmaster"
): { level: number; title: string; leveledUp: boolean; levelUpCoins: number } {
  let newLevel = Math.max(1, currentLevel);
  let leveledUp = false;
  let levelUpCoins = 0;

  while (newLevel < LEVEL_XP.length && totalXp >= LEVEL_XP[newLevel]) {
    newLevel++;
    leveledUp = true;
    levelUpCoins += 100 * newLevel;
  }

  return {
    level: newLevel,
    title: LEVEL_TITLES[newLevel] || fallbackTitle,
    leveledUp,
    levelUpCoins,
  };
}

export function calculateLevelAndTitle(
  totalXp: number,
  currentLevel: number = 1,
  fallbackTitle: string = "Grandmaster"
): { level: number; title: string } {
  const { level, title } = calculateLevelProgression(totalXp, currentLevel, fallbackTitle);
  return { level, title };
}

export function calculateLevelFromXp(totalXp: number): { level: number; title: string } {
  return calculateLevelAndTitle(totalXp, 1, "Master Learner");
}

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
