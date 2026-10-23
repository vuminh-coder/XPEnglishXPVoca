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
 * Ultra-Tactile 3D Duolingo Speech Bubble Popover
 * Thiết kế 3D chuẩn xác đến từng pixel: viền đáy 3D dày (extrusion shelf),
 * specular gloss phản chiếu ánh sáng, caret 3D ăn khớp góc vát,
 * cùng nút bấm 3D thu nhỏ trực quan và tinh gọn tuyệt đối.
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
      className={`absolute left-1/2 -translate-x-1/2 z-50 w-72 sm:w-[320px] p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 border-b-[5px] border-b-slate-300 dark:border-b-slate-800 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.18),0_4px_12px_-2px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.6)] pointer-events-none select-none transition-all duration-200 ease-out animate-in fade-in zoom-in-95 ${
        isBottom ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
      }`}
    >
      {/* 3D Specular Top Rim Highlight (Ánh sáng phản chiếu mép trên) */}
      <div className="absolute inset-x-4 top-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20 pointer-events-none" />

      {/* 3D Caret Pointer Pointing To Node (Khớp hoàn hảo với viền 3D của card) */}
      {isBottom ? (
        <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200/90 dark:border-slate-700/80 rotate-45 pointer-events-none" />
      ) : (
        <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-b-[3px] border-slate-300 dark:border-slate-800 rotate-45 pointer-events-none" />
      )}

      {/* Title */}
      <h4 className="text-[13.5px] sm:text-[14px] font-extrabold font-display text-slate-900 dark:text-white leading-snug tracking-tight">
        {step.title}
      </h4>

      {/* Description / Scope (2 concise lines, strictly no text cutting) */}
      <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mt-1 font-sans">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* Action Footer Hint with 3D Tactile Mini-Button */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        {/* Status Badge */}
        {isCompleted ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 font-display">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 stroke-[2.4]" />
            <span>Đã hoàn thành</span>
          </div>
        ) : isCurrent ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/80 text-[10.5px] font-bold text-[#0059bb] dark:text-sky-400 font-display">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0059bb] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0059bb]" />
            </span>
            <span>Đang học</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Chưa hoàn thành</span>
          </div>
        )}

        {/* 3D Tactile Action CTA Mini-Button (Mô phỏng nút bấm 3D Duolingo) */}
        <div
          className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-display text-[11px] transition-transform ${
            isCompleted
              ? "bg-emerald-600 text-white border-b-[3px] border-emerald-800 shadow-sm shadow-emerald-700/20"
              : isCurrent
              ? "bg-[#0059bb] text-white border-b-[3px] border-[#003d82] shadow-sm shadow-[#0059bb]/30"
              : "bg-slate-700 text-white border-b-[3px] border-slate-900 shadow-xs"
          }`}
        >
          {/* Top Specular Gloss on Mini-Button */}
          <div className="absolute inset-x-2 top-0.5 h-1.5 bg-white/20 rounded-t-full pointer-events-none" />
          <span className="relative z-10">
            {isCompleted ? "Ôn tập ngay" : "Vào học ngay"}
          </span>
          <ArrowRight className="relative z-10 w-3 h-3 stroke-[2.8]" />
        </div>
      </div>
    </div>
  );
};
