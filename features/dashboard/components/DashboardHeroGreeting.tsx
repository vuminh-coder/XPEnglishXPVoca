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

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {isActuallyLoading ? (
                <ShimmerBox className="h-6 w-48 rounded-md" />
              ) : (
                <h1 className="text-[15px] sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-snug">
                  <span className="text-slate-600 dark:text-slate-300 font-bold sm:font-extrabold sm:text-slate-900 dark:sm:text-white">
                    Chào mừng trở lại,
                  </span>{" "}
                  <br className="sm:hidden" />
                  <span>{displayName}!</span>
                </h1>
              )}
              <span className="px-2 py-0.5 rounded-md bg-blue-50/80 dark:bg-slate-800 text-[#0059bb] dark:text-sky-300 text-[11px] font-bold font-mono border border-blue-200/70 dark:border-slate-700/60 shadow-2xs shrink-0 self-end sm:self-center">
                Lv.{user?.level || 1} • {userTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Kiên trì luyện tập từng ngày để bứt phá mục tiêu Tiếng Anh của bạn!
            </p>
          </div>
        </div>

        {/* Quick Shortlink Actions - Hidden on mobile (< sm) as BottomNav already provides direct tabs */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <Link href="/myvideo">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Video className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Video/Audio</span>
            </button>
          </Link>
          <Link href="/community">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Cộng đồng</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

      {/* 4 Double-Bezel Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Metric 1: Streak (Amber Gold) */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-800/60 shadow-2xs group">
          <div className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs p-1 overflow-hidden">
            <img
              src="/images/streak-flame-crystal.png"
              alt="Streak Flame"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white tabular-nums truncate leading-tight">
                {user?.currentStreak || 1}{" "}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                  ngày
                </span>
              </div>
            )}
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
              <span className="sm:hidden">Chuỗi ngày</span>
              <span className="hidden sm:inline">Chuỗi học liên tiếp</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Study Time (Sky Blue) */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3 transition-all hover:border-sky-300 dark:hover:border-sky-800/60 shadow-2xs group">
          <div className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Clock className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white tabular-nums truncate leading-tight">
                {Math.floor((user?.minutesStudied || 15) / 60)}h {(user?.minutesStudied || 15) % 60}m
              </div>
            )}
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
              <span className="sm:hidden">Thời gian học</span>
              <span className="hidden sm:inline">Thời gian luyện tập</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Saved Words (Emerald Green) */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/60 shadow-2xs group">
          <div className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <BookmarkCheck className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            {isActuallyLoading ? (
              <ShimmerBox className="h-5 w-16 rounded" />
            ) : (
              <div className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white tabular-nums truncate leading-tight">
                {savedWordsCount}{" "}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                  từ
                </span>
              </div>
            )}
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
              <span className="sm:hidden">Từ tích lũy</span>
              <span className="hidden sm:inline">Vốn từ đã tích lũy</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Total XP & Level Bar (Royal Blue) */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-800/60 shadow-2xs group">
          <div className="w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-lg bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Target className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              {isActuallyLoading ? (
                <ShimmerBox className="h-5 w-16 rounded" />
              ) : (
                <div className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white tabular-nums truncate leading-tight">
                  {user?.totalXp || 0}{" "}
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-sans">
                    XP
                  </span>
                </div>
              )}
              <span className="px-1.5 py-0.5 rounded bg-blue-100/90 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[10px] shrink-0 leading-none">
                {formatPercent(xpPercent, { decimals: 0 })}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-tight shrink-0 font-mono">
                Lv.{user?.level || 1}
              </div>
              <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0059bb] dark:bg-sky-400 transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
