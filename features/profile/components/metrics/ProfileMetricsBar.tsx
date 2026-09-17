"use client";

import React from "react";
import { BookmarkCheck, Flame, Zap, Coins } from "lucide-react";

interface ProfileMetricsBarProps {
  wordsCount: number;
  vocabPercent: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  xpCurrent: number;
  xpTotal: number;
  xpPercent: number;
  coins: number;
  streakFreezes: number;
}

export const ProfileMetricsBar: React.FC<ProfileMetricsBarProps> = ({
  wordsCount,
  vocabPercent,
  currentStreak,
  longestStreak,
  totalXp,
  level,
  xpCurrent,
  xpTotal,
  xpPercent,
  coins,
  streakFreezes,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
      {/* Card 1: Words Learned */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            Từ Vựng Tích Lũy
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <BookmarkCheck className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white tabular-nums">
              {wordsCount}
            </span>
            <span className="text-xs font-bold text-slate-400 font-sans">/ 3,903 từ</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
            <span>Kho từ</span>
            <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">{vocabPercent}%</span>
          </div>
          <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-500"
              style={{ width: `${vocabPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 2: Streak */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            Chuỗi Streak
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <Flame className="w-4 h-4 fill-amber-500 stroke-none animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500 tabular-nums">
              {currentStreak}
            </span>
            <span className="text-xs font-bold text-slate-500 font-sans">ngày</span>
          </div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
            <span>Kỷ lục cao nhất:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
              {longestStreak} ngày
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: XP & Level */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            Kinh Nghiệm (XP)
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <Zap className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white tabular-nums">
              {totalXp}
            </span>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">XP</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
            <span>Lên LV.{level + 1}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
              {xpCurrent}/{xpTotal} XP
            </span>
          </div>
          <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 4: Gold & Streak Freeze (Styled in Amber Palette matching /analytics) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            Vàng & Bảo Hộ
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center shrink-0 shadow-2xs">
            <Coins className="w-4 h-4 text-amber-500 stroke-[2.2]" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-amber-500 tabular-nums">
              {coins}
            </span>
            <span className="text-xs font-bold text-slate-500 font-sans">Vàng</span>
          </div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
            <span>Bảo hộ Streak:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
              {streakFreezes} vật phẩm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
