"use client";
import React from "react";
import {
  Languages,
  BookOpen,
  ListOrdered,
  ArrowLeft,
  RotateCcw,
  SkipBack,
  SkipForward,
  Play,
  Repeat,
  Volume2,
  Sparkles,
  Headphones,
  Maximize2,
  Keyboard,
} from "lucide-react";
import { JAGGED_ACOUSTIC_SPEECH_SPIKES_95 } from "./StudioWaveformCard";

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
 * Skeleton cho trang Listening dạng LISTING (khi chưa chọn bài, không có ?id=)
 * Bao gồm: Top bar 56px (AppTopHeader Twin) → 2 hàng bài học (8 Basic Cards + 8 Advanced Cards)
 */
export function ListeningListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP APP HEADER SKELETON (56px Baseline - AppTopHeader Twin) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        {/* Left: 4 Header Pills (Dictation, Shadowing, Luyện từ, Thi thử) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            {/* Dictation (Active) */}
            <ShimmerBox className="h-7 w-24 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
            {/* Shadowing */}
            <ShimmerBox className="h-7 w-24 rounded-lg hidden sm:block" />
            {/* Luyện từ vựng */}
            <ShimmerBox className="h-7 w-28 rounded-lg hidden md:block" />
            {/* Thi thử đề */}
            <ShimmerBox className="h-7 w-24 rounded-lg hidden lg:block" />
          </div>
        </div>

        {/* Right Desktop Content: Search Input + Nút Tạo bài AI */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-44 xs:w-56 sm:w-72 rounded-xl" />
          <ShimmerBox className="h-9 w-24 sm:w-28 rounded-xl bg-blue-600/30 dark:bg-blue-500/20" />
        </div>
      </div>

      {/* 2. MAIN CONTENT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* VIEW MODE PILL TOGGLE (Standard Audio is ACTIVE) */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 flex-wrap">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/60 shadow-2xs">
            <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs">
              <div className="w-4 h-4 rounded-full bg-[#0059bb]/20 dark:bg-sky-400/20" />
              <span>Bài Nghe Tiêu Chuẩn</span>
            </div>
            <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-400">
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Kho Video Tuyển Chọn</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ShimmerBox className="h-4 w-4 rounded-full bg-amber-500/30" />
            <ShimmerBox className="h-4 w-60 rounded" />
          </div>
        </div>

        {/* CATEGORY / LEVEL FILTER DOCK SKELETON */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <ShimmerBox className="h-7.5 w-24 rounded-lg bg-white dark:bg-slate-700 shadow-xs" />
            <ShimmerBox className="h-7.5 w-32 rounded-lg" />
            <ShimmerBox className="h-7.5 w-36 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7.5 w-32 rounded-lg hidden md:block" />
          </div>
          <ShimmerBox className="h-7.5 w-28 rounded-lg" />
        </div>

        {/* ROW 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShimmerBox className="h-6 w-16 rounded-md bg-blue-500/20 dark:bg-blue-500/10" />
              <ShimmerBox className="h-6 w-40 sm:w-56 rounded-md" />
            </div>
            <ShimmerBox className="h-8 w-36 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0 select-none"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3.5 w-20 rounded mb-1 sm:hidden bg-blue-500/20" />
                    <ShimmerBox className="h-4.5 w-full rounded" />
                    <ShimmerBox className="h-4.5 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-14 rounded" />
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
            <ShimmerBox className="h-8 w-36 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0 select-none"
              >
                {/* Thumbnail Skeleton */}
                <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                  <ShimmerBox className="w-full h-full rounded-xl" />
                  <div className="absolute bottom-2 left-2 w-10 sm:w-12 h-4 rounded bg-slate-900/40 backdrop-blur-xs" />
                </div>

                {/* Right / Bottom Info Skeleton */}
                <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <ShimmerBox className="h-3.5 w-20 rounded mb-1 sm:hidden bg-purple-500/20" />
                    <ShimmerBox className="h-4.5 w-full rounded" />
                    <ShimmerBox className="h-4.5 w-4/5 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <ShimmerBox className="w-4 h-4 rounded-full" />
                      <ShimmerBox className="h-3.5 w-14 rounded" />
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
 * Skeleton cho trang Luyện Nghe Video dạng LISTING (/study/dictation/video)
 * Khớp 100% bố cục VideoCatalogBrowseView:
 * 56px Header → Tabs (Video Active) → Spotlight Banner YouTube → Category Chips Bar → Search/Level Filters → Lưới Video Card 16:9
 */
export function VideoListingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP APP HEADER SKELETON (56px Baseline - AppTopHeader Twin) */}
      <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1">
            <ShimmerBox className="h-7 w-24 rounded-lg bg-blue-500/20 dark:bg-blue-500/10" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-28 rounded-lg hidden md:block" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden lg:block" />
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <ShimmerBox className="h-9 w-44 xs:w-56 sm:w-72 rounded-xl" />
        </div>
      </div>

      {/* 2. MAIN CONTENT CANVAS SKELETON */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-6 sm:space-y-7 pb-20">
        {/* VIEW MODE PILL TOGGLE (Kho Video Tuyển Chọn is ACTIVE) */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 flex-wrap">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/60 shadow-2xs">
            <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-400">
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Bài Nghe Tiêu Chuẩn</span>
            </div>
            <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs">
              <div className="w-4 h-4 rounded-full bg-[#0059bb]/20 dark:bg-sky-400/20" />
              <span>Kho Video Tuyển Chọn</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ShimmerBox className="h-4 w-4 rounded-full bg-amber-500/30" />
            <ShimmerBox className="h-4 w-60 rounded" />
          </div>
        </div>

        {/* 1. HERO SPOTLIGHT & RECOMMENDATION BANNER SKELETON */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="space-y-2 max-w-xl">
            <ShimmerBox className="h-7 w-80 sm:w-96 rounded-lg bg-blue-500/20" />
            <ShimmerBox className="h-4 w-full rounded" />
            <ShimmerBox className="h-4 w-4/5 rounded" />
          </div>
          <div className="shrink-0">
            <ShimmerBox className="h-10 w-44 rounded-xl bg-blue-600/30 dark:bg-blue-500/20" />
          </div>
        </div>

        {/* 2. CATEGORY CHIPS BAR SKELETON */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <ShimmerBox className="h-8 w-28 rounded-xl bg-[#0059bb]/30" />
            <ShimmerBox className="h-8 w-24 rounded-xl" />
            <ShimmerBox className="h-8 w-28 rounded-xl" />
            <ShimmerBox className="h-8 w-24 rounded-xl" />
            <ShimmerBox className="h-8 w-32 rounded-xl" />
            <ShimmerBox className="h-8 w-24 rounded-xl" />
            <ShimmerBox className="h-8 w-28 rounded-xl" />
          </div>

          {/* Sub-Filters: Search input + CEFR Levels 7 pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <ShimmerBox className="h-10 w-full max-w-md rounded-xl" />
            <div className="h-10 flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0">
              {[1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                <ShimmerBox key={lvl} className="h-8 w-9 sm:w-11 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* 3. VIDEO CARDS 16:9 GRID SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col space-y-3 select-none"
            >
              {/* 16:9 Aspect Video Inner Thumbnail (Rule 10 Concentric Radii) */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                <ShimmerBox className="w-full h-full rounded-xl" />
                {/* Duration Badge Bottom-Right */}
                <div className="absolute bottom-2 right-2 w-12 h-4 rounded bg-slate-900/60 backdrop-blur-xs" />
                {/* Level Badge Top-Left */}
                <div className="absolute top-2 left-2 w-8 h-4 rounded bg-blue-600/40" />
              </div>

              {/* Title & Channel & Stats */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <ShimmerBox className="h-4.5 w-full rounded" />
                  <ShimmerBox className="h-4.5 w-3/4 rounded" />
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs gap-2">
                  <ShimmerBox className="h-8 w-24 rounded-xl" />
                  <ShimmerBox className="h-8 w-24 rounded-xl bg-[#0059bb]/30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho trang Listening dạng STUDIO (khi đã chọn bài, có ?id= hoặc ?id=52)
 * Khớp 100% tỷ lệ hình học: StudioTopHeader (56px) → Waveform Studio 95-spikes → Meta row → Utility toolbar → Word Tokens Track → Input Field → Right Sidebar
 */
export function ListeningStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans bg-[#f8fafc] dark:bg-[#050505]">
      {/* 1. STUDIO TOP HEADER SKELETON (56px h-14) */}
      <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-2xs">
        {/* Left: Back Button + Level Badge + Title + Star + Mode Switcher + Accent Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
          {/* Back Button (responsive: icon-only on mobile, icon + text on desktop) */}
          <ShimmerBox className="w-8.5 sm:w-[86px] h-8 sm:h-8.5 rounded-xl shrink-0" />

          {/* Level Badge (Bổ sung tránh lệch ngang) */}
          <ShimmerBox className="h-5 w-8 rounded-md bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />

          {/* Title */}
          <ShimmerBox className="h-5 w-36 xs:w-48 sm:w-60 rounded-md" />

          {/* Star Bookmark */}
          <ShimmerBox className="w-7 h-7 rounded-lg hidden xs:block shrink-0" />

          {/* Micro Divider */}
          <div className="hidden xl:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />

          {/* Mode Switcher */}
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 ml-0.5">
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-14 rounded-lg" />
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-16 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
          </div>

          {/* Micro Divider between Mode & Accent */}
          <div className="hidden md:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />

          {/* Accent Switcher [US / UK / AU] */}
          <div className="hidden md:inline-flex p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 items-center gap-0.5 shrink-0">
            <ShimmerBox className="h-5 w-8 rounded-lg bg-[#0059bb]/30 dark:bg-sky-500/30" />
            <ShimmerBox className="h-5 w-8 rounded-lg" />
            <ShimmerBox className="h-5 w-8 rounded-lg" />
          </div>
        </div>

        {/* Right: Clock Timer Pill & Studio Toolbar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <ShimmerBox className="h-7 w-20 rounded-full bg-amber-500/15 dark:bg-amber-500/20" />
          <div className="hidden md:flex items-center gap-0.5 text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-2">
            {[1, 2, 3].map((i) => (
              <ShimmerBox key={i} className="w-7 h-7 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. MOBILE TAB SWITCHER SKELETON (< lg) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0 sticky top-0 z-20">
        <div className="pb-2.5 relative">
          <ShimmerBox className="h-4 w-32 rounded-md bg-slate-900/20 dark:bg-white/20" />
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-t-full" />
        </div>
        <div className="pb-2.5">
          <ShimmerBox className="h-4 w-36 rounded-md opacity-60" />
        </div>
      </div>

      {/* 3. 2-COLUMN STUDIO WORKSPACE SKELETON */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS WORKSPACE */}
        <div className="flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
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
              <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-22 sm:h-24 lg:h-28 flex items-center justify-center px-1 bg-transparent select-none overflow-hidden group">
                {/* Subtle Unified Wave Shimmer Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none z-20" />

                {/* Dense Jagged Vector Spectrum Bars */}
                <div className="relative z-10 w-full flex items-center justify-center gap-[1.2px] sm:gap-[1.6px] lg:gap-[1.8px] h-full">
                  {JAGGED_ACOUSTIC_SPEECH_SPIKES_95.map((amp, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${Math.max(8, amp)}%`,
                        transformOrigin: "center center",
                      }}
                      className="w-[2px] sm:w-[2.4px] lg:w-[2.8px] rounded-full shrink-0 bg-slate-300 dark:bg-slate-700 transition-colors"
                    />
                  ))}
                </div>


              </div>
            </div>

            {/* Bottom Audio Controls & Speed Dock */}
            <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pt-0.5">
              {/* 5 Playback Transport Buttons */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-3.5 select-none">
                <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full" />
                <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full" />
                <ShimmerBox className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 dark:bg-white/80 shadow-md ring-4 ring-slate-900/10 dark:ring-white/15" />
                <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full" />
                <ShimmerBox className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full" />
              </div>

              {/* Speed Dock 5 Pills */}
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center p-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 gap-0.5 shadow-2xs">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <ShimmerBox key={s} className="h-5 sm:h-6 w-9 sm:w-11 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3.2. META STATUS ROW */}
          <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-600 dark:text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-5.5 w-9 rounded-md bg-slate-200 dark:bg-slate-800" />
              <ShimmerBox className="h-4 w-16 rounded" />
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <ShimmerBox className="h-4 w-18 rounded" />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <ShimmerBox className="h-6 w-36 rounded-lg" />
              <ShimmerBox className="h-6 w-28 rounded-lg" />
            </div>
          </div>

          {/* 3.3. SENTENCE UTILITY TOOLBAR */}
          <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium">
            <div className="flex items-center gap-1.5 sm:gap-3">
              <ShimmerBox className="h-7 w-20 rounded-lg" />
              <ShimmerBox className="h-7 w-20 rounded-lg" />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <ShimmerBox className="h-7 w-16 rounded-lg" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative p-0.5">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300" />
                </div>
                <ShimmerBox className="h-3.5 w-18 rounded hidden sm:inline-block" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative p-0.5">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300" />
                </div>
                <ShimmerBox className="h-3.5 w-16 rounded hidden sm:inline-block" />
              </div>
            </div>
          </div>

          {/* 3.4. DICTATION WORKSPACE (WORD TOKENS + EXTERNAL LABEL + INPUT + SHORTCUT BUTTONS) */}
          <div className="space-y-2 font-sans">
            {/* Word Tokens Section */}
            <div className="space-y-1.5 pt-0">
              <div className="flex items-center justify-between text-xs px-1">
                <ShimmerBox className="h-3.5 w-28 rounded" />
                <ShimmerBox className="h-3.5 w-20 rounded" />
              </div>
              <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-1">
                  {[65, 45, 80, 50, 70, 40, 95, 60, 55, 75, 45].map((w, idx) => (
                    <ShimmerBox
                      key={idx}
                      className="h-8 sm:h-9 rounded-lg border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60"
                      style={{ width: w }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* External Label Row (Bổ sung triệt tiêu CLS ~26px) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-0.5 text-xs font-bold select-none">
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-3.5 h-3.5 rounded-xs" />
                  <ShimmerBox className="h-3.5 w-40 rounded" />
                </div>
                <ShimmerBox className="h-3 w-44 rounded hidden sm:inline-block opacity-60" />
              </div>

              {/* Dictation Input Box */}
              <ShimmerBox className="h-11 sm:h-12 w-full rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs" />
            </div>

            {/* Bottom 4 Utility Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-0.5">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial">
                <ShimmerBox className="h-8.5 sm:h-9 w-28 sm:w-32 rounded-xl" />
                <ShimmerBox className="h-8.5 sm:h-9 w-24 sm:w-28 rounded-xl" />
              </div>
              <div className="flex items-center gap-1.5">
                <ShimmerBox className="h-8.5 sm:h-9 w-20 sm:w-24 rounded-xl" />
                <ShimmerBox className="h-8.5 sm:h-9 w-8.5 sm:w-9 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR SKELETON */}
        <div className="hidden lg:flex flex-col w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 min-h-0">
          {/* Top Tabs */}
          <div className="flex items-center border-b border-slate-100 dark:border-slate-800/80 px-5 pt-3 gap-7 sm:gap-8 shrink-0">
            <div className="pb-2.5 relative">
              <ShimmerBox className="h-4 w-20 rounded-md bg-slate-900/20 dark:bg-white/20" />
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-full" />
            </div>
            <div className="pb-2.5">
              <ShimmerBox className="h-4 w-24 rounded-md opacity-60" />
            </div>
          </div>

          {/* Progress Row */}
          <div className="space-y-1 px-5 pt-3.5 pb-2 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <ShimmerBox className="h-6 w-14 rounded-md mb-1" />
                <ShimmerBox className="h-3 w-10 rounded opacity-60" />
              </div>
              <div className="flex items-center gap-4 pt-0.5">
                <ShimmerBox className="h-3.5 w-24 rounded" />
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-3.5 w-8 rounded" />
                  <div className="w-9 h-5 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-2">
              <ShimmerBox className="h-full w-1/4 rounded-full bg-slate-900 dark:bg-emerald-400" />
            </div>
          </div>

          {/* 6 Transcript Sentence Cards (exact px-5 pb-5 space-y-3) */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 px-5 pb-5 pt-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`p-4 sm:p-4.5 rounded-2xl border-2 space-y-2 select-none shadow-xs ${
                  i === 1
                    ? "bg-white dark:bg-slate-900 border-blue-500/80 dark:border-sky-500/70"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShimmerBox className="w-6 h-6 rounded-full" />
                    <ShimmerBox className="h-4 w-10 rounded font-mono" />
                  </div>
                  <ShimmerBox className="w-8 h-8 rounded-full" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <ShimmerBox className="h-3.5 w-full rounded" />
                  <ShimmerBox className="h-3 w-4/5 rounded opacity-60" />
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
          {/* Thumbnail Skeleton */}
          <div className="w-[102px] sm:w-[108px] h-[74px] sm:h-[78px] shrink-0 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
            <ShimmerBox className="w-full h-full rounded-xl" />
            <div className="absolute bottom-1.5 left-1.5 w-9 h-4 rounded-md bg-slate-900/40 backdrop-blur-xs" />
          </div>

          {/* Right Info */}
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

/**
 * Skeleton cho trang Video Dictation dạng STUDIO (/study/dictation/video?id=...)
 * Khác biệt 100% với Audio:
 * Màn Chiếu Rạp 16:9 Video Cinema Aspect Ratio thay vì Waveform Spikes Card!
 */
export function VideoStudioSkeleton() {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden select-none font-sans bg-[#f8fafc] dark:bg-[#050505]">
      {/* 1. STUDIO TOP HEADER SKELETON (56px h-14 - StudioTopHeader Twin) */}
      <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
          <ShimmerBox className="w-8.5 sm:w-[86px] h-8 sm:h-8.5 rounded-xl shrink-0" />
          <ShimmerBox className="h-5 w-8 rounded-md bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />
          <ShimmerBox className="h-5 w-36 xs:w-48 sm:w-60 rounded-md" />
          <ShimmerBox className="w-7 h-7 rounded-lg hidden xs:block shrink-0" />
          <div className="hidden xl:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-0.5" />
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-0.5 shrink-0 ml-0.5">
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-16 rounded-lg bg-white dark:bg-slate-900 shadow-2xs" />
            <ShimmerBox className="h-6 sm:h-7 w-8 sm:w-14 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <ShimmerBox className="h-7 w-20 rounded-full bg-amber-500/15" />
          <div className="hidden md:flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2">
            {[1, 2, 3].map((i) => (
              <ShimmerBox key={i} className="w-7 h-7 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* 2. MOBILE TAB SWITCHER SKELETON (< lg) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0 sticky top-0 z-20 backdrop-blur-md">
        <div className="pb-2.5 relative">
          <ShimmerBox className="h-4 w-32 rounded-md bg-slate-900/20 dark:bg-white/20" />
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-t-full" />
        </div>
        <div className="pb-2.5">
          <ShimmerBox className="h-4 w-36 rounded-md opacity-60" />
        </div>
      </div>

      {/* 3. 2-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: VIDEO CINEMA + DICTATION */}
        <div className="flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
          {/* 2.1. VIDEO CINEMA FRAME SKELETON (1:1 Exact Twin with VideoCinemaFrame) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm p-1.5 sm:p-2 select-none flex flex-col justify-between space-y-2">
            {/* 1. Responsive 16:9 Cinema Viewport */}
            <div className="relative w-full max-w-2xl mx-auto aspect-video max-h-[210px] sm:max-h-[240px] md:max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-slate-200/80 dark:border-slate-800 bg-black flex items-center justify-center group shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl ring-8 ring-white/5">
                <div className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[15px] border-l-white/80 ml-1" />
              </div>
            </div>

            {/* 2. Control Dock (Below Video, Clean & Symmetrical) */}
            <div className="w-full shrink-0 px-2 sm:px-3 pt-1.5 pb-1 space-y-2 bg-transparent select-none">
              {/* Scrubber Progress Bar */}
              <div className="flex items-center gap-2.5">
                <ShimmerBox className="h-3 w-8 rounded font-mono" />
                <div className="relative flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <ShimmerBox className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#0059bb] to-sky-500" />
                </div>
                <ShimmerBox className="h-3 w-8 rounded font-mono" />
              </div>

              {/* Transport & Setting Buttons Row */}
              <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-2 pt-0.5 select-none">
                {/* Left Zone: Segment counter badge */}
                <div className="flex items-center gap-1.5 justify-start min-w-0">
                  <ShimmerBox className="h-7 w-14 rounded-lg font-mono font-bold" />
                </div>

                {/* Center Zone: Symmetrical Primary Transport Cluster */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
                  <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                  <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                  <ShimmerBox className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0059bb]/40 shadow-md ring-4 ring-blue-500/10" />
                  <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                  <ShimmerBox className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                </div>

                {/* Right Zone: Secondary Actions (Loop, Speed, Volume) */}
                <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
                  <ShimmerBox className="w-9 h-9 rounded-full" />
                  <ShimmerBox className="h-8 sm:h-8.5 w-14 rounded-full" />
                  <ShimmerBox className="w-9 h-9 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 2.2. META STATUS ROW */}
          <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-600 dark:text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-5.5 w-9 rounded-md bg-slate-200 dark:bg-slate-800" />
              <ShimmerBox className="h-4 w-16 rounded" />
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <ShimmerBox className="h-4 w-18 rounded" />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <ShimmerBox className="h-6 w-36 rounded-lg" />
              <ShimmerBox className="h-6 w-28 rounded-lg" />
            </div>
          </div>

          {/* 2.3. SENTENCE UTILITY TOOLBAR */}
          <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium">
            <div className="flex items-center gap-1.5 sm:gap-3">
              <ShimmerBox className="h-7 w-20 rounded-lg" />
              <ShimmerBox className="h-7 w-20 rounded-lg" />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <ShimmerBox className="h-7 w-16 rounded-lg" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative p-0.5">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300" />
                </div>
                <ShimmerBox className="h-3.5 w-18 rounded hidden sm:inline-block" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-slate-200 dark:bg-slate-700 relative p-0.5">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-300" />
                </div>
                <ShimmerBox className="h-3.5 w-16 rounded hidden sm:inline-block" />
              </div>
            </div>
          </div>

          {/* 2.4. DICTATION WORKSPACE (WORD TOKENS + EXTERNAL LABEL + INPUT + SHORTCUT BUTTONS) */}
          <div className="space-y-2 font-sans">
            <div className="space-y-1.5 pt-0">
              <div className="flex items-center justify-between text-xs px-1">
                <ShimmerBox className="h-3.5 w-28 rounded" />
                <ShimmerBox className="h-3.5 w-20 rounded" />
              </div>
              <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-1">
                  {[65, 45, 80, 50, 70, 40, 95, 60, 55, 75, 45].map((w, idx) => (
                    <ShimmerBox
                      key={idx}
                      className="h-8 sm:h-9 rounded-lg border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60"
                      style={{ width: w }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-0.5 text-xs font-bold select-none">
                <div className="flex items-center gap-1.5">
                  <ShimmerBox className="w-3.5 h-3.5 rounded-xs" />
                  <ShimmerBox className="h-3.5 w-40 rounded" />
                </div>
                <ShimmerBox className="h-3 w-44 rounded hidden sm:inline-block opacity-60" />
              </div>
              <ShimmerBox className="h-11 sm:h-12 w-full rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-0.5">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial">
                <ShimmerBox className="h-8.5 sm:h-9 w-28 sm:w-32 rounded-xl" />
                <ShimmerBox className="h-8.5 sm:h-9 w-24 sm:w-28 rounded-xl" />
              </div>
              <div className="flex items-center gap-1.5">
                <ShimmerBox className="h-8.5 sm:h-9 w-20 sm:w-24 rounded-xl" />
                <ShimmerBox className="h-8.5 sm:h-9 w-8.5 sm:w-9 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR SKELETON */}
        <div className="hidden lg:flex flex-col w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 min-h-0">
          <div className="flex items-center border-b border-slate-100 dark:border-slate-800/80 px-5 pt-3 gap-7 sm:gap-8 shrink-0">
            <div className="pb-2.5 relative">
              <ShimmerBox className="h-4 w-20 rounded-md bg-slate-900/20 dark:bg-white/20" />
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-full" />
            </div>
            <div className="pb-2.5">
              <ShimmerBox className="h-4 w-24 rounded-md opacity-60" />
            </div>
          </div>

          <div className="space-y-1 px-5 pt-3.5 pb-2 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <ShimmerBox className="h-6 w-14 rounded-md mb-1" />
                <ShimmerBox className="h-3 w-10 rounded opacity-60" />
              </div>
              <div className="flex items-center gap-4 pt-0.5">
                <ShimmerBox className="h-3.5 w-24 rounded" />
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-3.5 w-8 rounded" />
                  <div className="w-9 h-5 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-2">
              <ShimmerBox className="h-full w-1/4 rounded-full bg-slate-900 dark:bg-emerald-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 px-5 pb-5 pt-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`p-4 sm:p-4.5 rounded-2xl border-2 space-y-2 select-none shadow-xs ${
                  i === 1
                    ? "bg-white dark:bg-slate-900 border-blue-500/80 dark:border-sky-500/70"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShimmerBox className="w-6 h-6 rounded-full" />
                    <ShimmerBox className="h-4 w-10 rounded font-mono" />
                  </div>
                  <ShimmerBox className="w-8 h-8 rounded-full" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <ShimmerBox className="h-3.5 w-full rounded" />
                  <ShimmerBox className="h-3 w-4/5 rounded opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Canonical Aliases
export const AudioListingSkeleton = ListeningListingSkeleton;
export const AudioStudioSkeleton = ListeningStudioSkeleton;

/**
 * Skeleton cho vùng Dictation Workspace (Word Tokens + Input Box) khi chuyển bài bên trong Studio (In-Place Transition)
 */
export function DictationWorkspaceLoadingSkeleton() {
  return (
    <div className="space-y-2 font-sans select-none">
      {/* Word Tokens Section */}
      <div className="space-y-1.5 pt-0">
        <div className="flex items-center justify-between text-xs px-1">
          <ShimmerBox className="h-3.5 w-28 rounded" />
          <ShimmerBox className="h-3.5 w-20 rounded" />
        </div>
        <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-1">
            {[65, 45, 80, 50, 70, 40, 95, 60, 55, 75, 45].map((w, idx) => (
              <ShimmerBox
                key={idx}
                className="h-8 sm:h-9 rounded-lg border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* External Label Row */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5 text-xs font-bold select-none">
          <div className="flex items-center gap-1.5">
            <ShimmerBox className="w-3.5 h-3.5 rounded-xs" />
            <ShimmerBox className="h-3.5 w-40 rounded" />
          </div>
          <ShimmerBox className="h-3 w-44 rounded hidden sm:inline-block opacity-60" />
        </div>

        {/* Dictation Input Box */}
        <ShimmerBox className="h-11 sm:h-12 w-full rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs" />
      </div>

      {/* Bottom 4 Utility Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial">
          <ShimmerBox className="h-8.5 sm:h-9 w-28 sm:w-32 rounded-xl" />
          <ShimmerBox className="h-8.5 sm:h-9 w-24 sm:w-28 rounded-xl" />
        </div>
        <div className="flex items-center gap-1.5">
          <ShimmerBox className="h-8.5 sm:h-9 w-20 sm:w-24 rounded-xl" />
          <ShimmerBox className="h-8.5 sm:h-9 w-8.5 sm:w-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton cho Khối Câu Hỏi Đọc Hiểu Bento Card (Question Bento Card Skeleton)
 * Tinh tế, chuẩn xác sát 100% tỷ lệ hình học:
 * - Header: QUESTION 1 OF 3 + Công tắc trượt Dịch Anh - Việt (chuẩn icon Languages + nhãn chữ font-sans + toggle switch)
 * - Progress bar: Animated Shimmer
 * - Tiêu đề câu hỏi + Hộp phụ đề dịch tiếng Việt (border-l-[3px])
 * - 4 Thẻ đáp án A, B, C, D (đúng huy hiệu w-7.5 h-7.5 + chữ đáp án + phụ đề dịch)
 * - Action footer: Nút Check Answer chuẩn mực Rule 18
 */
export function QuestionBentoCardSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5 sm:space-y-4 select-none">
      {/* 1. Header: Stepper & Công Tắc Dịch Anh - Việt Sát 100% */}
      <div className="space-y-2 sm:space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-xs font-bold flex-wrap">
          <span className="text-[#0059bb]/70 dark:text-sky-400/70 font-mono tracking-wider text-xs sm:text-[13px] font-extrabold uppercase">
            QUESTION 1 OF 3
          </span>

          {/* Công tắc Dịch Anh - Việt Skeleton 1:1 Với Giao Diện Thật */}
          <div className="flex items-center gap-2.5 select-none">
            <div className="flex items-center gap-2">
              <Languages className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[2.5] text-[#0059bb]/60 dark:text-sky-400/60 shrink-0" />
              <span className="text-[13.5px] sm:text-sm font-semibold text-slate-600 dark:text-slate-400 tracking-normal font-sans">
                Dịch Anh - Việt
              </span>
            </div>

            <div className="w-9 h-5 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 flex items-center justify-start">
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </div>
          </div>
        </div>

        {/* Clean Animated Progress Bar Skeleton */}
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <ShimmerBox className="h-full w-1/3 rounded-full bg-[#0059bb]/60 dark:bg-sky-500/60" />
        </div>
      </div>

      {/* 2. Tiêu đề câu hỏi */}
      <div className="pt-0 pb-0.5 space-y-2">
        <div className="space-y-2">
          <ShimmerBox className="h-6 sm:h-7 w-11/12 rounded-lg" />
          <ShimmerBox className="h-6 sm:h-7 w-3/4 rounded-lg" />
        </div>
      </div>

      {/* 3. Lưới 4 đáp án A, B, C, D — Cấu Trúc Khớp 100% Thẻ Nút Bấm Thật */}
      <div className="space-y-2 sm:space-y-2.5">
        {["A", "B", "C", "D"].map((letter, optIdx) => (
          <div
            key={letter}
            className="w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex items-start gap-3 sm:gap-3.5 select-none"
          >
            {/* Huy hiệu chữ cái A B C D */}
            <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 mt-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200/80 dark:border-slate-700/80">
              {letter}
            </div>

            <div className="flex-1 space-y-2 pt-0.5">
              {/* Văn bản đáp án tiếng Anh */}
              <ShimmerBox
                className={`h-5 rounded-md ${
                  optIdx === 0
                    ? "w-4/5"
                    : optIdx === 1
                    ? "w-3/5"
                    : optIdx === 2
                    ? "w-5/6"
                    : "w-2/3"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 4. Action Footer: Single Primary Button Rule 18 */}
      <div className="pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          <ShimmerBox className="h-3.5 w-36 rounded" />
        </div>

        <div className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 text-slate-400 cursor-not-allowed border border-slate-200/60 dark:border-slate-700/60 shadow-xs flex items-center justify-center">
          <span>Check Answer</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton toàn cảnh cho Video Comprehension Studio (/study/dictation/video/comprehension/[id])
 * Chuẩn mực 100% tỷ lệ hình học:
 * 1. StudioTopHeader (56px h-14)
 * 2. Mobile Tab Switcher (cho màn hình nhỏ < lg)
 * 3. Cột Trái: Video Cinema Frame 16:9 + Question Bento Card Skeleton
 * 4. Cột Phải: Interactive Transcript Sidebar Skeleton (Phụ đề + Tiến độ + Công tắc Hiện câu + Danh sách câu)
 */
export function VideoComprehensionStudioSkeleton() {
  return (
    <div className="w-full h-screen min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans select-none overflow-hidden">
      {/* 1. STUDIO TOP HEADER SKELETON (56px h-14) Sát 100% StudioTopHeader */}
      <div className="w-full px-3.5 sm:px-5 lg:px-6 h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-2xs">
        {/* Left: Back button + Level badge + Title + Dictation / Shadowing buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
          <div className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs flex items-center gap-1.5 font-bold text-xs text-slate-400">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span className="hidden sm:inline">Quay lại</span>
          </div>

          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb]/60 dark:text-sky-400/60 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs shrink-0">
            B2
          </span>

          <ShimmerBox className="h-5 w-44 sm:w-64 rounded-md" />

          <div className="hidden xl:block w-[1px] h-4 bg-slate-200 dark:bg-slate-700 shrink-0 mx-1" />

          <div className="hidden sm:inline-flex p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 items-center gap-1 shrink-0">
            <div className="px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Dictation</span>
            </div>
            <div className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <span>Shadowing</span>
            </div>
          </div>
        </div>

        {/* Right: Fullscreen & Keyboard tools */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8.5 h-8.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hidden sm:flex items-center justify-center text-slate-400">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div className="w-8.5 h-8.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hidden sm:flex items-center justify-center text-slate-400">
            <Keyboard className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* MOBILE TAB SWITCHER (< lg) — Giữ Layout Cố Định Không Nhảy */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-2 shrink-0 z-20">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 w-full">
          <div className="flex-1 py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <ShimmerBox className="w-24 h-3.5 rounded" />
          </div>
          <div className="flex-1 py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 text-slate-400">
            <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
            <ShimmerBox className="w-20 h-3.5 rounded" />
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-hidden">
        {/* CỘT TRÁI / CHÍNH: KHỐI VIDEO + CÂU HỎI ĐỌC HIỂU */}
        <div className="flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar">
          {/* 2.1. KHỐI VIDEO CINEMA FRAME SKELETON (1:1 SÁT 100% DICTATION VIDEO BLOCK) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm p-1.5 sm:p-2 select-none flex flex-col justify-between space-y-2">
            {/* 16:9 Cinema Viewport */}
            <div className="relative w-full max-w-2xl mx-auto aspect-video max-h-[210px] sm:max-h-[240px] md:max-h-[260px] rounded-xl overflow-hidden shadow-inner border border-slate-200/80 dark:border-slate-800 bg-slate-950 flex flex-col items-center justify-between p-3 shrink-0">
              <div className="w-full flex justify-end">
                <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-xs" />
              </div>

              {/* Nút Play trung tâm có vòng hào quang */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl ring-8 ring-white/5 my-auto">
                <Play className="w-6 h-6 text-white/80 fill-white/80 ml-1" />
              </div>

              {/* Thanh phụ đề mô phỏng dưới đáy khung hình */}
              <div className="px-3.5 py-1 rounded bg-black/75 backdrop-blur-xs border border-white/10 shadow-md max-w-[85%] text-center">
                <ShimmerBox className="h-3 w-48 sm:w-64 rounded bg-white/30" />
              </div>
            </div>

            {/* Video Control Bar */}
            <div className="w-full shrink-0 px-2 sm:px-3 pt-1.5 pb-1 space-y-2 bg-transparent select-none">
              {/* Scrubber Progress Bar */}
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono text-slate-400 font-bold tabular-nums">00:00</span>
                <div className="relative flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <ShimmerBox className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#0059bb] to-sky-500" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold tabular-nums">00:03</span>
              </div>

              {/* Transport & Setting Buttons Row */}
              <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-2 pt-0.5 select-none">
                {/* Left: Segment badge */}
                <div className="flex items-center gap-1.5 justify-start min-w-0">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200/80 dark:border-slate-700/60 tabular-nums shrink-0 shadow-2xs">
                    #1/10
                  </span>
                </div>

                {/* Center: Play controls chuẩn xác */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-400">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <SkipBack className="w-4.5 h-4.5" />
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <RotateCcw className="w-4.5 h-4.5" />
                  </div>
                  {/* Dominant Primary Play Button */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0059bb] text-white flex items-center justify-center shadow-md shadow-[#0059bb]/30 ring-4 ring-[#0059bb]/15">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <RotateCcw className="w-4.5 h-4.5 scale-x-[-1]" />
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <SkipForward className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Right: Repeat, Speed & Volume */}
                <div className="flex items-center gap-1 sm:gap-1.5 justify-end text-slate-400">
                  <div className="w-9 h-9 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <Repeat className="w-4 h-4" />
                  </div>
                  <div className="h-8 sm:h-8.5 px-3 rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-xs font-bold font-mono text-slate-600 dark:text-slate-400 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60">
                    1x
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2.2. KHỐI CÂU HỎI ĐỌC HIỂU BENTO CARD SKELETON */}
          <div className="w-full pb-8">
            <QuestionBentoCardSkeleton />
          </div>
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR SKELETON (380px - 440px) */}
        <div className="hidden lg:flex flex-col w-[380px] xl:w-[410px] 2xl:w-[440px] shrink-0 border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 min-h-0">
          {/* Tab bar header */}
          <div className="flex items-center border-b border-slate-200/80 dark:border-slate-800 px-5 pt-3 gap-7 sm:gap-8 shrink-0 bg-transparent">
            <div className="flex items-center gap-1.5 pb-2.5 text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white border-b-2 border-[#0059bb] dark:border-sky-400">
              <ListOrdered className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
              <span>Phụ đề</span>
            </div>
            <div className="flex items-center gap-1.5 pb-2.5 text-xs sm:text-[13px] font-bold text-slate-400 dark:text-slate-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gợi ý bài học</span>
            </div>
          </div>

          {/* Progress Header & Hiện câu toggle */}
          <div className="px-5 pt-3.5 pb-2.5 shrink-0 bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800/60 space-y-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  0/10
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  Tiến độ
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 pt-0.5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="font-normal">Đặt lại tiến độ</span>
                </div>

                <div className="flex items-center gap-2 select-none">
                  <span className="font-normal text-slate-600 dark:text-slate-400">Hiện câu</span>
                  <div className="w-9 h-5 rounded-full p-0.5 bg-slate-200 dark:bg-slate-700 flex items-center justify-start">
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <ShimmerBox className="h-full w-1/4 rounded-full bg-[#0059bb] dark:bg-emerald-400" />
            </div>
          </div>

          {/* Transcript Sentences List Shimmer */}
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 px-5 pb-5 pt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 select-none shadow-2xs ${
                  i === 1
                    ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb]/70 dark:border-sky-500/70 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        i === 1
                          ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb]"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {i === 1 ? (
                        <Headphones className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-mono text-[11px] font-bold">#{i}</span>
                      )}
                    </div>

                    {i === 1 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0059bb] dark:bg-blue-950/80 dark:text-sky-300">
                        Đang học
                      </span>
                    )}
                  </div>

                  <div className="w-6 h-6 rounded-full bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-400">
                    <Play className="w-3 h-3 ml-0.5" />
                  </div>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <ShimmerBox className="h-4 w-full rounded" />
                  <ShimmerBox className="h-4 w-4/5 rounded opacity-70" />
                </div>

                <div className="pl-3 py-1.5 border-l-2 border-[#0059bb]/50 dark:border-sky-400/50 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-lg mt-1.5">
                  <ShimmerBox className="h-3.5 w-3/4 rounded bg-blue-200/50 dark:bg-blue-800/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

