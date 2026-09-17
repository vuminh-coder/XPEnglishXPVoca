import React from "react";
import { ChevronLeft, ChevronRight, Star, Layers } from "lucide-react";

export interface ExamMobileThumbBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isFlagged: boolean;
  onToggleFlag: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onOpenSheet: () => void;
  onRequestSubmit: () => void;
  answeredCount: number;
}

export function ExamMobileThumbBar({
  currentQuestionIndex,
  totalQuestions,
  isFlagged,
  onToggleFlag,
  onPrevQuestion,
  onNextQuestion,
  onOpenSheet,
  onRequestSubmit,
  answeredCount,
}: ExamMobileThumbBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-2.5 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center justify-between gap-2">
      {/* Left: Nút Trước */}
      <button
        type="button"
        disabled={currentQuestionIndex === 0}
        onClick={onPrevQuestion}
        className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs shrink-0 min-h-[44px]"
      >
        <ChevronLeft className="w-4 h-4" /> <span>Trước</span>
      </button>

      {/* Center: Cụm Ghim & Phiếu Trả Lời căn giữa */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onToggleFlag}
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
          onClick={onOpenSheet}
          className="py-2.5 px-3.5 rounded-xl bg-[#0059bb]/10 dark:bg-[#0059bb]/20 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs min-h-[44px]"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>
            Phiếu ({answeredCount}/{totalQuestions})
          </span>
        </button>
      </div>

      {/* Right: Nút Tiếp / Nộp bài */}
      {currentQuestionIndex < totalQuestions - 1 ? (
        <button
          type="button"
          onClick={onNextQuestion}
          className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm font-display shrink-0 min-h-[44px]"
        >
          <span>Tiếp</span> <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onRequestSubmit}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm font-display shrink-0 min-h-[44px]"
        >
          <span>Nộp Bài</span>
        </button>
      )}
    </div>
  );
}
