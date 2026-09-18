"use client";

import React from "react";
import { IpaWordExample } from "../../data/ipaData";
import { IpaAudioPlayButton } from "./IpaAudioPlayButton";

export interface IpaWordExampleCardProps {
  example: IpaWordExample;
  rate?: number;
  accent?: "en-US" | "en-GB" | "en-AU";
  className?: string;
  onSelect?: (example: IpaWordExample) => void;
}

export const IpaWordExampleCard: React.FC<IpaWordExampleCardProps> = ({
  example,
  rate = 1.0,
  accent = "en-US",
  className = "",
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(example)}
      className={`p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/90 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-white/5 transition-all flex items-center justify-between gap-3 group select-none ${
        onSelect ? "cursor-pointer active:scale-95" : ""
      } ${className}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white capitalize truncate font-display">
            {example.word}
          </span>
          <span className="text-[10.5px] sm:text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            {example.phonetic}
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {example.meaning}
        </div>
      </div>

      <div className="shrink-0">
        <IpaAudioPlayButton
          text={example.word}
          rate={rate}
          accent={accent}
          size="sm"
          variant="secondary"
        />
      </div>
    </div>
  );
};
