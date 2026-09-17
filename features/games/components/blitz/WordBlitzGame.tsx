"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Zap, Flame, Pause, Play, RotateCcw, Crosshair } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { BlitzFallingWord } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

export interface WordBlitzGameProps {
  pool: any[];
  onBack: () => void;
}

const FALLBACK_BLITZ_WORDS = [
  { word: "FOCUS", definitionVn: "Tập trung cao độ" },
  { word: "ACTION", definitionVn: "Hành động dứt khoát" },
  { word: "SMART", definitionVn: "Thông minh, sáng dạ" },
  { word: "ENERGY", definitionVn: "Năng lượng dồi dào" },
  { word: "SPEED", definitionVn: "Tốc độ nhanh nhạy" },
  { word: "VICTORY", definitionVn: "Chiến thắng vinh quang" },
  { word: "CHALLENGE", definitionVn: "Thử thách bứt phá" },
  { word: "GROWTH", definitionVn: "Sự phát triển vượt bậc" },
  { word: "DISCIPLINE", definitionVn: "Kỷ luật thép" },
  { word: "PASSION", definitionVn: "Niềm đam mê mãnh liệt" },
  { word: "SUCCESS", definitionVn: "Thành công vang dội" },
  { word: "MASTER", definitionVn: "Bậc thầy tinh thông" },
];

export function WordBlitzGame({ pool, onBack }: WordBlitzGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [input, setInput] = useState("");
  const [fallingWords, setFallingWords] = useState<BlitzFallingWord[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(Date.now());
  const wordsClearedRef = useRef(0);
  wordsClearedRef.current = wordsCleared;

  // Active word pool
  const activePool =
    pool && pool.length >= 10
      ? pool
          .filter((p) => p.word && p.word.length >= 3 && p.word.length <= 10)
          .map((p) => ({
            word: p.word.toUpperCase().trim(),
            definitionVn: p.definitionVn || "Từ vựng tiếng Anh",
          }))
      : FALLBACK_BLITZ_WORDS;

  const spawnWord = useCallback(() => {
    const candidate = activePool[Math.floor(Math.random() * activePool.length)];
    const id = `word_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const xPos = 12 + Math.random() * 70; // 12% to 82%
    // Base speed increases with words cleared
    const baseSpeed = 0.28 + Math.min(0.45, wordsClearedRef.current * 0.02);

    setFallingWords((prev) => [
      ...prev,
      {
        id,
        word: candidate.word,
        definitionVn: candidate.definitionVn,
        y: 2,
        x: xPos,
        speed: baseSpeed,
      },
    ]);
  }, [activePool]);

  // Main game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    let lastTime = performance.now();

    const updateFrame = (now: number) => {
      const delta = (now - lastTime) / 16.6; // normalized to 60fps
      lastTime = now;

      // Spawn new word every 2.4 - 3.2 seconds
      const nowMs = Date.now();
      const spawnInterval = Math.max(1800, 3200 - wordsClearedRef.current * 80);
      if (nowMs - lastSpawnRef.current > spawnInterval && fallingWords.length < 4) {
        spawnWord();
        lastSpawnRef.current = nowMs;
      }

      // Update falling positions
      setFallingWords((prev) => {
        const next: BlitzFallingWord[] = [];
        let hitBottom = false;

        for (const item of prev) {
          const newY = item.y + item.speed * delta;
          if (newY >= 88) {
            // Hit bottom deadline!
            hitBottom = true;
          } else {
            next.push({ ...item, y: newY });
          }
        }

        if (hitBottom) {
          gameAudio.playWrongBuzzer();
          setCombo(0);
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setGameOver(true);
            }
            return Math.max(0, nextL);
          });
        }

        return next;
      });

      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameOver, isPaused, fallingWords.length, spawnWord]);

  // Check matching word whenever input changes or user hits enter
  const handleCheckWord = (typed: string) => {
    const cleanTyped = typed.trim().toUpperCase();
    if (!cleanTyped) return;

    const matchIndex = fallingWords.findIndex((w) => w.word === cleanTyped);

    if (matchIndex !== -1) {
      gameAudio.playCorrectDing();
      const matchedWord = fallingWords[matchIndex];

      // Remove the matched word
      setFallingWords((prev) => prev.filter((w) => w.id !== matchedWord.id));
      setInput("");

      // Calculate score & combo
      const newCombo = combo + 1;
      setCombo(newCombo);
      const comboMultiplier = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
      const points = 10 * comboMultiplier;

      setScore((s) => s + points);
      setWordsCleared((c) => c + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    handleCheckWord(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheckWord(input);
      setInput("");
    }
  };

  // When game finishes, award XP/Coins and sync to database
  useEffect(() => {
    if (gameOver && score > 0) {
      gameAudio.playVictoryFanfare();
      awardXp(score);
      const earnedCoins = Math.min(20, Math.max(5, Math.floor(score / 15)));
      awardCoins?.(earnedCoins);

      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "blitz",
          score,
          xpGained: score,
          coinsGained: earnedCoins,
          wordsCompleted: wordsCleared,
        }),
      }).catch((err) => console.warn("Failed to save blitz game session:", err));

      addToast({
        type: "xp",
        title: `+${score} XP & +${earnedCoins} Vàng!`,
        message: `Xuất sắc! Bạn đã giải cứu thành công ${wordsCleared} từ vựng trong Word Blitz!`,
      });
    }
  }, [gameOver, score, awardXp, awardCoins, addToast, wordsCleared]);

  const handleRestart = () => {
    setLives(3);
    setScore(0);
    setCombo(0);
    setWordsCleared(0);
    setIsPaused(false);
    setGameOver(false);
    setInput("");
    setFallingWords([]);
    lastSpawnRef.current = Date.now();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  if (gameOver) {
    const earnedCoins = Math.min(20, Math.max(5, Math.floor(score / 15)));
    return (
      <GameResultScreen
        title="Trận Đấu Tốc Độ Kết Thúc!"
        subtitle={`Bạn đã phản xạ giải cứu thành công ${wordsCleared} từ vựng với tổng điểm ${score}.`}
        score={score}
        xpEarned={score}
        coinsEarned={earnedCoins}
        onBack={onBack}
        onRestart={handleRestart}
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

        {/* Lives (Hearts) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 transition-all duration-200 ${
                i < lives
                  ? "text-rose-500 fill-rose-500 scale-100"
                  : "text-slate-300 dark:text-slate-700 scale-90"
              }`}
            />
          ))}
        </div>

        {/* Score & Combo */}
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            <Zap className="w-3 h-3 mr-1 text-amber-400 stroke-[2.5]" />
            {score} điểm
          </Badge>

          {combo >= 2 && (
            <Badge variant="warning" size="sm">
              <Flame className="w-3 h-3 mr-0.5 text-amber-500 fill-amber-500" />
              x{combo} Streak!
            </Badge>
          )}

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer active:scale-90"
            title={isPaused ? "Tiếp tục" : "Tạm dừng"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Falling Words Stage Arena */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-md">
        {/* Background Grid Lines Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Laser Deadline at Bottom */}
        <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 shadow-sm shadow-rose-500/80 flex items-center justify-center">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-950/90 text-rose-300 border border-rose-800/80 -translate-y-0.5">
            Vạch Nguy Hiểm
          </span>
        </div>

        {/* Falling Words List */}
        {fallingWords.map((item) => (
          <div
            key={item.id}
            style={{
              top: `${item.y}%`,
              left: `${item.x}%`,
              transform: "translate(-50%, 0)",
            }}
            className="absolute transition-all duration-75 flex flex-col items-center"
          >
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0059bb] text-white border border-blue-400/50 shadow-md shadow-blue-500/30 flex flex-col items-center animate-in zoom-in-90">
              <span className="text-sm sm:text-base font-black tracking-widest font-display">
                {item.word}
              </span>
              <span className="text-[10px] text-blue-100 font-semibold max-w-[140px] truncate text-center">
                {item.definitionVn}
              </span>
            </div>
          </div>
        ))}

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-30">
            <div className="text-base sm:text-lg font-bold text-white">Đang Tạm Dừng</div>
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className="py-2 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center gap-2 active:scale-95 shadow-md"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Tiếp Tục Bắn Từ</span>
            </button>
          </div>
        )}
      </div>

      {/* Typing Input Dock */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold px-1">
          <span className="flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-[#0059bb]" />
            Gõ nhanh từ tiếng Anh đang rơi để giải cứu
          </span>
          <span>Đã giải cứu: {wordsCleared} từ</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Gõ từ tiếng Anh rồi bấm Enter..."
          className="w-full py-3 px-4 text-center text-base sm:text-lg font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 uppercase tracking-widest shadow-inner transition-all"
          autoFocus
          disabled={isPaused || gameOver}
        />
      </div>
    </div>
  );
}
