"use client";
import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-2.5 sm:space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse">
      
      {/* 0. Top Hero Announcement Banner Card Skeleton */}
      <div className="p-2.5 sm:p-3 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/30 border border-[#d5e5fe] dark:border-blue-900/40 flex flex-row items-center justify-between gap-2 shadow-2xs h-11">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-xs bg-slate-300 dark:bg-slate-800 shrink-0" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-14 rounded-xs bg-blue-600/30 dark:bg-blue-500/20 shrink-0" />
            <div className="h-4 w-40 sm:w-56 rounded-xs bg-slate-300 dark:bg-slate-800" />
          </div>
        </div>
        <div className="w-5 h-5 rounded-xs bg-slate-300 dark:bg-slate-800 shrink-0" />
      </div>

      {/* 1. Hero Header Greeting Bar Skeleton */}
      <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-5 w-44 sm:w-56 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-12 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-3.5 w-32 sm:w-48 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>
        <div className="h-9 w-full sm:w-44 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
      </div>

      {/* 1.5. 4 Hero Metric Cards Grid Skeleton (2x2 on Mobile, 4-col on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {[
          { titleWidth: "w-20", valWidth: "w-14" },
          { titleWidth: "w-24", valWidth: "w-16" },
          { titleWidth: "w-22", valWidth: "w-12" },
          { titleWidth: "w-20", valWidth: "w-16" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 min-w-0"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className={`h-3 ${item.titleWidth} rounded-xs bg-slate-100 dark:bg-slate-800/60`} />
            </div>
            <div className="space-y-1 pt-1">
              <div className={`h-6 ${item.valWidth} rounded-xs bg-slate-200 dark:bg-slate-800`} />
              <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800/60 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. MAIN BENTO GRID (Left 7/12 - Right 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* LEFT COLUMN: MAIN LEARNING HUB (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* Daily Learning Command Card Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900/40 border border-blue-200/60 dark:border-blue-800/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 w-28 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
              <div className="h-3.5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-1.5">
              <div className="h-4.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4.5 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-3 gap-1 sm:flex sm:items-center sm:gap-1.5">
              <div className="h-5 w-full sm:w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-full sm:w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-full sm:w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-blue-500/10 dark:border-white/5">
              <div className="flex-1 max-w-xs h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-9 w-full sm:w-44 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
            </div>
          </div>

          {/* Weekly Skill Analytics Chart Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="h-4.5 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="h-7 w-28 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
            </div>

            {/* 5 Tab Pills Skeleton */}
            <div className="grid grid-cols-5 gap-1 p-1 rounded-xs bg-slate-100 dark:bg-slate-800/60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 rounded-xs bg-slate-200 dark:bg-slate-700" />
              ))}
            </div>

            {/* Chart Graphic Area Skeleton */}
            <div className="h-28 sm:h-36 rounded-xs bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 p-2 flex flex-col justify-between">
              <div className="flex justify-between items-center opacity-40">
                <div className="h-2 w-8 bg-slate-300 dark:bg-slate-800 rounded-xs" />
                <div className="h-2 w-8 bg-slate-300 dark:bg-slate-800 rounded-xs" />
              </div>
              <div className="h-16 w-full rounded-xs bg-gradient-to-t from-blue-500/10 to-transparent flex items-end justify-between px-4 pb-2">
                {[40, 65, 30, 85, 50, 70, 90].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-2 rounded-t-xs bg-blue-500/20 dark:bg-blue-400/20" />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center pt-1 border-t border-slate-200/50 dark:border-white/5">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-2.5 w-8 mx-auto rounded-xs bg-slate-200 dark:bg-slate-800" />
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Check-in Route Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 py-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-2.5 w-6 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            <div className="h-9 w-full rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
          </div>

        </div>

        {/* RIGHT COLUMN: SIDEBAR WIDGETS (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Quick Access Toolbar Grid (2x2 Cards) */}
          <div className="space-y-2">
            <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-10 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                  <div className="h-4 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Tutor Quick Ask Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 flex-1 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-9 w-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Leaderboard Top 3 Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-16 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3.5 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
                </div>
              ))}
            </div>

            <div className="h-8 w-full rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>

        </div>

      </div>
    </div>
  );
}
