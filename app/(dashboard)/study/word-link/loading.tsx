"use client";

import React from "react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

export default function WordLinkLoading() {
  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-3 sm:py-5 gap-3">
        {/* 1. Top bar skeleton */}
        <div className="flex items-center gap-3 shrink-0">
          <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0" />
          <ShimmerBox className="flex-1 h-3.5 sm:h-4 rounded-full" />
          <ShimmerBox className="w-16 h-8 rounded-xl shrink-0" />
        </div>

        {/* 2. Mascot & Speech Bubble skeleton */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full">
          <ShimmerBox className="w-20 h-26 sm:w-28 sm:h-36 rounded-2xl shrink-0" />
          <ShimmerBox className="flex-1 h-16 sm:h-20 rounded-2xl" />
        </div>

        {/* 3. Symmetric 4-pair Match Grid skeleton */}
        <div className="flex-1 flex flex-col justify-center py-1">
          <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-3 sm:gap-y-3.5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ShimmerBox key={idx} className="w-full h-14 sm:h-[60px] rounded-2xl" />
            ))}
          </div>
        </div>

        {/* 4. Bottom footer skeleton */}
        <div className="shrink-0 w-full border-t border-slate-200/80 dark:border-slate-800 pt-2.5 pb-1">
          <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
            <ShimmerBox className="w-36 h-4 rounded-md" />
            <ShimmerBox className="w-20 h-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
