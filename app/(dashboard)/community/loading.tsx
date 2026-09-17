"use client";

import React from "react";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

export default function CommunityLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            <ShimmerBox className="w-20 h-7 rounded-lg bg-[#0059bb]/30 dark:bg-[#0059bb]/40" />
            <ShimmerBox className="w-20 h-7 rounded-lg" />
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
            <ShimmerBox className="h-6 w-36 rounded-lg bg-white/20" />
            <ShimmerBox className="h-6 w-44 rounded-lg bg-emerald-400/25" />
          </div>
          <ShimmerBox className="h-7 w-64 sm:w-96 rounded-lg bg-white/30" />
          <ShimmerBox className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/25" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: COMMUNITY FEED & CREATE POST */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Create Post Box Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-start gap-3">
                <ShimmerCircle size="w-10 h-10" />
                <ShimmerBox className="h-16 w-full rounded-xl bg-slate-50 dark:bg-slate-800/60" />
              </div>

              <div className="flex flex-row items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-6 w-20 rounded-lg" />
                  <ShimmerBox className="h-6 w-24 rounded-lg" />
                </div>
                <ShimmerBox className="h-8 w-28 rounded-xl bg-[#0059bb]/30" />
              </div>
            </div>

            {/* Category Filter Pills Skeleton */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden">
              <ShimmerBox className="h-7 w-24 rounded-lg bg-white dark:bg-slate-900" />
              <ShimmerBox className="h-7 w-20 rounded-lg" />
              <ShimmerBox className="h-7 w-32 rounded-lg" />
              <ShimmerBox className="h-7 w-28 rounded-lg" />
            </div>

            {/* Posts Stream List (2 Detailed Cards) */}
            <div className="space-y-4">
              {[1, 2].map((post) => (
                <div
                  key={post}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5"
                >
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <ShimmerCircle size="w-10 h-10" />
                    <div className="space-y-1.5 flex-1">
                      <ShimmerBox className="h-4 w-36 rounded-md" />
                      <ShimmerBox className="h-3 w-24 rounded-md" />
                    </div>
                  </div>

                  {/* Content snippet */}
                  <div className="space-y-2 pt-1">
                    <ShimmerBox className="h-4 w-full rounded-md" />
                    <ShimmerBox className="h-4 w-4/5 rounded-md" />
                  </div>

                  {/* Hashtag Badges */}
                  <div className="flex items-center gap-2 pt-1">
                    <ShimmerBox className="h-6 w-20 rounded-lg bg-blue-500/20" />
                    <ShimmerBox className="h-6 w-24 rounded-lg bg-blue-500/20" />
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <ShimmerBox className="h-8 flex-1 rounded-xl" />
                    <ShimmerBox className="h-8 flex-1 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Widget 1: Top 3 Leaderboard Spotlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-8 h-8 rounded-xl bg-amber-500/20" />
                  <ShimmerBox className="h-4 w-32 rounded-md" />
                </div>
                <ShimmerBox className="h-3.5 w-16 rounded-md bg-blue-500/20" />
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((r) => (
                  <div
                    key={r}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <ShimmerCircle size="w-6 h-6" />
                      <ShimmerBox className="h-3.5 w-24 rounded-md" />
                    </div>
                    <ShimmerBox className="h-3.5 w-14 rounded-md bg-amber-500/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Active Groups */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-8 h-8 rounded-xl bg-indigo-500/20" />
                  <ShimmerBox className="h-4 w-32 rounded-md" />
                </div>
                <ShimmerBox className="h-3.5 w-16 rounded-md bg-indigo-500/20" />
              </div>

              <div className="space-y-2">
                {[1, 2].map((g) => (
                  <div
                    key={g}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                  >
                    <ShimmerBox className="h-3.5 w-36 rounded-md" />
                    <ShimmerBox className="h-3 w-48 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Daily Tip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <ShimmerBox className="h-4 w-40 rounded-md bg-blue-600/30" />
              <ShimmerBox className="h-3.5 w-full rounded-md bg-blue-600/20" />
              <ShimmerBox className="h-3.5 w-3/4 rounded-md bg-blue-600/20" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
