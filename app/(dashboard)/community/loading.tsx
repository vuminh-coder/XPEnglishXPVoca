"use client";
import React from "react";

export default function CommunityLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto h-full px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div className="w-20 h-7 rounded-lg bg-blue-600/40" />
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="w-36 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 hidden sm:block" />
        </div>
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] shadow-md shadow-blue-900/20 relative overflow-hidden space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-36 rounded-lg bg-white/20" />
            <div className="h-6 w-40 rounded-lg bg-emerald-400/20" />
          </div>
          <div className="h-7 w-64 sm:w-96 rounded-lg bg-white/30" />
          <div className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/30" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: COMMUNITY FEED & CREATE POST */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Create Post Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60" />
              </div>

              <div className="flex flex-row items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
                  <div className="h-6 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="h-8 w-28 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
              </div>
            </div>

            {/* Posts Stream List (2 Posts) */}
            <div className="space-y-4">
              {[1, 2].map((post) => (
                <div key={post} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-24 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                    </div>
                  </div>

                  {/* Content snippet */}
                  <div className="space-y-2 pt-1">
                    <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Hashtag Badges */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-6 w-20 rounded-lg bg-blue-500/20 dark:bg-blue-400/20" />
                    <div className="h-6 w-24 rounded-lg bg-blue-500/20 dark:bg-blue-400/20" />
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="h-9 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
                    <div className="h-9 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
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
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 shrink-0" />
                  <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-3.5 w-16 rounded-md bg-blue-500/20 dark:bg-blue-400/20" />
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3.5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <div className="h-3.5 w-12 rounded-md bg-amber-500/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Active Groups */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 shrink-0" />
                  <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-3.5 w-16 rounded-md bg-indigo-500/20" />
              </div>

              <div className="space-y-2">
                {[1, 2].map((g) => (
                  <div key={g} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                    <div className="h-3.5 w-36 rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-48 rounded-md bg-slate-100 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Daily Tip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="h-4 w-40 rounded-md bg-blue-600/30" />
              <div className="h-3.5 w-full rounded-md bg-blue-600/20" />
              <div className="h-3.5 w-3/4 rounded-md bg-blue-600/20" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
