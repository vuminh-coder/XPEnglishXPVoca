"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Volume2, BookOpen, ArrowRight } from "lucide-react";
import { SubMode } from "../types";

interface PracticeBottomBarProps {
  canSubmit: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswerText: string;
  targetWord?: string;
  example?: string;
  exampleVi?: string;
  subMode: SubMode;
  onSubmit: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onOpenDetails?: () => void;
  onPlayAudio?: () => void;
  onPlayExampleAudio?: () => void;
}

export function PracticeBottomBar({
  canSubmit,
  isAnswered,
  isCorrect,
  correctAnswerText,
  example,
  exampleVi,
  subMode,
  onSubmit,
  onNext,
  onSkip,
  onOpenDetails,
  onPlayAudio,
  onPlayExampleAudio,
}: PracticeBottomBarProps) {
  const [isExampleExpanded, setIsExampleExpanded] = useState(false);

  // Reset example expansion when answer status changes (new question)
  useEffect(() => {
    if (!isAnswered) {
      setIsExampleExpanded(false);
    }
  }, [isAnswered]);

  // Global Enter hotkey for Continue when answered, or Submit when canSubmit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === "Enter" && !isAnswered && canSubmit) {
          e.preventDefault();
          onSubmit();
        }
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isAnswered) {
          onNext();
        } else if (canSubmit) {
          onSubmit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, canSubmit, onNext, onSubmit]);

  const footerTone = !isAnswered
    ? "bg-transparent border-slate-200/50 dark:border-slate-800/50"
    : isCorrect
    ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800"
    : "bg-rose-50/95 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800";

  const handleToggleExample = () => {
    if (example || exampleVi) {
      setIsExampleExpanded((prev) => !prev);
    } else if (onOpenDetails) {
      onOpenDetails();
    }
  };

  return (
    <div
      className={`sticky bottom-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-2 pb-2 sm:pt-2.5 sm:pb-2.5 border-t transition-colors shrink-0 ${footerTone}`}
    >
      {!isAnswered ? (
        <div className="flex items-center justify-between gap-3 max-w-full">
          {onSkip ? (
            <button
              type="button"
              onClick={onSkip}
              className="h-9 sm:h-9.5 px-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer active:scale-95 transition-all shrink-0"
              title="Bỏ qua câu hỏi này"
            >
              <span>Bỏ qua</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`flex-1 sm:max-w-xs h-9 sm:h-9.5 px-5 rounded-xl text-xs sm:text-[13px] font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ml-auto ${
              canSubmit
                ? "bg-[#0059bb] hover:bg-blue-600 text-white border-b-[3px] border-[#003d82] dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-xs"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[3px] border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-75"
            }`}
          >
            <span>Kiểm tra</span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          className="flex flex-col gap-2"
        >
          {/* UPWARD EXPANDED CONTEXT EXAMPLE DRAWER (Gợi ý 2: Mở rộng lên phía trên, chỉ lấy ví dụ thực tế) */}
          <AnimatePresence>
            {isExampleExpanded && (example || exampleVi) && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="overflow-hidden"
              >
                <div
                  className={`p-2.5 sm:p-3 rounded-xl border flex items-start justify-between gap-2.5 shadow-2xs ${
                    isCorrect
                      ? "bg-emerald-100/80 dark:bg-emerald-950/60 border-emerald-300/80 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                      : "bg-rose-100/80 dark:bg-rose-950/60 border-rose-300/80 dark:border-rose-800 text-rose-950 dark:text-rose-100"
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold leading-snug">
                        "{example || "She used the vocabulary in a real-world sentence."}"
                      </p>
                      {exampleVi && (
                        <p className="text-[11px] sm:text-xs opacity-80 font-medium leading-snug">
                          {exampleVi}
                        </p>
                      )}
                    </div>
                  </div>

                  {onPlayExampleAudio && (
                    <button
                      type="button"
                      onClick={onPlayExampleAudio}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer active:scale-90 shrink-0 ${
                        isCorrect
                          ? "bg-white/90 dark:bg-slate-900/90 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-white"
                          : "bg-white/90 dark:bg-slate-900/90 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-white"
                      }`}
                      title="Nghe phát âm câu ví dụ"
                      aria-label="Nghe phát âm câu ví dụ"
                    >
                      <Volume2 className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN ACTION BAR ROW (Status, Audio, Xem ví dụ & Tiếp tục) */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Status info & meaning */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div
                className={`w-8 h-8 sm:w-8.5 sm:h-8.5 shrink-0 rounded-xl flex items-center justify-center text-white shadow-2xs ${
                  isCorrect ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {isCorrect ? (
                  <Check className="w-4.5 h-4.5 stroke-[3.2]" />
                ) : (
                  <X className="w-4.5 h-4.5 stroke-[3.2]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`flex items-center gap-2 text-sm sm:text-base font-black font-display leading-tight ${
                    isCorrect
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-rose-700 dark:text-rose-300"
                  }`}
                >
                  <span>{isCorrect ? "Chính xác!" : "Đáp án đúng:"}</span>
                  {isCorrect && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[10px] sm:text-[11px] font-black">
                      +{subMode === "writing" ? 15 : 10} XP
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm font-semibold truncate leading-tight pt-0.5 ${
                    isCorrect
                      ? "text-emerald-700/90 dark:text-emerald-300/90"
                      : "text-rose-700/90 dark:text-rose-300/90"
                  }`}
                >
                  {correctAnswerText}
                </p>
              </div>
            </div>

            {/* Action Buttons: Sleeker & More Compact (h-9 sm:h-9.5) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
              {onPlayAudio && (
                <button
                  type="button"
                  onClick={onPlayAudio}
                  className={`w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-xl border border-b-[3px] flex items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs shrink-0 ${
                    isCorrect
                      ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                      : "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  }`}
                  title="Nghe lại phát âm"
                  aria-label="Nghe lại phát âm"
                >
                  <Volume2 className="w-4 h-4 stroke-[2.3]" />
                </button>
              )}

              {(example || onOpenDetails) && (
                <button
                  type="button"
                  onClick={handleToggleExample}
                  className={`h-9 sm:h-9.5 px-3 sm:px-3.5 rounded-xl text-xs font-bold border border-b-[3px] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs shrink-0 ${
                    isExampleExpanded
                      ? isCorrect
                        ? "bg-emerald-600 text-white border-emerald-700"
                        : "bg-rose-600 text-white border-rose-700"
                      : isCorrect
                      ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                      : "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  }`}
                  title={isExampleExpanded ? "Thu gọn ví dụ ngữ cảnh" : "Xem ví dụ ngữ cảnh thực tế"}
                >
                  <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{isExampleExpanded ? "Ẩn ví dụ" : "Xem ví dụ"}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onNext}
                className={`flex-1 sm:flex-initial min-w-[110px] sm:min-w-[120px] h-9 sm:h-9.5 px-4 sm:px-5 rounded-xl text-xs sm:text-[13px] font-black font-display uppercase tracking-wider text-white border-b-[3px] flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-xs transition-all ${
                  isCorrect
                    ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-800"
                    : "bg-rose-600 hover:bg-rose-500 border-rose-800"
                }`}
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
