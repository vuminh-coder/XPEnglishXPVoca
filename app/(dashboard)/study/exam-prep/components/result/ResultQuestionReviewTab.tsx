import React from "react";
import {
  Layers,
  ListFilter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Pause,
  Play,
  Check,
  Copy,
  Sparkles,
  RefreshCw,
  Brain,
} from "lucide-react";
import { ExamQuestion } from "@/features/exam-prep/data/exam-papers/types";
import { ExamResultSummary } from "@/features/exam-prep/utils/examScoringEngine";
import { FormattedExplanation } from "../FormattedExplanation";

export interface ResultQuestionReviewTabProps {
  examResult: ExamResultSummary;
  selectedReviewQIndex: number;
  setSelectedReviewQIndex: React.Dispatch<React.SetStateAction<number>>;
  reviewFilter: "ALL" | "CORRECT" | "INCORRECT" | "SKIPPED" | "FLAGGED";
  setReviewFilter: (filter: "ALL" | "CORRECT" | "INCORRECT" | "SKIPPED" | "FLAGGED") => void;
  reviewPartFilter: number | "ALL";
  setReviewPartFilter: (part: number | "ALL") => void;
  showReviewTranscript: boolean;
  setShowReviewTranscript: React.Dispatch<React.SetStateAction<boolean>>;
  playingAudioId: string | null;
  onPlayReviewAudio: (audioUrl: string, qId: string) => void;
  onCopyTranscript: () => void;
  copiedTranscript: boolean;
  aiExplainMap: Record<string, { loading: boolean; data?: any; error?: string }>;
  onRequestAiExplanation: (question: ExamQuestion, userChoice?: string) => void;
}

export function ResultQuestionReviewTab({
  examResult,
  selectedReviewQIndex,
  setSelectedReviewQIndex,
  reviewFilter,
  setReviewFilter,
  reviewPartFilter,
  setReviewPartFilter,
  showReviewTranscript,
  setShowReviewTranscript,
  playingAudioId,
  onPlayReviewAudio,
  onCopyTranscript,
  copiedTranscript,
  aiExplainMap,
  onRequestAiExplanation,
}: ResultQuestionReviewTabProps) {
  const currentQRes =
    examResult.questionResults[selectedReviewQIndex] ||
    examResult.questionResults[0];
  const q = currentQRes?.question;
  const aiExplain = q ? aiExplainMap[q.id] : undefined;

  return (
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
                <ListFilter
                  className={`w-4 h-4 ${reviewFilter === "ALL" ? "text-white" : "text-[#0059bb] dark:text-sky-400"}`}
                  strokeWidth={2}
                />
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
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "CORRECT" ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`}
                    strokeWidth={2.2}
                  />
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
                  <XCircle
                    className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "INCORRECT" ? "text-white" : "text-rose-600 dark:text-rose-400"}`}
                    strokeWidth={2.2}
                  />
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
                  <AlertCircle
                    className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "SKIPPED" ? "text-white" : "text-slate-400"}`}
                    strokeWidth={2}
                  />
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
                  <Star
                    className={`w-3.5 h-3.5 shrink-0 ${reviewFilter === "FLAGGED" ? "fill-slate-950 text-slate-950" : "fill-amber-400 text-amber-500"}`}
                    strokeWidth={2}
                  />
                  <span className="truncate">Đánh dấu</span>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                    reviewFilter === "FLAGGED"
                      ? "bg-black/20 text-slate-950"
                      : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  {examResult.questionResults.filter((item) => item.isFlagged).length}
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
                  .filter((qItem) => {
                    const matchesStatus =
                      reviewFilter === "ALL" ||
                      (reviewFilter === "CORRECT" && qItem.isCorrect) ||
                      (reviewFilter === "INCORRECT" &&
                        !qItem.isCorrect &&
                        !qItem.isSkipped) ||
                      (reviewFilter === "SKIPPED" && qItem.isSkipped) ||
                      (reviewFilter === "FLAGGED" && qItem.isFlagged);
                    const matchesPart =
                      reviewPartFilter === "ALL" ||
                      qItem.partNumber === reviewPartFilter;
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
        {currentQRes && q && (
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
                        onPlayReviewAudio(q.audioUrl!, q.id)
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
                        onClick={onCopyTranscript}
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
                    onRequestAiExplanation(
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
        )}
      </div>
    </div>
  );
}
