"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Trophy, Zap } from "lucide-react";
import { AnalyticsTabType } from "../../types";

interface AnalyticsWorkspaceHeaderProps {
  activeTab: AnalyticsTabType;
  onChangeTab?: (tab: AnalyticsTabType) => void;
}

const TABS: { id: AnalyticsTabType; label: string; Icon: typeof BarChart3; iconClass: string }[] = [
  { id: "ACTIVITIES", label: "Hoạt Động Của Tôi", Icon: BarChart3, iconClass: "text-[#0059bb] dark:text-sky-400" },
  { id: "LEADERBOARD", label: "Bảng Xếp Hạng XP", Icon: Trophy, iconClass: "text-amber-500" },
];

/**
 * Thanh làm việc của trang Thống kê (thay cho AppTopHeader trên Desktop):
 * tiêu đề + chuyển tab + 1 nút chính duy nhất (Rule 18).
 */
export const AnalyticsWorkspaceHeader: React.FC<AnalyticsWorkspaceHeaderProps> = ({
  activeTab,
  onChangeTab,
}) => (
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
      <div
        role="tablist"
        aria-label="Chuyển chế độ xem thống kê"
        className="flex-1 lg:flex-none p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 gap-1"
      >
        {TABS.map(({ id, label, Icon, iconClass }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChangeTab?.(id)}
              className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer select-none transition-colors ${
                isActive
                  ? "font-extrabold text-slate-900 dark:text-white"
                  : "font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="analyticsActiveTabPill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-4 h-4 shrink-0 ${iconClass}`} />
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <Link
        href="/study/practice"
        className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-sm shadow-sm transition-colors active:scale-95 cursor-pointer shrink-0"
      >
        <Zap className="w-4 h-4 fill-current text-amber-300" />
        <span>Luyện tập ngay</span>
      </Link>
    </div>
  </div>
);

/** Nút chính cho Mobile: nằm cuối nội dung, gần vùng ngón cái (Rule 13). */
export const AnalyticsMobilePracticeCta: React.FC = () => (
  <Link
    href="/study/practice"
    className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-sm shadow-sm transition-colors active:scale-[0.98] cursor-pointer"
  >
    <Zap className="w-4 h-4 fill-current text-amber-300" />
    <span>Luyện tập ngay</span>
  </Link>
);
