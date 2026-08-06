"use client";
import React from "react";

export default function RoadmapLoading() {
  return (
    <div className="space-y-3.5 sm:space-y-4 pb-16 md:pb-6 select-none font-sans animate-pulse">
      
      {/* 1. HERO SPOTLIGHT BANNER SKELETON */}
      <div className="p-3.5 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="h-4.5 w-24 rounded-xs bg-amber-400/30 shrink-0" />
            <div className="h-4.5 w-32 rounded-xs bg-white/20 shrink-0" />
          </div>
          <div className="h-6 w-56 sm:w-80 rounded-xs bg-white/30" />
          <div className="h-3.5 w-full sm:w-96 rounded-xs bg-blue-100/30 hidden sm:block" />
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-2.5 shrink-0">
          <div className="p-1.5 sm:p-2 rounded-xs bg-white/10 border border-white/15 flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400/20 shrink-0" />
            <div className="space-y-1">
              <div className="h-2.5 w-12 rounded-xs bg-blue-200/40" />
              <div className="h-3.5 w-20 rounded-xs bg-white/40" />
            </div>
          </div>
          <div className="h-8 sm:h-9 w-28 sm:w-32 rounded-xs bg-white/20 border border-white/30 shrink-0" />
        </div>
      </div>

      {/* 2. BENTO 8/12 + 4/12 GRID LAYOUT SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
        
        {/* LEFT 8-COLS: PHASES & LESSON CARDS */}
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
          {[1, 2, 3].map((phase) => (
            <div key={phase} className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
              
              {/* Phase Header & Chest Reward */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
                    <div className="h-4.5 w-48 sm:w-72 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3 w-64 sm:w-80 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
                </div>

                <div className="h-6 w-28 sm:w-36 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
              </div>

              {/* Lesson Items List */}
              <div className="space-y-2 sm:space-y-2.5">
                {[1, 2, 3].map((task) => (
                  <div
                    key={task}
                    className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="h-6 w-20 rounded-xs bg-blue-500/20 dark:bg-blue-400/20 shrink-0" />
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
                          <div className="h-3 w-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
                        </div>
                      </div>
                    </div>

                    <div className="h-7 w-20 sm:w-24 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT 4-COLS: LESSON DETAIL & AI TIPS SIDEBAR */}
        <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
          
          {/* Active Task Detail Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-5 w-24 rounded-xs bg-blue-600/20 dark:bg-blue-400/20" />
              <div className="h-4 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
            </div>

            <div className="space-y-2">
              <div className="h-5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-full rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-3.5 w-4/5 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            {/* Pro AI Tips Box */}
            <div className="p-3 rounded-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
              <div className="h-3.5 w-28 rounded-xs bg-amber-500/30" />
              <div className="h-3 w-full rounded-xs bg-amber-500/20" />
            </div>

            {/* Practice CTA Button */}
            <div className="h-10 w-full rounded-xs bg-blue-600/40 dark:bg-blue-500/40 pt-1" />
          </div>

          {/* Daily Challenge Tracker Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-10 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10" />
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/60" />
          </div>

        </div>

      </div>

    </div>
  );
}
