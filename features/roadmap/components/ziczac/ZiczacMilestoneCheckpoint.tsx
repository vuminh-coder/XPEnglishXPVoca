"use client";

import React, { useState } from "react";
import { Trophy, Crown } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";
import { ZiczacNodePopover } from "./ZiczacNodePopover";

interface ZiczacMilestoneCheckpointProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  isSelected: boolean;
  isPopoverOpen?: boolean;
  onTogglePopover?: (step: ZiczacPathStep) => void;
  onClosePopover?: () => void;
  onSelect?: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
  placement?: "top" | "bottom";
}

export const ZiczacMilestoneCheckpoint: React.FC<ZiczacMilestoneCheckpointProps> = ({
  step,
  state,
  isSelected,
  isPopoverOpen,
  onTogglePopover,
  onClosePopover,
  onSelect,
  onToggleComplete,
  placement = "top",
}) => {
  const [internalPopover, setInternalPopover] = useState(false);
  const showPopover = isPopoverOpen !== undefined ? isPopoverOpen : internalPopover;

  const isCompleted = state === "COMPLETED";
  const isCurrent = state === "CURRENT";
  const isLocked = state === "LOCKED";

  const handleNodeClick = () => {
    if (onSelect) onSelect(step);
    if (onTogglePopover) {
      onTogglePopover(step);
    } else {
      setInternalPopover((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (onClosePopover) {
      onClosePopover();
    } else {
      setInternalPopover(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center group select-none">
      {/* 1. DUOLINGO FLOATING BUBBLE OVER ACTIVE CHECKPOINT */}
      {isCurrent && !showPopover && (
        <div
          onClick={handleNodeClick}
          className="absolute -top-10 z-20 flex flex-col items-center cursor-pointer animate-bounce whitespace-nowrap"
        >
          <div className="px-3.5 py-1 rounded-xl bg-amber-500 text-white text-[11px] font-bold font-display uppercase tracking-wider shadow-md shadow-amber-500/30 whitespace-nowrap">
            THI THỬ TỔNG HỢP!
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-amber-500" />
        </div>
      )}

      {/* 2. POPOVER ON CLICK */}
      {showPopover && (
        <ZiczacNodePopover
          step={step}
          state={state}
          placement={placement}
          onClose={handleClose}
          onToggleComplete={(id) => {
            if (onToggleComplete) onToggleComplete(id);
          }}
        />
      )}

      {/* 3. DUOLINGO CIRCULAR 3D MILESTONE CHEST/TROPHY BUTTON (Chuẩn hóa cùng kích thước w-18 sm:w-20) */}
      <div className="relative">
        {/* Outer Progress Ring SVG for Current Checkpoint */}
        {isCurrent && (
          <div className="absolute -inset-2 rounded-full pointer-events-none">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                className="stroke-amber-500 dark:stroke-amber-400"
                strokeWidth="6"
                strokeDasharray="289"
                strokeDashoffset="120"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}

        <button
          type="button"
          onClick={handleNodeClick}
          aria-label={step.title}
          className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-hidden ${
            isCompleted
              ? "bg-emerald-500 hover:bg-emerald-400 text-white border-b-[6px] border-emerald-700 shadow-md shadow-emerald-600/20 active:translate-y-[4px] active:border-b-[2px]"
              : isCurrent
              ? "bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-white border-b-[6px] border-amber-700 shadow-lg shadow-amber-500/30 active:translate-y-[4px] active:border-b-[2px] scale-105"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[6px] border-slate-300 dark:border-slate-700 shadow-xs active:translate-y-[3px] active:border-b-[2px]"
          }`}
        >
          {/* Specular Gloss Curve */}
          <div className="absolute inset-x-3 top-1.5 h-6 bg-white/20 rounded-t-full pointer-events-none" />

          {/* Icon: Luôn hiển thị Trophy/Crown (không dùng icon ổ khóa); kích thước w-7 h-7 đồng bộ nút thường */}
          <div className="relative z-10 flex items-center justify-center">
            {step.stepNumber === 28 ? (
              <Crown
                className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4] ${
                  isLocked
                    ? "text-slate-400 dark:text-slate-500 fill-transparent"
                    : isCompleted
                    ? "fill-emerald-100 text-white"
                    : "fill-amber-100 text-white"
                }`}
              />
            ) : (
              <Trophy
                className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4] ${
                  isLocked
                    ? "text-slate-400 dark:text-slate-500 fill-transparent"
                    : isCompleted
                    ? "fill-emerald-100 text-white"
                    : "fill-amber-100 text-white"
                }`}
              />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
