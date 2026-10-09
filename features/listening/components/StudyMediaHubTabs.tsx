"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Headphones, Video, Sparkles, Mic } from "lucide-react";

export interface StudyMediaHubTabsProps {
  branch: "dictation" | "shadowing";
  activeMode: "audio" | "video";
  onModeChange?: (mode: "audio" | "video") => void;
  audioCountBadge?: string;
  videoCountBadge?: string;
  subtitleText?: string;
  className?: string;
}

/**
 * StudyMediaHubTabs: Unified mode switcher tabs between Audio (standard)
 * and Video (curated YouTube hub) across Dictation and Shadowing listing views.
 * Ensures 100% consistent styling, spring animation, and accessible links across all 4 URLs:
 * - /study/dictation/audio
 * - /study/dictation/video
 * - /study/shadowing/audio
 * - /study/shadowing/video
 */
export const StudyMediaHubTabs: React.FC<StudyMediaHubTabsProps> = React.memo(
  function StudyMediaHubTabs({
    branch,
    activeMode,
    onModeChange,
    audioCountBadge,
    videoCountBadge,
    subtitleText,
    className = "",
  }) {
    const isDictation = branch === "dictation";
    const audioHref = `/study/${branch}/audio`;
    const videoHref = `/study/${branch}/video`;
    const layoutId = `${branch}ListingModeIndicator`;

    const defaultSubtitle = isDictation
      ? "Luyện nghe chép chính tả với bộ âm thanh chuẩn ngữ cảnh & video YouTube tuyển chọn"
      : "Đồng bộ lộ trình CEFR & phân tích nhại âm AI qua sóng âm và video YouTube";

    return (
      <div
        className={`flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 flex-wrap ${className}`}
      >
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/60 shadow-2xs">
          {/* TAB 1: AUDIO */}
          <Link
            href={audioHref}
            onClick={() => onModeChange?.("audio")}
            aria-selected={activeMode === "audio"}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative select-none ${
              activeMode === "audio"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {activeMode === "audio" && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            {isDictation ? (
              <Headphones className="w-4 h-4 text-[#0059bb] dark:text-sky-400 relative z-10 shrink-0" />
            ) : (
              <Mic className="w-4 h-4 text-[#0059bb] dark:text-sky-400 relative z-10 shrink-0" />
            )}
            <span className="relative z-10">
              {isDictation ? "Bài Nghe Tiêu Chuẩn" : "Nhại Âm Tiêu Chuẩn"}
            </span>
            {audioCountBadge && (
              <span className="relative z-10 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/60">
                {audioCountBadge}
              </span>
            )}
          </Link>

          {/* TAB 2: VIDEO */}
          <Link
            href={videoHref}
            onClick={() => onModeChange?.("video")}
            aria-selected={activeMode === "video"}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative select-none ${
              activeMode === "video"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {activeMode === "video" && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Video className="w-4 h-4 text-[#0059bb] dark:text-sky-400 relative z-10 shrink-0" />
            <span className="relative z-10">
              {isDictation ? "Kho Video Tuyển Chọn" : "Nhại Âm Video"}
            </span>
            {videoCountBadge && (
              <span className="relative z-10 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                {videoCountBadge}
              </span>
            )}
          </Link>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 hidden md:flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{subtitleText || defaultSubtitle}</span>
        </div>
      </div>
    );
  }
);
