"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
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
  quizOptions,
  qSelectedOpt,
  qIsAnswered,
  onSelectOption,
}: PracticeQuizArenaProps) {
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0 select-none py-1">
      {/* 4 Quiz Option Cards (Grid 1 column on xs, 2 columns on sm+ with generous column gap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-y-3 gap-x-4 sm:gap-x-6 md:gap-x-8">
        {quizOptions.map((opt, idx) => {
          const isSelected = qSelectedOpt === opt.id;
          const letter = String.fromCharCode(65 + idx);

          // Authentic 3D tactile button classes matching Duolingo & SentenceBuilder style
          let btnStyle =
            "border-2 border-slate-200 dark:border-slate-700 border-b-[5px] border-b-slate-300 dark:border-b-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 hover:border-b-slate-400 dark:hover:border-b-slate-500 hover:bg-slate-50/90 active:translate-y-[3px] active:border-b-2";

          let letterStyle =
            "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 font-black";

          if (isSelected && !qIsAnswered) {
            btnStyle =
              "border-2 border-[#0059bb] dark:border-sky-500 border-b-[5px] border-b-[#003d82] dark:border-b-sky-700 bg-blue-50/90 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 shadow-sm shadow-blue-500/15 -translate-y-0.5 active:translate-y-[2px] active:border-b-2";
            letterStyle = "text-[#0059bb] dark:text-sky-400 font-black";
          }

          if (qIsAnswered) {
            if (opt.isCorrect) {
              btnStyle =
                "border-2 border-emerald-500 dark:border-emerald-500 border-b-[5px] border-b-emerald-700 dark:border-b-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 shadow-sm shadow-emerald-500/15";
              letterStyle = "text-emerald-600 dark:text-emerald-400 font-black";
            } else if (isSelected && !opt.isCorrect) {
              btnStyle =
                "border-2 border-rose-500 dark:border-rose-600 border-b-[5px] border-b-rose-700 dark:border-b-rose-800 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 shadow-xs shadow-rose-500/15";
              letterStyle = "text-rose-600 dark:text-rose-400 font-black";
            } else {
              btnStyle =
                "border-2 border-b-2 border-slate-200/50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600 opacity-40 cursor-default";
              letterStyle = "text-slate-400 dark:text-slate-600 font-medium";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={qIsAnswered}
              onClick={() => onSelectOption(opt)}
              className={`group w-full min-h-[52px] sm:min-h-[58px] lg:min-h-[62px] px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Letter indicator: A. B. C. D. without box block */}
                <span
                  className={`text-base sm:text-lg font-black font-display shrink-0 transition-colors ${letterStyle}`}
                >
                  {letter}.
                </span>

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
    </div>
  );
}
