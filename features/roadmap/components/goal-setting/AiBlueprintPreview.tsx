"use client";
import React from "react";
import { Compass, Calendar, CheckCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/shared/components/ui";

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
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0059bb]" /> Mô Phỏng Lộ Trình AI
          </span>
          <Badge variant="primary" className="text-[10px] font-mono font-black">
            {targetExam} {targetScore}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-1">
            <div className="text-xs font-bold text-[#0059bb] dark:text-sky-400">Thời gian ước tính</div>
            <div className="text-sm font-black font-display text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0059bb]" /> 12 Tuần (~90 Ngày học)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-500">Tổng Chặng</div>
              <div className="text-sm font-black text-slate-900 dark:text-white font-mono">3 Chặng Lớn</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-500">Tổng Thưởng</div>
              <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">+1,050 XP</div>
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
              <span>Chữa lỗi phát âm & viết luận 1-on-1 cùng AI Tutor.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: CEFR Quality Assurance */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-bold text-amber-900 dark:text-amber-300">Cam Kết Chuẩn CEFR Quốc Tế</span>
        </div>
        <p className="text-xs text-amber-800/90 dark:text-amber-400/90 leading-relaxed font-medium">
          Giáo án được thiết kế đồng bộ theo ngân hàng đề thi chuẩn mới nhất, giúp tối ưu hóa thời gian và bứt phá mục tiêu nhanh nhất.
        </p>
      </div>
    </div>
  );
};
