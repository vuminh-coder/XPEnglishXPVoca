"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { VocabSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/themes";
import { ADVANCED_VOCABULARY_THEMES } from "@/features/vocabulary/data/advancedVocabularies";
import {
  ThemeCardItem,
  VocabularyStatsBar,
  getSemanticThemeIcon,
} from "@/features/vocabulary";

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
  // Vocabulary Level Mode: "basic" (A1-A2) or "advanced" (B1-C2)
  const [levelMode, setLevelMode] = useState<"basic" | "advanced">("basic");
  const [search, setSearch] = useState("");
  const [displayedCount, setDisplayedCount] = useState(16);

  // Source 1: Basic themes (A1-A2)
  const basicThemesList: ClientTheme[] = useMemo(() => {
    if (initialBasicThemes && initialBasicThemes.length > 0) return initialBasicThemes;
    return BASIC_VOCABULARY_THEMES.map((t) => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      icon: t.icon,
      totalVocabs: t.totalVocabs || 20,
      difficulty: t.difficulty,
    }));
  }, [initialBasicThemes]);

  // Source 2: Advanced themes (B1-C2)
  const advancedThemesList: ClientTheme[] = useMemo(() => {
    if (initialAdvancedThemes && initialAdvancedThemes.length > 0) return initialAdvancedThemes;
    return ADVANCED_VOCABULARY_THEMES.map((t) => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      icon: t.icon,
      totalVocabs: t.totalVocabs || 35,
      difficulty: t.difficulty,
    }));
  }, [initialAdvancedThemes]);

  // Active themes pool based on selected level
  const currentThemesPool = useMemo(() => {
    return levelMode === "basic" ? basicThemesList : advancedThemesList;
  }, [levelMode, basicThemesList, advancedThemesList]);

  const handleLevelChange = (mode: "basic" | "advanced") => {
    setLevelMode(mode);
    setDisplayedCount(16);
    setSearch("");
  };

  const loadMoreThemes = () => {
    setDisplayedCount((prev) => prev + 12);
  };

  const filteredThemes = useMemo(() => {
    let list = currentThemesPool;
    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameEn.toLowerCase().includes(q)
      );
    }
    return list.slice(0, displayedCount);
  }, [search, displayedCount, currentThemesPool]);

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
        {/* 1. HERO STUDIO TOOLBAR & LEVEL SELECTOR */}
        <MotionItem>
          <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-4">
            {/* Top ambient blue accent glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0059bb]/60 to-transparent" />

            {/* Top Bar Header & Search */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 min-w-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                  {levelMode === "basic" ? (
                    <BookOpen className="w-6 h-6 stroke-[2]" />
                  ) : (
                    <GraduationCap className="w-6 h-6 stroke-[2]" />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Kho Từ Vựng Tiếng Anh Thông Minh
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium truncate mt-1">
                    {levelMode === "basic"
                      ? "60 Chủ đề từ vựng giao tiếp hàng ngày chuẩn phiên âm IPA & ví dụ song ngữ."
                      : "155 Chủ đề học thuật, TOEIC, IELTS & chuyên ngành kèm phương pháp Spaced Repetition."}
                  </p>
                </div>
              </div>

              {/* Action Controls: Level Mode Switcher + Search Input Dock */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
                {/* Fluid Spring-Sliding Level Segmented Control */}
                <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleLevelChange("basic")}
                    className="relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors select-none active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                  >
                    {levelMode === "basic" && (
                      <motion.div
                        layoutId="vocabThemesLevelPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-1.5 ${
                        levelMode === "basic"
                          ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>60 Cơ Bản</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLevelChange("advanced")}
                    className="relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors select-none active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                  >
                    {levelMode === "advanced" && (
                      <motion.div
                        layoutId="vocabThemesLevelPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32, mass: 0.8 }}
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-1.5 ${
                        levelMode === "advanced"
                          ? "text-[#0059bb] dark:text-sky-400 font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>155 Nâng Cao</span>
                    </span>
                  </button>
                </div>

                {/* Search Input Dock */}
                <div className="relative w-full sm:w-64 lg:w-72 shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={
                      levelMode === "basic"
                        ? "Tìm trong 60 chủ đề cơ bản..."
                        : "Tìm trong 155 chủ đề nâng cao..."
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-10 pl-10 pr-8 text-sm font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all shadow-2xs"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* 2. TOP BENTO STATS BAR */}
        <MotionItem>
          <VocabularyStatsBar
            levelMode={levelMode}
            basicCount={basicThemesList.length}
            advancedCount={advancedThemesList.length}
          />
        </MotionItem>

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
          <MotionItem className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
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
