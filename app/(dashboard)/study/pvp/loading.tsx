"use client";

import React from "react";

export default function PvpLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      {/* ─── APP TOP HEADER SKELETON (56px Baseline) ─── */}
      <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
        {/* Left: Navigation Pills Skeleton */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 gap-1">
            <div className="h-7 w-28 rounded-lg bg-white dark:bg-slate-700 shadow-xs" />
            <div className="h-7 w-28 rounded-lg bg-slate-200/60 dark:bg-slate-800 hidden sm:block" />
            <div className="h-7 w-28 rounded-lg bg-slate-200/60 dark:bg-slate-800 hidden md:block" />
          </div>
        </div>

        {/* Right: Actions Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 hidden sm:block" />
          <div className="h-9 w-36 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40" />
        </div>
      </div>

      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. HERO SPOTLIGHT ARENA BANNER SKELETON */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-md shadow-[#0059bb]/15 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <div className="h-5 w-28 rounded-lg bg-rose-400/30" />
                <div className="h-5 w-36 rounded-lg bg-white/20" />
              </div>
              <div className="h-6 sm:h-8 w-60 rounded-xl bg-white/30" />
              <div className="h-3.5 w-72 sm:w-96 rounded-md bg-blue-100/30" />
            </div>

            <div className="h-10 w-36 rounded-xl bg-white/20 border border-white/20 shrink-0" />
          </div>
        </div>

        {/* 2. BENTO GRID 7/12 & 5/12 SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
          {/* Left Column (7/12) */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {/* Mode Switcher Skeleton */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 gap-1">
              <div className="h-9 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
              <div className="h-9 rounded-lg bg-slate-200/60 dark:bg-slate-800" />
            </div>

            {/* Mode Selection Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-28 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[1, 2, 3].map((m) => (
                  <div key={m} className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-28 rounded bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Tier Selection Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((d) => (
                  <div key={d} className="p-3 sm:p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-2.5 w-40 rounded bg-slate-100 dark:bg-slate-800/60" />
                      </div>
                    </div>
                    <div className="h-6 w-14 rounded-lg bg-emerald-500/20" />
                  </div>
                ))}
              </div>
              <div className="pt-2 flex justify-end">
                <div className="h-11 w-full sm:w-48 rounded-xl bg-[#0059bb]/40" />
              </div>
            </div>
          </div>

          {/* Right Column (5/12) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            {/* Gladiator Profile Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="h-3.5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-12 rounded-lg bg-blue-500/20" />
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <div className="h-2.5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-16 rounded bg-slate-300 dark:bg-slate-600" />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <div className="h-2.5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-16 rounded bg-amber-400/40" />
                </div>
              </div>
            </div>

            {/* Leaderboard Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((p) => (
                  <div key={p} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-3.5 w-14 rounded bg-amber-400/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
