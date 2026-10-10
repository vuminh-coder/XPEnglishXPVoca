"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  BookOpen,
  Wand2,
  Award,
  RefreshCw,
  X,
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
    <AnimatePresence initial={false}>
      {configMode === "AI_GEN" && (
        <motion.div
          key="exam-ai-configurator-banner"
          initial={{ opacity: 0, height: 0, y: -12 }}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {
              height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, delay: 0.05 },
              y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            y: -10,
            transition: {
              height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2 },
              y: { duration: 0.2 },
            },
          }}
          className="overflow-hidden"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 mb-2">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                    Studio Biên Soạn Đề Thi Gemini AI
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Tự động tạo câu hỏi trắc nghiệm & đề thi bám sát định dạng chuẩn TOEIC & IELTS
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 items-center gap-1.5 hidden sm:inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb] dark:bg-sky-400 animate-pulse" />
                  AI Adaptive Engine
                </span>
                <button
                  type="button"
                  onClick={() => setConfigMode("PRESET")}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                  title="Đóng form tạo đề"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* 1. Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={2} />
                  <span>Chủ đề bài thi:</span>
                </label>
                <input
                  type="text"
                  placeholder="VD: Business, Travel, Technology, Daily..."
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full h-10 px-3.5 text-xs sm:text-[13px] font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 transition-all shadow-2xs"
                />
                <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {["Kinh doanh", "Du lịch", "Công nghệ", "Môi trường"].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setAiTopic(chip)}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold border cursor-pointer transition-colors shrink-0 ${
                        aiTopic === chip
                          ? "bg-blue-50 dark:bg-blue-950/60 border-[#0059bb]/40 text-[#0059bb] dark:text-sky-300 font-bold"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200/80 dark:border-slate-700"
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Target Score */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
                  <span>Thang điểm mục tiêu:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "500+", label: "500+", sub: "Cơ bản" },
                    { id: "700+", label: "700+", sub: "Khá" },
                    { id: "900+", label: "900+", sub: "Nâng cao" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAiTargetScore(opt.id)}
                      className={`h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center leading-tight ${
                        aiTargetScore === opt.id
                          ? "bg-[#0059bb] text-white shadow-xs font-extrabold"
                          : "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="font-bold">{opt.label}</span>
                      <span className="text-[9.5px] opacity-80">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Question Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" strokeWidth={2} />
                  <span>Quy mô câu hỏi:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { count: 10, label: "10 câu", sub: "~8 phút" },
                    { count: 20, label: "20 câu", sub: "~15 phút" },
                    { count: 40, label: "40 câu", sub: "~30 phút" },
                  ].map((opt) => (
                    <button
                      key={opt.count}
                      type="button"
                      onClick={() => setAiQuestionCount(opt.count)}
                      className={`h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center leading-tight ${
                        aiQuestionCount === opt.count
                          ? "bg-[#0059bb] text-white shadow-xs font-extrabold"
                          : "bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="font-bold">{opt.label}</span>
                      <span className="text-[9.5px] opacity-80">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generating Status Animation */}
            {isAiGenerating && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 animate-in fade-in duration-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 animate-spin" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      Gemini AI đang sinh đề thi: {aiTopic || "Tổng Hợp"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                    {aiQuestionCount} câu • Mục tiêu {aiTargetScore}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0059bb] via-sky-400 to-[#0059bb] rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            )}

            {/* Action Row */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:flex">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Hệ thống tạo đề tự động tương thích định dạng chuẩn TOEIC & IELTS.</span>
              </div>

              <button
                type="button"
                disabled={isAiGenerating}
                onClick={onGenerateAiExam}
                className="w-full sm:w-auto h-10 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all font-display ml-auto disabled:opacity-60"
              >
                {isAiGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Đang biên soạn đề...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Bắt Đầu Sinh Đề Thi AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
