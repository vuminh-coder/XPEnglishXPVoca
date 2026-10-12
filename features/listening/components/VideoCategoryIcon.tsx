"use client";

import React from "react";
import {
  Heart,
  Flame,
  Tv,
  Sparkles,
  Brain,
  Radio,
  MessagesSquare,
  GraduationCap,
  Target,
  Compass,
  Cpu,
  Globe2,
  Briefcase,
  TrendingUp,
  Music,
  UtensilsCrossed,
  Leaf,
  Coins,
  Film,
  Layers,
  LucideProps,
} from "lucide-react";

interface VideoCategoryIconProps {
  slug?: string | null;
  iconName?: string | null;
  isActive?: boolean;
  className?: string;
}

interface CategoryMeta {
  Icon: React.ComponentType<LucideProps>;
  colorClass: string;
}

const CATEGORY_ICON_MAP: Record<string, CategoryMeta> = {
  // 4 Featured Movie Themes
  "romance-cinema": { Icon: Heart, colorClass: "text-rose-500 dark:text-rose-400" },
  "inspirational-life": { Icon: Flame, colorClass: "text-amber-500 dark:text-amber-400" },
  "classic-sitcoms": { Icon: Tv, colorClass: "text-sky-500 dark:text-sky-400" },
  "animation-pixar-disney": { Icon: Sparkles, colorClass: "text-purple-500 dark:text-purple-400" },

  // General & Educational Themes
  "ted-ed": { Icon: Brain, colorClass: "text-emerald-500 dark:text-emerald-400" },
  "bbc-6-minute": { Icon: Radio, colorClass: "text-teal-500 dark:text-teal-400" },
  "daily-conversations": { Icon: MessagesSquare, colorClass: "text-blue-500 dark:text-blue-400" },
  "ielts-listening": { Icon: GraduationCap, colorClass: "text-indigo-500 dark:text-indigo-400" },
  "toeic-listening": { Icon: Target, colorClass: "text-orange-500 dark:text-orange-400" },
  kurzgesagt: { Icon: Compass, colorClass: "text-cyan-500 dark:text-cyan-400" },
  "science-tech": { Icon: Cpu, colorClass: "text-violet-500 dark:text-violet-400" },
  "stories-culture": { Icon: Globe2, colorClass: "text-amber-600 dark:text-amber-400" },
  "career-business": { Icon: Briefcase, colorClass: "text-slate-600 dark:text-slate-300" },
  "business-english": { Icon: TrendingUp, colorClass: "text-blue-600 dark:text-sky-400" },
  "music-english": { Icon: Music, colorClass: "text-pink-500 dark:text-pink-400" },
  "food-dining": { Icon: UtensilsCrossed, colorClass: "text-orange-600 dark:text-orange-400" },
  "nature-planet": { Icon: Leaf, colorClass: "text-emerald-600 dark:text-emerald-400" },
  "finance-wealth": { Icon: Coins, colorClass: "text-amber-500 dark:text-amber-400" },
  all: { Icon: Layers, colorClass: "text-slate-500 dark:text-slate-400" },
};

const NAME_ICON_MAP: Record<string, CategoryMeta> = {
  Heart: { Icon: Heart, colorClass: "text-rose-500 dark:text-rose-400" },
  Flame: { Icon: Flame, colorClass: "text-amber-500 dark:text-amber-400" },
  Tv: { Icon: Tv, colorClass: "text-sky-500 dark:text-sky-400" },
  Sparkles: { Icon: Sparkles, colorClass: "text-purple-500 dark:text-purple-400" },
  Brain: { Icon: Brain, colorClass: "text-emerald-500 dark:text-emerald-400" },
  Radio: { Icon: Radio, colorClass: "text-teal-500 dark:text-teal-400" },
  MessagesSquare: { Icon: MessagesSquare, colorClass: "text-blue-500 dark:text-blue-400" },
  GraduationCap: { Icon: GraduationCap, colorClass: "text-indigo-500 dark:text-indigo-400" },
  Target: { Icon: Target, colorClass: "text-orange-500 dark:text-orange-400" },
  Compass: { Icon: Compass, colorClass: "text-cyan-500 dark:text-cyan-400" },
  Cpu: { Icon: Cpu, colorClass: "text-violet-500 dark:text-violet-400" },
  Globe2: { Icon: Globe2, colorClass: "text-amber-600 dark:text-amber-400" },
  Briefcase: { Icon: Briefcase, colorClass: "text-slate-600 dark:text-slate-300" },
  TrendingUp: { Icon: TrendingUp, colorClass: "text-blue-600 dark:text-sky-400" },
  Music: { Icon: Music, colorClass: "text-pink-500 dark:text-pink-400" },
  UtensilsCrossed: { Icon: UtensilsCrossed, colorClass: "text-orange-600 dark:text-orange-400" },
  Leaf: { Icon: Leaf, colorClass: "text-emerald-600 dark:text-emerald-400" },
  Coins: { Icon: Coins, colorClass: "text-amber-500 dark:text-amber-400" },
  Film: { Icon: Film, colorClass: "text-indigo-500 dark:text-indigo-400" },
  Layers: { Icon: Layers, colorClass: "text-slate-500 dark:text-slate-400" },
};

export const VideoCategoryIcon: React.FC<VideoCategoryIconProps> = ({
  slug,
  iconName,
  isActive = false,
  className = "w-3.5 h-3.5 shrink-0",
}) => {
  // 1. Resolve by slug first
  let meta = slug ? CATEGORY_ICON_MAP[slug] : undefined;

  // 2. Resolve by iconName if slug not found
  if (!meta && iconName) {
    meta = NAME_ICON_MAP[iconName];
  }

  // 3. Fallback to default
  const { Icon, colorClass } = meta || {
    Icon: Film,
    colorClass: "text-slate-500 dark:text-slate-400",
  };

  const finalColor = isActive ? "text-white" : colorClass;

  return <Icon className={`${className} ${finalColor} stroke-[2] transition-colors`} />;
};

export default VideoCategoryIcon;
