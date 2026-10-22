"use client";

import React, { useState } from "react";
import {
  Headphones,
  BookOpen,
  BookMarked,
  Mic,
  BookText,
  PenTool,
  Trophy,
  Star,
  Dumbbell,
} from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";
import { ZiczacNodePopover } from "./ZiczacNodePopover";

interface ZiczacStepNodeProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  isSelected: boolean;
  isPopoverOpen?: boolean;
  onTogglePopover?: (step: ZiczacPathStep) => void;
  onClosePopover?: () => void;
  onSelect?: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
  side?: "left" | "right";
  placement?: "top" | "bottom";
}

export const ZiczacStepNode: React.FC<ZiczacStepNodeProps> = ({
  step,
  state,
  isSelected,
  isPopoverOpen,
  onTogglePopover,
  onClosePopover,
  onSelect,
  onToggleComplete,
  side = "right",
  placement = "top",
}) => {
  const [internalPopover, setInternalPopover] = useState(false);
  const showPopover = isPopoverOpen !== undefined ? isPopoverOpen : internalPopover;
  const isLeft = side === "left";

  // Duolingo skill icons
  const getSkillIcon = () => {
    const iconClass = "w-7 h-7 stroke-[2.4]";
    switch (step.skillType) {
      case "DUMBBELL":
        return <Dumbbell className={iconClass} />;
      case "STORY":
        return <BookOpen className={iconClass} />;
      case "VOCAB":
        return <Star className={iconClass} />;
      case "LISTENING":
        return <Headphones className={iconClass} />;
      case "GRAMMAR":
        return <BookMarked className={iconClass} />;
      case "SPEAKING":
        return <Mic className={iconClass} />;
      case "READING":
        return <BookText className={iconClass} />;
      case "WRITING":
        return <PenTool className={iconClass} />;
      case "CHECKPOINT":
        return <Trophy className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

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
      {/* 1. DUOLINGO FLOATING BUBBLE OVER ACTIVE NODE (If popover is closed) */}
      {isCurrent && !showPopover && (
        <div
          onClick={handleNodeClick}
          className="absolute -top-10 z-20 flex flex-col items-center cursor-pointer animate-bounce whitespace-nowrap"
        >
          <div className="px-3 py-1 rounded-xl bg-[#0059bb] text-white text-[11px] font-bold font-display uppercase tracking-wider shadow-md shadow-[#0059bb]/30 whitespace-nowrap">
            BẮT ĐẦU!
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-[#0059bb]" />
        </div>
      )}

      {/* 2. DUOLINGO POPOVER SPEECH BUBBLE ON CLICK */}
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

      {/* 3. DUOLINGO CIRCULAR 3D STEP BUTTON (Vòng Tròn Nổi Duolingo) */}
      <div className="relative">
        {/* Outer Progress Ring SVG for Current Node */}
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
                className="stroke-[#0059bb] dark:stroke-sky-400"
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
          aria-label={`Chặng ${step.stepNumber}: ${step.title}`}
          className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-hidden ${
            isCompleted
              ? "bg-emerald-500 hover:bg-emerald-400 text-white border-b-[6px] border-emerald-700 shadow-md shadow-emerald-600/20 active:translate-y-[4px] active:border-b-[2px]"
              : isCurrent
              ? "bg-[#0059bb] hover:bg-blue-600 text-white border-b-[6px] border-[#003d82] shadow-lg shadow-[#0059bb]/30 active:translate-y-[4px] active:border-b-[2px] scale-105"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[6px] border-slate-300 dark:border-slate-700 shadow-xs active:translate-y-[3px] active:border-b-[2px]"
          }`}
        >
          {/* Specular 3D Gloss Curve on Top Half */}
          <div className="absolute inset-x-3 top-1.5 h-6 bg-white/20 rounded-t-full pointer-events-none" />

          {/* Icon: Luôn hiển thị biểu tượng kỹ năng tương ứng (không dùng icon ổ khóa); khi LOCKED nút ở dạng xám không màu, khi CURRENT/COMPLETED mới bật màu sắc */}
          <div className="relative z-10 flex items-center justify-center">
            {getSkillIcon()}
          </div>
        </button>

        {/* 4. Tên bài bên hông nút (Bên width ngắn hơn: Phải hoặc Trái, thuần chữ không làm khối) */}
        <div
          onClick={handleNodeClick}
          className={`absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer w-[88px] sm:w-[170px] select-none group/title ${
            isLeft
              ? "right-[calc(100%+8px)] sm:right-[calc(100%+12px)] text-right"
              : "left-[calc(100%+8px)] sm:left-[calc(100%+12px)] text-left"
          }`}
        >
          <p className="text-[11px] sm:text-[13px] font-bold font-display text-slate-800 dark:text-slate-200 group-hover/title:text-[#0059bb] dark:group-hover/title:text-sky-400 leading-tight sm:leading-snug line-clamp-2 transition-colors">
            {step.title}
          </p>
        </div>
      </div>
    </div>
  );
};
