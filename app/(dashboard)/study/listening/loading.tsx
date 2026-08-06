"use client";
import React from "react";

export default function ListeningLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse">
      
      {/* 1. TOP HERO HEADER & CREATE ARTICLE TOGGLE BAR SKELETON */}
      <div className="p-3.5 sm:p-5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-slate-300 dark:bg-slate-800 shrink-0" />
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 rounded-xs bg-blue-600/30 dark:bg-blue-500/20 shrink-0" />
              <div className="h-3.5 w-40 rounded-xs bg-slate-300 dark:bg-slate-800" />
            </div>
            <div className="h-5 w-56 sm:w-80 rounded-xs bg-slate-300 dark:bg-slate-800" />
          </div>
        </div>
        <div className="h-8 w-36 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
      </div>

      {/* 2. DANH SÁCH 10 BÀI NGHE NẰM NGANG SKELETON */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="h-4 w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="p-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="relative w-full h-24 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                <div className="h-3 w-10 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-3 w-12 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN BENTO WORKSPACE (Left 8/12 - Right 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-2 min-w-0">
        
        {/* LEFT COLUMN: ACTIVE LESSON & AUDIO PLAYER WORKSPACE (8/12 Width) */}
        <div className="lg:col-span-8 space-y-3.5 min-w-0">
          
          {/* Active Lesson Header & Timer */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5 gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="h-7 w-20 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-4.5 w-48 sm:w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-20 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
            </div>

            {/* 2 Practice Listen Modes Switcher Pills */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
              <div className="h-7 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
              <div className="h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Full Article Interactive Audio Player Card Skeleton */}
          <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
            {/* Header Control Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-xs bg-blue-600/30 dark:bg-blue-400/20" />
                <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded-xs bg-purple-600/30 dark:bg-purple-500/20" />
            </div>

            {/* Audio Player Control Widget Bar */}
            <div className="p-3 sm:p-4 rounded-xs bg-slate-950 text-white border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/40 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-full rounded-full bg-slate-800" />
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-12 rounded-xs bg-slate-800" />
                    <div className="h-3 w-12 rounded-xs bg-slate-800" />
                  </div>
                </div>
                <div className="h-7 w-12 rounded-xs bg-slate-800 shrink-0" />
              </div>
            </div>

            {/* Article Text Content / Dictation Slots Placeholder */}
            <div className="p-3.5 sm:p-4 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-3">
              <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-11/12 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LESSON INSPECTOR & VOCAB NOTEBOOK (4/12 Width) */}
        <div className="lg:col-span-4 space-y-3.5 min-w-0">
          
          {/* Lesson Inspector Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="w-5 h-5 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Lesson Stats Grid Pills */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1">
                  <div className="h-2.5 w-12 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-16 rounded-xs bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            {/* Vocab Items Stream */}
            <div className="space-y-2 pt-1">
              <div className="h-3 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="h-3.5 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-28 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                  <div className="w-6 h-6 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
