"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Sparkles } from "lucide-react";

interface FriendsSubTabNavProps {
  activeSubTab: "friends" | "requests" | "suggestions";
  onSubTabChange: (tab: "friends" | "requests" | "suggestions") => void;
  friendsCount: number;
  requestsCount: number;
  suggestionsCount: number;
}

export const FriendsSubTabNav: React.FC<FriendsSubTabNavProps> = ({
  activeSubTab,
  onSubTabChange,
  friendsCount,
  requestsCount,
  suggestionsCount,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
      <button
        type="button"
        onClick={() => onSubTabChange("friends")}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
          activeSubTab === "friends"
            ? "text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
        }`}
      >
        {activeSubTab === "friends" && (
          <motion.span
            layoutId="activeFriendsSubTabIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
          <span>Danh sách bạn bè ({friendsCount})</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSubTabChange("requests")}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
          activeSubTab === "requests"
            ? "text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
        }`}
      >
        {activeSubTab === "requests" && (
          <motion.span
            layoutId="activeFriendsSubTabIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5 text-amber-500" />
          <span>Lời mời ({requestsCount})</span>
          {requestsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSubTabChange("suggestions")}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display sm:hidden ${
          activeSubTab === "suggestions"
            ? "text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
        }`}
      >
        {activeSubTab === "suggestions" && (
          <motion.span
            layoutId="activeFriendsSubTabIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Gợi ý ({suggestionsCount})</span>
        </span>
      </button>
    </div>
  );
};
