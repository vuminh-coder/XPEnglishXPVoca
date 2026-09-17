"use client";
import React from "react";
import { Flame, BookmarkCheck, Clock, Target, Trophy } from "lucide-react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface AnalyticsMetricsBarProps {
  isLoading: boolean;
  longestStreak: number;
  savedWords: number;
  minutesStudied: string;
  totalXp: string;
  weeklyRank: string;
}

export const AnalyticsMetricsBar: React.FC<AnalyticsMetricsBarProps> = ({
  isLoading,
  longestStreak,
  savedWords,
  minutesStudied,
  totalXp,
  weeklyRank,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
      {/* CARD 1: STREAK */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-700/50">
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
          <Flame className="w-5 h-5 fill-amber-400 text-amber-500" />
        </div>
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <ShimmerBox className="h-5 w-16 rounded-lg my-0.5" />
          ) : (
            <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
              {longestStreak} <span className="text-xs font-bold text-slate-500 font-sans">ngày</span>
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
            Chuỗi dài nhất
          </div>
        </div>
      </div>

      {/* CARD 2: SAVED WORDS */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/50">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0 shadow-2xs">
          <BookmarkCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <ShimmerBox className="h-5 w-16 rounded-lg my-0.5" />
          ) : (
            <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
              {savedWords} <span className="text-xs font-bold text-slate-500 font-sans">từ</span>
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
            Vốn từ đã tích lũy
          </div>
        </div>
      </div>

      {/* CARD 3: PRACTICE TIME */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-700/50">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
          <Clock className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <ShimmerBox className="h-5 w-14 rounded-lg my-0.5" />
          ) : (
            <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
              {minutesStudied}
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
            Thời gian học
          </div>
        </div>
      </div>

      {/* CARD 4: TOTAL XP */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-purple-300 dark:hover:border-purple-700/50">
        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
          <Target className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <ShimmerBox className="h-5 w-20 rounded-lg my-0.5" />
          ) : (
            <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
              {totalXp}
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
            Tổng điểm tích lũy
          </div>
        </div>
      </div>

      {/* CARD 5: WEEKLY RANK */}
      <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-700/50">
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <ShimmerBox className="h-5 w-16 rounded-lg my-0.5" />
          ) : (
            <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
              {weeklyRank} <span className="text-xs font-bold text-slate-500 font-sans">Tuần</span>
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
            Hạng của bạn
          </div>
        </div>
      </div>
    </div>
  );
};
