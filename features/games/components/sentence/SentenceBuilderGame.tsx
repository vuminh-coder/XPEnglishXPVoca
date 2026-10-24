"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
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

const DuolingoTurtleIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    viewBox="1.8 5.5 21.2 11"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* Shell */}
    <path d="M 10 7 C 6.5 7 4.2 9.8 4 13.5 L 15.5 13.5 C 15.2 9.8 13.5 7 10 7 Z" />
    {/* Head */}
    <path d="M 15 11.5 C 15 10.4 16 9.6 17.2 9.8 C 18.3 10 19 11 19 12.2 C 19 13.2 18.2 14 17 14 L 15 14 Z" />
    {/* Eye dot */}
    <circle cx="17.2" cy="11.2" r="0.6" fill="#ffffff" />
    {/* Back & Front Feet */}
    <path d="M 5.2 13.5 C 5 15.2 7 15.5 7.2 13.5 Z" />
    <path d="M 12.5 13.5 C 12.3 15.2 14.3 15.5 14.5 13.5 Z" />
    {/* Tail */}
    <path d="M 4 12.5 L 2.5 13 L 4 13.8 Z" />
    {/* Sound waves emitted in front */}
    <path
      d="M 20 10.8 C 20.8 11.5 20.8 12.5 20 13.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 22 9.5 C 23.2 10.8 23.2 13.2 22 14.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

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

  const speakSentenceSlow = (sentence: string) => {
    safeSpeakText(sentence, { lang: "en-US", rate: 0.62 });
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

  const currentPkg = packages[currentIdx];
  const slotCount = currentPkg ? currentPkg.tokens.length : 0;
  const canSubmit =
    slotCount > 0 && placedTokens.length === slotCount && feedback === null;

  // Keyboard navigation for desktop web (Enter, Backspace, 1-9)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Enter") {
        if (feedback !== null) {
          e.preventDefault();
          handleContinue();
        } else if (canSubmit) {
          e.preventDefault();
          handleSubmit();
        }
      } else if (e.key === "Backspace" && feedback === null && placedTokens.length > 0) {
        e.preventDefault();
        const lastIdx = placedTokens.length - 1;
        handleRemovePlacedToken(placedTokens[lastIdx], lastIdx);
      } else if (e.key >= "1" && e.key <= "9" && feedback === null) {
        const num = parseInt(e.key, 10) - 1;
        const activeUnused = availableTokens.filter((tk) => !tk.isUsed);
        if (activeUnused[num]) {
          e.preventDefault();
          handleSelectToken(activeUnused[num]);
        }
      } else if ((e.key === "a" || e.key === "A") && currentPkg) {
        speakSentence(currentPkg.originalSentence);
      } else if ((e.key === "s" || e.key === "S") && currentPkg) {
        speakSentenceSlow(currentPkg.originalSentence);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [feedback, canSubmit, handleContinue, handleSubmit, placedTokens, availableTokens, currentPkg]);

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

  const progressPct = packages.length
    ? ((currentIdx + (feedback ? 1 : 0)) / packages.length) * 100
    : 0;

  // Vị trí các từ đặt sai (để tô riêng khi chấm sai)
  const wrongPositions = new Set<number>();
  if (feedback === "wrong" && currentPkg) {
    placedTokens.forEach((tk, i) => {
      if (tk.word.toLowerCase() !== (currentPkg.tokens[i] || "").toLowerCase()) {
        wrongPositions.add(i);
      }
    });
  }

  // ── Duolingo-mobile style tokens ──
  const chipBase =
    "h-12 px-4 rounded-2xl border-2 border-b-4 text-base font-semibold transition-all duration-100 select-none";
  const chipIdle =
    "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-[2px] active:border-b-2";
  const chipPlacedTone =
    feedback === "correct"
      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700"
      : feedback === "wrong"
      ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-700"
      : chipIdle;

  const ROW_PITCH = 64; // 44px chip + 20px khoảng cách = 1 dòng kẻ
  const ruledStyle: React.CSSProperties = {
    minHeight: ROW_PITCH * 3,
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${ROW_PITCH - 2}px, rgba(148,163,184,0.38) ${ROW_PITCH - 2}px, rgba(148,163,184,0.38) ${ROW_PITCH}px)`,
  };

  const footerTone =
    feedback === "correct"
      ? "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-900"
      : feedback === "wrong"
      ? "bg-rose-100 dark:bg-rose-950/70 border-rose-200 dark:border-rose-900"
      : "bg-[#fffefb] dark:bg-slate-950 border-slate-200 dark:border-slate-800";

  const cueWords = currentPkg ? currentPkg.translationVn.split(/\s+/) : [];

  return (
    <div className="select-none w-full mx-auto flex flex-col gap-5 sm:gap-6">
      {/* 1. Top bar: X + chunky progress + score */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          title="Thoát bài"
          aria-label="Thoát bài"
          className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors active:scale-90"
        >
          <X className="w-7 h-7 stroke-[2.6]" />
        </button>

        <div className="relative flex-1 h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(progressPct, 6)}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <div className="absolute inset-x-2.5 top-[4px] h-[3px] rounded-full bg-white/40" />
          </motion.div>
        </div>

        <div className="shrink-0 flex items-center gap-1 text-amber-500 dark:text-amber-400 font-black font-display text-base tabular-nums">
          <Zap className="w-5 h-5 fill-current" />
          {score}
        </div>

        <button
          type="button"
          onClick={toggleAudio}
          title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors active:scale-90"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentPkg && (
          <motion.div
            key={`sentence-${currentIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* 2. Title */}
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-700 dark:text-slate-100">
              Dịch câu này sang tiếng Anh
            </h2>

            {/* 3. Mascot + speech bubble */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="shrink-0 flex flex-col items-center w-24 sm:w-28">
                <span className="text-6xl sm:text-7xl leading-none" aria-hidden>
                  🦉
                </span>
                <div className="mt-1 w-16 h-3 rounded-full bg-slate-200/80 dark:bg-slate-800" />
              </div>
              <div className="relative flex-1 min-w-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-l-2 border-b-2 border-slate-200 dark:border-slate-700" />
                <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 border-r border-slate-200 dark:border-slate-700 pr-2 mr-1">
                  <button
                    type="button"
                    onClick={() => speakSentence(currentPkg.originalSentence)}
                    title="Nghe tốc độ thường (Phím A)"
                    aria-label="Nghe tốc độ thường"
                    className="w-10 h-10 rounded-xl text-sky-500 dark:text-sky-400 flex items-center justify-center cursor-pointer active:scale-90 transition-transform hover:bg-sky-50 dark:hover:bg-sky-950/40"
                  >
                    <Volume2 className="w-6 h-6 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => speakSentenceSlow(currentPkg.originalSentence)}
                    title="Nghe phát âm chậm (Phím S)"
                    aria-label="Nghe phát âm chậm"
                    className="w-10 h-10 rounded-xl text-sky-500 dark:text-sky-400 flex items-center justify-center cursor-pointer active:scale-90 transition-transform hover:bg-sky-50 dark:hover:bg-sky-950/40"
                  >
                    <DuolingoTurtleIcon className="w-7 h-7" />
                  </button>
                </div>
                <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-100 leading-relaxed">
                  {cueWords.map((w, i) => (
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

            {/* 4. Ruled answer lines */}
            <motion.div
              animate={feedback === "wrong" ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
              style={ruledStyle}
              className="flex flex-wrap content-start gap-x-2 gap-y-[20px] pt-3"
            >
              {placedTokens.map((token, i) => (
                <motion.button
                  key={`placed-${token.id}-${i}`}
                  type="button"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => handleRemovePlacedToken(token, i)}
                  className={`${chipBase} ${
                    wrongPositions.has(i)
                      ? "border-rose-500 bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700 underline decoration-wavy decoration-rose-400 underline-offset-4"
                      : chipPlacedTone
                  }`}
                  style={{ height: 44 }}
                >
                  {token.word}
                </motion.button>
              ))}
            </motion.div>

            {/* 5. Word bank */}
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 px-1 py-1">
              {availableTokens.map((token) => (
                <motion.button
                  key={`avail-${token.id}`}
                  type="button"
                  whileTap={{ scale: token.isUsed ? 1 : 0.96 }}
                  onClick={() => handleSelectToken(token)}
                  disabled={token.isUsed || feedback !== null}
                  className={`${chipBase} ${
                    token.isUsed
                      ? "border-slate-200/60 dark:border-slate-800 bg-slate-200/60 dark:bg-slate-800/60 text-transparent cursor-default border-b-2"
                      : `${chipIdle} disabled:cursor-default`
                  }`}
                >
                  {token.word}
                </motion.button>
              ))}
            </div>

            {/* 7. Footer (thumb zone): KIỂM TRA / feedback sheet + TIẾP TỤC */}
            <div
              className={`sticky bottom-16 lg:bottom-0 z-20 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 pt-4 pb-4 border-t-2 transition-colors ${footerTone}`}
            >
              {feedback === null ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full h-14 rounded-2xl text-base font-black font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    canSubmit
                      ? "bg-[#0059bb] hover:bg-blue-600 text-white border-b-4 border-[#003d82] dark:bg-blue-700 dark:hover:bg-blue-600 dark:border-blue-900 cursor-pointer active:translate-y-[3px] active:border-b-[1px]"
                      : "bg-slate-200 dark:bg-slate-800 text-white dark:text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <span>Kiểm tra</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <div
                      className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white ${
                        feedback === "correct" ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      {feedback === "correct" ? (
                        <Check className="w-7 h-7 stroke-[3.2]" />
                      ) : (
                        <X className="w-7 h-7 stroke-[3.2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`flex items-center gap-2 text-lg font-black font-display ${
                          feedback === "correct"
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-rose-700 dark:text-rose-300"
                        }`}
                      >
                        <span>{feedback === "correct" ? "Chính xác!" : "Đáp án đúng:"}</span>
                        {feedback === "correct" && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 text-[11px] font-black">
                            +20
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm sm:text-base font-medium leading-snug ${
                          feedback === "correct"
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-rose-700 dark:text-rose-300"
                        }`}
                      >
                        {currentPkg.originalSentence}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakSentence(currentPkg.originalSentence)}
                      title="Nghe cả câu"
                      aria-label="Nghe cả câu"
                      className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${
                        feedback === "correct"
                          ? "text-emerald-600 hover:bg-emerald-200/60"
                          : "text-rose-600 hover:bg-rose-200/60"
                      }`}
                    >
                      <Volume2 className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleContinue}
                    autoFocus
                    className={`w-full sm:w-56 h-14 rounded-2xl border-b-4 text-white text-base font-black font-display uppercase tracking-wider flex items-center justify-center cursor-pointer transition-all active:translate-y-[3px] active:border-b-[1px] ${
                      feedback === "correct"
                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 dark:bg-emerald-600 dark:border-emerald-800"
                        : "bg-rose-500 hover:bg-rose-600 border-rose-700 dark:bg-rose-600 dark:border-rose-800"
                    }`}
                  >
                    <span>{currentIdx + 1 < packages.length ? "Tiếp tục" : "Xem kết quả"}</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
