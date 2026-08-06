"use client";
import React from "react";

export default function FriendsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Top Search Friend Bar */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>
          <div className="h-9 w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
      </div>

      {/* Friends Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
            <div className="h-8 w-24 rounded-xs bg-[#0059bb] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
