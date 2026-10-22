"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  Target,
  Sparkles,
  Flame,
  CheckCircle2,
  ChevronRight,
  Shield,
  Gift,
} from "lucide-react";
import { ZiczacPathStep } from "../../types";

interface RoadmapDuolingoSidebarProps {
  completedStepsCount: number;
  totalStepsCount: number;
  overallProgress: number;
  stepsUntilNextCheckpoint: number;
  nextCheckpointStep?: ZiczacPathStep;
}

export const RoadmapDuolingoSidebar: React.FC<RoadmapDuolingoSidebarProps> = ({
  completedStepsCount,
  totalStepsCount,
  overallProgress,
  stepsUntilNextCheckpoint,
  nextCheckpointStep,
}) => {
  return (
    <div className="sticky top-20 space-y-4 select-none">
      {/* 1. DUOLINGO DAILY QUESTS (NHIỆM VỤ HẰNG NGÀY) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-amber-500" />
            </div>
            <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
              Nhiệm Vụ Hằng Ngày
            </h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
            HÔM NAY
          </span>
        </div>

        {/* Quest List */}
        <div className="space-y-3">
          {/* Quest 1: XP */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Kiếm 30 XP từ lộ trình
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                25 / 30 XP
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[83%]" />
            </div>
          </div>

          {/* Quest 2: Lesson completion */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Hoàn thành 1 bài luyện tập
              </span>
              <span className="flex items-center gap-1 font-mono font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1 / 1</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
          </div>

          {/* Quest 3: Checkpoint target */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Tiến tới Cột Mốc tiếp theo
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {stepsUntilNextCheckpoint > 0 ? `Còn ${stepsUntilNextCheckpoint} bài` : "Sẵn sàng"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.max(10, 100 - stepsUntilNextCheckpoint * 20)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. DUOLINGO NEXT MILESTONE CHEST REWARD (RƯƠNG THƯỞNG CỘT MỐC) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-slate-900 border-2 border-amber-300/80 dark:border-amber-700/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display text-amber-900 dark:text-amber-200">
              Rương Thưởng Cột Mốc
            </h4>
            <p className="text-[11px] text-amber-700/80 dark:text-amber-300/80">
              Mở khóa khi vượt qua bài thi tổng hợp
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">
              PHẦN THƯỞNG
            </span>
            <p className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">
              +{nextCheckpointStep?.xpReward || 100} XP • +{nextCheckpointStep?.coinsReward || 50} Xu
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-xl text-[10.5px] font-bold bg-amber-500 text-white shadow-2xs font-display">
            Chặng {nextCheckpointStep?.stepNumber || 5}
          </span>
        </div>
      </div>

      {/* 3. DUOLINGO LEAGUE LEADERBOARD PREVIEW (GIẢI ĐẤU TUẦN) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-display text-slate-900 dark:text-white">
                Bảng Xếp Hạng Tuần
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">Giải Đấu Ruby</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold font-mono bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
            HẠNG #3
          </span>
        </div>

        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 font-bold font-mono text-amber-500">1</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                Minh Anh
              </span>
            </div>
            <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
              1,240 XP
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 font-bold font-mono text-slate-400">2</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                Hoàng Nam
              </span>
            </div>
            <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
              980 XP
            </span>
          </div>

          <div className="flex items-center justify-between text-xs p-1.5 rounded-xl bg-[#0059bb]/5 dark:bg-sky-400/5 border border-[#0059bb]/20">
            <div className="flex items-center gap-2">
              <span className="w-5 font-bold font-mono text-[#0059bb] dark:text-sky-400">3</span>
              <span className="font-bold text-[#0059bb] dark:text-sky-400 truncate max-w-[120px]">
                Bạn (Học Viên)
              </span>
            </div>
            <span className="font-mono font-bold text-[#0059bb] dark:text-sky-400">
              850 XP
            </span>
          </div>
        </div>

        <Link
          href="/analytics"
          className="flex items-center justify-center gap-1 w-full pt-2 text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline font-display"
        >
          <span>Xem bảng xếp hạng đầy đủ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
