"use client";

import React from "react";
import Link from "next/link";
import { Zap, BookMarked } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
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
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0 max-w-[280px]"
            title={`Tiếp tục: ${nextRecommendedTopic.name}`}
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300 shrink-0" />
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
        {/* 1. Slim Title & Progress Tracker Row (Dictation-Style High-End Minimalist) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
              <BookMarked className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-display">
                Ngữ Pháp AI • Grammar Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-[#0059bb] dark:text-sky-300 border border-blue-500/20 hidden xs:inline-flex">
                60 Chuyên Đề
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto text-xs bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-2xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Đã thuộc:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {stats.completed}/{stats.total} bài
            </span>
            <div className="w-20 sm:w-28 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
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
