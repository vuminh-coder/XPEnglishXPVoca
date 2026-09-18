"use client";

import React from "react";
import Link from "next/link";
import { BookmarkCheck, Target, Swords, Flame, Sparkles } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { IpaMetricCard } from "../shared/IpaMetricCard";

export interface IpaHeroGreetingProps {
  user: any;
  userTitle?: string;
  masteredCount?: number;
  totalCount?: number;
  averageScore?: number;
  pairsLearnedCount?: number;
  streakDays?: number;
  onNavigateTab?: (tab: "matrix" | "practice_lab" | "minimal_pairs") => void;
  className?: string;
}

export const IpaHeroGreeting: React.FC<IpaHeroGreetingProps> = ({
  user,
  userTitle = "Phonics Explorer",
  masteredCount = 18,
  totalCount = 44,
  averageScore = 88,
  pairsLearnedCount = 7,
  streakDays,
  onNavigateTab,
  className = "",
}) => {
  const displayName = formatCleanName(user?.fullName || user?.username || user?.email || "Học viên");
  const actualStreak = streakDays ?? user?.currentStreak ?? 1;
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4 select-none ${className}`}
    >
      {/* Upper Greeting & Quick Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="shrink-0">
            <UserAvatar
              avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
              imageUrl={user?.imageUrl}
              emoji={user?.avatarEmoji}
              name={displayName}
              size="w-12 h-12 sm:w-13 sm:h-13"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                Studio Phát Âm IPA • {displayName}
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                Lv.{user?.level || 1} • {userTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
              <span>Đã làm chủ <strong className="text-slate-800 dark:text-slate-200">{masteredCount}/{totalCount}</strong> âm chuẩn quốc tế</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[#0059bb] dark:text-sky-400 font-bold">{progressPercent}% Hoàn thành</span>
            </p>
          </div>
        </div>

        {/* Quick Mode Switching Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab && onNavigateTab("practice_lab")}
            className="px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            <span>Phòng Thực Hành AI</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab && onNavigateTab("minimal_pairs")}
            className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-800/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Swords className="w-3.5 h-3.5 text-purple-500" />
            <span>Đấu Cặp Âm</span>
          </button>
        </div>
      </div>

      {/* Thin Horizontal Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

      {/* 4 Bento Metric Cards Grid (Double-Bezel Standard) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Mastered Sounds */}
        <IpaMetricCard
          icon={<BookmarkCheck className="w-5 h-5 stroke-[2.2]" />}
          iconBgClass="bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-800/50"
          value={masteredCount}
          unit={`/${totalCount} âm`}
          label="Âm đã thuần thục"
          subText="Chuẩn Oxford / Cambridge"
          onClick={() => onNavigateTab && onNavigateTab("matrix")}
        />

        {/* Metric 2: AI Fluency Score */}
        <IpaMetricCard
          icon={<Target className="w-5 h-5 stroke-[2.2]" />}
          iconBgClass="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
          value={averageScore}
          unit="%"
          label="Độ chuẩn xác AI trung bình"
          subText="Khẩu hình & Cao độ âm"
          onClick={() => onNavigateTab && onNavigateTab("practice_lab")}
        />

        {/* Metric 3: Minimal Pairs Completed */}
        <IpaMetricCard
          icon={<Swords className="w-5 h-5 stroke-[2.2]" />}
          iconBgClass="bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50"
          value={pairsLearnedCount}
          unit="/12 cặp"
          label="Cặp âm đã phân biệt"
          subText="Đấu trường tai nghe"
          onClick={() => onNavigateTab && onNavigateTab("minimal_pairs")}
        />

        {/* Metric 4: Pronunciation Streak */}
        <IpaMetricCard
          icon={<Flame className="w-5 h-5 stroke-[2.2] fill-amber-500 text-amber-500" />}
          iconBgClass="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50"
          value={actualStreak}
          unit="ngày"
          label="Chuỗi luyện phát âm"
          subText="Kỷ lục liên tiếp"
        />
      </div>
    </div>
  );
};
