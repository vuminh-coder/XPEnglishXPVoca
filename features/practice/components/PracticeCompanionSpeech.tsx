"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { Volume2, Snail } from "lucide-react";
import { XP_CHARACTERS } from "@/features/games/data/characterRoster";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { PracticeWord, SubMode } from "../types";

interface PracticeCompanionSpeechProps {
  currentWord: PracticeWord;
  subMode: SubMode;
  characterIdx?: number;
  isAnswered?: boolean;
  isCorrect?: boolean;
  fIsFlipped?: boolean;
  onPlayAudio?: (word: string, rate?: number) => void;
}

export function PracticeCompanionSpeech({
  currentWord,
  subMode,
  characterIdx = 1, // Default: Cô Linh (AI Tutor)
  isAnswered = false,
  isCorrect = false,
  fIsFlipped = false,
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
          prompt: "Chọn nghĩa đúng:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      case "flashcard":
        return {
          prompt: fIsFlipped
            ? "Đánh giá mức độ ghi nhớ để xếp lịch ôn tập ngắt quãng!"
            : "Hãy thử nhớ nghĩa và phát âm trước khi lật thẻ nhé!",
          targetWord: undefined,
          ipa: undefined,
        };
      case "writing":
        return {
          prompt: "Gõ từ mang nghĩa:",
          targetWord: `"${currentWord.meaning}"`,
          ipa: undefined,
        };
      case "speaking":
        return {
          prompt: "Phát âm chuẩn từ:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
      default:
        return {
          prompt: "Luyện từ vựng:",
          targetWord: currentWord.word,
          ipa: currentWord.ipa,
        };
    }
  }, [subMode, currentWord, isAnswered, isCorrect, fIsFlipped]);

  const promptWords = useMemo(() => speechData.prompt.split(/\s+/), [speechData.prompt]);

  return (
    <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full select-none">
      {/* 1. 3D Character Avatar (Full proportions matching Sentence Builder) */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="relative w-20 h-26 sm:w-28 sm:h-36 lg:w-32 lg:h-40 flex items-end justify-center select-none pointer-events-none">
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

      {/* 2. Speech Bubble (Matching SentenceBuilder layout & padding) */}
      <div className="relative flex-1 min-w-0 flex items-center gap-3 sm:gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
        {/* Triangular tail pointing left to avatar */}
        <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200 dark:border-slate-700" />

        {/* Direct Audio Controls: Normal Loa (phím A) & Slow Rùa (phím S) - Hide in flashcard mode to avoid duplicate controls with the card */}
        {subMode !== "flashcard" && (
          <>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => speak(0.9)}
                title={`Nghe giọng ${activeCharacter.name} - Tốc độ chuẩn (Phím A)`}
                aria-label="Nghe phát âm chuẩn"
                className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
              >
                <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => speak(0.65)}
                title="Nghe phát âm chậm rãi (Phím S)"
                aria-label="Nghe phát âm chậm rãi"
                className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
              >
                <Snail className="w-7 h-7 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" aria-hidden="true" />
              </button>
            </div>

            {/* Vertical divider */}
            <div className="h-6 sm:h-7 w-[1.5px] bg-slate-200 dark:bg-slate-700 shrink-0" />
          </>
        )}

        {/* Speech text & target word */}
        <div className="min-w-0 flex-1">
          <p
            className={`font-semibold text-slate-700 dark:text-slate-200 leading-snug ${
              speechData.targetWord
                ? "text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate"
                : "text-sm sm:text-base md:text-lg"
            }`}
          >
            {speechData.prompt}
          </p>
          {speechData.targetWord && (
            <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap pt-0.5">
              <span className="text-2xl sm:text-3xl lg:text-[32px] font-black font-display text-slate-900 dark:text-white tracking-tight leading-none">
                {speechData.targetWord}
              </span>
              {speechData.ipa && (
                <span className="text-xs sm:text-sm font-mono font-medium text-slate-500 dark:text-slate-400">
                  {speechData.ipa}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
