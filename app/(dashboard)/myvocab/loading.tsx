"use client";

import React from "react";

export default function MyVocabLoading() {
  return (
    <div className="space-y-4 pb-20 font-sans animate-pulse select-none antialiased">
      {/* ─── Top Header Bar Skeleton (56px) ─── */}
      <div className="h-14 w-full bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between" />

      {/* ─── Main Content Container ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. Slim Title & Mastery Progress Row Skeleton (~36px) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-48 sm:w-60 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full hidden xs:block" />
            </div>
          </div>

          <div className="h-8 w-64 sm:w-72 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />
        </div>

        {/* 2. Dòng 2: 5 Tab Filter Pills Row Skeleton */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-slate-950/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
            {[72, 68, 76, 74, 78].map((w, i) => (
              <div
                key={i}
                className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <div className="h-5 w-28 bg-slate-100 dark:bg-slate-800 rounded-md hidden sm:block mr-2" />
        </div>

        {/* 3. Dòng 3: Search Box on Left + Actions on Right Skeleton (Divided 2 sides) */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Search Box Skeleton */}
          <div className="h-9 flex-1 max-w-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-xl" />
          {/* Right: Actions Skeleton */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <div className="h-9 w-28 bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-800 rounded-xl" />
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-800 rounded-xl shrink-0" />
          </div>
        </div>

        {/* 3. Compact Word Cards Grid Skeleton (3-4 Columns Matching 1:1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3.5 sm:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                {/* Meta Row: Tag + Heart */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="h-4 w-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
                </div>

                {/* Word + Audio button */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60 shrink-0" />
                  </div>
                  <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/60 rounded-md mt-1" />
                </div>

                {/* Meaning */}
                <div className="space-y-1">
                  <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-3 w-3/5 bg-slate-100 dark:bg-slate-800/50 rounded-md" />
                </div>

                {/* Subtle example quote line */}
                <div className="pt-2 border-t border-dashed border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800/50 rounded-md" />
                  <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800/60 shrink-0" />
                </div>
              </div>

              {/* Footer: SRS dots + Quick Practice */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div key={d} className="w-2 h-1.5 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  ))}
                  <div className="h-3 w-6 bg-slate-100 dark:bg-slate-800/60 rounded-md ml-1" />
                </div>
                <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
