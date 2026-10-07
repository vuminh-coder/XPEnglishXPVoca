"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { VideoQuizData, VideoQuizQuestion } from "@/features/listening/services/videoComprehensionService";
import { ShimmerBox } from "./LoadingSkeletons";

interface VideoComprehensionQuizModalProps {
  lessonId: string;
  lessonTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onXpAwarded?: (xp: number) => void;
}

export const VideoComprehensionQuizModal: React.FC<VideoComprehensionQuizModalProps> = ({
  lessonId,
  lessonTitle,
  isOpen,
  onClose,
  onXpAwarded,
}) => {
  const [quizData, setQuizData] = useState<VideoQuizData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [summaryResult, setSummaryResult] = useState<{
    correctCount: number;
    scorePercentage: number;
    xpEarned: number;
  } | null>(null);

  const fetchQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/video-catalog/lessons/${lessonId}/quiz`);
      const data = await res.json();
      if (res.ok && data.success && data.quiz) {
        setQuizData(data.quiz);
      } else {
        setError(data.error || "Không thể tải bộ câu hỏi.");
      }
    } catch (err: any) {
      setError(err?.message || "Lỗi mạng khi tải câu hỏi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && lessonId) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsAnswerSubmitted(false);
      setIsQuizCompleted(false);
      setSummaryResult(null);
      fetchQuiz();
    }
  }, [isOpen, lessonId]);

  const handleSelectOption = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIdx }));
  };

  const handleCheckAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = async () => {
    if (!quizData) return;

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Finalize Quiz
      const answersArr = quizData.questions.map((_, i) => selectedAnswers[i] ?? -1);
      try {
        const res = await fetch(`/api/video-catalog/lessons/${lessonId}/quiz`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersArr, timeSpentSeconds: 90 }),
        });
        const data = await res.json();
        if (res.ok && data.success && data.summary) {
          setSummaryResult(data.summary);
          if (data.summary.xpEarned > 0) {
            onXpAwarded?.(data.summary.xpEarned);
          }
        }
      } catch (err) {
        console.warn("Quiz submit error:", err);
      }
      setIsQuizCompleted(true);
    }
  };

  if (!isOpen) return null;

  const currentQ: VideoQuizQuestion | undefined = quizData?.questions?.[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQuestionIndex];
  const isSelected = typeof userSelected === "number";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="truncate max-w-[280px]">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  Đọc Hiểu Video: {lessonTitle}
                </h3>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Thưởng +25 XP khi hoàn thành</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1">
            {isLoading ? (
              <div className="space-y-4 select-none">
                <div className="flex items-center justify-between">
                  <ShimmerBox className="h-4 w-28 rounded" />
                  <ShimmerBox className="h-4 w-20 rounded-full" />
                </div>
                <ShimmerBox className="h-1.5 w-full rounded-full" />
                <div className="space-y-2 pt-2">
                  <ShimmerBox className="h-4.5 w-full rounded" />
                  <ShimmerBox className="h-4.5 w-4/5 rounded" />
                </div>
                <div className="space-y-2.5 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-3"
                    >
                      <ShimmerBox className="w-5 h-5 rounded-full shrink-0" />
                      <ShimmerBox className="h-4 flex-1 rounded" />
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <ShimmerBox className="h-9 w-32 rounded-xl bg-blue-600/30" />
                </div>
              </div>
            ) : error ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                <p className="text-rose-500 font-medium mb-3">{error}</p>
                <button
                  type="button"
                  onClick={fetchQuiz}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0059bb] text-white"
                >
                  Thử lại
                </button>
              </div>
            ) : isQuizCompleted && summaryResult ? (
              /* Completion Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-500 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hoàn Thành Đọc Hiểu Video!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Bạn đã trả lời đúng {summaryResult.correctCount} / {quizData?.questions.length} câu hỏi ({summaryResult.scorePercentage}%)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                  <span>+{summaryResult.xpEarned} XP Thưởng Đã Cộng Vào Hồ Sơ</span>
                </div>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setSelectedAnswers({});
                      setIsAnswerSubmitted(false);
                      setIsQuizCompleted(false);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm Lại</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-sm transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            ) : currentQ ? (
              /* Active Question View */
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-semibold">
                    Câu hỏi {currentQuestionIndex + 1} / {quizData?.questions.length}
                  </span>
                  {currentQ.targetedConcept && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {currentQ.targetedConcept}
                    </span>
                  )}
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#0059bb] transition-all duration-300"
                    style={{
                      width: `${(((currentQuestionIndex + 1) / (quizData?.questions.length || 1)) * 100)}%`,
                    }}
                  />
                </div>

                {/* Question Text */}
                <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                  {currentQ.question}
                </p>

                {/* 4 Options Grid */}
                <div className="space-y-2 pt-1">
                  {currentQ.options.map((option, optIdx) => {
                    const isPicked = userSelected === optIdx;
                    const isCorrectAnswer = currentQ.correctAnswer === optIdx;

                    let optionStyle =
                      "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 hover:border-slate-300";

                    if (isAnswerSubmitted) {
                      if (isCorrectAnswer) {
                        optionStyle =
                          "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold";
                      } else if (isPicked && !isCorrectAnswer) {
                        optionStyle =
                          "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300";
                      } else {
                        optionStyle = "border-slate-200 dark:border-slate-800 opacity-60";
                      }
                    } else if (isPicked) {
                      optionStyle =
                        "border-[#0059bb] bg-blue-50/60 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 font-semibold shadow-2xs";
                    }

                    return (
                      <button
                        type="button"
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isAnswerSubmitted && isCorrectAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isAnswerSubmitted && isPicked && !isCorrectAnswer && (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box when submitted */}
                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1"
                  >
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>💡 Giải thích chi tiết:</span>
                    </p>
                    <p className="leading-relaxed">{currentQ.explanation}</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 flex items-center justify-end gap-2.5">
                  {!isAnswerSubmitted ? (
                    <button
                      type="button"
                      disabled={!isSelected}
                      onClick={handleCheckAnswer}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Kiểm Tra Đáp Án
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex < (quizData?.questions.length || 0) - 1
                          ? "Câu Tiếp Theo"
                          : "Xem Kết Quả"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
