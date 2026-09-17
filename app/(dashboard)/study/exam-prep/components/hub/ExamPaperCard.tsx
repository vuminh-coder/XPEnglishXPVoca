import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  ChevronRight,
  Headphones,
  BookOpen,
  Mic,
  Wand2,
} from "lucide-react";
import { ExamPaper } from "@/features/exam-prep/data/exam-papers/types";
import { ExamCategoryBadge } from "../shared/ExamCategoryBadge";
import { ExamStarRating } from "../shared/ExamStarRating";

export interface ExamPaperCardProps {
  exam: ExamPaper;
  onStartExam: (exam: ExamPaper) => void;
}

export function ExamPaperCard({ exam, onStartExam }: ExamPaperCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 dark:hover:border-sky-500/50 hover:shadow-md shadow-xs flex flex-col justify-between space-y-3 relative group transition-all"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <ExamCategoryBadge badge={exam.categoryBadge} type={exam.type} />
          {/* 5-Star Visual Difficulty Rating */}
          <div title={`Độ khó: ${exam.level}`}>
            <ExamStarRating level={exam.level} />
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-black font-display text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-center">
          {exam.title}
        </h3>

        {/* Supported Skill Icons Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {exam.supportedSkills.includes("LISTENING") && (
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center gap-1 border border-blue-200/60 dark:border-blue-800/40">
              <Headphones className="w-3 h-3" strokeWidth={2} /> Nghe
            </span>
          )}
          {exam.supportedSkills.includes("READING") && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40">
              <BookOpen className="w-3 h-3" strokeWidth={2} /> Đọc
            </span>
          )}
          {exam.supportedSkills.includes("SPEAKING") && (
            <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-200/60 dark:border-amber-800/40">
              <Mic className="w-3 h-3" strokeWidth={2} /> Nói AI
            </span>
          )}
          {exam.supportedSkills.includes("WRITING") && (
            <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1 border border-purple-200/60 dark:border-purple-800/40">
              <Wand2 className="w-3 h-3" strokeWidth={2} /> Viết AI
            </span>
          )}
        </div>
      </div>

      {/* Visual Meta Chips & Action Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-[#0059bb]" strokeWidth={2} />
            <span>{exam.totalQuestions} câu</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            <span>{exam.timeLimitMinutes}m</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onStartExam(exam)}
          className="px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer font-display"
        >
          <span>Bắt đầu</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
