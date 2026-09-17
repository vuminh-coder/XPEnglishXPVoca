"use client";

import React from "react";
import {
  Trophy,
  RotateCcw,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { GrammarExercise } from "../../types/grammarTypes";

interface GrammarResultReviewProps {
  exercises: GrammarExercise[];
  answers: Record<number, string>;
  topicName: string;
  onRetry: () => void;
  onReviewTheory: () => void;
  loading: boolean;
}

export function GrammarResultReview({
  exercises,
  answers,
  topicName,
  onRetry,
  onReviewTheory,
  loading,
}: GrammarResultReviewProps) {
  const correctCount = exercises.filter(
    (ex) => answers[ex.id] === ex.correctAnswer
  ).length;
  const totalCount = exercises.length;
  const percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const isPassed = percent >= 60;
  const xpEarned = correctCount * 5 + 10;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6">
      {/* 1. Score Summary Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/40 dark:from-slate-850 dark:to-slate-900 border border-blue-200/80 dark:border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                Kết Quả Bài Thi Thử AI: {topicName}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  isPassed
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20"
                }`}
              >
                {isPassed ? "Đạt Chuẩn" : "Cần Ôn Lại"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Bạn làm đúng{" "}
              <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                {correctCount}/{totalCount}
              </strong>{" "}
              câu ({percent}%) • Đã nhận +{xpEarned} XP thưởng!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReviewTheory}
            className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer font-display active:scale-95 shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
            <span>Xem Lý Thuyết</span>
          </button>

          <button
            type="button"
            onClick={onRetry}
            disabled={loading}
            className="h-11 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center gap-2 cursor-pointer font-display active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Đề Mới</span>
          </button>
        </div>
      </div>

      {/* 2. Detailed Review List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> Review Chi Tiết Đáp Án & Giải Thích AI:
        </h4>

        <div className="space-y-3">
          {exercises.map((ex, idx) => {
            const userAns = answers[ex.id];
            const isCorrect = userAns === ex.correctAnswer;

            return (
              <div
                key={ex.id}
                className={`p-4 rounded-2xl border space-y-3 shadow-2xs ${
                  isCorrect
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/30"
                    : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Câu {idx + 1}: {ex.sentence}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase shrink-0 flex items-center gap-1 ${
                      isCorrect
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2
                          className="w-3 h-3 text-emerald-600 dark:text-emerald-400"
                          strokeWidth={2.5}
                        />
                        <span>Đúng</span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          className="w-3 h-3 text-rose-600 dark:text-rose-400"
                          strokeWidth={2.5}
                        />
                        <span>Sai</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isCorrect
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    <span className="font-bold">Bạn chọn:</span>{" "}
                    {userAns || "(Chưa chọn)"}
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold">Đáp án chuẩn:</span>{" "}
                    {ex.correctAnswer}
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 mr-1">
                      AI Giải thích:
                    </span>
                    <span>{ex.explanation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
