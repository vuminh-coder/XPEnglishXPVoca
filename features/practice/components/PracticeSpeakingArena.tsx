"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, AlertCircle, RotateCcw, Square, Timer } from "lucide-react";
import { PracticeWord } from "../types";

interface PracticeSpeakingArenaProps {
  currentWord: PracticeWord;
  isListening: boolean;
  transcript: string;
  accuracy: number;
  isCorrect: boolean;
  isAnswered: boolean;
  speechError: string | null;
  questionTimeLeft?: number;
  isCurrentBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onPlayAudio?: (word: string) => void;
  onStartSpeaking: () => void;
  onStopSpeaking?: () => void;
}

export function PracticeSpeakingArena({
  isListening,
  transcript,
  accuracy,
  isCorrect,
  isAnswered,
  speechError,
  questionTimeLeft,
  onStartSpeaking,
  onStopSpeaking,
}: PracticeSpeakingArenaProps) {
  const reduceMotion = useReducedMotion();

  const isPassed = isAnswered && isCorrect;
  const isFailed = isAnswered && !isCorrect;
  const hasTimer = typeof questionTimeLeft === "number";
  const isUrgent = hasTimer && !isAnswered && (questionTimeLeft as number) <= 5;

  const micLabel = isListening ? "Đang nghe" : isFailed ? "Thử lại" : isPassed ? "Hoàn thành" : "Nói ngay";

  const instruction = isListening
    ? "Hãy phát âm to và rõ ràng..."
    : isPassed
    ? "Kết quả nhận diện giọng nói:"
    : isFailed
    ? transcript
      ? "Hệ thống nghe thấy:"
      : "Chưa nghe thấy giọng nói của bạn."
    : "Nhấn nút Mic hoặc phím Space để bắt đầu nói";

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-0 select-none py-1 text-center">
      {/* Status row: countdown + stop action while recording - auto-hidden once answered */}
      {!isAnswered && (hasTimer || (isListening && onStopSpeaking)) && (
        <div className="flex items-center justify-center gap-2 min-h-[34px] flex-wrap">
          {hasTimer && (
            <div
              role="timer"
              aria-label={`Thời gian còn lại: ${questionTimeLeft} giây`}
              className={`flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-sm font-extrabold font-display tabular-nums transition-colors ${
                isUrgent
                  ? "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300"
                  : "bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200"
              }`}
            >
              <Timer className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              <span>{questionTimeLeft}s</span>
              {isListening && (
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">· tạm dừng</span>
              )}
            </div>
          )}

          {/* Secondary action while recording (kept out of the primary button to avoid Space/click races) */}
          {isListening && onStopSpeaking && (
            <button
              type="button"
              onClick={onStopSpeaking}
              className="h-8 px-3 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all"
            >
              <Square className="w-3 h-3 fill-current" aria-hidden="true" />
              <span>Dừng ghi âm</span>
            </button>
          )}
        </div>
      )}

      {/* Microphone stage: fixed box so the pulse rings never overlap neighbouring elements */}
      <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 shrink-0">
        {isListening && !reduceMotion && (
          <>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-sky-500/20"
              initial={{ scale: 0.65, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-2 sm:inset-3 rounded-full bg-sky-500/15"
              initial={{ scale: 0.7, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          </>
        )}

        <button
          type="button"
          onClick={onStartSpeaking}
          disabled={isListening || isPassed}
          className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center gap-0.5 sm:gap-1 shadow-lg transition-all active:scale-95 disabled:cursor-default ${
            isListening
              ? "bg-[#003d82] text-white ring-4 ring-sky-400/40"
              : isPassed
              ? "bg-emerald-600 text-white ring-4 ring-emerald-500/30"
              : "bg-[#0059bb] hover:bg-[#0a66cc] text-white border-b-[4px] border-[#003d82] active:border-b-2 active:translate-y-[2px] cursor-pointer"
          }`}
          title={isListening ? "Đang lắng nghe bạn..." : isFailed ? "Nhấn để nói lại" : "Nhấn để phát âm"}
          aria-label={micLabel}
        >
          {isFailed ? (
            <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4]" aria-hidden="true" />
          ) : (
            <Mic className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
          )}
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider font-display">{micLabel}</span>
        </button>
      </div>

      {/* Transcript & feedback panel (informational, so no 3D button-like border) */}
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1"
      >
        <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">{instruction}</p>

        {transcript ? (
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-extrabold font-display text-slate-900 dark:text-white">
              &ldquo;{transcript}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Độ giống:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-display tabular-nums font-black ${
                  accuracy >= 80
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : accuracy >= 50
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {accuracy}%
              </span>
            </div>
          </div>
        ) : isFailed ? (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Chưa thu được âm thanh. Nhấn nút Mic để thử lại.
          </p>
        ) : isListening ? null : (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Hệ thống nhận diện giọng nói của bạn rồi so khớp với từ mục tiêu
          </p>
        )}

        {speechError && (
          <div
            role="alert"
            className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-center gap-1.5 font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{speechError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
