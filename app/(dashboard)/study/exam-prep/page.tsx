"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MOCK_EXAM_PAPERS,
  ExamPaper,
  SkillType,
  AdaptiveExamPrepSkeleton,
} from "@/features/exam-prep";
import {
  calculateExamResult,
  ExamResultSummary,
  UserExamAnswers,
} from "@/features/exam-prep/utils/examScoringEngine";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { StudySuiteNavTabs } from "@/shared/components/layout/nav-tabs/StudySuiteNavTabs";

// Extracted Sub-Components
import { ExamConfiguratorBanner } from "./components/hub/ExamConfiguratorBanner";
import { ExamFilterToolbar } from "./components/hub/ExamFilterToolbar";
import { ExamPaperCard } from "./components/hub/ExamPaperCard";
import { ExamWorkspaceTopBar } from "./components/workspace/ExamWorkspaceTopBar";
import { ExamQuestionWorkspace } from "./components/workspace/ExamQuestionWorkspace";
import {
  ExamDesktopAnswerSheet,
  ExamMobileAnswerDrawer,
} from "./components/workspace/ExamAnswerSheet";
import { ExamMobileThumbBar } from "./components/workspace/ExamMobileThumbBar";
import { ExamSubmitConfirmModal } from "./components/shared/ExamSubmitConfirmModal";

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

  // AI Section Toggle
  const [aiTopic, setAiTopic] = useState<string>("Business & Travel");
  const [aiTargetScore, setAiTargetScore] = useState<string>("700+");
  const [aiQuestionCount, setAiQuestionCount] = useState<number>(20);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Submit Exam and Persist Results
  const handleSubmitExam = () => {
    if (!selectedExam) return;

    const result = calculateExamResult(
      selectedExam,
      userAnswers,
      timeSpentSeconds,
    );
    setExamResult(result);
    setShowSubmitConfirmModal(false);

    // Save to LocalStorage / SessionStorage for Result Page
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "xp_latest_exam_result",
          JSON.stringify({
            result,
            paper: selectedExam,
          }),
        );
      }
    } catch (e) {
      console.warn("Session storage save error:", e);
    }

    // Award XP & Coins to Global User Store
    if (awardXp && result.xpAwarded) {
      awardXp(result.xpAwarded);
    }
    if (awardCoins && result.coinsAwarded) {
      awardCoins(result.coinsAwarded);
    }
    if (addPracticeTime && timeSpentSeconds > 0) {
      addPracticeTime(Math.max(1, Math.round(timeSpentSeconds / 60)));
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

  // Auto Submit when Time Expires
  const handleAutoSubmitExam = () => {
    addToast({
      type: "warning",
      title: "Hết giờ làm bài!",
      message: "Hệ thống đang tự động nộp bài và tính điểm chính thức...",
    });
    handleSubmitExam();
  };

  // Select Option
  const handleSelectAnswer = (questionId: string, choice: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: choice as "A" | "B" | "C" | "D",
    }));
  };

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

  // Keyboard Shortcuts for Options in Workspace
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeMode,
    selectedExam,
    currentQuestionIndex,
    filteredQuestions,
  ]);

  // Toggle Skill Selection
  const handleToggleSkill = (skill: SkillType) => {
    setActiveSkills((prev) => {
      if (prev.includes(skill)) {
        if (prev.length === 1) return prev; // Keep at least one skill selected
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  // Start Exam
  const handleStartExam = (paper: ExamPaper) => {
    setSelectedExam(paper);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(paper.timeLimitMinutes * 60);
    setTimeSpentSeconds(0);
    setExamResult(null);
    setActiveMode("WORKSPACE");
    addToast({
      type: "info",
      title: "Bắt đầu bài thi!",
      message: `Đề: ${paper.title} (${paper.timeLimitMinutes} phút)`,
    });
  };

  // Toggle Flag Question
  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Return to Hub
  const handleReturnToHub = () => {
    setActiveMode("HUB");
    setShowSubmitConfirmModal(false);
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

  const currentQ = filteredQuestions[currentQuestionIndex];

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
            <StudySuiteNavTabs />
          </AppTopHeader>

          {/* MAIN CONTAINER */}
          <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
            {/* 1. HERO BENTO BANNER & CONFIGURATOR STUDIO */}
            <ExamConfiguratorBanner
              configMode={configMode}
              setConfigMode={setConfigMode}
              activeSkills={activeSkills}
              onToggleSkill={handleToggleSkill}
              aiTopic={aiTopic}
              setAiTopic={setAiTopic}
              aiTargetScore={aiTargetScore}
              setAiTargetScore={setAiTargetScore}
              aiQuestionCount={aiQuestionCount}
              setAiQuestionCount={setAiQuestionCount}
              isAiGenerating={isAiGenerating}
              onGenerateAiExam={handleGenerateAiExam}
            />

            {/* 2. SEARCH & FILTER BAR */}
            <ExamFilterToolbar
              filterType={filterType}
              setFilterType={setFilterType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* 3. EXAM CARDS GRID (37 Standardized Exams) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {filteredExams.map((exam) => (
                <ExamPaperCard
                  key={exam.id}
                  exam={exam}
                  onStartExam={handleStartExam}
                />
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
          <ExamWorkspaceTopBar
            selectedExam={selectedExam}
            secondsRemaining={secondsRemaining}
            formatTime={formatTime}
            showAnswerSheet={showAnswerSheet}
            setShowAnswerSheet={setShowAnswerSheet}
            onRequestSubmitConfirm={() => setShowSubmitConfirmModal(true)}
          />

          {/* MAIN WORKSPACE CANVAS WITH FLUID CONTAINER WIDTH */}
          <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            {/* LEFT PANEL: QUESTION WORKSPACE (8/12 OR 12/12) */}
            {currentQ && (
              <ExamQuestionWorkspace
                question={currentQ}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={filteredQuestions.length}
                userChoice={userAnswers[currentQ.id]}
                onSelectAnswer={(choice) => handleSelectAnswer(currentQ.id, choice)}
                isFlagged={!!flaggedQuestions[currentQ.id]}
                onToggleFlag={() => handleToggleFlag(currentQ.id)}
                onPrevQuestion={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                onNextQuestion={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(filteredQuestions.length - 1, prev + 1),
                  )
                }
                showAnswerSheet={showAnswerSheet}
              />
            )}

            {/* RIGHT PANEL (4/12): DESKTOP ONLY SIDE-BY-SIDE ANSWER SHEET */}
            {showAnswerSheet && (
              <ExamDesktopAnswerSheet
                questions={filteredQuestions}
                currentQuestionIndex={currentQuestionIndex}
                onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
                userAnswers={userAnswers}
                flaggedQuestions={flaggedQuestions}
              />
            )}
          </div>

          {/* 📱 MOBILE BOTTOM SHEET ANSWER DRAWER (< 1024px) */}
          <ExamMobileAnswerDrawer
            isOpen={showMobileWorkspaceSheet}
            onClose={() => setShowMobileWorkspaceSheet(false)}
            questions={filteredQuestions}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
          />

          {/* 📱 MOBILE PINNED TO BOTTOM THUMB-ZONE NAVIGATION BAR */}
          {currentQ && (
            <ExamMobileThumbBar
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={filteredQuestions.length}
              isFlagged={!!flaggedQuestions[currentQ.id]}
              onToggleFlag={() => handleToggleFlag(currentQ.id)}
              onPrevQuestion={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              onNextQuestion={() =>
                setCurrentQuestionIndex((prev) =>
                  Math.min(filteredQuestions.length - 1, prev + 1),
                )
              }
              onOpenSheet={() => setShowMobileWorkspaceSheet(true)}
              onRequestSubmit={() => setShowSubmitConfirmModal(true)}
              answeredCount={Object.keys(userAnswers).length}
            />
          )}
        </div>
      )}

      {/* SUBMIT & EXIT CONFIRMATION MODAL */}
      <ExamSubmitConfirmModal
        isOpen={showSubmitConfirmModal}
        onClose={() => setShowSubmitConfirmModal(false)}
        onQuit={handleReturnToHub}
        onSubmit={handleSubmitExam}
        answeredCount={Object.keys(userAnswers).length}
        totalCount={filteredQuestions.length}
        flaggedCount={Object.values(flaggedQuestions).filter(Boolean).length}
      />
    </PageEntranceWrapper>
  );
}

export default function ExamPrepPage() {
  return (
    <React.Suspense fallback={<AdaptiveExamPrepSkeleton />}>
      <ExamPrepContent />
    </React.Suspense>
  );
}
