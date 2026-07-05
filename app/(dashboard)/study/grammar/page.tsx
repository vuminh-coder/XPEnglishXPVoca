"use client";
import React, { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  RotateCcw,
  Zap,
} from "lucide-react";

interface Exercise {
  id: number;
  sentence: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

const GRAMMAR_TOPICS = [
  { id: "tenses", name: "Thì trong tiếng Anh", icon: "⏰", desc: "Present, Past, Future & Perfect" },
  { id: "conditionals", name: "Câu điều kiện", icon: "🔀", desc: "If clauses Type 0, 1, 2, 3" },
  { id: "passive_voice", name: "Câu bị động", icon: "🔄", desc: "Active → Passive transformation" },
  { id: "articles", name: "Mạo từ", icon: "📝", desc: "A, An, The & Zero article" },
  { id: "prepositions", name: "Giới từ", icon: "📍", desc: "In, On, At, By, For, With..." },
  { id: "relative_clauses", name: "Mệnh đề quan hệ", icon: "🔗", desc: "Who, Which, That, Whose, Where" },
];

const topicsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
} as const;

const topicItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
} as const;

export default function GrammarLabPage() {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateExercises = async (topicId: string) => {
    setSelectedTopic(topicId);
    setLoading(true);
    setExercises([]);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setSubmitted(false);

    try {
      const res = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId, level: "intermediate" }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      if (data.exercises) {
        setExercises(data.exercises);
      }
    } catch {
      addToast({ type: "error", title: "Lỗi!", message: "Không thể sinh bài tập. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (exerciseId: number, answer: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  };

  const submitAll = () => {
    setSubmitted(true);
    setShowResults(true);
    const correctCount = exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length;
    const xpEarned = correctCount * 5 + 20;
    awardXp(xpEarned);
    addToast({
      type: "xp",
      title: `+${xpEarned} XP!`,
      message: `Đúng ${correctCount}/${exercises.length} câu. Làm tốt lắm!`,
    });
  };

  const currentExercise = exercises[currentIndex];

  // Topic selection screen
  if (!selectedTopic || exercises.length === 0) {
    return (
      <div className="space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="page-header"
        >
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white font-display">
            <BookOpen className="h-7 w-7 text-indigo-500" /> Phòng luyện Ngữ pháp AI
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Chọn chủ đề ngữ pháp — Gemini AI sẽ tự động sinh bài tập riêng biệt cho bạn.
          </p>
        </motion.div>

        {loading ? (
          <Card variant="bezel" className="p-12 text-center bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
            <p className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 mt-3 animate-pulse">AI đang sinh đề bài tập...</p>
          </Card>
        ) : (
          <motion.div
            variants={topicsContainerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {GRAMMAR_TOPICS.map((topic) => (
              <motion.div
                variants={topicItemVariants}
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                key={topic.id}
                onClick={() => generateExercises(topic.id)}
                className="cursor-pointer"
              >
                <Card
                  variant="bezel"
                  className="p-5 flex flex-col justify-between h-full group bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden"
                >
                  <div>
                    <div className="text-3xl mb-3">{topic.icon}</div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">{topic.name}</h3>
                    <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-1 leading-relaxed">{topic.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-indigo-500 uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                    <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" /> Bắt đầu luyện <ArrowRight className="h-3 w-3 shrink-0" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  // Exercise screen
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <Button variant="secondary" size="sm" className="cursor-pointer rounded-xl font-bold" onClick={() => { setSelectedTopic(null); setExercises([]); }}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chọn chủ đề khác
        </Button>
        <Badge variant="primary" className="text-xs md:text-sm font-black px-3.5 py-1">
          {showResults ? "Kết quả" : `${currentIndex + 1} / ${exercises.length}`}
        </Badge>
      </motion.div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-850 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${((showResults ? exercises.length : currentIndex + 1) / exercises.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showResults ? (
          /* Results summary */
          <motion.div
            key="results-summary"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
          >
            <Card variant="bezel" className="p-6 space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
              <div className="text-center">
                <div className="text-4xl font-black text-indigo-650 font-display">
                  {exercises.filter((ex) => answers[ex.id] === ex.correctAnswer).length}/{exercises.length}
                </div>
                <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1 font-bold">Câu trả lời đúng</p>
              </div>

              <div className="space-y-4">
                {exercises.map((ex) => {
                  const isCorrect = answers[ex.id] === ex.correctAnswer;
                  return (
                    <div key={ex.id} className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${isCorrect ? "border-emerald-200 bg-emerald-50/30 dark:border-emerald-800/20 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450" : "border-rose-200 bg-rose-50/30 dark:border-rose-800/20 dark:bg-rose-950/20 text-rose-750 dark:text-rose-455"}`}>
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />}
                        <div className="space-y-1.5">
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200">{ex.sentence}</p>
                          {!isCorrect && (
                            <p className="text-[11px] text-rose-500 font-bold">Bạn chọn: <span className="underline decoration-wavy">{answers[ex.id] || "(bỏ trống)"}</span> — Đáp án đúng: <span className="text-emerald-600 dark:text-emerald-400 font-black">{ex.correctAnswer}</span></p>
                          )}
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-1">{ex.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button variant="primary" className="w-full py-4 text-xs md:text-sm font-bold flex items-center justify-center cursor-pointer shadow-glow" onClick={() => { setSelectedTopic(null); setExercises([]); }}>
                <RotateCcw className="h-4 w-4 mr-1.5" /> Luyện chủ đề khác
              </Button>
            </Card>
          </motion.div>
        ) : currentExercise ? (
          /* Single exercise card */
          <motion.div
            key={`exercise-${currentIndex}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ type: "spring", stiffness: 95, damping: 16 }}
          >
            <Card variant="bezel" className="p-6 space-y-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
              <div>
                <Badge variant="neutral" className="mb-3 font-bold">Câu {currentIndex + 1}</Badge>
                <p className="text-base font-black text-slate-800 dark:text-white leading-relaxed font-display">
                  {currentExercise.sentence}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {currentExercise.options.map((option) => {
                  const isSelected = answers[currentExercise.id] === option;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={option}
                      onClick={() => selectAnswer(currentExercise.id, option)}
                      className={`p-3.5 rounded-xl text-xs md:text-sm font-bold text-left transition-all border cursor-pointer leading-snug ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-50/50 text-indigo-750 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-650"
                          : "border-slate-200 dark:border-neutral-850 hover:border-slate-350 bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between gap-3 pt-3 border-t border-slate-100 dark:border-neutral-850">
                <Button
                  variant="bezel"
                  size="sm"
                  className="rounded-xl font-bold cursor-pointer text-xs"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                >
                  ← Trước
                </Button>

                {currentIndex < exercises.length - 1 ? (
                  <Button variant="primary" size="sm" className="rounded-xl font-bold cursor-pointer text-xs flex items-center gap-1" onClick={() => setCurrentIndex((i) => i + 1)}>
                    Tiếp <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-xl font-bold cursor-pointer text-xs flex items-center gap-1 shadow-glow"
                    onClick={submitAll}
                    disabled={Object.keys(answers).length < exercises.length}
                  >
                    <Zap className="h-3.5 w-3.5 text-yellow-300 animate-bounce" /> Nộp bài
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
