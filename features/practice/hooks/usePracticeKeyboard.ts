"use client";

import { useEffect } from "react";
import { SubMode, QuizOption, FlashcardRating } from "../types";

interface UsePracticeKeyboardProps {
  subMode: SubMode;
  currentIndex: number;
  qIsAnswered: boolean;
  qSelectedOpt?: string | null;
  quizOptions: QuizOption[];
  handleSelectQuizOption: (opt: QuizOption) => void;
  handleCheckQuiz?: () => void;
  fIsFlipped?: boolean;
  setFIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  onFlipCard?: () => void;
  handleFlashcardRating: (rating: FlashcardRating) => void;
  wIsAnswered?: boolean;
  handleCheckWriting?: () => void;
  sIsAnswered: boolean;
  sIsListening: boolean;
  handleStartSpeaking: () => void;
  handleToggleBookmark?: () => void;
  handlePrevQuestion: () => void;
  handleNextQuestion: () => void;
}

export function usePracticeKeyboard({
  subMode,
  currentIndex,
  qIsAnswered,
  qSelectedOpt,
  quizOptions,
  handleSelectQuizOption,
  handleCheckQuiz,
  fIsFlipped = false,
  setFIsFlipped,
  onFlipCard,
  handleFlashcardRating,
  wIsAnswered = false,
  handleCheckWriting,
  sIsAnswered,
  sIsListening,
  handleStartSpeaking,
  handleToggleBookmark,
  handlePrevQuestion,
  handleNextQuestion,
}: UsePracticeKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      const isInputFocused = activeTag === "INPUT" || activeTag === "TEXTAREA";

      // Allow Enter inside Writing input to submit or advance
      if (isInputFocused) {
        if (subMode === "writing" && e.key === "Enter") {
          e.preventDefault();
          if (wIsAnswered) {
            handleNextQuestion();
          } else {
            handleCheckWriting?.();
          }
        }
        return;
      }

      // Bookmark shortcut 'B' across all modes when not typing
      if ((e.key === "b" || e.key === "B") && subMode !== "quiz" && handleToggleBookmark) {
        e.preventDefault();
        handleToggleBookmark();
        return;
      }

      // 1. Quiz mode key shortcuts
      if (subMode === "quiz") {
        if (!qIsAnswered && quizOptions.length > 0) {
          const key = e.key;
          const code = e.code;
          if (key === "1" || code === "Numpad1") {
            e.preventDefault();
            if (quizOptions[0]) handleSelectQuizOption(quizOptions[0]);
          } else if (key === "2" || code === "Numpad2") {
            e.preventDefault();
            if (quizOptions[1]) handleSelectQuizOption(quizOptions[1]);
          } else if (key === "3" || code === "Numpad3") {
            e.preventDefault();
            if (quizOptions[2]) handleSelectQuizOption(quizOptions[2]);
          } else if (key === "4" || code === "Numpad4") {
            e.preventDefault();
            if (quizOptions[3]) handleSelectQuizOption(quizOptions[3]);
          } else if ((key === "Enter" || key === " ") && qSelectedOpt) {
            e.preventDefault();
            handleCheckQuiz?.();
          }
        } else if (qIsAnswered) {
          if (
            e.key === "Enter" ||
            e.key === " " ||
            e.key === "ArrowRight"
          ) {
            e.preventDefault();
            handleNextQuestion();
          }
        }
      }

      // 2. Flashcard mode shortcuts (Single source of truth - no duplicate listener)
      if (subMode === "flashcard") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (onFlipCard) {
            onFlipCard();
          } else {
            setFIsFlipped((prev) => !prev);
          }
        } else if ((e.key === "1" || e.code === "Numpad1") && fIsFlipped) {
          e.preventDefault();
          handleFlashcardRating("again");
        } else if ((e.key === "2" || e.code === "Numpad2") && fIsFlipped) {
          e.preventDefault();
          handleFlashcardRating("good");
        } else if ((e.key === "3" || e.code === "Numpad3") && fIsFlipped) {
          e.preventDefault();
          handleFlashcardRating("easy");
        }
      }

      // 3. Writing mode shortcuts when input becomes disabled after answering
      if (subMode === "writing" && wIsAnswered) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          handleNextQuestion();
        }
      }

      // 4. Speaking mode shortcuts
      if (subMode === "speaking") {
        if (!sIsAnswered && !sIsListening && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          handleStartSpeaking();
        } else if (sIsAnswered && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
          e.preventDefault();
          handleNextQuestion();
        }
      }

      // Left arrow for Prev Question across all modes
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        handlePrevQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    subMode,
    qIsAnswered,
    qSelectedOpt,
    quizOptions,
    currentIndex,
    handleSelectQuizOption,
    handleCheckQuiz,
    handleNextQuestion,
    handlePrevQuestion,
    fIsFlipped,
    setFIsFlipped,
    onFlipCard,
    handleFlashcardRating,
    wIsAnswered,
    handleCheckWriting,
    sIsAnswered,
    sIsListening,
    handleStartSpeaking,
    handleToggleBookmark,
  ]);
}
