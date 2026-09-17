"use client";

import React from "react";
import { Folder, Keyboard, Lightbulb, PenLine } from "lucide-react";
import { PracticeWord } from "../types";
import { PracticeWordMetadataRow } from "./PracticeArenaHeader";

interface PracticeWritingArenaProps {
  currentWord: PracticeWord;
  writingInputRef: React.RefObject<HTMLInputElement | null>;
  wInput: string;
  setWInput: (val: string) => void;
  wIsAnswered: boolean;
  wIsCorrect: boolean;
  wShowHint: boolean;
  setWShowHint: (val: boolean) => void;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
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
  isCurrentBookmarked,
  onToggleBookmark,
  onCheckWriting,
}: PracticeWritingArenaProps) {
  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
      {/* Prompt Target Word Card */}
      <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden">
        {/* 1. TOP METADATA ROW */}
        <PracticeWordMetadataRow
          currentWord={currentWord}
          questionTimeLeft={questionTimeLeft}
          isCurrentBookmarked={isCurrentBookmarked}
          onToggleBookmark={onToggleBookmark}
          badgeLabel="Writing Chính Tả"
          badgeIcon={<PenLine className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />}
        />

        {/* 2. CENTERPIECE MEANING & HINT AREA */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2 space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Nghĩa tiếng Việt cần dịch sang tiếng Anh
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white font-display leading-snug">
            {currentWord.meaning}
          </h2>

          {wShowHint && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-mono text-xs sm:text-sm font-bold shadow-2xs animate-fade-in">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Gợi ý:{" "}
                <strong className="text-amber-900 dark:text-amber-100 uppercase tracking-widest">
                  {currentWord.word[0]}{" "}
                  {Array(Math.max(0, currentWord.word.length - 1))
                    .fill("_")
                    .join(" ")}
                </strong>{" "}
                ({currentWord.word.length} ký tự)
              </span>
            </div>
          )}
        </div>

        {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
          {/* Góc Trái Dưới: Chủ đề từ vựng */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span>Chủ đề:</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {currentWord.topic || "Cảm xúc & Đời sống"}
            </span>
          </div>

          {/* Góc Phải Dưới: Phím nhanh */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span>Phím nhanh:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0">
                Enter: Kiểm tra
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WRITING INPUT BOX & ACTION BAR */}
      <div className="space-y-2 shrink-0">
        {/* External Label (Rule 6 UI/UX) */}
        <div className="flex items-center justify-between px-0.5">
          <label
            htmlFor="practice-writing-input"
            className="text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Nhập từ vựng tiếng Anh chính xác:
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {wInput.length} / {currentWord.word.length} ký tự
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            id="practice-writing-input"
            ref={writingInputRef}
            type="text"
            disabled={wIsAnswered}
            value={wInput}
            onChange={(e) => setWInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !wIsAnswered) {
                e.preventDefault();
                onCheckWriting();
              }
            }}
            placeholder="Gõ từ tiếng Anh tương ứng và nhấn Enter..."
            className={`w-full h-12 sm:h-13 pl-4 pr-24 text-base sm:text-lg font-mono font-bold rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none shadow-2xs ${
              wIsAnswered
                ? wIsCorrect
                  ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200"
                  : "bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200"
                : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/10"
            }`}
          />
          {!wShowHint && !wIsAnswered && (
            <button
              type="button"
              onClick={() => setWShowHint(true)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/60 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
              title="Mở gợi ý chữ cái (-7 XP)"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Gợi ý</span>
            </button>
          )}
        </div>

        {!wIsAnswered && (
          <button
            type="button"
            onClick={onCheckWriting}
            disabled={!wInput.trim()}
            className="w-full h-11 sm:h-12 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 disabled:pointer-events-none text-white text-sm sm:text-base font-black shadow-xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Kiểm Tra Chính Tả</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-xs font-bold">
              Enter ↵
            </kbd>
          </button>
        )}
      </div>
    </div>
  );
}
