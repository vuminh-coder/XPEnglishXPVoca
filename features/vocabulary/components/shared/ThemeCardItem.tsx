"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSemanticThemeIcon } from "../../utils/themeSemanticIcons";

export interface ThemeCardItemData {
  id: string;
  name: string;
  nameEn: string;
  icon?: string;
  totalVocabs: number;
  difficulty: number;
}

export interface ThemeCardItemProps {
  theme: ThemeCardItemData;
}

export function ThemeCardItem({ theme }: ThemeCardItemProps) {
  const percentage = Math.min(100, 25 + (theme.difficulty || 1) * 15);

  return (
    <Link href={`/vocabulary/${theme.id}`} className="group block min-w-0">
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-[#0059bb]/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-3.5 h-full cursor-pointer relative overflow-hidden">
        
        {/* Card Header: Icon + Title + Trailing Arrow */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
              {getSemanticThemeIcon(theme)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                {theme.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {theme.nameEn ? `${theme.nameEn} • ` : ""}{theme.totalVocabs} từ
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-[#0059bb] group-hover:text-white dark:group-hover:bg-[#0059bb] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card Footer: Clean Level Pill & Progress Percentage */}
        <div className="space-y-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              {theme.difficulty === 1 ? "A1 - A2" : theme.difficulty === 2 ? "B1 - B2" : "C1 - C2"}
            </span>

            <span className="text-[#0059bb] dark:text-sky-400 font-mono font-black">
              {percentage}%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0059bb] to-sky-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

      </div>
    </Link>
  );
}
