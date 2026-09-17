"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface DashboardMissionDeckProps {
  currentTask: string | null;
  remainingWords: number;
  isLoadingPlan: boolean;
  studyPlanTargetUrl: string;
  wordsPracticedToday?: number;
}

export function DashboardMissionDeck({
  currentTask,
  remainingWords,
  isLoadingPlan,
  studyPlanTargetUrl,
  wordsPracticedToday,
}: DashboardMissionDeckProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004fba] to-[#00388a] text-white border border-blue-400/30 shadow-lg shadow-blue-900/25 space-y-4 relative overflow-hidden">
      {/* Subtle ambient decorative gradient orbs */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge & Progress */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-white font-mono font-black text-xs flex items-center gap-1.5 border border-white/25 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>LỘ TRÌNH HÔM NAY</span>
        </span>
        <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-blue-100 font-mono text-xs font-bold">
          Tiến trình:{" "}
          <span className="text-white font-black text-sm tabular-nums">
            {10 - remainingWords}
          </span>
          /10 từ
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10">
        {isLoadingPlan ? (
          <div className="space-y-1.5 py-0.5">
            <ShimmerBox className="h-5.5 w-4/5 rounded-md bg-white/30 dark:bg-white/20" />
            <ShimmerBox className="h-4 w-1/2 rounded-md bg-white/20 dark:bg-white/10" />
          </div>
        ) : (
          <h2 className="text-base sm:text-lg font-extrabold text-white font-display leading-snug tracking-tight">
            {currentTask ||
              "Ngày 14: Luyện nghe TOEIC Part 6: Text Completion & Liên từ/Trạng từ nâng cao. Hoàn thành 10 câu chép chính tả và ghi chú từ vựng."}
          </h2>
        )}
      </div>

      {/* 3 Frosted Glass Metadata Pods */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 relative z-10">
        <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
          <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-100">
            Mục tiêu
          </div>
          <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-white font-mono mt-0.5">
            {remainingWords} từ mới
          </div>
        </div>
        <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
          <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-blue-100">
            Thời gian
          </div>
          <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-white font-mono mt-0.5">
            ~15 phút
          </div>
        </div>
        <div className="p-2 sm:p-3 rounded-xl bg-white/12 backdrop-blur-md border border-white/25 text-center shadow-xs hover:bg-white/18 transition-all">
          <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider text-amber-200">
            Phần thưởng
          </div>
          <div className="text-[11px] xs:text-xs sm:text-sm font-black font-display text-amber-300 font-mono mt-0.5">
            +50 XP
          </div>
        </div>
      </div>

      {/* Progress Bar & Clean White Button CTA */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-4 pt-3 sm:pt-3.5 border-t border-white/30 relative z-10">
        <div className="flex-1 min-w-0 sm:max-w-xs space-y-1">
          <div className="h-2 sm:h-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 transition-all duration-500 shadow-sm"
              style={{
                width: `${Math.min(100, ((10 - remainingWords) / 10) * 100)}%`,
              }}
            />
          </div>
        </div>

        <Link href={studyPlanTargetUrl} className="shrink-0">
          <button
            type="button"
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0059bb] font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 transition-all group whitespace-nowrap"
          >
            <span>BẮT ĐẦU NGAY</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0059bb] group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
          </button>
        </Link>
      </div>
    </div>
  );
}
