"use client";

import React, { useState, useEffect } from "react";
import {
  RotateCcw,
  Zap,
  Target,
  Flame,
  Timer,
  ArrowRight,
  Volume2,
  XCircle,
} from "lucide-react";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { GameReviewItem } from "../../types";
import { ConfettiEffect } from "./ConfettiEffect";
import { updateBestRecord } from "../../utils/gameRecords";
import { CompanionCharacter, XP_CHARACTERS } from "../../data/characterRoster";

export interface GameResultScreenProps {
  gameType?: string;
  character?: CompanionCharacter;
  title?: string;
  subtitle?: string;
  score?: number;
  xpEarned: number;
  coinsEarned?: number;
  accuracy?: number; // 0 - 100%
  durationSeconds?: number;
  maxCombo?: number;
  reviewItems?: GameReviewItem[];
  backLabel?: string;
  onBack: () => void;
  onRestart: () => void;
}

export function GameResultScreen({
  gameType = "game",
  character,
  title,
  subtitle,
  score,
  xpEarned = 15,
  coinsEarned = 5,
  accuracy,
  durationSeconds,
  maxCombo,
  reviewItems = [],
  backLabel,
  onBack,
  onRestart,
}: GameResultScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // Active character fallback to Cô Linh
  const activeChar = character || XP_CHARACTERS[1] || XP_CHARACTERS[0];

  // Calculate statistics
  const totalItems = reviewItems.length;
  const correctCount = reviewItems.filter((i) => i.isCorrect).length;
  const computedAccuracy =
    accuracy !== undefined
      ? accuracy
      : totalItems > 0
      ? Math.round((correctCount / totalItems) * 100)
      : 100;

  const wrongItems = reviewItems.filter((i) => !i.isCorrect);

  useEffect(() => {
    if (score !== undefined && score > 0) {
      updateBestRecord(gameType, score, maxCombo || 1);
    }
    if (computedAccuracy >= 60 || (score && score >= 40)) {
      setShowConfetti(true);
    }
  }, [score, maxCombo, gameType, computedAccuracy]);

  // Keyboard shortcut listener: Enter to continue, R to restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onBack();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack, onRestart]);

  const handleSpeak = (word: string) => {
    setSpeakingWord(word);
    safeSpeakText(word, { lang: "en-US", rate: 0.9 });
    setTimeout(() => setSpeakingWord(null), 1200);
  };

  const praiseText =
    computedAccuracy >= 100
      ? "Tuyệt đỉnh! Bạn không mắc một lỗi sai nào!"
      : computedAccuracy >= 80
      ? "Làm tốt lắm! Phản xạ rất nhanh nhẹn!"
      : "Hoàn thành rồi! Tiếp tục rèn luyện nhé!";

  const mainTitle =
    title || (computedAccuracy >= 100 ? "Nối Từ Hoàn Hảo!" : "Hoàn Thành Xuất Sắc!");

  return (
    <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-4 select-none relative animate-in fade-in zoom-in-95 duration-200 h-full">
      <ConfettiEffect active={showConfetti} />

      {/* 1. Mascot & Celebratory Stage */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Character Speech Bubble */}
        <div className="relative mb-3 sm:mb-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200/90 dark:border-slate-700 shadow-md max-w-xs sm:max-w-sm">
          <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-snug">
            {praiseText}
          </p>
          {/* Bubble triangle pointer pointing down to character head */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-slate-800 border-b-2 border-r-2 border-slate-200/90 dark:border-slate-700 rotate-45" />
        </div>

        {/* 3D Character Avatar */}
        <div className="relative flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeChar.avatarUrl}
            alt={activeChar.name}
            className="w-28 h-36 sm:w-36 sm:h-44 object-contain drop-shadow-md select-none pointer-events-none"
          />
          {/* Soft floor shadow */}
          <div className="w-24 h-2.5 bg-slate-900/10 dark:bg-black/30 rounded-full blur-xs mx-auto -mt-1" />
        </div>

        {/* Companion Name Tag */}
        <span className="mt-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400">
          {activeChar.name}
        </span>

        {/* Main Title & Subtitle */}
        <h2 className="mt-2 text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
          {mainTitle}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm">
            {subtitle}
          </p>
        )}

        {/* 2. Three Dynamic Stat Pills (XP, Accuracy, Combo/Time) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 my-4 sm:my-5 w-full max-w-md mx-auto">
          {/* XP Pill */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200/90 dark:border-amber-800/60 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                XP Thưởng
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display text-amber-600 dark:text-amber-400">
              +{xpEarned || 15}
            </div>
          </div>

          {/* Accuracy Pill */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200/90 dark:border-emerald-800/60 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
            <div className="flex items-center gap-1 text-emerald-500">
              <Target className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                Chính xác
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
              {computedAccuracy}%
            </div>
          </div>

          {/* Combo / Speed Pill */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200/90 dark:border-blue-800/60 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
            <div className="flex items-center gap-1 text-[#0059bb] dark:text-sky-400">
              {maxCombo && maxCombo >= 3 ? (
                <Flame className="w-3.5 h-3.5 fill-[#0059bb] dark:fill-sky-400" />
              ) : (
                <Timer className="w-3.5 h-3.5" />
              )}
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                {maxCombo && maxCombo >= 3 ? "Chuỗi Combo" : "Thời gian"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display text-[#0059bb] dark:text-sky-400">
              {maxCombo && maxCombo >= 3
                ? `x${maxCombo}`
                : durationSeconds
                ? `${durationSeconds}s`
                : "Hoàn hảo"}
            </div>
          </div>
        </div>

        {/* 3. Review Mistakes Block (Only shown if mistakes occurred) */}
        {wrongItems.length > 0 && (
          <div className="w-full max-w-md mx-auto mb-2 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/90 dark:border-rose-900/60 text-left">
            <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Xem lại {wrongItems.length} từ bạn đã nối nhầm:</span>
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {wrongItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-950"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-black text-slate-800 dark:text-slate-100">
                      {item.word}
                    </span>
                    <span className="text-slate-400 font-mono">—</span>
                    <span className="text-slate-600 dark:text-slate-300 truncate">
                      {item.definitionVn}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSpeak(item.word)}
                    title="Nghe phát âm"
                    className="p-1 rounded-lg text-slate-400 hover:text-[#0059bb] active:scale-90 transition-transform cursor-pointer shrink-0 ml-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Action Buttons (Thumb Zone at Bottom) */}
      <div className="w-full max-w-md mx-auto shrink-0 space-y-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#0059bb] hover:bg-[#004799] text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-blue-500/25 border-b-[4px] border-[#004085] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{backLabel ? backLabel.toUpperCase() : "TIẾP TỤC"}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="w-full py-2 px-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Chơi lại ván mới</span>
        </button>
      </div>
    </div>
  );
}
