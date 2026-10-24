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
    ? "bg-transparent border-t border-slate-200/50 dark:border-slate-800/50"
    : isCorrect
    ? "bg-[#d7ffb8] dark:bg-[#133818] border-t-2 border-[#bbf7d0] dark:border-[#1e5a27]"
    : "bg-[#ffdfe0] dark:bg-[#3d1417] border-t-2 border-[#fecdd3] dark:border-[#631e24]";

  const handleToggleExample = () => {
    if (example || exampleVi) {
      setIsExampleExpanded((prev) => !prev);
    } else if (onOpenDetails) {
      onOpenDetails();
    }
  };

  return (
    <div
      className={`sticky bottom-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-2.5 pb-2.5 sm:pt-3.5 sm:pb-3.5 transition-colors shrink-0 ${footerTone}`}
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
            className={`flex-1 sm:max-w-xs h-10 sm:h-11 px-6 rounded-2xl text-xs sm:text-sm font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ml-auto ${
              canSubmit
                ? "bg-[#0059bb] hover:bg-blue-600 text-white border-b-[4px] border-[#003d82] dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-xs"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-b-[3px] border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-75"
            }`}
          >
            <span>Kiểm tra</span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-2"
        >
          {/* UPWARD EXPANDED CONTEXT EXAMPLE DRAWER (Gợi ý 2: Mở rộng lên phía trên, chỉ lấy ví dụ thực tế) */}
          <AnimatePresence>
            {isExampleExpanded && (example || exampleVi) && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="overflow-hidden"
              >
                <div
                  className={`p-2.5 sm:p-3 rounded-xl border flex items-start justify-between gap-2.5 shadow-2xs ${
                    isCorrect
                      ? "bg-white/80 dark:bg-slate-900/80 border-[#bbf7d0] dark:border-emerald-800 text-[#15803d] dark:text-emerald-100"
                      : "bg-white/80 dark:bg-slate-900/80 border-[#fecdd3] dark:border-rose-800 text-[#be123c] dark:text-rose-100"
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold leading-snug">
                        "{example || "She used the vocabulary in a real-world sentence."}"
                      </p>
                      {exampleVi && (
                        <p className="text-[11px] sm:text-xs opacity-85 font-medium leading-snug">
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
                          ? "bg-white dark:bg-slate-900 border-[#bbf7d0] text-[#15803d] hover:bg-white"
                          : "bg-white dark:bg-slate-900 border-[#fecdd3] text-[#be123c] hover:bg-white"
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

          {/* MAIN ACTION BAR ROW (Status, Audio, Xem ví dụ & Tiếp tục) - Matching user photos 1:1 */}
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Left Status Circle Icon & Info */}
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full flex items-center justify-center text-white shadow-sm ${
                  isCorrect
                    ? "bg-[#00b533] dark:bg-[#22c55e]"
                    : "bg-[#ff4b4b] dark:bg-[#f43f5e]"
                }`}
              >
                {isCorrect ? (
                  <Check className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[3.6]" />
                ) : (
                  <X className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[3.6]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 leading-tight">
                  <span
                    className={`text-base sm:text-lg font-black font-display ${
                      isCorrect
                        ? "text-[#15803d] dark:text-[#86efac]"
                        : "text-[#be123c] dark:text-[#fda4af]"
                    }`}
                  >
                    {isCorrect ? "Chính xác!" : "Đáp án đúng:"}
                  </span>
                  {isCorrect && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fcd34d] text-[#78350f] text-[11px] sm:text-xs font-black font-display shadow-2xs">
                      +{subMode === "writing" ? 20 : 10}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs sm:text-sm font-semibold truncate leading-tight pt-0.5 ${
                    isCorrect
                      ? "text-[#166534] dark:text-[#bbf7d0]"
                      : "text-[#be123c] dark:text-[#fecdd3]"
                  }`}
                >
                  {correctAnswerText}
                </p>
              </div>
            </div>

            {/* Right Action Group: Unboxed Loa Icon + Secondary Example Toggle + 3D TIẾP TỤC Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Clean unboxed Audio Speaker Icon (matching user photos 1:1) */}
              {onPlayAudio && (
                <button
                  type="button"
                  onClick={onPlayAudio}
                  className={`p-2 transition-transform cursor-pointer hover:scale-110 active:scale-95 shrink-0 ${
                    isCorrect
                      ? "text-[#15803d] dark:text-[#86efac] hover:text-[#166534]"
                      : "text-[#be123c] dark:text-[#fda4af] hover:text-[#9f1239]"
                  }`}
                  title="Nghe lại phát âm"
                  aria-label="Nghe lại phát âm"
                >
                  <Volume2 className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2.3]" />
                </button>
              )}

              {/* Optional Context Example toggle */}
              {(example || onOpenDetails) && (
                <button
                  type="button"
                  onClick={handleToggleExample}
                  className={`hidden xs:flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0 ${
                    isExampleExpanded
                      ? isCorrect
                        ? "bg-[#15803d] text-white"
                        : "bg-[#be123c] text-white"
                      : isCorrect
                      ? "text-[#15803d] hover:bg-emerald-200/50 dark:text-[#86efac]"
                      : "text-[#be123c] hover:bg-rose-200/50 dark:text-[#fda4af]"
                  }`}
                  title={isExampleExpanded ? "Thu gọn ví dụ ngữ cảnh" : "Xem ví dụ ngữ cảnh thực tế"}
                >
                  <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{isExampleExpanded ? "Ẩn ví dụ" : "Xem ví dụ"}</span>
                </button>
              )}

              {/* Authentic Duolingo 3D "TIẾP TỤC" Button (matching user photos 1:1) */}
              <button
                type="button"
                onClick={onNext}
                className={`h-11 sm:h-12 min-w-[120px] sm:min-w-[140px] px-6 sm:px-7 rounded-2xl text-xs sm:text-sm font-black font-display uppercase tracking-wider text-white border-b-[4px] flex items-center justify-center cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-sm transition-all ${
                  isCorrect
                    ? "bg-[#00b533] hover:bg-[#009e2c] border-[#007a22]"
                    : "bg-[#ff4b4b] hover:bg-[#e03b3b] border-[#be123c]"
                }`}
              >
                <span>TIẾP TỤC</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
