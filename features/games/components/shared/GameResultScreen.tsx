"use client";

import React from "react";
import { Trophy, ArrowLeft, RotateCcw, Zap, Coins } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";

export interface GameResultScreenProps {
  title?: string;
  subtitle: string;
  score?: number;
  xpEarned: number;
  coinsEarned?: number;
  onBack: () => void;
  onRestart: () => void;
}

export function GameResultScreen({
  title = "Hoàn thành xuất sắc!",
  subtitle,
  score,
  xpEarned,
  coinsEarned = 0,
  onBack,
  onRestart,
}: GameResultScreenProps) {
  const hasReward = xpEarned > 0 || coinsEarned > 0;

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center mx-auto shadow-md shadow-amber-500/10">
        <Trophy className="w-8 h-8 stroke-[2.2] animate-bounce" />
      </div>

      <div className="space-y-1.5">
        <Badge variant="warning" size="sm">Thắng lợi</Badge>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">{title}</h2>
        {score !== undefined && (
          <div className="text-2xl sm:text-3xl font-black text-[#0059bb] dark:text-sky-400 font-display">{score} Điểm</div>
        )}
        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">{subtitle}</p>
      </div>

      {hasReward ? (
        <div className="flex items-center justify-center gap-3 pt-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400 text-xs font-bold shadow-2xs">
            <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+{xpEarned} XP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs">
            <Coins className="w-3.5 h-3.5 stroke-[2.2] text-amber-500" />
            <span>+{coinsEarned} Vàng</span>
          </div>
        </div>
      ) : (
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Phần thưởng đang được nâng cấp để bảo vệ thành tích của bạn.
        </p>
      )}

      <div className="flex gap-3 justify-center pt-2">
        <button type="button" onClick={onBack} className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs">
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Quay lại</span>
        </button>
        <button type="button" onClick={onRestart} className="py-2.5 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20">
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Chơi lại ván mới</span>
        </button>
      </div>
    </div>
  );
}
