"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Button, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  BookOpen,
  Headphones,
  CheckCircle,
  XCircle,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Send,
  ArrowLeft,
  Info,
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  questionType: string;
  content: string;
  options: Array<{ id: string; text: string }>;
  imageUrl?: string;
  audioUrl?: string;
  points: number;
  orderIndex: number;
}

interface Section {
  id: string;
  name: string;
  sectionType: string;
  audioUrl?: string;
  passageText?: string;
  questions: Question[];
}

interface ExamAttemptDetail {
  attemptId: string;
  exam: {
    id: string;
    title: string;
    duration: number;
    totalQuestions: number;
    sections: Section[];
  };
}

export default function ActiveExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [gameState, setGameState] = useState<"intro" | "testing" | "review">("intro");
  const [examData, setExamData] = useState<ExamAttemptDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  // Testing states
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // { questionId: optionId }
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0); // index in flat questions list

  // Grading feedback states
  const [gradingResult, setGradingResult] = useState<any>(null);

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Flat list of questions for easier navigation
  const flatQuestions = React.useMemo(() => {
    if (!examData) return [];
    const questions: { question: Question; section: Section }[] = [];
    examData.exam.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        questions.push({ question: q, section: sec });
      });
    });
    return questions;
  }, [examData]);

  // Fetch / start exam attempt
  const startExam = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/exams/attempt/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setExamData(json.data);
        setAttemptId(json.data.attemptId);
        setTimeLeft(json.data.exam.duration * 60);
        setGameState("testing");
        setCurrentQuestionIdx(0);
        startCountdown();
      } else {
        alert(json.error || "Không thể khởi động bài thi!");
      }
    } catch (e) {
      console.error("Error starting exam attempt:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current!);
          // Auto submit
          submitExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const submitExam = async (isAutoSubmit = false) => {
    if (!isAutoSubmit && !confirm("Bạn có chắc chắn muốn nộp bài thi ngay?")) return;
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    setIsLoading(true);
    // Format answers array
    const formattedAnswers = flatQuestions.map((item) => ({
      questionId: item.question.id,
      userAnswer: userAnswers[item.question.id] || "",
    }));

    try {
      const res = await fetch("/api/exams/attempt/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          answers: formattedAnswers,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setGradingResult(json.data);
        setGameState("review");
      } else {
        alert(json.error || "Không thể nộp bài thi!");
      }
    } catch (e) {
      console.error("Error submitting exam:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Helper properties
  const activeQuestionItem = flatQuestions[currentQuestionIdx];
  const isTimeLow = timeLeft < 300; // less than 5 mins (300 seconds)

  // UI rendering based on state
  return (
    <div className="mx-auto max-w-6xl space-y-6" suppressHydrationWarning>
      <AnimatePresence mode="wait">
        {/* 1. INTRO SCREEN */}
        {gameState === "intro" && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            className="mx-auto max-w-2xl text-center py-12 space-y-6"
          >
            <Link href="/study/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer select-none">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.3} />
              Quay lại cổng đề thi
            </Link>
            
            <div className="bezel">
              <div className="bezel-inner bg-white dark:bg-neutral-900 p-8 space-y-6 text-left">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-display">
                    Đề thi thử chuẩn hóa
                  </h1>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Vui lòng đọc kỹ thông tin trước khi bắt đầu làm bài thi.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-neutral-950/40 p-5 rounded-2xl border border-slate-100 dark:border-neutral-850 grid grid-cols-2 gap-4 text-xs font-bold text-slate-700 dark:text-slate-350">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-sky-500" strokeWidth={1.3} />
                    <span>Thời gian: {examData ? examData.exam.duration : 120} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" strokeWidth={1.3} />
                    <span>Tổng số: {examData ? examData.exam.totalQuestions : 6} câu</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  <Info className="h-5 w-5 text-sky-550 shrink-0 mt-0.5" strokeWidth={1.3} />
                  <span>
                    Bài thi thử sẽ được bắt đầu đếm ngược ngay khi bạn bấm nút dưới đây. Hệ thống sẽ tự động nộp bài khi hết giờ. Vui lòng đảm bảo kết nối internet ổn định trong quá trình thi.
                  </span>
                </div>

                {/* Rule 18: Primary Action Button verb is action-oriented */}
                <Button
                  variant="primary"
                  className="w-full py-4 font-bold text-xs md:text-sm cursor-pointer shadow-glow"
                  onClick={startExam}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang chuẩn bị đề..." : "Bắt đầu làm bài thi"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. TESTING STATE */}
        {gameState === "testing" && examData && activeQuestionItem && (
          <motion.div
            key="testing-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            className="space-y-6 pb-24 md:pb-6"
          >
            {/* Top Bar Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-neutral-900 px-6 py-4 rounded-3xl border border-slate-100 dark:border-neutral-850 shadow-sm">
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white font-display">
                  {examData.exam.title}
                </h2>
              </div>
              <div className="flex items-center justify-end gap-3 self-end sm:self-auto">
                <div className={`relative flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black transition-colors ${
                  isTimeLow 
                    ? "bg-rose-500/10 text-rose-500 ring-2 ring-rose-500/20" 
                    : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 ring-1 ring-rose-100/50"
                }`}>
                  {isTimeLow && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-rose-500/10 pointer-events-none"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    />
                  )}
                  <Timer className={`h-4.5 w-4.5 ${isTimeLow ? "animate-pulse" : ""}`} strokeWidth={1.3} />
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <Button variant="danger" size="sm" className="hidden md:flex font-bold items-center gap-1.5 rounded-xl cursor-pointer" onClick={() => submitExam(false)}>
                  <Send className="h-4 w-4" strokeWidth={1.3} />
                  Nộp bài
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-5 items-start">
              {/* Left Content Column */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4 min-h-[300px]">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Nội dung đề bài</span>
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {activeQuestionItem.section.name}
                    </h3>

                    {activeQuestionItem.section.audioUrl && (
                      <div className="bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-2xl border border-slate-100 dark:border-neutral-850 space-y-2">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                          <Headphones className="h-4.5 w-4.5 text-sky-500 animate-bounce" strokeWidth={1.3} />
                          Listening Audio Player:
                        </span>
                        <audio controls className="w-full mt-2 focus:outline-none" src={activeQuestionItem.section.audioUrl} />
                      </div>
                    )}

                    {activeQuestionItem.section.passageText && (
                      <div className="bg-slate-50 dark:bg-neutral-950/40 p-5 rounded-2xl border border-slate-100 dark:border-neutral-850 text-xs md:text-sm text-slate-700 dark:text-slate-350 leading-relaxed max-h-[350px] overflow-y-auto font-medium">
                        {activeQuestionItem.section.passageText}
                      </div>
                    )}

                    {!activeQuestionItem.section.audioUrl && !activeQuestionItem.section.passageText && (
                      <div className="flex h-40 items-center justify-center text-slate-400 text-[10px] font-black uppercase">
                        Không có tài liệu nghe/đọc cho phần này.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Question Option Selector Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        Câu hỏi {currentQuestionIdx + 1} / {flatQuestions.length}
                      </span>
                      <Badge variant="primary">+{activeQuestionItem.question.points} Điểm</Badge>
                    </div>

                    {activeQuestionItem.question.imageUrl && (
                      <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-850 max-h-48 flex justify-center">
                        <img src={activeQuestionItem.question.imageUrl} className="object-cover w-full h-full" alt="Question Image" />
                      </div>
                    )}

                    <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {activeQuestionItem.question.content}
                    </h3>

                    <div className="flex flex-col gap-2.5">
                      {activeQuestionItem.question.options.map((opt) => {
                        const isSelected = userAnswers[activeQuestionItem.question.id] === opt.id;
                        return (
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            key={opt.id}
                            type="button"
                            onClick={() => selectAnswer(activeQuestionItem.question.id, opt.id)}
                            className={`rounded-2xl border px-4 py-3.5 text-left text-xs md:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? "border-sky-400 bg-sky-50/50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-400 ring-1 ring-sky-300/30"
                                : "border-slate-250 dark:border-neutral-850 bg-white dark:bg-neutral-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="font-black text-sky-500">{opt.id}.</span>
                              <span>{opt.text}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-Jump Grid */}
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block select-none">Danh sách câu hỏi</span>
                    <div className="flex flex-wrap gap-2">
                      {flatQuestions.map((_, idx) => {
                        const qId = flatQuestions[idx].question.id;
                        const isAnsweredVal = !!userAnswers[qId];
                        const isCurrent = currentQuestionIdx === idx;

                        let bubbleStyle = "bg-slate-50 border-slate-200 text-slate-500 dark:bg-neutral-950 dark:border-neutral-850 dark:text-slate-450";
                        if (isAnsweredVal) {
                          bubbleStyle = "bg-sky-500 border-sky-600 text-white shadow-sm shadow-sky-500/10";
                        }
                        if (isCurrent) {
                          bubbleStyle = "bg-indigo-600 border-indigo-700 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-800";
                        }

                        return (
                          <motion.button
                            whileTap={{ scale: 0.93 }}
                            key={idx}
                            type="button"
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`h-9 w-9 rounded-xl border flex items-center justify-center font-bold text-xs cursor-pointer ${bubbleStyle}`}
                          >
                            {idx + 1}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="hidden md:flex gap-2.5 pt-2">
                      <Button
                        variant="bezel"
                        size="sm"
                        className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 cursor-pointer"
                        onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                        disabled={currentQuestionIdx === 0}
                      >
                        <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.3} />
                        Câu trước
                      </Button>
                      <Button
                        variant="bezel"
                        size="sm"
                        className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 cursor-pointer"
                        onClick={() => setCurrentQuestionIdx((p) => Math.min(flatQuestions.length - 1, p + 1))}
                        disabled={currentQuestionIdx === flatQuestions.length - 1}
                      >
                        Câu tiếp
                        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={1.3} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Thumb-Zone CTA Action Bar (Rule 13) */}
            <div className="fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-slate-200/50 dark:border-neutral-850/50 shadow-xl rounded-2xl p-3 flex gap-2 md:hidden">
              <Button
                variant="bezel"
                size="sm"
                className="flex-grow flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 cursor-pointer"
                onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                disabled={currentQuestionIdx === 0}
              >
                <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={1.3} />
                Câu trước
              </Button>
              <Button
                variant="bezel"
                size="sm"
                className="flex-grow flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 cursor-pointer"
                onClick={() => setCurrentQuestionIdx((p) => Math.min(flatQuestions.length - 1, p + 1))}
                disabled={currentQuestionIdx === flatQuestions.length - 1}
              >
                Câu tiếp
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={1.3} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="px-4 font-bold flex items-center justify-center gap-1.5 rounded-xl cursor-pointer"
                onClick={() => submitExam(false)}
              >
                <Send className="h-4 w-4" strokeWidth={1.3} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* 3. REVIEW RESULTS STATE */}
        {gameState === "review" && gradingResult && (
          <motion.div
            key="review-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="mx-auto max-w-4xl space-y-8"
          >
            {/* Hero Score widget */}
            <div className="bezel">
              <div className="bezel-inner bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 md:p-8 text-white rounded-[calc(var(--radius-3xl)-6px)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[90px] pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left relative z-10">
                  <div className="space-y-2">
                    <Badge variant="success" className="bg-white/20 border-white/30 text-white font-black px-3.5 py-0.5">
                      HOÀN THÀNH BÀI THI
                    </Badge>
                    <h1 className="text-2xl md:text-3xl font-black font-display">Kết quả thi thử của bạn</h1>
                    <p className="text-xs md:text-sm text-white/80 max-w-sm font-medium leading-relaxed">
                      Chúc mừng bạn đã hoàn thành bài thi thử! Điểm số của bạn đã được cập nhật.
                    </p>
                  </div>

                  <div className="bg-white/10 p-5 rounded-2xl border border-white/20 flex flex-col items-center min-w-[150px] shadow-inner">
                    <span className="text-[9px] font-black uppercase text-white/70">Điểm quy đổi ước lượng</span>
                    <span className="text-3xl md:text-4xl font-black text-yellow-300 mt-1 font-display">
                      {gradingResult.attempt.estimatedScore !== null
                        ? `${gradingResult.attempt.estimatedScore} / 990`
                        : `Band ${gradingResult.attempt.estimatedBand}`}
                    </span>
                    <span className="text-[10px] font-black text-white/85 mt-2">
                      Tỷ lệ đúng: {Math.round(gradingResult.attempt.percentage)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Alert */}
            <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/20 p-5 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-7 w-7 text-amber-500 animate-bounce" strokeWidth={1.3} />
                <div>
                  <h4 className="text-xs md:text-sm font-black text-amber-800 dark:text-amber-400">Nhiệm vụ hoàn thành</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Nhận thưởng XP tích lũy thăng cấp học viên.</p>
                </div>
              </div>
              <span className="text-lg md:text-xl font-black text-amber-600">+{gradingResult.xpGained} XP</span>
            </div>

            {/* Review Question Keys List */}
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white font-display">
                Xem lại lỗi sai
              </h3>
              
              <div className="space-y-6">
                {gradingResult.feedback.map((section: any, sIdx: number) => (
                  <div key={sIdx} className="space-y-4">
                    <h4 className="font-black text-slate-550 dark:text-slate-400 text-xs md:text-sm border-b border-slate-100 dark:border-neutral-850 pb-2 uppercase tracking-wide">
                      {section.name}
                    </h4>

                    <div className="space-y-4">
                      {section.questions.map((q: any, qIdx: number) => {
                        const isUserCorrect = q.isCorrect;
                        return (
                          <div key={q.id} className="bezel">
                            <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400">Câu {qIdx + 1}</span>
                                {isUserCorrect ? (
                                  <Badge variant="success" className="flex items-center gap-1.5 font-bold">
                                    <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.3} />
                                    Đúng
                                  </Badge>
                                ) : (
                                  <Badge variant="danger" className="flex items-center gap-1.5 font-bold">
                                    <XCircle className="h-3.5 w-3.5" strokeWidth={1.3} />
                                    Sai
                                  </Badge>
                                )}
                              </div>

                              <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                                {q.content}
                              </h4>

                              <div className="grid gap-2.5 md:grid-cols-2 text-xs font-semibold">
                                {q.options.map((opt: any) => {
                                  const isCorrectAnswer = opt.id === q.correctAnswer;
                                  const isSelectedByUser = opt.id === q.userAnswer;
                                  
                                  let optionClass = "border-slate-100 dark:border-neutral-850 text-slate-655 dark:text-slate-400";
                                  if (isCorrectAnswer) {
                                    optionClass = "border-emerald-350 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 font-bold ring-1 ring-emerald-500/10";
                                  } else if (isSelectedByUser) {
                                    optionClass = "border-rose-350 bg-rose-50/40 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 font-bold ring-1 ring-rose-500/10";
                                  }

                                  return (
                                    <div key={opt.id} className={`rounded-xl border p-3 flex items-center justify-between leading-snug ${optionClass}`}>
                                      <span>{opt.id}. {opt.text}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {q.explanation && (
                                <div className="bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-xl border border-slate-100 dark:border-neutral-850 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                  <span className="font-black text-slate-850 dark:text-slate-200 block mb-1">Giải thích đáp án:</span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/study/exams" className="w-full">
                <Button variant="bezel" className="w-full py-4 text-xs md:text-sm font-bold rounded-2xl cursor-pointer">
                  Quay lại cổng đề thi
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full">
                <Button variant="primary" className="w-full py-4 text-xs md:text-sm font-bold rounded-2xl cursor-pointer shadow-glow">
                  Quay lại Trang chủ
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
