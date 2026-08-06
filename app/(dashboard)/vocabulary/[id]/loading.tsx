"use client";
import React from "react";

export default function VocabDetailLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-6 select-none animate-pulse">
      {/* Top Header Card Skeleton */}
      <div className="p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          <div className="h-9 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-xs bg-slate-100 dark:bg-slate-800/50" />
          ))}
        </div>
      </div>

      {/* Tabs & Word Grid Skeleton */}
      <div className="h-10 w-80 rounded-xs bg-slate-200 dark:bg-slate-900/60" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 rounded-xs bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 p-4 space-y-3"
          >
            <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-xs" />
            <div className="h-3.5 w-24 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  );
}
