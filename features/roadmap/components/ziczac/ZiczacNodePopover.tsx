"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Play, X, ExternalLink } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";

interface ZiczacNodePopoverProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  onClose: () => void;
  onToggleComplete: (stepId: string) => void;
  placement?: "top" | "bottom";
}

/**
 * Duolingo-style Popover Speech Bubble
 * Nổi trên hoặc dưới node được chọn với mũi tên tam giác trỏ tới node
 */
export const ZiczacNodePopover: React.FC<ZiczacNodePopoverProps> = ({
  step,
  state,
  onClose,
  onToggleComplete,
  placement = "top",
}) => {
  const isCompleted = state === "COMPLETED";
  const isBottom = placement === "bottom";

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-40 w-72 sm:w-80 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/15 animate-in fade-in zoom-in-95 duration-150 ${
        isBottom ? "top-[calc(100%+16px)]" : "bottom-[calc(100%+16px)]"
      }`}
    >
      {/* Caret Triangle Pointing To Node */}
      {isBottom ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200 dark:border-slate-700 rotate-45" />
      ) : (
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 rotate-45" />
      )}

      {/* Header with Title and Close Button */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
            {step.isCheckpoint ? "Cột Mốc Tổng Hợp" : `Chặng ${step.stepNumber}`}
          </span>
          <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-tight mt-0.5">
            {step.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description / Scope */}
      <p className="text-xs text-slate-600 dark:text-slate-300 py-2.5 leading-relaxed line-clamp-2">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* Rewards Info */}
      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 pb-3">
        <span>+{step.xpReward} XP Thưởng</span>
        <span className="text-slate-400 font-medium font-sans">
          Thời lượng: {step.durationMinutes} phút
        </span>
      </div>

      {/* Duolingo 3D CTA Button */}
      <div className="space-y-2">
        <Link
          href={step.practicePath}
          className={`w-full h-11 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all font-display active:translate-y-1 cursor-pointer ${
            step.isCheckpoint
              ? "bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-700 shadow-md shadow-amber-500/20 active:border-b-0"
              : isCompleted
              ? "bg-emerald-500 hover:bg-emerald-600 border-b-4 border-emerald-700 shadow-md shadow-emerald-500/20 active:border-b-0"
              : "bg-[#0059bb] hover:bg-[#004899] border-b-4 border-[#003d82] shadow-md shadow-[#0059bb]/20 active:border-b-0"
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isCompleted ? "ÔN TẬP LẠI" : "BẮT ĐẦU NGAY"}</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </Link>

        {/* Quick Complete Toggle */}
        <button
          type="button"
          onClick={() => onToggleComplete(step.id)}
          className="w-full py-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-center transition-colors cursor-pointer"
        >
          {isCompleted ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
        </button>
      </div>
    </div>
  );
};
