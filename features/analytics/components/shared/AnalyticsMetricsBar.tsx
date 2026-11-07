"use client";
import React from "react";
import { Flame, BookmarkCheck, Clock, Target, Trophy } from "lucide-react";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface AnalyticsMetricsBarProps {
  isLoading: boolean;
  longestStreak: number;
  savedWords: number;
  minutesStudied: string;
  totalXp: string;
  weeklyRank: string;
}

export const AnalyticsMetricsBar: React.FC<AnalyticsMetricsBarProps> = ({
  isLoading,
  longestStreak,
  savedWords,
  minutesStudied,
  totalXp,
  weeklyRank,
}) => {
  const cards = [
    {
      label: "Chuỗi dài nhất",
      value: longestStreak,
      suffix: "ngày",
      Icon: Flame,
      tile: "bg-amber-50 dark:bg-amber-950/40 text-amber-500",
      iconClass: "w-5 h-5 fill-amber-400 text-amber-500",
      hover: "hover:border-amber-300 dark:hover:border-amber-700/50",
      skeleton: "w-14",
    },
    {
      label: "Vốn từ đã tích lũy",
      value: savedWords,
      suffix: "từ",
      Icon: BookmarkCheck,
      tile: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      iconClass: "w-5 h-5",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-700/50",
      skeleton: "w-16",
    },
    {
      label: "Thời gian học",
      value: minutesStudied,
      suffix: "",
      Icon: Clock,
      tile: "bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400",
      iconClass: "w-5 h-5",
      hover: "hover:border-blue-300 dark:hover:border-blue-700/50",
      skeleton: "w-12",
    },
    {
      label: "Tổng điểm tích lũy",
      value: totalXp,
      suffix: "",
      Icon: Target,
      tile: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      iconClass: "w-5 h-5",
      hover: "hover:border-purple-300 dark:hover:border-purple-700/50",
      skeleton: "w-20",
    },
    {
      label: "Hạng của bạn",
      value: weeklyRank,
      suffix: "Tuần",
      Icon: Trophy,
      tile: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      iconClass: "w-5 h-5 text-amber-500 fill-amber-400",
      hover: "hover:border-amber-300 dark:hover:border-amber-700/50",
      skeleton: "w-16",
    },
  ];

  // Mobile: 2 cột (thẻ cuối trải 2 cột) · Tablet: 3 + 2 cân đối · Desktop rộng: 5 cột
  const spanFor = (idx: number) =>
    idx === 4
      ? "col-span-2 sm:col-span-3 xl:col-span-1"
      : idx === 3
      ? "sm:col-span-3 xl:col-span-1"
      : "sm:col-span-2 xl:col-span-1";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 xl:grid-cols-5 gap-3.5">
      {cards.map((card, idx) => (
        <div
          key={card.label}
          className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 flex items-center gap-3.5 transition-all duration-200 hover:-translate-y-0.5 ${card.hover} ${spanFor(
            idx
          )}`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5 shadow-2xs ${card.tile}`}>
            <card.Icon className={card.iconClass} />
          </div>
          <div className="min-w-0 flex-1">
            {isLoading ? (
              <ShimmerBox className={`h-6 ${card.skeleton} rounded-lg my-0.5`} />
            ) : (
              <div className="text-xl font-black font-display text-slate-900 dark:text-white leading-tight tabular-nums">
                {card.value}
                {card.suffix && (
                  <span className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                    {card.suffix}
                  </span>
                )}
              </div>
            )}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-tight mt-0.5">
              {card.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
