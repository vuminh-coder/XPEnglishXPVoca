"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { WordLinkGame } from "@/features/games";
import { BASIC_VOCABULARIES, BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";

export default function WordLinkClient() {
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

  const themeIcon = currentTheme?.icon || "🔗";

  return (
    <div className="w-full pb-16 md:pb-8 bg-slate-50/70 dark:bg-slate-950 font-sans select-none">
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

      {/* 2. UNIT BANNER (đồng bộ ZiczacUnitHeader của Roadmap) */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-0 mt-5 sm:mt-6">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0059bb] border-b-4 border-[#003d82] text-white shadow-lg flex items-stretch overflow-hidden">
          <div className="flex-1 min-w-0 px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col justify-center gap-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              {unitParam && (
                <span className="inline-flex items-center px-3 py-1 rounded-xl bg-amber-300 text-amber-950 text-xs font-black tracking-wider uppercase shadow-xs">
                  Unit {unitParam}
                </span>
              )}
              <h1 className="text-base sm:text-xl font-black font-display leading-tight truncate">
                {displayTitle}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-medium line-clamp-1">
              Chặng 2 · Nối từ Anh - Việt
            </p>
          </div>
          <div className="w-[84px] sm:w-[104px] bg-white/10 flex flex-col items-center justify-center gap-0.5 text-center">
            <span className="text-3xl sm:text-4xl leading-none" aria-hidden>{themeIcon}</span>
            <span className="text-[10px] sm:text-[11px] font-bold font-display uppercase tracking-wider">Word Link</span>
          </div>
        </div>
      </div>

      {/* 3. GAME ARENA WORKSPACE */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-0 py-5 sm:py-6">
        <WordLinkGame
          pool={themeVocabs}
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
        />
      </div>
    </div>
  );
}
