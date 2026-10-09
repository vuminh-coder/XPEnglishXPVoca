"use client";

import React from "react";
import { motion } from "framer-motion";
import { Headphones, Mic, ListOrdered } from "lucide-react";

export interface StudioMobileTabBarProps {
  branch: "dictation" | "shadowing";
  activeTab: "practice" | "transcript";
  onTabChange: (tab: "practice" | "transcript") => void;
  currentSentenceIndex: number;
  totalSentencesCount: number;
  className?: string;
}

/**
 * StudioMobileTabBar: Shared mobile/tablet (<lg) switcher tab between
 * single-sentence practice (Dictation or Shadowing) and the full transcript list.
 * Features Apple-grade spring layout animation and tactile feedback.
 */
export const StudioMobileTabBar: React.FC<StudioMobileTabBarProps> = React.memo(
  function StudioMobileTabBar({
    branch,
    activeTab,
    onTabChange,
    currentSentenceIndex,
    totalSentencesCount,
    className = "",
  }) {
    const isDictation = branch === "dictation";
    const layoutId = `${branch}MobileStudioTabIndicator`;

    return (
      <div
        className={`flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 sm:px-4 pt-2.5 pb-2 gap-2 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md ${className}`}
      >
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 relative w-full">
          {/* TAB 1: PRACTICE */}
          <button
            type="button"
            onClick={() => onTabChange("practice")}
            aria-selected={activeTab === "practice"}
            className={`relative flex-1 py-1.5 px-2 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer select-none transition-colors z-10 ${
              activeTab === "practice"
                ? "font-bold text-slate-900 dark:text-white"
                : "font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            {activeTab === "practice" && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            {isDictation ? (
              <Headphones className="w-3.5 h-3.5 shrink-0 relative z-10 text-[#0059bb] dark:text-sky-400" />
            ) : (
              <Mic className="w-3.5 h-3.5 shrink-0 relative z-10 text-[#0059bb] dark:text-sky-400" />
            )}
            <span className="relative z-10 truncate font-sans">
              {isDictation ? "Luyện chép" : "Luyện nói"} (
              {currentSentenceIndex + 1}/{totalSentencesCount})
            </span>
          </button>

          {/* TAB 2: TRANSCRIPT */}
          <button
            type="button"
            onClick={() => onTabChange("transcript")}
            aria-selected={activeTab === "transcript"}
            className={`relative flex-1 py-1.5 px-2 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer select-none transition-colors z-10 ${
              activeTab === "transcript"
                ? "font-bold text-slate-900 dark:text-white"
                : "font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            {activeTab === "transcript" && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <ListOrdered className="w-3.5 h-3.5 shrink-0 relative z-10 text-slate-500" />
            <span className="relative z-10 truncate font-sans">
              Danh sách phụ đề ({totalSentencesCount})
            </span>
          </button>
        </div>
      </div>
    );
  }
);
