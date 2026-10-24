"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { Volume2, Turtle } from "lucide-react";
import { XP_CHARACTERS } from "@/features/games/data/characterRoster";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { PracticeWord, SubMode } from "../types";

interface PracticeCompanionSpeechProps {
  currentWord: PracticeWord;
  subMode: SubMode;
  characterIdx?: number;
  isAnswered?: boolean;
  isCorrect?: boolean;
  onPlayAudio?: (word: string, rate?: number) => void;
}

export function PracticeCompanionSpeech({
  currentWord,
  subMode,
  characterIdx = 1, // Default: Cô Linh (AI Tutor)
  isAnswered = false,
  isCorrect = false,
  onPlayAudio,
}: PracticeCompanionSpeechProps) {
  const activeCharacter = XP_CHARACTERS[characterIdx % XP_CHARACTERS.length] || XP_CHARACTERS[0];

  const speak = useCallback(
    (rate: number = 0.9) => {
      if (onPlayAudio) {
        onPlayAudio(currentWord.word, rate);
      } else {
        safeSpeakText(currentWord.word, { lang: "en-US", rate });
      }
    },
    [currentWord.word, onPlayAudio]
  );

  // Keyboard hotkeys: 'A' for normal, 'S' for slow turtle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        speak(0.9);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        speak(0.65);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [speak]);

  // Contextual speech text based on mode and answered state
  const speechData = useMemo(() => {
    if (isAnswered) {
      if (isCorrect) {
        return {
          prompt: "Xuất sắc! Bạn đã trả lời hoàn toàn chính xác.",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      }
      return {
        prompt: "Chưa đúng rồi! Cùng nghe lại để ghi nhớ nhé.",
        targetWord: currentWord.word,
        ipa: currentWord.ipa,
      };
    }

    switch (subMode) {
      case "quiz":
        return {
          prompt: "Chọn nghĩa tiếng Việt chính xác của:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      case "flashcard":
        return {
          prompt: "Lật thẻ và tự đánh giá độ thuộc từ:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      case "writing":
        return {
          prompt: "Gõ chính xác từ tiếng Anh mang nghĩa:",
          targetWord: `"${currentWord.meaning}"`,
          ipa: undefined,
        };
      case "speaking":
        return {
          prompt: "Nhấn Micro và phát âm chuẩn từ:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      default:
        return {
          prompt: "Luyện tập từ vựng:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
    }
  }, [subMode, currentWord, isAnswered, isCorrect]);

  const promptWords = useMemo(() => speechData.prompt.split(/\s+/), [speechData.prompt]);

  return (
    <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full select-none">
      {/* 1. 3D Character Avatar (Free-standing without box container) */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="relative w-20 h-26 sm:w-28 sm:h-36 lg:w-30 lg:h-38 flex items-end justify-center pointer-events-none">
          {/* Soft floor shadow */}
          <div className="absolute bottom-0 w-16 sm:w-22 lg:w-24 h-2.5 sm:h-3 rounded-[100%] bg-slate-400/25 dark:bg-black/40 blur-[2px]" />
          <img
            src={activeCharacter.avatarUrl}
            alt={activeCharacter.name}
            className="relative max-h-full w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.14)] transition-transform hover:scale-105 duration-200"
            loading="eager"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
          {activeCharacter.name}
        </span>
      </div>

      {/* 2. Speech Bubble (SentenceBuilder & WordLink style) */}
      <div className="relative flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3.5 px-3.5 py-3 sm:px-5 sm:py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
        {/* Triangular tail pointing left to avatar */}
        <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200 dark:border-slate-700" />

        {/* Direct Audio Controls: Normal Loa (phím A) & Slow Rùa (phím S) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => speak(0.9)}
            title={`Nghe giọng ${activeCharacter.name} - Tốc độ chuẩn (Phím A)`}
            aria-label="Nghe phát âm chuẩn"
            className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
          >
            <Volume2 className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" />
          </button>
          <button
            type="button"
            onClick={() => speak(0.65)}
            title="Nghe phát âm chậm rãi (Phím S)"
            aria-label="Nghe phát âm chậm rãi"
            className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
          >
            <Turtle className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" />
          </button>
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-[1.5px] bg-slate-200 dark:bg-slate-700 shrink-0" />

        {/* Speech text & target word */}
        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-snug">
            {promptWords.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="border-b-2 border-dashed border-slate-300 dark:border-slate-600 mr-1 inline-block leading-snug"
              >
                {w}
              </span>
            ))}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap pt-0.5">
            <span className="text-lg sm:text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              {speechData.targetWord}
            </span>
            {speechData.ipa && (
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400">
                {speechData.ipa}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
