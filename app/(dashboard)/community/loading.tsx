"use client";
import React from "react";

export default function CommunityLoading() {
  return (
    <div className="space-y-3.5 sm:space-y-4 pb-16 md:pb-6 select-none font-sans animate-pulse">
      
      {/* 1. HERO SPOTLIGHT BANNER SKELETON */}
      <div className="p-3.5 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="h-4.5 w-32 rounded-xs bg-amber-400/30 shrink-0" />
            <div className="h-4.5 w-36 rounded-xs bg-emerald-400/30 shrink-0" />
          </div>
          <div className="h-6 w-56 sm:w-80 rounded-xs bg-white/30" />
          <div className="h-3.5 w-full sm:w-96 rounded-xs bg-blue-100/30 hidden sm:block" />
        </div>
      </div>

      {/* 2. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
        
        {/* LEFT 8-COLS: COMMUNITY FEED & CREATE POST */}
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
          
          {/* 4 Segmented Navigation Tabs */}
          <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 grid grid-cols-4 gap-1 w-full">
            <div className="h-7 rounded-xs bg-blue-600/40 dark:bg-blue-500/40" />
            <div className="h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Create Post Card */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-14 w-full rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10" />
            </div>

            <div className="flex flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-20 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-5 w-24 rounded-xs bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-8 w-20 sm:w-24 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
            </div>
          </div>

          {/* Posts Stream List (3 Posts) */}
          <div className="space-y-3 sm:space-y-3.5">
            {[1, 2, 3].map((post) => (
              <div key={post} className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                {/* Author Header */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>

                {/* Content snippet */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Hashtag Badges */}
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="h-5 w-20 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
                  <div className="h-5 w-24 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
                </div>

                {/* Actions Bar */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-4">
                  <div className="h-7 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  <div className="h-7 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
        <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
          
          {/* Widget 1: Top 3 Leaderboard Spotlight */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xs bg-amber-500/20 shrink-0" />
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-3 w-14 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
            </div>

            <div className="space-y-2">
              {[1, 2, 3].map((r) => (
                <div key={r} className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs bg-amber-400/30 shrink-0" />
                    <div className="h-3.5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3.5 w-14 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Active Groups Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="w-7 h-7 rounded-xs bg-indigo-500/20 shrink-0" />
              <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-2">
              {[1, 2].map((g) => (
                <div key={g} className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-3.5 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-16 rounded-xs bg-indigo-600/30 dark:bg-indigo-500/30" />
                  </div>
                  <div className="h-2.5 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
