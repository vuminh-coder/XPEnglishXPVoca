"use client";

import React from "react";
import { Folder, Keyboard, Layers, Volume2 } from "lucide-react";
import { PracticeWord, FlashcardRating } from "../types";
import { PracticeWordMetadataRow } from "./PracticeArenaHeader";

interface PracticeFlashcardArenaProps {
  currentWord: PracticeWord;
  fIsFlipped: boolean;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (word: string) => void;
  onFlipCard: () => void;
  onRateFlashcard: (rating: FlashcardRating) => void;
}

export function PracticeFlashcardArena({
  currentWord,
  fIsFlipped,
  questionTimeLeft,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
  onFlipCard,
  onRateFlashcard,
}: PracticeFlashcardArenaProps) {
  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
      {/* 3D Flip Card Outer Container */}
      <div
        onClick={onFlipCard}
        className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/90 flex flex-col justify-between shadow-2xs relative overflow-hidden cursor-pointer select-none group"
      >
        {/* 1. TOP METADATA ROW */}
        <PracticeWordMetadataRow
          currentWord={currentWord}
          questionTimeLeft={questionTimeLeft}
          isCurrentBookmarked={isCurrentBookmarked}
          onToggleBookmark={onToggleBookmark}
          badgeLabel="Flashcard 3D SRS"
          badgeIcon={<Layers className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />}
        />

        {/* 2. CENTERPIECE DEDICATED 3D FLIPPABLE CARD */}
        <div className="flex-1 w-full flex items-center justify-center my-auto py-2 [perspective:1000px]">
          <div
            className={`w-full max-w-2xl min-h-[140px] sm:min-h-[160px] p-5 sm:p-6 rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] relative flex items-center justify-center text-center cursor-pointer select-none shadow-xs hover:border-[#0059bb]/60 ${
              fIsFlipped
                ? "[transform:rotateY(180deg)] bg-blue-50/70 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-800/60"
                : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:shadow-sm"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onFlipCard();
            }}
          >
            {/* FRONT SIDE (Từ vựng + IPA + Audio) */}
            <div className="w-full flex flex-col items-center justify-center space-y-2 [backface-visibility:hidden]">
              <div className="relative inline-flex items-center justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white tracking-tight font-display text-center">
                  {currentWord.word}
                </h2>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(currentWord.word);
                  }}
                  className="absolute left-full ml-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 border border-blue-200/60 dark:border-blue-800/40"
                  title="Nghe phát âm từ vựng"
                >
                  <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </button>
              </div>

              {currentWord.ipa && (
                <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide text-center">
                  {currentWord.ipa}
                </p>
              )}

              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 pt-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0059bb]" />
                <span className="sm:hidden">Chạm vào thẻ để lật mặt sau</span>
                <span className="hidden sm:inline">Bấm vào thẻ hoặc nhấn Space để lật mặt sau</span>
              </p>
            </div>

            {/* BACK SIDE (Giải nghĩa + Ví dụ) */}
            <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col items-center justify-center space-y-1.5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Giải nghĩa tiếng Việt
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0059bb] dark:text-sky-400 font-display leading-snug">
                {currentWord.meaning}
              </h3>
              {currentWord.example && (
                <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 max-w-lg mx-auto line-clamp-2 pt-0.5">
                  "{currentWord.example}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
          {/* Góc Trái Dưới: Chủ đề từ vựng */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span>Chủ đề:</span>
            <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {currentWord.topic || "Cảm xúc & Đời sống"}
            </span>
          </div>

          {/* Góc Phải Dưới: Phím nhanh (chỉ hiển thị trên Desktop) */}
          <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span>Phím nhanh:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlipCard();
                }}
                className="h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
                title="Lật mặt thẻ phím Space"
              >
                Space: Lật thẻ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SRS Action Zone: Flip button before flipped, 3-tier rating after flipped */}
      {!fIsFlipped ? (
        <button
          type="button"
          onClick={onFlipCard}
          className="w-full h-12 sm:h-13 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-sm sm:text-base font-black shadow-xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2.5 shrink-0"
        >
          <Layers className="w-4.5 h-4.5" />
          <span>Lật Thẻ Để Xem Nghĩa</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-xs font-bold">
            Space
          </kbd>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 shrink-0 animate-fade-in">
          {/* Button 1: Chưa nhớ (Again) */}
          <button
            type="button"
            onClick={() => onRateFlashcard("again")}
            className="p-2 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-2 shadow-2xs active:scale-95 group text-center sm:text-left"
            title="Đánh giá Chưa nhớ phím 1"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800/80 flex items-center justify-center text-[10px] sm:text-xs font-black font-mono shrink-0 shadow-2xs text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                1
              </span>
              <span className="text-[11px] sm:text-base font-bold whitespace-nowrap text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Chưa nhớ
              </span>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-mono text-[10px] sm:text-xs font-bold shrink-0 border border-rose-200/60 dark:border-rose-800/40 shadow-2xs">
              +5 XP
            </span>
          </button>

          {/* Button 2: Nhớ tốt (Good) */}
          <button
            type="button"
            onClick={() => onRateFlashcard("good")}
            className="p-2 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:border-[#0059bb]/50 dark:hover:border-blue-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-2 shadow-2xs active:scale-95 group text-center sm:text-left"
            title="Đánh giá Nhớ tốt phím 2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-[10px] sm:text-xs font-black font-mono shrink-0 shadow-2xs text-[#0059bb] dark:text-sky-400 group-hover:scale-105 transition-transform">
                2
              </span>
              <span className="text-[11px] sm:text-base font-bold whitespace-nowrap text-slate-800 dark:text-slate-200 group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
                Nhớ tốt
              </span>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono text-[10px] sm:text-xs font-bold shrink-0 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
              +10 XP
            </span>
          </button>

          {/* Button 3: Rất dễ (Easy) */}
          <button
            type="button"
            onClick={() => onRateFlashcard("easy")}
            className="p-2 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-2 shadow-2xs active:scale-95 group text-center sm:text-left"
            title="Đánh giá Rất dễ phím 3"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-[10px] sm:text-xs font-black font-mono shrink-0 shadow-2xs text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                3
              </span>
              <span className="text-[11px] sm:text-base font-bold whitespace-nowrap text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Rất dễ
              </span>
            </div>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] sm:text-xs font-bold shrink-0 border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
              +15 XP
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
