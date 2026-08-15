"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Play,
  Check,
  RotateCcw,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Headphones,
  Zap,
  Volume2,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";
import { MOCK_EXAM_PAPERS, ExamPaper, ExamQuestion } from "@/lib/data/examPrepData";
import { calculateExamResult, ExamResultSummary, UserExamAnswers } from "@/lib/utils/examScoringEngine";
import { useUserStore } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";

export default function ExamPrepPage() {
  const { user, awardXp, awardCoins, addPracticeTime } = useUserStore();
  const { addToast } = useNotificationStore();

  // State Management
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [activeMode, setActiveMode] = useState<"HUB" | "WORKSPACE" | "REPORT">("HUB");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Live Workspace State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserExamAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [examResult, setExamResult] = useState<ExamResultSummary | null>(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // AI Generator Modal State
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
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

  // Keyboard Shortcuts for Options (1,2,3,4 or A,B,C,D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMode !== "WORKSPACE" || !selectedExam) return;
      const currentQ = selectedExam.questions[currentQuestionIndex];
      if (!currentQ) return;

      if (e.key === "1" || e.key.toUpperCase() === "A") handleSelectAnswer(currentQ.id, "A");
      if (e.key === "2" || e.key.toUpperCase() === "B") handleSelectAnswer(currentQ.id, "B");
      if (e.key === "3" || e.key.toUpperCase() === "C") handleSelectAnswer(currentQ.id, "C");
      if (e.key === "4" || e.key.toUpperCase() === "D") handleSelectAnswer(currentQ.id, "D");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMode, selectedExam, currentQuestionIndex]);

  // Actions
  const handleStartExam = (exam: ExamPaper) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(exam.timeLimitMinutes * 60);
    setTimeSpentSeconds(0);
    setActiveMode("WORKSPACE");
    addToast({ type: "info", title: `Đã bắt đầu bài thi: ${exam.title}`, message: `Thời gian làm bài: ${exam.timeLimitMinutes} phút.` });
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

    const result = calculateExamResult(selectedExam, userAnswers, timeSpentSeconds);
    setExamResult(result);
    setActiveMode("REPORT");

    // Sync XP, Coins & Study time
    awardXp(result.xpAwarded, "vocab");
    awardCoins(result.coinsAwarded);
    addPracticeTime(Math.ceil(timeSpentSeconds / 60), "vocab");

    // Update best stats
    setTotalExamsCompleted((prev) => prev + 1);
    if (result.examType === "TOEIC_FULL" || result.examType === "TOEIC_MINI") {
      setBestToeicScore((prev) => Math.max(prev, result.scaledScore));
    } else {
      setBestIeltsBand((prev) => Math.max(prev, result.scaledScore));
    }

    addToast({
      type: "success",
      title: `🎉 Hoàn thành bài thi! +${result.xpAwarded} XP (+${result.coinsAwarded} Vàng)`,
      message: `Điểm số: ${result.scaledScore}/${result.maxScore} (${result.accuracyPercent}% đúng).`
    });
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
          questions: data.data.questions
        };
        setShowAiModal(false);
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

  // Filtered Exam List
  const filteredExams = MOCK_EXAM_PAPERS.filter((exam) => {
    const matchesType = filterType === "ALL" || exam.type === filterType;
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || exam.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Time formatter (MM:SS or HH:MM:SS)
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* MODE 1: EXAM HUB / TEST PICKER LIST */}
      {/* ========================================================================= */}
      {activeMode === "HUB" && (
        <div className="space-y-4 p-3 sm:p-4 max-w-7xl mx-auto">
          
          {/* Spotlight Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-slate-900 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="space-y-1 z-10 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-2xs font-display">
                  AGENCIES EXAM ENGINE
                </span>
                <span className="text-xs text-blue-200 font-bold">ETS & Cambridge Standard</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black font-display tracking-tight text-white">
                Đấu Trường Thi Thử Đề Thực Tế (TOEIC & IELTS Exam Prep)
              </h1>
              <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
                Rèn luyện phản xạ đề thật 200 câu với đồng hồ áp lực thời gian thực, tự động chấm điểm quy đổi chuẩn Scaled Score và báo cáo phân tích lỗ hổng theo từng Part.
              </p>
            </div>

            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 z-10 font-display"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Tạo Đề Thi Mới Bằng AI</span>
            </button>
          </motion.div>

          {/* 4 Bento Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: "Đề đã hoàn thành", val: `${totalExamsCompleted} đề`, icon: FileText, color: "text-[#0059bb]" },
              { label: "Điểm TOEIC cao nhất", val: `${bestToeicScore}/990`, icon: Award, color: "text-amber-500" },
              { label: "Band IELTS cao nhất", val: `Band ${bestIeltsBand}`, icon: TrendingUp, color: "text-emerald-500" },
              { label: "Tổng phút luyện thi", val: `${Math.round(timeSpentSeconds / 60)} phút`, icon: Clock, color: "text-purple-500" }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{card.label}</span>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white">
                    {card.val}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: "ALL", label: "Tất cả đề thi" },
                { id: "TOEIC_FULL", label: "TOEIC Full 200 câu" },
                { id: "TOEIC_MINI", label: "TOEIC Mini 50 câu" },
                { id: "IELTS_READING", label: "IELTS Reading" },
                { id: "IELTS_LISTENING", label: "IELTS Listening" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? "bg-[#0059bb] text-white shadow-2xs font-extrabold"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm đề thi theo tên, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs font-medium rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
              />
            </div>
          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {filteredExams.map((exam) => (
              <motion.div
                whileHover={{ y: -2 }}
                key={exam.id}
                className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col justify-between space-y-3 relative group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-xs text-[9.5px] font-black uppercase tracking-wider bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                      {exam.categoryBadge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {exam.timeLimitMinutes} phút
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0059bb] transition-colors">
                    {exam.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#0059bb]" /> {exam.totalQuestions} câu
                    </span>
                    <span>•</span>
                    <span className="text-amber-500 font-extrabold">Tối đa {exam.maxScore}</span>
                  </div>

                  <button
                    onClick={() => handleStartExam(exam)}
                    className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Bắt đầu làm</span>
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
        <div className="space-y-3 p-2 sm:p-4 max-w-7xl mx-auto">
          
          {/* Header Bar: Title, Live Countdown Timer, Submit Action */}
          <div className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0 cursor-pointer"
              >
                ← Thoát bài thi
              </button>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                {selectedExam.title}
              </h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              {/* Radial Timer Badge */}
              <div className={`px-3 py-1 rounded-xs border text-xs font-black font-mono flex items-center gap-1.5 ${
                secondsRemaining <= 300
                  ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 border-rose-300 animate-pulse"
                  : "bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 border-slate-200 dark:border-white/10"
              }`}>
                <Timer className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black transition-all shadow-2xs cursor-pointer"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>

          {/* DUAL PANEL WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            
            {/* LEFT PANEL (60% WIDTH - 7/12): PASSAGE / QUESTION STEM & OPTIONS */}
            <div className="lg:col-span-7 space-y-3">
              
              {/* Question Stem Box */}
              {(() => {
                const q = selectedExam.questions[currentQuestionIndex];
                if (!q) return null;
                const isFlagged = !!flaggedQuestions[q.id];
                const userChoice = userAnswers[q.id];

                return (
                  <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-4">
                    
                    {/* Question Header & Flag Toggle */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-[#0059bb] text-white">
                          Câu {currentQuestionIndex + 1}/{selectedExam.questions.length}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{q.partTitle}</span>
                      </div>

                      <button
                        onClick={() => handleToggleFlag(q.id)}
                        className={`px-2.5 py-1 rounded-xs text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                          isFlagged
                            ? "bg-amber-400 text-slate-950 font-black"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                        <span>{isFlagged ? "Đã xem lại" : "Xem lại sau"}</span>
                      </button>
                    </div>

                    {/* Optional Passage Text */}
                    {q.passageText && (
                      <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-line max-h-48 overflow-y-auto">
                        {q.passageText}
                      </div>
                    )}

                    {/* Question Text Stem */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-snug">
                      {q.questionText}
                    </h3>

                    {/* 4 Options (A, B, C, D) */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectAnswer(q.id, opt.key)}
                            className={`w-full p-3 rounded-xs border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-extrabold"
                                : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-black border ${
                                isSelected
                                  ? "bg-white text-[#0059bb] border-white"
                                  : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/10"
                              }`}>
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" /> Câu trước
                      </button>

                      <span className="text-xs text-slate-400 font-mono">Phím tắt: 1, 2, 3, 4 hoặc A, B, C, D</span>

                      <button
                        disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.min(selectedExam.questions.length - 1, prev + 1))}
                        className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                      >
                        Câu tiếp <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* RIGHT PANEL (40% WIDTH - 5/12): ANSWER SHEET GRID & PART SELECTOR */}
            <div className="lg:col-span-5 p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display">
                  Phiếu Trả Lời (Answer Sheet)
                </h3>
                <span className="text-xs font-bold text-[#0059bb]">
                  {Object.keys(userAnswers).length}/{selectedExam.questions.length} Đã làm
                </span>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#0059bb]" /> Đã làm</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border" /> Chưa làm</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-amber-400" /> Xem lại</span>
              </div>

              {/* Answer Grid 1-200 */}
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5 max-h-[50vh] overflow-y-auto p-1">
                {selectedExam.questions.map((q, idx) => {
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
                      className={`h-8 rounded-xs text-xs font-mono transition-all cursor-pointer flex items-center justify-center border ${btnStyle} ${
                        isCurrent ? "ring-2 ring-blue-500 shadow-md scale-105" : ""
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: COMPREHENSIVE SCORE REPORT VIEW */}
      {/* ========================================================================= */}
      {activeMode === "REPORT" && examResult && (
        <div className="space-y-4 p-3 sm:p-5 max-w-4xl mx-auto">
          
          {/* Report Top Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 sm:p-6 rounded-xs bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-900 text-white shadow-md text-center space-y-3 relative overflow-hidden"
          >
            <span className="px-3 py-1 rounded-xs text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-2xs font-display">
              KẾT QUẢ BÀI THI THỬ
            </span>

            <h1 className="text-xl sm:text-2xl font-black font-display text-white">
              {examResult.examTitle}
            </h1>

            {/* Scaled Score Circle */}
            <div className="py-2">
              <div className="text-4xl sm:text-5xl font-black font-display text-amber-300 drop-shadow-md">
                {examResult.scaledScore} / {examResult.maxScore}
              </div>
              <span className="text-xs text-blue-200 font-bold">
                Tỷ lệ chính xác: {examResult.accuracyPercent}% ({examResult.correctCount}/{examResult.totalQuestions} câu)
              </span>
            </div>

            {/* Rewards */}
            <div className="flex items-center justify-center gap-4 text-xs font-black pt-2 border-t border-white/10">
              <span className="px-3 py-1 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                🎉 +{examResult.xpAwarded} XP Thưởng
              </span>
              <span className="px-3 py-1 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
                💰 +{examResult.coinsAwarded} Vàng Thưởng
              </span>
            </div>
          </motion.div>

          {/* Part-by-Part Weakness Analysis */}
          <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0059bb]" /> Phân Tích Lỗ Hổng Theo Từng Part
            </h3>

            <div className="space-y-2.5 pt-1">
              {examResult.partAnalysis.map((part) => (
                <div key={part.partNumber} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{part.partTitle}</span>
                    <span className="font-mono text-[#0059bb] dark:text-sky-400">
                      {part.correctCount}/{part.totalQuestions} ({part.accuracyPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-xs bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        part.accuracyPercent >= 80 ? "bg-emerald-500" : part.accuracyPercent >= 50 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${part.accuracyPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setActiveMode("HUB")}
              className="px-4 py-2 rounded-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 cursor-pointer"
            >
              ← Quay lại danh sách đề
            </button>

            {selectedExam && (
              <button
                onClick={() => handleStartExam(selectedExam)}
                className="px-4 py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Thi lại bài này
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AI EXAM GENERATOR MODAL */}
      {/* ========================================================================= */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <h3 className="text-sm font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Tạo Đề Thi Mới Bằng AI
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Chủ đề mong muốn:</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full h-9 px-3 rounded-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Thang điểm mục tiêu:</label>
                <select
                  value={aiTargetScore}
                  onChange={(e) => setAiTargetScore(e.target.value)}
                  className="w-full h-9 px-3 rounded-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
                >
                  <option value="500+">TOEIC 500+ (Cơ bản)</option>
                  <option value="700+">TOEIC 700+ (Trung cấp)</option>
                  <option value="900+">TOEIC 900+ (Xuất sắc)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Số lượng câu hỏi:</label>
                <select
                  value={aiQuestionCount}
                  onChange={(e) => setAiQuestionCount(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 font-medium"
                >
                  <option value={10}>10 câu (Thi nhanh 8 phút)</option>
                  <option value={20}>20 câu (Thi vừa 16 phút)</option>
                  <option value={50}>50 câu (Mini Test 30 phút)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-3.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Hủy
              </button>
              <button
                disabled={isAiGenerating}
                onClick={handleGenerateAiExam}
                className="px-4 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                {isAiGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang tạo đề...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tạo đề ngay</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
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
              Bạn đã hoàn thành {Object.keys(userAnswers).length}/{selectedExam?.questions.length || 0} câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm số ngay bây giờ không?
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
    </div>
  );
}
