"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Heart, Target } from "lucide-react";
import { getSemanticThemeIcon } from "../../utils/themeSemanticIcons";

export interface ThemeDetailHeaderBannerProps {
  theme: {
    id: string;
    name: string;
    nameEn: string;
  };
  totalVocabs: number;
  learnedCount: number;
  favoriteCount: number;
  progressPercent: number;
}

export function ThemeDetailHeaderBanner({
  theme,
  totalVocabs,
  learnedCount,
  favoriteCount,
  progressPercent,
}: ThemeDetailHeaderBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-2.5"
    >
      {/* Top ambient blue accent glow */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

      {/* Unified Compact Row: Topic Info on Left, 4 Inline Metrics on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Topic Title & Details */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
            {getSemanticThemeIcon(theme)}
          </div>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
              {theme.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              {theme.nameEn} • Chuẩn IPA & ví dụ song ngữ
            </p>
          </div>
        </div>

        {/* Right: 4 Sleek Micro Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Tổng Từ</span>
              <span className="text-xs sm:text-sm font-black font-display text-[#0059bb] dark:text-sky-400 leading-tight">
                {totalVocabs} Từ
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Đã Thuộc</span>
              <span className="text-xs sm:text-sm font-black font-display text-emerald-600 dark:text-emerald-400 leading-tight">
                {learnedCount} Từ
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Yêu Thích</span>
              <span className="text-xs sm:text-sm font-black font-display text-rose-500 dark:text-rose-400 leading-tight">
                {favoriteCount} Từ
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Tiến Độ</span>
              <span className="text-xs sm:text-sm font-black font-display text-purple-600 dark:text-purple-400 leading-tight">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
