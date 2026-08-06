"use client";
import React from "react";

export default function LeaderboardLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Leaderboard Top Header */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xs bg-slate-100 dark:bg-slate-800/60">
          <div className="h-7 w-20 rounded-xs bg-amber-500/20" />
          <div className="h-7 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Top 3 Champions Bento Podium Showcase */}
      <div className="p-5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
        <div className="w-36 h-5 bg-slate-200 dark:bg-slate-800 rounded-xs mx-auto" />
        <div className="flex items-end justify-center gap-3 sm:gap-6 h-48 sm:h-52 pt-4">
          {/* Rank 2 Silver */}
          <div className="w-24 sm:w-28 h-32 sm:h-36 bg-slate-100 dark:bg-slate-800/60 rounded-t-xs flex flex-col items-center justify-between p-3">
            <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-xs" />
          </div>
          {/* Rank 1 Gold */}
          <div className="w-28 sm:w-32 h-40 sm:h-44 bg-amber-500/10 border border-amber-500/30 rounded-t-xs flex flex-col items-center justify-between p-3">
            <div className="w-12 h-12 rounded-full bg-amber-400/40" />
            <div className="h-4 w-20 bg-amber-500/30 rounded-xs" />
          </div>
          {/* Rank 3 Bronze */}
          <div className="w-24 sm:w-28 h-28 sm:h-32 bg-slate-100 dark:bg-slate-800/60 rounded-t-xs flex flex-col items-center justify-between p-3">
            <div className="w-10 h-10 rounded-full bg-amber-700/30" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-xs" />
          </div>
        </div>
      </div>

      {/* Ranks 4-10 Leaderboard Table Rows */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        {[4, 5, 6, 7, 8].map((rank) => (
          <div key={rank} className="p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-6 text-xs font-bold text-slate-400">{rank}</div>
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1">
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
            <div className="h-6 w-20 rounded-xs bg-amber-500/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
