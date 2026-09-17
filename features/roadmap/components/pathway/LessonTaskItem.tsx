"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2, Play, Sparkles, Compass } from "lucide-react";
import { Button, Badge } from "@/shared/components/ui";
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
            ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] dark:border-sky-400 shadow-2xs ring-2 ring-[#0059bb]/20"
            : task.isCompleted
            ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/40 text-slate-800 dark:text-emerald-100 shadow-2xs"
            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-[#0059bb]/50"
        }`}
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0 w-full sm:w-auto">
          {/* Checkbox toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
            className="shrink-0 mt-0.5 sm:mt-0 cursor-pointer"
          >
            {task.isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-[#0059bb] transition-colors" />
            )}
          </button>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <RoadmapSkillBadge type={task.taskType} />

              <span
                className={`text-xs sm:text-sm font-bold font-display line-clamp-1 ${
                  task.isCompleted ? "line-through text-slate-400" : "text-slate-900 dark:text-white"
                }`}
              >
                Ngày {task.dayNum}: {task.title}
              </span>
            </div>

            <p className="text-xs text-slate-500 truncate font-medium max-w-lg">
              {task.description}
            </p>
          </div>
        </div>

        {/* Action Launcher */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800 shrink-0">
          <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono font-black text-xs border border-amber-300/30">
            +{task.xpReward} XP
          </span>

          <Link href={task.practicePath}>
            <Button className="py-1.5 px-3 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-1 font-display cursor-pointer">
              <Play className="w-3 h-3 fill-white" /> Luyện Ngay
            </Button>
          </Link>
        </div>
      </div>

      {/* MOBILE INLINE GUIDANCE DRAWER */}
      {isSelected && (
        <div className="lg:hidden p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2">
            <span className="text-xs font-black uppercase text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Mẹo Làm Bài Ăn Điểm
            </span>
            <Badge variant={task.isCompleted ? "success" : "warning"} className="text-[9px] font-mono font-black">
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

          <Link href={task.practicePath} className="block pt-1">
            <Button className="w-full bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs py-2 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 font-display cursor-pointer">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bắt Đầu Luyện Tập (+{task.xpReward} XP)
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
