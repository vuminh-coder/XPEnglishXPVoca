"use client";

import React from "react";
import { Layers, Volume2, Sparkles, RotateCw, Keyboard } from "lucide-react";
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
}

export function PracticeFlashcardArena({
  currentWord,
  fIsFlipped,
  onPlayAudio,
  onFlipCard,
  onRateFlashcard,
}: PracticeFlashcardArenaProps) {
  const ratingButtons: Array<{
    rating: FlashcardRating;
    label: string;
    sublabel: string;
    key: string;
    colorClass: string;
  }> = [
    {
      rating: "again",
      label: "Quên rồi",
      sublabel: "< 1 ngày",
      key: "1",
      colorClass:
        "border-rose-300 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100",
    },
    {
      rating: "good",
      label: "Đã nhớ",
      sublabel: "3 ngày",
      key: "2",
      colorClass:
        "border-blue-300 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 hover:bg-blue-100",
    },
    {
      rating: "easy",
      label: "Thuộc lòng",
      sublabel: "7 ngày",
      key: "3",
      colorClass:
        "border-emerald-300 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100",
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-h-0 select-none py-1">
      {/* 3D Flippable Card Stage */}
      <div
        onClick={onFlipCard}
        className="flex-1 w-full flex items-center justify-center my-auto [perspective:1000px] cursor-pointer"
      >
        <div
          className={`w-full min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 rounded-3xl border-2 border-b-[5px] transition-all duration-500 [transform-style:preserve-3d] relative flex items-center justify-center text-center shadow-sm ${
            fIsFlipped
              ? "[transform:rotateY(180deg)] bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb]/50 dark:border-blue-700/60"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          {/* FRONT SIDE (Word + IPA + Flip Hint) */}
          <div className="w-full flex flex-col items-center justify-center space-y-2 [backface-visibility:hidden]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0059bb]" /> Mặt trước thẻ từ vựng
            </span>

            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-display text-slate-900 dark:text-white tracking-tight">
                {currentWord.word}
              </h2>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAudio(currentWord.word);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
                title="Phát âm từ vựng"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {currentWord.ipa && (
              <p className="text-sm sm:text-base font-mono text-slate-500 dark:text-slate-400 font-bold">
                {currentWord.ipa}
              </p>
            )}

            <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              <RotateCw className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Chạm vào thẻ hoặc nhấn Space để lật mặt sau</span>
            </div>
          </div>

          {/* BACK SIDE (Vietnamese Meaning + Example) */}
          <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col items-center justify-center space-y-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
              Giải nghĩa tiếng Việt
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-black font-display text-[#0059bb] dark:text-sky-300 leading-snug">
              {currentWord.meaning}
            </h3>

            {currentWord.example && (
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 max-w-lg mx-auto line-clamp-2 pt-1">
                "{currentWord.example}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SRS Spaced Repetition Rating Buttons (Visible when flipped) */}
      {fIsFlipped ? (
        <div className="space-y-1.5 shrink-0 animate-fade-in">
          <div className="text-center text-xs font-bold text-slate-500 dark:text-slate-400">
            Đánh giá mức độ ghi nhớ của bạn (Phím 1 - 3):
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {ratingButtons.map((btn) => (
              <button
                key={btn.rating}
                type="button"
                onClick={() => onRateFlashcard(btn.rating)}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 border-b-[4px] text-center font-bold transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs ${btn.colorClass}`}
              >
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black font-display">
                  <span className="w-5 h-5 rounded-md bg-white/60 dark:bg-black/20 flex items-center justify-center text-[11px] font-mono">
                    {btn.key}
                  </span>
                  <span>{btn.label}</span>
                </div>
                <span className="text-[11px] opacity-75 font-medium block pt-0.5">
                  {btn.sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 py-2">
          <Keyboard className="w-3.5 h-3.5" />
          <span>Nhấn phím Space để lật thẻ</span>
        </div>
      )}
    </div>
  );
}
