"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShimmerBox,
  ShimmerCircle,
  ShimmerText,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { MOCK_EXAM_PAPERS, SkillType } from "../data/exam-papers";

/**
 * 1. SKELETON EXAM HUB (Mặc định khi truy cập /study/exam-prep không có ?id=...)
 * Tái hiện chính xác 1:1 bố cục: Top Toolbar 56px, Hero Banner Bento,
 * Ma trận 4 kỹ năng, Segmented Tabs bộ lọc, và Lưới 6 thẻ đề thi 3 cột.
 */
export function ExamHubSkeleton() {
  return (
    <div
      className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-16 md:pb-8"
      aria-label="Đang tải phòng thi thử chuẩn hóa..."
    >
      {/* ─── 0. TOP ACTION & NAVIGATION HEADER BAR SKELETON (56px Baseline Sticky) ─── */}
      <header className="sticky top-0 z-30 w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-2xs">
        {/* Left: Mobile Sidebar Trigger + Navigation Pill Items */}
        <div className="flex items-center gap-2 min-w-0">
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <div className="p-0.5 sm:p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 shrink-0">
            {/* Active Pill: Thi thử đề */}
            <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg bg-white dark:bg-slate-700 shadow-2xs" />
            {/* Secondary Pills */}
            <ShimmerBox className="h-7 w-24 sm:w-28 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-20 sm:w-24 rounded-lg hidden md:block" />
            <ShimmerBox className="h-7 w-22 sm:w-26 rounded-lg hidden lg:block" />
          </div>
        </div>

        {/* Right: CTA Tạo Đề Mới AI + User Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ShimmerBox className="h-9 w-32 sm:w-36 rounded-xl bg-amber-400/30 dark:bg-amber-400/20" />
          <ShimmerCircle className="w-8 h-8 shrink-0" />
        </div>
      </header>

      {/* ─── MAIN CONTAINER ─── */}
      <main className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-3 sm:pt-4">

        {/* ─── 1. HERO BENTO BANNER & CONFIGURATOR STUDIO SKELETON ─── */}
        <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-3.5 sm:space-y-4">
          {/* Top ambient rose glow line (Rule 20) */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

          {/* Header Row: Title & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3 sm:pb-3.5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShimmerBox className="h-5 w-28 rounded-md bg-rose-500/15 dark:bg-rose-500/20 border border-rose-500/30" />
                <ShimmerText className="h-6 w-48 sm:w-60 rounded-lg" />
              </div>
              <ShimmerText className="h-3.5 w-64 sm:w-96 opacity-75" />
            </div>

            {/* Mode Switcher Tabs (2 buttons) */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shrink-0 w-full sm:w-auto">
              <ShimmerBox className="h-8 w-full sm:w-32 rounded-lg bg-white dark:bg-slate-700 shadow-2xs" />
              <ShimmerBox className="h-8 w-full sm:w-32 rounded-lg" />
            </div>
          </div>

          {/* 4-Skill Matrix Selector Skeleton */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <ShimmerText className="h-3.5 w-52 sm:w-64" />
              <ShimmerText className="h-3 w-40 opacity-60 hidden sm:block" />
            </div>

            {/* 4 Skills: Nghe, Đọc, Nói AI, Viết AI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {[
                { label: "Nghe", accent: "bg-blue-500/10 border-blue-300/40" },
                { label: "Đọc", accent: "bg-emerald-500/10 border-emerald-300/40" },
                { label: "Nói AI", accent: "bg-amber-500/10 border-amber-300/40" },
                { label: "Viết AI", accent: "bg-purple-500/10 border-purple-300/40" },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 sm:p-3 rounded-xl border ${skill.accent} flex items-center justify-between shadow-2xs`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ShimmerBox className="w-4 h-4 rounded-md shrink-0" />
                    <ShimmerText className="h-3.5 w-16 sm:w-20" />
                  </div>
                  <ShimmerBox className="w-4 h-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 2. SEARCH & FILTER BAR SKELETON ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
          {/* Filter Segmented Control (5 tabs) */}
          <div className="grid grid-cols-5 gap-1 w-full sm:w-auto sm:flex sm:items-center sm:gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
            <ShimmerBox className="h-7.5 w-full sm:w-24 rounded-lg bg-white dark:bg-slate-700 shadow-2xs" />
            <ShimmerBox className="h-7.5 w-full sm:w-24 rounded-lg" />
            <ShimmerBox className="h-7.5 w-full sm:w-28 rounded-lg" />
            <ShimmerBox className="h-7.5 w-full sm:w-24 rounded-lg" />
            <ShimmerBox className="h-7.5 w-full sm:w-24 rounded-lg" />
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <ShimmerBox className="w-full h-9 rounded-xl border border-slate-200/90 dark:border-slate-800" />
          </div>
        </div>

        {/* ─── 3. EXAM CARDS BENTO GRID SKELETON (6 Cards) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3.5"
            >
              <div className="space-y-3">
                {/* Top Row: Category Badge + 5-Star Rating */}
                <div className="flex items-center justify-between gap-2">
                  <ShimmerBox className="h-5 w-24 rounded-md" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <ShimmerBox key={s} className="w-2.5 h-2.5 rounded-xs" />
                    ))}
                  </div>
                </div>

                {/* Exam Title (2 lines) */}
                <div className="space-y-1.5 min-h-[2.5rem]">
                  <ShimmerText className="h-4.5 w-5/6" />
                  <ShimmerText className="h-4 w-3/5 opacity-70" />
                </div>

                {/* Supported Skills Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <ShimmerBox className="h-6 w-18 rounded-md" />
                  <ShimmerBox className="h-6 w-16 rounded-md" />
                  <ShimmerBox className="h-6 w-20 rounded-md" />
                </div>
              </div>

              {/* Bottom Row: Metadata (questions / time) + Action Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShimmerText className="h-3.5 w-14" />
                  <ShimmerText className="h-3.5 w-2 opacity-50" />
                  <ShimmerText className="h-3.5 w-12" />
                </div>

                <ShimmerBox className="h-8 w-24 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40 shadow-xs" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/**
 * 2. SKELETON CHUYÊN SÂU: KỸ NĂNG NGHE (LISTENING WORKSPACE)
 * Mô phỏng: Thanh phát Audio (Play, Scrubber, Speed), Khung ảnh Part 1 / Hội thoại Part 3-4, 4 Đáp án
 */
export function ListeningWorkspaceSkeleton() {
  return (
    <div className="space-y-3.5">
      {/* Audio Controller Bar & Waveform visualizer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShimmerCircle className="w-5 h-5" />
            <ShimmerText className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-1.5">
            <ShimmerBox className="h-6 w-12 rounded-md" />
            <ShimmerBox className="h-6 w-14 rounded-md" />
          </div>
        </div>

        {/* Audio Waveform visualization skeleton */}
        <div className="h-28 sm:h-32 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center p-4">
          <div className="w-full flex items-center justify-center gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-blue-400/30 dark:bg-blue-500/20 animate-pulse"
                style={{ height: `${14 + (i % 6) * 11}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question Text Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <ShimmerBox className="h-5 w-16 rounded-md bg-blue-500/20" />
          <ShimmerText className="h-4 w-44" />
        </div>
        <ShimmerText className="h-5 w-5/6" />
        <ShimmerText className="h-5 w-3/5" />
      </div>

      {/* 4 Thẻ đáp án A - B - C - D */}
      <div className="grid grid-cols-1 gap-2.5">
        {["A", "B", "C", "D"].map((key) => (
          <div
            key={key}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3"
          >
            <ShimmerBox className="w-8 h-8 rounded-lg shrink-0" />
            <ShimmerText className="h-4 flex-1" />
          </div>
        ))}
      </div>

      {/* Bottom Nav Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <ShimmerBox className="h-10 w-28 rounded-xl" />
        <ShimmerBox className="h-10 w-24 rounded-xl" />
        <ShimmerBox className="h-10 w-28 rounded-xl bg-[#0059bb]/30" />
      </div>
    </div>
  );
}

/**
 * 3. SKELETON CHUYÊN SÂU: KỸ NĂNG ĐỌC (READING WORKSPACE)
 * Mô phỏng: Chia đôi màn hình (6/12 Bài đọc văn bản bên trái + 6/12 Câu hỏi bên phải)
 */
export function ReadingWorkspaceSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
      {/* CỘT TRÁI (6/12): KHUNG ĐOẠN VĂN BẢN ĐỌC HIỂU */}
      <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="w-6 h-6 rounded-lg bg-emerald-500/20" />
            <ShimmerText className="h-4 w-40" />
          </div>
          <ShimmerBox className="h-6 w-20 rounded-md" />
        </div>

        {/* Multi-Passage Tabs (Part 7) */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <ShimmerBox className="h-7 w-24 rounded-lg bg-emerald-500/20" />
          <ShimmerBox className="h-7 w-24 rounded-lg" />
        </div>

        {/* 3 đoạn văn bản mô phỏng */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <ShimmerText className="h-3.5 w-full" />
            <ShimmerText className="h-3.5 w-11/12" />
            <ShimmerText className="h-3.5 w-4/5" />
          </div>
          <div className="space-y-1.5 pt-2">
            <ShimmerText className="h-3.5 w-full" />
            <ShimmerText className="h-3.5 w-5/6" />
            <ShimmerText className="h-3.5 w-3/4" />
          </div>
        </div>
      </div>

      {/* CỘT PHẢI (6/12): CÂU HỎI & 4 ĐÁP ÁN */}
      <div className="lg:col-span-6 space-y-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="h-5 w-16 rounded-md bg-emerald-500/20" />
            <ShimmerText className="h-4 w-48" />
          </div>
          <ShimmerText className="h-5 w-full" />
          <ShimmerText className="h-5 w-4/5" />
        </div>

        {/* 4 Thẻ đáp án A - B - C - D */}
        <div className="grid grid-cols-1 gap-2.5">
          {["A", "B", "C", "D"].map((key) => (
            <div
              key={key}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3"
            >
              <ShimmerBox className="w-8 h-8 rounded-lg shrink-0" />
              <ShimmerText className="h-4 flex-1" />
            </div>
          ))}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between pt-2">
          <ShimmerBox className="h-10 w-28 rounded-xl" />
          <ShimmerBox className="h-10 w-24 rounded-xl" />
          <ShimmerBox className="h-10 w-28 rounded-xl bg-[#0059bb]/30" />
        </div>
      </div>
    </div>
  );
}

/**
 * 4. SKELETON CHUYÊN SÂU: KỸ NĂNG NÓI AI (SPEAKING STUDIO WORKSPACE)
 * Mô phỏng: Bộ đếm chuẩn bị 45s, Nút Micro ghi âm to tròn, Sóng âm thanh, Khung phân tích phát âm
 */
export function SpeakingWorkspaceSkeleton() {
  return (
    <div className="space-y-3.5">
      {/* Top Speaking Studio Header with Prep countdown */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="w-6 h-6 rounded-lg bg-amber-500/20" />
            <ShimmerText className="h-4 w-44" />
          </div>
          <ShimmerBox className="h-7 w-28 rounded-lg bg-amber-500/15" />
        </div>

        {/* Speaking Passage / Topic Prompt */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <ShimmerText className="h-4 w-5/6" />
          <ShimmerText className="h-4 w-full" />
          <ShimmerText className="h-4 w-4/5" />
        </div>
      </div>

      {/* Recording Studio Center Stage: Big Mic Circle + Audio Waveform */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4 text-center">
        {/* Big Circular Mic Button with Ripple Ring */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-400/40 animate-ping absolute inset-0" />
          <ShimmerCircle className="w-20 h-20 bg-amber-500/30 dark:bg-amber-500/40" />
        </div>

        <div className="space-y-1.5">
          <ShimmerText className="h-5 w-48 mx-auto" />
          <ShimmerText className="h-3.5 w-64 mx-auto opacity-70" />
        </div>

        {/* Animated Soundwave */}
        <div className="flex items-center gap-1 pt-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-amber-500/40 animate-pulse"
              style={{ height: `${12 + (i % 5) * 8}px` }}
            />
          ))}
        </div>
      </div>

      {/* Transcript Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
        <ShimmerText className="h-4 w-36" />
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
          <ShimmerText className="h-3.5 w-full opacity-60" />
          <ShimmerText className="h-3.5 w-3/4 opacity-60" />
        </div>
      </div>
    </div>
  );
}

/**
 * 5. SKELETON CHUYÊN SÂU: KỸ NĂNG VIẾT AI (WRITING STUDIO WORKSPACE)
 * Mô phỏng: Đề bài luận Task 1/2, Bộ đếm số từ (0/150 words), Textarea soạn thảo lớn, Nút Chấm điểm AI
 */
export function WritingWorkspaceSkeleton() {
  return (
    <div className="space-y-3.5">
      {/* Writing Prompt Box with Word Target */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShimmerBox className="w-6 h-6 rounded-lg bg-purple-500/20" />
            <ShimmerText className="h-4 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <ShimmerBox className="h-6 w-24 rounded-md bg-purple-500/15" />
            <ShimmerBox className="h-6 w-16 rounded-md" />
          </div>
        </div>

        {/* Essay Prompt Instructions */}
        <div className="space-y-2">
          <ShimmerText className="h-4.5 w-5/6" />
          <ShimmerText className="h-4 w-full" />
          <ShimmerText className="h-4 w-3/4" />
        </div>
      </div>

      {/* Big Essay Editor Textarea Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-800">
          <ShimmerText className="h-3.5 w-32" />
          <ShimmerText className="h-3.5 w-24" />
        </div>

        {/* Editor Area with mock writing lines */}
        <div className="min-h-[220px] rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4 space-y-3">
          <ShimmerText className="h-4 w-full opacity-40" />
          <ShimmerText className="h-4 w-11/12 opacity-40" />
          <ShimmerText className="h-4 w-4/5 opacity-40" />
          <ShimmerText className="h-4 w-full opacity-40" />
          <ShimmerText className="h-4 w-3/4 opacity-40" />
        </div>

        {/* Action button: Chấm điểm AI */}
        <div className="flex items-center justify-between pt-1">
          <ShimmerBox className="h-4 w-48" />
          <ShimmerBox className="h-9 w-36 rounded-xl bg-purple-600/30 dark:bg-purple-600/40" />
        </div>
      </div>
    </div>
  );
}

/**
 * 6. SKELETON CHUYÊN SÂU PHÒNG THI (EXAM WORKSPACE SKELETON MASTER)
 * Tự động chọn đúng dạng khung xương kỹ năng (Listening, Reading, Speaking, Writing)
 * dựa vào tham số `skill` hoặc đề thi được nạp.
 */
export function ExamWorkspaceSkeleton({
  skill = "LISTENING",
  examTitle,
}: {
  skill?: SkillType;
  examTitle?: string;
}) {
  return (
    <div
      className="w-full min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans select-none pb-16 md:pb-8"
      aria-label="Đang tải phòng thi làm bài..."
    >
      {/* ─── 0. WORKSPACE TOP TOOLBAR SKELETON (h-14 / 56px Baseline Sticky) ─── */}
      <header className="sticky top-0 z-30 w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-2xs">
        {/* Left: Thoát bài thi + Icon + Badge + Tên đề */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <ShimmerBox className="h-8 w-24 sm:w-28 rounded-xl shrink-0" />
          <ShimmerBox className="w-8 h-8 rounded-xl shrink-0 hidden sm:block" />
          <div className="flex items-center gap-2 min-w-0">
            <ShimmerBox className="h-5 w-16 rounded-md shrink-0 bg-[#0059bb]/20" />
            <ShimmerText className="h-4 w-32 sm:w-48 truncate" />
          </div>
        </div>

        {/* Right: Toggle Phiếu + Đồng hồ đếm ngược + Nộp bài */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <ShimmerBox className="h-8 w-24 rounded-xl hidden sm:block" />
          <ShimmerBox className="h-8 w-24 sm:w-28 rounded-xl bg-slate-100 dark:bg-slate-800" />
          <ShimmerBox className="h-8 sm:h-9 w-22 sm:w-26 rounded-xl bg-[#0059bb]/40" />
        </div>
      </header>

      {/* ─── MAIN WORKSPACE GRID (8/12 vs 4/12) ─── */}
      <main className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-4 pb-24 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">

          {/* CỘT TRÁI (8/12): NỘI DUNG CHUYÊN BIỆT THEO TỪNG KỸ NĂNG */}
          <section className="lg:col-span-8 space-y-3.5">
            {skill === "READING" && <ReadingWorkspaceSkeleton />}
            {skill === "SPEAKING" && <SpeakingWorkspaceSkeleton />}
            {skill === "WRITING" && <WritingWorkspaceSkeleton />}
            {skill === "LISTENING" && <ListeningWorkspaceSkeleton />}
          </section>

          {/* CỘT PHẢI (4/12): PHIẾU TRẢ LỜI CÂU HỎI MA TRẬN */}
          <aside className="hidden lg:block lg:col-span-4 space-y-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 sticky top-18">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-4 h-4 rounded-md" />
                  <ShimmerText className="h-4 w-28" />
                </div>
                <ShimmerBox className="h-4 w-16 rounded-md" />
              </div>

              {/* 3 Legend Badges */}
              <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <ShimmerBox className="h-8 rounded-lg bg-[#0059bb]/15" />
                <ShimmerBox className="h-8 rounded-lg" />
                <ShimmerBox className="h-8 rounded-lg bg-amber-500/15" />
              </div>

              {/* Ma trận 24 câu hỏi */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <ShimmerBox
                      key={i}
                      className="h-10 rounded-xl flex items-center justify-center"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

/**
 * 7. SKELETON BÁO CÁO KẾT QUẢ THI (/study/exam-prep/result)
 * Tái hiện: Đồng hồ Gauge điểm số, 4 Thẻ chỉ số Bento, Danh sách câu hỏi so sánh đáp án
 */
export function ExamResultSkeleton() {
  return (
    <div
      className="w-full min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans select-none pb-16 md:pb-8"
      aria-label="Đang tải bảng điểm kết quả bài thi..."
    >
      {/* Header 56px */}
      <header className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShimmerBox className="h-8 w-28 rounded-xl" />
          <ShimmerBox className="h-8 w-28 rounded-xl hidden sm:block" />
        </div>
        <div className="flex items-center gap-2">
          <ShimmerBox className="h-8 w-24 rounded-xl" />
          <ShimmerBox className="h-8 w-24 rounded-xl bg-[#0059bb]/30" />
        </div>
      </header>

      {/* Main result canvas */}
      <main className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Title bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShimmerBox className="w-10 h-10 rounded-xl bg-[#0059bb]/20" />
            <div className="space-y-1.5">
              <ShimmerText className="h-3.5 w-32" />
              <ShimmerText className="h-5 w-56" />
            </div>
          </div>
        </div>

        {/* Hero Score Radial Gauge Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ShimmerCircle className="w-24 h-24 bg-[#0059bb]/15 border-4 border-[#0059bb]/30 shrink-0" />
              <div className="space-y-2">
                <ShimmerText className="h-7 w-48 sm:w-64" />
                <ShimmerText className="h-4 w-36 opacity-75" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShimmerBox className="h-9 w-28 rounded-xl bg-emerald-500/20" />
              <ShimmerBox className="h-9 w-28 rounded-xl bg-amber-500/20" />
            </div>
          </div>
        </div>

        {/* 4 Metric Bento Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3"
            >
              <ShimmerBox className="w-9 h-9 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1">
                <ShimmerText className="h-3 w-16" />
                <ShimmerText className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/**
 * 8. SKELETON THÍCH ỨNG THEO URL QUERY PARAMS (ADAPTIVE EXAM PREP SKELETON)
 * Tự động phân tích URL hiện tại:
 * - Nếu URL có `?id=1` hoặc `?exam=...`: Tự tra cứu đề thi và render đúng Skeleton Workspace
 *   của kỹ năng tương ứng (Listening, Reading, Speaking, Writing).
 * - Nếu URL không có ID: Render Skeleton của Exam Hub.
 */
export function AdaptiveExamPrepSkeleton() {
  const searchParams = useSearchParams();
  const idParam =
    searchParams?.get("id") ||
    searchParams?.get("exam") ||
    searchParams?.get("examId");

  if (idParam) {
    const num = parseInt(idParam, 10);
    let targetExam =
      !isNaN(num) && num >= 1 && num <= MOCK_EXAM_PAPERS.length
        ? MOCK_EXAM_PAPERS[num - 1]
        : MOCK_EXAM_PAPERS.find((p) => p.id === idParam);

    const primarySkill: SkillType = targetExam?.supportedSkills?.[0] || "LISTENING";
    return <ExamWorkspaceSkeleton skill={primarySkill} examTitle={targetExam?.title} />;
  }

  return <ExamHubSkeleton />;
}

/**
 * Export mặc định: Khung xương thích ứng thông minh
 */
export function ExamPrepSkeleton({
  mode = "HUB",
  skill = "LISTENING",
}: {
  mode?: "HUB" | "WORKSPACE" | "REPORT";
  skill?: SkillType;
}) {
  if (mode === "WORKSPACE") {
    return <ExamWorkspaceSkeleton skill={skill} />;
  }
  if (mode === "REPORT") {
    return <ExamResultSkeleton />;
  }
  return <ExamHubSkeleton />;
}

export default ExamPrepSkeleton;
