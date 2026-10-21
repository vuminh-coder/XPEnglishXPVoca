"use client";
import React from "react";

/**
 * 1 single card shimmer matching Reading passage cards (Full-Bleed 16/10)
 */
export function ReadingCardShimmer() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none">
      {/* 16/10 Aspect Cover Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 border-b border-slate-100 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
        <div className="absolute top-2.5 left-2.5 w-14 h-5 rounded-lg bg-slate-900/40" />
        <div className="absolute top-2.5 right-2.5 w-12 h-5 rounded-lg bg-slate-900/40" />
      </div>

      {/* Body Info Skeleton */}
      <div className="px-3 pt-2 pb-2.5 sm:px-3.5 sm:pt-2 sm:pb-2.5 flex-1 flex flex-col justify-between space-y-1.5 min-w-0">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-4.5 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4.5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs gap-2">
          <div className="h-3.5 w-14 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded-xl bg-[#0059bb]/30" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho trang Luyện Đọc dạng LISTING (khi duyệt danh sách bài đọc)
 * Bao gồm: Top bar → Search & Pills → 2 Hàng bài đọc (A1-A2 & B1-C2)
 * Khớp 100% hình học với ReadingCatalogView (0px CLS).
 */
export function ReadingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col animate-pulse font-sans select-none">
      {/* 1. TOP HEADER BAR (56px Baseline Twin) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        {/* Left: Nav Tabs */}
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <div className="h-7 w-24 rounded-lg bg-emerald-500/20 dark:bg-emerald-500/10" />
            <div className="h-7 w-24 rounded-lg hidden sm:block bg-slate-100 dark:bg-slate-800" />
            <div className="h-7 w-28 rounded-lg hidden md:block bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>

        {/* Right: Search Input + Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-44 xs:w-56 sm:w-72 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80" />
          <div className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0" />
        </div>
      </div>

      {/* 2. STATS & HERO BANNER + CATEGORY FILTER TABS CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3.5 sm:pt-4">
        {/* Stats & Hero Banner Skeleton */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0059bb]/30 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-5 h-5 rounded-md bg-white/40" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="h-5 w-48 sm:w-64 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-60 sm:w-96 rounded-md bg-slate-100 dark:bg-slate-800/60 hidden sm:block" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4 shrink-0 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 self-start md:self-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/30" />
              <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/30" />
              <div className="h-3.5 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs Bar Skeleton (5 Tabs 1:1 - Ẩn trên mobile để khớp component) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar mt-3.5 sm:mt-4">
          <div className="h-8 w-28 rounded-xl bg-[#0059bb]/30 shrink-0" />
          <div className="h-8 w-28 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0" />
          <div className="h-8 w-32 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0" />
          <div className="h-8 w-32 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0" />
          <div className="h-8 w-28 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shrink-0" />
        </div>
      </div>

      {/* 3. MAIN PASSAGES CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-2.5 sm:pt-4 pb-6 sm:pb-8 space-y-8 pb-20">
        {/* HÀNG 1: BÀI ĐỌC CƠ BẢN (A1 - A2) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-16 rounded-md bg-blue-500/20" />
              <div className="h-5 w-32 sm:w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-8 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ReadingCardShimmer key={i} />
            ))}
          </div>
        </div>

        {/* HÀNG 2: BÀI ĐỌC NÂNG CAO (B1 - C2) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-16 rounded-md bg-indigo-500/20" />
              <div className="h-5 w-36 sm:w-52 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-8 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ReadingCardShimmer key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho trang Luyện Đọc dạng STUDIO INTERACTIVE (khi đang học bài đọc có ?id=)
 * Bao gồm: StudioTopHeader → 2-Column Responsive Workspace (Left: Reading Article & Shelf | Right: Quiz Card)
 */
export function ReadingStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans animate-pulse bg-white dark:bg-slate-950">
      {/* 1. STUDIO TOP HEADER */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-5 w-12 rounded-md bg-emerald-500/20 shrink-0" />
          <div className="h-4 w-40 sm:w-64 rounded-md bg-slate-200 dark:bg-slate-800 truncate" />
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="hidden xs:flex h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-1.5 ring-slate-200/90 dark:ring-slate-700 bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>
      </div>

      {/* 2. DUAL-PANE WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-hidden">
        {/* LEFT: READING ARTICLE TEXT CANVAS (60%) */}
        <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 space-y-6 overflow-y-auto border-r border-slate-200/80 dark:border-slate-800">
          {/* Cover & Title banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[96%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[92%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[60%] rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[98%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[90%] rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-[75%] rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Vocabulary Shelf */}
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded bg-emerald-500/20" />
              <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: QUIZ QUESTION PANE (40%) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] p-4 sm:p-5 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40 shrink-0 space-y-4">
          <div className="space-y-4">
            {/* Question progress header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-16 rounded-full bg-emerald-500/20" />
            </div>

            {/* Question title */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* 4 Radio Options */}
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-32 rounded-xl bg-emerald-500/30 dark:bg-emerald-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
