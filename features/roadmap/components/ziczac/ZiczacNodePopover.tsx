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
 * Khối 3D siêu tinh xảo theo chuẩn Duolingo & Apple iOS:
 * - Viền đáy 3D dày 5px nguyên khối
 * - Caret 3D liên kết liền mạch (seamless unibody, xóa bỏ hoàn toàn đường viền cắt ngang)
 * - Nút bấm 3D thu nhỏ với dải bóng specular gradient cong mượt
 * - Huy hiệu trạng thái thanh lịch, đồng bộ tỷ lệ thị giác
 * - Tự động cân bằng dòng tiêu đề [text-wrap:balance] loại bỏ chữ rớt dòng mồ côi
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
      className={`absolute left-1/2 -translate-x-1/2 z-50 w-80 sm:w-[350px] p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 border-b-[5px] border-b-slate-300 dark:border-b-slate-800 shadow-[0_16px_32px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_40px_-6px_rgba(0,0,0,0.65)] pointer-events-none select-none transition-all duration-200 ease-out animate-in fade-in zoom-in-95 ${
        isBottom ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
      }`}
    >
      {/* 1. 3D Specular Top Rim Highlight (Ánh sáng phản chiếu mép trên) */}
      <div className="absolute inset-x-4 top-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20 pointer-events-none" />

      {/* 2. 3D Caret Pointer (Seamless Unibody Architecture) */}
      {isBottom ? (
        <>
          <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200/90 dark:border-slate-700/80 rotate-45 pointer-events-none z-10" />
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-5 h-[5px] bg-white dark:bg-slate-900 pointer-events-none z-20" />
        </>
      ) : (
        <>
          <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-white dark:bg-slate-900 border-r-2 border-b-[3.5px] border-slate-300 dark:border-slate-800 rotate-45 pointer-events-none z-10" />
          <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-5 h-[6px] bg-white dark:bg-slate-900 pointer-events-none z-20" />
        </>
      )}

      {/* 3. Title with [text-wrap:balance] to prevent orphan words */}
      <h4 className="text-[13.5px] sm:text-[14.5px] font-extrabold font-display text-slate-900 dark:text-white leading-snug tracking-tight [text-wrap:balance]">
        {step.title}
      </h4>

      {/* 4. Description with generous breathing rhythm */}
      <p className="text-[11.5px] sm:text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mt-1.5 mb-3.5 font-sans">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* 5. Action Footer Hint with 3D Tactile Mini-Button */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between gap-2">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-[11px] font-bold font-display shadow-2xs">
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 stroke-[2.4]" />
              <span className="text-emerald-700 dark:text-emerald-400">Đã hoàn thành</span>
            </>
          ) : isCurrent ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0059bb] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0059bb]" />
              </span>
              <span className="text-[#0059bb] dark:text-sky-400">Đang học</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="text-slate-500 dark:text-slate-400">Chưa hoàn thành</span>
            </>
          )}
        </div>

        {/* 3D Tactile Action CTA Mini-Button with Specular Gradient Gloss */}
        <div
          className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold font-display text-[11.5px] shadow-xs transition-transform ${
            isCompleted
              ? "bg-emerald-600 text-white border-b-[3.5px] border-emerald-800 shadow-sm shadow-emerald-700/25"
              : isCurrent
              ? "bg-[#0059bb] text-white border-b-[3.5px] border-[#003d82] shadow-sm shadow-[#0059bb]/30"
              : "bg-slate-700 text-white border-b-[3.5px] border-slate-900 shadow-xs"
          }`}
        >
          {/* Specular Curved Gradient Gloss on Mini-Button */}
          <div className="absolute inset-x-1.5 top-0.5 h-2 rounded-t-[9px] bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />

          <span className="relative z-10 tracking-wide">
            {isCompleted ? "Ôn tập ngay" : "Vào học ngay"}
          </span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.8]" />
        </div>
      </div>
    </div>
  );
};
