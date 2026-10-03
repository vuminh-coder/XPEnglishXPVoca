"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Timer,
  Flame,
  Check,
  SkipForward,
  Volume2,
  VolumeX,
  HelpCircle,
  Delete,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useNotificationStore } from "@/stores/notificationStore";
import { ScrambleWordPackage, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

function scrambleWord(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === word && word.length > 1 ? scrambleWord(word) : result;
}

interface LetterTile {
  id: number;
  char: string;
  isUsed: boolean;
}

export interface WordScrambleGameProps {
  pool: any[];
  onBack: () => void;
}

const TOTAL_ROUNDS = 8;
const ROUND_TIME = 30;

export function WordScrambleGame({ pool, onBack }: WordScrambleGameProps) {
  const { addToast } = useNotificationStore();

  const [words, setWords] = useState<ScrambleWordPackage[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rewards, setRewards] = useState<{ xp: number; coins: number }>({ xp: 0, coins: 0 });

  // Interactive Tile States
  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  const [placedTiles, setPlacedTiles] = useState<LetterTile[]>([]);

  // Deep review tracker
  const [reviewItems, setReviewItems] = useState<GameReviewItem[]>([]);
  const startTimeRef = useRef<number>(0);

  // Initialize pool
  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
    if (pool && pool.length > 0) {
      const selected = [...pool]
        .filter((w) => w.word && /^[a-zA-Z]+$/.test(w.word.trim()) && w.word.trim().length >= 3)
        .sort(() => 0.5 - Math.random())
        .slice(0, TOTAL_ROUNDS)
        .map((w) => ({
          id: String(w.id || w.word),
          word: w.word.trim().toUpperCase(),
          definitionVn: w.definitionVn || w.definition || "Từ vựng tiếng Anh",
          scrambled: scrambleWord(w.word.trim().toUpperCase()),
          phonetic: w.phonetic || w.ipa,
          pos: w.pos,
          examples: w.examples,
        }));
      setWords(selected);
      startTimeRef.current = Date.now();
    }
  }, [pool]);

  // Set up current word tiles
  const setupWordTiles = useCallback((wordPkg?: ScrambleWordPackage) => {
    if (!wordPkg) return;
    const tiles: LetterTile[] = wordPkg.scrambled.split("").map((ch, idx) => ({
      id: idx,
      char: ch,
      isUsed: false,
    }));
    setAvailableTiles(tiles);
    setPlacedTiles([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (words[current]) {
      setupWordTiles(words[current]);
    }
  }, [current, words, setupWordTiles]);

  // Handle Mute toggle
  const toggleAudio = () => {
    const next = gameAudio.toggleMute();
    setIsMuted(next);
  };

  // Sound and speech effects
  const speakCurrentWord = (wordStr: string) => {
    safeSpeakText(wordStr, { lang: "en-US", rate: 0.9 });
  };

  // Place a tile from available to placed
  const handleTileClick = (tile: LetterTile) => {
    if (feedback !== null || tile.isUsed) return;
    triggerHaptic("tap");
    gameAudio.playTap();

    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isUsed: true } : t))
    );
    setPlacedTiles((prev) => [...prev, tile]);
  };

  // Remove a placed tile back to available
  const handleRemovePlacedTile = (tile: LetterTile, index: number) => {
    if (feedback !== null) return;
    triggerHaptic("tap");
    gameAudio.playTap();

    setPlacedTiles((prev) => prev.filter((_, i) => i !== index));
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isUsed: false } : t))
    );
  };

  // Clear all placed tiles
  const handleClearAll = () => {
    if (feedback !== null) return;
    triggerHaptic("tap");
    gameAudio.playTap();
    setAvailableTiles((prev) => prev.map((t) => ({ ...t, isUsed: false })));
    setPlacedTiles([]);
  };

  // Backspace last placed tile
  const handleBackspace = () => {
    if (feedback !== null || placedTiles.length === 0) return;
    triggerHaptic("tap");
    gameAudio.playTap();
    const last = placedTiles[placedTiles.length - 1];
    setPlacedTiles((prev) => prev.slice(0, -1));
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === last.id ? { ...t, isUsed: false } : t))
    );
  };

  // Hint: Place the first correct letter
  const handleUseHint = () => {
    const currentWord = words[current];
    if (!currentWord || feedback !== null) return;

    const firstChar = currentWord.word[0];
    // Find unplaced tile matching firstChar
    const match = availableTiles.find((t) => !t.isUsed && t.char === firstChar);
    if (match) {
      triggerHaptic("tap");
    gameAudio.playTap();
      setAvailableTiles((prev) =>
        prev.map((t) => (t.id === match.id ? { ...t, isUsed: true } : t))
      );
      setPlacedTiles((prev) => [match, ...prev.filter((t) => t.id !== match.id)]);
      setScore((s) => Math.max(0, s - 2));
    }
  };

  // Submit Answer
  const handleSubmit = useCallback(() => {
    const currentWord = words[current];
    if (!currentWord || feedback !== null) return;

    const currentAttempt = placedTiles.map((t) => t.char).join("");
    const isCorrect = currentAttempt === currentWord.word;

    // Record review item
    const reviewItem: GameReviewItem = {
      id: currentWord.id,
      word: currentWord.word,
      phonetic: currentWord.phonetic,
      pos: currentWord.pos,
      definitionVn: currentWord.definitionVn,
      example: currentWord.examples?.[0],
      isCorrect,
      userAnswer: currentAttempt,
      correctAnswer: currentWord.word,
    };
    setReviewItems((prev) => [...prev, reviewItem]);

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));

      const comboMultiplier = nextCombo >= 3 ? 2.5 : nextCombo >= 2 ? 1.5 : 1;
      const points = Math.round(10 * comboMultiplier);
      setScore((s) => s + points);

      triggerHaptic("success");
      gameAudio.playComboStreak(nextCombo);
      speakCurrentWord(currentWord.word);
      setFeedback("correct");
    } else {
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setCombo(0);
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (current < words.length - 1) {
        setCurrent((c) => c + 1);
        setTimeLeft(ROUND_TIME);
      } else {
        setGameOver(true);
      }
    }, 1100);
  }, [current, words, feedback, placedTiles, combo]);

  // Skip word
  const handleSkip = useCallback(() => {
    const currentWord = words[current];
    if (!currentWord) return;

    triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
    setCombo(0);

    const reviewItem: GameReviewItem = {
      id: currentWord.id,
      word: currentWord.word,
      phonetic: currentWord.phonetic,
      pos: currentWord.pos,
      definitionVn: currentWord.definitionVn,
      example: currentWord.examples?.[0],
      isCorrect: false,
      userAnswer: "Bỏ qua",
      correctAnswer: currentWord.word,
    };
    setReviewItems((prev) => [...prev, reviewItem]);

    if (current < words.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(ROUND_TIME);
    } else {
      setGameOver(true);
    }
  }, [current, words]);

  // Timer countdown
  useEffect(() => {
    if (gameOver || words.length === 0 || feedback !== null) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 5 && t > 1) {
          gameAudio.playTimerUrgent();
        }
        if (t <= 1) {
          handleSkip();
          return ROUND_TIME;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, words, feedback, handleSkip]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback !== null || gameOver) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();
      if (key === "ENTER") {
        e.preventDefault();
        handleSubmit();
      } else if (key === "BACKSPACE") {
        e.preventDefault();
        handleBackspace();
      } else if (/^[A-Z]$/.test(key)) {
        // Find unused tile matching key
        const tile = availableTiles.find((t) => !t.isUsed && t.char === key);
        if (tile) {
          handleTileClick(tile);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [availableTiles, feedback, gameOver, handleSubmit]);

  // End of game synchronization
  useEffect(() => {
    if (gameOver) {
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      const correctCount = reviewItems.filter((i) => i.isCorrect).length;

      recordGameSession({
        gameType: "scramble",
        score,
        durationSeconds,
        wordsCompleted: correctCount,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn thành xuất sắc Word Scramble với ${score} điểm!`,
          });
        }
      });
    }
  }, [gameOver, score, addToast, reviewItems]);

  const handleRestart = () => {
    if (!pool || pool.length === 0) return;
    const selected = [...pool]
      .filter((w) => w.word && /^[a-zA-Z]+$/.test(w.word.trim()) && w.word.trim().length >= 3)
      .sort(() => 0.5 - Math.random())
      .slice(0, TOTAL_ROUNDS)
      .map((w) => ({
        id: String(w.id || w.word),
        word: w.word.trim().toUpperCase(),
        definitionVn: w.definitionVn || w.definition || "Từ vựng tiếng Anh",
        scrambled: scrambleWord(w.word.trim().toUpperCase()),
        phonetic: w.phonetic || w.ipa,
        pos: w.pos,
        examples: w.examples,
      }));

    setWords(selected);
    setCurrent(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(ROUND_TIME);
    setFeedback(null);
    setGameOver(false);
    setReviewItems([]);
    setRewards({ xp: 0, coins: 0 });
    startTimeRef.current = Date.now();
  };

  if (gameOver) {
    const correctCount = reviewItems.filter((i) => i.isCorrect).length;
    const acc = words.length > 0 ? Math.round((correctCount / words.length) * 100) : 100;
    const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    return (
      <GameResultScreen
        title="Word Scramble Hoàn Tất!"
        subtitle={`Bạn đã giải mã chính xác ${correctCount}/${words.length} từ vựng với tốc độ ấn tượng.`}
        score={score}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={acc}
        durationSeconds={duration}
        maxCombo={maxCombo}
        reviewItems={reviewItems}
        onBack={onBack}
        onRestart={handleRestart}
      />
    );
  }

  const currentWord = words[current];
  const placedText = placedTiles.map((t) => t.char).join("");

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-2xl mx-auto">
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between">
        

        <div className="flex items-center gap-2">
          {/* Mute toggle button */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" />
            )}
          </button>

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

      {/* 2. Progress Bar */}
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

      {/* 3. Main Interactive Card */}
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
              className={`p-6 sm:p-8 rounded-3xl text-center space-y-6 bg-white dark:bg-slate-900 border transition-all shadow-md ${
                feedback === "correct"
                  ? "border-emerald-500 ring-4 ring-emerald-500/15"
                  : feedback === "wrong"
                  ? "border-rose-500 ring-4 ring-rose-500/15"
                  : "border-slate-200/90 dark:border-slate-800"
              }`}
            >
              {/* Question Index & Hint Button */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Từ {current + 1} / {words.length}
                </span>

                <button
                  type="button"
                  onClick={handleUseHint}
                  title="Gợi ý chữ cái đầu (-2 điểm)"
                  className="py-1 px-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-[11px] font-bold min-h-[44px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                >
                  <HelpCircle className="w-3 h-3 stroke-[2.2]" />
                  <span>Gợi ý (-2đ)</span>
                </button>
              </div>

              {/* Definition & Phonetics */}
              <div className="space-y-1 max-w-md mx-auto">
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-snug">
                  {currentWord.definitionVn}
                </p>
                {currentWord.pos && (
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {currentWord.pos}
                  </span>
                )}
              </div>

              {/* Placed Word Answer Slot (Tap-to-Remove) */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Từ bạn đang ghép
                </div>
                <div className="flex flex-wrap justify-center gap-2 min-h-[52px] p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                  {placedTiles.length === 0 ? (
                    <span className="text-xs font-semibold text-slate-400 self-center">
                      Chạm vào các ký tự bên dưới hoặc gõ phím để ghép
                    </span>
                  ) : (
                    placedTiles.map((tile, idx) => (
                      <motion.button
                        key={`placed-${tile.id}-${idx}`}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleRemovePlacedTile(tile, idx)}
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#0059bb] dark:border-sky-500 text-[#0059bb] dark:text-sky-300 flex items-center justify-center text-lg sm:text-xl font-black font-display shadow-md cursor-pointer hover:bg-rose-50 hover:border-rose-400 transition-colors"
                        title="Chạm để gỡ ký tự này"
                      >
                        {tile.char}
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              {/* Scrambled Available Letters (Tap-to-Place) */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Các chữ cái gợi ý
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                  {availableTiles.map((tile) => (
                    <motion.button
                      key={`avail-${tile.id}`}
                      whileTap={{ scale: tile.isUsed ? 1 : 0.92 }}
                      onClick={() => handleTileClick(tile)}
                      disabled={tile.isUsed}
                      className={`h-11 w-11 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black font-display transition-all duration-150 shadow-2xs ${
                        tile.isUsed
                          ? "bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-300 dark:text-slate-600 opacity-40 cursor-default"
                          : "bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 hover:bg-blue-100 cursor-pointer shadow-md shadow-blue-500/10 active:scale-95"
                      }`}
                    >
                      {tile.char}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feedback Success Popup */}
              {feedback === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center space-y-1"
                >
                  <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5 font-display">
                    <span>Chính xác: {currentWord.word}</span>
                    <button
                      type="button"
                      onClick={() => speakCurrentWord(currentWord.word)}
                      title="Nghe phát âm"
                      className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-emerald-200/60 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {currentWord.phonetic && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                      {currentWord.phonetic}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleBackspace}
                  disabled={placedTiles.length === 0}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  title="Xóa ký tự cuối"
                >
                  <Delete className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Xóa chữ</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={placedTiles.length === 0}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  title="Xếp lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Làm lại</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                >
                  <SkipForward className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Bỏ qua</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={placedTiles.length === 0}
                  className="py-2.5 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  <span>Kiểm tra</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
