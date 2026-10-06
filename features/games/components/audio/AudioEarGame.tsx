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
  HelpCircle,
  Headphones,
  Play,
  RotateCw,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useNotificationStore } from "@/stores/notificationStore";
import { AudioQuizQuestion, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface AudioEarGameProps {
  pool: any[];
  onBack: () => void;
}

const TOTAL_ROUNDS = 8;
const QUESTION_TIME = 25;

export function AudioEarGame({ pool, onBack }: AudioEarGameProps) {
  const { addToast } = useNotificationStore();

  const [questions, setQuestions] = useState<AudioQuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [rewards, setRewards] = useState<{ xp: number; coins: number }>({ xp: 0, coins: 0 });

  // Deep review tracking
  const [reviewItems, setReviewItems] = useState<GameReviewItem[]>([]);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setIsMuted(gameAudio.isMuted());
  }, []);

  const toggleAudio = () => {
    const next = gameAudio.toggleMute();
    setIsMuted(next);
  };

  const playPronunciation = useCallback((word: string, rate: number = 0.9) => {
    setIsPlayingAudio(true);
    safeSpeakText(word, { lang: "en-US", rate });
    setTimeout(() => setIsPlayingAudio(false), 1200);
  }, []);

  // Generate 8 randomized audio questions from pool
  const generateQuestions = useCallback(() => {
    if (!pool || pool.length < 4) return;

    const validWords = pool.filter(
      (w) => w.word && w.definitionVn && /^[a-zA-Z\s-]+$/.test(w.word.trim())
    );

    const shuffled = [...validWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, TOTAL_ROUNDS);

    const generated: AudioQuizQuestion[] = selected.map((item) => {
      // Pick 3 distractors
      const distractors = validWords
        .filter((w) => w.word !== item.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((d) => ({
          word: d.word,
          definitionVn: d.definitionVn,
          isCorrect: false,
        }));

      const options = [
        ...distractors,
        { word: item.word, definitionVn: item.definitionVn, isCorrect: true },
      ].sort(() => 0.5 - Math.random());

      return {
        id: String(item.id || item.word),
        word: item.word.trim(),
        phonetic: item.phonetic || item.ipa || "",
        pos: item.pos,
        definitionVn: item.definitionVn,
        example: item.examples?.[0],
        options,
      };
    });

    setQuestions(generated);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(QUESTION_TIME);
    setFeedback(null);
    setSelectedWord(null);
    setShowHint(false);
    setGameOver(false);
    setReviewItems([]);
    setRewards({ xp: 0, coins: 0 });
    startTimeRef.current = Date.now();
  }, [pool]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Auto-play audio when question changes
  useEffect(() => {
    if (questions[currentIdx] && !gameOver) {
      playPronunciation(questions[currentIdx].word, 0.9);
    }
  }, [currentIdx, questions, gameOver, playPronunciation]);

  // Handle countdown
  useEffect(() => {
    if (gameOver || questions.length === 0 || feedback !== null) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 5 && t > 1) {
          gameAudio.playTimerUrgent();
        }
        if (t <= 1) {
          handleTimeout();
          return QUESTION_TIME;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, questions, feedback]);

  const handleTimeout = () => {
    const currentQ = questions[currentIdx];
    if (!currentQ) return;

    triggerHaptic("warning");
    gameAudio.playWrongBuzzer();
    setCombo(0);

    const review: GameReviewItem = {
      id: currentQ.id,
      word: currentQ.word,
      phonetic: currentQ.phonetic,
      pos: currentQ.pos,
      definitionVn: currentQ.definitionVn,
      example: currentQ.example,
      isCorrect: false,
      userAnswer: "Hết thời gian",
      correctAnswer: currentQ.word,
    };
    setReviewItems((prev) => [...prev, review]);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setTimeLeft(QUESTION_TIME);
      setShowHint(false);
    } else {
      setGameOver(true);
    }
  };

  // Submit guess
  const handleSelectWord = (optWord: string) => {
    if (feedback !== null || gameOver) return;
    const currentQ = questions[currentIdx];
    if (!currentQ) return;

    setSelectedWord(optWord);
    const isCorrect = optWord === currentQ.word;

    const review: GameReviewItem = {
      id: currentQ.id,
      word: currentQ.word,
      phonetic: currentQ.phonetic,
      pos: currentQ.pos,
      definitionVn: currentQ.definitionVn,
      example: currentQ.example,
      isCorrect,
      userAnswer: optWord,
      correctAnswer: currentQ.word,
    };
    setReviewItems((prev) => [...prev, review]);

    if (isCorrect) {
      triggerHaptic("success");
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));

      const comboMultiplier = nextCombo >= 3 ? 2 : nextCombo >= 2 ? 1.5 : 1;
      const points = Math.round(15 * comboMultiplier);
      setScore((s) => s + points);

      gameAudio.playComboStreak(nextCombo);
      setFeedback("correct");
    } else {
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setCombo(0);
      setFeedback("wrong");
    }

    setTimeout(() => {
      setSelectedWord(null);
      setFeedback(null);
      setShowHint(false);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((c) => c + 1);
        setTimeLeft(QUESTION_TIME);
      } else {
        setGameOver(true);
      }
    }, 1100);
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
          handleSelectWord(option.word);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questions, currentIdx, feedback, gameOver]);

  // Game over sync
  useEffect(() => {
    if (gameOver) {
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();
      const correctCount = reviewItems.filter((i) => i.isCorrect).length;
      const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      setDurationSeconds(duration);

      recordGameSession({
        gameType: "audio",
        score,
        durationSeconds: duration,
        wordsCompleted: correctCount,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn tất Audio Ear Challenge: Nghe đúng ${correctCount}/${TOTAL_ROUNDS} từ!`,
          });
        }
      });
    }
  }, [gameOver, score, addToast, reviewItems]);

  if (gameOver) {
    const correctCount = reviewItems.filter((i) => i.isCorrect).length;
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;

    return (
      <GameResultScreen
        title="Audio Challenge Hoàn Thành!"
        subtitle={`Bạn đã nhận diện chính xác âm thanh của ${correctCount}/${questions.length} từ vựng tiếng Anh.`}
        score={score}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={durationSeconds || 1}
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
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between">
        

        <div className="flex items-center gap-2">
          {/* Mute button */}
          <button
            type="button"
            onClick={toggleAudio}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
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

          <Badge variant={timeLeft <= 6 ? "danger" : "neutral"} size="sm">
            <Timer className="w-3 h-3 mr-1 stroke-[2.2]" />
            {timeLeft}s
          </Badge>

          <button
            type="button"
            onClick={generateQuestions}
            title="Làm mới ván mới"
            className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-90"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2. Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-cyan-600"
          initial={{ width: 0 }}
          animate={{
            width: questions.length ? `${((currentIdx + 1) / questions.length) * 100}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* 3. Main Audio Stage Card */}
      <AnimatePresence mode="wait">
        {currentQ && (
          <motion.div
            key={`audio-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            <div
              className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border transition-all shadow-md text-center space-y-5 relative overflow-hidden ${
                feedback === "correct"
                  ? "border-emerald-500 ring-4 ring-emerald-500/15"
                  : feedback === "wrong"
                  ? "border-rose-500 ring-4 ring-rose-500/15"
                  : "border-slate-200/90 dark:border-slate-800"
              }`}
            >
              {/* Question Index & Hint Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Câu hỏi nghe {currentIdx + 1} / {questions.length}
                </span>

                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="py-1 px-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-[11px] font-bold min-h-[44px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                >
                  <HelpCircle className="w-3 h-3 stroke-[2.2]" />
                  <span>Gợi ý</span>
                </button>
              </div>

              {/* Animated Sound Wave Visualizer */}
              <div className="py-2 flex items-center justify-center gap-1.5 h-16">
                {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7, 1, 0.4].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlayingAudio
                        ? { scaleY: [1, height * 2.2, 0.8, height * 1.8, 1] }
                        : { scaleY: 1 }
                    }
                    transition={{
                      repeat: isPlayingAudio ? Infinity : 0,
                      duration: 0.8,
                      delay: i * 0.08,
                    }}
                    className={`w-1.5 sm:w-2 rounded-full ${
                      isPlayingAudio
                        ? "bg-gradient-to-t from-cyan-500 to-[#0059bb]"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                    style={{ height: `${height * 36}px` }}
                  />
                ))}
              </div>

              {/* Big Play Sound Buttons (1.0x Normal & 0.75x Slow) */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => playPronunciation(currentQ.word, 0.9)}
                  className="py-3 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-cyan-600/20 cursor-pointer transition-all"
                >
                  <Volume2 className="w-5 h-5 stroke-[2.4]" />
                  <span>Nghe lại (1.0x)</span>
                </button>

                <button
                  type="button"
                  onClick={() => playPronunciation(currentQ.word, 0.7)}
                  className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                  title="Nghe tốc độ chậm để nhận diện âm đuôi"
                >
                  <RotateCw className="w-4 h-4 stroke-[2.2]" />
                  <span>Chậm (0.75x)</span>
                </button>
              </div>

              {/* Optional Hint Box */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-center space-y-0.5"
                >
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Gợi ý nghĩa tiếng Việt
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-semibold">
                    {currentQ.definitionVn}
                  </p>
                </motion.div>
              )}

              {/* Feedback Success Popup */}
              {feedback === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center space-y-1"
                >
                  <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 font-display">
                    <span>Chính xác: {currentQ.word}</span>
                  </div>
                  {currentQ.phonetic && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                      {currentQ.phonetic}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {currentQ.definitionVn}
                  </p>
                </motion.div>
              )}
            </div>

            {/* 4. Four Word Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedWord === opt.word;
                const isCorrectOption = opt.isCorrect;

                let btnStyle =
                  "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-slate-800";

                if (feedback !== null) {
                  if (isCorrectOption) {
                    btnStyle =
                      "bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20";
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle =
                      "bg-rose-500 border-rose-600 text-white shadow-md shadow-rose-500/20";
                  }
                }

                return (
                  <motion.button
                    key={optIdx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectWord(opt.word)}
                    disabled={feedback !== null}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center justify-between text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer shadow-2xs ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px] font-black flex items-center justify-center shrink-0">
                        {optIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display tracking-wide">{opt.word}</div>
                        <div className="text-[11px] text-slate-400 font-normal truncate">
                          {opt.definitionVn}
                        </div>
                      </div>
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
              Mẹo: Nhấn phím 1, 2, 3, 4 trên bàn phím để chọn từ nhanh
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
