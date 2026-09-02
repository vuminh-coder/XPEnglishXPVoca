"use client";
import React from "react";

/**
 * High-End Visual Skeleton Loading for Landing Page (http://localhost:3000)
 * 1:1 Zero-CLS Match with app/page.tsx
 * Adheres strictly to 60-30-10 Color Palette, Nested Radius Hierarchy (Rule 10),
 * and High-End Typography & Spacing Guidelines.
 */
export default function HomeLoading() {
  return (
    <div
      className="min-h-[100dvh] flex flex-col justify-between bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 overflow-x-hidden relative select-none animate-pulse font-sans"
      aria-busy="true"
      aria-label="Đang tải trang chủ..."
    >
      {/* Ambient Background Mesh Gradients (Matching app/page.tsx) */}
      <div className="hidden md:block absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#0059bb]/10 dark:bg-[#0059bb]/15 blur-[120px] pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[15%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[120px] pointer-events-none z-0" />

      {/* ============================================================
          1. STICKY TOP NAVBAR SKELETON (h-14 Baseline)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 w-full h-14 border-b border-slate-200/90 dark:border-slate-800 flex items-center z-50 bg-white/95 dark:bg-[#08080b]/95 backdrop-blur-md shadow-2xs">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6">
          {/* Logo Brand Skeleton */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-6 w-8 rounded-lg bg-[#0059bb]/30 dark:bg-sky-400/20" />
            <div className="h-6 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-1 rounded-full bg-amber-400/40" />
            <div className="h-6 w-20 rounded-lg bg-amber-500/20 dark:bg-amber-400/20" />
          </div>

          {/* Desktop Navigation Links Skeleton */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-7 w-28 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="h-7 w-24 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="h-7 w-24 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="h-7 w-32 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
          </div>

          {/* Desktop Action Buttons Skeleton */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className="h-9 w-24 rounded-xl bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="h-9 w-36 rounded-xl bg-[#0059bb]/40 dark:bg-[#0059bb]/50 shadow-xs" />
          </div>

          {/* Mobile Hamburger Toggle Skeleton */}
          <div className="md:hidden w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60" />
        </div>
      </header>

      {/* ============================================================
          2. SECTION 1: HERO SECTION SKELETON
          ============================================================ */}
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Headline, Subtitle & Bento Metrics */}
          <div className="lg:col-span-7 text-left space-y-4">
            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/70 rounded-lg px-3 py-1 mb-1">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400/60" />
              <div className="h-3.5 w-52 rounded-md bg-blue-500/30 dark:bg-sky-400/30" />
            </div>

            {/* 2-line High Contrast Headline Skeleton */}
            <div className="space-y-2 mb-2">
              <div className="h-8 sm:h-10 md:h-12 w-4/5 rounded-xl bg-slate-300 dark:bg-slate-800" />
              <div className="h-8 sm:h-10 md:h-12 w-3/5 rounded-xl bg-gradient-to-r from-[#0059bb]/30 via-sky-400/30 to-amber-500/30" />
            </div>

            {/* Subtitle Description Skeleton */}
            <div className="space-y-2 max-w-xl pb-2">
              <div className="h-4 w-full rounded-md bg-slate-200/90 dark:bg-slate-800/90" />
              <div className="h-4 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1 mb-4">
              <div className="h-11 w-40 sm:w-44 rounded-xl bg-[#0059bb]/40 dark:bg-[#0059bb]/50 shadow-xs" />
              <div className="h-11 w-36 sm:w-40 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700" />
            </div>

            {/* 4 Clean Stats Metrics Row (Rule 8: Hierarchy of Numbers) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-5 border-t border-slate-200/90 dark:border-slate-800">
              {/* Stat 1: Học viên */}
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="h-6 sm:h-7 w-12 rounded-md bg-blue-500/25 dark:bg-sky-400/20" />
                <div className="h-3 w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              {/* Stat 2: Từ vựng */}
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="h-6 sm:h-7 w-14 rounded-md bg-amber-500/25 dark:bg-amber-400/20" />
                <div className="h-3 w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              {/* Stat 3: Ghi nhớ lâu */}
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="h-6 sm:h-7 w-10 rounded-md bg-emerald-500/25 dark:bg-emerald-400/20" />
                <div className="h-3 w-16 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              {/* Stat 4: Bài luyện tập */}
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="h-6 sm:h-7 w-12 rounded-md bg-purple-500/25 dark:bg-purple-400/20" />
                <div className="h-3 w-16 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flashcard Widget Skeleton */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full">
            <div className="w-full max-w-[410px] rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md shadow-slate-900/5 space-y-3.5 sm:space-y-4">
              
              {/* Top Badges Row */}
              <div className="flex justify-between items-center gap-2">
                <div className="h-5 w-24 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60" />
                <div className="h-5 w-16 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700" />
              </div>

              {/* Main Word & Pronunciation Audio Skeleton */}
              <div className="space-y-2">
                <div className="h-7 sm:h-8 w-44 rounded-xl bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60" />
                </div>
              </div>

              {/* Thin Divider */}
              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              {/* Vietnamese Definition Skeleton */}
              <div className="space-y-1.5">
                <div className="h-3 w-28 rounded-md bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
              </div>

              {/* Retention Status & Next Review Pill */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border-2 border-[#0059bb]/40 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                    <div className="h-3 w-4 rounded-xs bg-[#0059bb]/40" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2.5 w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
                    <div className="h-3.5 w-16 rounded-md bg-slate-400 dark:bg-slate-600" />
                  </div>
                </div>
                <div className="h-6 w-20 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          3. SECTION 2: BENTO GRID 5 ECOSYSTEM FEATURES SKELETON
          ============================================================ */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        {/* Bento Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 space-y-3">
          <div className="h-6 w-60 mx-auto rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60" />
          <div className="h-8 sm:h-10 w-3/4 sm:w-1/2 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700" />
          <div className="h-4 w-5/6 sm:w-2/3 mx-auto rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* 5 Balanced Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          
          {/* Bento Card 1: Spaced Repetition SRS (2 Cols) */}
          <div className="md:col-span-2 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 shrink-0" />
                <div className="h-6 w-52 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Inner Ebbinghaus Chart Mockup */}
            <div className="w-full bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-44 rounded-md bg-blue-500/30 dark:bg-sky-400/30" />
                <div className="h-4 w-20 rounded-md bg-slate-200/80 dark:bg-neutral-800" />
              </div>
              <div className="h-24 sm:h-28 w-full rounded-lg bg-slate-100/70 dark:bg-neutral-900/80 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center">
                <div className="h-1 w-3/4 rounded-full bg-[#0059bb]/20" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="h-3 w-28 rounded-md bg-rose-500/30" />
                <div className="h-3 w-28 rounded-md bg-blue-500/30" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Kho Từ Vựng & Bộ Từ Riêng (1 Col) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-7 shadow-2xs flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60 shrink-0" />
                <div className="h-6 w-44 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Inner Vocab Sets List */}
            <div className="flex flex-col gap-2.5 bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-28 rounded-md bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-14 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-32 rounded-md bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-14 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="h-3.5 w-24 rounded-md bg-blue-500/30" />
                <div className="h-4 w-16 rounded-md bg-emerald-500/20" />
              </div>
            </div>
          </div>

          {/* Bento Card 3: Đấu Trường PvP (1 Col) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-800/60 shrink-0" />
                <div className="h-6 w-36 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Inner PvP Match Preview */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20" />
                <div className="h-3.5 w-10 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-5 w-8 rounded-md bg-rose-500/20" />
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-14 rounded-md bg-slate-300 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-full bg-amber-500/20" />
              </div>
            </div>
          </div>

          {/* Bento Card 4: Nghe Chính Tả & Dictation (1 Col) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 shrink-0" />
                <div className="h-6 w-40 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Inner Dictation Preview */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-purple-500/20" />
                <div className="h-3.5 w-24 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-5 w-16 rounded-md bg-purple-500/20" />
            </div>
          </div>

          {/* Bento Card 5: Bảng Xếp Hạng & Thăng Cấp XP (1 Col) */}
          <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0" />
                <div className="h-6 w-44 rounded-lg bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Inner Leaderboard Preview */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/30" />
                <div className="h-3.5 w-20 rounded-md bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-20 rounded-md bg-amber-500/20" />
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          4. SECTION 3: SPOTLIGHT AI TUTOR 1-1 DEMO SKELETON
          ============================================================ */}
      <section className="py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        <div className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between gap-6 items-center">
          
          {/* Left Column: Heading & Feature Pitch */}
          <div className="max-w-md w-full text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 shrink-0" />
              <div className="h-7 w-48 rounded-lg bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            </div>
          </div>

          {/* Right Column: AI Chat Conversation Dialogue Mockup */}
          <div className="w-full md:max-w-md bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            {/* AI Bot Message */}
            <div className="flex gap-2.5 items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 shrink-0" />
              <div className="h-9 w-4/5 rounded-xl bg-white dark:bg-[#121216] border border-slate-200/90 dark:border-slate-800 shadow-2xs" />
            </div>
            {/* User Message */}
            <div className="flex gap-2.5 justify-end items-center">
              <div className="h-9 w-3/4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-[#0059bb]/30 shadow-2xs" />
              <div className="w-8 h-8 rounded-full bg-[#0059bb]/20 shrink-0" />
            </div>
            {/* AI Real-time Evaluation Pill */}
            <div className="h-9 w-full rounded-xl bg-white dark:bg-[#0c0c0f] border border-emerald-500/40" />
          </div>

        </div>
      </section>

      {/* ============================================================
          5. SECTION 4: SMART ANALYTICS & SRS HEATMAP BANNER SKELETON
          ============================================================ */}
      <section className="py-8 md:py-12 px-4 md:px-6 max-w-7xl mx-auto w-full z-10">
        <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 dark:border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl w-full text-left space-y-2.5">
            <div className="h-5 w-36 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60" />
            <div className="h-7 sm:h-9 w-3/4 sm:w-96 rounded-xl bg-slate-300 dark:bg-slate-700" />
            <div className="h-4 w-full sm:w-80 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="w-full md:w-auto shrink-0">
            <div className="w-full sm:w-52 h-11 rounded-xl bg-[#0059bb]/40 dark:bg-[#0059bb]/50 shadow-xs" />
          </div>
        </div>
      </section>

      {/* ============================================================
          6. SECTION 5: STUDENT TESTIMONIALS GRID SKELETON
          ============================================================ */}
      <section className="py-12 md:py-16 lg:py-24 bg-slate-100/60 dark:bg-[#08080b] border-y border-slate-200/90 dark:border-slate-800 px-4 md:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 space-y-3">
            <div className="h-6 w-44 mx-auto rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60" />
            <div className="h-8 sm:h-10 w-72 sm:w-96 mx-auto rounded-xl bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* 3 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 p-5 md:p-6 shadow-2xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="h-4 w-24 rounded-md bg-amber-400/25" />
                  <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-4/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1">
                    <div className="h-3.5 w-24 rounded-md bg-slate-300 dark:bg-slate-700" />
                    <div className="h-3 w-36 rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. SECTION 6: BOTTOM CTA BANNER SKELETON
          ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 max-w-7xl mx-auto w-full z-10 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#002855] text-white py-12 md:py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-4 md:gap-5 relative overflow-hidden shadow-xl border border-blue-400/20">
          <div className="h-6 w-56 rounded-full bg-white/20 border border-white/20" />
          <div className="h-8 sm:h-10 md:h-12 w-3/4 max-w-xl rounded-xl bg-white/30" />
          <div className="h-4 w-2/3 max-w-md rounded-md bg-blue-100/30" />
          <div className="h-12 w-52 sm:w-60 rounded-xl bg-white/40 mt-2" />
        </div>
      </section>

      {/* ============================================================
          8. FOOTER SKELETON
          ============================================================ */}
      <footer className="w-full mt-auto bg-white dark:bg-[#040406] border-t border-slate-200/90 dark:border-slate-800 py-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] z-10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="h-6 w-8 rounded-lg bg-[#0059bb]/30" />
              <div className="h-6 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-1 rounded-full bg-amber-400/40" />
              <div className="h-6 w-20 rounded-lg bg-amber-500/20" />
            </div>
            <div className="h-3 w-64 rounded-md bg-slate-200 dark:bg-slate-800 mt-2" />
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
            <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center md:text-left">
          <div className="h-3 w-56 rounded-md bg-slate-200 dark:bg-slate-800 mx-auto md:mx-0" />
        </div>
      </footer>

    </div>
  );
}
