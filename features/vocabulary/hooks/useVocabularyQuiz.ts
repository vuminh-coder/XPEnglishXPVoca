"use client";

import { useState, useMemo, useCallback } from "react";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { useAuthStore } from "@/stores/authStore";

export interface UseVocabularyQuizProps {
  vocabs: any[];
  practiceWord: (id: string, isCorrect: boolean) => void;
  awardXp: (amount: number) => void;
  showToastMsg: (title: string, body: string) => void;
}

export function useVocabularyQuiz({
  vocabs,
  practiceWord,
  awardXp,
  showToastMsg,
}: UseVocabularyQuizProps) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate Quiz Options for Current Question
  const currentQuizItem = vocabs[quizIndex] || null;
  const quizOptions = useMemo(() => {
    if (!currentQuizItem || vocabs.length < 2) return [];

    let seed = (quizIndex + 1) * 41;
    const correctDef = currentQuizItem.definitionVn;
    const distractors = vocabs
      .filter((v) => v.id !== currentQuizItem.id)
      .map((v) => v.definitionVn)
      .sort((a, b) => {
        const valA = Math.sin(seed++) * 10000;
        const valB = Math.sin(seed++) * 10000;
        return (valA - Math.floor(valA)) - (valB - Math.floor(valB));
      })
      .slice(0, 3);

    const all = [correctDef, ...distractors].sort((a, b) => {
      const valA = Math.sin(seed++) * 10000;
      const valB = Math.sin(seed++) * 10000;
      return (valA - Math.floor(valA)) - (valB - Math.floor(valB));
    });
    return all;
  }, [currentQuizItem, vocabs, quizIndex]);

  const handleAnswerQuiz = useCallback(
    (optIndex: number) => {
      if (isQuizSubmitted || !currentQuizItem) return;
      setSelectedAnswer(optIndex);
      setIsQuizSubmitted(true);

      const isCorrect = quizOptions[optIndex] === currentQuizItem.definitionVn;
      if (isCorrect) {
        setQuizScore((prev) => prev + 1);
        practiceWord(currentQuizItem.id, true);
        useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
        useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
      }
    },
    [isQuizSubmitted, currentQuizItem, quizOptions, practiceWord]
  );

  const handlePrevQuizQuestion = useCallback(() => {
    setQuizIndex((prev) => (prev > 0 ? prev - 1 : vocabs.length - 1));
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
  }, [vocabs.length]);

  const handleNextQuizQuestion = useCallback(() => {
    if (quizIndex < vocabs.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      const bonusXp = quizScore * 5 + 10;
      awardXp(bonusXp);
      useUserStore.getState().addPracticeTime(3, "vocab");
      const currentUser = useAuthStore.getState().user;
      recordSkillPractice(currentUser?.id, "Từ vựng", 3, bonusXp);
      useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
      useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
      showToastMsg("Hoàn thành bài tập! 🎉", `Bạn đã nhận +${bonusXp} XP thưởng & +3 phút học!`);
    }
  }, [quizIndex, vocabs.length, quizScore, awardXp, showToastMsg]);

  const handleResetQuiz = useCallback(() => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
    setQuizFinished(false);
  }, []);

  return {
    quizIndex,
    setQuizIndex,
    quizScore,
    setQuizScore,
    selectedAnswer,
    setSelectedAnswer,
    isQuizSubmitted,
    setIsQuizSubmitted,
    quizFinished,
    setQuizFinished,
    currentQuizItem,
    quizOptions,
    handleAnswerQuiz,
    handlePrevQuizQuestion,
    handleNextQuizQuestion,
    handleResetQuiz,
  };
}
