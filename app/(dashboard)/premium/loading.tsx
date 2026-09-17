import React from "react";

export default function PremiumLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans antialiased animate-pulse" suppressHydrationWarning>
      {/* 1. TOP HEADER SKELETON (56px Baseline) */}
      <div className="h-14 border-b border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-3 sm:px-5 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <div className="h-7 w-28 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-7 w-32 rounded-xl bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div className="h-7 w-20 rounded-xl bg-slate-200 dark:bg-slate-700 hidden md:block" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-16 rounded-xl bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div className="h-8 w-16 rounded-xl bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-6 sm:space-y-7">
        {/* HERO STAGE SKELETON */}
        <div className="h-56 sm:h-60 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-4 sm:p-5 lg:p-6 flex flex-col justify-between border border-slate-200/90 dark:border-slate-800">
          <div className="space-y-2.5 max-w-xl">
            <div className="h-5 w-40 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-8 sm:h-9 w-full rounded-xl bg-slate-300 dark:bg-slate-700" />
            <div className="h-4 w-3/4 rounded-lg bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="flex flex-wrap gap-3 pt-2.5 border-t border-slate-300/60 dark:border-slate-700/60">
            <div className="h-5 w-48 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="h-5 w-36 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>

        {/* 3 PLAN SELECTOR TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="h-4.5 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-4.5 h-4.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4.5 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        {/* SPOTLIGHT POWER HERO CARD */}
        <div className="h-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="space-y-2.5 w-1/2">
            <div className="h-5 w-44 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="w-1/3 h-32 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* 5 TEASER BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-4.5 flex flex-col justify-between ${
                i === 5 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-4.5 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-1.5">
                <div className="h-4.5 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-10 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
