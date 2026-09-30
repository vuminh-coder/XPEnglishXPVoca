"use client";

import React from "react";
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { ExamType } from "../../types";

export interface PremiumComparisonMatrixProps {
  targetExam: ExamType;
  currentScore: number;
  setCurrentScore: (score: number) => void;
  estimatedProScore: number;
  onSelectExam: (exam: ExamType) => void;
}

const COMPARISON_ROWS = [
  {
    feature: "Kho 100+ chủ đề từ vựng Oxford, TOEIC & IELTS",
    free: "Giới hạn 20 từ / ngày",
    pro: "Mở khóa toàn bộ 100+ chủ đề, không giới hạn",
    proHighlight: true,
  },
  {
    feature: "Ngân hàng 37+ đề thi thử chuẩn quốc tế",
    free: "Chỉ làm được 1 đề mẫu",
    pro: "Toàn bộ 37+ đề có giải thích chi tiết đáp án & bẫy đề",
    proHighlight: true,
  },
  {
    feature: "Gia sư AI Speaking & Writing 24/7",
    free: "3 lượt phản hồi / ngày",
    pro: "Không giới hạn, chấm chuẩn IPA từng âm tiết & sửa ngữ điệu",
    proHighlight: true,
  },
  {
    feature: "Thuật toán ghi nhớ ngắt quãng SM-2",
    free: "Giới hạn 50 từ trong sổ",
    pro: "Không giới hạn số từ, tự động nhắc nhở ôn tập thông minh",
    proHighlight: true,
  },
  {
    feature: "Bảo hộ ngọn lửa chuỗi học tập Streak",
    free: "Mất toàn bộ chuỗi khi quên học",
    pro: "Tự động kích hoạt Khiên Kim Cương bảo vệ chuỗi",
    proHighlight: true,
  },
  {
    feature: "Hệ số nhân kinh nghiệm XP & BXH",
    free: "1X tiêu chuẩn",
    pro: "Nhân đôi X2 XP ở mọi bài học, minigame & PvP",
    proHighlight: true,
  },
  {
    feature: "Đồng bộ tiến độ học tập trên đa thiết bị",
    free: "1 thiết bị duy nhất",
    pro: "Không giới hạn (iOS, Android, Tablet, PC)",
    proHighlight: false,
  },
];

export function PremiumComparisonMatrix({
  targetExam,
  currentScore,
  setCurrentScore,
  estimatedProScore,
  onSelectExam,
}: PremiumComparisonMatrixProps) {
  return (
    <div className="space-y-6 pt-2">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
          <span>So Sánh Minh Bạch Quyền Lợi</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Tại Sao Hơn 12.500+ Học Viên Chọn PRO VIP?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Mọi công cụ bạn cần để rút ngắn 50% thời gian chinh phục mục tiêu tiếng Anh
        </p>
      </div>

      {/* Main Comparison Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
                <th className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white w-5/12">
                  Tính Năng & Đặc Quyền
                </th>
                <th className="py-3.5 px-3 sm:px-4 font-semibold text-slate-500 dark:text-slate-400 w-3/12">
                  Tài Khoản Miễn Phí
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-black text-[#0059bb] dark:text-sky-400 bg-blue-50/50 dark:bg-blue-950/30 w-4/12">
                  <div className="flex items-center gap-1.5">
                    <span>HỘI VIÊN PRO VIP</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0059bb] text-white text-[9.5px] font-bold tracking-wider uppercase">
                      UNLIMITED
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-4 sm:px-6 font-medium text-slate-800 dark:text-slate-200">
                    {row.feature}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5 text-xs">
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{row.free}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 sm:px-6 bg-blue-50/30 dark:bg-blue-950/20 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2 text-xs sm:text-[13px]">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className={row.proHighlight ? "font-bold text-[#0059bb] dark:text-sky-300" : ""}>
                        {row.pro}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Interactive Score Simulator Strip inside the comparison card */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/60 via-slate-50 to-amber-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-amber-950/20 border-t border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Mô Phỏng Tăng Điểm Cùng Trợ Lý PRO VIP:</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kéo thanh trượt để ước tính mức điểm dự kiến sau 2 tháng học tập có lộ trình
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            {/* Exam Toggle */}
            <div className="flex gap-1 p-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700/80">
              <button
                type="button"
                onClick={() => onSelectExam("toeic")}
                className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  targetExam === "toeic"
                    ? "bg-[#0059bb] text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                TOEIC
              </button>
              <button
                type="button"
                onClick={() => onSelectExam("ielts")}
                className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  targetExam === "ielts"
                    ? "bg-[#0059bb] text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                IELTS
              </button>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3 w-48 sm:w-56">
              <input
                type="range"
                min={targetExam === "toeic" ? 400 : 4.0}
                max={targetExam === "toeic" ? 850 : 7.5}
                step={targetExam === "toeic" ? 25 : 0.5}
                value={currentScore}
                onChange={(e) => setCurrentScore(Number(e.target.value))}
                className="w-full accent-[#0059bb] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"
                title="Kéo để đổi điểm hiện tại"
              />
            </div>

            {/* Score Result */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-mono text-slate-500 font-semibold">{currentScore}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.5]" />
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-display">
                {estimatedProScore}+ PRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
