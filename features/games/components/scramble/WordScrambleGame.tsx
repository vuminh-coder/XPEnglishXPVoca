"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Timer, Flame, Check, SkipForward } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { ScrambleWordPackage } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

function scrambleWord(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === word ? scrambleWord(word) : result;
}

export interface WordScrambleGameProps {
  pool: any[];
  onBack: () => void;
}

export function WordScrambleGame({ pool, onBack }: WordScrambleGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [words, setWords] = useState<ScrambleWordPackage[]>([]);

  useEffect(() => {
    if (pool && pool.length > 0) {
      setWords(
        [...pool]
          .sort(() => 0.5 - Math.random())
          .slice(0, 8)
          .map((w) => ({
            word: w.word,
            definitionVn: w.definitionVn,
            scrambled: scrambleWord(w.word.toUpperCase()),
          }))
      );
    }
  }, [pool]);

  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // When game finishes, award XP/Coins and sync to database
  useEffect(() => {
    if (gameOver && score > 0) {
      gameAudio.playVictoryFanfare();
      awardXp(score);
      awardCoins?.(5);

      // Async DB record sync
      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "scramble",
          score,
          xpGained: score,
          coinsGained: 5,
          wordsCompleted: current + 1,
        }),
      }).catch((err) => console.warn("Failed to persist game session to DB:", err));

      addToast({
        type: "xp",
        title: `+${score} XP & +5 Vàng!`,
        message: "Chúc mừng bạn đã hoàn thành Word Scramble!",
      });
    }
  }, [gameOver, score, awardXp, awardCoins, addToast, current]);

  const handleSkip = () => {
    setCombo(0);
    gameAudio.playWrongBuzzer();
    if (current < words.length - 1) {
      setCurrent((c) => c + 1);
      setInput("");
      setFeedback(null);
      setTimeLeft(30);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver || words.length === 0) return;
    const timerVal = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSkip();
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerVal);
  }, [current, gameOver, words]);

  const handleSubmit = () => {
    if (!words[current]) return;
    if (input.trim().toLowerCase() === words[current].word.toLowerCase()) {
      gameAudio.playCorrectDing();
      const comboBonus = combo >= 3 ? 3 : combo >= 2 ? 2 : 1;
      setScore((s) => s + 10 * comboBonus);
      setCombo((c) => c + 1);
      setFeedback("correct");
    } else {
      gameAudio.playWrongBuzzer();
      setCombo(0);
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (current < words.length - 1) {
        setCurrent((c) => c + 1);
        setInput("");
        setFeedback(null);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }, 700);
  };

  const handleRestart = () => {
    if (!pool || pool.length === 0) return;
    const selected = [...pool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
      .map((w) => ({
        word: w.word,
        definitionVn: w.definitionVn,
        scrambled: scrambleWord(w.word.toUpperCase()),
      }));
    setWords(selected);
    setCurrent(0);
    setScore(0);
    setCombo(0);
    setInput("");
    setFeedback(null);
    setTimeLeft(30);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <GameResultScreen
        title="Xuất Sắc! Hoàn Thành Word Scramble"
        subtitle={`Bạn đã chinh phục thành công ${words.length} từ vựng tiếng Anh với độ chính xác cao.`}
        score={score}
        xpEarned={score}
        coinsEarned={5}
        onBack={onBack}
        onRestart={handleRestart}
      />
    );
  }

  const currentWord = words[current];

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            <Zap className="w-3 h-3 mr-1 text-amber-400 stroke-[2.5]" />
            {score} điểm
          </Badge>

          {combo >= 2 && (
            <Badge variant="warning" size="sm">
              <Flame className="w-3 h-3 mr-0.5 text-amber-500 fill-amber-500" />
              x{combo} Combo!
            </Badge>
          )}

          <Badge variant={timeLeft <= 8 ? "danger" : "neutral"} size="sm">
            <Timer className="w-3 h-3 mr-1 stroke-[2.2]" />
            {timeLeft}s
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#0059bb]"
          initial={{ width: 0 }}
          animate={{
            width: words.length ? `${((current + 1) / words.length) * 100}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* Main Interactive Card */}
      <AnimatePresence mode="wait">
        {currentWord && (
          <motion.div
            key={`scramble-${current}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 95, damping: 16 }}
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl text-center space-y-5 bg-white dark:bg-slate-900 border transition-all shadow-2xs ${
                feedback === "correct"
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : feedback === "wrong"
                  ? "border-rose-500 ring-2 ring-rose-500/20"
                  : "border-slate-200/90 dark:border-slate-800"
              }`}
            >
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Sắp xếp lại các chữ cái thành từ đúng ({current + 1}/{words.length})
              </p>

              {/* Scrambled Letter Tiles */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {currentWord.scrambled.split("").map((ch, i) => (
                  <span
                    key={i}
                    className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center text-lg sm:text-xl font-black text-[#0059bb] dark:text-sky-400 font-display shadow-2xs"
                  >
                    {ch}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold max-w-sm mx-auto">
                {currentWord.definitionVn}
              </p>

              {/* Text Input Box */}
              <div className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  className="w-full py-2.5 px-4 text-center text-base font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 uppercase tracking-widest transition-all shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Nhập từ chính xác..."
                  autoFocus
                />

                <div className="flex gap-2.5 justify-center">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <SkipForward className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Bỏ qua</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="py-2 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    <span>Xác nhận</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
