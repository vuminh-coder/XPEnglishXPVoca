"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
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

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed;
    utterance.pitch = 1;
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
      <Card variant="bezel" className="p-8 text-center space-y-5">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
        <div className="text-3xl font-black text-slate-900 dark:text-white">{avgScore}%</div>
        <p className="text-sm text-muted">Trung bình chính xác qua {sentences.length} câu</p>
        <div className="space-y-3 text-left max-w-lg mx-auto">
          {results.map((r, i) => (
            <div key={i} className={`p-3 rounded-xl border text-xs ${r.score >= 80 ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/30 dark:bg-emerald-950/20" : "border-rose-200 bg-rose-50/50 dark:border-rose-800/30 dark:bg-rose-950/20"}`}>
              <p className="font-bold text-slate-700 dark:text-slate-300">✓ {r.sentence}</p>
              <p className="text-muted mt-1">Bạn gõ: {r.input}</p>
              <Badge variant={r.score >= 80 ? "success" : "danger"} className="mt-1.5">{r.score}%</Badge>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
          <Button variant="primary" size="sm" onClick={() => { setCurrent(0); setInput(""); setSubmitted(false); setResults([]); setGameOver(false); }}>
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
        <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
        <Badge variant="primary">{current + 1}/{sentences.length}</Badge>
      </div>

      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all" style={{ width: `${((current + 1) / sentences.length) * 100}%` }} />
      </div>

      <Card variant="bezel" className="p-6 space-y-5">
        <div className="text-center">
          <p className="text-xs text-muted font-bold mb-3">Nghe và gõ lại chính xác câu bạn nghe được</p>
          <Button variant="primary" size="md" onClick={() => speak(sentences[current])}>
            <Volume2 className="h-5 w-5 mr-2" /> Phát âm thanh
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="font-bold shrink-0">Tốc độ:</span>
          <input type="range" min="0.5" max="1.5" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 accent-violet-500" />
          <span className="font-black text-violet-600 w-10 text-right">{speed}x</span>
        </div>

        <textarea
          className="w-full py-3 px-4 text-sm font-medium rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:border-violet-400 resize-none min-h-[80px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gõ lại những gì bạn nghe được..."
          disabled={submitted}
        />

        {submitted && comparison && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-800 space-y-2">
            <div className="flex items-center gap-2">
              {comparison.percent >= 80 ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-rose-500" />}
              <span className="text-sm font-black">{comparison.correct}/{comparison.total} từ đúng ({comparison.percent}%)</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">✓ {sentences[current]}</p>
          </div>
        )}

        {!submitted ? (
          <Button variant="primary" className="w-full justify-center" onClick={handleSubmit} disabled={!input.trim()}>
            Kiểm tra <CheckCircle className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button variant="primary" className="w-full justify-center" onClick={handleNext}>
            {current < sentences.length - 1 ? <>Câu tiếp <ArrowRight className="h-4 w-4 ml-1" /></> : <>Xem kết quả <Trophy className="h-4 w-4 ml-1" /></>}
          </Button>
        )}
      </Card>
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
  const quiz = LISTENING_QUIZZES[quizIndex];

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed;
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
        <Button variant="secondary" size="sm" onClick={onBack}>← Quay lại</Button>
        <Badge variant="primary">Bài {quizIndex + 1}/{LISTENING_QUIZZES.length}</Badge>
      </div>

      <Card variant="bezel" className="p-6 space-y-5">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white">{quiz.title}</h3>
          <p className="text-xs text-muted mt-1">Nghe đoạn hội thoại rồi trả lời các câu hỏi bên dưới</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => speak(quiz.passage)}>
            <Volume2 className="h-4 w-4 mr-1" /> Nghe
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted flex-1">
            <span className="font-bold">Tốc độ:</span>
            <input type="range" min="0.5" max="1.5" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-violet-500" />
            <span className="font-black text-violet-600">{speed}x</span>
          </div>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((q, qi) => {
            const key = `${quiz.id}_${qi}`;
            const isCorrect = showResult && answers[key] === q.correct;
            const isWrong = showResult && answers[key] !== undefined && answers[key] !== q.correct;
            return (
              <div key={qi} className={`p-4 rounded-xl border ${isCorrect ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800/30 dark:bg-emerald-950/20" : isWrong ? "border-rose-300 bg-rose-50/50 dark:border-rose-800/30 dark:bg-rose-950/20" : "border-slate-200 dark:border-neutral-700"}`}>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">Q{qi + 1}. {q.text}</p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[key] === oi;
                    const correctOpt = showResult && oi === q.correct;
                    return (
                      <button
                        key={oi}
                        onClick={() => !showResult && setAnswers((prev) => ({ ...prev, [key]: oi }))}
                        disabled={showResult}
                        className={`p-2.5 rounded-lg text-[11px] font-bold text-left transition-all border ${
                          correctOpt ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                          : selected && isWrong ? "border-rose-400 bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300"
                          : selected ? "border-violet-400 bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300"
                          : "border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!showResult ? (
          <Button variant="primary" className="w-full justify-center" onClick={submitQuiz}
            disabled={Object.keys(answers).length < quiz.questions.length}>
            <Zap className="h-4 w-4 mr-1" /> Nộp bài
          </Button>
        ) : quizIndex < LISTENING_QUIZZES.length - 1 ? (
          <Button variant="primary" className="w-full justify-center" onClick={nextQuiz}>
            Bài tiếp <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button variant="secondary" className="w-full justify-center" onClick={onBack}>
            ← Quay lại trang chính
          </Button>
        )}
      </Card>
    </div>
  );
}

// ── Main Listening Page ──
export default function ListeningPage() {
  const [mode, setMode] = useState<"menu" | "dictation" | "quiz">("menu");

  if (mode === "dictation") {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto pb-20 md:pb-6">
        <DictationMode onBack={() => setMode("menu")} />
      </div>
    );
  }

  if (mode === "quiz") {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto pb-20 md:pb-6">
        <ListeningQuizMode onBack={() => setMode("menu")} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Headphones className="h-7 w-7 text-violet-500" /> Luyện Nghe tiếng Anh
        </h1>
        <p className="page-subtitle text-muted mt-1">Cải thiện kỹ năng nghe hiểu qua bài tập Dictation và Listening Quiz.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card variant="bezel" hoverable className="p-6 cursor-pointer group" onClick={() => setMode("dictation")}>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-4">
            <Mic className="h-7 w-7" />
          </div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">Dictation</h3>
          <p className="text-xs text-muted mt-1 leading-relaxed">Nghe phát âm rồi gõ lại chính xác. Rèn luyện khả năng bắt âm và chính tả.</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="primary">5 câu</Badge>
            <Badge variant="neutral">~5 phút</Badge>
          </div>
        </Card>

        <Card variant="bezel" hoverable className="p-6 cursor-pointer group" onClick={() => setMode("quiz")}>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white mb-4">
            <Headphones className="h-7 w-7" />
          </div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">Listening Quiz</h3>
          <p className="text-xs text-muted mt-1 leading-relaxed">Nghe đoạn văn rồi trả lời trắc nghiệm. Phong cách TOEIC Part 3-4.</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="primary">3 bài</Badge>
            <Badge variant="neutral">~8 phút</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
