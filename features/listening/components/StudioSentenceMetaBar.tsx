"use client";

import React from "react";

export interface StudioSentenceMetaBarProps {
  currentSentenceIndex: number;
  totalSentencesCount: number;
  wordCount: number;
  scoreText?: string | null;
  repeatKey?: "Ctrl" | "Space" | string;
  className?: string;
  rightExtra?: React.ReactNode;
}

/**
 * StudioSentenceMetaBar: Shared sentence status meta bar across Dictation and Shadowing.
 * Displays sentence progress counter, word count, optional accuracy score,
 * and keyboard shortcuts for rapid desktop learning.
 */
export const StudioSentenceMetaBar: React.FC<StudioSentenceMetaBarProps> = React.memo(
  function StudioSentenceMetaBar({
    currentSentenceIndex,
    totalSentencesCount,
    wordCount,
    scoreText,
    repeatKey = "Ctrl",
    className = "",
    rightExtra,
  }) {
    return (
      <div
        className={`flex items-center justify-between px-1 text-xs font-medium text-slate-600 dark:text-slate-400 flex-wrap gap-2 select-none ${className}`}
      >
        {/* Left: Sentence Counter & Word Count & Score */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
            Câu {currentSentenceIndex + 1}/{totalSentencesCount}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-medium font-sans">
            {wordCount} từ vựng
          </span>

          {scoreText && (
            <>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              {scoreText.startsWith("Đã đạt") ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-bold font-sans bg-emerald-600 text-white shadow-xs">
                  <span>{scoreText}</span>
                </span>
              ) : scoreText.startsWith("Chưa đạt") ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-bold font-sans bg-rose-600 text-white shadow-xs">
                  <span>{scoreText}</span>
                </span>
              ) : (
                <span className="text-slate-600 dark:text-slate-300 font-semibold font-sans">
                  {scoreText}
                </span>
              )}
            </>
          )}
        </div>

        {/* Right: Keyboard Shortcuts & Custom Extra Actions */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">
              Enter
            </kbd>{" "}
            để sang câu tiếp theo
          </span>

          {repeatKey && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
              <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">
                {repeatKey}
              </kbd>{" "}
              để nghe lại
            </span>
          )}

          {rightExtra}
        </div>
      </div>
    );
  }
);
