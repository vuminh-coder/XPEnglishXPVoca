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
      className={`absolute left-1/2 -translate-x-1/2 z-50 w-[300px] sm:w-[332px] p-3.5 sm:p-4 rounded-[24px] sm:rounded-[26px] bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 border-b-[5px] border-b-slate-300 dark:border-b-slate-800 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.18),0_6px_16px_-4px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.65)] pointer-events-none select-none transition-all duration-200 ease-out animate-in fade-in zoom-in-95 ${
        isBottom ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
      }`}
    >
      {/* 3D Specular Top Rim Highlight (Ánh sáng vòm cong mép trên chuẩn Pixar/Apple) */}
      <div className="absolute inset-x-8 top-0.5 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/25 rounded-full pointer-events-none" />

      {/* 3D Curved Teardrop Caret Pointer (Mũi tên giọt nước bo cong mềm mại ăn khớp thân Squircle) */}
      {isBottom ? (
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200/90 dark:border-slate-700/80 rotate-45 rounded-tl-[6px] pointer-events-none" />
      ) : (
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] bg-white dark:bg-slate-900 border-r-2 border-b-[3.5px] border-slate-300 dark:border-slate-800 rotate-45 rounded-br-[6px] pointer-events-none" />
      )}

      {/* Title */}
      <h4 className="text-[13.5px] sm:text-[14.5px] font-extrabold font-display text-slate-900 dark:text-white leading-snug tracking-tight">
        {step.title}
      </h4>

      {/* Description / Scope (2 concise lines, strictly no text cutting) */}
      <p className="text-[11.5px] sm:text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mt-1 font-sans">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* Action Footer Hint with 2 Balanced 3D Tactile Mini-Blocks (Khoảng cách trên dưới gạch ngang tinh chỉnh gọn gàng) */}
      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        {/* Left Block: 3D Tactile Status Badge (Đồng bộ kiểu dáng 3D giống nút bên cạnh nhưng khác màu sắc) */}
        {isCompleted ? (
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-display text-[11px] bg-emerald-500 text-white border-b-[3px] border-emerald-700 shadow-xs shadow-emerald-600/20 whitespace-nowrap shrink-0">
            {/* Top Specular Gloss */}
            <div className="absolute inset-x-2 top-0.5 h-1.5 bg-white/20 rounded-t-full pointer-events-none" />
            <CheckCircle2 className="relative z-10 w-3.5 h-3.5 stroke-[2.8]" />
            <span className="relative z-10">Đã hoàn thành</span>
          </div>
        ) : isCurrent ? (
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-display text-[11px] bg-amber-500 text-white border-b-[3px] border-amber-700 shadow-xs shadow-amber-600/20 whitespace-nowrap shrink-0">
            {/* Top Specular Gloss */}
            <div className="absolute inset-x-2 top-0.5 h-1.5 bg-white/20 rounded-t-full pointer-events-none" />
            <span className="relative z-10 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="relative z-10">Đang học</span>
          </div>
        ) : (
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold font-display text-[11px] bg-slate-500 dark:bg-slate-600 text-white border-b-[3px] border-slate-700 dark:border-slate-800 shadow-xs whitespace-nowrap shrink-0">
            {/* Top Specular Gloss */}
            <div className="absolute inset-x-2 top-0.5 h-1.5 bg-white/20 rounded-t-full pointer-events-none" />
            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="relative z-10">Chưa hoàn thành</span>
          </div>
        )}

        {/* Right Block: 3D Tactile Action CTA Mini-Button (Xanh hoàng gia thương hiệu #0059bb) */}
        <div className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold font-display text-[11px] bg-[#0059bb] text-white border-b-[3px] border-[#003d82] shadow-sm shadow-[#0059bb]/30 whitespace-nowrap shrink-0">
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
