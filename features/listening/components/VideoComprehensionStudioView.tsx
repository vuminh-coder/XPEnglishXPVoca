"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Headphones,
  Check,
  ChevronRight,
  Play,
  ListOrdered,
  Languages,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { useVideoCatalogStore } from "@/stores/videoCatalogStore";
import {
  VideoQuizData,
  VideoQuizQuestion,
} from "@/features/listening/services/videoComprehensionService";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { StudioTopHeader } from "./StudioTopHeader";
import { DictationVideoBlock } from "./DictationVideoBlock";
import { InteractiveTranscriptSidebar } from "./InteractiveTranscriptSidebar";
import {
  ShimmerBox,
  QuestionBentoCardSkeleton,
  VideoComprehensionStudioSkeleton,
} from "./LoadingSkeletons";
import type { TranscriptSentence } from "@/features/listening/utils/listeningParser";

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
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);

  // Tự động thu gọn thanh menu chính (App Sidebar) khi vào studio tương tự Dictation & Shadowing
  useEffect(() => {
    setSidebarCollapsed(true);
  }, [setSidebarCollapsed]);

  // Helper to format raw lesson data into studio format
  const formatLessonDetailData = useCallback((rawLesson: any) => {
    if (!rawLesson) return null;
    const segments: any[] = rawLesson.segments || [];
    const formattedTranscript: TranscriptSentence[] = segments.map((seg, idx) => ({
      id: idx + 1,
      orderIndex: seg.orderIndex ?? idx,
      text: seg.text,
      startTime: typeof seg.startTime === "number" ? seg.startTime : 0,
      endTime: typeof seg.endTime === "number" ? seg.endTime : (seg.startTime ? seg.startTime + 4 : 4),
      translation: seg.translationVi || seg.translation || "",
      translationVi: seg.translationVi || seg.translation || "",
      vietnamese: seg.translationVi || seg.translation || "",
      ipa: seg.ipaUs || seg.ipa || "",
      speaker: seg.speaker || "Speaker",
    }));

    return {
      id: rawLesson.id,
      slug: rawLesson.slug,
      title: rawLesson.title,
      externalId: rawLesson.externalId,
      sourceType: rawLesson.sourceType || "YOUTUBE",
      audioUrl: rawLesson.externalId
        ? `https://www.youtube.com/watch?v=${rawLesson.externalId}`
        : rawLesson.audioUrl,
      youtubeUrl: rawLesson.externalId
        ? `https://www.youtube.com/watch?v=${rawLesson.externalId}`
        : rawLesson.youtubeUrl,
      thumbnailUrl: rawLesson.thumbnailUrl,
      imageUrl: rawLesson.thumbnailUrl,
      durationSeconds: rawLesson.durationSeconds || 72,
      durationFormatted: rawLesson.durationFormatted || "01:12",
      cefrLevel: rawLesson.cefrLevel || "B2",
      category: rawLesson.category?.name || rawLesson.categoryName || "TED-Ed",
      transcript: formattedTranscript,
    };
  }, []);

  // 1. Data states (Synchronous cache-first initialization for 0ms frame-0 render)
  const initialCachedQuiz = useMemo(() => {
    return useVideoCatalogStore.getState().quizCache[lessonId]?.data || null;
  }, [lessonId]);

  const initialCachedDetail = useMemo(() => {
    const raw = useVideoCatalogStore.getState().lessonDetailCache[lessonId]?.data || null;
    return formatLessonDetailData(raw);
  }, [lessonId, formatLessonDetailData]);

  const [quizData, setQuizData] = useState<VideoQuizData | null>(initialCachedQuiz);
  const [lessonDetail, setLessonDetail] = useState<{
    id: string;
    slug?: string;
    title: string;
    externalId?: string;
    sourceType?: string;
    audioUrl?: string;
    youtubeUrl?: string;
    thumbnailUrl?: string;
    imageUrl?: string;
    durationSeconds?: number;
    durationFormatted?: string;
    cefrLevel?: string;
    category?: string;
    transcript: TranscriptSentence[];
  } | null>(initialCachedDetail);
  const [isLoading, setIsLoading] = useState<boolean>(!initialCachedDetail && !initialCachedQuiz);
  const [error, setError] = useState<string | null>(null);

  // Recommended lessons list for right sidebar
  const [recommendedLessons, setRecommendedLessons] = useState<any[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);

  // 2. Playback / Media Sync States
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentVolume, setCurrentVolume] = useState<number>(1);

  // 4. Quiz State
  const [quizLang, setQuizLang] = useState<"en" | "vi">("en");
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [completedSentences, setCompletedSentences] = useState<Record<number, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [summaryResult, setSummaryResult] = useState<{
    correctCount: number;
    scorePercentage: number;
    xpEarned: number;
  } | null>(null);

  // Mobile layout tab switcher: "video_quiz" vs "transcript"
  const [mobileTab, setMobileTab] = useState<"video_quiz" | "transcript">("video_quiz");

  // Fetch quiz, lesson details, and recommended lessons with SWR cache
  const fetchAllData = useCallback(async (options?: { forceRefresh?: boolean }) => {
    const hasData = Boolean(
      useVideoCatalogStore.getState().lessonDetailCache[lessonId]?.data ||
      useVideoCatalogStore.getState().quizCache[lessonId]?.data
    );
    if (!hasData || options?.forceRefresh) {
      setIsLoading(true);
    }
    setError(null);
    try {
      // 1. Fetch Quiz data via store
      const fetchedQuiz = await useVideoCatalogStore.getState().fetchQuiz(lessonId, options);
      if (fetchedQuiz) {
        setQuizData(fetchedQuiz);
      }

      // 2. Fetch Lesson Detail via store
      const rawLesson = await useVideoCatalogStore.getState().fetchLessonDetail(lessonId, options);
      if (rawLesson) {
        const formatted = formatLessonDetailData(rawLesson);
        setLessonDetail(formatted);
      } else if (!fetchedQuiz) {
        setError("Không thể tải thông tin bài học video này.");
      }

      // 3. Fetch Recommended Lessons for right sidebar
      try {
        const catalogLessons = await useVideoCatalogStore.getState().fetchLessons({}, options);
        if (catalogLessons && catalogLessons.length > 0) {
          setRecommendedLessons(
            catalogLessons
              .filter((l: any) => l.id !== lessonId)
              .map((l: any) => ({
                id: l.id,
                title: l.title,
                level: l.cefrLevel || "B2",
                category: l.category?.name || "Video",
                duration: l.durationFormatted || "02:00",
                imageUrl: l.thumbnailUrl,
                thumbnailUrl: l.thumbnailUrl,
                transcript: [],
              }))
          );
        } else {
          setRecommendedLessons(
            MOCK_VIDEO_LESSONS.filter((m) => m.id !== lessonId).slice(0, 8).map((m) => ({
              id: m.id,
              title: m.title,
              level: m.cefrLevel || "B2",
              category: m.categoryName || "TED-Ed",
              duration: m.durationFormatted || "01:30",
              imageUrl: m.thumbnailUrl,
              thumbnailUrl: m.thumbnailUrl,
              transcript: m.segments || [],
            }))
          );
        }
      } catch {
        setRecommendedLessons(
          MOCK_VIDEO_LESSONS.filter((m) => m.id !== lessonId).slice(0, 8).map((m) => ({
            id: m.id,
            title: m.title,
            level: m.cefrLevel || "B2",
            category: m.categoryName || "TED-Ed",
            duration: m.durationFormatted || "01:30",
            imageUrl: m.thumbnailUrl,
            thumbnailUrl: m.thumbnailUrl,
            transcript: m.segments || [],
          }))
        );
      }
    } catch (err: any) {
      setError(err?.message || "Lỗi tải bài đọc hiểu");
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, formatLessonDetailData]);

  useEffect(() => {
    if (lessonId) {
      setCurrentSentenceIndex(0);
      setSentencePlaybackTime(0);
      setIsPlaying(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsAnswerSubmitted(false);
      setIsQuizCompleted(false);
      setSummaryResult(null);
      setCompletedSentences({});
      fetchAllData();
    }
  }, [lessonId, fetchAllData]);

  // Derived current sentence
  const currentSentence = useMemo(() => {
    if (!lessonDetail?.transcript || lessonDetail.transcript.length === 0) return null;
    return lessonDetail.transcript[currentSentenceIndex] || lessonDetail.transcript[0];
  }, [lessonDetail, currentSentenceIndex]);

  // Derived sentence duration
  const sentenceDuration = useMemo(() => {
    if (!currentSentence) return 6;
    const start = currentSentence.startTime ?? 0;
    const end = currentSentence.endTime ?? start + 6;
    return Math.max(1, end - start);
  }, [currentSentence]);

  const totalSentencesCount = lessonDetail?.transcript?.length || 0;

  // Media Player Handlers
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handlePrevSentence = useCallback(() => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex((prev) => prev - 1);
      setSentencePlaybackTime(0);
      setIsPlaying(true);
    }
  }, [currentSentenceIndex]);

  const handleNextSentence = useCallback(() => {
    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setSentencePlaybackTime(0);
      setIsPlaying(true);
    }
  }, [currentSentenceIndex, totalSentencesCount]);

  const handleSentenceEnded = useCallback(() => {
    setIsPlaying(false);
    setSentencePlaybackTime(0);
    setCompletedSentences((prev) => ({ ...prev, [currentSentenceIndex]: true }));
  }, [currentSentenceIndex]);

  const handleResetProgress = useCallback(() => {
    setCompletedSentences({});
    addToast({
      type: "info",
      title: "Đã đặt lại tiến độ bài học",
    });
  }, [addToast]);

  // Shuffle Recommendations
  const handleShuffleRecommendations = useCallback(() => {
    setIsLoadingRecommendations(true);
    setTimeout(() => {
      setRecommendedLessons((prev) => [...prev].sort(() => 0.5 - Math.random()));
      setIsLoadingRecommendations(false);
      addToast({
        type: "info",
        title: "Đã làm mới danh sách bài học đề xuất",
      });
    }, 250);
  }, [addToast]);

  // Quiz Interaction Handlers
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
    setCompletedSentences({});
  };

  const effectiveTitle =
    lessonDetail?.title || quizData?.lessonTitle || initialTitle || "Bài học video";
  const currentQ: VideoQuizQuestion | undefined = quizData?.questions?.[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQuestionIndex];
  const isSelected = typeof userSelected === "number";

  // Bilingual derived contents based on active quizLang
  const currentQuestionText = useMemo(() => {
    if (!currentQ) return "";
    return quizLang === "en"
      ? currentQ.questionEn || currentQ.question
      : currentQ.questionVi || currentQ.question;
  }, [currentQ, quizLang]);

  const currentOptions = useMemo(() => {
    if (!currentQ) return [];
    if (quizLang === "en") {
      return currentQ.optionsEn && currentQ.optionsEn.length === currentQ.options.length
        ? currentQ.optionsEn
        : currentQ.options;
    }
    return currentQ.optionsVi && currentQ.optionsVi.length === currentQ.options.length
      ? currentQ.optionsVi
      : currentQ.options;
  }, [currentQ, quizLang]);

  const currentExplanation = useMemo(() => {
    if (!currentQ) return "";
    return quizLang === "en"
      ? currentQ.explanationEn || currentQ.explanation
      : currentQ.explanationVi || currentQ.explanation;
  }, [currentQ, quizLang]);

  // Toàn bộ màn hình Skeleton chuẩn xác khi chưa có dữ liệu bài học
  if (isLoading && !lessonDetail) {
    return <VideoComprehensionStudioSkeleton />;
  }

  return (
    <div className="w-full h-screen min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans select-none overflow-hidden">
      {/* 1. STUDIO TOP HEADER (UNIFIED WITH DICTATION & SHADOWING) */}
      <StudioTopHeader
        title={effectiveTitle}
        level={lessonDetail?.cefrLevel || "B2"}
        currentMode="listening"
        lessonQueryId={lessonId}
        onBack={() => router.push(onBackUrl)}
        showAccentSwitcher={false}
      />

      {/* MOBILE TAB SWITCHER (< lg) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-2 shrink-0 z-20">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 w-full">
          <button
            type="button"
            onClick={() => setMobileTab("video_quiz")}
            className={`relative flex-1 py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mobileTab === "video_quiz"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span>
              Video & Đọc hiểu (
              {quizData?.questions?.length
                ? `${currentQuestionIndex + 1}/${quizData.questions.length}`
                : "..."}
              )
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("transcript")}
            className={`relative flex-1 py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              mobileTab === "transcript"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5 text-slate-500" />
            <span>Phụ đề & Gợi ý ({totalSentencesCount})</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-hidden">
        {/* CỘT TRÁI / CHÍNH: KHỐI VIDEO SÁT 100% TỪ DICTATION + CÂU HỎI ĐỌC HIỂU */}
        <div
          className={`flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar ${
            mobileTab === "video_quiz" ? "block" : "hidden lg:block"
          }`}
        >
          {/* KHỐI 1: KHỐI CHỨA VIDEO SÁT 100% DICTATION */}
          {isLoading && !lessonDetail ? (
            <div className="w-full aspect-video flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-6 space-y-3">
              <ShimmerBox className="w-3/4 h-8 rounded-xl" />
              <ShimmerBox className="w-1/2 h-4 rounded-lg" />
            </div>
          ) : lessonDetail && currentSentence ? (
            <DictationVideoBlock
              currentLesson={lessonDetail}
              currentSentence={currentSentence}
              currentSentenceIndex={currentSentenceIndex}
              totalSentencesCount={totalSentencesCount}
              sentencePlaybackTime={sentencePlaybackTime}
              setSentencePlaybackTime={setSentencePlaybackTime}
              sentenceDuration={sentenceDuration}
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
              volume={currentVolume}
              onVolumeChange={setCurrentVolume}
              onTogglePlay={handleTogglePlay}
              onPrev={handlePrevSentence}
              onNext={handleNextSentence}
              onSentenceEnded={handleSentenceEnded}
              onRewindAudioSpeech={() => {
                setSentencePlaybackTime(0);
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 30);
                addToast({ type: "info", title: "Phát lại câu từ đầu" });
              }}
              onToast={addToast}
              showMetaBar={false}
              showToolbar={false}
            />
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              Không thể tải video từ danh mục
            </div>
          )}

          {/* KHỐI 2: DƯỚI KHỐI VIDEO - TRÌNH BÀY CÁC CÂU HỎI ĐỌC HIỂU */}
          <div className="w-full pb-8">
            {isLoading ? (
              <QuestionBentoCardSkeleton />
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
                  onClick={() => fetchAllData({ forceRefresh: true })}
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
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center shadow-2xs">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {quizLang === "en"
                      ? "Comprehension Quiz Completed!"
                      : "Hoàn thành xuất sắc bài đọc hiểu!"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                    {quizLang === "en"
                      ? "You have completed all contextual multiple-choice questions for this talk."
                      : "Bạn đã giải đáp trọn vẹn các câu hỏi trắc nghiệm ngữ cảnh xoay quanh bài diễn thuyết này."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {quizLang === "en" ? "Correct" : "Đúng"}
                    </div>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {summaryResult.correctCount} / {quizData?.questions.length}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {quizLang === "en" ? "Accuracy" : "Độ chính xác"}
                    </div>
                    <div className="text-xl font-black text-[#0059bb] dark:text-sky-400 font-mono">
                      {summaryResult.scorePercentage}%
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {quizLang === "en" ? "Reward" : "Điểm thưởng"}
                    </div>
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
                    <span>{quizLang === "en" ? "Retake Quiz" : "Làm lại bài này"}</span>
                  </button>

                  <Link
                    href={`/study/dictation/video?lessonId=${lessonId}`}
                    className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#0059bb]/20 transition-all active:scale-95"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>
                      {quizLang === "en"
                        ? "Practice Dictation on this video"
                        : "Chuyển sang chép chính tả video này"}
                    </span>
                  </Link>

                  <Link
                    href={onBackUrl}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{quizLang === "en" ? "Back to Catalog" : "Quay lại danh mục"}</span>
                  </Link>
                </div>
              </motion.div>
            ) : currentQ ? (
              /* ACTIVE QUESTION BENTO CARD */
              <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5 sm:space-y-4">
                {/* 1. Header: Question Stepper & Translation Switcher */}
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-bold flex-wrap">
                    <span className="text-[#0059bb] dark:text-sky-400 font-mono tracking-wider text-xs sm:text-[13px] font-extrabold uppercase">
                      {quizLang === "en"
                        ? `QUESTION ${currentQuestionIndex + 1} OF ${quizData?.questions.length}`
                        : `CÂU ${currentQuestionIndex + 1} TRÊN ${quizData?.questions.length}`}
                    </span>

                    {/* CÔNG TẮC DỊCH ANH - VIỆT */}
                    <div
                      className="flex items-center gap-2.5 select-none"
                      title={showTranslation ? "Tắt bản dịch tiếng Việt phong cách phụ đề" : "Bật bản dịch tiếng Việt phong cách phụ đề"}
                    >
                      <div className="flex items-center gap-2">
                        <Languages className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[2.5] text-[#0059bb] dark:text-sky-400 shrink-0" />
                        <span className="text-[13.5px] sm:text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-normal font-sans">
                          Dịch Anh - Việt
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowTranslation((prev) => !prev)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center cursor-pointer ${
                          showTranslation
                            ? "bg-slate-900 dark:bg-emerald-500 justify-end"
                            : "bg-slate-200 dark:bg-slate-700 justify-start"
                        }`}
                        aria-label="Công tắc Dịch Anh - Việt"
                      >
                        <motion.div
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-4 h-4 rounded-full bg-white shadow-xs"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Clean Animated Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0059bb] rounded-full"
                      initial={false}
                      animate={{
                        width: `${
                          ((currentQuestionIndex + 1) / (quizData?.questions.length || 1)) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* 2. Question Headline */}
                <div className="pt-0 pb-0.5 space-y-1.5">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-relaxed font-sans tracking-tight">
                    {currentQ.questionEn || currentQ.question}
                  </h3>

                  {/* Phụ đề dịch sang tiếng Việt phong cách như khối phụ đề bên cạnh gợi ý bài học */}
                  <AnimatePresence>
                    {showTranslation && (currentQ.questionVi || currentSentence?.translation) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1.5 break-words"
                      >
                        {currentQ.questionVi || currentSentence?.translation || currentSentence?.vietnamese}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Multiple Choice Options */}
                <div className="space-y-2 sm:space-y-2.5">
                  {currentOptions.map((opt, optIdx) => {
                    const isOptSelected = userSelected === optIdx;
                    const isCorrectOpt = optIdx === currentQ.correctAnswer;
                    const optEnText = currentQ.optionsEn?.[optIdx] || opt;
                    const optViText = currentQ.optionsVi?.[optIdx];

                    let borderClass =
                      "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 bg-white dark:bg-slate-900";
                    let badgeClass =
                      "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80";

                    if (isAnswerSubmitted) {
                      if (isCorrectOpt) {
                        borderClass =
                          "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 shadow-xs";
                        badgeClass = "bg-emerald-500 text-white border-transparent";
                      } else if (isOptSelected && !isCorrectOpt) {
                        borderClass =
                          "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 shadow-xs";
                        badgeClass = "bg-rose-500 text-white border-transparent";
                      } else {
                        borderClass =
                          "border-slate-200/80 dark:border-slate-800 opacity-50 bg-white dark:bg-slate-900";
                        badgeClass = "bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent";
                      }
                    } else if (isOptSelected) {
                      borderClass =
                        "border-[#0059bb] bg-blue-50/60 dark:bg-blue-950/30 shadow-xs ring-1 ring-[#0059bb]";
                      badgeClass = "bg-[#0059bb] text-white border-transparent shadow-xs";
                    }

                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all flex items-start gap-3 sm:gap-3.5 cursor-pointer select-none ${borderClass}`}
                      >
                        <div
                          className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 mt-0.5 transition-colors ${badgeClass}`}
                        >
                          {isAnswerSubmitted && isCorrectOpt ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : isAnswerSubmitted && isOptSelected && !isCorrectOpt ? (
                            <XCircle className="w-4 h-4 stroke-[3]" />
                          ) : (
                            letter
                          )}
                        </div>

                        <div className="flex-1 text-sm sm:text-[15.5px] font-bold text-slate-900 dark:text-white leading-snug pt-0.5">
                          <div>{optEnText}</div>

                          {/* Phụ đề dịch tiếng Việt của từng đáp án */}
                          {showTranslation && optViText && (
                            <div className="pl-3.5 pr-2.5 py-1.5 border-l-[3px] border-[#0059bb]/60 dark:border-sky-400/60 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-lg text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-1.5 break-words">
                              {optViText}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Callout (Shown after Answer Submitted) */}
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
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold mb-1">
                          {userSelected === currentQ.correctAnswer
                            ? "Chính xác!"
                            : `Chưa đúng! Đáp án đúng là ${String.fromCharCode(
                                65 + currentQ.correctAnswer
                              )}`}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          {currentQ.explanationEn || currentQ.explanation}
                        </p>

                        {/* Phụ đề giải thích tiếng Việt */}
                        {showTranslation && currentQ.explanationVi && (
                          <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-2 break-words">
                            {currentQ.explanationVi}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. Action Footer: Single Primary Button Rule 18 */}
                <div className="pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {isAnswerSubmitted ? (
                      <span className="text-slate-500 dark:text-slate-400">
                        {quizLang === "en"
                          ? "Review the explanation above"
                          : "Xem phần giải thích chi tiết ở trên"}
                      </span>
                    ) : null}
                  </div>

                  {!isAnswerSubmitted ? (
                    <button
                      type="button"
                      disabled={!isSelected}
                      onClick={handleCheckAnswer}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                        isSelected
                          ? "bg-[#0059bb] hover:bg-blue-700 text-white cursor-pointer active:scale-95 shadow-sm shadow-[#0059bb]/20"
                          : "bg-slate-100 dark:bg-slate-800/80 text-slate-400 cursor-not-allowed border border-slate-200/60 dark:border-slate-700/60"
                      }`}
                    >
                      {quizLang === "en" ? "Check Answer" : "Kiểm tra đáp án"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0059bb]/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>
                        {currentQuestionIndex < (quizData?.questions.length || 0) - 1
                          ? quizLang === "en"
                            ? "Next Question"
                            : "Câu tiếp theo"
                          : quizLang === "en"
                          ? "View Results"
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

        {/* CỘT PHẢI: PHỤ ĐỀ TƯƠNG TÁC & GỢI Ý BÀI HỌC (InteractiveTranscriptSidebar) */}
        <div
          className={`w-full lg:w-[380px] xl:w-[410px] 2xl:w-[440px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col min-h-0 ${
            mobileTab === "transcript" ? "flex flex-1" : "hidden lg:flex"
          }`}
        >
          <InteractiveTranscriptSidebar
            transcript={lessonDetail?.transcript || []}
            currentIndex={currentSentenceIndex}
            completedSentences={completedSentences}
            isPlaying={isPlaying}
            isLoadingSentences={isLoading}
            isLoadingRecommendations={isLoadingRecommendations}
            onSelectSentence={(idx) => {
              setCurrentSentenceIndex(idx);
              setSentencePlaybackTime(0);
              setIsPlaying(true);
              setMobileTab("video_quiz");
            }}
            onReplaySentence={(idx) => {
              setCurrentSentenceIndex(idx);
              setSentencePlaybackTime(0);
              setIsPlaying(false);
              setTimeout(() => setIsPlaying(true), 40);
            }}
            onNextSentence={handleNextSentence}
            onResetProgress={handleResetProgress}
            recommendedLessons={recommendedLessons}
            completedLessonIds={[]}
            onSelectLesson={(recId) => {
              router.push(`/study/dictation/video/comprehension/${recId}`);
            }}
            onShuffleRecommendations={handleShuffleRecommendations}
            practiceMode="listening"
            showTimestamps={false}
            showProgressHeader={true}
            initialShowAllTexts={false}
          />
        </div>
      </div>
    </div>
  );
}
