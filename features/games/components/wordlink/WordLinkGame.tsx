"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, Check, X } from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface WordLinkGameProps {
  pool: any[];
  onBack: () => void;
  backLabel?: string;
}

type PairCount = 4 | 6 | 8;

interface LinkItem {
  pairId: string;
  word: string;
  meaning: string;
  phonetic?: string;
  review: GameReviewItem;
}

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

export function WordLinkGame({ pool, onBack, backLabel }: WordLinkGameProps) {
  const { addToast } = useNotificationStore();

  const [pairCount, setPairCount] = useState<PairCount>(6);
  const [items, setItems] = useState<LinkItem[]>([]);
  const [leftOrder, setLeftOrder] = useState<string[]>([]);
  const [rightOrder, setRightOrder] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [linked, setLinked] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [mistakeIds, setMistakeIds] = useState<Set<string>>(new Set());
  const [elapsed, setElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [rewards, setRewards] = useState({ xp: 0, coins: 0 });
  const startRef = useRef(0);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const initGame = useCallback(() => {
    if (!pool || pool.length === 0) return;
    const picked = shuffle(pool.filter((w) => w.word && w.definitionVn)).slice(0, pairCount);
    const next: LinkItem[] = picked.map((w, i) => ({
      pairId: `p${i}`,
      word: w.word,
      meaning: w.definitionVn,
      phonetic: w.phonetic,
      review: {
        id: w.id,
        word: w.word,
        phonetic: w.phonetic,
        definitionVn: w.definitionVn,
        pos: w.pos,
        example: w.examples?.[0],
        isCorrect: true,
      },
    }));
    setItems(next);
    setLeftOrder(shuffle(next.map((n) => n.pairId)));
    setRightOrder(shuffle(next.map((n) => n.pairId)));
    setSelectedLeft(null);
    setLinked([]);
    setWrongPair(null);
    setMistakes(0);
    setMistakeIds(new Set());
    setElapsed(0);
    setGameOver(false);
    setFinalScore(0);
    setRewards({ xp: 0, coins: 0 });
    startRef.current = Date.now();
  }, [pool, pairCount]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameOver || items.length === 0) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [gameOver, items]);

  const finish = useCallback(
    (mistakeCount: number, seconds: number) => {
      const base = pairCount * 10;
      const score = Math.max(20, base - mistakeCount * 4 + Math.max(0, Math.round(40 - seconds / 2)));
      setFinalScore(score);
      setGameOver(true);
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();
      const durationSeconds = Math.max(1, Math.round((Date.now() - startRef.current) / 1000));
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
    },
    [pairCount, addToast]
  );

  const pickLeft = (pairId: string) => {
    if (linked.includes(pairId) || wrongPair) return;
    triggerHaptic("tap");
    gameAudio.playFlipSound();
    const item = items.find((i) => i.pairId === pairId);
    if (item) safeSpeakText(item.word, { lang: "en-US", rate: 0.9 });
    setSelectedLeft(pairId === selectedLeft ? null : pairId);
  };

  const pickRight = (pairId: string) => {
    if (!selectedLeft || linked.includes(pairId) || wrongPair) return;
    if (selectedLeft === pairId) {
      triggerHaptic("success");
      gameAudio.playCorrectDing();
      const nextLinked = [...linked, pairId];
      setLinked(nextLinked);
      setSelectedLeft(null);
      if (nextLinked.length >= items.length) finish(mistakes, elapsed);
    } else {
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setMistakes((m) => m + 1);
      setMistakeIds((prev) => new Set(prev).add(selectedLeft));
      setWrongPair({ left: selectedLeft, right: pairId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 650);
    }
  };

  const toggleAudio = () => setIsMuted(gameAudio.toggleMute());

  if (gameOver) {
    const total = pairCount + mistakes;
    const accuracy = Math.round((pairCount / Math.max(1, total)) * 100);
    const reviewItems: GameReviewItem[] = items.map((i) => ({
      ...i.review,
      isCorrect: !mistakeIds.has(i.pairId),
    }));
    return (
      <GameResultScreen
        gameType="wordlink"
        title="Nối Từ Xuất Sắc!"
        subtitle={`Bạn đã nối đúng ${pairCount} cặp từ Anh - Việt với ${mistakes} lần nối sai trong ${elapsed} giây.`}
        score={finalScore}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={elapsed}
        maxCombo={pairCount}
        reviewItems={reviewItems}
        backLabel={backLabel}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  const progressPct = items.length ? (linked.length / items.length) * 100 : 0;
  const byId = (id: string) => items.find((i) => i.pairId === id);

  const tileClass = (state: "idle" | "selected" | "linked" | "wrong") => {
    const heightPad =
      pairCount === 8
        ? "min-h-[44px] sm:min-h-[48px] px-3 py-1.5 rounded-xl sm:rounded-2xl"
        : pairCount === 6
        ? "min-h-[52px] sm:min-h-[58px] px-3.5 py-2 rounded-xl sm:rounded-2xl"
        : "min-h-[62px] sm:min-h-[70px] px-4 py-3 rounded-2xl";

    const base = `w-full ${heightPad} border-2 border-b-4 text-left flex items-center gap-2 transition-all select-none `;
    switch (state) {
      case "linked":
        return (
          base +
          "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-80 cursor-default"
        );
      case "selected":
        return (
          base +
          "bg-blue-50 dark:bg-blue-950/30 border-[#0059bb] text-[#0059bb] dark:text-sky-300 cursor-pointer -translate-y-0.5"
        );
      case "wrong":
        return (
          base +
          "bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-600 dark:text-rose-300 animate-pulse cursor-default"
        );
      default:
        return (
          base +
          "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2"
        );
    }
  };

  const listGap =
    pairCount === 8
      ? "gap-1.5 sm:gap-2"
      : pairCount === 6
      ? "gap-2 sm:gap-2.5"
      : "gap-2.5 sm:gap-3.5";

  return (
    <div className="select-none w-full flex-1 flex flex-col justify-between gap-3 sm:gap-4 h-full">
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

        <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300 relative"
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

          {/* Progress Counter & Timer */}
          <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold font-display text-xs sm:text-sm tabular-nums shadow-2xs">
            <span className="text-[#0059bb] dark:text-sky-400">{linked.length}</span>
            <span className="text-slate-400 dark:text-slate-500 font-medium">/</span>
            <span>{items.length}</span>
            <span className="text-slate-300 dark:text-slate-600 font-light mx-0.5">·</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">{elapsed}s</span>
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

      {/* 2. Instruction + difficulty */}
      <div className="flex items-center justify-between gap-3 flex-wrap shrink-0">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Nối từ tiếng Anh với nghĩa tương ứng
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Chạm một từ tiếng Anh, rồi chọn nghĩa tiếng Việt tương ứng
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700">
          {([4, 6, 8] as PairCount[]).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPairCount(n)}
              className={`px-3 py-1 rounded-xl text-xs font-black cursor-pointer transition-all ${
                pairCount === n
                  ? "bg-[#0059bb] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {n} cặp
            </button>
          ))}
        </div>
      </div>

      {/* 3. Two columns */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 items-start">
          <div className={`flex flex-col ${listGap}`}>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">English</span>
            {leftOrder.map((id) => {
              const it = byId(id);
              if (!it) return null;
              const state = linked.includes(id)
                ? "linked"
                : wrongPair?.left === id
                ? "wrong"
                : selectedLeft === id
                ? "selected"
                : "idle";
              return (
                <button key={id} type="button" onClick={() => pickLeft(id)} className={tileClass(state)}>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm sm:text-base font-black font-display truncate">{it.word}</span>
                    {it.phonetic && (
                      <span className="block text-[11px] font-mono text-slate-400 truncate">{it.phonetic}</span>
                    )}
                  </span>
                  {state === "linked" && (
                    <Check className="w-4 h-4 shrink-0 stroke-[3] text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className={`flex flex-col ${listGap}`}>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Tiếng Việt</span>
            {rightOrder.map((id) => {
              const it = byId(id);
              if (!it) return null;
              const state = linked.includes(id)
                ? "linked"
                : wrongPair?.right === id
                ? "wrong"
                : "idle";
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => pickRight(id)}
                  disabled={!selectedLeft && state === "idle"}
                  className={`${tileClass(state)} ${!selectedLeft && state === "idle" ? "opacity-90" : ""}`}
                >
                  <span className="flex-1 min-w-0 text-xs sm:text-sm font-bold line-clamp-2 leading-snug">{it.meaning}</span>
                  {state === "linked" && (
                    <Check className="w-4 h-4 shrink-0 stroke-[3] text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom footer */}
      <div className="shrink-0 flex items-center justify-between pt-2 pb-1 text-xs font-medium text-slate-400 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1.5">
          <span>Đã ghép đúng:</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {linked.length} / {items.length} cặp
          </span>
        </span>
        <span className="flex items-center gap-1.5 pr-14 sm:pr-0">
          <span>Lần nối sai:</span>
          <span className={`font-black tabular-nums ${mistakes > 0 ? "text-rose-500" : "text-slate-500"}`}>
            {mistakes}
          </span>
        </span>
      </div>
    </div>
  );
}
