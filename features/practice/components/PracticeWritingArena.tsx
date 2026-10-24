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
      {/* Writing Container */}
      <div
        onClick={() => writingInputRef.current?.focus()}
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-b-[5px] border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 cursor-text"
      >
        {/* Header Row: Label & Hint Toggle */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="writing-vocab-input"
            className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none cursor-pointer"
          >
            Nhập từ tiếng Anh
          </label>

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
            className={`w-full py-3 sm:py-4 px-1 bg-transparent border-0 border-b-2 sm:border-b-[3px] text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-wider outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-sans placeholder:font-normal placeholder:text-base sm:placeholder:text-lg ${
              wIsAnswered
                ? wIsCorrect
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-rose-500 text-rose-600 dark:text-rose-400"
                : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#0059bb] dark:focus:border-sky-400"
            }`}
          />
        </div>

        {/* Character Mask Hint (when toggled on) */}
        {wShowHint && !wIsAnswered && (
          <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300">
            <span className="font-bold text-amber-600 dark:text-amber-400 text-base tracking-widest">
              {currentWord.word[0]}
            </span>
            <span className="tracking-widest text-slate-400 font-bold">
              {Array(Math.max(0, currentWord.word.length - 1))
                .fill("_")
                .join(" ")}
            </span>
            <span className="text-xs text-slate-400 font-sans">
              ({currentWord.word.length} ký tự)
            </span>
          </div>
        )}

        {/* Feedback when answered */}
        {wIsAnswered && (
          <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm font-bold">
            {wIsCorrect ? (
              <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Chính xác tuyệt đối!</span>
              </span>
            ) : (
              <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Đáp án chuẩn:</span>{" "}
                <strong className="font-mono text-slate-900 dark:text-white font-black tracking-wider text-base">
                  {currentWord.word}
                </strong>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
