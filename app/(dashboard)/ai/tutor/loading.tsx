"use client";
import React from "react";

export default function AiTutorLoading() {
  return (
    <div className="space-y-3 pb-20 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. TOP UNIFIED MICRO-HERO TOOLBAR CONTROL STRIP SKELETON */}
      <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5 min-w-0">
        <div className="flex items-center justify-between md:justify-start gap-2.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
            <div className="space-y-1 min-w-0">
              <div className="h-4 w-36 sm:w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-48 sm:w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* 3 Mode Switcher Pills */}
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 w-full md:w-auto shrink-0">
          <div className="h-6 w-full md:w-20 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
          <div className="h-6 w-full md:w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-full md:w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Sound Switcher & Timer */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <div className="h-7 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-20 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
        </div>
      </div>

      {/* 1. MAIN BENTO GRID (Cột Trái 8/12 - Cột Phải 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-1">
        
        {/* CỘT TRÁI: VOICE CHAT STREAM & DUAL INPUT DOCK (8/12 Width) */}
        <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
          
          <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1 space-y-3">
            
            {/* Header Title Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-4 h-4 rounded-xs bg-blue-600/30 dark:bg-blue-400/20 shrink-0" />
                <div className="h-4 w-44 sm:w-64 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-16 sm:w-20 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0 whitespace-nowrap" />
            </div>

            {/* Scrollable Chat Stream Box */}
            <div className="max-h-[50svh] min-h-[240px] sm:min-h-[420px] lg:h-auto lg:min-h-[460px] lg:flex-1 space-y-3.5 p-1">
              
              {/* Message 1 (AI Bot Left) */}
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0 mt-0.5" />
                <div className="space-y-2 max-w-[85%] flex-1">
                  <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3.5 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>

              {/* Message 2 (User Right) */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="space-y-1.5 max-w-[80%] flex flex-col items-end">
                  <div className="p-3 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 border border-blue-500/30 text-right space-y-1.5 w-full">
                    <div className="h-4 w-3/4 rounded-xs bg-blue-500/40 dark:bg-blue-400/40 ml-auto" />
                  </div>
                </div>
                <div className="w-7 h-7 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0 mt-0.5" />
              </div>

              {/* Message 3 (AI Bot Left) */}
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0 mt-0.5" />
                <div className="space-y-2 max-w-[85%] flex-1">
                  <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="h-4 w-11/12 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-1/2 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>

            </div>

            {/* Dual Input Dock (Mic + Text Input) */}
            <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 flex items-center gap-2 pt-2">
              <div className="w-11 h-11 rounded-full bg-rose-500/30 border border-rose-500/50 flex items-center justify-center shrink-0">
                <div className="w-5 h-5 rounded-full bg-rose-500" />
              </div>
              <div className="h-10 flex-1 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10" />
              <div className="h-10 w-12 rounded-xs bg-blue-600/40 shrink-0" />
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: AI SPEECH ANALYSIS & PRACTICE GOALS SIDEBAR (4/12 Width) */}
        <div className="lg:col-span-4 flex flex-col space-y-3 min-w-0">
          
          {/* Sidebar Tabs (3 Pills) */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
            <div className="h-6 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
            <div className="h-6 rounded-xs bg-slate-100 dark:bg-slate-800" />
            <div className="h-6 rounded-xs bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Sidebar Main Content Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5 flex-1">
            
            {/* Topic Selection Card */}
            <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1.5">
              <div className="h-3 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Practice Goals List (3 Items) */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              {[1, 2, 3].map((g) => (
                <div key={g} className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="h-3.5 w-36 sm:w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-4 w-10 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
                </div>
              ))}
            </div>

            {/* AI Speech Analysis Gauge & Breakdown */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-14 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10" />
              </div>

              {/* 4 Score Metric Bars */}
              <div className="space-y-2">
                {[
                  { nW: "w-20", bW: "85%" },
                  { nW: "w-16", bW: "90%" },
                  { nW: "w-24", bW: "78%" },
                  { nW: "w-18", bW: "88%" },
                ].map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between">
                      <div className={`h-2.5 ${m.nW} rounded-xs bg-slate-200 dark:bg-slate-800`} />
                      <div className="h-2.5 w-6 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
                      <div style={{ width: m.bW }} className="h-full bg-blue-500/40 dark:bg-blue-400/40 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
