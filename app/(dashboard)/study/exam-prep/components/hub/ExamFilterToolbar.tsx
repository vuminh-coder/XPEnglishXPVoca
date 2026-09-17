import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export interface ExamFilterToolbarProps {
  filterType: string;
  setFilterType: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ExamFilterToolbar({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
}: ExamFilterToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
      {/* Filter Segmented Control */}
      <div className="grid grid-cols-5 gap-1 w-full sm:w-auto sm:flex sm:items-center sm:gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 relative">
        {[
          { id: "ALL", labelMobile: "Tất cả", labelDesktop: "Tất cả bộ đề" },
          { id: "IELTS_FULL", labelMobile: "IELTS 4K", labelDesktop: "IELTS Academic" },
          { id: "TOEIC_LR", labelMobile: "TOEIC L&R", labelDesktop: "TOEIC Nghe & Đọc" },
          { id: "TOEIC_SPEAKING_WRITING", labelMobile: "Nói+Viết", labelDesktop: "TOEIC Nói + Viết" },
          { id: "TOEIC_FULL", labelMobile: "TOEIC 4K", labelDesktop: "TOEIC Full 4K" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            className={`relative px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate z-10 ${
              filterType === tab.id
                ? "text-white font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {filterType === tab.id && (
              <motion.div
                layoutId="examCategoryFilterPill"
                className="absolute inset-0 bg-[#0059bb] rounded-lg shadow-2xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="sm:hidden relative z-10">{tab.labelMobile}</span>
            <span className="hidden sm:inline relative z-10">{tab.labelDesktop}</span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64 shrink-0">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
        <input
          type="text"
          placeholder="Tìm tên đề thi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-3 text-xs font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] shadow-2xs"
        />
      </div>
    </div>
  );
}
