"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  useGrammarCatalog,
  GrammarHeroMetrics,
  GrammarStudioToolbar,
  GrammarTopicGrid,
} from "@/features/grammar";

export default function GrammarCatalogPage() {
  const {
    activeLevel,
    setActiveLevel,
    searchQuery,
    setSearchQuery,
    filteredTopics,
    counts,
    stats,
    getTopicStatus,
  } = useGrammarCatalog();

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* 4 Fixed Tabs in AppTopHeader matching Sidebar & other AI routes */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/grammar/present_simple"
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Học Bài Đầu Tiên +15 XP</span>
          </Link>
        }
      >
        <AiSuiteNavTabs />
      </AppTopHeader>

      {/* Main Studio Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. 5 Bento Hero Metric Cards */}
        <GrammarHeroMetrics stats={stats} />

        {/* 2. Studio Toolbar (Level Filters + Search) */}
        <GrammarStudioToolbar
          activeLevel={activeLevel}
          onLevelChange={setActiveLevel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        {/* 3. 60 Grammar Topics Grid */}
        <GrammarTopicGrid
          topics={filteredTopics}
          getTopicStatus={getTopicStatus}
        />
      </div>
    </PageEntranceWrapper>
  );
}
