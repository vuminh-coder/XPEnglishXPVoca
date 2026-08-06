"use client";
import React from "react";

export default function GrammarLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans animate-pulse">
      
      {/* 1. HERO BENTO BANNER CARD SKELETON */}
      <div className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-5 w-48 sm:w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-20 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
              </div>
              <div className="h-3.5 w-64 sm:w-80 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
            </div>
          </div>

          <div className="h-9 w-full sm:w-44 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
        </div>

        {/* Hero 4 Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1 border-t border-slate-100 dark:border-white/5">
          {[
            { valW: "w-16" },
            { valW: "w-12" },
            { valW: "w-12" },
            { valW: "w-12" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="h-2.5 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className={`h-4 ${item.valW} rounded-xs bg-slate-300 dark:bg-slate-700`} />
              </div>
              <div className="w-6 h-6 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
            </div>
          ))}
        </div>

      </div>

      {/* 2. SPLIT BAR TABS & SEARCH BAR SKELETON */}
      <div className="p-1 sm:p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        {/* Level Tabs selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xs w-full sm:w-auto">
          <div className="h-7 w-16 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
          <div className="h-7 w-24 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-7 w-24 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-7 w-28 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>

        {/* Search Box */}
        <div className="h-8 sm:h-9 w-full sm:w-72 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 shrink-0" />
      </div>

      {/* 3. GRAMMAR TOPICS BENTO GRID SKELETON (6-9 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            {/* Header: Icon + Title */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-blue-500/20 dark:bg-blue-400/20 shrink-0" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-1/2 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
                <div className="h-4 w-12 rounded-xs bg-blue-600/20 dark:bg-blue-400/20 shrink-0" />
              </div>

              {/* Desc snippet */}
              <div className="space-y-1 pt-1">
                <div className="h-3 w-full rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-3 w-4/5 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>

            {/* Footer: Progress + Action CTA */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-3.5 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
              </div>
              <div className="h-8 w-24 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
