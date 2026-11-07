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
  const others = processedLeaderboard.slice(3, 3 + visibleLeaderboardCount);

  return (
    <div className="lg:col-span-7 flex flex-col min-w-0">
      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 font-display">
        Danh Sách Học Viên Khác
      </div>

      {others.length === 0 ? (
        <div className="flex-1 min-h-[120px] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 flex items-center justify-center p-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          Chưa có thêm học viên nào trên bảng xếp hạng tuần này.
        </div>
      ) : (
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
          {others.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-colors text-xs ${
                item.isSelf
                  ? "bg-[#0059bb]/10 border-[#0059bb]/40"
                  : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 text-center font-black text-slate-500 shrink-0 text-xs tabular-nums">
                  #{item.rank}
                </span>
                <UserAvatar
                  avatarUrl={item.avatarUrl}
                  emoji={item.avatarEmoji}
                  name={item.fullName}
                  size="w-8 h-8"
                />
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 dark:text-white font-display flex flex-wrap items-center gap-1.5 text-sm leading-tight break-words">
                    {item.fullName}
                    {item.isSelf && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#0059bb] text-white font-bold leading-none">
                        Bạn
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1.5 mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 tabular-nums">
                      Cấp {item.level || 1}
                    </span>
                    <span>{item.title || "Học viên"}</span>
                  </div>
                </div>
              </div>

              <div className="font-black text-[#0059bb] dark:text-sky-400 text-sm shrink-0 tabular-nums whitespace-nowrap">
                {item.xp?.toLocaleString()} XP
              </div>
            </div>
          ))}

          {visibleLeaderboardCount < totalCount - 3 && (
            <button
              type="button"
              onClick={onLoadMore}
              className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-center text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer font-display transition-colors"
            >
              Xem thêm học viên
            </button>
          )}
        </div>
      )}
    </div>
  );
};
