"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState, ZiczacStepProgress } from "../../types";

export interface ZiczacNodePopoverProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  onClose?: () => void;
  onToggleComplete?: (stepId: string) => void;
  onAdvanceSession?: (stepId: string) => void;
  stepProgress?: ZiczacStepProgress;
  placement?: "top" | "bottom";
}

/**
 * Lightweight Duolingo-style Hover Information Card
 * Hiển thị súc tích khi hover: thông tin bài học và mô tả những gì sẽ làm.
 * Khi click, người học vào thẳng bài học 1-click mà không bị cản trở bởi modal rườm rà.
 */
export const ZiczacNodePopover: React.FC<ZiczacNodePopoverProps> = ({
  step,
  state,
  placement = "top",
}) => {
  const isCompleted = state === "COMPLETED";
  const isCurrent = state === "CURRENT";
  const isBottom = placement === "bottom";

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-50 w-72 sm:w-80 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/15 pointer-events-none select-none transition-all duration-150 animate-in fade-in zoom-in-95 ${
        isBottom ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
      }`}
    >
      {/* Caret Triangle Pointing To Node */}
      {isBottom ? (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200 dark:border-slate-700 rotate-45" />
      ) : (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 rotate-45" />
      )}

      {/* Title */}
      <h4 className="text-xs sm:text-[13px] font-bold font-display text-slate-900 dark:text-white leading-snug">
        {step.title}
      </h4>

      {/* Description / Scope (2 concise lines, strictly no text cutting) */}
      <p className="text-[11.5px] text-slate-600 dark:text-slate-300 pt-1 leading-relaxed line-clamp-2 overflow-hidden">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* Action Footer Hint */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold font-display">
        <span
          className={
            isCompleted
              ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
              : isCurrent
              ? "text-[#0059bb] dark:text-sky-400 flex items-center gap-1"
              : "text-slate-500 dark:text-slate-400 flex items-center gap-1"
          }
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Đã hoàn thành</span>
            </>
          ) : isCurrent ? (
            <span>Đang học</span>
          ) : (
            <span>Chưa hoàn thành</span>
          )}
        </span>

        <span className="text-[#0059bb] dark:text-sky-400 text-[10.5px] font-bold flex items-center gap-1">
          {isCompleted ? "Bấm để ôn tập lại" : "Bấm để vào học"}
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
