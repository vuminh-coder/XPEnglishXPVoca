"use client";

import React from "react";
import Link from "next/link";
import { BarChart3, ChevronRight, BookOpen, PenTool, Mic, Headphones, Volume2 } from "lucide-react";
import { SkillMinutes } from "../../types";

interface ProfileSkillBreakdownProps {
  skillMinutes: SkillMinutes;
}

export const ProfileSkillBreakdown: React.FC<ProfileSkillBreakdownProps> = ({ skillMinutes }) => {
  const skills = [
    {
      icon: <BookOpen className="w-4 h-4 stroke-[2.2]" />,
      label: "Từ vựng",
      value: skillMinutes.vocab,
      color: "bg-blue-500/10 text-[#0059bb] dark:text-sky-400",
    },
    {
      icon: <PenTool className="w-4 h-4 stroke-[2.2]" />,
      label: "Viết chính tả",
      value: skillMinutes.writing,
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      icon: <Mic className="w-4 h-4 stroke-[2.2]" />,
      label: "Nói AI Tutor",
      value: skillMinutes.speaking,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: <Headphones className="w-4 h-4 stroke-[2.2]" />,
      label: "Dictation",
      value: skillMinutes.dictation,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      icon: <Volume2 className="w-4 h-4 stroke-[2.2]" />,
      label: "Shadowing",
      value: skillMinutes.shadowing,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
            <BarChart3 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Phân Tích Tiến Độ 5 Kỹ Năng
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Tổng thời gian rèn luyện theo từng kỹ năng học tập
            </p>
          </div>
        </div>
        <Link
          href="/analytics"
          className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5 font-display"
        >
          <span>Biểu đồ chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 pt-1">
        {skills.map((skill) => (
          <div
            key={skill.label}
            className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-1.5 hover:border-blue-300 dark:hover:border-slate-700 transition-all"
          >
            <div className={`w-7 h-7 rounded-xl ${skill.color} mx-auto flex items-center justify-center`}>
              {skill.icon}
            </div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-display">
              {skill.label}
            </div>
            <div className="text-xs font-black font-display text-slate-900 dark:text-white font-mono">
              {skill.value}m
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
