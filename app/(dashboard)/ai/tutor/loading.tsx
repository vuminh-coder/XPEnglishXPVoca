"use client";
import React from "react";

/**
 * High-End Shimmer Skeleton Box helper for AI Voice Tutor
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

export default function AiTutorLoading() {
  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. APP TOP HEADER SKELETON (FIXED 56PX) */}
      <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        {/* Left Pills Container */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <ShimmerBox className="h-7 w-28 rounded-lg !bg-[#0059bb]/20 dark:!bg-[#0059bb]/30" />
            <ShimmerBox className="h-7 w-28 rounded-lg" />
          </div>
        </div>

        {/* Right Timer + Primary Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-20 rounded-xl !bg-slate-200/80 dark:!bg-slate-800/80 hidden sm:block" />
          <ShimmerBox className="h-9 w-20 rounded-xl !bg-amber-500/15 dark:!bg-amber-500/20 border border-amber-500/20" />
          <ShimmerBox className="h-9 w-28 rounded-xl !bg-emerald-600/20 dark:!bg-emerald-500/25 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN DASHBOARD VIEWPORT CANVAS (MATCHES 1:1 PAGE GEOMETRY) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        
        {/* 2.1. SLIM HERO STATUS STRIP */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg !bg-[#0059bb]/15 dark:!bg-sky-400/15 shrink-0" />
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <ShimmerBox className="h-4 w-44 sm:w-56 rounded-md" />
                <ShimmerBox className="h-4 w-24 rounded-md !bg-[#0059bb]/15" />
              </div>
              <ShimmerBox className="h-3 w-64 sm:w-96 rounded-md" />
            </div>
          </div>
          <ShimmerBox className="h-8 w-24 rounded-xl hidden sm:block" />
        </div>

        {/* 2.2. MAIN BENTO GRID (8/12 - 4/12) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
          
          {/* CỘT TRÁI: VOICE CHAT STREAM & INPUT DOCK (8/12) */}
          <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2.5">
              
              {/* Header Trong Khung Chat */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-8 h-5 rounded-md !bg-[#0059bb]/15" />
                  <ShimmerBox className="h-4 w-48 rounded-md" />
                </div>
                <ShimmerBox className="h-6 w-20 rounded-md" />
              </div>

              {/* Chat Stream Skeleton */}
              <div className="flex-1 min-h-[280px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5">
                
                {/* AI Welcome Message Bubble */}
                <div className="flex items-start gap-2.5 justify-start">
                  <ShimmerBox className="w-8 h-8 rounded-lg !bg-[#0059bb]/20 dark:!bg-sky-400/20 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 max-w-[85%] sm:max-w-[80%] w-full">
                    <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <ShimmerBox className="h-3.5 w-full rounded-md" />
                      <ShimmerBox className="h-3.5 w-4/5 rounded-md" />
                    </div>
                    <div className="flex items-center gap-3 px-1">
                      <ShimmerBox className="h-3 w-16 rounded-md" />
                      <ShimmerBox className="h-3 w-20 rounded-md" />
                    </div>
                  </div>
                </div>

                {/* User Message Bubble */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="space-y-1.5 max-w-[85%] sm:max-w-[75%] items-end flex flex-col w-full">
                    <div className="p-3.5 rounded-xl bg-[#0059bb]/25 dark:bg-[#0059bb]/35 border border-[#0059bb]/30 space-y-2 w-3/4">
                      <ShimmerBox className="h-3.5 w-full rounded-md !bg-white/40 dark:!bg-white/20" />
                    </div>
                  </div>
                  <ShimmerBox className="w-8 h-8 rounded-full shrink-0 mt-0.5" />
                </div>

                {/* AI Detailed Feedback Bubble (Grammar + Better Phrasing) */}
                <div className="flex items-start gap-2.5 justify-start">
                  <ShimmerBox className="w-8 h-8 rounded-lg !bg-[#0059bb]/20 dark:!bg-sky-400/20 shrink-0 mt-0.5" />
                  <div className="space-y-2 max-w-[88%] sm:max-w-[82%] w-full">
                    <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <ShimmerBox className="h-3.5 w-full rounded-md" />
                      <ShimmerBox className="h-3.5 w-5/6 rounded-md" />
                    </div>
                    {/* Grammar Correction Box */}
                    <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                      <ShimmerBox className="h-3.5 w-36 rounded-md !bg-amber-500/20" />
                      <ShimmerBox className="h-3.5 w-4/5 rounded-md" />
                      <ShimmerBox className="h-3.5 w-3/4 rounded-md !bg-emerald-500/20" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Dải Gợi Ý Thuần Chữ (Suggestions Strip) */}
              <div className="pt-2 pb-0.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
                <ShimmerBox className="h-3.5 w-16 rounded-md !bg-[#0059bb]/20" />
                <ShimmerBox className="h-3.5 w-20 rounded-md" />
                <ShimmerBox className="h-3.5 w-24 rounded-md" />
                <ShimmerBox className="h-3.5 w-36 rounded-md hidden sm:block" />
              </div>

              {/* Voice Input Dock (Pinned to Bottom) */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  {/* Round Mic Button */}
                  <ShimmerBox className="w-10 h-10 rounded-full !bg-[#0059bb]/30 dark:!bg-[#0059bb]/40 shrink-0" />

                  {/* Input Box */}
                  <ShimmerBox className="h-9 flex-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800" />

                  {/* Send Button */}
                  <ShimmerBox className="h-9 w-18 sm:w-20 rounded-lg !bg-[#0059bb]/25 shrink-0" />
                </div>

                {/* Audio Waveform 16 Spikes */}
                <div className="flex items-center justify-center gap-[3px] h-4 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <ShimmerBox
                      key={i}
                      className="w-[2.5px] rounded-full shrink-0"
                      style={{ height: `${(i % 4 + 1) * 3}px` }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* CỘT PHẢI: HIGH-END SIDEBAR (4/12) */}
          <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 overflow-y-auto">
              
              {/* 1. Khối Chọn Gia Sư AI & Speed */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between pb-1">
                  <ShimmerBox className="h-4 w-28 rounded-md !bg-[#0059bb]/20" />
                  <ShimmerBox className="h-6 w-24 rounded-lg" />
                </div>

                {/* 3 Persona Cards (Emma, Alex, Chloe) */}
                <div className="space-y-1.5">
                  {[1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2.5 bg-slate-50/70 dark:bg-slate-950/60"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <ShimmerBox className="w-8 h-8 rounded-lg shrink-0" />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <ShimmerBox className="h-3.5 w-32 rounded-md" />
                          <ShimmerBox className="h-3 w-40 rounded-md" />
                        </div>
                      </div>
                      {idx === 1 && <ShimmerBox className="w-4 h-4 rounded-full !bg-[#0059bb]/30 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Khối Từ Vựng Theo Ngữ Cảnh (3 Items) */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-3.5 w-36 rounded-md !bg-[#0059bb]/20" />
                  <ShimmerBox className="h-3 w-20 rounded-md" />
                </div>

                <div className="space-y-1.5">
                  {[1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <ShimmerBox className="h-3.5 w-24 rounded-md" />
                        <ShimmerBox className="h-3 w-36 rounded-md" />
                      </div>
                      <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Khối Mẫu Câu Phản Xạ Giao Tiếp (2 Items) */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-3.5 w-36 rounded-md !bg-amber-500/20" />
                  <ShimmerBox className="h-3 w-20 rounded-md" />
                </div>

                <div className="space-y-1.5">
                  {[1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="w-full px-3 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex items-center justify-between gap-2"
                    >
                      <ShimmerBox className="h-3.5 w-48 rounded-md !bg-amber-600/20" />
                      <ShimmerBox className="w-4 h-4 rounded-md !bg-amber-500/30 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
