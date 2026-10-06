"use client";

import { useState, useCallback, useEffect } from "react";
import { YouTubeVideoItem } from "@/stores/videoStore";
import {
  fetchOrGenerateVideoStudySet,
  batchSaveFlashcardsToNotebook,
  BatchSaveResult,
} from "../services/videoAiStudySetService";
import { GeneratedFlashcard, GeneratedQuiz, VideoStudySetResponse } from "@/app/api/youtube/study-set/route";
import { speakLessonText } from "@/shared/utils/ttsEngine";

export interface UseVideoStudySetProps {
  activeVideo: YouTubeVideoItem | null;
  user: { id?: string } | null;
  awardXp: (amount: number) => void;
  addToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message: string }) => void;
}

export function useVideoStudySet({
  activeVideo,
  user,
  awardXp,
  addToast,
}: UseVideoStudySetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [studySet, setStudySet] = useState<VideoStudySetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sub-tabs: 'flashcards' | 'quiz' | 'summary'
  const [subTab, setSubTab] = useState<"flashcards" | "quiz" | "summary">("flashcards");

  // Flashcards state
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(new Set());
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isSavedAll, setIsSavedAll] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; xp: number } | null>(null);

  // Reset when activeVideo changes
  useEffect(() => {
    setStudySet(null);
    setError(null);
    setSelectedCardIds(new Set());
    setFlippedCards({});
    setIsSavedAll(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  }, [activeVideo?.id]);

  // Generate or Load Study Set
  const handleGenerateStudySet = useCallback(async () => {
    if (!activeVideo) return;
    if (!activeVideo.subtitles || activeVideo.subtitles.length === 0) {
      addToast({
        type: "warning",
        title: "Chưa có phụ đề",
        message: "Video này chưa có dữ liệu phụ đề để AI phân tích. Hãy dán phụ đề SRT hoặc trích xuất trước!",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchOrGenerateVideoStudySet(activeVideo);
      setStudySet(data);
      // Select all cards by default
      const allIds = new Set(data.flashcards.map((c) => c.id));
      setSelectedCardIds(allIds);
      setIsSavedAll(false);
      addToast({
        type: "success",
        title: "Đã tạo bộ bài học AI thành công!",
        message: `Đã trích xuất ${data.flashcards.length} thẻ từ vựng và ${data.quizzes.length} câu trắc nghiệm từ video.`,
      });
    } catch (err: any) {
      const msg = err?.message || "Không thể sinh bộ thẻ từ video này.";
      setError(msg);
      addToast({
        type: "error",
        title: "Tạo bộ thẻ thất bại",
        message: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeVideo, addToast]);

  // Toggle card selection for saving
  const toggleCardSelection = useCallback((id: string) => {
    setSelectedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Select all or deselect all
  const toggleSelectAll = useCallback(() => {
    if (!studySet) return;
    if (selectedCardIds.size === studySet.flashcards.length) {
      setSelectedCardIds(new Set());
    } else {
      setSelectedCardIds(new Set(studySet.flashcards.map((c) => c.id)));
    }
  }, [studySet, selectedCardIds.size]);

  // Flip card
  const toggleFlipCard = useCallback((id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Speak word TTS
  const speakWord = useCallback((word: string) => {
    speakLessonText(word, { lessonId: "video_flashcard", rate: 1.0 });
  }, []);

  // Save selected flashcards to notebook & spaced repetition
  const handleBatchSave = useCallback(() => {
    if (!studySet || selectedCardIds.size === 0) return;
    const cardsToSave = studySet.flashcards.filter((c) => selectedCardIds.has(c.id));
    const result: BatchSaveResult = batchSaveFlashcardsToNotebook(
      cardsToSave,
      user?.id || "local_user",
      awardXp
    );

    setIsSavedAll(true);
    addToast({
      type: "success",
      title: `Đã lưu ${result.savedCount} từ mới vào Sổ Từ! (+${result.totalXpAwarded} XP)`,
      message: result.skippedCount > 0
        ? `Đã nạp ${result.savedCount} từ mới (${result.skippedCount} từ đã có trước đó) vào hệ thống ôn tập Spaced Repetition.`
        : `Tất cả ${result.savedCount} từ vựng từ video đã được đồng bộ vào sổ từ của bạn!`,
    });
  }, [studySet, selectedCardIds, user?.id, awardXp, addToast]);

  // Quiz answer selection
  const handleSelectQuizAnswer = useCallback((quizId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [quizId]: optionIndex,
    }));
  }, [quizSubmitted]);

  // Submit Quiz
  const handleSubmitQuiz = useCallback(() => {
    if (!studySet || studySet.quizzes.length === 0) return;

    let correctCount = 0;
    for (const quiz of studySet.quizzes) {
      if (quizAnswers[quiz.id] === quiz.correctAnswerIndex) {
        correctCount++;
      }
    }

    const xpEarned = correctCount * 5 + (correctCount === studySet.quizzes.length ? 10 : 0);
    if (xpEarned > 0) {
      awardXp(xpEarned);
    }

    setQuizSubmitted(true);
    setQuizScore({
      correct: correctCount,
      total: studySet.quizzes.length,
      xp: xpEarned,
    });

    addToast({
      type: correctCount === studySet.quizzes.length ? "success" : "info",
      title: `Hoàn thành Quiz Video! (+${xpEarned} XP)`,
      message: `Bạn đã trả lời đúng ${correctCount}/${studySet.quizzes.length} câu hỏi comprehension.`,
    });
  }, [studySet, quizAnswers, awardXp, addToast]);

  // Retry Quiz
  const handleRetryQuiz = useCallback(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  }, []);

  return {
    isLoading,
    studySet,
    error,
    subTab,
    setSubTab,
    selectedCardIds,
    flippedCards,
    isSavedAll,
    quizAnswers,
    quizSubmitted,
    quizScore,
    handleGenerateStudySet,
    toggleCardSelection,
    toggleSelectAll,
    toggleFlipCard,
    speakWord,
    handleBatchSave,
    handleSelectQuizAnswer,
    handleSubmitQuiz,
    handleRetryQuiz,
  };
}
