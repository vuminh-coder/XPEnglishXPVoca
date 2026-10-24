"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Volume2, VolumeX, RotateCcw, Check, X, Flame } from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";
import { XP_CHARACTERS, CompanionCharacter } from "../../data/characterRoster";

export interface WordLinkGameProps {
  pool: any[];
  onBack: () => void;
  backLabel?: string;
}

const PAIR_COUNT = 5;

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

  const pairCount = PAIR_COUNT;
  const [items, setItems] = useState<LinkItem[]>([]);
  const [leftOrder, setLeftOrder] = useState<string[]>([]);
  const [rightOrder, setRightOrder] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [linked, setLinked] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [mistakeIds, setMistakeIds] = useState<Set<string>>(new Set());
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [characterIdx, setCharacterIdx] = useState(0);
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
    const cleanMeaning = (text: string) => {
      if (!text) return "";
      return text.replace(/\s*\([^)]*\)/g, "").trim();
    };

    const picked = shuffle(pool.filter((w) => w.word && w.definitionVn)).slice(0, pairCount);
    const next: LinkItem[] = picked.map((w, i) => {
      const cleanVn = cleanMeaning(w.definitionVn) || w.definitionVn;
      return {
        pairId: `p${i}`,
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
    setItems(next);
    setLeftOrder(shuffle(next.map((n) => n.pairId)));
    setRightOrder(shuffle(next.map((n) => n.pairId)));
    setSelectedLeft(null);
    setLinked([]);
    setWrongPair(null);
    setMistakes(0);
    setMistakeIds(new Set());
    setCombo(0);
    setMaxCombo(0);
    setCharacterIdx((idx) => (idx + 1) % XP_CHARACTERS.length);
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
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      const nextLinked = [...linked, pairId];
      setLinked(nextLinked);
      setSelectedLeft(null);
      if (nextLinked.length >= items.length) finish(mistakes, elapsed);
    } else {
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setCombo(0);
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
        maxCombo={maxCombo || pairCount}
        reviewItems={reviewItems}
        backLabel={backLabel}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  const progressPct = items.length ? (linked.length / items.length) * 100 : 0;
  const byId = (id: string) => items.find((i) => i.pairId === id);

  const activeCharacter = XP_CHARACTERS[characterIdx] || XP_CHARACTERS[0];

  const speechText = useMemo(() => {
    if (wrongPair) {
      return "Chưa đúng rồi, thử lại nhé!";
    }
    if (combo >= 4) {
      return `🔥 Chuỗi ${combo}! Đỉnh cao!`;
    }
    if (combo >= 2) {
      return `⚡ Chuỗi x${combo} chuẩn xác!`;
    }
    if (linked.length === 0) {
      return "Nối nhanh các cặp từ nhé!";
    }
    if (linked.length === items.length) {
      return "Tuyệt đỉnh! Hoàn thành!";
    }
    const remaining = items.length - linked.length;
    return `Còn ${remaining} cặp từ nữa!`;
  }, [wrongPair, combo, linked.length, items.length]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const tileClass = (state: "idle" | "selected" | "linked" | "wrong") => {
    const heightPad = "min-h-[52px] sm:min-h-[58px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl";

    const base = `group w-full ${heightPad} border-2 text-left flex items-center justify-between gap-2.5 transition-all select-none `;
    switch (state) {
      case "linked":
        return (
          base +
          "border-b-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default scale-[0.98]"
        );
      case "selected":
        return (
          base +
          "border-b-[4px] sm:border-b-[5px] border-[#0059bb] bg-blue-50/90 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 -translate-y-1 shadow-md ring-2 ring-[#0059bb]/20 cursor-pointer"
        );
      case "wrong":
        return (
          base +
          "border-b-[4px] sm:border-b-[5px] border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 animate-pulse shadow-xs cursor-default"
        );
      default:
        return (
          base +
          "border-b-[4px] sm:border-b-[5px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xs hover:border-slate-300 hover:bg-slate-50/80 active:translate-y-[2px] active:border-b-2 cursor-pointer"
        );
    }
  };

  const listGap = "gap-2 sm:gap-2.5";

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
          {combo >= 2 && (
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-black text-xs shadow-xs animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>x{combo}</span>
            </div>
          )}

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
          <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-extrabold font-display text-xs sm:text-sm tabular-nums shadow-2xs">
            <span className="text-[#0059bb] dark:text-sky-400">{linked.length}</span>
            <span className="text-slate-300 dark:text-slate-600 font-light">/</span>
            <span>{items.length}</span>
            <span className="text-slate-300 dark:text-slate-600 font-light mx-0.5">·</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">{formatTime(elapsed)}</span>
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

        {/* Speech Bubble (Spans width matching 2 columns below) */}
        <div className="relative flex-1 min-w-0 bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-700 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xs flex flex-col justify-center">
          <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200/90 dark:border-slate-700" />
          <p className="text-sm sm:text-base font-black font-display text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
            {speechText}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
            {activeCharacter.role}
          </p>
        </div>
      </div>

      {/* 3. Two columns Match Grid */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-12 items-start">
          {/* Left Column: English */}
          <div className={`flex flex-col ${listGap}`}>
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb]" />
              <span>Tiếng Anh</span>
            </div>
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
                <button
                  key={id}
                  type="button"
                  onClick={() => pickLeft(id)}
                  className={tileClass(state)}
                >
                  <div className="flex-1 min-w-0 pr-1 flex items-center">
                    <span className="block text-sm sm:text-base font-black font-display tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-[#0059bb] truncate">
                      {it.word}
                    </span>
                  </div>
                  {state === "linked" ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-[#0059bb] transition-colors" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Tiếng Việt */}
          <div className={`flex flex-col ${listGap}`}>
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Tiếng Việt</span>
            </div>
            {rightOrder.map((id) => {
              const it = byId(id);
              if (!it) return null;
              const cleanVn = it.meaning.replace(/\s*\([^)]*\)/g, "").trim() || it.meaning;
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
                  <span className="flex-1 min-w-0 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug">
                    {cleanVn}
                  </span>
                  {state === "linked" && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom footer */}
      <div className="shrink-0 flex items-center justify-between pt-2 pb-1 text-xs font-semibold text-slate-400 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Đã ghép đúng:</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {linked.length} / {items.length} cặp
          </span>
        </div>

        <div className="flex items-center gap-1.5 pr-14 sm:pr-0">
          <span>Nối sai:</span>
          <span className={`font-black tabular-nums px-2 py-0.5 rounded-md ${
            mistakes > 0
              ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60"
              : "text-slate-400"
          }`}>
            {mistakes}
          </span>
        </div>
      </div>
    </div>
  );
}
