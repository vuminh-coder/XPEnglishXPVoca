"use client";
import React from "react";
import { Gift } from "lucide-react";
import { TargetRoadmapPhase, RoadmapTask } from "../../types";
import { LessonTaskItem } from "./LessonTaskItem";

interface PhaseRoadmapCardProps {
  phase: TargetRoadmapPhase;
  selectedTaskId?: string;
  onSelectTask: (task: RoadmapTask) => void;
  onToggleComplete: (taskId: string) => void;
}

export const PhaseRoadmapCard: React.FC<PhaseRoadmapCardProps> = ({
  phase,
  selectedTaskId,
  onSelectTask,
  onToggleComplete,
}) => {
  const phaseCompletedCount = phase.tasks.filter((t) => t.isCompleted).length;
  const phaseTotalCount = phase.tasks.length;
  const isPhaseDone = phaseCompletedCount === phaseTotalCount && phaseTotalCount > 0;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
      {/* PHASE HEADER & CHEST REWARD */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-[#0059bb] text-white font-display shrink-0 shadow-2xs">
              Chặng {phase.phaseNum}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
              {phase.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {phase.subtitle}
          </p>
        </div>

        {/* Chest Unlock Reward Badge */}
        <div
          className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 shrink-0 ${
            isPhaseDone
              ? "bg-amber-400/20 border-amber-400/60 text-amber-700 dark:text-amber-300 animate-pulse"
              : "bg-slate-100 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-400"
          }`}
        >
          <Gift className={`w-4 h-4 ${isPhaseDone ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />
          <span className="text-[10px] sm:text-[11px] font-mono font-black">
            +{phase.chestRewardXp} XP & +{phase.chestRewardCoins} Coin
          </span>
        </div>
      </div>

      {/* TAILORED LESSON ITEMS LIST */}
      <div className="space-y-2.5">
        {phase.tasks.map((task) => (
          <LessonTaskItem
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onSelectTask={onSelectTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};
