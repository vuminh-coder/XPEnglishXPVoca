"use client";
import React from "react";
import {
  Headphones,
  BookText,
  Mic,
  PenTool,
  BookMarked,
  BookOpen,
} from "lucide-react";
import { TaskSkillType } from "../../types";

interface RoadmapSkillBadgeProps {
  type: TaskSkillType | string;
  iconOnly?: boolean;
}

export const RoadmapSkillBadge: React.FC<RoadmapSkillBadgeProps> = ({
  type,
  iconOnly = true,
}) => {
  const getBadgeConfig = (skillType: string) => {
    switch (skillType) {
      case "LISTENING":
        return {
          name: "Luyện Nghe",
          icon: <Headphones className="w-4 h-4 stroke-[2.2] text-[#0059bb] dark:text-sky-400 shrink-0" />,
          bg: "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border-blue-200/80 dark:border-blue-800/80",
        };
      case "READING":
        return {
          name: "Đọc Hiểu",
          icon: <BookText className="w-4 h-4 stroke-[2.2] text-emerald-600 dark:text-emerald-400 shrink-0" />,
          bg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/80",
        };
      case "SPEAKING":
        return {
          name: "Luyện Nói AI",
          icon: <Mic className="w-4 h-4 stroke-[2.2] text-amber-600 dark:text-amber-400 shrink-0" />,
          bg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/80",
        };
      case "WRITING":
        return {
          name: "Luyện Viết",
          icon: <PenTool className="w-4 h-4 stroke-[2.2] text-purple-600 dark:text-purple-400 shrink-0" />,
          bg: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border-purple-200/80 dark:border-purple-800/80",
        };
      case "GRAMMAR":
        return {
          name: "Ngữ Pháp AI",
          icon: <BookMarked className="w-4 h-4 stroke-[2.2] text-sky-600 dark:text-sky-400 shrink-0" />,
          bg: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border-sky-200/80 dark:border-sky-800/80",
        };
      default:
        return {
          name: "Từ Vựng",
          icon: <BookOpen className="w-4 h-4 stroke-[2.2] text-indigo-600 dark:text-indigo-400 shrink-0" />,
          bg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-800/80",
        };
    }
  };

  const badge = getBadgeConfig(type);

  if (iconOnly) {
    return (
      <span
        title={badge.name}
        aria-label={badge.name}
        className="shrink-0 flex items-center justify-center"
      >
        {badge.icon}
      </span>
    );
  }

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 border ${badge.bg} shrink-0 shadow-2xs`}
    >
      {badge.icon}
      <span>{badge.name}</span>
    </span>
  );
};
