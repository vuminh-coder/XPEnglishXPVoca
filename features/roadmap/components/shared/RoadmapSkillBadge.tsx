"use client";
import React from "react";
import { Headphones, BookOpen, Mic, PenTool, ShieldCheck } from "lucide-react";
import { TaskSkillType } from "../../types";

interface RoadmapSkillBadgeProps {
  type: TaskSkillType | string;
}

export const RoadmapSkillBadge: React.FC<RoadmapSkillBadgeProps> = ({ type }) => {
  const getBadgeConfig = (skillType: string) => {
    switch (skillType) {
      case "LISTENING":
        return {
          name: "Luyện Nghe",
          icon: <Headphones className="w-3.5 h-3.5" />,
          bg: "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border-blue-200 dark:border-blue-800",
        };
      case "READING":
        return {
          name: "Đọc Hiểu",
          icon: <BookOpen className="w-3.5 h-3.5" />,
          bg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        };
      case "SPEAKING":
        return {
          name: "Luyện Nói AI",
          icon: <Mic className="w-3.5 h-3.5" />,
          bg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
        };
      case "WRITING":
        return {
          name: "Luyện Viết",
          icon: <PenTool className="w-3.5 h-3.5" />,
          bg: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
        };
      case "GRAMMAR":
        return {
          name: "Ngữ Pháp AI",
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          bg: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800",
        };
      default:
        return {
          name: "Từ Vựng",
          icon: <BookOpen className="w-3.5 h-3.5" />,
          bg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
        };
    }
  };

  const badge = getBadgeConfig(type);

  return (
    <span
      className={`px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 border ${badge.bg} font-display shrink-0`}
    >
      {badge.icon} {badge.name}
    </span>
  );
};
