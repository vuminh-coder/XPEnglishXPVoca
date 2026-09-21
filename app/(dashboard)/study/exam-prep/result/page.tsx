"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  RotateCcw,
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
} from "@/features/exam-prep";
import {
  calculateExamResult,
  ExamResultSummary,
} from "@/features/exam-prep/utils/examScoringEngine";
import ExamResultLoading from "./loading";
import { ResultMicroHeroBar } from "../components/result/ResultMicroHeroBar";
import { ResultScoreOverviewTab } from "../components/result/ResultScoreOverviewTab";
import { ResultQuestionReviewTab } from "../components/result/ResultQuestionReviewTab";
import { ResultAiDiagnosticTab } from "../components/result/ResultAiDiagnosticTab";

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

    let targetAudioUrl = url;
    if (url.includes("soundhelix.com") || url.includes("placeholder") || !url.startsWith("http")) {
      const q = examResult?.questionResults?.find((item) => item.question.id === qId)?.question;
      const textToSpeak =
        q?.passageText?.replace(/\[Audio Transcript.*?\]/gi, "").trim() ||
        q?.questionText ||
        "This is the listening audio for the exam question.";
      targetAudioUrl = `/api/tts?text=${encodeURIComponent(textToSpeak.slice(0, 350))}&accent=en-US`;
    }

    const audio = new Audio(targetAudioUrl);
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
            layoutId="examResultActiveTab"
            icon={<BarChart3 className="w-3.5 h-3.5 text-blue-500" />}
            label="1. Điểm Số"
          />
          <HeaderPillItem
            active={reportTab === "REVIEW"}
            onClick={() => setReportTab("REVIEW")}
            layoutId="examResultActiveTab"
            icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
            label={`2. Lời Giải (${examResult.questionResults.length})`}
          />
          <HeaderPillItem
            active={reportTab === "DIAGNOSTIC"}
            onClick={() => setReportTab("DIAGNOSTIC")}
            layoutId="examResultActiveTab"
            icon={<Brain className="w-3.5 h-3.5 text-purple-500" />}
            label="3. Lộ Trình AI"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS WITH FLUID DASHBOARD WIDTH */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6 flex-1">
        {/* 1. AGENCY MICRO-HERO BAR */}
        <ResultMicroHeroBar
          examTitle={examResult.examTitle}
          onReturnToHub={handleReturnToHub}
          selectedExam={selectedExam}
          onRetakeExam={handleStartExam}
        />

        {/* TAB 1: BENTO SCORE & PERFORMANCE DASHBOARD */}
        {reportTab === "OVERVIEW" && (
          <ResultScoreOverviewTab
            examResult={examResult}
            formatTime={formatTime}
            onNavigateToReview={(partNumber?: number) => {
              setReportTab("REVIEW");
              if (partNumber !== undefined) {
                setReviewPartFilter(partNumber);
              }
            }}
          />
        )}

        {/* TAB 2: ORIGINAL MASTER-DETAIL BENTO REVIEW STUDIO */}
        {reportTab === "REVIEW" && (
          <ResultQuestionReviewTab
            examResult={examResult}
            selectedReviewQIndex={selectedReviewQIndex}
            setSelectedReviewQIndex={setSelectedReviewQIndex}
            reviewFilter={reviewFilter}
            setReviewFilter={setReviewFilter}
            reviewPartFilter={reviewPartFilter}
            setReviewPartFilter={setReviewPartFilter}
            showReviewTranscript={showReviewTranscript}
            setShowReviewTranscript={setShowReviewTranscript}
            playingAudioId={playingAudioId}
            onPlayReviewAudio={handlePlayReviewAudio}
            onCopyTranscript={handleCopyTranscript}
            copiedTranscript={copiedTranscript}
            aiExplainMap={aiExplainMap}
            onRequestAiExplanation={handleRequestAiExplanation}
          />
        )}

        {/* TAB 3: AI COGNITIVE DIAGNOSTIC & ACTION ROADMAP PRO STUDIO */}
        {reportTab === "DIAGNOSTIC" && (
          <ResultAiDiagnosticTab
            examResult={examResult}
            overallAiAdvice={overallAiAdvice}
            onGetOverallAiAdvice={handleGetOverallAiAdvice}
            onNavigateToReview={() => setReportTab("REVIEW")}
            onNavigateToReviewPart={(partNumber: number) => {
              setReportTab("REVIEW");
              setReviewPartFilter(partNumber);
            }}
          />
        )}

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
