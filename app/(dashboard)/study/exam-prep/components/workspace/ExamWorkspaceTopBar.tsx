import React from "react";
import { ChevronLeft, FileText, Sliders, Clock } from "lucide-react";
import { ExamPaper } from "@/features/exam-prep/data/exam-papers/types";

export interface ExamWorkspaceTopBarProps {
  selectedExam: ExamPaper;
  secondsRemaining: number;
  formatTime: (sec: number) => string;
  showAnswerSheet: boolean;
  setShowAnswerSheet: React.Dispatch<React.SetStateAction<boolean>>;
  onRequestSubmitConfirm: () => void;
}

export function ExamWorkspaceTopBar({
  selectedExam,
  secondsRemaining,
  formatTime,
  showAnswerSheet,
  setShowAnswerSheet,
  onRequestSubmitConfirm,
}: ExamWorkspaceTopBarProps) {
  return (
    <div className="w-full h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 select-none shrink-0 shadow-2xs sticky top-0 z-30">
      {/* Left Section: Back Button + Icon + Exam Badge + Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onRequestSubmitConfirm}
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
          onClick={onRequestSubmitConfirm}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs sm:text-xs font-bold transition-all shadow-sm cursor-pointer font-display active:scale-95 flex items-center gap-1"
        >
          <span>Nộp bài<span className="hidden sm:inline"> ngay</span></span>
        </button>
      </div>
    </div>
  );
}
