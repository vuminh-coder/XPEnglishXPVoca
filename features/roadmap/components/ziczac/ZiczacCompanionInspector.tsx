"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Play,
  Trophy,
  CheckCircle2,
  Clock,
  Zap,
  Coins,
  Lightbulb,
  Sparkles,
  ExternalLink,
  Target,
  ArrowRight,
} from "lucide-react";
import { ZiczacPathStep } from "../../types";

interface ZiczacCompanionInspectorProps {
  step: ZiczacPathStep | null;
  isCompleted: boolean;
  onToggleComplete: (stepId: string) => void;
}

export const ZiczacCompanionInspector: React.FC<ZiczacCompanionInspectorProps> = ({
  step,
  isCompleted,
  onToggleComplete,
}) => {
  if (!step) {
    return (
      <div className="sticky top-20 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center space-y-3">
        <Compass className="w-8 h-8 text-slate-400 mx-auto" />
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
          Chọn một chặng trên lộ trình
        </h4>
        <p className="text-xs text-slate-400">
          Nhấp vào bất kỳ chặng nào trên con đường ziczac để xem chi tiết bài học và làm bài luyện tập.
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-20 space-y-4 select-none">
      {/* Main Inspector Card */}
      <div
        className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border shadow-sm transition-all space-y-5 ${
          step.isCheckpoint
            ? "border-amber-300/80 dark:border-amber-700/80 shadow-amber-500/5 ring-1 ring-amber-400/20"
            : "border-slate-200/90 dark:border-slate-800 shadow-slate-900/5"
        }`}
      >
        {/* 1. Header Badges & Tag */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold font-mono ${
                step.isCheckpoint
                  ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/80"
                  : "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/80"
              }`}
            >
              CHẶNG {step.stepNumber}
            </span>

            <span className="text-xs text-slate-400 font-medium font-display">
              {step.unitTitle}
            </span>
          </div>

          {/* Completion Badge */}
          {isCompleted ? (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã hoàn thành</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400">Chưa hoàn thành</span>
          )}
        </div>

        {/* 2. Title & Description */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white leading-snug">
            {step.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* 3. Checkpoint Special Review Scope Box */}
        {step.isCheckpoint && step.checkpointReviewScope && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/90 to-orange-50/80 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-display text-amber-800 dark:text-amber-300">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>Phạm Vi Kiểm Tra Cột Mốc</span>
            </div>
            <p className="text-[11.5px] text-amber-900/90 dark:text-amber-200/80 leading-relaxed">
              {step.checkpointReviewScope}
            </p>
          </div>
        )}

        {/* 4. Metric Chips Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Thời lượng</span>
            </div>
            <p className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200">
              {step.durationMinutes} phút
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Thưởng XP</span>
            </div>
            <p className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">
              +{step.xpReward} XP
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
              <Coins className="w-3 h-3 text-yellow-500" />
              <span>Thưởng Xu</span>
            </div>
            <p className="text-xs font-bold font-mono text-yellow-600 dark:text-yellow-400">
              +{step.coinsReward} Coin
            </p>
          </div>
        </div>

        {/* 5. Learning Tips */}
        {step.tips && step.tips.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-display text-[#0059bb] dark:text-sky-400">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span>Chiến Thuật Học Tập</span>
            </div>
            <ul className="space-y-1 text-[11.5px] text-slate-600 dark:text-slate-300">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-[#0059bb] dark:text-sky-400 font-bold shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Primary CTA: Jump to actual practice screen */}
          <Link
            href={step.practicePath}
            className={`w-full h-11 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer font-display ${
              step.isCheckpoint
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20"
                : "bg-[#0059bb] hover:bg-[#004899] shadow-[#0059bb]/20"
            }`}
          >
            {step.isCheckpoint ? (
              <>
                <Trophy className="w-4 h-4 fill-current" />
                <span>VÀO PHÒNG KIỂM TRA TỔNG HỢP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>BẮT ĐẦU LUYỆN TẬP NGAY</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </>
            )}
          </Link>

          {/* Secondary CTA: Manual completion toggle */}
          <button
            type="button"
            onClick={() => onToggleComplete(step.id)}
            className={`w-full h-9 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer font-display active:scale-95 ${
              isCompleted
                ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                : "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {isCompleted ? "Đánh dấu Chưa Hoàn Thành" : "Đánh dấu Đã Hoàn Thành (+XP)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
