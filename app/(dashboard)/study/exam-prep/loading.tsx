import React from "react";

export default function ExamPrepLoading() {
  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto animate-pulse select-none">
      {/* Hero Banner Skeleton */}
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xs w-full" />

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xs w-full max-w-md" />

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        ))}
      </div>
    </div>
  );
}
