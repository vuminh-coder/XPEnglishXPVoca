"use client";

import React from "react";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200 animate-pulse">
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
          <div className="h-9 w-20 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 hidden sm:block" />
          <div className="h-9 w-28 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* 1. HERO SPOTLIGHT BANNER SKELETON */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-lg shadow-[#0059bb]/15 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 border-2 border-white/30 shrink-0" />
              <div className="space-y-2.5 min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-6 sm:h-8 w-44 rounded-xl bg-white/30" />
                  <div className="h-5 w-24 rounded-lg bg-sky-300/30" />
                </div>
                <div className="h-4 w-56 sm:w-72 rounded-lg bg-blue-100/30" />
                <div className="h-3 w-36 rounded-lg bg-blue-200/20" />
              </div>
            </div>

            <div className="h-12 w-48 rounded-xl bg-black/25 border border-white/15 shrink-0" />
          </div>
        </div>

        {/* 2. TOP 4 BENTO METRIC STAGE CARDS SKELETON */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
              </div>
              <div className="space-y-2">
                <div className="h-7 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        {/* 3. BENTO GRID 8/12 & 4/12 SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (8/12) */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            {/* 5 Skill Meters Skeleton */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2 text-center"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 mx-auto" />
                    <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-800 mx-auto" />
                    <div className="h-4 w-10 rounded bg-slate-300 dark:bg-slate-700 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Skeleton */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-44 rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {[1, 2, 3, 4].map((a) => (
                  <div
                    key={a}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-800/60" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4/12) */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            {/* Level Breakdown Skeleton */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-12 rounded-lg bg-blue-500/20" />
              </div>
              <div className="space-y-2.5">
                <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            {/* Quick Links Skeleton */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
              <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 pb-3" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((l) => (
                  <div key={l} className="h-11 w-full rounded-xl bg-slate-50 dark:bg-slate-800/60" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
