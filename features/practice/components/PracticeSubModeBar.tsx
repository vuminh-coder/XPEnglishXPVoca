"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Layers, PenLine, Sparkles, LayoutGrid, ExternalLink } from "lucide-react";
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
  const inPlaceModes = [
    { id: "quiz" as SubMode, labelMobile: "Quiz", labelDesktop: "Trắc nghiệm", icon: Brain },
    { id: "flashcard" as SubMode, labelMobile: "Thẻ", labelDesktop: "Flashcard", icon: Layers },
    { id: "writing" as SubMode, labelMobile: "Viết", labelDesktop: "Gõ từ", icon: PenLine },
    { id: "speaking" as SubMode, labelMobile: "Nói", labelDesktop: "Phát âm AI", icon: SpeakingIcon },
  ];

  const studioModes = [
    { id: "match_pairs" as SubMode, label: "Nối từ", icon: Sparkles },
    { id: "sentence_builder" as SubMode, label: "Ghép câu", icon: LayoutGrid },
  ];

  return (
    <div className="flex items-center justify-between gap-2 shrink-0 py-1">
      {/* 4 In-place Practice Modes */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 relative shadow-2xs">
        {inPlaceModes.map((m) => {
          const Icon = m.icon;
          const isActive = subMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSubModeChange(m.id)}
              className="relative py-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 active:scale-95 transition-all select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="practiceSubModePill"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 border-2 border-b-[3px] border-[#0059bb]/30 dark:border-sky-500/30 rounded-xl shadow-xs z-0"
                />
              )}
              <span
                className={`relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-150 ${
                  isActive
                    ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="sm:hidden">{m.labelMobile}</span>
                <span className="hidden sm:inline">{m.labelDesktop}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* External Studios Links (Nối từ & Ghép câu) */}
      <div className="hidden sm:flex items-center gap-1.5">
        {studioModes.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSubModeChange(s.id)}
              className="h-8 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0059bb]/50 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-2xs active:scale-95"
              title={`Mở Studio ${s.label} chuyên biệt`}
            >
              <Icon className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>{s.label}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50 ml-0.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
