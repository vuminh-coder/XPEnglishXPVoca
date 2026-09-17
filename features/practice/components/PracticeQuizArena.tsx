"use client";

import React from "react";
import { Folder, Keyboard, Volume2, CheckCircle2, X } from "lucide-react";
import { PracticeWord, QuizOption } from "../types";
import { PracticeWordMetadataRow } from "./PracticeArenaHeader";

interface PracticeQuizArenaProps {
  currentWord: PracticeWord;
  quizOptions: QuizOption[];
  qSelectedOpt: string | null;
  qIsAnswered: boolean;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (word: string) => void;
  onSelectOption: (opt: QuizOption) => void;
}

export function PracticeQuizArena({
  currentWord,
  quizOptions,
  qSelectedOpt,
  qIsAnswered,
  questionTimeLeft,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
  onSelectOption,
}: PracticeQuizArenaProps) {
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
        />

        {/* 2. CENTERPIECE VOCABULARY & AUDIO FOCUS */}
        <div className="py-2.5 sm:py-3.5 text-center space-y-1.5 flex-1 flex flex-col justify-center items-center">
          <div className="relative inline-flex items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white font-display tracking-tight leading-none drop-shadow-2xs text-center">
              {currentWord.word}
            </h2>
            <button
              type="button"
              onClick={() => onPlayAudio(currentWord.word)}
              className="absolute left-full ml-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 dark:bg-blue-950/80 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              title="Phát âm chuẩn (US)"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {currentWord.ipa && (
            <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide pt-0.5 text-center">
              {currentWord.ipa}
            </p>
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

          {/* Góc Phải Dưới: Phím nhanh chọn đáp án */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span>Phím nhanh:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {["1", "2", "3", "4"].map((key, idx) => (
                <button
                  key={key}
                  type="button"
                  disabled={qIsAnswered}
                  onClick={() => {
                    if (quizOptions[idx]) onSelectOption(quizOptions[idx]);
                  }}
                  className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                  title={`Chọn đáp án ${String.fromCharCode(65 + idx)} (Phím ${key})`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quiz Option Cards (2x2 Grid on sm+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
        {quizOptions.map((opt, idx) => {
          const isSelected = qSelectedOpt === opt.id;
          let btnStyle =
            "bg-slate-50/80 dark:bg-slate-950/60 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/50 dark:hover:bg-blue-950/30";

          if (qIsAnswered) {
            if (opt.isCorrect) {
              btnStyle =
                "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle =
                "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 font-bold shadow-xs";
            } else {
              btnStyle = "opacity-40 border-slate-200 dark:border-slate-800 text-slate-400";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={qIsAnswered}
              onClick={() => onSelectOption(opt)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left text-sm sm:text-base font-bold transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-2xs active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="truncate">{opt.text}</span>
              </div>
              {qIsAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
              )}
              {qIsAnswered && isSelected && !opt.isCorrect && (
                <X className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400 shrink-0 stroke-[2.5]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
