"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Timer,
  Zap,
  Flame,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useNotificationStore } from "@/stores/notificationStore";
import { SpeedBlitzQuestion, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface SpeedBlitzGameProps {
  pool: any[];
  onBack: () => void;
}

const TOTAL_TIME = 60;

export function SpeedBlitzGame({ pool, onBack }: SpeedBlitzGameProps) {
  const { addToast } = useNotificationStore();

  const [questions, setQuestions] = useState<SpeedBlitzQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rewards, setRewards] = useState<{ xp: number; coins: number }>({ xp: 0, coins: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Review tracking
  const [reviewItems, setReviewItems] = useState<GameReviewItem[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const toggleAudio = () => {
    const next = gameAudio.toggleMute();
    setIsMuted(next);
  };

  const speakWord = (word: string) => {
    safeSpeakText(word, { lang: "en-US", rate: 0.95 });
  };

  // Generate question pool
  const generateQuestions = useCallback(() => {
    if (!pool || pool.length < 4) return;

    const validWords = pool.filter(
      (w) => w.word && w.definitionVn && /^[a-zA-Z\s-]+$/.test(w.word.trim())
    );

    const shuffled = [...validWords].sort(() => 0.5 - Math.random());
    const generated: SpeedBlitzQuestion[] = [];

    shuffled.forEach((target, i) => {
      // Pick 3 distractors
      const distractors = validWords
        .filter((w) => w.word !== target.word && w.definitionVn !== target.definitionVn)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.definitionVn);

      if (distractors.length >= 3) {
        const options = [...distractors, target.definitionVn].sort(
          () => 0.5 - Math.random()
        );

        generated.push({
          id: String(target.id || target.word || i),
          word: target.word.trim(),
          phonetic: target.phonetic || target.ipa,
          pos: target.pos,
          correctDef: target.definitionVn,
          options,
          example: target.examples?.[0],
        });
      }
    });

    setQuestions(generated);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(TOTAL_TIME);
    setGameOver(false);
    setSelectedOption(null);
    setFeedback(null);
    setReviewItems([]);
    setRewards({ xp: 0, coins: 0 });
    startTimeRef.current = Date.now();
  }, [pool]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Handle countdown
  useEffect(() => {
    if (gameOver || questions.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 6 && t > 1) {
          gameAudio.playTimerUrgent();
        }
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, questions]);

  // Handle selecting an option
  const handleSelectOption = (opt: string) => {
    if (feedback !== null || gameOver) return;
    const currentQ = questions[currentIdx];
    if (!currentQ) return;

    setSelectedOption(opt);
    const isCorrect = opt === currentQ.correctDef;

    // Record review item
    const review: GameReviewItem = {
      id: currentQ.id,
      word: currentQ.word,
      phonetic: currentQ.phonetic,
      pos: currentQ.pos,
      definitionVn: currentQ.correctDef,
      example: currentQ.example,
      isCorrect,
      userAnswer: opt,
      correctAnswer: currentQ.correctDef,
    };
    setReviewItems((prev) => [...prev, review]);

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));

      const comboMultiplier = nextCombo >= 4 ? 3 : nextCombo >= 2 ? 2 : 1;
      const points = 10 * comboMultiplier;
      setScore((s) => s + points);

      gameAudio.playComboStreak(nextCombo);
      speakWord(currentQ.word);
      setFeedback("correct");
    } else {
      gameAudio.playWrongBuzzer();
      setCombo(0);
      setFeedback("wrong");
    }

    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((c) => c + 1);
      } else {
        setGameOver(true);
      }
    }, 450);
  };

  // Keyboard shortcut listener (Keys 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback !== null || gameOver) return;
      const currentQ = questions[currentIdx];
      if (!currentQ) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4) {
        const option = currentQ.options[num - 1];
        if (option) {
          handleSelectOption(option);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questions, currentIdx, feedback, gameOver]);

  // Handle Game Over sync
  useEffect(() => {
    if (gameOver) {
      gameAudio.playVictoryFanfare();
      const correctCount = reviewItems.filter((i) => i.isCorrect).length;
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

      recordGameSession({
        gameType: "blitz",
        score,
        durationSeconds,
        wordsCompleted: correctCount,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn tất Speed Blitz: ${correctCount} từ đúng, ${score} điểm!`,
          });
        }
      });
    }
  }, [gameOver, score, addToast, reviewItems]);

  if (gameOver) {
    const correctCount = reviewItems.filter((i) => i.isCorrect).length;
    const totalAnswered = reviewItems.length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    return (
      <GameResultScreen
        title="Speed Blitz Kết Thúc!"
        subtitle={`Bạn đã phản xạ ${totalAnswered} từ vựng với ${correctCount} câu trả lời chính xác trong 60 giây.`}
        score={score}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={duration}
        maxCombo={maxCombo}
        reviewItems={reviewItems}
        onBack={onBack}
        onRestart={generateQuestions}
      />
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-xl mx-auto">
      {/* 1. Header Controls Bar */}
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
              <Volume2 className="w-3.5 h-3.5 text-blue-500" />
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

          <button
            type="button"
            onClick={generateQuestions}
            title="Làm mới ván mới"
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Visual Fever / Countdown Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-colors ${
            timeLeft <= 8 ? "bg-rose-500" : "bg-[#0059bb]"
          }`}
          style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
        />
      </div>

      {/* 3. Main Question Stage */}
      <AnimatePresence mode="wait">
        {currentQ && (
          <motion.div
            key={`blitz-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Spotlight Word Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl text-center space-y-2 bg-white dark:bg-slate-900 border transition-all shadow-md ${
                feedback === "correct"
                  ? "border-emerald-500 ring-4 ring-emerald-500/15"
                  : feedback === "wrong"
                  ? "border-rose-500 ring-4 ring-rose-500/15"
                  : "border-slate-200/90 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Câu {currentIdx + 1}</span>
                {currentQ.pos && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold">
                    {currentQ.pos}
                  </span>
                )}
              </div>

              {/* Main Word + Audio */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                  {currentQ.word}
                </h2>
                <button
                  type="button"
                  onClick={() => speakWord(currentQ.word)}
                  title="Nghe phát âm"
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 hover:bg-blue-100 transition-colors cursor-pointer active:scale-95"
                >
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>

              {currentQ.phonetic && (
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  {currentQ.phonetic}
                </p>
              )}
            </div>

            {/* 4. Four Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === opt;
                const isCorrectOption = opt === currentQ.correctDef;

                let optStyle =
                  "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-800";

                if (feedback !== null) {
                  if (isCorrectOption) {
                    optStyle =
                      "bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20";
                  } else if (isSelected && !isCorrectOption) {
                    optStyle =
                      "bg-rose-500 border-rose-600 text-white shadow-md shadow-rose-500/20";
                  }
                }

                return (
                  <motion.button
                    key={optIdx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectOption(opt)}
                    disabled={feedback !== null}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between text-xs sm:text-[13px] font-bold transition-all duration-150 cursor-pointer shadow-2xs ${optStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px] font-black flex items-center justify-center shrink-0">
                        {optIdx + 1}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>

                    {feedback !== null && isCorrectOption && (
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-1" />
                    )}
                    {feedback !== null && isSelected && !isCorrectOption && (
                      <XCircle className="w-4 h-4 text-white shrink-0 ml-1" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <p className="text-[11px] text-center text-slate-400 font-semibold">
              Mẹo: Bạn có thể nhấn phím 1, 2, 3, 4 trên bàn phím để trả lời thần tốc
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
