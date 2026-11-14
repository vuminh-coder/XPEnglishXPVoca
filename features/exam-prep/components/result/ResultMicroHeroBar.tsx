import React from "react";
import { Award, RotateCcw } from "lucide-react";
import { ExamPaper } from "@/features/exam-prep/data/exam-papers/types";

export interface ResultMicroHeroBarProps {
  examTitle: string;
  onReturnToHub: () => void;
  selectedExam?: ExamPaper | null;
  onRetakeExam?: (exam: ExamPaper) => void;
}

export function ResultMicroHeroBar({
  examTitle,
  onReturnToHub,
  selectedExam,
  onRetakeExam,
}: ResultMicroHeroBarProps) {
  return (
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
            {examTitle}
          </h1>
        </div>
      </div>

      {/* Action buttons on mobile (< sm: hidden on desktop because they are inside AppTopHeader) */}
      <div className="flex sm:hidden items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onReturnToHub}
          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
        >
          ← Đề
        </button>
        {selectedExam && onRetakeExam && (
          <button
            type="button"
            onClick={() => onRetakeExam(selectedExam)}
            className="px-2.5 py-1 rounded-lg bg-[#0059bb] text-white text-[11px] font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Thi Lại</span>
          </button>
        )}
      </div>
    </div>
  );
}
