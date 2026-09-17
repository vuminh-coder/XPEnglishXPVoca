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
    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
      {/* CARD HEADER & SKILL SWITCHER PILLS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
            30 NGÀY
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
            Phân tích thời lượng & XP theo kỹ năng
          </h3>
        </div>

        {/* Mode Switcher Pill Strip */}
        <div
          role="tablist"
          aria-label="Lựa chọn kỹ năng phân tích biểu đồ"
          className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 overflow-x-auto scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full shrink-0"
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
                className={`relative flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 z-10 select-none ${
                  isActive
                    ? "text-slate-900 dark:text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillAnalyticsIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
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

      {/* DUAL HIGH-DPI DASHBOARD WAVEFORM LINE CHARTS */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
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
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
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
        </div>
      )}
    </div>
  );
};
