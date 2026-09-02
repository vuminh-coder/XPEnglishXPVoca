"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText } from "@/shared/utils/ttsEngine";
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
  Clock,
  ListOrdered,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

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
      icon: <FolderOpen className="w-5 h-5 text-[#0059bb] dark:text-sky-400" />,
      accentText: "text-[#0059bb] dark:text-sky-400",
      accentBg: "bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800",
    },
    {
      key: "favorite" as const,
      label: "Yêu thích",
      sublabel: "Từ vựng đã đánh dấu sao",
      count: favoriteWords.length,
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      accentText: "text-rose-500",
      accentBg: "bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800",
    },
    {
      key: "learning" as const,
      label: "Đang học",
      sublabel: "Từ vựng đang rèn luyện",
      count: learningWords.length,
      icon: <RefreshCw className="w-5 h-5 text-amber-500" />,
      accentText: "text-amber-500",
      accentBg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800",
    },
    {
      key: "mastered" as const,
      label: "Đã làm chủ",
      sublabel: "Đã thành thạo cấp tối đa",
      count: masteredWords.length,
      icon: <Crown className="w-5 h-5 text-emerald-500" />,
      accentText: "text-emerald-500",
      accentBg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800",
    },
  ];

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── APP TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <HeaderPillContainer>
            <HeaderPillItem
              label="Lịch Ôn Tập SM-2"
              icon={<Zap className="w-4 h-4 text-amber-500" />}
              href="/review"
            />
          </HeaderPillContainer>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Sổ từ của tôi"
            icon={<BookOpen className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
            active
          />
          <HeaderPillItem
            label="Danh sách từ"
            icon={<ListOrdered className="w-4 h-4 text-emerald-500" />}
            href="/vocabulary"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="space-y-6">
        {/* 1. TOP 4 BENTO STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => {
            const isActive = filter === s.key;
            return (
              <div
                key={s.key}
                onClick={() => setFilter(s.key)}
                className={`p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-md hover:border-[#0059bb]/50 ${
                  isActive
                    ? "border-[#0059bb] ring-2 ring-[#0059bb]/20 bg-blue-50/10 dark:bg-blue-950/20"
                    : "border-slate-200/90 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-display">
                    {s.label}
                  </span>
                  <div className={`p-2 rounded-xl ${s.accentBg} shadow-2xs`}>
                    {s.icon}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    {s.count}
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                    {s.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. SEARCH & FILTER TOOLBAR */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm từ vựng hoặc nghĩa tiếng Việt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm font-medium rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center gap-1 border border-slate-200/60 dark:border-slate-800 w-full md:w-auto overflow-x-auto no-scrollbar">
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
                    className={`flex-1 md:flex-none py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
                      isActive
                        ? "bg-[#0059bb] text-white shadow-xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{labels[key]}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-slate-200/80 dark:bg-slate-800 text-slate-500"}`}>
                      {counts[key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. VOCABULARY CARDS GRID */}
        {filteredList.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 text-center space-y-4 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
              <Inbox className="w-7 h-7" strokeWidth={1.8} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
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
              className="inline-flex items-center gap-1.5 h-10 px-5 bg-[#0059bb] hover:bg-[#004ca0] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all"
            >
              <span>Khám phá từ mới</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredList.map((item) => {
              const v = item;
              if (!v || !v.word) return null;
              return (
                <div
                  key={item.vocabId}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 shadow-md hover:border-[#0059bb]/50 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header Row: Word, POS, Phonetic & Favorite Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#0059bb] dark:text-sky-400 group-hover:text-[#004ca0] transition-colors font-display">
                            {v.word}
                          </h3>
                          {v.pos && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800">
                              {v.pos}
                            </span>
                          )}
                        </div>
                        {v.phonetic && (
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {v.phonetic}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(v.vocabId)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 shadow-2xs active:scale-95"
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
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {v.definitionVn}
                      </div>
                      {v.definition && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {v.definition}
                        </div>
                      )}
                    </div>

                    {/* Examples block */}
                    {v.examples && v.examples[0] && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        &ldquo;{v.examples[0]}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Footer Row: Proficiency Dots & Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">
                        Thuần thục:
                      </span>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (item.proficiency || 0)
                                ? "bg-emerald-500 shadow-xs"
                                : "bg-slate-200 dark:bg-slate-800"
                            }`}
                          />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speak(v.word || "")}
                        className="h-8 px-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200/90 dark:border-slate-800 transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
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
                        className="h-8 px-3.5 text-xs font-bold text-white bg-[#0059bb] hover:bg-[#004ba0] rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Ôn (+15 XP)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PageEntranceWrapper>
    </div>
  );
}
