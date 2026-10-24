"use client";

import React from "react";
import { Mic, Volume2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
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
}

export function PracticeSpeakingArena({
  currentWord,
  isListening,
  transcript,
  accuracy,
  isCorrect,
  isAnswered,
  speechError,
  onPlayAudio,
  onStartSpeaking,
}: PracticeSpeakingArenaProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 min-h-0 select-none py-2 text-center">
      {/* Microphone Visualizer Circle */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring animations when recording */}
        {isListening && (
          <>
            <span className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-rose-500/20 animate-ping" />
            <span className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-500/10 animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={onStartSpeaking}
          disabled={isListening}
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center gap-1 shadow-lg transition-all cursor-pointer active:scale-95 ${
            isListening
              ? "bg-rose-500 text-white ring-4 ring-rose-500/30 scale-105"
              : isAnswered && isCorrect
              ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30"
              : "bg-[#0059bb] hover:bg-blue-600 text-white border-b-[5px] border-[#003d82] active:border-b-2 active:translate-y-[2px]"
          }`}
          title={isListening ? "Đang lắng nghe bạn..." : "Nhấn để phát âm"}
        >
          <Mic className={`w-8 h-8 sm:w-10 sm:h-10 ${isListening ? "animate-bounce" : ""}`} />
          <span className="text-[11px] font-black uppercase tracking-wider font-display">
            {isListening ? "Đang nghe" : "Nói ngay"}
          </span>
        </button>
      </div>

      {/* Transcript & Feedback Card */}
      <div className="w-full max-w-md p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {isListening
            ? "Hãy phát âm to và rõ ràng..."
            : isAnswered
            ? "Kết quả nhận diện giọng nói:"
            : "Nhấn nút Mic hoặc phím Space để bắt đầu nói"}
        </div>

        {transcript ? (
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
              "{transcript}"
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Độ chính xác:
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                  accuracy >= 80
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : accuracy >= 50
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {accuracy}%
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Hệ thống AI sẽ lắng nghe và phân tích âm sắc chuẩn IPA
          </p>
        )}

        {speechError && (
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
