import { LEVEL_XP } from '../constants';

export function getXpProgress(level: number, xp: number) {
  const safeLevel = Math.max(1, Math.floor(level));
  const prevLvlXp = LEVEL_XP[safeLevel - 1] ?? LEVEL_XP[LEVEL_XP.length - 1] ?? 0;
  const nextLvlXp = LEVEL_XP[safeLevel];

  if (nextLvlXp === undefined || nextLvlXp <= prevLvlXp) {
    const excess = Math.max(0, xp - prevLvlXp);
    return { current: excess, total: Math.max(1, excess), percent: 100 };
  }

  const total = nextLvlXp - prevLvlXp;
  const current = Math.max(0, xp - prevLvlXp);
  const rawPercent = Math.min(100, Math.max(0, (current / total) * 100));
  const percent = Math.round(rawPercent * 100) / 100;

  return { current, total, percent };
}