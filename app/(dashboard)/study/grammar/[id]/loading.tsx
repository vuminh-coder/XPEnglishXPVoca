"use client";
import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

export default function GrammarTopicDetailLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse" suppressHydrationWarning>
      {/* 1. AppTopHeader Skeleton (56px Baseline with 3 Action Pills & Right CTA) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="h-9 w-40 rounded-xl bg-slate-200 dark:bg-slate-800 shadow-2xs" />
        }
      >
        <HeaderPillContainer>
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. Main Studio Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        {/* Hero Compact Banner Skeleton */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 dark:bg-blue-500/10 border border-blue-500/20 shrink-0 shadow-2xs" />
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-44 sm:w-56 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-24 rounded-md bg-blue-100 dark:bg-blue-950/60" />
                </div>
                <div className="h-3.5 w-64 sm:w-80 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 w-28 h-10 flex items-center gap-2 shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-2 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Studio Skeleton */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
          {/* Memory Tip Bento Skeleton */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-slate-850 border border-blue-200/70 dark:border-blue-800/50 space-y-2 shadow-2xs">
            <div className="h-4 w-48 rounded-lg bg-blue-200/70 dark:bg-blue-900/60" />
            <div className="h-4 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Formulas 3-Column Grid Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5 h-24 shadow-2xs"
                >
                  <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Signal Words Skeleton */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2.5 shadow-2xs">
            <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-7 w-20 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs" />
              ))}
            </div>
          </div>

          {/* Exam Usages Grid Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-52 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 h-24 shadow-2xs">
                  <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
