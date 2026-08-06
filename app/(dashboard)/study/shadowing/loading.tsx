"use client";
import React from "react";

export default function ShadowingLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse">
      
      {/* 0. TOP HERO ANNOUNCEMENT BANNER SKELETON */}
      <div className="p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xs bg-slate-300 dark:bg-slate-800 shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 rounded-xs bg-blue-600/30 dark:bg-blue-500/20 shrink-0" />
              <div className="h-4 w-48 sm:w-64 rounded-xs bg-slate-300 dark:bg-slate-800" />
            </div>
            <div className="h-3.5 w-40 sm:w-56 rounded-xs bg-slate-300 dark:bg-slate-800" />
          </div>
        </div>
        <div className="h-8 w-36 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
      </div>

      {/* 1. DANH SÁCH 10 BÀI ĐỌC SKELETON */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="h-4 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="p-2 sm:p-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="relative w-full h-16 sm:h-24 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-1 pt-1">
                <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ACTIVE LESSON HEADER & 4 SHADOWING MODES SWITCHER SKELETON */}
      <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-20 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-4.5 w-44 sm:w-60 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-16 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0" />
        </div>

        {/* 4 Shadowing Modes Switcher Pills */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 w-full sm:w-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-full sm:w-16 rounded-xs bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>

      {/* 3. MAIN BENTO WORKSPACE (Left 7/12 - Right 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        
        {/* LEFT COLUMN: TELEPROMPTER STUDIO PLAYER (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* Target Sentence Box Skeleton */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
            {/* Header Sentence Progress & Speed Controller */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="h-5 w-7 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                ))}
              </div>
            </div>

            {/* Sentence Interactive Text Box */}
            <div className="p-3.5 rounded-xs bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-white/5 space-y-3">
              <div className="space-y-2">
                <div className="h-5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Phonetic IPA Placeholder Line */}
              <div className="pt-2 border-t border-slate-200/40 dark:border-white/5 flex items-center gap-2">
                <div className="h-4 w-8 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
                <div className="h-3.5 w-44 rounded-xs bg-purple-500/20 dark:bg-purple-400/20" />
              </div>

              {/* Translation Line Placeholder */}
              <div className="pt-2 border-t border-slate-200/40 dark:border-white/5 space-y-1">
                <div className="h-3 w-36 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
                <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* Native Audio Controls Bar */}
            <div className="flex items-center justify-between p-2.5 rounded-xs bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xs bg-blue-600/40 shrink-0" />
                <div className="space-y-1">
                  <div className="h-3.5 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2.5 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="h-7 w-20 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
            </div>
          </div>

          {/* Voice Record Mic Controls Box Skeleton */}
          <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/30 border border-rose-500/50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-rose-500" />
              </div>
              <div className="space-y-1 text-left">
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-44 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="h-8 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-24 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI SPEECH ANALYSIS & VOICE WAVEFORM INSPECTOR (5/12 Width) */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* AI Speech Analysis Result Card */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="w-5 h-5 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
              <div className="h-4 w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Overall Score Gauge */}
            <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-20 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10" />
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0" />
            </div>

            {/* 5 Metric Score Bars */}
            <div className="space-y-2.5">
              {[
                { nameW: "w-20", barW: "85%" },
                { nameW: "w-16", barW: "92%" },
                { nameW: "w-24", barW: "78%" },
                { nameW: "w-28", barW: "90%" },
                { nameW: "w-18", barW: "80%" },
              ].map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className={`h-3 ${m.nameW} rounded-xs bg-slate-200 dark:bg-slate-800`} />
                    <div className="h-3 w-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
                    <div style={{ width: m.barW }} className="h-full bg-blue-500/40 dark:bg-blue-400/40 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Word-by-Word Color Pills Stream */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <div className="h-3 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((w) => (
                  <div key={w} className="h-6 w-14 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/30" />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
