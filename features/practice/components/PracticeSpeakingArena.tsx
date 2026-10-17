"use client";

import React from "react";
import { Folder, Keyboard, Mic, Volume2 } from "lucide-react";
import { PracticeWord } from "../types";
import { PracticeWordMetadataRow } from "./PracticeArenaHeader";

interface PracticeSpeakingArenaProps {
  currentWord: PracticeWord;
  isListening: boolean;
  transcript: string;
  accuracy: number;
  isCorrect: boolean;
  isAnswered: boolean;
  speechError: string | null;
  questionTimeLeft: number;
  isCurrentBookmarked: boolean;
  onToggleBookmark: () => void;
  onPlayAudio: (word: string) => void;
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
  questionTimeLeft,
  isCurrentBookmarked,
  onToggleBookmark,
  onPlayAudio,
  onStartSpeaking,
}: PracticeSpeakingArenaProps) {
  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
      {/* Prompt Target Word Card */}
      <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/90 flex flex-col justify-between shadow-2xs relative overflow-hidden">
        {/* 1. TOP METADATA ROW */}
        <PracticeWordMetadataRow
          currentWord={currentWord}
          questionTimeLeft={questionTimeLeft}
          isCurrentBookmarked={isCurrentBookmarked}
          onToggleBookmark={onToggleBookmark}
          badgeLabel="Phát Âm AI"
          badgeIcon={<Mic className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />}
        />

        {/* 2. CENTERPIECE TARGET VOCABULARY & AUDIO */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2 space-y-1.5">
          <div className="relative inline-flex items-center justify-center">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white font-display tracking-tight leading-none text-center">
              {currentWord.word}
            </h2>
            <button
              type="button"
              onClick={() => onPlayAudio(currentWord.word)}
              className="absolute left-full ml-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 border border-blue-200/60 dark:border-blue-800/40"
              title="Nghe phát âm chuẩn bản xứ"
            >
              <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>

          {currentWord.ipa && (
            <p className="text-xs sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide text-center">
              {currentWord.ipa}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5 text-center">
            Nghĩa:{" "}
            <strong className="text-slate-700 dark:text-slate-200">
              {currentWord.meaning}
            </strong>
          </p>
        </div>

        {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
          {/* Góc Trái Dưới: Chủ đề từ vựng */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span>Chủ đề:</span>
            <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {currentWord.topic || "Cảm xúc & Đời sống"}
            </span>
          </div>

          {/* Góc Phải Dưới: Phím nhanh (chỉ hiển thị trên Desktop) */}
          <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span>Phím nhanh:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onStartSpeaking}
                disabled={isListening}
                className="h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
                title="Thu âm phát âm phím Space"
              >
                Space: Thu âm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MICROPHONE ACTION & AI SPEECH ASSESSMENT HUB */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3 shrink-0 shadow-2xs">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <span className="absolute w-20 h-20 rounded-full bg-rose-500/20 animate-ping" />
            )}
            <button
              type="button"
              onClick={onStartSpeaking}
              disabled={isListening}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer relative z-10 ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/25 scale-105"
                  : "bg-[#0059bb] hover:bg-[#004899] text-white hover:scale-105 active:scale-95 shadow-[#0059bb]/25"
              }`}
              title="Bấm Micro để thu âm phát âm"
            >
              <Mic className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </button>
          </div>

          {/* Voice Waveform Equalizer Bars when listening */}
          {isListening && (
            <div className="flex items-center gap-1 h-5 pt-1">
              <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.15s_infinite] h-5" />
              <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.3s_infinite] h-4" />
              <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.45s_infinite] h-5" />
              <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite] h-2" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            {isListening ? (
              "🔴 Đang lắng nghe giọng bạn phát âm..."
            ) : isAnswered ? (
              "Chạm Micro để phát âm lại"
            ) : (
              <>
                <span className="sm:hidden">Chạm nút Micro để bắt đầu nói</span>
                <span className="hidden sm:inline">Nhấn nút Micro hoặc bấm Space để bắt đầu nói</span>
              </>
            )}
          </p>

          {speechError && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900/30">
              {speechError}
            </p>
          )}

          {isAnswered && transcript && (
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 font-medium shadow-2xs animate-fade-in">
              <span>
                Giọng thu: <strong className="font-bold text-slate-900 dark:text-white">"{transcript}"</strong>
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span
                className={`font-black font-mono px-2 py-0.5 rounded-md ${
                  isCorrect
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60"
                }`}
              >
                Độ khớp: {accuracy}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
