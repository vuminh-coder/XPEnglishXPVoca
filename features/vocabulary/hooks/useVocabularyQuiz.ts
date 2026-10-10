"use client";

import { useState, useMemo, useCallback } from "react";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { useAuthStore } from "@/stores/authStore";
import { useVocabularyCatalogStore } from "@/stores/vocabularyCatalogStore";

export interface UseVocabularyQuizProps {
  themeId?: string;
  vocabs: any[];
  practiceWord: (id: string, isCorrect: boolean) => void;
  awardXp: (amount: number) => void;
  showToastMsg: (title: string, body: string) => void;
}

export function useVocabularyQuiz({
  themeId,
  vocabs,
  practiceWord,
  awardXp,
  showToastMsg,
}: UseVocabularyQuizProps) {
  // Synchronous Frame 0 probe from in-memory session store
  const session = themeId
    ? useVocabularyCatalogStore.getState().themeQuizSessions[themeId]
    : undefined;

  const [quizIndex, setQuizIndexState] = useState(() => session?.quizIndex ?? 0);
  const [quizScore, setQuizScoreState] = useState(() => session?.quizScore ?? 0);
  const [selectedAnswer, setSelectedAnswerState] = useState<number | null>(
    () => session?.selectedAnswer ?? null
  );
  const [isQuizSubmitted, setIsQuizSubmittedState] = useState(
    () => session?.isQuizSubmitted ?? false
  );
  const [quizFinished, setQuizFinishedState] = useState(
    () => session?.quizFinished ?? false
  );

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
      setSelectedAnswerState(optIndex);
      setIsQuizSubmittedState(true);

      const isCorrect = quizOptions[optIndex] === currentQuizItem.definitionVn;
      const nextScore = isCorrect ? quizScore + 1 : quizScore;
      if (isCorrect) {
        setQuizScoreState(nextScore);
        practiceWord(currentQuizItem.id, true);
        useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
        useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
      }

      if (themeId) {
        useVocabularyCatalogStore.getState().setThemeQuizSession(themeId, {
          selectedAnswer: optIndex,
          isQuizSubmitted: true,
          quizScore: nextScore,
        });
      }
    },
    [isQuizSubmitted, currentQuizItem, quizOptions, quizScore, practiceWord, themeId]
  );

  const handlePrevQuizQuestion = useCallback(() => {
    const nextIdx = quizIndex > 0 ? quizIndex - 1 : vocabs.length - 1;
    setQuizIndexState(nextIdx);
    setSelectedAnswerState(null);
    setIsQuizSubmittedState(false);
    if (themeId) {
      useVocabularyCatalogStore.getState().setThemeQuizSession(themeId, {
        quizIndex: nextIdx,
        selectedAnswer: null,
        isQuizSubmitted: false,
      });
    }
  }, [vocabs.length, quizIndex, themeId]);

  const handleNextQuizQuestion = useCallback(() => {
    if (quizIndex < vocabs.length - 1) {
      const nextIdx = quizIndex + 1;
      setQuizIndexState(nextIdx);
      setSelectedAnswerState(null);
      setIsQuizSubmittedState(false);
      if (themeId) {
        useVocabularyCatalogStore.getState().setThemeQuizSession(themeId, {
          quizIndex: nextIdx,
          selectedAnswer: null,
          isQuizSubmitted: false,
        });
      }
    } else {
      setQuizFinishedState(true);
      if (themeId) {
        useVocabularyCatalogStore.getState().setThemeQuizSession(themeId, {
          quizFinished: true,
        });
      }
      const bonusXp = quizScore * 5 + 10;
      awardXp(bonusXp);
      useUserStore.getState().addPracticeTime(3, "vocab");
      const currentUser = useAuthStore.getState().user;
      recordSkillPractice(currentUser?.id, "Từ vựng", 3, bonusXp);
      useDailyChallengeStore.getState().incrementProgress("review_cards", 1);
      useDailyChallengeStore.getState().incrementProgress("learn_words", 1);
      showToastMsg("Hoàn thành bài tập! 🎉", `Bạn đã nhận +${bonusXp} XP thưởng & +3 phút học!`);
    }
  }, [quizIndex, vocabs.length, quizScore, awardXp, showToastMsg, themeId]);

  const handleResetQuiz = useCallback(() => {
    setQuizIndexState(0);
    setQuizScoreState(0);
    setSelectedAnswerState(null);
    setIsQuizSubmittedState(false);
    setQuizFinishedState(false);
    if (themeId) {
      useVocabularyCatalogStore.getState().resetThemeQuizSession(themeId);
    }
  }, [themeId]);

  return {
    quizIndex,
    quizScore,
    selectedAnswer,
    isQuizSubmitted,
    quizFinished,
    currentQuizItem,
    quizOptions,
    handleAnswerQuiz,
    handlePrevQuizQuestion,
    handleNextQuizQuestion,
    handleResetQuiz,
  };
}
