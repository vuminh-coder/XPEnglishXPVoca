"use client";

import React from "react";
import {
  ShimmerBox,
  ShimmerCircle,
  ShimmerText,
} from "@/shared/components/feedback/ShimmerSkeleton";

export function ReviewSkeleton() {
  return (
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12"
      aria-label="Đang tải giao diện ôn tập từ vựng..."
    >
      {/* ─── 0. TOP ACTION & NAVIGATION HEADER BAR SKELETON (56px Baseline Sticky) ─── */}
      <header className="sticky top-0 z-30 w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-2xs">
        {/* Left: Mobile Sidebar Trigger + Pill Items */}
        <div className="flex items-center gap-2 min-w-0">
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 shrink-0">
            <ShimmerBox className="h-7 w-28 sm:w-32 rounded-lg bg-white dark:bg-slate-700 shadow-2xs" />
            <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg hidden md:block" />
          </div>
        </div>

        {/* Right: CTA Button + User Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ShimmerBox className="h-9 w-36 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40 hidden lg:block" />
          <ShimmerCircle className="w-8 h-8 shrink-0" />
        </div>
      </header>

      {/* ─── MAIN CANVAS CONTAINER SKELETON ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-5 space-y-4">

        {/* ─── 1. SLIM SUMMARY & STATUS ROW SKELETON (~36px) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1 pt-1">
          <div className="flex items-center gap-2.5">
            <ShimmerBox className="w-8 h-8 rounded-xl shrink-0" />
            <div className="flex items-center gap-2">
              <ShimmerText className="h-5 w-48 sm:w-64" />
              <ShimmerBox className="h-4 w-28 rounded-full hidden xs:block" />
            </div>
          </div>

          <ShimmerBox className="h-8 w-56 sm:w-72 rounded-xl" />
        </div>

        {/* ─── 2. MAIN BENTO GRID SKELETON (CALENDAR 7/12 & PROFICIENCY 5/12) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Left: Interactive Calendar Skeleton (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 h-full flex flex-col justify-between">
              <div>
                {/* Calendar Header with Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <ShimmerBox className="w-10 h-10 rounded-xl shrink-0" />
                    <div className="space-y-1.5">
                      <ShimmerText className="h-5 w-36 sm:w-44" />
                      <ShimmerText className="h-3 w-28 sm:w-36 opacity-70" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <ShimmerBox className="h-8 w-20 rounded-xl" />
                    <ShimmerBox className="h-8 w-16 rounded-xl" />
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center shrink-0 pt-2 pb-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <ShimmerText key={d} className="h-3 w-6 mx-auto" />
                  ))}
                </div>

                {/* 35 Calendar Cells Skeleton */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                  {Array.from({ length: 35 }).map((_, idx) => (
                    <ShimmerBox
                      key={idx}
                      className="h-11 sm:h-12 rounded-xl"
                    />
                  ))}
                </div>
              </div>

              {/* Calendar Legend Skeleton */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-2.5 h-2.5 rounded-md" />
                  <ShimmerText className="h-3 w-16" />
                </div>
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-2.5 h-2.5 rounded-md" />
                  <ShimmerText className="h-3 w-16" />
                </div>
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-2.5 h-2.5 rounded-full" />
                  <ShimmerText className="h-3 w-20" />
                </div>
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-2.5 h-2.5 rounded-full" />
                  <ShimmerText className="h-3 w-20" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spaced Repetition Analytics Skeleton (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs h-full flex flex-col justify-between gap-2.5 sm:gap-3">
              <div className="space-y-2 sm:space-y-2.5">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <ShimmerBox className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl shrink-0" />
                    <div className="space-y-1">
                      <ShimmerText className="h-3.5 w-32 sm:w-36" />
                      <ShimmerText className="h-2.5 w-24 opacity-70" />
                    </div>
                  </div>
                  <ShimmerText className="h-3.5 w-10" />
                </div>

                {/* Compact Apple FinTech Studio: Dual-Segment Retention Balance Strip Skeleton */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <ShimmerText className="h-2.5 w-14" />
                        <ShimmerText className="h-2.5 w-5" />
                      </div>
                      <ShimmerBox className="h-4 w-10 rounded" />
                    </div>
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <ShimmerText className="h-2.5 w-14" />
                        <ShimmerText className="h-2.5 w-5" />
                      </div>
                      <ShimmerBox className="h-4 w-10 rounded" />
                    </div>
                  </div>
                  <ShimmerBox className="h-1.5 w-full rounded-full" />
                </div>

                {/* 5 Compact Level Rows Skeleton */}
                <div className="space-y-0.5 pt-0.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div key={lvl} className="px-2 py-1 -mx-1 rounded-lg space-y-0.5">
                      <div className="flex items-center justify-between">
                        <ShimmerText className="h-2.5 w-24 sm:w-28" />
                        <ShimmerText className="h-2.5 w-14" />
                      </div>
                      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <ShimmerBox className="h-full w-3/4 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Educational SRS Tip Box */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-2">
                <ShimmerBox className="w-3.5 h-3.5 rounded mt-0.5 shrink-0" />
                <ShimmerText className="h-3 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. SELECTED DATE SECTION & LIST SKELETON ─── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          
          {/* Header Panel */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ShimmerBox className="h-5 w-16 rounded-md" />
                <ShimmerText className="h-5 w-44 sm:w-56" />
              </div>
              <ShimmerText className="h-3.5 w-56 sm:w-72" />
            </div>
            <ShimmerBox className="h-9 w-36 sm:w-44 rounded-xl" />
          </div>

          {/* Filtering Toolbar Skeleton */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <ShimmerBox className="h-9 flex-1 max-w-md rounded-xl" />
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-8 w-24 rounded-lg" />
              <ShimmerBox className="h-8 w-28 rounded-lg" />
              <ShimmerBox className="h-8 w-24 rounded-lg" />
            </div>
          </div>

          {/* Word Cards Grid Skeleton (3-4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
              <div
                key={c}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3"
              >
                <div className="flex justify-between items-center gap-2">
                  <ShimmerBox className="h-4 w-12 rounded-md" />
                  <ShimmerBox className="w-7 h-7 rounded-lg" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <ShimmerText className="h-5 w-32 sm:w-36" />
                    <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
                  </div>
                  <ShimmerText className="h-3 w-20" />
                </div>

                <div className="space-y-1">
                  <ShimmerText className="h-4 w-4/5" />
                  <ShimmerText className="h-3 w-3/5 opacity-70" />
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <ShimmerBox className="h-3 w-16" />
                  <ShimmerBox className="h-7 w-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ReviewSkeleton;
