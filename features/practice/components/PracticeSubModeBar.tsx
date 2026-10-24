"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Layers, PenLine } from "lucide-react";
import { SubMode } from "../types";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

interface PracticeSubModeBarProps {
  subMode: SubMode;
  onSubModeChange: (mode: SubMode) => void;
  currentIndex: number;
  totalWords: number;
}

export function PracticeSubModeBar({
  subMode,
  onSubModeChange,
}: PracticeSubModeBarProps) {
  const inPlaceModes = [
    { id: "quiz" as SubMode, label: "Trắc nghiệm", icon: Brain },
    { id: "flashcard" as SubMode, label: "Flashcard", icon: Layers },
    { id: "writing" as SubMode, label: "Gõ từ", icon: PenLine },
    { id: "speaking" as SubMode, label: "Phát âm", icon: SpeakingIcon },
  ];

  return (
    <div className="flex items-center justify-center shrink-0 py-0.5">
      {/* 4 In-place Practice Modes Pill (+2px height & AppTopHeader subtle border with original rounded-2xl/rounded-xl) */}
      <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 relative shadow-2xs">
        {inPlaceModes.map((m) => {
          const Icon = m.icon;
          const isActive = subMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSubModeChange(m.id)}
              className="relative h-[32px] sm:h-[34px] px-2.5 sm:px-3.5 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 active:scale-95 transition-all select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="practiceSubModePill"
                  transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 rounded-xl shadow-2xs z-0"
                />
              )}
              <span
                className={`relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-150 ${
                  isActive
                    ? "text-[#0059bb] dark:text-sky-400 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{m.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
