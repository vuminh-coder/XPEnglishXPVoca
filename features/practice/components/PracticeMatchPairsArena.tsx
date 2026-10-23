"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  Volume2,
  RotateCcw,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Zap,
} from "lucide-react";
import { PracticeWord, MatchCardItem } from "../types";
import {
  playSuccessDing,
  playWrongBuzz,
  playTilePop,
  playCompletionFanfare,
} from "@/shared/utils/soundEffects";
import { useAuthStore } from "@/stores/authStore";

interface PracticeMatchPairsArenaProps {
  vocabs: PracticeWord[];
  playWordAudio?: (word: string) => void;
  onNextStage?: () => void;
}

const BATCH_SIZE = 5; // Number of active pairs shown on screen at once

export function PracticeMatchPairsArena({
  vocabs,
  playWordAudio,
  onNextStage,
}: PracticeMatchPairsArenaProps) {
  const awardXp = useAuthStore((s) => s.awardXp);

  // Pool of available vocabularies
  const validVocabs = useMemo(() => {
    return vocabs && vocabs.length >= 4 ? vocabs : [];
  }, [vocabs]);

  // Round tracking
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [matchedVocabIds, setMatchedVocabIds] = useState<Set<string>>(new Set());
  const [selectedEnId, setSelectedEnId] = useState<string | null>(null);
  const [selectedViId, setSelectedViId] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{ enId: string; viId: string } | null>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  // Active batch of 5 words
  const activeBatchVocabs = useMemo(() => {
    if (validVocabs.length === 0) return [];
    const start = currentBatchIndex * BATCH_SIZE;
    const slice = validVocabs.slice(start, start + BATCH_SIZE);
    return slice.length > 0 ? slice : validVocabs.slice(0, BATCH_SIZE);
  }, [validVocabs, currentBatchIndex]);

  // Scrambled English cards
  const enCards: MatchCardItem[] = useMemo(() => {
    return activeBatchVocabs.map((v, i) => ({
      id: `en_${v.id || v.word}_${i}`,
      vocabId: v.id || v.word,
      text: v.word,
      type: "en",
      matched: matchedVocabIds.has(v.id || v.word),
    }));
  }, [activeBatchVocabs, matchedVocabIds]);

  // Deterministically or randomly scrambled Vietnamese cards
  const [shuffledViCards, setShuffledViCards] = useState<MatchCardItem[]>([]);

  useEffect(() => {
    const rawVi: MatchCardItem[] = activeBatchVocabs.map((v, i) => ({
      id: `vi_${v.id || v.word}_${i}`,
      vocabId: v.id || v.word,
      text: v.meaning,
      type: "vi",
      matched: matchedVocabIds.has(v.id || v.word),
    }));
    // Fisher-Yates shuffle
    const shuffled = [...rawVi];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledViCards(shuffled);
  }, [activeBatchVocabs, currentBatchIndex]);

  // Update matched state on shuffledViCards
  const viCardsWithMatched = useMemo(() => {
    return shuffledViCards.map((c) => ({
      ...c,
      matched: matchedVocabIds.has(c.vocabId),
    }));
  }, [shuffledViCards, matchedVocabIds]);

  // Check if current batch is fully matched
  const isBatchCleared = useMemo(() => {
    if (activeBatchVocabs.length === 0) return false;
    return activeBatchVocabs.every((v) => matchedVocabIds.has(v.id || v.word));
  }, [activeBatchVocabs, matchedVocabIds]);

  // Advance to next batch or complete
  useEffect(() => {
    if (isBatchCleared && activeBatchVocabs.length > 0) {
      const totalPossibleBatches = Math.ceil(validVocabs.length / BATCH_SIZE);
      const nextBatch = currentBatchIndex + 1;

      if (nextBatch < totalPossibleBatches && nextBatch * BATCH_SIZE < validVocabs.length) {
        // Move to next set
        const timer = setTimeout(() => {
          playSuccessDing();
          setCurrentBatchIndex(nextBatch);
          setSelectedEnId(null);
          setSelectedViId(null);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        // Full session completed!
        const timer = setTimeout(() => {
          playCompletionFanfare();
          setIsCompleted(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isBatchCleared, currentBatchIndex, validVocabs.length, activeBatchVocabs.length]);

  // Card click handlers
  const handleSelectEnCard = useCallback(
    (card: MatchCardItem) => {
      if (card.matched || wrongPair) return;
      playTilePop();

      // Audio feedback
      if (playWordAudio) {
        playWordAudio(card.text);
      }

      if (selectedEnId === card.id) {
        // Deselect
        setSelectedEnId(null);
        return;
      }

      setSelectedEnId(card.id);

      // If Vietnamese card is already selected, verify match
      if (selectedViId) {
        const viCard = viCardsWithMatched.find((c) => c.id === selectedViId);
        if (viCard) {
          checkMatch(card, viCard);
        }
      }
    },
    [selectedEnId, selectedViId, wrongPair, playWordAudio, viCardsWithMatched]
  );

  const handleSelectViCard = useCallback(
    (card: MatchCardItem) => {
      if (card.matched || wrongPair) return;
      playTilePop();

      if (selectedViId === card.id) {
        // Deselect
        setSelectedViId(null);
        return;
      }

      setSelectedViId(card.id);

      // If English card is already selected, verify match
      if (selectedEnId) {
        const enCard = enCards.find((c) => c.id === selectedEnId);
        if (enCard) {
          checkMatch(enCard, card);
        }
      }
    },
    [selectedEnId, selectedViId, wrongPair, enCards]
  );

  const checkMatch = (enCard: MatchCardItem, viCard: MatchCardItem) => {
    if (enCard.vocabId === viCard.vocabId) {
      // MATCH SUCCESS!
      playSuccessDing();
      setMatchedVocabIds((prev) => new Set(prev).add(enCard.vocabId));
      setSelectedEnId(null);
      setSelectedViId(null);

      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));

      const xpGained = 5 + Math.min(newCombo, 5); // Bonus XP for streak
      setTotalXpEarned((prev) => prev + xpGained);
      awardXp(xpGained);
    } else {
      // MISMATCH!
      playWrongBuzz();
      setWrongPair({ enId: enCard.id, viId: viCard.id });
      setCombo(0);

      setTimeout(() => {
        setWrongPair(null);
        setSelectedEnId(null);
        setSelectedViId(null);
      }, 450);
    }
  };

  const handleRestart = () => {
    setCurrentBatchIndex(0);
    setMatchedVocabIds(new Set());
    setSelectedEnId(null);
    setSelectedViId(null);
    setWrongPair(null);
    setCombo(0);
    setIsCompleted(false);
  };

  const totalTargetCount = Math.min(validVocabs.length, 15);
  const currentMatchedCount = matchedVocabIds.size;
  const progressPercent = Math.min(100, Math.round((currentMatchedCount / (totalTargetCount || 1)) * 100));

  // VICTORY SCREEN
  if (isCompleted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-lg">
            🏆
          </div>
          <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-[#0059bb] text-white text-xs font-black shadow-md flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>+{totalXpEarned} XP</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            Xuất Sắc! Nối Từ Hoàn Tất
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bạn đã phản xạ thành công trọn vẹn <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentMatchedCount} cặp từ vựng</span> song ngữ Anh - Việt.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center">
            <span className="text-xs text-slate-500 font-medium">Chuỗi Combo dài nhất</span>
            <span className="text-xl font-black text-amber-500 flex items-center gap-1 mt-1">
              <Flame className="w-5 h-5 fill-amber-500" />
              <span>{maxCombo}x</span>
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center">
            <span className="text-xs text-slate-500 font-medium">Kinh nghiệm đạt được</span>
            <span className="text-xl font-black text-[#0059bb] dark:text-blue-400 flex items-center gap-1 mt-1">
              <Zap className="w-5 h-5 fill-current" />
              <span>+{totalXpEarned} XP</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-1/2 h-12 rounded-2xl border-2 border-b-4 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện Lại</span>
          </button>

          {onNextStage ? (
            <button
              type="button"
              onClick={onNextStage}
              className="w-full sm:w-1/2 h-12 rounded-2xl border-2 border-b-4 border-emerald-600 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>Chặng Tiếp Theo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-1/2 h-12 rounded-2xl border-2 border-b-4 border-[#004899] bg-[#0059bb] hover:bg-[#004899] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all shadow-md shadow-blue-500/20"
            >
              <span>Tiếp Tục Luyện Tập</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between min-h-0 space-y-3 sm:space-y-4">
      {/* 1. ARENA TOP HUD (DUOLINGO PROGRESS & STREAK COMBO) */}
      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
        {/* Progress Bar */}
        <div className="flex-1 flex items-center gap-2.5 min-w-0">
          <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 tabular-nums shrink-0">
            {currentMatchedCount}/{totalTargetCount}
          </span>
        </div>

        {/* Combo Badge */}
        {combo >= 2 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black flex items-center gap-1 shadow-sm shrink-0"
          >
            <Flame className="w-3.5 h-3.5 fill-white animate-bounce" />
            <span>COMBO x{combo}</span>
          </motion.div>
        )}

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleRestart}
          className="w-8 h-8 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          title="Bắt đầu lại bộ từ này"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 2. MATCHING BOARD: 2 COLUMNS OF DUOLINGO 3D CHUNKY BUTTONS */}
      <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3.5 items-stretch min-h-0 overflow-y-auto pr-0.5">
        {/* CỘT TRÁI: TIẾNG ANH (ENGLISH) */}
        <div className="flex flex-col gap-2 sm:gap-2.5 min-h-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1 flex items-center gap-1">
            <span>Tiếng Anh</span>
            <Volume2 className="w-3 h-3 text-[#0059bb]" />
          </div>

          {enCards.map((card) => {
            const isSelected = selectedEnId === card.id;
            const isMatched = card.matched;
            const isWrong = wrongPair && wrongPair.enId === card.id;

            return (
              <motion.button
                key={card.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectEnCard(card)}
                whileTap={!isMatched ? { y: 2 } : {}}
                animate={
                  isWrong
                    ? { x: [-6, 6, -4, 4, 0] }
                    : isMatched
                    ? { opacity: 0, scale: 0.9, pointerEvents: "none" }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.2 }}
                className={`
                  relative flex-1 min-h-[52px] sm:min-h-[62px] px-3 sm:px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-left flex items-center justify-between cursor-pointer select-none transition-all shadow-xs
                  ${
                    isMatched
                      ? "opacity-0 pointer-events-none scale-90"
                      : isWrong
                      ? "border-2 border-b-4 border-rose-500 border-b-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                      : isSelected
                      ? "border-2 border-b-4 border-[#0059bb] border-b-[#004899] bg-blue-50/90 dark:bg-blue-950/50 text-[#0059bb] dark:text-blue-300 shadow-md ring-2 ring-blue-500/20"
                      : "border-2 border-b-4 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-50/80 active:border-b-2 active:translate-y-0.5"
                  }
                `}
              >
                <span className="truncate pr-1">{card.text}</span>
                <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#0059bb]" : "text-slate-500"}`} />
              </motion.button>
            );
          })}
        </div>

        {/* CỘT PHẢI: NGHĨA TIẾNG VIỆT (VIETNAMESE) */}
        <div className="flex flex-col gap-2 sm:gap-2.5 min-h-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
            <span>Tiếng Việt</span>
          </div>

          {viCardsWithMatched.map((card) => {
            const isSelected = selectedViId === card.id;
            const isMatched = card.matched;
            const isWrong = wrongPair && wrongPair.viId === card.id;

            return (
              <motion.button
                key={card.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectViCard(card)}
                whileTap={!isMatched ? { y: 2 } : {}}
                animate={
                  isWrong
                    ? { x: [-6, 6, -4, 4, 0] }
                    : isMatched
                    ? { opacity: 0, scale: 0.9, pointerEvents: "none" }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.2 }}
                className={`
                  relative flex-1 min-h-[52px] sm:min-h-[62px] px-3 sm:px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-left flex items-center justify-between cursor-pointer select-none transition-all shadow-xs
                  ${
                    isMatched
                      ? "opacity-0 pointer-events-none scale-90"
                      : isWrong
                      ? "border-2 border-b-4 border-rose-500 border-b-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                      : isSelected
                      ? "border-2 border-b-4 border-[#0059bb] border-b-[#004899] bg-blue-50/90 dark:bg-blue-950/50 text-[#0059bb] dark:text-blue-300 shadow-md ring-2 ring-blue-500/20"
                      : "border-2 border-b-4 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-50/80 active:border-b-2 active:translate-y-0.5"
                  }
                `}
              >
                <span className="line-clamp-2 leading-snug">{card.text}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. INSTRUCTION HINT FOOTER */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>💡 Chạm 1 từ tiếng Anh và 1 nghĩa tiếng Việt để ghép cặp.</span>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
          +{5 + Math.min(combo, 5)} XP/cặp
        </span>
      </div>
    </div>
  );
}
