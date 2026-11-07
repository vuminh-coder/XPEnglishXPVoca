"use client";
import React from "react";

/**
 * 1 single card shimmer matching Reading passage cards (3-column airy card)
 */
export function ReadingCardShimmer() {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none">
      {/* 16/10 Aspect Cover Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-800 bg-slate-200/80 dark:bg-slate-800">
        <div className="absolute top-3.5 left-3.5 w-14 h-6 rounded-full bg-slate-900/30" />
        <div className="absolute top-3.5 right-3.5 w-16 h-6 rounded-full bg-slate-900/30" />
      </div>

      {/* Spacious Body Info Skeleton */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4 min-w-0">
        <div className="space-y-2.5">
          <div className="h-3.5 w-36 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800 text-xs gap-2">
          <div className="h-4 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho trang Luyện Đọc dạng LISTING (/study/reading)
 * Khớp 100% hình học với ReadingCatalogView (nền giấy ấm, lưới 3 cột thoáng).
 */
export function ReadingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 flex flex-col animate-pulse font-sans select-none pb-16">
      {/* 1. MOBILE-ONLY TOP HEADER BAR (lg:hidden) */}
      <div className="lg:hidden w-full h-[50px] sm:h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-48 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>
      </div>

      {/* 2. SPACIOUS CENTERED CATALOG SKELETON */}
      <div className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pt-3.5 sm:pt-4 lg:pt-5 pb-8 space-y-4 sm:space-y-5">
        {/* Filter Pills Row + Desktop Search Shimmer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-28 sm:w-32 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0"
              />
            ))}
          </div>
          <div className="hidden lg:block h-9 w-64 xl:w-72 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0" />
        </div>

        {/* Section 1: 4 Cards in 4-Column Row */}
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 rounded-full bg-blue-500/15" />
              <div className="h-6 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-9 w-36 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ReadingCardShimmer key={i} />
            ))}
          </div>
        </div>

        {/* Section 2: 4 Cards in 4-Column Row */}
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 rounded-full bg-indigo-500/15" />
              <div className="h-6 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-9 w-36 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ReadingCardShimmer key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho Phòng Luyện Đọc & Phân Tích Đoạn Văn (/study/reading/[id])
 * Khớp với bố cục khung trung tâm thoáng đãng của ReadingPracticeStudio.
 */
export function ReadingStudioSkeleton() {
  return (
    <div className="w-full h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden select-none font-sans animate-pulse bg-[#fffefb] dark:bg-slate-950">
      {/* 1A. MOBILE APPTOPHEADER SKELETON (lg:hidden) */}
      <div className="lg:hidden w-full h-[50px] sm:h-14 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-5 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-8 w-16 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-16 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 1B. DESKTOP FLOATING STUDIO BAR (hidden lg:flex) */}
      <div className="hidden lg:flex w-full max-w-6xl xl:max-w-7xl mx-auto px-8 pt-4 pb-2 items-center justify-between gap-3 shrink-0">
        <div className="h-9 w-36 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          <div className="h-9 w-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          <div className="h-9 w-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
        </div>
      </div>

      {/* 2. CENTERED DUAL-COLUMN WORKSPACE */}
      <div className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 pb-4 sm:pb-7 pt-1 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-9 min-h-0 overflow-hidden">
        {/* LEFT: EDITORIAL READING SHEET */}
        <div className="h-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-7 sm:px-10 sm:py-10 lg:px-12 lg:py-11 space-y-7 overflow-hidden">
          <div className="max-w-[65ch] mx-auto space-y-6">
            <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="h-5 w-44 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[95%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[90%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[70%] rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-3 pt-2">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[96%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[88%] rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>

        {/* RIGHT: QUESTION / DICTIONARY DOCK */}
        <div className="hidden lg:flex flex-col gap-4 h-full min-h-0">
          <div className="h-9 w-56 rounded-full bg-slate-100 dark:bg-slate-900" />
          <div className="flex-1 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                ))}
              </div>
              <div className="h-5 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-14 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/60" />
                ))}
              </div>
            </div>
            <div className="h-11 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
