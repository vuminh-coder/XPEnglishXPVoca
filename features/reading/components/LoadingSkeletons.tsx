"use client";
import React from "react";

/**
 * Skeleton cho trang Luyện Đọc dạng LISTING (khi duyệt danh sách bài đọc)
 * Bao gồm: Top bar → Search & Pills → 2 Hàng bài đọc (A1-A2 & B1-C2)
 * Tương thích 1:1 với bố cục thẻ ngang 47% trên mobile và thẻ dọc trên desktop.
 */
export function ReadingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col animate-pulse font-sans select-none">
      {/* 1. TOP HEADER BAR */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5">
            <div className="h-7 w-24 rounded-lg bg-emerald-500/20 dark:bg-emerald-500/10" />
            <div className="h-7 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="hidden sm:block h-4 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-44 xs:w-56 sm:w-72 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-9 w-24 sm:w-36 rounded-xl bg-emerald-500/20 dark:bg-emerald-500/10 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN LISTING CONTENT CANVAS */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-7 pb-20">
        {/* HÀNG 1: BÀI ĐỌC CƠ BẢN (A1 - A2) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-16 rounded-md bg-emerald-500/20" />
              <div className="h-5 w-32 sm:w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton (47% on mobile, full width aspect 16/10 on desktop) */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-10 sm:w-12 h-4 rounded bg-slate-300 dark:bg-slate-700" />
                </div>

                {/* Right Text Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="h-3 w-16 rounded bg-emerald-500/20 mb-1 sm:hidden" />
                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 mb-1.5" />
                    <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3.5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-5 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HÀNG 2: BÀI ĐỌC NÂNG CAO (B1 - C2) */}
        <div className="space-y-4 pt-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-16 rounded-md bg-purple-500/20" />
              <div className="h-5 w-36 sm:w-52 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton (47% on mobile, full width aspect 16/10 on desktop) */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-10 sm:w-12 h-4 rounded bg-slate-300 dark:bg-slate-700" />
                </div>

                {/* Right Text Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="h-3 w-16 rounded bg-purple-500/20 mb-1 sm:hidden" />
                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 mb-1.5" />
                    <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3.5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-5 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80" />
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
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="hidden sm:flex h-8 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="h-8 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
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
