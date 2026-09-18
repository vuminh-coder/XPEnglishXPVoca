import React from "react";

export default function IpaLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-8 w-72 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-4 w-96 max-w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"
          />
        ))}
      </div>

      {/* Main Grid + Inspector Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sound Cards Grid (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-white/5 p-2"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Sound Inspector Sidebar (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
