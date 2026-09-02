import React from "react";

export default function PremiumLoading() {
  return (
    <div className="space-y-8 pb-28 font-sans antialiased animate-pulse" suppressHydrationWarning>
      {/* 1. TOP HEADER SKELETON (56px Baseline) */}
      <div className="h-14 border-b border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-3 sm:px-5 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <div className="h-7 w-32 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-7 w-32 rounded-xl bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div className="h-7 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 hidden md:block" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 hidden lg:block" />
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 hidden lg:block" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-10">
        {/* HERO STAGE SKELETON */}
        <div className="h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-6 sm:p-10 flex flex-col justify-between">
          <div className="space-y-3 max-w-xl">
            <div className="h-6 w-44 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-12 w-full rounded-2xl bg-slate-300 dark:bg-slate-700" />
            <div className="h-4 w-3/4 rounded-lg bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-300/60 dark:border-slate-700/60">
            <div className="h-5 w-52 rounded-xl bg-slate-300 dark:bg-slate-700" />
            <div className="h-5 w-40 rounded-xl bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>

        {/* 3 PLAN SELECTOR TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        {/* SPOTLIGHT POWER HERO CARD */}
        <div className="h-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex items-center justify-between">
          <div className="space-y-3 w-1/2">
            <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="w-1/3 h-40 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* 5 TEASER BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between ${
                i === 5 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
