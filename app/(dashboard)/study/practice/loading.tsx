"use client";

import React from "react";

export default function PracticeLoading() {
  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden animate-pulse">
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-2 sm:py-3.5 min-h-0">
        {/* 1. Top Studio Bar Skeleton */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 h-3.5 sm:h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800" />
            <div className="h-8 w-16 rounded-xl bg-slate-200/80 dark:bg-slate-800" />
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800" />
          </div>
        </div>

        {/* 2. Sub-Mode Selector Tabs Skeleton */}
        <div className="flex items-center justify-center shrink-0 py-0.5">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-[32px] sm:h-[34px] w-24 sm:w-28 rounded-xl ${
                  i === 1
                    ? "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60"
                    : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Main Studio Arena Skeleton (3D Companion + 2x2 Options) */}
        <div className="flex-1 flex flex-col justify-center min-h-0 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
            <div className="w-16 h-22 sm:w-20 sm:h-28 lg:w-24 lg:h-32 rounded-2xl bg-slate-200/70 dark:bg-slate-800 shrink-0" />
            <div className="flex-1 h-20 sm:h-24 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-6 w-[1.5px] bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-28 rounded-md bg-slate-200/80 dark:bg-slate-800" />
                <div className="h-7 w-44 rounded-lg bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-y-3 gap-x-4 sm:gap-x-6 md:gap-x-8 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-h-[52px] sm:min-h-[58px] lg:min-h-[62px] rounded-2xl border-2 border-b-[5px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-5 flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-4 w-2/3 rounded-md bg-slate-200/90 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Bottom Action Bar Skeleton */}
        <div className="pt-2.5 pb-2.5 sm:pt-3.5 sm:pb-3.5 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between gap-3 shrink-0">
          <div className="h-9 w-20 rounded-xl bg-slate-200/70 dark:bg-slate-800" />
          <div className="h-10 sm:h-11 w-44 sm:w-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
