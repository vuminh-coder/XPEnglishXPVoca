"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Target,
  FlaskConical,
  Award,
  Zap,
  Loader2,
} from "lucide-react";
import { GrammarTopic, GrammarLesson } from "../../types/grammarTypes";
import { getGrammarTopicIcon } from "../GrammarTopicIcon";

interface GrammarTopicHeroProps {
  topic: GrammarTopic;
  lesson?: GrammarLesson | null;
  activeTab: "lesson" | "practice";
  onTabChange: (tab: "lesson" | "practice") => void;
  onGenerateExercises: () => void;
  loadingExercises: boolean;
  exerciseCount: number;
}

export function GrammarTopicHero({
  topic,
  lesson,
  activeTab,
  onTabChange,
  onGenerateExercises,
  loadingExercises,
  exerciseCount,
}: GrammarTopicHeroProps) {
  const formulaCount = lesson?.formulas?.length || 3;
  const exampleCount = lesson?.examples?.length || 4;
  const usageCount = lesson?.usages?.length || 3;

  const levelLabel =
    topic.level === "basic"
      ? "Nền Tảng 500+"
      : topic.level === "intermediate"
      ? "Bứt Phá 750+"
      : "Chinh Phục 900+";

  const levelColor =
    topic.level === "basic"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
      : topic.level === "intermediate"
      ? "bg-sky-500/10 text-[#0059bb] dark:text-sky-300 border-sky-500/20"
      : "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs relative overflow-hidden space-y-4"
    >
      {/* Top ambient royal blue accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600/20 via-[#0059bb] to-indigo-600/20" />

      {/* Top Banner Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Icon & Title & Focus */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
            {getGrammarTopicIcon(topic.id)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-display truncate">
                {topic.name}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${levelColor}`}
              >
                {levelLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {topic.nameEn}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
              Trọng tâm kỳ thi:{" "}
              <span className="text-[#0059bb] dark:text-sky-400 font-bold">
                {topic.focus}
              </span>{" "}
              • {topic.desc}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onTabChange("lesson")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-display ${
              activeTab === "lesson"
                ? "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lý Thuyết</span>
          </button>

          <button
            onClick={() => {
              onTabChange("practice");
              if (exerciseCount === 0 && !loadingExercises) {
                onGenerateExercises();
              }
            }}
            disabled={loadingExercises}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-display active:scale-95 shadow-md ${
              activeTab === "practice"
                ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-[#0059bb]/20"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20"
            }`}
          >
            {loadingExercises ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
            )}
            <span>{exerciseCount > 0 ? "Luyện Tập AI (5 Câu)" : "Tạo Đề Luyện AI"}</span>
          </button>
        </div>
      </div>

      {/* 4 Micro Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider leading-none">
              Công thức
            </span>
            <span className="text-xs sm:text-sm font-black font-display text-slate-900 dark:text-white mt-1 block">
              {formulaCount} cấu trúc
            </span>
          </div>
          <Target className="w-4 h-4 text-[#0059bb]" />
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider leading-none">
              Ứng dụng
            </span>
            <span className="text-xs sm:text-sm font-black font-display text-emerald-600 dark:text-emerald-400 mt-1 block">
              {usageCount} bối cảnh
            </span>
          </div>
          <FlaskConical className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider leading-none">
              Ví dụ mẫu
            </span>
            <span className="text-xs sm:text-sm font-black font-display text-sky-600 dark:text-sky-400 mt-1 block">
              {exampleCount} câu chuẩn
            </span>
          </div>
          <Award className="w-4 h-4 text-sky-500" />
        </div>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider leading-none">
              Thưởng Luyện
            </span>
            <span className="text-xs sm:text-sm font-black font-display text-purple-600 dark:text-purple-400 mt-1 block">
              +35 XP
            </span>
          </div>
          <Zap className="w-4 h-4 text-purple-500 fill-purple-500/20" />
        </div>
      </div>
    </motion.div>
  );
}
