"use client";

import React from "react";
import { IpaSound, getSoundCategoryTheme } from "../../data/ipaData";

export interface IpaSoundBadgeProps {
  sound: IpaSound;
  showCategoryTag?: boolean;
  size?: "sm" | "md";
  variant?: "classification" | "full" | "micro";
  className?: string;
}

export const IpaSoundBadge: React.FC<IpaSoundBadgeProps> = ({
  sound,
  showCategoryTag = false,
  size = "sm",
  variant,
  className = "",
}) => {
  const theme = getSoundCategoryTheme(sound);
  const isSm = size === "sm";
  const isMicro = variant === "micro";
  const isClassification = variant === "classification" || (!variant && !isMicro && isSm);
  
  const displayText = isMicro 
    ? theme.microLabel 
    : isClassification 
      ? theme.shortLabel 
      : sound.name;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${
        isMicro ? "px-1.5 py-0.5" : "px-2 py-0.5"
      } rounded-md ${theme.badgeBg} whitespace-nowrap shrink-0 select-none transition-colors ${className}`}
      title={`${sound.name} (${theme.name})`}
    >
      <span className={`rounded-full shrink-0 ${isSm ? "w-1.5 h-1.5" : "w-2 h-2"} ${theme.dotColor}`} />
      <span
        className={`font-bold tracking-tight whitespace-nowrap ${isSm ? "text-[10px]" : "text-xs"} ${theme.textColor}`}
      >
        {displayText}
      </span>
      {showCategoryTag && !isClassification && (
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal whitespace-nowrap">
          • {theme.name}
        </span>
      )}
    </div>
  );
};

