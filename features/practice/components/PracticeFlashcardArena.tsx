"use client";

import React, { useEffect } from "react";
import { Volume2, RotateCw, Star } from "lucide-react";
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

const formatPos = (pos?: string) => {
  if (!pos) return "";
  const map: Record<string, string> = {
    interjection: "Thán từ",
    interj: "Thán từ",
    noun: "Danh từ",
    verb: "Động từ",
    adjective: "Tính từ",
    adj: "Tính từ",
    adverb: "Phó từ",
    adv: "Phó từ",
    preposition: "Giới từ",
    prep: "Giới từ",
    conjunction: "Liên từ",
    conj: "Liên từ",
    pronoun: "Đại từ",
  };
  return map[pos.toLowerCase()] || pos;
};

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
    <div className="flex-1 flex flex-col justify-between min-h-0 select-none py-1 sm:py-2 w-full max-w-xl mx-auto gap-3">
      {/* 1. HERO 3D FLIPPABLE FLASHCARD */}
      <div
        onClick={onFlipCard}
        className="flex-1 w-full flex items-center justify-center my-auto min-h-0 [perspective:1000px] cursor-pointer group"
      >
        <div
          className={`w-full h-[250px] sm:h-[270px] rounded-3xl border-2 border-b-[5px] transition-all duration-500 [transform-style:preserve-3d] relative shadow-[0_12px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] ${
            fIsFlipped
              ? "[transform:rotateY(180deg)] bg-white dark:bg-slate-900 border-[#0059bb]/40 dark:border-blue-700/50"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400/60 dark:hover:border-blue-600/60"
          }`}
        >
          {/* FRONT SIDE (Word + IPA + Audio + Metadata) */}
          <div className="absolute inset-0 w-full h-full p-5 sm:p-7 flex flex-col justify-between [backface-visibility:hidden] rounded-3xl">
            {/* Top Ribbon */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {currentWord.level && (
                  <span className="font-mono font-bold text-xs text-[#0059bb] dark:text-sky-400 shrink-0">
                    {currentWord.level}
                  </span>
                )}
                {currentWord.topic && (
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {currentWord.topic}
                  </span>
                )}
                {currentWord.type && (
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    • {formatPos(currentWord.type)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(currentWord.word);
                  }}
                  title="Phát âm từ vựng (Phím A)"
                  aria-label="Phát âm từ vựng"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0059bb] hover:bg-blue-50 dark:hover:bg-slate-800 dark:hover:text-sky-300 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                </button>

                {onToggleBookmark && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark();
                    }}
                    title={isCurrentBookmarked ? "Đã lưu vào sổ tay" : "Lưu vào sổ tay (Phím B)"}
                    aria-label="Lưu vào sổ tay"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      isCurrentBookmarked
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-300 dark:border-amber-700 shadow-2xs"
                        : "text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 stroke-[2.2] ${
                        isCurrentBookmarked ? "fill-amber-400 stroke-amber-500" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Word Centerpiece */}
            <div className="flex flex-col items-center justify-center space-y-2 py-1 text-center">
              <h2 className="text-4xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                {currentWord.word}
              </h2>

              {currentWord.ipa && (
                <p className="text-sm sm:text-base font-mono font-bold text-slate-600 dark:text-slate-300">
                  {currentWord.ipa}
                </p>
              )}
            </div>

            {/* Subtle bottom hint */}
            <div className="flex items-center justify-center text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <span>Chạm thẻ để lật</span>
            </div>
          </div>

          {/* BACK SIDE (Meaning + Context Example) */}
          <div className="absolute inset-0 w-full h-full p-5 sm:p-7 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-slate-900 rounded-3xl">
            {/* Top Ribbon on Back */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Giải nghĩa tiếng Việt
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(currentWord.word);
                  }}
                  title="Nghe lại phát âm (Phím A)"
                  aria-label="Phát âm từ vựng"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0059bb] hover:bg-blue-50 dark:hover:bg-slate-800 dark:hover:text-sky-300 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                </button>

                {onToggleBookmark && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark();
                    }}
                    title={isCurrentBookmarked ? "Đã lưu vào sổ tay" : "Lưu vào sổ tay (Phím B)"}
                    aria-label="Lưu vào sổ tay"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isCurrentBookmarked
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-300 dark:border-amber-700 shadow-2xs"
                        : "text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 stroke-[2.2] ${
                        isCurrentBookmarked ? "fill-amber-400 stroke-amber-500" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Meaning & Word Reminder Centerpiece */}
            <div className="flex flex-col items-center justify-center space-y-1.5 py-1 text-center">
              <h3 className="text-3xl sm:text-4xl font-black font-display text-[#0059bb] dark:text-sky-300 leading-snug tracking-tight">
                {currentWord.meaning}
              </h3>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 font-mono">
                <span>{currentWord.word}</span>
                {currentWord.ipa && (
                  <>
                    <span>•</span>
                    <span>{currentWord.ipa}</span>
                  </>
                )}
              </div>

              {/* Context example if present */}
              {currentWord.example && (
                <div className="w-full max-w-md mt-2 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-left flex items-start gap-2.5">
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
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {currentWord.exampleVi}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom spacer to maintain symmetric vertical centering */}
            <div className="h-4" />
          </div>
        </div>
      </div>

      {/* 2. DUOLINGO-STYLE TACTILE BOTTOM CONTROLS */}
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
          </button>
        </div>
      ) : (
        <div className="w-full shrink-0 pt-1 animate-fade-in">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto">
            {/* 1. Cần ôn lại */}
            <button
              type="button"
              onClick={() => onRateFlashcard("again")}
              className="h-11 sm:h-12 px-3 rounded-2xl border-2 border-b-[4px] border-rose-300 hover:border-rose-400 bg-rose-50/90 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300 font-bold flex items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Cần ôn lại (Phím 1)"
            >
              <span className="text-xs sm:text-sm font-black font-display">
                1. Cần ôn lại
              </span>
            </button>

            {/* 2. Đã nhớ */}
            <button
              type="button"
              onClick={() => onRateFlashcard("good")}
              className="h-11 sm:h-12 px-3 rounded-2xl border-2 border-b-[4px] border-blue-400 hover:border-blue-500 bg-blue-50/90 hover:bg-blue-100 text-[#0059bb] dark:bg-blue-950/40 dark:border-blue-800 dark:text-sky-300 font-bold flex items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Đã nhớ (Phím 2)"
            >
              <span className="text-xs sm:text-sm font-black font-display">
                2. Đã nhớ
              </span>
            </button>

            {/* 3. Thuộc lòng */}
            <button
              type="button"
              onClick={() => onRateFlashcard("easy")}
              className="h-11 sm:h-12 px-3 rounded-2xl border-2 border-b-[4px] border-emerald-400 hover:border-emerald-500 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center transition-all cursor-pointer active:translate-y-[2px] active:border-b-2 shadow-2xs"
              title="Thuộc lòng (Phím 3)"
            >
              <span className="text-xs sm:text-sm font-black font-display">
                3. Thuộc lòng
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
