"use client";

import React from "react";
import Link from "next/link";
import { Check, Play, Compass, RotateCcw } from "lucide-react";
import { Badge } from "@/shared/components/ui";
import { RoadmapTask } from "../../types";
import { RoadmapSkillBadge } from "../shared/RoadmapSkillBadge";

interface LessonTaskItemProps {
  task: RoadmapTask;
  isSelected: boolean;
  onSelectTask: (task: RoadmapTask) => void;
  onToggleComplete: (taskId: string) => void;
}

export const LessonTaskItem: React.FC<LessonTaskItemProps> = ({
  task,
  isSelected,
  onSelectTask,
  onToggleComplete,
}) => {
  return (
    <div className="space-y-2">
      <div
        onClick={() => onSelectTask(task)}
        className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isSelected
            ? "bg-blue-50/70 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
            : task.isCompleted
            ? "bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs opacity-90"
            : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/50 shadow-2xs"
        }`}
      >
        {/* Left: Task Content (Skill Icon + Full Title + Description) */}
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <RoadmapSkillBadge type={task.taskType} iconOnly={true} />

            <h3
              className={`text-xs sm:text-sm font-bold font-display line-clamp-1 sm:line-clamp-2 leading-snug ${
                task.isCompleted
                  ? "line-through text-slate-400 dark:text-slate-500 font-medium"
                  : "text-slate-900 dark:text-white"
              }`}
              title={`Ngày ${task.dayNum}: ${task.title}`}
            >
              Ngày {task.dayNum}: {task.title}
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 sm:line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Right: Action Launcher (Gọn gàng, rõ ràng phân cấp Primary / Secondary) */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80 shrink-0">
          {task.isCompleted ? (
            /* Đã hoàn thành: Duy nhất 1 nút Ôn Lại tinh gọn, không chiếm chỗ tiêu đề */
            <Link href={task.practicePath} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="h-8.5 px-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-xs font-bold rounded-xl shadow-2xs flex items-center gap-1.5 font-display transition-all cursor-pointer active:scale-95 shrink-0"
                title="Luyện tập lại bài học này"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.2] text-slate-500 dark:text-slate-400" />
                <span>Ôn Lại</span>
              </button>
            </Link>
          ) : (
            /* Chưa hoàn thành: Primary CTA Button màu xanh thương hiệu #0059bb */
            <Link href={task.practicePath} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="h-8.5 px-4 bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold rounded-xl shadow-xs shadow-[#0059bb]/20 flex items-center gap-1.5 font-display transition-all cursor-pointer active:scale-95 shrink-0"
                title="Bắt đầu học bài này ngay"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Luyện Ngay</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE INLINE GUIDANCE DRAWER */}
      {isSelected && (
        <div className="lg:hidden p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
            <span className="text-xs font-bold uppercase text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Mẹo Làm Bài Ăn Điểm
            </span>
            <Badge variant={task.isCompleted ? "success" : "warning"} className="text-[9px] font-mono font-bold">
              {task.isCompleted ? "Đã xong" : "Chưa làm"}
            </Badge>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
            {task.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#0059bb] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
