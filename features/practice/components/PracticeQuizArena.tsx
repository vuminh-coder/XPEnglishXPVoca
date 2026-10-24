"use client";

import React from "react";
import { CheckCircle2, X, Folder, Keyboard } from "lucide-react";
import { PracticeWord, QuizOption } from "../types";

interface PracticeQuizArenaProps {
  currentWord: PracticeWord;
  quizOptions: QuizOption[];
  qSelectedOpt: string | null;
  qIsAnswered: boolean;
  questionTimeLeft?: number;
  isCurrentBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onPlayAudio?: (word: string) => void;
  onSelectOption: (opt: QuizOption) => void;
}

export function PracticeQuizArena({
  currentWord,
  quizOptions,
  qSelectedOpt,
  qIsAnswered,
  onSelectOption,
}: PracticeQuizArenaProps) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4 min-h-0 select-none py-1">
      {/* 4 Quiz Option Cards (Grid 1 column on xs, 2 columns on sm+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
        {quizOptions.map((opt, idx) => {
          const isSelected = qSelectedOpt === opt.id;
          const letter = String.fromCharCode(65 + idx);
          const keyNum = idx + 1;

          // 3D tactile button classes matching WordLink & SentenceBuilder
          let btnStyle =
            "border-2 border-b-[4px] sm:border-b-[5px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/80 active:translate-y-[2px] active:border-b-2";

          let badgeStyle =
            "border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

          if (isSelected && !qIsAnswered) {
            btnStyle =
              "border-2 border-b-[4px] sm:border-b-[5px] border-[#0059bb] bg-blue-50/90 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 shadow-md ring-2 ring-[#0059bb]/20 -translate-y-0.5";
            badgeStyle = "bg-[#0059bb] text-white border-[#0059bb]";
          }

          if (qIsAnswered) {
            if (opt.isCorrect) {
              btnStyle =
                "border-2 border-b-[4px] sm:border-b-[5px] border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 shadow-sm";
              badgeStyle = "bg-emerald-500 text-white border-emerald-500";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle =
                "border-2 border-b-[4px] sm:border-b-[5px] border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 shadow-2xs";
              badgeStyle = "bg-rose-500 text-white border-rose-500";
            } else {
              btnStyle =
                "border-2 border-b-2 border-slate-200/50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600 opacity-50 cursor-default";
              badgeStyle = "bg-transparent text-slate-400 border-slate-300 dark:border-slate-700";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={qIsAnswered}
              onClick={() => onSelectOption(opt)}
              className={`group w-full min-h-[58px] sm:min-h-[64px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Letter & Hotkey Badge */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black font-display shrink-0 transition-colors ${badgeStyle}`}
                >
                  <span>{letter}</span>
                </div>

                {/* Option Text */}
                <span className="text-sm sm:text-base font-bold leading-snug line-clamp-2 break-words flex-1">
                  {opt.text}
                </span>
              </div>

              {/* Status Icons */}
              {qIsAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.6]" />
              )}
              {qIsAnswered && isSelected && !opt.isCorrect && (
                <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 stroke-[2.6]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Helper Footer: Topic & Keyboard Hint */}
      <div className="flex items-center justify-between gap-2 px-1 text-xs text-slate-400 dark:text-slate-500 font-medium pt-1">
        <div className="flex items-center gap-1.5 truncate">
          <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
          <span>Chủ đề:</span>
          <span className="font-bold text-slate-600 dark:text-slate-300 truncate">
            {currentWord.topic || "Cảm xúc & Đời sống"}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <Keyboard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Phím tắt:</span>
          <span className="font-mono font-bold text-slate-600 dark:text-slate-300">1 - 4</span>
        </div>
      </div>
    </div>
  );
}
