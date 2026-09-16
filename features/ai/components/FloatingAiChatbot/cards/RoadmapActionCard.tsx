"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Target,
  Gift,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RoadmapActionCard({ data }: { data?: any }) {
  const storeDbData = useAiChatbotStore((state) => state.dbData);
  const claimDailyChest = useAiChatbotStore((state) => state.claimDailyChest);
  const setIsOpen = useAiChatbotStore((state) => state.setIsOpen);

  const activeData = data || storeDbData;

  const targetGoal = activeData?.targetGoal || {
    exam: "TOEIC",
    score: 750,
    currentLevel: "B1",
    weeklyHours: 10,
    completionPercentage: 35,
  };

  const dailyQuests = activeData?.dailyQuests || [];
  const rewardChest = activeData?.rewardChest || {
    canClaim: false,
    isClaimed: false,
    xpReward: 50,
    coinReward: 20,
  };

  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    if (rewardChest.isClaimed || !rewardChest.canClaim || isClaiming) return;
    setIsClaiming(true);
    await claimDailyChest();
    setIsClaiming(false);
  };

  return (
    <div className="my-1.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2.5 text-xs">
      {/* 1. Target Goal & Progress Strip */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-1.5 min-w-0">
          <Target className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
          <span className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
            {targetGoal.exam} {targetGoal.score}+
          </span>
          <span className="text-[11px] text-slate-400">• {targetGoal.currentLevel}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0059bb] rounded-full transition-all duration-500"
              style={{ width: `${targetGoal.completionPercentage}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400">
            {targetGoal.completionPercentage}%
          </span>
        </div>
      </div>

      {/* 2. Compact 3 Daily Quests List */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Nhiệm vụ hôm nay</span>
          <span>
            {dailyQuests.filter((q: any) => q.isCompleted).length}/{dailyQuests.length || 3}
          </span>
        </div>

        {dailyQuests.map((quest: any) => (
          <div
            key={quest.id}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              {quest.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
              )}
              <div className="min-w-0 truncate">
                <span
                  className={`text-[11.5px] ${
                    quest.isCompleted
                      ? "line-through text-slate-400"
                      : "font-semibold text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {quest.title}
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold ml-1.5">
                  +{quest.xpReward} XP
                </span>
              </div>
            </div>

            {!quest.isCompleted && quest.link && (
              <Link
                href={quest.link}
                onClick={() => setIsOpen(false)}
                className="h-7 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>Luyện</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 3. Slim Reward Chest Strip */}
      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px]">
          <Gift
            className={`w-4 h-4 ${
              rewardChest.isClaimed
                ? "text-emerald-500"
                : rewardChest.canClaim
                ? "text-amber-500"
                : "text-slate-400"
            }`}
          />
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {rewardChest.isClaimed
              ? "Đã nhận rương thưởng hôm nay"
              : "Thưởng: +50 XP & +20 Vàng"}
          </span>
        </div>

        {rewardChest.canClaim && !rewardChest.isClaimed && (
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="h-7 px-3 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>{isClaiming ? "..." : "Nhận"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
