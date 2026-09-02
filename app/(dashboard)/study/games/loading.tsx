"use client";
import React from "react";

export default function GamesLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      {/* 1. APP TOP HEADER SKELETON */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <div className="w-28 h-7 rounded-lg bg-rose-600/40" />
            <div className="w-28 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="w-28 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="w-32 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 hidden sm:block" />
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 p-6 flex flex-col justify-between" />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="h-[230px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6" />
          <div className="h-[230px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6" />
        </div>
      </div>
    </div>
  );
}
