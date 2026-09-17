"use client";

import { useState, useCallback, useEffect } from "react";
import { GrammarExercise, GrammarLevel } from "../types/grammarTypes";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

interface UseGrammarExerciseProps {
  topicId: string;
  topicLevel: GrammarLevel;
  isActive: boolean;
  onSuccessGenerate?: () => void;
}

export function useGrammarExercise({
  topicId,
  topicLevel,
  isActive,
  onSuccessGenerate,
}: UseGrammarExerciseProps) {
  const { awardXp } = useUserStore();
  const { addToast } = useNotificationStore();
  const { recordQuizResult } = useGrammarProgressStore();

  const [exercises, setExercises] = useState<GrammarExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateExercises = useCallback(async () => {
    if (!topicId) return;
    setLoading(true);
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowResults(false);
    setSubmitted(false);

    try {
      const res = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId, level: topicLevel }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      if (data.exercises && data.exercises.length > 0) {
        setExercises(data.exercises);
        if (onSuccessGenerate) {
          onSuccessGenerate();
        }
      } else {
        throw new Error("No exercises returned");
      }
    } catch {
      addToast({
        type: "error",
        title: "Lỗi tạo đề",
        message: "Không thể tạo bài tập AI. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  }, [topicId, topicLevel, addToast, onSuccessGenerate]);

  const handleSelectOption = useCallback(
    (exerciseId: number, option: string) => {
      if (submitted) return;
      if (answers[exerciseId]) return;
      setAnswers((prev) => ({ ...prev, [exerciseId]: option }));
      setCheckedQuestions((prev) => ({ ...prev, [exerciseId]: true }));
    },
    [submitted, answers]
  );

  const handleSubmitQuiz = useCallback(() => {
    if (submitted || exercises.length === 0) return;
    setSubmitted(true);
    setShowResults(true);

    let correctCount = 0;
    exercises.forEach((ex) => {
      if (answers[ex.id] === ex.correctAnswer) correctCount++;
    });

    const xpEarned = correctCount * 5 + 10;
    awardXp(xpEarned, "writing");
    const currentUser = useUserStore.getState().user;
    useUserStore.getState().addPracticeTime(3, "writing");
    recordSkillPractice(currentUser?.id, "Viết", 3, xpEarned);

    // Save to grammar progress store
    recordQuizResult(topicId, correctCount, exercises.length);

    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Hoàn thành bài thi! Đúng ${correctCount}/${exercises.length} câu.`,
    });
  }, [submitted, exercises, answers, awardXp, topicId, recordQuizResult, addToast]);

  const handleNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (Object.keys(answers).length >= exercises.length) {
      handleSubmitQuiz();
    }
  }, [currentIndex, exercises.length, answers, handleSubmitQuiz]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setCheckedQuestions({});
    setShowResults(false);
    setSubmitted(false);
  }, []);

  // Keyboard navigation for Practice mode
  useEffect(() => {
    if (!isActive || exercises.length === 0 || submitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const currentEx = exercises[currentIndex];
      if (!currentEx) return;

      const isAnswered = Boolean(answers[currentEx.id]);

      if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
        return;
      }

      if (!isAnswered) {
        let optIndex = -1;
        if (e.key === "1" || e.key.toUpperCase() === "A") optIndex = 0;
        if (e.key === "2" || e.key.toUpperCase() === "B") optIndex = 1;
        if (e.key === "3" || e.key.toUpperCase() === "C") optIndex = 2;
        if (e.key === "4" || e.key.toUpperCase() === "D") optIndex = 3;

        if (optIndex >= 0 && optIndex < currentEx.options.length) {
          e.preventDefault();
          handleSelectOption(currentEx.id, currentEx.options[optIndex]);
        }
      } else {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isActive,
    exercises,
    currentIndex,
    answers,
    submitted,
    handlePrev,
    handleNext,
    handleSelectOption,
  ]);

  return {
    exercises,
    currentIndex,
    setCurrentIndex,
    answers,
    checkedQuestions,
    loading,
    showResults,
    submitted,
    generateExercises,
    handleSelectOption,
    handleSubmitQuiz,
    handleNext,
    handlePrev,
    handleReset,
  };
}
