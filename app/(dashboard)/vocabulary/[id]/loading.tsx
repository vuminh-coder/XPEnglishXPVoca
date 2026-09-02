"use client";
import React from "react";

export default function VocabDetailLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      
      {/* 0. BRAND TOP HEADER SKELETON (56px Baseline) */}
      <div className="w-full h-14 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Pill Container Skeleton */}
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1">
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="h-7 w-32 rounded-lg bg-blue-500/20" />
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-700 hidden sm:block" />
          <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-700 hidden md:block" />
        </div>

        {/* Right: Action Button Skeleton */}
        <div className="h-9 w-36 rounded-xl bg-blue-500/20" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* 1. COMPACT HERO BANNER & 4 INLINE METRICS SKELETON */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 shrink-0" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-5 w-44 sm:w-56 rounded-lg bg-slate-200 dark:bg-slate-700" />
                <div className="h-3.5 w-60 sm:w-80 rounded-md bg-slate-100 dark:bg-slate-800/80" />
              </div>
            </div>

            {/* 4 Compact Metric Cards Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 w-28"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <div className="h-2.5 w-10 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                    <div className="h-3.5 w-12 bg-slate-300 dark:bg-slate-600 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. FLASHCARD 3D STAGE SKELETON */}
        <div className="max-w-2xl mx-auto space-y-4 pt-1">
          <div className="w-full min-h-[300px] sm:min-h-[330px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <div className="h-6 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-7 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-2.5 text-center my-auto">
              <div className="h-9 w-44 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700" />
              <div className="h-4 w-28 mx-auto rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-36 mx-auto rounded-xl bg-blue-500/20" />
            </div>
            <div className="h-3.5 w-56 rounded-md bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Bottom Control Bar Skeleton */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 w-36 rounded-xl bg-blue-500/20" />
          </div>
        </div>

      </div>

    </div>
  );
}
