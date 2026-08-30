"use client";
import React from "react";

export default function SettingsLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans animate-pulse select-none">
      {/* Top Header Bar Skeleton */}
      <div className="h-14 w-full bg-white/90 dark:bg-[#0c0c0f]/90 border-b border-slate-200/90 dark:border-slate-800 rounded-xl" />

      {/* Main Settings Container */}
      <div className="max-w-3xl mx-auto space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-md">
            <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md border-b border-slate-100 dark:border-slate-800 pb-3" />
            <div className="space-y-3 pt-2">
              <div className="h-11 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
              <div className="h-11 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
