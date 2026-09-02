"use client";
import React from "react";

export default function VocabularyLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      
      {/* 0. BRAND TOP HEADER SKELETON (56px Baseline) */}
      <div className="w-full h-14 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Pill Container Skeleton */}
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1">
          <div className="h-7 w-32 rounded-lg bg-blue-500/20" />
          <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-700 hidden sm:block" />
          <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-700 hidden md:block" />
        </div>

        {/* Right: Action Button Skeleton */}
        <div className="h-9 w-44 rounded-xl bg-blue-500/20" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* 1. HERO STUDIO TOOLBAR SKELETON */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 shrink-0" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-6 w-64 sm:w-80 rounded-lg bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-72 sm:w-96 rounded-md bg-slate-100 dark:bg-slate-800/80" />
              </div>
            </div>

            {/* Search Input Dock Skeleton */}
            <div className="h-10 w-full lg:w-80 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shrink-0" />
          </div>
        </div>

        {/* 2. TOP BENTO STATS BAR SKELETON (4 CLEAN DOUBLE-BEZEL METRIC CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between min-h-[92px]"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
              </div>
              <div className="mt-2.5">
                <div className="h-7 w-28 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>

        {/* 3. MAIN BENTO THEMES GRID SKELETON (16 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3.5 h-full min-h-[140px]"
            >
              {/* Card Header: Icon + Title + Trailing Arrow */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 shrink-0" />
                  <div className="min-w-0 space-y-1.5 flex-1">
                    <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
              </div>

              {/* Card Footer: Clean Level Pill & Progress Percentage */}
              <div className="space-y-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-14 rounded-md bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-10 rounded-md bg-blue-500/20" />
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500/30 dark:bg-blue-500/40"
                    style={{ width: `${((i % 5) + 1) * 20}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
