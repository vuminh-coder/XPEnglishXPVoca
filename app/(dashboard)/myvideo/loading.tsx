"use client";
import React from "react";

export default function MyVideoLoading() {
  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12 animate-pulse">
      {/* 0. MOBILE-ONLY TOP HEADER SKELETON (56PX - Hidden on Desktop lg:hidden) */}
      <div className="lg:hidden w-full h-14 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="h-5 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="h-8.5 w-8.5 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
        </div>
      </div>

      {/* MAIN CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2.5 sm:py-3.5 pb-24 sm:pb-8 space-y-3 sm:space-y-4">
        {/* 1. YOUTUBE IMPORT STUDIO DECK SKELETON */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-2.5">
          <div className="h-4 w-56 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="h-10 flex-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
            <div className="h-10 w-full sm:w-44 rounded-xl bg-blue-500/15" />
          </div>
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="h-7 w-48 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="h-7 w-48 rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>

        {/* 2. MASTER-DETAIL BENTO GRID SKELETON (1.62fr : 1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-4 sm:gap-5 items-stretch">
          {/* LEFT COLUMN: PLAYER STUDIO SKELETON */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden flex flex-col">
            <div className="p-2 bg-slate-900 border-b border-slate-800">
              <div className="relative aspect-video w-full max-h-[380px] rounded-xl bg-black flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#0059bb]/40" />
              </div>
            </div>
            <div className="py-2 px-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="w-9 h-9 rounded-lg bg-[#0059bb]/50" />
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="p-3.5 space-y-2">
              <div className="flex justify-between">
                <div className="h-5 w-44 rounded-md bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 w-36 rounded-md bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE DOCK SKELETON */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden flex flex-col min-h-[420px]">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-1.5">
              <div className="h-8 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
              <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800" />
            </div>
            <div className="p-3.5 space-y-2.5 flex-1 overflow-hidden">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-2"
                >
                  <div className="h-3.5 w-16 rounded-md bg-blue-500/20" />
                  <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3.5 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SEARCH & FILTER BAR SKELETON */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="h-10 flex-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
