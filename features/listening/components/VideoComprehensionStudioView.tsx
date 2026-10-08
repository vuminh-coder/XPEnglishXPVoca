"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Headphones,
  Check,
  ChevronRight,
  TrendingUp,
  Volume2,
} from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { VideoQuizData, VideoQuizQuestion } from "@/features/listening/services/videoComprehensionService";
import { ShimmerBox } from "./LoadingSkeletons";

interface VideoComprehensionStudioViewProps {
  lessonId: string;
  lessonTitle?: string;
  onBackUrl?: string;
}

export function VideoComprehensionStudioView({
  lessonId,
  lessonTitle: initialTitle,
  onBackUrl = "/study/dictation/video",
}: VideoComprehensionStudioViewProps) {
  const router = useRouter();
  const awardXp = useAuthStore((s) => s.awardXp);
  const addToast = useNotificationStore((s) => s.addToast);

  const [quizData, setQuizData] = useState<VideoQuizData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lesson metadata state
  const [lessonInfo, setLessonInfo] = useState<{
    id: string;
    title: string;
    thumbnailUrl?: string;
    cefrLevel?: string;
    categoryName?: string;
  } | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [summaryResult, setSummaryResult] = useState<{
    correctCount: number;
    scorePercentage: number;
    xpEarned: number;
  } | null>(null);

  // Fetch quiz and lesson metadata
  const fetchQuizAndLesson = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch Quiz data
      const quizRes = await fetch(`/api/video-catalog/lessons/${lessonId}/quiz`);
      const quizJson = await quizRes.json();
      if (quizRes.ok && quizJson.success && quizJson.quiz) {
        setQuizData(quizJson.quiz);
      } else {
        setError(quizJson.error || "Không thể tải bộ câu hỏi đọc hiểu.");
      }

      // 2. Fetch Lesson detail for header metadata
      const lessonRes = await fetch(`/api/video-catalog/lessons/${lessonId}`);
      if (lessonRes.ok) {
        const lessonJson = await lessonRes.json();
        if (lessonJson.success && lessonJson.lesson) {
          setLessonInfo({
            id: lessonJson.lesson.id,
            title: lessonJson.lesson.title,
            thumbnailUrl: lessonJson.lesson.thumbnailUrl,
            cefrLevel: lessonJson.lesson.cefrLevel,
            categoryName: lessonJson.lesson.category?.name,
          });
        }
      }
    } catch (err: any) {
      setError(err?.message || "Lỗi mạng khi tải nội dung.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lessonId) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsAnswerSubmitted(false);
      setIsQuizCompleted(false);
      setSummaryResult(null);
      fetchQuizAndLesson();
    }
  }, [lessonId]);

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
            awardXp(data.summary.xpEarned);
            addToast({
              title: "Chúc mừng!",
              message: `Bạn đã nhận được +${data.summary.xpEarned} XP Đọc hiểu Video!`,
              type: "success",
            });
          }
        }
      } catch (err) {
        console.warn("Quiz submit error:", err);
      }
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsQuizCompleted(false);
    setSummaryResult(null);
  };

  const effectiveTitle = lessonInfo?.title || quizData?.lessonTitle || initialTitle || "Bài học video";
  const currentQ: VideoQuizQuestion | undefined = quizData?.questions?.[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQuestionIndex];
  const isSelected = typeof userSelected === "number";

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24">
      {/* 1. TOP HEADER WITH APPTOPHEADER & STUDYSUITE NAV */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-3">
            <Link
              href={onBackUrl}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] hover:border-[#0059bb]/50 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại video</span>
            </Link>
          </div>
        }
      >
        <StudySuiteNavTabs />
      </AppTopHeader>

      {/* 2. SUB-BAR BREADCRUMB & BACK NAVIGATION */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href={onBackUrl}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center group-hover:border-[#0059bb]/50 transition-colors">
              <ArrowLeft className="w-4 h-4 stroke-[2.2] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Quay lại danh mục Video Dictation</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Phòng đọc hiểu chuyên sâu (+25 XP)</span>
          </span>
        </div>

        {/* 3. LESSON HERO CARD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            {lessonInfo?.thumbnailUrl ? (
              <div className="relative w-20 sm:w-24 aspect-video rounded-xl overflow-hidden shrink-0 border border-slate-200/70 dark:border-slate-700/60">
                <img
                  src={lessonInfo.thumbnailUrl}
                  alt={effectiveTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                <BookOpen className="w-6 h-6 stroke-[2]" />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {lessonInfo?.cefrLevel && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold font-mono bg-blue-50 dark:bg-blue-950 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/60">
                    {lessonInfo.cefrLevel}
                  </span>
                )}
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {lessonInfo?.categoryName || "Đọc hiểu video AI"}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display line-clamp-1">
                {effectiveTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <Link
              href={`/study/dictation/video?lessonId=${lessonId}`}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004899] text-white shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Học Dictation video này</span>
            </Link>
          </div>
        </div>

        {/* 4. MAIN QUIZ CONTAINER */}
        <div className="mt-5">
          {isLoading ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <ShimmerBox className="h-5 w-32 rounded-lg" />
                <ShimmerBox className="h-5 w-20 rounded-lg" />
              </div>
              <ShimmerBox className="h-10 w-full rounded-xl" />
              <div className="space-y-3 pt-3">
                <ShimmerBox className="h-14 w-full rounded-xl" />
                <ShimmerBox className="h-14 w-full rounded-xl" />
                <ShimmerBox className="h-14 w-full rounded-xl" />
                <ShimmerBox className="h-14 w-full rounded-xl" />
              </div>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 text-center shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center mb-3">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Không thể tải bài đọc hiểu
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{error}</p>
              <button
                type="button"
                onClick={fetchQuizAndLesson}
                className="px-4 py-2 rounded-xl bg-[#0059bb] text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Thử tải lại
              </button>
            </div>
          ) : isQuizCompleted && summaryResult ? (
            /* SUMMARY RESULT SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                  Hoàn thành xuất sắc bài đọc hiểu!
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Bạn đã hoàn thành toàn bộ câu hỏi trắc nghiệm ngữ cảnh cho video này.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 font-medium mb-1">Đúng</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {summaryResult.correctCount} / {quizData?.questions.length}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 font-medium mb-1">Độ chính xác</div>
                  <div className="text-xl font-black text-[#0059bb] dark:text-sky-400 font-mono">
                    {summaryResult.scorePercentage}%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 font-medium mb-1">Điểm XP</div>
                  <div className="text-xl font-black text-amber-500 font-mono">
                    +{summaryResult.xpEarned} XP
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài này</span>
                </button>

                <Link
                  href={`/study/dictation/video?lessonId=${lessonId}`}
                  className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#0059bb]/20 transition-all active:scale-95"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Chuyển sang chép chính tả video này</span>
                </Link>

                <Link
                  href={onBackUrl}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Quay lại danh mục video</span>
                </Link>
              </div>
            </motion.div>
          ) : currentQ ? (
            /* ACTIVE QUESTION VIEW */
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6">
              {/* Stepper & Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#0059bb] dark:text-sky-400 font-mono">
                    CÂU {currentQuestionIndex + 1} TRÊN {quizData?.questions.length}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {Math.round(((currentQuestionIndex + 1) / (quizData?.questions.length || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#0059bb] transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / (quizData?.questions.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                {currentQ.targetedConcept && (
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60 mb-2">
                    {currentQ.targetedConcept}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed font-sans">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isOptSelected = userSelected === optIdx;
                  const isCorrectOpt = optIdx === currentQ.correctAnswer;

                  let borderClass =
                    "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900";
                  let radioClass =
                    "border-slate-300 dark:border-slate-600 text-slate-500";

                  if (isAnswerSubmitted) {
                    if (isCorrectOpt) {
                      borderClass =
                        "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100";
                      radioClass = "border-emerald-500 bg-emerald-500 text-white";
                    } else if (isOptSelected && !isCorrectOpt) {
                      borderClass =
                        "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100";
                      radioClass = "border-rose-500 bg-rose-500 text-white";
                    } else {
                      borderClass =
                        "border-slate-200 dark:border-slate-800 opacity-60 bg-white dark:bg-slate-900";
                    }
                  } else if (isOptSelected) {
                    borderClass =
                      "border-[#0059bb] bg-blue-50/50 dark:bg-blue-950/30 shadow-xs ring-1 ring-[#0059bb]";
                    radioClass = "border-[#0059bb] bg-[#0059bb] text-white";
                  }

                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer select-none ${borderClass}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 transition-colors ${radioClass}`}
                      >
                        {isAnswerSubmitted && isCorrectOpt ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : isAnswerSubmitted && isOptSelected && !isCorrectOpt ? (
                          <XCircle className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          letter
                        )}
                      </div>

                      <div className="flex-1 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout (Shown when Answer Submitted) */}
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    userSelected === currentQ.correctAnswer
                      ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-100"
                      : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/60 text-rose-950 dark:text-rose-100"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {userSelected === currentQ.correctAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-1">
                        {userSelected === currentQ.correctAnswer
                          ? "Chính xác!"
                          : "Chưa đúng! Đáp án đúng là " +
                            String.fromCharCode(65 + currentQ.correctAnswer)}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons: Single Primary Button Rule 18 */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-medium">
                  {isAnswerSubmitted
                    ? "Nhấn tiếp tục để chuyển câu tiếp theo"
                    : isSelected
                    ? "Đã chọn đáp án"
                    : "Chọn 1 đáp án để kiểm tra"}
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={!isSelected}
                    onClick={handleCheckAnswer}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                      isSelected
                        ? "bg-[#0059bb] hover:bg-blue-700 text-white active:scale-95 shadow-[#0059bb]/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0059bb]/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>
                      {currentQuestionIndex < (quizData?.questions.length || 0) - 1
                        ? "Câu tiếp theo"
                        : "Xem kết quả"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
