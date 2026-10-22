"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Check } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";

interface ZiczacNodePopoverProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  onClose: () => void;
  onToggleComplete: (stepId: string) => void;
  side?: "left" | "right";
  placement?: "top" | "bottom"; // Backwards compatibility fallback
}

/**
 * 3D Pill Popover (Viên Thuốc 3D Siêu Tinh Gọn)
 * Thiết kế capsule dạng viên thuốc bo tròn 3D (rounded-full) bên hông nút,
 * lược bỏ hoàn toàn các phần thừa, chỉ giữ lại:
 * 1. Nút tròn 3D tích hoàn thành siêu tốc
 * 2. Tên bài ngắn gọn + Thưởng XP
 * 3. Nút 3D Bắt đầu / Ôn tập / Thi thử
 */
export const ZiczacNodePopover: React.FC<ZiczacNodePopoverProps> = ({
  step,
  state,
  onClose,
  onToggleComplete,
  side = "right",
}) => {
  const isCompleted = state === "COMPLETED";
  const isLeft = side === "left";
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on ESC key or clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 50);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`absolute z-40 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 border-b-[4px] border-b-slate-300 dark:border-b-slate-600 shadow-xl shadow-slate-900/10 dark:shadow-black/50 p-1.5 pl-2.5 sm:pl-3 pr-1.5 flex items-center gap-2 sm:gap-2.5 whitespace-nowrap top-1/2 -translate-y-1/2 select-none animate-in fade-in zoom-in-95 duration-150 ${
        isLeft
          ? "right-[calc(100%+14px)]"
          : "left-[calc(100%+14px)]"
      }`}
    >
      {/* Horizontal Caret Arrow pointing to button */}
      {isLeft ? (
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-r-2 border-t-2 border-slate-200/90 dark:border-slate-700/80 rotate-45 pointer-events-none" />
      ) : (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200/90 dark:border-slate-700/80 rotate-45 pointer-events-none" />
      )}

      {/* 1. Quick Complete Checkmark Toggle (Micro 3D Circle) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete(step.id);
        }}
        title={isCompleted ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
        aria-label={isCompleted ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 cursor-pointer ${
          isCompleted
            ? "bg-emerald-500 text-white border-b-2 border-emerald-700 shadow-2xs"
            : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700 border-b-2 border-slate-300 dark:border-slate-700"
        }`}
      >
        <Check className={`w-3.5 h-3.5 stroke-[3] ${isCompleted ? "stroke-white" : ""}`} />
      </button>

      {/* 2. Title & XP Reward */}
      <div className="flex flex-col min-w-0 pr-1 max-w-[125px] sm:max-w-[155px]">
        <span className="text-xs sm:text-[13px] font-extrabold font-display text-slate-800 dark:text-slate-100 truncate leading-tight">
          {step.title}
        </span>
        <span className="text-[10px] font-extrabold font-mono text-amber-600 dark:text-amber-400 leading-tight">
          +{step.xpReward} XP
        </span>
      </div>

      {/* 3. Tactile 3D Action Pill Button */}
      <Link
        href={step.practicePath}
        className={`h-8 sm:h-8.5 px-3.5 rounded-full text-white font-bold text-xs flex items-center gap-1.5 font-display transition-all active:translate-y-[2px] active:border-b-0 cursor-pointer shrink-0 shadow-sm ${
          step.isCheckpoint
            ? "bg-amber-500 hover:bg-amber-400 border-b-[3px] border-amber-700 shadow-amber-500/20"
            : isCompleted
            ? "bg-emerald-500 hover:bg-emerald-400 border-b-[3px] border-emerald-700 shadow-emerald-500/20"
            : "bg-[#0059bb] hover:bg-blue-600 border-b-[3px] border-[#003875] shadow-[#0059bb]/20"
        }`}
      >
        <Play className="w-3 h-3 fill-current" />
        <span>{step.isCheckpoint ? "THI THỬ" : isCompleted ? "ÔN TẬP" : "BẮT ĐẦU"}</span>
      </Link>
    </div>
  );
};
