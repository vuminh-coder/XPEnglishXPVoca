"use client";
import React from "react";
import { JAGGED_ACOUSTIC_SPEECH_SPIKES_95 } from "@/features/listening/components/StudioWaveformCard";

/**
 * High-End Shimmer Skeleton Box helper
 */
export function ShimmerBox({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`}
    />
  );
}

/**
 * Skeleton cho trang Shadowing dạng LISTING (khi chưa chọn bài, không có ?id=)
 * Bao gồm: Top bar 56px → Filter search → 2 hàng bài học (8 Basic Cards + 8 Advanced Cards)
 */
export function ShadowingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP APP HEADER SKELETON (56px Baseline) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <ShimmerBox className="h-7 w-24 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-28 rounded-lg hidden md:block" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <ShimmerBox className="h-9 w-44 xs:w-56 sm:w-72 rounded-xl" />
          <ShimmerBox className="h-9 w-24 sm:w-28 rounded-xl bg-blue-600/30" />
        </div>
      </div>

      {/* 2. MAIN CONTENT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-7 pb-20">
        {/* ROW 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-6 w-16 rounded-md bg-blue-500/20 dark:bg-blue-500/10" />
              <ShimmerBox className="h-6 w-40 sm:w-56 rounded-md" />
            </div>
            <ShimmerBox className="h-7 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3 w-20 rounded mb-1 sm:hidden bg-blue-500/20" />
                    <ShimmerBox className="h-4 w-full rounded" />
                    <ShimmerBox className="h-4 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-12 rounded" />
                    </div>
                    <ShimmerBox className="h-5 w-14 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
        <div className="space-y-4 pt-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-6 w-16 rounded-md bg-purple-500/20 dark:bg-purple-500/10" />
              <ShimmerBox className="h-6 w-44 sm:w-60 rounded-md" />
            </div>
            <ShimmerBox className="h-7 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3 w-20 rounded mb-1 sm:hidden bg-purple-500/20" />
                    <ShimmerBox className="h-4 w-full rounded" />
                    <ShimmerBox className="h-4 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-12 rounded" />
                    </div>
                    <ShimmerBox className="h-5 w-14 rounded-lg" />
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
 * Khớp 100% hình học StudioTopHeader, Waveform Card 95-spikes, Live Mic Recording Box, AI Analysis Matrix và Sidebar
 */
export function ShadowingStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans bg-white dark:bg-slate-950">
      {/* 1. TOP HEADER SKELETON (56px) */}
      <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <ShimmerBox className="w-9 h-9 rounded-xl shrink-0" />
          <ShimmerBox className="h-5 w-36 sm:w-56 lg:w-72 rounded-md" />
          <ShimmerBox className="w-7 h-7 rounded-lg hidden xs:block" />
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 shrink-0">
            <ShimmerBox className="h-6 w-14 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
            <ShimmerBox className="h-6 w-12 rounded-lg" />
          </div>
        </div>

        {/* Right: Clock Timer Pill & Studio Toolbar */}
        <div className="flex items-center gap-3 shrink-0">
          <ShimmerBox className="h-7 w-20 rounded-full bg-amber-500/15 dark:bg-amber-500/20" />
          <div className="hidden md:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
            {[1, 2, 3].map((i) => (
              <ShimmerBox key={i} className="w-7 h-7 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. MOBILE TAB SWITCHER SKELETON (< lg) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0">
        <div className="pb-2.5">
          <ShimmerBox className="h-4 w-32 rounded-md bg-blue-600/30 dark:bg-sky-400/30" />
        </div>
        <div className="pb-2.5">
          <ShimmerBox className="h-4 w-36 rounded-md opacity-60" />
        </div>
      </div>

      {/* 3. 2-COLUMN STUDIO WORKSPACE SKELETON */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE */}
        <div className="flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
          {/* 3.1. KHỐI AUDIO WAVEFORM STUDIO CARD */}
          <div className="p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/60 dark:shadow-black/40 space-y-2 sm:space-y-2.5">
            {/* Top Status LED + Digital Timer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
                <ShimmerBox className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                <ShimmerBox className="w-4 h-4 rounded" />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
                <ShimmerBox className="h-4 w-10 rounded font-mono" />
                <span className="text-slate-400 text-xs">/</span>
                <ShimmerBox className="h-4 w-10 rounded font-mono opacity-60" />
              </div>
            </div>

            {/* Jagged Acoustic Waveform Canvas */}
            <div className="w-full flex justify-center items-center py-1">
              <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-14 sm:h-16 lg:h-18 flex items-center justify-center px-1">
                <div className="flex items-center justify-center gap-[2.5px] sm:gap-[3px] w-full h-full">
                  {JAGGED_ACOUSTIC_SPEECH_SPIKES_95.map((heightPct, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${heightPct}%` }}
                      className="w-[2px] sm:w-[2.5px] rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Transport Controls & Speed Selector Row */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <ShimmerBox className="w-8 h-8 rounded-lg" />
                <ShimmerBox className="w-8 h-8 rounded-lg" />
              </div>

              {/* Master Play Button Center */}
              <div className="flex justify-center">
                <ShimmerBox className="w-11 h-11 sm:w-12 sm:h-12 rounded-full ring-4 ring-slate-200/50 dark:ring-slate-800/50" />
              </div>

              {/* Speed Pills Skeleton */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-700/60">
                {[1, 2, 3, 4, 5].map((s) => (
                  <ShimmerBox key={s} className="h-6 w-8 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* 3.2. META STATUS ROW SKELETON */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-5 w-8 rounded-md" />
              <ShimmerBox className="h-4 w-20 rounded" />
              <ShimmerBox className="h-4 w-20 rounded bg-blue-500/20" />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ShimmerBox className="h-6 w-44 rounded-lg" />
              <ShimmerBox className="h-6 w-36 rounded-lg" />
            </div>
          </div>

          {/* 3.3. SENTENCE UTILITY TOOLBAR SKELETON */}
          <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-7 w-20 rounded-lg" />
              <ShimmerBox className="h-7 w-20 rounded-lg" />
            </div>
            <div className="flex items-center gap-3">
              <ShimmerBox className="h-7 w-16 rounded-lg" />
              <ShimmerBox className="h-7 w-28 rounded-lg" />
              <ShimmerBox className="h-7 w-24 rounded-lg" />
            </div>
          </div>

          {/* 3.4. SENTENCE CARD & HORIZONTAL WORD TRACK SKELETON */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 overflow-hidden py-1">
              {[1, 2, 3, 4, 5, 6, 7].map((w) => (
                <ShimmerBox key={w} className="h-9 w-16 sm:w-20 rounded-lg shrink-0" />
              ))}
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <ShimmerBox className="h-3.5 w-24 rounded" />
              <ShimmerBox className="h-4 w-3/4 rounded" />
            </div>
          </div>

          {/* 3.5. ACTION SHORTCUT BUTTONS BAR (MIC RECORD & SAMPLE) */}
          <div className="flex items-center justify-between gap-2.5 px-1 pt-1">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-10 w-44 rounded-xl bg-rose-500/20 dark:bg-rose-500/10" />
              <ShimmerBox className="h-10 w-36 rounded-xl" />
            </div>
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-10 w-24 rounded-xl" />
              <ShimmerBox className="h-10 w-10 rounded-xl" />
            </div>
          </div>

          {/* 3.6. AI SPEECH ANALYSIS MATRIX BREAKDOWN SKELETON */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <ShimmerBox className="w-9 h-9 rounded-xl bg-emerald-500/20" />
                <div className="space-y-1">
                  <ShimmerBox className="h-3.5 w-32 rounded" />
                  <ShimmerBox className="h-3 w-56 rounded opacity-60" />
                </div>
              </div>
              <ShimmerBox className="h-6 w-20 rounded-full bg-emerald-500/20" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <div key={m} className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1 text-center">
                  <ShimmerBox className="h-2.5 w-12 rounded mx-auto" />
                  <ShimmerBox className="h-4 w-10 rounded mx-auto bg-emerald-500/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR SKELETON */}
        <div className="hidden lg:flex w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 h-full flex-col">
          {/* Header tabs skeleton */}
          <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-8 w-24 rounded-lg bg-blue-500/20" />
              <ShimmerBox className="h-8 w-28 rounded-lg" />
            </div>
          </div>

          {/* Sentences list skeleton */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto hide-scrollbar">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div
                key={s}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShimmerBox className="w-5 h-5 rounded-full" />
                    <ShimmerBox className="h-4 w-8 rounded" />
                  </div>
                  <ShimmerBox className="w-6 h-6 rounded-lg" />
                </div>
                <ShimmerBox className="h-3.5 w-full rounded" />
                <ShimmerBox className="h-3.5 w-4/5 rounded opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
