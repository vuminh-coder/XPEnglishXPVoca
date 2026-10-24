"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Volume2, BookOpen, ArrowRight } from "lucide-react";
import { SubMode } from "../types";

interface PracticeBottomBarProps {
  canSubmit: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswerText: string;
  targetWord?: string;
  subMode: SubMode;
  onSubmit: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onOpenDetails?: () => void;
  onPlayAudio?: () => void;
}

export function PracticeBottomBar({
  canSubmit,
  isAnswered,
  isCorrect,
  correctAnswerText,
  targetWord,
  subMode,
  onSubmit,
  onNext,
  onSkip,
  onOpenDetails,
  onPlayAudio,
}: PracticeBottomBarProps) {
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
    ? "bg-transparent border-slate-200/60 dark:border-slate-800/60"
    : isCorrect
    ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800"
    : "bg-rose-50/95 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800";

  return (
    <div
      className={`sticky bottom-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-3 pb-3 sm:pt-3.5 sm:pb-3.5 border-t-2 transition-colors shrink-0 ${footerTone}`}
    >
      {!isAnswered ? (
        <div className="flex items-center gap-2 sm:gap-3">
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="h-11 sm:h-12 px-4 rounded-2xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shrink-0"
              title="Bỏ qua câu này"
            >
              <span>Bỏ qua</span>
            </button>
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`flex-1 h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              canSubmit
                ? "bg-[#0059bb] hover:bg-blue-600 text-white border-b-[4px] border-[#003d82] dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-sm"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[4px] border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-75"
            }`}
          >
            <span>Kiểm tra</span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Status info & meaning */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                isCorrect ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {isCorrect ? (
                <Check className="w-6 h-6 stroke-[3.2]" />
              ) : (
                <X className="w-6 h-6 stroke-[3.2]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-base sm:text-lg font-black font-display ${
                  isCorrect
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-rose-700 dark:text-rose-300"
                }`}
              >
                <span>{isCorrect ? "Chính xác!" : "Đáp án đúng:"}</span>
                {isCorrect && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[11px] font-black">
                    +{subMode === "writing" ? 15 : 10} XP
                  </span>
                )}
              </div>
              <p
                className={`text-xs sm:text-sm font-semibold truncate leading-tight ${
                  isCorrect
                    ? "text-emerald-700/90 dark:text-emerald-300/90"
                    : "text-rose-700/90 dark:text-rose-300/90"
                }`}
              >
                {correctAnswerText}
              </p>
            </div>

            {/* Quick Actions in answered sheet */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onPlayAudio && (
                <button
                  type="button"
                  onClick={onPlayAudio}
                  className={`p-2 rounded-xl transition-all cursor-pointer active:scale-95 ${
                    isCorrect
                      ? "text-emerald-700 hover:bg-emerald-100/60 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
                      : "text-rose-700 hover:bg-rose-100/60 dark:text-rose-300 dark:hover:bg-rose-900/40"
                  }`}
                  title="Nghe lại phát âm"
                >
                  <Volume2 className="w-5 h-5 stroke-[2.3]" />
                </button>
              )}

              {onOpenDetails && (
                <button
                  type="button"
                  onClick={onOpenDetails}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                    isCorrect
                      ? "bg-white/80 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                      : "bg-white/80 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200"
                  }`}
                  title="Xem chi tiết ngữ cảnh & ví dụ"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xem ví dụ</span>
                </button>
              )}
            </div>
          </div>

          {/* Continue Action Button */}
          <button
            type="button"
            onClick={onNext}
            className={`w-full sm:w-auto min-w-[130px] h-11 sm:h-12 px-6 rounded-2xl text-xs sm:text-sm font-black font-display uppercase tracking-wider text-white border-b-[4px] flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-sm transition-all ${
              isCorrect
                ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-800"
                : "bg-rose-600 hover:bg-rose-500 border-rose-800"
            }`}
          >
            <span>Tiếp tục</span>
            <ArrowRight className="w-4 h-4 stroke-[2.8]" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
