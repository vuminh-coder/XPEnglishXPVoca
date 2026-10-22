"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Crown, Lock } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";

interface ZiczacMilestoneCheckpointProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  isSelected?: boolean;
  isPopoverOpen?: boolean;
  onTogglePopover?: (step: ZiczacPathStep) => void;
  onClosePopover?: () => void;
  onSelect?: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
  side?: "left" | "right";
  placement?: "top" | "bottom";
}

export const ZiczacMilestoneCheckpoint: React.FC<ZiczacMilestoneCheckpointProps> = ({
  step,
  state,
  isSelected,
  onSelect,
}) => {
  const isCompleted = state === "COMPLETED";
  const isCurrent = state === "CURRENT";
  const isLocked = state === "LOCKED";

  const handleClick = () => {
    if (onSelect) onSelect(step);
  };

  return (
    <div className="relative flex flex-col items-center group select-none my-4">
      {/* 1. DUOLINGO FLOATING BUBBLE OVER ACTIVE CHECKPOINT (Bấm vào bài luôn) */}
      {isCurrent && (
        <Link
          href={step.practicePath}
          onClick={handleClick}
          className="absolute -top-10 z-20 flex flex-col items-center cursor-pointer animate-bounce group-hover:scale-105 transition-transform"
        >
          <div className="px-3.5 py-1 rounded-xl bg-amber-500 text-white text-[11px] font-bold font-display uppercase tracking-wider shadow-md shadow-amber-500/30">
            THI THỬ TỔNG HỢP!
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-amber-500" />
        </Link>
      )}

      {/* 2. DUOLINGO CIRCULAR 3D MILESTONE CHEST/TROPHY BUTTON (Bấm một cái vào bài luôn) */}
      <div className="relative">
        <Link
          href={step.practicePath}
          onClick={handleClick}
          aria-label={step.title}
          className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-hidden ${
            isCompleted
              ? "bg-gradient-to-b from-emerald-400 to-emerald-500 text-white border-b-[8px] border-emerald-700 shadow-lg shadow-emerald-500/20 active:translate-y-[5px] active:border-b-[2px]"
              : isCurrent
              ? "bg-gradient-to-b from-amber-400 to-amber-500 text-white border-b-[8px] border-amber-700 shadow-xl shadow-amber-500/30 active:translate-y-[5px] active:border-b-[2px] scale-105"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[8px] border-slate-300 dark:border-slate-700 shadow-xs active:translate-y-[4px] active:border-b-[2px]"
          }`}
        >
          {/* Specular Gloss Curve */}
          <div className="absolute inset-x-4 top-2 h-7 bg-white/25 rounded-t-full pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isLocked ? (
              <Lock className="w-8 h-8 stroke-[2.2]" />
            ) : step.stepNumber === 20 ? (
              <Crown className="w-11 h-11 fill-amber-100 stroke-[2.2]" />
            ) : (
              <Trophy className="w-11 h-11 fill-amber-100 stroke-[2.2]" />
            )}
          </div>
        </Link>
      </div>

      {/* 3. Subtitle Label Beneath Checkpoint (Bấm vào bài luôn) */}
      <Link
        href={step.practicePath}
        onClick={handleClick}
        className="mt-2 px-2 text-center max-w-[160px] sm:max-w-[200px] cursor-pointer group/title"
      >
        <p className="text-xs font-bold font-display text-slate-800 dark:text-slate-200 group-hover/title:text-amber-600 dark:group-hover/title:text-amber-400 line-clamp-1 leading-tight transition-colors">
          {step.title}
        </p>
      </Link>
    </div>
  );
};
