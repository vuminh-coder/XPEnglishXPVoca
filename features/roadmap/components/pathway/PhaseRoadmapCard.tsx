"use client";

import React from "react";
import { Check, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { TargetRoadmapPhase, RoadmapTask } from "../../types";
import { LessonTaskItem } from "./LessonTaskItem";

interface PhaseRoadmapCardProps {
  phase: TargetRoadmapPhase;
  selectedTaskId?: string;
  onSelectTask: (task: RoadmapTask) => void;
  onToggleComplete: (taskId: string) => void;
  phaseIndex?: number;
  totalPhases?: number;
  onPrevPhase?: () => void;
  onNextPhase?: () => void;
}

export const PhaseRoadmapCard: React.FC<PhaseRoadmapCardProps> = ({
  phase,
  selectedTaskId,
  onSelectTask,
  onToggleComplete,
  phaseIndex,
  totalPhases,
  onPrevPhase,
  onNextPhase,
}) => {
  const phaseCompletedCount = phase.tasks.filter((t) => t.isCompleted).length;
  const phaseTotalCount = phase.tasks.length;
  const progressPercent = Math.round((phaseCompletedCount / (phaseTotalCount || 1)) * 100);

  // Bóc tách chữ "Chặng X" để đổi màu nổi bật và xóa bỏ khối badge nền xanh
  const titleParts = React.useMemo(() => {
    const rawTitle = phase.title || "";
    const match = rawTitle.match(/^(Chặng\s*\d+)\s*:?\s*(.*)$/i);
    if (match) {
      return {
        prefix: match[1],
        content: match[2] ? `: ${match[2]}` : "",
      };
    }
    return {
      prefix: `Chặng ${phase.phaseNum}`,
      content: rawTitle ? `: ${rawTitle}` : "",
    };
  }, [phase.title, phase.phaseNum]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
      {/* 1. PHASE HEADER & NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="space-y-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold font-display truncate">
            <span className="text-[#0059bb] dark:text-sky-400 font-extrabold mr-1.5">
              {titleParts.prefix}
            </span>
            <span className="text-slate-900 dark:text-white">
              {titleParts.content}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {phase.subtitle}
          </p>
        </div>

        {/* Phase Navigation Switcher */}
        {totalPhases !== undefined && totalPhases > 1 && (
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs shrink-0 self-end sm:self-center">
            <button
              type="button"
              disabled={phaseIndex === 0}
              onClick={onPrevPhase}
              className="w-7 h-7 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Chặng trước"
              aria-label="Chặng trước"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span className="text-xs font-mono font-bold px-1.5 text-slate-700 dark:text-slate-300 tabular-nums select-none">
              {(phaseIndex ?? 0) + 1}/{totalPhases}
            </span>
            <button
              type="button"
              disabled={phaseIndex === totalPhases - 1}
              onClick={onNextPhase}
              className="w-7 h-7 rounded-lg border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Chặng tiếp theo"
              aria-label="Chặng tiếp theo"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* 2. PHASE PROGRESS BAR */}
      <div className="space-y-1.5 px-0.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
            <span>Tiến độ chặng:</span>
            <strong className="text-slate-800 dark:text-slate-200 font-bold">{phaseCompletedCount}</strong>/{phaseTotalCount} bài hoàn thành
          </span>
          <span className="tabular-nums font-bold text-[#0059bb] dark:text-sky-400">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0059bb] to-sky-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. TIMELINE MILESTONE PATHWAY */}
      <div className="space-y-3.5 pt-2">
        {phase.tasks.map((task, idx) => {
          const isLast = idx === phase.tasks.length - 1;
          const isSelected = selectedTaskId === task.id;

          return (
            <div key={task.id} className="relative flex items-start gap-3 sm:gap-3.5 group">
              {/* Timeline Connector Line & Milestone Node */}
              <div className="flex flex-col items-center shrink-0 self-stretch relative w-6">
                {/* Milestone Node & Nút Toggle Hoàn Thành Duy Nhất */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(task.id);
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all z-10 active:scale-90 ${
                    task.isCompleted
                      ? "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600 ring-2 ring-emerald-500/20"
                      : isSelected
                      ? "bg-white dark:bg-slate-900 border-2 border-[#0059bb] ring-4 ring-[#0059bb]/20 shadow-xs hover:border-[#004899]"
                      : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 hover:border-[#0059bb]"
                  }`}
                  title={task.isCompleted ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
                >
                  {task.isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isSelected ? (
                    <div className="w-2 h-2 rounded-full bg-[#0059bb]" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                      {task.dayNum}
                    </span>
                  )}
                </button>

                {/* Bottom vertical connector line to next node */}
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-800 my-1 group-hover:bg-slate-300 dark:group-hover:bg-slate-700 transition-colors" />
                )}
              </div>

              {/* Lesson Task Card Item */}
              <div className="flex-1 min-w-0">
                <LessonTaskItem
                  task={task}
                  isSelected={isSelected}
                  onSelectTask={onSelectTask}
                  onToggleComplete={onToggleComplete}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
