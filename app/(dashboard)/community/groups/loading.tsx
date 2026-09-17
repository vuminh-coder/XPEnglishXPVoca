"use client";

import React from "react";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

export default function GroupsLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            <ShimmerBox className="w-20 h-7 rounded-lg" />
            <ShimmerBox className="w-20 h-7 rounded-lg" />
            <ShimmerBox className="w-20 h-7 rounded-lg" />
            <ShimmerBox className="w-20 h-7 rounded-lg bg-indigo-500/30 dark:bg-indigo-500/40" />
          </div>
        </div>
        <ShimmerBox className="w-40 h-8 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40 hidden sm:block" />
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO GROUPS BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#312e81] shadow-md shadow-blue-900/20 relative overflow-hidden space-y-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="h-6 w-36 rounded-lg bg-indigo-300/30" />
            <ShimmerBox className="h-6 w-44 rounded-lg bg-indigo-400/25" />
          </div>
          <ShimmerBox className="h-7 w-64 sm:w-80 rounded-lg bg-white/30" />
          <ShimmerBox className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/25" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: GROUPS DIRECTORY */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              
              {/* Header with Sub-tabs & Create Group Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden">
                  <ShimmerBox className="h-7 w-24 rounded-lg bg-white dark:bg-slate-900" />
                  <ShimmerBox className="h-7 w-24 rounded-lg" />
                  <ShimmerBox className="h-7 w-28 rounded-lg" />
                  <ShimmerBox className="h-7 w-28 rounded-lg" />
                </div>
                <ShimmerBox className="h-7 w-28 rounded-md" />
              </div>

              {/* 2x2 Grid Group Cards Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <ShimmerCircle size="w-10 h-10 rounded-xl" />
                        <ShimmerBox className="w-24 h-5 rounded-lg bg-indigo-500/20" />
                      </div>
                      <ShimmerBox className="w-36 h-4 rounded-md" />
                      <ShimmerBox className="w-full h-3 rounded-md" />
                      <ShimmerBox className="w-4/5 h-3 rounded-md" />
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <ShimmerBox className="w-20 h-3 rounded" />
                      <ShimmerBox className="w-24 h-7 rounded-xl bg-[#0059bb]/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Widget 1: My Joined Groups Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <ShimmerBox className="w-8 h-8 rounded-xl bg-indigo-500/20" />
                <ShimmerBox className="h-4 w-36 rounded-md" />
              </div>

              <div className="space-y-2">
                {[1, 2].map((g) => (
                  <div
                    key={g}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                  >
                    <ShimmerBox className="h-3.5 w-32 rounded-md" />
                    <ShimmerBox className="h-4 w-12 rounded-md bg-indigo-500/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Requirement Info Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs space-y-2">
              <ShimmerBox className="h-4 w-36 rounded-md bg-amber-500/30" />
              <ShimmerBox className="h-3.5 w-full rounded-md bg-amber-500/20" />
              <ShimmerBox className="h-3.5 w-4/5 rounded-md bg-amber-500/20" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
