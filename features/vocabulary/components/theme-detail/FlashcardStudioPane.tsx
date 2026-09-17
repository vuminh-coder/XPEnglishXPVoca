"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Heart,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle,
} from "lucide-react";

export interface FlashcardVocabData {
  id: string;
  word: string;
  pos: string;
  phonetic?: string;
  definitionVn: string;
  definition?: string;
  examples?: string[];
}

export interface FlashcardStudioPaneProps {
  activeVocab: FlashcardVocabData;
  currentIndex: number;
  totalVocabs: number;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean | ((prev: boolean) => boolean)) => void;
  isWordMasked: boolean;
  setIsWordMasked: (masked: boolean | ((prev: boolean) => boolean)) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSpeak: (word: string) => void;
  onMarkLearned: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

function getMaskedWord(word: string) {
  if (!word) return "";
  return word
    .split("")
    .map((char, i) => (i === 0 || i === word.length - 1 || char === " " ? char : "_ "))
    .join("");
}

export function FlashcardStudioPane({
  activeVocab,
  currentIndex,
  totalVocabs,
  isFlipped,
  setIsFlipped,
  isWordMasked,
  setIsWordMasked,
  isFavorite,
  onToggleFavorite,
  onSpeak,
  onMarkLearned,
  onPrev,
  onNext,
  onShuffle,
}: FlashcardStudioPaneProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* 3D Perspective Flashcard Container */}
      <div className="perspective-[1500px] w-full">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 75, damping: 16 }}
          className="relative w-full min-h-[300px] sm:min-h-[330px] rounded-2xl cursor-pointer select-none [transform-style:preserve-3d] shadow-sm hover:shadow-xl transition-shadow duration-300"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT SIDE */}
          <div
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-slate-200/90 dark:border-slate-800 [backface-visibility:hidden]"
            style={{ transform: "rotateY(0deg)" }}
          >
            {/* Upper Card Header Row */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                  {activeVocab.pos}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                  CEFR B1
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWordMasked(!isWordMasked);
                  }}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isWordMasked
                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                      : "text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  title={isWordMasked ? "Hiện từ" : "Ẩn bớt ký tự"}
                >
                  {isWordMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(activeVocab.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                  title="Yêu thích"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "text-rose-500 fill-rose-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Main Word Center Display */}
            <div className="my-auto py-3 space-y-2">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                {isWordMasked ? getMaskedWord(activeVocab.word) : activeVocab.word}
              </h2>

              {activeVocab.phonetic && (
                <div className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium tracking-wide">
                  {activeVocab.phonetic}
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(activeVocab.word);
                }}
                className="h-11 px-6 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-[#0059bb] dark:hover:bg-[#0059bb] border border-blue-200/80 dark:border-blue-800/80 hover:border-[#0059bb] text-[#0059bb] hover:text-white dark:text-sky-300 dark:hover:text-white font-bold text-xs sm:text-sm shadow-2xs hover:shadow-md hover:shadow-[#0059bb]/20 transition-all duration-300 inline-flex items-center gap-2.5 group cursor-pointer mt-1 active:scale-95"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 group-hover:bg-white/20 flex items-center justify-center text-[#0059bb] dark:text-sky-300 group-hover:text-white transition-colors">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <span>Phát âm chuẩn bản xứ</span>
              </button>
            </div>

            {/* Bottom Flip Hint */}
            <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center">
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 opacity-80">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nhấp vào thẻ hoặc bấm phím Space để lật xem nghĩa</span>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-[#ebf3fe] to-indigo-50/80 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-[#0059bb]/30 dark:border-slate-800 [backface-visibility:hidden] shadow-sm"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Back Upper Header */}
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                Nghĩa Tiếng Việt
              </span>

              <span className="text-xs font-medium text-slate-400">
                Nhấp để lật lại
              </span>
            </div>

            {/* Back Main Content */}
            <div className="my-auto py-2 space-y-2.5 max-w-md">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                {activeVocab.definitionVn}
              </h3>

              {activeVocab.definition && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {activeVocab.definition}
                </p>
              )}

              {activeVocab.examples?.[0] && (
                <div className="bg-white/90 dark:bg-slate-850 px-4 py-3 rounded-xl border border-blue-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium shadow-2xs text-left">
                  &quot;{activeVocab.examples[0]}&quot;
                </div>
              )}
            </div>

            {/* Back Footer Action - Equal Width Buttons */}
            <div className="w-full pt-3 border-t border-blue-200/40 dark:border-slate-800 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(activeVocab.word);
                }}
                className="w-full h-11 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold transition-all border border-slate-200/90 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-[#0059bb]" />
                <span>Nghe Lại (P)</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkLearned(activeVocab.id);
                }}
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Đã Thuộc +15 XP</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flashcard Bottom Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="h-11 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-2xs"
        >
          <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5] text-slate-700 dark:text-slate-200" />
          <span>Từ Trước</span>
        </button>

        {/* Center: Shuffle & Counter */}
        <div className="flex items-center justify-center gap-2">
          {/* Shuffle Button */}
          <button
            type="button"
            onClick={onShuffle}
            className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <Shuffle className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold">Trộn Thẻ</span>
          </button>

          {/* Counter Pill */}
          <div className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              {currentIndex + 1} <span className="text-slate-400">/</span> {totalVocabs}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="h-11 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
        >
          <span>Từ Tiếp Theo</span>
          <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
