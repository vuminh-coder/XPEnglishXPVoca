"use client";
import React from "react";

export default function FriendsLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto h-full px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-20 h-7 rounded-lg bg-sky-500/40" />
              <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="w-28 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 hidden sm:block" />
        </div>
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#0284c7] shadow-md shadow-blue-900/20 relative overflow-hidden space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-36 rounded-lg bg-sky-300/30" />
            <div className="h-6 w-40 rounded-lg bg-emerald-400/20" />
          </div>
          <div className="h-7 w-64 sm:w-80 rounded-lg bg-white/30" />
          <div className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/30" />
        </div>

        {/* 3. BENTO 8/12 FEED + 4/12 SIDEBAR WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: SEARCH & FRIENDS LIST */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Search & Add Friend Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="h-4 w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-2.5">
                <div className="h-10 flex-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60" />
                <div className="h-10 w-24 rounded-xl bg-blue-600/40" />
              </div>
            </div>

            {/* Friends Stream List */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="h-4 w-40 rounded-md bg-slate-200 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 pb-3" />

              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-20 rounded-md bg-slate-100 dark:bg-slate-700/60" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-16 rounded-lg bg-blue-500/20" />
                      <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLS: BENTO SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Widget 1: Suggested Friends */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 shrink-0" />
                  <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-3.5 w-12 rounded-md bg-emerald-500/20" />
              </div>

              <div className="space-y-2.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-3.5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
                        <div className="h-2.5 w-16 rounded-md bg-slate-100 dark:bg-slate-700/60" />
                      </div>
                    </div>
                    <div className="h-7 w-20 rounded-lg bg-blue-600/30" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Reason to connect */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/60 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs space-y-2">
              <div className="h-4 w-36 rounded-md bg-blue-600/30" />
              <div className="h-3.5 w-full rounded-md bg-blue-600/20" />
              <div className="h-3.5 w-4/5 rounded-md bg-blue-600/20" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
