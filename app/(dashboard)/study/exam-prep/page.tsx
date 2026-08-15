"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  ChevronDown
} from "lucide-react";
import { MOCK_EXAM_PAPERS, ExamPaper, ExamQuestion, SkillType } from "@/lib/data/examPrepData";
import { calculateExamResult, ExamResultSummary, UserExamAnswers, QuestionResultDetail } from "@/lib/utils/examScoringEngine";
import { useUserStore } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useUiStore } from "@/lib/store/uiStore";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { ListeningWorkspace } from "./components/ListeningWorkspace";
import { ReadingWorkspace } from "./components/ReadingWorkspace";
import { SpeakingStudioWorkspace } from "./components/SpeakingStudioWorkspace";
import { WritingStudioWorkspace } from "./components/WritingStudioWorkspace";

export default function ExamPrepPage() {
  const { user, awardXp, awardCoins, addPracticeTime } = useUserStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // State Management
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMode, setActiveMode] = useState<"HUB" | "WORKSPACE" | "REPORT">("HUB");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Flexible Multi-Skill Configurator State
  const [configMode, setConfigMode] = useState<"PRESET" | "AI_GEN">("PRESET");
  const [activeSkills, setActiveSkills] = useState<SkillType[]>(["LISTENING", "READING"]);

  // Live Workspace State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserExamAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [examResult, setExamResult] = useState<ExamResultSummary | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState<boolean>(true);

  // In-Depth Review & Explanation State
  const [reportTab, setReportTab] = useState<"OVERVIEW" | "REVIEW" | "DIAGNOSTIC">("OVERVIEW");
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "SKIPPED" | "FLAGGED">("ALL");
  const [reviewPartFilter, setReviewPartFilter] = useState<number | "ALL">("ALL");
  const [selectedReviewQIndex, setSelectedReviewQIndex] = useState<number>(0);
  const [showReviewTranscript, setShowReviewTranscript] = useState<boolean>(false);
  const [aiExplainMap, setAiExplainMap] = useState<Record<string, { loading: boolean; data?: any; error?: string }>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const reviewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Speaking AI State
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState<boolean>(false);
  const [speakingTranscript, setSpeakingTranscript] = useState<string>("");

  // Writing AI State
  const [writingEssay, setWritingEssay] = useState<string>("");
  const [isEvaluatingEssay, setIsEvaluatingEssay] = useState<boolean>(false);
  const [writingEvaluation, setWritingEvaluation] = useState<any>(null);

  // AI Section Toggle
  const [showAiSection, setShowAiSection] = useState<boolean>(false);
  const [aiTopic, setAiTopic] = useState<string>("Business & Travel");
  const [aiTargetScore, setAiTargetScore] = useState<string>("700+");
  const [aiQuestionCount, setAiQuestionCount] = useState<number>(20);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Stats
  const [totalExamsCompleted, setTotalExamsCompleted] = useState<number>(3);
  const [bestToeicScore, setBestToeicScore] = useState<number>(850);
  const [bestIeltsBand, setBestIeltsBand] = useState<number>(7.5);

  // Countdown Timer Ref
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeMode === "WORKSPACE" && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmitExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeMode, secondsRemaining]);

  // Automatically manage sidebar collapse when in exam test workspace
  useEffect(() => {
    if (activeMode === "WORKSPACE") {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [activeMode, setSidebarCollapsed]);

  // Active Questions filtered by selected skills
  const filteredQuestions = selectedExam
    ? selectedExam.questions.filter((q) => activeSkills.includes(q.section))
    : [];

  // Keyboard Shortcuts for Options in Workspace and Navigation in Review Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMode === "WORKSPACE" && selectedExam) {
        const currentQ = filteredQuestions[currentQuestionIndex];
        if (!currentQ || currentQ.section === "SPEAKING" || currentQ.section === "WRITING") return;

        if (e.key === "1" || e.key.toUpperCase() === "A") handleSelectAnswer(currentQ.id, "A");
        if (e.key === "2" || e.key.toUpperCase() === "B") handleSelectAnswer(currentQ.id, "B");
        if (e.key === "3" || e.key.toUpperCase() === "C") handleSelectAnswer(currentQ.id, "C");
        if (e.key === "4" || e.key.toUpperCase() === "D") handleSelectAnswer(currentQ.id, "D");
      } else if (activeMode === "REPORT" && reportTab === "REVIEW" && examResult) {
        if (e.key === "ArrowLeft") {
          setSelectedReviewQIndex((prev) => Math.max(0, prev - 1));
        } else if (e.key === "ArrowRight") {
          setSelectedReviewQIndex((prev) => Math.min(examResult.questionResults.length - 1, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMode, reportTab, selectedExam, currentQuestionIndex, examResult, filteredQuestions]);

  // Toggle Skill Selection
  const handleToggleSkill = (skill: SkillType) => {
    setActiveSkills((prev) => {
      if (prev.includes(skill)) {
        if (prev.length === 1) {
          addToast({ type: "warning", title: "Cần chọn ít nhất 1 kỹ năng để thi!" });
          return prev;
        }
        return prev.filter((s) => s !== skill);
      }
      return [...prev, skill];
    });
  };

  // Skill Preset Shortcuts
  const handleApplySkillPreset = (preset: "TOEIC_2K" | "TOEIC_COMM" | "TOEIC_4K" | "IELTS_SPEAKING" | "IELTS_WRITING" | "IELTS_4K") => {
    if (preset === "TOEIC_2K") setActiveSkills(["LISTENING", "READING"]);
    if (preset === "TOEIC_COMM") setActiveSkills(["SPEAKING", "WRITING"]);
    if (preset === "TOEIC_4K" || preset === "IELTS_4K") setActiveSkills(["LISTENING", "READING", "SPEAKING", "WRITING"]);
    if (preset === "IELTS_SPEAKING") setActiveSkills(["SPEAKING"]);
    if (preset === "IELTS_WRITING") setActiveSkills(["WRITING"]);

    addToast({ type: "info", title: `Đã áp dụng cấu hình kỹ năng!` });
  };

  // Actions
  const handleStartExam = (exam: ExamPaper) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    
    // Dynamic Time Calculation based on selected skills
    let calcMinutes = 0;
    if (activeSkills.includes("LISTENING")) calcMinutes += 45;
    if (activeSkills.includes("READING")) calcMinutes += 75;
    if (activeSkills.includes("SPEAKING")) calcMinutes += 20;
    if (activeSkills.includes("WRITING")) calcMinutes += 60;
    
    setSecondsRemaining(Math.min(exam.timeLimitMinutes, calcMinutes || 30) * 60);
    setTimeSpentSeconds(0);
    setActiveMode("WORKSPACE");
    setSidebarCollapsed(true);

    addToast({
      type: "info",
      title: `Đã bắt đầu bài thi: ${exam.title}`,
      message: `Tổ hợp ${activeSkills.length} kỹ năng (${activeSkills.join(", ")}).`
    });
  };

  const handleSelectAnswer = (questionId: string, choice: "A" | "B" | "C" | "D") => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleAutoSubmitExam = () => {
    addToast({ type: "warning", title: "Hết giờ làm bài!", message: "Hệ thống đang tự động chấm điểm bài thi của bạn..." });
    handleSubmitExam();
  };

  const handleSubmitExam = () => {
    if (!selectedExam) return;
    setShowSubmitConfirmModal(false);

    const result = calculateExamResult(
      selectedExam,
      userAnswers,
      timeSpentSeconds,
      activeSkills,
      flaggedQuestions
    );
    setExamResult(result);
    setReportTab("OVERVIEW");
    setSelectedReviewQIndex(0);
    setActiveMode("REPORT");

    // Sync XP, Coins & Study time
    awardXp(result.xpAwarded, "vocab");
    awardCoins(result.coinsAwarded);
    addPracticeTime(Math.ceil(timeSpentSeconds / 60), "vocab");

    // Update best stats
    setTotalExamsCompleted((prev) => prev + 1);
    if (result.examType.includes("TOEIC")) {
      setBestToeicScore((prev) => Math.max(prev, result.scaledScore));
    } else {
      setBestIeltsBand((prev) => Math.max(prev, result.scaledScore));
    }

    addToast({
      type: "success",
      title: `🎉 Hoàn thành bài thi! +${result.xpAwarded} XP (+${result.coinsAwarded} Vàng)`,
      message: `Điểm số: ${result.scaledScore}/${result.maxScore}. Xem lại lời giải chi tiết bên dưới.`
    });
  };

  // Play audio in review mode
  const handlePlayReviewAudio = (audioUrl?: string, qId?: string) => {
    if (!audioUrl) return;
    if (reviewAudioRef.current) {
      if (playingAudioId === qId) {
        reviewAudioRef.current.pause();
        setPlayingAudioId(null);
        return;
      }
      reviewAudioRef.current.pause();
    }
    const audio = new Audio(audioUrl);
    reviewAudioRef.current = audio;
    setPlayingAudioId(qId || "current");
    audio.play().catch(() => {});
    audio.onended = () => setPlayingAudioId(null);
  };

  // Request AI Deep Explanation for a question
  const handleRequestAiExplanation = async (question: ExamQuestion, userChoice?: string) => {
    const qId = question.id;
    setAiExplainMap((prev) => ({ ...prev, [qId]: { loading: true } }));
    try {
      const res = await fetch("/api/ai/exam-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswer,
          userAnswer: userChoice || "",
          passageText: question.passageText || "",
          explanation: question.explanation || "",
          examType: selectedExam?.type.includes("TOEIC") ? "TOEIC" : "IELTS"
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiExplainMap((prev) => ({ ...prev, [qId]: { loading: false, data: data.data } }));
        addToast({ type: "success", title: "🎉 AI đã phân tích chi tiết câu hỏi này!" });
      } else {
        throw new Error(data.error || "Lỗi tạo lời giải AI");
      }
    } catch (err: any) {
      setAiExplainMap((prev) => ({ ...prev, [qId]: { loading: false, error: err.message } }));
      addToast({ type: "error", title: "Lỗi tạo lời giải AI", message: err.message });
    }
  };

  // Evaluate Essay via AI API
  const handleEvaluateEssay = async () => {
    if (!writingEssay || writingEssay.trim().split(/\s+/).length < 10) {
      addToast({ type: "warning", title: "Bài viết quá ngắn", message: "Vui lòng viết ít nhất 10 từ để AI chấm điểm." });
      return;
    }

    setIsEvaluatingEssay(true);
    try {
      const res = await fetch("/api/ai/exam-writing-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: filteredQuestions[currentQuestionIndex]?.writingPrompt || "IELTS Essay Prompt",
          userEssay: writingEssay,
          examType: selectedExam?.type.includes("TOEIC") ? "TOEIC" : "IELTS"
        })
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setWritingEvaluation(data.evaluation);
        addToast({ type: "success", title: `🎉 AI Chấm Điểm Bài Luận: Band ${data.evaluation.overallBand}` });
      } else {
        throw new Error(data.error || "Lỗi chấm bài AI");
      }
    } catch (err: any) {
      addToast({ type: "error", title: "Lỗi chấm bài AI", message: err.message });
    } finally {
      setIsEvaluatingEssay(false);
    }
  };

  // Generate AI Exam
  const handleGenerateAiExam = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/ai/exam-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          targetScore: aiTargetScore,
          questionCount: aiQuestionCount,
          examType: "TOEIC"
        })
      });
      const data = await res.json();
      if (data.success && data.data?.questions) {
        const newPaper: ExamPaper = {
          id: `ai_exam_${Date.now()}`,
          title: data.data.title || `AI Generated Test - ${aiTopic}`,
          type: "TOEIC_MINI",
          level: "Intermediate",
          timeLimitMinutes: Math.ceil(aiQuestionCount * 0.8),
          totalQuestions: data.data.questions.length,
          maxScore: 990,
          description: `Đề thi ngẫu nhiên AI tạo theo chủ đề ${aiTopic} (Mục tiêu ${aiTargetScore}).`,
          categoryBadge: "AI Generated",
          tags: ["AI", aiTopic, "Custom"],
          supportedSkills: activeSkills,
          questions: data.data.questions
        };
        setShowAiSection(false);
        handleStartExam(newPaper);
      } else {
        throw new Error(data.error || "Tạo đề thi thất bại");
      }
    } catch (err: any) {
      addToast({ type: "error", title: "Lỗi tạo đề AI", message: err.message || "Vui lòng thử lại sau." });
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Filtered Exam List (Dynamically filtered by activeSkills matrix)
  const filteredExams = MOCK_EXAM_PAPERS.filter((exam) => {
    const matchesType = filterType === "ALL" || exam.type === filterType;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter exams that match selected activeSkills
    const matchesSkill = activeSkills.length === 0 || exam.supportedSkills.some((s) => activeSkills.includes(s));

    return matchesType && matchesSearch && matchesSkill;
  });

  // Time formatter
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <PageEntranceWrapper className="space-y-3.5 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      
      {/* ========================================================================= */}
      {/* MODE 1: EXAM HUB / TEST PICKER LIST */}
      {/* ========================================================================= */}
      {activeMode === "HUB" && (
        <div className="space-y-3.5">
          
          {/* 0. TOP MICRO-HERO TOOLBAR CARD (Dashboard / Practice Agency Style) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-xs text-[9px] font-black bg-[#1d6ee6] text-white shadow-2xs shrink-0">
                    EXAM PREP STUDIO
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    Đấu Trường Thi Thử Quốc Tế 2026
                  </h3>
                </div>
                <p className="hidden sm:block text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                  Luyện đề TOEIC ETS 2026 & Cambridge IELTS Band 9.0 • Tự chọn kỹ năng • Chấm điểm AI thời gian thực
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setConfigMode((prev) => (prev === "AI_GEN" ? "PRESET" : "AI_GEN"))}
                className="px-3 sm:px-3.5 py-1.5 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-display"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>{configMode === "AI_GEN" ? "Chế Độ Đề Chuẩn" : "Tạo Đề Mới AI"}</span>
              </button>
            </div>
          </motion.div>

          {/* UNIFIED EXAM CONFIGURATOR STUDIO */}
          <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xs bg-slate-100 dark:bg-slate-800/80">
                <button
                  onClick={() => setConfigMode("PRESET")}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    configMode === "PRESET"
                      ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span>Đề Thi Chuẩn ETS / Cambridge</span>
                </button>

                <button
                  onClick={() => setConfigMode("AI_GEN")}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    configMode === "AI_GEN"
                      ? "bg-amber-400 text-slate-950 shadow-2xs font-black"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Tạo Đề Đột Phá Bằng AI</span>
                </button>
              </div>

              <span className="text-xs font-bold text-slate-500 font-sans">
                {configMode === "AI_GEN" ? "✨ Gemini AI Generator Mode" : "📚 ETS & Cambridge Exam Bank Mode"}
              </span>
            </div>

            {/* Centerpiece Skill Selector Grid (4 Skills) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Tùy chọn kỹ năng làm bài ({activeSkills.length}/4 đã chọn):</span>
                {configMode === "PRESET" && (
                  <span className="text-slate-400 text-[11px]">Bấm các preset bên dưới để áp dụng nhanh</span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "LISTENING" as SkillType, label: "Nghe (Listening)", icon: Headphones, color: "text-[#0059bb]", border: "border-[#0059bb]" },
                  { id: "READING" as SkillType, label: "Đọc (Reading)", icon: BookOpen, color: "text-emerald-500", border: "border-emerald-500" },
                  { id: "SPEAKING" as SkillType, label: "Nói AI (Speaking)", icon: Mic, color: "text-amber-500", border: "border-amber-500" },
                  { id: "WRITING" as SkillType, label: "Viết AI (Writing)", icon: Wand2, color: "text-purple-500", border: "border-purple-500" }
                ].map((skillItem) => {
                  const Icon = skillItem.icon;
                  const isChecked = activeSkills.includes(skillItem.id);

                  return (
                    <button
                      key={skillItem.id}
                      onClick={() => handleToggleSkill(skillItem.id)}
                      className={`p-2.5 rounded-xs border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? `bg-slate-50 dark:bg-slate-800 ${skillItem.border} shadow-2xs font-extrabold`
                          : "bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-400 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${skillItem.color}`} strokeWidth={1.8} />
                        <span className="text-slate-900 dark:text-white">{skillItem.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                        isChecked ? "bg-[#0059bb] border-[#0059bb] text-white" : "border-slate-300"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditional Panel for AI Mode vs Preset Mode */}
            {configMode === "AI_GEN" ? (
              <div className="p-3.5 rounded-xs bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 space-y-3 pt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Topic Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} /> Chủ đề bài thi:
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Business, Travel, AI, Healthcare..."
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="w-full h-8 px-3 text-xs font-medium rounded-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                    />
                    <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                      {["Kinh doanh", "Du lịch", "Y tế", "Công nghệ"].map((chipTopic) => (
                        <button
                          key={chipTopic}
                          type="button"
                          onClick={() => setAiTopic(chipTopic)}
                          className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 cursor-pointer border"
                        >
                          {chipTopic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Score */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.8} /> Thang điểm mục tiêu:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: "500+", label: "500+ (Dễ)" },
                        { id: "700+", label: "700+ (Vừa)" },
                        { id: "900+", label: "900+ (Khó)" }
                      ].map((scoreOpt) => (
                        <button
                          key={scoreOpt.id}
                          type="button"
                          onClick={() => setAiTargetScore(scoreOpt.id)}
                          className={`h-8 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                            aiTargetScore === scoreOpt.id
                              ? "bg-[#0059bb] text-white font-black"
                              : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200"
                          }`}
                        >
                          {scoreOpt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-500" strokeWidth={1.8} /> Số câu & thời gian:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { count: 10, label: "10 câu (8m)" },
                        { count: 20, label: "20 câu (16m)" },
                        { count: 50, label: "50 câu (30m)" }
                      ].map((qOpt) => (
                        <button
                          key={qOpt.count}
                          type="button"
                          onClick={() => setAiQuestionCount(qOpt.count)}
                          className={`h-8 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                            aiQuestionCount === qOpt.count
                              ? "bg-[#0059bb] text-white font-black"
                              : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200"
                          }`}
                        >
                          {qOpt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    💡 Gemini AI sẽ sinh bài thi thời gian thực theo đúng các kỹ năng đã chọn.
                  </span>

                  <button
                    disabled={isAiGenerating}
                    onClick={handleGenerateAiExam}
                    className="w-full sm:w-auto px-5 py-2 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all font-display ml-auto"
                  >
                    {isAiGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Đang sinh đề thi...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-slate-950" />
                        <span>Bắt Đầu Sinh Đề AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Preset Shortcuts */
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs font-bold">
                <span className="text-slate-400 shrink-0">Preset gợi ý:</span>
                <button
                  onClick={() => handleApplySkillPreset("TOEIC_2K")}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white shrink-0 cursor-pointer"
                >
                  TOEIC Nghe + Đọc (120m)
                </button>
                <button
                  onClick={() => handleApplySkillPreset("TOEIC_COMM")}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white shrink-0 cursor-pointer"
                >
                  TOEIC Nói + Viết (80m)
                </button>
                <button
                  onClick={() => handleApplySkillPreset("TOEIC_4K")}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white shrink-0 cursor-pointer"
                >
                  TOEIC Full 4 Kỹ Năng (200m)
                </button>
                <button
                  onClick={() => handleApplySkillPreset("IELTS_SPEAKING")}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white shrink-0 cursor-pointer"
                >
                  IELTS Speaking AI (15m)
                </button>
                <button
                  onClick={() => handleApplySkillPreset("IELTS_WRITING")}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white shrink-0 cursor-pointer"
                >
                  IELTS Writing AI (60m)
                </button>
              </div>
            )}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            
            {/* Filter Segmented Control */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
              {[
                { id: "ALL", label: "Tất cả bộ đề" },
                { id: "TOEIC_FULL", label: "TOEIC Full 4K" },
                { id: "TOEIC_SPEAKING_WRITING", label: "TOEIC Nói + Viết" },
                { id: "IELTS_SPEAKING", label: "IELTS Speaking AI" },
                { id: "IELTS_WRITING", label: "IELTS Writing AI" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? "bg-[#0059bb] text-white shadow-2xs font-black"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Tìm tên đề thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2.5 text-xs font-medium rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
              />
            </div>
          </div>

          {/* De-cluttered Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {filteredExams.map((exam) => (
              <motion.div
                whileHover={{ y: -2 }}
                key={exam.id}
                className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 relative group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-xs text-[9.5px] font-black uppercase tracking-wider bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 font-display">
                      {exam.categoryBadge}
                    </span>
                    {/* 5-Star Visual Difficulty Rating (No text, pure vector stars) */}
                    <div className="flex items-center gap-0.5" title={`Độ khó: ${exam.level}`}>
                      {Array.from({ length: 5 }).map((_, starIdx) => {
                        const starCount = exam.level === "Beginner" ? 2 : exam.level === "Intermediate" ? 3 : 5;
                        const isFilled = starIdx < starCount;
                        return (
                          <Star
                            key={starIdx}
                            className={`w-3 h-3 ${
                              isFilled
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200 dark:text-slate-700"
                            }`}
                            strokeWidth={1.5}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0059bb] transition-colors leading-snug">
                    {exam.title}
                  </h3>

                  {/* Supported Skill Icons Row */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {exam.supportedSkills.includes("LISTENING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[10px] font-bold flex items-center gap-1 border border-blue-200/60 dark:border-blue-800/40">
                        <Headphones className="w-3 h-3" strokeWidth={1.8} /> Nghe
                      </span>
                    )}
                    {exam.supportedSkills.includes("READING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40">
                        <BookOpen className="w-3 h-3" strokeWidth={1.8} /> Đọc
                      </span>
                    )}
                    {exam.supportedSkills.includes("SPEAKING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center gap-1 border border-amber-200/60 dark:border-amber-800/40">
                        <Mic className="w-3 h-3" strokeWidth={1.8} /> Nói AI
                      </span>
                    )}
                    {exam.supportedSkills.includes("WRITING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-[10px] font-bold flex items-center gap-1 border border-purple-200/60 dark:border-purple-800/40">
                        <Wand2 className="w-3 h-3" strokeWidth={1.8} /> Viết AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual Meta Chips & Action Button */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} /> {exam.totalQuestions} câu
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.8} /> {exam.timeLimitMinutes}m
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartExam(exam)}
                    className="px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black transition-all shadow-2xs flex items-center gap-1 cursor-pointer font-display"
                  >
                    <span>Vào thi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LIVE TEST WORKSPACE (DUAL PANEL SPLIT VIEW 60% / 40%) */}
      {/* ========================================================================= */}
      {activeMode === "WORKSPACE" && selectedExam && (
        <div className="space-y-3.5">
          
          {/* 0. TOP WORKSPACE TOOLBAR HEADER CARD */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 sm:p-3 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-row items-center justify-between gap-2.5 shadow-2xs"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <button
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-2.5 py-1 rounded-xs bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shrink-0 cursor-pointer shadow-2xs flex items-center gap-1 transition-all active:scale-95"
                title="Thoát khỏi bài thi và quay lại danh sách đề"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thoát bài thi</span>
                <span className="sm:hidden">Thoát</span>
              </button>

              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>

              <div className="min-w-0 flex items-center gap-1.5 sm:gap-2">
                <span className="px-1.5 sm:px-2 py-0.5 rounded-xs text-[9px] font-black bg-[#0059bb] text-white shadow-2xs shrink-0">
                  {selectedExam.categoryBadge || "EXAM"}
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                  {selectedExam.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Toggle Answer Sheet Panel Button */}
              <button
                onClick={() => setShowAnswerSheet((prev) => !prev)}
                className={`px-2 sm:px-2.5 py-1 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  showAnswerSheet
                    ? "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs"
                    : "bg-amber-400 text-slate-950 font-black shadow-2xs"
                }`}
                title={showAnswerSheet ? "Thu gọn Phiếu trả lời" : "Mở lại Phiếu trả lời"}
              >
                <Sliders className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span className="hidden sm:inline">{showAnswerSheet ? "Ẩn Phiếu" : "Mở Phiếu"}</span>
              </button>

              {/* Timer Countdown Badge */}
              <div
                className={`px-2.5 sm:px-3 py-1 rounded-xs border text-[11px] sm:text-xs font-black font-sans flex items-center gap-1 shadow-2xs ${
                  secondsRemaining <= 300
                    ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 border-rose-300 animate-pulse"
                    : "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 border-slate-200/80 dark:border-white/10"
                }`}
              >
                <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black transition-all shadow-2xs cursor-pointer font-display"
              >
                Nộp bài ngay
              </button>
            </div>
          </motion.div>

          {/* DUAL PANEL WORKSPACE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
              
              {/* LEFT PANEL (8/12 OR 12/12): SPECIALIZED WORKSPACE ENGINE FOR EACH SKILL */}
              <div className={`${showAnswerSheet ? "lg:col-span-8" : "lg:col-span-12"} space-y-3`}>
                {(() => {
                  const q = filteredQuestions[currentQuestionIndex];
                  if (!q) return null;

                  return (
                    <div className="space-y-4">
                      {/* 1. LISTENING WORKSPACE */}
                      {q.section === "LISTENING" && (
                        <ListeningWorkspace
                          question={q}
                          currentQuestionIndex={currentQuestionIndex}
                          totalQuestions={filteredQuestions.length}
                          userChoice={userAnswers[q.id]}
                          onSelectAnswer={(choice) => handleSelectAnswer(q.id, choice)}
                        />
                      )}

                      {/* 2. READING WORKSPACE (ALWAYS-VISIBLE SIDE-BY-SIDE PASSAGE) */}
                      {q.section === "READING" && (
                        <ReadingWorkspace
                          question={q}
                          currentQuestionIndex={currentQuestionIndex}
                          totalQuestions={filteredQuestions.length}
                          userChoice={userAnswers[q.id]}
                          onSelectAnswer={(choice) => handleSelectAnswer(q.id, choice)}
                        />
                      )}

                      {/* 3. SPEAKING AI STUDIO WORKSPACE */}
                      {q.section === "SPEAKING" && (
                        <SpeakingStudioWorkspace
                          question={q}
                          currentQuestionIndex={currentQuestionIndex}
                          totalQuestions={filteredQuestions.length}
                          onSelectAnswer={(choice) => handleSelectAnswer(q.id, choice)}
                        />
                      )}

                      {/* 4. WRITING AI STUDIO WORKSPACE */}
                      {q.section === "WRITING" && (
                        <WritingStudioWorkspace
                          question={q}
                          currentQuestionIndex={currentQuestionIndex}
                          totalQuestions={filteredQuestions.length}
                          onSelectAnswer={(choice) => handleSelectAnswer(q.id, choice)}
                        />
                      )}

                      {/* Navigation Buttons */}
                      <div className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                          className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" /> Câu trước
                        </button>

                        <button
                          disabled={currentQuestionIndex === filteredQuestions.length - 1}
                          onClick={() => setCurrentQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                          className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                        >
                          Câu tiếp <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* RIGHT PANEL (4/12): ANSWER SHEET GRID */}
              {showAnswerSheet && (
                <div className="lg:col-span-4 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display">
                      Phiếu Trả Lời (Answer Sheet)
                    </h3>
                    <span className="text-xs font-bold text-[#0059bb]">
                      {Object.keys(userAnswers).length}/{filteredQuestions.length} Đã làm
                    </span>
                  </div>

                  {/* Status Legend */}
                  <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 border-b border-slate-100 dark:border-white/5 pb-2">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#0059bb]" /> Đã làm</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border" /> Chưa làm</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-amber-400" /> Xem lại</span>
                  </div>

                  {/* Answer Grid: Exactly 6 Columns per row */}
                  <div className="grid grid-cols-6 gap-1.5 max-h-[50vh] overflow-y-auto p-1">
                    {filteredQuestions.map((q, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = !!userAnswers[q.id];
                      const isFlagged = !!flaggedQuestions[q.id];

                      let btnStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent";
                      if (isFlagged) {
                        btnStyle = "bg-amber-400 text-slate-950 font-black border-amber-500";
                      } else if (isAnswered) {
                        btnStyle = "bg-[#0059bb] text-white font-bold border-transparent";
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-9 rounded-xs text-sm font-black font-sans transition-all cursor-pointer flex items-center justify-center border ${btnStyle} ${
                            isCurrent ? "ring-2 ring-blue-500 shadow-md scale-105" : ""
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: COMPREHENSIVE BENTO SCORE REPORT & IN-DEPTH REVIEW STUDIO */}
      {/* ========================================================================= */}
      {activeMode === "REPORT" && examResult && (
        <div className="space-y-3.5 w-full">
          
          {/* 0. AGENCY MICRO-HERO BAR WITH SEGMENTED TABS */}
          <div className="p-3 sm:p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 shadow-2xs space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xs bg-[#0059bb] text-white flex items-center justify-center shadow-2xs">
                  <Award className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider font-sans">
                    Đấu Trường Thi Thử • Báo Cáo & Xem Lại Lời Giải
                  </div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display">
                    {examResult.examTitle}
                  </h1>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMode("HUB")}
                  className="px-3 py-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all shadow-2xs"
                >
                  ← Danh Sách Đề
                </button>
                {selectedExam && (
                  <button
                    onClick={() => handleStartExam(selectedExam)}
                    className="px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer font-display"
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.8} /> Thi Lại
                  </button>
                )}
              </div>
            </div>

            {/* Segmented Sliding Tabs */}
            <div className="p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-xs flex items-center gap-1 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <button
                onClick={() => setReportTab("OVERVIEW")}
                className={`flex-1 py-2 px-3 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  reportTab === "OVERVIEW"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span>1. Tổng Quan & Điểm Số</span>
              </button>

              <button
                onClick={() => setReportTab("REVIEW")}
                className={`flex-1 py-2 px-3 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  reportTab === "REVIEW"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span>2. Lời Giải Chuyên Sâu</span>
                <span className="px-1.5 py-0.2 rounded-xs bg-amber-400 text-slate-950 text-[10px] font-black ml-0.5 font-sans">
                  {examResult.questionResults.length} câu
                </span>
              </button>

              <button
                onClick={() => setReportTab("DIAGNOSTIC")}
                className={`flex-1 py-2 px-3 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  reportTab === "DIAGNOSTIC"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.8} />
                <span>3. AI Chẩn Đoán & Lộ Trình</span>
              </button>
            </div>
          </div>

          {/* TAB 1: BENTO SCORE & PERFORMANCE DASHBOARD */}
          {reportTab === "OVERVIEW" && (
            <div className="space-y-4">
              
              {/* Radial Meter Hero Card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-7 rounded-xs bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-950 text-white shadow-lg relative overflow-hidden border border-blue-400/20"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left: Score Gauge */}
                  <div className="flex items-center gap-5">
                    {/* SVG Radial Gauge */}
                    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
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
                          strokeDashoffset={264 - (264 * (examResult.accuracyPercent || 1)) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                          fill="transparent"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="50%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#38bdf8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black font-sans text-amber-300">
                          {examResult.accuracyPercent}%
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-blue-200 font-bold">
                          Độ chuẩn
                        </span>
                      </div>
                    </div>

                    {/* Score Numbers */}
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-xs text-[10.5px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
                        KẾT QUẢ QUY ĐỔI CHÍNH THỨC
                      </span>
                      <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
                        {examResult.scaledScore} <span className="text-lg sm:text-2xl text-blue-200 font-semibold font-sans">/ {examResult.maxScore}</span>
                      </div>
                      <p className="text-xs text-blue-100/90 font-medium">
                        Trả lời đúng <span className="font-bold text-white">{examResult.correctCount}/{examResult.totalQuestions}</span> câu • Làm bài trong <span className="font-bold text-white">{formatTime(examResult.timeSpentSeconds)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Sub-Skills Glass Cards & Rewards */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      {examResult.listeningScore !== undefined && (
                        <div className="flex-1 md:w-52 p-2.5 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Headphones className="w-4 h-4 text-sky-300" strokeWidth={1.8} />
                            <span className="font-bold text-white">Listening</span>
                          </div>
                          <span className="font-sans font-black text-sky-200 text-sm">
                            {examResult.listeningScore} / 495
                          </span>
                        </div>
                      )}
                      {examResult.readingScore !== undefined && (
                        <div className="flex-1 md:w-52 p-2.5 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-emerald-300" strokeWidth={1.8} />
                            <span className="font-bold text-white">Reading</span>
                          </div>
                          <span className="font-sans font-black text-emerald-200 text-sm">
                            {examResult.readingScore} / 495
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-2 rounded-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} /> +{examResult.xpAwarded} XP Thưởng
                      </div>
                      <div className="flex-1 p-2 rounded-xs bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black flex items-center justify-center gap-1.5">
                        <Award className="w-3.5 h-3.5" strokeWidth={1.8} /> +{examResult.coinsAwarded} Vàng Thưởng
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* 4 Double-Bezel Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Câu Làm Đúng</span>
                    <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-sans">
                      {examResult.correctCount} <span className="text-xs text-slate-400 font-normal">/ {examResult.totalQuestions} ({examResult.accuracyPercent}%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <XCircle className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Câu Làm Sai</span>
                    <div className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 font-sans">
                      {examResult.incorrectCount} <span className="text-xs text-slate-400 font-normal">({Math.round((examResult.incorrectCount / (examResult.totalQuestions || 1)) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Câu Bỏ Qua</span>
                    <div className="text-lg sm:text-xl font-black text-slate-700 dark:text-slate-300 font-sans">
                      {examResult.skippedCount} <span className="text-xs text-slate-400 font-normal">({Math.round((examResult.skippedCount / (examResult.totalQuestions || 1)) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xs bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tốc Độ Trung Bình</span>
                    <div className="text-lg sm:text-xl font-black text-[#0059bb] dark:text-sky-400 font-sans">
                      {examResult.avgTimePerQuestion}s <span className="text-xs text-slate-400 font-normal">/ câu</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part Analysis Breakdown Cards */}
              <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0059bb] dark:text-sky-400" strokeWidth={1.8} /> Phân Tích Độ Chính Xác Theo Từng Part
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    ETS Standard Benchmark
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {examResult.partAnalysis.map((part) => (
                    <div
                      key={part.partNumber}
                      className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-white/5 grid grid-cols-1 md:grid-cols-12 items-center gap-3 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                    >
                      {/* Column 1: Grade & Title (Fixed md:col-span-4) */}
                      <div className="md:col-span-4 flex items-center gap-2.5 min-w-0">
                        <span className={`w-16 py-0.5 rounded-xs text-[10px] font-black font-sans uppercase text-center shrink-0 ${
                          part.grade === "A+" || part.grade === "A"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : part.grade === "B"
                            ? "bg-blue-500/20 text-[#0059bb] dark:text-sky-400 border border-blue-500/30"
                            : part.grade === "C"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        }`}>
                          Grade {part.grade}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {part.partTitle}
                        </span>
                      </div>

                      {/* Column 2: Progress Bar (Fixed md:col-span-5) -> 100% PERFECTLY STRAIGHT ALIGNED */}
                      <div className="md:col-span-5 w-full">
                        <div className="w-full h-2 rounded-xs bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-700 ${
                              part.accuracyPercent >= 75 ? "bg-emerald-500" : part.accuracyPercent >= 50 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${Math.max(4, part.accuracyPercent)}%` }}
                          />
                        </div>
                      </div>

                      {/* Column 3: Stats & Button (Fixed md:col-span-3) */}
                      <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 min-w-0">
                        <span className="font-sans text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                          {part.correctCount}/{part.totalQuestions} ({part.accuracyPercent}%)
                        </span>
                        <button
                          onClick={() => {
                            setReportTab("REVIEW");
                            setReviewPartFilter(part.partNumber);
                          }}
                          className="px-2.5 py-1 rounded-xs bg-white dark:bg-slate-900 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 text-[11px] font-bold border border-slate-200 dark:border-white/10 shadow-2xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          Xem Part này <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Bottom Action Button */}
              <div className="pt-2 flex items-center justify-center">
                <button
                  onClick={() => setReportTab("REVIEW")}
                  className="px-6 py-3 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black shadow-md flex items-center gap-2 cursor-pointer font-display transition-all active:scale-95 group"
                >
                  <BookOpen className="w-4 h-4" strokeWidth={1.8} />
                  <span>Xem Chi Tiết Từng Câu & Lời Giải Chuyên Sâu</span>
                  <div className="w-6 h-6 rounded-xs bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MASTER-DETAIL BENTO REVIEW STUDIO (SPLIT SCREEN) */}
          {reportTab === "REVIEW" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              
              {/* ========================================================= */}
              {/* LEFT COLUMN: STICKY QUESTION NAVIGATOR (lg:col-span-4) */}
              {/* ========================================================= */}
              <div className="lg:col-span-4 lg:sticky lg:top-4 max-h-[calc(100vh-80px)] overflow-y-auto space-y-3 pr-0.5">
                <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                  
                  {/* Navigator Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" strokeWidth={1.8} /> Điều Hướng Câu Hỏi
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-sans font-black border border-blue-200 dark:border-blue-900/40">
                      {examResult.questionResults.length} câu
                    </span>
                  </div>

                  {/* Filter Status Structured Grid */}
                  <div className="space-y-1.5">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                      Lọc Trạng Thái:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {[
                        { id: "ALL", label: "Tất cả", count: examResult.questionResults.length, dot: "bg-[#0059bb]" },
                        { id: "CORRECT", label: "Đúng", count: examResult.correctCount, dot: "bg-emerald-500" },
                        { id: "INCORRECT", label: "Sai", count: examResult.incorrectCount, dot: "bg-rose-500" },
                        { id: "SKIPPED", label: "Bỏ qua", count: examResult.skippedCount, dot: "bg-slate-400" },
                        { id: "FLAGGED", label: "Đánh dấu", count: examResult.questionResults.filter(q => q.isFlagged).length, dot: "bg-amber-400" }
                      ].map((f) => {
                        const isActive = reviewFilter === f.id;
                        return (
                          <button
                            key={f.id}
                            onClick={() => setReviewFilter(f.id as any)}
                            className={`px-2 py-1.5 rounded-xs text-[11px] font-bold transition-all cursor-pointer flex items-center justify-between border ${
                              isActive
                                ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-black"
                                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : f.dot} shrink-0`} />
                              <span className="truncate">{f.label}</span>
                            </div>
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-xs ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                            }`}>
                              {f.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Part Selector Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                      Chọn Phần Thi (Part):
                    </label>
                    <div className="relative">
                      <select
                        value={reviewPartFilter}
                        onChange={(e) => setReviewPartFilter(e.target.value === "ALL" ? "ALL" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer outline-none focus:ring-1 focus:ring-[#0059bb] transition-all appearance-none pr-8"
                      >
                        <option value="ALL">Tất cả các Part ({examResult.totalQuestions} câu)</option>
                        {examResult.partAnalysis.map((p) => (
                          <option key={p.partNumber} value={p.partNumber}>
                            {p.partTitle} ({p.correctCount}/{p.totalQuestions} câu đúng)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* 6-Column Palette Matrix */}
                  <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Bảng câu hỏi:</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Đúng</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Sai</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" /> Bỏ qua</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto p-1.5 bg-slate-50/80 dark:bg-slate-950/80 rounded-xs border border-slate-200/60 dark:border-white/5">
                      {examResult.questionResults
                        .filter((q) => {
                          const matchesStatus =
                            reviewFilter === "ALL" ||
                            (reviewFilter === "CORRECT" && q.isCorrect) ||
                            (reviewFilter === "INCORRECT" && !q.isCorrect && !q.isSkipped) ||
                            (reviewFilter === "SKIPPED" && q.isSkipped) ||
                            (reviewFilter === "FLAGGED" && q.isFlagged);
                          const matchesPart =
                            reviewPartFilter === "ALL" || q.partNumber === reviewPartFilter;
                          return matchesStatus && matchesPart;
                        })
                        .map((qRes) => {
                          const isSelected = qRes.questionNumber - 1 === selectedReviewQIndex;
                          
                          let statusStyle = "";
                          if (isSelected) {
                            if (qRes.isFlagged) {
                              statusStyle = "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300 scale-105 z-10";
                            } else if (qRes.isCorrect) {
                              statusStyle = "bg-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-400 scale-105 z-10";
                            } else if (!qRes.isSkipped && !qRes.isCorrect) {
                              statusStyle = "bg-rose-600 text-white font-black shadow-md ring-2 ring-rose-400 scale-105 z-10";
                            } else {
                              statusStyle = "bg-[#0059bb] text-white font-black shadow-md ring-2 ring-blue-300 dark:ring-blue-800 scale-105 z-10";
                            }
                          } else {
                            if (qRes.isFlagged) {
                              statusStyle = "bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 font-bold";
                            } else if (qRes.isCorrect) {
                              statusStyle = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 font-bold";
                            } else if (!qRes.isSkipped && !qRes.isCorrect) {
                              statusStyle = "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 font-bold";
                            } else {
                              statusStyle = "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium";
                            }
                          }

                          return (
                            <button
                              key={qRes.questionId}
                              onClick={() => setSelectedReviewQIndex(qRes.questionNumber - 1)}
                              className={`h-8 rounded-xs text-xs font-sans transition-all cursor-pointer flex items-center justify-center ${statusStyle}`}
                              title={`Câu ${qRes.questionNumber}: ${qRes.isCorrect ? "Đúng" : qRes.isSkipped ? "Bỏ qua" : "Sai"}`}
                            >
                              {qRes.questionNumber}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Footer Status Pill */}
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-500 font-medium">Đang chọn xem:</span>
                    <span className="font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-xs border border-blue-200 dark:border-blue-900/40">
                      Câu {selectedReviewQIndex + 1} / {examResult.totalQuestions}
                    </span>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* RIGHT COLUMN: RICH QUESTION DEEP INSPECTOR (lg:col-span-8) */}
              {/* ========================================================= */}
              <div className="lg:col-span-8 space-y-4">
                {(() => {
                  const currentQRes = examResult.questionResults[selectedReviewQIndex] || examResult.questionResults[0];
                  if (!currentQRes) return null;
                  const q = currentQRes.question;
                  const aiExplain = aiExplainMap[q.id];

                  return (
                    <div className="p-4 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
                      
                      {/* Header: Question Status Strip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-white/5 pb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-xs bg-[#0059bb] text-white text-xs font-black font-sans">
                            CÂU {currentQRes.questionNumber} / {examResult.totalQuestions}
                          </span>
                          <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold font-sans">
                            {currentQRes.partTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded-xs bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 border border-blue-200 dark:border-blue-900/30 text-[10px] font-black font-sans uppercase">
                            {currentQRes.section}
                          </span>
                          {currentQRes.isFlagged && (
                            <span className="px-2 py-0.5 rounded-xs bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1">
                              ⭐ Đã đánh dấu
                            </span>
                          )}
                        </div>

                        {/* Result Tag */}
                        <div>
                          {currentQRes.isCorrect ? (
                            <span className="px-3 py-1 rounded-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 text-xs font-black flex items-center gap-1.5 shadow-2xs">
                              <CheckCircle2 className="w-4 h-4" /> CHÍNH XÁC (+5 Điểm)
                            </span>
                          ) : currentQRes.isSkipped ? (
                            <span className="px-3 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4" /> CHƯA TRẢ LỜI (0 Điểm)
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-xs bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 text-xs font-black flex items-center gap-1.5 shadow-2xs">
                              <XCircle className="w-4 h-4" /> CHƯA CHÍNH XÁC
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Image Preview if available */}
                      {q.imageUrl && (
                        <div className="max-w-md mx-auto rounded-xs overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs">
                          <img src={q.imageUrl} alt="Exam illustration" className="w-full h-auto object-cover max-h-60" />
                        </div>
                      )}

                      {/* Audio Player Studio with Waveform & Transcript Toggle */}
                      {q.audioUrl && (
                        <div className="p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Headphones className="w-4 h-4 text-[#0059bb] dark:text-sky-400" strokeWidth={1.8} />
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                Audio Bài Nghe Câu {currentQRes.questionNumber}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowReviewTranscript(!showReviewTranscript)}
                                className="px-2.5 py-1 rounded-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-white/10 cursor-pointer shadow-2xs hover:bg-slate-100"
                              >
                                {showReviewTranscript ? "Ẩn Lời Thoại" : "Xem Lời Thoại (Transcript)"}
                              </button>
                              
                              <button
                                onClick={() => handlePlayReviewAudio(q.audioUrl, q.id)}
                                className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                {playingAudioId === q.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                <span>{playingAudioId === q.id ? "Tạm Dừng" : "Phát Lại Audio"}</span>
                              </button>
                            </div>
                          </div>

                          {showReviewTranscript && q.passageText && (
                            <div className="p-3 rounded-xs bg-white/90 dark:bg-slate-900/90 border border-blue-200/60 dark:border-blue-900/40 text-xs sm:text-[13px] font-sans text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                              {q.passageText}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reading Passage View if available */}
                      {q.passageText && !q.audioUrl && (
                        <div className="p-4 rounded-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 space-y-1.5">
                          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider font-sans">
                            Đoạn văn đọc hiểu / Văn bản tham chiếu:
                          </span>
                          <p className="text-xs sm:text-[14px] text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-line">
                            {q.passageText}
                          </p>
                        </div>
                      )}

                      {/* Question Text */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                          Nội dung câu hỏi:
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug font-sans">
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
                            const isUserPicked = currentQRes.userChoice === opt.key;

                            let cardStyle = "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300";
                            if (isCorrectOpt) {
                              cardStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500 shadow-2xs";
                            } else if (isUserPicked && !isCorrectOpt) {
                              cardStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500 shadow-2xs";
                            }

                            return (
                              <div
                                key={opt.key}
                                className={`p-3.5 rounded-xs border text-xs sm:text-[13px] leading-relaxed flex items-start gap-3 transition-all ${cardStyle}`}
                              >
                                <span className={`w-6 h-6 rounded-xs font-sans font-black text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                                  isCorrectOpt
                                    ? "bg-emerald-600 text-white"
                                    : isUserPicked
                                    ? "bg-rose-600 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                                }`}>
                                  {opt.key}
                                </span>

                                <div className="flex-1 min-w-0">
                                  <p className="font-medium">{opt.text}</p>
                                  {isCorrectOpt && (
                                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-xs bg-emerald-600 text-white text-[10px] font-black tracking-wider font-sans">
                                      ✓ ĐÁP ÁN CHÍNH XÁC
                                    </span>
                                  )}
                                  {isUserPicked && !isCorrectOpt && (
                                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-xs bg-rose-600 text-white text-[10px] font-black tracking-wider font-sans">
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
                      <div className="p-4 sm:p-5 rounded-xs bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 font-display">
                              Lý Do & Lời Giải Chuyên Sâu
                            </h4>
                          </div>

                          {/* Ask AI Coach Button */}
                          <button
                            onClick={() => handleRequestAiExplanation(q, currentQRes.userChoice)}
                            disabled={aiExplain?.loading}
                            className="px-3 py-1.5 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50 font-sans"
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

                        <p className="text-xs sm:text-[13.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                          {q.explanation || `Đáp án chính xác là ${q.correctAnswer}.`}
                        </p>

                        {/* AI Enhanced Breakdown View if loaded */}
                        {aiExplain?.data && (
                          <div className="mt-3 pt-3 border-t border-amber-300/60 dark:border-white/10 space-y-2 text-xs">
                            <div className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-amber-200 dark:border-white/10 space-y-1">
                              <span className="font-bold text-[#0059bb] dark:text-sky-400 block font-sans">
                                ✨ Dẫn chứng & Nguyên lý cốt lõi:
                              </span>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                                {aiExplain.data.coreReason}
                              </p>
                            </div>

                            {aiExplain.data.trapAnalysis && (
                              <div className="p-3 rounded-xs bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                                <span className="font-bold text-rose-600 dark:text-rose-400 block font-sans">
                                  ⚠️ Cảnh báo bẫy thi & Phương án gây nhiễu:
                                </span>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                                  {aiExplain.data.trapAnalysis}
                                </p>
                              </div>
                            )}

                            {aiExplain.data.grammarTip && (
                              <div className="p-3 rounded-xs bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                                <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-sans">
                                  💡 Mẹo làm bài nhanh & Công thức ghi nhớ:
                                </span>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                                  {aiExplain.data.grammarTip}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Stepper Navigation Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                        <button
                          disabled={selectedReviewQIndex === 0}
                          onClick={() => setSelectedReviewQIndex(prev => Math.max(0, prev - 1))}
                          className="px-4 py-2 rounded-xs bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 flex items-center gap-1.5 transition-all shadow-2xs font-sans"
                        >
                          <ChevronLeft className="w-4 h-4" /> Câu Trước
                        </button>

                        <div className="text-center font-sans">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {selectedReviewQIndex + 1} / {examResult.questionResults.length}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium">
                            (Dùng phím ← / → để chuyển câu)
                          </span>
                        </div>

                        <button
                          disabled={selectedReviewQIndex === examResult.questionResults.length - 1}
                          onClick={() => setSelectedReviewQIndex(prev => Math.min(examResult.questionResults.length - 1, prev + 1))}
                          className="px-4 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs cursor-pointer disabled:opacity-40 flex items-center gap-1.5 transition-all font-sans"
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

          {/* TAB 3: AI DIAGNOSTIC & ACTION STUDIO */}
          {reportTab === "DIAGNOSTIC" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Mastered Competencies Card */}
                <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-display flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} /> Điểm Mạnh & Kỹ Năng Đã Làm Chủ
                  </h3>
                  <div className="space-y-2.5">
                    {examResult.strengths.map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 text-xs font-medium text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5 font-sans shadow-2xs">
                        <span className="w-5 h-5 rounded-xs bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-[11px] shadow-2xs">✓</span>
                        <span className="leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Improvement Areas Card */}
                <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 font-display flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" strokeWidth={1.8} /> Lỗ Hổng Kiến Thức Cần Củng Cố
                  </h3>
                  <div className="space-y-2.5">
                    {examResult.weaknesses.slice(0, 4).map((w, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xs bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 hover:border-rose-300 dark:hover:border-rose-900/50 transition-all space-y-2 font-sans shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-6 h-6 rounded-xs bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 text-xs font-black flex items-center justify-center shrink-0">
                              P{w.partNumber || idx + 1}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] truncate">
                              {w.partTitle}
                            </span>
                          </div>

                          {/* Polished Priority Pill Badge */}
                          {w.priority === "HIGH" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-black tracking-wider uppercase font-sans bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 shadow-2xs shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                              <span>Khẩn Cấp</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-black tracking-wider uppercase font-sans bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 shadow-2xs shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>Cần Lưu Ý</span>
                            </span>
                          )}
                        </div>

                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                          {w.issue}
                        </p>

                        {w.partNumber && (
                          <div className="pt-1 flex items-center justify-between border-t border-slate-200/50 dark:border-white/5">
                            <span className="text-[10.5px] font-medium text-slate-500">
                              Độ chính xác: <span className="font-bold text-rose-600 dark:text-rose-400">{w.accuracyPercent || 0}%</span> ({w.correctCount || 0}/{w.totalQuestions || 0} câu đúng)
                            </span>
                            <button
                              onClick={() => {
                                setReportTab("REVIEW");
                                setReviewPartFilter(w.partNumber!);
                              }}
                              className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <span>Xem lại Part này</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Interactive Action Studio Cards */}
              <div className="p-5 rounded-xs bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-2">
                    <Brain className="w-4 h-4" strokeWidth={1.8} /> Lộ Trình & Khuyến Nghị Tối Ưu Điểm Số
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    Chương trình ôn luyện cá nhân hóa
                  </span>
                </div>

                <div className="space-y-2">
                  {examResult.recommendations.map((r, idx) => (
                    <div key={idx} className="p-2.5 rounded-xs bg-white dark:bg-slate-950 border border-blue-100 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-start gap-2.5 font-sans">
                      <span className="text-amber-500 font-black">★</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {/* 3 Studio Direct Launchers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <Link href="/study/listening" className="block">
                    <div className="p-3.5 rounded-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-[#0059bb] dark:hover:border-sky-400 shadow-2xs hover:shadow-md transition-all group cursor-pointer space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xs bg-blue-50 dark:bg-blue-950 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black font-sans">
                          +50 XP
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
                        Phòng Luyện Dictation Nghe
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Luyện bắt từ khóa âm thanh Part 1-4 Listening với AI.
                      </p>
                    </div>
                  </Link>

                  <Link href="/study/practice" className="block">
                    <div className="p-3.5 rounded-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-[#0059bb] dark:hover:border-sky-400 shadow-2xs hover:shadow-md transition-all group cursor-pointer space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xs bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black font-sans">
                          +30 Vàng
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
                        Ôn Trí Nhớ Từ Vựng SRS
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Luyện Flashcard Spaced Repetition từ vựng theo đề thi.
                      </p>
                    </div>
                  </Link>

                  <Link href="/study/grammar" className="block">
                    <div className="p-3.5 rounded-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-[#0059bb] dark:hover:border-sky-400 shadow-2xs hover:shadow-md transition-all group cursor-pointer space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xs bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded-xs bg-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black font-sans">
                          +40 XP
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
                        Phòng Luyện Ngữ Pháp AI
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Khắc phục triệt để bẫy Part 5 & 6 với bài tập thông minh.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => setActiveMode("HUB")}
              className="px-4 py-2 rounded-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 cursor-pointer shadow-2xs"
            >
              ← Quay Lại Danh Sách Đề
            </button>

            {selectedExam && (
              <button
                onClick={() => handleStartExam(selectedExam)}
                className="px-4 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer font-display"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={1.8} /> Thi Lại Bài Này
              </button>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl space-y-3">
            <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
              Xác nhận nộp bài thi?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bạn đã hoàn thành {Object.keys(userAnswers).length}/{filteredQuestions.length} câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm số ngay bây giờ không?
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-1.5 rounded-xs bg-[#0059bb] text-white text-xs font-black shadow-2xs cursor-pointer"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </PageEntranceWrapper>
  );
}
