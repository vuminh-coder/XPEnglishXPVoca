import React from "react";

export const getCategoryBadgeStyle = (badge: string, type: string) => {
  const b = (badge + " " + type).toUpperCase();
  if (b.includes("IELTS ACADEMIC") || b.includes("IELTS_FULL")) {
    return "bg-sky-50 dark:bg-sky-950/60 text-[#0059bb] dark:text-sky-300 border-sky-200/80 dark:border-sky-800/50";
  }
  if (b.includes("4-SKILLS") || b.includes("TOEIC_FULL")) {
    return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/50";
  }
  if (
    b.includes("SPEAKING & WRITING") ||
    b.includes("TOEIC_SPEAKING_WRITING") ||
    b.includes("NÓI & VIẾT")
  ) {
    return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/50";
  }
  if (b.includes("IELTS SPEAKING") || b.includes("IELTS_SPEAKING")) {
    return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/50";
  }
  if (b.includes("IELTS WRITING") || b.includes("IELTS_WRITING")) {
    return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/50";
  }
  return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/50";
};

export interface ExamCategoryBadgeProps {
  badge: string;
  type: string;
  className?: string;
}

export function ExamCategoryBadge({ badge, type, className = "" }: ExamCategoryBadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border font-mono ${getCategoryBadgeStyle(
        badge,
        type,
      )} ${className}`}
    >
      {badge}
    </span>
  );
}
