"use client";

import React from "react";
import { IpaSound } from "../../data/ipaData";

export interface IpaSoundBadgeProps {
  sound: IpaSound;
  showCategoryTag?: boolean;
  size?: "sm" | "md";
  variant?: "classification" | "full";
  className?: string;
}

export const IpaSoundBadge: React.FC<IpaSoundBadgeProps> = ({
  sound,
  showCategoryTag = false,
  size = "sm",
  variant,
  className = "",
}) => {
  // Strict 60-30-10 Semantic Accent Architecture
  // Clean neutral container with subtle micro semantic dot
  const getSemanticConfig = () => {
    if (sound.category === "monophthong") {
      const isLong = sound.vowelLength === "long";
      return {
        dotColor: "bg-[#0059bb]", // Brand Royal Blue
        textColor: "text-[#0059bb] dark:text-sky-400",
        label: isLong ? "Nguyên âm dài" : "Nguyên âm ngắn",
        shortLabel: isLong ? "Âm dài" : "Âm ngắn",
        subLabel: isLong ? "Long Vowel" : "Short Vowel",
      };
    }
    if (sound.category === "diphthong") {
      return {
        dotColor: "bg-purple-600", // AI Purple Accent
        textColor: "text-purple-700 dark:text-purple-400",
        label: "Nguyên âm đôi",
        shortLabel: "Âm đôi",
        subLabel: "Diphthong",
      };
    }
    if (sound.voicing === "voiced") {
      return {
        dotColor: "bg-emerald-500", // Emerald Voiced
        textColor: "text-emerald-700 dark:text-emerald-400",
        label: "Hữu thanh",
        shortLabel: "Hữu thanh",
        subLabel: "Voiced Consonant",
      };
    }
    return {
      dotColor: "bg-amber-500", // Amber Voiceless
      textColor: "text-amber-700 dark:text-amber-400",
      label: "Vô thanh",
      shortLabel: "Vô thanh",
      subLabel: "Voiceless Consonant",
    };
  };

  const config = getSemanticConfig();
  const isSm = size === "sm";
  const isClassification = variant === "classification" || (!variant && isSm);
  const displayText = isClassification ? config.shortLabel : sound.name;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/5 whitespace-nowrap shrink-0 select-none ${className}`}
      title={`${sound.name} (${config.subLabel})`}
    >
      <span className={`rounded-full shrink-0 ${isSm ? "w-1.5 h-1.5" : "w-2 h-2"} ${config.dotColor}`} />
      <span
        className={`font-semibold tracking-tight whitespace-nowrap ${isSm ? "text-[10px]" : "text-xs"} ${config.textColor}`}
      >
        {displayText}
      </span>
      {showCategoryTag && !isClassification && (
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal whitespace-nowrap">
          • {config.label}
        </span>
      )}
    </div>
  );
};

