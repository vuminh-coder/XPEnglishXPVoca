"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface GroupFilterNavProps {
  filter: string;
  onFilterChange: (f: string) => void;
  onCreateGroup: () => void;
}

const GROUP_FILTERS = [
  { id: "all", label: "Tất cả nhóm" },
  { id: "joined", label: "Đã tham gia" },
  { id: "exam", label: "TOEIC & IELTS" },
  { id: "speaking", label: "Giao tiếp IPA" },
];

export const GroupFilterNav: React.FC<GroupFilterNavProps> = ({
  filter,
  onFilterChange,
  onCreateGroup,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
      {/* LEVEL 2 SUB-TABS: GROUP FILTERS */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
        {GROUP_FILTERS.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 font-display ${
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeGroupsFilterIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onCreateGroup}
        className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 font-display self-start sm:self-auto cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Tạo nhóm mới
      </button>
    </div>
  );
};
