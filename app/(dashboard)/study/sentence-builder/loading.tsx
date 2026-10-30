"use client";

import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

export default function SentenceBuilderLoading() {
  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-3 sm:py-5 gap-3 sm:gap-4">
        {/* 1. Top bar skeleton */}
        <div className="flex items-center gap-3 shrink-0">
          <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0" />
          <ShimmerBox className="flex-1 h-3.5 sm:h-4 rounded-full" />
          <ShimmerBox className="w-16 h-8 rounded-xl shrink-0" />
        </div>

        {/* 2. Title skeleton */}
        <ShimmerBox className="w-64 h-7 sm:h-8 rounded-xl shrink-0" />

        {/* 3. Mascot & Speech Bubble skeleton */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full">
          <ShimmerBox className="w-20 h-26 sm:w-28 sm:h-36 rounded-2xl shrink-0" />
          <ShimmerBox className="flex-1 h-16 sm:h-20 rounded-2xl" />
        </div>

        {/* 4. Answer lines skeleton */}
        <div className="min-h-[104px] flex flex-col justify-between py-3 shrink-0">
          <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-800" />
          <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* 5. Word bank chips skeleton */}
        <div className="flex flex-wrap justify-center gap-2.5 px-1 py-1 shrink-0">
          {["w-20", "w-24", "w-16", "w-28", "w-20", "w-24"].map((wClass, idx) => (
            <ShimmerBox key={idx} className={`${wClass} h-11 rounded-2xl`} />
          ))}
        </div>

        {/* 6. Footer action dock skeleton */}
        <div className="pt-3 pb-3 border-t-2 border-slate-200 dark:border-slate-800 shrink-0">
          <ShimmerBox className="w-full h-12 sm:h-13 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
