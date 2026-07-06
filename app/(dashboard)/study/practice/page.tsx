"use client";
import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Layers,
  PenLine,
  Mic,
  Check,
  RotateCcw,
  Sparkles,
  Clock3,
  Trophy,
} from "lucide-react";

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const optionItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
} as const;

function PracticeQuizContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const dateParam = searchParams.get("date");

  const { practiceWord, submitReview, learned } = useVocabularyStore();

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const vocabs = useMemo(() => {
    let list = [];
    if (mode === "review") {
      let filteredLearned = [];
      if (dateParam) {
        filteredLearned = learned.filter((l) => {
          if (!l.nextReview) return false;
          const nextDateStr = formatLocalDate(new Date(l.nextReview));
          return nextDateStr === dateParam;
        });
      } else {
        filteredLearned = learned.filter((l) => l.nextReview && new Date(l.nextReview) <= new Date());
      }
      
      const dueVocabIds = filteredLearned.map((l) => l.vocabId);
      const filtered = MOCK_VOCABULARIES.filter((v) => dueVocabIds.includes(v.id));
      list = filtered.length > 0 ? filtered : MOCK_VOCABULARIES;
    } else {
      list = MOCK_VOCABULARIES;
    }
    return [...list].sort(() => 0.5 - Math.random());
  }, [mode, dateParam, learned]);

  const [subMode, setSubMode] = useState<"quiz" | "flashcard">("quiz");

  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qXp, setQXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [fIndex, setFIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { awardXp } = useAuthStore();

  const currentWord = vocabs[qIndex];
  const options = useMemo(() => {
    if (!currentWord || vocabs.length === 0) return [];

    const otherWords = vocabs.filter((v) => v.id !== currentWord.id);
    const decoys = otherWords.slice(0, 3);
    const combined = [currentWord, ...decoys];
    // Simple deterministic shuffle to keep it clean and static for SSR safety
    return combined.sort((a, b) => a.word.localeCompare(b.word));
  }, [currentWord, vocabs]);

  const handleQuizAnswer = (optId: string) => {
    if (isAnswered) return;
    setSelectedOpt(optId);
    setIsAnswered(true);

    const correctId = vocabs[qIndex].id;
    const isCorrect = optId === correctId;

    practiceWord(correctId, isCorrect);
    const xpEarned = isCorrect ? 15 : 5;
    awardXp(xpEarned);
    setQXp((prev) => prev + xpEarned);
    if (isCorrect) setQScore((prev) => prev + 1);

    setTimeout(() => {
      setQIndex((prev) => (prev + 1) % vocabs.length);
      setSelectedOpt(null);
      setIsAnswered(false);
    }, 1500);
  };

  const handleFlashcardReview = async (quality: number) => {
    const wordId = vocabs[fIndex].id;
    await submitReview(wordId, quality);
    const xpEarned = quality >= 3 ? 15 : 5;
    awardXp(xpEarned);
    setIsFlipped(false);
    setFIndex((prev) => (prev + 1) % vocabs.length);
  };

  const modes = [
    {
      key: "quiz" as const,
      label: "Trắc nghiệm",
      desc: "Chọn nghĩa đúng của từ vựng.",
      icon: <Brain className="h-4 w-4" strokeWidth={1.8} />,
    },
    {
      key: "flashcard" as const,
      label: "Thẻ học",
      desc: "Phương pháp lật hai mặt ghi nhớ.",
      icon: <Layers className="h-4 w-4" strokeWidth={1.8} />,
    },
  ];

  const progressPercent = Math.round(
    (qIndex / Math.max(1, vocabs.length)) * 100
  );

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header section with page detail settings */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
          Học tập và rèn luyện
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl">
          Một phiên học ngắn, tập trung và có phản hồi ngay lập tức.
        </p>
      </motion.div>

      {/* Focus banner highlights */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.05 }}
        className="bezel"
      >
        <div className="bezel-inner rounded-[calc(var(--radius-3xl)-6px)] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 text-white md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between relative z-10">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/80">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Focus session
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight sm:text-3xl font-display">
                5 phút học là đủ để giữ streak sống động
              </h2>
              <p className="mt-2 max-w-xl text-xs md:text-sm text-white/75 sm:text-base leading-relaxed font-medium">
                Chọn chế độ học phù hợp, làm vài câu và nhận điểm XP ngay trong lần đầu tiên.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm shrink-0">
              <Clock3 className="h-5 w-5 text-cyan-300 animate-pulse" />
              <div>
                <div className="text-xs font-bold text-white">Phiên học ngắn</div>
                <div className="text-[10px] text-white/70 font-semibold mt-0.5">Tối ưu cho mobile</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive switcher layout panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-100 dark:bg-neutral-950 p-1.5 rounded-[22px] border border-slate-200/50 dark:border-neutral-900 w-full"
      >
        <div className="flex gap-1">
          {modes.map((mode) => {
            const isActive = subMode === mode.key;
            return (
              <button
                key={mode.key}
                type="button"
                onClick={() => setSubMode(mode.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 text-xs font-black rounded-full transition-colors duration-250 select-none z-10 cursor-pointer ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-450 dark:text-slate-500"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubModeIndicator"
                    className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  />
                )}
                <span className="relative z-10">{mode.icon}</span>
                <span className="relative z-10">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mr-1">
          <Link
            href="/study/writing"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer select-none"
          >
            <PenLine className="h-4 w-4" />
            <span>Luyện viết</span>
          </Link>
          <Link
            href="/study/speaking"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer select-none"
          >
            <Mic className="h-4 w-4" />
            <span>Luyện phát âm</span>
          </Link>
        </div>
      </motion.div>

      {/* Practice arena area */}
      <div id="practice-arena">
        <AnimatePresence mode="wait">
          {subMode === "quiz" ? (
            <motion.div
              key="quiz-arena"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
              className="mx-auto max-w-2xl"
            >
              <div className="bezel">
                <div className="bezel-inner flex flex-col gap-6 p-6 bg-white dark:bg-neutral-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Câu {qIndex + 1}/{vocabs.length}
                      </p>
                      <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                        Điểm: <span className="text-cyan-500 font-extrabold">{qScore}</span> · +{qXp} XP
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/20 px-3 py-1 text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 border border-sky-500/10">
                      <Trophy className="h-3.5 w-3.5 text-amber-500 animate-bounce" />
                      Mục tiêu ngày
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-850">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </div>

                  <div className="rounded-[24px] border border-sky-100/50 bg-gradient-to-br from-sky-50/40 to-white p-5 sm:p-8 text-center dark:border-neutral-800 dark:from-neutral-950/30 dark:to-neutral-900 relative">
                    <div className="absolute top-2 right-3 text-[10px] uppercase font-black tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/5">
                      {vocabs[qIndex]?.pos}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                      {vocabs[qIndex]?.word}
                    </h2>
                    <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-bold">
                      Phiên âm: <span className="font-mono text-slate-450">{vocabs[qIndex]?.phonetic}</span>
                    </div>
                  </div>

                  <motion.div
                    variants={optionsContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-3 md:grid-cols-2"
                  >
                    {options.map((opt) => {
                      let statusClass =
                        "border border-slate-200 bg-white text-left text-xs md:text-sm font-bold text-slate-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-200";
                      if (isAnswered) {
                        if (opt.id === vocabs[qIndex].id) {
                          statusClass =
                            "border-emerald-500 bg-emerald-50/60 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 ring-1 ring-emerald-500/20";
                        } else if (selectedOpt === opt.id) {
                          statusClass =
                            "border-rose-500 bg-rose-50/60 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450 ring-1 ring-rose-500/20";
                        } else {
                          statusClass += " opacity-40 scale-[0.98]";
                        }
                      }

                      return (
                        <motion.button
                          key={opt.id}
                          variants={optionItemVariants}
                          whileTap={{ scale: isAnswered ? 1 : 0.97 }}
                          type="button"
                          className={`rounded-2xl px-4 py-3.5 transition-all duration-300 tactile cursor-pointer flex items-center justify-between gap-3 ${statusClass}`}
                          onClick={() => handleQuizAnswer(opt.id)}
                          disabled={isAnswered}
                        >
                          <span className="leading-snug">{opt.definitionVn}</span>
                          {isAnswered && opt.id === vocabs[qIndex].id ? (
                            <Check className="h-4 w-4 text-emerald-500 shrink-0" strokeWidth={3} />
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="flashcard-arena"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
              className="mx-auto max-w-md space-y-4"
            >
              <div className="bezel">
                <div className="bezel-inner p-4 bg-white dark:bg-neutral-900">
                  <div className="flex items-center justify-between text-xs font-black text-slate-400 dark:text-slate-500 select-none">
                    <span>Thẻ ghi nhớ</span>
                    <span>
                      {fIndex + 1}/{vocabs.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3D spring flashcard elements */}
              <div className="bezel shadow-md">
                <div
                  className="perspective-[1500px] w-full"
                  style={{ borderRadius: "calc(var(--radius-3xl) - 6px)" }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 15 }}
                    className="relative h-80 w-full rounded-[calc(var(--radius-3xl)-6px)] cursor-pointer select-none [transform-style:preserve-3d]"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    {/* Front cover card */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[calc(var(--radius-3xl)-6px)] bg-white p-5 sm:p-8 text-center border border-slate-100 dark:border-neutral-850 [backface-visibility:hidden] dark:bg-neutral-900 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 border border-cyan-500/5">
                        <RotateCcw className="h-3 w-3 animate-spin-slow" />
                        Bấm để lật
                      </span>
                      <div className="mb-3 rounded-full bg-slate-55/60 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-550 dark:bg-neutral-850 dark:text-slate-450 border border-black/[0.02] dark:border-white/[0.02]">
                        {vocabs[fIndex]?.pos}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                        {vocabs[fIndex]?.word}
                      </h3>
                      <p className="mt-2 font-mono text-xs font-bold text-slate-400 dark:text-slate-550">
                        {vocabs[fIndex]?.phonetic}
                      </p>
                    </div>

                    {/* Back layout details */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-[calc(var(--radius-3xl)-6px)] p-5 sm:p-8 text-center border border-slate-100 dark:border-neutral-850 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        background:
                          "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%), var(--bg-card)",
                      }}
                    >
                      <span className="mb-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 border border-emerald-500/5">
                        Ý nghĩa của từ
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-tight">
                        {vocabs[fIndex]?.definitionVn}
                      </h3>
                      <p className="mt-2.5 text-xs font-medium text-slate-500 dark:text-slate-405 leading-relaxed max-w-xs">
                        {vocabs[fIndex]?.definition}
                      </p>
                      <div className="mt-4 rounded-2xl bg-slate-50/50 px-4 py-3 text-xs text-slate-550 font-bold border border-slate-200/40 shadow-sm dark:bg-neutral-950/40 dark:text-slate-400 dark:border-neutral-850 max-w-xs italic leading-relaxed">
                        “{vocabs[fIndex]?.examples[0]}”
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Deck evaluation button row */}
              <div className="bezel">
                <div className="bezel-inner flex flex-col gap-3.5 p-4 bg-white dark:bg-neutral-900">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center select-none">
                    Đánh giá độ nhớ của bạn
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-xl font-bold py-2.5 cursor-pointer text-xs"
                      onClick={() => handleFlashcardReview(1)}
                    >
                      Quên
                    </Button>
                    <Button
                      variant="bezel"
                      size="sm"
                      className="rounded-xl border-amber-200 dark:border-amber-700/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 dark:text-amber-400 py-2.5 cursor-pointer text-xs font-bold"
                      onClick={() => handleFlashcardReview(3)}
                    >
                      Mơ hồ
                    </Button>
                    <Button
                      variant="bezel"
                      size="sm"
                      className="rounded-xl border-sky-200 dark:border-sky-700/50 hover:bg-sky-50 dark:hover:bg-sky-950/20 text-sky-600 dark:text-sky-400 py-2.5 cursor-pointer text-xs font-bold"
                      onClick={() => handleFlashcardReview(4)}
                    >
                      Nhớ tốt
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="rounded-xl font-bold py-2.5 cursor-pointer text-xs"
                      onClick={() => handleFlashcardReview(5)}
                    >
                      Thành thạo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PracticeQuizPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl p-8 text-center text-xs font-bold text-slate-400 dark:text-neutral-600 animate-pulse">
        Đang tải phòng học ôn tập...
      </div>
    }>
      <PracticeQuizContent />
    </Suspense>
  );
}
