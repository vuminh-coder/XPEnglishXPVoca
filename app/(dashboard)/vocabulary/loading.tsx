"use client";
import React from "react";

export default function VocabularyLoading() {
  return (
    <div className="space-y-2.5 sm:space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans animate-pulse">
      
      {/* 1. TOP MICRO-HERO TOOLBAR SKELETON */}
      <div className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-xs bg-blue-600/10 text-blue-600 shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-44 sm:w-56 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-16 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
            </div>
            <div className="h-3 w-64 sm:w-80 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
          </div>
        </div>

        {/* Search Input Dock Skeleton */}
        <div className="h-8 sm:h-9 w-full md:w-72 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 shrink-0" />
      </div>

      {/* 2. TOP BENTO STATS BAR SKELETON (4-COLUMN CARDS GRID) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
        {[
          { titleW: "w-20", valW: "w-16" },
          { titleW: "w-24", valW: "w-20" },
          { titleW: "w-22", valW: "w-18" },
          { titleW: "w-20", valW: "w-16" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-2 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2 sm:gap-3 min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="min-w-0 space-y-1 flex-1">
              <div className={`h-2.5 ${item.titleW} rounded-xs bg-slate-100 dark:bg-slate-800/60`} />
              <div className={`h-4 ${item.valW} rounded-xs bg-slate-200 dark:bg-slate-800`} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. MAIN BENTO THEMES GRID SKELETON (4-COLUMN CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div
            key={i}
            className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-2 sm:space-y-3 h-full min-h-[110px]"
          >
            {/* Card Header: Icon + Title inline row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/10 shrink-0" />
                <div className="min-w-0 space-y-1 flex-1">
                  <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="w-4 h-4 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0 mt-1" />
            </div>

            {/* Stats & Progress Footer */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-3 w-8 rounded-xs bg-blue-600/30 dark:bg-blue-400/30" />
              </div>

              <div className="h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600/40 dark:bg-blue-500/40"
                  style={{ width: `${(i % 5 + 1) * 20}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
