"use client";

import React, { useEffect, useState } from "react";
import { Timer, Volume2, VolumeX, Flag, Brain, CheckCircle2, XCircle, Sparkles, Delete } from "lucide-react";
import { QuestionPackage, Opponent, PvPGameMode } from "../types";
import { isPvPSoundEnabled, setPvPSoundEnabled } from "../utils/pvpSoundEngine";

interface PvPArenaProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  currentPackage: QuestionPackage;
  gameMode: PvPGameMode;
  timer: number;
  maxTimer: number;
  userScore: number;
  opponentScore: number;
  opponent: Opponent | null;
  opponentStatus: "thinking" | "answered_correct" | "answered_incorrect";
  userResults: (boolean | null)[];
  oppResults: (boolean | null)[];
  selectedOptionId: string | null;
  answered: boolean;
  onSelectOption: (optId: string, isCorrect: boolean) => void;
  onPlayAudio: () => void;
  onGiveUp: () => void;
  spellingInput: string;
  setSpellingInput: (val: string) => void;
  scrambledLetters: string[];
  onLetterClick: (letter: string) => void;
}

export function PvPArena({
  currentQuestionIndex,
  totalQuestions,
  currentPackage,
  gameMode,
  timer,
  maxTimer,
  userScore,
  opponentScore,
  opponent,
  opponentStatus,
  userResults,
  oppResults,
  selectedOptionId,
  answered,
  onSelectOption,
  onPlayAudio,
  onGiveUp,
  spellingInput,
  setSpellingInput,
  scrambledLetters,
  onLetterClick,
}: PvPArenaProps) {
  const [soundEnabled, setSoundEnabled] = useState(() => isPvPSoundEnabled());
  const timerPercentage = Math.max(0, Math.min(100, (timer / maxTimer) * 100));

  // Keyboard shortcut listener (Keys 1-4 or A-D)
  useEffect(() => {
    if (answered || gameMode === "spelling") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      let index = -1;
      if (key === "1" || key === "A") index = 0;
      else if (key === "2" || key === "B") index = 1;
      else if (key === "3" || key === "C") index = 2;
      else if (key === "4" || key === "D") index = 3;

      if (index >= 0 && index < currentPackage.options.length) {
        e.preventDefault();
        const opt = currentPackage.options[index];
        if (opt) {
          onSelectOption(opt.id, opt.isCorrect);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answered, gameMode, currentPackage, onSelectOption]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setPvPSoundEnabled(next);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top HUD: Player vs Opponent Score & Status */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          {/* User Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#0059bb] dark:text-sky-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
              Bạn
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">Điểm của bạn</span>
              <span className="text-xl font-display font-black text-[#0059bb] dark:text-sky-400 font-mono">
                {userScore}
              </span>
            </div>
          </div>

          {/* VS & Round info */}
          <div className="text-center flex flex-col items-center gap-1">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              Câu {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-md">
                VS
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="p-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Bật/Tắt âm thanh"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* Opponent Side */}
          <div className="flex items-center gap-3 text-right">
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase">
                {opponent?.name || "Đối thủ"}
              </span>
              <span className="text-xl font-display font-black text-rose-500 font-mono">
                {opponentScore}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-lg border border-rose-500/30">
              {opponent?.avatarEmoji || "🤖"}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-between gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const res = userResults[idx];
              return (
                <div
                  key={`user_dot_${idx}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentQuestionIndex
                      ? "ring-2 ring-[#0059bb] bg-[#0059bb]"
                      : res === true
                      ? "bg-emerald-500"
                      : res === false
                      ? "bg-rose-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              );
            })}
          </div>

          <span className="text-xs font-bold text-slate-400">
            {opponentStatus === "thinking"
              ? "Đối thủ đang suy nghĩ..."
              : opponentStatus === "answered_correct"
              ? "Đối thủ trả lời đúng! ⚡"
              : "Đối thủ trả lời sai!"}
          </span>

          <div className="flex gap-1 justify-end">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const res = oppResults[idx];
              return (
                <div
                  key={`opp_dot_${idx}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentQuestionIndex
                      ? "ring-2 ring-rose-500 bg-rose-500"
                      : res === true
                      ? "bg-emerald-500"
                      : res === false
                      ? "bg-rose-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              timer <= 3 ? "bg-rose-500" : timer <= 6 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-sm">
        {gameMode === "listening" ? (
          <div className="space-y-3">
            <button
              onClick={onPlayAudio}
              className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center justify-center mx-auto shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-8 h-8" />
            </button>
            <p className="text-xs text-slate-500 font-medium">Bấm vào loa để nghe lại từ vựng</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {gameMode === "spelling" ? "Ghép chữ cái thành từ đúng" : "Chọn nghĩa tiếng Việt chính xác (Phím 1-4 hoặc A-D)"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              {currentPackage.question.word}
            </h2>
            {currentPackage.question.ipa && (
              <span className="text-xs sm:text-sm font-mono text-slate-400 font-semibold block">
                {currentPackage.question.ipa}
              </span>
            )}
          </div>
        )}

        {/* Spelling Interactive Letter Tiles */}
        {gameMode === "spelling" ? (
          <div className="space-y-4 pt-2">
            <div className="min-h-12 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
              <div className="font-mono text-xl font-bold tracking-widest text-[#0059bb] dark:text-sky-400 mx-auto">
                {spellingInput || "..."}
              </div>
              {spellingInput && !answered && (
                <button
                  type="button"
                  onClick={() => setSpellingInput(spellingInput.slice(0, -1))}
                  className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-rose-500 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                  title="Xóa ký tự cuối"
                >
                  ⌫ Xóa
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {scrambledLetters.map((letter, idx) => (
                <button
                  key={`letter_${idx}`}
                  disabled={answered}
                  onClick={() => onLetterClick(letter)}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-base font-bold shadow-xs hover:bg-blue-50 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Quiz / Listening Choices Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentPackage.options.map((opt, optIdx) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#0059bb]";

              if (answered) {
                if (opt.isCorrect) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500";
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={answered}
                  onClick={() => onSelectOption(opt.id, opt.isCorrect)}
                  className={`p-4 rounded-xl border font-bold text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {answered && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {answered && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Give up button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            onClick={onGiveUp}
            className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Đầu hàng & Thoát trận</span>
          </button>
        </div>
      </div>
    </div>
  );
}
