"use client";
import React from "react";

export default function StudyLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      {/* 1. APP TOP HEADER SKELETON */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <div className="w-24 h-7 rounded-lg bg-blue-600/40" />
            <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="w-24 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="w-32 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 hidden sm:block" />
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* Hero banner skeleton */}
        <div className="h-44 sm:h-48 rounded-2xl bg-slate-200 dark:bg-slate-800 p-6 flex flex-col justify-between" />

        {/* 3-column grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="w-20 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
