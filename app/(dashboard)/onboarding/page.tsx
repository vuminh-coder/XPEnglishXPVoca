"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { ArrowRight, CheckCircle, Sparkles, GraduationCap } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
}

const PLACEMENT_QUESTIONS: Question[] = [
  { id: 1, text: "She ___ to school every morning.", options: ["go", "goes", "going", "gone"], correct: 1, difficulty: "easy" },
  { id: 2, text: "I have ___ finished my homework.", options: ["already", "yet", "still", "since"], correct: 0, difficulty: "easy" },
  { id: 3, text: "The book ___ on the table when I came in.", options: ["is", "was", "were", "been"], correct: 1, difficulty: "easy" },
  { id: 4, text: "If I ___ you, I would accept the offer.", options: ["am", "was", "were", "be"], correct: 2, difficulty: "medium" },
  { id: 5, text: "He suggested that she ___ harder.", options: ["study", "studies", "studied", "studying"], correct: 0, difficulty: "medium" },
  { id: 6, text: "By the time we arrived, they ___.", options: ["left", "have left", "had left", "were leaving"], correct: 2, difficulty: "medium" },
  { id: 7, text: "The more you practice, the ___ you become.", options: ["good", "better", "best", "well"], correct: 1, difficulty: "medium" },
  { id: 8, text: "___ the heavy rain, the match continued.", options: ["Although", "Despite", "However", "Because"], correct: 1, difficulty: "hard" },
  { id: 9, text: "She insisted on ___ the project herself.", options: ["complete", "completing", "completed", "to complete"], correct: 1, difficulty: "hard" },
  { id: 10, text: "Had I known earlier, I ___ differently.", options: ["would act", "would have acted", "acted", "had acted"], correct: 1, difficulty: "hard" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const question = PLACEMENT_QUESTIONS[currentIndex];

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const goNext = () => {
    if (currentIndex < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setShowResult(true);
    let score = 0;
    PLACEMENT_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score += q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3;
      }
    });

    const xp = score * 5 + 30;
    awardXp(xp);
  };

  const getLevel = () => {
    let score = 0;
    PLACEMENT_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score += q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3;
      }
    });
    if (score >= 16) return { level: "Advanced", color: "text-violet-600", bg: "bg-violet-100 dark:bg-violet-950/30", emoji: "🏆" };
    if (score >= 8) return { level: "Intermediate", color: "text-sky-600", bg: "bg-sky-100 dark:bg-sky-950/30", emoji: "📘" };
    return { level: "Beginner", color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-950/30", emoji: "🌱" };
  };

  const correctCount = PLACEMENT_QUESTIONS.filter((q) => answers[q.id] === q.correct).length;

  if (showResult) {
    const levelInfo = getLevel();
    return (
      <div className="animate-fade-in max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-6 pb-20 md:pb-6">
        <div className={`h-24 w-24 rounded-3xl ${levelInfo.bg} flex items-center justify-center text-5xl`}>
          {levelInfo.emoji}
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Trình độ của bạn
          </h1>
          <div className={`text-4xl font-black ${levelInfo.color}`}>{levelInfo.level}</div>
          <p className="text-sm text-muted">
            Đúng {correctCount}/{PLACEMENT_QUESTIONS.length} câu
          </p>
        </div>

        <Card variant="bezel" className="p-5 w-full max-w-sm">
          <div className="space-y-2.5">
            {PLACEMENT_QUESTIONS.map((q) => {
              const isCorrect = answers[q.id] === q.correct;
              return (
                <div key={q.id} className="flex items-center gap-2 text-xs">
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <span className="h-4 w-4 rounded-full bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 text-[10px] shrink-0">✗</span>
                  )}
                  <span className="text-slate-600 dark:text-slate-400 truncate flex-1">Câu {q.id}</span>
                  <Badge variant={q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "primary" : "danger"} className="text-[9px]">
                    {q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "TB" : "Khó"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            addToast({ type: "success", title: `Chào mừng! Level: ${levelInfo.level}`, message: "Hệ thống đã thiết lập lộ trình học phù hợp cho bạn." });
            router.push("/dashboard");
          }}
        >
          <Sparkles className="h-4 w-4 mr-1.5" /> Bắt đầu học ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mx-auto">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Bài kiểm tra xếp lớp</h1>
        <p className="text-xs text-muted">10 câu hỏi giúp xác định trình độ tiếng Anh của bạn</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-slate-500">{currentIndex + 1}/{PLACEMENT_QUESTIONS.length}</span>
      </div>

      {/* Question Card */}
      <Card variant="bezel" className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <Badge variant="neutral">Câu {currentIndex + 1}</Badge>
          <Badge variant={question.difficulty === "easy" ? "success" : question.difficulty === "medium" ? "primary" : "danger"}>
            {question.difficulty === "easy" ? "Dễ" : question.difficulty === "medium" ? "Trung bình" : "Khó"}
          </Badge>
        </div>

        <p className="text-base font-black text-slate-800 dark:text-white leading-relaxed">
          {question.text}
        </p>

        <div className="space-y-2.5">
          {question.options.map((option, i) => {
            const isSelected = answers[question.id] === i;
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full p-3.5 rounded-xl text-xs font-bold text-left transition-all border ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-600"
                    : "border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="inline-block w-5 h-5 rounded-lg bg-slate-100 dark:bg-neutral-800 text-center text-[10px] font-black leading-5 mr-2.5">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        <Button
          variant="primary"
          className="w-full justify-center"
          disabled={answers[question.id] === undefined}
          onClick={goNext}
        >
          {currentIndex < PLACEMENT_QUESTIONS.length - 1 ? (
            <>Tiếp theo <ArrowRight className="h-4 w-4 ml-1" /></>
          ) : (
            <>Xem kết quả <Sparkles className="h-4 w-4 ml-1" /></>
          )}
        </Button>
      </Card>
    </div>
  );
}
