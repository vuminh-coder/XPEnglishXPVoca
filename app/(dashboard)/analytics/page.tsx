"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { BarChart3, Trophy, Zap } from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  useAnalyticsManager,
  AnalyticsMetricsBar,
  ActivitiesTabPane,
  LeaderboardTabPane,
} from "@/features/analytics";

export default function AnalyticsPage() {
  const {
    activeTab,
    setActiveTab,
    modeFilter,
    setModeFilter,
    isLoadingAnalytics,
    isLoadingLeaderboard,
    leaderboardData,
    visibleLeaderboardCount,
    setVisibleLeaderboardCount,
    selectedDayIndex,
    setSelectedDayIndex,
    hoveredHeatmapTile,
    setHoveredHeatmapTile,
    dates,
    savedWords,
    longestStreak,
    minutesStudied,
    totalXp,
    weeklyRank,
    activeSkillData,
    heatmapWeeks,
    totalActivities,
    processedLeaderboard,
    monthList,
    currentTheme,
  } = useAnalyticsManager();

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <Link
            href="/study/practice"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Luyện Tập Ngay +15 XP</span>
          </Link>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeTab === "ACTIVITIES"}
            onClick={() => setActiveTab("ACTIVITIES")}
            layoutId="analyticsActiveTabPill"
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="Hoạt Động Của Tôi"
          />
          <HeaderPillItem
            active={activeTab === "LEADERBOARD"}
            onClick={() => setActiveTab("LEADERBOARD")}
            layoutId="analyticsActiveTabPill"
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Bảng Xếp Hạng XP"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* HERO TOP 5 METRIC CARDS BENTO GRID */}
        <AnalyticsMetricsBar
          isLoading={isLoadingAnalytics}
          longestStreak={longestStreak}
          savedWords={savedWords}
          minutesStudied={minutesStudied}
          totalXp={totalXp}
          weeklyRank={weeklyRank}
        />

        {/* 3. TAB VIEWS (ACTIVITIES vs LEADERBOARD) */}
        <AnimatePresence mode="wait">
          {activeTab === "LEADERBOARD" ? (
            <LeaderboardTabPane
              isLoadingLeaderboard={isLoadingLeaderboard}
              leaderboardData={leaderboardData}
              processedLeaderboard={processedLeaderboard}
              visibleLeaderboardCount={visibleLeaderboardCount}
              setVisibleLeaderboardCount={setVisibleLeaderboardCount}
            />
          ) : (
            <ActivitiesTabPane
              isLoading={isLoadingAnalytics}
              totalActivities={totalActivities}
              monthList={monthList}
              heatmapWeeks={heatmapWeeks}
              hoveredHeatmapTile={hoveredHeatmapTile}
              onHoverTile={setHoveredHeatmapTile}
              modeFilter={modeFilter}
              setModeFilter={setModeFilter}
              currentTheme={currentTheme}
              activeSkillData={activeSkillData}
              dates={dates}
              selectedDayIndex={selectedDayIndex}
              setSelectedDayIndex={setSelectedDayIndex}
            />
          )}
        </AnimatePresence>
      </div>
    </PageEntranceWrapper>
  );
}
