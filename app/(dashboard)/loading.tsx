"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 select-none animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2.5 w-full max-w-sm">
          <div className="h-7 w-48 rounded-lg bg-slate-200 dark:bg-neutral-800" />
          <div className="h-4 w-72 rounded-md bg-slate-100 dark:bg-neutral-850" />
        </div>
        <div className="h-8 w-32 rounded-lg bg-slate-200 dark:bg-neutral-800 self-start md:self-auto shrink-0" />
      </div>

      {/* Grid Bento Mockup Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cell 1: Welcome Header Card Skeleton (Spans 2 columns) */}
        <div className="md:col-span-2 bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[210px]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-neutral-800" />
              <div className="h-7 w-72 rounded-lg bg-slate-200 dark:bg-neutral-800" />
              <div className="h-4 w-full max-w-md rounded-md bg-slate-100 dark:bg-neutral-850" />
            </div>
            <div className="flex items-center justify-between gap-4 mt-5">
              <div className="h-10 w-36 rounded-xl bg-slate-200 dark:bg-neutral-800" />
              <div className="h-3.5 w-28 rounded bg-slate-100 dark:bg-neutral-850" />
            </div>
          </div>
        </div>

        {/* Cell 2: Mini Tracker Card Skeleton */}
        <div className="bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[210px]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-neutral-800" />
              <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-neutral-800" />
            </div>
            <div className="flex flex-col items-center gap-1.5 my-2">
              <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-neutral-800" />
              <div className="h-3 w-28 rounded bg-slate-100 dark:bg-neutral-850" />
            </div>
            <div className="flex justify-between gap-1.5 mt-3">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="h-2 w-3 rounded bg-slate-100 dark:bg-neutral-850" />
                    <div className="w-6 h-6 rounded-lg bg-slate-200/80 dark:bg-neutral-800" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Cell 3: Daily Task Card Skeleton */}
        <div className="bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[210px]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-3 w-24 rounded bg-slate-200 dark:bg-neutral-800" />
              <div className="h-5 w-5 rounded bg-slate-200 dark:bg-neutral-800" />
            </div>
            <div className="space-y-3 mt-3">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3.5 w-32 rounded bg-slate-200 dark:bg-neutral-800" />
                    <div className="h-3 w-8 rounded bg-slate-200 dark:bg-neutral-800" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-neutral-850" />
                </div>
              ))}
            </div>
            <div className="h-3 w-28 rounded bg-slate-100 dark:bg-neutral-850 mx-auto" />
          </div>
        </div>

        {/* Cells 4 - 7: Stats Cards Skeletons */}
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[150px]">
              <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-neutral-800" />
                  <div className="h-3 w-16 rounded bg-slate-100 dark:bg-neutral-850" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-6 w-20 rounded-md bg-slate-200 dark:bg-neutral-800" />
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-neutral-850" />
                </div>
              </div>
            </div>
          ))}

        {/* Bottom charts/calendar sections Skeletons */}
        <div className="md:col-span-2 bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[220px]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
            <div className="flex justify-between mb-4">
              <div className="space-y-1.5">
                <div className="h-3 w-28 rounded bg-slate-100 dark:bg-neutral-850" />
                <div className="h-4.5 w-44 rounded bg-slate-200 dark:bg-neutral-800" />
              </div>
              <div className="h-5 w-16 rounded bg-slate-200 dark:bg-neutral-800" />
            </div>
            <div className="flex items-end justify-between gap-3 h-24 pt-2">
              {Array(7)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="h-3.5 w-6 rounded bg-slate-150 dark:bg-neutral-850" />
                    <div className="w-full rounded-t-lg bg-slate-200 dark:bg-neutral-800" style={{ height: `${20 + i * 10}%` }} />
                    <div className="h-3.5 w-5 rounded bg-slate-100 dark:bg-neutral-850" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bezel-outer p-1.5 bg-slate-200/40 dark:bg-white/5 rounded-[2rem] h-[220px]">
          <div className="bezel-inner rounded-[calc(2rem-6px)] p-6 bg-slate-50 dark:bg-[#0c0c0e] h-full flex flex-col justify-between">
            <div className="flex justify-between mb-4">
              <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-slate-100 dark:bg-neutral-850" />
                <div className="h-4.5 w-40 rounded bg-slate-200 dark:bg-neutral-800" />
              </div>
              <div className="h-4.5 w-24 rounded bg-slate-100 dark:bg-neutral-850" />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array(28)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-8 rounded-lg bg-slate-150 dark:bg-neutral-800" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
