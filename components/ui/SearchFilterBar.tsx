"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  tags: TagItem[];
  activeTagId: string;
  onSelectTag: (id: string) => void;
  className?: string;
}

export const SearchFilterBar = ({
  searchValue,
  onSearchChange,
  placeholder = "Tìm bài học, chủ đề TOEIC, IELTS, BBC...",
  tags,
  activeTagId,
  onSelectTag,
  className,
}: SearchFilterBarProps) => {
  return (
    <div className={cn("space-y-3.5", className)}>
      {/* Search Input Box with Full Box Border (Rule 15) & Clear Placeholder (Rule 12) */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none stroke-[2.2]" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-9 text-xs sm:text-sm font-semibold rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Scroll Snap Pill Bar (Rule 2 & 14) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        {tags.map((tag) => {
          const isActive = activeTagId === tag.id;
          return (
            <button
              key={tag.id}
              onClick={() => onSelectTag(tag.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border select-none shrink-0",
                isActive
                  ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              {tag.icon && <span>{tag.icon}</span>}
              <span>{tag.label}</span>
              {tag.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-black ml-0.5",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  )}
                >
                  {tag.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
