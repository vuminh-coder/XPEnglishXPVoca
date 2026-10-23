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
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface MemoryMatchGameProps {
  pool: any[];
  onBack: () => void;
  backLabel?: string;
}

type DifficultyMode = 4 | 6 | 8;

export function MemoryMatchGame({ pool, onBack, backLabel }: MemoryMatchGameProps) {
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
      triggerHaptic("victory");
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
            title: `+${res.xpGained} XP & +${res.coinsGained} VÃ ng!`,
            message: `HoÃ n thÃ nh Memory Match (${difficulty} cáº·p) sau ${moves} lÆ°á»£t!`,
          });
        }
      });
    }
  }, [gameOver, matchedPairs, difficulty, moves, elapsedSeconds, addToast]);

  const flipCard = (cardId: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    triggerHaptic("tap");
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
          triggerHaptic("success");
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
          triggerHaptic("warning");
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
        title="TrÃ­ Nhá»› SiÃªu Viá»‡t!"
        subtitle={`Báº¡n Ä‘Ã£ liÃªn káº¿t chÃ­nh xÃ¡c ${difficulty} cáº·p tá»« vá»±ng trong ${moves} lÆ°á»£t láº­t tháº» vÃ  ${elapsedSeconds} giÃ¢y.`}
        score={finalScore}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={elapsedSeconds}
        maxCombo={difficulty}
        reviewItems={reviewItems}
        backLabel={backLabel}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  const progressPct = difficulty ? (matchedPairs / difficulty) * 100 : 0;

  const circleBtn =
    "w-11 h-11 shrink-0 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2";

  return (
    <div className="select-none w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-5">
      {/* 1. Top bar: Mute + chunky progress + moves/time + restart */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleAudio}
          title={isMuted ? "Báº­t Ã¢m thanh" : "Táº¯t Ã¢m thanh"}
          className={circleBtn}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
          )}
        </button>

        <div className="relative flex-1 h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <div className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/35" />
          </motion.div>
        </div>

        <div className="shrink-0 h-11 px-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 border-2 border-b-4 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-black font-display text-sm tabular-nums">
          <Layers className="w-4 h-4" />
          {matchedPairs}/{difficulty}
        </div>

        <button
          type="button"
          onClick={initGame}
          title="LÃ m má»›i bÃ n chÆ¡i"
          className={circleBtn}
        >
          <RotateCcw className="w-4 h-4 text-slate-500 stroke-[2.4]" />
        </button>
      </div>

      {/* 2. Heading + stats */}
      <div className="flex items-center justify-between gap-2 px-1">
        <h2 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
          Cháº¡m cÃ¡c cáº·p tá»« trÃ¹ng nghÄ©a
        </h2>
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black font-display uppercase tracking-wider text-slate-400 tabular-nums">
          <span>{moves} lÆ°á»£t</span>
          <span className="inline-flex items-center gap-1">
            <Timer className="w-3.5 h-3.5" />
            {elapsedSeconds}s
          </span>
        </div>
      </div>

      {/* 3. Difficulty: segmented 3D buttons (hiá»ƒn thá»‹ trá»±c tiáº¿p 3 lá»±a chá»n) */}
      <div className="grid grid-cols-3 gap-2.5">
        {([4, 6, 8] as DifficultyMode[]).map((mode) => {
          const active = difficulty === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setDifficulty(mode)}
              className={`h-11 rounded-xl border-2 border-b-4 text-xs sm:text-sm font-black font-display uppercase tracking-wide cursor-pointer transition-all active:translate-y-[2px] active:border-b-2 ${
                active
                  ? "bg-[#0059bb] border-[#003d82] text-white shadow-md shadow-[#0059bb]/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {mode === 4 ? "Dá»… Â· 4 cáº·p" : mode === 6 ? "Vá»«a Â· 6 cáº·p" : "KhÃ³ Â· 8 cáº·p"}
            </button>
          );
        })}
      </div>

      {/* 4. 3D card grid */}
      <div
        className={`grid gap-2.5 sm:gap-3 ${
          difficulty === 4
            ? "grid-cols-2 sm:grid-cols-4"
            : difficulty === 6
            ? "grid-cols-3 sm:grid-cols-4"
            : "grid-cols-4"
        }`}
      >
        {cards.map((card, index) => {
          const isFlippedOrMatched = card.flipped || card.matched;

          return (
            <div
              key={card.id}
              className="h-24 sm:h-28 [perspective:1000px] cursor-pointer"
              onClick={() => flipCard(card.id)}
              tabIndex={0}
              role="button"
              aria-label={`Tháº» sá»‘ ${index + 1}${isFlippedOrMatched ? ": " + card.text : ": Äang Ãºp"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  flipCard(card.id);
                }
              }}
            >
              <motion.div
                animate={{ rotateY: isFlippedOrMatched ? 180 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                {/* BACK FACE (Ãºp): 3D tile mÃ u thÆ°Æ¡ng hiá»‡u */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#0059bb] hover:bg-blue-600 border-b-[6px] border-[#003d82] shadow-md shadow-[#0059bb]/20 flex flex-col items-center justify-center [backface-visibility:hidden] transition-colors active:translate-y-[3px] active:border-b-[3px]">
                  <div className="absolute inset-x-3 top-1.5 h-5 bg-white/20 rounded-t-full pointer-events-none" />
                  <span className="relative text-2xl sm:text-3xl font-black font-display text-white/90">
                    XP
                  </span>
                </div>

                {/* FRONT FACE (Ä‘Ã£ láº­t / Ä‘Ã£ khá»›p) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-2.5 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-b-[6px] ${
                    card.matched
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  }`}
                >
                  <span
                    className={`absolute top-1.5 left-2 px-1.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      card.type === "word"
                        ? "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-300"
                        : "bg-amber-400/20 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {card.type === "word" ? "EN" : "VI"}
                  </span>

                  <span className="text-sm sm:text-base font-black font-display leading-snug line-clamp-3 px-1">
                    {card.text}
                  </span>

                  {card.phonetic && card.type === "word" && (
                    <span className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">
                      {card.phonetic}
                    </span>
                  )}

                  {card.matched && (
                    <Sparkles className="absolute bottom-1.5 right-2 w-3.5 h-3.5 text-emerald-500" />
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
