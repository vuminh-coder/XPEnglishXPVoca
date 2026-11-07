"use client";
import React from "react";
import { Crown, Medal, Award } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { LeaderboardUser } from "../../types";

interface PodiumTop3CardProps {
  top1?: LeaderboardUser;
  top2?: LeaderboardUser;
  top3?: LeaderboardUser;
}

const PILLAR = "flex-1 basis-0 min-w-0 max-w-[130px] sm:max-w-[150px] flex flex-col items-center text-center";

export const PodiumTop3Card: React.FC<PodiumTop3CardProps> = ({ top1, top2, top3 }) => {
  return (
    <div className="lg:col-span-5 flex flex-col justify-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50/60 dark:from-amber-500/15 dark:to-slate-900/40 border border-amber-300/40 dark:border-amber-500/20">
      <div className="text-center text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider font-display flex items-center justify-center gap-1.5">
        <Crown className="w-4 h-4 fill-amber-400 text-amber-500" />
        Top 3 Học Viên Dẫn Đầu
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-3 pt-2 pb-1">
        {/* TOP 2: BẠC */}
        {top2 && (
          <div className={`${PILLAR} p-2.5 sm:p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 gap-2 border border-slate-200/90 dark:border-slate-700 shadow-2xs`}>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-2 sm:px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center gap-1">
              <Medal className="w-3 h-3 text-slate-400 fill-slate-300" /> #2
            </span>
            <UserAvatar
              avatarUrl={top2.avatarUrl}
              emoji={top2.avatarEmoji}
              name={top2.fullName}
              size="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="w-full text-xs font-bold text-slate-800 dark:text-white font-display truncate px-0.5" title={top2.fullName}>
              {top2.fullName}
            </div>
            <div className="w-full py-1 rounded-lg bg-slate-700 dark:bg-slate-600 text-white font-bold text-xs tabular-nums truncate px-1">
              {top2.xp?.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* TOP 1: VÀNG */}
        {top1 && (
          <div className={`${PILLAR} p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-amber-100/90 via-amber-50/80 to-white dark:from-amber-950/80 dark:to-slate-800/95 gap-2 shadow-md border-2 border-amber-400/80 relative -top-2`}>
            <span className="text-xs font-black text-amber-800 dark:text-amber-300 px-2.5 sm:px-3 py-0.5 rounded-full bg-amber-200/90 dark:bg-amber-900/90 flex items-center gap-1 whitespace-nowrap">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-400" /> TOP 1
            </span>
            <UserAvatar
              avatarUrl={top1.avatarUrl}
              emoji={top1.avatarEmoji}
              name={top1.fullName}
              size="w-12 h-12 sm:w-14 sm:h-14"
            />
            <div className="w-full text-xs font-black text-amber-950 dark:text-amber-100 font-display truncate px-0.5" title={top1.fullName}>
              {top1.fullName}
            </div>
            <div className="w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs tabular-nums truncate px-1">
              {top1.xp?.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* TOP 3: ĐỒNG */}
        {top3 && (
          <div className={`${PILLAR} p-2.5 sm:p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 gap-2 border border-amber-200/80 dark:border-amber-900/50 shadow-2xs`}>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-700 fill-amber-600" /> #3
            </span>
            <UserAvatar
              avatarUrl={top3.avatarUrl}
              emoji={top3.avatarEmoji}
              name={top3.fullName}
              size="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="w-full text-xs font-bold text-slate-800 dark:text-white font-display truncate px-0.5" title={top3.fullName}>
              {top3.fullName}
            </div>
            <div className="w-full py-1 rounded-lg bg-amber-800 text-amber-100 font-bold text-xs tabular-nums truncate px-1">
              {top3.xp?.toLocaleString()} XP
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
