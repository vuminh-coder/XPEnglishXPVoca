"use client";

import React from "react";
import { Mic, Check } from "lucide-react";
import { IpaWordExample } from "../../data/ipaData";
import { IpaAudioPlayButton } from "./IpaAudioPlayButton";

export interface IpaWordExampleCardProps {
  example: IpaWordExample;
  rate?: number;
  accent?: "en-US" | "en-GB" | "en-AU";
  isSelected?: boolean;
  className?: string;
  onSelect?: (example: IpaWordExample) => void;
}

export const IpaWordExampleCard: React.FC<IpaWordExampleCardProps> = ({
  example,
  rate = 1.0,
  accent = "en-US",
  isSelected = false,
  className = "",
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(example)}
      className={`relative p-3 sm:p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 group select-none border ${
        isSelected
          ? "bg-blue-50/90 dark:bg-blue-950/50 border-[#0059bb]/60 dark:border-sky-400/60 shadow-sm ring-2 ring-[#0059bb]/20 dark:ring-sky-400/20 scale-[1.01]"
          : "bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
      } ${onSelect ? "cursor-pointer active:scale-[0.99]" : ""} ${className}`}
    >
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white capitalize font-sans tracking-tight">
            {example.word}
          </span>
          <span className="text-xs font-mono font-semibold text-[#0059bb] dark:text-sky-400">
            {example.phonetic}
          </span>
          {isSelected && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#0059bb] text-white text-[9.5px] font-bold tracking-wide uppercase flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5" />
              Đang luyện
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {example.meaning}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <IpaAudioPlayButton
          text={example.word}
          rate={rate}
          accent={accent}
          size="sm"
          variant="secondary"
        />

        {onSelect && !isSelected && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(example);
            }}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300 flex items-center justify-center transition-all cursor-pointer"
            title="Chọn từ này làm mẫu thu âm AI"
            aria-label="Chọn từ này để thu âm"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
