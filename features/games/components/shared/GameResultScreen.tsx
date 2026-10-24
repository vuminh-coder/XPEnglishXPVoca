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
    <div className="w-full max-w-lg lg:max-w-xl mx-auto flex-1 flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-5 select-none relative animate-in fade-in zoom-in-95 duration-200 h-full">
      <ConfettiEffect active={showConfetti} />

      {/* 1. Mascot & Celebratory Stage (Enlarged Mascot with Victory Radial Glow) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        <div className="relative flex flex-col items-center">
          {/* Victory Radial Glow Behind Mascot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-amber-300/30 via-sky-300/20 to-blue-400/20 blur-3xl pointer-events-none" />

          {/* Character Speech Bubble closely positioned */}
          <div className="relative z-10 mb-2 sm:mb-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200/90 dark:border-slate-700 shadow-md max-w-xs sm:max-w-sm">
            <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
              {praiseText}
            </p>
            {/* Bubble triangle pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-b-2 border-r-2 border-slate-200/90 dark:border-slate-700 rotate-45" />
          </div>

          {/* Enlarged 3D Mascot Avatar */}
          <div className="relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeChar.avatarUrl}
              alt={activeChar.name}
              className="w-36 h-48 sm:w-48 sm:h-60 lg:w-52 lg:h-64 object-contain drop-shadow-xl select-none pointer-events-none transition-transform"
            />
            {/* Soft floor shadow matching enlarged mascot */}
            <div className="w-32 sm:w-40 h-3 bg-slate-900/10 dark:bg-black/40 rounded-full blur-xs mx-auto -mt-1.5" />
          </div>

          {/* Companion Name Tag */}
          <span className="mt-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {activeChar.name}
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-900 dark:text-white tracking-tight">
          {mainTitle}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-md mx-auto">
            {subtitle}
          </p>
        )}

        {/* 2. Three Dynamic Stat Pills (XP, Accuracy, Combo/Time) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4 w-full max-w-md mx-auto">
          {/* XP Pill */}
          <div className="py-2 px-2 sm:py-2.5 sm:px-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-200/90 dark:border-amber-800/60 text-center flex flex-col items-center justify-center gap-0.5 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              <span className="text-[11px] font-black uppercase tracking-wider">
                XP Thưởng
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black font-display text-amber-600 dark:text-amber-400">
              +{xpEarned || 15}
            </div>
          </div>

          {/* Accuracy Pill */}
          <div className="py-2 px-2 sm:py-2.5 sm:px-3 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-200/90 dark:border-emerald-800/60 text-center flex flex-col items-center justify-center gap-0.5 shadow-2xs">
            <div className="flex items-center gap-1 text-emerald-500">
              <Target className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="text-[11px] font-black uppercase tracking-wider">
                Chính xác
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
              {computedAccuracy}%
            </div>
          </div>

          {/* Combo / Speed Pill */}
          <div className="py-2 px-2 sm:py-2.5 sm:px-3 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border-2 border-blue-200/90 dark:border-blue-800/60 text-center flex flex-col items-center justify-center gap-0.5 shadow-2xs">
            <div className="flex items-center gap-1 text-[#0059bb] dark:text-sky-400">
              {maxCombo && maxCombo >= 3 ? (
                <Flame className="w-3.5 h-3.5 fill-[#0059bb] dark:fill-sky-400" />
              ) : (
                <Timer className="w-3.5 h-3.5" />
              )}
              <span className="text-[11px] font-black uppercase tracking-wider">
                {maxCombo && maxCombo >= 3 ? "Chuỗi Combo" : "Thời gian"}
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-black font-display text-[#0059bb] dark:text-sky-400">
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

      {/* 4. Action Buttons (Harmonious Dual Bottom Row - Thumb Zone) */}
      <div className="w-full max-w-md mx-auto shrink-0 flex items-center gap-2.5 pt-2">
        {/* Replay Button */}
        <button
          type="button"
          onClick={onRestart}
          title="Chơi lại ván mới (Phím R)"
          aria-label="Chơi lại ván mới"
          className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-center active:scale-95 shadow-2xs border-b-[4px] border-slate-300 dark:border-slate-900 active:border-b-2 active:translate-y-[2px]"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.4]" />
        </button>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 sm:py-4 px-6 rounded-2xl bg-[#0059bb] hover:bg-[#004799] text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-blue-500/25 border-b-[4px] border-[#004085] active:border-b-0 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{backLabel ? backLabel.toUpperCase() : "TIẾP TỤC LỘ TRÌNH"}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
