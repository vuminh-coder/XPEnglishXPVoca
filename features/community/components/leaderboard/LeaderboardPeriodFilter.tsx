"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Clock, Award } from "lucide-react";

interface LeaderboardPeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
  criterion?: "xp" | "time";
  onCriterionChange?: (criterion: "xp" | "time") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PERIOD_TABS = [
  { id: "week", label: "Tuần này" },
  { id: "month", label: "Tháng này" },
  { id: "all", label: "Mọi thời đại" },
];

export const LeaderboardPeriodFilter: React.FC<LeaderboardPeriodFilterProps> = ({
  period,
  onPeriodChange,
  criterion = "xp",
  onCriterionChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
      <div className="flex items-center flex-wrap gap-2">
        {/* Period Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          {PERIOD_TABS.map((tab) => {
            const isActive = period === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onPeriodChange(tab.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-display ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeLeaderboardPeriodIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Criterion Switcher (XP vs Time) */}
        {onCriterionChange && (
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => onCriterionChange("xp")}
              className={`relative px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-display flex items-center gap-1 ${
                criterion === "xp"
                  ? "text-[#0059bb] dark:text-sky-400 font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {criterion === "xp" && (
                <motion.span
                  layoutId="activeLeaderboardCriterionIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <Award className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Điểm XP</span>
            </button>

            <button
              type="button"
              onClick={() => onCriterionChange("time")}
              className={`relative px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-display flex items-center gap-1 ${
                criterion === "time"
                  ? "text-[#0059bb] dark:text-sky-400 font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {criterion === "time" && (
                <motion.span
                  layoutId="activeLeaderboardCriterionIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <Clock className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Thời gian học</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-48 lg:w-56">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm học viên..."
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0059bb]"
        />
      </div>
    </div>
  );
};
