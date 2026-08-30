"use client";
import React from "react";

export default function StudyRoomsLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans animate-pulse select-none">
      {/* Top Header Bar Skeleton */}
      <div className="h-14 w-full bg-white/90 dark:bg-[#0c0c0f]/90 border-b border-slate-200/90 dark:border-slate-800 rounded-xl" />

      {/* Category Pills Skeleton */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>

      {/* Room Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-blue-500/20 rounded-lg" />
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded-md" />
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-9 w-24 bg-blue-600/30 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
