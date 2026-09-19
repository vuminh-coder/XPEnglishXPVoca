import React from "react";
import { ShimmerBox, ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";

export default function IpaStudioLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. Top Header Skeleton 56px Twin */}
      <div className="h-14 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-white/5">
          <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg" />
          <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg" />
          <ShimmerBox className="h-7 w-32 sm:w-36 rounded-lg hidden sm:block" />
        </div>
        <div className="flex items-center gap-2">
          <ShimmerBox className="h-9 w-20 rounded-xl" />
          <ShimmerBox className="h-9 w-20 rounded-xl" />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. Hero Greeting Skeleton */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <ShimmerCircle size="w-12 h-12 sm:w-13 sm:h-13" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-6 w-52 rounded-md" />
                  <ShimmerBox className="h-5 w-24 rounded-md" />
                </div>
                <ShimmerBox className="h-4 w-72 max-w-full rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-9 w-32 rounded-xl" />
              <ShimmerBox className="h-9 w-28 rounded-xl" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 4 Bento Metric Cards Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
              >
                <ShimmerBox className="w-10 h-10 rounded-xl shrink-0" />
                <div className="space-y-1 flex-1">
                  <ShimmerBox className="h-5 w-20 rounded" />
                  <ShimmerBox className="h-3 w-28 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main Matrix Cards Grid Skeleton */}
        <div className="space-y-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
            <ShimmerBox className="h-6 w-60 rounded-md" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 p-1"
                >
                  <div className="h-full bg-white dark:bg-slate-900 rounded-xl" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pt-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 p-1"
                >
                  <div className="h-full bg-white dark:bg-slate-900 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
