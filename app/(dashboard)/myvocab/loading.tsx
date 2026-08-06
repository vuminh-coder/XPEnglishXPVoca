"use client";
import React from "react";

export default function MyVocabLoading() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Top Header & Search Filter Bar */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-6 w-52 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-72 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-28 rounded-xs bg-emerald-500/20" />
            <div className="h-9 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
      </div>

      {/* Vocabulary Cards List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <div className="h-6 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="w-8 h-8 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
            <div className="h-4 w-5/6 rounded-xs bg-slate-200/80 dark:bg-slate-800/80" />
            <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="h-3 w-full rounded-xs bg-slate-200/60 dark:bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
