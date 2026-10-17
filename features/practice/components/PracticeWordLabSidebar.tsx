"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Volume2,
  Lightbulb,
  Lock,
  Eye,
} from "lucide-react";
import { PracticeWord, SubMode } from "../types";

interface PracticeWordLabSidebarProps {
  currentWord: PracticeWord;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (text: string) => void;
  subMode?: SubMode;
  isAnswered?: boolean;
}

export function PracticeWordLabSidebar({
  currentWord,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
  subMode = "quiz",
  isAnswered = false,
}: PracticeWordLabSidebarProps) {
  const [manualReveal, setManualReveal] = useState(false);

  // Reset manual reveal when currentWord changes
  React.useEffect(() => {
    setManualReveal(false);
  }, [currentWord.word]);

  const canRevealMeaning = isAnswered || manualReveal || subMode === "speaking";
  const canRevealWord = isAnswered || manualReveal || subMode !== "writing";

  return (
    <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
      <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3 lg:h-full lg:min-h-0 overflow-y-auto">
        {/* 1. Main Word Profile Header */}
        <div className="space-y-2.5 shrink-0">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Thông tin từ vựng
            </span>

            {/* Bookmark Button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95 ${
                isCurrentBookmarked
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0059bb]"
              }`}
              title={isCurrentBookmarked ? "Bỏ lưu từ" : "Lưu vào Sổ tay từ vựng (+5 XP)"}
            >
              {isCurrentBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
              <span>{isCurrentBookmarked ? "Đã lưu" : "Lưu từ"}</span>
            </button>
          </div>

          {/* Word Card Details */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white capitalize font-display">
                  {canRevealWord ? (
                    currentWord.word
                  ) : (
                    <span className="font-mono text-base tracking-widest text-slate-400">
                      {currentWord.word[0]}
                      {Array(Math.max(0, currentWord.word.length - 1))
                        .fill("•")
                        .join("")}
                    </span>
                  )}
                </h3>
                {currentWord.type && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                    {currentWord.type}
                  </span>
                )}
              </div>
              {currentWord.level && (
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40">
                  {currentWord.level}
                </span>
              )}
            </div>

            {/* IPA */}
            {currentWord.ipa && (
              <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                {canRevealWord ? (
                  currentWord.ipa
                ) : (
                  <span className="blur-xs select-none text-slate-400">/• • • •/</span>
                )}
              </p>
            )}

            {/* Vietnamese Meaning with Spoiler Shield */}
            <div className="relative pt-0.5">
              {canRevealMeaning ? (
                <p className="text-xs sm:text-sm font-bold text-[#0059bb] dark:text-sky-400 leading-snug">
                  {currentWord.meaning}
                </p>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#0059bb]" />
                    <span>Nghĩa ẩn để thử thách</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setManualReveal(true)}
                    className="text-[11px] font-bold text-[#0059bb] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Xem trước</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Contextual Example Sentences */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0">
          <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" /> Ví dụ ngữ cảnh thực tế
          </span>

          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 text-xs sm:text-sm shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                {canRevealWord
                  ? `"${currentWord.example || "She used the new vocabulary in a clear sentence."}"`
                  : `"• • • • • • • • • • • •"`}
              </p>
              {canRevealWord && (
                <button
                  type="button"
                  onClick={() => onPlayAudio(currentWord.example || currentWord.word)}
                  className="p-1 text-slate-400 hover:text-[#0059bb] transition-colors shrink-0 cursor-pointer active:scale-95"
                  title="Nghe phát âm câu ví dụ"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {currentWord.exampleVi && (
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {canRevealMeaning ? (
                  currentWord.exampleVi
                ) : (
                  <span className="blur-xs select-none text-slate-400">
                    Bản dịch tiếng Việt được ẩn để tránh lộ đáp án
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* 3. Spaced Repetition SRS Tip */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-2 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Ôn tập lại từ vựng sau <strong>1 ngày, 3 ngày, 7 ngày</strong> để chuyển từ vựng vào bộ nhớ dài hạn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
