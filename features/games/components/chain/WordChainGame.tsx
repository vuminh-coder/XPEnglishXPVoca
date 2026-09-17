"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bot, User, Timer, Zap, Send, RotateCcw, Sparkles } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { WordChainEntry } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

export interface WordChainGameProps {
  pool: any[];
  onBack: () => void;
}

const COMMON_DICTIONARY = [
  "APPLE", "BANANA", "CAT", "DOG", "ELEPHANT", "FISH", "GRAPE", "HORSE", "ICE", "JUICE",
  "KITE", "LION", "MONKEY", "NEST", "ORANGE", "PENGUIN", "QUEEN", "RABBIT", "SUN", "TIGER",
  "UMBRELLA", "VAN", "WATER", "XYLOPHONE", "YACHT", "ZEBRA", "ACTION", "BEAUTIFUL", "CREATE",
  "DREAM", "ENERGY", "FUTURE", "GLOBAL", "HEALTH", "IMPACT", "JOURNEY", "KNOWLEDGE", "LEARN",
  "MEMORY", "NATURE", "ONLINE", "PEACE", "QUICK", "RESPECT", "SMART", "TARGET", "UNIQUE",
  "VISION", "WONDER", "YOUTH", "ZONE", "ACHIEVE", "BALANCE", "COURAGE", "DEVELOP", "EVOLVE",
  "FLOURISH", "GROWTH", "HARMONY", "INSPIRE", "JUSTICE", "KINDNESS", "LEADERSHIP", "MOTIVATE",
  "NAVIGATE", "OPTIMIZE", "PASSION", "QUALITY", "RESILIENT", "STRENGTH", "THRIVE", "UNITE",
  "VICTORY", "WISDOM", "EXCELLENCE", "YIELD", "ZENITH"
];

export function WordChainGame({ pool, onBack }: WordChainGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [chain, setChain] = useState<WordChainEntry[]>([]);
  const [currentTurn, setCurrentTurn] = useState<"player" | "ai">("player");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [gameOver, setGameOver] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Build full dictionary from pool + common dictionary
  const fullDictionary = Array.from(
    new Set([
      ...COMMON_DICTIONARY,
      ...(pool || [])
        .filter((p) => p.word && /^[a-zA-Z]+$/.test(p.word))
        .map((p) => p.word.toUpperCase().trim()),
    ])
  );

  // Start initial game with an AI starting word
  const initGame = useCallback(() => {
    const starterWords = ["LEARN", "SMART", "ACTION", "FOCUS", "DREAM", "NATURE"];
    const startingWord = starterWords[Math.floor(Math.random() * starterWords.length)];

    setChain([
      {
        id: "start_0",
        word: startingWord,
        playedBy: "ai",
        definitionVn: "Từ khởi đầu của AI XP Mentor",
      },
    ]);
    setCurrentTurn("player");
    setInput("");
    setScore(0);
    setTimeLeft(12);
    setGameOver(false);
    setAiThinking(false);
    setErrorMsg("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Auto-scroll to bottom of chat list
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chain, aiThinking]);

  // Last word in chain determines required first letter
  const lastEntry = chain[chain.length - 1];
  const requiredChar = lastEntry
    ? lastEntry.word[lastEntry.word.length - 1].toUpperCase()
    : "";

  // Timer countdown for player
  useEffect(() => {
    if (gameOver || currentTurn !== "player") return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Timeout = Game Over
          gameAudio.playWrongBuzzer();
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, currentTurn]);

  // AI response handler
  const triggerAiTurn = useCallback(
    (neededChar: string, usedWords: string[]) => {
      setAiThinking(true);
      setCurrentTurn("ai");

      setTimeout(() => {
        const candidates = fullDictionary.filter(
          (w) =>
            w.startsWith(neededChar) &&
            !usedWords.includes(w) &&
            w.length >= 3
        );

        if (candidates.length > 0) {
          const aiWord = candidates[Math.floor(Math.random() * candidates.length)];
          gameAudio.playFlipSound();

          setChain((prev) => [
            ...prev,
            {
              id: `ai_${Date.now()}`,
              word: aiWord,
              playedBy: "ai",
            },
          ]);

          setAiThinking(false);
          setCurrentTurn("player");
          setTimeLeft(12);
          setTimeout(() => inputRef.current?.focus(), 100);
        } else {
          // AI ran out of words, Player wins bonus!
          gameAudio.playVictoryFanfare();
          setScore((s) => s + 50);
          setGameOver(true);
          addToast({
            type: "xp",
            title: "AI Không Còn Từ Để Nối!",
            message: "Bạn đã đánh bại AI Mentor trong trận đấu nối chữ!",
          });
        }
      }, 1100);
    },
    [fullDictionary, addToast]
  );

  // Player submit word
  const handlePlayerSubmit = () => {
    if (currentTurn !== "player" || gameOver) return;

    const typed = input.trim().toUpperCase();
    if (!typed) return;

    // Validation 1: Min length
    if (typed.length < 3) {
      setErrorMsg("Từ vựng phải có ít nhất 3 chữ cái!");
      gameAudio.playWrongBuzzer();
      return;
    }

    // Validation 2: Matching starting letter
    if (typed[0] !== requiredChar) {
      setErrorMsg(`Từ phải bắt đầu bằng chữ cái "${requiredChar}"!`);
      gameAudio.playWrongBuzzer();
      return;
    }

    // Validation 3: Not previously used
    const usedWords = chain.map((c) => c.word);
    if (usedWords.includes(typed)) {
      setErrorMsg(`Từ "${typed}" đã được sử dụng trước đó!`);
      gameAudio.playWrongBuzzer();
      return;
    }

    // Valid word accepted
    gameAudio.playCorrectDing();
    setErrorMsg("");
    setInput("");
    setScore((s) => s + 10);

    const nextUsed = [...usedWords, typed];
    setChain((prev) => [
      ...prev,
      {
        id: `player_${Date.now()}`,
        word: typed,
        playedBy: "player",
      },
    ]);

    const nextChar = typed[typed.length - 1];
    triggerAiTurn(nextChar, nextUsed);
  };

  // When game finishes, award XP and sync to DB
  useEffect(() => {
    if (gameOver && score > 0) {
      gameAudio.playVictoryFanfare();
      awardXp(score);
      awardCoins?.(5);

      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "chain",
          score,
          xpGained: score,
          coinsGained: 5,
          wordsCompleted: Math.floor(chain.length / 2),
        }),
      }).catch((err) => console.warn("Failed to save word chain game:", err));

      addToast({
        type: "xp",
        title: `+${score} XP & +5 Vàng!`,
        message: `Hoàn thành trận đấu nối từ Word Chain!`,
      });
    }
  }, [gameOver, score, awardXp, awardCoins, addToast, chain.length]);

  if (gameOver) {
    return (
      <GameResultScreen
        title="Trận Đấu Nối Từ Kết Thúc!"
        subtitle={`Bạn đã đối đầu xuất sắc với AI Mentor qua ${chain.length} lượt nối từ liên tiếp.`}
        score={score}
        xpEarned={score}
        coinsEarned={5}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-4 select-none max-w-2xl mx-auto">
      {/* Top Header Bar */}
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

          <Badge variant={timeLeft <= 4 ? "danger" : "neutral"} size="sm">
            <Timer className="w-3 h-3 mr-1 stroke-[2.2]" />
            {timeLeft}s
          </Badge>
        </div>
      </div>

      {/* Target Letter Indicator Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-between shadow-2xs">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Chữ cái bắt đầu tiếp theo:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#0059bb] dark:text-sky-400 font-display">
              "{requiredChar}"
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              (Từ trước kết thúc bằng {requiredChar})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs">
          {currentTurn === "player" ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Lượt của bạn
            </span>
          ) : (
            <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" />
              AI đang nghĩ...
            </span>
          )}
        </div>
      </div>

      {/* Word Chain History Arena */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 min-h-[300px] max-h-[360px] overflow-y-auto space-y-3 shadow-2xs">
        {chain.map((item, idx) => {
          const isPlayer = item.playedBy === "player";
          return (
            <div
              key={item.id}
              className={`flex items-start gap-2.5 ${isPlayer ? "justify-end" : "justify-start"}`}
            >
              {!isPlayer && (
                <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[75%] p-3 rounded-2xl shadow-2xs space-y-0.5 ${
                  isPlayer
                    ? "bg-[#0059bb] text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200/80 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-wider font-display">
                    {item.word}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isPlayer
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300"
                    }`}
                  >
                    #{idx + 1}
                  </span>
                </div>
                {item.definitionVn && (
                  <p
                    className={`text-[11px] ${
                      isPlayer ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.definitionVn}
                  </p>
                )}
              </div>

              {isPlayer && (
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {aiThinking && (
          <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-semibold p-2">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>AI Mentor đang tra cứu từ vựng nối tiếp...</span>
          </div>
        )}

        <div ref={scrollEndRef} />
      </div>

      {/* Input Form Dock */}
      <div className="space-y-2">
        {errorMsg && (
          <div className="text-xs font-bold text-rose-500 text-center animate-in fade-in">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setErrorMsg("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handlePlayerSubmit()}
            placeholder={`Gõ từ bắt đầu bằng chữ "${requiredChar}"...`}
            disabled={currentTurn !== "player" || gameOver}
            className="flex-1 py-3 px-4 text-base font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 uppercase tracking-widest transition-all shadow-inner"
            autoFocus
          />

          <button
            type="button"
            onClick={handlePlayerSubmit}
            disabled={currentTurn !== "player" || !input.trim()}
            className="py-3 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi từ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
