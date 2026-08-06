"use client";
import React from "react";

export default function GamesLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Top Mini Games Header */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="h-6 w-52 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-72 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
        <div className="h-9 w-32 rounded-xs bg-rose-500/20 border border-rose-500/30" />
      </div>

      {/* Mini Game Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4 flex flex-col justify-between h-64">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xs bg-rose-500/20 border border-rose-500/30 shrink-0" />
              <div className="h-6 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full rounded-xs bg-slate-100 dark:bg-slate-800/40" />
              <div className="h-4 w-4/5 rounded-xs bg-slate-100 dark:bg-slate-800/40" />
            </div>
            <div className="h-10 w-full rounded-xs bg-rose-600 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
