"use client";

import React from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui";

interface FriendSearchBarProps {
  friendName: string;
  onFriendNameChange: (val: string) => void;
  onSearchAndAdd: () => void;
}

export const FriendSearchBar: React.FC<FriendSearchBarProps> = ({
  friendName,
  onFriendNameChange,
  onSearchAndAdd,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-display">
        <Search className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> Tìm Kiếm Bạn Bè Theo Username:
      </label>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={friendName}
            onChange={(e) => onFriendNameChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearchAndAdd()}
            placeholder="Nhập tên người dùng hoặc username..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] font-medium"
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onSearchAndAdd}
          disabled={!friendName.trim()}
          className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" /> Kết bạn
        </Button>
      </div>
    </div>
  );
};
