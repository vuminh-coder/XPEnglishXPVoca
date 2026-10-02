"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  ArrowLeft,
  RotateCcw,
  Zap,
  Coins,
  Volume2,
  Bookmark,
  CheckCircle2,
  XCircle,
  Timer,
  Flame,
  Target,
  Sparkles,
  BookOpen,
  Award,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { GameReviewItem } from "../../types";

export interface GameResultScreenProps {
  title?: string;
  subtitle: string;
  score?: number;
  xpEarned: number;
  coinsEarned?: number;
  accuracy?: number; // 0 - 100%
  durationSeconds?: number;
  maxCombo?: number;
  reviewItems?: GameReviewItem[];
  onBack: () => void;
  onRestart: () => void;
}

export function GameResultScreen({
  title = "Hoàn thành xuất sắc!",
  subtitle,
  score,
  xpEarned,
  coinsEarned = 0,
  accuracy,
  durationSeconds,
  maxCombo,
  reviewItems = [],
  onBack,
  onRestart,
}: GameResultScreenProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "notebook">("summary");
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [bookmarkedWords, setBookmarkedWords] = useState<Set<string>>(new Set());

  const toggleFavorite = useVocabularyStore((s) => s.toggleFavorite);

  const handleSpeak = (word: string) => {
    setSpeakingWord(word);
    safeSpeakText(word, { lang: "en-US", rate: 0.9 });
    setTimeout(() => setSpeakingWord(null), 1200);
  };

  const handleToggleBookmark = (item: GameReviewItem) => {
    const key = item.id || item.word;
    setBookmarkedWords((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });

    if (item.id) {
      toggleFavorite(item.id);
    }
  };

  // Calculate stats
  const totalItems = reviewItems.length;
  const correctCount = reviewItems.filter((i) => i.isCorrect).length;
  const computedAccuracy =
    accuracy !== undefined
      ? accuracy
      : totalItems > 0
      ? Math.round((correctCount / totalItems) * 100)
      : 100;

  // CEFR Grade evaluation
  const getCefrBadge = (acc: number, sc: number = 0) => {
    if (acc >= 90 || sc >= 70) return { level: "C1 Advanced", color: "from-purple-500 to-indigo-600" };
    if (acc >= 80 || sc >= 50) return { level: "B2 Upper-Int", color: "from-blue-600 to-cyan-600" };
    if (acc >= 65 || sc >= 30) return { level: "B1 Intermediate", color: "from-emerald-500 to-teal-600" };
    return { level: "A2 Elementary", color: "from-amber-500 to-orange-500" };
  };

  const cefr = getCefrBadge(computedAccuracy, score);

  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none">
      {/* 1. Header Banner Stage */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#002b5b] text-white text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mx-auto text-amber-300 shadow-lg shadow-black/10">
            <Trophy className="w-8 h-8 stroke-[2.3] animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-black uppercase tracking-wider text-white">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Đánh Giá Chuyên Sâu</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              {title}
            </h2>
            <p className="text-xs sm:text-[13px] text-blue-100/90 font-medium max-w-md mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Reward Badges */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-black shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>+{xpEarned} XP Thưởng</span>
            </div>
            {coinsEarned > 0 && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-black shadow-2xs">
                <Coins className="w-3.5 h-3.5 text-amber-300" />
                <span>+{coinsEarned} Vàng</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Dual Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/60 p-1.5 gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab("summary")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "summary"
              ? "bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Tổng Quan Chỉ Số</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notebook")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "notebook"
              ? "bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Sổ Tay Ván Chơi ({reviewItems.length})</span>
        </button>
      </div>

      {/* 3. Tab Body Container */}
      <div className="p-5 sm:p-7 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === "summary" ? (
            <motion.div
              key="tab-summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              {/* Analytics Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Score */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-800/40 text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    Điểm số
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#0059bb] dark:text-sky-400 font-display">
                    {score !== undefined ? score : "100"}
                  </div>
                </div>

                {/* Accuracy */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40 text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                    <Target className="w-3 h-3 text-emerald-500" />
                    Độ chính xác
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                    {computedAccuracy}%
                  </div>
                </div>

                {/* Max Combo */}
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3 text-amber-500" />
                    Chuỗi Combo
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-display">
                    x{maxCombo || 1}
                  </div>
                </div>

                {/* Duration */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                    <Timer className="w-3 h-3 text-slate-500" />
                    Thời gian
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-200 font-display">
                    {durationSeconds ? `${durationSeconds}s` : "Hoàn tất"}
                  </div>
                </div>
              </div>

              {/* CEFR Level Assessment Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/80 dark:from-slate-850 dark:to-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Đánh giá phản xạ & Từ vựng
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Trình độ tương đương ván này
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {computedAccuracy >= 80
                      ? "Khả năng nhận diện mặt chữ và phản xạ nghĩa ngữ cảnh cực kỳ sắc bén."
                      : "Tiếp tục rèn luyện thêm để nâng cao tốc độ phản xạ và mở rộng vốn từ."}
                  </p>
                </div>

                <div
                  className={`px-3.5 py-2 rounded-xl bg-gradient-to-r ${cefr.color} text-white text-xs font-black shrink-0 shadow-md shadow-blue-500/10 text-center`}
                >
                  {cefr.level}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-notebook"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              {reviewItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Không có từ vựng cần ôn tập cho chế độ này.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1.5 scrollbar-thin">
                  {reviewItems.map((item, idx) => {
                    const isBookmarked = bookmarkedWords.has(item.id || item.word);
                    const isPlaying = speakingWord === item.word;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          item.isCorrect
                            ? "bg-slate-50/60 dark:bg-slate-850/50 border-slate-200/80 dark:border-slate-800"
                            : "bg-rose-50/30 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 shrink-0">
                            {item.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            )}
                          </div>

                          {item.imageUrl && (
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.word}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
                                {item.word}
                              </span>
                              {item.phonetic && (
                                <span className="text-xs text-slate-400 font-mono">
                                  {item.phonetic}
                                </span>
                              )}
                              {item.pos && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                                  {item.pos}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                              {item.definitionVn}
                            </p>

                            {item.example && (
                              <p className="text-[11px] text-slate-400 italic pt-0.5 line-clamp-1">
                                &ldquo;{item.example}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action buttons: TTS Speak & Bookmark */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSpeak(item.word)}
                            title="Nghe phát âm chuẩn"
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              isPlaying
                                ? "bg-[#0059bb] text-white animate-pulse"
                                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 active:scale-90"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5 stroke-[2.2]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(item)}
                            title="Lưu vào Sổ tay yêu thích"
                            className={`p-2 rounded-xl transition-all cursor-pointer active:scale-90 ${
                              isBookmarked
                                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500"
                            }`}
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 stroke-[2.2] ${
                                isBookmarked ? "fill-amber-500 text-amber-500" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Action Buttons */}
        <div className="flex gap-3 justify-center pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onBack}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Danh mục Games</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="py-2.5 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Chơi lại ván mới</span>
          </button>
        </div>
      </div>
    </div>
  );
}
