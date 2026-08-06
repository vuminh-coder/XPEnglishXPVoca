"use client";
import React from "react";

export default function LoginLoading() {
  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-[#f8fafc] dark:bg-[#09090b] relative w-full font-sans animate-pulse">
      
      {/* Mobile Header Bar */}
      <header className="lg:hidden w-full px-4 sm:px-8 py-3 flex justify-between items-center bg-white/80 dark:bg-[#09090b]/80 border-b border-slate-200/80 dark:border-white/10">
        <div className="h-6 w-36 rounded-xs bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-28 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-[1280px] mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Branding & Feature Cards (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6">
            <div className="h-8 w-56 rounded-xs bg-blue-600/30 dark:bg-blue-500/20" />

            <div className="space-y-2 w-full">
              <div className="h-9 w-4/5 rounded-xs bg-slate-300 dark:bg-slate-800" />
              <div className="h-9 w-3/5 rounded-xs bg-blue-600/30 dark:bg-blue-500/20" />
              <div className="h-4 w-full max-w-md rounded-xs bg-slate-200 dark:bg-slate-800/60 pt-1" />
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xs p-3 flex items-center gap-3 bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-xs bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3.5 w-24 rounded-xs bg-slate-200 dark:bg-slate-800" />
                    <div className="h-2.5 w-16 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Login Card Form */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#121316] border border-slate-200/90 dark:border-white/10 rounded-xs p-6 sm:p-8 shadow-md space-y-4">
              
              <div className="text-center space-y-1.5 mb-2">
                <div className="h-7 w-36 mx-auto rounded-xs bg-slate-300 dark:bg-slate-700" />
                <div className="h-3.5 w-56 mx-auto rounded-xs bg-slate-100 dark:bg-slate-800/60" />
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 rounded-xs bg-slate-100 dark:bg-[#18191c] border border-slate-200 dark:border-white/10" />
                <div className="h-10 rounded-xs bg-slate-100 dark:bg-[#18191c] border border-slate-200 dark:border-white/10" />
              </div>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
                <div className="h-3 w-32 mx-2 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              </div>

              {/* Form Input Slots */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-3 w-16 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-10 w-full rounded-xs bg-slate-50 dark:bg-[#18191c] border border-slate-200 dark:border-white/10" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-16 rounded-xs bg-slate-200 dark:bg-slate-800" />
                  <div className="h-10 w-full rounded-xs bg-slate-50 dark:bg-[#18191c] border border-slate-200 dark:border-white/10" />
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="h-11 w-full rounded-xs bg-blue-600/40 dark:bg-blue-500/40 pt-2" />

              {/* Bottom Nav Link */}
              <div className="h-4 w-48 mx-auto rounded-xs bg-slate-100 dark:bg-slate-800/60 pt-2" />

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
