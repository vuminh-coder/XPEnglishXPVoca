"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Sparkles,
  X,
  BookMarked,
  Check,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { VocabSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import {
  useVocabularyCatalogStore,
  MyVocabTabFilter,
} from "@/stores/vocabularyCatalogStore";
import { getBasicVocabularyById } from "@/features/vocabulary/data/basicVocabularies";
import { safeSpeakText, stopTTS } from "@/shared/utils/mobileAudio";
import { playSyntheticAudioFeedback } from "@/features/listening/utils/dictationEngine";

// POS Semantic Color-Coding Helper (Quy tắc phối màu 60-30-10 & Semantic Accents)
function getPosBadge(pos?: string) {
  if (!pos) return null;
  const p = pos.toLowerCase().trim();
  if (p.includes("noun") || p === "n" || p === "n.") {
    return { label: "n.", color: "bg-sky-500/10 text-[#0059bb] dark:text-sky-300 border-sky-500/20" };
  }
  if (p.includes("verb") || p === "v" || p === "v.") {
    return { label: "v.", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20" };
  }
  if (p.includes("adj") || p === "a" || p === "a.") {
    return { label: "adj.", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20" };
  }
  if (p.includes("adv")) {
    return { label: "adv.", color: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20" };
  }
  return { label: pos, color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700" };
}

export default function MyVocabularyPage() {
  const [filter, setFilterState] = useState<MyVocabTabFilter>(() => {
    return useVocabularyCatalogStore.getState().myVocabFilters.filterTab || "all";
  });
  const [search, setSearchState] = useState<string>(() => {
    return useVocabularyCatalogStore.getState().myVocabFilters.searchQuery || "";
  });
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);

  const setFilter = (next: MyVocabTabFilter) => {
    setFilterState(next);
    useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: next });
  };

  const setSearch = (query: string) => {
    setSearchState(query);
    useVocabularyCatalogStore.getState().setMyVocabFilter({ searchQuery: query });
  };

  const { learned, toggleFavorite, practiceWord, loadLearnedWords } = useVocabularyStore();
  const { user, awardXp } = useAuthStore();

  // Telemetry: Track vocabulary study/review time in personal vocabulary notebook
  useStudyTimeTracker("vocab");

  useEffect(() => {
    if (user?.id) {
      loadLearnedWords(user.id);
    }
  }, [user?.id, loadLearnedWords]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      stopTTS();
    };
  }, []);

  const enrichedLearned = useMemo(() => {
    return learned.map((item) => {
      if (item.word) return item;
      const fallback = getBasicVocabularyById(item.vocabId);
      if (fallback) {
        return {
          ...item,
          word: fallback.word,
          phonetic: fallback.phonetic,
          definition: fallback.definition,
          definitionVn: fallback.definitionVn,
          pos: fallback.pos,
          difficulty: fallback.difficulty,
          frequency: fallback.frequency,
          examples: fallback.examples,
        };
      }
      return item;
    });
  }, [learned]);

  const { favoriteWords, masteredWords, learningWords, dueWords } = useMemo(() => {
    return {
      favoriteWords: enrichedLearned.filter((l) => l.isFavorite),
      masteredWords: enrichedLearned.filter((l) => l.proficiency === 5),
      learningWords: enrichedLearned.filter((l) => (l.proficiency || 0) > 0 && (l.proficiency || 0) < 5),
      dueWords: enrichedLearned.filter((l) => {
        if (l.proficiency === 5) return false;
        if (!l.nextReview) return true;
        return new Date(l.nextReview).getTime() <= Date.now() + 24 * 60 * 60 * 1000;
      }),
    };
  }, [enrichedLearned]);

  const filteredByTab = useMemo(() => {
    if (filter === "all") return enrichedLearned;
    if (filter === "due") return dueWords;
    if (filter === "learning") return learningWords;
    if (filter === "mastered") return masteredWords;
    if (filter === "favorite") return favoriteWords;
    return enrichedLearned;
  }, [filter, enrichedLearned, dueWords, learningWords, masteredWords, favoriteWords]);

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

  const masteryPercent = enrichedLearned.length > 0
    ? Math.round((masteredWords.length / enrichedLearned.length) * 100)
    : 0;

  const handleSpeak = (text: string, identifier: string) => {
    if (!text) return;
    setPlayingAudioText(identifier);
    safeSpeakText(text, {
      rate: 0.95,
      onEnd: () => setPlayingAudioText(null),
      onError: () => setPlayingAudioText(null),
    });
  };

  const handleQuickPractice = (vocabId: string) => {
    practiceWord(vocabId, true);
    awardXp(15);
    playSyntheticAudioFeedback("correct");
  };

  const tabItems: Array<{
    id: MyVocabTabFilter;
    label: string;
    count: number;
    icon: React.ReactNode;
  }> = [
    {
      id: "all",
      label: "Tất Cả",
      count: enrichedLearned.length,
      icon: <FolderOpen className="w-3.5 h-3.5" />,
    },
    {
      id: "due",
      label: "Cần Ôn",
      count: dueWords.length,
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />,
    },
    {
      id: "learning",
      label: "Đang Học",
      count: learningWords.length,
      icon: <RefreshCw className="w-3.5 h-3.5 text-sky-500" />,
    },
    {
      id: "mastered",
      label: "Đã Thuộc",
      count: masteredWords.length,
      icon: <Crown className="w-3.5 h-3.5 text-emerald-500" />,
    },
    {
      id: "favorite",
      label: "Yêu Thích",
      count: favoriteWords.length,
      icon: <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />,
    },
  ];

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200 select-none"
      suppressHydrationWarning
    >
      {/* ─── APP TOP HEADER (56px Baseline with VocabSuiteNavTabs) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 font-display"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 stroke-[2] fill-amber-300" />
            <span>Luyện Tập Ngay</span>
          </Link>
        }
      >
        <VocabSuiteNavTabs />
      </AppTopHeader>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. SLIM TITLE & MASTERY PROGRESS ROW (~36px height) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
              <BookMarked className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-display">
                Sổ Tay Từ Vựng • My Vocab Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-[#0059bb] dark:text-sky-300 border border-blue-500/20 hidden xs:inline-flex">
                {enrichedLearned.length} Từ Đã Lưu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto text-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-2xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Đã làm chủ:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {masteredWords.length}/{enrichedLearned.length} từ
            </span>
            <div className="w-20 sm:w-28 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              <div
                className="h-full bg-gradient-to-r from-[#0059bb] to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
              {masteryPercent}%
            </span>
          </div>
        </div>

        {/* ─── DÒNG 2: 5 TAB FILTER PILLS ROW ─── */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100/90 dark:bg-slate-950/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 scrollbar-none w-full sm:w-auto">
            {tabItems.map((item) => {
              const isActive = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? "text-[#0059bb] dark:text-sky-300 font-display shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="myVocabToolbarPill"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-2xs border border-slate-200/80 dark:border-slate-700/80"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                        isActive
                          ? "bg-[#0059bb]/10 dark:bg-sky-400/20 text-[#0059bb] dark:text-sky-300"
                          : "bg-slate-200/70 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 pr-2 text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
            <span>Danh mục:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-display">
              {tabItems.find((t) => t.id === filter)?.label} ({filteredByTab.length})
            </span>
          </div>
        </div>

        {/* ─── DÒNG 3: TÌM KIẾM VÀ CÁC KHỐI BÊN CẠNH (CHIA RA 2 BÊN HỢP LÝ) ─── */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Bên Trái: Ô Tìm Kiếm Rộng Rãi Cân Đối */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Tìm kiếm theo từ vựng hoặc nghĩa tiếng Việt"
              placeholder="Tìm theo từ tiếng Anh hoặc nghĩa tiếng Việt..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bên Phải: Các Khối Bên Cạnh (Bộ Đếm Kết Quả + Luyện Thẻ + Làm Mới) */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {search.trim() && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                Kết quả:{" "}
                <strong className="text-[#0059bb] dark:text-sky-400 font-mono">
                  {filteredList.length}
                </strong>
              </span>
            )}

            <Link
              href="/study/practice"
              className="h-9 px-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 select-none"
              title="Luyện tập Flashcard"
            >
              <Layers className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Luyện Thẻ</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (user?.id) loadLearnedWords(user.id);
              }}
              className="h-9 w-9 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center cursor-pointer transition-colors shadow-2xs shrink-0 select-none"
              title="Làm mới danh sách từ vựng"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            </button>
          </div>
        </div>

        {/* ─── 3. VOCABULARY CARDS GRID (DOUBLE-BEZEL TIERS) ─── */}
        {filteredList.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
              <Inbox className="w-7 h-7 stroke-[1.8]" />
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
              className="inline-flex items-center gap-1.5 h-10 px-5 bg-[#0059bb] hover:bg-[#004ca0] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all font-display"
            >
              <span>Khám phá từ mới</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredList.map((item) => {
              const v = item;
              if (!v || !v.word) return null;

              const posInfo = getPosBadge(v.pos);
              const isWordPlaying = playingAudioText === `word_${v.vocabId}`;
              const isExamplePlaying = playingAudioText === `ex_${v.vocabId}`;
              const proficiency = v.proficiency || 0;

              // Smart deduplication: check if definition is identical to word
              const hasDistinctEnDef =
                v.definition &&
                v.definition.trim().toLowerCase() !== v.word.trim().toLowerCase();

              const firstExample = v.examples?.[0];
              const isExampleMeaningful =
                firstExample &&
                firstExample.trim().toLowerCase() !== v.word.trim().toLowerCase() &&
                firstExample.trim() !== "";

              return (
                <div
                  key={item.vocabId}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-3 group relative overflow-hidden"
                >
                  {/* Top Ambient Royal Blue Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0059bb]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-2.5">
                    {/* 1. Top Meta Bar: POS Badge + Mastery Crown + Favorite Heart */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        {posInfo && (
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${posInfo.color}`}
                          >
                            {posInfo.label}
                          </span>
                        )}

                        {proficiency === 5 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                            <Crown className="w-3 h-3 text-emerald-500" />
                            <span>Làm chủ</span>
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(v.vocabId)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer shrink-0 active:scale-90 ${
                          item.isFavorite
                            ? "border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-500"
                            : "border-slate-200/80 dark:border-slate-800 bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100/70"
                        }`}
                        title={item.isFavorite ? "Bỏ yêu thích" : "Lưu vào yêu thích"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform ${
                            item.isFavorite
                              ? "fill-rose-500 text-rose-500 scale-110"
                              : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* 2. Word Line with Inline Audio Speaker */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors font-display tracking-tight leading-snug line-clamp-2">
                          {v.word}
                        </h3>

                        <button
                          type="button"
                          onClick={() => handleSpeak(v.word || "", `word_${v.vocabId}`)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                            isWordPlaying
                              ? "bg-[#0059bb] text-white border-[#0059bb] animate-pulse"
                              : "border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 hover:text-[#0059bb] dark:hover:text-sky-400 hover:border-[#0059bb]/30"
                          }`}
                          title="Phát âm từ vựng"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {v.phonetic && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                          {v.phonetic}
                        </div>
                      )}
                    </div>

                    {/* 3. Meaning / Definition */}
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {v.definitionVn}
                      </div>
                      {hasDistinctEnDef && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {v.definition}
                        </div>
                      )}
                    </div>

                    {/* 4. Subtle Example Quote (No giant empty boxes!) */}
                    {isExampleMeaningful && (
                      <div className="pt-2 border-t border-dashed border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-2 text-xs">
                        <p className="text-slate-500 dark:text-slate-400 italic leading-relaxed line-clamp-2 flex-1">
                          <span className="text-[#0059bb]/60 dark:text-sky-400/60 font-bold not-italic mr-1">
                            &ldquo;
                          </span>
                          {firstExample}
                          <span className="text-[#0059bb]/60 dark:text-sky-400/60 font-bold not-italic ml-0.5">
                            &rdquo;
                          </span>
                        </p>
                        <button
                          type="button"
                          onClick={() => handleSpeak(firstExample, `ex_${v.vocabId}`)}
                          className={`p-1 rounded-md transition-all cursor-pointer shrink-0 ${
                            isExamplePlaying
                              ? "text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/50 animate-pulse"
                              : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          }`}
                          title="Nghe câu ví dụ mẫu"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 5. Footer Row: SRS 5 Dots + Quick Review Button */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    {/* SRS 5-Dots Proficiency Indicator */}
                    <div
                      className="flex items-center gap-1.5"
                      title={`Độ thuần thục: ${proficiency}/5`}
                    >
                      <div className="flex items-center gap-0.5">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-1.5 rounded-xs transition-all ${
                                i < proficiency
                                  ? "bg-emerald-500"
                                  : "bg-slate-200 dark:bg-slate-800"
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                        {proficiency}/5
                      </span>
                    </div>

                    {/* Quick Review Button (Solid Royal Blue) */}
                    <button
                      type="button"
                      onClick={() => handleQuickPractice(v.vocabId)}
                      className="h-7.5 px-3 text-[11px] font-bold text-white bg-[#0059bb] hover:bg-[#004ba0] shadow-xs hover:shadow-sm rounded-lg transition-all cursor-pointer active:scale-95 flex items-center gap-1 font-display"
                      title="Ôn tập nhanh và nhận điểm XP"
                    >
                      <span>Ôn tập</span>
                      <span className="text-[10px] text-blue-200 font-mono">+15 XP</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageEntranceWrapper>
  );
}
