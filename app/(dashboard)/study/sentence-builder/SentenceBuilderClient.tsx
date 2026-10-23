"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlignLeft, Sparkles } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { SentenceBuilderGame } from "@/features/games";
import { BASIC_VOCABULARIES, BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";

export default function SentenceBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || searchParams.get("themeId");
  const unitParam = searchParams.get("unit") || searchParams.get("unitNumber");

  // Find theme metadata
  const currentTheme = useMemo(() => {
    if (!themeParam) return null;
    return BASIC_VOCABULARY_THEMES.find((t) => t.id === themeParam) || null;
  }, [themeParam]);

  // Extract vocabulary pool matching this theme
  const themeVocabs = useMemo(() => {
    if (!themeParam) {
      return BASIC_VOCABULARIES.slice(0, 30);
    }
    const basicMatches = BASIC_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (basicMatches.length > 0) return basicMatches;

    const advMatches = ADVANCED_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (advMatches.length > 0) return advMatches;

    return BASIC_VOCABULARIES.slice(0, 30);
  }, [themeParam]);

  const displayTitle = currentTheme
    ? currentTheme.name
    : unitParam
    ? `Unit ${unitParam}`
    : "Chủ đề tự do";

  const themeIcon = currentTheme?.icon || "✍️";

  return (
    <div className="w-full min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP HEADER (56PX) */}
      <AppTopHeader
        showGamificationStats={true}
        hideMobileSearch={true}
        rightDesktopContent={
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Unit / Theme Pill */}
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <span className="text-sm">{themeIcon}</span>
              <span>
                {unitParam ? `Unit ${unitParam}: ` : ""}
                {displayTitle}
              </span>
            </span>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

            {/* Back to Roadmap CTA */}
            <Link
              href="/roadmap"
              className="h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-xs sm:text-sm font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              title="Quay lại Bản đồ Lộ trình"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              <span>Lộ trình</span>
            </Link>
          </div>
        }
        rightMobileContent={
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/roadmap"
              className="h-8 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-[11px] font-bold flex items-center gap-1 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Lộ trình</span>
            </Link>
          </div>
        }
      />

      {/* 2. SUB-BANNER / UNIT CONTEXT BAR */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-center shrink-0 shadow-2xs">
              <AlignLeft className="w-4 h-4 stroke-[2.2]" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Chặng 3: Ghép Từ Thành Câu
                </span>
                {unitParam && (
                  <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                    Unit {unitParam}
                  </span>
                )}
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {displayTitle}
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Chọn thẻ từ vựng bên dưới xếp thành câu hoàn chỉnh</span>
          </div>
        </div>
      </div>

      {/* 3. GAME ARENA WORKSPACE */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        <SentenceBuilderGame
          pool={themeVocabs}
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
        />
      </main>
    </div>
  );
}
