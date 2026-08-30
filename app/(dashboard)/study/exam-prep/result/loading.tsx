import React from "react";

export default function ExamResultLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
      {/* Top Header Skeleton (56px) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-28 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hidden sm:block" />
          <div className="h-9 w-28 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hidden md:block" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-20 rounded-xl bg-[#0059bb]/20 dark:bg-[#0059bb]/30" />
        </div>
      </div>

      {/* MAIN REPORT CONTAINER SKELETON WITH DASHBOARD WIDTH */}
      <main className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* Exam Title Bar Skeleton */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0059bb]/20 dark:bg-[#0059bb]/30" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-4.5 w-56 rounded-md bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Hero Score Card Skeleton */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800/80 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <div className="w-12 h-6 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-48 sm:w-64 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-32 rounded-md bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-9 w-24 rounded-xl bg-emerald-500/15" />
              <div className="h-9 w-24 rounded-xl bg-amber-500/15" />
            </div>
          </div>
        </div>

        {/* 4 Metric Cards Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-16 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
