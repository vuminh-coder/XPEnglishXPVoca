"use client";

import React, { useState } from "react";
import {
  Check,
  Lock,
  Headphones,
  BookOpen,
  BookMarked,
  Mic,
  BookText,
  PenTool,
  Trophy,
  Star,
} from "lucide-react";
import { ZiczacPathStep, ZiczacStepState } from "../../types";
import { ZiczacNodePopover } from "./ZiczacNodePopover";

interface ZiczacStepNodeProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  isSelected: boolean;
  onSelect: (step: ZiczacPathStep) => void;
  onToggleComplete?: (stepId: string) => void;
}

export const ZiczacStepNode: React.FC<ZiczacStepNodeProps> = ({
  step,
  state,
  isSelected,
  onSelect,
  onToggleComplete,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  // Duolingo skill icons
  const getSkillIcon = () => {
    const iconClass = "w-7 h-7 stroke-[2.4]";
    switch (step.skillType) {
      case "VOCAB":
        return <BookOpen className={iconClass} />;
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
    onSelect(step);
    setShowPopover((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center group select-none">
      {/* 1. DUOLINGO FLOATING BUBBLE OVER ACTIVE NODE (If popover is closed) */}
      {isCurrent && !showPopover && (
        <div
          onClick={handleNodeClick}
          className="absolute -top-10 z-20 flex flex-col items-center cursor-pointer animate-bounce"
        >
          <div className="px-3 py-1 rounded-xl bg-[#0059bb] text-white text-[11px] font-bold font-display uppercase tracking-wider shadow-md shadow-[#0059bb]/30">
            BẮT ĐẦU!
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-[#0059bb]" />
        </div>
      )}

      {/* 2. FLOATING STAR RATING FOR COMPLETED NODE */}
      {isCompleted && !showPopover && (
        <div className="absolute -top-5 z-20 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 shadow-2xs">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
        </div>
      )}

      {/* 3. DUOLINGO POPOVER SPEECH BUBBLE ON CLICK */}
      {showPopover && (
        <ZiczacNodePopover
          step={step}
          state={state}
          onClose={() => setShowPopover(false)}
          onToggleComplete={(id) => {
            if (onToggleComplete) onToggleComplete(id);
          }}
        />
      )}

      {/* 4. DUOLINGO CIRCULAR 3D STEP BUTTON (Vòng Tròn Nổi Duolingo) */}
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

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isCompleted ? (
              <Check className="w-8 h-8 stroke-[3.5]" />
            ) : isLocked ? (
              <Lock className="w-6 h-6 stroke-[2.2]" />
            ) : (
              getSkillIcon()
            )}
          </div>
        </button>
      </div>

      {/* 5. Subtitle Label Beneath Node */}
      <div
        onClick={handleNodeClick}
        className="mt-2.5 px-2.5 py-0.5 text-center max-w-[130px] sm:max-w-[150px] cursor-pointer"
      >
        <p className="text-xs font-bold font-display text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">
          {step.title}
        </p>
      </div>
    </div>
  );
};
