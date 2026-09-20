"use client";
import React from "react";
import { JAGGED_ACOUSTIC_SPEECH_SPIKES_95 } from "@/features/listening/components/StudioWaveformCard";

/**
 * High-End Shimmer Skeleton Box helper
 */
export function ShimmerBox({
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
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 ${hasCustomRounding ? "" : "rounded-lg"} before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent ${className}`}
    />
  );
}

/**
 * Skeleton cho cụm 4 thẻ Bento thống kê nhanh của Shadowing (chuẩn như /analytics)
 */
export function ShadowingListingHeroStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
            <ShimmerBox className="w-5 h-5 rounded-md" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <ShimmerBox className="h-5 w-16 rounded-md" />
            <ShimmerBox className="h-3.5 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton cho trang Shadowing dạng LISTING (khi chưa chọn bài, không có ?id=)
 * Bao gồm: Top bar 56px → Filter search → Hero Stats Bento → 2 hàng bài học (8 Basic Cards + 8 Advanced Cards)
 */
export function ShadowingListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP APP HEADER SKELETON (56px Baseline - Exact 0px CLS Twin) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <ShimmerBox className="h-7 w-24 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-28 rounded-lg hidden md:block" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile search button shimmer */}
          <ShimmerBox className="h-9 w-9 rounded-xl lg:hidden" />
          {/* Desktop search input shimmer */}
          <ShimmerBox className="h-9 w-44 sm:w-56 lg:w-64 xl:w-72 rounded-xl hidden lg:block" />
          {/* Action button shimmer */}
          <ShimmerBox className="h-9 w-24 sm:w-36 rounded-xl bg-blue-600/30 shrink-0" />
          {/* Gamification Streak chip shimmer */}
          <ShimmerBox className="h-8.5 w-12 rounded-xl bg-orange-500/20 shrink-0" />
          {/* Gamification Gold chip shimmer */}
          <ShimmerBox className="h-8.5 w-12 rounded-xl bg-amber-500/20 hidden xs:block shrink-0" />
          {/* User Avatar shimmer */}
          <ShimmerBox className="w-8.5 h-8.5 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 shrink-0" />
        </div>
      </div>

      {/* 2. MAIN CONTENT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* HERO STATS BENTO SKELETON */}
        <ShadowingListingHeroStatsSkeleton />

        {/* 2.2 LEVEL / CATEGORY FILTER DOCK SKELETON (Exact 0px CLS Twin) */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 shrink-0">
            <ShimmerBox className="h-7 w-28 rounded-lg bg-white dark:bg-slate-900" />
            <ShimmerBox className="h-7 w-24 rounded-lg" />
            <ShimmerBox className="h-7 w-24 rounded-lg" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden xs:block" />
          </div>
          <ShimmerBox className="h-5 w-32 rounded font-mono hidden sm:block" />
        </div>

        {/* ROW 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-6 w-16 rounded-md bg-blue-500/20 dark:bg-blue-500/10" />
              <ShimmerBox className="h-6 w-40 sm:w-56 rounded-md" />
            </div>
            <ShimmerBox className="h-7 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3 w-20 rounded mb-1 sm:hidden bg-blue-500/20" />
                    <ShimmerBox className="h-4 w-full rounded" />
                    <ShimmerBox className="h-4 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-12 rounded" />
                    </div>
                    <ShimmerBox className="h-5 w-14 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
        <div className="space-y-4 pt-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-6 w-16 rounded-md bg-purple-500/20 dark:bg-purple-500/10" />
              <ShimmerBox className="h-6 w-44 sm:w-60 rounded-md" />
            </div>
            <ShimmerBox className="h-7 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3 w-20 rounded mb-1 sm:hidden bg-purple-500/20" />
                    <ShimmerBox className="h-4 w-full rounded" />
                    <ShimmerBox className="h-4 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-12 rounded" />
                    </div>
                    <ShimmerBox className="h-5 w-14 rounded-lg" />
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
 * Skeleton cho trang Shadowing dạng STUDIO (khi đã chọn bài, có ?id=)
 * Chuẩn hóa hình học 1:1 pixel-perfect với ShadowingStudioWorkspace (0px CLS):
 * - StudioTopHeader: Back button (34px mob / 86px desk), CEFR Badge, Title, Bookmark, Mode Switcher (Nói active), Timer capsule hổ phách, 3 nút công cụ phụ. Không có Accent Switcher thừa.
 * - Mobile Switcher: Apple-grade Sliding Pill 2 nút cân xứng (Mic "Luyện nói" active / List "Danh sách phụ đề").
 * - Waveform Card: Status LED xanh ngọc, volume slider + timer, 95 cột sóng chuẩn, cụm 4 nút Transport + Master Play 48px + Speed dock 5 mức.
 * - Meta Status Row: Badge #1, số từ, độ khớp, 2 phím tắt kbd chip.
 * - Sentence Utility Toolbar: Nút Lưu câu, Báo cáo, chỉnh cỡ chữ -A / +A, 2 công tắc gạt iOS 32x16px (Tự động tiếp, Ẩn dịch).
 * - Shadowing Core Sentence Card: Hàng hướng dẫn tra từ điển, Words horizontal track đa dạng độ rộng từ, dòng IPA, khung bản dịch tiếng Việt bg-slate-50.
 * - Action Shortcut Buttons: Nút Thu âm & Chấm điểm đỏ Rose (Alt+S), Nghe câu mẫu (Space), Ẩn dịch, Làm lại câu.
 * - Interactive Transcript Sidebar: Header 2 Tab với gạch chân xanh #0059bb, Toolbar tiến độ 0/4 + Reset + Switch "Hiện", thẻ câu #1 active viền xanh ring-2 + icon tai nghe, các câu sau mờ hơn.
 * - Mobile Sticky Audio Dock: Thanh dock đáy cố định 64px với 5 nút bấm hình học chuẩn và nút Thu Âm Thumb CTA to tròn 52px màu đỏ Rose.
 */
export function ShadowingStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans bg-[#f8fafc] dark:bg-[#050505]">
      {/* 1. TOP HEADER SKELETON (56px Baseline - StudioTopHeader Twin) */}
      <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
          {/* Back button (responsive: 34px mobile / 86px desktop) */}
          <ShimmerBox className="w-8.5 sm:w-[86px] h-8 sm:h-8.5 rounded-xl shrink-0" />

          {/* CEFR Badge */}
          <ShimmerBox className="h-5 w-8 rounded-md bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />

          {/* Title */}
          <ShimmerBox className="h-5 w-36 xs:w-48 sm:w-60 rounded-md" />

          {/* Bookmark */}
          <ShimmerBox className="w-7 h-7 rounded-lg hidden xs:block shrink-0" />

          {/* Micro Divider */}
          <div className="hidden xl:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />

          {/* Mode Switcher pill (Nói active / Nghe) */}
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 ml-0.5">
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-14 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-14 rounded-lg" />
          </div>
        </div>

        {/* Right: Clock Timer Pill & 3 Studio Toolbar Icons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <ShimmerBox className="h-7 w-20 rounded-full bg-amber-500/15 dark:bg-amber-500/20" />
          <div className="hidden md:flex items-center gap-0.5 text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-2">
            {[1, 2, 3].map((i) => (
              <ShimmerBox key={i} className="w-7 h-7 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. MOBILE TAB SWITCHER SKELETON (< lg - Apple-Grade Spring Sliding Pill Twin) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-2 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 relative w-full">
          {/* Tab 1: Luyện nói (Active) */}
          <div className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-900 shadow-xs flex items-center justify-center gap-1.5">
            <ShimmerBox className="w-3.5 h-3.5 rounded-full bg-blue-500/30" />
            <ShimmerBox className="h-3.5 w-24 rounded" />
          </div>
          {/* Tab 2: Danh sách phụ đề */}
          <div className="flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 opacity-60">
            <ShimmerBox className="w-3.5 h-3.5 rounded-full" />
            <ShimmerBox className="h-3.5 w-28 rounded" />
          </div>
        </div>
      </div>

      {/* 3. 2-COLUMN STUDIO WORKSPACE SKELETON */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE */}
        <div className="flex-1 min-w-0 p-2.5 sm:p-3 lg:p-3.5 space-y-2.5 overflow-y-auto hide-scrollbar pb-24 lg:pb-3.5">
          <div className="space-y-2.5 w-full">
            {/* 3.1. KHỐI AUDIO WAVEFORM STUDIO CARD */}
            <div className="p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/60 dark:shadow-black/40 space-y-2 sm:space-y-2.5">
              {/* Top Status LED + Volume Slider + Digital Timer */}
              <div className="flex items-center justify-between">
                {/* Left: Sound Indicator & Volume Slider Skeleton */}
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 animate-pulse" />
                  <ShimmerBox className="w-4 h-4 rounded" />
                  <div className="hidden xs:flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-700">
                    <ShimmerBox className="w-14 sm:w-16 h-1.5 rounded-lg" />
                    <ShimmerBox className="w-6 h-3 rounded" />
                  </div>
                </div>

                {/* Right: Digital Timer */}
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                  <ShimmerBox className="h-4 w-10 rounded font-mono" />
                  <span className="text-slate-400 text-xs font-bold">/</span>
                  <ShimmerBox className="h-4 w-10 rounded font-mono opacity-60" />
                </div>
              </div>

              {/* 2. CENTER JAGGED ACOUSTIC SPEECH WAVEFORM SKELETON */}
              <div className="w-full flex justify-center items-center py-0.5 sm:py-1">
                <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-14 sm:h-16 lg:h-18 flex items-center justify-center px-1 bg-transparent select-none overflow-hidden group">
                  {/* Subtle Unified Wave Shimmer Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none z-20" />
                  
                  {/* Dense Jagged Vector Spectrum Bars (Matching Exact Spacing and Height of Real Studio) */}
                  <div className="relative z-10 w-full flex items-center justify-center gap-[1px] sm:gap-[1.5px] h-full">
                    {JAGGED_ACOUSTIC_SPEECH_SPIKES_95.map((amp, i) => (
                      <div
                        key={i}
                        style={{
                          height: `${Math.max(4, amp)}%`,
                          transformOrigin: "center center",
                        }}
                        className="w-[1.2px] sm:w-[1.5px] lg:w-[1.8px] rounded-[0.2px] shrink-0 bg-slate-300 dark:bg-slate-700 transition-colors"
                      />
                    ))}
                  </div>


                </div>
              </div>

              {/* 3. BOTTOM INTEGRATED AUDIO CONTROLS & SPEED DOCK SKELETON (1:1 Centered 2-Row Layout) */}
              <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pt-0.5">
                {/* Row 1: 5 Playback Transport Buttons Centered */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 select-none">
                  {/* Skip Back */}
                  <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full shrink-0" />
                  {/* Rewind 5s */}
                  <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full shrink-0" />
                  {/* Center Master Play Button with Tactile Ring & Dark Theme Styling */}
                  <ShimmerBox className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 dark:bg-white/80 shadow-md ring-4 ring-slate-900/10 dark:ring-white/15 shrink-0" />
                  {/* Forward 5s */}
                  <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full shrink-0" />
                  {/* Skip Forward */}
                  <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full shrink-0" />
                </div>

                {/* Row 2: Speed Selector Pill Dock Centered Underneath */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center p-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 gap-0.5 shadow-2xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <ShimmerBox
                        key={s}
                        className={`h-5 sm:h-6 w-9 sm:w-11 rounded-full ${
                          s === 3 ? "bg-white dark:bg-slate-900 shadow-2xs" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2. META STATUS ROW SKELETON */}
            <div className="flex items-center justify-between px-1 text-xs font-medium flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ShimmerBox className="h-5 w-8 rounded-md font-mono font-bold" />
                <ShimmerBox className="h-4 w-16 rounded" />
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <ShimmerBox className="h-4 w-20 rounded" />
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <ShimmerBox className="h-6 w-44 rounded-lg" />
                <ShimmerBox className="h-6 w-32 rounded-lg" />
              </div>
            </div>

            {/* 3.3. SENTENCE UTILITY TOOLBAR SKELETON */}
            <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              {/* Left Group: Lưu câu & Báo cáo */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <ShimmerBox className="h-7 w-20 rounded-lg" />
                <ShimmerBox className="h-7 w-20 rounded-lg" />
              </div>

              {/* Right Group: Cỡ chữ + 2 công tắc iOS */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* Cỡ chữ: -A / +A */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                  <ShimmerBox className="h-5 w-6 rounded" />
                  <div className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                  <ShimmerBox className="h-5 w-6 rounded" />
                </div>

                {/* Công tắc 1: Tự động tiếp (iOS 32x16px) */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-slate-900 dark:bg-white relative">
                    <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-900 absolute top-0.5 right-0.5 shadow-2xs" />
                  </div>
                  <ShimmerBox className="h-3.5 w-18 rounded hidden sm:inline-block" />
                </div>

                {/* Công tắc 2: Ẩn dịch (iOS 32x16px) */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative">
                    <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300 absolute top-0.5 left-0.5" />
                  </div>
                  <ShimmerBox className="h-3.5 w-16 rounded hidden sm:inline-block" />
                </div>
              </div>
            </div>

            {/* 3.4. SHADOWING CORE SENTENCE CARD SKELETON */}
            <div className="space-y-1.5 pt-0">
              {/* Hàng hướng dẫn tra từ điển & Xem dịch */}
              <div className="flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-3.5 h-3.5 rounded" />
                  <ShimmerBox className="h-3.5 w-52 rounded" />
                </div>
                <ShimmerBox className="h-3.5 w-16 rounded" />
              </div>

              {/* Sentence Content Box */}
              <div className="px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2.5">
                {/* Dải từ vựng ngang (Words Horizontal Track) */}
                <div className="flex flex-nowrap overflow-x-auto py-1 px-0.5 gap-1.5 sm:gap-2 items-center">
                  {[44, 76, 68, 32, 40, 72, 56, 60, 64, 36, 62, 38, 48, 42].map((w, idx) => (
                    <ShimmerBox
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="h-8 sm:h-9 rounded-lg shrink-0"
                    />
                  ))}
                </div>

                {/* Dòng phiên âm IPA */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <ShimmerBox className="h-4 w-8 rounded bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />
                  <ShimmerBox className="h-4 w-60 sm:w-80 rounded" />
                </div>

                {/* Khối dịch nghĩa tiếng Việt */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-3 rounded-lg bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShimmerBox className="w-3.5 h-3.5 rounded" />
                      <ShimmerBox className="h-3.5 w-24 rounded" />
                    </div>
                    <ShimmerBox className="h-3.5 w-full rounded" />
                    <ShimmerBox className="h-3.5 w-4/5 rounded opacity-75" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3.5. ACTION SHORTCUT BUTTONS BAR */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 px-1 pt-0.5">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-1 sm:flex-initial flex-wrap">
                {/* Nút Thu Âm & Chấm Điểm */}
                <div className="inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs min-h-[38px] sm:min-h-[42px]">
                  <ShimmerBox className="w-4 h-4 rounded-full bg-rose-500/40" />
                  <ShimmerBox className="h-4 w-32 rounded bg-rose-500/15" />
                  <ShimmerBox className="h-4 w-10 rounded hidden sm:inline-block font-mono" />
                </div>

                {/* Nút Nghe Câu Mẫu */}
                <div className="inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs min-h-[38px] sm:min-h-[42px]">
                  <ShimmerBox className="w-4 h-4 rounded" />
                  <ShimmerBox className="h-4 w-24 rounded" />
                  <ShimmerBox className="h-4 w-12 rounded hidden sm:inline-block font-mono" />
                </div>
              </div>

              {/* Right utilities: Ẩn dịch & Làm lại câu */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShimmerBox className="h-[38px] sm:h-[42px] w-24 rounded-xl" />
                <ShimmerBox className="h-[38px] sm:h-[42px] w-[38px] sm:w-[42px] rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR SKELETON (Desktop >= lg) */}
        <div className="hidden lg:flex w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 h-full flex-col overflow-hidden">
          {/* 1. Header Tabs: Phụ đề vs Gợi ý */}
          <div className="flex items-center border-b border-slate-100 dark:border-slate-800/80 px-5 pt-3 gap-7 sm:gap-8 shrink-0">
            <div className="pb-2.5 relative">
              <div className="flex items-center gap-2">
                <ShimmerBox className="w-4 h-4 rounded" />
                <ShimmerBox className="h-4 w-20 rounded" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-t-full" />
            </div>
            <div className="pb-2.5 flex items-center gap-2 opacity-60">
              <ShimmerBox className="w-4 h-4 rounded" />
              <ShimmerBox className="h-4 w-24 rounded" />
            </div>
          </div>

          {/* 2. Toolbar Phụ Đề: Tiến độ 0/4 + Nút Reset + Switch "Hiện" */}
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-4 w-28 rounded font-medium" />
              <ShimmerBox className="w-6 h-6 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7.5 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative">
                <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300 absolute top-0.5 left-0.5" />
              </div>
              <ShimmerBox className="h-3.5 w-8 rounded" />
            </div>
          </div>

          {/* 3. Danh Sách Câu Phụ Đề */}
          <div className="flex-1 p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
            {/* Thẻ câu #1 (Active - Đang học) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#0059bb]/70 dark:border-sky-500/60 shadow-xs ring-2 ring-blue-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <ShimmerBox className="w-3.5 h-3.5 rounded-full bg-blue-500/40" />
                  </div>
                  <ShimmerBox className="h-4 w-8 rounded font-mono font-bold" />
                </div>
                <div className="flex items-center gap-1">
                  <ShimmerBox className="w-7 h-7 rounded-lg bg-blue-500/20" />
                  <ShimmerBox className="w-7 h-7 rounded-lg" />
                </div>
              </div>
              <div className="space-y-1 pt-0.5">
                <ShimmerBox className="h-3.5 w-full rounded" />
                <ShimmerBox className="h-3.5 w-5/6 rounded" />
                <ShimmerBox className="h-3 w-4/6 rounded opacity-70" />
              </div>
            </div>

            {/* Các thẻ câu tiếp theo (#2, #3, #4) */}
            {[2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 opacity-85"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <ShimmerBox className="w-3.5 h-3.5 rounded-full" />
                    </div>
                    <ShimmerBox className="h-4 w-8 rounded font-mono" />
                  </div>
                  <ShimmerBox className="w-7 h-7 rounded-lg" />
                </div>
                <div className="space-y-1 pt-0.5">
                  <ShimmerBox className="h-3.5 w-full rounded" />
                  <ShimmerBox className="h-3.5 w-4/5 rounded" />
                  <ShimmerBox className="h-3 w-3/5 rounded opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MOBILE STICKY AUDIO DOCK SKELETON (lg:hidden) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Prev Button */}
        <ShimmerBox className="w-10 h-10 rounded-xl" />
        {/* Sample Audio Button */}
        <ShimmerBox className="w-11 h-11 rounded-xl bg-blue-500/20" />
        {/* Primary Thumb Record CTA (52px Red Round Shimmer) */}
        <div className="flex-1 flex justify-center">
          <ShimmerBox className="w-13 h-13 rounded-full bg-rose-500/30 shadow-lg shadow-rose-600/20" />
        </div>
        {/* User Audio / Replay Button */}
        <ShimmerBox className="w-11 h-11 rounded-xl" />
        {/* Next Button */}
        <ShimmerBox className="w-10 h-10 rounded-xl bg-slate-900/40 dark:bg-white/40" />
      </div>
    </div>
  );
}

/**
 * 1 single card shimmer matching Shadowing lesson cards (Double-Bezel)
 */
export function LessonCardShimmer() {
  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0">
      {/* Thumbnail Skeleton */}
      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
        <ShimmerBox className="w-full h-full rounded-xl" />
        <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
      </div>

      {/* Right / Bottom Info Skeleton */}
      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
        <div className="space-y-1.5">
          <ShimmerBox className="h-3 w-20 rounded mb-1 sm:hidden bg-blue-500/20" />
          <ShimmerBox className="h-4 w-full rounded" />
          <ShimmerBox className="h-4 w-4/5 rounded" />
        </div>

        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <ShimmerBox className="w-4 h-4 rounded-full" />
            <ShimmerBox className="h-3.5 w-12 rounded" />
          </div>
          <ShimmerBox className="h-5 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho Tab 2 (Gợi ý bài học) trên Sidebar khi đang nạp CSDL hoặc đổi gợi ý
 */
export function RecommendationCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex gap-3.5 items-center select-none min-h-[96px]"
        >
          <div className="w-[102px] sm:w-[108px] h-[74px] sm:h-[78px] shrink-0 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
            <ShimmerBox className="w-full h-full rounded-xl" />
            <div className="absolute bottom-1.5 left-1.5 w-9 h-4 rounded-md bg-slate-900/40 backdrop-blur-xs" />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1.5">
            <div className="flex items-center justify-between gap-1.5">
              <ShimmerBox className="h-3.5 w-20 rounded" />
              <ShimmerBox className="h-4 w-12 rounded-full" />
            </div>
            <div className="space-y-1">
              <ShimmerBox className="h-3.5 w-full rounded" />
              <ShimmerBox className="h-3.5 w-4/5 rounded" />
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80">
              <ShimmerBox className="h-3.5 w-24 rounded" />
              <ShimmerBox className="h-6 w-14 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton cho danh sách câu phụ đề khi chuyển bài bên trong Studio (In-Place Transition)
 */
export function TranscriptSentencesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-2.5 p-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`p-3.5 sm:p-4 rounded-2xl border-2 space-y-2 select-none ${
            i === 0
              ? "bg-white dark:bg-slate-900 border-blue-500/60 dark:border-sky-500/50 shadow-xs"
              : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="w-6 h-6 rounded-full" />
              <ShimmerBox className="h-4 w-8 rounded font-mono" />
              {i === 0 && (
                <ShimmerBox className="h-5 w-20 rounded-md bg-blue-500/20 dark:bg-blue-500/10" />
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <ShimmerBox className="w-6 h-6 rounded-lg" />
              <ShimmerBox className="w-6 h-6 rounded-lg" />
            </div>
          </div>
          <div className="space-y-1.5 pt-1">
            <ShimmerBox className="h-3.5 w-full rounded" />
            <ShimmerBox className="h-3.5 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
