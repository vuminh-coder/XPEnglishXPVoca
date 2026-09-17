"use client";

import React from "react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { LeaderboardUser } from "../../types";

interface LeaderboardRanksTableProps {
  loading: boolean;
  ranks: LeaderboardUser[];
}

export const LeaderboardRanksTable: React.FC<LeaderboardRanksTableProps> = ({
  loading,
  ranks,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
          Danh Sách Xếp Hạng ({ranks.length})
        </h3>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[4, 5, 6, 7].map((r) => (
            <div
              key={r}
              className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <ShimmerBox className="w-6 h-6 rounded" />
                <ShimmerCircle size="w-9 h-9" />
                <div className="space-y-1">
                  <ShimmerBox className="w-32 h-4 rounded" />
                  <ShimmerBox className="w-20 h-3 rounded" />
                </div>
              </div>
              <ShimmerBox className="w-16 h-6 rounded-lg" />
            </div>
          ))}
        </div>
      ) : ranks.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-400 font-medium">
          Không tìm thấy học viên nào phù hợp.
        </div>
      ) : (
        <div className="space-y-2 max-h-[480px] overflow-y-auto no-scrollbar pr-0.5">
          {ranks.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                item.isCurrentUser
                  ? "bg-[#0059bb]/10 border-[#0059bb]/40 font-bold shadow-2xs"
                  : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 text-center font-mono font-black text-slate-400 shrink-0 text-xs">
                  #{item.rank}
                </span>
                <UserAvatar
                  avatarUrl={item.avatarUrl}
                  emoji={item.avatarEmoji}
                  name={item.fullName}
                  size="w-8 h-8 sm:w-9 sm:h-9"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5">
                    <span>{item.fullName}</span>
                    {item.isCurrentUser && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#0059bb] text-white font-bold">
                        Bạn
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    Cấp {item.level || 1} · Streak {item.streak || 1} ngày 🔥
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-xs sm:text-sm text-[#0059bb] dark:text-sky-400">
                  {item.xp?.toLocaleString()} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
