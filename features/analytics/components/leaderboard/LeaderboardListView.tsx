"use client";
import React from "react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { LeaderboardUser } from "../../types";

interface LeaderboardListViewProps {
  processedLeaderboard: LeaderboardUser[];
  visibleLeaderboardCount: number;
  totalCount: number;
  onLoadMore: () => void;
}

export const LeaderboardListView: React.FC<LeaderboardListViewProps> = ({
  processedLeaderboard,
  visibleLeaderboardCount,
  totalCount,
  onLoadMore,
}) => {
  return (
    <div className="lg:col-span-7 flex flex-col min-w-0">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-display">
        Danh Sách Học Viên Khác
      </div>

      <div
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollTop + clientHeight >= scrollHeight - 20) {
            if (visibleLeaderboardCount < processedLeaderboard.length) {
              onLoadMore();
            }
          }
        }}
        className="max-h-[320px] sm:max-h-[350px] overflow-y-auto pr-1.5 space-y-2 no-scrollbar"
      >
        {processedLeaderboard.slice(3, 3 + visibleLeaderboardCount).map((item) => {
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                item.isSelf
                  ? "bg-[#0059bb]/10 border-[#0059bb]/40 font-bold shadow-2xs"
                  : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 text-center font-mono font-black text-slate-400 shrink-0 text-xs">
                  #{item.rank}
                </span>
                <UserAvatar
                  avatarUrl={item.avatarUrl}
                  emoji={item.avatarEmoji}
                  name={item.fullName}
                  size="w-8 h-8"
                />
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 dark:text-white truncate font-display flex items-center gap-1.5 text-xs sm:text-sm">
                    {item.fullName}
                    {item.isSelf && (
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-[#0059bb] text-white font-black shadow-2xs">
                        Bạn
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="px-1.5 py-0.2 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono font-extrabold text-[11px] border border-blue-200/60 dark:border-blue-800/40">
                      Lv.{item.level || 1}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="truncate">{item.title || "Học viên"}</span>
                  </div>
                </div>
              </div>

              <div className="font-black font-mono text-[#0059bb] dark:text-sky-400 text-xs shrink-0 pl-2">
                {item.xp?.toLocaleString()} XP
              </div>
            </div>
          );
        })}

        {visibleLeaderboardCount < totalCount - 3 && (
          <button
            onClick={onLoadMore}
            className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center text-xs font-bold text-[#0059bb] hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer font-display transition-colors"
          >
            Tải thêm thứ hạng tiếp theo...
          </button>
        )}
      </div>
    </div>
  );
};
