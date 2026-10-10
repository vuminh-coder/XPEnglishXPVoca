"use client";

import React from "react";
import { GraduationCap, Briefcase, Globe, Check, Award, Wand2, Clock } from "lucide-react";
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
  setWeeklyHours,
  hasExistingPlan,
  onCancel,
  onSubmit,
}) => {
  const toeicScores = ["550", "750", "850", "950"];
  const ieltsScores = ["5.5", "6.5", "7.5", "8.5"];
  const scoresList = targetExam === "TOEIC" ? toeicScores : ieltsScores;

  const currentLevelOptions = [
    { id: "A1 Beginner", label: "A1 Mất Gốc", desc: "Mới bắt đầu" },
    { id: "A2 Elementary", label: "A2 Sơ Cấp", desc: "Nền tảng nhẹ" },
    { id: "B1 Intermediate", label: "B1 Trung Cấp", desc: "Giao tiếp khá" },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
      <form onSubmit={onSubmit} className="space-y-5">
        {/* 1. Category Selection Bento Grid (Đồng Bộ Thẩm Mỹ Chuẩn 60-30-10) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display">
            1. Định hướng mục tiêu học tập
          </label>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {/* Exam Card */}
            <div
              onClick={() => {
                setTargetCategory("EXAM");
                setTargetExam("TOEIC");
                setTargetScore("750");
              }}
              className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "EXAM"
                  ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    targetCategory === "EXAM"
                      ? "bg-[#0059bb] text-white"
                      : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "EXAM" && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.5]" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white leading-tight">
                  Luyện Thi
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">TOEIC & IELTS</div>
              </div>
            </div>

            {/* Business Card */}
            <div
              onClick={() => {
                setTargetCategory("BUSINESS");
                setTargetExam("TOEIC");
                setTargetScore("750");
              }}
              className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "BUSINESS"
                  ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    targetCategory === "BUSINESS"
                      ? "bg-[#0059bb] text-white"
                      : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <Briefcase className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "BUSINESS" && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.5]" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white leading-tight">
                  Công Sở
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Email & Hội Họp</div>
              </div>
            </div>

            {/* Travel Card */}
            <div
              onClick={() => {
                setTargetCategory("TRAVEL");
                setTargetExam("TOEIC");
                setTargetScore("550");
              }}
              className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2.5 ${
                targetCategory === "TRAVEL"
                  ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    targetCategory === "TRAVEL"
                      ? "bg-[#0059bb] text-white"
                      : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <Globe className="w-4.5 h-4.5" />
                </div>
                {targetCategory === "TRAVEL" && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.5]" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white leading-tight">
                  Du Lịch
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Giao Tiếp Tự Tin</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Exam Type Picker (Không Dùng Emoji, Dùng Lucide SVG Chuẩn) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display">
            2. Kỳ thi & chứng chỉ
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
                  ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/40">
                <Award className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                  TOEIC Listening & Reading
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Tiếng Anh tiêu chuẩn môi trường công sở
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
                  ? "bg-white dark:bg-slate-900 border-[#0059bb] shadow-xs ring-2 ring-[#0059bb]/20"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/40">
                <GraduationCap className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                  IELTS Academic
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Tiếng Anh học thuật quốc tế & du học
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Target Score Pills */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display">
            3. Mục tiêu điểm số chi tiết
          </label>

          <div className="grid grid-cols-4 gap-2">
            {scoresList.map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setTargetScore(score)}
                className={`py-2.5 px-2 rounded-xl border-2 text-center font-bold transition-all cursor-pointer font-mono text-xs sm:text-sm ${
                  targetScore === score
                    ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {targetExam === "TOEIC" ? `${score}đ` : `Band ${score}`}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Current Level (Segmented Control - Rule 14) & Commitment Slider (Rule 4) */}
        <div className="space-y-4 pt-1">
          {/* Segmented Level Selector (Quy tắc 14: Hiển thị trực tiếp thay vì dropdown) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-display">
              4. Trình độ hiện tại của bạn
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currentLevelOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCurrentLevel(opt.id)}
                  className={`p-2.5 sm:p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    currentLevel === opt.id
                      ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 text-[#0059bb] dark:text-sky-300 shadow-2xs font-bold"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold font-display">{opt.label}</div>
                  <div className="text-[10px] opacity-75 font-medium mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Commitment Hours Slider (Quy tắc 4: Thanh trượt trực quan tương tác) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="uppercase tracking-wider text-slate-700 dark:text-slate-300 font-display flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0059bb]" />
                <span>Thời gian cam kết học tập</span>
              </span>
              <span className="font-mono text-[#0059bb] dark:text-sky-400">
                {weeklyHours} giờ / tuần • ~{Math.round((weeklyHours / 7) * 60)} phút / ngày
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-[#0059bb] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-medium">
                <span>Thảnh thơi (2h/tuần)</span>
                <span>Tiêu chuẩn (5h/tuần)</span>
                <span>Chuyên sâu (15h/tuần)</span>
              </div>
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
          <button
            type="submit"
            className="flex-1 h-11 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0059bb] hover:bg-[#004899] text-white rounded-xl shadow-xs flex items-center justify-center gap-2 font-display cursor-pointer active:scale-98 transition-all"
          >
            <Wand2 className="h-4 w-4" />
            <span>Khởi Tạo Lộ Trình AI Chuyên Sâu Ngay</span>
          </button>
        </div>
      </form>
    </div>
  );
};
