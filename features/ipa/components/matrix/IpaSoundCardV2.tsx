"use client";

import React, { useState, useCallback } from "react";
import { Volume2 } from "lucide-react";
import { IpaSound, getSoundDisplayHint, getSoundCategoryTheme } from "../../data/ipaData";
import { IpaSoundBadge } from "../shared/IpaSoundBadge";
import { playIpaIsolatedSound, stopIpaAudio } from "@/shared/utils/ipaAudioPlayer";

export interface IpaSoundCardV2Props {
  sound: IpaSound;
  isSelected?: boolean;
  onSelect?: (sound: IpaSound) => void;
  onOpenDetail?: (sound: IpaSound) => void;
  rate?: number;
  className?: string;
}

export const IpaSoundCardV2: React.FC<IpaSoundCardV2Props> = ({
  sound,
  isSelected = false,
  onSelect,
  onOpenDetail,
  rate = 1.0,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = getSoundCategoryTheme(sound);

  const handleSpeakerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      stopIpaAudio();
      setIsPlaying(true);
      playIpaIsolatedSound(sound.id, {
        rate,
        onPlay: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
      // Safety fallback to clear pulse
      setTimeout(() => setIsPlaying(false), 1400);
    },
    [sound.id, rate]
  );

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(sound);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer select-none group flex flex-col justify-between h-full min-h-[78px] xs:min-h-[84px] sm:min-h-[94px] md:min-h-[100px] relative overflow-hidden ${
        isSelected
          ? `${theme.selectedRing} ${theme.selectedBg} shadow-xs`
          : `bg-white dark:bg-slate-900 hover:bg-slate-50/90 dark:hover:bg-slate-850 border border-slate-200/90 dark:border-slate-800 ${theme.borderHover} shadow-2xs hover:shadow-xs hover:-translate-y-0.5`
      } ${className}`}
      title={`Bấm để xem chi tiết & luyện âm /${sound.symbol}/ • Bấm loa để nghe âm cô lập`}
    >
      {/* 1. Top Header: Micro Semantic Tag (Left) & Single Speaker Icon (Right) */}
      <div className="flex items-center justify-between gap-1 w-full shrink-0">
        <IpaSoundBadge sound={sound} size="sm" variant="micro" />

        <button
          type="button"
          onClick={handleSpeakerClick}
          className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isPlaying
              ? `${theme.speakerActive} scale-110`
              : `text-slate-400 dark:text-slate-500 ${theme.textHover} hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800`
          }`}
          title={`Nghe âm cô lập /${sound.symbol}/`}
          aria-label={`Nghe âm cô lập /${sound.symbol}/`}
        >
          <Volume2 className={`w-3 h-3 ${isPlaying ? "animate-pulse" : ""}`} />
        </button>
      </div>

      {/* 2. Center: Large High-Legibility Phonetic Symbol (The Hero Glyph) */}
      <div className="relative py-0.5 sm:py-1 flex flex-col items-center justify-center my-auto">
        {/* Soft acoustic ripple effect on tap matching category color */}
        {isPlaying && (
          <span
            className={`absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full ${theme.rippleColor} animate-ping pointer-events-none`}
          />
        )}
        <span
          className={`text-xl xs:text-2xl sm:text-[26px] font-black font-sans tracking-wide text-slate-900 dark:text-white ${theme.textHover} transition-colors leading-none`}
        >
          {sound.symbol}
        </span>
      </div>

      {/* 3. Bottom: Cohesive Centered Typography (NO dividing hairline) */}
      <div className="w-full flex flex-col items-center justify-center text-center mt-auto">
        <span
          className={`font-bold text-[11px] xs:text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 capitalize tracking-tight ${theme.textHover} transition-colors leading-tight`}
        >
          {sound.keyWord}
        </span>
        <span className="hidden md:inline text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate w-full text-center mt-0.5">
          {getSoundDisplayHint(sound)}
        </span>
      </div>
    </div>
  );
};


