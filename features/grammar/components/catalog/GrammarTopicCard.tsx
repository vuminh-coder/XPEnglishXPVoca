"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Clock, ListChecks } from "lucide-react";
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

  const levelBadge =
    topic.level === "basic"
      ? "A1 - A2"
      : topic.level === "intermediate"
      ? "B1 - B2"
      : "C1 - C2";

  // Gradient surface theme matching Dictation level accents
  const bannerGradient =
    topic.level === "basic"
      ? "from-[#031d40] via-[#003b80] to-[#051329]"
      : topic.level === "intermediate"
      ? "from-[#331604] via-[#78350f] to-[#120802]"
      : "from-[#1f0636] via-[#4c1d95] to-[#090214]";

  return (
    <Link
      href={`/study/grammar/${topic.id}`}
      className="rounded-2xl border bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-lg hover:border-[#0059bb]/50 dark:hover:border-sky-500/40 transition-all cursor-pointer relative overflow-hidden flex flex-col group select-none active:scale-[0.98] h-full"
    >
      {/* 1. VISUAL COVER BANNER: 16/10 Aspect Ratio with Ethereal Twin Glass Badges */}
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-gradient-to-br ${bannerGradient} border-b border-slate-100 dark:border-slate-800/80`}
      >
        {/* Soft Directional Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Ambient Hover Shimmer Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

        {/* Topic Icon: sharp & clear, not dim (moved away from edge) */}
        <div className="absolute right-3.5 top-[46%] -translate-y-1/2 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 pointer-events-none z-10">
          <div className="w-13 h-13 flex items-center justify-center [&>svg]:w-11 [&>svg]:h-11 [&>svg]:stroke-[2] drop-shadow-lg">
            {getGrammarTopicIcon(topic.id)}
          </div>
        </div>

        {/* Top Header Bar: Twin Frosted Glass Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-20">
          {/* Top-Left: CEFR Level Badge */}
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/25 shadow-2xs whitespace-nowrap">
            {levelBadge}
          </span>

          {/* Top-Right: Status or Exam Focus Badge */}
          {isCompleted ? (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/30 text-emerald-100 backdrop-blur-md border border-emerald-400/40 shadow-2xs flex items-center gap-1 whitespace-nowrap">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>{scoreRecord ? `${scoreRecord.percent}%` : "Đã học"}</span>
            </span>
          ) : isInProgress ? (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/30 text-amber-100 backdrop-blur-md border border-amber-400/40 shadow-2xs flex items-center gap-1 whitespace-nowrap">
              <Clock className="w-3 h-3 stroke-[2.5]" />
              <span>Đang học</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/25 shadow-2xs truncate max-w-[125px]">
              {topic.focus.split("&")[0].trim()}
            </span>
          )}
        </div>

        {/* Center Glass Action Orb on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 fill-white text-white" />
          </div>
        </div>

        {/* Bottom Banner Details Bar with Transparent Glass +35 XP Block */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
          <span className="text-[11px] font-bold text-white/95 drop-shadow-xs tracking-tight truncate max-w-[155px]">
            {topic.nameEn}
          </span>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/15 text-amber-300 backdrop-blur-md border border-white/25 shadow-2xs shrink-0">
            +35 XP
          </span>
        </div>
      </div>

      {/* 2. CARD BODY & METADATA */}
      <div className="px-3 pt-2.5 pb-3 sm:px-3.5 sm:pt-2.5 sm:pb-3 flex-1 flex flex-col justify-between space-y-2 min-w-0 bg-white dark:bg-slate-900">
        <div>
          {/* Metadata Row: Category Focus (Left) & Exam Exercises (Right) */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1 min-w-0">
            <span className="truncate font-semibold text-slate-500 dark:text-slate-400 text-[11px]">
              {topic.focus}
            </span>
            <span className="font-mono tabular-nums shrink-0 whitespace-nowrap text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <ListChecks className="w-3 h-3 text-slate-400" />
              <span>5 câu thi</span>
            </span>
          </div>

          {/* Vietnamese Title */}
          <h3 className="text-[13.5px] font-bold font-sans line-clamp-1 leading-snug transition-colors text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
            {topic.name}
          </h3>
        </div>

        {/* 3. CARD FOOTER: Status Tag & Pill Action Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            {isCompleted ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Đã thuộc</span>
              </span>
            ) : isInProgress ? (
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Clock className="w-3 h-3 stroke-[2.5]" />
                <span>Đang học</span>
              </span>
            ) : (
              <span className="text-slate-400">Chưa bắt đầu</span>
            )}
          </span>

          <div className="h-8 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 select-none group/btn">
            <span>{isCompleted ? "Ôn Tập" : isInProgress ? "Tiếp Tục" : "Học Ngay"}</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function GrammarTopicCardShimmer() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none animate-pulse">
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-2.5 left-2.5 w-14 h-5 rounded-lg bg-slate-300 dark:bg-slate-700" />
        <div className="absolute top-2.5 right-2.5 w-16 h-5 rounded-lg bg-slate-300 dark:bg-slate-700" />
        <div className="absolute bottom-2.5 left-2.5 w-32 h-4 rounded-md bg-slate-300 dark:bg-slate-700" />
      </div>
      <div className="px-3 pt-2.5 pb-3 sm:px-3.5 sm:pt-2.5 sm:pb-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

