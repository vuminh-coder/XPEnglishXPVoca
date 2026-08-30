"use client";
import React from "react";

export default function ForgotPasswordLoading() {
  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col justify-between bg-slate-50 dark:bg-[#070709] relative w-full font-sans animate-pulse select-none">
      
      {/* Mobile Header Bar */}
      <header className="lg:hidden w-full h-14 px-4 sm:px-6 flex justify-between items-center bg-white/90 dark:bg-[#08080b]/90 border-b border-slate-200/90 dark:border-slate-800 backdrop-blur-md">
        <div className="h-6 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800/80" />
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 py-8 md:p-6 lg:py-12 w-full max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Branding & Feature Cards (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-start gap-6">
            <div className="h-8 w-56 rounded-xl bg-blue-600/30 dark:bg-blue-500/20" />

            <div className="space-y-2 w-full">
              <div className="h-6 w-48 rounded-lg bg-blue-500/20 dark:bg-blue-400/20" />
              <div className="h-10 w-4/5 rounded-xl bg-slate-300 dark:bg-slate-800" />
              <div className="h-10 w-3/5 rounded-xl bg-blue-600/30 dark:bg-blue-500/20" />
              <div className="h-4 w-full max-w-md rounded-md bg-slate-200 dark:bg-slate-800/60 pt-1" />
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl p-4 flex items-center gap-3.5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-16 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Forgot Password Form Card */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <div className="w-full max-w-[440px] bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
              
              <div className="text-center space-y-2 mb-2">
                <div className="h-8 w-44 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-60 mx-auto rounded-md bg-slate-100 dark:bg-slate-800/60" />
              </div>

              {/* Email Input Field */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-11 w-full rounded-xl bg-slate-50/60 dark:bg-[#121316] border border-slate-200/90 dark:border-slate-800" />
              </div>

              {/* Primary Action Button */}
              <div className="h-11 w-full rounded-xl bg-blue-600/40 dark:bg-blue-500/40 mt-2" />

              {/* Bottom Back To Login Link */}
              <div className="h-4 w-40 mx-auto rounded-md bg-slate-100 dark:bg-slate-800/60 pt-2" />

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
