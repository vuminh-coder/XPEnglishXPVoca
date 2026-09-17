"use client";

import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

export default function GrammarTopicDetailLoading() {
  return (
    <div
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse"
      suppressHydrationWarning
    >
      {/* 1. AppTopHeader Skeleton with Back Button & 2 Action Pills */}
      <AppTopHeader
        onBack={() => {}}
        rightDesktopContent={
          <div className="h-9 w-40 rounded-xl bg-slate-200 dark:bg-slate-800 shadow-2xs" />
        }
      >
        <HeaderPillContainer>
          <div className="h-7 w-24 rounded-lg bg-[#0059bb]/20 dark:bg-sky-400/20" />
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. Main Studio Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* Hero Compact Banner Skeleton */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[#0059bb]/10 border border-[#0059bb]/20 shrink-0 shadow-2xs" />
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-48 sm:w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="h-3.5 w-64 sm:w-96 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="h-8 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 h-14 flex items-center justify-between shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="h-2 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Studio Skeleton */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6">
          {/* Memory Tip Skeleton */}
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
                <div
                  key={i}
                  className="h-7 w-20 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs"
                />
              ))}
            </div>
          </div>

          {/* Exam Usages Grid Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-52 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 h-24 shadow-2xs"
                >
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
