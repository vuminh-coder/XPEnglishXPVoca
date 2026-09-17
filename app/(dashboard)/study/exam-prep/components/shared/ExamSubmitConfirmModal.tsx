import React from "react";
import { Layers } from "lucide-react";

export interface ExamSubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuit: () => void;
  onSubmit: () => void;
  answeredCount: number;
  totalCount: number;
  flaggedCount: number;
}

export function ExamSubmitConfirmModal({
  isOpen,
  onClose,
  onQuit,
  onSubmit,
  answeredCount,
  totalCount,
  flaggedCount,
}: ExamSubmitConfirmModalProps) {
  if (!isOpen) return null;

  const unansweredCount = Math.max(0, totalCount - answeredCount);

  return (
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
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase font-sans tracking-wider">
              Đã Làm
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 font-mono">
              {answeredCount}/{totalCount}
            </span>
          </div>

          <div
            className={`p-3 rounded-xl border text-center ${
              unansweredCount > 0
                ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/40 text-amber-700 dark:text-amber-300"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500"
            }`}
          >
            <span className="text-[10px] font-bold block uppercase font-sans tracking-wider">
              Chưa Làm
            </span>
            <span className="text-sm sm:text-base font-black font-mono">
              {unansweredCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-center">
            <span className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 block uppercase font-sans tracking-wider">
              Gắn Cờ
            </span>
            <span className="text-sm sm:text-base font-black text-[#0059bb] dark:text-sky-300 font-mono">
              {flaggedCount}
            </span>
          </div>
        </div>

        <div className="pt-2.5 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shadow-2xs transition-all font-sans"
          >
            Làm tiếp
          </button>
          <button
            type="button"
            onClick={onQuit}
            className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold hover:bg-rose-100 cursor-pointer shadow-2xs transition-all font-sans"
          >
            Thoát bài thi
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-sm cursor-pointer font-display transition-all active:scale-95"
          >
            Nộp bài ngay
          </button>
        </div>
      </div>
    </div>
  );
}
