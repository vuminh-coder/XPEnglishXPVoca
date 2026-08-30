"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Timer,
  Award,
  CheckCircle2,
  XCircle,
  Bookmark,
  Sparkles,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  RotateCcw,
  Search,
  Headphones,
  BookOpen,
  Mic,
  Wand2,
  RefreshCw,
  TrendingUp,
  Sliders,
  Send,
  Square,
  Star,
  Flag,
  CircleDashed,
  BarChart3,
  Brain,
  Play,
  Pause,
  Volume2,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  Filter,
  ChevronDown,
  X,
  Copy,
  Share2,
  Zap,
  ListFilter,
  ShieldAlert,
} from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import {
  MOCK_EXAM_PAPERS,
  ExamPaper,
  ExamQuestion,
  SkillType,
} from "@/features/exam-prep";
import {
  calculateExamResult,
  ExamResultSummary,
  UserExamAnswers,
  QuestionResultDetail,
} from "@/features/exam-prep/utils/examScoringEngine";
import { FormattedExplanation } from "../components/FormattedExplanation";
import ExamResultLoading from "./loading";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function ExamResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useNotificationStore();

  const [examResult, setExamResult] = useState<ExamResultSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);

  // Ensure bottom nav is always visible on mobile for result page
  useEffect(() => {
    useUiStore.getState().setHideBottomNav(false);
    useUiStore.getState().setSidebarCollapsed(false);
  }, []);

  // Tab State: OVERVIEW | REVIEW | DIAGNOSTIC
  const [reportTab, setReportTab] = useState<"OVERVIEW" | "REVIEW" | "DIAGNOSTIC">("OVERVIEW");
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "SKIPPED" | "FLAGGED">("ALL");
  const [reviewPartFilter, setReviewPartFilter] = useState<number | "ALL">("ALL");
  const [selectedReviewQIndex, setSelectedReviewQIndex] = useState<number>(0);
  const [showReviewTranscript, setShowReviewTranscript] = useState<boolean>(false);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const reviewAudioRef = useRef<HTMLAudioElement | null>(null);

  // AI Explanation State
  const [aiExplainMap, setAiExplainMap] = useState<Record<string, { loading: boolean; data?: any; error?: string }>>({});
  const [overallAiAdvice, setOverallAiAdvice] = useState<{ loading: boolean; content?: string; potentialScore?: string; topFocus?: string } | null>(null);

  const handleGetOverallAiAdvice = async () => {
    if (!examResult) return;
    setOverallAiAdvice({ loading: true });

    try {
      const weakPartsList = examResult.weaknesses.map((w) => `${w.partTitle} (Độ đúng: ${w.accuracyPercent}%)`).join(", ");
      const prompt = `Bạn là Chuyên gia Luyện thi Trưởng (Senior IELTS/TOEIC AI Coach). 
Dưới đây là kết quả thi thử của học viên trong đề ${examResult.examTitle}:
- Điểm quy đổi: ${examResult.scaledScore} / ${examResult.maxScore} (Độ chính xác: ${examResult.accuracyPercent}%)
- Số câu đúng: ${examResult.correctCount}/${examResult.totalQuestions} (Sai: ${examResult.incorrectCount}, Bỏ qua: ${examResult.skippedCount})
- Tốc độ làm bài trung bình: ${examResult.avgTimePerQuestion}s / câu
- Các phần yếu nhất: ${weakPartsList || "Chưa xác định"}

Hãy đưa ra đánh giá chẩn đoán chuyên sâu:
1. Nhận xét tổng quan về phong độ và tư duy làm bài hiện tại.
2. 3 lỗi tư duy hoặc bẫy đề thi nguy hiểm nhất mà học viên đang vấp phải.
3. Chiến lược bứt phá +200 điểm trong 14 ngày tới (kèm thời lượng biểu phân bổ mỗi ngày).
Văn phong truyền cảm hứng, ngắn gọn, súc tích, định dạng markdown chuẩn.`;

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Không thể kết nối AI Tutor");
      const data = await response.json();
      setOverallAiAdvice({
        loading: false,
        content: data.reply || data.content || "Đã phân tích xong lộ trình cá nhân hóa.",
        potentialScore: `${Math.min(examResult.maxScore, examResult.scaledScore + 220)} - ${Math.min(examResult.maxScore, examResult.scaledScore + 270)}+`,
        topFocus: examResult.weaknesses[0]?.partTitle || "Nghe hiểu & Bẫy thì tiếp diễn",
      });
    } catch (err: any) {
      setOverallAiAdvice({
        loading: false,
        content: "Hiện tại hệ thống AI Coach đang bận, vui lòng thử lại sau vài giây.",
      });
    }
  };

  // Load Exam Result from sessionStorage or create fallback simulation from ID
  useEffect(() => {
    const idParam = searchParams.get("id") || searchParams.get("exam") || "1";
    const num = parseInt(idParam, 10);
    let targetExam: ExamPaper = !isNaN(num) && num >= 1 && num <= MOCK_EXAM_PAPERS.length
      ? MOCK_EXAM_PAPERS[num - 1]
      : MOCK_EXAM_PAPERS.find((p: ExamPaper) => p.id === idParam) || MOCK_EXAM_PAPERS[0];
    
    setSelectedExam(targetExam);

    try {
      const stored = sessionStorage.getItem("xp_latest_exam_result");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.examId) {
          setExamResult(parsed);
          setLoading(false);
          return;
        }
      }
    } catch (_) {}

    // Fallback: Reconstruct attempt result based on URL query
    const sampleAnswers: Record<string, "A" | "B" | "C" | "D"> = {};
    const sampleFlags: Record<string, boolean> = {};
    targetExam.questions.forEach((q: ExamQuestion, idx: number) => {
      if (idx % 3 === 0) sampleAnswers[q.id] = q.correctAnswer;
      else if (idx % 3 === 1) sampleAnswers[q.id] = q.correctAnswer === "A" ? "B" : "A";
      if (idx % 7 === 0) sampleFlags[q.id] = true;
    });

    const fallbackResult = calculateExamResult(
      targetExam,
      sampleAnswers,
      1800,
      targetExam.supportedSkills.length > 0 ? targetExam.supportedSkills : ["LISTENING", "READING"],
      sampleFlags
    );
    setExamResult(fallbackResult);
    setLoading(false);
  }, [searchParams]);

  // Keyboard navigation in review mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (reportTab === "REVIEW" && examResult) {
        if (e.key === "ArrowLeft") {
          setSelectedReviewQIndex((prev) => Math.max(0, prev - 1));
        } else if (e.key === "ArrowRight") {
          setSelectedReviewQIndex((prev) =>
            Math.min(examResult.questionResults.length - 1, prev + 1)
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReviewQIndex, reportTab, examResult]);

  // Handle Play/Pause Audio in Review Mode
  const handlePlayReviewAudio = (url: string, qId: string) => {
    if (playingAudioId === qId && reviewAudioRef.current) {
      if (!reviewAudioRef.current.paused) {
        reviewAudioRef.current.pause();
        setPlayingAudioId(null);
        return;
      }
    }

    if (reviewAudioRef.current) {
      reviewAudioRef.current.pause();
      reviewAudioRef.current = null;
    }

    const audio = new Audio(url);
    reviewAudioRef.current = audio;
    setPlayingAudioId(qId);

    audio.play().catch(() => setPlayingAudioId(null));
    audio.onended = () => setPlayingAudioId(null);
    audio.onerror = () => setPlayingAudioId(null);
  };

  // Stop audio on change or unmount
  useEffect(() => {
    if (reviewAudioRef.current) {
      reviewAudioRef.current.pause();
      reviewAudioRef.current = null;
    }
    setPlayingAudioId(null);
  }, [selectedReviewQIndex, reportTab]);

  if (loading || !examResult) {
    return <ExamResultLoading />;
  }

  const handleReturnToHub = () => {
    router.push("/study/exam-prep");
  };

  const handleStartExam = (exam: ExamPaper) => {
    router.push(`/study/exam-prep?id=${exam.id}`);
  };

  const handleCopyTranscript = () => {
    const currentQRes =
      examResult.questionResults[selectedReviewQIndex] ||
      examResult.questionResults[0];
    const textToCopy =
      currentQRes?.question?.passageText ||
      (currentQRes?.question as any)?.transcript;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
    addToast({
      type: "success",
      title: "Đã sao chép phụ đề âm thanh!",
      message: "Nội dung văn bản đã được lưu vào bộ nhớ tạm.",
    });
  };

  const handleRequestAiExplanation = async (question: ExamQuestion, userChoice?: string) => {
    const questionId = question.id;
    const currentQRes = examResult.questionResults.find(
      (qr) => qr.questionId === questionId
    );
    if (!currentQRes) return;

    setAiExplainMap((prev) => ({
      ...prev,
      [questionId]: { loading: true },
    }));

    try {
      const prompt = `Hãy giải thích chi tiết câu hỏi sau trong đề thi ${examResult.examTitle}:
Phần thi: ${currentQRes.partTitle} (Part ${currentQRes.partNumber})
Nội dung câu hỏi: ${question.questionText}
Đáp án đúng: ${question.correctAnswer}
Lựa chọn của học viên: ${userChoice || "Chưa chọn"}
Giải thích gốc: ${question.explanation || currentQRes.explanation}

Yêu cầu phân tích chi tiết:
1. Dịch nghĩa câu hỏi và các lựa chọn sang tiếng Việt dễ hiểu.
2. Giải thích vì sao đáp án ${question.correctAnswer} là chính xác.
3. Chỉ ra các bẫy thường gặp trong dạng bài này (nếu có).
4. Cung cấp 2-3 từ vựng hoặc cấu trúc ngữ pháp quan trọng cần nhớ từ câu này.`;

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) throw new Error("Không thể kết nối AI Tutor");
      const data = await response.json();
      setAiExplainMap((prev) => ({
        ...prev,
        [questionId]: {
          loading: false,
          data: {
            coreReason: data.reply || data.content || "Đã phân tích xong lời giải.",
            trapAnalysis: "Chú ý phân biệt các từ đồng âm và thì động từ thường gây nhầm lẫn.",
            grammarTip: "Ghi nhớ cấu trúc chủ ngữ + động từ phù hợp ngữ cảnh.",
          },
        },
      }));
    } catch (err: any) {
      setAiExplainMap((prev) => ({
        ...prev,
        [questionId]: {
          loading: false,
          error: err.message || "Lỗi khi lấy lời giải từ AI Tutor.",
        },
      }));
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. BRAND TOP HEADER (56px h-14 Baseline) WITH 3 REPORT TABS & ACTION BUTTONS */}
      <AppTopHeader
        onBack={handleReturnToHub}
        rightDesktopContent={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReturnToHub}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all shadow-2xs flex items-center justify-center font-sans active:scale-95 shrink-0"
            >
              ← Danh Sách Đề
            </button>
            {selectedExam && (
              <button
                type="button"
                onClick={() => handleStartExam(selectedExam)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-display active:scale-95 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                <span>Thi Lại</span>
              </button>
            )}
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={reportTab === "OVERVIEW"}
            onClick={() => setReportTab("OVERVIEW")}
            icon={<BarChart3 className="w-3.5 h-3.5" />}
            label="1. Điểm Số"
          />
          <HeaderPillItem
            active={reportTab === "REVIEW"}
            onClick={() => setReportTab("REVIEW")}
            icon={<BookOpen className="w-3.5 h-3.5" />}
            label={`2. Lời Giải (${examResult.questionResults.length})`}
          />
          <HeaderPillItem
            active={reportTab === "DIAGNOSTIC"}
            onClick={() => setReportTab("DIAGNOSTIC")}
            icon={<Brain className="w-3.5 h-3.5 text-purple-400" />}
            label="3. Lộ Trình AI"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS WITH FLUID DASHBOARD WIDTH */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6 flex-1">
        {/* 1. AGENCY MICRO-HERO BAR */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-2xs shrink-0">
              <Award className="w-4.5 h-4.5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider font-sans truncate">
                Đấu Trường Thi Thử • Báo Cáo & Xem Lại Lời Giải
              </div>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                {examResult.examTitle}
              </h1>
            </div>
          </div>

          {/* Action buttons on mobile (< sm: hidden on desktop because they are inside AppTopHeader) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleReturnToHub}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              ← Đề
            </button>
            {selectedExam && (
              <button
                type="button"
                onClick={() => handleStartExam(selectedExam)}
                className="px-2.5 py-1 rounded-lg bg-[#0059bb] text-white text-[11px] font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Thi Lại</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: BENTO SCORE & PERFORMANCE DASHBOARD */}
        {reportTab === "OVERVIEW" && (
          <div className="space-y-3 sm:space-y-4">
            {/* Radial Meter Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-950 text-white shadow-lg relative overflow-hidden border border-blue-400/20"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
                {/* Left: Score Gauge */}
                <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                  {/* SVG Radial Gauge */}
                  <div className="relative w-[92px] h-[92px] sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/15"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        strokeDasharray={264}
                        strokeDashoffset={
                          264 -
                          (264 * (examResult.accuracyPercent || 1)) / 100
                        }
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        fill="transparent"
                      />
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="50%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs sm:text-sm font-black font-sans text-amber-300">
                        {examResult.accuracyPercent}%
                      </span>
                      <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-blue-200 font-bold">
                        Độ chuẩn
                      </span>
                    </div>
                  </div>

                  {/* Score Numbers */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
                      KẾT QUẢ QUY ĐỔI CHÍNH THỨC
                    </span>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                      {examResult.scaledScore}{" "}
                      <span className="text-sm sm:text-lg text-blue-200 font-semibold font-sans">
                        / {examResult.maxScore}
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-blue-100/90 font-medium truncate font-sans">
                      Trả lời đúng{" "}
                      <span className="font-bold text-white font-mono">
                        {examResult.correctCount}/{examResult.totalQuestions}
                      </span>{" "}
                      câu
                      <span className="hidden sm:inline">
                        {" "}• Làm bài trong{" "}
                        <span className="font-bold text-white font-mono">
                          {formatTime(examResult.timeSpentSeconds)}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                {/* Subtle Separator on Mobile */}
                <div className="w-full h-px bg-white/10 md:hidden" />

                {/* Right Sub-Skills Glass Cards & Rewards */}
                <div className="flex flex-col gap-2 sm:gap-2.5 w-full md:w-auto">
                  <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
                    {examResult.listeningScore !== undefined && (
                      <div className="md:w-44 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Headphones
                            className="w-3.5 h-3.5 text-sky-300"
                            strokeWidth={1.8}
                          />
                          <span className="font-bold text-white">
                            Listening
                          </span>
                        </div>
                        <span className="font-sans font-black text-sky-200 text-xs font-mono">
                          {examResult.listeningScore}{" "}
                          {examResult.examType.includes("IELTS")
                            ? "/ 9.0"
                            : "/ 495"}
                        </span>
                      </div>
                    )}
                    {examResult.readingScore !== undefined && (
                      <div className="md:w-44 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <BookOpen
                            className="w-3.5 h-3.5 text-emerald-300"
                            strokeWidth={1.8}
                          />
                          <span className="font-bold text-white">
                            Reading
                          </span>
                        </div>
                        <span className="font-sans font-black text-emerald-200 text-xs font-mono">
                          {examResult.readingScore}{" "}
                          {examResult.examType.includes("IELTS")
                            ? "/ 9.0"
                            : "/ 495"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
                    <div className="flex-1 md:w-44 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black flex items-center justify-center gap-1.5 font-mono">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                      {examResult.xpAwarded} XP Thưởng
                    </div>
                    <div className="flex-1 md:w-44 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black flex items-center justify-center gap-1.5 font-mono">
                      <Award className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                      {examResult.coinsAwarded} Vàng Thưởng
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4 Double-Bezel Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    Câu Làm Đúng
                  </span>
                  <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {examResult.correctCount}{" "}
                    <span className="text-xs text-slate-400 font-normal font-sans">
                      / {examResult.totalQuestions}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <XCircle className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    Câu Làm Sai
                  </span>
                  <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-mono">
                    {examResult.incorrectCount}{" "}
                    <span className="text-xs text-slate-400 font-normal font-sans">
                      câu
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    Câu Bỏ Qua
                  </span>
                  <div className="text-sm sm:text-base font-black text-slate-700 dark:text-slate-300 font-mono">
                    {examResult.skippedCount}{" "}
                    <span className="text-xs text-slate-400 font-normal font-sans">
                      câu
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tốc Độ Trung Bình
                  </span>
                  <div className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-400 font-mono">
                    {examResult.avgTimePerQuestion}s{" "}
                    <span className="text-xs text-slate-400 font-normal font-sans">
                      / câu
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Part Analysis Breakdown Cards */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <TrendingUp
                    className="w-5 h-5 text-[#0059bb] dark:text-sky-400"
                    strokeWidth={2}
                  />
                  <span>Phân Tích Độ Chính Xác Theo Từng Part</span>
                </h3>
              </div>

              <div className="space-y-2 pt-1">
                {examResult.partAnalysis.map((part) => (
                  <div
                    key={part.partNumber}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-white/5 grid grid-cols-1 md:grid-cols-12 items-center gap-3 hover:border-slate-300 dark:hover:border-white/15 transition-all font-sans"
                  >
                    {/* Column 1: Grade & Title (md:col-span-4) */}
                    <div className="md:col-span-4 flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-16 py-0.5 rounded-md text-[10px] font-black font-sans uppercase text-center shrink-0 ${
                          part.grade === "A+" || part.grade === "A"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : part.grade === "B"
                              ? "bg-blue-500/20 text-[#0059bb] dark:text-sky-400 border border-blue-500/30"
                              : part.grade === "C"
                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        Grade {part.grade}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-display">
                        {part.partTitle}
                      </span>
                    </div>

                    {/* Column 2: Progress Bar (md:col-span-5) */}
                    <div className="md:col-span-5 w-full">
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${
                            part.accuracyPercent >= 75
                              ? "bg-emerald-500"
                              : part.accuracyPercent >= 50
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                          style={{
                            width: `${Math.max(4, part.accuracyPercent)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Column 3: Stats & Button (md:col-span-3) */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                        {part.correctCount}/{part.totalQuestions}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setReportTab("REVIEW");
                          setReviewPartFilter(part.partNumber);
                        }}
                        className="px-3 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 text-[11px] font-bold border border-slate-200 dark:border-white/10 shadow-2xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        Xem Part này <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Bottom Action Button */}
            <div className="pt-2 flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => setReportTab("REVIEW")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer font-display transition-all active:scale-95 group"
              >
                <span>Chuyển Sang Xem Lời Giải Từng Câu Chi Tiết</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ORIGINAL MASTER-DETAIL BENTO REVIEW STUDIO (REFINED TYPOGRAPHY & BALANCED ICONS) */}
        {reportTab === "REVIEW" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* ========================================================= */}
            {/* LEFT COLUMN: STICKY QUESTION NAVIGATOR (lg:col-span-4) */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 lg:sticky lg:top-4 max-h-[calc(100vh-80px)] overflow-y-auto space-y-3 pr-0.5">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
                {/* 1. Refined Navigator Header with Icon Well */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs">
                      <Layers className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white font-display">
                        Điều Hướng Câu Hỏi
                      </h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                    {examResult.questionResults.length} câu
                  </span>
                </div>

                {/* 2. Structured Filter Buttons (Balanced Layout with Clear Lucide Icons) */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                    Lọc trạng thái câu hỏi:
                  </span>
                  
                  {/* Top full-width button for 'Tất cả câu hỏi' */}
                  <button
                    type="button"
                    onClick={() => setReviewFilter("ALL")}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border font-sans ${
                      reviewFilter === "ALL"
                        ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-bold"
                        : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ListFilter className={`w-4 h-4 ${reviewFilter === "ALL" ? "text-white" : "text-[#0059bb] dark:text-sky-400"}`} strokeWidth={2} />
                      <span>Tất cả câu hỏi</span>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        reviewFilter === "ALL"
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {examResult.questionResults.length}
                    </span>
                  </button>

                  {/* 2x2 Balanced Grid for 4 Status States */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* Đúng */}
                    <button
                      type="button"
                      onClick={() => setReviewFilter("CORRECT")}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border font-sans ${
                        reviewFilter === "CORRECT"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold"
                          : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "CORRECT" ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} strokeWidth={2.2} />
                        <span className="truncate">Đúng</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                          reviewFilter === "CORRECT"
                            ? "bg-white/20 text-white"
                            : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {examResult.correctCount}
                      </span>
                    </button>

                    {/* Sai */}
                    <button
                      type="button"
                      onClick={() => setReviewFilter("INCORRECT")}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border font-sans ${
                        reviewFilter === "INCORRECT"
                          ? "bg-rose-600 text-white border-rose-600 shadow-2xs font-bold"
                          : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <XCircle className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "INCORRECT" ? "text-white" : "text-rose-600 dark:text-rose-400"}`} strokeWidth={2.2} />
                        <span className="truncate">Sai</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                          reviewFilter === "INCORRECT"
                            ? "bg-white/20 text-white"
                            : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                        }`}
                      >
                        {examResult.incorrectCount}
                      </span>
                    </button>

                    {/* Bỏ qua */}
                    <button
                      type="button"
                      onClick={() => setReviewFilter("SKIPPED")}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border font-sans ${
                        reviewFilter === "SKIPPED"
                          ? "bg-slate-700 text-white border-slate-700 shadow-2xs font-bold"
                          : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "SKIPPED" ? "text-white" : "text-slate-400"}`} strokeWidth={2} />
                        <span className="truncate">Bỏ qua</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                          reviewFilter === "SKIPPED"
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {examResult.skippedCount}
                      </span>
                    </button>

                    {/* Đánh dấu */}
                    <button
                      type="button"
                      onClick={() => setReviewFilter("FLAGGED")}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-between border font-sans ${
                        reviewFilter === "FLAGGED"
                          ? "bg-amber-400 text-slate-950 border-amber-400 shadow-2xs font-bold"
                          : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Star className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "FLAGGED" ? "fill-slate-950 text-slate-950" : "fill-amber-400 text-amber-500"}`} strokeWidth={2} />
                        <span className="truncate">Đánh dấu</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                          reviewFilter === "FLAGGED"
                            ? "bg-black/20 text-slate-950"
                            : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        }`}
                      >
                        {examResult.questionResults.filter((q) => q.isFlagged).length}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 3. Part Selector Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                    Chọn phần thi (Part):
                  </label>
                  <div className="relative">
                    <select
                      value={reviewPartFilter}
                      onChange={(e) =>
                        setReviewPartFilter(
                          e.target.value === "ALL"
                            ? "ALL"
                            : Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer outline-none focus:ring-1 focus:ring-[#0059bb] transition-all appearance-none pr-8 font-sans"
                    >
                      <option value="ALL">
                        Tất cả các Part ({examResult.totalQuestions} câu)
                      </option>
                      {examResult.partAnalysis.map((p) => (
                        <option key={p.partNumber} value={p.partNumber}>
                          {p.partTitle} ({p.correctCount}/{p.totalQuestions} câu
                          đúng)
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. 6-Column Palette Matrix (Styled matching the live exam answer sheet UI) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  {/* 3 Segmented Legend Badges with Live Counts */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="px-1.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-[10.5px] font-bold flex items-center justify-center gap-1 font-sans shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
                      <span>Đúng: <strong className="font-mono font-bold text-xs">{examResult.correctCount}</strong></span>
                    </div>
                    <div className="px-1.5 py-1 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/25 text-[10.5px] font-bold flex items-center justify-center gap-1 font-sans shadow-2xs">
                      <XCircle className="w-3 h-3 shrink-0 text-rose-600 dark:text-rose-400 stroke-[2.2]" />
                      <span>Sai: <strong className="font-mono font-bold text-xs">{examResult.incorrectCount}</strong></span>
                    </div>
                    <div className="px-1.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-[10.5px] font-bold flex items-center justify-center gap-1 font-sans shadow-2xs">
                      <AlertCircle className="w-3 h-3 shrink-0 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
                      <span>Bỏ qua: <strong className="font-mono font-bold text-xs">{examResult.skippedCount}</strong></span>
                    </div>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent bg-slate-50/80 dark:bg-slate-950/80 rounded-xl border border-slate-200/70 dark:border-slate-800">
                    <div className="grid grid-cols-6 gap-1.5">
                      {examResult.questionResults
                        .filter((q) => {
                          const matchesStatus =
                            reviewFilter === "ALL" ||
                            (reviewFilter === "CORRECT" && q.isCorrect) ||
                            (reviewFilter === "INCORRECT" &&
                              !q.isCorrect &&
                              !q.isSkipped) ||
                            (reviewFilter === "SKIPPED" && q.isSkipped) ||
                            (reviewFilter === "FLAGGED" && q.isFlagged);
                          const matchesPart =
                            reviewPartFilter === "ALL" ||
                            q.partNumber === reviewPartFilter;
                          return matchesStatus && matchesPart;
                        })
                        .map((qRes) => {
                          const isSelected =
                            qRes.questionNumber - 1 === selectedReviewQIndex;
                          const userChoice = qRes.userChoice;
                          const isAnswered = !qRes.isSkipped;
                          const isFlagged = qRes.isFlagged;

                          let btnStyle = "";
                          if (isSelected) {
                            if (isFlagged) {
                              btnStyle =
                                "bg-amber-400 text-slate-950 font-bold border-2 border-amber-600 shadow-md shadow-amber-500/20 scale-[1.04] z-10";
                            } else if (qRes.isCorrect) {
                              btnStyle =
                                "bg-emerald-600 text-white font-bold border-2 border-emerald-400 dark:border-emerald-300 shadow-md shadow-emerald-500/25 scale-[1.04] z-10";
                            } else if (!qRes.isCorrect && isAnswered) {
                              btnStyle =
                                "bg-rose-600 text-white font-bold border-2 border-rose-400 dark:border-rose-300 shadow-md shadow-rose-500/25 scale-[1.04] z-10";
                            } else {
                              btnStyle =
                                "bg-[#0059bb] text-white font-bold border-2 border-blue-400 dark:border-sky-300 shadow-md shadow-blue-500/25 scale-[1.04] z-10";
                            }
                          } else {
                            if (isFlagged) {
                              btnStyle =
                                "bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs hover:scale-105";
                            } else if (qRes.isCorrect) {
                              btnStyle =
                                "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 font-bold hover:scale-105";
                            } else if (!qRes.isCorrect && isAnswered) {
                              btnStyle =
                                "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 font-bold hover:scale-105";
                            } else {
                              btnStyle =
                                "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium hover:scale-105";
                            }
                          }

                          return (
                            <button
                              key={qRes.questionId}
                              type="button"
                              onClick={() =>
                                setSelectedReviewQIndex(
                                  qRes.questionNumber - 1,
                                )
                              }
                              className={`h-10 sm:h-10.5 rounded-xl font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${btnStyle}`}
                              title={`Câu ${qRes.questionNumber}: ${qRes.isCorrect ? "Đúng" : qRes.isSkipped ? "Bỏ qua" : "Sai"}`}
                            >
                              <span className={`text-xs font-bold leading-none ${isSelected ? "text-white" : ""}`}>
                                {qRes.questionNumber}
                              </span>
                              {userChoice ? (
                                <span className={`text-[10px] font-black uppercase leading-none mt-0.5 font-mono ${
                                  isSelected
                                    ? isFlagged
                                      ? "text-slate-950"
                                      : "text-white"
                                    : qRes.isCorrect
                                      ? "text-emerald-700 dark:text-emerald-300"
                                      : "text-rose-700 dark:text-rose-300"
                                }`}>
                                  {userChoice}
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold leading-none mt-0.5 opacity-40">
                                  -
                                </span>
                              )}
                              {isFlagged && !isSelected && (
                                <Star className="w-2 h-2 text-amber-500 fill-amber-400 absolute top-1 right-1" />
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* 5. Footer Status Pill */}
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-500 font-medium">
                    Đang chọn xem:
                  </span>
                  <span className="font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-900/40 font-mono">
                    Câu {selectedReviewQIndex + 1} /{" "}
                    {examResult.totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: RICH QUESTION DEEP INSPECTOR (lg:col-span-8) */}
            {/* ========================================================= */}
            <div className="lg:col-span-8 space-y-4">
              {(() => {
                const currentQRes =
                  examResult.questionResults[selectedReviewQIndex] ||
                  examResult.questionResults[0];
                if (!currentQRes) return null;
                const q = currentQRes.question;
                const aiExplain = aiExplainMap[q.id];

                return (
                  <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
                    {/* Header: Question Status Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-md bg-[#0059bb] text-white text-xs font-black font-sans">
                          CÂU {currentQRes.questionNumber} /{" "}
                          {examResult.totalQuestions}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold font-sans">
                          {currentQRes.partTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 border border-blue-200 dark:border-blue-900/30 text-[10px] font-black font-sans uppercase">
                          {currentQRes.section}
                        </span>
                        {currentQRes.isFlagged && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1 font-sans">
                            ⭐ Đã đánh dấu
                          </span>
                        )}
                      </div>

                      {/* Result Tag */}
                      <div>
                        {currentQRes.isCorrect ? (
                          <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 text-xs font-black flex items-center gap-1.5 shadow-2xs font-sans">
                            <CheckCircle2 className="w-4 h-4" /> CHÍNH XÁC (+5
                            Điểm)
                          </span>
                        ) : currentQRes.isSkipped ? (
                          <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 font-sans">
                            <AlertCircle className="w-4 h-4" /> CHƯA TRẢ LỜI (0
                            Điểm)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 text-xs font-black flex items-center gap-1.5 shadow-2xs font-sans">
                            <XCircle className="w-4 h-4" /> CHƯA CHÍNH XÁC
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image Preview if available */}
                    {q.imageUrl && (
                      <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs">
                        <img
                          src={q.imageUrl}
                          alt="Exam illustration"
                          className="w-full h-auto object-cover max-h-60 rounded-xl"
                        />
                      </div>
                    )}

                    {/* Audio Player Studio with Waveform & Transcript Toggle */}
                    {q.audioUrl && (
                      <div className="p-3.5 rounded-xl bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Headphones
                              className="w-4 h-4 text-[#0059bb] dark:text-sky-400"
                              strokeWidth={1.8}
                            />
                            <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                              Audio Bài Nghe Câu {currentQRes.questionNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {q.passageText && (
                              <button
                                type="button"
                                onClick={() =>
                                  setShowReviewTranscript(!showReviewTranscript)
                                }
                                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/10 cursor-pointer shadow-2xs hover:bg-slate-100 font-sans"
                              >
                                {showReviewTranscript
                                  ? "Ẩn Lời Thoại"
                                  : "Xem Lời Thoại (Transcript)"}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handlePlayReviewAudio(q.audioUrl!, q.id)
                              }
                              className="px-3.5 py-1.5 rounded-md bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs font-sans"
                            >
                              {playingAudioId === q.id ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span>
                                {playingAudioId === q.id
                                  ? "Tạm Dừng"
                                  : "Phát Lại Audio"}
                              </span>
                            </button>
                          </div>
                        </div>

                        {showReviewTranscript && q.passageText && (
                          <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-blue-200/60 dark:border-blue-900/40 text-xs sm:text-[13px] font-sans text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line select-text">
                            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 dark:border-white/5">
                              <span className="text-[10.5px] font-bold uppercase text-[#0059bb] dark:text-sky-400 font-mono">
                                Phụ đề âm thanh (Transcript):
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyTranscript}
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 hover:bg-slate-200 cursor-pointer"
                              >
                                {copiedTranscript ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    <span className="text-emerald-600">Đã chép</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Sao chép</span>
                                  </>
                                )}
                              </button>
                            </div>
                            {q.passageText}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Reading Passage View if available */}
                    {q.passageText && !q.audioUrl && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider font-sans">
                          Đoạn văn đọc hiểu / Văn bản tham chiếu:
                        </span>
                        <p className="text-xs sm:text-[14px] text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-line select-text">
                          {q.passageText}
                        </p>
                      </div>
                    )}

                    {/* Question Text */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                        Nội dung câu hỏi:
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug font-sans select-text">
                        {q.questionText}
                      </h3>
                    </div>

                    {/* Options Matrix (A, B, C, D) */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                        Các lựa chọn & So sánh phương án:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt) => {
                          const isCorrectOpt = opt.key === q.correctAnswer;
                          const isUserPicked =
                            currentQRes.userChoice === opt.key;

                          let cardStyle =
                            "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300";
                          if (isCorrectOpt) {
                            cardStyle =
                              "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500 shadow-2xs";
                          } else if (isUserPicked && !isCorrectOpt) {
                            cardStyle =
                              "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500 shadow-2xs";
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`p-3.5 rounded-xl border text-xs sm:text-[13px] leading-relaxed flex items-start gap-3 transition-all select-text ${cardStyle}`}
                            >
                              <span
                                className={`w-6 h-6 rounded-md font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                                  isCorrectOpt
                                    ? "bg-emerald-600 text-white"
                                    : isUserPicked
                                      ? "bg-rose-600 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                                }`}
                              >
                                {opt.key}
                              </span>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium font-sans">{opt.text}</p>
                                {isCorrectOpt && (
                                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black tracking-wider font-sans">
                                    ✓ ĐÁP ÁN CHÍNH XÁC
                                  </span>
                                )}
                                {isUserPicked && !isCorrectOpt && (
                                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black tracking-wider font-sans">
                                    ✗ BẠN ĐÃ CHỌN
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* DEEP EXPLANATION VAULT */}
                    <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 font-display">
                            Lý Do & Lời Giải Chuyên Sâu
                          </h4>
                        </div>

                        {/* Ask AI Coach Button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleRequestAiExplanation(
                              q,
                              currentQRes.userChoice,
                            )
                          }
                          disabled={aiExplain?.loading}
                          className="px-3 py-1.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50 font-sans"
                        >
                          {aiExplain?.loading ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>AI Đang Phân Tích...</span>
                            </>
                          ) : (
                            <>
                              <Brain className="w-3.5 h-3.5" />
                              <span>Hỏi AI Giải Thích Thêm</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-xs sm:text-[13.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans select-text">
                        <FormattedExplanation
                          content={
                            q.explanation ||
                            currentQRes.explanation ||
                            `Đáp án chính xác là ${q.correctAnswer}.`
                          }
                        />
                      </div>

                      {/* AI Enhanced Breakdown View if loaded */}
                      {aiExplain?.data && (
                        <div className="mt-3 pt-3 border-t border-amber-300/60 dark:border-white/10 space-y-2 text-xs">
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-white/10 space-y-1">
                            <span className="font-bold text-[#0059bb] dark:text-sky-400 block font-sans">
                              ✨ Dẫn chứng & Nguyên lý cốt lõi:
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                              {aiExplain.data.coreReason}
                            </p>
                          </div>

                          {aiExplain.data.trapAnalysis && (
                            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                              <span className="font-bold text-rose-600 dark:text-rose-400 block font-sans">
                                ⚠️ Cảnh báo bẫy thi & Phương án gây nhiễu:
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                                {aiExplain.data.trapAnalysis}
                              </p>
                            </div>
                          )}

                          {aiExplain.data.grammarTip && (
                            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-sans">
                                💡 Mẹo làm bài nhanh & Công thức ghi nhớ:
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                                {aiExplain.data.grammarTip}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Stepper Navigation Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        disabled={selectedReviewQIndex === 0}
                        onClick={() =>
                          setSelectedReviewQIndex((prev) =>
                            Math.max(0, prev - 1),
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 flex items-center gap-1.5 transition-all shadow-2xs font-sans"
                      >
                        <ChevronLeft className="w-4 h-4" /> Câu Trước
                      </button>

                      <div className="text-center font-sans">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">
                          {selectedReviewQIndex + 1} /{" "}
                          {examResult.questionResults.length}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-medium">
                          (Dùng phím ← / → để chuyển câu)
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={
                          selectedReviewQIndex ===
                          examResult.questionResults.length - 1
                        }
                        onClick={() =>
                          setSelectedReviewQIndex((prev) =>
                            Math.min(
                              examResult.questionResults.length - 1,
                              prev + 1,
                            ),
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs cursor-pointer disabled:opacity-40 flex items-center gap-1.5 transition-all font-sans"
                      >
                        Câu Tiếp Theo <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 3: AI COGNITIVE DIAGNOSTIC & ACTION ROADMAP PRO STUDIO (ASYMMETRICAL BENTO ARCHITECTURE) */}
        {reportTab === "DIAGNOSTIC" && (() => {
          // Calculate 5-axis competency scores from examResult
          const listeningParts = examResult.partAnalysis.filter(p => p.partNumber <= 4);
          const readingParts = examResult.partAnalysis.filter(p => p.partNumber > 4);

          const listeningAcc = listeningParts.length > 0 
            ? Math.round(listeningParts.reduce((acc, p) => acc + p.accuracyPercent, 0) / listeningParts.length) 
            : examResult.accuracyPercent;
          
          const readingAcc = readingParts.length > 0 
            ? Math.round(readingParts.reduce((acc, p) => acc + p.accuracyPercent, 0) / readingParts.length) 
            : examResult.accuracyPercent;

          const grammarAcc = Math.max(25, Math.min(95, Math.round(readingAcc * 0.95 + 10)));
          const vocabAcc = Math.max(30, Math.min(95, Math.round((listeningAcc + readingAcc) / 2)));
          const trapDefenseAcc = Math.max(25, Math.min(90, Math.round(100 - (examResult.incorrectCount / examResult.totalQuestions) * 75)));
          const speedScore = Math.max(40, Math.min(98, Math.round(100 - Math.max(0, examResult.avgTimePerQuestion - 15) * 2.5)));

          const powerIndex = Math.round((vocabAcc + grammarAcc + listeningAcc + trapDefenseAcc + speedScore) / 5);

          const targetProjectionMin = Math.min(examResult.maxScore, examResult.scaledScore + 200);
          const targetProjectionMax = Math.min(examResult.maxScore, examResult.scaledScore + 260);

          // SVG Radar geometry calculations: clean, crisp, large geometry (radius = 105, center = 140, 140, viewBox = 280 x 280)
          const radarCenter = 140;
          const radarRadius = 105;
          const angles = [
            -Math.PI / 2, 
            -Math.PI / 2 + (2 * Math.PI) / 5, 
            -Math.PI / 2 + (4 * Math.PI) / 5, 
            -Math.PI / 2 + (6 * Math.PI) / 5, 
            -Math.PI / 2 + (8 * Math.PI) / 5
          ];
          
          const competencies = [
            { 
              label: "Từ vựng ETS", 
              val: vocabAcc, 
              icon: BookOpen, 
              color: "text-blue-600 dark:text-sky-400",
              bgColor: "bg-blue-500",
              status: vocabAcc >= 70 ? "Thành thạo" : vocabAcc >= 50 ? "Khá" : "Cần bổ sung"
            },
            { 
              label: "Ngữ pháp cốt lõi", 
              val: grammarAcc, 
              icon: Sparkles, 
              color: "text-purple-600 dark:text-purple-400",
              bgColor: "bg-purple-500",
              status: grammarAcc >= 70 ? "Vững vàng" : grammarAcc >= 50 ? "Trung bình" : "Cần củng cố"
            },
            { 
              label: "Phản xạ âm thanh", 
              val: listeningAcc, 
              icon: Headphones, 
              color: "text-emerald-600 dark:text-emerald-400",
              bgColor: "bg-emerald-500",
              status: listeningAcc >= 70 ? "Nhạy bén" : listeningAcc >= 50 ? "Khá" : "Ưu tiên luyện"
            },
            { 
              label: "Bắt bẫy đề thi", 
              val: trapDefenseAcc, 
              icon: ShieldAlert, 
              color: "text-rose-600 dark:text-rose-400",
              bgColor: "bg-rose-500",
              status: trapDefenseAcc >= 70 ? "Cảnh giác cao" : trapDefenseAcc >= 50 ? "Cẩn thận" : "Dễ mắc bẫy"
            },
            { 
              label: "Tốc độ đọc lướt", 
              val: speedScore, 
              icon: Clock, 
              color: "text-amber-600 dark:text-amber-400",
              bgColor: "bg-amber-500",
              status: speedScore >= 80 ? "Rất nhanh" : speedScore >= 60 ? "Tốt" : "Cần tăng tốc"
            },
          ];

          // Polygon points with a minimum visible radius of 15% so zero-scores keep natural shape
          const polygonPoints = competencies.map((c, i) => {
            const r = (radarRadius * Math.max(15, c.val)) / 100;
            const x = radarCenter + r * Math.cos(angles[i]);
            const y = radarCenter + r * Math.sin(angles[i]);
            return `${x},${y}`;
          }).join(" ");

          return (
            <div className="space-y-5 sm:space-y-6">
              {/* ========================================================= */}
              {/* TẦNG 1: ASYMMETRICAL BENTO: GRAND RADAR (8 CỘT) VS DỰ PHÓNG (4 CỘT) */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                {/* 1.1 GRAND RADAR HERO STUDIO (8 CỘT - KHỐI NỔI BẬT LỚN, SẮC NÉT, TINH TẾ) */}
                <div className="lg:col-span-8 p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#0059bb]/30 dark:border-[#0059bb]/40 shadow-md shadow-[#0059bb]/5 flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0059bb]/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Khối Radar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-md shadow-[#0059bb]/20 shrink-0">
                        <BarChart3 className="w-6 h-6" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0059bb] dark:text-sky-400 uppercase tracking-widest font-sans">
                          Chỉ Số Phân Tích Chuyên Sâu
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display">
                          Radar Năng Lực 5 Trục Cốt Lõi
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="px-3.5 py-1.5 rounded-xl bg-[#0059bb]/10 dark:bg-sky-500/15 text-[#0059bb] dark:text-sky-300 text-xs font-mono font-black border border-[#0059bb]/25 dark:border-sky-500/30 shadow-2xs">
                        Sức Mạnh: {powerIndex}/100
                      </span>
                    </div>
                  </div>

                  {/* Bố cục Radar: SVG Radar Lớn, Tinh Tế, Sắc Nét + 5 Thẻ Năng Lực Vi Mô */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10 py-1">
                    {/* SVG Radar Polygon To Hơn, Siêu Sắc Nét với Màu Sắc Trục Đồng Bộ Chuẩn Xác (sm:col-span-6) */}
                    <div className="sm:col-span-6 flex flex-col items-center justify-center">
                      <div className="relative w-full max-w-[350px] h-[300px] flex items-center justify-center">
                        <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 380 310">
                          <defs>
                            {/* Rich Multi-Color Polygon Gradient */}
                            <radialGradient id="radarMultiColorGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#0059bb" stopOpacity="0.32" />
                              <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.25" />
                              <stop offset="75%" stopColor="#10b981" stopOpacity="0.22" />
                              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.20" />
                            </radialGradient>
                            <linearGradient id="polygonStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0059bb" />
                              <stop offset="25%" stopColor="#8b5cf6" />
                              <stop offset="55%" stopColor="#10b981" />
                              <stop offset="80%" stopColor="#f43f5e" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                          </defs>

                          {/* Concentric Background Web Polygons (20%, 40%, 60%, 80%, 100%) - Siêu Sắc Nét */}
                          {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, ringIdx) => {
                            const ringPoints = angles.map(angle => {
                              const x = 190 + 108 * scale * Math.cos(angle);
                              const y = 155 + 108 * scale * Math.sin(angle);
                              return `${x},${y}`;
                            }).join(" ");
                            return (
                              <polygon
                                key={ringIdx}
                                points={ringPoints}
                                fill={ringIdx % 2 === 0 ? "rgba(241, 245, 249, 0.65)" : "rgba(248, 250, 252, 0.3)"}
                                stroke="currentColor"
                                strokeWidth={ringIdx === 4 ? "1.8" : "1.2"}
                                strokeDasharray={ringIdx === 4 ? "none" : "4 4"}
                                className={ringIdx === 4
                                  ? "text-slate-400 dark:text-slate-500"
                                  : "text-slate-300 dark:text-slate-700"
                                }
                              />
                            );
                          })}

                          {/* Radial Axis Lines */}
                          {angles.map((angle, lineIdx) => {
                            const x = 190 + 108 * Math.cos(angle);
                            const y = 155 + 108 * Math.sin(angle);
                            return (
                              <line
                                key={lineIdx}
                                x1={190}
                                y1={155}
                                x2={x}
                                y2={y}
                                stroke="currentColor"
                                strokeWidth="1.2"
                                className="text-slate-300 dark:text-slate-700"
                              />
                            );
                          })}

                          {/* User Skill Polygon Fill & Multi-Color Crisp Border */}
                          <polygon
                            points={competencies.map((c, i) => {
                              const r = (108 * Math.max(15, c.val)) / 100;
                              const x = 190 + r * Math.cos(angles[i]);
                              const y = 155 + r * Math.sin(angles[i]);
                              return `${x},${y}`;
                            }).join(" ")}
                            fill="url(#radarMultiColorGrad)"
                            stroke="url(#polygonStrokeGrad)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            className="transition-all duration-1000 ease-out drop-shadow-sm"
                          />

                          {/* Data Point Glow Rings & Dots với Màu Sắc Tương Ứng Từng Góc */}
                          {(() => {
                            const nodeThemeColors = [
                              { pulse: "fill-[#0059bb]/35", stroke: "stroke-[#0059bb] dark:stroke-sky-400", dot: "fill-[#0059bb] dark:fill-sky-400" },
                              { pulse: "fill-purple-500/35", stroke: "stroke-purple-600 dark:stroke-purple-400", dot: "fill-purple-600 dark:fill-purple-400" },
                              { pulse: "fill-emerald-500/35", stroke: "stroke-emerald-600 dark:stroke-emerald-400", dot: "fill-emerald-600 dark:fill-emerald-400" },
                              { pulse: "fill-rose-500/35", stroke: "stroke-rose-600 dark:stroke-rose-400", dot: "fill-rose-600 dark:fill-rose-400" },
                              { pulse: "fill-amber-500/35", stroke: "stroke-amber-600 dark:stroke-amber-400", dot: "fill-amber-600 dark:fill-amber-400" },
                            ];

                            return competencies.map((c, i) => {
                              const r = (108 * Math.max(15, c.val)) / 100;
                              const cx = 190 + r * Math.cos(angles[i]);
                              const cy = 155 + r * Math.sin(angles[i]);
                              const theme = nodeThemeColors[i];

                              return (
                                <g key={i}>
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r="7"
                                    className={`${theme.pulse} animate-pulse`}
                                  />
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r="4.5"
                                    className={`fill-white dark:fill-slate-900 ${theme.stroke} stroke-2 shadow-xs`}
                                  />
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r="2.5"
                                    className={theme.dot}
                                  />
                                </g>
                              );
                            });
                          })()}

                          {/* 5 Tiêu Chí Bố Trí Trực Tiếp Tại 5 Góc (Chữ Thuần Túy Sắc Nét, Màu Sắc Tương Ứng Từng Góc) */}
                          {(() => {
                            const cornerConfigs = [
                              { text: "Từ vựng ETS", fill: "fill-[#0059bb] dark:fill-sky-400", anchor: "middle" as const, dx: 0, dy: -14 },
                              { text: "Ngữ pháp", fill: "fill-purple-600 dark:fill-purple-400", anchor: "start" as const, dx: 12, dy: 4 },
                              { text: "Phản xạ âm", fill: "fill-emerald-600 dark:fill-emerald-400", anchor: "start" as const, dx: 12, dy: 14 },
                              { text: "Bắt bẫy đề", fill: "fill-rose-600 dark:fill-rose-400", anchor: "end" as const, dx: -12, dy: 14 },
                              { text: "Tốc độ đọc", fill: "fill-amber-600 dark:fill-amber-400", anchor: "end" as const, dx: -12, dy: 4 },
                            ];

                            return competencies.map((c, i) => {
                              const cfg = cornerConfigs[i];
                              const tx = 190 + 108 * Math.cos(angles[i]) + cfg.dx;
                              const ty = 155 + 108 * Math.sin(angles[i]) + cfg.dy;
                              return (
                                <text
                                  key={i}
                                  x={tx}
                                  y={ty}
                                  textAnchor={cfg.anchor}
                                  className={`text-[12px] font-black font-sans ${cfg.fill} select-none tracking-tight drop-shadow-2xs`}
                                >
                                  {cfg.text}
                                </text>
                              );
                            });
                          })()}
                        </svg>
                      </div>
                    </div>

                    {/* 5 Thẻ Năng Lực Chi Tiết Cân Đối Tuyệt Đối (sm:col-span-6) */}
                    <div className="sm:col-span-6 space-y-2 font-sans">
                      {competencies.map((c, idx) => {
                        const IconComp = c.icon;
                        return (
                          <div 
                            key={idx} 
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-[#0059bb]/40 dark:hover:border-sky-500/40 transition-all space-y-1.5 shadow-2xs group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <IconComp className={`w-3.5 h-3.5 ${c.color}`} />
                                <span>{c.label}</span>
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 font-sans">
                                  {c.status}
                                </span>
                                <span className="font-mono font-black text-slate-900 dark:text-white text-xs">
                                  {c.val}%
                                </span>
                              </div>
                            </div>
                            {/* Gradient Progress Bar */}
                            <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${c.bgColor} transition-all duration-1000`}
                                style={{ width: `${c.val}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Radar Card */}
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-300 font-sans flex items-center gap-2 relative z-10">
                    <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                    <span>Hệ thống phân tích tự động chuẩn hóa dựa trên tốc độ xử lý câu và độ chính xác từng Part.</span>
                  </div>
                </div>

                {/* 1.2 DỰ PHÓNG ĐIỂM SỐ & GEMINI AI COACH (4 CỘT - THIẾT KẾ CHUẨN ĐỒNG BỘ) */}
                <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3.5">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/80 dark:border-amber-900/50 shadow-2xs shrink-0">
                        <Brain className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sans">
                          Mục Tiêu Ôn Luyện
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                          Dự Phóng Điểm Số
                        </h3>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 text-xs font-mono font-bold shadow-2xs shrink-0 whitespace-nowrap">
                      <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                      <span>+200 ~ +260đ</span>
                    </div>
                  </div>

                  {/* So sánh điểm số Hiện tại vs Mục tiêu (Chống Gãy Dòng Tuyệt Đối) */}
                  <div className="grid grid-cols-2 gap-2.5 items-stretch">
                    {/* Current Score Box */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center flex flex-col justify-between space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-400 tracking-wider block font-sans">
                        Điểm Bài Thi Này
                      </span>
                      <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                        {examResult.scaledScore}
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-500 font-sans block">
                        Đúng {examResult.accuracyPercent}%
                      </span>
                    </div>

                    {/* Target Projected Score Box */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/8 via-amber-500/4 to-transparent dark:from-amber-500/15 dark:via-slate-800/80 border border-amber-300/70 dark:border-amber-500/30 text-center flex flex-col justify-between space-y-1 relative overflow-hidden shadow-2xs">
                      <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300 tracking-wider block font-sans">
                        Mục Tiêu Khả Thi
                      </span>
                      <div className="text-lg sm:text-xl xl:text-2xl font-black font-mono text-amber-600 dark:text-amber-400 tracking-tight whitespace-nowrap flex items-center justify-center gap-1">
                        <span>{targetProjectionMin}</span>
                        <span className="text-amber-400 font-sans text-sm">~</span>
                        <span>{targetProjectionMax}+</span>
                      </div>
                      <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 font-sans block">
                        ⚡ 14 ngày bứt phá
                      </span>
                    </div>
                  </div>

                  {/* 3-Step Milestone Jump Plan (Đồng Bộ Màu Xanh Emerald Tăng Trưởng) */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      <span>Lộ trình gia tăng điểm số:</span>
                      <span className="text-[#0059bb] dark:text-sky-400 font-mono font-bold">+200đ Target</span>
                    </div>
                    
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 1: Sửa bẫy câu sai Part 1-2</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+60đ</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 2: Luyện Dictation nghe chép</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+110đ</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 3: Ôn 50 từ vựng Flashcard SRS</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+90đ</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive AI Coach Button & Drawer (Chuẩn Primary Royal Blue) */}
                  <div className="space-y-2">
                    {!overallAiAdvice ? (
                      <button
                        type="button"
                        onClick={handleGetOverallAiAdvice}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 border border-sky-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 font-sans"
                      >
                        <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 shrink-0" />
                        <span>Nhận Lời Khuyên Chiến Lược Từ Gemini AI</span>
                      </button>
                    ) : overallAiAdvice.loading ? (
                      <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 flex items-center justify-center gap-2.5 text-xs text-purple-700 dark:text-purple-300 font-sans">
                        <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                        <span>Gemini AI Tutor đang phân tích toàn diện 200 câu hỏi và lộ trình tối ưu...</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-purple-300/80 dark:border-purple-900/60 space-y-2 text-xs font-sans shadow-2xs">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                          <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 font-display">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Đánh Giá Từ AI Coach:</span>
                          </span>
                          <button
                            type="button"
                            onClick={handleGetOverallAiAdvice}
                            className="text-xs text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                          >
                            <RefreshCw className="w-3 h-3" /> Làm mới
                          </button>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line select-text max-h-36 overflow-y-auto pr-1">
                          {overallAiAdvice.content}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
{/* TẦNG 2: 1 CỘT 2 HÀNG XẾP CHỒNG (STACKED FULL-WIDTH ROWS) */}
              <div className="space-y-5 sm:space-y-6">
                {/* 2.1 HÀNG 1: LỖ HỔNG TRỌNG ĐIỂM & BẪY ĐỀ THI (FULL WIDTH) */}
                <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/80 dark:border-rose-900/50 shadow-2xs shrink-0">
                        <AlertCircle className="w-6 h-6" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-sans">
                          Trọng Tâm Cần Sửa
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                          Lỗ Hổng Trọng Điểm & Bẫy Đề Thi Cần Sửa Gấp
                        </h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold border border-rose-200 dark:border-rose-900/50 self-start sm:self-center shadow-2xs">
                      {examResult.weaknesses.length} Vấn đề trọng tâm
                    </span>
                  </div>

                  {/* Lưới 3 Thẻ Lỗ Hổng Ngang Phủ Trọn Toàn Bộ Chiều Ngang */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {examResult.weaknesses.slice(0, 3).map((w, idx) => {
                      const isHigh = w.priority === "HIGH";
                      return (
                        <div
                          key={idx}
                          className="p-4.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-rose-300 dark:hover:border-rose-900/50 transition-all flex flex-col justify-between space-y-3 font-sans shadow-2xs group"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 text-xs font-black flex items-center justify-center shrink-0 font-mono">
                                  P{w.partNumber || idx + 1}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate font-display">
                                  {w.partTitle}
                                </span>
                              </div>

                              {isHigh ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-sans bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 shadow-2xs shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                                  <span>Khẩn Cấp</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-sans bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 shadow-2xs shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                  <span>Cần Lưu Ý</span>
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                              {w.issue}
                            </p>
                          </div>

                          {/* Footer Action & Stat */}
                          <div className="pt-2.5 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-sans">
                            <span className="text-xs text-slate-500 font-medium">
                              Độ đúng:{" "}
                              <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                                {w.accuracyPercent || 0}%
                              </strong>{" "}
                              ({w.correctCount || 0}/{w.totalQuestions || 0} câu)
                            </span>

                            {w.partNumber && (
                              <button
                                type="button"
                                onClick={() => {
                                  setReportTab("REVIEW");
                                  setReviewPartFilter(w.partNumber!);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
                              >
                                <span>Xem câu sai Part {w.partNumber}</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2.2 HÀNG 2: ĐIỂM MẠNH & KẾ HOẠCH PHÂN BỔ THỜI GIAN (FULL WIDTH) */}
                <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-900/50 shadow-2xs shrink-0">
                        <CheckCircle2 className="w-6 h-6" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-sans">
                          Phát Huy Lợi Thế
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                          Điểm Mạnh Đã Làm Chủ & Phân Bổ Thời Gian 14 Ngày
                        </h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-200 dark:border-emerald-900/50 self-start sm:self-center shadow-2xs">
                      {examResult.strengths.length} Điểm mạnh
                    </span>
                  </div>

                  {/* 2 Cột Nội Dung Bên Trong Khối Full-Width */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
                    {/* Cột Trái (lg:col-span-7): Danh sách các điểm mạnh */}
                    <div className="lg:col-span-7 space-y-2.5">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
                        Kỹ năng và thói quen làm bài xuất sắc:
                      </div>
                      {examResult.strengths.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 text-xs sm:text-[13px] font-medium text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5 font-sans shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                            ✓
                          </span>
                          <span className="leading-relaxed select-text">{s}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cột Phải (lg:col-span-5): Khung phân bổ thời lượng ôn luyện 45p */}
                    <div className="lg:col-span-5 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 flex flex-col justify-between space-y-3 text-xs font-sans">
                      <div className="flex items-center gap-2 text-[#0059bb] dark:text-sky-400 font-bold text-xs sm:text-sm">
                        <Award className="w-4.5 h-4.5 shrink-0" />
                        <span>Khung Thời Lượng Ôn Luyện Mỗi Ngày (45 Phút):</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                          <span className="font-mono font-bold text-[#0059bb] dark:text-sky-400 text-sm sm:text-base block">20p</span>
                          <span className="text-[11px] text-slate-500 font-medium">Dictation</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm sm:text-base block">15p</span>
                          <span className="text-[11px] text-slate-500 font-medium">Sửa Bẫy Đề</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                          <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm sm:text-base block">10p</span>
                          <span className="text-[11px] text-slate-500 font-medium">Flashcard SRS</span>
                        </div>
                      </div>

                      <div className="text-[11.5px] text-slate-500 font-sans">
                        💡 Tuân thủ đều đặn 45 phút mỗi ngày theo lịch trình này sẽ tối ưu hóa trí nhớ dài hạn và cải thiện nhanh nhất.
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* ========================================================= */}
              {/* TẦNG 3: LỘ TRÌNH HÀNH ĐỘNG 3 CHẶNG CÁ NHÂN HÓA (FULL WIDTH) */}
              {/* ========================================================= */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Layers className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider font-sans">
                        Hành Động Cụ Thể
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        Lộ Trình 3 Chặng Hành Động Bứt Phá Điểm Số
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs font-sans self-start sm:self-center">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lộ trình 14 ngày</span>
                  </span>
                </div>

                {/* 3 Unified Milestone Cards with Direct CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  {/* Stage 1 Card */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#0059bb] dark:hover:border-sky-400 transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-[#0059bb] text-white text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                            1
                          </span>
                          <div>
                            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block font-sans">
                              Chặng 1 • Ngày 1-3
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                              Giải Mã Bẫy Câu Sai
                            </h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold font-sans">
                          Ưu tiên #1
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {examResult.recommendations[0] || "Đọc kỹ mục Lời Giải Chuyên Sâu ở Tab 2 để giải mã bẫy đề thi và từ vựng cốt lõi."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReportTab("REVIEW")}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Xem Lời Giải Tab 2</span>
                    </button>
                  </div>

                  {/* Stage 2 Card */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                            2
                          </span>
                          <div>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-sans">
                              Chặng 2 • Ngày 4-8
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                              Luyện Dictation Nghe
                            </h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                          +50 XP
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {examResult.recommendations[1] || "Luyện thêm tính năng Dictation Nghe Chép Chính Tả để cải thiện phản xạ âm thanh cho Part 1-4."}
                      </p>
                    </div>

                    <Link
                      href="/study/listening"
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95 text-center"
                    >
                      <Headphones className="w-4 h-4" />
                      <span>Vào Phòng Dictation</span>
                    </Link>
                  </div>

                  {/* Stage 3 Card */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-amber-500 dark:hover:border-amber-400 transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                            3
                          </span>
                          <div>
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block font-sans">
                              Chặng 3 • Ngày 9-14
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                              Ôn Trí Nhớ Từ Vựng SRS
                            </h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold font-mono">
                          +30 Vàng
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {examResult.recommendations[2] || "Ôn tập từ vựng Flashcard Spaced Repetition để mở rộng vốn từ thương mại và học thuật."}
                      </p>
                    </div>

                    <Link
                      href="/study/practice"
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95 text-center"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>Ôn Flashcard SRS</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-white/10 w-full">
          <button
            type="button"
            onClick={handleReturnToHub}
            className="w-[48%] sm:w-auto px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 cursor-pointer shadow-2xs text-center truncate font-sans"
          >
            <span className="sm:hidden">← Danh Sách Đề</span>
            <span className="hidden sm:inline">← Quay Lại Danh Sách Đề</span>
          </button>

          {selectedExam && (
            <button
              type="button"
              onClick={() => handleStartExam(selectedExam)}
              className="w-[48%] sm:w-auto px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-display text-center truncate"
            >
              <RotateCcw className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              <span className="sm:hidden">Thi Lại Đề Này</span>
              <span className="hidden sm:inline">Thi Lại Bài Này</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExamResultPage() {
  return (
    <Suspense fallback={<ExamResultLoading />}>
      <ExamResultContent />
    </Suspense>
  );
}
