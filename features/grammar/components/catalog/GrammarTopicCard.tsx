"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { GrammarTopic, GrammarTopicStatus } from "../../types/grammarTypes";
import { getGrammarTopicIcon } from "../GrammarTopicIcon";
import { GrammarQuizResultRecord } from "@/stores/grammarProgressStore";

interface GrammarTopicCardProps {
  topic: GrammarTopic;
  status: GrammarTopicStatus;
  scoreRecord?: GrammarQuizResultRecord;
}

export function GrammarTopicCard({
  topic,
  status,
  scoreRecord,
}: GrammarTopicCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  return (
    <Link
      href={`/study/grammar/${topic.id}`}
      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all cursor-pointer flex flex-col justify-between h-full group active:scale-[0.98]"
    >
      <div className="space-y-3">
        {/* Upper Header: Icon + Focus Badge + Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {getGrammarTopicIcon(topic.id)}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isCompleted ? (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{scoreRecord ? `${scoreRecord.percent}%` : "Đã thuộc"}</span>
              </span>
            ) : isInProgress ? (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Đang học</span>
              </span>
            ) : null}

            <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 truncate max-w-[120px]">
              {topic.focus.split("&")[0].trim()}
            </span>
          </div>
        </div>

        {/* Topic Title & Desc */}
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-1">
              {topic.name}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block truncate">
            {topic.nameEn}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2 font-medium">
            {topic.desc}
          </p>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-3.5 flex items-center justify-between">
        <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1 font-display">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
          <span>{isCompleted ? "Ôn tập lại" : isInProgress ? "Tiếp tục học" : "Học ngay"}</span>
        </span>

        <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#0059bb] group-hover:text-white transition-all flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
