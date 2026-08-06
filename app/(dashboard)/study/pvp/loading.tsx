"use client";
import React from "react";

export default function PvpLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Top PVP Header Bar */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-1">
            <div className="h-5 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-28 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
      </div>

      {/* 1v1 Battle Arena Card (2 Gladiators Showcase) */}
      <div className="p-6 sm:p-8 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-6">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Player 1 Profile Card */}
          <div className="col-span-5 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5 w-full max-w-[140px]">
              <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60 mx-auto" />
            </div>
          </div>

          {/* VS Center Badge */}
          <div className="col-span-2 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-amber-500/60" />
            </div>
            <div className="h-3 w-12 rounded-xs bg-slate-200 dark:bg-slate-800 mt-2" />
          </div>

          {/* Player 2 Opponent Card */}
          <div className="col-span-5 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5 w-full max-w-[140px]">
              <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60 mx-auto" />
            </div>
          </div>
        </div>

        {/* Question & Answer Area Skeleton */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="h-6 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-12 rounded-xs bg-slate-100 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
