"use client";
import React, { useMemo } from "react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";
import { BarChart3 } from "lucide-react";
import {
  HeatmapMatrixCard,
  SkillAnalyticsCard,
  SKILL_THEMES,
} from "@/features/analytics";
import { getRollingMonthList } from "@/features/analytics/utils/months";

export default function AnalyticsLoading() {
  const monthList = useMemo(() => getRollingMonthList(), []);
  const dates = ["26/7", "31/7", "5/8", "10/8", "Hôm nay", "17/8", "20/8", "24/8"];

  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 font-sans select-none">
      {/* 1. MOBILE TOP HEADER (lg:hidden - matches page.tsx 1:1) */}
      <AppTopHeader className="lg:hidden" />

      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 space-y-4 sm:space-y-5 pb-24 sm:pb-12">
        {/* 2. WORKSPACE HEADER SKELETON (1:1 with AnalyticsWorkspaceHeader) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-black text-slate-900 dark:text-white font-display leading-tight">
                Thống Kê Học Tập
              </h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                Theo dõi tiến độ, thời lượng luyện tập và thứ hạng của bạn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 lg:flex-none p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 gap-1 w-full sm:w-auto">
              <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-900 shadow-xs border border-slate-200/60 dark:border-slate-700/60 text-center">
                Hoạt Động Của Tôi
              </div>
              <div className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 text-center">
                Bảng Xếp Hạng XP
              </div>
            </div>
          </div>
        </div>

        {/* 3. HERO TOP 5 METRICS SKELETON (1:1 with AnalyticsMetricsBar) */}
        <div className="grid grid-cols-2 sm:grid-cols-6 xl:grid-cols-5 gap-3.5">
          {[
            { label: "Chuỗi dài nhất", bg: "bg-amber-50 dark:bg-amber-950/40", w: "w-14" },
            { label: "Vốn từ đã tích lũy", bg: "bg-emerald-50 dark:bg-emerald-950/40", w: "w-16" },
            { label: "Thời gian học", bg: "bg-blue-50 dark:bg-blue-950/40", w: "w-12" },
            { label: "Tổng điểm tích lũy", bg: "bg-purple-50 dark:bg-purple-950/40", w: "w-20" },
            { label: "Hạng của bạn", bg: "bg-amber-50 dark:bg-amber-950/40", w: "w-16" },
          ].map((card, idx) => (
            <div
              key={card.label}
              className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 flex items-center gap-3.5 ${
                idx === 4
                  ? "col-span-2 sm:col-span-3 xl:col-span-1"
                  : idx === 3
                  ? "sm:col-span-3 xl:col-span-1"
                  : "sm:col-span-2 xl:col-span-1"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl ${card.bg} shrink-0 shadow-2xs border border-black/5 dark:border-white/5 flex items-center justify-center`} />
              <div className="min-w-0 flex-1 space-y-1">
                <ShimmerBox className={`h-6 ${card.w} rounded-lg`} />
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-tight truncate">
                  {card.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. SECTION 1: 6-MONTH HEATMAP MATRIX 1:1 SKELETON */}
        <HeatmapMatrixCard
          isLoading={true}
          totalActivities={0}
          monthList={monthList}
          heatmapWeeks={[]}
          hoveredHeatmapTile={null}
          onHoverTile={() => {}}
        />

        {/* 5. SECTION 2: SKILL ANALYTICS 30-DAY CHARTS 1:1 SKELETON */}
        <SkillAnalyticsCard
          isLoading={true}
          modeFilter="Dictation"
          setModeFilter={() => {}}
          currentTheme={SKILL_THEMES.Dictation}
          activeSkillData={{ minutes: [0, 0, 0, 0, 0, 0, 0, 0], xp: [0, 0, 0, 0, 0, 0, 0, 0] }}
          dates={dates}
          selectedDayIndex={4}
          setSelectedDayIndex={() => {}}
        />
      </div>
    </div>
  );
}
