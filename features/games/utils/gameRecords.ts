"use client";

export interface GameRecordData {
  bestScore: number;
  maxStreak: number;
  lastPlayedAt?: string;
}

const STORAGE_KEY = "xp_games_best_records";

export function getAllBestRecords(): Record<string, GameRecordData> {
  if (typeof window === "undefined" && typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getBestRecord(gameType: string): GameRecordData {
  const records = getAllBestRecords();
  return records[gameType] || { bestScore: 0, maxStreak: 0 };
}

export function updateBestRecord(
  gameType: string,
  score: number,
  combo: number = 0
): { isNewBest: boolean; bestScore: number } {
  if (typeof window === "undefined" && typeof localStorage === "undefined") {
    return { isNewBest: false, bestScore: score };
  }
  try {
    const records = getAllBestRecords();
    const current = records[gameType] || { bestScore: 0, maxStreak: 0 };

    const isNewBest = score > current.bestScore;
    const updated: GameRecordData = {
      bestScore: Math.max(score, current.bestScore),
      maxStreak: Math.max(combo, current.maxStreak),
      lastPlayedAt: new Date().toISOString(),
    };

    records[gameType] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

    return { isNewBest, bestScore: updated.bestScore };
  } catch {
    return { isNewBest: false, bestScore: score };
  }
}
