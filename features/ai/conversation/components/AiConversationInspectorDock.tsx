"use client";

import React from "react";
import { Target, CheckCircle2, Sparkles, Volume2, Lightbulb, Send } from "lucide-react";
import { Topic, SuggestedWord } from "../types";

interface AiConversationInspectorDockProps {
  currentTopic: Topic;
  completedGoalIds: string[];
  completedGoalsCount: number;
  currentSuggestions: {
    words: SuggestedWord[];
    phrases: string[];
  };
  onWordClick: (word: string) => void;
  onSendMessage: (phrase: string) => void;
}

export function AiConversationInspectorDock({
  currentTopic,
  completedGoalIds,
  completedGoalsCount,
  currentSuggestions,
  onWordClick,
  onSendMessage,
}: AiConversationInspectorDockProps) {
  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5 lg:h-full lg:min-h-0 overflow-y-auto">
      {/* 1. MỤC TIÊU PHẢN XẠ NGỮ CẢNH (GOALS CHECKLIST) */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#0059bb]" /> MỤC TIÊU GIAO TIẾP
          </h2>
          <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40">
            {completedGoalsCount}/{currentTopic.goals.length} Đạt
          </span>
        </div>

        <div className="space-y-1.5">
          {currentTopic.goals.map((goal) => {
            const isDone = completedGoalIds.includes(goal.id);
            return (
              <div
                key={goal.id}
                className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                  isDone
                    ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-800 dark:text-emerald-200 shadow-2xs"
                    : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-xs font-bold ${
                      isDone
                        ? "text-emerald-900 dark:text-emerald-100"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {goal.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                    {goal.nameEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. TỪ VỰNG NGỮ CẢNH (3 ITEMS) */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> TỪ VỰNG NGỮ CẢNH
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Click tra/nghe
          </span>
        </div>

        <div className="space-y-1.5">
          {currentSuggestions.words.slice(0, 3).map((w, idx) => (
            <div
              key={idx}
              onClick={() => onWordClick(w.word)}
              className="px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800/80 transition-all flex items-center justify-between gap-2 cursor-pointer group shadow-2xs"
            >
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-300 transition-colors">
                  {w.word}
                </span>
                {w.meaning && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                    {w.meaning}
                  </p>
                )}
              </div>
              <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center group-hover:bg-[#0059bb] group-hover:text-white group-hover:border-[#0059bb] transition-all shrink-0">
                <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MẪU CÂU GỢI Ý PHẢN XẠ (1-CLICK SEND) */}
      {currentSuggestions.phrases.length > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> MẪU CÂU GỢI Ý
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Click để gửi
            </span>
          </div>

          <div className="space-y-1.5">
            {currentSuggestions.phrases.slice(0, 2).map((ph, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSendMessage(ph)}
                className="w-full text-left px-3 py-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-700 text-amber-950 dark:text-amber-100 transition-all flex items-center justify-between gap-2 group cursor-pointer shadow-2xs"
              >
                <span className="text-xs font-semibold truncate flex-1">"{ph}"</span>
                <Send className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
