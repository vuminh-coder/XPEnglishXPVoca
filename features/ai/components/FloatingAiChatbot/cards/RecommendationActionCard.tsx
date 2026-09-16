"use client";

import React from "react";
import Link from "next/link";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Mic,
  Headphones,
  BookOpen,
  ArrowRight,
  BookmarkCheck,
  Compass,
} from "lucide-react";
import { ShimmerBox, ShimmerText } from "@/shared/components/feedback/ShimmerSkeleton";

export default function RecommendationActionCard({ data }: { data?: any }) {
  const storeDbData = useAiChatbotStore((state) => state.dbData);
  const setIsOpen = useAiChatbotStore((state) => state.setIsOpen);

  const rec = data || storeDbData?.recommendations;

  if (!rec) {
    return (
      <div className="my-1.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
        <ShimmerText className="h-3.5 w-44" />
        <div className="space-y-1.5">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
              <div className="space-y-1 flex-1">
                <ShimmerText className="h-3 w-3/4" />
                <ShimmerText className="h-2.5 w-1/2" />
              </div>
            </div>
            <ShimmerBox className="h-7 w-14 rounded-lg" />
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <ShimmerBox className="w-7 h-7 rounded-lg shrink-0" />
              <div className="space-y-1 flex-1">
                <ShimmerText className="h-3 w-2/3" />
                <ShimmerText className="h-2.5 w-1/2" />
              </div>
            </div>
            <ShimmerBox className="h-7 w-14 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const { weakestSkill, srsDue, nextListening, nextGrammar, contextualTip } = rec;

  return (
    <div className="my-1.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2 text-xs">
      <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
        Bài học đề xuất theo tiến độ thực tế:
      </div>

      {/* 1. Weakest Skill Item */}
      {weakestSkill && (
        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-900/40">
              <Mic className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                Cần bứt phá: {weakestSkill.label}
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                {weakestSkill.advice}
              </div>
            </div>
          </div>
          <Link
            href={weakestSkill.link}
            onClick={() => setIsOpen(false)}
            className="h-7 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/80 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Luyện</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 2. SRS Due Item */}
      {srsDue && (
        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/40">
              <BookmarkCheck className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                Ôn tập từ vựng Spaced Repetition
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                {srsDue.advice}
              </div>
            </div>
          </div>
          <Link
            href={srsDue.link}
            onClick={() => setIsOpen(false)}
            className="h-7 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/80 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Ôn từ</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 3. Next Listening Lesson Item */}
      {nextListening && (
        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/40">
              <Headphones className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                Dictation: {nextListening.title}
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                {nextListening.category} • {nextListening.progressText}
              </div>
            </div>
          </div>
          <Link
            href={nextListening.link}
            onClick={() => setIsOpen(false)}
            className="h-7 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Học</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 4. Next Grammar Topic Item */}
      {nextGrammar && (
        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/40">
              <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                Ngữ pháp: {nextGrammar.title}
              </div>
              <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                {nextGrammar.advice}
              </div>
            </div>
          </div>
          <Link
            href={nextGrammar.link}
            onClick={() => setIsOpen(false)}
            className="h-7 px-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/80 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Xem</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 5. Contextual Tip for current page */}
      {contextualTip && (
        <div className="pt-1.5 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <Compass className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span className="truncate">{contextualTip.description}</span>
          </div>
          {contextualTip.link && (
            <Link
              href={contextualTip.link}
              onClick={() => setIsOpen(false)}
              className="shrink-0 font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5"
            >
              <span>{contextualTip.actionText}</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
