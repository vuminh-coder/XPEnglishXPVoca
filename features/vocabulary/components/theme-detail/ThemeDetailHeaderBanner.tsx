"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Heart, Target, Sparkles, Trophy } from "lucide-react";
import { getSemanticThemeIcon } from "../../utils/themeSemanticIcons";

export interface ThemeDetailHeaderBannerProps {
  theme: {
    id: string;
    name: string;
    nameEn: string;
    description?: string;
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
      className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-4"
    >
      {/* Top ambient brand highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0059bb] via-indigo-500 to-[#10b981]" />

      {/* Main Row: Theme Identity on Left + 4 Key Micro Metric Cards on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Topic Title & Details */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-xs text-xl">
            {getSemanticThemeIcon(theme)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-display truncate">
                {theme.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 shrink-0">
                Chủ Đề Chuẩn
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
              {theme.nameEn} • {theme.description || "Bộ từ vựng giao tiếp thực tế chuẩn IPA & ví dụ song ngữ"}
            </p>
          </div>
        </div>

        {/* Right: 4 Sleek Micro Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          {/* Total */}
          <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Tổng Từ</span>
              <span className="text-sm font-black font-display text-[#0059bb] dark:text-sky-400 leading-tight">
                {totalVocabs}
              </span>
            </div>
          </div>

          {/* Learned */}
          <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Đã Thuộc</span>
              <span className="text-sm font-black font-display text-emerald-600 dark:text-emerald-400 leading-tight">
                {learnedCount}
              </span>
            </div>
          </div>

          {/* Favorite */}
          <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-rose-500/20" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Yêu Thích</span>
              <span className="text-sm font-black font-display text-rose-500 dark:text-rose-400 leading-tight">
                {favoriteCount}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold block leading-none">Tiến Độ</span>
              <span className="text-sm font-black font-display text-amber-600 dark:text-amber-400 leading-tight">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
