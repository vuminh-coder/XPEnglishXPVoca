"use client";
import React from "react";

export default function GamesLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans animate-pulse">
      {/* 1. APP TOP HEADER SKELETON — Dashboard Standard (4 pills with 2nd pill active) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
            <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="w-24 h-7 rounded-lg bg-blue-600/30" />
            <div className="w-24 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div className="w-20 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hidden md:block" />
          </div>
        </div>
        <div className="flex items-center gap-2 hidden sm:flex">
          <div className="w-16 h-8 rounded-xl bg-orange-500/20" />
          <div className="w-16 h-8 rounded-xl bg-amber-500/20 hidden md:block" />
          <div className="w-32 h-9 rounded-xl bg-blue-600/20" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </header>

      {/* 2. MAIN CONTAINER SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        {/* Hero Banner Skeleton */}
        <div className="h-40 sm:h-48 rounded-3xl bg-gradient-to-r from-[#0059bb]/20 to-[#002b5b]/20 dark:from-[#0059bb]/10 dark:to-[#002b5b]/10 p-5 sm:p-7 flex flex-col justify-between border border-slate-200/50 dark:border-slate-800">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-36 h-5 rounded-full bg-white/30 dark:bg-white/10" />
              <div className="w-48 h-4 rounded-full bg-white/20 dark:bg-white/5 hidden sm:block" />
            </div>
            <div className="w-72 h-7 rounded-lg bg-white/25 dark:bg-white/10" />
            <div className="w-full max-w-lg h-4 rounded-full bg-white/15 dark:bg-white/5" />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-40 h-12 rounded-2xl bg-white/10 border border-white/20" />
            <div className="w-44 h-12 rounded-2xl bg-white/10 border border-white/20 hidden sm:block" />
          </div>
        </div>

        {/* Unified Studio Control Toolbar Skeleton: Filters on Left, Deck on Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="w-20 h-7 rounded-xl bg-blue-600/20" />
            <div className="w-24 h-7 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="w-24 h-7 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="w-20 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <div className="w-20 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <div className="w-24 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 hidden md:block" />
          </div>
          <div className="w-40 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 self-end sm:self-center" />
        </div>

        {/* Game Bento Cards Grid Skeleton: 7 cards */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[270px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="w-20 h-6 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40" />
                </div>
                <div className="space-y-1.5">
                  <div className="w-36 h-5 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="w-48 h-3.5 rounded bg-slate-100 dark:bg-slate-800/60" />
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-3 rounded bg-slate-100 dark:bg-slate-800/40" />
                  <div className="w-4/5 h-3 rounded bg-slate-100 dark:bg-slate-800/40" />
                  <div className="w-3/5 h-3 rounded bg-slate-100 dark:bg-slate-800/40" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <div className="w-14 h-5 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="w-16 h-5 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="w-16 h-4 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
