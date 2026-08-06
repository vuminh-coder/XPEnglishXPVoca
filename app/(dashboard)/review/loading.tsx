"use client";
import React from "react";

export default function ReviewLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-16 md:pb-6 select-none animate-pulse">
      {/* SRS Header Bar */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-6 w-48 rounded-xs bg-slate-200 dark:bg-slate-800" />
          <div className="h-3.5 w-64 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        </div>
        <div className="h-8 w-24 rounded-full bg-emerald-500/20" />
      </div>

      {/* SRS Word Card Skeleton */}
      <div className="p-8 sm:p-10 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4 text-center min-h-[260px] flex flex-col justify-center items-center">
        <div className="h-4 w-28 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        <div className="h-9 w-60 rounded-xs bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-40 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
        <div className="h-4 w-full max-w-md rounded-xs bg-slate-100 dark:bg-slate-800/40 mt-3" />
      </div>

      {/* 4 SRS Recall Confidence Buttons Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="h-12 rounded-xs bg-rose-500/20 border border-rose-500/30" />
        <div className="h-12 rounded-xs bg-amber-500/20 border border-amber-500/30" />
        <div className="h-12 rounded-xs bg-blue-500/20 border border-blue-500/30" />
        <div className="h-12 rounded-xs bg-emerald-500/20 border border-emerald-500/30" />
      </div>
    </div>
  );
}
