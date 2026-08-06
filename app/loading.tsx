"use client";
import React from "react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 overflow-x-hidden relative select-none animate-pulse">
      
      {/* 1. STICKY TOP NAVBAR SKELETON */}
      <header className="fixed top-0 left-0 right-0 w-full h-14 border-b border-slate-200 dark:border-white/10 flex items-center z-50 bg-white/80 dark:bg-[#08080b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6">
          <div className="h-6 w-40 sm:w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-4 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-28 rounded-xs bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8.5 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
            <div className="h-8.5 w-32 rounded-xs bg-blue-600/40 dark:bg-blue-500/40" />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden w-8 h-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
        </div>
      </header>

      {/* 2. MAIN HERO SECTION SKELETON */}
      <div className="pt-20 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Headline & CTA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-60 rounded-xs bg-blue-500/20 dark:bg-blue-400/20" />
            
            <div className="space-y-2">
              <div className="h-10 w-4/5 rounded-xs bg-slate-300 dark:bg-slate-800" />
              <div className="h-10 w-3/5 rounded-xs bg-blue-600/40 dark:bg-blue-500/30" />
            </div>

            <div className="h-4 w-full max-w-lg rounded-xs bg-slate-200 dark:bg-slate-800/60 pt-2" />

            <div className="flex flex-row items-center gap-3 pt-2">
              <div className="h-11 w-36 sm:w-40 rounded-xs bg-blue-600/40 dark:bg-blue-500/40" />
              <div className="h-11 w-36 sm:w-40 rounded-xs bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10" />
            </div>

            {/* Stats Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/60 dark:border-white/5 max-w-md">
              {[1, 2, 3].map((s) => (
                <div key={s} className="space-y-1">
                  <div className="h-6 w-16 rounded-xs bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Flashcard Sample Card */}
          <div className="lg:col-span-5 w-full">
            <div className="p-5 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-16 rounded-xs bg-amber-500/20 dark:bg-amber-500/10" />
              </div>

              <div className="space-y-2">
                <div className="h-8 w-44 rounded-xs bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-28 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-4 w-full rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 space-y-1.5">
                <div className="h-3 w-20 rounded-xs bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-4/5 rounded-xs bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BENTO FEATURES GRID SKELETON */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto w-full pb-16">
        <div className="h-6 w-48 mx-auto rounded-xs bg-slate-300 dark:bg-slate-700 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((f) => (
            <div key={f} className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-xs bg-blue-500/20 dark:bg-blue-500/10" />
              <div className="h-4 w-32 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-full rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-3.5 w-3/4 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
