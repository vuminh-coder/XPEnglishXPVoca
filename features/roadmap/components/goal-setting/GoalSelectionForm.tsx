"use client";
import React from "react";
import { GraduationCap, Briefcase, Globe, Check, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { TargetCategory, TargetExam } from "../../types";

interface GoalSelectionFormProps {
  targetCategory: TargetCategory | string;
  setTargetCategory: (cat: TargetCategory) => void;
  targetExam: TargetExam | string;
  setTargetExam: (exam: TargetExam) => void;
  targetScore: string;
  setTargetScore: (score: string) => void;
  currentLevel: string;
  setCurrentLevel: (level: string) => void;
  weeklyHours: number;
  setWeeklyHours: (hours: number) => void;
  hasExistingPlan: boolean;
  onCancel?: () => void;
  onSubmit: (e?: React.FormEvent) => void;
}

export const GoalSelectionForm: React.FC<GoalSelectionFormProps> = ({
  targetCategory,
  setTargetCategory,
  targetExam,
  setTargetExam,
  targetScore,
  setTargetScore,
  currentLevel,
  setCurrentLevel,
  weeklyHours,
  hasExistingPlan,
  onCancel,
  onSubmit,
}) => {
  const toeicScores = ["550", "750", "850", "950"];
  const ieltsScores = ["5.5", "6.5", "7.5", "8.5"];
  const scoresList = targetExam === "TOEIC" ? toeicScores : ieltsScores;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
      <form onSubmit={onSubmit} className="space-y-5">
        {/* 1. Category Selection Bento Grid */}
        <div className="space-y-2.5">
          <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
            1. Chọn định hướng mục tiêu học tập
          </label>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {/* Exam Card */}
            <div
              onClick={() => {
                setTargetCategory("EXAM");
                setTargetExam("TOEIC");
                setTargetScore("750");
              }}
              className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "EXAM"
                  ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "EXAM" && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">
                  Luyện Thi
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-0.5">TOEIC / IELTS</div>
              </div>
            </div>

            {/* Business Card */}
            <div
              onClick={() => {
                setTargetCategory("BUSINESS");
                setTargetExam("TOEIC");
                setTargetScore("750");
              }}
              className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "BUSINESS"
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs ring-2 ring-emerald-500/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "BUSINESS" && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">
                  Công Sở
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-0.5">Email & Họp</div>
              </div>
            </div>

            {/* Travel Card */}
            <div
              onClick={() => {
                setTargetCategory("TRAVEL");
                setTargetExam("TOEIC");
                setTargetScore("550");
              }}
              className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "TRAVEL"
                  ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-2xs ring-2 ring-amber-500/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "TRAVEL" && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white leading-tight">
                  Du Lịch
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-0.5">Giao Tiếp</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Exam Type Picker */}
        <div className="space-y-2.5">
          <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
            2. Chọn kỳ thi & chứng chỉ
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setTargetExam("TOEIC");
                setTargetScore("750");
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                targetExam === "TOEIC"
                  ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-2xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <span className="text-2xl shrink-0">📊</span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white">
                  TOEIC Listening & Reading
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  Tiếng Anh môi trường công sở
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTargetExam("IELTS");
                setTargetScore("6.5");
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                targetExam === "IELTS"
                  ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-2xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <span className="text-2xl shrink-0">🎓</span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white">
                  IELTS Academic
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  Học thuật quốc tế & Du học
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Target Score Pills */}
        <div className="space-y-2.5">
          <label className="block text-xs font-black uppercase tracking-widest text-[#0059bb] dark:text-sky-400 font-display">
            3. Mục tiêu điểm số chi tiết
          </label>

          <div className="grid grid-cols-4 gap-2">
            {scoresList.map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setTargetScore(score)}
                className={`py-2.5 px-2 rounded-xl border-2 text-center font-black transition-all cursor-pointer font-mono text-xs sm:text-sm ${
                  targetScore === score
                    ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }`}
              >
                {targetExam === "TOEIC" ? `${score}đ` : `Band ${score}`}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Current Level & Commitment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 font-display">
              Trình độ hiện tại
            </label>
            <select
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
            >
              <option value="A1 Beginner">A1 - Mới bắt đầu / Mất gốc</option>
              <option value="A2 Elementary">A2 - Sơ cấp (Có nền tảng nhẹ)</option>
              <option value="B1 Intermediate">B1 - Trung cấp (Giao tiếp khá)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 font-display">
              Thời gian cam kết / Tuần
            </label>
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold font-mono p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              <span>{weeklyHours} giờ / tuần</span>
              <span className="text-slate-400 text-xs">~{Math.round((weeklyHours / 7) * 60)} phút/ngày</span>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="flex items-center gap-3 pt-2">
          {hasExistingPlan && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 rounded-xl border border-slate-200/90 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Hủy
            </button>
          )}
          <Button
            type="submit"
            className="flex-1 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#0059bb] hover:bg-[#004ba0] text-white rounded-xl shadow-xs flex items-center justify-center gap-2 font-display cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Tạo Lộ Trình AI Chuyên Sâu Ngay</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
