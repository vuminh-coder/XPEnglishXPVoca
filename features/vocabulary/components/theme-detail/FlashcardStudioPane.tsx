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
  Sparkles,
  Maximize2,
  CheckCircle2,
  Layers,
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
    <div className="space-y-4">
      {/* 2-COLUMN STUDIO STAGE: 35% Visual Showcase + 65% Interactive 3D Flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* =========================================================================
            LEFT COLUMN (35%): DEDICATED VISUAL SHOWCASE & THUMBNAIL QUEUE
           ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-3.5">
          {/* Main Visual Showcase (Double-Bezel Architecture) */}
          <div className="p-2.5 sm:p-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative flex flex-col justify-between overflow-hidden group">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/50 to-transparent" />

            {/* Inner Core: Visual Canvas Container */}
            <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-inner">
              <Image
                src={imageError ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80" : illustrationUrl}
                alt={activeVocab.word}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                priority
                onError={() => setImageError(true)}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 pointer-events-none" />

              {/* Top Glass Badges */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-auto">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold shadow-xs">
                  <span>{theme?.icon || "📚"}</span>
                  <span className="truncate max-w-[130px]">{theme?.name || "Chủ đề từ vựng"}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="px-2.5 py-1 rounded-full bg-[#0059bb]/80 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-[10.5px] uppercase shadow-xs">
                    CEFR B1
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFullImageModal(true)}
                    className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-white/15 text-white/90 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                    title="Xem ảnh cỡ lớn"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Visual Label: Word & Status Indicator */}
              <div className="absolute bottom-3 inset-x-3.5 z-10 text-white space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    Hình ảnh minh họa
                  </div>
                  {isLearned ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[10.5px] font-bold border border-emerald-400/40 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã thuộc</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/70 backdrop-blur-md text-white text-[10.5px] font-bold border border-blue-400/30 shadow-xs">
                      <span>Đang học</span>
                    </span>
                  )}
                </div>

                <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-white capitalize drop-shadow-md">
                  {activeVocab.word}
                </div>
                <div className="text-xs text-slate-200/90 font-medium line-clamp-1 drop-shadow-xs">
                  {activeVocab.definitionVn}
                </div>
              </div>
            </div>

            {/* Thumbnail Horizontal Preview Carousel */}
            {vocabs.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display">
                    Các từ trong bài ({currentIndex + 1}/{totalVocabs})
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Click để chọn</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                  {vocabs.map((v, idx) => {
                    const isSelected = idx === currentIndex;
                    const vLearned = learnedVocabIds.has(v.id);
                    return (
                      <button
                        key={v.id || idx}
                        type="button"
                        onClick={() => {
                          if (onSelectWord) {
                            onSelectWord(idx);
                            setIsFlipped(false);
                          }
                        }}
                        className={`h-9 px-3 rounded-xl border text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                          isSelected
                            ? "bg-[#0059bb] text-white border-[#0059bb] shadow-sm shadow-[#0059bb]/30"
                            : vLearned
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                        title={`${v.word}: ${v.definitionVn}`}
                      >
                        <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                        <span className="truncate max-w-[85px]">{v.word}</span>
                        {vLearned && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (65%): INTERACTIVE 3D FLASHCARD STAGE & EXAMPLES
           ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-3.5">
          
          {/* Quick Header Mini Toolbar of Flashcard Stage */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
            {/* Step Counter Pill & Progress */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 font-mono font-bold text-xs shrink-0">
                Thẻ {currentIndex + 1} / {totalVocabs}
              </span>

              {/* Progress Bar */}
              <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-[#10b981] transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / Math.max(1, totalVocabs)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Quick Card Controls: Mask, Favorite, Shuffle */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsWordMasked(!isWordMasked)}
                className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  isWordMasked
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    : "text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                title={isWordMasked ? "Hiện từ đầy đủ" : "Ẩn bớt ký tự để thử trí nhớ"}
              >
                {isWordMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline text-xs">{isWordMasked ? "Hiện từ" : "Ẩn ký tự"}</span>
              </button>

              <button
                type="button"
                onClick={onShuffle}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                title="Trộn ngẫu nhiên thứ tự thẻ"
              >
                <Shuffle className="w-4 h-4 text-indigo-500" />
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(activeVocab.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isFavorite
                    ? "bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900/40"
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
                }`}
                title={isFavorite ? "Bỏ yêu thích" : "Lưu vào yêu thích"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* 3D Perspective Flashcard Container */}
          <div className="perspective-[1500px] w-full flex-1">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 75, damping: 16 }}
              className="relative w-full min-h-[350px] sm:min-h-[390px] rounded-3xl cursor-pointer select-none [transform-style:preserve-3d] shadow-sm hover:shadow-xl transition-shadow duration-300"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* =========================================================================
                  FRONT SIDE: High-Impact Typography & Pronunciation
                 ========================================================================= */}
              <div
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center border border-slate-200/90 dark:border-slate-800 [backface-visibility:hidden]"
                style={{ transform: "rotateY(0deg)" }}
              >
                {/* Upper Tag Row */}
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                      {activeVocab.pos || "Từ vựng"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                      {theme?.name || "Tiếng Anh"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#0059bb]" />
                    <span>Lật thẻ (Space)</span>
                  </div>
                </div>

                {/* Center Word & Phonetics */}
                <div className="my-auto py-3 space-y-3">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-display tracking-tight capitalize">
                    {isWordMasked ? getMaskedWord(activeVocab.word) : activeVocab.word}
                  </h2>

                  {activeVocab.phonetic && (
                    <div className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-medium tracking-wide">
                      {activeVocab.phonetic}
                    </div>
                  )}

                  {/* Primary Meaning Highlight */}
                  <div className="text-lg sm:text-xl font-bold text-[#0059bb] dark:text-sky-400 font-display">
                    {activeVocab.definitionVn}
                  </div>

                  {/* Big Audio Pronunciation Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(activeVocab.word);
                    }}
                    className="h-11 px-6 rounded-2xl bg-blue-50/90 dark:bg-blue-950/60 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/80 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-md hover:shadow-[#0059bb]/20 transition-all duration-200 inline-flex items-center gap-2.5 cursor-pointer mt-2 active:scale-95"
                  >
                    <Volume2 className="w-4 h-4 fill-current" />
                    <span>Nghe phát âm chuẩn IPA (P)</span>
                  </button>
                </div>

                {/* Primary Example Snippet Preview */}
                <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {activeVocab.examples?.[0] ? (
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic line-clamp-1">
                      &quot;{activeVocab.examples[0]}&quot;
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Bấm vào thẻ hoặc phím Space để xem câu ví dụ song ngữ chi tiết
                    </div>
                  )}
                </div>
              </div>

              {/* =========================================================================
                  BACK SIDE: Comprehensive Definition & Bilingual Context
                 ========================================================================= */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-[#ebf3fe] to-indigo-50/80 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left border border-[#0059bb]/30 dark:border-slate-800 [backface-visibility:hidden] shadow-sm"
                style={{ transform: "rotateY(180deg)" }}
              >
                {/* Back Upper Header */}
                <div className="w-full flex items-center justify-between border-b border-blue-200/40 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                      Nghĩa Chi Tiết & Ngữ Cảnh
                    </span>
                    <span className="text-sm font-bold font-display text-slate-900 dark:text-white capitalize">
                      {activeVocab.word}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1 cursor-pointer">
                    <RotateCcw className="w-3.5 h-3.5 text-[#0059bb]" />
                    <span>Lật lại</span>
                  </span>
                </div>

                {/* Back Main Scrollable Body */}
                <div className="my-auto py-2.5 space-y-3 overflow-y-auto max-h-[240px] pr-1 no-scrollbar">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                      {activeVocab.definitionVn}
                    </h3>
                    {activeVocab.definition && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mt-1">
                        {activeVocab.definition}
                      </p>
                    )}
                  </div>

                  {/* Bilingual Examples */}
                  {activeVocab.examples && activeVocab.examples.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Ví dụ thực tế trong đời sống:
                      </div>
                      {activeVocab.examples.slice(0, 2).map((ex, idx) => (
                        <div
                          key={idx}
                          className="bg-white/90 dark:bg-slate-850 px-3.5 py-2.5 rounded-xl border border-blue-200/60 dark:border-slate-700/60 shadow-2xs space-y-0.5"
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

                {/* Back Footer Quick Action */}
                <div className="w-full pt-3 border-t border-blue-200/40 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(activeVocab.word);
                    }}
                    className="h-10 px-4 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2 cursor-pointer shadow-2xs"
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
                    className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Đánh dấu Đã Thuộc (+15 XP)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Studio Control Action Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              type="button"
              onClick={onPrev}
              className="h-11 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Từ Trước (←)</span>
            </button>

            {/* Quick Learned Action in Center */}
            <button
              type="button"
              onClick={() => onMarkLearned(activeVocab.id)}
              className={`h-11 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isLearned
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isLearned ? "Đã Thuộc Từ Này ✓" : "Tôi Đã Thuộc (+15 XP)"}</span>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={onNext}
              className="h-11 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white transition-all cursor-pointer text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0059bb]/20 shrink-0 font-display active:scale-95"
            >
              <span>Từ Tiếp Theo (→)</span>
              <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Image Modal Zoom (Optional Lightbox) */}
      {showFullImageModal && (
        <div
          className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowFullImageModal(false)}
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[450px] sm:h-[550px]">
              <Image
                src={illustrationUrl}
                alt={activeVocab.word}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-slate-900 flex items-center justify-between text-white">
              <div>
                <h4 className="text-xl font-bold font-display capitalize">{activeVocab.word}</h4>
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
