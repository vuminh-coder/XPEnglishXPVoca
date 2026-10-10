"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getSemanticThemeIcon } from "../../utils/themeSemanticIcons";
import { getThemeCoverImage } from "../../utils/themeImageMapper";
import { useVocabularyStore } from "@/stores/vocabularyStore";

export interface ThemeCardItemData {
  id: string;
  name: string;
  nameEn: string;
  icon?: string;
  totalVocabs: number;
  difficulty: number;
}

export interface ThemeCardItemProps {
  theme: ThemeCardItemData;
}

export function ThemeCardItem({ theme }: ThemeCardItemProps) {
  // SWR Learned Vocabulary Progress Calculation
  const learnedList = useVocabularyStore((s) => s.learned);

  const { learnedCount, percentage } = useMemo(() => {
    if (!learnedList || learnedList.length === 0) {
      return { learnedCount: 0, percentage: 0 };
    }
    // Count user words associated with this theme
    const themePrefix = theme.id.toLowerCase();
    const count = learnedList.filter(
      (l) =>
        (l.isLearned || (l.proficiency && l.proficiency > 0)) &&
        l.vocabId &&
        l.vocabId.toLowerCase().includes(themePrefix)
    ).length;
    const pct = Math.min(100, Math.round((count / (theme.totalVocabs || 20)) * 100));
    return { learnedCount: count, percentage: pct };
  }, [learnedList, theme.id, theme.totalVocabs]);

  const coverUrl = getThemeCoverImage(theme);

  const levelBadge =
    theme.difficulty === 1 ? "A1 • A2 Cơ Bản" : theme.difficulty === 2 ? "B1 • B2 Trung Cấp" : "C1 • C2 Nâng Cao";

  return (
    <Link href={`/vocabulary/${theme.id}`} className="group block min-w-0 select-none">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden">
        
        {/* 1. VISUAL COVER BANNER (Aspect 16/10 with Soft Scrim & Ethereal Glass Badges) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-950 border-b border-slate-100 dark:border-slate-800/80">
          <img
            src={coverUrl}
            alt={theme.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80";
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />

          {/* Soft Directional Scrim (Leaves top & center bright, protects typography at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Ambient Light Tone on Hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

          {/* Top Badges (Ethereal Glassmorphism) */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
            {/* Level Badge */}
            <span className="px-2.5 py-0.5 rounded-lg text-[9.5px] font-mono font-bold uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap">
              {levelBadge}
            </span>

            {/* Word Count Pill (Ethereal Glassmorphism matching Level Badge) */}
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs tabular-nums flex items-center gap-1 shrink-0">
              <BookOpen className="w-2.5 h-2.5 text-white/95 stroke-[2.2]" />
              <span>{theme.totalVocabs} từ</span>
            </span>
          </div>

          {/* Bottom Cover Title & Subtitle Typography */}
          <div className="absolute bottom-2.5 inset-x-3 z-20">
            <h3 className="text-[15px] sm:text-base font-bold font-display text-white line-clamp-1 drop-shadow-md tracking-tight leading-snug">
              {theme.name}
            </h3>
            <p className="text-[11px] font-mono font-medium text-sky-200/90 line-clamp-1 drop-shadow-xs mt-0.5">
              {theme.nameEn || "Vocabulary Topic"}
            </p>
          </div>
        </div>

        {/* 2. CARD FOOTER: 2-TIER BALANCED BAR */}
        <div className="p-3 sm:p-3.5 flex flex-col justify-between gap-3 flex-1 bg-white dark:bg-slate-900">
          {/* Tier 1: Real Learning Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {learnedCount > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Đã học {learnedCount}/{theme.totalVocabs} từ
                  </span>
                ) : (
                  <span>Chưa bắt đầu • {theme.totalVocabs} từ</span>
                )}
              </span>
              <span className="font-mono font-black text-xs text-slate-700 dark:text-slate-300">
                {percentage}%
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentage > 0
                    ? "bg-gradient-to-r from-[#0059bb] to-emerald-500"
                    : "bg-transparent"
                }`}
                style={{ width: `${Math.max(percentage, 0)}%` }}
              />
            </div>
          </div>

          {/* Tier 2: Category Semantic Icon & Button-in-Button CTA */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
            {/* Semantic Category Icon */}
            <div
              className="w-8.5 h-8.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300"
              title={theme.name}
            >
              {getSemanticThemeIcon(theme)}
            </div>

            {/* Action CTA: Button-in-Button Architecture */}
            <div className="h-8.5 pl-3.5 pr-2.5 rounded-xl bg-[#0059bb] group-hover:bg-[#004ba0] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0 select-none group/btn">
              <span>Khám phá</span>
              <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

