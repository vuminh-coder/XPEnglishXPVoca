"use client";

import React from "react";
import {
  Brain,
  Layers,
  PenLine,
  Volume2,
  Clock,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { SubMode, PracticeWord } from "../types";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

interface PracticeArenaHeaderProps {
  subMode: SubMode;
  currentWord: PracticeWord;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (word: string) => void;
}

export function PracticeArenaHeader({
  subMode,
  currentWord,
  questionTimeLeft,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
}: PracticeArenaHeaderProps) {
  const getSubModeMeta = () => {
    switch (subMode) {
      case "quiz":
        return {
          icon: <Brain className="w-3.5 h-3.5" />,
          title: "Chọn nghĩa tiếng Việt chính xác",
        };
      case "flashcard":
        return {
          icon: <Layers className="w-3.5 h-3.5" />,
          title: "Lật thẻ và tự đánh giá độ ghi nhớ",
        };
      case "writing":
        return {
          icon: <PenLine className="w-3.5 h-3.5" />,
          title: "Gõ chính xác từ vựng tiếng Anh",
        };
      case "speaking":
        return {
          icon: <SpeakingIcon className="w-3.5 h-3.5" />,
          title: "Luyện phát âm chuẩn xác qua Micro",
        };
    }
  };

  const meta = getSubModeMeta();

  return (
    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 gap-2 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40 uppercase flex items-center gap-1 shrink-0">
          {meta.icon}
          <span>{subMode.toUpperCase()}</span>
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
          {meta.title}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onPlayAudio(currentWord.word)}
        className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#0059bb] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0 active:scale-95"
        title="Nghe phát âm từ vựng"
      >
        <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" />
        <span className="hidden sm:inline">Phát âm</span>
      </button>
    </div>
  );
}

interface PracticeWordMetadataRowProps {
  currentWord: PracticeWord;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  badgeLabel?: string;
  badgeIcon?: React.ReactNode;
}

export function PracticeWordMetadataRow({
  currentWord,
  questionTimeLeft,
  isCurrentBookmarked,
  onToggleBookmark,
  badgeLabel = "Từ vựng trọng tâm",
  badgeIcon = <Brain className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />,
}: PracticeWordMetadataRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5 shrink-0">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-black uppercase tracking-wider font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1">
          {badgeIcon}
          <span>{badgeLabel}</span>
        </span>

        {currentWord.type && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200/60 dark:border-slate-700/60">
            {currentWord.type === "noun" && "Danh từ (n.)"}
            {currentWord.type === "verb" && "Động từ (v.)"}
            {currentWord.type === "adjective" && "Tính từ (adj.)"}
            {currentWord.type === "adverb" && "Phó từ (adv.)"}
            {!["noun", "verb", "adjective", "adverb"].includes(currentWord.type) && currentWord.type}
          </span>
        )}

        {currentWord.level && (
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-black font-mono">
            {currentWord.level}
          </span>
        )}
      </div>

      {/* Right Area: Question Countdown Timer + Bookmark Icon */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Question Countdown Timer */}
        <div
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
            questionTimeLeft <= 3
              ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 animate-pulse"
              : questionTimeLeft <= 6
              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
              : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
          }`}
          title={`Thời gian còn lại cho câu hỏi này: ${questionTimeLeft}s`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{questionTimeLeft}s</span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
            isCurrentBookmarked
              ? "bg-amber-500 text-white shadow-amber-500/20"
              : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
          }`}
          title={isCurrentBookmarked ? "Đã lưu vào Sổ tay từ vựng" : "Lưu từ vựng này vào Sổ tay (+5 XP)"}
        >
          {isCurrentBookmarked ? (
            <BookmarkCheck className="w-3.5 h-3.5" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
