import React from "react";

export default function PremiumCheckoutLoading() {
  return (
    <div className="space-y-6 pb-28 font-sans antialiased animate-pulse" suppressHydrationWarning>
      {/* 1. TOP HEADER SKELETON (56px Baseline) */}
      <div className="h-14 border-b border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-3 sm:px-5 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-32 rounded-xl bg-slate-200 dark:bg-slate-800 hidden sm:block" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 hidden lg:block" />
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 hidden lg:block" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 2. MAIN CONTAINER SKELETON (SPLIT 5/12 & 7/12) */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5/12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 space-y-4">
              <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="h-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Right Column (7/12) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-[520px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* QR Box Skeleton */}
              <div className="h-60 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <div className="w-48 h-48 rounded-xl bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Input Rows Skeleton */}
              <div className="space-y-2">
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>

              {/* Submit CTA Skeleton */}
              <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
