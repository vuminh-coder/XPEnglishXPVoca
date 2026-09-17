"use client";

import React from "react";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

export default function LeaderboardLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            <ShimmerBox className="w-20 h-7 rounded-lg" />
            <ShimmerBox className="w-20 h-7 rounded-lg bg-amber-500/30 dark:bg-amber-500/40" />
            <ShimmerBox className="w-20 h-7 rounded-lg" />
            <ShimmerBox className="w-20 h-7 rounded-lg" />
          </div>
        </div>
        <ShimmerBox className="w-40 h-8 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40 hidden sm:block" />
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] shadow-md shadow-blue-900/20 relative overflow-hidden space-y-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="h-6 w-36 rounded-lg bg-amber-400/30" />
            <ShimmerBox className="h-6 w-32 rounded-lg bg-white/20" />
          </div>
          <ShimmerBox className="h-7 w-64 sm:w-96 rounded-lg bg-white/30" />
          <ShimmerBox className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/25" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: PODIUM & DETAILED LIST */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Period selector skeleton */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <ShimmerBox className="h-7 w-20 rounded-lg bg-white dark:bg-slate-900" />
                <ShimmerBox className="h-7 w-20 rounded-lg" />
                <ShimmerBox className="h-7 w-24 rounded-lg" />
              </div>
              <ShimmerBox className="h-7 w-48 rounded-xl hidden sm:block" />
            </div>

            {/* Top 3 Champions Podium Skeleton */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <ShimmerBox className="h-4 w-44 rounded-md bg-amber-500/30" />
                <ShimmerBox className="h-3 w-28 rounded-md" />
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-3 pb-1">
                {/* Silver */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-between space-y-2.5">
                  <ShimmerBox className="w-16 h-5 rounded-full" />
                  <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                  <ShimmerBox className="w-20 h-4 rounded-md" />
                  <ShimmerBox className="w-full h-7 rounded-lg" />
                </div>
                {/* Gold */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/40 border-2 border-amber-400 flex flex-col items-center justify-between space-y-3 relative -top-3">
                  <ShimmerBox className="w-20 h-6 rounded-full bg-amber-400/60" />
                  <ShimmerCircle size="w-12 h-12 sm:w-14 sm:h-14" className="ring-2 ring-amber-300" />
                  <ShimmerBox className="w-24 h-4 rounded-md bg-amber-400/40" />
                  <ShimmerBox className="w-full h-8 rounded-lg bg-amber-500/70" />
                </div>
                {/* Bronze */}
                <div className="p-3 sm:p-4 rounded-2xl bg-amber-900/10 dark:bg-amber-950/30 border border-amber-700/30 flex flex-col items-center justify-between space-y-2.5">
                  <ShimmerBox className="w-16 h-5 rounded-full bg-amber-700/30" />
                  <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
                  <ShimmerBox className="w-20 h-4 rounded-md" />
                  <ShimmerBox className="w-full h-7 rounded-lg bg-amber-800/40" />
                </div>
              </div>
            </div>

            {/* Ranks 4+ Detailed Table Rows Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <ShimmerBox className="h-4 w-36 rounded-md" />
              <div className="space-y-2">
                {[4, 5, 6, 7].map((rank) => (
                  <div
                    key={rank}
                    className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <ShimmerBox className="w-7 h-7 rounded-lg" />
                      <ShimmerCircle size="w-9 h-9" />
                      <div className="space-y-1">
                        <ShimmerBox className="h-4 w-32 rounded-md" />
                        <ShimmerBox className="h-3 w-20 rounded-md" />
                      </div>
                    </div>
                    <ShimmerBox className="h-5 w-16 rounded-md bg-blue-500/20" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Widget 1: Your Status Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <ShimmerCircle size="w-11 h-11" />
                <div className="space-y-1 flex-1">
                  <ShimmerBox className="h-4 w-28 rounded-md" />
                  <ShimmerBox className="h-3 w-20 rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ShimmerBox className="h-16 rounded-xl" />
                <ShimmerBox className="h-16 rounded-xl" />
              </div>

              <ShimmerBox className="h-9 w-full rounded-xl bg-[#0059bb]/30" />
            </div>

            {/* Widget 2: Weekly Rewards Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
              <ShimmerBox className="h-4 w-40 rounded-md" />
              <div className="space-y-2">
                <ShimmerBox className="h-8 w-full rounded-lg" />
                <ShimmerBox className="h-8 w-full rounded-lg" />
                <ShimmerBox className="h-8 w-full rounded-lg" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
