"use client";
import React from "react";

export default function AiTutorLoading() {
  return (
    <div className="space-y-3 pb-24 md:pb-6 px-1.5 sm:px-0 relative select-none font-sans animate-pulse lg:flex lg:flex-col lg:min-h-[calc(100vh-4rem)]">
      
      {/* 0. Top Hero Announcement Banner Skeleton */}
      <div className="p-3 sm:p-4 rounded-xs bg-[#0059bb]/5 dark:bg-blue-950/40 border border-[#0059bb]/15 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0" />
          <div className="space-y-1">
            <div className="h-4 w-36 sm:w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-48 sm:w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
          <div className="h-8 flex-1 sm:flex-initial sm:w-36 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0" />
          <div className="h-8 w-20 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 shrink-0" />
        </div>
      </div>

      {/* 1. Main Bento Grid (8/12 & 4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 lg:items-stretch min-w-0 lg:flex-1 lg:min-h-0 mt-1">
        
        {/* Cột Trái 8/12 */}
        <div className="lg:col-span-8 flex flex-col min-w-0 lg:min-h-0">
          <div className="p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col min-w-0 lg:min-h-0 lg:flex-1 space-y-3">
            
            {/* Header Trong Khung */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-16 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Chat Stream */}
            <div className="max-h-[58svh] sm:max-h-[62svh] min-h-[320px] sm:min-h-[460px] lg:h-auto lg:min-h-[500px] lg:flex-1 space-y-3.5 p-1">
              {/* AI */}
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xs bg-blue-600/20 dark:bg-blue-500/20 shrink-0 mt-0.5" />
                <div className="space-y-1.5 max-w-[75%] flex-1">
                  <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="h-3.5 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>

              {/* User */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="space-y-1.5 max-w-[70%] flex flex-col items-end flex-1">
                  <div className="p-3 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 border border-blue-500/30 w-full space-y-1.5">
                    <div className="h-3.5 w-3/4 rounded-xs bg-blue-500/40 ml-auto" />
                  </div>
                </div>
                <div className="w-7 h-7 rounded-xs bg-blue-600/30 dark:bg-blue-500/30 shrink-0 mt-0.5" />
              </div>
            </div>

            {/* Suggestions Chips (text-only skeleton) */}
            <div className="pt-2 pb-1 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-hidden">
              <div className="h-4 w-12 rounded-xs bg-[#0059bb]/20 shrink-0" />
              <div className="h-4 w-16 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-4 w-16 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-4 w-20 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="h-4 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60 shrink-0" />
            </div>

            {/* Voice Input Dock Skeleton */}
            <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0059bb]/30 shrink-0" />
                <div className="h-10 flex-1 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-10 w-16 rounded-xs bg-[#0059bb]/30 shrink-0" />
              </div>
            </div>

          </div>
        </div>

        {/* Cột Phải 4/12 (Unified Single Sidebar) */}
        <div className="lg:col-span-4 flex flex-col min-w-0 lg:min-h-0">
          <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1">
                <div className="h-6 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 rounded-xs bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 space-y-2">
              <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 rounded-xs bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
