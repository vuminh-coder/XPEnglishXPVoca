"use client";

import React from "react";

/**
 * High-End Shimmer Skeleton Box helper
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
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/5 before:to-transparent ${className}`}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 sm:pb-12">
      {/* 0. TOP BAR SKELETON (h-14 Baseline Sticky) */}
      <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
        {/* Left: Hamburger & Navigation Pill Buttons */}
        <div className="flex items-center gap-2">
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 gap-1">
            <ShimmerBox className="h-7 w-28 rounded-lg bg-white dark:bg-slate-700 shadow-xs" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden sm:block" />
            <ShimmerBox className="h-7 w-20 rounded-lg hidden md:block" />
            <ShimmerBox className="h-7 w-24 rounded-lg hidden lg:block" />
          </div>
        </div>

        {/* Right: Quick Streak, Coins & Check-in Button Skeletons */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <ShimmerBox className="h-9 w-20 rounded-xl bg-amber-500/15 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/50" />
            <ShimmerBox className="h-9 w-20 rounded-xl bg-orange-500/15 dark:bg-orange-950/60 border border-orange-200/60 dark:border-orange-800/50" />
            <ShimmerBox className="h-9 w-32 rounded-xl bg-[#0059bb]/30 dark:bg-[#0059bb]/40" />
          </div>
          <ShimmerBox className="lg:hidden w-8 h-8 rounded-xl shrink-0" />
          <ShimmerBox className="w-8 h-8 rounded-full shrink-0" />
        </div>
      </div>

      {/* MAIN CONTENT FLUID CANVAS SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-5 sm:space-y-6">
        {/* 1. ANNOUNCEMENT BANNER SKELETON */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs h-14">
          <div className="flex items-center gap-3">
            <ShimmerBox className="w-9 h-9 rounded-xl shrink-0" />
            <div className="space-y-1.5">
              <ShimmerBox className="h-4 w-44 sm:w-72 rounded-md" />
              <ShimmerBox className="h-3 w-28 sm:w-96 rounded-md hidden sm:block opacity-60" />
            </div>
          </div>
          <ShimmerBox className="h-8 w-20 rounded-xl shrink-0" />
        </div>

        {/* 2. HERO GREETING & 4 DOUBLE-BEZEL METRIC CARDS */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
          {/* User Info Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <ShimmerBox className="w-12 h-12 sm:w-13 sm:h-13 rounded-full shrink-0 ring-2 ring-slate-100 dark:ring-slate-800" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-5.5 w-40 sm:w-56 rounded-md" />
                  <ShimmerBox className="h-4.5 w-16 rounded-md bg-blue-600/20 dark:bg-blue-500/20" />
                </div>
                <ShimmerBox className="h-3.5 w-32 sm:w-52 rounded-md opacity-60" />
              </div>
            </div>

            {/* Top Right Action Pills */}
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-9 w-28 rounded-xl border border-slate-200/60 dark:border-slate-700/50" />
              <ShimmerBox className="h-9 w-24 rounded-xl border border-slate-200/60 dark:border-slate-700/50" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 4 Double-Bezel Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { iconBg: "bg-orange-500/15 dark:bg-orange-500/20" },
              { iconBg: "bg-blue-500/15 dark:bg-blue-500/20" },
              { iconBg: "bg-emerald-500/15 dark:bg-emerald-500/20" },
              { iconBg: "bg-purple-500/15 dark:bg-purple-500/20" },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl ${m.iconBg} shrink-0 flex items-center justify-center`} />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <ShimmerBox className="h-5 w-16 rounded" />
                  <ShimmerBox className="h-3 w-20 rounded opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BENTO GRID 12 COLUMNS (7/12 & 5/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ─── LEFT COLUMN (7/12) ─── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* 3.1. TODAY'S MISSION HERO DECK SKELETON (Royal Blue Gradient) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0059bb]/25 via-blue-600/20 to-sky-600/15 dark:from-[#0059bb]/35 dark:via-blue-950/60 dark:to-slate-900 border border-blue-500/30 dark:border-blue-500/40 shadow-md space-y-3.5">
              {/* Header Badge & Sub-Chip */}
              <div className="flex items-center justify-between">
                <ShimmerBox className="h-6 w-36 rounded-md bg-blue-600/30 dark:bg-blue-400/20" />
                <ShimmerBox className="h-5 w-24 rounded-full bg-white/20 dark:bg-white/10" />
              </div>

              {/* Lesson Title Lines */}
              <div className="space-y-1.5">
                <ShimmerBox className="h-6 w-3/4 rounded-md bg-white/40 dark:bg-white/20" />
                <ShimmerBox className="h-4 w-1/2 rounded-md bg-white/25 dark:bg-white/15" />
              </div>

              {/* 3 Mission Pods */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {[1, 2, 3].map((pod) => (
                  <div
                    key={pod}
                    className="p-2 sm:p-3 rounded-xl bg-white/15 dark:bg-white/10 border border-white/20 text-center space-y-1.5"
                  >
                    <ShimmerBox className="h-2.5 w-12 mx-auto rounded bg-white/30 dark:bg-white/20" />
                    <ShimmerBox className="h-4 w-14 mx-auto rounded bg-white/50 dark:bg-white/30" />
                  </div>
                ))}
              </div>

              {/* Progress Bar & Clean White Button CTA */}
              <div className="flex items-center justify-between gap-2.5 sm:gap-4 pt-3 sm:pt-3.5 border-t border-white/20 relative z-10">
                <div className="flex-1 min-w-0 sm:max-w-xs space-y-1">
                  <div className="h-2 sm:h-2.5 rounded-full bg-white/20 dark:bg-white/10 border border-white/20 overflow-hidden">
                    <ShimmerBox className="h-full w-1/2 rounded-full bg-amber-400/60" />
                  </div>
                </div>

                <div className="shrink-0">
                  <ShimmerBox className="h-9 sm:h-10 w-36 sm:w-44 rounded-xl bg-white/90 dark:bg-white/20 shadow-md" />
                </div>
              </div>
            </div>

            {/* 3.2. PER-SKILL ANALYTICS DOCK SKELETON (Biểu Đồ Sóng 5 Kỹ Năng) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3.5">
              {/* Header Title & Weekly Total Chip */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-5 w-16 rounded-md bg-blue-500/20" />
                  <ShimmerBox className="h-5 w-44 sm:w-56 rounded-md" />
                </div>
                <ShimmerBox className="h-6 w-20 rounded-lg bg-blue-500/15" />
              </div>

              {/* 5 Tab Skill Selector Dock */}
              <div className="grid grid-cols-5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 gap-1">
                {[1, 2, 3, 4, 5].map((tab) => (
                  <div
                    key={tab}
                    className={`h-7.5 rounded-lg ${
                      tab === 1
                        ? "bg-white dark:bg-slate-700 shadow-xs"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* SVG Waveform Chart Canvas Container (210px) */}
              <div className="relative pt-2 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden space-y-3 p-3">
                <div className="space-y-4 py-2">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <div key={line} className="flex items-center gap-3">
                      <ShimmerBox className="h-3 w-8 rounded shrink-0" />
                      <div className="h-px flex-1 border-dashed border-t border-slate-300/40 dark:border-slate-700/40" />
                    </div>
                  ))}
                </div>

                {/* 7 Days Row */}
                <div className="grid grid-cols-7 gap-1 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <ShimmerBox key={day} className="h-4 w-10 mx-auto rounded" />
                  ))}
                </div>
              </div>

              {/* Sub-Action Card Embedded */}
              <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 shrink-0" />
                  <div className="space-y-1">
                    <ShimmerBox className="h-4 w-44 rounded bg-emerald-600/30 dark:bg-emerald-400/20" />
                    <ShimmerBox className="h-3 w-32 rounded bg-emerald-600/20 dark:bg-emerald-400/10 hidden sm:block" />
                  </div>
                </div>
                <ShimmerBox className="h-8 w-24 rounded-lg bg-emerald-600/20 dark:bg-emerald-500/20 shrink-0" />
              </div>
            </div>

            {/* 3.3. AI TUTOR QUICK INTERACTIVE WORKSPACE SKELETON */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-purple-500/20" />
                <ShimmerBox className="h-5 w-44 rounded-md" />
              </div>
              <div className="flex gap-2">
                <ShimmerBox className="h-11 flex-1 rounded-xl border border-slate-200/60 dark:border-slate-700/50" />
                <ShimmerBox className="h-11 w-11 rounded-xl bg-purple-600/30 dark:bg-purple-500/30 shrink-0" />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (5/12) ─── */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* 3.4. STREAK ATTENDANCE SKELETON (Fluid Connected Track) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-orange-500/20" />
                  <ShimmerBox className="h-5 w-36 rounded-md" />
                </div>
                <ShimmerBox className="h-6 w-20 rounded-lg bg-orange-500/15" />
              </div>

              {/* 7 Fluid Nodes */}
              <div className="grid grid-cols-7 gap-1.5 py-3">
                {[1, 2, 3, 4, 5, 6, 7].map((node) => (
                  <div key={node} className="flex flex-col items-center gap-2">
                    <ShimmerBox className="h-3 w-6 rounded" />
                    <ShimmerBox className="w-8 h-8 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Claim Reward Button */}
              <ShimmerBox className="h-10 rounded-xl bg-amber-500/20 dark:bg-amber-500/15 w-full" />
            </div>

            {/* 3.5. LEADERBOARD PODS SKELETON */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-blue-500/20" />
                  <ShimmerBox className="h-5 w-36 rounded-md" />
                </div>
                <ShimmerBox className="h-6 w-24 rounded-lg" />
              </div>

              {/* Time Period Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 gap-1">
                <div className="h-7 rounded-lg bg-white dark:bg-slate-700 shadow-xs" />
                <div className="h-7 rounded-lg bg-transparent" />
              </div>

              {/* Top 3 & User Row */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map((userItem) => (
                  <div
                    key={userItem}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      userItem === 4
                        ? "bg-blue-50/50 dark:bg-blue-950/30 border-blue-200/60 dark:border-blue-800/40"
                        : "bg-slate-50 dark:bg-slate-950/60 border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShimmerBox className="w-6 h-6 rounded-full shrink-0" />
                      <ShimmerBox className="h-4 w-24 sm:w-32 rounded" />
                    </div>
                    <ShimmerBox className="h-4 w-14 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3.6. DAILY QUESTS SKELETON */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/20" />
                  <ShimmerBox className="h-5 w-36 rounded-md" />
                </div>
                <ShimmerBox className="h-5 w-16 rounded" />
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((quest) => (
                  <div
                    key={quest}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <ShimmerBox className="w-8 h-8 rounded-lg shrink-0" />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <ShimmerBox className="h-3.5 w-32 rounded" />
                        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <ShimmerBox className="h-full w-2/3" />
                        </div>
                      </div>
                    </div>
                    <ShimmerBox className="h-7 w-16 rounded-lg shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. QUICK ACTION BENTO CARDS SKELETON (2x2 Mobile & 4-Column Desktop) */}
        <div className="space-y-3 pt-2">
          {/* Responsive Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-5 w-44 sm:w-56 rounded-md" />
              <ShimmerBox className="h-4.5 w-16 rounded-md bg-purple-500/20 hidden sm:block" />
            </div>
            <ShimmerBox className="h-4 w-28 rounded-md" />
          </div>

          {/* 2x2 Bento Grid on Mobile / 4 Cols on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {[
              { color: "bg-blue-500/15 dark:bg-blue-500/20" },
              { color: "bg-cyan-500/15 dark:bg-cyan-500/20" },
              { color: "bg-rose-500/15 dark:bg-rose-500/20" },
              { color: "bg-amber-500/15 dark:bg-amber-500/20" },
            ].map((shortcut, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3 shadow-xs"
              >
                <div className={`w-9.5 h-9.5 sm:w-11 sm:h-11 rounded-xl ${shortcut.color} shrink-0`} />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <ShimmerBox className="h-4 w-20 sm:w-28 rounded" />
                  <ShimmerBox className="h-3 w-16 rounded hidden sm:block opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
