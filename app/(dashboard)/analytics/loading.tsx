"use client";
import React from "react";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-16 md:pb-6 select-none font-sans max-w-6xl mx-auto animate-pulse">
      
      {/* 1. PAGE HEADER SKELETON */}
      <div className="space-y-1">
        <div className="h-5 w-44 sm:w-56 rounded-xs bg-slate-200 dark:bg-slate-800" />
        <div className="h-3.5 w-72 sm:w-96 rounded-xs bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
      </div>

      {/* 2. TOP 5 STAT CARDS SKELETON */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {[
          { iconBg: "bg-orange-500/20 dark:bg-orange-500/10", valW: "w-16" },
          { iconBg: "bg-emerald-500/20 dark:bg-emerald-500/10", valW: "w-12" },
          { iconBg: "bg-sky-500/20 dark:bg-sky-500/10", valW: "w-14" },
          { iconBg: "bg-indigo-500/20 dark:bg-indigo-500/10", valW: "w-16" },
          { iconBg: "bg-amber-500/20 dark:bg-amber-500/10", valW: "w-20" },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`p-2.5 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-2.5 sm:gap-3 ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xs ${card.iconBg} shrink-0`} />
            <div className="min-w-0 space-y-1 flex-1">
              <div className={`h-4 ${card.valW} rounded-xs bg-slate-200 dark:bg-slate-800`} />
              <div className="h-2.5 w-16 sm:w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. SUB-NAV TABS SKELETON */}
      <div className="border-b border-slate-200/80 dark:border-white/10 flex items-center gap-6 sm:gap-8 pb-2.5">
        <div className="h-5 w-28 rounded-xs bg-slate-300 dark:bg-slate-700" />
        <div className="h-5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* 4. SECTION 1: GITHUB HEATMAP MATRIX SKELETON (6 Months) */}
      <div className="p-3.5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 sm:space-y-4">
        <div className="h-4 w-60 sm:w-72 rounded-xs bg-slate-200 dark:bg-slate-800" />

        <div className="overflow-x-auto pb-2 no-scrollbar">
          <div className="min-w-[520px] space-y-2">
            {/* Top Month Labels */}
            <div className="flex items-center justify-between pl-8 pr-4">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <div key={m} className="h-3 w-10 rounded-xs bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>

            {/* Matrix Squares Grid */}
            <div className="flex items-start gap-3">
              <div className="space-y-2 pt-1">
                {[1, 2, 3].map((d) => (
                  <div key={d} className="h-3 w-4 rounded-xs bg-slate-200 dark:bg-slate-800" />
                ))}
              </div>

              <div className="grid grid-cols-24 gap-1.5 flex-1">
                {Array.from({ length: 120 }).map((_, sqIdx) => (
                  <div
                    key={sqIdx}
                    className={`h-3.5 w-3.5 rounded-xs ${
                      sqIdx % 7 === 0
                        ? "bg-emerald-500/40 dark:bg-emerald-500/30"
                        : sqIdx % 5 === 0
                        ? "bg-emerald-400/30 dark:bg-emerald-600/20"
                        : "bg-slate-100 dark:bg-slate-800/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="flex items-center justify-end gap-1.5 pt-2">
              <div className="h-3 w-6 rounded-xs bg-slate-200 dark:bg-slate-800" />
              {[1, 2, 3, 4].map((l) => (
                <div key={l} className="w-3 h-3 rounded-xs bg-emerald-500/30 dark:bg-emerald-500/20" />
              ))}
              <div className="h-3 w-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECTION 2: DUAL 30-DAY LINE CHARTS SKELETON WITH MODE FILTER */}
      <div className="p-3.5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
        
        {/* Header & Mode Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-3">
          <div className="h-4 w-44 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[1, 2, 3, 4, 5].map((p) => (
              <div key={p} className="h-7 w-16 sm:w-20 rounded-xs bg-slate-100 dark:bg-slate-800 shrink-0" />
            ))}
          </div>
        </div>

        {/* Dual Line Charts Container */}
        <div className="flex flex-col md:flex-row gap-6 pt-1">
          
          {/* Left Chart Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-3.5 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-36 sm:h-48 w-full rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 p-3 flex items-end justify-between gap-2">
              {[30, 45, 25, 60, 40, 80, 50, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-xs" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Right Chart Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-3.5 w-40 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-36 sm:h-48 w-full rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 p-3 flex items-end justify-between gap-2">
              {[20, 50, 35, 75, 45, 60, 85, 65, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 dark:bg-blue-500/10 rounded-t-xs" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
