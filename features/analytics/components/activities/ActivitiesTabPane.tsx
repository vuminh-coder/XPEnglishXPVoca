"use client";
import React from "react";
import { motion } from "framer-motion";
import { SkillMode, SkillThemeConfig } from "../../types";
import { HeatmapMatrixCard } from "./HeatmapMatrixCard";
import { SkillAnalyticsCard } from "./SkillAnalyticsCard";

interface ActivitiesTabPaneProps {
  isLoading: boolean;
  totalActivities: number;
  monthList: { name: string; startIndex: number }[];
  heatmapWeeks: any[][];
  hoveredHeatmapTile: { dateStr: string; count: number } | null;
  onHoverTile: (tile: { dateStr: string; count: number } | null) => void;
  modeFilter: SkillMode;
  setModeFilter: (mode: SkillMode) => void;
  currentTheme: SkillThemeConfig;
  activeSkillData: { minutes: number[]; xp: number[] };
  dates: string[];
  selectedDayIndex: number | null;
  setSelectedDayIndex: (idx: number) => void;
}

export const ActivitiesTabPane: React.FC<ActivitiesTabPaneProps> = ({
  isLoading,
  totalActivities,
  monthList,
  heatmapWeeks,
  hoveredHeatmapTile,
  onHoverTile,
  modeFilter,
  setModeFilter,
  currentTheme,
  activeSkillData,
  dates,
  selectedDayIndex,
  setSelectedDayIndex,
}) => {
  return (
    <motion.div
      key="activities-tab"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
      className="space-y-4"
    >
      <HeatmapMatrixCard
        isLoading={isLoading}
        totalActivities={totalActivities}
        monthList={monthList}
        heatmapWeeks={heatmapWeeks}
        hoveredHeatmapTile={hoveredHeatmapTile}
        onHoverTile={onHoverTile}
      />

      <SkillAnalyticsCard
        isLoading={isLoading}
        modeFilter={modeFilter}
        setModeFilter={setModeFilter}
        currentTheme={currentTheme}
        activeSkillData={activeSkillData}
        dates={dates}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
      />
    </motion.div>
  );
};
