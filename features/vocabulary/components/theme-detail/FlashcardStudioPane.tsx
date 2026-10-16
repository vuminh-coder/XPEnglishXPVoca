"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { getVocabIllustration } from "../../utils/wordImageMapper";

export interface FlashcardVocabData {
  id: string;
  word: string;
  pos: string;
  phonetic?: string;
  definitionVn: string;
  definition?: string;
  examples?: string[];
  exampleTranslations?: string[];
  synonyms?: string[];
  antonyms?: string[];
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
  theme?: {
    id?: string;
    name?: string;
    nameEn?: string;
    icon?: string;
    color?: string;
  };
  vocabs?: FlashcardVocabData[];
  onSelectWord?: (index: number) => void;
  learnedVocabIds?: Set<string>;
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
  theme,
  vocabs = [],
  onSelectWord,
  learnedVocabIds = new Set(),
}: FlashcardStudioPaneProps) {
  const [imageError, setImageError] = useState(false);
  const [showFullImageModal, setShowFullImageModal] = useState(false);
  const isLearned = learnedVocabIds.has(activeVocab.id);
  const illustrationUrl = getVocabIllustration(activeVocab.word, theme);

  return (
    <div className="space-y-4 select-none">
      {/* 2-COLUMN STAGE: 65% Interactive 3D Flashcard (Left) + 35% Clean Visual Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* =========================================================================
            LEFT COLUMN (65%): INTERACTIVE 3D FLASHCARD STAGE
           ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-3">
          
          {/* Stage Top Bar: Progress & Card Actions */}
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Từ <strong className="text-[#0059bb] dark:text-sky-400">{currentIndex + 1}</strong> / {totalVocabs}
              </span>

              {/* Progress Track */}
              <div className="w-24 sm:w-40 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0059bb] transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / Math.max(1, totalVocabs)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Actions: Mask, Shuffle, Favorite */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsWordMasked(!isWordMasked)}
                className={`p-1.5 px-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isWordMasked
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold"
                    : "text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                title="Ẩn bớt ký tự để kiểm tra trí nhớ"
              >
                {isWordMasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px]">{isWordMasked ? "Hiện từ" : "Ẩn ký tự"}</span>
              </button>

              <button
                type="button"
                onClick={onShuffle}
                className="p-1.5 px-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                title="Trộn ngẫu nhiên thẻ"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(activeVocab.id)}
                className={`p-1.5 px-2 rounded-xl border transition-colors cursor-pointer ${
                  isFavorite
                    ? "bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900/40"
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
                }`}
                title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* 3D Perspective Flashcard Container */}
          <div className="perspective-[1500px] w-full flex-1">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 75, damping: 16 }}
              className="relative w-full min-h-[320px] sm:min-h-[360px] rounded-2xl cursor-pointer select-none [transform-style:preserve-3d] shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* =========================================================================
                  FRONT SIDE: High-Impact Typography & Pronunciation
                 ========================================================================= */}
              <div
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center border border-slate-200/90 dark:border-slate-800 [backface-visibility:hidden]"
                style={{ transform: "rotateY(0deg)" }}
              >
                {/* Upper Tag */}
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-md font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {activeVocab.pos || "Từ vựng"}
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-600">
                    <RotateCcw className="w-3.5 h-3.5 text-[#0059bb]" />
                    <span>Lật thẻ (Space)</span>
                  </span>
                </div>

                {/* Center Word & Audio */}
                <div className="my-auto py-2 space-y-2.5">
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight capitalize">
                    {isWordMasked ? getMaskedWord(activeVocab.word) : activeVocab.word}
                  </h2>

                  {activeVocab.phonetic && (
                    <div className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-medium tracking-wide">
                      {activeVocab.phonetic}
                    </div>
                  )}

                  <div className="text-xl sm:text-2xl font-bold text-[#0059bb] dark:text-sky-400 font-display">
                    {activeVocab.definitionVn}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(activeVocab.word);
                    }}
                    className="h-10 px-5 rounded-xl bg-blue-50 hover:bg-[#0059bb] text-[#0059bb] hover:text-white dark:bg-blue-950/60 dark:text-sky-300 dark:hover:text-white font-bold text-xs border border-blue-200/80 dark:border-blue-800/80 transition-colors inline-flex items-center gap-2 cursor-pointer mt-1 active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 fill-current" />
                    <span>Phát âm (P)</span>
                  </button>
                </div>

                {/* Bottom Example Preview */}
                <div className="w-full pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                  {activeVocab.examples?.[0] ? (
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic line-clamp-1">
                      &quot;{activeVocab.examples[0]}&quot;
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Bấm vào thẻ hoặc phím Space để xem câu ví dụ song ngữ
                    </div>
                  )}
                </div>
              </div>

              {/* =========================================================================
                  BACK SIDE: Detailed Bilingual Context
                 ========================================================================= */}
              <div
                className="absolute inset-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left border border-slate-200/90 dark:border-slate-800 [backface-visibility:hidden] shadow-sm"
                style={{ transform: "rotateY(180deg)" }}
              >
                {/* Back Upper */}
                <div className="w-full flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Nghĩa & Câu ví dụ
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer">
                    <RotateCcw className="w-3.5 h-3.5 text-[#0059bb]" />
                    <span>Lật lại</span>
                  </span>
                </div>

                {/* Back Body */}
                <div className="my-auto py-2 space-y-2.5 overflow-y-auto max-h-[220px] pr-1 no-scrollbar">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
                      {activeVocab.definitionVn}
                    </h3>
                    {activeVocab.definition && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">
                        {activeVocab.definition}
                      </p>
                    )}
                  </div>

                  {/* Bilingual Examples */}
                  {activeVocab.examples && activeVocab.examples.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {activeVocab.examples.slice(0, 2).map((ex, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60 shadow-2xs space-y-0.5"
                        >
                          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
                            • {ex}
                          </div>
                          {activeVocab.exampleTranslations?.[idx] && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                              {activeVocab.exampleTranslations[idx]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Back Footer */}
                <div className="w-full pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(activeVocab.word);
                    }}
                    className="h-9 px-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-4 h-4 text-[#0059bb]" />
                    <span>Nghe lại (P)</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkLearned(activeVocab.id);
                    }}
                    className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Đã Thuộc +15 XP</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="h-10 px-4 sm:px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center gap-1.5 active:scale-95 shadow-2xs shrink-0"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Từ Trước</span>
            </button>

            <button
              type="button"
              onClick={() => onMarkLearned(activeVocab.id)}
              className={`h-10 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isLearned
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isLearned ? "Đã Thuộc ✓" : "Tôi Đã Thuộc (+15 XP)"}</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="h-10 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-[#0059bb]/20 font-display active:scale-95 shrink-0"
            >
              <span>Từ Tiếp Theo</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (35%): CLEAN, ARTISTIC VISUAL SHOWCASE (Zero visual pollution)
           ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
            {/* Visual Canvas: Pure Photography, No Cluttered Badges */}
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 group">
              <Image
                src={imageError ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80" : illustrationUrl}
                alt={activeVocab.word}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out select-none"
                priority
                onError={() => setImageError(true)}
              />

              {/* Minimal Top Controls */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-mono font-bold text-[10.5px] uppercase border border-white/10 shadow-xs">
                  {activeVocab.pos || "CEFR B1"}
                </span>

                <button
                  type="button"
                  onClick={() => setShowFullImageModal(true)}
                  className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/10 transition-colors cursor-pointer shadow-xs active:scale-95"
                  title="Phóng to ảnh"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Clean Bottom Caption */}
            <div className="pt-2.5 px-1 flex items-center justify-between text-xs font-medium">
              <div className="text-slate-500 dark:text-slate-400 font-mono font-semibold">
                Ảnh minh họa: <span className="font-bold text-slate-800 dark:text-slate-200 capitalize font-sans">{activeVocab.word}</span>
              </div>

              {isLearned ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã thuộc</span>
                </span>
              ) : (
                <span className="text-[#0059bb] dark:text-sky-400 font-semibold text-[11px]">
                  Đang học
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Zoom */}
      {showFullImageModal && (
        <div
          className="fixed inset-0 z-[700] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowFullImageModal(false)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[400px] sm:h-[500px]">
              <Image
                src={illustrationUrl}
                alt={activeVocab.word}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900 flex items-center justify-between text-white">
              <div>
                <h4 className="text-lg font-bold font-display capitalize">{activeVocab.word}</h4>
                <p className="text-xs text-slate-400">{activeVocab.definitionVn}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullImageModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
