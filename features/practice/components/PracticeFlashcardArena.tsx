"use client";

import React, { useEffect } from "react";
import { Volume2, RotateCw } from "lucide-react";
import { PracticeWord, FlashcardRating } from "../types";

interface PracticeFlashcardArenaProps {
  currentWord: PracticeWord;
  fIsFlipped: boolean;
  questionTimeLeft?: number;
  isCurrentBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onPlayAudio: (word: string) => void;
  onFlipCard: () => void;
  onRateFlashcard: (rating: FlashcardRating) => void;
  onSkip?: () => void;
}

export function PracticeFlashcardArena({
  currentWord,
  fIsFlipped,
  onPlayAudio,
  onFlipCard,
  onRateFlashcard,
}: PracticeFlashcardArenaProps) {
  // Global Hotkey handling: Space to flip, 1-2-3 for SRS rating, A for audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === " ") {
        e.preventDefault();
        onFlipCard();
      } else if (e.key === "1" && fIsFlipped) {
        e.preventDefault();
        onRateFlashcard("again");
      } else if (e.key === "2" && fIsFlipped) {
        e.preventDefault();
        onRateFlashcard("good");
      } else if (e.key === "3" && fIsFlipped) {
        e.preventDefault();
        onRateFlashcard("easy");
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        onPlayAudio(currentWord.word);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fIsFlipped, onFlipCard, onRateFlashcard, onPlayAudio, currentWord]);

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 select-none py-2 w-full max-w-lg mx-auto">
      {/* 1. CLEAN HERO FLASHCARD */}
      <div
        onClick={onFlipCard}
        className="flex-1 w-full flex items-center justify-center my-auto min-h-0 [perspective:1000px] cursor-pointer group"
      >
        <div
          className={`w-full min-h-[220px] sm:min-h-[250px] p-6 sm:p-8 rounded-3xl border-2 border-b-[5px] transition-all duration-500 [transform-style:preserve-3d] relative flex items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${
            fIsFlipped
              ? "[transform:rotateY(180deg)] bg-white dark:bg-slate-900 border-[#0059bb]/40 dark:border-blue-700/50"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400/60 dark:hover:border-blue-600/60"
          }`}
        >
          {/* FRONT SIDE (Word + IPA + Audio) */}
          <div className="w-full flex flex-col items-center justify-center space-y-2.5 [backface-visibility:hidden]">
            {/* Minimal level tag */}
            {currentWord.level && (
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {currentWord.level} {currentWord.type ? `• ${currentWord.type}` : ""}
              </span>
            )}

            {/* Target Word */}
            <h2 className="text-4xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              {currentWord.word}
            </h2>

            {/* Phonetic IPA */}
            {currentWord.ipa && (
              <p className="text-sm sm:text-base font-mono font-medium text-slate-400 dark:text-slate-500">
                {currentWord.ipa}
              </p>
            )}

            {/* Clean Audio Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPlayAudio(currentWord.word);
              }}
              className="mt-1 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 hover:bg-[#0059bb] hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-xs active:scale-95"
              title="Phát âm (Phím A)"
              aria-label="Phát âm"
            >
              <Volume2 className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* BACK SIDE (Meaning + Context Example) */}
          <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col items-center justify-center space-y-2 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-slate-900 rounded-3xl">
            {/* Vietnamese Meaning */}
            <h3 className="text-3xl sm:text-4xl font-black font-display text-[#0059bb] dark:text-sky-300 leading-snug tracking-tight">
              {currentWord.meaning}
            </h3>

            {/* Context example if present */}
            {currentWord.example && (
              <div className="w-full max-w-sm mt-2 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left flex items-start gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(currentWord.example);
                  }}
                  className="w-6 h-6 rounded-md bg-blue-50 text-[#0059bb] dark:bg-blue-950/80 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5 hover:bg-[#0059bb] hover:text-white transition-colors cursor-pointer"
                  title="Nghe câu ví dụ"
                  aria-label="Nghe câu ví dụ"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    "{currentWord.example}"
                  </p>
                  {currentWord.exampleVi && (
                    <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">
                      {currentWord.exampleVi}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. STREAMLINED BOTTOM CONTROLS */}
      {!fIsFlipped ? (
        <div className="w-full shrink-0 flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={onFlipCard}
            className="w-full max-w-xs h-11 sm:h-12 rounded-2xl bg-[#0059bb] hover:bg-blue-600 text-white font-black font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-[4px] border-[#003d82] active:translate-y-[2px] active:border-b-2 shadow-xs transition-all cursor-pointer"
            title="Lật thẻ (Phím Space)"
          >
            <RotateCw className="w-4 h-4 stroke-[2.4]" />
            <span>Lật thẻ</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-white text-[10px] font-mono font-bold ml-0.5">
              Space
            </span>
          </button>
        </div>
      ) : (
        <div className="w-full shrink-0 pt-2 animate-fade-in">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
            {/* 1. Quên rồi */}
            <button
              type="button"
              onClick={() => onRateFlashcard("again")}
              className="h-12 sm:h-13 rounded-2xl border-2 border-b-[4px] border-rose-300 hover:border-rose-400 bg-rose-50/80 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-300 font-bold flex flex-col items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Cần ôn lại (Phím 1)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4 h-4 rounded bg-rose-200/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center justify-center text-[10px] font-mono font-black">
                  1
                </span>
                <span>Quên rồi</span>
              </div>
              <span className="text-[10px] opacity-75 font-medium">&lt; 1 ngày</span>
            </button>

            {/* 2. Đã nhớ */}
            <button
              type="button"
              onClick={() => onRateFlashcard("good")}
              className="h-12 sm:h-13 rounded-2xl border-2 border-b-[4px] border-blue-300 hover:border-blue-400 bg-blue-50/80 hover:bg-blue-100 text-[#0059bb] dark:bg-blue-950/30 dark:border-blue-900 dark:text-sky-300 font-bold flex flex-col items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Đã nhớ (Phím 2)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4 h-4 rounded bg-blue-200/80 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-200 flex items-center justify-center text-[10px] font-mono font-black">
                  2
                </span>
                <span>Đã nhớ</span>
              </div>
              <span className="text-[10px] opacity-75 font-medium">3 ngày</span>
            </button>

            {/* 3. Thuộc lòng */}
            <button
              type="button"
              onClick={() => onRateFlashcard("easy")}
              className="h-12 sm:h-13 rounded-2xl border-2 border-b-[4px] border-emerald-300 hover:border-emerald-400 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300 font-bold flex flex-col items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Thuộc lòng (Phím 3)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4 h-4 rounded bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-[10px] font-mono font-black">
                  3
                </span>
                <span>Thuộc lòng</span>
              </div>
              <span className="text-[10px] opacity-75 font-medium">7 ngày</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
