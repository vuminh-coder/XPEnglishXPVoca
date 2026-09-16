"use client";

import React from "react";
import Link from "next/link";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Target,
  Gift,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Zap,
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
    completionPercentage: 42,
  };

  const dailyQuests = activeData?.dailyQuests || [];
  const rewardChest = activeData?.rewardChest || {
    canClaim: false,
    isClaimed: false,
    xpReward: 50,
    coinReward: 20,
  };

  const [isClaiming, setIsClaiming] = React.useState(false);

  const handleClaim = async () => {
    if (rewardChest.isClaimed || !rewardChest.canClaim || isClaiming) return;
    setIsClaiming(true);
    await claimDailyChest();
    setIsClaiming(false);
  };

  return (
    <div className="my-2 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      {/* Target Goal Header */}
      <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0059bb] text-white flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-900 dark:text-white">
              Mục Tiêu {targetGoal.exam} {targetGoal.score}+
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Trình độ: {targetGoal.currentLevel} • {targetGoal.weeklyHours}h/tuần
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-extrabold text-[#0059bb] dark:text-sky-400">
            {targetGoal.completionPercentage}%
          </span>
          <div className="w-14 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-[#0059bb] rounded-full transition-all duration-500"
              style={{ width: `${targetGoal.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Daily Quests */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Nhiệm vụ hôm nay
          </span>
          <span className="text-[10px] text-slate-500">
            {dailyQuests.filter((q: any) => q.isCompleted).length}/{dailyQuests.length || 3} xong
          </span>
        </div>

        {dailyQuests.map((quest: any) => (
          <div
            key={quest.id}
            className={`p-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
              quest.isCompleted
                ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {quest.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <div className="min-w-0">
                <div
                  className={`font-semibold truncate text-[11px] ${
                    quest.isCompleted
                      ? "line-through text-slate-500 dark:text-slate-400"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {quest.title}
                </div>
                <div className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">
                  Tiến độ: {quest.progress}/{quest.target} • +{quest.xpReward} XP
                </div>
              </div>
            </div>

            {!quest.isCompleted && quest.link && (
              <Link
                href={quest.link}
                onClick={() => setIsOpen(false)}
                className="shrink-0 px-2 py-1 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white text-[10px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
              >
                Luyện
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Reward Chest Box */}
      <div
        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
          rewardChest.isClaimed
            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
            : rewardChest.canClaim
            ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-300 dark:border-amber-700 shadow-sm"
            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              rewardChest.isClaimed
                ? "bg-emerald-500 text-white"
                : rewardChest.canClaim
                ? "bg-amber-500 text-white animate-bounce"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400"
            }`}
          >
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-[11px] text-slate-900 dark:text-white">
              {rewardChest.isClaimed
                ? "Đã nhận rương thưởng hôm nay"
                : "Rương Thưởng Lộ Trình (+50 XP, +20 Vàng)"}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              {rewardChest.isClaimed
                ? "Hẹn gặp lại ngày mai để nhận tiếp!"
                : rewardChest.canClaim
                ? "Đủ điều kiện! Nhấn để nhận thưởng ngay"
                : "Hoàn thành 2/3 nhiệm vụ để mở rương"}
            </div>
          </div>
        </div>

        {rewardChest.canClaim && !rewardChest.isClaimed && (
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-[10px] shadow-sm flex items-center gap-1 active:scale-95 transition-transform"
          >
            <Sparkles className="w-3 h-3" />
            {isClaiming ? "Đang nhận..." : "Nhận ngay"}
          </button>
        )}
      </div>
    </div>
  );
}
