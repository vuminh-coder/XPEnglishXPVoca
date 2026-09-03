"use client";

import React from "react";
import {
  ShimmerBox,
  ShimmerCircle,
  ShimmerText,
} from "@/shared/components/feedback/ShimmerSkeleton";

export default function DashboardLoading() {
  const svgW = 700;
  const svgH = 210;
  const padLeft = 52;
  const padRight = 10;
  const padTop = 18;
  const yCoords = [padTop, 63, 108, 154, 200];
  const yLabels = ["60m", "45m", "30m", "15m", "0m"];

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 sm:pb-12">
      {/* 0. TOP ACTION & NAVIGATION HEADER BAR SKELETON (h-14 Baseline Sticky) */}
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
          <ShimmerCircle className="w-8 h-8 shrink-0" />
        </div>
      </div>

      {/* MAIN CONTENT FLUID CANVAS SKELETON */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* 1. ANNOUNCEMENT BANNER SKELETON */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs h-14">
          <div className="flex items-center gap-3">
            <ShimmerBox className="w-9 h-9 rounded-lg shrink-0" />
            <div className="space-y-1.5">
              <ShimmerBox className="h-4 w-44 sm:w-72 rounded-md" />
              <ShimmerBox className="h-3 w-28 sm:w-96 rounded-md hidden sm:block opacity-60" />
            </div>
          </div>
          <ShimmerBox className="h-8 w-20 rounded-lg shrink-0" />
        </div>

        {/* 2. HERO GREETING & 4 DOUBLE-BEZEL METRIC CARDS */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
          {/* Upper Greeting & User Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <ShimmerCircle className="w-12 h-12 sm:w-13 sm:h-13 shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="h-5.5 w-44 sm:w-60 rounded-md" />
                  <ShimmerBox className="h-4.5 w-16 rounded-md bg-blue-600/20" />
                </div>
                <ShimmerBox className="h-3.5 w-36 sm:w-56 rounded-md opacity-60" />
              </div>
            </div>

            {/* Quick Shortlink Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <ShimmerBox className="h-9 w-28 rounded-xl" />
              <ShimmerBox className="h-9 w-24 rounded-xl" />
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          {/* 4 Double-Bezel Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              "bg-amber-500/15 dark:bg-amber-500/20",
              "bg-blue-500/15 dark:bg-blue-500/20",
              "bg-emerald-500/15 dark:bg-emerald-500/20",
              "bg-purple-500/15 dark:bg-purple-500/20",
            ].map((iconBg, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-2xs"
              >
                <div className={`w-10 h-10 rounded-xl ${iconBg} shrink-0 flex items-center justify-center`} />
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
              <div className="space-y-1.5 py-0.5">
                <ShimmerBox className="h-5.5 w-4/5 rounded-md bg-white/30 dark:bg-white/20" />
                <ShimmerBox className="h-4 w-1/2 rounded-md bg-white/20 dark:bg-white/10" />
              </div>

              {/* 3 Mission Pods */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1">
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

            {/* 3.2. PER-SKILL ANALYTICS DOCK SKELETON (Biểu Đồ Sóng 5 Kỹ Năng 700x210) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
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

              {/* Clean High-DPI Coordinate Canvas with Shimmer Sweep (No Fake Demo Lines) */}
              <div className="relative pt-1.5 pb-0 bg-slate-50/70 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden shadow-2xs before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent before:z-10 before:pointer-events-none">
                <div className="w-full relative">
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible select-none">
                    {yCoords.map((y, sIdx) => {
                      const isBaseline = sIdx === 4;
                      return (
                        <g key={sIdx}>
                          <line
                            x1={padLeft}
                            y1={y}
                            x2={svgW - padRight}
                            y2={y}
                            stroke="currentColor"
                            className={
                              isBaseline
                                ? "text-slate-200/90 dark:text-slate-800"
                                : "text-slate-200/60 dark:text-slate-800"
                            }
                            strokeDasharray={isBaseline ? undefined : "3 3"}
                          />
                          <text
                            x="42"
                            y={y}
                            textAnchor="end"
                            dominantBaseline="central"
                            className="fill-slate-400/70 dark:fill-slate-500/70 font-mono text-[22px] sm:text-[17px] font-extrabold"
                          >
                            {yLabels[sIdx]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* 7 Interactive Day Columns */}
                <div
                  style={{ paddingLeft: "7.43%", paddingRight: "1.43%" }}
                  className="grid grid-cols-7 text-center pt-0 pb-1.5 gap-0 border-t border-slate-100 dark:border-slate-800"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="py-1.5 px-0.5">
                      <ShimmerBox className="h-3 w-8 mx-auto rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Action Card Embedded */}
              <div className="p-3 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 shrink-0" />
                  <div className="space-y-1">
                    <ShimmerBox className="h-4 w-44 rounded bg-emerald-600/30 dark:bg-emerald-400/20" />
                    <ShimmerBox className="h-3 w-32 rounded bg-emerald-600/20 dark:bg-emerald-400/10 hidden sm:block" />
                  </div>
                </div>
                <ShimmerBox className="h-8 w-24 rounded-lg bg-emerald-600/20 dark:bg-emerald-500/20 shrink-0" />
              </div>
            </div>

            {/* 3.3. AI TUTOR QUICK INTERACTIVE WORKSPACE SKELETON */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-blue-500/20" />
                <ShimmerBox className="h-5 w-44 rounded-md" />
              </div>
              <div className="flex gap-2">
                <ShimmerBox className="h-10 flex-1 rounded-xl border border-slate-200/60 dark:border-slate-700/50" />
                <ShimmerBox className="h-10 w-24 rounded-xl bg-blue-600/30 dark:bg-blue-500/30 shrink-0" />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (5/12) ─── */}
          <div className="space-y-5 sm:space-y-6 lg:col-span-5">
            {/* 3.4. STREAK ATTENDANCE SKELETON (Duolingo Style) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3 relative overflow-hidden">
              {/* Speech Bubble Skeleton */}
              <div className="relative mx-auto max-w-[290px] sm:max-w-[320px] text-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1">
                <ShimmerBox className="h-3.5 w-36 mx-auto rounded" />
                <ShimmerBox className="h-3 w-48 mx-auto rounded opacity-60" />
              </div>

              {/* Flame & Counter Skeleton */}
              <div className="flex flex-col items-center justify-center pt-1 text-center">
                <ShimmerBox className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto" />
                <ShimmerBox className="h-10 w-16 rounded-lg mt-2 mx-auto" />
                <ShimmerBox className="h-3 w-20 rounded mt-1 mx-auto opacity-60" />
              </div>

              {/* 7 Circle Stepper Nodes matching Real Stepper */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pt-1">
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-400/70 dark:text-slate-500/70">
                      {label}
                    </span>
                    <ShimmerCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                ))}
              </div>

              {/* Reward Banner */}
              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-3 shadow-2xs">
                <ShimmerBox className="h-4 w-40 rounded" />
                <ShimmerBox className="h-5 w-16 rounded-md" />
              </div>

              {/* Checkin Action Button Skeleton */}
              <ShimmerBox className="h-10 sm:h-11 rounded-xl bg-[#0059bb]/25 dark:bg-[#0059bb]/30 w-full" />
            </div>

            {/* 3.5. LEADERBOARD PODS SKELETON */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-4 h-4 rounded" />
                  <ShimmerBox className="h-4 w-28 rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <ShimmerBox className="h-6 w-16 rounded-md" />
                  <ShimmerBox className="h-4 w-16 rounded" />
                </div>
              </div>

              {/* Criterion Switcher Pill */}
              <div className="p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/50 dark:border-slate-700/50 grid grid-cols-2 gap-1">
                <ShimmerBox className="h-7 rounded-lg" />
                <ShimmerBox className="h-7 rounded-lg" />
              </div>

              {/* Top 3 & User Row Shimmer */}
              <div className="space-y-2 pt-1">
                {/* User Row Highlight Shimmer */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ShimmerBox className="w-4 h-4 rounded" />
                    <ShimmerCircle className="w-6 h-6 shrink-0" />
                    <ShimmerBox className="h-3.5 w-24 rounded" />
                  </div>
                  <ShimmerBox className="h-4 w-12 rounded" />
                </div>

                {/* Top 3 Podium Rows Shimmer */}
                {[
                  "bg-amber-400/20 border-amber-400/30",
                  "bg-slate-200/60 dark:bg-slate-700/50 border-slate-300/40",
                  "bg-amber-600/15 border-amber-600/30",
                ].map((badgeStyle, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-md border ${badgeStyle}`}>
                        <span className="font-mono text-[11px] font-black text-slate-400/60">{idx + 1}</span>
                      </span>
                      <ShimmerCircle className="w-6 h-6 shrink-0" />
                      <ShimmerBox className="h-3.5 w-28 rounded" />
                    </div>
                    <ShimmerBox className="h-4 w-12 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3.6. DAILY QUESTS SKELETON (Exactly 5 Challenges 1:1) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-4 h-4 rounded" />
                  <ShimmerBox className="h-4 w-32 rounded" />
                </div>
                <ShimmerBox className="h-5 w-20 rounded-md" />
              </div>

              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((quest) => (
                  <div
                    key={quest}
                    className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
                      <div className="min-w-0">
                        <ShimmerBox className="h-3.5 w-32 sm:w-44 rounded" />
                      </div>
                    </div>
                    <ShimmerBox className="h-4 w-12 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. DEDICATED FULL-WIDTH QUICK ACTION BENTO TILES (4 CARDS) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShimmerBox className="h-5 w-16 rounded-md" />
              <ShimmerBox className="h-5 w-48 rounded-md" />
            </div>
            <ShimmerBox className="h-4 w-20 rounded" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((tile) => (
              <div
                key={tile}
                className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <ShimmerBox className="w-10 h-10 rounded-xl" />
                  <ShimmerBox className="h-4 w-16 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  <ShimmerBox className="h-4 w-28 rounded" />
                  <ShimmerBox className="h-3 w-36 rounded opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
