"use client";
import React from "react";

/**
 * High-End Shimmer Skeleton Box helper for AI Conversation Studio
 */
function ShimmerBox({
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

export default function AiConversationLoading() {
  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-[#fffefb] dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. MOBILE APP TOP HEADER SKELETON (lg:hidden - EXACT 1:1 GEOMETRIC TWIN - 0PX CLS) */}
      <div className="lg:hidden w-full h-14 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShimmerBox className="h-9 w-9 rounded-xl" />
          <ShimmerBox className="h-7 w-28 rounded-xl !bg-[#0059bb]/15 dark:!bg-sky-500/25" />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <ShimmerBox className="h-8 w-20 rounded-xl !bg-slate-200/80 dark:!bg-slate-800/80" />
          <ShimmerBox className="h-8 w-24 rounded-xl !bg-emerald-500/20 dark:!bg-emerald-500/25 shrink-0" />
          <ShimmerBox className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN STUDIO VIEWPORT CANVAS (MATCHES 1:1 PAGE GEOMETRY) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-2.5 flex flex-col min-h-0 lg:overflow-hidden pb-16 lg:pb-2.5">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3 items-stretch min-w-0">
          {/* CỘT TRÁI: AI CHAT STUDIO & INPUT DOCK (8/12) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2">
              {/* Unified Desktop Studio Header Skeleton */}
              <div className="hidden lg:flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-9 w-56 rounded-xl !bg-slate-100 dark:!bg-slate-800" />
                  <ShimmerBox className="h-9 w-36 rounded-xl" />
                  <ShimmerBox className="h-9 w-28 rounded-xl" />
                </div>
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="h-9 w-24 rounded-xl" />
                  <ShimmerBox className="h-9 w-24 rounded-xl" />
                  <ShimmerBox className="h-9 w-28 rounded-xl !bg-emerald-500/20" />
                </div>
              </div>

              {/* Mobile Studio Header Skeleton */}
              <div className="flex lg:hidden flex-col gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <ShimmerBox className="h-8 flex-1 rounded-xl" />
                  <ShimmerBox className="h-8 w-20 rounded-xl" />
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <ShimmerBox className="h-7 w-24 rounded-xl" />
                    <ShimmerBox className="h-7 w-20 rounded-xl" />
                  </div>
                  <ShimmerBox className="h-7 w-28 rounded-xl" />
                </div>
              </div>

              {/* Chat Stream Skeleton */}
              <div className="flex-1 min-h-[280px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5">
                {/* AI Welcome Message Bubble */}
                <div className="flex items-start gap-2.5 justify-start">
                  <ShimmerBox className="w-8 h-8 rounded-xl !bg-[#0059bb]/20 dark:!bg-sky-400/20 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 max-w-[85%] sm:max-w-[80%] w-full">
                    <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <ShimmerBox className="h-3.5 w-full rounded-md" />
                      <ShimmerBox className="h-3.5 w-4/5 rounded-md" />
                    </div>
                    <div className="flex items-center gap-3 px-1">
                      <ShimmerBox className="h-3.5 w-16 rounded-md" />
                      <ShimmerBox className="h-3.5 w-20 rounded-md" />
                    </div>
                  </div>
                </div>

                {/* User Message Bubble */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="space-y-1.5 max-w-[85%] sm:max-w-[75%] items-end flex flex-col w-full">
                    <div className="p-3.5 rounded-2xl bg-[#0059bb]/25 dark:bg-[#0059bb]/35 border border-[#0059bb]/30 space-y-2 w-3/4">
                      <ShimmerBox className="h-3.5 w-full rounded-md !bg-white/40 dark:!bg-white/20" />
                    </div>
                  </div>
                  <ShimmerBox className="w-8 h-8 rounded-full shrink-0 mt-0.5" />
                </div>

                {/* AI Detailed Feedback Bubble */}
                <div className="flex items-start gap-2.5 justify-start">
                  <ShimmerBox className="w-8 h-8 rounded-xl !bg-[#0059bb]/20 dark:!bg-sky-400/20 shrink-0 mt-0.5" />
                  <div className="space-y-2 max-w-[88%] sm:max-w-[82%] w-full">
                    <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <ShimmerBox className="h-3.5 w-full rounded-md" />
                      <ShimmerBox className="h-3.5 w-5/6 rounded-md" />
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                      <ShimmerBox className="h-3.5 w-36 rounded-md !bg-amber-500/20" />
                      <ShimmerBox className="h-3.5 w-4/5 rounded-md" />
                      <ShimmerBox className="h-3.5 w-3/4 rounded-md !bg-emerald-500/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Voice & Text Input Dock (Pinned to Bottom - 0px CLS) */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <ShimmerBox className="w-9 h-9 rounded-full !bg-[#0059bb]/30 dark:!bg-[#0059bb]/40 shrink-0" />
                  <ShimmerBox className="h-9 flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />
                  <ShimmerBox className="h-9 w-20 rounded-xl !bg-[#0059bb]/25 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: GOALS & CONTEXTUAL VOCABULARY DECK (4/12) */}
          <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 overflow-y-auto">
              {/* Goals Checklist Shimmer */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                  <ShimmerBox className="h-4 w-32 rounded-md !bg-[#0059bb]/15" />
                  <ShimmerBox className="h-4 w-12 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5"
                    >
                      <ShimmerBox className="w-4 h-4 rounded-full mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <ShimmerBox className="h-3.5 w-3/4 rounded-md" />
                        <ShimmerBox className="h-3 w-1/2 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Vocab Shimmer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-4 w-28 rounded-md !bg-[#0059bb]/15" />
                  <ShimmerBox className="h-3.5 w-16 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="space-y-1 flex-1">
                        <ShimmerBox className="h-3.5 w-20 rounded-md" />
                        <ShimmerBox className="h-3 w-32 rounded-md" />
                      </div>
                      <ShimmerBox className="w-7 h-7 rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions Phrases Shimmer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-4 w-28 rounded-md !bg-amber-500/15" />
                  <ShimmerBox className="h-3.5 w-16 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between"
                    >
                      <ShimmerBox className="h-3.5 w-5/6 rounded-md" />
                      <ShimmerBox className="w-4 h-4 rounded-md !bg-amber-500/20" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Polite Communication Tip Shimmer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <ShimmerBox className="h-4 w-36 rounded-md !bg-emerald-500/15" />
                <ShimmerBox className="h-12 w-full rounded-xl !bg-emerald-500/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
