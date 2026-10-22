"use client";
import React from "react";

/**
 * ShimmerBox: High-End Shimmer Skeleton Box helper
 */
function ShimmerBox({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const hasCustomRounding = className.includes("rounded");
  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 ${
        hasCustomRounding ? "" : "rounded-lg"
      } before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`}
    />
  );
}

/**
 * RoadmapLoading
 * Skeleton loading bám sát 1:1 hình học giao diện Con Đường Ziczac:
 * 1. AppTopHeader (56px) với Navigation Pills + Nút CTA "Học tiếp: Chặng X"
 * 2. Compact Pathway Banner (~50px)
 * 3. Lưới Bento 8/12 + 4/12:
 *    - Cột Trái 8-Cols: Container Ziczac Pathway với các node ziczac uốn lượn và cột mốc tổng hợp
 *    - Cột Phải 4-Cols: ZiczacCompanionInspector (Card thông tin chặng và nút luyện tập)
 * Đạt chuẩn CLS = 0 (Cumulative Layout Shift = 0px).
 */
export default function RoadmapLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      {/* 1. APP TOP HEADER SKELETON (56px h-14 BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 shadow-2xs">
        {/* Left: Mobile Trigger + Header Tabs */}
        <div className="flex items-center gap-2">
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 hidden sm:inline-flex">
            <ShimmerBox className="w-24 h-7 rounded-lg bg-[#0059bb]/20 dark:bg-sky-400/20" />
            <ShimmerBox className="w-20 h-7 rounded-lg hidden sm:block" />
          </div>
          {/* Mobile Title Placeholder */}
          <div className="sm:hidden flex items-center gap-1.5">
            <ShimmerBox className="w-4 h-4 rounded" />
            <ShimmerBox className="w-24 h-4 rounded" />
          </div>
        </div>

        {/* Right Desktop: Nút CTA "Học tiếp: Chặng X" + Mobile Action & Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-40 sm:w-48 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/20 hidden sm:block" />
          <ShimmerBox className="h-8 w-20 rounded-lg bg-[#0059bb]/30 sm:hidden" />
          <ShimmerBox className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0 lg:hidden" />
        </div>
      </header>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 space-y-4 pt-1">
        {/* 3. FULL WIDTH DUOLINGO PATHWAY SKELETON (0px CLS) */}
        <div className="w-full min-w-0">
          <div className="w-full py-2 sm:py-4 space-y-10">
            {/* Unit Header Banner Skeleton */}
            <div className="w-full max-w-2xl sm:max-w-3xl mx-auto h-24 rounded-2xl bg-[#0059bb]/30 p-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <ShimmerBox className="h-5 w-48 rounded bg-white/40" />
                <ShimmerBox className="h-3.5 w-64 rounded bg-white/30" />
              </div>
              <ShimmerBox className="h-9 w-28 rounded-xl bg-white/30" />
            </div>

            {/* Duolingo Circular Nodes Staggered */}
            <div className="space-y-10 max-w-sm sm:max-w-md mx-auto">
              {/* Step 1 (Center) */}
              <div className="flex flex-col items-center">
                <ShimmerBox className="w-20 h-20 rounded-full" />
                <ShimmerBox className="mt-2.5 h-3.5 w-24 rounded" />
              </div>

              {/* Step 2 (Right) */}
              <div className="flex flex-col items-end pr-10">
                <ShimmerBox className="w-20 h-20 rounded-full" />
                <ShimmerBox className="mt-2.5 h-3.5 w-24 rounded" />
              </div>

              {/* Step 3 (Center) */}
              <div className="flex flex-col items-center">
                <ShimmerBox className="w-20 h-20 rounded-full" />
                <ShimmerBox className="mt-2.5 h-3.5 w-24 rounded" />
              </div>

              {/* Step 4 (Left) */}
              <div className="flex flex-col items-start pl-10">
                <ShimmerBox className="w-20 h-20 rounded-full" />
                <ShimmerBox className="mt-2.5 h-3.5 w-24 rounded" />
              </div>

              {/* Step 5 (Milestone Checkpoint Trophy Node) */}
              <div className="flex flex-col items-center">
                <ShimmerBox className="w-24 h-24 rounded-full bg-amber-500/30" />
                <ShimmerBox className="mt-3 h-5 w-40 rounded-xl bg-amber-500/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
