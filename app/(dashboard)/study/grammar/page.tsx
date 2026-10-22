"use client";

import React from "react";
import Link from "next/link";
import { BookMarked, Search, X } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  useGrammarCatalog,
  GrammarTopicGrid,
} from "@/features/grammar";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

export default function GrammarCatalogPage() {
  const {
    activeLevel,
    searchQuery,
    setSearchQuery,
    filteredTopics,
    stats,
    getTopicStatus,
    isSwitchingCategory,
    allBasicTopics,
    allIntermediateTopics,
    allAdvancedTopics,
    completedTopics,
    displayedBasicTopics,
    displayedIntermediateTopics,
    displayedAdvancedTopics,
    handleShuffleBasic,
    handleShuffleIntermediate,
    handleShuffleAdvanced,
    isShufflingBasic,
    isShufflingIntermediate,
    isShufflingAdvanced,
    nextRecommendedTopic,
  } = useGrammarCatalog();

  // Global Hotkey Listener: Cmd+K / Ctrl+K / '/' to trigger search in AppTopHeader, Esc to clear
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchBtn = document.querySelector<HTMLButtonElement>('button[title="Mở tìm kiếm"]');
        searchBtn?.click();
        return;
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        const searchBtn = document.querySelector<HTMLButtonElement>('button[title="Mở tìm kiếm"]');
        searchBtn?.click();
        return;
      }
      if (e.key === "Escape") {
        if (searchQuery) setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [searchQuery, setSearchQuery]);

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* 4 Fixed Tabs in AppTopHeader matching Sidebar & other AI routes */}
      <AppTopHeader
        hideMobileSearch={false}
        searchProps={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: "Tìm kiếm thì, cấu trúc ngữ pháp (TOEIC, IELTS)...",
          onClear: () => setSearchQuery(""),
          hideDesktopInput: true,
        }}
        rightDesktopContent={
          <Link
            href={`/study/grammar/${nextRecommendedTopic.id}`}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center justify-center transition-all cursor-pointer font-display active:scale-95 shrink-0 max-w-[280px]"
            title={`Tiếp tục: ${nextRecommendedTopic.name}`}
          >
            <span className="truncate">
              Tiếp tục: {nextRecommendedTopic.name}
            </span>
          </Link>
        }
      >
        <AiSuiteNavTabs />
      </AppTopHeader>

      {/* Main Studio Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. SINGLE-TIER SLEEK CONTROL DOCK (Header + Progress Tracker + Search Filter) */}
        <MotionItem>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 min-w-0">
              {/* Brand Title Block */}
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight leading-snug flex items-center gap-2.5 sm:gap-3">
                  <BookMarked className="w-7 h-7 sm:w-8 sm:h-8 text-[#0059bb] dark:text-sky-400 stroke-[2.2] shrink-0" />
                  <span>Ngữ Pháp AI</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-snug mt-0.5">
                  60 Chuyên đề ngữ pháp trọng tâm B1–C2 • Bài giảng & Luyện đề AI chuẩn TOEIC / IELTS
                </p>
              </div>

              {/* Action Controls: Progress Tracker & Active Search Filter Indicator */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
                {/* Active Search Filter Badge (chỉ hiện khi người dùng tìm kiếm từ AppTopHeader) */}
                {searchQuery.trim() !== "" && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-300 text-xs font-semibold shrink-0 animate-in fade-in duration-200">
                    <Search className="w-3.5 h-3.5 shrink-0" />
                    <span className="max-w-[140px] sm:max-w-[200px] truncate">&ldquo;{searchQuery}&rdquo;</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-0.5 rounded-md text-[#0059bb]/70 hover:text-[#0059bb] hover:bg-blue-100 dark:hover:bg-blue-900/80 cursor-pointer transition-colors"
                      title="Xóa bộ lọc tìm kiếm"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Fluid Mastery Progress Tracker */}
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-2.5 text-xs font-bold shrink-0">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Đã thuộc:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {stats.completed}/{stats.total} bài
                  </span>
                  <div className="w-20 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                    <div
                      className="h-full bg-gradient-to-r from-[#0059bb] to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${stats.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                    {stats.progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* 2. Dictation-Style 3 Curated Rows & Level Grids */}
        <GrammarTopicGrid
          topics={filteredTopics}
          getTopicStatus={getTopicStatus}
          activeLevel={activeLevel}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          isSwitchingCategory={isSwitchingCategory}
          allBasicTopics={allBasicTopics}
          allIntermediateTopics={allIntermediateTopics}
          allAdvancedTopics={allAdvancedTopics}
          completedTopics={completedTopics}
          displayedBasicTopics={displayedBasicTopics}
          displayedIntermediateTopics={displayedIntermediateTopics}
          displayedAdvancedTopics={displayedAdvancedTopics}
          onShuffleBasic={handleShuffleBasic}
          onShuffleIntermediate={handleShuffleIntermediate}
          onShuffleAdvanced={handleShuffleAdvanced}
          isShufflingBasic={isShufflingBasic}
          isShufflingIntermediate={isShufflingIntermediate}
          isShufflingAdvanced={isShufflingAdvanced}
        />
      </div>
    </PageEntranceWrapper>
  );
}
