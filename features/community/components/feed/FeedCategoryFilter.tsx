"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

interface FeedCategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

const FEED_CATEGORIES = [
  { id: "all", label: "Tất cả bài viết" },
  { id: "#hoidap", label: "#Hỏi đáp" },
  { id: "#chiase", label: "#Chia sẻ kinh nghiệm" },
  { id: "#ielts", label: "#IELTS / TOEIC" },
  { id: "#thaoluan", label: "#Thảo luận chung" },
];

export const FeedCategoryFilter: React.FC<FeedCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
      {FEED_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 font-display ${
              isActive
                ? "text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeFeedFilterIndicator"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {cat.id !== "all" && <Hash className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />}
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
