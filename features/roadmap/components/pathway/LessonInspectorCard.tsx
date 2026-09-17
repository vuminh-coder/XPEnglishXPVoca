"use client";
import React from "react";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { Button, Badge } from "@/shared/components/ui";
import { RoadmapTask } from "../../types";

interface LessonInspectorCardProps {
  selectedTask: RoadmapTask | null;
}

export const LessonInspectorCard: React.FC<LessonInspectorCardProps> = ({ selectedTask }) => {
  return (
    <div className="hidden lg:block lg:col-span-4 space-y-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 sticky top-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0059bb]" /> Hướng Dẫn Chi Tiết Bài Học
          </span>
          {selectedTask && (
            <Badge variant={selectedTask.isCompleted ? "success" : "warning"} className="text-[10px] font-mono font-black">
              {selectedTask.isCompleted ? "Đã xong" : "Chưa làm"}
            </Badge>
          )}
        </div>

        {selectedTask ? (
          <div className="space-y-3.5">
            <div className="space-y-1">
              <h3 className="text-sm font-black font-display text-slate-900 dark:text-white">
                {selectedTask.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {selectedTask.description}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider font-display">
                Mẹo làm bài ăn điểm
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                {selectedTask.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#0059bb] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 font-mono">
              <span>Thưởng bài học:</span>
              <span>+{selectedTask.xpReward} XP</span>
            </div>

            <div className="pt-1">
              <Link href={selectedTask.practicePath} className="w-full block">
                <Button className="w-full bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs py-2.5 rounded-xl shadow-2xs flex items-center justify-center gap-2 font-display cursor-pointer">
                  <Sparkles className="w-4 h-4 text-amber-300" /> Bắt Đầu Luyện Tập (+{selectedTask.xpReward} XP)
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-2 text-slate-400">
            <Compass className="w-10 h-10 mx-auto opacity-40" />
            <p className="text-xs font-bold">Chọn bài học bất kỳ ở danh sách bên trái để xem hướng dẫn chi tiết.</p>
          </div>
        )}
      </div>
    </div>
  );
};
