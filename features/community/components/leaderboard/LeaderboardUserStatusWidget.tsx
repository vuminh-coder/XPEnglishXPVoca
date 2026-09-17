"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";

interface LeaderboardUserStatusWidgetProps {
  user: any;
  userRankNum: string | number;
  currentUserXp: number;
}

export const LeaderboardUserStatusWidget: React.FC<LeaderboardUserStatusWidgetProps> = ({
  user,
  userRankNum,
  currentUserXp,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <UserAvatar
          avatarUrl={user?.imageUrl || user?.avatar || user?.avatarUrl}
          emoji={user?.avatarEmoji || "🦉"}
          name={user?.fullName || "Bạn"}
          size="w-11 h-11"
        />
        <div className="min-w-0">
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate font-display">
            {formatCleanName(user?.fullName || user?.username || "Chiến binh XP")}
          </div>
          <span className="text-[11px] text-slate-400">
            Cấp {user?.level || 1} · {user?.title || "Học viên năng nổ"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-center">
          <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase font-bold block">
            Hạng tuần
          </span>
          <span className="text-base font-black font-mono text-amber-900 dark:text-amber-200">
            #{userRankNum}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-center">
          <span className="text-[10px] text-[#0059bb] dark:text-sky-400 uppercase font-bold block">
            Tổng điểm XP
          </span>
          <span className="text-base font-black font-mono text-[#0059bb] dark:text-sky-300">
            {currentUserXp?.toLocaleString() || 0}
          </span>
        </div>
      </div>

      <Link
        href="/study/practice"
        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs transition-all active:scale-95 shadow-2xs"
      >
        <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
        <span>Luyện Tập Đua Top +15 XP</span>
      </Link>
    </div>
  );
};
