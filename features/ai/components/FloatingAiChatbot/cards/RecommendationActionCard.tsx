"use client";

import React from "react";
import Link from "next/link";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import {
  Mic,
  Headphones,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Compass,
} from "lucide-react";

export default function RecommendationActionCard({ data }: { data?: any }) {
  const storeDbData = useAiChatbotStore((state) => state.dbData);
  const setIsOpen = useAiChatbotStore((state) => state.setIsOpen);

  const rec = data || storeDbData?.recommendations;

  if (!rec) {
    return (
      <div className="my-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 text-xs">
        Đang đồng bộ dữ liệu bài học từ CSDL...
      </div>
    );
  }

  const { weakestSkill, srsDue, nextListening, nextGrammar, contextualTip } = rec;

  return (
    <div className="my-2 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 text-xs">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 dark:text-white mb-1">
        <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" />
        <span>Gợi ý ưu tiên theo dữ liệu học tập của bạn:</span>
      </div>

      {/* 1. Weakest Skill Card */}
      {weakestSkill && (
        <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[11px] text-amber-900 dark:text-amber-200 truncate">
                Cần bứt phá: {weakestSkill.label}
              </div>
              <div className="text-[10px] text-amber-700/80 dark:text-amber-400/80 truncate">
                {weakestSkill.advice}
              </div>
            </div>
          </div>
          <Link
            href={weakestSkill.link}
            onClick={() => setIsOpen(false)}
            className="shrink-0 px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-transform"
          >
            Luyện ngay
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 2. SRS Due Words Card */}
      {srsDue && (
        <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <BookmarkCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[11px] text-emerald-900 dark:text-emerald-200 truncate">
                Ôn tập ngắt quãng Spaced Repetition
              </div>
              <div className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 truncate">
                {srsDue.advice}
              </div>
            </div>
          </div>
          <Link
            href={srsDue.link}
            onClick={() => setIsOpen(false)}
            className="shrink-0 px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-transform"
          >
            Ôn từ
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 3. Next Listening Lesson Card */}
      {nextListening && (
        <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#0059bb] text-white flex items-center justify-center shrink-0">
              <Headphones className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[11px] text-blue-900 dark:text-blue-200 truncate">
                Dictation: {nextListening.title}
              </div>
              <div className="text-[10px] text-blue-700/80 dark:text-blue-400/80 truncate">
                {nextListening.category} • {nextListening.progressText}
              </div>
            </div>
          </div>
          <Link
            href={nextListening.link}
            onClick={() => setIsOpen(false)}
            className="shrink-0 px-2 py-1 rounded-lg bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-transform"
          >
            Học tiếp
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 4. Next Grammar Topic Card */}
      {nextGrammar && (
        <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[11px] text-purple-900 dark:text-purple-200 truncate">
                Ngữ pháp: {nextGrammar.title}
              </div>
              <div className="text-[10px] text-purple-700/80 dark:text-purple-400/80 truncate">
                {nextGrammar.advice}
              </div>
            </div>
          </div>
          <Link
            href={nextGrammar.link}
            onClick={() => setIsOpen(false)}
            className="shrink-0 px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-transform"
          >
            Khám phá
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 5. Contextual Tip for current page */}
      {contextualTip && (
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Compass className="w-3.5 h-3.5 text-[#0059bb] shrink-0" />
            <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
              <strong className="text-slate-800 dark:text-slate-200">
                {contextualTip.badge}:
              </strong>{" "}
              {contextualTip.description}
            </span>
          </div>
          {contextualTip.link && (
            <Link
              href={contextualTip.link}
              onClick={() => setIsOpen(false)}
              className="shrink-0 text-[10px] font-bold text-[#0059bb] hover:underline"
            >
              {contextualTip.actionText} ➔
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
