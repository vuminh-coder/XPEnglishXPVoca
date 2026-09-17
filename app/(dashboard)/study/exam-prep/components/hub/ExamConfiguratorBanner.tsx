import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  Wand2,
  Check,
  Award,
  RefreshCw,
} from "lucide-react";
import { SkillType } from "@/features/exam-prep/data/exam-papers/types";

export interface ExamConfiguratorBannerProps {
  configMode: "PRESET" | "AI_GEN";
  setConfigMode: (mode: "PRESET" | "AI_GEN") => void;
  activeSkills: SkillType[];
  onToggleSkill: (skill: SkillType) => void;
  aiTopic: string;
  setAiTopic: (topic: string) => void;
  aiTargetScore: string;
  setAiTargetScore: (score: string) => void;
  aiQuestionCount: number;
  setAiQuestionCount: (count: number) => void;
  isAiGenerating: boolean;
  onGenerateAiExam: () => void;
}

export function ExamConfiguratorBanner({
  configMode,
  setConfigMode,
  activeSkills,
  onToggleSkill,
  aiTopic,
  setAiTopic,
  aiTargetScore,
  setAiTargetScore,
  aiQuestionCount,
  setAiQuestionCount,
  isAiGenerating,
  onGenerateAiExam,
}: ExamConfiguratorBannerProps) {
  return (
    <div className="p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-3 sm:space-y-4">
      {/* Top ambient rose glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-[#0059bb]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 font-mono">
              PHÒNG THI CHUẨN HÓA
            </span>
            <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-snug">
              Đấu Trường Thi Thử 2026
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            <span className="sm:hidden">37 bộ đề chuẩn ETS & Cambridge • Chấm điểm AI</span>
            <span className="hidden sm:inline">
              Ngân hàng 37 đề chuẩn hóa ETS & Cambridge • Tự chọn kỹ năng độc lập • Chấm điểm AI thời gian thực
            </span>
          </p>
        </div>

        {/* Mode Switcher Tabs - Grid 2 cols on mobile (100% width, balanced 50/50), flex on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shrink-0 w-full sm:w-auto relative">
          <button
            type="button"
            onClick={() => setConfigMode("PRESET")}
            className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              configMode === "PRESET"
                ? "text-white font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {configMode === "PRESET" && (
              <motion.div
                layoutId="examConfigModePill"
                className="absolute inset-0 bg-[#0059bb] rounded-lg shadow-2xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <BookOpen className="w-3.5 h-3.5 shrink-0 relative z-10" />
            <span className="truncate relative z-10">Đề Chuẩn Preset</span>
          </button>

          <button
            type="button"
            onClick={() => setConfigMode("AI_GEN")}
            className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              configMode === "AI_GEN"
                ? "text-slate-950 font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {configMode === "AI_GEN" && (
              <motion.div
                layoutId="examConfigModePill"
                className="absolute inset-0 bg-amber-400 rounded-lg shadow-2xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Sparkles className="w-3.5 h-3.5 fill-current shrink-0 relative z-10" />
            <span className="truncate relative z-10">Tạo Đề Mới AI</span>
          </button>
        </div>
      </div>

      {/* 4-Skill Matrix Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Tùy chọn kỹ năng làm bài ({activeSkills.length}/4 đã chọn):</span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500 text-[11px] font-medium">
            Tự động lọc danh sách đề thi phù hợp
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {[
            {
              id: "LISTENING" as SkillType,
              labelPrimary: "Nghe",
              labelEn: "Listening",
              icon: Headphones,
              activeColor:
                "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-[#0059bb] dark:text-sky-300",
              iconColor: "text-[#0059bb] dark:text-sky-300",
            },
            {
              id: "READING" as SkillType,
              labelPrimary: "Đọc",
              labelEn: "Reading",
              icon: BookOpen,
              activeColor:
                "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300",
              iconColor: "text-emerald-600 dark:text-emerald-400",
            },
            {
              id: "SPEAKING" as SkillType,
              labelPrimary: "Nói AI",
              labelEn: "Speaking",
              icon: Mic,
              activeColor:
                "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300",
              iconColor: "text-amber-600 dark:text-amber-400",
            },
            {
              id: "WRITING" as SkillType,
              labelPrimary: "Viết AI",
              labelEn: "Writing",
              icon: Wand2,
              activeColor:
                "bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300",
              iconColor: "text-purple-600 dark:text-purple-400",
            },
          ].map((skillItem) => {
            const Icon = skillItem.icon;
            const isChecked = activeSkills.includes(skillItem.id);

            return (
              <button
                key={skillItem.id}
                type="button"
                onClick={() => onToggleSkill(skillItem.id)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between shadow-2xs active:scale-98 ${
                  isChecked
                    ? `${skillItem.activeColor} shadow-xs font-extrabold`
                    : "bg-slate-50/70 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-60 hover:opacity-90"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-4 h-4 ${skillItem.iconColor} shrink-0`} strokeWidth={2} />
                  <span className="truncate">
                    <strong className="font-extrabold">{skillItem.labelPrimary}</strong>
                    <span className="hidden sm:inline text-[11px] font-normal opacity-70">
                      {" "}
                      • {skillItem.labelEn}
                    </span>
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? "bg-[#0059bb] border-[#0059bb] text-white"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional Panel for AI Mode */}
      {configMode === "AI_GEN" && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={1.8} />
                <span>Chủ đề bài thi:</span>
              </label>
              <input
                type="text"
                placeholder="VD: Business, Travel, AI, Healthcare..."
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full h-9 px-3 text-xs font-medium rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
              />
              <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                {["Kinh doanh", "Du lịch", "Y tế", "Công nghệ"].map((chipTopic) => (
                  <button
                    key={chipTopic}
                    type="button"
                    onClick={() => setAiTopic(chipTopic)}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {chipTopic}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Score */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.8} />
                <span>Thang điểm mục tiêu:</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "500+", label: "500+ (Dễ)" },
                  { id: "700+", label: "700+ (Vừa)" },
                  { id: "900+", label: "900+ (Khó)" },
                ].map((scoreOpt) => (
                  <button
                    key={scoreOpt.id}
                    type="button"
                    onClick={() => setAiTargetScore(scoreOpt.id)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      aiTargetScore === scoreOpt.id
                        ? "bg-[#0059bb] text-white font-black"
                        : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {scoreOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.8} />
                <span>Quy mô câu hỏi:</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { count: 10, label: "10 câu (~8p)" },
                  { count: 20, label: "20 câu (~15p)" },
                  { count: 40, label: "40 câu (~30p)" },
                ].map((qOpt) => (
                  <button
                    key={qOpt.count}
                    type="button"
                    onClick={() => setAiQuestionCount(qOpt.count)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      aiQuestionCount === qOpt.count
                        ? "bg-[#0059bb] text-white font-black"
                        : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {qOpt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Generating Shimmer Feedback Card */}
          {isAiGenerating && (
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-300/80 dark:border-amber-500/40 space-y-2.5 animate-in fade-in duration-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    Gemini AI đang biên soạn đề thi: {aiTopic}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                  {aiQuestionCount} câu • Mục tiêu {aiTargetScore}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full animate-pulse w-3/4" />
              </div>
              <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Đang khởi tạo ngữ cảnh, phân loại độ khó và tạo đáp án kèm giải thích chi tiết...</span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium hidden sm:inline">
              💡 Gemini AI sẽ sinh bài thi thời gian thực theo đúng các kỹ năng đã chọn.
            </span>

            <button
              type="button"
              disabled={isAiGenerating}
              onClick={onGenerateAiExam}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 font-display ml-auto"
            >
              {isAiGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Đang sinh đề thi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Bắt Đầu Sinh Đề AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
