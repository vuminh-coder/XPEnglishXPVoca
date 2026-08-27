"use client";
import React from "react";

/**
 * Skeleton cho trang Shadowing dạng LISTING (khi chưa chọn bài, không có ?id=)
 * Bao gồm: Top bar → Hero banner → Lesson cards grid (2 rows)
 */
export function ShadowingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col animate-pulse font-sans select-none">
      {/* TOP BAR */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5">
            <div className="h-7 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="hidden sm:block h-4 w-40 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        {/* Hero Banner */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 dark:bg-purple-500/10 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-4 w-48 sm:w-72 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-36 sm:w-52 rounded-md bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>
          <div className="h-8 w-32 rounded-lg bg-purple-500/20 dark:bg-purple-500/10 shrink-0 hidden sm:block" />
        </div>

        {/* ROW 1: Basic */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-14 rounded-md bg-blue-500/20" />
              <div className="h-5 w-32 sm:w-44 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
                <div className="w-full h-28 sm:h-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-10 rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3 w-3/4 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-5 w-14 rounded-full bg-emerald-500/15" />
                    <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Intermediate */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-14 rounded-md bg-amber-500/20" />
              <div className="h-5 w-36 sm:w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
                <div className="w-full h-28 sm:h-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-10 rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-3 w-3/4 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-5 w-14 rounded-full bg-emerald-500/15" />
                    <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho trang Shadowing dạng STUDIO (khi đã chọn bài, có ?id=)
 * Bao gồm: StudioTopHeader → Mobile tabs → 2-column (Waveform + Sentence + ActionBar | TranscriptSidebar)
 */
export function ShadowingStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans animate-pulse bg-white dark:bg-slate-950">
      {/* STUDIO TOP HEADER */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-4 w-44 sm:w-64 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-amber-500/15 dark:bg-amber-500/10" />
          <div className="hidden sm:flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
            ))}
          </div>
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
        </div>
      </div>

      {/* MOBILE TAB SWITCHER */}
      <div className="flex lg:hidden items-center border-b border-slate-200/80 dark:border-slate-800 px-4 pt-2.5 gap-6 shrink-0">
        <div className="pb-2.5"><div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-800" /></div>
        <div className="pb-2.5"><div className="h-4 w-36 rounded-md bg-slate-100 dark:bg-slate-800/60" /></div>
      </div>

      {/* 2-COLUMN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-hidden">
        {/* LEFT: SHADOWING WORKSPACE */}
        <div className="flex-1 min-w-0 p-2.5 sm:p-3 lg:p-3.5 space-y-2 overflow-hidden">
          {/* Waveform */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-8 h-5 rounded-full bg-slate-200 dark:bg-slate-800" /><div className="h-3.5 w-20 rounded-md bg-slate-100 dark:bg-slate-800/60" /></div>
              <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-12 sm:h-14 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-end justify-center gap-0.5 p-2 overflow-hidden">
              {Array.from({ length: 44 }).map((_, i) => (<div key={i} className="w-1.5 sm:w-2 rounded-sm bg-slate-300 dark:bg-slate-700" style={{ height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%` }} />))}
            </div>
            <div className="flex items-center justify-center gap-3">
              {[1, 2].map((i) => (<div key={i} className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800" />))}
              <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700" />
              {[3, 4].map((i) => (<div key={i} className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800" />))}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (<div key={i} className="h-5 w-9 rounded-full bg-slate-100 dark:bg-slate-800/60" />))}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-5 w-8 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-16 rounded-md bg-slate-100 dark:bg-slate-800/60" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-5 w-24 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>

          {/* Sentence toolbar */}
          <div className="px-3 sm:px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-14 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-5 w-14 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-10 rounded-md bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-5 w-16 rounded-md bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-5 w-16 rounded-md bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>

          {/* Sentence words row */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              {[52, 28, 44, 60, 20, 72, 36, 88, 40, 52].map((w, i) => (
                <div key={i} className="shrink-0 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700" style={{ width: w, height: 34 }} />
              ))}
            </div>
            {/* Translation */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-lg bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-sm bg-slate-200 dark:bg-slate-700" /><div className="h-3 w-20 rounded-md bg-slate-200 dark:bg-slate-800" /></div>
                <div className="h-3.5 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800" style={{ width: 140, height: 34 }} />
              <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800" style={{ width: 110, height: 34 }} />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-[34px] rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800" />
              <div className="w-[34px] h-[34px] rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800" />
            </div>
          </div>
        </div>

        {/* RIGHT: TRANSCRIPT SIDEBAR */}
        <div className="hidden lg:flex flex-col w-[340px] xl:w-[380px] border-l border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center border-b border-slate-200/80 dark:border-slate-800 px-4 pt-2.5 gap-6 shrink-0">
            <div className="pb-2.5"><div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-800" /></div>
            <div className="pb-2.5"><div className="h-4 w-20 rounded-md bg-slate-100 dark:bg-slate-800/60" /></div>
          </div>
          <div className="px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="space-y-1"><div className="h-6 w-12 rounded-md bg-slate-300 dark:bg-slate-700" /><div className="h-3 w-14 rounded-md bg-slate-100 dark:bg-slate-800/60" /></div>
            <div className="flex items-center gap-2"><div className="h-4 w-8 rounded-md bg-slate-100 dark:bg-slate-800/60" /><div className="w-8 h-5 rounded-full bg-slate-200 dark:bg-slate-800" /></div>
          </div>
          <div className="flex-1 overflow-hidden p-2.5 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`p-2.5 rounded-xl border space-y-1.5 ${i === 1 ? "border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="h-3 w-6 rounded-md bg-slate-200 dark:bg-slate-800" />
                  {i === 1 && <div className="h-4 w-14 rounded-md bg-emerald-500/20" />}
                </div>
                <div className="h-3.5 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
