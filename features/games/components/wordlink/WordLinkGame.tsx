"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Volume2, VolumeX, RotateCcw, X, Turtle } from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import {
  syncRoadmapSessionProgress,
  saveStageMatchedVocab,
  getStageMatchedVocab,
} from "@/features/roadmap";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { XP_CHARACTERS } from "../../data/characterRoster";

export interface WordLinkGameProps {
  pool: any[];
  onBack: () => void;
  backLabel?: string;
  themeId?: string;
  unitNumber?: number;
  currentPart?: number;
  totalParts?: number;
  onNextPart?: () => void;
}

const PAIR_COUNT = 4;

interface LinkItem {
  pairId: string;
  vocabId?: string;
  word: string;
  meaning: string;
  phonetic?: string;
  review: GameReviewItem;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Extracts a concise single-concept Vietnamese word/meaning (1-3 syllables),
 * stripping parenthetical notes and secondary clauses after commas/slashes/exclamations.
 * Example: "xin lỗi, tôi rất tiếc" -> "Xin lỗi"
 * Example: "cạn ly! / cảm ơn nhé / tạm biệt nhé" -> "Cạn ly"
 */
export function extractConciseMeaning(text: string): string {
  if (!text) return "";
  const withoutParens = text.replace(/\s*\([^)]*\)/g, "").trim();
  if (!withoutParens) return "";

  const segments = withoutParens
    .split(/[,;/?!—–]+|\s+-\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let primary = segments[0] || withoutParens;
  // Strip trailing conversational filler particles on multi-word segments
  const words = primary.split(/\s+/);
  if (words.length >= 2) {
    primary = primary.replace(/\s+(nhé|nha|ạ|rồi)$/i, "").trim();
  }

  return primary.charAt(0).toUpperCase() + primary.slice(1);
}

/**
 * Checks if a vocabulary entry is a pure single English word (not a clause or multi-word sentence)
 */
export function isPureSingleWordItem(item: any): boolean {
  if (!item?.word || typeof item.word !== "string") return false;
  const w = item.word.trim();
  if (!w || w.includes(" ") || w.includes("'") || w.includes("’")) return false;
  if (item.pos && String(item.pos).toLowerCase() === "phrase") return false;
  return true;
}

export function WordLinkGame({
  pool,
  onBack,
  backLabel,
  themeId,
  unitNumber,
  currentPart,
  totalParts,
  onNextPart,
}: WordLinkGameProps) {
  const { addToast } = useNotificationStore();

  const pairCount = PAIR_COUNT;
  const [items, setItems] = useState<LinkItem[]>([]);
  const [leftOrder, setLeftOrder] = useState<string[]>([]);
  const [rightOrder, setRightOrder] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [linked, setLinked] = useState<string[]>([]);
  const [justMatchedId, setJustMatchedId] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [mistakeIds, setMistakeIds] = useState<Set<string>>(new Set());
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [comboAlert, setComboAlert] = useState<"X3" | "X4" | "X5" | null>(null);
  const [characterIdx, setCharacterIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalDurationSeconds, setFinalDurationSeconds] = useState(1);
  const [rewards, setRewards] = useState({ xp: 0, coins: 0 });
  const startRef = useRef(0);

  useEffect(() => {
    if (!comboAlert) return;
    const t = setTimeout(() => {
      setComboAlert(null);
    }, 1500);
    return () => clearTimeout(t);
  }, [comboAlert]);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const initGame = useCallback(() => {
    if (!pool || pool.length === 0) return;

    const validPool = pool.filter((w) => w.word && w.definitionVn);
    const bridged = getStageMatchedVocab({
      themeId,
      unitNumber,
      part: currentPart || 1,
    });
    const mistakePrioritySet = new Set(bridged.mistakeIds || []);
    const practicedPrioritySet = new Set(bridged.priorityVocabIds || []);

    // Strictly prioritize single words (1 word, no spaces/contractions/clauses)
    // Within single words, prioritize weak words (mistakeIds) from Stage 1 first!
    const allSingleWords = validPool.filter(isPureSingleWordItem);
    const mistakeSingleWords = shuffle(
      allSingleWords.filter((w) => w.id && mistakePrioritySet.has(w.id))
    );
    const practicedSingleWords = shuffle(
      allSingleWords.filter(
        (w) => w.id && !mistakePrioritySet.has(w.id) && practicedPrioritySet.has(w.id)
      )
    );
    const remainingSingleWords = shuffle(
      allSingleWords.filter(
        (w) => !w.id || (!mistakePrioritySet.has(w.id) && !practicedPrioritySet.has(w.id))
      )
    );

    const twoWordFallbackCandidates = shuffle(
      validPool.filter(
        (w) =>
          !isPureSingleWordItem(w) &&
          w.word.trim().split(/\s+/).length <= 2 &&
          !w.word.includes("'") &&
          !w.word.includes("’")
      )
    );
    const orderedCandidates = [
      ...mistakeSingleWords,
      ...practicedSingleWords,
      ...remainingSingleWords,
      ...twoWordFallbackCandidates,
    ];

    const picked: any[] = [];
    const seenMeaningRoots = new Set<string>();
    const seenExactMeanings = new Set<string>();

    const getMeaningRoots = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[,/;\-.]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 3);
    };

    for (const w of orderedCandidates) {
      const cleanVn = extractConciseMeaning(w.definitionVn);
      const lowerVn = cleanVn.toLowerCase();
      if (seenExactMeanings.has(lowerVn)) continue;

      const roots = getMeaningRoots(cleanVn);
      const hasRootOverlap = roots.some((r) => seenMeaningRoots.has(r));
      if (!hasRootOverlap || roots.length === 0) {
        roots.forEach((r) => seenMeaningRoots.add(r));
        seenExactMeanings.add(lowerVn);
        picked.push(w);
      }

      if (picked.length >= pairCount) break;
    }

    // Fallback: fill remaining from orderedCandidates if strict root filter had fewer than pairCount
    if (picked.length < pairCount) {
      for (const w of orderedCandidates) {
        const cleanVn = extractConciseMeaning(w.definitionVn).toLowerCase();
        if (
          !seenExactMeanings.has(cleanVn) &&
          !picked.some((p) => p.id === w.id || p.word.toLowerCase() === w.word.toLowerCase())
        ) {
          seenExactMeanings.add(cleanVn);
          picked.push(w);
          if (picked.length >= pairCount) break;
        }
      }
    }

    const next: LinkItem[] = picked.map((w, i) => {
      const cleanVn = extractConciseMeaning(w.definitionVn) || w.definitionVn;
      return {
        pairId: `p${i}`,
        vocabId: w.id,
        word: w.word,
        meaning: cleanVn,
        phonetic: w.phonetic,
        review: {
          id: w.id,
          word: w.word,
          phonetic: w.phonetic,
          definitionVn: cleanVn,
          pos: w.pos,
          example: w.examples?.[0],
          isCorrect: true,
        },
      };
    });

    // Save the selected words into the Roadmap Vocab Bridge immediately so Stage 3 (Sentence Builder)
    // is guaranteed to build sentences using these exact words while preserving Stage 1 mistakes!
    saveStageMatchedVocab({
      themeId,
      unitNumber,
      part: currentPart || 1,
      matchedIds: next.map((n) => n.vocabId || "").filter(Boolean),
      matchedWords: next.map((n) => n.word),
      mistakeIds: [],
      mergeExistingMistakes: true,
    });

    setItems(next);
    setLeftOrder(shuffle(next.map((n) => n.pairId)));
    setRightOrder(shuffle(next.map((n) => n.pairId)));
    setSelectedLeft(null);
    setSelectedRight(null);
    setLinked([]);
    setJustMatchedId(null);
    setWrongPair(null);
    setMistakes(0);
    setMistakeIds(new Set());
    setCombo(0);
    setMaxCombo(0);
    setComboAlert(null);
    setCharacterIdx((idx) => (idx + 1) % XP_CHARACTERS.length);
    setGameOver(false);
    setFinalScore(0);
    setFinalDurationSeconds(1);
    setRewards({ xp: 0, coins: 0 });
    startRef.current = Date.now();
  }, [pool, pairCount, themeId, unitNumber, currentPart]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const finish = useCallback(
    (mistakeCount: number) => {
      const durationSeconds = Math.max(1, Math.round((Date.now() - startRef.current) / 1000));
      const base = pairCount * 12;
      const score = Math.max(20, base - mistakeCount * 4 + Math.max(0, Math.round(40 - durationSeconds / 2)));
      setFinalDurationSeconds(durationSeconds);
      setFinalScore(score);
      setRewards({ xp: 30, coins: 15 });
      setGameOver(true);
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();

      // Update Roadmap Vocab Bridge with mistake vocab IDs prioritized first for Stage 3 Sentence Builder
      const mistakeVocabIds: string[] = [];
      items.forEach((item) => {
        const isMistake = mistakeIds.has(item.pairId);
        if (isMistake && item.vocabId) {
          mistakeVocabIds.push(item.vocabId);
        }
        if (item.review.id) {
          useVocabularyStore.getState().practiceWord(item.review.id, !isMistake);
        }
      });

      saveStageMatchedVocab({
        themeId,
        unitNumber,
        part: currentPart || 1,
        matchedIds: items.map((n) => n.vocabId || "").filter(Boolean),
        matchedWords: items.map((n) => n.word),
        mistakeIds: mistakeVocabIds,
        mergeExistingMistakes: true,
      });

      recordGameSession({
        gameType: "wordlink",
        score,
        durationSeconds,
        wordsCompleted: pairCount,
        attempts: pairCount + mistakeCount,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn thành Nối Từ (${pairCount} cặp) với ${mistakeCount} lần nối sai!`,
          });
        }
      });

      // Automatically synchronize session progress with the Roadmap S-Curve pathway
      syncRoadmapSessionProgress({
        themeId,
        unitNumber,
        skillType: "MATCH",
        completedPart: currentPart || 1,
        totalParts: totalParts || 2,
      });
    },
    [pairCount, addToast, themeId, unitNumber, currentPart, totalParts, items, mistakeIds]
  );

  const evaluatePair = useCallback(
    (leftId: string, rightId: string) => {
      if (leftId === rightId) {
        triggerHaptic("success");
        gameAudio.playCorrectDing();
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          if (next === 3) {
            setComboAlert("X3");
            gameAudio.playComboStreak(3);
            triggerHaptic("victory");
          } else if (next === 4) {
            setComboAlert("X4");
            gameAudio.playComboStreak(5);
            triggerHaptic("victory");
          }
          return next;
        });
        const nextLinked = [...linked, leftId];
        setLinked(nextLinked);
        setJustMatchedId(leftId);
        setSelectedLeft(null);
        setSelectedRight(null);

        setTimeout(() => {
          setJustMatchedId((curr) => (curr === leftId ? null : curr));
        }, 360);

        if (nextLinked.length >= items.length) {
          setTimeout(() => {
            finish(mistakes);
          }, 950);
        }
      } else {
        triggerHaptic("warning");
        gameAudio.playWrongBuzzer();
        setCombo(0);
        setComboAlert(null);
        setMistakes((m) => m + 1);
        setMistakeIds((prev) => new Set(prev).add(leftId));
        setWrongPair({ left: leftId, right: rightId });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 550);
      }
    },
    [linked, items.length, finish, mistakes]
  );

  const pickLeft = useCallback(
    (pairId: string) => {
      if (linked.includes(pairId) || wrongPair) return;
      triggerHaptic("tap");
      gameAudio.playFlipSound();
      const item = items.find((i) => i.pairId === pairId);
      if (item) safeSpeakText(item.word, { lang: "en-US", rate: 0.9 });

      if (selectedRight) {
        evaluatePair(pairId, selectedRight);
      } else {
        setSelectedLeft((prev) => (prev === pairId ? null : pairId));
      }
    },
    [linked, wrongPair, items, selectedRight, evaluatePair]
  );

  const pickRight = useCallback(
    (pairId: string) => {
      if (linked.includes(pairId) || wrongPair) return;
      triggerHaptic("tap");
      gameAudio.playFlipSound();

      if (selectedLeft) {
        evaluatePair(selectedLeft, pairId);
      } else {
        setSelectedRight((prev) => (prev === pairId ? null : pairId));
      }
    },
    [linked, wrongPair, selectedLeft, evaluatePair]
  );

  const toggleAudio = () => setIsMuted(gameAudio.toggleMute());

  const progressPct = items.length ? (linked.length / items.length) * 100 : 0;
  const byId = (id: string) => items.find((i) => i.pairId === id);

  const activeCharacter = XP_CHARACTERS[characterIdx] || XP_CHARACTERS[0];

  const speechText = useMemo(() => {
    if (wrongPair) {
      return "Chưa đúng rồi, thử lại nhé!";
    }
    if (selectedLeft) {
      const it = items.find((i) => i.pairId === selectedLeft);
      if (it?.word) {
        return `Chọn nghĩa tiếng Việt của "${it.word}"`;
      }
    }
    if (selectedRight) {
      const it = items.find((i) => i.pairId === selectedRight);
      if (it?.meaning) {
        return `Chọn từ tiếng Anh cho "${it.meaning}"`;
      }
    }
    return "Nối nhanh các cặp từ nhé!";
  }, [wrongPair, selectedLeft, selectedRight, items]);

  const speechWords = useMemo(() => speechText.split(/\s+/), [speechText]);

  const speakCurrent = useCallback(
    (rate: number = 0.9) => {
      const targetItem = selectedLeft
        ? items.find((i) => i.pairId === selectedLeft)
        : items.find((i) => !linked.includes(i.pairId));
      if (targetItem?.word) {
        safeSpeakText(targetItem.word, { lang: "en-US", rate });
      }
    },
    [selectedLeft, items, linked]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        speakCurrent(0.9);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        speakCurrent(0.65);
      } else if (e.key >= "1" && e.key <= "4") {
        const idx = parseInt(e.key, 10) - 1;
        if (leftOrder[idx]) {
          e.preventDefault();
          pickLeft(leftOrder[idx]);
        }
      } else if (e.key >= "5" && e.key <= "8") {
        const idx = parseInt(e.key, 10) - 5;
        if (rightOrder[idx]) {
          e.preventDefault();
          pickRight(rightOrder[idx]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [speakCurrent, leftOrder, rightOrder, pickLeft, pickRight]);

  const tileClass = (state: "idle" | "selected" | "matched" | "linked" | "wrong") => {
    const base =
      "group relative w-full h-14 sm:h-[60px] px-3.5 sm:px-5 rounded-2xl border-2 text-center flex items-center justify-center transition-all duration-150 select-none ";

    switch (state) {
      case "matched":
        return (
          base +
          "border-b-4 border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 scale-[1.02] shadow-sm cursor-default"
        );
      case "linked":
        return (
          base +
          "border-b-2 border-slate-200/70 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/40 text-slate-300 dark:text-slate-600 cursor-default pointer-events-none"
        );
      case "selected":
        return (
          base +
          "border-b-4 border-[#0059bb] dark:border-sky-400 bg-blue-50/90 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-300 -translate-y-0.5 shadow-sm ring-2 ring-[#0059bb]/15 cursor-pointer"
        );
      case "wrong":
        return (
          base +
          "border-b-4 border-rose-500 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 animate-shake cursor-default"
        );
      default:
        return (
          base +
          "border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 active:translate-y-[2px] active:border-b-2 cursor-pointer"
        );
    }
  };

  if (gameOver) {
    const total = pairCount + mistakes;
    const accuracy = Math.round((pairCount / Math.max(1, total)) * 100);
    const durationSeconds = finalDurationSeconds;
    const reviewItems: GameReviewItem[] = items.map((i) => ({
      ...i.review,
      isCorrect: !mistakeIds.has(i.pairId),
    }));
    return (
      <GameResultScreen
        gameType="wordlink"
        character={activeCharacter}
        title={
          totalParts && totalParts > 1
            ? `Nối Từ: Hoàn Thành Phần ${currentPart || 1}!`
            : "Nối Từ Xuất Sắc!"
        }
        subtitle={
          currentPart && totalParts && currentPart < totalParts
            ? `Bạn đã nối chuẩn xác ${pairCount} cặp từ của Phần ${currentPart}. Hãy chuyển sang thử thách Phần ${currentPart + 1} nhé!`
            : `Bạn đã nối đúng ${pairCount} cặp từ Anh - Việt với ${mistakes} lần nối sai trong ${durationSeconds} giây.`
        }
        score={finalScore}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={durationSeconds}
        maxCombo={maxCombo || pairCount}
        reviewItems={reviewItems}
        backLabel={
          currentPart && totalParts && currentPart < totalParts && onNextPart
            ? `Sang Phần ${currentPart + 1}`
            : backLabel
        }
        onBack={
          currentPart && totalParts && currentPart < totalParts && onNextPart
            ? onNextPart
            : onBack
        }
        onRestart={initGame}
      />
    );
  }

  return (
    <div className="select-none w-full flex-1 flex flex-col justify-between gap-2.5 sm:gap-3.5 h-full">
      {/* 1. Top bar */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onBack}
          title="Thoát bài"
          aria-label="Thoát bài"
          className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
        >
          <X className="w-6 h-6 stroke-[2.6]" />
        </button>

        <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300 relative shadow-xs"
            style={{ width: `${Math.max(progressPct, 4)}%` }}
          >
            <div className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/40" />
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          {/* Audio toggle button */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>

          {/* Part Badge if totalParts > 1 */}
          {currentPart && totalParts && totalParts > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 font-extrabold text-xs shadow-2xs shrink-0">
              <span>Phần {currentPart}/{totalParts}</span>
            </div>
          )}

          {/* Progress Counter */}
          <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-extrabold font-display text-xs sm:text-sm tabular-nums shadow-2xs">
            <span className="text-[#0059bb] dark:text-sky-400">{linked.length}</span>
            <span className="text-slate-300 dark:text-slate-600 font-light">/</span>
            <span>{items.length}</span>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={initGame}
            title="Chơi lại ván mới"
            aria-label="Chơi lại ván mới"
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500 dark:text-slate-300 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. 3D Companion Mascot (Matching SentenceBuilder scale) & Speech Bubble */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full">
        {/* 3D Character Avatar (Free-standing) */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative w-20 h-26 sm:w-28 sm:h-36 lg:w-30 lg:h-38 flex items-end justify-center select-none pointer-events-none">
            {/* Soft floor shadow */}
            <div className="absolute bottom-0 w-16 sm:w-22 lg:w-24 h-2.5 sm:h-3 rounded-[100%] bg-slate-400/25 dark:bg-black/40 blur-[2px]" />
            <img
              src={activeCharacter.avatarUrl}
              alt={activeCharacter.name}
              className="relative max-h-full w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.14)] transition-transform hover:scale-105 duration-200"
              loading="eager"
            />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
            {activeCharacter.name}
          </span>
        </div>

        {/* Speech Bubble (SentenceBuilder Style: Volume2 + Turtle + Divider + Underlined Text) */}
        <div className="relative flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3.5 px-3.5 py-3 sm:px-5 sm:py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
          <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200 dark:border-slate-700" />
          {/* Audio buttons (No box/container, direct icons, equal size) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => speakCurrent(0.9)}
              title="Nghe phát âm chuẩn (Phím A)"
              aria-label="Nghe phát âm chuẩn"
              className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
            >
              <Volume2 className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={() => speakCurrent(0.65)}
              title="Nghe phát âm chậm rãi (Phím S)"
              aria-label="Nghe phát âm chậm rãi"
              className="p-1 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-all hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
            >
              <Turtle className="w-6.5 h-6.5 sm:w-8 sm:h-8 fill-sky-500/20 stroke-[2.2]" />
            </button>
          </div>
          <div className="h-6 w-[1.5px] bg-slate-200 dark:bg-slate-700 shrink-0" />
          <p className="text-base sm:text-xl font-medium text-slate-700 dark:text-slate-100 leading-snug">
            {speechWords.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="border-b-2 border-dashed border-slate-300 dark:border-slate-600 mr-1.5 inline-block leading-snug"
              >
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* 3. Symmetric Two-Column Tactile Match Grid (4 Pairs = 8 Pure Word Tiles) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center py-1">
        <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-x-3.5 sm:gap-x-5 gap-y-3 sm:gap-y-3.5 items-stretch">
          {leftOrder.map((leftId, rowIdx) => {
            const rightId = rightOrder[rowIdx];
            const leftItem = byId(leftId);
            const rightItem = rightId ? byId(rightId) : undefined;

            const leftIsMatched = justMatchedId === leftId;
            const leftIsLinked = linked.includes(leftId);
            const leftIsWrong = wrongPair?.left === leftId;
            const leftIsSelected = selectedLeft === leftId;
            const leftState = leftIsMatched
              ? "matched"
              : leftIsLinked
              ? "linked"
              : leftIsWrong
              ? "wrong"
              : leftIsSelected
              ? "selected"
              : "idle";

            const rightIsMatched = rightId ? justMatchedId === rightId : false;
            const rightIsLinked = rightId ? linked.includes(rightId) : false;
            const rightIsWrong = rightId ? wrongPair?.right === rightId : false;
            const rightIsSelected = rightId ? selectedRight === rightId : false;
            const rightState = rightIsMatched
              ? "matched"
              : rightIsLinked
              ? "linked"
              : rightIsWrong
              ? "wrong"
              : rightIsSelected
              ? "selected"
              : "idle";

            return (
              <React.Fragment key={`${leftId}-${rightId || rowIdx}`}>
                {/* Left Tile: English Single Word */}
                {leftItem ? (
                  <button
                    type="button"
                    data-pair-id={leftId}
                    disabled={leftIsLinked && !leftIsMatched}
                    onClick={() => pickLeft(leftId)}
                    className={tileClass(leftState)}
                  >
                    <span className="text-base sm:text-[17px] font-bold sm:font-extrabold font-display tracking-tight leading-snug line-clamp-2">
                      {leftItem.word}
                    </span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Right Tile: Concise Vietnamese Word */}
                {rightItem && rightId ? (
                  <button
                    type="button"
                    data-pair-id={rightId}
                    disabled={rightIsLinked && !rightIsMatched}
                    onClick={() => pickRight(rightId)}
                    className={tileClass(rightState)}
                  >
                    <span className="text-base sm:text-[17px] font-bold sm:font-extrabold font-display tracking-tight leading-snug line-clamp-2">
                      {rightItem.meaning}
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Status Footer (Aligned with max-w-2xl Match Grid) */}
      <div className="shrink-0 w-full border-t border-slate-200/80 dark:border-slate-800 pt-2.5 pb-1">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs" />
            <span>Đã ghép đúng:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {linked.length} / {items.length} cặp
            </span>
          </div>

          <div className="flex items-center gap-1.5 pr-12 sm:pr-0">
            <span>Nối sai:</span>
            <span
              className={`font-extrabold tabular-nums px-2.5 py-0.5 rounded-full border transition-colors ${
                mistakes > 0
                  ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/60"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60"
              }`}
            >
              {mistakes}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Floating Combo Text (Pops up from small to large, then gradually vanishes - NO card container) */}
      {comboAlert && (
        <div
          key={comboAlert}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center select-none"
        >
          <div className="animate-combo-float-fade flex flex-col items-center select-none pointer-events-none">
            <span className="font-black font-display text-8xl sm:text-9xl md:text-[10rem] tracking-tight bg-gradient-to-b from-amber-300 via-orange-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_12px_28px_rgba(245,158,11,0.65)] filter">
              {comboAlert}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
