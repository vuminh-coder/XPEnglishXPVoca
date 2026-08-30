"use client";
import React from "react";

export default function RoadmapLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      
      {/* 1. APP TOP HEADER SKELETON (56px BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto h-full px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div className="w-24 h-7 rounded-lg bg-blue-600/40" />
              <div className="w-24 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="w-24 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="w-32 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 hidden sm:block" />
        </div>
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] shadow-md shadow-blue-900/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="h-6 w-28 rounded-lg bg-amber-400/30 shrink-0" />
              <div className="h-6 w-36 rounded-lg bg-white/20 shrink-0" />
            </div>
            <div className="h-7 w-64 sm:w-96 rounded-lg bg-white/30" />
            <div className="h-4 w-full sm:w-3/4 rounded-lg bg-blue-100/30 hidden sm:block" />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 shrink-0" />
              <div className="space-y-1">
                <div className="h-3 w-12 rounded-md bg-blue-200/40" />
                <div className="h-4 w-24 rounded-md bg-white/40" />
              </div>
            </div>
            <div className="h-10 w-32 rounded-xl bg-white/20 border border-white/30 shrink-0" />
          </div>
        </div>

        {/* 3. BENTO 8/12 + 4/12 GRID LAYOUT SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT 8-COLS: PHASES & LESSON CARDS */}
          <div className="lg:col-span-8 space-y-4">
            {[1, 2].map((phase) => (
              <div key={phase} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                
                {/* Phase Header & Chest Reward */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-20 rounded-lg bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
                      <div className="h-5 w-56 sm:w-80 rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-3.5 w-64 sm:w-96 rounded-md bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
                  </div>

                  <div className="h-7 w-32 rounded-xl bg-amber-500/20 shrink-0" />
                </div>

                {/* Lesson Items List */}
                <div className="space-y-2.5">
                  {[1, 2, 3].map((task) => (
                    <div
                      key={task}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                        <div className="h-6 w-20 rounded-lg bg-blue-500/20 shrink-0" />
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="h-4 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />
                          <div className="h-3 w-1/2 rounded-md bg-slate-100 dark:bg-slate-700/60" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-6 w-16 rounded-lg bg-amber-500/20" />
                        <div className="h-8 w-24 rounded-xl bg-blue-600/30 dark:bg-blue-500/30" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT 4-COLS: LESSON DETAIL & AI TIPS SIDEBAR */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Active Task Detail Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="h-5 w-36 rounded-md bg-blue-600/20 dark:bg-blue-400/20" />
                <div className="h-5 w-16 rounded-lg bg-amber-500/20" />
              </div>

              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-full rounded-md bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-3.5 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800/60" />
              </div>

              {/* Pro AI Tips Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="h-3.5 w-28 rounded-md bg-slate-400" />
                <div className="h-3 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-4/5 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Reward Box */}
              <div className="h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40" />

              {/* Practice CTA Button */}
              <div className="h-10 w-full rounded-xl bg-blue-600/40 dark:bg-blue-500/40" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
