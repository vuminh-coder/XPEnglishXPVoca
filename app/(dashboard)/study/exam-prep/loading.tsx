import React from "react";

export default function ExamPrepLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
      {/* 1. TOP HEADER SKELETON (56px) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <div className="h-7 w-28 sm:w-32 rounded-lg bg-rose-500/20 dark:bg-rose-500/10" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden sm:block" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden md:block" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden lg:block" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="h-9 w-32 sm:w-36 rounded-xl bg-amber-400/20 dark:bg-amber-400/10 border border-amber-300/30" />
        </div>
      </div>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1 pb-16 md:pb-6">
        
        {/* Hero Bento Banner Skeleton */}
        <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-3.5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-5 w-28 rounded-md bg-rose-500/20 dark:bg-rose-500/10" />
                <div className="h-6 sm:h-7 w-48 sm:w-64 rounded-xl bg-slate-200/80 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-44 sm:w-80 rounded-md bg-slate-200/60 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shrink-0 w-full sm:w-auto h-10">
              <div className="h-8 rounded-lg bg-[#0059bb]/20 dark:bg-[#0059bb]/10" />
              <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-slate-700/50" />
            </div>
          </div>

          {/* 4-Skill Matrix Filter Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-48 rounded-md bg-slate-200/70 dark:bg-slate-800" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              <div className="h-11 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40" />
              <div className="h-11 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40" />
              <div className="h-11 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40" />
              <div className="h-11 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/40" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Search Input Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="grid grid-cols-5 sm:flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 w-full sm:w-auto h-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 rounded-lg bg-slate-200/60 dark:bg-slate-700/50" />
            ))}
          </div>
          <div className="h-9 w-full sm:w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />
        </div>

        {/* Exam Cards Grid Skeleton (6 cards, matching 3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-24 rounded-md bg-rose-500/15" />
                  <div className="h-3 w-16 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                </div>
                <div className="h-5 w-4/5 rounded-lg bg-slate-200/90 dark:bg-slate-700" />
                <div className="h-3.5 w-full rounded-md bg-slate-100 dark:bg-slate-800" />
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="h-3.5 w-24 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                <div className="h-8 w-24 rounded-xl bg-[#0059bb]/20 dark:bg-[#0059bb]/10" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
