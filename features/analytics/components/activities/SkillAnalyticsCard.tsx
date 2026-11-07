"use client";
import React from "react";
import { motion } from "framer-motion";
import { Headphones, Mic, BookOpen, Wand2 } from "lucide-react";
import { SkillMode, SkillThemeConfig } from "../../types";
import { SpeakingIcon } from "../../constants";
import { HighDpiWaveformChart } from "../shared/HighDpiWaveformChart";
import { WaveformChartSkeleton } from "../shared/WaveformChartSkeleton";

interface SkillAnalyticsCardProps {
  isLoading: boolean;
  modeFilter: SkillMode;
  setModeFilter: (mode: SkillMode) => void;
  currentTheme: SkillThemeConfig;
  activeSkillData: { minutes: number[]; xp: number[] };
  dates: string[];
  selectedDayIndex: number | null;
  setSelectedDayIndex: (idx: number) => void;
}

export const SkillAnalyticsCard: React.FC<SkillAnalyticsCardProps> = ({
  isLoading,
  modeFilter,
  setModeFilter,
  currentTheme,
  activeSkillData,
  dates,
  selectedDayIndex,
  setSelectedDayIndex,
}) => {
  const skillTabs = [
    { id: "Dictation" as const, label: "Dictation", Icon: Headphones },
    { id: "Shadowing" as const, label: "Shadowing", Icon: Mic },
    { id: "Nói" as const, label: "Nói (AI)", Icon: SpeakingIcon },
    { id: "Từ vựng" as const, label: "Từ vựng", Icon: BookOpen },
    { id: "Viết" as const, label: "Viết (AI)", Icon: Wand2 },
  ] as const;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
      {/* TIÊU ĐỀ & BỘ CHỌN KỸ NĂNG */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 whitespace-nowrap">
            30 NGÀY
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Phân tích thời lượng &amp; XP theo kỹ năng
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Lựa chọn kỹ năng phân tích biểu đồ"
          className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-5 sm:flex sm:items-center gap-0.5 sm:gap-1 w-full lg:w-auto shrink-0"
        >
          {skillTabs.map((tab) => {
            const isActive = modeFilter === tab.id;
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setModeFilter(tab.id)}
                className={`relative sm:flex-1 py-1.5 px-0 sm:px-3 rounded-lg text-xs transition-colors duration-200 cursor-pointer whitespace-nowrap flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 z-10 select-none ${
                  isActive
                    ? "text-slate-900 dark:text-white font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillAnalyticsIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg -z-10 shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                  />
                )}
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HAI BIỂU ĐỒ SONG SONG (chiều cao cố định => 0px lệch đáy) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {isLoading ? (
          <>
            <WaveformChartSkeleton
              title={`Thời lượng luyện tập (${modeFilter})`}
              themeColor={currentTheme.color}
              unit="phút"
              dates={dates}
            />
            <WaveformChartSkeleton
              title={`Điểm XP tích lũy (${modeFilter})`}
              themeColor="#10b981"
              unit="XP"
              dates={dates}
            />
          </>
        ) : (
          <>
            <HighDpiWaveformChart
              title={`Thời lượng luyện tập (${modeFilter})`}
              values={activeSkillData.minutes}
              chartType="MINUTES"
              themeColor={currentTheme.color}
              gradientId={currentTheme.gradientId}
              unit="phút"
              dates={dates}
              selectedDayIndex={selectedDayIndex}
              onSelectDayIndex={setSelectedDayIndex}
            />

            <HighDpiWaveformChart
              title={`Điểm XP tích lũy (${modeFilter})`}
              values={activeSkillData.xp}
              chartType="XP"
              themeColor="#10b981"
              gradientId="xpAnalyticsGradientBig"
              unit="XP"
              dates={dates}
              selectedDayIndex={selectedDayIndex}
              onSelectDayIndex={setSelectedDayIndex}
            />
          </>
        )}
      </div>
    </div>
  );
};
