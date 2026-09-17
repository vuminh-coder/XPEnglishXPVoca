"use client";

import React from "react";
import {
  RotateCcw,
  Check,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GrammarExercise } from "../../types/grammarTypes";

interface GrammarQuizCardProps {
  exercise: GrammarExercise;
  currentIndex: number;
  totalCount: number;
  topicName: string;
  userAnswer?: string;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onRegenerate: () => void;
  loading: boolean;
  isLastQuestion: boolean;
  allAnswered: boolean;
}

export function GrammarQuizCard({
  exercise,
  currentIndex,
  totalCount,
  topicName,
  userAnswer,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit,
  onRegenerate,
  loading,
  isLastQuestion,
  allAnswered,
}: GrammarQuizCardProps) {
  const isAnswered = Boolean(userAnswer);
  const isCorrect = userAnswer === exercise.correctAnswer;
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="space-y-4">
      {/* 1. KHỐI CÂU HỎI STUDIO ĐỘC LẬP */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Header Bar */}
        <div className="space-y-2.5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 shrink-0">
                Câu {currentIndex + 1} / {totalCount}
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline font-display truncate">
                Phòng thi trắc nghiệm AI • {topicName}
              </span>
            </div>

            <button
              type="button"
              onClick={onRegenerate}
              disabled={loading}
              className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi 5 câu khác</span>
            </button>
          </div>

          {/* Progress Line */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0059bb] dark:bg-sky-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Sentence */}
        <div className="space-y-4">
          <div className="py-2 space-y-1.5">
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Chọn phương án đúng để điền vào chỗ trống:
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-relaxed">
              {exercise.sentence}
            </h3>
          </div>

          {/* 2. LƯỚI 4 ĐÁP ÁN 2 CỘT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {exercise.options.map((opt, oIdx) => {
              const isThisCorrect = opt === exercise.correctAnswer;
              const isThisSelected = userAnswer === opt;

              let cardStyle =
                "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-850 shadow-2xs";
              let badgeStyle =
                "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

              if (isAnswered) {
                if (isThisCorrect) {
                  cardStyle =
                    "bg-emerald-500 text-white border-emerald-600 font-bold shadow-md shadow-emerald-500/20";
                  badgeStyle = "bg-white/20 text-white";
                } else if (isThisSelected && !isThisCorrect) {
                  cardStyle =
                    "bg-rose-500 text-white border-rose-600 font-bold shadow-md shadow-rose-500/20";
                  badgeStyle = "bg-white/20 text-white";
                } else {
                  cardStyle =
                    "opacity-50 bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800 text-slate-400";
                  badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-400";
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => onSelectOption(opt)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 min-h-[64px] active:scale-[0.98] ${
                    isAnswered ? "cursor-default" : "cursor-pointer"
                  } ${cardStyle}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${badgeStyle}`}
                    >
                      {optionLetters[oIdx]}
                    </span>
                    <span className="text-sm font-semibold">{opt}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <kbd
                      className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isAnswered && (isThisCorrect || isThisSelected)
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {oIdx + 1}
                    </kbd>
                    {isAnswered && isThisCorrect && (
                      <Check className="w-5 h-5 text-white shrink-0" />
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <X className="w-5 h-5 text-white shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. INSTANT AI EXPLANATION BOX */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 transition-all shadow-2xs ${
                isCorrect
                  ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200"
                  : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/40 text-rose-950 dark:text-rose-200"
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
                  {isCorrect ? (
                    <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Chính xác! (+5 XP)
                    </span>
                  ) : (
                    <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                      <X className="w-4 h-4" /> Tiếc quá, chưa chính xác!
                    </span>
                  )}
                </span>

                {!isCorrect && (
                  <span className="text-xs bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900/40 font-bold text-rose-800 dark:text-rose-300">
                    Đáp án đúng: <strong>{exercise.correctAnswer}</strong>
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1">
                    AI Giải thích chi tiết:
                  </span>
                  {exercise.explanation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG CHUYỂN CÂU DƯỚI CÙNG */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 disabled:opacity-40 shadow-2xs"
        >
          <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5]" />
          <span>Câu Trước</span>
        </button>

        {/* Center Counter */}
        <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            {currentIndex + 1} <span className="text-slate-400">/</span> {totalCount}
          </span>
        </div>

        {/* Next / Submit Button */}
        {!isLastQuestion ? (
          <button
            type="button"
            onClick={onNext}
            className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
          >
            <span>Câu Tiếp Theo</span>
            <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!allAnswered}
            className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 shrink-0 font-display active:scale-95 disabled:opacity-50"
          >
            <Check className="w-4.5 h-4.5" />
            <span>Nộp Bài (+15 XP)</span>
          </button>
        )}
      </div>
    </div>
  );
}
