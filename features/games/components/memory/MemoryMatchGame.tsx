"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  RotateCcw,
  Volume2,
  VolumeX,
  Timer,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useNotificationStore } from "@/stores/notificationStore";
import { MemoryCard, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface MemoryMatchGameProps {
  pool: any[];
  onBack: () => void;
}

type DifficultyMode = 4 | 6 | 8;

export function MemoryMatchGame({ pool, onBack }: MemoryMatchGameProps) {
  const { addToast } = useNotificationStore();

  const [difficulty, setDifficulty] = useState<DifficultyMode>(6);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [rewards, setRewards] = useState<{ xp: number; coins: number }>({ xp: 0, coins: 0 });

  // Deep review items
  const [reviewItems, setReviewItems] = useState<GameReviewItem[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<any>(null);

  // Initialize pool
  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const toggleAudio = () => {
    const next = gameAudio.toggleMute();
    setIsMuted(next);
  };

  // Build board based on difficulty
  const initGame = useCallback(() => {
    if (!pool || pool.length === 0) return;
    const count = difficulty;
    const selected = [...pool]
      .filter((w) => w.word && w.definitionVn)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const cardPairs: MemoryCard[] = [];
    const reviews: GameReviewItem[] = [];

    selected.forEach((item, idx) => {
      const pairId = String(item.id || item.word || idx);

      // Card 1: English word
      cardPairs.push({
        id: idx * 2,
        text: item.word,
        pairId,
        type: "word",
        phonetic: item.phonetic || item.ipa,
        flipped: false,
        matched: false,
      });

      // Card 2: Vietnamese definition
      cardPairs.push({
        id: idx * 2 + 1,
        text: item.definitionVn,
        pairId,
        type: "definition",
        flipped: false,
        matched: false,
      });

      reviews.push({
        id: pairId,
        word: item.word,
        phonetic: item.phonetic || item.ipa,
        definitionVn: item.definitionVn,
        pos: item.pos,
        example: item.examples?.[0],
        isCorrect: true,
      });
    });

    setCards(cardPairs.sort(() => 0.5 - Math.random()));
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameOver(false);
    setFinalScore(0);
    setElapsedSeconds(0);
    setReviewItems(reviews);
    setRewards({ xp: 0, coins: 0 });
    startTimeRef.current = Date.now();
  }, [pool, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Elapsed timer
  useEffect(() => {
    if (gameOver || cards.length === 0) return;
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver, cards]);

  // Handle Game Over
  useEffect(() => {
    if (gameOver && matchedPairs >= difficulty) {
      // Score calculation: higher difficulty = more points, fewer moves & faster = higher score
      const basePoints = difficulty * 10;
      const movePenalty = Math.max(0, (moves - difficulty) * 2);
      const timeBonus = Math.max(0, Math.round(60 - elapsedSeconds / 2));
      const calculatedScore = Math.max(25, basePoints - movePenalty + timeBonus);

      setFinalScore(calculatedScore);
      gameAudio.playVictoryFanfare();

      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      recordGameSession({
        gameType: "memory",
        score: calculatedScore,
        durationSeconds,
        wordsCompleted: difficulty,
        moves,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn thành Memory Match (${difficulty} cặp) sau ${moves} lượt!`,
          });
        }
      });
    }
  }, [gameOver, matchedPairs, difficulty, moves, elapsedSeconds, addToast]);

  const flipCard = (cardId: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    gameAudio.playFlipSound();

    // If English word card, speak it
    if (card.type === "word") {
      safeSpeakText(card.text, { lang: "en-US", rate: 0.9 });
    }

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c))
    );

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);

      if (first && second && first.pairId === second.pairId) {
        // Matched!
        setTimeout(() => {
          gameAudio.playCorrectDing();
          // Pronounce word if matched
          const wordCard = first.type === "word" ? first : second;
          if (wordCard) {
            safeSpeakText(wordCard.text, { lang: "en-US", rate: 0.9 });
          }

          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, matched: true } : c
            )
          );

          setMatchedPairs((m) => {
            const next = m + 1;
            if (next >= difficulty) {
              setGameOver(true);
            }
            return next;
          });
          setFlippedIds([]);
        }, 350);
      } else {
        // Not matched
        setTimeout(() => {
          gameAudio.playWrongBuzzer();
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, flipped: false } : c
            )
          );
          setFlippedIds([]);
        }, 750);
      }
    }
  };

  if (gameOver) {
    const accuracy = Math.min(100, Math.round(((difficulty * 2) / Math.max(1, moves * 2)) * 100));

    return (
      <GameResultScreen
        title="Trí Nhớ Siêu Việt!"
        subtitle={`Bạn đã liên kết chính xác ${difficulty} cặp từ vựng trong ${moves} lượt lật thẻ và ${elapsedSeconds} giây.`}
        score={finalScore}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={elapsedSeconds}
        maxCombo={difficulty}
        reviewItems={reviewItems}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-2xl mx-auto">
      {/* 1. Top Header Bar */}
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
          {/* Mute button */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </button>

          <Badge variant="primary" size="sm">
            <Layers className="w-3 h-3 mr-1 stroke-[2.2]" />
            {matchedPairs}/{difficulty} cặp
          </Badge>

          <Badge variant="neutral" size="sm">
            {moves} lượt lật
          </Badge>

          <Badge variant="neutral" size="sm">
            <Timer className="w-3 h-3 mr-1 stroke-[2.2]" />
            {elapsedSeconds}s
          </Badge>

          <button
            type="button"
            onClick={initGame}
            title="Làm mới bàn chơi"
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Difficulty Mode Selector Pills */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Chọn cấp độ
        </span>
        <div className="flex items-center gap-1.5">
          {([4, 6, 8] as DifficultyMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setDifficulty(mode);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                difficulty === mode
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {mode === 4 ? "Dễ (4 cặp)" : mode === 6 ? "Vừa (6 cặp)" : "Khó (8 cặp)"}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{
            width: `${(matchedPairs / difficulty) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* 4. 3D Card Grid Container */}
      <div
        className={`grid gap-2.5 sm:gap-3.5 ${
          difficulty === 4
            ? "grid-cols-2 sm:grid-cols-4"
            : difficulty === 6
            ? "grid-cols-3 sm:grid-cols-4"
            : "grid-cols-4 sm:grid-cols-4"
        }`}
      >
        {cards.map((card) => {
          const isFlippedOrMatched = card.flipped || card.matched;

          return (
            <div
              key={card.id}
              className="h-24 sm:h-28 [perspective:1000px] cursor-pointer"
              onClick={() => flipCard(card.id)}
            >
              <motion.div
                animate={{ rotateY: isFlippedOrMatched ? 180 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                {/* BACK FACE (Hidden card) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:shadow-md hover:border-emerald-500/50 flex flex-col items-center justify-center gap-1 [backface-visibility:hidden] transition-all">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 shadow-2xs flex items-center justify-center text-slate-400 dark:text-slate-300 font-black text-sm">
                    XP
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Chạm lật
                  </span>
                </div>

                {/* FRONT FACE (Flipped or Matched Card) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-2.5 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] transition-all shadow-md ${
                    card.matched
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20"
                      : "bg-blue-50 dark:bg-blue-950/50 border-2 border-[#0059bb] dark:border-sky-500 text-[#0059bb] dark:text-sky-300 ring-2 ring-[#0059bb]/20"
                  }`}
                >
                  <div className="absolute top-1.5 left-2">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                        card.type === "word"
                          ? "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {card.type === "word" ? "ENG" : "VIE"}
                    </span>
                  </div>

                  <span className="text-xs sm:text-[13px] font-bold leading-snug line-clamp-3 px-1">
                    {card.text}
                  </span>

                  {card.phonetic && card.type === "word" && (
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {card.phonetic}
                    </span>
                  )}

                  {card.matched && (
                    <div className="absolute bottom-1 right-2">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
