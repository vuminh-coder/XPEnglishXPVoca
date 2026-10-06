"use client";

import React from "react";
import { motion } from "framer-motion";
import { Headphones, Video } from "lucide-react";

export type MediaDisplayMode = "audio" | "video";

interface MediaDisplayModeToggleProps {
  mode: MediaDisplayMode;
  onModeChange: (mode: MediaDisplayMode) => void;
  className?: string;
  disabled?: boolean;
}

export const MediaDisplayModeToggle: React.FC<MediaDisplayModeToggleProps> = ({
  mode,
  onModeChange,
  className = "",
  disabled = false,
}) => {
  const isAudio = mode === "audio";

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs relative select-none ${className} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
      role="group"
      aria-label="Chuyển chế độ hiển thị Audio hoặc Video"
    >
      {/* Audio Mode Pill */}
      <button
        type="button"
        onClick={() => onModeChange("audio")}
        className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer z-10 ${
          isAudio
            ? "text-[#0059bb] dark:text-sky-300"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
        title="Chế độ Audio: Tập trung 100% thính giác vào thanh sóng âm"
      >
        {isAudio && (
          <motion.div
            layoutId="mediaModeToggleIndicator"
            className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-2xs"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <Headphones className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Audio</span>
      </button>

      {/* Video Mode Pill */}
      <button
        type="button"
        onClick={() => onModeChange("video")}
        className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer z-10 ${
          !isAudio
            ? "text-[#0059bb] dark:text-sky-300"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
        title="Chế độ Video: Xem video YouTube kèm theo"
      >
        {!isAudio && (
          <motion.div
            layoutId="mediaModeToggleIndicator"
            className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-2xs"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <Video className="w-3.5 h-3.5 relative z-10" />
        <span className="relative z-10">Video</span>
      </button>
    </div>
  );
};
