"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Badge } from "@/shared/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  PageEntranceWrapper,
  MotionItem,
} from "@/shared/components/feedback/PageEntranceAnimation";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Home,
  CheckCircle2,
  XCircle,
  Compass,
  Trophy,
  Award,
  Zap,
} from "lucide-react";

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

  // Pure memoized score calculation following DRY principles
  const score = React.useMemo(() => {
    let s = 0;
    PLACEMENT_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        s += q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3;
      }
    });
    return s;
  }, [answers]);

  const calculateResult = () => {
    setShowResult(true);
    const xp = score * 5 + 30;
    awardXp(xp);
  };

  const getLevel = () => {
    if (score >= 16)
      return {
        level: "Nâng Cao (Advanced - C1/C2)",
        shortLevel: "Advanced",
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-300",
        emoji: "🏆",
        desc: "Năng lực ngôn ngữ học thuật xuất sắc! Hệ thống gợi ý bạn bắt đầu ngay với các chủ đề IELTS 7.5+, Shadowing chuyên sâu và Đấu trường PvP.",
      };
    if (score >= 8)
      return {
        level: "Trung Cấp (Intermediate - B1/B2)",
        shortLevel: "Intermediate",
        color: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-300",
        emoji: "📘",
        desc: "Khả năng nắm bắt từ vựng và ngữ pháp tốt! Lộ trình gợi ý tăng cường vốn từ B2, luyện nghe Dictation và thực hành cùng Gia sư AI.",
      };
    return {
      level: "Cơ Bản (Beginner - A1/A2)",
      shortLevel: "Beginner",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300",
      emoji: "🌱",
      desc: "Nền tảng khởi đầu vững chắc! Hệ thống đã tự động kích hoạt bộ từ vựng cơ bản Oxford 3000 và các bài luyện tập phản xạ dễ tiếp cận.",
    };
  };

  const correctCount = React.useMemo(() => {
    return PLACEMENT_QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
  }, [answers]);

  const progressPct = ((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100;

  return (
    <PageEntranceWrapper className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1 pb-16">
      {/* Top Header Standard */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem
            label="Đánh Giá Năng Lực"
            icon={<GraduationCap className="w-3.5 h-3.5" />}
            active={!showResult}
          />
          {showResult && (
            <HeaderPillItem
              label="Kết Quả Xếp Lớp"
              icon={<Trophy className="w-3.5 h-3.5" />}
              active={true}
            />
          )}
          <HeaderPillItem
            label="Trang Chủ"
            icon={<Home className="w-3.5 h-3.5" />}
            href="/dashboard"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {showResult ? (
        /* Result State */
        <MotionItem className="max-w-3xl mx-auto space-y-6">
          {/* Result Hero Stage */}
          {(() => {
            const levelInfo = getLevel();
            const earnedXp = score * 5 + 30;
            return (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-[#002b5b] p-6 sm:p-8 text-white shadow-xl shadow-royal/10">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-royal-light/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg">
                    {levelInfo.emoji}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" /> Hoàn thành bài đánh giá
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Trình Độ: {levelInfo.shortLevel}
                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed max-w-xl">
                      {levelInfo.desc}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Đúng {correctCount}/{PLACEMENT_QUESTIONS.length} câu
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 backdrop-blur-md border border-amber-300/30 text-xs font-black text-amber-300 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        +{earnedXp} XP Thưởng Khởi Đầu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Breakdown Review Grid */}
          <Card variant="bezel" className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-royal" /> Chi Tiết 10 Câu Hỏi
              </h2>
              <span className="text-xs text-muted font-bold">
                Tỷ lệ chính xác: {Math.round((correctCount / PLACEMENT_QUESTIONS.length) * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLACEMENT_QUESTIONS.map((q) => {
                const isCorrect = answers[q.id] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isCorrect
                        ? "bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-950/15 dark:border-emerald-500/30"
                        : "bg-rose-500/5 border-rose-500/20 dark:bg-rose-950/15 dark:border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <div className="truncate">
                        <p className="text-xs font-black text-slate-800 dark:text-white truncate">
                          Câu {q.id}: {q.text.replace("___", "...")}
                        </p>
                        <p className="text-[11px] text-muted">
                          Đáp án đúng: <span className="font-bold text-slate-700 dark:text-slate-300">{q.options[q.correct]}</span>
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        q.difficulty === "easy"
                          ? "success"
                          : q.difficulty === "medium"
                          ? "primary"
                          : "danger"
                      }
                      className="text-[10px] shrink-0"
                    >
                      {q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "TB" : "Khó"}
                    </Badge>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-neutral-800">
              <p className="text-xs text-muted">
                Hệ thống đã tự động tối ưu giáo trình học tập của bạn theo kết quả này.
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto text-white dark:text-white px-6 font-bold shadow-lg shadow-royal/20"
                onClick={() => {
                  const levelInfo = getLevel();
                  addToast({
                    type: "success",
                    title: `Chào mừng! Trình độ: ${levelInfo.shortLevel}`,
                    message: "Hệ thống đã thiết lập lộ trình học phù hợp cho bạn.",
                  });
                  router.push("/dashboard");
                }}
              >
                <Sparkles className="h-4 w-4 mr-1.5" /> Bắt Đầu Học Ngay
              </Button>
            </div>
          </Card>
        </MotionItem>
      ) : (
        /* Quiz Stage */
        <MotionItem className="max-w-2xl mx-auto space-y-5">
          {/* Progress Tracker Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-royal font-black">
                <GraduationCap className="w-4 h-4" /> Câu hỏi {currentIndex + 1} / {PLACEMENT_QUESTIONS.length}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {Math.round(progressPct)}% hoàn thành
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-royal to-royal-light transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card variant="bezel" className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4">
              <Badge variant="neutral" className="text-xs font-bold">
                Câu Số {currentIndex + 1}
              </Badge>
              <Badge
                variant={
                  question.difficulty === "easy"
                    ? "success"
                    : question.difficulty === "medium"
                    ? "primary"
                    : "danger"
                }
                className="text-xs"
              >
                Độ khó: {question.difficulty === "easy" ? "Cơ bản" : question.difficulty === "medium" ? "Trung bình" : "Nâng cao"}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">
                Chọn từ thích hợp điền vào chỗ trống
              </p>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, i) => {
                const isSelected = answers[question.id] === i;
                const letter = String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    className={`w-full p-4 rounded-xl text-sm font-bold text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? "border-royal bg-royal/10 text-royal dark:bg-royal/20 dark:text-blue-200 shadow-sm"
                        : "border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                          isSelected
                            ? "bg-royal text-white shadow-sm"
                            : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {letter}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-royal shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
              <p className="text-xs text-muted hidden sm:block">
                Chọn 1 phương án chính xác nhất để tiếp tục
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto text-white dark:text-white px-7 font-bold shadow-lg shadow-royal/20 justify-center"
                disabled={answers[question.id] === undefined}
                onClick={goNext}
              >
                {currentIndex < PLACEMENT_QUESTIONS.length - 1 ? (
                  <>
                    Câu Tiếp Theo <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                ) : (
                  <>
                    Xem Kết Quả Xếp Lớp <Sparkles className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </MotionItem>
      )}
    </PageEntranceWrapper>
  );
}
