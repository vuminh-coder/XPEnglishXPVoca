"use client";
import React from "react";

export default function AiConversationLoading() {
  return (
    <div className="space-y-3 pb-20 md:pb-6 px-1 md:px-0 relative select-none font-sans animate-pulse lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. TOP HERO ANNOUNCEMENT BANNER SKELETON */}
      <div className="p-3 sm:p-4 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="h-4 w-28 rounded-xs bg-blue-600/30 dark:bg-blue-500/20 shrink-0 whitespace-nowrap" />
              <div className="h-4 w-40 sm:w-64 rounded-xs bg-slate-300 dark:bg-slate-800" />
            </div>
            <div className="h-3.5 w-64 sm:w-80 rounded-xs bg-slate-300 dark:bg-slate-800 hidden sm:block" />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-24 sm:w-44 rounded-xs bg-emerald-600/30 dark:bg-emerald-500/30 shrink-0" />
          <div className="h-8 w-20 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
        </div>
      </div>

      {/* 1. TOPIC SELECTION CARDS GRID SKELETON (6 Cards) */}
      <div className="space-y-2 mt-3 shrink-0">
        <div className="flex items-center justify-between px-0.5">
          <div className="h-4 w-56 sm:w-72 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-14 rounded-xs bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-2 sm:p-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-10 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="space-y-1 pt-1">
                <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="h-3 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 pt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN BENTO GRID (Cột Trái 8/12 - Cột Phải 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-3">
        
        {/* CỘT TRÁI: AI CHAT COMPANION WORKSPACE (8/12 Width) */}
        <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
          
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1 space-y-3">
            
            {/* Header Active Topic Indicator */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-xs bg-blue-600/30 dark:bg-blue-400/20" />
                <div className="h-4 w-56 sm:w-72 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-24 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
            </div>

            {/* Scrollable Conversation Stream */}
            <div className="h-[55svh] min-h-[360px] sm:min-h-[400px] lg:h-auto lg:min-h-[440px] lg:flex-1 space-y-3.5 p-1">
              
              {/* Message 1 (AI Bot Left) */}
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0 mt-0.5" />
                <div className="space-y-2 max-w-[85%] flex-1">
                  <div className="p-3 sm:p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3.5 w-24 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>

              {/* Message 2 (User Right) */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="space-y-1.5 max-w-[80%] flex flex-col items-end">
                  <div className="p-3 sm:p-3.5 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 border border-blue-500/30 text-right space-y-1.5 w-full">
                    <div className="h-4 w-3/4 rounded-xs bg-blue-500/40 dark:bg-blue-400/40 ml-auto" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0 mt-0.5" />
              </div>

              {/* Message 3 (AI Bot Left) */}
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0 mt-0.5" />
                <div className="space-y-2 max-w-[85%] flex-1">
                  <div className="p-3 sm:p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="h-4 w-11/12 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>

            </div>

            {/* Input Action Bar */}
            <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 flex items-center gap-2 pt-2">
              <div className="h-10 flex-1 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10" />
              <div className="w-10 h-10 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-10 w-16 sm:w-20 rounded-xs bg-blue-600/40 shrink-0" />
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: GOALS CHECKLIST & AI COACH SIDEBAR (4/12 Width) */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5 min-w-0">
          
          {/* Topic Overview Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2">
            <div className="h-4 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            <div className="h-3 w-4/5 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
          </div>

          {/* Goals Checklist Card (3 Goals) */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
            </div>

            <div className="space-y-2">
              {[1, 2, 3].map((g) => (
                <div key={g} className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="h-3.5 w-36 sm:w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-4 w-10 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
                </div>
              ))}
            </div>

            {/* Smart AI Suggestion Chips Container */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
              <div className="h-3 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1.5">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="h-7 w-full rounded-xs bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/30" />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
