"use client";

import React from "react";
import { Sparkles, UserPlus } from "lucide-react";
import { UserAvatar, formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { FriendSuggestion } from "../../types";

interface FriendSuggestionsListProps {
  loading: boolean;
  suggestions: FriendSuggestion[];
  onAddFriend: (id: string, name: string) => void;
  isSidebar?: boolean;
}

export const FriendSuggestionsList: React.FC<FriendSuggestionsListProps> = ({
  loading,
  suggestions,
  onAddFriend,
  isSidebar = false,
}) => {
  const displayList = isSidebar ? suggestions.slice(0, 5) : suggestions;

  if (loading) {
    return (
      <div className="space-y-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <ShimmerCircle size="w-8 h-8" />
              <div className="space-y-1">
                <ShimmerBox className="w-24 h-3.5 rounded" />
                <ShimmerBox className="w-16 h-2.5 rounded" />
              </div>
            </div>
            <ShimmerBox className="w-16 h-7 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (displayList.length === 0) {
    return (
      <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-3 font-medium">
        Không có gợi ý bạn học mới lúc này.
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      {displayList.map((s) => {
        const cleanSuggName = formatCleanName(s.fullName || s.username);
        return (
          <div
            key={s.id}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <UserAvatar
                avatar={s.avatar}
                avatarUrl={s.avatarUrl}
                imageUrl={s.imageUrl}
                emoji={s.avatarEmoji}
                name={cleanSuggName}
                size="w-8 h-8"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                  {cleanSuggName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Cấp {s.level || 1} · {s.title || "Học viên"}
                </div>
              </div>
            </div>

            <button
              onClick={() => onAddFriend(s.id, cleanSuggName)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white text-[11px] font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" /> Kết bạn
            </button>
          </div>
        );
      })}
    </div>
  );
};
