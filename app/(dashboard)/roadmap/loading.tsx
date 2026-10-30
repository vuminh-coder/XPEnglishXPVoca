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
 * Skeleton loading bám sát 1:1 hình học giao diện Con Đường Ziczac (CLS = 0px):
 * 1. AppTopHeader (56px, hiển thị trên Mobile/Tablet `lg:hidden`)
 * 2. Container `max-w-3xl lg:max-w-4xl` đồng bộ 100% với `page.tsx`
 * 3. Unit Banner + 6 nút tròn uốn lượn chữ S (`[60%, 67%, 58%, 42%, 33%, 50%]`)
 */
export default function RoadmapLoading() {
  const sCurvePositions = [60, 67, 58, 42, 33, 50];

  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      {/* 1. APP TOP HEADER SKELETON (Mobile Only - Hidden on Desktop to match page.tsx) */}
      <header className="lg:hidden sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-3 shadow-2xs">
        {/* Left: Mobile Trigger + Header Tabs */}
        <div className="flex items-center gap-2">
          <ShimmerBox className="w-8 h-8 rounded-xl shrink-0" />
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

        {/* Right: Nút CTA "Học tiếp: Chặng X" + Mobile Action & Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-40 sm:w-48 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/20 hidden sm:block" />
          <ShimmerBox className="h-8 w-20 rounded-lg bg-[#0059bb]/30 sm:hidden" />
          <ShimmerBox className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0" />
        </div>
      </header>

      {/* 2. UNIFIED MAIN CONTAINER (Matches max-w-3xl lg:max-w-4xl in page.tsx) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 space-y-4 pt-1">
        {/* 3. FULL WIDTH DUOLINGO PATHWAY SKELETON (0px CLS) */}
        <div className="w-full min-w-0">
          <div className="w-full py-2 sm:py-4 space-y-8">
            {/* Unit Header Banner Skeleton */}
            <div className="w-full max-w-2xl mx-auto h-20 rounded-2xl bg-[#0059bb]/30 px-4 py-3.5 flex items-center justify-between">
              <div className="space-y-1.5">
                <ShimmerBox className="h-3.5 w-28 rounded bg-white/40" />
                <ShimmerBox className="h-5 w-48 rounded bg-white/30" />
              </div>
              <ShimmerBox className="h-10 w-24 rounded-xl bg-white/30" />
            </div>

            {/* 6-Step Duolingo S-Curve Nodes Skeleton */}
            <div className="relative w-full max-w-2xl mx-auto py-4">
              {sCurvePositions.map((xPercent, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-24 sm:h-28 flex items-center"
                >
                  <div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${xPercent}%` }}
                  >
                    <ShimmerBox
                      className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full ${
                        idx === 5 ? "bg-amber-500/30" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
