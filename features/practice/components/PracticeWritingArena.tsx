"use client";

import React from "react";
import { Lightbulb, PenLine, CheckCircle2, X } from "lucide-react";
import { PracticeWord } from "../types";

interface PracticeWritingArenaProps {
  currentWord: PracticeWord;
  writingInputRef: React.RefObject<HTMLInputElement | null>;
  wInput: string;
  setWInput: (val: string) => void;
  wIsAnswered: boolean;
  wIsCorrect: boolean;
  wShowHint: boolean;
  setWShowHint: (val: boolean) => void;
  questionTimeLeft?: number;
  isCurrentBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onCheckWriting: () => void;
}

export function PracticeWritingArena({
  currentWord,
  writingInputRef,
  wInput,
  setWInput,
  wIsAnswered,
  wIsCorrect,
  wShowHint,
  setWShowHint,
  onCheckWriting,
}: PracticeWritingArenaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !wIsAnswered && wInput.trim()) {
      e.preventDefault();
      onCheckWriting();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4 min-h-0 select-none py-1">
      {/* Writing Box Container */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-b-[5px] border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        {/* Input Box Row */}
        <div className="relative">
          <input
            ref={writingInputRef}
            type="text"
            value={wInput}
            onChange={(e) => setWInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={wIsAnswered}
            placeholder="Nhập từ vựng tiếng Anh vào đây..."
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full h-14 sm:h-16 px-5 rounded-2xl border-2 text-lg sm:text-2xl font-black font-mono tracking-wide outline-none transition-all ${
              wIsAnswered
                ? wIsCorrect
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200"
                  : "border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200"
                : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-[#0059bb] focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-[#0059bb]/10"
            }`}
          />
        </div>

        {/* Hint Row & Character Mask */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          {/* Hint Toggle Button */}
          {!wIsAnswered && (
            <button
              type="button"
              onClick={() => setWShowHint(!wShowHint)}
              className="px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-100 active:scale-95 transition-all w-fit"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{wShowHint ? "Ẩn gợi ý" : "Xem gợi ý ký tự"}</span>
            </button>
          )}

          {/* Letter Mask Banner */}
          {wShowHint && !wIsAnswered && (
            <div className="text-xs sm:text-sm font-mono font-bold text-amber-800 dark:text-amber-300 tracking-wider">
              Gợi ý:{" "}
              <span className="text-amber-950 dark:text-amber-100 text-base">
                {currentWord.word[0]}{" "}
                {Array(Math.max(0, currentWord.word.length - 1))
                  .fill("_")
                  .join(" ")}
              </span>{" "}
              ({currentWord.word.length} ký tự)
            </div>
          )}

          {/* Answer Comparison when answered */}
          {wIsAnswered && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              {wIsCorrect ? (
                <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Chính xác tuyệt đối!
                </span>
              ) : (
                <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1">
                  <X className="w-4 h-4 text-rose-500" /> Đáp án chuẩn:{" "}
                  <strong className="font-mono text-slate-900 dark:text-white uppercase font-black">
                    {currentWord.word}
                  </strong>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
