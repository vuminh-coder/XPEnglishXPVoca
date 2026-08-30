"use client";
import React from "react";

export default function MyVideoLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12 animate-pulse">
      {/* 0. TOP ACTION HEADER SKELETON (56PX) */}
      <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between px-3 sm:px-6 lg:px-8 shrink-0">
        {/* Left Pills Container */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 lg:hidden shrink-0" />
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1">
            <div className="h-7 w-28 sm:w-32 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
            <div className="h-7 w-20 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 hidden sm:block" />
            <div className="h-7 w-20 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 hidden sm:block" />
            <div className="h-7 w-24 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 hidden sm:block" />
          </div>
        </div>

        {/* Right Desktop Actions & Daily Quote Skeleton */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden lg:flex items-center gap-2">
            <div className="h-8 w-24 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60" />
            <div className="h-8 w-32 rounded-xl bg-purple-500/15 border border-purple-500/25" />
          </div>
          <div className="hidden xl:flex items-center gap-2 h-8 w-64 rounded-xl bg-slate-100/60 dark:bg-slate-800/60" />
          <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 lg:hidden shrink-0" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 lg:hidden shrink-0" />
        </div>
      </div>

      {/* MAIN CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        
        {/* 1. HERO SPOTLIGHT & 4 MICRO-METRIC DOUBLE-BEZEL CARDS SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="h-5 w-48 rounded-md bg-blue-500/20" />
                <div className="h-5 w-52 rounded-md bg-slate-100 dark:bg-slate-800 hidden sm:block" />
              </div>
              <div className="h-6 w-72 sm:w-96 rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="h-3.5 w-full sm:w-80 rounded-md bg-slate-100 dark:bg-slate-800" />
            </div>

            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <div className="h-9 w-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="h-9 w-32 rounded-xl bg-emerald-500/20" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 4 Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-5 w-16 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-24 rounded-md bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. YOUTUBE IMPORT STUDIO DECK SKELETON */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="h-4 w-64 rounded-md bg-blue-500/20" />
            <div className="h-3 w-48 rounded-md bg-slate-100 dark:bg-slate-800 hidden sm:block" />
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="h-11 flex-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
              <div className="h-11 w-full sm:w-44 rounded-xl bg-[#0059bb]/40" />
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
                <div className="h-7 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded-lg bg-amber-500/20" />
            </div>
          </div>
        </div>

        {/* 3. MASTER-DETAIL BENTO GRID SKELETON (1.62fr : 1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT COLUMN: PLAYER STUDIO SKELETON */}
          <div className="flex flex-col">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden flex flex-col h-full space-y-3">
              <div className="p-2 bg-slate-900 border-b border-slate-800">
                <div className="relative aspect-video w-full rounded-xl bg-black flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#0059bb]/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-blue-400/40" />
                  </div>
                </div>
              </div>

              {/* Media Control Dock Placeholder */}
              <div className="py-2 px-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="w-9 h-9 rounded-lg bg-[#0059bb]/50" />
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Video Info Placeholder */}
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800" />
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE DOCK SKELETON */}
          <div className="flex flex-col">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden flex flex-col h-full min-h-[460px]">
              {/* 3 Tabs Dock */}
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-1">
                <div className="h-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm" />
                <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800" />
                <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800" />
              </div>

              <div className="p-4 space-y-3 flex-1 overflow-hidden">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <div className="h-3 w-16 rounded-md bg-blue-500/20" />
                      <div className="h-4 w-4 rounded-md bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 4. SEARCH & FILTER BAR SKELETON */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="h-10 flex-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" />
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 w-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
              ))}
            </div>
          </div>
        </div>

        {/* 5. VIDEO BENTO GRID SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden space-y-3">
              <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-20 rounded-md bg-blue-500/20" />
                <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
