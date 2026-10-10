"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  BookOpen,
  Mic,
  PenTool,
  ArrowRight,
  Award,
} from "lucide-react";
import { ExamPaper } from "@/features/exam-prep/data/exam-papers/types";
import { ExamPaperCover } from "./ExamPaperCover";

export interface ExamPaperCardProps {
  exam: ExamPaper;
  onStartExam: (exam: ExamPaper) => void;
}

export function ExamPaperCard({ exam, onStartExam }: ExamPaperCardProps) {
  const isIelts = exam.type.includes("IELTS");
  const isSpeakingWriting =
    exam.type === "TOEIC_SPEAKING_WRITING" ||
    exam.title.toLowerCase().includes("speaking") ||
    exam.title.toLowerCase().includes("writing");
  const isAiGen = exam.type === "TOEIC_MINI" || exam.tags.includes("AI");
  const isMini = exam.type === "TOEIC_MINI";
  const isFullTest =
    exam.type === "TOEIC_FULL" ||
    exam.type === "IELTS_FULL" ||
    exam.type === "TOEIC_LR";
  const maxScoreLabel = isIelts ? "Band 9.0" : "990 Điểm";

  const formatBadgeLabel = isFullTest
    ? "Full Test"
    : isMini
    ? "Mini Speed"
    : isSpeakingWriting
    ? "Luyện Part"
    : "Đề chuẩn";

  const formatBadgeClass =
    "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60";

  // Unified Academic Accent Palette harmonized with Website Theme
  const accentBorderHover = "hover:border-[#0059bb]/50 dark:hover:border-sky-500/40";
  const btnBg = "bg-[#0059bb] hover:bg-[#004ba0] shadow-blue-600/15";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onStartExam(exam)}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 ${accentBorderHover} hover:shadow-lg shadow-2xs flex flex-col overflow-hidden relative group transition-all cursor-pointer select-none`}
    >
      {/* 1. VISUAL COVER BANNER: FULL-BLEED KHỐI TRÊN CÙNG CHỨA TÊN ĐỀ SẠCH */}
      <ExamPaperCover exam={exam} />

      {/* 2. CARD FOOTER: 2 TẦNG CÂN ĐỐI HOÀN HẢO */}
      <div className="px-3 py-3 sm:px-3.5 sm:py-3.5 flex flex-col justify-between space-y-2 sm:space-y-2.5 min-w-0 bg-white dark:bg-slate-900">
        {/* Tầng 1: Icon Kỹ Năng (Trái) & Nhãn Phân Loại Đề (Phải) */}
        <div className="flex items-center justify-between gap-1.5 min-w-0 mb-1">
          {/* Supported Skill Badges: CHỈ ICON, KHÔNG CHỮ, KHÔNG RỚT DÒNG */}
          <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
            {exam.supportedSkills.includes("LISTENING") && (
              <span
                className="w-6.5 h-6.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/40 shadow-2xs shrink-0"
                title="Kỹ năng Nghe (Listening)"
              >
                <Headphones className="w-3.5 h-3.5" strokeWidth={2.2} />
              </span>
            )}
            {exam.supportedSkills.includes("READING") && (
              <span
                className="w-6.5 h-6.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs shrink-0"
                title="Kỹ năng Đọc (Reading)"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} />
              </span>
            )}
            {exam.supportedSkills.includes("SPEAKING") && (
              <span
                className="w-6.5 h-6.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/40 shadow-2xs shrink-0"
                title="Kỹ năng Nói (Speaking)"
              >
                <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" strokeWidth={2.2} />
              </span>
            )}
            {exam.supportedSkills.includes("WRITING") && (
              <span
                className="w-6.5 h-6.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center border border-purple-200/60 dark:border-purple-800/40 shadow-2xs shrink-0"
                title="Kỹ năng Viết (Writing)"
              >
                <PenTool className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2.2} />
              </span>
            )}
          </div>

          {/* Nhãn phân loại đề: Full Test / Mini Speed / Luyện Part / Đề chuẩn */}
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${formatBadgeClass}`}
          >
            {formatBadgeLabel}
          </span>
        </div>

        {/* Tầng 2: Điểm Số Mục Tiêu (Trái) & Nút Vào Thi (Phải) CÓ GẠCH MỜ BORDER-T */}
        <div className="pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          {/* Thang điểm mục tiêu: Pill thanh lịch bên trái */}
          <div className="h-8 flex items-center gap-1.5 px-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" strokeWidth={2.2} />
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200 tracking-tight">
              {maxScoreLabel}
            </span>
          </div>

          {/* Nút Vào thi: Cân đối, sang trọng chuẩn agency với micro-interaction */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStartExam(exam);
            }}
            className={`h-8 pl-3.5 pr-2.5 rounded-xl ${btnBg} text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:opacity-95 transition-all shrink-0 group/btn`}
          >
            <span>Vào thi</span>
            <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
