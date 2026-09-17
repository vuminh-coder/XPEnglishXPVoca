"use client";

import React from "react";
import {
  RotateCw,
  Volume2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { VocabItemData } from "../shared/VocabCardItem";

export interface QuizArenaPaneProps {
  quizFinished: boolean;
  currentQuizItem?: VocabItemData;
  quizIndex: number;
  totalQuestions: number;
  quizScore: number;
  quizOptions: string[];
  selectedAnswer: number | null;
  isQuizSubmitted: boolean;
  onAnswerQuiz: (optIndex: number) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onResetQuiz: () => void;
  onSpeak: (word: string) => void;
}

export function QuizArenaPane({
  quizFinished,
  currentQuizItem,
  quizIndex,
  totalQuestions,
  quizScore,
  quizOptions,
  selectedAnswer,
  isQuizSubmitted,
  onAnswerQuiz,
  onPrevQuestion,
  onNextQuestion,
  onResetQuiz,
  onSpeak,
}: QuizArenaPaneProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {!quizFinished ? (
        <>
          {/* 1. KHỐI TỪ RIÊNG (Dedicated Question Studio Card) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            {/* Quiz Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                  Câu {quizIndex + 1} / {totalQuestions}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Điểm: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">{quizScore}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={onResetQuiz}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            </div>

            {/* Question Word Studio */}
            {currentQuizItem && (
              <div className="text-center py-3 space-y-2.5">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Chọn nghĩa đúng của từ tiếng Anh bên dưới:
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                  {currentQuizItem.word}
                </h2>
                <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium tracking-wide flex items-center justify-center gap-2">
                  {currentQuizItem.phonetic && <span>{currentQuizItem.phonetic}</span>}
                  {currentQuizItem.phonetic && <span className="text-slate-300 dark:text-slate-700">•</span>}
                  <span className="uppercase text-xs font-bold text-[#0059bb] dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/40">
                    {currentQuizItem.pos}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSpeak(currentQuizItem.word)}
                  className="h-9 px-4 rounded-xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 font-bold text-xs border border-blue-200/80 dark:border-blue-800/80 transition-all inline-flex items-center gap-2 cursor-pointer shadow-2xs group active:scale-95 mt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe phát âm</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. KHỐI 4 ĐÁP ÁN CHIA RA 2 CỘT (2-Column Options Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = opt === currentQuizItem?.definitionVn;
              const optionLetter = ["A", "B", "C", "D"][idx];

              let cardStyle =
                "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-850 shadow-2xs";
              let badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

              if (isQuizSubmitted) {
                if (isCorrect) {
                  cardStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-md shadow-emerald-500/20";
                  badgeStyle = "bg-white/20 text-white";
                } else if (isSelected && !isCorrect) {
                  cardStyle = "bg-rose-500 text-white border-rose-600 font-bold shadow-md shadow-rose-500/20";
                  badgeStyle = "bg-white/20 text-white";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onAnswerQuiz(idx)}
                  disabled={isQuizSubmitted}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[64px] active:scale-[0.98] ${cardStyle}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${badgeStyle}`}>
                      {optionLetter}
                    </span>
                    <span className="text-sm font-semibold">{opt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <kbd className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isQuizSubmitted && (isCorrect || isSelected)
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                    }`}>
                      {idx + 1}
                    </kbd>
                    {isQuizSubmitted && isCorrect && <Check className="w-5 h-5 text-white shrink-0" />}
                    {isQuizSubmitted && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-white shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. Quiz Bottom Control Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Previous Question Button */}
            <button
              type="button"
              onClick={onPrevQuestion}
              className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5] text-slate-700 dark:text-slate-200" />
              <span>Câu Trước</span>
            </button>

            {/* Center: Counter & Score Badges */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {quizIndex + 1} <span className="text-slate-400">/</span> {totalQuestions}
                </span>
              </div>

              <div className="h-11 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  Điểm: <strong className="font-mono">{quizScore}</strong>
                </span>
              </div>
            </div>

            {/* Next Question Button */}
            <button
              type="button"
              onClick={onNextQuestion}
              className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
            >
              <span>{quizIndex < totalQuestions - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}</span>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>
        </>
      ) : (
        /* Quiz Summary Screen */
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-2xs">
            🏆
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Hoàn thành bài luyện tập trắc nghiệm!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bạn đã trả lời đúng <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{quizScore}</strong> / {totalQuestions} câu hỏi.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetQuiz}
            className="h-11 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span>Luyện tập lại</span>
          </button>
        </div>
      )}
    </div>
  );
}
