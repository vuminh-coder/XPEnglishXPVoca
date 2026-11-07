"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import {
  useAnalyticsManager,
  AnalyticsWorkspaceHeader,
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
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 font-sans select-none">
      {/* 1. MOBILE TOP HEADER (lg:hidden - Hidden on Desktop to avoid redundant top bars) */}
      <AppTopHeader className="lg:hidden" />

      <PageEntranceWrapper
        className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 space-y-4 sm:space-y-5 pb-24 sm:pb-12"
        suppressHydrationWarning
      >
        {/* 2. PAGE WORKSPACE HEADER (Desktop & Mobile unified studio header with tab switcher & primary CTA) */}
        <AnalyticsWorkspaceHeader
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {/* 3. HERO TOP 5 METRIC CARDS BENTO GRID */}
        <AnalyticsMetricsBar
          isLoading={isLoadingAnalytics}
          longestStreak={longestStreak}
          savedWords={savedWords}
          minutesStudied={minutesStudied}
          totalXp={totalXp}
          weeklyRank={weeklyRank}
        />

        {/* 4. TAB VIEWS (ACTIVITIES vs LEADERBOARD) */}
        <AnimatePresence mode="wait">
          {activeTab === "LEADERBOARD" ? (
            <LeaderboardTabPane
              key="leaderboard-pane"
              isLoadingLeaderboard={isLoadingLeaderboard}
              leaderboardData={leaderboardData}
              processedLeaderboard={processedLeaderboard}
              visibleLeaderboardCount={visibleLeaderboardCount}
              setVisibleLeaderboardCount={setVisibleLeaderboardCount}
            />
          ) : (
            <ActivitiesTabPane
              key="activities-pane"
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
      </PageEntranceWrapper>
    </div>
  );
}
