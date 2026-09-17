"use client";

import React from "react";
import { Layers, BookMarked, Clock, Sparkles } from "lucide-react";

export interface VocabularyStatsBarProps {
  levelMode: "basic" | "advanced";
  basicCount: number;
  advancedCount: number;
}

export function VocabularyStatsBar({
  levelMode,
  basicCount,
  advancedCount,
}: VocabularyStatsBarProps) {
  const stats = [
    {
      title: "Bộ Chủ Đề",
      value: levelMode === "basic" ? `${basicCount} Chủ Đề` : `${advancedCount} Chủ Đề`,
      icon: Layers,
      color: "text-[#0059bb] dark:text-sky-400",
      bg: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Kho Từ Vựng",
      value: levelMode === "basic" ? "1.248+ Từ" : "8.900+ Từ",
      icon: BookMarked,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Mục Tiêu Học",
      value: levelMode === "basic" ? "10 Từ / Ngày" : "15 Từ / Ngày",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      title: "Trí Nhớ SRS",
      value: "86% Ghi Nhớ",
      icon: Sparkles,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] group"
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-bold">
              <span>{item.title}</span>
              <div
                className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5">
              <span
                className={`text-xl sm:text-2xl font-black font-display tracking-tight ${item.color} whitespace-nowrap truncate block`}
              >
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
