"use client";

import React from "react";
import { Trophy } from "lucide-react";

export const LeaderboardWeeklyRewardsWidget: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-display">
          Phần Thưởng Top 3 Tuần
        </h4>
      </div>
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
          <span className="font-bold text-amber-600">🥇 Top 1:</span>
          <span className="font-mono font-bold">+500 XP & Huy hiệu Vàng</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
          <span className="font-bold text-slate-500">🥈 Top 2:</span>
          <span className="font-mono font-bold">+300 XP & Huy hiệu Bạc</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700">
          <span className="font-bold text-amber-800 dark:text-amber-400">🥉 Top 3:</span>
          <span className="font-mono font-bold">+150 XP & Huy hiệu Đồng</span>
        </div>
      </div>
    </div>
  );
};
