"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  SkipForward,
  HelpCircle,
  Delete,
} from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { SentenceScramblePackage, GameReviewItem } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { triggerHaptic } from "../../utils/gameFx";
import { GameResultScreen } from "../shared/GameResultScreen";
import { recordGameSession } from "../../utils/recordGameSession";
import { safeSpeakText } from "@/shared/utils/mobileAudio";

export interface SentenceBuilderGameProps {
  pool: any[];
  onBack: () => void;
  backLabel?: string;
  fullWidth?: boolean;
}

interface WordToken {
  id: number;
  word: string;
  isUsed: boolean;
}

interface SentenceCandidate {
  sentence: string;
  translationVn: string;
  word?: string;
}

const FALLBACK_SENTENCES: SentenceCandidate[] = [
  {
    sentence: "Consistency is the key to mastering English vocabulary.",
    translationVn: "Sự kiên trì là chìa khóa để làm chủ vốn từ vựng tiếng Anh.",
  },
  {
    sentence: "Practicing everyday helps you build a strong habit.",
    translationVn: "Luyện tập mỗi ngày giúp bạn xây dựng một thói quen vững chắc.",
  },
  {
    sentence: "She is passionate about exploring new cultures and languages.",
    translationVn: "Cô ấy rất đam mê tìm hiểu các nền văn hóa và ngôn ngữ mới.",
  },
  {
    sentence: "Technology plays an essential role in modern education.",
    translationVn: "Công nghệ đóng một vai trò thiết yếu trong nền giáo dục hiện đại.",
  },
  {
    sentence: "We should focus on improving our communication skills.",
    translationVn: "Chúng ta nên tập trung vào việc nâng cao kỹ năng giao tiếp của mình.",
  },
];

const TOTAL_ROUNDS = 5;
const HINT_COST = 5;

export function SentenceBuilderGame({
  pool,
  onBack,
  backLabel,
  fullWidth = false,
}: SentenceBuilderGameProps) {
  const { addToast } = useNotificationStore();

  const [packages, setPackages] = useState<SentenceScramblePackage[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableTokens, setAvailableTokens] = useState<WordToken[]>([]);
  const [placedTokens, setPlacedTokens] = useState<WordToken[]>([]);

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

  const speakSentence = (sentence: string) => {
    safeSpeakText(sentence, { lang: "en-US", rate: 0.88 });
  };

  // Generate sentences
  const generateSentences = useCallback(() => {
    const extracted: { sentence: string; translationVn: string; word?: string }[] = [];

    (pool || []).forEach((item) => {
      if (item.examples && item.examples.length > 0) {
        const example = item.examples[0];
        const translation = item.exampleTranslations?.[0] || item.definitionVn;
        // Clean and validate sentence
        const words = example.trim().split(/\s+/);
        if (words.length >= 4 && words.length <= 10) {
          extracted.push({
            sentence: example.trim(),
            translationVn: translation,
            word: item.word,
          });
        }
      }
    });

    const candidates = extracted.length >= TOTAL_ROUNDS ? extracted : FALLBACK_SENTENCES;
    const shuffled = [...candidates].sort(() => 0.5 - Math.random()).slice(0, TOTAL_ROUNDS);

    const pkgs: SentenceScramblePackage[] = shuffled.map((item, idx) => {
      // Tokenize by removing trailing punctuation for matching
      const rawTokens = item.sentence.replace(/[.?!,;:]/g, "").split(/\s+/);
      return {
        id: String(idx),
        originalSentence: item.sentence,
        translationVn: item.translationVn,
        tokens: rawTokens,
        hintWord: item.word,
      };
    });

    setPackages(pkgs);
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
    setReviewItems([]);
    setRewards({ xp: 0, coins: 0 });
    startTimeRef.current = Date.now();
  }, [pool]);

  useEffect(() => {
    generateSentences();
  }, [generateSentences]);

  // Setup current round tokens
  const setupTokens = useCallback((pkg?: SentenceScramblePackage) => {
    if (!pkg) return;
    const raw = pkg.tokens.map((word, id) => ({
      id,
      word,
      isUsed: false,
    }));
    // Shuffle available tokens
    setAvailableTokens([...raw].sort(() => 0.5 - Math.random()));
    setPlacedTokens([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (packages[currentIdx]) {
      setupTokens(packages[currentIdx]);
    }
  }, [currentIdx, packages, setupTokens]);

  // Click available token
  const handleSelectToken = (token: WordToken) => {
    if (feedback !== null || token.isUsed) return;
    triggerHaptic("tap");
    gameAudio.playTap();

    setAvailableTokens((prev) =>
      prev.map((t) => (t.id === token.id ? { ...t, isUsed: true } : t))
    );
    setPlacedTokens((prev) => [...prev, token]);
  };

  // Remove placed token
  const handleRemovePlacedToken = (token: WordToken, index: number) => {
    if (feedback !== null) return;
    triggerHaptic("tap");
    gameAudio.playTap();

    setPlacedTokens((prev) => prev.filter((_, i) => i !== index));
    setAvailableTokens((prev) =>
      prev.map((t) => (t.id === token.id ? { ...t, isUsed: false } : t))
    );
  };

  // Reset tokens
  const handleClearAll = () => {
    if (feedback !== null) return;
    triggerHaptic("tap");
    gameAudio.playTap();
    setAvailableTokens((prev) => prev.map((t) => ({ ...t, isUsed: false })));
    setPlacedTokens([]);
  };

  // Hint next word
  const handleHintNext = () => {
    const pkg = packages[currentIdx];
    if (!pkg || feedback !== null) return;

    const currentPlacedLen = placedTokens.length;
    if (currentPlacedLen < pkg.tokens.length) {
      const nextWord = pkg.tokens[currentPlacedLen];
      const match = availableTokens.find((t) => !t.isUsed && t.word.toLowerCase() === nextWord.toLowerCase());
      if (match) {
        setScore((s) => Math.max(0, s - HINT_COST));
        handleSelectToken(match);
      }
    }
  };

  // Check Answer
  const handleSubmit = useCallback(() => {
    const pkg = packages[currentIdx];
    if (!pkg || feedback !== null) return;

    const userSentence = placedTokens.map((t) => t.word).join(" ");
    const expectedSentence = pkg.tokens.join(" ");

    const isCorrect =
      userSentence.toLowerCase().trim() === expectedSentence.toLowerCase().trim();

    const review: GameReviewItem = {
      id: pkg.id,
      word: pkg.originalSentence,
      definitionVn: pkg.translationVn,
      isCorrect,
      userAnswer: userSentence,
      correctAnswer: pkg.originalSentence,
    };
    setReviewItems((prev) => [...prev, review]);

    if (isCorrect) {
      triggerHaptic("success");
      gameAudio.playCorrectDing();
      speakSentence(pkg.originalSentence);
      setScore((s) => s + 20);
      setFeedback("correct");
    } else {
      triggerHaptic("warning");
      gameAudio.playWrongBuzzer();
      setFeedback("wrong");
    }

  }, [currentIdx, packages, placedTokens, feedback]);

  // Continue to next sentence (người học tự bấm sau khi đọc đáp án)
  const handleContinue = useCallback(() => {
    if (feedback === null) return;
    if (currentIdx + 1 < packages.length) {
      setCurrentIdx((c) => c + 1);
    } else {
      setGameOver(true);
    }
  }, [feedback, currentIdx, packages.length]);

  // Skip sentence
  const handleSkip = useCallback(() => {
    const pkg = packages[currentIdx];
    if (!pkg || feedback !== null) return;

    triggerHaptic("warning");
      gameAudio.playWrongBuzzer();

    const review: GameReviewItem = {
      id: pkg.id,
      word: pkg.originalSentence,
      definitionVn: pkg.translationVn,
      isCorrect: false,
      userAnswer: "Bỏ qua",
      correctAnswer: pkg.originalSentence,
    };
    setReviewItems((prev) => [...prev, review]);

    if (currentIdx + 1 < packages.length) {
      setCurrentIdx((c) => c + 1);
    } else {
      setGameOver(true);
    }
  }, [currentIdx, packages, feedback]);

  // Game over sync
  useEffect(() => {
    if (gameOver) {
      triggerHaptic("victory");
      gameAudio.playVictoryFanfare();
      const correctCount = reviewItems.filter((i) => i.isCorrect).length;
      const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      setDurationSeconds(duration);

      recordGameSession({
        gameType: "sentence",
        score,
        durationSeconds: duration,
        wordsCompleted: correctCount,
      }).then((res) => {
        if (res.success && (res.xpGained > 0 || res.coinsGained > 0)) {
          setRewards({ xp: res.xpGained, coins: res.coinsGained });
          addToast({
            type: "info",
            title: `+${res.xpGained} XP & +${res.coinsGained} Vàng!`,
            message: `Hoàn tất Sentence Builder: Ghép đúng ${correctCount}/${packages.length} câu!`,
          });
        }
      });
    }
  }, [gameOver, score, addToast, reviewItems, packages.length]);

  if (gameOver) {
    const correctCount = reviewItems.filter((i) => i.isCorrect).length;
    const accuracy = packages.length > 0 ? Math.round((correctCount / packages.length) * 100) : 100;

    return (
      <GameResultScreen
        title="Sentence Builder Hoàn Thành!"
        subtitle={`Bạn đã sắp xếp chính xác ${correctCount}/${packages.length} câu tiếng Anh chuẩn cấu trúc và ngữ pháp.`}
        score={score}
        xpEarned={rewards.xp}
        coinsEarned={rewards.coins}
        accuracy={accuracy}
        durationSeconds={durationSeconds || 1}
        maxCombo={correctCount}
        reviewItems={reviewItems}
        backLabel={backLabel}
        onBack={onBack}
        onRestart={generateSentences}
      />
    );
  }

  const currentPkg = packages[currentIdx];


  const progressPct = packages.length
    ? ((currentIdx + (feedback ? 1 : 0)) / packages.length) * 100
    : 0;

  const slotCount = currentPkg ? currentPkg.tokens.length : 0;
  const canSubmit =
    slotCount > 0 && placedTokens.length === slotCount && feedback === null;

  // Vị trí các từ đặt sai (để tô riêng khi chấm sai)
  const wrongPositions = new Set<number>();
  if (feedback === "wrong" && currentPkg) {
    placedTokens.forEach((tk, i) => {
      if (tk.word.toLowerCase() !== (currentPkg.tokens[i] || "").toLowerCase()) {
        wrongPositions.add(i);
      }
    });
  }

  // Duolingo 3D tactile tile base (đồng bộ với nút chặng trên Roadmap)
  const tileBase =
    "rounded-xl border-2 border-b-4 text-sm sm:text-base font-bold font-display transition-all duration-100 select-none";

  const trayTone =
    feedback === "correct"
      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700"
      : feedback === "wrong"
      ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700"
      : "border-[#0059bb] bg-blue-50 text-[#0059bb] hover:bg-blue-100 cursor-pointer active:translate-y-[2px] active:border-b-2 dark:bg-blue-950/50 dark:text-sky-300 dark:border-sky-700";

  const ghostBtn =
    "h-11 px-4 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-bold font-display uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-4";

  return (
    <div className={`select-none w-full mx-auto flex flex-col gap-4 sm:gap-5 ${fullWidth ? "" : "max-w-2xl"}`}>
      {/* 1. Top bar: Mute + chunky progress + score */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleAudio}
          title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="w-11 h-11 shrink-0 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
          )}
        </button>

        {/* Chunky progress bar */}
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

        <div className="shrink-0 h-11 px-3 rounded-xl bg-amber-100 dark:bg-amber-950/50 border-2 border-b-4 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-black font-display text-sm tabular-nums">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
          {score}
        </div>

        <button
          type="button"
          onClick={generateSentences}
          title="Làm mới ván mới"
          className="w-11 h-11 shrink-0 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2"
        >
          <RotateCcw className="w-4 h-4 text-slate-500 stroke-[2.4]" />
        </button>
      </div>

      {/* 2. Main sentence stage */}
      <AnimatePresence mode="wait">
        {currentPkg && (
          <motion.div
            key={`sentence-${currentIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Prompt header */}
            <div className="flex items-center justify-between gap-2 px-1">
              <h2 className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
                Dịch câu này sang tiếng Anh
              </h2>
              <span className="text-[11px] sm:text-xs font-black font-display uppercase tracking-wider text-slate-400 tabular-nums">
                Câu {currentIdx + 1}/{packages.length}
              </span>
            </div>

            {/* Meaning cue (speech bubble) */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0059bb] border-b-4 border-[#003d82] flex items-center justify-center text-2xl shadow-md shadow-[#0059bb]/20">
                <span aria-hidden>🦉</span>
              </div>
              <div className="relative flex-1 min-w-0 p-3.5 sm:p-4 rounded-2xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="absolute -left-[7px] top-5 w-3 h-3 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200 dark:border-slate-700" />
                <p className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white leading-relaxed">
                  {currentPkg.translationVn}
                </p>
              </div>
            </div>

            {/* Answer tray */}
            <motion.div
              animate={feedback === "wrong" ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
              className={`p-3 sm:p-4 rounded-2xl border-2 border-b-4 bg-white dark:bg-slate-900 transition-colors ${
                feedback === "correct"
                  ? "border-emerald-300 dark:border-emerald-800"
                  : feedback === "wrong"
                  ? "border-rose-300 dark:border-rose-800"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-black font-display uppercase tracking-wider text-slate-400">
                  Câu của bạn
                </span>
                <button
                  type="button"
                  onClick={handleHintNext}
                  disabled={feedback !== null}
                  title={`Điền sẵn từ tiếp theo (trừ ${HINT_COST} điểm)`}
                  className="min-h-[44px] px-3 -my-2 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:bg-amber-50 dark:hover:bg-amber-950/30 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Gợi ý (−{HINT_COST})</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[56px] content-start">
                {Array.from({ length: slotCount }).map((_, i) => {
                  const token = placedTokens[i];
                  return token ? (
                    <motion.button
                      key={`placed-${token.id}-${i}`}
                      type="button"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => handleRemovePlacedToken(token, i)}
                      className={`h-11 px-4 ${tileBase} ${
                        wrongPositions.has(i)
                          ? "border-rose-500 bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700 underline decoration-wavy decoration-rose-400 underline-offset-4"
                          : trayTone
                      }`}
                    >
                      {token.word}
                    </motion.button>
                  ) : (
                    <div
                      key={`slot-${i}`}
                      style={{
                        width: Math.min(
                          120,
                          Math.max(48, (currentPkg?.tokens[i]?.length || 4) * 9 + 30)
                        ),
                      }}
                      className="h-11 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40"
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2.5 justify-center py-1">
              {availableTokens.map((token) => (
                <motion.button
                  key={`avail-${token.id}`}
                  type="button"
                  whileTap={{ scale: token.isUsed ? 1 : 0.96 }}
                  onClick={() => handleSelectToken(token)}
                  disabled={token.isUsed || feedback !== null}
                  className={`h-11 px-4 ${tileBase} ${
                    token.isUsed
                      ? "border-dashed border-slate-300 dark:border-slate-700 bg-transparent text-transparent cursor-default shadow-none border-b-2"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2 disabled:cursor-default"
                  }`}
                >
                  {token.word}
                </motion.button>
              ))}
            </div>

            {/* Bottom action zone (thumb-friendly): feedback OR actions */}
            <div className="sticky bottom-20 lg:bottom-4 z-20 -mx-2 px-2 py-2 rounded-2xl bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm">
            {feedback === null ? (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full h-12 sm:h-14 rounded-2xl border-b-4 text-white text-sm sm:text-base font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    canSubmit
                      ? "bg-[#0059bb] hover:bg-blue-600 border-[#003d82] shadow-lg shadow-[#0059bb]/25 dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 dark:shadow-none cursor-pointer active:translate-y-[3px] active:border-b-[1px]"
                      : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Kiểm tra</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={placedTokens.length === 0}
                    className={ghostBtn}
                  >
                    <RotateCcw className="w-4 h-4 stroke-[2.4]" />
                    <span>Xếp lại</span>
                  </button>
                  <button type="button" onClick={handleSkip} className={ghostBtn}>
                    <SkipForward className="w-4 h-4 stroke-[2.4]" />
                    <span>Bỏ qua</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border-2 border-b-4 flex items-center gap-3 ${
                  feedback === "correct"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200"
                    : "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200"
                }`}
              >
                <div
                  className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-white shadow-sm ${
                    feedback === "correct" ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {feedback === "correct" ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <Delete className="w-5 h-5 stroke-[2.6]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 text-base font-black font-display">
                    <span>{feedback === "correct" ? "Chính xác hoàn hảo!" : "Chưa đúng rồi!"}</span>
                    {feedback === "correct" && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[11px] font-black">
                        +20
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-snug">
                    {feedback === "wrong" && <span className="font-bold">Đáp án đúng: </span>}
                    {currentPkg.originalSentence}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => speakSentence(currentPkg.originalSentence)}
                  title="Nghe cả câu"
                  className="w-11 h-11 shrink-0 rounded-xl bg-white/70 dark:bg-slate-900/60 border-2 border-b-4 border-current/30 flex items-center justify-center cursor-pointer active:translate-y-[2px] active:border-b-2 transition-all"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </motion.div>
              <button
                type="button"
                onClick={handleContinue}
                autoFocus
                className={`w-full h-12 sm:h-14 rounded-2xl border-b-4 text-white text-sm sm:text-base font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-[3px] active:border-b-[1px] ${
                  feedback === "correct"
                    ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 dark:bg-emerald-600 dark:border-emerald-800"
                    : "bg-rose-500 hover:bg-rose-600 border-rose-700 dark:bg-rose-600 dark:border-rose-800"
                }`}
              >
                <span>{currentIdx + 1 < packages.length ? "Tiếp tục" : "Xem kết quả"}</span>
              </button>
              </div>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

