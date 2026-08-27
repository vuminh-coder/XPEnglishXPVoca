"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText } from "@/lib/utils/ttsEngine";
import { Button } from "@/components/ui";

import {
  FolderOpen,
  Heart,
  RefreshCw,
  Crown,
  Volume2,
  Zap,
  Inbox,
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function MyVocabularyPage() {
  const [filter, setFilter] = useState<"all" | "favorite" | "learning" | "mastered">("all");
  const [search, setSearch] = useState<string>("");
  const { learned, toggleFavorite, practiceWord, loadLearnedWords } = useVocabularyStore();
  const { user, awardXp } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      loadLearnedWords(user.id);
    }
  }, [user?.id, loadLearnedWords]);

  const { favoriteWords, masteredWords, learningWords } = useMemo(() => {
    return {
      favoriteWords: learned.filter((l) => l.isFavorite),
      masteredWords: learned.filter((l) => l.proficiency === 5),
      learningWords: learned.filter((l) => (l.proficiency || 0) > 0 && (l.proficiency || 0) < 5),
    };
  }, [learned]);

  const filteredByTab = useMemo(() => {
    if (filter === "all") return learned;
    if (filter === "favorite") return favoriteWords;
    if (filter === "learning") return learningWords;
    if (filter === "mastered") return masteredWords;
    return [];
  }, [filter, learned, favoriteWords, learningWords, masteredWords]);

  const filteredList = useMemo(() => {
    if (!search.trim()) return filteredByTab;
    const q = search.trim().toLowerCase();
    return filteredByTab.filter(
      (v) =>
        (v.word && v.word.toLowerCase().includes(q)) ||
        (v.definitionVn && v.definitionVn.toLowerCase().includes(q)) ||
        (v.definition && v.definition.toLowerCase().includes(q))
    );
  }, [filteredByTab, search]);

  const speak = (word: string) => {
    speakLessonText(word, {
      lessonId: "myvocab_list",
      rate: 0.95,
    });
  };

  const statCards = [
    {
      key: "all" as const,
      label: "Tổng số từ",
      sublabel: "Từ vựng đã bắt đầu học",
      count: learned.length,
      icon: <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#0059bb] dark:text-sky-400" />,
      accentText: "text-[#0059bb] dark:text-sky-400",
      accentBg: "bg-[#0059bb]/10",
    },
    {
      key: "favorite" as const,
      label: "Yêu thích",
      sublabel: "Từ vựng đã đánh dấu sao",
      count: favoriteWords.length,
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />,
      accentText: "text-rose-500",
      accentBg: "bg-rose-500/10",
    },
    {
      key: "learning" as const,
      label: "Đang học",
      sublabel: "Từ vựng đang rèn luyện",
      count: learningWords.length,
      icon: <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
      accentText: "text-amber-500",
      accentBg: "bg-amber-500/10",
    },
    {
      key: "mastered" as const,
      label: "Làm chủ",
      sublabel: "Đã thành thạo cấp tối đa",
      count: masteredWords.length,
      icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />,
      accentText: "text-emerald-500",
      accentBg: "bg-emerald-500/10",
    },
  ];

  return (
    <PageEntranceWrapper className="space-y-3 sm:space-y-4 pb-16 md:pb-6 px-1 md:px-0 select-none font-sans" suppressHydrationWarning>
      
      {/* 1. TOP SPOTLIGHT TOOLBAR & SEARCH */}
      <MotionItem>
        <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                    Bộ Từ Vựng Của Tôi
                  </h1>
                  <span className="px-2 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-extrabold bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 shrink-0">
                    {learned.length} từ đã lưu
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  Theo dõi, ôn tập và quản lý các từ vựng bạn đang học, yêu thích hoặc đã làm chủ.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm từ vựng hoặc nghĩa tiếng Việt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 sm:h-9 pl-8 pr-3 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] transition-colors"
              />
            </div>
          </div>

          {/* Filter Switcher Tabs */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 p-1 rounded-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 w-full sm:w-auto">
              {(["all", "favorite", "learning", "mastered"] as const).map((key) => {
                const labels: Record<string, string> = {
                  all: "Tất cả",
                  favorite: "Yêu thích",
                  learning: "Đang học",
                  mastered: "Đã thuộc",
                };
                const counts: Record<string, number> = {
                  all: learned.length,
                  favorite: favoriteWords.length,
                  learning: learningWords.length,
                  mastered: masteredWords.length,
                };
                const isActive = filter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                      isActive
                        ? "bg-[#0059bb] text-white shadow-2xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900 font-medium"
                    }`}
                  >
                    <span>{labels[key]}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded-xs ${isActive ? "bg-white/20 text-white" : "bg-slate-200/80 dark:bg-slate-800 text-slate-500"}`}>
                      {counts[key]}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/review"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xs border border-blue-200/60 dark:border-blue-900/40 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Vào Lịch Ôn Tập SM-2</span>
            </Link>
          </div>
        </div>
      </MotionItem>

      {/* 2. TOP BENTO STATS BAR (4-COLUMN CARDS) */}
      <MotionItem>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {statCards.map((s) => {
            const isActive = filter === s.key;
            return (
              <div
                key={s.key}
                onClick={() => setFilter(s.key)}
                className={`p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 shadow-2xs hover:border-[#0059bb]/50 ${
                  isActive
                    ? "border-[#0059bb] ring-1 ring-[#0059bb]/20 bg-blue-50/20 dark:bg-blue-950/20"
                    : "border-slate-200/80 dark:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 font-display">
                    {s.label}
                  </span>
                  <div className={`p-1.5 rounded-xs ${s.accentBg}`}>
                    {s.icon}
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {s.count}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {s.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MotionItem>

      {/* 3. VOCABULARY CARDS GRID */}
      <MotionItem>
        {filteredList.length === 0 ? (
          <div className="p-10 sm:p-14 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-center space-y-3.5 shadow-2xs">
            <div className="w-12 h-12 rounded-xs bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto border border-blue-200/40 dark:border-blue-900/40">
              <Inbox className="w-6 h-6" strokeWidth={1.6} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Chưa có từ vựng nào trong danh mục này
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {search.trim()
                  ? "Không tìm thấy từ vựng nào khớp với từ khóa tìm kiếm của bạn."
                  : "Hãy khám phá và lưu các từ vựng mới để bắt đầu quy trình ôn luyện thông minh!"}
              </p>
            </div>
            <Link
              href="/vocabulary"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0059bb] hover:bg-[#004ca0] text-white text-xs font-bold rounded-xs shadow-2xs transition-colors"
            >
              <span>Khám phá từ mới</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredList.map((item) => {
              const v = item;
              if (!v || !v.word) return null;
              return (
                <div
                  key={item.vocabId}
                  className="p-3.5 sm:p-4.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs hover:border-[#0059bb]/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    {/* Header Row: Word, POS, Phonetic & Favorite Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-[#0059bb] dark:text-sky-400 group-hover:text-[#004ca0] transition-colors font-display">
                            {v.word}
                          </h3>
                          {v.pos && (
                            <span className="px-1.5 py-0.5 rounded-xs text-[9px] font-extrabold uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400">
                              {v.pos}
                            </span>
                          )}
                        </div>
                        {v.phonetic && (
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {v.phonetic}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(v.vocabId)}
                        className="w-8 h-8 rounded-xs flex items-center justify-center border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                        title={item.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            item.isFavorite
                              ? "text-rose-500 fill-rose-500"
                              : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Definitions */}
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {v.definitionVn}
                      </div>
                      {v.definition && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {v.definition}
                        </div>
                      )}
                    </div>

                    {/* Examples block (No italics) */}
                    {v.examples && v.examples[0] && (
                      <div className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        &ldquo;{v.examples[0]}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Footer Row: Proficiency Dots & Actions */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-400 mr-1 hidden sm:inline">
                        Thuần thục:
                      </span>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < (item.proficiency || 0)
                                ? "bg-emerald-500 shadow-xs"
                                : "bg-slate-200 dark:bg-slate-800"
                            }`}
                          />
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => speak(v.word || "")}
                        className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 rounded-xs border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          practiceWord(v.vocabId, true);
                          awardXp(15);
                        }}
                        className="px-3 py-1 text-xs font-bold text-white bg-[#0059bb] hover:bg-[#004ca0] rounded-xs shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Ôn tập (+15 XP)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </MotionItem>

    </PageEntranceWrapper>
  );
}
