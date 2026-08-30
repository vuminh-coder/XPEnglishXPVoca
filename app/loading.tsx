"use client";
import React from "react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 overflow-x-hidden relative select-none animate-pulse font-sans">
      
      {/* 1. STICKY TOP NAVBAR SKELETON */}
      <header className="fixed top-0 left-0 right-0 w-full h-14 border-b border-slate-200/90 dark:border-slate-800 flex items-center z-50 bg-white/95 dark:bg-[#08080b]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6">
          <div className="h-7 w-40 sm:w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-32 rounded-xl bg-blue-600/40 dark:bg-blue-500/40" />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </header>

      {/* 2. MAIN HERO SECTION SKELETON */}
      <div className="pt-20 pb-10 md:pt-28 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Headline & CTA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-60 rounded-lg bg-blue-500/20 dark:bg-blue-400/20" />
            
            <div className="space-y-2">
              <div className="h-10 sm:h-12 w-4/5 rounded-xl bg-slate-300 dark:bg-slate-800" />
              <div className="h-10 sm:h-12 w-3/5 rounded-xl bg-blue-600/40 dark:bg-blue-500/30" />
            </div>

            <div className="h-4 w-full max-w-lg rounded-md bg-slate-200 dark:bg-slate-800/60 pt-2" />

            <div className="flex flex-row items-center gap-3 pt-2">
              <div className="h-11 w-36 sm:w-44 rounded-xl bg-blue-600/40 dark:bg-blue-500/40" />
              <div className="h-11 w-36 sm:w-44 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
            </div>

            {/* Stats Metrics Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-5 border-t border-slate-200/90 dark:border-slate-800">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <div className="h-6 w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-16 rounded-md bg-slate-200 dark:bg-slate-700/60" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Flashcard Sample Card Skeleton */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[410px] rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="h-5 w-24 rounded-lg bg-blue-500/20" />
                <div className="h-5 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="space-y-2">
                <div className="h-8 w-44 rounded-xl bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="space-y-1.5">
                <div className="h-3.5 w-20 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20" />
                  <div className="space-y-1">
                    <div className="h-3 w-14 rounded-md bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3.5 w-20 rounded-md bg-slate-300 dark:bg-slate-600" />
                  </div>
                </div>
                <div className="h-6 w-16 rounded-lg bg-emerald-500/20" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BENTO FEATURES GRID SKELETON */}
      <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="h-7 w-56 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Bento Card 1 (2 cols) */}
          <div className="md:col-span-2 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20" />
              <div className="h-6 w-44 rounded-lg bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-32 w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-slate-800" />
          </div>

          {/* Bento Card 2 (1 col) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20" />
              <div className="h-6 w-36 rounded-lg bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-28 w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-slate-800" />
          </div>

          {/* Bento Cards 3, 4, 5 (1 col each) */}
          {[1, 2, 3].map((f) => (
            <div key={f} className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-36 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-slate-800" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTTOM CTA BANNER SKELETON */}
      <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#002855] py-12 md:py-16 px-6 flex flex-col items-center justify-center gap-4">
          <div className="h-6 w-48 rounded-full bg-white/20" />
          <div className="h-9 w-3/4 max-w-lg rounded-xl bg-white/30" />
          <div className="h-4 w-1/2 max-w-md rounded-md bg-blue-100/30" />
          <div className="h-12 w-48 rounded-xl bg-white/40 mt-2" />
        </div>
      </div>

    </div>
  );
}
