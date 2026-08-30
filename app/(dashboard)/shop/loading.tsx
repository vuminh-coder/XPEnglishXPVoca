"use client";
import React from "react";

export default function ShopLoading() {
  return (
    <div className="space-y-6 pb-20 font-sans animate-pulse select-none">
      {/* Top Header Bar Skeleton */}
      <div className="h-14 w-full bg-white/90 dark:bg-[#0c0c0f]/90 border-b border-slate-200/90 dark:border-slate-800 rounded-xl" />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7/12) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-3.5 shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-36 bg-slate-300 dark:bg-slate-700 rounded-lg" />
                    <div className="h-3 w-56 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  </div>
                </div>
                <div className="h-7 w-20 bg-amber-500/20 rounded-xl" />
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-9 w-24 bg-blue-600/30 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (5/12) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-md">
            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-slate-300 dark:bg-slate-700 rounded-lg" />
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-orange-500/15 rounded-xl" />
              <div className="h-16 bg-amber-500/15 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
