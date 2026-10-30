"use client";

import React from "react";
import { Lightbulb, Timer, Star } from "lucide-react";
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
  questionTimeLeft,
  isCurrentBookmarked = false,
  onToggleBookmark,
  onCheckWriting,
}: PracticeWritingArenaProps) {
  const hasTimer = typeof questionTimeLeft === "number";
  const isUrgent = hasTimer && !wIsAnswered && (questionTimeLeft as number) <= 5;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !wIsAnswered && wInput.trim()) {
      e.preventDefault();
      onCheckWriting();
    }
  };

  // Word-boundary aware character mask (preserves spaces so multi-word phrases are clear)
  const hintMaskChars = currentWord.word
    .slice(1)
    .split("")
    .map((ch) => (ch === " " ? "   " : ch === "-" ? "-" : "-"))
    .join(" ");

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center min-h-0 select-none py-1">
      {/* Writing Container */}
      <div
        onClick={() => writingInputRef.current?.focus()}
        className="px-5 py-3.5 sm:px-6 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border-2 border-b-[4px] sm:border-b-[5px] border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 sm:space-y-2.5 cursor-text"
      >
        {/* Header Row: Label, Timer, Hint Toggle & Bookmark */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <label
              htmlFor="writing-vocab-input"
              className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none cursor-pointer"
            >
              Nhập từ tiếng Anh
            </label>

            {hasTimer && !wIsAnswered && (
              <div
                role="timer"
                aria-label={`Thời gian còn lại: ${questionTimeLeft} giây`}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-extrabold font-display tabular-nums transition-colors ${
                  isUrgent
                    ? "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300"
                    : "bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                <Timer className="w-3 h-3 stroke-[2.4]" aria-hidden="true" />
                <span>{questionTimeLeft}s</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!wIsAnswered && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setWShowHint(!wShowHint);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{wShowHint ? "Ẩn gợi ý" : "Xem gợi ý ký tự"}</span>
              </button>
            )}

            {onToggleBookmark && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark();
                }}
                title={isCurrentBookmarked ? "Đã lưu vào sổ tay" : "Lưu vào sổ tay"}
                aria-label="Lưu vào sổ tay"
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isCurrentBookmarked
                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-300 dark:border-amber-700 shadow-2xs"
                    : "text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 stroke-[2.2] ${
                    isCurrentBookmarked ? "fill-amber-400 stroke-amber-500" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Ruled Underline Input Field */}
        <div className="relative">
          <input
            id="writing-vocab-input"
            ref={writingInputRef}
            type="text"
            value={wInput}
            onChange={(e) => setWInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={wIsAnswered}
            placeholder="Nhập câu trả lời..."
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full py-1.5 sm:py-2 px-1 bg-transparent border-0 border-b-2 sm:border-b-[3px] border-dashed text-xl sm:text-2xl font-mono font-bold tracking-wider outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-sans placeholder:font-normal placeholder:text-sm sm:placeholder:text-base ${
              wIsAnswered
                ? wIsCorrect
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-rose-500 text-rose-600 dark:text-rose-400"
                : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-[#0059bb] dark:focus:border-sky-400"
            }`}
          />
        </div>

        {/* Character Mask Hint (when toggled on) */}
        {wShowHint && !wIsAnswered && (
          <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 flex-wrap">
            <span className="font-bold text-amber-600 dark:text-amber-400 text-base tracking-widest">
              {currentWord.word[0]}
            </span>
            <span className="tracking-widest text-slate-400 font-bold whitespace-pre">
              {hintMaskChars}
            </span>
            <span className="text-xs text-slate-400 font-sans">
              ({currentWord.word.replace(/\s+/g, "").length} chữ cái)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
