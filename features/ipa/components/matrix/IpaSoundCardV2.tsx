"use client";

import React from "react";
import { IpaSound, getSoundDisplayHint } from "../../data/ipaData";
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
      className={`p-1.5 rounded-2xl transition-all duration-200 cursor-pointer select-none group ${
        isSelected
          ? "bg-[#0059bb]/10 dark:bg-sky-500/20 ring-2 ring-[#0059bb] shadow-sm"
          : "bg-slate-100/80 dark:bg-slate-800/50 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-white/5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
      } ${className}`}
    >
      {/* Inner Core Container (Double-Bezel Architecture) */}
      <div className="rounded-xl p-2.5 sm:p-3 bg-white dark:bg-slate-900 flex flex-col justify-between h-full min-h-[136px] border border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors">
        {/* 1. Top Header Row: Semantic Badge & Audio Trigger */}
        <div className="flex items-center justify-between gap-1 w-full shrink-0">
          <IpaSoundBadge sound={sound} size="sm" variant="classification" />
          <IpaAudioPlayButton
            text={sound.audioSampleText}
            size="sm"
            variant="ghost"
          />
        </div>

        {/* 2. Center: Large High-Legibility Phonetic Symbol & Mnemonic Action */}
        <div className="text-center py-1.5 flex flex-col items-center justify-center my-auto">
          <span className="text-2xl sm:text-[28px] font-extrabold font-sans tracking-wide text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors leading-none">
            /{sound.symbol}/
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1.5 tracking-tight line-clamp-1">
            {getSoundDisplayHint(sound)}
          </span>
        </div>

        {/* 3. Bottom Capsule: Symmetrically Centered Word & Phonetic Reference (Zero Truncation) */}
        <div className="w-full mt-auto pt-1">
          <div className="py-1 px-2 rounded-lg bg-slate-50/90 dark:bg-slate-800/80 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center transition-colors group-hover:bg-blue-50/70 dark:group-hover:bg-blue-950/40 group-hover:border-blue-100 dark:group-hover:border-blue-900/40">
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 capitalize leading-tight group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
              {sound.keyWord}
            </span>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
              {sound.keyWordPhonetic}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

