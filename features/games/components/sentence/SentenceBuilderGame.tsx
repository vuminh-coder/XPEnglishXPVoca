"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Timer,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  SkipForward,
  HelpCircle,
  Delete,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
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

export function SentenceBuilderGame({ pool, onBack }: SentenceBuilderGameProps) {
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

    setTimeout(() => {
      if (currentIdx + 1 < packages.length) {
        setCurrentIdx((c) => c + 1);
      } else {
        setGameOver(true);
      }
    }, 1200);
  }, [currentIdx, packages, placedTokens, feedback]);

  // Skip sentence
  const handleSkip = useCallback(() => {
    const pkg = packages[currentIdx];
    if (!pkg) return;

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
  }, [currentIdx, packages]);

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
        onBack={onBack}
        onRestart={generateSentences}
      />
    );
  }

  const currentPkg = packages[currentIdx];

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-2xl mx-auto">
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
              <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
            )}
          </button>

          <Badge variant="primary" size="sm">
            <Zap className="w-3 h-3 mr-1 text-amber-400 stroke-[2.5]" />
            {score} điểm
          </Badge>

          <Badge variant="neutral" size="sm">
            Câu {currentIdx + 1} / {packages.length}
          </Badge>

          <button
            type="button"
            onClick={generateSentences}
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
          className="h-full rounded-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{
            width: packages.length ? `${((currentIdx + 1) / packages.length) * 100}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* 3. Main Sentence Stage */}
      <AnimatePresence mode="wait">
        {currentPkg && (
          <motion.div
            key={`sentence-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Meaning Cue Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl text-center space-y-3 bg-white dark:bg-slate-900 border transition-all shadow-md ${
                feedback === "correct"
                  ? "border-emerald-500 ring-4 ring-emerald-500/15"
                  : feedback === "wrong"
                  ? "border-rose-500 ring-4 ring-rose-500/15"
                  : "border-slate-200/90 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Ghép các từ theo thứ tự đúng</span>
                <button
                  type="button"
                  onClick={handleHintNext}
                  className="py-1 px-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-[11px] font-bold min-h-[44px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Gợi ý từ tiếp</span>
                </button>
              </div>

              {/* Translation Meaning */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40">
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  &ldquo;{currentPkg.translationVn}&rdquo;
                </p>
              </div>

              {/* Placed Tokens Container (Sentence Tray) */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-left">
                  Câu của bạn (Chạm từ để bỏ ra)
                </div>
                <div className="min-h-[64px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex flex-wrap gap-2 items-center">
                  {placedTokens.length === 0 ? (
                    <span className="text-xs text-slate-400 italic mx-auto">
                      Chọn các khối từ bên dưới để ghép thành câu hoàn chỉnh
                    </span>
                  ) : (
                    placedTokens.map((token, idx) => (
                      <motion.button
                        key={`placed-${token.id}-${idx}`}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleRemovePlacedToken(token, idx)}
                        className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold shadow-2xs cursor-pointer hover:bg-rose-50 hover:border-rose-400 transition-colors"
                      >
                        {token.word}
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              {/* Available Word Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-left">
                  Khay từ vựng có sẵn
                </div>
                <div className="flex flex-wrap gap-2 justify-center p-3 rounded-2xl bg-slate-100/60 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800">
                  {availableTokens.map((token) => (
                    <motion.button
                      key={`avail-${token.id}`}
                      whileTap={{ scale: token.isUsed ? 1 : 0.94 }}
                      onClick={() => handleSelectToken(token)}
                      disabled={token.isUsed}
                      className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 shadow-2xs ${
                        token.isUsed
                          ? "bg-slate-200 dark:bg-slate-800 border border-transparent text-slate-400 dark:text-slate-600 opacity-40 cursor-default"
                          : "bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer active:scale-95 shadow-2xs"
                      }`}
                    >
                      {token.word}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Correct Feedback popup */}
              {feedback === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center space-y-1"
                >
                  <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5 font-display">
                    <span>Chính xác hoàn hảo!</span>
                    <button
                      type="button"
                      onClick={() => speakSentence(currentPkg.originalSentence)}
                      title="Nghe cả câu"
                      className="p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center bg-emerald-200/60 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {currentPkg.originalSentence}
                  </p>
                </motion.div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={placedTokens.length === 0}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Xếp lại</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                >
                  <SkipForward className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Bỏ qua</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={placedTokens.length === 0}
                  className="py-2.5 px-6 rounded-xl bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  <span>Kiểm tra câu</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
