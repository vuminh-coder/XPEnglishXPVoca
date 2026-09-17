"use client";

import { useEffect } from "react";
import { SubMode, QuizOption, FlashcardRating } from "../types";

interface UsePracticeKeyboardProps {
  subMode: SubMode;
  currentIndex: number;
  qIsAnswered: boolean;
  quizOptions: QuizOption[];
  handleSelectQuizOption: (opt: QuizOption) => void;
  setFIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleFlashcardRating: (rating: FlashcardRating) => void;
  sIsAnswered: boolean;
  sIsListening: boolean;
  handleStartSpeaking: () => void;
  handlePrevQuestion: () => void;
  handleNextQuestion: () => void;
}

export function usePracticeKeyboard({
  subMode,
  currentIndex,
  qIsAnswered,
  quizOptions,
  handleSelectQuizOption,
  setFIsFlipped,
  handleFlashcardRating,
  sIsAnswered,
  sIsListening,
  handleStartSpeaking,
  handlePrevQuestion,
  handleNextQuestion,
}: UsePracticeKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Quiz mode key shortcuts
      if (subMode === "quiz") {
        if (!qIsAnswered && quizOptions.length > 0) {
          const key = e.key;
          const code = e.code;
          if (key === "1" || code === "Numpad1" || key.toLowerCase() === "a") {
            e.preventDefault();
            if (quizOptions[0]) handleSelectQuizOption(quizOptions[0]);
          } else if (key === "2" || code === "Numpad2" || key.toLowerCase() === "b") {
            e.preventDefault();
            if (quizOptions[1]) handleSelectQuizOption(quizOptions[1]);
          } else if (key === "3" || code === "Numpad3" || key.toLowerCase() === "c") {
            e.preventDefault();
            if (quizOptions[2]) handleSelectQuizOption(quizOptions[2]);
          } else if (key === "4" || code === "Numpad4" || key.toLowerCase() === "d") {
            e.preventDefault();
            if (quizOptions[3]) handleSelectQuizOption(quizOptions[3]);
          }
        } else if (qIsAnswered) {
          if (
            e.key === "Enter" ||
            e.key === " " ||
            e.key === "ArrowRight" ||
            e.key === "1" ||
            e.key === "2" ||
            e.key === "3" ||
            e.key === "4"
          ) {
            e.preventDefault();
            handleNextQuestion();
          }
        }
      }

      // Flashcard mode shortcuts
      if (subMode === "flashcard") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setFIsFlipped((prev) => !prev);
        } else if (e.key === "1" || e.code === "Numpad1") {
          e.preventDefault();
          handleFlashcardRating("again");
        } else if (e.key === "2" || e.code === "Numpad2") {
          e.preventDefault();
          handleFlashcardRating("good");
        } else if (e.key === "3" || e.code === "Numpad3") {
          e.preventDefault();
          handleFlashcardRating("easy");
        }
      }

      // Speaking mode shortcuts
      if (subMode === "speaking") {
        if (!sIsAnswered && !sIsListening && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          handleStartSpeaking();
        } else if (sIsAnswered && (e.key === "Enter" || e.key === "ArrowRight")) {
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
    quizOptions,
    currentIndex,
    handleSelectQuizOption,
    handleNextQuestion,
    handlePrevQuestion,
    setFIsFlipped,
    handleFlashcardRating,
    sIsAnswered,
    sIsListening,
    handleStartSpeaking,
  ]);
}
