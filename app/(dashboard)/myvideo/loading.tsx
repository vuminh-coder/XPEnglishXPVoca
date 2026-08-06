"use client";
import React from "react";

export default function MyVideoLoading() {
  return (
    <div className="space-y-4 sm:space-y-5 pb-20 md:pb-8 select-none font-sans animate-pulse">
      
      {/* 1. HERO SPOTLIGHT BANNER SKELETON */}
      <div className="p-4 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="h-5 w-36 rounded-xs bg-amber-400/30 shrink-0" />
            <div className="h-5 w-48 rounded-xs bg-white/20 hidden sm:block" />
          </div>
          <div className="h-6 w-56 sm:w-80 rounded-xs bg-white/30" />
          <div className="h-3.5 w-full sm:w-96 rounded-xs bg-blue-100/30" />
        </div>

        {/* 3 Quick Stats Chips */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto shrink-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-2 rounded-xs bg-white/10 border border-white/15 text-center space-y-1">
              <div className="h-2.5 w-12 mx-auto rounded-xs bg-blue-100/30" />
              <div className="h-4 w-16 mx-auto rounded-xs bg-amber-300/40" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. YOUTUBE LINK PASTE IMPORT BOX SKELETON */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
          <div className="h-4 w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-48 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
        </div>

        <div className="space-y-3">
          <div className="h-11 w-full rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10" />
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-32 rounded-xs bg-slate-100 dark:bg-slate-800" />
              <div className="h-7 w-28 rounded-xs bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="h-9 w-full sm:w-44 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
          </div>
        </div>
      </div>

      {/* 3. MASTER-DETAIL 2-COLUMN SPLIT WORKSPACE SKELETON (Left 7/12 - Right 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT COLUMN: CLEAN PLAYER & 3-SENTENCE ROLLING VIEWPORT (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5 flex flex-col">
          
          <div className="rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs overflow-hidden flex flex-col space-y-3 p-3 sm:p-4">
            
            {/* YouTube Iframe Box Placeholder */}
            <div className="relative aspect-video w-full rounded-xs bg-slate-950 border border-slate-800 p-4 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center">
                <div className="w-5 h-5 rounded-xs bg-blue-500/50" />
              </div>
            </div>

            {/* Custom Control Bar Placeholder */}
            <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-blue-600/40 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="flex justify-between text-[10px]">
                  <div className="h-2.5 w-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2.5 w-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
              <div className="h-6 w-12 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
            </div>

            {/* 3-Sentence Rolling Viewport Subtitle Box */}
            <div className="p-3.5 rounded-xs bg-slate-950 text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="h-3.5 w-24 rounded-xs bg-slate-800" />
                <div className="h-4 w-6 rounded-xs bg-slate-800" />
              </div>

              {/* Previous Sentence (Dimmed) */}
              <div className="h-3 w-4/5 rounded-xs bg-slate-800/50" />

              {/* Current Active Sentence (Highlighted Box) */}
              <div className="p-3 rounded-xs bg-blue-600/20 border border-blue-500/40 space-y-2">
                <div className="h-4.5 w-full rounded-xs bg-blue-400/30" />
                <div className="h-3.5 w-3/4 rounded-xs bg-purple-400/30" />
                <div className="h-3.5 w-5/6 rounded-xs bg-[#0059bb]/30" />
              </div>

              {/* Next Sentence (Dimmed) */}
              <div className="h-3 w-2/3 rounded-xs bg-slate-800/50" />
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 3-TAB INTERACTIVE PANEL (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5 flex flex-col">
          
          {/* 3 Tab Buttons Strip */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
            <div className="h-7 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
            <div className="h-7 rounded-xs bg-slate-100 dark:bg-slate-800" />
            <div className="h-7 rounded-xs bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Subtitle Stream Panel Content Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 flex-1 h-[440px]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-16 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            <div className="space-y-2 overflow-hidden h-[360px]">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1.5 flex items-start gap-2">
                  <div className="h-5 w-12 rounded-xs bg-blue-600/20 dark:bg-blue-400/20 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-4/5 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. SAVED VIDEOS LIBRARY GRID SKELETON */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
              <div className="aspect-video w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
