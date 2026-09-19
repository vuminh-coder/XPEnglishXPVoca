"use client";

import React from "react";
import Link from "next/link";
import { Video, MessageSquare, Clock, BookmarkCheck, Target } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { ShimmerBox, ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";
import { formatPercent } from "@/shared/utils/formatPercent";

interface DashboardHeroGreetingProps {
  user: any;
  userTitle: string;
  savedWordsCount: number;
  xpPercent: number;
  isLoading?: boolean;
  isLoadingCheckin?: boolean;
}

export function DashboardHeroGreeting({
  user,
  userTitle,
  savedWordsCount,
  xpPercent,
  isLoading = false,
  isLoadingCheckin,
}: DashboardHeroGreetingProps) {
  const isActuallyLoading = isLoadingCheckin ?? isLoading;
  const displayName = formatCleanName(user?.fullName || user?.username || user?.email || "Bạn");

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
      {/* Upper Greeting & User Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="shrink-0">
            {isActuallyLoading ? (
              <ShimmerCircle size="w-12 h-12 sm:w-13 sm:h-13" />
            ) : (
              <UserAvatar
                avatar={(user as any)?.avatarUrl || user?.imageUrl || (user as any)?.avatar}
                imageUrl={user?.imageUrl}
                emoji={user?.avatarEmoji}
                name={displayName}
                size="w-12 h-12 sm:w-13 sm:h-13"
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {isActuallyLoading ? (
                <ShimmerBox className="h-6 w-48 rounded-md" />
              ) : (
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display truncate">
                  Chào mừng trở lại, {displayName}!
                </h1>
              )}
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                Lv.{user?.level || 1} • {userTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Kiên trì luyện tập từng ngày để bứt phá mục tiêu Tiếng Anh của bạn!
            </p>
          </div>
        </div>

        {/* Quick Shortlink Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/myvideo">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Video/Audio</span>
            </button>
          </Link>
          <Link href="/community">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Cộng đồng</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

      {/* 4 Double-Bezel Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Streak (Amber Gold) */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-800/60 shadow-2xs group">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform p-1 overflow-hidden">
            <img
              src="/images/streak-flame-crystal.png"
              alt="Streak Flame 3D"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]"
            />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                {user?.currentStreak || 1}{" "}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                  ngày
                </span>
              </div>
            )}
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Chuỗi học liên tiếp
            </div>
          </div>
        </div>

        {/* Metric 2: Study Time (Sky Blue) */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-sky-300 dark:hover:border-sky-800/60 shadow-2xs group">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                {Math.floor((user?.minutesStudied || 15) / 60)}h {(user?.minutesStudied || 15) % 60}m
              </div>
            )}
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Thời gian luyện tập
            </div>
          </div>
        </div>

        {/* Metric 3: Saved Words (Emerald Green) */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/60 shadow-2xs group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <BookmarkCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                {savedWordsCount}{" "}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                  từ
                </span>
              </div>
            )}
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Vốn từ đã tích lũy
            </div>
          </div>
        </div>

        {/* Metric 4: Total XP & Level Bar (Royal Blue) */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-800/60 shadow-2xs group">
          <div className="w-10 h-10 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              {isActuallyLoading ? (
                <ShimmerBox className="h-5 w-16 rounded" />
              ) : (
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                  {user?.totalXp || 0}{" "}
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-sans">
                    XP
                  </span>
                </div>
              )}
              <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[9.5px] shrink-0">
                {formatPercent(xpPercent)}
              </span>
            </div>
            <div className="w-full mt-0.5">
              <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-purple-600 transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                Tiến độ cấp độ Lv.{user?.level || 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
