import { LEVEL_XP } from '../constants';

export function getXpProgress(level: number, xp: number) {
  const nextLvlXp = LEVEL_XP[level] || 1000;
  const prevLvlXp = LEVEL_XP[level - 1] || 0;
  
  const total = nextLvlXp - prevLvlXp;
  const current = xp - prevLvlXp;
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  
  return { current, total, percent };
}