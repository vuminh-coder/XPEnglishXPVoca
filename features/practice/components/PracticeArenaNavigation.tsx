"use client";

import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, X, AlertCircle } from "lucide-react";
import { SubMode, PracticeWord } from "../types";

interface PracticeArenaNavigationProps {
  currentIndex: number;
  totalWords: number;
  subMode: SubMode;
  currentWord: PracticeWord;
  // Quiz
  qIsAnswered: boolean;
  qIsCorrect: boolean;
  // Writing
  wIsAnswered: boolean;
  wIsCorrect: boolean;
  // Speaking
  sIsAnswered: boolean;
  sIsCorrect: boolean;
  sAccuracy: number;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
}

export function PracticeArenaNavigation({
  currentIndex,
  totalWords,
  subMode,
  currentWord,
  qIsAnswered,
  qIsCorrect,
  wIsAnswered,
  wIsCorrect,
  sIsAnswered,
  sIsCorrect,
  sAccuracy,
  onPrevQuestion,
  onNextQuestion,
}: PracticeArenaNavigationProps) {
  return (
    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 shrink-0">
      {/* Nút Câu Trước */}
      <button
        type="button"
        disabled={currentIndex === 0}
        onClick={onPrevQuestion}
        className="h-9 px-3 sm:px-4 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
        title="Quay lại câu trước đó"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Câu trước</span>
      </button>

      {/* Feedback Status / Center Message */}
      <div className="text-center px-1 flex-1 min-w-0 flex items-center justify-center">
        {subMode === "quiz" && qIsAnswered && (
          qIsCorrect ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span>Chính xác! (+10 XP)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in max-w-full truncate">
              <X className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
              <span className="truncate">
                Chưa đúng! Đáp án:{" "}
                <strong className="font-black text-rose-900 dark:text-rose-100">
                  {currentWord.meaning}
                </strong>
              </span>
            </div>
          )
        )}

        {subMode === "writing" && wIsAnswered && (
          wIsCorrect ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span>Chính xác! (+15 XP)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in max-w-full truncate">
              <X className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
              <span className="truncate">
                Chưa đúng! Đáp án:{" "}
                <strong className="font-black text-rose-900 dark:text-rose-100">
                  {currentWord.word}
                </strong>
              </span>
            </div>
          )
        )}

        {subMode === "speaking" && sIsAnswered && (
          sIsCorrect ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span>Chuẩn xác! ({sAccuracy}%)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
              <span>Độ khớp: {sAccuracy}%</span>
            </div>
          )
        )}
      </div>

      {/* Nút Câu Tiếp Theo / Hoàn Thành */}
      <button
        type="button"
        onClick={onNextQuestion}
        className="h-9 px-3.5 sm:px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
        title="Chuyển sang câu tiếp theo"
      >
        <span>{currentIndex + 1 < totalWords ? "Câu tiếp theo" : "Hoàn thành"}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
