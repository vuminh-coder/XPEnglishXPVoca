"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { VocabSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  Search,
  BookOpen,
  Compass,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/themes";
import { ADVANCED_VOCABULARY_THEMES } from "@/features/vocabulary/data/advancedVocabularies";
import {
  ThemeCardItem,
  getSemanticThemeIcon,
  getThemeCoverImage,
  matchThemeSearch,
} from "@/features/vocabulary";
import { useVocabularyCatalogStore } from "@/stores/vocabularyCatalogStore";

export { getSemanticThemeIcon };

export interface ClientTheme {
  id: string;
  name: string;
  nameEn: string;
  icon?: string;
  totalVocabs: number;
  difficulty: number;
}

export default function VocabularyThemesClientList({
  initialBasicThemes,
  initialAdvancedThemes,
}: {
  initialBasicThemes?: ClientTheme[];
  initialAdvancedThemes?: ClientTheme[];
  initialThemes?: ClientTheme[];
}) {
  // SWR Store & Persistent Filter State
  const {
    basicThemes,
    advancedThemes,
    filters,
    setLevelMode,
    setSearchQuery,
    setDisplayedCount,
  } = useVocabularyCatalogStore();

  const { levelMode, searchQuery: search, displayedCount } = filters;
  const setSearch = setSearchQuery;

  // Search Input Ref
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Source 1: Basic themes (A1-A2)
  const basicThemesList: ClientTheme[] = useMemo(() => {
    if (initialBasicThemes && initialBasicThemes.length > 0) return initialBasicThemes;
    return basicThemes;
  }, [initialBasicThemes, basicThemes]);

  // Source 2: Advanced themes (B1-C2)
  const advancedThemesList: ClientTheme[] = useMemo(() => {
    if (initialAdvancedThemes && initialAdvancedThemes.length > 0) return initialAdvancedThemes;
    return advancedThemes;
  }, [initialAdvancedThemes, advancedThemes]);

  // Active themes pool based on selected level
  const currentThemesPool = useMemo(() => {
    return levelMode === "basic" ? basicThemesList : advancedThemesList;
  }, [levelMode, basicThemesList, advancedThemesList]);

  const handleLevelChange = (mode: "basic" | "advanced") => {
    setLevelMode(mode);
  };

  const loadMoreThemes = () => {
    setDisplayedCount((prev: number) => prev + 12);
  };

  // 1. Cross-Level Real-Time Match Counters
  const basicMatchesCount = useMemo(() => {
    if (!search.trim()) return basicThemesList.length;
    return basicThemesList.filter((t) => matchThemeSearch(t, search)).length;
  }, [search, basicThemesList]);

  const advancedMatchesCount = useMemo(() => {
    if (!search.trim()) return advancedThemesList.length;
    return advancedThemesList.filter((t) => matchThemeSearch(t, search)).length;
  }, [search, advancedThemesList]);

  // 2. Main Filtered Themes for Current Pool
  const filteredThemes = useMemo(() => {
    let list = currentThemesPool;
    const q = search.trim();
    if (q) {
      return list.filter((t) => matchThemeSearch(t, q));
    }
    return list.slice(0, displayedCount);
  }, [search, displayedCount, currentThemesPool]);

  // Opposite pool matches for Smart Discovery
  const oppositeMatchesCount = levelMode === "basic" ? advancedMatchesCount : basicMatchesCount;

  // 3. Global Hotkey Listener: Cmd+K / Ctrl+K / '/' to focus, Esc to clear & blur
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        if (search) setSearch("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [search, setSearch]);

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans">
      {/* 0. BRAND TOP HEADER (Unified 56px Baseline with Pill Actions) */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200 fill-sky-200/40" />
            <span>Luyện Trí Nhớ Flashcards</span>
          </Link>
        }
      >
        <VocabSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. SINGLE-TIER SLEEK CONTROL DOCK (Header + Level Switcher + Search) */}
        <MotionItem>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 min-w-0">
              {/* Brand Title Block */}
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight leading-snug flex items-center gap-2.5 sm:gap-3">
                  {levelMode === "basic" ? (
                    <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-[#0059bb] dark:text-sky-400 stroke-[2.2] shrink-0" />
                  ) : (
                    <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#0059bb] dark:text-sky-400 stroke-[2.2] shrink-0" />
                  )}
                  <span>Kho Từ Vựng Tiếng Anh</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-snug mt-0.5">
                  {levelMode === "basic"
                    ? "60 Chủ đề giao tiếp nền tảng A1–A2 • Phiên âm IPA chuẩn & ví dụ song ngữ thực chiến"
                    : "155 Chủ đề học thuật & chuyên ngành B1–C2 • Kèm phương pháp Spaced Repetition"}
                </p>
              </div>

              {/* Action Controls: Level Mode Switcher + Smart Search Input Dock */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
                {/* Fluid Spring-Sliding Level Segmented Control with Real-Time Counters */}
                <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex sm:inline-flex items-center gap-1 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleLevelChange("basic")}
                    className="relative flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors select-none active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {levelMode === "basic" && (
                      <motion.div
                        layoutId="vocabThemesLevelPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center justify-center gap-1.5 ${
                        levelMode === "basic"
                          ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">60 Cơ Bản</span>
                      {search.trim() !== "" && (
                        <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 text-[10px] font-mono font-bold tabular-nums shrink-0">
                          {basicMatchesCount}
                        </span>
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLevelChange("advanced")}
                    className="relative flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors select-none active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {levelMode === "advanced" && (
                      <motion.div
                        layoutId="vocabThemesLevelPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center justify-center gap-1.5 ${
                        levelMode === "advanced"
                          ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">155 Nâng Cao</span>
                      {search.trim() !== "" && (
                        <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 text-[10px] font-mono font-bold tabular-nums shrink-0">
                          {advancedMatchesCount}
                        </span>
                      )}
                    </span>
                  </button>
                </div>

                {/* Search Input Dock */}
                <div className="relative w-full sm:w-64 lg:w-80 shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={
                      levelMode === "basic"
                        ? "Tìm 60 chủ đề cơ bản (IT, gia đình, đồ ăn...)"
                        : "Tìm 155 chủ đề nâng cao (AI, tài chính, y tế...)"
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-9.5 pl-10 pr-12 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all shadow-2xs"
                  />

                  {/* Right Action: Counter badge + Clear button (chỉ hiện khi có từ khóa) */}
                  {search && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 tabular-nums select-none">
                        {filteredThemes.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          searchInputRef.current?.focus();
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors"
                        title="Xóa từ khóa tìm kiếm (Esc)"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* 2. SMART CROSS-LEVEL DISCOVERY BANNER (Cầu nối thông minh khi tìm không có ở cấp độ hiện tại nhưng có ở cấp độ kia) */}
        {search.trim() !== "" && filteredThemes.length === 0 && oppositeMatchesCount > 0 && (
          <MotionItem>
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-5 h-5 text-sky-200" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Tìm thấy {oppositeMatchesCount} chủ đề phù hợp trong kho {levelMode === "basic" ? "155 Nâng Cao" : "60 Cơ Bản"}!
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                    Từ khóa &ldquo;{search}&rdquo; không có trong {levelMode === "basic" ? "60 Cơ Bản" : "155 Nâng Cao"}, nhưng có sẵn ở cấp độ {levelMode === "basic" ? "học thuật & chuyên ngành" : "giao tiếp nền tảng"}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleLevelChange(levelMode === "basic" ? "advanced" : "basic")}
                className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 flex items-center gap-1.5"
              >
                <span>Xem {oppositeMatchesCount} chủ đề trong {levelMode === "basic" ? "155 Nâng Cao" : "60 Cơ Bản"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </MotionItem>
        )}

        {/* 3. MAIN BENTO THEMES GRID */}
        {filteredThemes.length === 0 ? (
          <MotionItem className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy chủ đề nào phù hợp với từ khóa &ldquo;{search}&rdquo;
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {levelMode === "basic"
                ? "Hãy thử tìm các chủ đề quen thuộc: Chào hỏi, Gia đình, Số đếm, Động vật, Mua sắm, Ăn uống..."
                : "Hãy thử tìm các chủ đề nâng cao: CNTT & AI, Y tế, Tài chính, Pháp luật, Marketing, Khoa học..."}
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="h-10 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95 inline-flex items-center gap-1.5 mt-2"
            >
              <X className="w-4 h-4" />
              <span>Xóa Từ Khóa Tìm Kiếm</span>
            </button>
          </MotionItem>
        ) : (
          <MotionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredThemes.map((t) => (
              <ThemeCardItem key={t.id} theme={t} />
            ))}
          </MotionItem>
        )}

        {/* Load More Button Aligned to Right Corner */}
        {search === "" && (
          <MotionItem className="pt-4 pb-4 flex justify-center sm:justify-end">
            {displayedCount < currentThemesPool.length ? (
              <button
                type="button"
                onClick={loadMoreThemes}
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 text-slate-900 dark:text-white hover:text-[#0059bb] dark:hover:text-sky-400 font-display text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 group active:scale-[0.98] cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Xem Thêm Chủ Đề</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono font-bold group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                  +{currentThemesPool.length - displayedCount}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold font-display shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Đã hiển thị trọn bộ {currentThemesPool.length} chủ đề</span>
              </div>
            )}
          </MotionItem>
        )}
      </div>
    </PageEntranceWrapper>
  );
}
