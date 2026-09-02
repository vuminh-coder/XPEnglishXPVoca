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
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import {
  PageEntranceWrapper,
  MotionItem,
} from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { ListeningWorkspace } from "./components/ListeningWorkspace";
import { ReadingWorkspace } from "./components/ReadingWorkspace";
import { SpeakingStudioWorkspace } from "./components/SpeakingStudioWorkspace";
import { WritingStudioWorkspace } from "./components/WritingStudioWorkspace";
import { FormattedExplanation } from "./components/FormattedExplanation";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { unlockMobileAudio } from "@/shared/utils/mobileAudio";

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

    // Save to sessionStorage for instant dedicated result dashboard retrieval
    try {
      sessionStorage.setItem("xp_latest_exam_result", JSON.stringify(result));
    } catch (_) {}

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
      message: `Điểm số: ${result.scaledScore}/${result.maxScore}. Đang chuyển đến bảng phân tích chuyên sâu...`,
    });

    // Navigate to dedicated result dashboard
    const examIndex = MOCK_EXAM_PAPERS.findIndex((p) => p.id === selectedExam.id);
    const idParam = examIndex >= 0 ? (examIndex + 1).toString() : selectedExam.id;
    router.push(`/study/exam-prep/result?id=${idParam}`);
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
        <div className="space-y-4">
          {/* 0. BRAND TOP HEADER (56px h-14 Baseline) */}
          <AppTopHeader
            rightDesktopContent={
              <button
                type="button"
                onClick={() => setConfigMode((prev) => (prev === "AI_GEN" ? "PRESET" : "AI_GEN"))}
                className="h-9 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>{configMode === "AI_GEN" ? "Chế độ Đề Chuẩn" : "Tạo Đề Mới AI"}</span>
              </button>
            }
          >
            <HeaderPillContainer>
              <HeaderPillItem
                active
                icon={<FileText className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
                label="Thi thử đề"
              />
              <HeaderPillItem
                href="/study/practice"
                icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
                label="Luyện từ vựng"
              />
              <HeaderPillItem
                href="/study/listening"
                icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
                label="Dictation"
              />
              <HeaderPillItem
                href="/study/shadowing"
                icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
                label="Shadowing"
              />
            </HeaderPillContainer>
          </AppTopHeader>

          {/* MAIN CONTAINER */}
          <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
            
            {/* 1. HERO BENTO BANNER & CONFIGURATOR STUDIO */}
            <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-3 sm:space-y-4">
              {/* Top ambient rose glow line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

              {/* Header Row: Title & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3 sm:pb-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 shadow-2xs whitespace-nowrap shrink-0">
                      🎯 Phòng Thi Chuẩn
                    </span>
                    <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-snug">
                      Đấu Trường Thi Thử 2026
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <span className="sm:hidden">37 bộ đề chuẩn ETS & Cambridge • Chấm điểm AI</span>
                    <span className="hidden sm:inline">Ngân hàng 37 đề chuẩn hóa ETS & Cambridge • Tự chọn kỹ năng độc lập • Chấm điểm AI thời gian thực</span>
                  </p>
                </div>

                {/* Mode Switcher Tabs - Grid 2 cols on mobile (100% width, balanced 50/50), flex on desktop */}
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setConfigMode("PRESET")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      configMode === "PRESET"
                        ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Đề Chuẩn Preset</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfigMode("AI_GEN")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      configMode === "AI_GEN"
                        ? "bg-amber-400 text-slate-950 shadow-2xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span className="truncate">Tạo Đề Mới AI</span>
                  </button>
                </div>
              </div>

              {/* 4-Skill Matrix Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Tùy chọn kỹ năng làm bài ({activeSkills.length}/4 đã chọn):</span>
                  <span className="hidden sm:inline text-slate-400 dark:text-slate-500 text-[11px] font-medium">
                    Tự động lọc danh sách đề thi phù hợp
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {[
                    {
                      id: "LISTENING" as SkillType,
                      labelPrimary: "Nghe",
                      labelEn: "Listening",
                      icon: Headphones,
                      activeColor: "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-[#0059bb] dark:text-sky-300",
                      iconColor: "text-[#0059bb] dark:text-sky-300",
                    },
                    {
                      id: "READING" as SkillType,
                      labelPrimary: "Đọc",
                      labelEn: "Reading",
                      icon: BookOpen,
                      activeColor: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300",
                      iconColor: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      id: "SPEAKING" as SkillType,
                      labelPrimary: "Nói AI",
                      labelEn: "Speaking",
                      icon: Mic,
                      activeColor: "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300",
                      iconColor: "text-amber-600 dark:text-amber-400",
                    },
                    {
                      id: "WRITING" as SkillType,
                      labelPrimary: "Viết AI",
                      labelEn: "Writing",
                      icon: Wand2,
                      activeColor: "bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300",
                      iconColor: "text-purple-600 dark:text-purple-400",
                    },
                  ].map((skillItem) => {
                    const Icon = skillItem.icon;
                    const isChecked = activeSkills.includes(skillItem.id);

                    return (
                      <button
                        key={skillItem.id}
                        type="button"
                        onClick={() => handleToggleSkill(skillItem.id)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between shadow-2xs active:scale-98 ${
                          isChecked
                            ? `${skillItem.activeColor} shadow-xs font-extrabold`
                            : "bg-slate-50/70 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-60 hover:opacity-90"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-4 h-4 ${skillItem.iconColor} shrink-0`} strokeWidth={2} />
                          <span className="truncate">
                            <strong className="font-extrabold">{skillItem.labelPrimary}</strong>
                            <span className="hidden sm:inline text-[11px] font-normal opacity-70"> • {skillItem.labelEn}</span>
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-[#0059bb] border-[#0059bb] text-white"
                              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Panel for AI Mode */}
              {configMode === "AI_GEN" && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Topic Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} />
                        <span>Chủ đề bài thi:</span>
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Business, Travel, AI, Healthcare..."
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        className="w-full h-9 px-3 text-xs font-medium rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                      />
                      <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                        {["Kinh doanh", "Du lịch", "Y tế", "Công nghệ"].map((chipTopic) => (
                          <button
                            key={chipTopic}
                            type="button"
                            onClick={() => setAiTopic(chipTopic)}
                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 cursor-pointer border border-slate-200 dark:border-slate-700"
                          >
                            {chipTopic}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Score */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.8} />
                        <span>Thang điểm mục tiêu:</span>
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
                            className={`h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              aiTargetScore === scoreOpt.id
                                ? "bg-[#0059bb] text-white font-black"
                                : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
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
                        <Clock className="w-3.5 h-3.5 text-purple-500" strokeWidth={1.8} />
                        <span>Số câu & thời gian:</span>
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
                            className={`h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              aiQuestionCount === qOpt.count
                                ? "bg-[#0059bb] text-white font-black"
                                : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            {qOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium hidden sm:inline">
                      💡 Gemini AI sẽ sinh bài thi thời gian thực theo đúng các kỹ năng đã chọn.
                    </span>

                    <button
                      type="button"
                      disabled={isAiGenerating}
                      onClick={handleGenerateAiExam}
                      className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 font-display ml-auto"
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

            {/* 2. SEARCH & FILTER BAR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              {/* Filter Segmented Control */}
              <div className="grid grid-cols-5 gap-1 w-full sm:w-auto sm:flex sm:items-center sm:gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                {[
                  { id: "ALL", labelMobile: "Tất cả", labelDesktop: "Tất cả bộ đề" },
                  { id: "IELTS_FULL", labelMobile: "IELTS 4K", labelDesktop: "IELTS Academic" },
                  { id: "TOEIC_LR", labelMobile: "TOEIC L&R", labelDesktop: "TOEIC Nghe & Đọc" },
                  { id: "TOEIC_SPEAKING_WRITING", labelMobile: "Nói+Viết", labelDesktop: "TOEIC Nói + Viết" },
                  { id: "TOEIC_FULL", labelMobile: "TOEIC 4K", labelDesktop: "TOEIC Full 4K" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterType(tab.id)}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                      filterType === tab.id
                        ? "bg-[#0059bb] text-white shadow-2xs font-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="sm:hidden">{tab.labelMobile}</span>
                    <span className="hidden sm:inline">{tab.labelDesktop}</span>
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Tìm tên đề thi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-xs font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] shadow-2xs"
                />
              </div>
            </div>

            {/* 3. EXAM CARDS GRID (37 Standardized Exams) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {filteredExams.map((exam) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  key={exam.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 dark:hover:border-sky-500/50 hover:shadow-md shadow-xs flex flex-col justify-between space-y-3 relative group transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border font-mono ${getCategoryBadgeStyle(
                          exam.categoryBadge,
                          exam.type,
                        )}`}
                      >
                        {exam.categoryBadge}
                      </span>
                      {/* 5-Star Visual Difficulty Rating */}
                      <div className="flex items-center gap-0.5" title={`Độ khó: ${exam.level}`}>
                        {Array.from({ length: 5 }).map((_, starIdx) => {
                          const starCount =
                            exam.level === "Beginner" ? 2 : exam.level === "Intermediate" ? 3 : 5;
                          const isFilled = starIdx < starCount;
                          return (
                            <Star
                              key={starIdx}
                              className={`w-3 h-3 ${
                                isFilled ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                              }`}
                              strokeWidth={1.5}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-center">
                      {exam.title}
                    </h3>

                    {/* Supported Skill Icons Row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {exam.supportedSkills.includes("LISTENING") && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1 border border-blue-200/60 dark:border-blue-800/40">
                          <Headphones className="w-3 h-3" strokeWidth={2} /> Nghe
                        </span>
                      )}
                      {exam.supportedSkills.includes("READING") && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40">
                          <BookOpen className="w-3 h-3" strokeWidth={2} /> Đọc
                        </span>
                      )}
                      {exam.supportedSkills.includes("SPEAKING") && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-200/60 dark:border-amber-800/40">
                          <Mic className="w-3 h-3" strokeWidth={2} /> Nói AI
                        </span>
                      )}
                      {exam.supportedSkills.includes("WRITING") && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1 border border-purple-200/60 dark:border-purple-800/40">
                          <Wand2 className="w-3 h-3" strokeWidth={2} /> Viết AI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Meta Chips & Action Button */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={2} />
                        <span>{exam.totalQuestions} câu</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                        <span>{exam.timeLimitMinutes}m</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartExam(exam)}
                      className="px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer font-display"
                    >
                      <span>Bắt đầu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LIVE TEST WORKSPACE (DUAL PANEL SPLIT VIEW 60% / 40%) */}
      {/* ========================================================================= */}
      {activeMode === "WORKSPACE" && selectedExam && (
        <div className="space-y-0">
          {/* 0. BRAND TOP HEADER FOR LIVE EXAM (56px h-14 Baseline Sticky Header) */}
          <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 select-none shrink-0 shadow-2xs sticky top-0 z-30">
            {/* Left Section: Back Button + Icon + Exam Badge + Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(true)}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 font-sans"
                title="Thoát khỏi bài thi và quay lại danh sách đề"
                aria-label="Thoát bài thi"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                <span className="hidden sm:inline">Thoát bài thi</span>
              </button>

              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-900/40 shadow-2xs">
                <FileText className="w-4 h-4 stroke-[2]" />
              </div>

              <div className="min-w-0 flex items-center gap-2">
                <span className="px-2 sm:px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black bg-[#0059bb] text-white shadow-2xs shrink-0 font-mono tracking-wider">
                  {selectedExam.categoryBadge || "EXAM"}
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate max-w-[140px] sm:max-w-xs md:max-w-md lg:max-w-lg">
                  {selectedExam.title}
                </h2>
              </div>
            </div>

            {/* Right Section: Toggle Answer Sheet + Timer + Submit Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Toggle Answer Sheet Panel Button (Desktop) */}
              <button
                type="button"
                onClick={() => setShowAnswerSheet((prev) => !prev)}
                className={`hidden sm:flex px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer items-center gap-1.5 border shadow-2xs font-sans ${
                  showAnswerSheet
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                    : "bg-amber-400 text-slate-950 border-amber-500 font-bold hover:bg-amber-500"
                }`}
                title={
                  showAnswerSheet
                    ? "Thu gọn Phiếu trả lời"
                    : "Mở lại Phiếu trả lời"
                }
              >
                <Sliders className="w-3.5 h-3.5" strokeWidth={2} />
                <span>{showAnswerSheet ? "Ẩn Phiếu" : "Mở Phiếu"}</span>
              </button>

              {/* Timer Countdown Badge */}
              <div
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold font-mono flex items-center gap-1.5 shadow-2xs ${
                  secondsRemaining <= 300
                    ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 animate-pulse"
                    : "bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 border-slate-200/80 dark:border-slate-700"
                }`}
              >
                <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2]" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              {/* Primary Submit Button */}
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-xs font-bold transition-all shadow-sm cursor-pointer font-display active:scale-95 flex items-center gap-1"
              >
                <span>Nộp bài<span className="hidden sm:inline"> ngay</span></span>
              </button>
            </div>
          </div>

          {/* MAIN WORKSPACE CANVAS WITH FLUID CONTAINER WIDTH */}
          <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-4 pb-24 sm:pb-8">
            {/* DUAL PANEL WORKSPACE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT PANEL (8/12 OR 12/12): SPECIALIZED WORKSPACE ENGINE FOR EACH SKILL */}
            <div
              className={`${showAnswerSheet ? "lg:col-span-8" : "lg:col-span-12"} space-y-3.5 pb-16 lg:pb-0`}
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
                    <div className="hidden lg:flex p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm items-center justify-between">
                      <button
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.max(0, prev - 1),
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-2xs font-sans"
                      >
                        <ChevronLeft className="w-4 h-4" /> Câu trước
                      </button>

                      {/* Right action group: Flag + Next question */}
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleToggleFlag(q.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs font-sans ${
                            flaggedQuestions[q.id]
                              ? "bg-amber-400 text-slate-950 border-amber-500 font-bold"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
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
                          type="button"
                          disabled={
                            currentQuestionIndex ===
                            filteredQuestions.length - 1
                          }
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              Math.min(filteredQuestions.length - 1, prev + 1),
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-sm font-display transition-all"
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
              <div className="hidden lg:block lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0059bb]" /> Phiếu Trả Lời
                  </h3>
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-mono">
                    {Object.keys(userAnswers).length}/{filteredQuestions.length} Đã làm
                  </span>
                </div>

                {/* 3 Segmented Legend Badges with Live Counts & Expressive Icons */}
                <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="px-2 py-1.5 rounded-lg bg-[#0059bb]/10 dark:bg-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/25 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                    <span>Đã làm: <strong className="font-mono font-bold text-xs">{Object.keys(userAnswers).length}</strong></span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                    <CircleDashed className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
                    <span>Chưa: <strong className="font-mono font-bold text-xs">{Math.max(0, filteredQuestions.length - Object.keys(userAnswers).length)}</strong></span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                    <Star className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400 fill-amber-400 stroke-[1.5]" />
                    <span>Gắn cờ: <strong className="font-mono font-bold text-xs">{Object.values(flaggedQuestions).filter(Boolean).length}</strong></span>
                  </div>
                </div>

                {/* Answer Grid with Safe Padding to prevent border clipping */}
                <div className="max-h-[52vh] overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <div className="grid grid-cols-6 gap-1.5">
                    {filteredQuestions.map((q, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const userChoice = userAnswers[q.id];
                      const isAnswered = !!userChoice;
                      const isFlagged = !!flaggedQuestions[q.id];

                      let btnStyle =
                        "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105";

                      if (isCurrent) {
                        if (isFlagged) {
                          btnStyle =
                            "bg-amber-400 text-slate-950 font-bold border-2 border-amber-600 shadow-md shadow-amber-500/20 scale-[1.04] z-10";
                        } else if (isAnswered) {
                          btnStyle =
                            "bg-[#0059bb] text-white font-bold border-2 border-blue-400 dark:border-sky-300 shadow-md shadow-blue-500/25 scale-[1.04] z-10";
                        } else {
                          btnStyle =
                            "bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 font-bold border-2 border-[#0059bb] shadow-sm shadow-blue-500/15 scale-[1.04] z-10";
                        }
                      } else {
                        if (isFlagged) {
                          btnStyle =
                            "bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs";
                        } else if (isAnswered) {
                          btnStyle =
                            "bg-[#0059bb] text-white font-bold border-[#0059bb] shadow-2xs";
                        }
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-10 sm:h-10.5 rounded-xl font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${btnStyle}`}
                        >
                          <span className={`text-xs font-bold leading-none ${isAnswered ? "text-white" : ""}`}>
                            {idx + 1}
                          </span>
                          {isAnswered && (
                            <span className="text-[10px] font-black uppercase text-blue-100 dark:text-sky-200 leading-none mt-0.5 font-mono">
                              {userChoice}
                            </span>
                          )}
                          {!isAnswered && isFlagged && (
                            <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 📱 MOBILE BOTTOM SHEET ANSWER DRAWER (< 1024px) */}
          <AnimatePresence>
            {showMobileWorkspaceSheet && (
              <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-full max-w-lg max-h-[82vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-5 space-y-3.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0059bb]" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display">
                        Phiếu Trả Lời ({Object.keys(userAnswers).length}/{filteredQuestions.length} Đã làm)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowMobileWorkspaceSheet(false)}
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3 Segmented Legend Badges with Live Counts & Expressive Icons */}
                  <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="px-2 py-1.5 rounded-lg bg-[#0059bb]/10 dark:bg-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/25 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                      <span>Đã làm: <strong className="font-mono font-bold text-xs">{Object.keys(userAnswers).length}</strong></span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                      <CircleDashed className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
                      <span>Chưa: <strong className="font-mono font-bold text-xs">{Math.max(0, filteredQuestions.length - Object.keys(userAnswers).length)}</strong></span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                      <Star className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400 fill-amber-400 stroke-[1.5]" />
                      <span>Gắn cờ: <strong className="font-mono font-bold text-xs">{Object.values(flaggedQuestions).filter(Boolean).length}</strong></span>
                    </div>
                  </div>

                  {/* Answer Grid in Mobile Modal with Safe Padding */}
                  <div className="max-h-[50vh] overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <div className="grid grid-cols-6 gap-1.5">
                      {filteredQuestions.map((q, idx) => {
                        const isCurrent = idx === currentQuestionIndex;
                        const userChoice = userAnswers[q.id];
                        const isAnswered = !!userChoice;
                        const isFlagged = !!flaggedQuestions[q.id];

                        let btnStyle =
                          "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60";

                        if (isCurrent) {
                          if (isFlagged) {
                            btnStyle =
                              "bg-amber-400 text-slate-950 font-bold border-2 border-amber-600 shadow-md scale-[1.04] z-10";
                          } else if (isAnswered) {
                            btnStyle =
                              "bg-[#0059bb] text-white font-bold border-2 border-blue-400 dark:border-sky-300 shadow-md scale-[1.04] z-10";
                          } else {
                            btnStyle =
                              "bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 font-bold border-2 border-[#0059bb] shadow-sm scale-[1.04] z-10";
                          }
                        } else {
                          if (isFlagged) {
                            btnStyle =
                              "bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs";
                          } else if (isAnswered) {
                            btnStyle =
                              "bg-[#0059bb] text-white font-bold border-[#0059bb] shadow-2xs";
                          }
                        }

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => {
                              setCurrentQuestionIndex(idx);
                              setShowMobileWorkspaceSheet(false);
                            }}
                            className={`h-10 rounded-xl font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${btnStyle}`}
                          >
                            <span className={`text-xs font-bold leading-none ${isAnswered ? "text-white" : ""}`}>
                              {idx + 1}
                            </span>
                            {isAnswered && (
                              <span className="text-[10px] font-black uppercase text-blue-100 dark:text-sky-200 leading-none mt-0.5 font-mono">
                                {userChoice}
                              </span>
                            )}
                            {!isAnswered && isFlagged && (
                              <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
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
              <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-2.5 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center justify-between gap-2">
                {/* Left: Nút Trước */}
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs shrink-0 min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" /> <span>Trước</span>
                </button>

                {/* Center: Cụm Ghim & Phiếu Trả Lời căn giữa */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleFlag(currentQ.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border transition-all active:scale-95 shadow-2xs min-h-[44px] ${
                      isFlagged
                        ? "bg-amber-400 text-slate-950 border-amber-500 font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">
                      {isFlagged ? "Đã Gắn Cờ" : "Gắn Cờ"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowMobileWorkspaceSheet(true)}
                    className="py-2.5 px-3.5 rounded-xl bg-[#0059bb]/10 dark:bg-[#0059bb]/20 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs min-h-[44px]"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      Phiếu ({Object.keys(userAnswers).length}/{filteredQuestions.length})
                    </span>
                  </button>
                </div>

                {/* Right: Nút Tiếp / Nộp bài */}
                {currentQuestionIndex < filteredQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(filteredQuestions.length - 1, prev + 1),
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm font-display shrink-0 min-h-[44px]"
                  >
                    <span>Tiếp</span> <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirmModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm font-display shrink-0 min-h-[44px]"
                  >
                    <span>Nộp Bài</span>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* SUBMIT & EXIT CONFIRMATION MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-8 h-8 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" strokeWidth={2} />
              </div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                Xác Nhận Nộp Bài Thi
              </h3>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Vui lòng kiểm tra tiến trình hoàn thành bài làm trước khi hệ thống tính điểm chính thức:
            </p>

            {/* Statistics Summary Chips */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-center">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase font-sans tracking-wider">Đã Làm</span>
                <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 font-mono">
                  {Object.keys(userAnswers).length}/{filteredQuestions.length}
                </span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${
                filteredQuestions.length - Object.keys(userAnswers).length > 0
                  ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/40 text-amber-700 dark:text-amber-300"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500"
              }`}>
                <span className="text-[10px] font-bold block uppercase font-sans tracking-wider">Chưa Làm</span>
                <span className="text-sm sm:text-base font-black font-mono">
                  {Math.max(0, filteredQuestions.length - Object.keys(userAnswers).length)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-center">
                <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 block uppercase font-sans tracking-wider">Gắn Cờ</span>
                <span className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-300 font-mono">
                  {Object.values(flaggedQuestions).filter(Boolean).length}
                </span>
              </div>
            </div>

            <div className="pt-2.5 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shadow-2xs transition-all font-sans"
              >
                Làm tiếp
              </button>
              <button
                type="button"
                onClick={handleReturnToHub}
                className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold hover:bg-rose-100 cursor-pointer shadow-2xs transition-all font-sans"
              >
                Thoát bài thi
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-sm cursor-pointer font-display transition-all active:scale-95"
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
