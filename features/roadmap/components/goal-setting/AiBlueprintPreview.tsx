"use client";

import React from "react";
import { Compass, Calendar, CheckCheck, ShieldCheck } from "lucide-react";

interface AiBlueprintPreviewProps {
  targetExam: string;
  targetScore: string;
}

export const AiBlueprintPreview: React.FC<AiBlueprintPreviewProps> = ({
  targetExam,
  targetScore,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      {/* Card 1: Blueprint Preview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0059bb]" />
            <span>Mô Phỏng Lộ Trình AI</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[10px] font-mono font-bold border border-blue-200/60 dark:border-blue-800/40">
            {targetExam} {targetScore}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
            <div className="text-xs font-semibold text-[#0059bb] dark:text-sky-400">Thời gian ước tính</div>
            <div className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0059bb]" />
              <span>12 Tuần (~90 Ngày học)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Tổng Chặng</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">3 Chặng Lớn</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Tổng Thưởng</div>
              <div className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">+1,050 XP</div>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Cân bằng toàn diện 4 kỹ năng Nghe, Nói, Đọc, Viết.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Thuật toán lặp lại ngắt quãng Spaced Repetition.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Chữa lỗi phát âm & ngữ pháp cùng Gemini AI Tutor.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: CEFR Quality Assurance */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
            Cam Kết Chuẩn CEFR Quốc Tế
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Giáo án được thiết kế đồng bộ theo ngân hàng đề thi chuẩn mới nhất, giúp tối ưu hóa thời gian và bứt phá mục tiêu nhanh nhất.
        </p>
      </div>
    </div>
  );
};
