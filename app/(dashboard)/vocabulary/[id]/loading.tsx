"use client";
import React from "react";

export default function VocabDetailLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      {/* 0. BRAND TOP HEADER SKELETON (56px Baseline) */}
      <div className="w-full h-14 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left: Back + Title + Mode Pills Skeleton */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-5 w-32 sm:w-44 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hidden sm:flex items-center gap-1 shrink-0">
            <div className="h-7 w-20 rounded-lg bg-blue-500/20" />
            <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-700 hidden md:block" />
            <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-700 hidden lg:block" />
          </div>
        </div>

        {/* Right: Action Button Skeleton */}
        <div className="h-9 w-32 rounded-xl bg-blue-500/20 shrink-0" />
      </div>

      {/* MAIN CONTAINER: 2-COLUMN STAGE (65% Flashcard Stage Left + 35% Visual Showcase Right) */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column (65%): Flashcard 3D Stage Skeleton */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-3">
            {/* Top Bar Skeleton */}
            <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <div className="h-7 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-7 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-7 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* Flashcard Skeleton */}
            <div className="w-full min-h-[320px] sm:min-h-[360px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between">
                <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="space-y-3 text-center my-auto">
                <div className="h-10 w-48 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-28 mx-auto rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-36 mx-auto rounded bg-blue-500/20" />
                <div className="h-9 w-32 mx-auto rounded-xl bg-blue-500/15" />
              </div>
              <div className="h-4 w-60 rounded bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Bottom Bar Skeleton */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
              <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-44 rounded-xl bg-emerald-500/20" />
              <div className="h-10 w-32 rounded-xl bg-blue-500/20" />
            </div>
          </div>

          {/* Right Column (35%): Visual Showcase Skeleton */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full space-y-3">
              <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="pt-2.5 px-1 flex items-center justify-between">
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
