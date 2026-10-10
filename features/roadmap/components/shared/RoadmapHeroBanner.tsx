"use client";

import React from "react";
import { Compass, Target, ArrowRight, RefreshCw, Wand2 } from "lucide-react";

interface RoadmapHeroBannerProps {
  mode: "pathway" | "goal-setting";
  userName?: string;
  currentActiveExam?: string;
  currentActiveScore?: string;
  overallProgress?: number;
  onOpenForm?: () => void;
  onOpenChatbot?: () => void;
}

/**
 * RoadmapHeroBanner
 * Compact Action Strip tối giản hóa chiều cao (height ~50px),
 * triệt tiêu nội dung trùng lặp và boilerplate text không cần thiết.
 */
export const RoadmapHeroBanner: React.FC<RoadmapHeroBannerProps> = ({
  mode,
  userName = "Học Viên",
  currentActiveExam = "TOEIC",
  currentActiveScore = "750",
  overallProgress = 0,
  onOpenForm,
  onOpenChatbot,
}) => {
  if (mode === "goal-setting") {
    return (
      <div className="py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Branding & Goal Setting Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-xs shadow-[#0059bb]/20">
            <Target className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-slate-900 dark:text-white leading-none truncate">
              Thiết Kế Lộ Trình Học AI
            </h1>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/40 shrink-0">
              {userName}
            </span>
          </div>
        </div>

        {/* Right: AI Tutor Action */}
        {onOpenChatbot && (
          <button
            type="button"
            onClick={onOpenChatbot}
            className="h-8 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200/90 dark:border-slate-700/80 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-display active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span>Tư Vấn AI Lộ Trình</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>
    );
  }

  // mode === "pathway" (Single-line Compact Strip)
  return (
    <div className="py-2.5 px-3.5 sm:py-3 sm:px-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Left: Branding & Goal Header on a Single Line */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-xs shadow-[#0059bb]/20">
          <Compass className="w-4 h-4 stroke-[2.2]" />
        </div>

        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-slate-900 dark:text-white leading-none truncate">
            Lộ Trình Luyện Thi {currentActiveExam} {currentActiveScore}
          </h1>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 font-mono shrink-0">
            Học viên {userName}
          </span>
        </div>
      </div>

      {/* Right: Inline Progress & Change Goal Action */}
      <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
        {/* Compact Inline Progress Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="w-16 sm:w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, overallProgress))}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {overallProgress}%
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
            hoàn thành
          </span>
        </div>

        {/* Change Goal Secondary Action */}
        {onOpenForm && (
          <button
            type="button"
            onClick={onOpenForm}
            className="h-8 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200/90 dark:border-slate-700/80 transition-all flex items-center gap-1.5 font-display shrink-0 cursor-pointer shadow-2xs active:scale-95"
            title="Thay đổi mục tiêu học tập"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span>Đổi Mục Tiêu</span>
          </button>
        )}
      </div>
    </div>
  );
};
