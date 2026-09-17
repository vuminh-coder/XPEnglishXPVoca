"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X, BookOpen, CheckCircle, Layers, Award } from "lucide-react";
import { GrammarFilterLevel } from "../../hooks/useGrammarCatalog";

interface GrammarStudioToolbarProps {
  activeLevel: GrammarFilterLevel;
  onLevelChange: (level: GrammarFilterLevel) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  counts: {
    all: number;
    basic: number;
    intermediate: number;
    advanced: number;
  };
}

export function GrammarStudioToolbar({
  activeLevel,
  onLevelChange,
  searchQuery,
  onSearchChange,
  counts,
}: GrammarStudioToolbarProps) {
  const levelItems: Array<{
    id: GrammarFilterLevel;
    label: string;
    count: number;
    icon: React.ReactNode;
  }> = [
    {
      id: "all",
      label: "Tất Cả",
      count: counts.all,
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      id: "basic",
      label: "Nền Tảng 500+",
      count: counts.basic,
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    {
      id: "intermediate",
      label: "Bứt Phá 750+",
      count: counts.intermediate,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: "advanced",
      label: "Chinh Phục 900+",
      count: counts.advanced,
      icon: <Award className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* 4 Level Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100/90 dark:bg-slate-950/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 scrollbar-none shrink-0">
        {levelItems.map((item) => {
          const isActive = activeLevel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onLevelChange(item.id)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? "text-[#0059bb] dark:text-sky-300 font-display shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="grammarLevelToolbarPill"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-2xs border border-slate-200/80 dark:border-slate-700/80"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item.icon}
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                    isActive
                      ? "bg-[#0059bb]/10 dark:bg-sky-400/20 text-[#0059bb] dark:text-sky-300"
                      : "bg-slate-200/70 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {item.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Box */}
      <div className="relative w-full md:max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm theo tên thì, cấu trúc, kỳ thi (TOEIC, IELTS)..."
          className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
