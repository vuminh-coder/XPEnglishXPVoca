"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, RotateCcw } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { MemoryCard } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

export interface MemoryMatchGameProps {
  pool: any[];
  onBack: () => void;
}

const TOTAL_PAIRS = 6;

export function MemoryMatchGame({ pool, onBack }: MemoryMatchGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const initGame = useCallback(() => {
    if (!pool || pool.length === 0) return;
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, TOTAL_PAIRS);
    const cardPairs: MemoryCard[] = [];

    selected.forEach((item, idx) => {
      const pairId = String(item.id || item.word || idx);
      cardPairs.push({
        id: idx * 2,
        text: item.word,
        pairId,
        flipped: false,
        matched: false,
      });
      cardPairs.push({
        id: idx * 2 + 1,
        text: item.definitionVn,
        pairId,
        flipped: false,
        matched: false,
      });
    });

    setCards(cardPairs.sort(() => 0.5 - Math.random()));
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameOver(false);
    setFinalScore(0);
  }, [pool]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle Game Over
  useEffect(() => {
    if (gameOver && matchedPairs >= TOTAL_PAIRS) {
      const calculatedScore = Math.max(20, 60 - moves * 2);
      setFinalScore(calculatedScore);
      gameAudio.playVictoryFanfare();

      awardXp(calculatedScore);
      awardCoins?.(5);

      // Persist to Neon Postgres DB via API
      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "memory",
          score: calculatedScore,
          xpGained: calculatedScore,
          coinsGained: 5,
          moves,
        }),
      }).catch((err) => console.warn("Failed to save memory match to DB:", err));

      addToast({
        type: "xp",
        title: `+${calculatedScore} XP & +5 Vàng!`,
        message: `Hoàn thành Memory Match trong ${moves} lượt lật!`,
      });
    }
  }, [gameOver, matchedPairs, moves, awardXp, awardCoins, addToast]);

  const flipCard = (cardId: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    gameAudio.playFlipSound();

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
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, matched: true } : c
            )
          );
          setMatchedPairs((m) => {
            const next = m + 1;
            if (next >= TOTAL_PAIRS) {
              setGameOver(true);
            }
            return next;
          });
          setFlippedIds([]);
        }, 400);
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
    return (
      <GameResultScreen
        title="Trí Nhớ Đỉnh Cao!"
        subtitle={`Bạn đã ghép trọn vẹn ${TOTAL_PAIRS} cặp từ vựng trong ${moves} lượt lật thẻ.`}
        score={finalScore || Math.max(20, 60 - moves * 2)}
        xpEarned={finalScore || Math.max(20, 60 - moves * 2)}
        coinsEarned={5}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
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
            <Layers className="w-3 h-3 mr-1 stroke-[2.2]" />
            {matchedPairs}/{TOTAL_PAIRS} cặp
          </Badge>

          <Badge variant="neutral" size="sm">
            {moves} lượt lật
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

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{
            width: `${(matchedPairs / TOTAL_PAIRS) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        {cards.map((card) => {
          const isFlippedOrMatched = card.flipped || card.matched;

          return (
            <motion.button
              key={card.id}
              whileTap={{ scale: isFlippedOrMatched ? 1 : 0.96 }}
              onClick={() => flipCard(card.id)}
              disabled={isFlippedOrMatched}
              className={`h-22 sm:h-28 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 border leading-snug p-2.5 flex items-center justify-center text-center cursor-pointer select-none ${
                card.matched
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 scale-95 shadow-2xs"
                  : card.flipped
                  ? "bg-blue-50 dark:bg-blue-950/50 border-[#0059bb] dark:border-sky-500 text-[#0059bb] dark:text-sky-300 shadow-md shadow-blue-500/10 ring-2 ring-[#0059bb]/20"
                  : "bg-white dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700 hover:border-[#0059bb]/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 shadow-2xs"
              }`}
            >
              {isFlippedOrMatched ? (
                <span className="break-words line-clamp-3 font-semibold">
                  {card.text}
                </span>
              ) : (
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold text-sm">
                  ?
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
