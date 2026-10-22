"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X, BookOpen, CheckCircle, Layers, Award, RefreshCw } from "lucide-react";
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
    completed?: number;
  };
  onRefresh?: () => void;
}

export function GrammarStudioToolbar({
  activeLevel,
  onLevelChange,
  searchQuery,
  onSearchChange,
  counts,
  onRefresh,
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
    {
      id: "completed",
      label: "Đã Thuộc",
      count: counts.completed || 0,
      icon: <CheckCircle className="w-3.5 h-3.5" />,
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

      {/* Right Action: Active Search Filter Pill + Force Refresh Button */}
      <div className="flex items-center gap-2 shrink-0">
        {searchQuery && searchQuery.trim() !== "" && onSearchChange && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-300 text-xs font-semibold shrink-0 animate-in fade-in duration-200">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="max-w-[140px] sm:max-w-[200px] truncate">&ldquo;{searchQuery}&rdquo;</span>
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="p-0.5 rounded-md text-[#0059bb]/70 hover:text-[#0059bb] hover:bg-blue-100 dark:hover:bg-blue-900/80 cursor-pointer transition-colors"
              title="Xóa bộ lọc tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="h-9 px-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 select-none"
            title="Làm mới tiến độ từ máy chủ"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        )}
      </div>
    </div>
  );
}
