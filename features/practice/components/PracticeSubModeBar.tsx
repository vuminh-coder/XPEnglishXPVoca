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
  currentIndex,
  totalWords,
}: PracticeSubModeBarProps) {
  const modes = [
    { id: "quiz" as SubMode, labelMobile: "Quiz", labelDesktop: "Quiz | Trắc nghiệm", icon: Brain },
    { id: "flashcard" as SubMode, labelMobile: "Flashcard", labelDesktop: "Flashcard | 3D SRS", icon: Layers },
    { id: "writing" as SubMode, labelMobile: "Chính tả", labelDesktop: "Writing | Gõ chính tả", icon: PenLine },
    { id: "speaking" as SubMode, labelMobile: "Phát âm", labelDesktop: "Speaking | Phát âm AI", icon: SpeakingIcon },
  ];

  return (
    <div className="p-1 sm:p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 shrink-0">
      {/* Segmented Switcher Buttons with Liquid Spring Sliding Pill */}
      <div className="grid grid-cols-4 sm:flex sm:items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 w-full sm:w-auto relative">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = subMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSubModeChange(m.id)}
              className="relative py-1.5 px-1.5 sm:px-3.5 rounded-md text-xs font-bold cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto active:scale-[0.97] transition-transform select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="practiceSubModePill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-md shadow-2xs z-0"
                />
              )}
              <span
                className={`relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 transition-colors duration-150 ${
                  isActive
                    ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="sm:hidden text-center truncate">{m.labelMobile}</span>
                <span className="hidden sm:inline">{m.labelDesktop}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Progress Indicator */}
      <div className="hidden sm:flex items-center gap-3 pr-2">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Tiến độ:</span>
          <span className="text-slate-900 dark:text-white font-mono">
            {currentIndex + 1}/{totalWords}
          </span>
        </div>
        <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0059bb] to-blue-500 transition-all duration-300"
            style={{
              width: `${Math.round(((currentIndex + 1) / Math.max(1, totalWords)) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
