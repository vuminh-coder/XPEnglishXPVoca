import React from "react";

export type SkillMode = "Dictation" | "Shadowing" | "Nói" | "Từ vựng" | "Viết";
export type AnalyticsTabType = "ACTIVITIES" | "LEADERBOARD";

export interface SkillThemeConfig {
  label: string;
  color: string;
  gradientId: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export interface AnalyticsStats {
  currentStreak?: number;
  longestStreak?: number;
  wordsLearned?: number;
  minutesStudied?: number;
  totalXp?: number;
  weeklyRank?: string;
}

export interface HeatmapTile {
  dateStr: string;
  count: number;
  intensity?: number;
}

export interface LeaderboardUser {
  id: string | number;
  rank?: number;
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  avatarEmoji?: string;
  imageUrl?: string;
  avatar?: string;
  level?: number;
  title?: string;
  xp: number;
  isSelf?: boolean;
}
