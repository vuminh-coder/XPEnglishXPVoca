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
 * Skeleton loading bám sát 1:1 hình học giao diện Roadmap Pathway:
 * 1. AppTopHeader (56px) với 3 Navigation Pills + Nút CTA "Học Bài Tiếp Theo"
 * 2. RoadmapHeroBanner (~50px Single-line Compact Action Strip)
 * 3. Lưới 8/12 + 4/12:
 *    - Cột Trái 8-Cols: PhaseCarouselSwiper (38px strip) + PhaseRoadmapCard (Milestone nodes + Task items, không còn checkbox trùng lặp)
 *    - Cột Phải 4-Cols Cố Định (~430px): 2 Bento Cards (Chi Tiết Bài Học ~235px + Trợ Lý AI Mentor ~185px)
 * Đạt chuẩn CLS = 0 (Cumulative Layout Shift = 0px).
 */
export default function RoadmapLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 select-none font-sans">
      {/* 1. APP TOP HEADER SKELETON (56px h-14 BASELINE) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 shadow-2xs">
        {/* Left: Mobile Sidebar Trigger + 2 Header Pills (Lộ trình học, Đổi mục tiêu) */}
        <div className="flex items-center gap-2">
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            {/* Lộ trình học (Active) */}
            <ShimmerBox className="w-24 sm:w-28 h-7 rounded-lg bg-[#0059bb]/20 dark:bg-sky-400/20" />
            {/* Đổi mục tiêu */}
            <ShimmerBox className="w-24 sm:w-28 h-7 rounded-lg hidden sm:block" />
          </div>
        </div>

        {/* Right Desktop: Nút CTA "Học Bài Tiếp Theo" + Mobile Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-36 sm:w-40 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/20 hidden sm:block" />
          <ShimmerBox className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0 lg:hidden" />
        </div>
      </header>

      {/* 2. UNIFIED MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* HERO BANNER SKELETON: Compact Single-line Strip (~50px - 1:1 with RoadmapHeroBanner) */}
        <div className="py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Branding & Goal Header on a Single Line */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#0059bb]/30 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShimmerBox className="w-4 h-4 rounded-md" />
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <ShimmerBox className="h-5 w-48 sm:w-64 rounded-md" />
            </div>
          </div>

          {/* Right: Inline Progress & Change Goal Action */}
          <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
            <ShimmerBox className="h-7 w-28 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60" />
            <ShimmerBox className="h-8 w-28 rounded-xl" />
          </div>
        </div>

        {/* 3. BENTO 8/12 + 4/12 GRID LAYOUT SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* CỘT TRÁI (8-COLS): PHASE ROADMAP CARD */}
          <div className="lg:col-span-8 min-w-0">
            {/* PhaseRoadmapCard Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              {/* Phase Header & Phase Switcher & Chest Reward */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <ShimmerBox className="h-6 w-20 rounded-md bg-[#0059bb]/20" />
                    <ShimmerBox className="h-6 w-48 sm:w-64 rounded-md" />
                  </div>
                  <ShimmerBox className="h-3.5 w-60 sm:w-80 rounded-md" />
                </div>

                {/* Phase Switcher Navigation */}
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs shrink-0 self-end sm:self-center">
                  <ShimmerBox className="w-7 h-7 rounded-lg" />
                  <ShimmerBox className="w-8 h-4 rounded-md" />
                  <ShimmerBox className="w-7 h-7 rounded-lg" />
                </div>
              </div>

              {/* Phase Progress Bar */}
              <div className="space-y-1.5 px-0.5">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-3.5 w-56 rounded-md" />
                  <ShimmerBox className="h-3.5 w-10 rounded-md bg-[#0059bb]/20" />
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <ShimmerBox className="h-full w-1/3 rounded-full bg-[#0059bb]/40" />
                </div>
              </div>

              {/* Timeline Pathway (4 Task Items với Milestone Nodes ngoài) */}
              <div className="space-y-3.5 pt-2">
                {[1, 2, 3, 4].map((taskNum, idx) => (
                  <div key={taskNum} className="relative flex items-start gap-3 sm:gap-3.5">
                    {/* Milestone Node ngoài cùng trên Timeline */}
                    <div className="flex flex-col items-center shrink-0 self-stretch relative w-6">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                          idx < 2
                            ? "bg-emerald-500/30"
                            : idx === 2
                            ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb]/40"
                            : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <ShimmerBox className="w-3 h-3 rounded-full" />
                      </div>
                      {idx < 3 && (
                        <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-800 my-1" />
                      )}
                    </div>

                    {/* Lesson Task Card Item */}
                    <div className="flex-1 min-w-0">
                      <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        {/* Left: Skill Badge + Full Title + Description */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            <ShimmerBox className="h-5 w-20 rounded-md bg-blue-500/20" />
                            <ShimmerBox className="h-4.5 w-56 sm:w-72 rounded-md" />
                          </div>
                          <ShimmerBox className="h-3.5 w-44 sm:w-60 rounded-md" />
                        </div>

                        {/* Right Action Launcher: XP badge + CTA Button */}
                        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                          {idx < 2 ? (
                            /* Bài đã xong: Nút Ôn lại tinh gọn */
                            <ShimmerBox className="h-8.5 w-20 rounded-xl" />
                          ) : (
                            /* Bài chưa xong: Nút Luyện ngay */
                            <ShimmerBox className="h-8.5 w-24 rounded-xl bg-[#0059bb]/40" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (4-COLS CỐ ĐỊNH): 1 BENTO CARD CHI TIẾT BÀI HỌC DUY NHẤT */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-6 self-start">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-4 h-4 rounded-md text-[#0059bb]" />
                  <ShimmerBox className="h-4 w-28 rounded-md" />
                </div>
                <ShimmerBox className="h-4 w-20 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <ShimmerBox className="h-3 w-12 rounded-md bg-[#0059bb]/20" />
                <ShimmerBox className="h-4.5 w-4/5 rounded-md" />
                <ShimmerBox className="h-3.5 w-full rounded-md" />
                <ShimmerBox className="h-3.5 w-3/4 rounded-md" />
              </div>

              {/* 3 Quick Metric Chips */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[1, 2, 3].map((chip) => (
                  <div
                    key={chip}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1"
                  >
                    <ShimmerBox className="h-2.5 w-12 mx-auto rounded" />
                    <ShimmerBox className="h-3.5 w-10 mx-auto rounded" />
                  </div>
                ))}
              </div>

              {/* AI Tip Callout with inline AI Helper shimmer */}
              <div className="p-2.5 rounded-xl bg-amber-50/30 dark:bg-amber-950/15 border border-amber-200/50 dark:border-amber-900/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShimmerBox className="w-3.5 h-3.5 rounded-full bg-amber-500/30" />
                    <ShimmerBox className="h-3 w-24 rounded-md" />
                  </div>
                  <ShimmerBox className="h-5 w-14 rounded-lg bg-purple-500/20" />
                </div>
                <ShimmerBox className="h-3 w-full rounded-md" />
              </div>

              {/* Action CTA Button */}
              <div className="pt-0.5">
                <ShimmerBox className="w-full h-9 rounded-xl bg-[#0059bb]/40" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
