"use client";

import React, { useState, useCallback } from "react";
import { Volume2 } from "lucide-react";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";

export interface IpaAudioPlayButtonProps {
  text: string;
  rate?: number;
  accent?: "en-US" | "en-GB" | "en-AU";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  className?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const IpaAudioPlayButton: React.FC<IpaAudioPlayButtonProps> = ({
  text,
  rate = 1.0,
  accent = "en-US",
  size = "md",
  variant = "secondary",
  label,
  className = "",
  onPlayStart,
  onPlayEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      stopTTS();
      setIsPlaying(true);
      if (onPlayStart) onPlayStart();

      speakLessonText(text, { accent, rate });

      // Calculate approximate playback duration based on word count & rate
      const wordCount = text.trim().split(/\s+/).length;
      const durationMs = Math.max(900, Math.min(4000, (wordCount * 550) / rate));

      const timer = setTimeout(() => {
        setIsPlaying(false);
        if (onPlayEnd) onPlayEnd();
      }, durationMs);

      return () => clearTimeout(timer);
    },
    [text, accent, rate, onPlayStart, onPlayEnd]
  );

  // Size styling maps
  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Variant styling maps (60-30-10 Rule: Royal Blue accent)
  const getVariantClasses = () => {
    if (isPlaying) {
      return "bg-[#0059bb] text-white shadow-sm ring-2 ring-blue-400/40 animate-pulse";
    }

    switch (variant) {
      case "primary":
        return "bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-2xs hover:shadow-xs active:scale-95";
      case "ghost":
        return "text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95";
      case "secondary":
      default:
        return "bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-300 border border-slate-200/70 dark:border-white/5 active:scale-95";
    }
  };

  if (label) {
    return (
      <button
        type="button"
        onClick={handlePlay}
        className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer select-none ${getVariantClasses()} ${className}`}
        title={`Nghe phát âm: "${text}"`}
        aria-label={`Nghe phát âm: "${text}"`}
      >
        <Volume2 className={`${iconSizes[size]} shrink-0 ${isPlaying ? "animate-pulse" : ""}`} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`rounded-full flex items-center justify-center transition-all cursor-pointer select-none ${sizeClasses[size]} ${getVariantClasses()} ${className}`}
      title={`Nghe phát âm: "${text}"`}
      aria-label={`Nghe phát âm: "${text}"`}
    >
      <Volume2 className={`${iconSizes[size]} shrink-0 ${isPlaying ? "animate-pulse" : ""}`} />
    </button>
  );
};
