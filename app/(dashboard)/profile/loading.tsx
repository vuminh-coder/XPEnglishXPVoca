"use client";
import React from "react";

export default function ProfileLoading() {
  return (
    <div className="space-y-4 sm:space-y-5 pb-16 md:pb-6 select-none font-sans max-w-5xl mx-auto animate-pulse">
      
      {/* 1. HERO SPOTLIGHT BANNER SKELETON */}
      <div className="p-3.5 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] shadow-2xs relative overflow-hidden space-y-4">
        
        {/* Top bar header */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 rounded-xs bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-28 rounded-xs bg-white/20 border border-white/30" />
            <div className="h-8 w-24 rounded-xs bg-white text-slate-900" />
          </div>
        </div>

        {/* User avatar & name info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3.5 sm:gap-4 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xs bg-slate-800 border-2 border-white/20 shrink-0" />
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="h-6 w-44 rounded-xs bg-white/30" />
                <div className="h-4.5 w-24 rounded-xs bg-sky-300/30" />
              </div>
              <div className="h-3.5 w-64 rounded-xs bg-blue-100/30 mx-auto sm:mx-0" />
            </div>
          </div>

          {/* Stats Pills Bar */}
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xs border border-white/10 shrink-0 w-full sm:w-auto justify-around">
            <div className="h-5 w-24 rounded-xs bg-amber-300/30" />
            <div className="w-px h-5 bg-white/20" />
            <div className="h-5 w-24 rounded-xs bg-amber-300/30" />
          </div>
        </div>

      </div>

      {/* 2. TOP 4 BENTO STATS CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { iconBg: "bg-blue-500/20 dark:bg-blue-500/10", valW: "w-20" },
          { iconBg: "bg-amber-500/20 dark:bg-amber-500/10", valW: "w-16" },
          { iconBg: "bg-indigo-500/20 dark:bg-indigo-500/10", valW: "w-24" },
          { iconBg: "bg-yellow-500/20 dark:bg-yellow-500/10", valW: "w-16" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-3.5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className={`w-7 h-7 rounded-xs ${card.iconBg} shrink-0`} />
            </div>
            <div className="space-y-1.5">
              <div className={`h-7 ${card.valW} rounded-xs bg-slate-300 dark:bg-slate-700`} />
              <div className="h-3 w-32 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. MAIN BENTO 8/12 + 4/12 WORKSPACE SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
        
        {/* LEFT 8-COLS: SKILL STUDY TIME & ACHIEVEMENTS GRID */}
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
          
          {/* Skill Study Time Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-16 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1 text-center">
                  <div className="h-3 w-16 mx-auto rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-10 mx-auto rounded-xs bg-blue-600/30 dark:bg-blue-400/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Card (6-8 Cards Grid) */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="h-4 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-1">
                <div className="h-6 w-14 rounded-xs bg-blue-600/30 dark:bg-blue-500/30" />
                <div className="h-6 w-16 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 w-16 rounded-xs bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[1, 2, 3, 4, 5, 6].map((a) => (
                <div key={a} className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs bg-amber-500/20 shrink-0" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="h-3.5 w-3/4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-1/2 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                    </div>
                  </div>
                  <div className="h-3 w-12 rounded-xs bg-amber-500/20 dark:bg-amber-500/10 ml-auto" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT 4-COLS: PROFILE EDITING & SHORTCUTS SIDEBAR */}
        <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
          
          {/* Edit Profile Form Settings Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <div className="h-4 w-36 rounded-xs bg-slate-200 dark:bg-slate-800 border-b border-slate-100 dark:border-white/5 pb-2" />

            <div className="space-y-2.5 pt-1">
              <div className="space-y-1">
                <div className="h-3 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-full rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-16 w-full rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10" />
              </div>
              <div className="h-9 w-full rounded-xs bg-blue-600/40 dark:bg-blue-500/40 pt-1" />
            </div>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
            <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5">
              {[1, 2, 3].map((k) => (
                <div key={k} className="h-9 w-full rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 flex items-center justify-between px-3">
                  <div className="h-3.5 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-4 rounded-xs bg-slate-300 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
