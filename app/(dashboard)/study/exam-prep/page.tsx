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
  ChevronDown,
  X,
  Copy,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MOCK_EXAM_PAPERS,
  ExamPaper,
  ExamQuestion,
  SkillType,
} from "@/lib/data/examPrepData";
import {
  calculateExamResult,
  ExamResultSummary,
  UserExamAnswers,
  QuestionResultDetail,
} from "@/lib/utils/examScoringEngine";
import { useUserStore } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useUiStore } from "@/lib/store/uiStore";
import {
  PageEntranceWrapper,
  MotionItem,
} from "@/components/shared/PageEntranceAnimation";
import { ListeningWorkspace } from "./components/ListeningWorkspace";
import { ReadingWorkspace } from "./components/ReadingWorkspace";
import { SpeakingStudioWorkspace } from "./components/SpeakingStudioWorkspace";
import { WritingStudioWorkspace } from "./components/WritingStudioWorkspace";
import { FormattedExplanation } from "./components/FormattedExplanation";
import { speakLessonText, stopTTS } from "@/lib/utils/ttsEngine";
import { unlockMobileAudio } from "@/lib/utils/mobileAudio";

function ExamPrepContent() {
  const { user, awardXp, awardCoins, addPracticeTime } = useUserStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State Management
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMode, setActiveMode] = useState<"HUB" | "WORKSPACE" | "REPORT">(
    "HUB",
  );
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Flexible Multi-Skill Configurator State (Default all 4 skills so all exam types are visible)
  const [configMode, setConfigMode] = useState<"PRESET" | "AI_GEN">("PRESET");
  const [activeSkills, setActiveSkills] = useState<SkillType[]>([
    "LISTENING",
    "READING",
    "SPEAKING",
    "WRITING",
  ]);

  // Live Workspace State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserExamAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [examResult, setExamResult] = useState<ExamResultSummary | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] =
    useState<boolean>(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState<boolean>(true);
  const [showMobileWorkspaceSheet, setShowMobileWorkspaceSheet] =
    useState<boolean>(false);

  // In-Depth Review & Explanation State
  const [reportTab, setReportTab] = useState<
    "OVERVIEW" | "REVIEW" | "DIAGNOSTIC"
  >("OVERVIEW");
  const [reviewFilter, setReviewFilter] = useState<
    "ALL" | "CORRECT" | "INCORRECT" | "SKIPPED" | "FLAGGED"
  >("ALL");
  const [reviewPartFilter, setReviewPartFilter] = useState<number | "ALL">(
    "ALL",
  );
  const [selectedReviewQIndex, setSelectedReviewQIndex] = useState<number>(0);
  const [showReviewTranscript, setShowReviewTranscript] =
    useState<boolean>(false);
  const [showMobileReviewSheet, setShowMobileReviewSheet] =
    useState<boolean>(false);
  const [aiExplainMap, setAiExplainMap] = useState<
    Record<string, { loading: boolean; data?: any; error?: string }>
  >({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [reviewAudioSpeed, setReviewAudioSpeed] = useState<number>(1.0);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);
  const reviewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Speaking AI State
  const [isRecordingSpeaking, setIsRecordingSpeaking] =
    useState<boolean>(false);
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

  // Active Questions filtered by selected skills (Fallback to all questions if matching)
  const filteredQuestions = selectedExam
    ? selectedExam.questions.filter(
        (q) => activeSkills.length === 0 || activeSkills.includes(q.section),
      )
    : [];

  // Keyboard Shortcuts for Options in Workspace and Navigation in Review Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMode === "WORKSPACE" && selectedExam) {
        const currentQ = filteredQuestions[currentQuestionIndex];
        if (
          !currentQ ||
          currentQ.section === "SPEAKING" ||
          currentQ.section === "WRITING"
        )
          return;

        if (e.key === "1" || e.key.toUpperCase() === "A")
          handleSelectAnswer(currentQ.id, "A");
        if (e.key === "2" || e.key.toUpperCase() === "B")
          handleSelectAnswer(currentQ.id, "B");
        if (e.key === "3" || e.key.toUpperCase() === "C")
          handleSelectAnswer(currentQ.id, "C");
        if (e.key === "4" || e.key.toUpperCase() === "D")
          handleSelectAnswer(currentQ.id, "D");
      } else if (
        activeMode === "REPORT" &&
        reportTab === "REVIEW" &&
        examResult
      ) {
        if (e.key === "ArrowLeft") {
          setSelectedReviewQIndex((prev) => Math.max(0, prev - 1));
        } else if (e.key === "ArrowRight") {
          setSelectedReviewQIndex((prev) =>
            Math.min(examResult.questionResults.length - 1, prev + 1),
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeMode,
    reportTab,
    selectedExam,
    currentQuestionIndex,
    examResult,
    filteredQuestions,
  ]);

  // Toggle Skill Selection
  const handleToggleSkill = (skill: SkillType) => {
    setActiveSkills((prev) => {
      if (prev.includes(skill)) {
        if (prev.length === 1) {
          addToast({
            type: "warning",
            title: "Cần chọn ít nhất 1 kỹ năng để thi!",
          });
          return prev;
        }
        return prev.filter((s) => s !== skill);
      }
      return [...prev, skill];
    });
  };

  // Skill Preset Shortcuts
  const handleApplySkillPreset = (
    preset:
      | "TOEIC_2K"
      | "TOEIC_COMM"
      | "TOEIC_4K"
      | "IELTS_SPEAKING"
      | "IELTS_WRITING"
      | "IELTS_4K",
  ) => {
    if (preset === "TOEIC_2K") setActiveSkills(["LISTENING", "READING"]);
    if (preset === "TOEIC_COMM") setActiveSkills(["SPEAKING", "WRITING"]);
    if (preset === "TOEIC_4K" || preset === "IELTS_4K")
      setActiveSkills(["LISTENING", "READING", "SPEAKING", "WRITING"]);
    if (preset === "IELTS_SPEAKING") setActiveSkills(["SPEAKING"]);
    if (preset === "IELTS_WRITING") setActiveSkills(["WRITING"]);

    addToast({ type: "info", title: `Đã áp dụng cấu hình kỹ năng!` });
  };

  // Auto load exam from URL query param (e.g. ?id=1, ?id=2 or ?id=toeic_lr_2026_01)
  const hasInitializedFromUrl = useRef(false);

  useEffect(() => {
    if (hasInitializedFromUrl.current) return;
    const idParam =
      searchParams.get("id") ||
      searchParams.get("exam") ||
      searchParams.get("examId");
    if (!idParam) return;

    hasInitializedFromUrl.current = true;

    const num = parseInt(idParam, 10);
    let targetExam: ExamPaper | undefined;
    if (!isNaN(num) && num >= 1 && num <= MOCK_EXAM_PAPERS.length) {
      targetExam = MOCK_EXAM_PAPERS[num - 1];
    } else {
      targetExam = MOCK_EXAM_PAPERS.find((p) => p.id === idParam);
    }

    if (targetExam) {
      handleStartExam(targetExam);
    }
  }, [searchParams]);

  const handleReturnToHub = () => {
    setActiveMode("HUB");
    setSelectedExam(null);
    setShowSubmitConfirmModal(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      url.searchParams.delete("exam");
      url.searchParams.delete("examId");
      window.history.pushState({}, "", url.pathname);
    }
  };

  // Actions
  const handleStartExam = (exam: ExamPaper) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});

    // Ensure activeSkills includes the exam's supported skills so questions are visible
    const currentSkills =
      exam.supportedSkills.length > 0 ? exam.supportedSkills : activeSkills;
    setActiveSkills(currentSkills);

    // Dynamic Time Calculation based on selected skills
    let calcMinutes = 0;
    if (currentSkills.includes("LISTENING")) calcMinutes += 45;
    if (currentSkills.includes("READING")) calcMinutes += 75;
    if (currentSkills.includes("SPEAKING")) calcMinutes += 20;
    if (currentSkills.includes("WRITING")) calcMinutes += 60;

    setSecondsRemaining(
      Math.min(exam.timeLimitMinutes, calcMinutes || 30) * 60,
    );
    setTimeSpentSeconds(0);
    setActiveMode("WORKSPACE");
    setSidebarCollapsed(true);

    // Update URL route to ?id=1 (for first exam) or ?id=N
    const examIndex = MOCK_EXAM_PAPERS.findIndex((p) => p.id === exam.id);
    const idParam = examIndex >= 0 ? (examIndex + 1).toString() : exam.id;
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("id", idParam);
      window.history.pushState({}, "", url.toString());
    }

    addToast({
      type: "info",
      title: `Đã bắt đầu bài thi: ${exam.title}`,
      message: `Tổ hợp ${activeSkills.length} kỹ năng (${activeSkills.join(", ")}).`,
    });
  };

  const handleSelectAnswer = (
    questionId: string,
    choice: "A" | "B" | "C" | "D",
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleAutoSubmitExam = () => {
    addToast({
      type: "warning",
      title: "Hết giờ làm bài!",
      message: "Hệ thống đang tự động chấm điểm bài thi của bạn...",
    });
    handleSubmitExam();
  };

  // Auto-Save in Workspace Mode
  useEffect(() => {
    if (activeMode === "WORKSPACE" && selectedExam) {
      try {
        localStorage.setItem(
          "xp_exam_active_session",
          JSON.stringify({
            examId: selectedExam.id,
            userAnswers,
            flaggedQuestions,
            currentQuestionIndex,
            secondsRemaining,
            timeSpentSeconds,
            activeSkills,
            timestamp: Date.now(),
          }),
        );
      } catch (_) {}
    }
  }, [
    activeMode,
    selectedExam,
    userAnswers,
    flaggedQuestions,
    currentQuestionIndex,
    secondsRemaining,
    timeSpentSeconds,
    activeSkills,
  ]);

  const handleSubmitExam = async () => {
    if (!selectedExam) return;
    setShowSubmitConfirmModal(false);

    try {
      localStorage.removeItem("xp_exam_active_session");
    } catch (_) {}

    const result = calculateExamResult(
      selectedExam,
      userAnswers,
      timeSpentSeconds,
      activeSkills,
      flaggedQuestions,
    );
    setExamResult(result);
    setReportTab("OVERVIEW");
    setSelectedReviewQIndex(0);
    setActiveMode("REPORT");

    // Sync XP, Coins & Study time in client store
    awardXp(result.xpAwarded, "vocab");
    awardCoins(result.coinsAwarded);
    addPracticeTime(Math.ceil(timeSpentSeconds / 60), "vocab");

    // Update best stats in local state
    setTotalExamsCompleted((prev) => prev + 1);
    if (result.examType.includes("TOEIC")) {
      setBestToeicScore((prev) => Math.max(prev, result.scaledScore));
    } else {
      setBestIeltsBand((prev) => Math.max(prev, result.scaledScore));
    }

    // Persist attempt to Backend PostgreSQL Database
    try {
      fetch("/api/exams/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: selectedExam.id,
          examTitle: selectedExam.title,
          examType: selectedExam.type,
          totalScore: result.scaledScore,
          maxScore: result.maxScore,
          accuracyPercent: result.accuracyPercent,
          timeSpentSeconds,
          scaledScore: result.scaledScore,
          listeningScore: result.listeningScore,
          readingScore: result.readingScore,
          speakingScore: result.speakingScore,
          writingScore: result.writingScore,
          answers: result.questionResults.map((qr) => ({
            questionId: qr.questionId,
            userChoice: qr.userChoice,
            correctAnswer: qr.correctAnswer,
            isCorrect: qr.isCorrect,
            section: qr.section,
          })),
        }),
      }).catch((err) => console.warn("Backend exam persistence notice:", err));
    } catch (e) {
      console.warn("Async save error:", e);
    }

    addToast({
      type: "success",
      title: `🎉 Hoàn thành bài thi! +${result.xpAwarded} XP (+${result.coinsAwarded} Vàng)`,
      message: `Điểm số: ${result.scaledScore}/${result.maxScore}. Xem lại lời giải chi tiết bên dưới.`,
    });
  };

  // Stop audio on review question change or tab/mode change
  useEffect(() => {
    if (reviewAudioRef.current) {
      reviewAudioRef.current.pause();
      reviewAudioRef.current = null;
    }
    stopTTS();
    setPlayingAudioId(null);
  }, [selectedReviewQIndex, reportTab, activeMode]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (reviewAudioRef.current) {
        reviewAudioRef.current.pause();
        reviewAudioRef.current = null;
      }
      stopTTS();
    };
  }, []);

  // Play audio in review mode with multi-tier audio engine (Audio URL -> TTS Fallback)
  const handlePlayReviewAudio = (
    audioUrl?: string,
    qId?: string,
    fallbackText?: string,
    partNumber?: number,
  ) => {
    unlockMobileAudio();

    if (playingAudioId === qId) {
      if (reviewAudioRef.current) {
        reviewAudioRef.current.pause();
        reviewAudioRef.current = null;
      }
      stopTTS();
      setPlayingAudioId(null);
      return;
    }

    if (reviewAudioRef.current) {
      reviewAudioRef.current.pause();
      reviewAudioRef.current = null;
    }
    stopTTS();

    const targetId = qId || "current";
    const isMockSoundHelix = audioUrl && audioUrl.includes("soundhelix.com");

    if (audioUrl && !isMockSoundHelix) {
      const audio = new Audio(audioUrl);
      reviewAudioRef.current = audio;
      audio.playbackRate = reviewAudioSpeed;
      setPlayingAudioId(targetId);

      audio.play().catch(() => {
        // Fallback to Smart TTS speech synthesis if MP3 fails
        if (fallbackText) {
          const speechText = fallbackText.replace(/^\[Audio Transcript[^\]]*\]\s*/i, "");
          speakLessonText(speechText, {
            lessonId: targetId,
            speakerIndex: (partNumber || 1) % 2,
            rate: reviewAudioSpeed,
            onEnd: () => setPlayingAudioId(null),
            onError: () => setPlayingAudioId(null),
          });
        } else {
          setPlayingAudioId(null);
        }
      });

      audio.onended = () => setPlayingAudioId(null);
      audio.onerror = () => {
        if (fallbackText) {
          const speechText = fallbackText.replace(/^\[Audio Transcript[^\]]*\]\s*/i, "");
          speakLessonText(speechText, {
            lessonId: targetId,
            speakerIndex: (partNumber || 1) % 2,
            rate: reviewAudioSpeed,
            onEnd: () => setPlayingAudioId(null),
            onError: () => setPlayingAudioId(null),
          });
        } else {
          setPlayingAudioId(null);
        }
      };
    } else if (fallbackText) {
      setPlayingAudioId(targetId);
      const speechText = fallbackText.replace(/^\[Audio Transcript[^\]]*\]\s*/i, "");
      speakLessonText(speechText, {
        lessonId: targetId,
        speakerIndex: (partNumber || 1) % 2,
        rate: reviewAudioSpeed,
        onEnd: () => setPlayingAudioId(null),
        onError: () => setPlayingAudioId(null),
      });
    }
  };

  const handleReviewSpeedChange = (speed: number, currentQ?: ExamQuestion) => {
    setReviewAudioSpeed(speed);
    if (reviewAudioRef.current) {
      reviewAudioRef.current.playbackRate = speed;
    }
    if (
      playingAudioId &&
      currentQ &&
      (!reviewAudioRef.current || reviewAudioRef.current.paused)
    ) {
      handlePlayReviewAudio(
        currentQ.audioUrl,
        currentQ.id,
        currentQ.passageText || currentQ.questionText,
        currentQ.partNumber,
      );
    }
  };

  // Request AI Deep Explanation for a question
  const handleRequestAiExplanation = async (
    question: ExamQuestion,
    userChoice?: string,
  ) => {
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
          examType: selectedExam?.type.includes("TOEIC") ? "TOEIC" : "IELTS",
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiExplainMap((prev) => ({
          ...prev,
          [qId]: { loading: false, data: data.data },
        }));
        addToast({
          type: "success",
          title: "🎉 AI đã phân tích chi tiết câu hỏi này!",
        });
      } else {
        throw new Error(data.error || "Lỗi tạo lời giải AI");
      }
    } catch (err: any) {
      setAiExplainMap((prev) => ({
        ...prev,
        [qId]: { loading: false, error: err.message },
      }));
      addToast({
        type: "error",
        title: "Lỗi tạo lời giải AI",
        message: err.message,
      });
    }
  };

  // Evaluate Essay via AI API
  const handleEvaluateEssay = async () => {
    if (!writingEssay || writingEssay.trim().split(/\s+/).length < 10) {
      addToast({
        type: "warning",
        title: "Bài viết quá ngắn",
        message: "Vui lòng viết ít nhất 10 từ để AI chấm điểm.",
      });
      return;
    }

    setIsEvaluatingEssay(true);
    try {
      const res = await fetch("/api/ai/exam-writing-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            filteredQuestions[currentQuestionIndex]?.writingPrompt ||
            "IELTS Essay Prompt",
          userEssay: writingEssay,
          examType: selectedExam?.type.includes("TOEIC") ? "TOEIC" : "IELTS",
        }),
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setWritingEvaluation(data.evaluation);
        addToast({
          type: "success",
          title: `🎉 AI Chấm Điểm Bài Luận: Band ${data.evaluation.overallBand}`,
        });
      } else {
        throw new Error(data.error || "Lỗi chấm bài AI");
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Lỗi chấm bài AI",
        message: err.message,
      });
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
          examType: "TOEIC",
        }),
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
          questions: data.data.questions,
        };
        setShowAiSection(false);
        handleStartExam(newPaper);
      } else {
        throw new Error(data.error || "Tạo đề thi thất bại");
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Lỗi tạo đề AI",
        message: err.message || "Vui lòng thử lại sau.",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Helper for Category Badge Color Scheme
  const getCategoryBadgeStyle = (badge: string, type: string) => {
    const b = (badge + " " + type).toUpperCase();
    if (b.includes("IELTS ACADEMIC") || b.includes("IELTS_FULL")) {
      return "bg-sky-50 dark:bg-sky-950/60 text-[#0059bb] dark:text-sky-300 border-sky-200/80 dark:border-sky-800/50";
    }
    if (b.includes("4-SKILLS") || b.includes("TOEIC_FULL")) {
      return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/50";
    }
    if (
      b.includes("SPEAKING & WRITING") ||
      b.includes("TOEIC_SPEAKING_WRITING") ||
      b.includes("NÓI & VIẾT")
    ) {
      return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/50";
    }
    if (b.includes("IELTS SPEAKING") || b.includes("IELTS_SPEAKING")) {
      return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/50";
    }
    if (b.includes("IELTS WRITING") || b.includes("IELTS_WRITING")) {
      return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/50";
    }
    return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/50";
  };

  // Filtered Exam List (Dynamically filtered by activeSkills matrix)
  const filteredExams = MOCK_EXAM_PAPERS.filter((exam) => {
    const matchesType =
      filterType === "ALL" ||
      exam.type === filterType ||
      (filterType === "TOEIC_LR" &&
        (exam.type === "TOEIC_LR" || exam.type === "TOEIC_MINI")) ||
      (filterType === "IELTS_FULL" && exam.type === "IELTS_FULL");
    const matchesSearch =
      searchQuery.trim() === "" ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    // Filter exams that match selected activeSkills (unless filtering by specific category tab)
    const matchesSkill =
      filterType !== "ALL" ||
      activeSkills.length === 4 ||
      activeSkills.length === 0 ||
      exam.supportedSkills.some((s) => activeSkills.includes(s));

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
    <PageEntranceWrapper className="space-y-3.5 pb-16 md:pb-6 px-0 relative select-none font-sans">
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
                  Luyện đề TOEIC ETS 2026 & Cambridge IELTS Band 9.0 • Tự chọn
                  kỹ năng • Chấm điểm AI thời gian thực
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  setConfigMode((prev) =>
                    prev === "AI_GEN" ? "PRESET" : "AI_GEN",
                  )
                }
                className="px-3 sm:px-3.5 py-1.5 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-display"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>
                  {configMode === "AI_GEN"
                    ? "Chế Độ Đề Chuẩn"
                    : "Tạo Đề Mới AI"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* UNIFIED EXAM CONFIGURATOR STUDIO */}
          <div className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 sm:space-y-4">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xs bg-slate-100 dark:bg-slate-800/80 w-full sm:w-auto">
                <button
                  onClick={() => setConfigMode("PRESET")}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xs text-[11.5px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    configMode === "PRESET"
                      ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span className="sm:hidden">Đề Chuẩn</span>
                  <span className="hidden sm:inline">
                    Đề Thi Chuẩn ETS / Cambridge
                  </span>
                </button>

                <button
                  onClick={() => setConfigMode("AI_GEN")}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-xs text-[11.5px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    configMode === "AI_GEN"
                      ? "bg-amber-400 text-slate-950 shadow-2xs font-black"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span className="sm:hidden">Tạo Đề AI</span>
                  <span className="hidden sm:inline">
                    Tạo Đề Đột Phá Bằng AI
                  </span>
                </button>
              </div>

              <span className="hidden sm:block text-xs font-bold text-slate-500 font-sans">
                {configMode === "AI_GEN"
                  ? "✨ Gemini AI Generator Mode"
                  : "📚 ETS & Cambridge Exam Bank Mode"}
              </span>
            </div>

            {/* Centerpiece Skill Selector Grid (4 Skills) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>
                  <span className="sm:hidden">
                    Kỹ năng ({activeSkills.length}/4):
                  </span>
                  <span className="hidden sm:inline">
                    Tùy chọn kỹ năng làm bài ({activeSkills.length}/4 đã chọn):
                  </span>
                </span>
                <span className="hidden sm:inline text-slate-400 text-[11px]">
                  Tự động lọc danh sách đề thi phù hợp
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  {
                    id: "LISTENING" as SkillType,
                    labelMobile: "Nghe",
                    labelPrimary: "Nghe",
                    labelEn: "Listening",
                    icon: Headphones,
                    color: "text-[#0059bb]",
                    border: "border-[#0059bb]",
                  },
                  {
                    id: "READING" as SkillType,
                    labelMobile: "Đọc",
                    labelPrimary: "Đọc",
                    labelEn: "Reading",
                    icon: BookOpen,
                    color: "text-emerald-500",
                    border: "border-emerald-500",
                  },
                  {
                    id: "SPEAKING" as SkillType,
                    labelMobile: "Nói AI",
                    labelPrimary: "Nói AI",
                    labelEn: "Speaking",
                    icon: Mic,
                    color: "text-amber-500",
                    border: "border-amber-500",
                  },
                  {
                    id: "WRITING" as SkillType,
                    labelMobile: "Viết AI",
                    labelPrimary: "Viết AI",
                    labelEn: "Writing",
                    icon: Wand2,
                    color: "text-purple-500",
                    border: "border-purple-500",
                  },
                ].map((skillItem) => {
                  const Icon = skillItem.icon;
                  const isChecked = activeSkills.includes(skillItem.id);

                  return (
                    <button
                      key={skillItem.id}
                      onClick={() => handleToggleSkill(skillItem.id)}
                      className={`p-2 sm:p-2.5 rounded-xs border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? `bg-slate-50 dark:bg-slate-800 ${skillItem.border} shadow-2xs font-extrabold`
                          : "bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-400 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${skillItem.color} shrink-0`}
                          strokeWidth={1.8}
                        />
                        <span className="text-slate-900 dark:text-white truncate">
                          <span className="sm:hidden">
                            {skillItem.labelMobile}
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1.5 font-bold">
                            <span>{skillItem.labelPrimary}</span>
                            <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                              • {skillItem.labelEn}
                            </span>
                          </span>
                        </span>
                      </div>
                      <div
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#0059bb] border-[#0059bb] text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {isChecked && (
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditional Panel for AI Mode */}
            {configMode === "AI_GEN" && (
              <div className="p-3.5 rounded-xs bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 space-y-3 pt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Topic Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <BookOpen
                        className="w-3.5 h-3.5 text-[#0059bb]"
                        strokeWidth={1.8}
                      />{" "}
                      Chủ đề bài thi:
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Business, Travel, AI, Healthcare..."
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="w-full h-8 px-3 text-xs font-medium rounded-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                    />
                    <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                      {["Kinh doanh", "Du lịch", "Y tế", "Công nghệ"].map(
                        (chipTopic) => (
                          <button
                            key={chipTopic}
                            type="button"
                            onClick={() => setAiTopic(chipTopic)}
                            className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 cursor-pointer border"
                          >
                            {chipTopic}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Target Score */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Award
                        className="w-3.5 h-3.5 text-amber-500"
                        strokeWidth={1.8}
                      />{" "}
                      Thang điểm mục tiêu:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: "500+", label: "500+ (Dễ)" },
                        { id: "700+", label: "700+ (Vừa)" },
                        { id: "900+", label: "900+ (Khó)" },
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
                      <Clock
                        className="w-3.5 h-3.5 text-purple-500"
                        strokeWidth={1.8}
                      />{" "}
                      Số câu & thời gian:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { count: 10, label: "10 câu (8m)" },
                        { count: 20, label: "20 câu (16m)" },
                        { count: 50, label: "50 câu (30m)" },
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
                    💡 Gemini AI sẽ sinh bài thi thời gian thực theo đúng các kỹ
                    năng đã chọn.
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
            )}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-2.5 pt-1">
            {/* Filter Segmented Control - 100% Fit On Mobile (No Scroll), Full Flex On Desktop */}
            <div className="grid grid-cols-5 gap-1 w-full sm:w-auto sm:flex sm:items-center sm:gap-1">
              {[
                {
                  id: "ALL",
                  labelMobile: "Tất cả",
                  labelDesktop: "Tất cả bộ đề",
                },
                {
                  id: "IELTS_FULL",
                  labelMobile: "IELTS 4K",
                  labelDesktop: "IELTS Academic",
                },
                {
                  id: "TOEIC_LR",
                  labelMobile: "TOEIC L&R",
                  labelDesktop: "TOEIC Nghe & Đọc",
                },
                {
                  id: "TOEIC_SPEAKING_WRITING",
                  labelMobile: "Nói+Viết",
                  labelDesktop: "TOEIC Nói + Viết",
                },
                {
                  id: "TOEIC_FULL",
                  labelMobile: "TOEIC 4K",
                  labelDesktop: "TOEIC Full 4K",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-1 sm:px-3 py-1 sm:py-1.5 rounded-xs text-[10px] sm:text-xs font-bold text-center transition-all cursor-pointer truncate ${
                    filterType === tab.id
                      ? "bg-[#0059bb] text-white shadow-2xs font-black"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/10"
                  }`}
                >
                  <span className="sm:hidden">{tab.labelMobile}</span>
                  <span className="hidden sm:inline">{tab.labelDesktop}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search
                className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 sm:top-2.5"
                strokeWidth={1.8}
              />
              <input
                type="text"
                placeholder="Tìm tên đề thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-7.5 sm:h-8 pl-8 pr-2.5 text-xs font-medium rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
              />
            </div>
          </div>

          {/* De-cluttered Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {filteredExams.map((exam) => (
              <motion.div
                whileHover={{ y: -2 }}
                key={exam.id}
                className="p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-[#0059bb]/40 dark:hover:border-sky-500/40 hover:shadow-xs shadow-2xs flex flex-col justify-between space-y-2.5 sm:space-y-3 relative group transition-all"
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider border font-display ${getCategoryBadgeStyle(
                        exam.categoryBadge,
                        exam.type,
                      )}`}
                    >
                      {exam.categoryBadge}
                    </span>
                    {/* 5-Star Visual Difficulty Rating (No text, pure vector stars) */}
                    <div
                      className="flex items-center gap-0.5"
                      title={`Độ khó: ${exam.level}`}
                    >
                      {Array.from({ length: 5 }).map((_, starIdx) => {
                        const starCount =
                          exam.level === "Beginner"
                            ? 2
                            : exam.level === "Intermediate"
                              ? 3
                              : 5;
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

                  <h3 className="text-[13px] sm:text-sm font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0059bb] transition-colors leading-snug line-clamp-2 min-h-[2.4rem] flex items-center">
                    {exam.title}
                  </h3>

                  {/* Supported Skill Icons Row */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {exam.supportedSkills.includes("LISTENING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[9.5px] sm:text-[10px] font-bold flex items-center gap-1 border border-blue-200/60 dark:border-blue-800/40">
                        <Headphones className="w-3 h-3" strokeWidth={1.8} />{" "}
                        Nghe
                      </span>
                    )}
                    {exam.supportedSkills.includes("READING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[9.5px] sm:text-[10px] font-bold flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40">
                        <BookOpen className="w-3 h-3" strokeWidth={1.8} /> Đọc
                      </span>
                    )}
                    {exam.supportedSkills.includes("SPEAKING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-[9.5px] sm:text-[10px] font-bold flex items-center gap-1 border border-amber-200/60 dark:border-amber-800/40">
                        <Mic className="w-3 h-3" strokeWidth={1.8} /> Nói AI
                      </span>
                    )}
                    {exam.supportedSkills.includes("WRITING") && (
                      <span className="px-1.5 py-0.5 rounded-xs bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-[9.5px] sm:text-[10px] font-bold flex items-center gap-1 border border-purple-200/60 dark:border-purple-800/40">
                        <Wand2 className="w-3 h-3" strokeWidth={1.8} /> Viết AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual Meta Chips & Action Button */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                    <span className="flex items-center gap-1">
                      <FileText
                        className="w-3.5 h-3.5 text-[#0059bb]"
                        strokeWidth={1.8}
                      />{" "}
                      {exam.totalQuestions} câu
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock
                        className="w-3.5 h-3.5 text-slate-400"
                        strokeWidth={1.8}
                      />{" "}
                      {exam.timeLimitMinutes}m
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartExam(exam)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] active:scale-95 text-white text-xs font-black transition-all shadow-2xs flex items-center gap-1 cursor-pointer font-display"
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
        <div className="space-y-3">
          {/* 0. TOP WORKSPACE TOOLBAR HEADER CARD */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 sm:p-3 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 shadow-2xs space-y-2"
          >
            {/* DESKTOP TOOLBAR (sm:flex) - 100% UNTOUCHED ORIGINAL LAYOUT */}
            <div className="hidden sm:flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setShowSubmitConfirmModal(true)}
                  className="px-2.5 py-1 rounded-xs bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shrink-0 cursor-pointer shadow-2xs flex items-center gap-1 transition-all active:scale-95"
                  title="Thoát khỏi bài thi và quay lại danh sách đề"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Thoát bài thi</span>
                </button>

                <div className="w-8 h-8 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>

                <div className="min-w-0 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-xs text-[9px] font-black bg-[#0059bb] text-white shadow-2xs shrink-0">
                    {selectedExam.categoryBadge || "EXAM"}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    {selectedExam.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Toggle Answer Sheet Panel Button (Desktop) */}
                <button
                  onClick={() => setShowAnswerSheet((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    showAnswerSheet
                      ? "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-2xs"
                      : "bg-amber-400 text-slate-950 font-black shadow-2xs"
                  }`}
                  title={
                    showAnswerSheet
                      ? "Thu gọn Phiếu trả lời"
                      : "Mở lại Phiếu trả lời"
                  }
                >
                  <Sliders className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span>{showAnswerSheet ? "Ẩn Phiếu" : "Mở Phiếu"}</span>
                </button>

                {/* Timer Countdown Badge */}
                <div
                  className={`px-3 py-1 rounded-xs border text-xs font-black font-sans flex items-center gap-1 shadow-2xs ${
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
            </div>

            {/* MOBILE TOOLBAR (< 640px) - CLEAN, UN-CROWDED & READABLE */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setShowSubmitConfirmModal(true)}
                  className="px-2.5 py-1 rounded-xs bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shrink-0 cursor-pointer shadow-2xs flex items-center gap-1 active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Thoát</span>
                </button>

                {/* Prominent Center Timer */}
                <div
                  className={`px-2.5 py-1 rounded-xs border text-xs font-black font-sans flex items-center gap-1 shadow-2xs ${
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
                  className="px-3 py-1 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black shadow-2xs cursor-pointer active:scale-95"
                >
                  Nộp bài
                </button>
              </div>

              {/* Sub line: Exam Badge & Title */}
              <div className="flex items-center gap-1.5 px-0.5">
                <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-[#0059bb] text-white shadow-2xs shrink-0">
                  {selectedExam.categoryBadge || "EXAM"}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate font-display">
                  {selectedExam.title}
                </span>
              </div>
            </div>
          </motion.div>

          {/* DUAL PANEL WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT PANEL (8/12 OR 12/12): SPECIALIZED WORKSPACE ENGINE FOR EACH SKILL */}
            <div
              className={`${showAnswerSheet ? "lg:col-span-8" : "lg:col-span-12"} space-y-3 pb-16 lg:pb-0`}
            >
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
                        onSelectAnswer={(choice) =>
                          handleSelectAnswer(q.id, choice)
                        }
                      />
                    )}

                    {/* 2. READING WORKSPACE (ALWAYS-VISIBLE SIDE-BY-SIDE PASSAGE) */}
                    {q.section === "READING" && (
                      <ReadingWorkspace
                        question={q}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={filteredQuestions.length}
                        userChoice={userAnswers[q.id]}
                        onSelectAnswer={(choice) =>
                          handleSelectAnswer(q.id, choice)
                        }
                      />
                    )}

                    {/* 3. SPEAKING AI STUDIO WORKSPACE */}
                    {q.section === "SPEAKING" && (
                      <SpeakingStudioWorkspace
                        question={q}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={filteredQuestions.length}
                        onSelectAnswer={(choice) =>
                          handleSelectAnswer(q.id, choice)
                        }
                      />
                    )}

                    {/* 4. WRITING AI STUDIO WORKSPACE */}
                    {q.section === "WRITING" && (
                      <WritingStudioWorkspace
                        question={q}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={filteredQuestions.length}
                        onSelectAnswer={(choice) =>
                          handleSelectAnswer(q.id, choice)
                        }
                      />
                    )}

                    {/* Desktop-Only In-flow Navigation Buttons */}
                    <div className="hidden lg:flex p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 items-center justify-between">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.max(0, prev - 1),
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-2xs"
                      >
                        <ChevronLeft className="w-4 h-4" /> Câu trước
                      </button>

                      {/* Right action group: Flag + Next question */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFlag(q.id)}
                          className={`px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                            flaggedQuestions[q.id]
                              ? "bg-amber-400 text-slate-950 border-amber-500 font-black"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>
                            {flaggedQuestions[q.id]
                              ? "Đã Đánh Dấu"
                              : "Đánh Dấu Câu"}
                          </span>
                        </button>

                        <button
                          disabled={
                            currentQuestionIndex ===
                            filteredQuestions.length - 1
                          }
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              Math.min(filteredQuestions.length - 1, prev + 1),
                            )
                          }
                          className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1 shadow-2xs font-display transition-all"
                        >
                          Câu tiếp <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* RIGHT PANEL (4/12): DESKTOP ONLY SIDE-BY-SIDE ANSWER SHEET */}
            {showAnswerSheet && (
              <div className="hidden lg:block lg:col-span-4 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#0059bb]" /> Phiếu Trả
                    Lời (Answer Sheet)
                  </h3>
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400">
                    {Object.keys(userAnswers).length}/{filteredQuestions.length}{" "}
                    Đã làm
                  </span>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#0059bb]" /> Đã làm
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10" />{" "}
                    Chưa làm
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-amber-400" /> Xem lại
                  </span>
                </div>

                {/* Answer Grid: Exactly 6 Columns per row */}
                <div className="grid grid-cols-6 gap-1.5 max-h-[50vh] overflow-y-auto p-1">
                  {filteredQuestions.map((q, idx) => {
                    const isCurrent = idx === currentQuestionIndex;
                    const isAnswered = !!userAnswers[q.id];
                    const isFlagged = !!flaggedQuestions[q.id];

                    let btnStyle =
                      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent";
                    if (isFlagged) {
                      btnStyle =
                        "bg-amber-400 text-slate-950 font-black border-amber-500";
                    } else if (isAnswered) {
                      btnStyle =
                        "bg-[#0059bb] text-white font-bold border-transparent";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-9 rounded-xs text-sm font-black font-sans transition-all cursor-pointer flex items-center justify-center border ${btnStyle} ${
                          isCurrent
                            ? "ring-2 ring-blue-500 shadow-md scale-105"
                            : ""
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

          {/* 📱 MOBILE BOTTOM SHEET ANSWER DRAWER (< 1024px) */}
          <AnimatePresence>
            {showMobileWorkspaceSheet && (
              <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-xl sm:rounded-xs border border-slate-200 dark:border-white/10 shadow-2xl p-4 space-y-3.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#0059bb]" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display">
                        Phiếu Trả Lời ({Object.keys(userAnswers).length}/
                        {filteredQuestions.length} Đã làm)
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowMobileWorkspaceSheet(false)}
                      className="p-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer border border-slate-200 dark:border-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Legend */}
                  <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 border-b border-slate-100 dark:border-white/5 pb-2">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-xs bg-[#0059bb]" /> Đã
                      làm
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10" />{" "}
                      Chưa làm
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-xs bg-amber-400" /> Xem
                      lại
                    </span>
                  </div>

                  {/* Answer Grid: Exactly 6 Columns per row */}
                  <div className="grid grid-cols-6 gap-1.5 max-h-[50vh] overflow-y-auto p-1 bg-slate-50 dark:bg-slate-950/60 rounded-xs border border-slate-200/60 dark:border-white/5">
                    {filteredQuestions.map((q, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = !!userAnswers[q.id];
                      const isFlagged = !!flaggedQuestions[q.id];

                      let btnStyle =
                        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent";
                      if (isFlagged) {
                        btnStyle =
                          "bg-amber-400 text-slate-950 font-black border-amber-500";
                      } else if (isAnswered) {
                        btnStyle =
                          "bg-[#0059bb] text-white font-bold border-transparent";
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentQuestionIndex(idx);
                            setShowMobileWorkspaceSheet(false);
                          }}
                          className={`h-9 rounded-xs text-sm font-black font-sans transition-all cursor-pointer flex items-center justify-center border ${btnStyle} ${
                            isCurrent
                              ? "ring-2 ring-blue-500 shadow-md scale-105"
                              : ""
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* 📱 MOBILE PINNED TO BOTTOM THUMB-ZONE NAVIGATION BAR */}
          {(() => {
            const currentQ = filteredQuestions[currentQuestionIndex];
            if (!currentQ) return null;
            const isFlagged = !!flaggedQuestions[currentQ.id];

            return (
              <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-2.5 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 shadow-2xl flex items-center justify-between gap-2">
                {/* Left: Nút Trước */}
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="px-3 py-2 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs shrink-0 min-w-[72px]"
                >
                  <ChevronLeft className="w-4 h-4" /> <span>Trước</span>
                </button>

                {/* Center: Cụm Ghim & Phiếu Trả Lời căn giữa */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleToggleFlag(currentQ.id)}
                    className={`py-2 px-3 rounded-xs text-xs font-bold flex items-center gap-1 cursor-pointer border transition-all active:scale-95 shadow-2xs ${
                      isFlagged
                        ? "bg-amber-400 text-slate-950 border-amber-500 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                    }`}
                    title="Đánh dấu câu để xem lại sau"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{isFlagged ? "Đã lưu" : "Ghim"}</span>
                  </button>

                  <button
                    onClick={() => setShowMobileWorkspaceSheet(true)}
                    className="py-2 px-3 rounded-xs bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-xs font-black border border-blue-200 dark:border-blue-800/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
                    title="Mở bảng phiếu trả lời"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      {currentQuestionIndex + 1}/{filteredQuestions.length}
                    </span>
                  </button>
                </div>

                {/* Right: Nút Tiếp */}
                <button
                  disabled={
                    currentQuestionIndex === filteredQuestions.length - 1
                  }
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(filteredQuestions.length - 1, prev + 1),
                    )
                  }
                  className="px-3 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs shrink-0 min-w-[72px]"
                >
                  <span>Tiếp</span> <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: REPORT & PERFORMANCE ANALYTICS */}
      {/* ========================================================================= */}
      {activeMode === "REPORT" && examResult && (
        <div className="space-y-3.5 w-full">
          {/* 0. AGENCY MICRO-HERO BAR WITH SEGMENTED TABS */}
          <div className="p-3 sm:p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 shadow-2xs space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xs bg-[#0059bb] text-white flex items-center justify-center shadow-2xs shrink-0">
                  <Award className="w-4 h-4" strokeWidth={1.8} />
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

              {/* Top Action Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:items-center sm:w-auto">
                <button
                  onClick={() => setActiveMode("HUB")}
                  className="px-3 py-1.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all shadow-2xs flex items-center justify-center text-center"
                >
                  ← Danh Sách Đề
                </button>
                {selectedExam && (
                  <button
                    onClick={() => handleStartExam(selectedExam)}
                    className="px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-display text-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                    <span>Thi Lại</span>
                  </button>
                )}
              </div>
            </div>

            {/* Segmented Sliding Tabs */}
            <div className="p-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-xs flex items-center gap-1 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <button
                onClick={() => setReportTab("OVERVIEW")}
                className={`flex-1 py-2 px-1.5 sm:px-3 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                  reportTab === "OVERVIEW"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                <span className="sm:hidden">1. Điểm số</span>
                <span className="hidden sm:inline">1. Tổng Quan & Điểm Số</span>
              </button>

              <button
                onClick={() => setReportTab("REVIEW")}
                className={`flex-1 py-2 px-1.5 sm:px-3 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                  reportTab === "REVIEW"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                <span className="sm:hidden">2. Lời giải</span>
                <span className="hidden sm:inline">2. Lời Giải Chuyên Sâu</span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-xs bg-amber-400 text-slate-950 text-[10px] font-black ml-0.5 font-sans shrink-0">
                  {examResult.questionResults.length}
                </span>
              </button>

              <button
                onClick={() => setReportTab("DIAGNOSTIC")}
                className={`flex-1 py-2 px-1.5 sm:px-3 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                  reportTab === "DIAGNOSTIC"
                    ? "bg-[#0059bb] text-white shadow-2xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Brain
                  className="w-3.5 h-3.5 text-purple-400 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="sm:hidden">3. Lộ trình AI</span>
                <span className="hidden sm:inline">
                  3. AI Chẩn Đoán & Lộ Trình
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: BENTO SCORE & PERFORMANCE DASHBOARD */}
          {reportTab === "OVERVIEW" && (
            <div className="space-y-2.5 sm:space-y-4">
              {/* Radial Meter Hero Card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 sm:p-5 rounded-xs bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-950 text-white shadow-lg relative overflow-hidden border border-blue-400/20"
              >
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-5">
                  {/* Left: Score Gauge */}
                  <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                    {/* SVG Radial Gauge */}
                    <div className="relative w-[88px] h-[88px] sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
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
                      <span className="inline-block px-2 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-display">
                        KẾT QUẢ QUY ĐỔI CHÍNH THỨC
                      </span>
                      <div className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                        {examResult.scaledScore}{" "}
                        <span className="text-sm sm:text-lg text-blue-200 font-semibold font-sans">
                          / {examResult.maxScore}
                        </span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] text-blue-100/90 font-medium truncate">
                        Trả lời đúng{" "}
                        <span className="font-bold text-white">
                          {examResult.correctCount}/{examResult.totalQuestions}
                        </span>{" "}
                        câu
                        <span className="hidden sm:inline">
                          {" "}• Làm bài trong{" "}
                          <span className="font-bold text-white">
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
                        <div className="md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10.5px] sm:text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Headphones
                              className="w-3.5 h-3.5 text-sky-300"
                              strokeWidth={1.8}
                            />
                            <span className="font-bold text-white">
                              Listening
                            </span>
                          </div>
                          <span className="font-sans font-black text-sky-200 text-xs">
                            {examResult.listeningScore}{" "}
                            {examResult.examType.includes("IELTS")
                              ? "/ 9.0"
                              : "/ 495"}
                          </span>
                        </div>
                      )}
                      {examResult.readingScore !== undefined && (
                        <div className="md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10.5px] sm:text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <BookOpen
                              className="w-3.5 h-3.5 text-emerald-300"
                              strokeWidth={1.8}
                            />
                            <span className="font-bold text-white">
                              Reading
                            </span>
                          </div>
                          <span className="font-sans font-black text-emerald-200 text-xs">
                            {examResult.readingScore}{" "}
                            {examResult.examType.includes("IELTS")
                              ? "/ 9.0"
                              : "/ 495"}
                          </span>
                        </div>
                      )}
                      {examResult.speakingScore !== undefined && (
                        <div className="md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10.5px] sm:text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Mic
                              className="w-3.5 h-3.5 text-amber-300"
                              strokeWidth={1.8}
                            />
                            <span className="font-bold text-white">
                              Speaking AI
                            </span>
                          </div>
                          <span className="font-sans font-black text-amber-200 text-xs">
                            {examResult.speakingScore}{" "}
                            {examResult.examType.includes("IELTS")
                              ? "/ 9.0"
                              : "/ 200"}
                          </span>
                        </div>
                      )}
                      {examResult.writingScore !== undefined && (
                        <div className="md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10.5px] sm:text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Wand2
                              className="w-3.5 h-3.5 text-purple-300"
                              strokeWidth={1.8}
                            />
                            <span className="font-bold text-white">
                              Writing AI
                            </span>
                          </div>
                          <span className="font-sans font-black text-purple-200 text-xs">
                            {examResult.writingScore}{" "}
                            {examResult.examType.includes("IELTS")
                              ? "/ 9.0"
                              : "/ 200"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
                      <div className="flex-1 md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10.5px] sm:text-xs font-black flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                        {examResult.xpAwarded} XP Thưởng
                      </div>
                      <div className="flex-1 md:w-44 px-2.5 py-1.5 sm:p-2 rounded-xs bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10.5px] sm:text-xs font-black flex items-center justify-center gap-1.5">
                        <Award className="w-3.5 h-3.5" strokeWidth={1.8} /> +
                        {examResult.coinsAwarded} Vàng Thưởng
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4 Double-Bezel Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xs bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Câu Làm Đúng
                    </span>
                    <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-sans">
                      {examResult.correctCount}{" "}
                      <span className="text-[10px] sm:text-xs text-slate-400 font-normal">
                        / {examResult.totalQuestions} (
                        {examResult.accuracyPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xs bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <XCircle className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Câu Làm Sai
                    </span>
                    <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-sans">
                      {examResult.incorrectCount}{" "}
                      <span className="text-[10px] sm:text-xs text-slate-400 font-normal">
                        (
                        {Math.round(
                          (examResult.incorrectCount /
                            (examResult.totalQuestions || 1)) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Câu Bỏ Qua
                    </span>
                    <div className="text-sm sm:text-base font-black text-slate-700 dark:text-slate-300 font-sans">
                      {examResult.skippedCount}{" "}
                      <span className="text-[10px] sm:text-xs text-slate-400 font-normal">
                        (
                        {Math.round(
                          (examResult.skippedCount /
                            (examResult.totalQuestions || 1)) *
                            100,
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xs bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tốc Độ Trung Bình
                    </span>
                    <div className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-400 font-sans">
                      {examResult.avgTimePerQuestion}s{" "}
                      <span className="text-[10px] sm:text-xs text-slate-400 font-normal">
                        / câu
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part Analysis Breakdown Cards */}
              <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
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
                      className="p-2.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-white/5 grid grid-cols-1 md:grid-cols-12 items-center gap-2.5 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                    >
                      {/* Column 1: Grade & Title (Fixed md:col-span-4) */}
                      <div className="md:col-span-4 flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-16 py-0.5 rounded-xs text-[10px] font-black font-sans uppercase text-center shrink-0 ${
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
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {part.partTitle}
                        </span>
                      </div>

                      {/* Column 2: Progress Bar (Fixed md:col-span-5) -> 100% PERFECTLY STRAIGHT ALIGNED */}
                      <div className="md:col-span-5 w-full">
                        <div className="w-full h-2 rounded-xs bg-slate-200 dark:bg-slate-800 overflow-hidden">
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

                      {/* Column 3: Stats & Button (Fixed md:col-span-3) */}
                      <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 min-w-0">
                        <span className="font-sans text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                          {part.correctCount}/{part.totalQuestions} (
                          {part.accuracyPercent}%)
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
              <div className="pt-2 flex items-center justify-center w-full">
                <button
                  onClick={() => setReportTab("REVIEW")}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer font-display transition-all active:scale-95 group"
                >
                  <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                  <span className="truncate">
                    Xem Chi Tiết Từng Câu & Lời Giải Chuyên Sâu
                  </span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MASTER-DETAIL BENTO REVIEW STUDIO (SPLIT SCREEN) */}
          {reportTab === "REVIEW" && (
            <div className="space-y-3.5">
              {/* 📱 MOBILE QUICK QUESTION NAVIGATOR BAR (< 1024px) */}
              <div className="lg:hidden p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="px-2 py-0.5 rounded-xs bg-[#0059bb] text-white text-[11px] font-black shrink-0 font-sans">
                      Câu {selectedReviewQIndex + 1}/{examResult.totalQuestions}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate font-display">
                      {
                        examResult.questionResults[selectedReviewQIndex]
                          ?.partTitle
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={selectedReviewQIndex === 0}
                      onClick={() =>
                        setSelectedReviewQIndex((prev) => Math.max(0, prev - 1))
                      }
                      className="w-7 h-7 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 flex items-center justify-center cursor-pointer border border-slate-200 dark:border-white/10"
                      title="Câu trước"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
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
                      className="w-7 h-7 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 flex items-center justify-center cursor-pointer border border-slate-200 dark:border-white/10"
                      title="Câu tiếp theo"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowMobileReviewSheet(true)}
                      className="px-2.5 py-1 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Bảng câu</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Swipeable Quick-Tap Question Numbers Strip */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                  {examResult.questionResults.map((qRes, idx) => {
                    const isSelected = idx === selectedReviewQIndex;
                    let chipStyle =
                      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10";
                    if (isSelected) {
                      if (qRes.isFlagged) {
                        chipStyle =
                          "bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300 scale-105 shadow-xs";
                      } else if (qRes.isCorrect) {
                        chipStyle =
                          "bg-emerald-600 text-white font-black ring-2 ring-emerald-400 scale-105 shadow-xs";
                      } else if (!qRes.isSkipped && !qRes.isCorrect) {
                        chipStyle =
                          "bg-rose-600 text-white font-black ring-2 ring-rose-400 scale-105 shadow-xs";
                      } else {
                        chipStyle =
                          "bg-[#0059bb] text-white font-black ring-2 ring-blue-400 scale-105 shadow-xs";
                      }
                    } else if (qRes.isFlagged) {
                      chipStyle =
                        "bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 font-bold";
                    } else if (qRes.isCorrect) {
                      chipStyle =
                        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold";
                    } else if (!qRes.isSkipped && !qRes.isCorrect) {
                      chipStyle =
                        "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold";
                    }

                    return (
                      <button
                        key={qRes.questionId}
                        onClick={() => setSelectedReviewQIndex(idx)}
                        className={`w-7 h-7 rounded-xs text-xs font-black shrink-0 transition-all cursor-pointer flex items-center justify-center font-sans ${chipStyle}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 📱 MOBILE BOTTOM SHEET DRAWER MODAL */}
              <AnimatePresence>
                {showMobileReviewSheet && (
                  <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                      className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-xl sm:rounded-xs border border-slate-200 dark:border-white/10 shadow-2xl p-4 space-y-3.5"
                    >
                      {/* Drawer Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
                          <Layers
                            className="w-4 h-4 text-[#0059bb] dark:text-sky-400"
                            strokeWidth={1.8}
                          />{" "}
                          Bảng Điều Hướng ({examResult.questionResults.length}{" "}
                          câu)
                        </span>
                        <button
                          onClick={() => setShowMobileReviewSheet(false)}
                          className="p-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer border border-slate-200 dark:border-white/10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Filter Status Structured Grid */}
                      <div className="space-y-1.5">
                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                          Lọc Trạng Thái:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {[
                            {
                              id: "ALL",
                              label: "Tất cả",
                              count: examResult.questionResults.length,
                              dot: "bg-[#0059bb]",
                            },
                            {
                              id: "CORRECT",
                              label: "Đúng",
                              count: examResult.correctCount,
                              dot: "bg-emerald-500",
                            },
                            {
                              id: "INCORRECT",
                              label: "Sai",
                              count: examResult.incorrectCount,
                              dot: "bg-rose-500",
                            },
                            {
                              id: "SKIPPED",
                              label: "Bỏ qua",
                              count: examResult.skippedCount,
                              dot: "bg-slate-400",
                            },
                            {
                              id: "FLAGGED",
                              label: "Đánh dấu",
                              count: examResult.questionResults.filter(
                                (q) => q.isFlagged,
                              ).length,
                              dot: "bg-amber-400",
                            },
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
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : f.dot} shrink-0`}
                                  />
                                  <span className="truncate">{f.label}</span>
                                </div>
                                <span
                                  className={`text-[10px] font-black px-1.5 py-0.2 rounded-xs ${
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : "bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                  }`}
                                >
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
                            onChange={(e) =>
                              setReviewPartFilter(
                                e.target.value === "ALL"
                                  ? "ALL"
                                  : Number(e.target.value),
                              )
                            }
                            className="w-full px-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer outline-none focus:ring-1 focus:ring-[#0059bb] transition-all appearance-none pr-8 font-sans"
                          >
                            <option value="ALL">
                              Tất cả các Part ({examResult.totalQuestions} câu)
                            </option>
                            {examResult.partAnalysis.map((p) => (
                              <option key={p.partNumber} value={p.partNumber}>
                                {p.partTitle} ({p.correctCount}/
                                {p.totalQuestions} câu đúng)
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
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{" "}
                              Đúng
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />{" "}
                              Sai
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />{" "}
                              Bỏ qua
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-6 gap-1.5 max-h-[300px] overflow-y-auto p-1.5 bg-slate-50/80 dark:bg-slate-950/80 rounded-xs border border-slate-200/60 dark:border-white/5">
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
                                qRes.questionNumber - 1 ===
                                selectedReviewQIndex;

                              let statusStyle = "";
                              if (isSelected) {
                                if (qRes.isFlagged) {
                                  statusStyle =
                                    "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300 scale-105 z-10";
                                } else if (qRes.isCorrect) {
                                  statusStyle =
                                    "bg-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-400 scale-105 z-10";
                                } else if (!qRes.isSkipped && !qRes.isCorrect) {
                                  statusStyle =
                                    "bg-rose-600 text-white font-black shadow-md ring-2 ring-rose-400 scale-105 z-10";
                                } else {
                                  statusStyle =
                                    "bg-[#0059bb] text-white font-black shadow-md ring-2 ring-blue-300 dark:ring-blue-800 scale-105 z-10";
                                }
                              } else {
                                if (qRes.isFlagged) {
                                  statusStyle =
                                    "bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 font-bold";
                                } else if (qRes.isCorrect) {
                                  statusStyle =
                                    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 font-bold";
                                } else if (!qRes.isSkipped && !qRes.isCorrect) {
                                  statusStyle =
                                    "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 font-bold";
                                } else {
                                  statusStyle =
                                    "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium";
                                }
                              }

                              return (
                                <button
                                  key={qRes.questionId}
                                  onClick={() => {
                                    setSelectedReviewQIndex(
                                      qRes.questionNumber - 1,
                                    );
                                    setShowMobileReviewSheet(false);
                                  }}
                                  className={`h-8 rounded-xs text-xs font-sans transition-all cursor-pointer flex items-center justify-center ${statusStyle}`}
                                  title={`Câu ${qRes.questionNumber}: ${qRes.isCorrect ? "Đúng" : qRes.isSkipped ? "Bỏ qua" : "Sai"}`}
                                >
                                  {qRes.questionNumber}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* MASTER-DETAIL SPLIT GRID (DESKTOP: 2 COLS / MOBILE: 1 COL) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* ========================================================= */}
                {/* LEFT COLUMN: STICKY QUESTION NAVIGATOR (DESKTOP ONLY) */}
                {/* ========================================================= */}
                <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-4 max-h-[calc(100vh-80px)] overflow-y-auto space-y-3 pr-0.5">
                  <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                    {/* Navigator Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
                        <Layers
                          className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400"
                          strokeWidth={1.8}
                        />{" "}
                        Điều Hướng Câu Hỏi
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
                          {
                            id: "ALL",
                            label: "Tất cả",
                            count: examResult.questionResults.length,
                            dot: "bg-[#0059bb]",
                          },
                          {
                            id: "CORRECT",
                            label: "Đúng",
                            count: examResult.correctCount,
                            dot: "bg-emerald-500",
                          },
                          {
                            id: "INCORRECT",
                            label: "Sai",
                            count: examResult.incorrectCount,
                            dot: "bg-rose-500",
                          },
                          {
                            id: "SKIPPED",
                            label: "Bỏ qua",
                            count: examResult.skippedCount,
                            dot: "bg-slate-400",
                          },
                          {
                            id: "FLAGGED",
                            label: "Đánh dấu",
                            count: examResult.questionResults.filter(
                              (q) => q.isFlagged,
                            ).length,
                            dot: "bg-amber-400",
                          },
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
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : f.dot} shrink-0`}
                                />
                                <span className="truncate">{f.label}</span>
                              </div>
                              <span
                                className={`text-[10px] font-black px-1.5 py-0.2 rounded-xs ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                              >
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
                          onChange={(e) =>
                            setReviewPartFilter(
                              e.target.value === "ALL"
                                ? "ALL"
                                : Number(e.target.value),
                            )
                          }
                          className="w-full px-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer outline-none focus:ring-1 focus:ring-[#0059bb] transition-all appearance-none pr-8"
                        >
                          <option value="ALL">
                            Tất cả các Part ({examResult.totalQuestions} câu)
                          </option>
                          {examResult.partAnalysis.map((p) => (
                            <option key={p.partNumber} value={p.partNumber}>
                              {p.partTitle} ({p.correctCount}/{p.totalQuestions}{" "}
                              câu đúng)
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
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{" "}
                            Đúng
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />{" "}
                            Sai
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />{" "}
                            Bỏ qua
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto p-1.5 bg-slate-50/80 dark:bg-slate-950/80 rounded-xs border border-slate-200/60 dark:border-white/5">
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

                            let statusStyle = "";
                            if (isSelected) {
                              if (qRes.isFlagged) {
                                statusStyle =
                                  "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300 scale-105 z-10";
                              } else if (qRes.isCorrect) {
                                statusStyle =
                                  "bg-emerald-600 text-white font-black shadow-md ring-2 ring-emerald-400 scale-105 z-10";
                              } else if (!qRes.isSkipped && !qRes.isCorrect) {
                                statusStyle =
                                  "bg-rose-600 text-white font-black shadow-md ring-2 ring-rose-400 scale-105 z-10";
                              } else {
                                statusStyle =
                                  "bg-[#0059bb] text-white font-black shadow-md ring-2 ring-blue-300 dark:ring-blue-800 scale-105 z-10";
                              }
                            } else {
                              if (qRes.isFlagged) {
                                statusStyle =
                                  "bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 font-bold";
                              } else if (qRes.isCorrect) {
                                statusStyle =
                                  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 font-bold";
                              } else if (!qRes.isSkipped && !qRes.isCorrect) {
                                statusStyle =
                                  "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 font-bold";
                              } else {
                                statusStyle =
                                  "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium";
                              }
                            }

                            return (
                              <button
                                key={qRes.questionId}
                                onClick={() =>
                                  setSelectedReviewQIndex(
                                    qRes.questionNumber - 1,
                                  )
                                }
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
                      <span className="text-slate-500 font-medium">
                        Đang chọn xem:
                      </span>
                      <span className="font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-xs border border-blue-200 dark:border-blue-900/40">
                        Câu {selectedReviewQIndex + 1} /{" "}
                        {examResult.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* RIGHT COLUMN: RICH QUESTION DEEP INSPECTOR (FULL WIDTH ON MOBILE, 8/12 ON DESKTOP) */}
                {/* ========================================================= */}
                <div className="col-span-1 lg:col-span-8 space-y-4">
                  {(() => {
                    const currentQRes =
                      examResult.questionResults[selectedReviewQIndex] ||
                      examResult.questionResults[0];
                    if (!currentQRes) return null;
                    const q = currentQRes.question;
                    const aiExplain = aiExplainMap[q.id];

                    return (
                      <div className="p-4 sm:p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
                        {/* Header: Question Status Strip */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-white/5 pb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-xs bg-[#0059bb] text-white text-xs font-black font-sans">
                              CÂU {currentQRes.questionNumber} /{" "}
                              {examResult.totalQuestions}
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
                                <CheckCircle2 className="w-4 h-4" /> CHÍNH XÁC
                                (+5 Điểm)
                              </span>
                            ) : currentQRes.isSkipped ? (
                              <span className="px-3 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4" /> CHƯA TRẢ LỜI
                                (0 Điểm)
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
                          <div className="max-w-md mx-auto aspect-[4/3] max-h-[260px] sm:max-h-[300px] rounded-xs overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-2xs bg-slate-100 dark:bg-slate-900/90 p-1 sm:p-1.5 flex items-center justify-center relative">
                            <img
                              src={q.imageUrl}
                              alt="Exam illustration"
                              className="w-full h-full object-contain object-center rounded-xs transition-all duration-200"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-xs bg-slate-950/75 backdrop-blur-xs text-[10px] font-bold text-white tracking-wider uppercase font-sans shadow-xs pointer-events-none">
                              Ảnh Câu {currentQRes.questionNumber}
                            </div>
                          </div>
                        )}

                        {/* Audio Player Studio with Waveform & Transcript Toggle */}
                        {q.audioUrl && (
                          <div className="p-3 sm:p-3.5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 space-y-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                              {/* Left Title & Speed Selector */}
                              <div className="flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div
                                    className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 shadow-2xs transition-all ${
                                      playingAudioId === q.id
                                        ? "bg-[#0059bb] text-white animate-pulse"
                                        : "bg-blue-100 dark:bg-blue-900/50 text-[#0059bb] dark:text-sky-400"
                                    }`}
                                  >
                                    <Headphones
                                      className="w-3.5 h-3.5"
                                      strokeWidth={2}
                                    />
                                  </div>
                                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                    Audio Bài Nghe Câu{" "}
                                    {currentQRes.questionNumber}
                                  </span>
                                </div>

                                {/* Speed Chips */}
                                <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 p-0.5 rounded-xs border border-blue-200/50 dark:border-blue-900/40">
                                  {[0.8, 1.0, 1.25].map((speed) => (
                                    <button
                                      key={speed}
                                      type="button"
                                      onClick={() =>
                                        handleReviewSpeedChange(speed, q)
                                      }
                                      className={`px-1.5 py-0.5 rounded-xs text-[10px] font-black cursor-pointer transition-all ${
                                        reviewAudioSpeed === speed
                                          ? "bg-[#0059bb] text-white shadow-2xs"
                                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                      }`}
                                    >
                                      {speed}x
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Right Action Buttons */}
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowReviewTranscript(
                                      !showReviewTranscript,
                                    )
                                  }
                                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xs text-xs font-bold border cursor-pointer shadow-2xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                                    showReviewTranscript
                                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <FileText className="w-3.5 h-3.5 shrink-0" />
                                  <span>
                                    {showReviewTranscript ? (
                                      "Ẩn Lời Thoại"
                                    ) : (
                                      <>
                                        <span className="inline sm:hidden">
                                          Lời Thoại
                                        </span>
                                        <span className="hidden sm:inline">
                                          Xem Lời Thoại (Transcript)
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePlayReviewAudio(
                                      q.audioUrl,
                                      q.id,
                                      q.passageText || q.questionText,
                                      q.partNumber,
                                    )
                                  }
                                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xs text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95 ${
                                    playingAudioId === q.id
                                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                                      : "bg-[#0059bb] hover:bg-[#004799]"
                                  }`}
                                >
                                  {playingAudioId === q.id ? (
                                    <Pause className="w-3.5 h-3.5 shrink-0 fill-current" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                                  )}
                                  <span>
                                    {playingAudioId === q.id ? (
                                      "Tạm Dừng"
                                    ) : (
                                      <>
                                        <span className="inline sm:hidden">
                                          Phát Audio
                                        </span>
                                        <span className="hidden sm:inline">
                                          Phát Lại Audio
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Transcript Collapsible Drawer */}
                            {showReviewTranscript && (
                              <div className="p-3 sm:p-3.5 rounded-xs bg-white/95 dark:bg-slate-900/95 border border-blue-200/70 dark:border-blue-900/50 text-xs sm:text-[13px] font-sans text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto shadow-2xs space-y-2">
                                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-sans">
                                  <div className="flex items-center gap-1.5">
                                    <FileText className="w-3 h-3 shrink-0" /> Lời
                                    Thoại Bài Nghe (Transcript)
                                  </div>
                                  {q.passageText && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (q.passageText) {
                                          navigator.clipboard.writeText(
                                            q.passageText,
                                          );
                                          setCopiedTranscript(true);
                                          setTimeout(
                                            () => setCopiedTranscript(false),
                                            2000,
                                          );
                                          addToast({
                                            type: "success",
                                            title: "Đã sao chép",
                                            message:
                                              "Đoạn lời thoại đã được lưu vào clipboard.",
                                          });
                                        }
                                      }}
                                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 normal-case text-[10px] font-bold transition-all cursor-pointer"
                                    >
                                      {copiedTranscript ? (
                                        <>
                                          <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                                          <span className="text-emerald-600 dark:text-emerald-400">
                                            Đã chép
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-2.5 h-2.5" />
                                          <span>Sao chép</span>
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                                <div>
                                  {q.passageText || (
                                    <span className="text-slate-500 dark:text-slate-400">
                                      Đoạn hội thoại cho câu này đang được cập
                                      nhật transcript chi tiết.
                                    </span>
                                  )}
                                </div>
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
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug font-display">
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
                                  className={`p-3.5 rounded-xs border text-xs sm:text-[13px] leading-relaxed flex items-start gap-3 transition-all ${cardStyle}`}
                                >
                                  <span
                                    className={`w-6 h-6 rounded-xs font-sans font-black text-xs flex items-center justify-center shrink-0 shadow-2xs ${
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
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                              <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 font-display whitespace-nowrap">
                                Lý Do & Lời Giải Chuyên Sâu
                              </h4>
                            </div>

                            {/* Ask AI Coach Button */}
                            <button
                              onClick={() =>
                                handleRequestAiExplanation(
                                  q,
                                  currentQRes.userChoice,
                                )
                              }
                              disabled={aiExplain?.loading}
                              className="w-full sm:w-auto px-3 py-1.5 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50 font-sans whitespace-nowrap shrink-0"
                            >
                              {aiExplain?.loading ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                                  <span>AI Đang Phân Tích...</span>
                                </>
                              ) : (
                                <>
                                  <Brain className="w-3.5 h-3.5 shrink-0" />
                                  <span>Hỏi AI Giải Thích Thêm</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Sample Essay / Model Response if available */}
                          {q.sampleEssay && (
                            <div className="p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/40 space-y-1.5 shadow-2xs">
                              <span className="text-[11px] font-black uppercase text-purple-700 dark:text-purple-300 tracking-wider font-display flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" /> Bài Viết / Câu Trả Lời Mẫu Đạt Điểm Tuyệt Đối (ETS Sample):
                              </span>
                              <div className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-line bg-purple-50/40 dark:bg-purple-950/20 p-2.5 rounded-xs border border-purple-100 dark:border-purple-900/30">
                                {q.sampleEssay}
                              </div>
                            </div>
                          )}

                          <FormattedExplanation
                            content={
                              q.explanation ||
                              `Đáp án chính xác là ${q.correctAnswer}.`
                            }
                          />

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
                        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
                          <button
                            disabled={selectedReviewQIndex === 0}
                            onClick={() =>
                              setSelectedReviewQIndex((prev) =>
                                Math.max(0, prev - 1),
                              )
                            }
                            className="px-2.5 sm:px-4 py-2 rounded-xs bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-2xs font-sans whitespace-nowrap shrink-0 min-w-[76px] sm:min-w-fit"
                          >
                            <ChevronLeft className="w-4 h-4 shrink-0" />
                            <span className="sm:hidden">Trước</span>
                            <span className="hidden sm:inline">Câu Trước</span>
                          </button>

                          <div className="text-center font-sans px-1 min-w-0">
                            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block">
                              {selectedReviewQIndex + 1} /{" "}
                              {examResult.questionResults.length}
                            </span>
                            <span className="hidden sm:block text-[10px] text-slate-400 font-medium whitespace-nowrap">
                              (Dùng phím ← / → để chuyển câu)
                            </span>
                          </div>

                          <button
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
                            className="px-2.5 sm:px-4 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1 sm:gap-1.5 transition-all font-sans whitespace-nowrap shrink-0 min-w-[76px] sm:min-w-fit"
                          >
                            <span className="sm:hidden">Tiếp</span>
                            <span className="hidden sm:inline">Câu Tiếp Theo</span>
                            <ChevronRight className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI DIAGNOSTIC & ACTION STUDIO */}
          {reportTab === "DIAGNOSTIC" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mastered Competencies Card */}
                <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-display flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} /> Điểm
                    Mạnh & Kỹ Năng Đã Làm Chủ
                  </h3>
                  <div className="space-y-2.5">
                    {examResult.strengths.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 text-xs font-medium text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5 font-sans shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-xs bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-[11px] shadow-2xs">
                          ✓
                        </span>
                        <span className="leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Improvement Areas Card */}
                <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-display flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" strokeWidth={1.8} /> Lỗ
                    Hổng Kiến Thức Cần Củng Cố
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
                              Độ chính xác:{" "}
                              <span className="font-bold text-rose-600 dark:text-rose-400">
                                {w.accuracyPercent || 0}%
                              </span>{" "}
                              ({w.correctCount || 0}/{w.totalQuestions || 0} câu
                              đúng)
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
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-2">
                    <Brain className="w-4 h-4" strokeWidth={1.8} /> Lộ Trình &
                    Khuyến Nghị Tối Ưu Điểm Số
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    Chương trình ôn luyện cá nhân hóa
                  </span>
                </div>

                <div className="space-y-2">
                  {examResult.recommendations.map((r, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xs bg-white dark:bg-slate-950 border border-blue-100 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-start gap-2.5 font-sans"
                    >
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
                        Khắc phục triệt để bẫy Part 5 & 6 với bài tập thông
                        minh.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-white/10 w-full">
            <button
              onClick={handleReturnToHub}
              className="w-[48%] sm:w-auto px-2.5 sm:px-4 py-2 rounded-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 cursor-pointer shadow-2xs text-center truncate"
            >
              <span className="sm:hidden">← Danh Sách Đề</span>
              <span className="hidden sm:inline">← Quay Lại Danh Sách Đề</span>
            </button>

            {selectedExam && (
              <button
                onClick={() => handleStartExam(selectedExam)}
                className="w-[48%] sm:w-auto px-2.5 sm:px-4 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-display text-center truncate"
              >
                <RotateCcw className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                <span className="sm:hidden">Thi Lại Đề Này</span>
                <span className="hidden sm:inline">Thi Lại Bài Này</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT & EXIT CONFIRMATION MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="w-7 h-7 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                <Layers className="w-4 h-4" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                Xác Nhận Nộp Bài Thi
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Vui lòng kiểm tra tiến trình hoàn thành bài làm trước khi hệ thống tính điểm chính thức:
            </p>

            {/* Statistics Summary Chips */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-center">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">Đã Làm</span>
                <span className="text-sm font-black text-emerald-700 dark:text-emerald-300 font-sans">
                  {Object.keys(userAnswers).length}/{filteredQuestions.length}
                </span>
              </div>

              <div className={`p-2 rounded-xs border text-center ${
                filteredQuestions.length - Object.keys(userAnswers).length > 0
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/40 text-amber-700 dark:text-amber-300"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 text-slate-500"
              }`}>
                <span className="text-[10px] font-bold block uppercase">Chưa Làm</span>
                <span className="text-sm font-black font-sans">
                  {Math.max(0, filteredQuestions.length - Object.keys(userAnswers).length)}
                </span>
              </div>

              <div className="p-2 rounded-xs bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-center">
                <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 block uppercase">Đánh Dấu</span>
                <span className="text-sm font-black text-[#0059bb] dark:text-sky-300 font-sans">
                  {Object.values(flaggedQuestions).filter(Boolean).length}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer shadow-2xs transition-all"
              >
                Làm tiếp
              </button>
              <button
                onClick={handleReturnToHub}
                className="px-3.5 py-1.5 rounded-xs bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold hover:bg-rose-100 cursor-pointer shadow-2xs transition-all"
              >
                Thoát bài thi
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black shadow-2xs cursor-pointer font-display transition-all"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </PageEntranceWrapper>
  );
}

export default function ExamPrepPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-xs font-bold text-slate-500 font-sans">
          Đang tải không gian luyện thi...
        </div>
      }
    >
      <ExamPrepContent />
    </React.Suspense>
  );
}
