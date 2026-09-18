"use client";

import React from "react";
import { IpaSound } from "../../data/ipaData";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { IpaSoundBadge } from "../shared/IpaSoundBadge";

export interface IpaSoundCardV2Props {
  sound: IpaSound;
  isSelected?: boolean;
  onSelect?: (sound: IpaSound) => void;
  className?: string;
}

export const IpaSoundCardV2: React.FC<IpaSoundCardV2Props> = ({
  sound,
  isSelected = false,
  onSelect,
  className = "",
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(sound)}
      className={`p-1 rounded-2xl transition-all duration-200 cursor-pointer select-none group ${
        isSelected
          ? "bg-[#0059bb]/10 dark:bg-sky-500/20 ring-2 ring-[#0059bb] shadow-sm"
          : "bg-slate-100/70 dark:bg-slate-800/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 shadow-2xs hover:shadow-xs"
      } ${className}`}
    >
      {/* Inner Core Container (Double-Bezel Architecture) */}
      <div className="rounded-xl p-3 bg-white dark:bg-slate-900 flex flex-col justify-between h-full min-h-[112px] border border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors">
        {/* Top Header Row: Semantic Badge & Audio Play Button */}
        <div className="flex items-center justify-between gap-1 w-full">
          <IpaSoundBadge sound={sound} size="sm" />
          <IpaAudioPlayButton
            text={sound.audioSampleText}
            size="sm"
            variant="ghost"
          />
        </div>

        {/* Center: Large High-Legibility Phonetic Symbol */}
        <div className="text-center py-1">
          <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-wide text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
            /{sound.symbol}/
          </span>
        </div>

        {/* Bottom Footer: Keyword & Phonetic Reference */}
        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100 dark:border-white/5">
          <span className="font-bold text-slate-800 dark:text-slate-200 truncate capitalize">
            {sound.keyWord}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">
            {sound.keyWordPhonetic}
          </span>
        </div>
      </div>
    </div>
  );
};
