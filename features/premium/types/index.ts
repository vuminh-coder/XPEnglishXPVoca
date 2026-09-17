import React from "react";

export type PlanKey = "yearly" | "monthly" | "lifetime";

export type BadgeVariantType = "hot" | "flex" | "vip";

export interface GiftItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}

export interface PlanConfig {
  key: PlanKey;
  name: string;
  badge: string;
  badgeType: BadgeVariantType;
  pricePerMonthFormatted: string;
  pricePerMonthNum: number;
  totalPriceFormatted: string;
  totalPriceNum: number;
  durationLabel: string;
  dailyCostNote: string;
  savingsLabel?: string;
  gifts: GiftItem[];
  keyHighlights: string[];
}

export interface SuccessStory {
  name: string;
  role: string;
  badge: string;
  initials: string;
  quote: string;
  rating?: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type ExamType = "toeic" | "ielts";

export interface ScoreSimulatorResult {
  targetExam: ExamType;
  currentScore: number;
  estimatedProScore: number;
}
