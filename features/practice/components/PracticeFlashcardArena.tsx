"use client";

import React, { useEffect } from "react";
import {
  Volume2,
  RotateCw,
  Star,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
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
  isCurrentBookmarked = false,
  onToggleBookmark,
  onPlayAudio,
  onFlipCard,
  onRateFlashcard,
  onSkip,
}: PracticeFlashcardArenaProps) {
  // Global Hotkey handling: Space to flip, 1-2-3 for SRS rating, A for audio, B for bookmark
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
      } else if ((e.key === "b" || e.key === "B") && onToggleBookmark) {
        e.preventDefault();
        onToggleBookmark();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fIsFlipped, onFlipCard, onRateFlashcard, onPlayAudio, onToggleBookmark, currentWord]);

  return (
    <div className="flex-1 flex flex-col justify-between gap-2.5 sm:gap-3.5 min-h-0 select-none py-1 w-full max-w-xl mx-auto">
      {/* 3D Physical Card Deck Stage */}
      <div className="flex-1 w-full flex items-center justify-center my-auto min-h-0">
        <div className="relative w-full h-[255px] sm:h-[285px] md:h-[310px]">
          {/* Physical Stacked Deck Layers Behind Card */}
          <div className="absolute -bottom-2.5 inset-x-5 sm:inset-x-7 h-full rounded-3xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 shadow-xs pointer-events-none" />
          <div className="absolute -bottom-1.25 inset-x-2.5 sm:inset-x-3.5 h-full rounded-3xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs pointer-events-none" />

          {/* Flippable Main Card */}
          <div
            onClick={onFlipCard}
            className="relative z-10 w-full h-full [perspective:1200px] cursor-pointer group"
          >
          <div
            className={`w-full h-full rounded-3xl border-2 border-b-[5px] transition-all duration-500 [transform-style:preserve-3d] relative shadow-[0_16px_36px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)] ${
              fIsFlipped
                ? "[transform:rotateY(180deg)] bg-white dark:bg-slate-900 border-[#0059bb]/50 dark:border-blue-700/60"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400/60 dark:hover:border-blue-600/60"
            }`}
          >
            {/* FRONT SIDE (Word + Phonetics + Audio + Hint) */}
            <div className="absolute inset-0 w-full h-full p-4.5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden]">
              {/* Header Ribbon */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 border border-blue-200/70 dark:border-blue-800/70 text-[11px] font-mono font-black tracking-wider uppercase shadow-2xs">
                    {currentWord.level || "A1"}
                  </span>
                  {currentWord.type && (
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold text-[11px]">
                      {currentWord.type}
                    </span>
                  )}
                  {currentWord.topic && (
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[150px] hidden sm:inline-block">
                      {currentWord.topic}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleBookmark && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark();
                      }}
                      title={isCurrentBookmarked ? "Đã lưu vào sổ tay" : "Lưu từ vào sổ tay (Phím B)"}
                      aria-label="Lưu từ vào sổ tay"
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isCurrentBookmarked
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-300 dark:border-amber-700 shadow-2xs"
                          : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 stroke-[2.2] ${
                          isCurrentBookmarked ? "fill-amber-400 stroke-amber-500" : ""
                        }`}
                      />
                    </button>
                  )}

                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[#0059bb] transition-colors">
                    <RotateCw className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span className="hidden sm:inline">Lật thẻ</span>
                  </span>
                </div>
              </div>

              {/* Main Centerpiece (Target Word + Phonetics + Audio Pill) */}
              <div className="flex flex-col items-center justify-center space-y-2 text-center py-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                  {currentWord.word}
                </h2>

                {currentWord.ipa && (
                  <p className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-800/90 px-3 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    {currentWord.ipa}
                  </p>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(currentWord.word);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 mt-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 text-[#0059bb] dark:text-sky-300 hover:bg-[#0059bb] hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 text-xs sm:text-sm font-bold"
                  title="Nghe phát âm chuẩn (Phím A)"
                >
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                  <span>Phát âm</span>
                  <div className="flex items-center gap-0.5 ml-0.5">
                    <span className="w-0.5 h-2 bg-current rounded-full" />
                    <span className="w-0.5 h-3.5 bg-current rounded-full" />
                    <span className="w-0.5 h-2 bg-current rounded-full" />
                  </div>
                </button>
              </div>

              {/* Flip prompt hint */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 text-center">
                <RotateCw className="w-3.5 h-3.5 text-[#0059bb]" />
                <span>Chạm vào thẻ hoặc nhấn nút bên dưới để lật mặt sau</span>
              </div>
            </div>

            {/* BACK SIDE (Meaning + Context Sentence) */}
            <div className="absolute inset-0 w-full h-full p-4.5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-blue-50/50 via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 rounded-3xl">
              {/* Header Ribbon */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-800/70 text-[11px] font-mono font-black tracking-wider uppercase shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.4]" />
                  <span>Mặt sau • Giải nghĩa</span>
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleBookmark && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark();
                      }}
                      title={isCurrentBookmarked ? "Đã lưu vào sổ tay" : "Lưu từ vào sổ tay (Phím B)"}
                      aria-label="Lưu từ vào sổ tay"
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isCurrentBookmarked
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-300 dark:border-amber-700 shadow-2xs"
                          : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 stroke-[2.2] ${
                          isCurrentBookmarked ? "fill-amber-400 stroke-amber-500" : ""
                        }`}
                      />
                    </button>
                  )}

                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[#0059bb] transition-colors">
                    <RotateCw className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span className="hidden sm:inline">Mặt trước</span>
                  </span>
                </div>
              </div>

              {/* Main Centerpiece (Vietnamese Meaning + Pronunciation Reminder) */}
              <div className="flex flex-col items-center justify-center space-y-1.5 text-center py-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-[#0059bb] dark:text-sky-300 leading-snug tracking-tight">
                  {currentWord.meaning}
                </h3>

                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 font-mono">
                  <span>{currentWord.word}</span>
                  {currentWord.ipa && (
                    <>
                      <span>•</span>
                      <span>{currentWord.ipa}</span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudio(currentWord.word);
                    }}
                    title="Nghe lại phát âm"
                    className="p-1 rounded-full text-[#0059bb] hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Example sentence box */}
                {currentWord.example && (
                  <div className="w-full mt-2 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs text-left space-y-1">
                    <div className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayAudio(currentWord.example);
                        }}
                        title="Nghe câu ví dụ"
                        className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5 hover:bg-[#0059bb] hover:text-white transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                        "{currentWord.example}"
                      </p>
                    </div>
                    {currentWord.exampleVi && (
                      <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 pl-8 leading-snug">
                        {currentWord.exampleVi}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Back footer indicator */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 text-center">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Đánh giá bên dưới để xếp lịch ôn tập Spaced Repetition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* TACTILE BOTTOM ACTION CONTROLS */}
      {!fIsFlipped ? (
        <div className="w-full shrink-0 flex items-center justify-between gap-3 pt-1">
          {onSkip ? (
            <button
              type="button"
              onClick={onSkip}
              className="h-11 sm:h-12 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer active:scale-95 transition-all shrink-0"
              title="Bỏ qua từ này"
            >
              <span>Bỏ qua</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onFlipCard}
            className="flex-1 sm:max-w-xs h-11 sm:h-12 px-6 rounded-2xl bg-[#0059bb] hover:bg-blue-600 text-white font-black font-display uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-b-[4px] border-[#003d82] active:translate-y-[2px] active:border-b-2 shadow-sm transition-all cursor-pointer ml-auto"
            title="Lật thẻ để xem giải nghĩa (Phím Space)"
          >
            <RotateCw className="w-4 h-4 stroke-[2.4]" />
            <span>Lật thẻ</span>
            <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded-md bg-white/20 text-white text-[10px] font-mono font-bold ml-0.5">
              Space
            </span>
          </button>
        </div>
      ) : (
        <div className="w-full shrink-0 space-y-1.5 pt-1 animate-fade-in">
          <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Đánh giá mức độ ghi nhớ:</span>
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline-block">
              Phím tắt: 1, 2, 3
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* 1. Cần ôn lại (Again) */}
            <button
              type="button"
              onClick={() => onRateFlashcard("again")}
              className="p-2 sm:p-2.5 rounded-2xl border-2 border-b-[4px] border-rose-300 hover:border-rose-400 dark:border-rose-800/80 bg-rose-50/90 hover:bg-rose-100/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-center font-bold transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs flex flex-col items-center justify-between gap-1"
              title="Cần ôn lại trong vòng 1 ngày (Phím 1)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4.5 h-4.5 rounded-md bg-rose-200/70 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center justify-center text-[10px] font-mono font-black">
                  1
                </span>
                <span>Cần ôn lại</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="opacity-75 font-semibold">&lt; 1 ngày</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-black">
                  +5 XP
                </span>
              </div>
            </button>

            {/* 2. Đã nhớ (Good) */}
            <button
              type="button"
              onClick={() => onRateFlashcard("good")}
              className="p-2 sm:p-2.5 rounded-2xl border-2 border-b-[4px] border-blue-400 hover:border-blue-500 dark:border-blue-700 bg-blue-50/90 hover:bg-blue-100/90 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 text-center font-bold transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs flex flex-col items-center justify-between gap-1"
              title="Đã nhớ, ôn lại sau 3 ngày (Phím 2)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4.5 h-4.5 rounded-md bg-blue-200/70 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-200 flex items-center justify-center text-[10px] font-mono font-black">
                  2
                </span>
                <span>Đã nhớ</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="opacity-75 font-semibold">3 ngày</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-black">
                  +10 XP
                </span>
              </div>
            </button>

            {/* 3. Thuộc lòng (Easy) */}
            <button
              type="button"
              onClick={() => onRateFlashcard("easy")}
              className="p-2 sm:p-2.5 rounded-2xl border-2 border-b-[4px] border-emerald-400 hover:border-emerald-500 dark:border-emerald-700 bg-emerald-50/90 hover:bg-emerald-100/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-center font-bold transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs flex flex-col items-center justify-between gap-1"
              title="Đã thuộc lòng, ôn lại sau 7 ngày (Phím 3)"
            >
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-display">
                <span className="w-4.5 h-4.5 rounded-md bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-[10px] font-mono font-black">
                  3
                </span>
                <span>Thuộc lòng</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="opacity-75 font-semibold">7 ngày</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-black">
                  +15 XP
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
