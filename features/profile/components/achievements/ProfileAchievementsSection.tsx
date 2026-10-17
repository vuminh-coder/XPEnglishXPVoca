"use client";

import React from "react";
import { Award, GraduationCap, Flame, Swords, Target, Users, Brain } from "lucide-react";
import { AchievementItem } from "../../types";

const ACHIEVEMENT_ICONS: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  a1: {
    icon: <GraduationCap className="w-5 h-5 stroke-[2.2]" />,
    color: "text-[#0059bb] dark:text-sky-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/40",
  },
  a2: {
    icon: <Flame className="w-5 h-5 stroke-[2.2] fill-amber-500/20" />,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40",
  },
  a3: {
    icon: <Swords className="w-5 h-5 stroke-[2.2]" />,
    color: "text-indigo-500 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-800/40",
  },
  a4: {
    icon: <Target className="w-5 h-5 stroke-[2.2]" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/40",
  },
  a5: {
    icon: <Users className="w-5 h-5 stroke-[2.2]" />,
    color: "text-sky-500 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800/40",
  },
  a6: {
    icon: <Brain className="w-5 h-5 stroke-[2.2]" />,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-800/40",
  },
};

interface ProfileAchievementsSectionProps {
  unlockedCount: number;
  totalCount: number;
  activeTab: "all" | "unlocked" | "locked";
  setActiveTab: (tab: "all" | "unlocked" | "locked") => void;
  filteredAchievements: AchievementItem[];
}

export const ProfileAchievementsSection: React.FC<ProfileAchievementsSectionProps> = ({
  unlockedCount,
  totalCount,
  activeTab,
  setActiveTab,
  filteredAchievements,
}) => {
  return (
    <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5 sm:space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 sm:pb-3">
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Kho Huy Hiệu Thành Tích
              </h2>
              <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Mở khóa danh hiệu để nhận thêm XP và chứng nhận
              </p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black font-mono bg-blue-50 text-[#0059bb] dark:bg-blue-950/60 dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 shrink-0 sm:ml-1">
            {unlockedCount}/{totalCount}
          </span>
        </div>

        {/* Category Tab Filters: Chia đều 3 phần và phong cách màu trắng */}
        <div className="grid grid-cols-3 w-full sm:w-auto sm:flex sm:items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`py-1.5 px-2 sm:px-3 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs font-bold font-display text-center flex items-center justify-center whitespace-nowrap active:scale-[0.98] ${
              activeTab === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/70 dark:border-slate-700/60 font-bold"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-semibold"
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("unlocked")}
            className={`py-1.5 px-2 sm:px-3 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs font-bold font-display text-center flex items-center justify-center whitespace-nowrap active:scale-[0.98] ${
              activeTab === "unlocked"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/70 dark:border-slate-700/60 font-bold"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-semibold"
            }`}
          >
            Đã đạt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("locked")}
            className={`py-1.5 px-2 sm:px-3 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs font-bold font-display text-center flex items-center justify-center whitespace-nowrap active:scale-[0.98] ${
              activeTab === "locked"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/70 dark:border-slate-700/60 font-bold"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-semibold"
            }`}
          >
            Chưa mở
          </button>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
        {filteredAchievements.map((ach) => {
          const iconConfig = ACHIEVEMENT_ICONS[ach.id];

          return (
            <div
              key={ach.id}
              className={`p-2 sm:p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                ach.unlocked
                  ? "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-400"
                  : "bg-slate-50/60 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/50 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 shadow-2xs select-none ${
                      ach.unlocked
                        ? iconConfig
                          ? `${iconConfig.bgColor} ${iconConfig.color}`
                          : "bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/40 text-amber-500"
                        : "bg-slate-100 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {iconConfig ? iconConfig.icon : <span className="text-xs sm:text-base">{ach.icon}</span>}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-tight truncate">
                      {ach.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {ach.description}
                    </p>
                  </div>
                </div>

                {ach.unlocked ? (
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 shrink-0 font-display">
                    ĐÃ ĐẠT
                  </span>
                ) : (
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shrink-0 font-display">
                    KHÓA
                  </span>
                )}
              </div>

              {/* Bottom XP row: Desktop only, eliminated on mobile to reduce height */}
              <div className="hidden sm:flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-[11px] font-mono mt-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-300/40">
                  +{ach.xpBonus} XP
                </span>
                {ach.progress && !ach.unlocked && (
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                    Tiến độ: <span className="text-[#0059bb] dark:text-sky-400 font-black">{ach.progress}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
