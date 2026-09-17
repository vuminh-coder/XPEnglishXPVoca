"use client";

import React from "react";
import { Crown, Medal, Award, Sparkles } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { LeaderboardUser } from "../../types";

interface LeaderboardPodiumTop3Props {
  loading: boolean;
  top1?: LeaderboardUser;
  top2?: LeaderboardUser;
  top3?: LeaderboardUser;
}

export const LeaderboardPodiumTop3: React.FC<LeaderboardPodiumTop3Props> = ({
  loading,
  top1,
  top2,
  top3,
}) => {
  if (loading) {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <ShimmerBox className="h-4 w-44 rounded-md" />
          <ShimmerBox className="h-3 w-28 rounded-md" />
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end pt-3 pb-1">
          {/* Silver */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-between space-y-2.5">
            <ShimmerBox className="w-16 h-5 rounded-full" />
            <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
            <ShimmerBox className="w-20 h-4 rounded-md" />
            <ShimmerBox className="w-full h-7 rounded-lg" />
          </div>
          {/* Gold */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300/60 flex flex-col items-center justify-between space-y-3 relative -top-3">
            <ShimmerBox className="w-20 h-6 rounded-full bg-amber-200 dark:bg-amber-800" />
            <ShimmerCircle size="w-12 h-12 sm:w-14 sm:h-14" className="ring-2 ring-amber-300" />
            <ShimmerBox className="w-24 h-4 rounded-md bg-amber-200 dark:bg-amber-800" />
            <ShimmerBox className="w-full h-8 rounded-lg bg-amber-400/40" />
          </div>
          {/* Bronze */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-between space-y-2.5">
            <ShimmerBox className="w-16 h-5 rounded-full" />
            <ShimmerCircle size="w-10 h-10 sm:w-12 sm:h-12" />
            <ShimmerBox className="w-20 h-4 rounded-md" />
            <ShimmerBox className="w-full h-7 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-display">
            Bục Vinh Danh Top 3
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#0059bb] dark:text-sky-400">
          Cập nhật thời gian thực
        </span>
      </div>

      {/* 3 Columns: Silver, Gold, Bronze */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-3 pb-1">
        {/* TOP 2 - BẠC */}
        {top2 && (
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 text-center flex flex-col items-center justify-between space-y-2 shadow-2xs">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold font-mono text-[11px] flex items-center gap-1">
              <Medal className="w-3.5 h-3.5 text-slate-400" /> #2
            </span>
            <UserAvatar
              avatarUrl={top2.avatarUrl}
              emoji={top2.avatarEmoji}
              name={top2.fullName}
              size="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="min-w-0 w-full">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
                {top2.fullName}
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                Cấp {top2.level || 1}
              </span>
            </div>
            <div className="w-full py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-black font-mono text-xs">
              {top2.xp?.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* TOP 1 - VÀNG (CENTER & ELEVATED) */}
        {top1 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-600 text-center flex flex-col items-center justify-between space-y-2.5 relative -top-3 shadow-md shadow-amber-500/10">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black font-mono text-xs flex items-center gap-1 shadow-2xs">
              <Crown className="w-3.5 h-3.5 fill-current" /> #1 Vô địch
            </span>
            <div className="relative">
              <UserAvatar
                avatarUrl={top1.avatarUrl}
                emoji={top1.avatarEmoji}
                name={top1.fullName}
                size="w-12 h-12 sm:w-14 sm:h-14"
                className="ring-3 ring-amber-400"
              />
              <Sparkles
                className="w-4 h-4 text-amber-400 fill-amber-400 absolute -top-1 -right-1 animate-spin"
                style={{ animationDuration: "6s" }}
              />
            </div>
            <div className="min-w-0 w-full">
              <div className="font-black text-xs sm:text-base text-slate-900 dark:text-white truncate font-display">
                {top1.fullName}
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold block truncate">
                Quán Quân
              </span>
            </div>
            <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black font-mono text-xs sm:text-sm shadow-2xs">
              {top1.xp?.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* TOP 3 - ĐỒNG */}
        {top3 && (
          <div className="p-3 sm:p-4 rounded-2xl bg-amber-900/5 dark:bg-amber-950/30 border border-amber-800/20 text-center flex flex-col items-center justify-between space-y-2 shadow-2xs">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-800/20 text-amber-800 dark:text-amber-300 font-bold font-mono text-[11px] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> #3
            </span>
            <UserAvatar
              avatarUrl={top3.avatarUrl}
              emoji={top3.avatarEmoji}
              name={top3.fullName}
              size="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="min-w-0 w-full">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
                {top3.fullName}
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                Cấp {top3.level || 1}
              </span>
            </div>
            <div className="w-full py-1.5 rounded-xl bg-amber-800/15 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-black font-mono text-xs">
              {top3.xp?.toLocaleString()} XP
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
