import React from "react";

export default function ExamPrepLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
      {/* 1. WORKSPACE TOP TOOLBAR SKELETON (h-14 / 56px) */}
      <header className="w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3 shrink-0 shadow-2xs">
        {/* Left: Exit button & Exam Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-24 sm:w-28 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700/60" />
          <div className="h-6 w-28 sm:w-36 rounded-md bg-slate-100 dark:bg-slate-800 hidden sm:block" />
        </div>

        {/* Center: Live Timer Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 sm:w-28 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70" />
        </div>

        {/* Right: Submit Button Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 sm:w-24 rounded-lg bg-[#0059bb]/25 dark:bg-[#0059bb]/30" />
        </div>
      </header>

      {/* 2. MAIN WORKSPACE SKELETON GRID (SIDE-BY-SIDE BENTO) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-3 sm:py-4 flex flex-col lg:flex-row gap-4">
        {/* LEFT COLUMN: QUESTION CONTENT (7/12) */}
        <section className="w-full lg:w-7/12 flex flex-col gap-3">
          {/* Top Audio/Image/Passage Box Skeleton */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-4 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
            </div>
            
            {/* Waveform / Visual preview box */}
            <div className="h-28 sm:h-36 rounded-xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center p-4">
              <div className="w-full flex items-center justify-center gap-1.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-slate-300/70 dark:bg-slate-700"
                    style={{ height: `${20 + (i % 6) * 12}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Question Text Box Skeleton */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-40 rounded-md bg-slate-200/70 dark:bg-slate-800" />
            </div>
            <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700 mt-1" />
          </div>

          {/* 4 Option Cards Skeleton */}
          <div className="grid grid-cols-1 gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-4 flex-1 rounded-md bg-slate-200/70 dark:bg-slate-800" />
              </div>
            ))}
          </div>

          {/* Bottom Action Bar Skeleton */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-9 w-28 rounded-xl bg-slate-200/80 dark:bg-slate-800" />
            <div className="h-9 w-24 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-9 w-28 rounded-xl bg-[#0059bb]/20 dark:bg-[#0059bb]/30" />
          </div>
        </section>

        {/* RIGHT COLUMN: ANSWER SHEET MATRIX (5/12) - DESKTOP */}
        <section className="hidden lg:flex lg:w-5/12 flex-col gap-3">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 sticky top-18">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-4 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* 3 Legend Badges Skeleton */}
            <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="h-8 rounded-lg bg-[#0059bb]/10 dark:bg-[#0059bb]/15 border border-[#0059bb]/20" />
              <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700" />
              <div className="h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20" />
            </div>

            {/* 6-Column Answer Matrix Grid Skeleton (24 Bubbles) */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 flex items-center justify-center"
                  >
                    <div className="w-4 h-3 rounded-xs bg-slate-300 dark:bg-slate-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
