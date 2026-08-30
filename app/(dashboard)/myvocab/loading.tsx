"use client";
import React from "react";

export default function MyVocabLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans animate-pulse select-none">
      {/* Top Header Bar Skeleton */}
      <div className="h-14 w-full bg-white/90 dark:bg-[#0c0c0f]/90 border-b border-slate-200/90 dark:border-slate-800 rounded-xl" />

      {/* 4 Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-md">
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="w-9 h-9 rounded-xl bg-blue-500/20" />
            </div>
            <div className="h-7 w-16 bg-slate-300 dark:bg-slate-700 rounded-lg" />
            <div className="h-3.5 w-32 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
          </div>
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md">
        <div className="h-11 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
      </div>

      {/* Word Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-md">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <div className="h-6 w-36 bg-blue-500/20 rounded-lg" />
                <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
            </div>
            <div className="h-4 w-5/6 bg-slate-300 dark:bg-slate-700 rounded-md" />
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-8 w-24 bg-blue-600/30 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
