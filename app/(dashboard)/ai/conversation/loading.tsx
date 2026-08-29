"use client";
import React from "react";

export default function AiConversationLoading() {
  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
      {/* 1. TOP HEADER SKELETON */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5">
            <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="h-7 w-28 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-20 rounded-xl bg-amber-500/20 dark:bg-amber-500/10" />
          <div className="h-9 w-24 rounded-xl bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN VIEWPORT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        
        {/* 2.1. Slim Topic Hero Status Card Skeleton */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-4 w-44 sm:w-64 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-32 sm:w-48 rounded-md bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>
        </div>

        {/* 2.2. Main Bento Grid (8/12 - 4/12) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
          
          {/* Cột Trái (8/12) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2.5">
              
              {/* Header Box */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="h-4 w-40 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
              </div>

              {/* Chat Stream Skeleton */}
              <div className="flex-1 min-h-[280px] lg:min-h-0 space-y-3 p-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 w-3/4 space-y-2">
                    <div className="h-3.5 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3.5 w-4/5 rounded-md bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 justify-end">
                  <div className="p-3 rounded-xl bg-blue-500/20 dark:bg-blue-500/10 w-2/3 space-y-1.5">
                    <div className="h-3.5 w-full rounded-md bg-blue-500/30" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                </div>
              </div>

              {/* Input Dock Skeleton */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 shrink-0" />
                  <div className="h-9 flex-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
                  <div className="h-9 w-16 rounded-lg bg-blue-500/20 shrink-0" />
                </div>
              </div>

            </div>
          </div>

          {/* Cột Phải (4/12) */}
          <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 space-y-3">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5">
                  <div className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50" />
                  <div className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50" />
                  <div className="h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5">
                  <div className="h-8 rounded-lg bg-slate-50 dark:bg-slate-800/50" />
                  <div className="h-8 rounded-lg bg-slate-50 dark:bg-slate-800/50" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
