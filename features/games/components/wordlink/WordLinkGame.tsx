"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, Check } from "lucide-react";
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

  const circleBtn =
    "w-11 h-11 shrink-0 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2";

  const tileClass = (state: "idle" | "selected" | "linked" | "wrong") => {
    const base =
      "w-full min-h-[56px] sm:min-h-[64px] px-3 py-2 rounded-2xl border-2 border-b-4 text-left flex items-center gap-2 transition-all select-none ";
    switch (state) {
      case "linked":
        return base + "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-80 cursor-default";
      case "selected":
        return base + "bg-blue-50 dark:bg-blue-950/30 border-[#0059bb] text-[#0059bb] dark:text-sky-300 cursor-pointer -translate-y-0.5";
      case "wrong":
        return base + "bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-600 dark:text-rose-300 animate-pulse cursor-default";
      default:
        return base + "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2";
    }
  };

  return (
    <div className="select-none w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-5">
      {/* 1. Top bar */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={toggleAudio} className={circleBtn} aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}>
          {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
        </button>
        <div className="flex-1 h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300 relative"
            style={{ width: `${Math.max(progressPct, 4)}%` }}
          >
            <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/35" />
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black tabular-nums text-slate-700 dark:text-slate-200">
          {linked.length}/{items.length} · {elapsed}s
        </span>
        <button type="button" onClick={initGame} className={circleBtn} aria-label="Chơi lại">
          <RotateCcw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {/* 2. Instruction + difficulty */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
          Chọn từ tiếng Anh, rồi chọn nghĩa tương ứng
        </p>
        <div className="flex gap-1.5">
          {([4, 6, 8] as PairCount[]).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPairCount(n)}
              className={`px-3 h-9 rounded-xl border-2 border-b-4 text-xs font-black cursor-pointer transition-all active:translate-y-[2px] active:border-b-2 ${
                pairCount === n
                  ? "bg-blue-50 dark:bg-blue-950/30 border-[#0059bb] text-[#0059bb] dark:text-sky-300"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {n} cặp
            </button>
          ))}
        </div>
      </div>

      {/* 3. Two columns */}
      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-0">
        <div className="flex flex-col gap-2.5">
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
                {state === "linked" && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5">
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
                <span className="flex-1 min-w-0 text-sm font-bold line-clamp-2">{it.meaning}</span>
                {state === "linked" && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs font-medium text-slate-400">
        Nối sai: <span className="font-black text-rose-500 tabular-nums">{mistakes}</span>
      </p>
    </div>
  );
}
