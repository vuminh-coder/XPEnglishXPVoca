"use client";

import React from "react";
import {
  Bot,
  FileText,
  Sparkles,
  Flame,
  CheckCircle,
} from "lucide-react";
import { ExamType } from "../../types";

export interface PremiumBentoShowcaseProps {
  targetExam?: ExamType;
  currentScore?: number;
  setCurrentScore?: (score: number) => void;
  estimatedProScore?: number;
  onSelectExam?: (exam: ExamType) => void;
}

export function PremiumBentoShowcase({
  targetExam = "toeic",
  currentScore = 600,
  setCurrentScore: _setCurrentScore,
  estimatedProScore = 860,
  onSelectExam,
}: PremiumBentoShowcaseProps) {
  return (
    <div className="space-y-4">
      <div className="text-center max-w-lg mx-auto space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
          Đặc Quyền Công Nghệ XP Pro
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Trải nghiệm học tập thông minh với sự hỗ trợ của AI và thuật toán khoa học
        </p>
      </div>

      {/* 4 Clean Minimalist Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Feature 1: AI Speaking IPA (Royal Blue, NO PURPLE) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
              <Bot className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Gia Sư AI Chuẩn IPA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Chấm điểm phát âm từng âm tiết và sửa ngữ điệu câu trực tiếp theo chuẩn người bản xứ.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Độ chính xác ngữ âm 98.4%</span>
          </div>
        </div>

        {/* Feature 2: 37+ Đề Thi Thử & Score Projection (Clean & Light) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              {onSelectExam && (
                <div className="flex gap-1 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => onSelectExam("toeic")}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      targetExam === "toeic" ? "bg-[#0059bb] text-white shadow-2xs" : "text-slate-500"
                    }`}
                  >
                    TOEIC
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectExam("ielts")}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      targetExam === "ielts" ? "bg-[#0059bb] text-white shadow-2xs" : "text-slate-500"
                    }`}
                  >
                    IELTS
                  </button>
                </div>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              37+ Đề Thi Chuẩn ETS
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Bấm giờ thực tế, chấm điểm tức thì và phân tích chi tiết các bẫy đề thi thường gặp.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>Dự kiến bứt phá:</span>
            <span>+{targetExam === "toeic" ? "260" : "1.5"} điểm Pro</span>
          </div>
        </div>

        {/* Feature 3: Thuật Toán SM-2 (Emerald, Clean & Light) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Ghi Nhớ Ngắt Quãng SM-2
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Nhắc nhở ôn tập thông minh đúng thời điểm vàng, đưa từ vựng vào trí nhớ dài hạn vĩnh viễn.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Lưu giữ 95% sau 6 tháng</span>
          </div>
        </div>

        {/* Feature 4: Bảo Hộ Streak & X2 XP (Amber, Clean & Light) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/60">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Khiên Streak & X2 XP
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Tự động bảo hộ ngọn lửa học tập khi bận rộn và nhân đôi toàn bộ kinh nghiệm tích lũy.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Bảo hộ chuỗi 24/7 tự động</span>
          </div>
        </div>
      </div>
    </div>
  );
}
