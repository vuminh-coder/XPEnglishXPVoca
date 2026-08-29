"use client";
import React from "react";

export default function PracticeLoading() {
  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
      {/* 1. TOP HEADER SKELETON */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5">
            <div className="h-7 w-28 rounded-lg bg-[#0059bb]/20 dark:bg-[#0059bb]/10" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden sm:block" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden md:block" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hidden lg:block" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="h-8 sm:h-9 w-18 sm:w-20 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60" />
          <div className="h-8 sm:h-9 w-18 sm:w-20 rounded-xl bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/20" />
          <div className="h-8 sm:h-9 w-18 sm:w-20 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/10 border border-emerald-500/20" />
          <div className="h-8 sm:h-9 w-22 sm:w-24 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN VIEWPORT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        
        {/* 2.1. Sub-mode Segmented Toolbar Skeleton */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 shrink-0">
          <div className="grid grid-cols-4 sm:flex sm:items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 w-full sm:w-auto">
            <div className="h-7 w-full sm:w-28 rounded-md bg-[#0059bb]/20 dark:bg-[#0059bb]/10" />
            <div className="h-7 w-full sm:w-28 rounded-md bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-7 w-full sm:w-28 rounded-md bg-slate-200/70 dark:bg-slate-700/60" />
            <div className="h-7 w-full sm:w-28 rounded-md bg-slate-200/70 dark:bg-slate-700/60" />
          </div>
          <div className="hidden sm:flex items-center gap-3 pr-2">
            <div className="h-4 w-24 rounded-md bg-slate-200/80 dark:bg-slate-700/60" />
            <div className="w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* 2.2. Main Bento Grid (8/12 Left - 4/12 Right) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
          
          {/* Cột Trái: Practice Arena (8/12) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-3">
              
              {/* Arena Sub-Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded-md bg-[#0059bb]/15" />
                  <div className="h-4 w-48 rounded-md bg-slate-200/80 dark:bg-slate-700/60 hidden sm:block" />
                </div>
                <div className="h-7 w-20 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60" />
              </div>

              {/* Target Prompt Word Card (min-h-[160px] sm:min-h-[185px] rounded-2xl) */}
              <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs">
                {/* Top Row */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-24 rounded-md bg-[#0059bb]/15" />
                    <div className="h-5 w-20 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                    <div className="h-5 w-10 rounded-md bg-amber-500/15" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-14 rounded-lg bg-slate-200/80 dark:bg-slate-800" />
                    <div className="h-7 w-7 rounded-lg bg-slate-200/80 dark:bg-slate-800" />
                  </div>
                </div>

                {/* Centerpiece Word + IPA */}
                <div className="py-3 text-center space-y-2 flex flex-col items-center justify-center my-auto">
                  <div className="h-9 sm:h-11 w-52 rounded-xl bg-slate-200/90 dark:bg-slate-700" />
                  <div className="h-4 w-32 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 text-xs">
                  <div className="h-4 w-36 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                  <div className="h-5 w-24 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                </div>
              </div>

              {/* 4 Answer Choice Buttons (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 h-13 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="w-7 h-7 rounded-lg bg-slate-200/80 dark:bg-slate-700 shrink-0" />
                      <div className="h-4 w-3/4 rounded-md bg-slate-200/80 dark:bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Nav Row */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 shrink-0">
                <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60" />
                <div className="h-9 w-32 rounded-xl bg-[#0059bb]/20 dark:bg-[#0059bb]/10" />
              </div>

            </div>
          </div>

          {/* Cột Phải: Word Lab & Insights (4/12) */}
          <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3 lg:h-full lg:min-h-0 space-y-3">
              
              <div className="space-y-2.5 shrink-0">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="h-4 w-36 rounded-md bg-[#0059bb]/20" />
                  <div className="h-6 w-18 rounded-md bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-36 rounded-md bg-slate-200/90 dark:bg-slate-700" />
                    <div className="h-4 w-12 rounded-md bg-blue-500/20" />
                  </div>
                  <div className="h-3.5 w-28 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                  <div className="h-4 w-48 rounded-md bg-slate-200/80 dark:bg-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-36 rounded-md bg-[#0059bb]/20" />
                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="h-3.5 w-full rounded-md bg-slate-200/80 dark:bg-slate-700" />
                  <div className="h-3.5 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="h-10 rounded-xl bg-[#0059bb]/10 dark:bg-[#0059bb]/5 border border-[#0059bb]/20" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
