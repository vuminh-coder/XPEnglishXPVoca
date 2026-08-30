"use client";
import React from "react";

export default function LeaderboardLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto h-full px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-20 h-7 rounded-lg bg-amber-500/40" />
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
            <div className="h-6 w-36 rounded-lg bg-amber-400/30" />
            <div className="h-6 w-40 rounded-lg bg-white/20" />
          </div>
          <div className="h-7 w-64 sm:w-96 rounded-lg bg-white/30" />
          <div className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/30" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: PODIUM & DETAILED LIST */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top 3 Champions Podium */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="h-4 w-44 rounded-md bg-amber-500/30" />
                <div className="h-3 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-2 pb-1">
                {/* Silver */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-between space-y-2">
                  <div className="w-16 h-5 rounded-lg bg-slate-300 dark:bg-slate-700" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="w-20 h-4 rounded-md bg-slate-300 dark:bg-slate-700" />
                  <div className="w-full h-6 rounded-lg bg-slate-700 dark:bg-slate-800" />
                </div>
                {/* Gold */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 border-2 border-amber-400 text-center flex flex-col items-center justify-between space-y-2.5 relative -top-3">
                  <div className="w-20 h-6 rounded-lg bg-amber-400/60" />
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400/40" />
                  <div className="w-24 h-4 rounded-md bg-slate-400 dark:bg-slate-600" />
                  <div className="w-full h-7 rounded-lg bg-amber-500/80" />
                </div>
                {/* Bronze */}
                <div className="p-3 sm:p-4 rounded-2xl bg-amber-900/10 dark:bg-amber-950/30 border border-amber-700/30 text-center flex flex-col items-center justify-between space-y-2">
                  <div className="w-16 h-5 rounded-lg bg-amber-700/30" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-800/30" />
                  <div className="w-20 h-4 rounded-md bg-slate-300 dark:bg-slate-700" />
                  <div className="w-full h-6 rounded-lg bg-amber-800/80" />
                </div>
              </div>
            </div>

            {/* Ranks 4+ Detailed Table Rows */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="h-4 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2">
                {[4, 5, 6, 7].map((rank) => (
                  <div key={rank} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-20 rounded-md bg-slate-100 dark:bg-slate-700/60" />
                      </div>
                    </div>
                    <div className="h-5 w-16 rounded-md bg-blue-500/20" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Widget 1: Your Status */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded-md bg-slate-100 dark:bg-slate-700/60" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 h-16" />
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 h-16" />
              </div>

              <div className="h-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Widget 2: Quick XP Missions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="h-4 w-36 rounded-md bg-amber-500/30" />
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 h-12" />
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 h-12" />
              </div>
            </div>

            {/* Widget 3: Reward Rules */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="h-4 w-32 rounded-md bg-blue-600/30" />
              <div className="h-3.5 w-full rounded-md bg-blue-600/20" />
              <div className="h-3.5 w-4/5 rounded-md bg-blue-600/20" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
