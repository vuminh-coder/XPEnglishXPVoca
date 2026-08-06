"use client";
import React from "react";

export default function PracticeLoading() {
  return (
    <div className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse">
      
      {/* 0. TOP MICRO-HERO TOOLBAR CARD SKELETON */}
      <div className="p-3 sm:p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-slate-300 dark:bg-slate-800 shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 rounded-xs bg-blue-600/30 dark:bg-blue-500/20 shrink-0" />
              <div className="h-4 w-44 sm:w-60 rounded-xs bg-slate-300 dark:bg-slate-800" />
            </div>
            <div className="h-3 w-56 sm:w-80 rounded-xs bg-slate-300 dark:bg-slate-800 hidden sm:block" />
          </div>
        </div>

        {/* 3 Hero Metrics Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
          <div className="h-6 w-20 sm:w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-16 sm:w-20 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
          <div className="h-6 w-20 sm:w-24 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10" />
        </div>
      </div>

      {/* 1. SUB-MODE SEGMENTED PILLS SWITCHER SKELETON (4 Modes) */}
      <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-xs flex items-center gap-1 border border-slate-200/50 dark:border-white/5 overflow-x-auto">
        <div className="flex-1 h-7 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
        <div className="flex-1 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* 2. MAIN BENTO GRID (Cột Trái 7/12 - Cột Phải 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start min-w-0">
        
        {/* CỘT TRÁI: PRACTICE STUDIO WORKSPACE (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5 min-w-0">
          
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3.5 min-w-0">
            
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-xs bg-blue-600/30 dark:bg-blue-400/20" />
                <div className="h-4 w-52 sm:w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            {/* Target Vocab Question Box */}
            <div className="p-3 sm:p-4 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-center space-y-2">
              <div className="h-3 w-28 mx-auto rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
              <div className="h-7 w-48 mx-auto rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-32 mx-auto rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            {/* 4 Answer Choice Option Buttons (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-2.5 sm:p-3 rounded-xs border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 h-11 flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="h-3.5 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            {/* Bottom Action CTA Button Skeleton */}
            <div className="h-10 w-full rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />

          </div>

        </div>

        {/* CỘT PHẢI: REPETITION STATS & VOCAB INSPECTOR SIDEBAR (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5 min-w-0">
          
          {/* SRS Memory Mastery Gauge Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-16 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
            </div>

            {/* 5-Level Memory Gauge Pills */}
            <div className="grid grid-cols-5 gap-1 py-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div key={lvl} className="h-7 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              ))}
            </div>
          </div>

          {/* Vocab Detail & Example Inspector Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1.5">
              <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Daily Challenge Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/60" />
          </div>

        </div>

      </div>
    </div>
  );
}
