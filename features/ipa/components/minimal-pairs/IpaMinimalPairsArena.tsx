"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Trophy,
  Swords,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Zap,
  Clock,
  Compass,
  Headphones,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { MINIMAL_PAIRS, MinimalPair, MinimalPairCategory } from "../../data/ipaData";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import {
  playSfxCorrect,
  playSfxWrong,
  playSfxCombo,
  playSfxHeartLost,
  playSfxVictory,
  getSfxMuted,
  toggleSfxMute,
} from "../../utils/ipaSoundEffects";

export type GameMode = "blitz" | "survival" | "zen";

interface MistakeRecord {
  round: number;
  wordA: string;
  phoneticA: string;
  meaningA: string;
  wordB: string;
  phoneticB: string;
  meaningB: string;
  correctChoice: "A" | "B";
  userChoice: "A" | "B" | "timeout";
  targetWord: string;
  targetPhonetic: string;
}

export interface IpaMinimalPairsArenaProps {
  className?: string;
}

const BLITZ_TIME_LIMIT = 6.0; // 6 seconds per question in blitz mode
const TOTAL_ROUNDS = 10;

export const IpaMinimalPairsArena: React.FC<IpaMinimalPairsArenaProps> = ({
  className = "",
}) => {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  // 1. Topic & Category Selection
  const [selectedTopicId, setSelectedTopicId] = useState<string>(MINIMAL_PAIRS[0].id);
  const [isTopicMenuOpen, setIsTopicMenuOpen] = useState<boolean>(false);
  const [topicMenuCategory, setTopicMenuCategory] = useState<"all" | MinimalPairCategory>("all");
  const [isReferenceDrawerOpen, setIsReferenceDrawerOpen] = useState<boolean>(false);

  const activeTopic = useMemo(() => {
    return MINIMAL_PAIRS.find((p) => p.id === selectedTopicId) || MINIMAL_PAIRS[0];
  }, [selectedTopicId]);

  const filteredTopics = useMemo(() => {
    if (topicMenuCategory === "all") return MINIMAL_PAIRS;
    return MINIMAL_PAIRS.filter((p) => p.category === topicMenuCategory);
  }, [topicMenuCategory]);

  // 2. Game Mode & Sound settings
  const [gameMode, setGameMode] = useState<GameMode>("blitz");
  const [isSfxMuted, setIsSfxMuted] = useState<boolean>(() => getSfxMuted());
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState<boolean>(true);
  const [isPlayingSequential, setIsPlayingSequential] = useState<number | null>(null);

  // 3. Match Progression States (10-round match)
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPairIndex, setCurrentPairIndex] = useState<number>(0);
  const [targetChoice, setTargetChoice] = useState<"A" | "B">("A");
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "timeout" | null>(null);
  const [isMatchFinished, setIsMatchFinished] = useState<boolean>(false);

  // 4. Scoring & Stats
  const [hearts, setHearts] = useState<number>(3);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [matchXpEarned, setMatchXpEarned] = useState<number>(0);
  const [matchCoinsEarned, setMatchCoinsEarned] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [roundMistakes, setRoundMistakes] = useState<MistakeRecord[]>([]);

  // 5. Blitz Countdown Timer
  const [timeLeft, setTimeLeft] = useState<number>(BLITZ_TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const roundStartTimeRef = useRef<number>(0);
  const isAnswered = selectedAnswer !== null;

  // Active pair and target word
  const currentPair = activeTopic.pairs[currentPairIndex % activeTopic.pairs.length];
  const targetWord = targetChoice === "A" ? currentPair.wordA : currentPair.wordB;
  const targetPhonetic = targetChoice === "A" ? currentPair.phoneticA : currentPair.phoneticB;

  // Sound play helper
  const playTargetSound = useCallback((wordToPlay = targetWord) => {
    stopTTS();
    speakLessonText(wordToPlay, { accent: "en-US", rate: 0.95 });
  }, [targetWord]);

  // Handle new round setup
  const initRound = useCallback(
    (roundNum: number, topic: MinimalPair = activeTopic) => {
      setSelectedAnswer(null);
      setTimeLeft(BLITZ_TIME_LIMIT);
      roundStartTimeRef.current = Date.now();

      const nextPairIdx = (roundNum - 1) % topic.pairs.length;
      const nextChoice: "A" | "B" = Math.random() > 0.5 ? "A" : "B";
      setCurrentPairIndex(nextPairIdx);
      setTargetChoice(nextChoice);

      const nextWord =
        nextChoice === "A"
          ? topic.pairs[nextPairIdx].wordA
          : topic.pairs[nextPairIdx].wordB;

      if (isAutoPlayEnabled) {
        setTimeout(() => {
          stopTTS();
          speakLessonText(nextWord, { accent: "en-US", rate: 0.95 });
        }, 220);
      }
    },
    [activeTopic, isAutoPlayEnabled]
  );

  // Reset entire match
  const startNewMatch = useCallback(
    (topic: MinimalPair = activeTopic, nextMode = gameMode) => {
      setCurrentRound(1);
      setHearts(3);
      setCurrentStreak(0);
      setMaxStreak(0);
      setCorrectAnswersCount(0);
      setMatchXpEarned(0);
      setMatchCoinsEarned(0);
      setReactionTimes([]);
      setRoundMistakes([]);
      setIsMatchFinished(false);
      setGameMode(nextMode);
      initRound(1, topic);
    },
    [activeTopic, gameMode, initRound]
  );

  // Switch topic
  const handleSelectTopic = useCallback(
    (topicId: string) => {
      const topic = MINIMAL_PAIRS.find((p) => p.id === topicId) || MINIMAL_PAIRS[0];
      setSelectedTopicId(topicId);
      setIsTopicMenuOpen(false);
      startNewMatch(topic);
    },
    [startNewMatch]
  );

  const currentTopicIndex = useMemo(() => {
    return MINIMAL_PAIRS.findIndex((p) => p.id === activeTopic.id);
  }, [activeTopic.id]);

  const handlePrevTopic = useCallback(() => {
    const prevIdx = (currentTopicIndex - 1 + MINIMAL_PAIRS.length) % MINIMAL_PAIRS.length;
    handleSelectTopic(MINIMAL_PAIRS[prevIdx].id);
  }, [currentTopicIndex, handleSelectTopic]);

  const handleNextTopic = useCallback(() => {
    const nextIdx = (currentTopicIndex + 1) % MINIMAL_PAIRS.length;
    handleSelectTopic(MINIMAL_PAIRS[nextIdx].id);
  }, [currentTopicIndex, handleSelectTopic]);

  // Timer loop for Blitz Mode
  useEffect(() => {
    if (gameMode !== "blitz" || isAnswered || isMatchFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.08) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return Math.max(0, prev - 0.05);
      });
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameMode, isAnswered, isMatchFinished, currentRound]);

  // Handle Timeout in Blitz Mode
  useEffect(() => {
    if (gameMode === "blitz" && timeLeft === 0 && selectedAnswer === null && !isMatchFinished) {
      setSelectedAnswer("timeout");
      playSfxWrong();
      setCurrentStreak(0);
      setReactionTimes((prev) => [...prev, BLITZ_TIME_LIMIT * 1000]);

      setRoundMistakes((prev) => [
        ...prev,
        {
          round: currentRound,
          wordA: currentPair.wordA,
          phoneticA: currentPair.phoneticA,
          meaningA: currentPair.meaningA,
          wordB: currentPair.wordB,
          phoneticB: currentPair.phoneticB,
          meaningB: currentPair.meaningB,
          correctChoice: targetChoice,
          userChoice: "timeout",
          targetWord,
          targetPhonetic,
        },
      ]);

      addToast({
        type: "warning",
        title: "Hết thời gian 6s! ⌛",
        message: `Từ cần nghe là "${targetWord}" (${targetPhonetic}).`,
      });
    }
  }, [
    timeLeft,
    gameMode,
    selectedAnswer,
    isMatchFinished,
    currentRound,
    currentPair,
    targetChoice,
    targetWord,
    targetPhonetic,
    addToast,
  ]);

  // Handle User Answer
  const handleAnswer = useCallback(
    (choice: "A" | "B") => {
      if (selectedAnswer !== null || isMatchFinished) return;

      const rawReactionTimeMs = Date.now() - roundStartTimeRef.current;
      // Clamp reaction time to a realistic range (150ms - 8000ms) to prevent idle/background tab inflating metrics
      const reactionTimeMs = Math.max(150, Math.min(rawReactionTimeMs, 8000));
      setReactionTimes((prev) => [...prev, reactionTimeMs]);

      setSelectedAnswer(choice);
      const isCorrect = choice === targetChoice;

      if (isCorrect) {
        const nextStreak = currentStreak + 1;
        setCurrentStreak(nextStreak);
        if (nextStreak > maxStreak) setMaxStreak(nextStreak);
        setCorrectAnswersCount((c) => c + 1);

        let earnedXp = 10;
        if (gameMode === "blitz" && reactionTimeMs < 2000) {
          earnedXp += 10;
        }
        if (nextStreak >= 5) {
          earnedXp += 5;
        }

        let earnedCoins = 0;
        if (nextStreak % 3 === 0) {
          earnedCoins = 5;
          awardCoins(5);
        }

        awardXp(earnedXp, "dictation");
        setMatchXpEarned((x) => x + earnedXp);
        setMatchCoinsEarned((c) => c + earnedCoins);

        if (nextStreak >= 3) {
          playSfxCombo(nextStreak);
        } else {
          playSfxCorrect();
        }

        addToast({
          type: "success",
          title: `Chính xác! (+${earnedXp} XP)${reactionTimeMs < 2000 ? " ⚡ Thần tốc!" : ""}`,
          message: `Từ "${targetWord}" trong ${(reactionTimeMs / 1000).toFixed(1)}s.`,
        });
      } else {
        setCurrentStreak(0);
        playSfxWrong();

        setRoundMistakes((prev) => [
          ...prev,
          {
            round: currentRound,
            wordA: currentPair.wordA,
            phoneticA: currentPair.phoneticA,
            meaningA: currentPair.meaningA,
            wordB: currentPair.wordB,
            phoneticB: currentPair.phoneticB,
            meaningB: currentPair.meaningB,
            correctChoice: targetChoice,
            userChoice: choice,
            targetWord,
            targetPhonetic,
          },
        ]);

        if (gameMode === "survival") {
          playSfxHeartLost();
          const remainingHearts = hearts - 1;
          setHearts(remainingHearts);

          if (remainingHearts <= 0) {
            setTimeout(() => {
              setIsMatchFinished(true);
              playSfxVictory();
            }, 600);
            return;
          }
        }

        addToast({
          type: "warning",
          title: "Chưa chính xác! 🎯",
          message: `Từ phát âm là "${targetWord}". Hãy nghe lại đối chiếu nhé!`,
        });
      }
    },
    [
      selectedAnswer,
      isMatchFinished,
      targetChoice,
      currentStreak,
      maxStreak,
      gameMode,
      currentRound,
      currentPair,
      targetWord,
      targetPhonetic,
      hearts,
      awardCoins,
      awardXp,
      addToast,
    ]
  );

  // Next round or complete match
  const handleNextRound = useCallback(() => {
    if (currentRound >= TOTAL_ROUNDS) {
      setIsMatchFinished(true);
      playSfxVictory();
    } else {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      initRound(nextRound);
    }
  }, [currentRound, initRound]);

  // Keyboard Shortcuts Ergonomics (1/A for choice A, 2/B for choice B, Space for repeat sound, Enter for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === "Escape") {
        setIsTopicMenuOpen(false);
        setIsReferenceDrawerOpen(false);
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        playTargetSound();
        return;
      }

      if (e.code === "Digit1" || e.code === "KeyA") {
        if (!isAnswered && !isMatchFinished) {
          handleAnswer("A");
        }
        return;
      }

      if (e.code === "Digit2" || e.code === "KeyB") {
        if (!isAnswered && !isMatchFinished) {
          handleAnswer("B");
        }
        return;
      }

      if (e.code === "Enter") {
        if (isAnswered && !isMatchFinished) {
          handleNextRound();
        } else if (isMatchFinished) {
          startNewMatch();
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isAnswered,
    isMatchFinished,
    handleAnswer,
    handleNextRound,
    startNewMatch,
    playTargetSound,
  ]);

  // Play sequential pair comparison A -> B with 450ms pause
  const handlePlaySequential = (p: MinimalPair["pairs"][0], idx: number) => {
    if (isPlayingSequential !== null) return;
    setIsPlayingSequential(idx);
    stopTTS();
    speakLessonText(p.wordA, { accent: "en-US", rate: 0.95 });

    setTimeout(() => {
      speakLessonText(p.wordB, { accent: "en-US", rate: 0.95 });
      setTimeout(() => {
        setIsPlayingSequential(null);
      }, 1000);
    }, 1100);
  };

  // Metrics for Summary Hub
  const accuracyPercentage = useMemo(() => {
    const totalAnswered =
      gameMode === "survival" && hearts <= 0
        ? currentRound
        : Math.min(currentRound, TOTAL_ROUNDS);
    if (totalAnswered === 0) return 0;
    return Math.round((correctAnswersCount / totalAnswered) * 100);
  }, [correctAnswersCount, currentRound, gameMode, hearts]);

  const avgReactionTimeSec = useMemo(() => {
    if (reactionTimes.length === 0) return 0;
    const sum = reactionTimes.reduce((a, b) => a + b, 0);
    return Number((sum / reactionTimes.length / 1000).toFixed(1));
  }, [reactionTimes]);

  const reactionSpeedInfo = useMemo(() => {
    if (avgReactionTimeSec <= 0) {
      return { label: "Chưa ghi nhận", color: "text-slate-400" };
    }
    if (avgReactionTimeSec < 1.8) {
      return { label: "⚡ Thần tốc", color: "text-sky-600 dark:text-sky-400" };
    }
    if (avgReactionTimeSec < 3.2) {
      return { label: "🚀 Nhanh nhạy", color: "text-blue-600 dark:text-blue-400" };
    }
    if (avgReactionTimeSec < 5.0) {
      return { label: "⏱️ Tiêu chuẩn", color: "text-slate-600 dark:text-slate-300" };
    }
    return { label: "🐢 Cần tăng tốc", color: "text-amber-600 dark:text-amber-400" };
  }, [avgReactionTimeSec]);

  const rankResult = useMemo(() => {
    if (accuracyPercentage >= 90) {
      return {
        rank: "S",
        title: "Bậc Thầy Thính Giác IPA",
        icon: "🏆",
        message: "Khả năng phân biệt cặp âm đạt chuẩn bản xứ tuyệt đối!",
      };
    }
    if (accuracyPercentage >= 80) {
      return {
        rank: "A",
        title: "Tai Nghe Siêu Đẳng",
        icon: "🥈",
        message: "Phản xạ âm học cực nhạy, chỉ nhầm lẫn ở vài chi tiết nhỏ.",
      };
    }
    if (accuracyPercentage >= 60) {
      return {
        rank: "B",
        title: "Tiến Bộ Vượt Bậc",
        icon: "🥉",
        message: "Nhận biết tốt âm cơ bản, cần rèn thêm tốc độ phản xạ.",
      };
    }
    return {
      rank: "C",
      title: "Cần Rèn Luyện Thêm",
      icon: "🛡️",
      message: "Hãy mở Sổ tay đối chiếu bên dưới để nắm vững khẩu hình miệng.",
    };
  }, [accuracyPercentage]);

  const comboMultiplier = useMemo(() => {
    if (currentStreak >= 8) return "x3.0";
    if (currentStreak >= 5) return "x2.0";
    if (currentStreak >= 3) return "x1.5";
    return "x1.0";
  }, [currentStreak]);

  // Blitz progress bar
  const timerProgress = (timeLeft / BLITZ_TIME_LIMIT) * 100;
  const timerBarColor =
    timeLeft > 3.5
      ? "bg-emerald-500"
      : timeLeft > 1.8
      ? "bg-amber-500"
      : "bg-rose-500 animate-pulse";

  return (
    <div className={`space-y-3 sm:space-y-3.5 select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. UNIFIED EXECUTIVE TOP DOCK (ALL-IN-ONE SINGLE ROW ~42px)               */}
      {/* ========================================================================= */}
      <div className="relative p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        {/* Left: Stepped Inline Topic Switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevTopic}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:text-[#0059bb]"
            title="Cặp âm trước đó"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsTopicMenuOpen((prev) => !prev)}
            className={`h-8.5 px-3 rounded-xl border text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
              isTopicMenuOpen
                ? "bg-[#0059bb] text-white border-[#0059bb] shadow-sm"
                : "bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            }`}
            title={isTopicMenuOpen ? "Đóng danh mục cặp âm" : "Mở danh mục 12 cặp âm đối chiếu"}
          >
            <Swords className={`w-3.5 h-3.5 ${isTopicMenuOpen ? "text-white" : "text-[#0059bb] dark:text-sky-400"}`} />
            <span className={`font-mono text-xs font-bold ${isTopicMenuOpen ? "text-white" : "text-[#0059bb] dark:text-sky-400"}`}>
              /{activeTopic.soundA}/ vs /{activeTopic.soundB}/
            </span>
            <span className={`font-normal hidden md:inline ${isTopicMenuOpen ? "text-blue-100" : "text-slate-400"}`}>
              ({activeTopic.pairs[0].wordA} vs {activeTopic.pairs[0].wordB})
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isTopicMenuOpen ? "rotate-180 text-white" : "text-slate-400"}`} />
          </button>

          <button
            type="button"
            onClick={handleNextTopic}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:text-[#0059bb]"
            title="Cặp âm tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Mode Segmented Pill Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => startNewMatch(activeTopic, "blitz")}
            className={`h-7.5 px-2.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              gameMode === "blitz"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
            }`}
            title="Chế độ 6 giây phản xạ và chuỗi combo"
          >
            <Zap className={`w-3.5 h-3.5 ${gameMode === "blitz" ? "text-amber-500 fill-amber-500" : "text-slate-400"}`} />
            <span>Thần Tốc</span>
          </button>

          <button
            type="button"
            onClick={() => startNewMatch(activeTopic, "survival")}
            className={`h-7.5 px-2.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              gameMode === "survival"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
            }`}
            title="Chế độ 3 mạng sinh tồn"
          >
            <Heart className={`w-3.5 h-3.5 ${gameMode === "survival" ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
            <span>Sinh Tồn</span>
          </button>

          <button
            type="button"
            onClick={() => startNewMatch(activeTopic, "zen")}
            className={`h-7.5 px-2.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              gameMode === "zen"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-bold shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
            }`}
            title="Huấn luyện sâu không áp lực"
          >
            <Compass className={`w-3.5 h-3.5 ${gameMode === "zen" ? "text-[#0059bb]" : "text-slate-400"}`} />
            <span>Huấn Luyện</span>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Indicator */}
          {gameMode === "survival" ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50">
              {[1, 2, 3].map((h) => (
                <Heart
                  key={h}
                  className={`w-3.5 h-3.5 ${
                    h <= hearts
                      ? "fill-rose-500 text-rose-500"
                      : "fill-slate-300 dark:fill-slate-700 text-slate-300 opacity-30"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs">
              <Flame
                className={`w-3.5 h-3.5 ${
                  currentStreak >= 5
                    ? "fill-amber-500 text-amber-500 animate-pulse"
                    : "fill-amber-400 text-amber-400"
                }`}
              />
              <span>
                {currentStreak}{" "}
                <span className="text-[10px] text-amber-600/80 font-black">
                  ({comboMultiplier})
                </span>
              </span>
            </div>
          )}

          {/* SFX Mute Button */}
          <button
            type="button"
            onClick={() => {
              const muted = toggleSfxMute();
              setIsSfxMuted(muted);
            }}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              !isSfxMuted
                ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-300"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
            }`}
            title={isSfxMuted ? "Bật âm thanh SFX" : "Tắt âm thanh SFX"}
          >
            {isSfxMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Reference Book Button */}
          <button
            type="button"
            onClick={() => setIsReferenceDrawerOpen((prev) => !prev)}
            className={`h-8 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              isReferenceDrawerOpen
                ? "bg-[#0059bb] text-white border-[#0059bb] shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
            title="Mở hoặc thu gọn Sổ tay 12 cặp từ & Mẹo khẩu hình"
          >
            <BookOpen className={`w-3.5 h-3.5 ${isReferenceDrawerOpen ? "text-white" : "text-[#0059bb] dark:text-sky-400"}`} />
            <span className="hidden md:inline">
              {isReferenceDrawerOpen ? "Đóng Sổ tay" : "Sổ tay từ & Mẹo"}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLAT INTEGRATED TOPICS DECK (KHUNG DANH MỤC PHẲNG LIỀN MẠCH)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isTopicMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="p-3.5 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 flex items-center justify-center text-[#0059bb] dark:text-sky-400">
                    <Swords className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">
                      Danh Mục 12 Cặp Âm Đối Chiếu
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Chọn trực tiếp cặp âm bạn muốn rèn luyện tai nghe và phản xạ
                    </p>
                  </div>
                </div>

                {/* Sub category filter tabs - NO text wrapping! */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                  <button
                    type="button"
                    onClick={() => setTopicMenuCategory("all")}
                    className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      topicMenuCategory === "all"
                        ? "bg-[#0059bb] text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    Tất cả (12)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicMenuCategory("vowels")}
                    className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      topicMenuCategory === "vowels"
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    🔵 Nguyên âm (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicMenuCategory("voicing")}
                    className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      topicMenuCategory === "voicing"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    🟢 Hữu/Vô thanh (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicMenuCategory("fricatives")}
                    className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      topicMenuCategory === "fricatives"
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    🟣 Phụ âm (4)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTopicMenuOpen(false)}
                    className="h-7.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ml-1"
                    title="Thu gọn danh mục"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Thu gọn</span>
                  </button>
                </div>
              </div>

              {/* Grid 12 Pairs - Flat & Spacious, NO clunky scrollbar, NO half-cut cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
                {filteredTopics.map((topic) => {
                  const isSelected = topic.id === activeTopic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectTopic(topic.id)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border cursor-pointer group ${
                        isSelected
                          ? "bg-[#0059bb] text-white border-[#0059bb] shadow-sm ring-2 ring-blue-400/20"
                          : "bg-slate-50/80 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800 hover:border-[#0059bb]/50 text-slate-800 dark:text-slate-200 hover:shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs sm:text-sm font-bold ${
                          isSelected ? "text-white" : "text-slate-900 dark:text-white group-hover:text-[#0059bb]"
                        }`}>
                          /{topic.soundA}/ vs /{topic.soundB}/
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSelected
                            ? "bg-blue-700/60 text-blue-100"
                            : "bg-slate-200/60 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}>
                          {topic.pairs.length} cặp
                        </span>
                      </div>
                      <div
                        className={`text-xs mt-1 truncate ${
                          isSelected ? "text-blue-100 font-medium" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {topic.pairs[0].wordA} vs {topic.pairs[0].wordB}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MAIN ARENA CONTAINER (BALANCED & ERGONOMIC BENTO CARD)                 */}
      {/* ========================================================================= */}
      <div className="relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
        {/* Blitz Top Hairline Progress Bar */}
        {gameMode === "blitz" && !isMatchFinished && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ease-linear ${timerBarColor}`}
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        )}

        {isMatchFinished ? (
          /* ========================================================================= */
          /* MÀN HÌNH TỔNG KẾT GỌN GÀNG (MATCH SUMMARY HUB)                             */
          /* ========================================================================= */
          <div className="space-y-4 py-2 max-w-2xl sm:max-w-3xl mx-auto w-full">
            {/* Rank Victory Banner */}
            <div className="text-center py-4 px-5 rounded-2xl bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50/50 dark:from-slate-800/80 dark:via-blue-950/20 dark:to-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2">
              <div className="w-13 h-13 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center justify-center text-3xl">
                {rankResult.icon}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#0059bb]/10 text-[#0059bb] dark:bg-blue-900/40 dark:text-sky-300 border border-[#0059bb]/20">
                <Award className="w-3.5 h-3.5" />
                <span>Xếp Hạng: Rank {rankResult.rank}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                {rankResult.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto font-medium">
                {rankResult.message}
              </p>
            </div>

            {/* 4 Compact Bento Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-center shadow-2xs">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Độ chính xác</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display mt-0.5">
                  {accuracyPercentage}%
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {correctAnswersCount}/{currentRound} đúng
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-center shadow-2xs">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phản xạ TB</div>
                <div className="text-2xl font-black text-[#0059bb] dark:text-sky-400 font-display mt-0.5">
                  {avgReactionTimeSec}s
                </div>
                <div className={`text-[11px] font-bold mt-0.5 ${reactionSpeedInfo.color}`}>
                  {reactionSpeedInfo.label}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-center shadow-2xs">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chuỗi đỉnh</div>
                <div className="text-2xl font-black text-amber-500 font-display flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-5 h-5 fill-amber-500" />
                  <span>x{maxStreak}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Combo tối đa</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-center shadow-2xs">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phần thưởng</div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-display mt-0.5">
                  +{matchXpEarned} XP
                </div>
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                  +{matchCoinsEarned} Vàng
                </div>
              </div>
            </div>

            {/* Acoustic Blindspots List */}
            {roundMistakes.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <span>Điểm Mù Cần Rút Kinh Nghiệm ({roundMistakes.length} câu)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Bấm loa để nghe đối chiếu</span>
                </div>

                <div className="space-y-2">
                  {roundMistakes.map((m, idx) => {
                    const isTargetA = m.wordA.toLowerCase() === m.targetWord.toLowerCase();
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            #{m.round}
                          </span>
                          <span className="text-slate-500 font-medium">Cần nghe:</span>
                          <strong className="capitalize text-slate-900 dark:text-white text-sm">
                            {m.targetWord}
                          </strong>
                          <span className="font-mono font-bold text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60">
                            {m.targetPhonetic}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                          <IpaAudioPlayButton
                            text={m.wordA}
                            label={`${m.wordA.charAt(0).toUpperCase() + m.wordA.slice(1)} ${m.phoneticA}`}
                            size="sm"
                            variant="secondary"
                            className={`text-xs ${
                              isTargetA
                                ? "!border-[#0059bb]/50 dark:!border-blue-700 !bg-blue-50/80 dark:!bg-blue-950/40 text-[#0059bb] dark:text-sky-300 font-bold"
                                : ""
                            }`}
                          />
                          <span className="text-slate-300 dark:text-slate-600 font-bold text-[10px]">vs</span>
                          <IpaAudioPlayButton
                            text={m.wordB}
                            label={`${m.wordB.charAt(0).toUpperCase() + m.wordB.slice(1)} ${m.phoneticB}`}
                            size="sm"
                            variant="secondary"
                            className={`text-xs ${
                              !isTargetA
                                ? "!border-[#0059bb]/50 dark:!border-blue-700 !bg-blue-50/80 dark:!bg-blue-950/40 text-[#0059bb] dark:text-sky-300 font-bold"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => startNewMatch()}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 border border-slate-200/70 dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Chơi Lại</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  ↵ Enter
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = MINIMAL_PAIRS.findIndex((p) => p.id === activeTopic.id);
                  const nextIndex = (currentIndex + 1) % MINIMAL_PAIRS.length;
                  handleSelectTopic(MINIMAL_PAIRS[nextIndex].id);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>Cặp Tiếp Theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* MÀN HÌNH ĐẤU TRƯỜNG ĐANG CHƠI (BALANCED ERGONOMIC BATTLE STAGE)           */
          /* ========================================================================= */
          <div className="space-y-3.5 sm:space-y-4 max-w-2xl sm:max-w-3xl mx-auto w-full">
            {/* HUD Status Line */}
            <div className="flex items-center justify-between text-xs sm:text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/70 dark:border-blue-800/60">
                  Hiệp {currentRound} / {TOTAL_ROUNDS}
                </span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
                  {activeTopic.category === "vowels"
                    ? "Nguyên âm đối chiếu"
                    : activeTopic.category === "voicing"
                    ? "Hữu thanh vs Vô thanh"
                    : "Phụ âm đối chiếu"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {gameMode === "blitz" && (
                  <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{timeLeft.toFixed(1)}s</span>
                  </div>
                )}
                <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black border border-emerald-200/70 dark:border-emerald-800/60">
                  Đúng {correctAnswersCount}
                </div>
              </div>
            </div>

            {/* Central Acoustic Pulse Orb */}
            <div className="text-center py-2 sm:py-2.5 space-y-1.5 relative">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => playTargetSound()}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#0059bb] to-blue-500 hover:from-[#004ba0] hover:to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
                  title="Nhấn Space hoặc chạm để nghe lại"
                >
                  <span className="absolute -inset-2 rounded-full bg-blue-500/20 animate-ping pointer-events-none opacity-40" />
                  <Volume2 className="w-8 h-8 sm:w-8.5 sm:h-8.5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5">
                <span>Bấm</span>
                <kbd className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-black border border-slate-200 dark:border-slate-700 shadow-2xs">Space</kbd>
                <span>hoặc chạm loa để nghe lại</span>
              </div>

              {/* Zen Mode Sound Previews */}
              {gameMode === "zen" && !isAnswered && (
                <div className="pt-0.5 flex items-center justify-center gap-2 text-xs">
                  <IpaAudioPlayButton
                    text={currentPair.wordA}
                    label={`Mẫu A: "${currentPair.wordA}"`}
                    size="sm"
                    variant="secondary"
                  />
                  <span className="text-slate-300 font-bold">vs</span>
                  <IpaAudioPlayButton
                    text={currentPair.wordB}
                    label={`Mẫu B: "${currentPair.wordB}"`}
                    size="sm"
                    variant="secondary"
                  />
                </div>
              )}
            </div>

            {/* 2 Ergonomic Choice Cards (A vs B) - Side by Side */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* CARD A */}
              <button
                type="button"
                onClick={() => handleAnswer("A")}
                disabled={isAnswered}
                className={`p-3.5 sm:p-4.5 rounded-2xl border-2 text-center transition-all cursor-pointer select-none relative overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[145px] ${
                  !isAnswered
                    ? "bg-slate-50/60 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] hover:shadow-sm active:scale-[0.99]"
                    : selectedAnswer === "A"
                    ? targetChoice === "A"
                      ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400/30 shadow-xs"
                      : "bg-rose-50/90 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400/30 shadow-xs"
                    : targetChoice === "A"
                    ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/80 text-slate-900 dark:text-white ring-1 ring-emerald-400/30"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-black border border-slate-200 dark:border-slate-700 shadow-2xs">1</kbd>
                    <span>Đáp án A</span>
                  </span>
                  {isAnswered && targetChoice === "A" && (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      ✓ Đúng
                    </span>
                  )}
                  {isAnswered && selectedAnswer === "A" && targetChoice !== "A" && (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      ✕ Đã chọn
                    </span>
                  )}
                </div>

                <div className="my-1.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white capitalize font-display leading-tight tracking-tight">
                      {currentPair.wordA}
                    </span>
                    {isAnswered && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          stopTTS();
                          speakLessonText(currentPair.wordA, { accent: "en-US", rate: 0.95 });
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-[#0059bb] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={`Nghe lại từ: ${currentPair.wordA}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-mono text-[#0059bb] dark:text-sky-400 font-bold mt-0.5">
                    {currentPair.phoneticA}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {currentPair.meaningA}
                </div>
              </button>

              {/* CARD B */}
              <button
                type="button"
                onClick={() => handleAnswer("B")}
                disabled={isAnswered}
                className={`p-3.5 sm:p-4.5 rounded-2xl border-2 text-center transition-all cursor-pointer select-none relative overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[145px] ${
                  !isAnswered
                    ? "bg-slate-50/60 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] hover:shadow-sm active:scale-[0.99]"
                    : selectedAnswer === "B"
                    ? targetChoice === "B"
                      ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-400/30 shadow-xs"
                      : "bg-rose-50/90 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400/30 shadow-xs"
                    : targetChoice === "B"
                    ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/80 text-slate-900 dark:text-white ring-1 ring-emerald-400/30"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-black border border-slate-200 dark:border-slate-700 shadow-2xs">2</kbd>
                    <span>Đáp án B</span>
                  </span>
                  {isAnswered && targetChoice === "B" && (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      ✓ Đúng
                    </span>
                  )}
                  {isAnswered && selectedAnswer === "B" && targetChoice !== "B" && (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      ✕ Đã chọn
                    </span>
                  )}
                </div>

                <div className="my-1.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white capitalize font-display leading-tight tracking-tight">
                      {currentPair.wordB}
                    </span>
                    {isAnswered && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          stopTTS();
                          speakLessonText(currentPair.wordB, { accent: "en-US", rate: 0.95 });
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-[#0059bb] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={`Nghe lại từ: ${currentPair.wordB}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-mono text-[#0059bb] dark:text-sky-400 font-bold mt-0.5">
                    {currentPair.phoneticB}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {currentPair.meaningB}
                </div>
              </button>
            </div>

            {/* Bottom Action & Feedback Bar */}
            <div className="min-h-[42px] flex items-center justify-between">
              {!isAnswered ? (
                <div className="w-full text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-1 font-medium flex items-center justify-center gap-2.5">
                  <span>Phím <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">1</kbd> Chọn A</span>
                  <span className="text-slate-300">•</span>
                  <span>Phím <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">2</kbd> Chọn B</span>
                  <span className="text-slate-300">•</span>
                  <span>Phím <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">Space</kbd> Nghe lại</span>
                </div>
              ) : (
                <div className={`w-full p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${
                  selectedAnswer === targetChoice
                    ? "bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/70"
                    : selectedAnswer === "timeout"
                    ? "bg-amber-50/90 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/70"
                    : "bg-rose-50/90 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/70"
                }`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    {selectedAnswer === targetChoice ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : selectedAnswer === "timeout" ? (
                      <Clock className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <span className="truncate text-xs sm:text-sm">
                      {selectedAnswer === targetChoice ? (
                        <span className="text-emerald-900 dark:text-emerald-200 font-medium">
                          Chính xác! Từ đúng là: <strong className="uppercase font-black text-[#0059bb] dark:text-sky-400">{targetWord}</strong> <span className="font-mono text-slate-500 font-normal">({targetPhonetic})</span>
                        </span>
                      ) : selectedAnswer === "timeout" ? (
                        <span className="text-amber-900 dark:text-amber-200 font-medium">
                          Hết giờ! Từ đúng là: <strong className="uppercase font-black text-[#0059bb] dark:text-sky-400">{targetWord}</strong> <span className="font-mono text-slate-500 font-normal">({targetPhonetic})</span>
                        </span>
                      ) : (
                        <span className="text-rose-900 dark:text-rose-200 font-medium">
                          Chưa đúng! Từ đúng là: <strong className="uppercase font-black text-[#0059bb] dark:text-sky-400">{targetWord}</strong> <span className="font-mono text-slate-500 font-normal">({targetPhonetic})</span>
                        </span>
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextRound}
                    className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all shrink-0"
                  >
                    <span>{currentRound >= TOTAL_ROUNDS ? "Xem Tổng Kết" : "Tiếp theo"}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-xs">↵</kbd>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. INLINE COLLAPSIBLE REFERENCE PANEL (KHUNG MỞ RỘNG PHẲNG TÍCH HỢP)       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isReferenceDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 flex items-center justify-center text-[#0059bb] dark:text-sky-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <span>Sổ Tay Đối Chiếu: /{activeTopic.soundA}/ vs /{activeTopic.soundB}/</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                      {activeTopic.category === "vowels"
                        ? "Nguyên âm"
                        : activeTopic.category === "voicing"
                        ? "Hữu / Vô thanh"
                        : "Phụ âm"}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tra cứu mẹo khẩu hình và luyện tai nghe phân biệt từng cặp từ đối lập (không làm gián đoạn ván đấu)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsReferenceDrawerOpen(false)}
                className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Thu gọn sổ tay"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Thu gọn</span>
              </button>
            </div>

            {/* Anatomy tip callout */}
            {activeTopic.anatomyTip && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/40 dark:from-blue-950/40 dark:to-indigo-950/20 border border-blue-200/70 dark:border-blue-800/50 flex items-start gap-2.5 text-xs">
                <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="font-bold text-slate-900 dark:text-white block">
                    Mẹo Phân Biệt Khẩu Hình Chuẩn:
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeTopic.anatomyTip}
                  </p>
                </div>
              </div>
            )}

            {/* Compact Audio Comparison Pills Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 text-[11px]">
                  Danh Sách {activeTopic.pairs.length} Cặp Từ Đối Chiếu Trực Quan:
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Chạm nút <strong className="text-[#0059bb] dark:text-sky-400">So sánh</strong> để nghe liên tiếp A ➔ B
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeTopic.pairs.map((p, idx) => {
                  const isPlaying = isPlayingSequential === idx;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/60 transition-all flex items-center justify-between gap-2 text-xs"
                    >
                      {/* Word A */}
                      <div className="min-w-0 flex-1">
                        <div className="font-black capitalize text-slate-900 dark:text-white text-sm leading-tight truncate">
                          {p.wordA}
                        </div>
                        <div className="font-mono text-[#0059bb] dark:text-sky-400 text-[11px] font-bold truncate">
                          {p.phoneticA}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{p.meaningA}</div>
                      </div>

                      {/* Center Comparison Trigger */}
                      <button
                        type="button"
                        onClick={() => handlePlaySequential(p, idx)}
                        disabled={isPlaying}
                        className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                          isPlaying
                            ? "bg-[#0059bb] text-white border-[#0059bb] animate-pulse"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#0059bb] hover:border-blue-300 shadow-2xs"
                        }`}
                        title={`Nghe đối chiếu: "${p.wordA}" ➔ "${p.wordB}"`}
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{isPlaying ? "Phát..." : "So sánh"}</span>
                      </button>

                      {/* Word B */}
                      <div className="min-w-0 flex-1 text-right">
                        <div className="font-black capitalize text-slate-900 dark:text-white text-sm leading-tight truncate">
                          {p.wordB}
                        </div>
                        <div className="font-mono text-[#0059bb] dark:text-sky-400 text-[11px] font-bold truncate">
                          {p.phoneticB}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{p.meaningB}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Dynamic Balanced Tip Capsule (Triệt tiêu lỗ hổng khi số lượng thẻ bị lẻ) */}
                {activeTopic.pairs.length % 3 !== 0 && (
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/30 dark:to-indigo-950/20 border border-dashed border-blue-200/90 dark:border-blue-800/60 flex items-center gap-2.5 text-xs">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center shrink-0 shadow-2xs">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 dark:text-white text-[11px]">
                        Mẹo Luyện Tai Nghe
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        Chú ý độ căng cơ môi và trường độ âm khi phát âm hai âm đối chiếu này.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
