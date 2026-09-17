"use client";

import React from "react";
import { Users, UserMinus } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { FriendUser } from "../../types";

interface ActiveFriendsListProps {
  loading: boolean;
  friends: FriendUser[];
  onRemoveFriend: (id: string) => void;
}

export const ActiveFriendsList: React.FC<ActiveFriendsListProps> = ({
  loading,
  friends,
  onRemoveFriend,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 font-display">
          <Users className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Bạn Bè Đang Hoạt Động ({friends.length}):
        </h3>
      </div>

      {loading ? (
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <ShimmerCircle size="w-10 h-10" />
                <div className="space-y-1.5">
                  <ShimmerBox className="w-36 h-4 rounded-md" />
                  <ShimmerBox className="w-24 h-3 rounded-md" />
                </div>
              </div>
              <ShimmerBox className="w-20 h-7 rounded-lg" />
            </div>
          ))}
        </div>
      ) : friends.length === 0 ? (
        <div className="p-8 text-center space-y-2">
          <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
            Chưa có bạn bè nào trong danh sách
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium leading-relaxed">
            Hãy kết bạn từ danh sách gợi ý bên phải để nhận thưởng +10 XP và cùng nhau thi đấu từ vựng nhé!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {friends.map((f) => {
            const cleanFriendName = formatCleanName(f.fullName || f.username);
            return (
              <div
                key={f.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-3 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <UserAvatar
                    avatar={f.avatar}
                    avatarUrl={f.avatarUrl}
                    imageUrl={f.imageUrl}
                    emoji={f.avatarEmoji}
                    name={cleanFriendName}
                    size="w-9 h-9 sm:w-10 sm:h-10"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {cleanFriendName}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      Cấp {f.level || 1} · {f.title || "Học viên năng nổ"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40 font-mono">
                    {f.xp || 0} XP
                  </span>
                  <button
                    onClick={() => onRemoveFriend(f.id)}
                    title="Hủy kết bạn"
                    className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-slate-500 dark:text-slate-400 text-xs transition-all cursor-pointer"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
