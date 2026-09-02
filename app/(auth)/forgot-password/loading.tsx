"use client";
import React from "react";

export default function ForgotPasswordLoading() {
  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-slate-50 dark:bg-[#070709] relative w-full font-sans antialiased select-none">
      {/* Ambient Radial Gradients */}
      <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#0059bb]/5 dark:bg-[#0059bb]/10 blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[15%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Header Bar Skeleton */}
      <header className="w-full h-14 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white/90 dark:bg-[#08080b]/90 border-b border-slate-200/90 dark:border-slate-800 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
        {/* Left: Brand Logo Skeleton */}
        <div className="h-6 w-44 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />

        {/* Right: Language Selector Skeleton */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="h-9 w-28 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
        </div>
      </header>

      {/* Main Content Grid Skeleton */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-7xl mx-auto z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Branding & Feature Cards (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6 select-none">
            {/* Top Category Badge */}
            <div className="h-7 w-72 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 animate-pulse" />

            {/* Headline & Description */}
            <div className="space-y-2.5 w-full">
              <div className="h-10 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-10 w-3/5 rounded-xl bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-950/80 dark:to-indigo-950/80 animate-pulse" />
              <div className="h-4 w-full max-w-lg rounded-md bg-slate-200/70 dark:bg-slate-800/70 animate-pulse mt-1" />
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs animate-pulse"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-16 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof Strip */}
            <div className="w-full max-w-lg p-3.5 rounded-2xl bg-white/80 dark:bg-[#0c0c0f]/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shadow-2xs animate-pulse">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((a) => (
                    <div
                      key={a}
                      className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-[#0c0c0f]"
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-36 rounded bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="h-6 w-16 rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>

          {/* Right Column: High-End Forgot Password Card */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[440px] bg-white dark:bg-[#0c0c10] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40 relative backdrop-blur-md animate-pulse">
              
              {/* Card Title & Subtitle */}
              <div className="mb-6 text-center space-y-2">
                <div className="h-8 w-40 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-60 mx-auto rounded-md bg-slate-100 dark:bg-slate-800/60" />
              </div>

              {/* Form Input: Email */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-11 w-full rounded-xl bg-slate-50/60 dark:bg-[#121316] border border-slate-200/90 dark:border-slate-800" />
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="w-full h-11 sm:h-12 mt-4 bg-[#0059bb]/30 dark:bg-blue-600/30 rounded-xl" />

              {/* Manual Token Toggle Link */}
              <div className="h-4 w-48 mx-auto rounded-md bg-slate-100 dark:bg-slate-800/60 mt-4" />

              {/* Bottom Switch to Login Link */}
              <div className="h-4 w-40 mx-auto rounded-md bg-slate-100 dark:bg-slate-800/60 mt-6" />

              {/* Security Trust Badge */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-200/80 dark:bg-emerald-950" />
                <div className="h-3 w-52 rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Website Footer Skeleton */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 sm:px-8 md:px-12 py-4 border-t border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#08080b]/90 backdrop-blur-md select-none animate-pulse">
        <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800 hidden sm:block" />
        <div className="h-4 w-56 rounded bg-slate-100 dark:bg-slate-800/60" />
      </footer>
    </div>
  );
}
