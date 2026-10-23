"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Play, X, ExternalLink, CheckCircle2, Clock, Calendar, ChevronDown, ChevronUp, Sparkles, BookOpen } from "lucide-react";
import { ZiczacPathStep, ZiczacStepState, ZiczacStepProgress } from "../../types";

interface ZiczacNodePopoverProps {
  step: ZiczacPathStep;
  state: ZiczacStepState;
  onClose: () => void;
  onToggleComplete: (stepId: string) => void;
  onAdvanceSession?: (stepId: string) => void;
  stepProgress?: ZiczacStepProgress;
  placement?: "top" | "bottom";
}

/**
 * Duolingo-style Popover Speech Bubble
 * Nổi trên hoặc dưới node được chọn với mũi tên tam giác trỏ tới node
 * Hỗ trợ tiến độ đa phiên (Multi-Session Progress) & kế hoạch phân bổ ngày
 */
export const ZiczacNodePopover: React.FC<ZiczacNodePopoverProps> = ({
  step,
  state,
  onClose,
  onToggleComplete,
  onAdvanceSession,
  stepProgress,
  placement = "top",
}) => {
  const isCompleted = state === "COMPLETED";
  const isBottom = placement === "bottom";
  const [showPlanDetail, setShowPlanDetail] = useState(false);

  const totalSessions = stepProgress?.totalSessions || step.totalSessions || (step.isCheckpoint ? 1 : 3);
  const completedSessions = isCompleted
    ? totalSessions
    : Math.min(stepProgress?.completedSessions || 0, totalSessions);
  const currentSession = Math.min(totalSessions, completedSessions + 1);
  const progressPercent = isCompleted ? 100 : stepProgress?.progressPercent || Math.round((completedSessions / totalSessions) * 100);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-50 w-80 sm:w-88 p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/20 animate-in fade-in zoom-in-95 duration-150 select-none ${
        isBottom ? "top-[calc(100%+16px)]" : "bottom-[calc(100%+16px)]"
      }`}
    >
      {/* Caret Triangle Pointing To Node */}
      {isBottom ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l-2 border-t-2 border-slate-200 dark:border-slate-700 rotate-45" />
      ) : (
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 rotate-45" />
      )}

      {/* Header with Title and Close Button */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#0059bb] dark:text-sky-400">
              {step.isCheckpoint ? "Cột Mốc Tổng Hợp" : `Chặng ${step.stepNumber}`}
            </span>
            {step.totalTargetWords && (
              <span className="px-1.5 py-0.2 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[9.5px] font-bold text-amber-600 dark:text-amber-400 font-mono">
                {step.totalTargetWords} Từ
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-tight mt-0.5">
            {step.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description / Scope */}
      <p className="text-xs text-slate-600 dark:text-slate-300 py-2 leading-relaxed line-clamp-2">
        {step.checkpointReviewScope || step.description}
      </p>

      {/* MULTI-SESSION PROGRESS BAR (Cơ chế vòng học Duolingo) */}
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 mb-2.5">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1 font-display">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
            {isCompleted
              ? `Đã hoàn thành ${totalSessions}/${totalSessions} vòng`
              : `Vòng học: ${currentSession} / ${totalSessions}`}
          </span>
          <span className="text-[#0059bb] dark:text-sky-400 font-mono text-[10.5px]">
            {step.totalTargetWords
              ? `${stepProgress?.wordsLearned || (isCompleted ? step.totalTargetWords : completedSessions * (step.dailyTargetWords || 20))} / ${step.totalTargetWords} từ (${progressPercent}%)`
              : `${progressPercent}%`}
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isCompleted
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-[#0059bb] to-sky-400"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 300-word daily quota note */}
        {step.dailyTargetWords && (
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              Mục tiêu: {step.dailyTargetWords} từ / ngày
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
              +{step.xpReward} XP / vòng
            </span>
          </div>
        )}
      </div>

      {/* DAILY 3-STEP STUDY PLAN (Bảng phân bổ 3 bước 15 phút nếu có) */}
      {step.dailyPlanBreakdown && step.dailyPlanBreakdown.length > 0 && (
        <div className="mb-2.5 border border-blue-100 dark:border-blue-900/40 rounded-xl overflow-hidden bg-blue-50/40 dark:bg-blue-950/20">
          <button
            type="button"
            onClick={() => setShowPlanDetail((prev) => !prev)}
            className="w-full px-2.5 py-1.5 flex items-center justify-between text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-display">
              <Clock className="w-3 h-3" />
              Kế hoạch 15 phút mỗi ngày (3 Bước)
            </span>
            {showPlanDetail ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showPlanDetail && (
            <div className="p-2.5 pt-1 space-y-1.5 border-t border-blue-100 dark:border-blue-900/30">
              {step.dailyPlanBreakdown.map((phase, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[10.5px]">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 font-bold font-mono text-[#0059bb] dark:text-sky-300 shrink-0 text-[9.5px]">
                    {phase.timeSlot}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {phase.activity}:{" "}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {phase.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Duolingo 3D CTA Button & Actions */}
      <div className="space-y-2">
        <Link
          href={step.practicePath}
          className={`w-full h-11 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all font-display active:translate-y-1 cursor-pointer ${
            step.isCheckpoint
              ? "bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-700 shadow-md shadow-amber-500/20 active:border-b-0"
              : isCompleted
              ? "bg-emerald-500 hover:bg-emerald-600 border-b-4 border-emerald-700 shadow-md shadow-emerald-500/20 active:border-b-0"
              : "bg-[#0059bb] hover:bg-[#004899] border-b-4 border-[#003d82] shadow-md shadow-[#0059bb]/20 active:border-b-0"
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>
            {isCompleted
              ? "ÔN TẬP LẠI BÀI NÀY"
              : `BẮT ĐẦU VÒNG ${currentSession} (+${step.xpReward} XP)`}
          </span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </Link>

        {/* Quick Advance Session Button */}
        {!isCompleted && onAdvanceSession && (
          <button
            type="button"
            onClick={() => onAdvanceSession(step.id)}
            className="w-full py-1.5 px-3 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-[#0059bb] dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tích lũy xong Vòng {currentSession} (+15 XP)</span>
          </button>
        )}

        {/* Quick Complete Toggle */}
        <button
          type="button"
          onClick={() => onToggleComplete(step.id)}
          className="w-full py-0.5 text-[10.5px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-center transition-colors cursor-pointer"
        >
          {isCompleted ? "Đánh dấu chưa hoàn thành chặng" : "Đánh dấu hoàn thành toàn bộ chặng"}
        </button>
      </div>
    </div>
  );
};
