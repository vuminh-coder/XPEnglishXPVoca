"use client";
import React from "react";

export default function ShopLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none animate-pulse">
      {/* Shop Header & Gold Balance Bar */}
      <div className="p-5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-72 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
        <div className="p-3 rounded-xs bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-amber-400/40" />
          <div className="space-y-1">
            <div className="h-3 w-16 bg-amber-500/30 rounded-xs" />
            <div className="h-5 w-24 bg-amber-500/40 rounded-xs" />
          </div>
        </div>
      </div>

      {/* Shop Item Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4 flex flex-col justify-between h-56">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xs bg-amber-500/20 shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="h-5 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="h-4 w-full rounded-xs bg-slate-100 dark:bg-slate-800/40" />
              <div className="h-4 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/40" />
            </div>
            <div className="h-10 w-full rounded-xs bg-amber-500 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
