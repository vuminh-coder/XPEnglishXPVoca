"use client";
import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse" suppressHydrationWarning>
      
      {/* 1. APP TOP HEADER SKELETON (56px Baseline) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="h-9 w-44 rounded-xl bg-slate-200 dark:bg-slate-800 shadow-2xs" />
        }
      >
        <HeaderPillContainer>
          <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* TOP 5 METRIC CARDS BENTO GRID SKELETON */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {[
            { iconBg: "bg-amber-500/20 dark:bg-amber-500/10", valW: "w-20" },
            { iconBg: "bg-emerald-500/20 dark:bg-emerald-500/10", valW: "w-16" },
            { iconBg: "bg-blue-500/20 dark:bg-blue-500/10", valW: "w-16" },
            { iconBg: "bg-purple-500/20 dark:bg-purple-500/10", valW: "w-20" },
            { iconBg: "bg-amber-500/20 dark:bg-amber-500/10", valW: "w-24" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3 ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} shrink-0`} />
              <div className="min-w-0 space-y-1.5 flex-1">
                <div className={`h-5 ${card.valW} rounded-lg bg-slate-200 dark:bg-slate-800`} />
                <div className="h-3 w-20 rounded-md bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>

        {/* 3. SECTION 1: 6-MONTH HEATMAP MATRIX SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 rounded-md bg-blue-100 dark:bg-blue-950/60" />
              <div className="h-5 w-52 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-6 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="min-w-[540px] space-y-2">
              {/* Top Month Labels */}
              <div className="flex items-center justify-between pl-8 pr-4">
                {[1, 2, 3, 4, 5, 6].map((m) => (
                  <div key={m} className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
                ))}
              </div>

              {/* Matrix Squares Grid */}
              <div className="flex items-start gap-3">
                <div className="space-y-2.5 pt-1">
                  {[1, 2, 3].map((d) => (
                    <div key={d} className="h-3 w-4 rounded bg-slate-200 dark:bg-slate-800" />
                  ))}
                </div>

                <div className="grid grid-cols-24 gap-1.5 flex-1">
                  {Array.from({ length: 120 }).map((_, sqIdx) => (
                    <div
                      key={sqIdx}
                      className={`h-3.5 w-3.5 rounded-sm ${
                        sqIdx % 7 === 0
                          ? "bg-blue-500/40 dark:bg-blue-500/30"
                          : sqIdx % 5 === 0
                          ? "bg-blue-400/30 dark:bg-blue-600/20"
                          : "bg-slate-100 dark:bg-slate-800/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Legend */}
              <div className="flex items-center justify-between pt-3 pl-8 border-t border-slate-100 dark:border-slate-800">
                <div className="h-3.5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-6 rounded bg-slate-200 dark:bg-slate-800" />
                  {[1, 2, 3, 4].map((l) => (
                    <div key={l} className="w-3 h-3 rounded-sm bg-blue-500/30 dark:bg-blue-500/20" />
                  ))}
                  <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SECTION 2: 30-DAY PRACTICE WITH LINE CHARTS SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 rounded-md bg-blue-100 dark:bg-blue-950/60" />
              <div className="h-5 w-60 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <div key={p} className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-[210px] rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80 p-3 flex flex-col justify-between">
                  <div className="space-y-8 pt-2">
                    {[1, 2, 3, 4].map((l) => (
                      <div key={l} className="h-[1px] w-full bg-slate-200/60 dark:bg-slate-800" />
                    ))}
                  </div>
                  <div className="grid grid-cols-8 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => (
                      <div key={d} className="h-3 rounded bg-slate-200 dark:bg-slate-800" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
