"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Play,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  XCircle,
  Volume2,
  Zap,
  Trophy,
  Mic,
} from "lucide-react";

// ── Dictation sentences ──
const DICTATION_SENTENCES = [
  "The meeting has been rescheduled to next Friday afternoon.",
  "Please submit your report before the end of the month.",
  "Our company is looking for experienced software engineers.",
  "The flight to London departs at seven thirty in the morning.",
  "Could you please send me the updated version of the contract?",
  "The restaurant on the corner serves excellent Italian food.",
  "We need to discuss the budget allocation for the next quarter.",
  "The conference will be held at the Grand Hotel downtown.",
  "She has been working in the marketing department for five years.",
  "The new product launch exceeded all of our expectations.",
];

// ── Listening Quiz passages ──
const LISTENING_QUIZZES = [
  {
    id: "lq1",
    title: "Office Announcement",
    passage: "Attention all employees. Due to the upcoming renovation of the third floor, all staff members currently working on that floor will be temporarily relocated to the second floor starting next Monday. Please make sure to pack your personal belongings by Friday. The renovation is expected to take approximately three weeks. During this time, the elevators on the east side of the building will be out of service. We apologize for any inconvenience.",
    questions: [
      { text: "What is happening on the third floor?", options: ["A meeting", "A renovation", "A party", "An inspection"], correct: 1 },
      { text: "When should employees pack their belongings?", options: ["Monday", "Wednesday", "Friday", "Sunday"], correct: 2 },
      { text: "How long will the renovation take?", options: ["One week", "Two weeks", "Three weeks", "Four weeks"], correct: 2 },
    ],
  },
  {
    id: "lq2",
    title: "Travel Information",
    passage: "Good morning, passengers. This is your captain speaking. We are currently cruising at an altitude of thirty-five thousand feet. Our estimated arrival time in Tokyo is two fifteen local time, which is about forty-five minutes ahead of schedule. The weather in Tokyo is partly cloudy with a temperature of twenty-two degrees Celsius. We will begin our descent in approximately one hour. Please remain seated with your seatbelts fastened.",
    questions: [
      { text: "Where is the plane heading?", options: ["London", "New York", "Tokyo", "Paris"], correct: 2 },
      { text: "Is the plane ahead or behind schedule?", options: ["Ahead by 45 minutes", "Behind by 45 minutes", "On time", "Ahead by 30 minutes"], correct: 0 },
      { text: "What is the weather like at the destination?", options: ["Sunny", "Rainy", "Partly cloudy", "Snowy"], correct: 2 },
    ],
  },
  {
    id: "lq3",
    title: "Store Promotion",
    passage: "Welcome to GreenMart! This weekend only, we are offering a special buy-one-get-one-free deal on all organic vegetables. Additionally, members of our loyalty program will receive an extra fifteen percent discount on all dairy products. Don't forget to check out our new bakery section, where freshly baked bread is available every morning starting at seven AM. Our store hours this weekend are from eight AM to ten PM.",
    questions: [
      { text: "What is the special deal on organic vegetables?", options: ["50% off", "Buy one get one free", "20% off", "Free delivery"], correct: 1 },
      { text: "What extra discount do loyalty members get on dairy?", options: ["10%", "15%", "20%", "25%"], correct: 1 },
      { text: "When is fresh bread available?", options: ["6 AM", "7 AM", "8 AM", "9 AM"], correct: 1 },
    ],
  },
];

const menuContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const menuItemVariants = {
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

// ── Dictation Game Component ──
function DictationMode({ onBack }: { onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [sentences] = useState(() => [...DICTATION_SENTENCES].sort(() => 0.5 - Math.random()).slice(0, 5));
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<{ sentence: string; input: string; score: number }>>([]);
  const [speed, setSpeed] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.speak(utterance);
  };

  const compareWords = (original: string, typed: string) => {
    const origWords = original.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/);
    const typedWords = typed.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/);
    let correct = 0;
    origWords.forEach((w, i) => {
      if (typedWords[i] === w) correct++;
    });
    return { correct, total: origWords.length, percent: Math.round((correct / origWords.length) * 100) };
  };

  const handleSubmit = () => {
    const score = compareWords(sentences[current], input);
    setSubmitted(true);
    setResults((prev) => [...prev, { sentence: sentences[current], input, score: score.percent }]);
  };

  const handleNext = () => {
    if (current < sentences.length - 1) {
      setCurrent((c) => c + 1);
      setInput("");
      setSubmitted(false);
    } else {
      setGameOver(true);
      const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
      const xp = Math.round(avgScore * 0.5) + 15;
      awardXp(xp);
      addToast({ type: "xp", title: `+${xp} XP!`, message: `Dictation hoàn thành! Trung bình ${avgScore}%` });
    }
  };

  if (gameOver) {
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    return (
      <Card variant="bezel" className="p-8 text-center space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
        <div className="text-3xl font-black text-slate-900 dark:text-white font-display">{avgScore}%</div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">Trung bình chính xác qua {sentences.length} câu</p>
        <div className="space-y-3 text-left max-w-lg mx-auto">
          {results.map((r, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs leading-relaxed font-semibold ${r.score >= 80 ? "border-emerald-200 bg-emerald-50/30 dark:border-emerald-850/20 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-450" : "border-rose-200 bg-rose-50/30 dark:border-rose-850/20 dark:bg-rose-950/20 text-rose-650 dark:text-rose-455"}`}>
              <p className="font-black text-slate-800 dark:text-slate-200">✓ {r.sentence}</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Bạn gõ: {r.input}</p>
              <Badge variant={r.score >= 80 ? "success" : "danger"} className="mt-1.5 font-bold">{r.score}%</Badge>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={onBack}>← Quay lại</Button>
          <Button variant="primary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={() => { setCurrent(0); setInput(""); setSubmitted(false); setResults([]); setGameOver(false); }}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại
          </Button>
        </div>
      </Card>
    );
  }

  const comparison = submitted ? compareWords(sentences[current], input) : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={onBack}>← Quay lại</Button>
        <Badge variant="primary" className="text-xs md:text-sm font-black px-3.5 py-1">{current + 1}/{sentences.length}</Badge>
      </div>

      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-850 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / sentences.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`dictation-${current}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ type: "spring", stiffness: 95, damping: 16 }}
        >
          <Card variant="bezel" className="p-6 space-y-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
            <div className="text-center relative">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mb-4 uppercase tracking-wide">Nghe và gõ lại chính xác câu bạn nghe được</p>
              
              <div className="inline-block relative">
                {isAudioPlaying && (
                  <motion.span
                    className="absolute -inset-2.5 rounded-full bg-violet-500/10 pointer-events-none"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-full py-4 px-6 cursor-pointer font-bold flex items-center gap-2 shadow-glow"
                  onClick={() => speak(sentences[current])}
                >
                  <Volume2 className={`h-5 w-5 ${isAudioPlaying ? "animate-bounce" : ""}`} />
                  Phát âm thanh
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold bg-slate-50/50 dark:bg-neutral-950 p-3 rounded-2xl border border-slate-200/20">
              <span className="shrink-0">Tốc độ phát:</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="flex-1 accent-violet-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none"
              />
              <span className="text-violet-650 dark:text-violet-400 w-10 text-right font-black">{speed}x</span>
            </div>

            <textarea
              className="w-full py-3 px-4 text-xs md:text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/40 dark:border-neutral-850 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-300/30 resize-none min-h-[90px] leading-relaxed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Gõ lại những gì bạn nghe được..."
              disabled={submitted}
            />

            {submitted && comparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${comparison.percent >= 80 ? "border-emerald-250 bg-emerald-50/30 dark:border-emerald-850/20 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400" : "border-rose-250 bg-rose-50/30 dark:border-rose-850/20 dark:bg-rose-950/20 text-rose-650 dark:text-rose-455"}`}
              >
                <div className="flex items-center gap-2">
                  {comparison.percent >= 80 ? <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> : <XCircle className="h-5 w-5 text-rose-500 shrink-0" />}
                  <span className="text-sm font-black">{comparison.correct}/{comparison.total} từ đúng ({comparison.percent}%)</span>
                </div>
                <p className="text-xs text-emerald-650 dark:text-emerald-450 mt-1.5">✓ {sentences[current]}</p>
              </motion.div>
            )}

            {!submitted ? (
              <Button variant="primary" className="w-full justify-center py-4 font-bold text-xs md:text-sm cursor-pointer shadow-glow" onClick={handleSubmit} disabled={!input.trim()}>
                Kiểm tra <CheckCircle className="h-4 w-4 ml-1 shrink-0" />
              </Button>
            ) : (
              <Button variant="primary" className="w-full justify-center py-4 font-bold text-xs md:text-sm cursor-pointer shadow-glow" onClick={handleNext}>
                {current < sentences.length - 1 ? <>Câu tiếp <ArrowRight className="h-4 w-4 ml-1 shrink-0" /></> : <>Xem kết quả <Trophy className="h-4 w-4 ml-1 shrink-0" /></>}
              </Button>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Listening Quiz Component ──
function ListeningQuizMode({ onBack }: { onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const quiz = LISTENING_QUIZZES[quizIndex];

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed;
    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en"));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.speak(utterance);
  };

  const submitQuiz = () => {
    setShowResult(true);
    const correct = quiz.questions.filter((q, i) => answers[`${quiz.id}_${i}`] === q.correct).length;
    const xp = correct * 10 + 15;
    awardXp(xp);
    addToast({ type: "xp", title: `+${xp} XP!`, message: `Đúng ${correct}/${quiz.questions.length} câu!` });
  };

  const nextQuiz = () => {
    if (quizIndex < LISTENING_QUIZZES.length - 1) {
      setQuizIndex((i) => i + 1);
      setAnswers({});
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={onBack}>← Quay lại</Button>
        <Badge variant="primary" className="text-xs md:text-sm font-black px-3.5 py-1">Bài {quizIndex + 1}/{LISTENING_QUIZZES.length}</Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`quiz-${quizIndex}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ type: "spring", stiffness: 95, damping: 16 }}
        >
          <Card variant="bezel" className="p-6 space-y-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)]">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white font-display">{quiz.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Nghe đoạn hội thoại rồi trả lời các câu hỏi bên dưới</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50/50 dark:bg-neutral-950 p-4 rounded-2xl border border-slate-200/20">
              <div className="relative inline-block self-start sm:self-auto">
                {isAudioPlaying && (
                  <motion.span
                    className="absolute -inset-2 rounded-full bg-violet-500/10 pointer-events-none"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
                <Button variant="primary" size="sm" className="rounded-xl font-bold cursor-pointer flex items-center gap-1 px-4 py-2.5 shadow-glow" onClick={() => speak(quiz.passage)}>
                  <Volume2 className={`h-4.5 w-4.5 ${isAudioPlaying ? "animate-bounce" : ""}`} /> Nghe Audio
                </Button>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-450 font-bold flex-1 w-full">
                <span className="shrink-0 select-none">Tốc độ:</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="flex-1 accent-violet-500 cursor-pointer h-1 bg-slate-250 dark:bg-neutral-850 rounded-lg appearance-none"
                />
                <span className="font-black text-violet-650 dark:text-violet-400 w-8 text-right">{speed}x</span>
              </div>
            </div>

            <div className="space-y-5">
              {quiz.questions.map((q, qi) => {
                const key = `${quiz.id}_${qi}`;
                const isCorrect = showResult && answers[key] === q.correct;
                const isWrong = showResult && answers[key] !== undefined && answers[key] !== q.correct;
                return (
                  <div key={qi} className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold ${isCorrect ? "border-emerald-350 bg-emerald-50/30 dark:border-emerald-850/20 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450" : isWrong ? "border-rose-350 bg-rose-50/30 dark:border-rose-850/20 dark:bg-rose-950/20 text-rose-700 dark:text-rose-455" : "border-slate-200/50 dark:border-neutral-850 bg-white dark:bg-neutral-950"}`}>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3">Q{qi + 1}. {q.text}</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {q.options.map((opt, oi) => {
                        const selected = answers[key] === oi;
                        const correctOpt = showResult && oi === q.correct;
                        return (
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            key={oi}
                            onClick={() => !showResult && setAnswers((prev) => ({ ...prev, [key]: oi }))}
                            disabled={showResult}
                            className={`p-3 rounded-xl text-[11px] font-bold text-left transition-all border cursor-pointer leading-snug ${
                              correctOpt ? "border-emerald-400 bg-emerald-100/55 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                              : selected && isWrong ? "border-rose-400 bg-rose-100/55 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300"
                              : selected ? "border-violet-400 bg-violet-50 dark:bg-violet-950/20 text-violet-750 dark:text-violet-400"
                              : "border-slate-200 dark:border-neutral-850 text-slate-650 dark:text-slate-400 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {!showResult ? (
              <Button variant="primary" className="w-full justify-center py-4 font-bold text-xs md:text-sm cursor-pointer shadow-glow" onClick={submitQuiz}
                disabled={Object.keys(answers).length < quiz.questions.length}>
                <Zap className="h-4 w-4 mr-1 text-yellow-300 animate-bounce" /> Nộp bài
              </Button>
            ) : quizIndex < LISTENING_QUIZZES.length - 1 ? (
              <Button variant="primary" className="w-full justify-center py-4 font-bold text-xs md:text-sm cursor-pointer shadow-glow" onClick={nextQuiz}>
                Bài tiếp <ArrowRight className="h-4 w-4 ml-1 shrink-0" />
              </Button>
            ) : (
              <Button variant="secondary" className="w-full justify-center py-4 font-bold text-xs md:text-sm cursor-pointer" onClick={onBack}>
                ← Quay lại trang chính
              </Button>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main Listening Page ──
export default function ListeningPage() {
  const [mode, setMode] = useState<"menu" | "dictation" | "quiz">("menu");

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
      <AnimatePresence mode="wait">
        {mode === "dictation" && (
          <motion.div
            key="dictation-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            className="max-w-2xl mx-auto"
          >
            <DictationMode onBack={() => setMode("menu")} />
          </motion.div>
        )}

        {mode === "quiz" && (
          <motion.div
            key="quiz-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            className="max-w-2xl mx-auto"
          >
            <ListeningQuizMode onBack={() => setMode("menu")} />
          </motion.div>
        )}

        {mode === "menu" && (
          <motion.div
            key="menu-panel"
            variants={menuContainerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-6"
          >
            <motion.div
              variants={menuItemVariants}
              className="page-header"
            >
              <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white font-display">
                <Headphones className="h-7 w-7 text-violet-500 animate-pulse" /> Luyện Nghe tiếng Anh
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Cải thiện kỹ năng nghe hiểu qua bài tập Dictation (Chính tả) và Listening Quiz (Trắc nghiệm bài hội thoại).
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div
                variants={menuItemVariants}
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("dictation")}
                className="cursor-pointer"
              >
                <Card variant="bezel" className="p-6 flex flex-col justify-between h-full bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden group">
                  <div>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-650 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Mic className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-black text-slate-800 dark:text-white font-display">Dictation</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                      Nghe phát âm rồi gõ lại chính xác từng câu. Giúp rèn luyện khả năng bắt âm nhạy bén và kiểm tra chính tả.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100/50 dark:border-neutral-850/50">
                    <Badge variant="primary">5 câu</Badge>
                    <Badge variant="neutral">~5 phút</Badge>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={menuItemVariants}
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("quiz")}
                className="cursor-pointer"
              >
                <Card variant="bezel" className="p-6 flex flex-col justify-between h-full bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden group">
                  <div>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-650 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Headphones className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-black text-slate-800 dark:text-white font-display">Listening Quiz</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                      Nghe các đoạn hội thoại thực tế rồi hoàn thành bảng trắc nghiệm. Bám sát dạng đề thi TOEIC Part 3 & Part 4.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100/50 dark:border-neutral-850/50">
                    <Badge variant="primary">3 bài</Badge>
                    <Badge variant="neutral">~8 phút</Badge>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
