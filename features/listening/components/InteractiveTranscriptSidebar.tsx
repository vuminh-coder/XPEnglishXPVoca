"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Volume2,
  ListOrdered,
  RefreshCw,
  Clock,
  BookOpen,
  ArrowRight,
  Headphones,
  Play,
} from "lucide-react";

import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { RecommendationCardsSkeleton, TranscriptSentencesSkeleton } from "./LoadingSkeletons";
import type { TranscriptSentence } from "../utils/listeningParser";

export interface KeyVocabItem {
  word: string;
  ipa?: string;
  meaning?: string;
  example?: string;
}

export function formatSentenceTimestamp(seconds?: number): string {
  if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatLevelBadge(level?: string): string {
  if (!level) return "B1";
  const upper = level.trim().toUpperCase();
  if (upper.includes("INTERMEDIATE") || upper === "B1-B2" || upper === "B1") return "B1";
  if (upper === "B2") return "B2";
  if (upper.includes("BEGINNER") || upper.includes("EASY") || upper === "A1-A2" || upper === "A1") return "A1";
  if (upper === "A2") return "A2";
  if (upper.includes("ADVANCED") || upper.includes("HARD") || upper === "C1-C2" || upper === "C1") return "C1";
  if (upper === "C2") return "C2";
  return level.length > 5 ? level.slice(0, 4) : level;
}

interface InteractiveTranscriptSidebarProps {
  transcript: TranscriptSentence[];
  currentIndex: number;
  completedSentences: { [idx: number]: boolean };
  onSelectSentence: (idx: number) => void;
  onReplaySentence?: (idx: number) => void;
  onNextSentence?: () => void;
  onResetProgress?: () => void;
  keyVocabularies?: KeyVocabItem[];
  onWordClick?: (word: string) => void;
  isPlaying?: boolean;
  className?: string;
  recommendedLessons?: any[];
  completedLessonIds?: (string | number)[];
  onSelectLesson?: (lessonId: string | number) => void;
  onShuffleRecommendations?: () => void;
  isLoadingRecommendations?: boolean;
  isLoadingSentences?: boolean;
  sentenceScores?: { [idx: number]: number };
  showTimestamps?: boolean;
  showProgressHeader?: boolean;
  practiceMode?: "listening" | "shadowing";
  initialShowAllTexts?: boolean;
}

function InteractiveTranscriptSidebarComponent({
  transcript = [],
  currentIndex = 0,
  completedSentences = {},
  sentenceScores,
  onSelectSentence,
  onReplaySentence,
  onNextSentence,
  onResetProgress,
  keyVocabularies = [],
  onWordClick,
  isPlaying = false,
  className = "",
  recommendedLessons = [],
  completedLessonIds = [],
  onSelectLesson,
  onShuffleRecommendations,
  isLoadingRecommendations = false,
  isLoadingSentences = false,
  showTimestamps = false,
  showProgressHeader = true,
  practiceMode = "listening",
  initialShowAllTexts = false,
}: InteractiveTranscriptSidebarProps) {
  // Tabs: "transcript" (Phụ đề) vs "tips" (Gợi ý bài học)
  const [activeTab, setActiveTab] = useState<"transcript" | "tips">("transcript");
  const [showAllTexts, setShowAllTexts] = useState<boolean>(() => {
    if (typeof initialShowAllTexts === "boolean") {
      return initialShowAllTexts;
    }
    return false;
  });

  // Khi showProgressHeader = false (như ở chế độ Đọc hiểu video không có header tiến độ), luôn luôn hiện đầy đủ câu và phụ đề dịch
  const effectiveShowAllTexts = !showProgressHeader ? true : showAllTexts;
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const handleToggleShowAllTexts = () => {
    setShowAllTexts((prev) => !prev);
  };

  const sentenceRefs = useRef<{ [idx: number]: HTMLDivElement | null }>({});

  const totalCount = transcript.length;
  const completedCount = Object.values(completedSentences).filter(Boolean).length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Tự động cuộn đến câu đang học
  useEffect(() => {
    if (activeTab === "transcript" && sentenceRefs.current[currentIndex]) {
      sentenceRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex, activeTab]);

  return (
    <div
      className={`w-full h-full bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col overflow-hidden font-sans ${className}`}
    >
      {/* 1. TOP TABS: PHỤ ĐỀ vs GỢI Ý BÀI HỌC */}
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800/80 px-5 pt-3 gap-7 sm:gap-8 shrink-0">
        {/* Tab 1: Phụ đề */}
        <button
          type="button"
          onClick={() => setActiveTab("transcript")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            activeTab === "transcript"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <ListOrdered className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
          <span>Phụ đề</span>

          {activeTab === "transcript" && (
            <motion.div
              layoutId="interactiveTranscriptActiveTabPill"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-full"
            />
          )}
        </button>

        {/* Tab 2: Gợi ý bài học */}
        <button
          type="button"
          onClick={() => setActiveTab("tips")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            activeTab === "tips"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 stroke-[2]" />
          <span>Gợi ý bài học</span>

          {activeTab === "tips" && (
            <motion.div
              layoutId="interactiveTranscriptActiveTabPill"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* 2. TAB BODY TRANSITION */}
      <AnimatePresence mode="wait">
        {activeTab === "transcript" ? (
          <motion.div
            key="transcript-tab-content"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex-1 flex flex-col min-h-0"
          >
          {/* Header Tiến độ & Đặt lại tiến độ / Toggle Hiện (chỉ hiển thị khi showProgressHeader = true) */}
          {showProgressHeader && (
            <div className="space-y-1 px-5 pt-3.5 pb-2 shrink-0">
              {/* Dòng 1: [ 1/14 ] bên trái, [ ↺ Đặt lại tiến độ   Hiện (O) ] bên phải */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight text-slate-900 dark:text-white leading-none block">
                    {completedCount}/{totalCount}
                  </span>
                  <span className="text-xs sm:text-[13px] font-normal text-slate-500 dark:text-slate-400 block mt-1">
                    Tiến độ
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 pt-0.5">
                  {onResetProgress && (
                    <button
                      type="button"
                      onClick={onResetProgress}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      title="Đặt lại tiến độ bài học này"
                    >
                      <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
                      <span className="font-normal">Đặt lại tiến độ</span>
                    </button>
                  )}

                  <div
                    className="flex items-center gap-2 select-none"
                    title={showAllTexts ? "Đang hiện câu (Nhấp để ẩn thành •)" : "Hiện toàn bộ văn bản câu trong bài"}
                  >
                    <span className="font-normal text-slate-600 dark:text-slate-400">Hiện câu</span>
                    <button
                      type="button"
                      onClick={handleToggleShowAllTexts}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center cursor-pointer ${
                        showAllTexts
                          ? "bg-slate-900 dark:bg-emerald-500 justify-end"
                          : "bg-slate-200 dark:bg-slate-700 justify-start"
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-4 h-4 rounded-full bg-white shadow-xs"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dòng 2: Thanh tiến độ bo tròn chuẩn ảnh */}
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-slate-900 dark:bg-emerald-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* DANH SÁCH CÁC CÂU TRONG BÀI — TƯƠI SÁNG, NỔI BẬT, ICON RÕ NÉT */}
          <div className={`flex-1 overflow-y-auto hide-scrollbar space-y-3 px-5 pb-24 ${!showProgressHeader ? "pt-3.5" : ""}`}>
            {isLoadingSentences ? (
              <TranscriptSentencesSkeleton count={transcript.length || 6} />
            ) : (
              transcript.map((sentence, idx) => {
                const isCurrent = idx === currentIndex;
                const isCompleted = !!completedSentences[idx];

                const viTranslation = (
                  sentence.translation ||
                  sentence.vietnamese ||
                  (sentence as any).translationVi ||
                  ""
                ).trim();
                const cleanTranslation = viTranslation
                  ? viTranslation.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim()
                  : "";

                const hasTimestamps = typeof sentence.startTime === "number";
                const timeText = hasTimestamps
                  ? `${formatSentenceTimestamp(sentence.startTime)} - ${formatSentenceTimestamp(sentence.endTime)}`
                  : null;

                // 1. THẺ CÂU ĐANG HỌC (isCurrent)
                if (isCurrent) {
                  return (
                    <motion.div
                      key={sentence.id || idx}
                      data-sentence-index={idx}
                      ref={(el) => {
                        sentenceRefs.current[idx] = el;
                      }}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 sm:p-4.5 rounded-2xl border-2 shadow-xs space-y-2.5 transition-all select-none ${
                        isCompleted
                          ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-500 dark:border-emerald-500/80"
                          : "bg-white dark:bg-slate-900 border-[#0059bb] dark:border-sky-500 ring-2 ring-[#0059bb]/10 dark:ring-sky-500/10 shadow-sm"
                      }`}
                    >
                      {/* Header: [ (✓ / 🎧) #idx [00:00 - 00:16] ĐANG HỌC ] bên trái, [ ↺ > ] bên phải */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Headphones className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-[#0059bb] dark:border-sky-400 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0 shadow-2xs bg-blue-50/60 dark:bg-blue-950/40">
                              <Headphones className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                          )}

                          {/* Số thứ tự câu #idx */}
                          <span
                            className={`text-[14.5px] sm:text-base font-bold ${
                              isCompleted
                                ? "text-emerald-700 dark:text-emerald-300"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            #{idx + 1}
                          </span>

                          {/* Huy hiệu thời gian Timestamp (Chỉ hiển thị khi bật showTimestamps) */}
                          {showTimestamps && timeText && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-medium border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{timeText}</span>
                            </span>
                          )}

                          {/* Trạng thái câu: Điểm số / ĐÃ CHÉP ĐÚNG / ĐÃ ĐẠT / CHƯA ĐẠT / ĐANG HỌC */}
                          {sentenceScores && sentenceScores[idx] !== undefined ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans tracking-tight shadow-xs ${
                                sentenceScores[idx] >= 80
                                  ? "bg-emerald-600 text-white"
                                  : "bg-rose-600 text-white"
                              }`}
                            >
                              <span>
                                {sentenceScores[idx] >= 80
                                  ? `Đã đạt - ${sentenceScores[idx]} điểm`
                                  : `Chưa đạt - ${sentenceScores[idx]} điểm`}
                              </span>
                            </span>
                          ) : isCompleted ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans tracking-tight bg-emerald-600 text-white shadow-xs">
                              <span>{practiceMode === "shadowing" ? "Đã đạt" : "Đã chép đúng"}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans tracking-tight bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-900/60 shadow-2xs">
                              <span>Đang học</span>
                            </span>
                          )}
                        </div>

                        {/* Nút hành động góc phải: [ ↺ ] và [ > ] */}
                        <div
                          className={`flex items-center gap-1 shrink-0 ${
                            isCompleted
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {onReplaySentence && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onReplaySentence(idx);
                              }}
                              className={`p-1.5 rounded-lg hover:scale-110 active:scale-95 transition-all cursor-pointer ${
                                isCompleted
                                  ? "hover:text-emerald-950 dark:hover:text-white hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50"
                                  : "hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                              title="Nghe lại câu này"
                            >
                              <RotateCcw className="w-4 h-4 stroke-[2]" />
                            </button>
                          )}
                          <div
                            className={`p-1 ${
                              isCompleted
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-[#0059bb] dark:text-sky-400"
                            }`}
                          >
                            <ChevronRight className="w-4.5 h-4.5 stroke-[2]" />
                          </div>
                        </div>
                      </div>

                      {/* Nội dung câu */}
                      {isCompleted || effectiveShowAllTexts ? (
                        <>
                          <p className="text-sm sm:text-[14.5px] font-semibold text-slate-900 dark:text-white leading-relaxed pt-0.5 break-words">
                            {sentence.text}
                          </p>

                          {cleanTranslation && (
                            <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                              {cleanTranslation}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="pt-1 select-none">
                          <div className="text-slate-300 dark:text-slate-600 text-xs sm:text-[13px] font-mono tracking-widest leading-loose">
                            {sentence.text
                              .split(" ")
                              .map((word, wIdx) => (
                                <span key={wIdx} className="mr-1.5 inline-block">
                                  {"•".repeat(Math.max(2, Math.min(8, word.length)))}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                }

                // 2. THẺ CÂU ĐÃ HOÀN THÀNH (#2 - Nền trắng tinh khiết, viền thanh nhã, icon to rõ [ (✓) #2 ] và [ ↺ > ])
                if (isCompleted) {
                  return (
                    <div
                      key={sentence.id || idx}
                      data-sentence-index={idx}
                      ref={(el) => {
                        sentenceRefs.current[idx] = el;
                      }}
                      onClick={() => onSelectSentence(idx)}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2 cursor-pointer transition-all hover:border-emerald-300 dark:hover:border-emerald-800 select-none"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Vòng tròn xanh lá */}
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Headphones className="w-3.5 h-3.5 stroke-[2.2]" />
                          </div>
                          <span className="text-[14.5px] sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                            #{idx + 1}
                          </span>

                          {/* Huy hiệu thời gian Timestamp (Chỉ hiển thị khi bật showTimestamps) */}
                          {showTimestamps && timeText && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-medium border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{timeText}</span>
                            </span>
                          )}

                          {sentenceScores && sentenceScores[idx] !== undefined ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold shadow-xs ${
                                sentenceScores[idx] >= 80
                                  ? "bg-emerald-600 text-white"
                                  : "bg-rose-600 text-white"
                              }`}
                            >
                              <span>
                                {sentenceScores[idx] >= 80
                                  ? `Đã đạt - ${sentenceScores[idx]} điểm`
                                  : `Chưa đạt - ${sentenceScores[idx]} điểm`}
                              </span>
                            </span>
                          ) : (
                            practiceMode === "shadowing" && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold shadow-xs bg-emerald-600 text-white">
                                <span>Đã đạt</span>
                              </span>
                            )
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0">
                          {onReplaySentence && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onReplaySentence(idx);
                              }}
                              className="p-1.5 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Nghe lại câu này"
                            >
                              <RotateCcw className="w-4 h-4 stroke-[1.75]" />
                            </button>
                          )}
                          <div className="p-1">
                            <ChevronRight className="w-4.5 h-4.5 stroke-[1.75]" />
                          </div>
                        </div>
                      </div>

                      {/* Dòng Tiếng Anh */}
                      <p className="text-sm sm:text-[14.5px] font-normal text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5 break-words">
                        {sentence.text}
                      </p>

                      {/* Bản dịch tiếng Việt phong cách song ngữ Reading */}
                      {cleanTranslation && (
                        <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                          {cleanTranslation}
                        </div>
                      )}
                    </div>
                  );
                }

                // 3. CÂU CHƯA HỌC / PENDING (#1, #4, #5)
                return (
                  <div
                    key={sentence.id || idx}
                    data-sentence-index={idx}
                    ref={(el) => {
                      sentenceRefs.current[idx] = el;
                    }}
                    onClick={() => onSelectSentence(idx)}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-2 cursor-pointer group transition-all hover:border-slate-300 dark:hover:border-slate-700 select-none"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Vòng tròn xám rỗng ◯ hoặc icon cảnh báo nếu chưa đạt */}
                        {sentenceScores && sentenceScores[idx] !== undefined && sentenceScores[idx] < 80 ? (
                          <div className="w-6 h-6 rounded-full border-2 border-rose-400 dark:border-rose-500 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 bg-rose-50 dark:bg-rose-950/40 text-[10px] font-black shadow-2xs">
                            ✕
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-slate-400 transition-colors shrink-0" />
                        )}

                        {/* Số thứ tự #1, #4... */}
                        <span className="text-sm sm:text-[14.5px] font-semibold text-slate-600 dark:text-slate-400">
                          #{idx + 1}
                        </span>

                        {/* Huy hiệu thời gian Timestamp (Chỉ hiển thị khi bật showTimestamps) */}
                        {showTimestamps && timeText && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-medium border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{timeText}</span>
                          </span>
                        )}

                        {/* Huy hiệu điểm nếu đã làm nhưng chưa đạt */}
                        {sentenceScores && sentenceScores[idx] !== undefined && sentenceScores[idx] < 80 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold shadow-xs bg-rose-600 text-white">
                            <span>Chưa đạt - {sentenceScores[idx]} điểm</span>
                          </span>
                        )}

                        {/* Tag Mới nếu là câu đầu */}
                        {idx === 0 && !effectiveShowAllTexts && (!sentenceScores || sentenceScores[idx] === undefined) && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 shadow-2xs">
                            Mới
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onReplaySentence) {
                              onReplaySentence(idx);
                            } else {
                              onSelectSentence(idx);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Nghe câu này"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Nội dung câu tiếng Anh hoặc chuỗi dấu chấm */}
                    <div>
                      {effectiveShowAllTexts ? (
                        <p className="text-sm sm:text-[14.5px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed break-words">
                          {sentence.text}
                        </p>
                      ) : (
                        <div className="text-slate-300 dark:text-slate-600 text-xs sm:text-[13px] font-mono tracking-widest leading-loose select-none">
                          {sentence.text
                            .split(" ")
                            .map((word, wIdx) => (
                              <span key={wIdx} className="mr-1.5 inline-block">
                                {"•".repeat(Math.max(2, Math.min(8, word.length)))}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Bản dịch tiếng Việt phong cách song ngữ Reading */}
                    {cleanTranslation && effectiveShowAllTexts && (
                      <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                        {cleanTranslation}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      ) : (
        /* 3. TAB 2: CHUYÊN BIỆT GỢI Ý BÀI HỌC */
        <motion.div
          key="tips-tab-content"
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex-1 flex flex-col min-h-0 overflow-hidden"
        >
          {/* Header gợi ý bài học */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Bài học đề xuất dành cho bạn:</span>
            </div>

            {onShuffleRecommendations && (
              <button
                type="button"
                onClick={onShuffleRecommendations}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shadow-2xs active:scale-95"
                title="Đổi danh sách gợi ý ngẫu nhiên"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Đổi gợi ý</span>
              </button>
            )}
          </div>

          {/* Danh sách thẻ bài học đề xuất dạng Horizontal Media Card chuẩn Rule 10 */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-3.5 sm:p-4 space-y-3">
            {isLoadingRecommendations ? (
              <RecommendationCardsSkeleton count={3} />
            ) : recommendedLessons && recommendedLessons.length > 0 ? (
              recommendedLessons.map((lesson) => {
                const isLessonCompleted =
                  completedLessonIds.includes(lesson.id) ||
                  completedLessonIds.includes(String(lesson.id));

                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectLesson && onSelectLesson(lesson.id)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 dark:hover:border-sky-500/70 transition-all cursor-pointer shadow-2xs hover:shadow-md group select-none flex gap-3.5 items-center relative overflow-hidden min-h-[96px]"
                  >
                    {/* 1. Ảnh bìa bài học (LessonCoverImage) kích thước chuẩn tỷ lệ 4:3 */}
                    <div className="w-[102px] sm:w-[108px] h-[74px] sm:h-[78px] shrink-0 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                      <LessonCoverImage
                        lesson={lesson}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        showBadge={false}
                      />

                      {/* Huy hiệu Cấp độ rút gọn chuẩn CEFR: A1, A2, B1, B2, C1, C2 */}
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/90 text-white backdrop-blur-xs z-20 shadow-xs border border-white/15 tracking-wide">
                        {formatLevelBadge(lesson.level)}
                      </span>
                    </div>

                    {/* 2. Cột thông tin chi tiết bài học bên phải */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1.5">
                      {/* Dòng 1: Danh mục & Trạng thái đã học/mới */}
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 truncate">
                          {lesson.category || "Giao tiếp"}
                        </span>

                        {isLessonCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-700/60 shrink-0 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Đã học</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/70 dark:border-amber-700/60 shrink-0 shadow-2xs">
                            Mới
                          </span>
                        )}
                      </div>

                      {/* Dòng 2: Tiêu đề bài học */}
                      <h4 className="text-[13.5px] sm:text-[14px] font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-2 leading-[1.35]">
                        {lesson.title}
                      </h4>

                      {/* Dòng 3: Thông số & Nút Học Action Pill */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono">
                        <div className="flex items-center gap-2 tabular-nums text-slate-600 dark:text-slate-300 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 stroke-[2]" />
                            <span>{lesson.duration || "3:00"}</span>
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="flex items-center gap-1">
                            <Headphones className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 stroke-[2]" />
                            <span>{lesson.transcript?.length || 10} câu</span>
                          </span>
                        </div>

                        {/* Nút Học Action Pill chuẩn Agency Tier */}
                        <div className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1.5 group-hover:bg-[#0059bb] group-hover:text-white dark:group-hover:bg-blue-600 transition-all shadow-2xs shrink-0 active:scale-95">
                          <span>Học</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-medium space-y-2">
                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                <p>Không có bài học gợi ý nào khác.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

export const InteractiveTranscriptSidebar = React.memo(InteractiveTranscriptSidebarComponent);
