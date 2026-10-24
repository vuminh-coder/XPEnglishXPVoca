"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { SentenceBuilderGame } from "@/features/games";
import { BASIC_VOCABULARIES, BASIC_VOCABULARY_THEMES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import { UNIT_CURRICULUM_CONFIGS } from "@/features/roadmap/data/curatedRoadmapPathway";

export default function SentenceBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || searchParams.get("themeId");
  const unitParam = searchParams.get("unit") || searchParams.get("unitNumber");

  // Find curriculum config matching unit number or theme ID
  const curriculum = useMemo(() => {
    if (unitParam) {
      const byNum = UNIT_CURRICULUM_CONFIGS.find((c) => String(c.unitNumber) === String(unitParam));
      if (byNum) return byNum;
    }
    if (themeParam) {
      const byTheme = UNIT_CURRICULUM_CONFIGS.find((c) => c.themeId === themeParam);
      if (byTheme) return byTheme;
    }
    return null;
  }, [unitParam, themeParam]);

  // Find theme metadata fallback
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

  const unitNumber = curriculum?.unitNumber ?? (unitParam ? Number(unitParam) : 1);
  const displayTitle = curriculum?.title ?? currentTheme?.name ?? "Luyện tập ghép câu";
  const themeIcon = curriculum?.themeIcon ?? currentTheme?.icon ?? "✍️";

  return (
    <div className="w-full min-h-[calc(100dvh-56px)] flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none">
      {/* 1. TOP HEADER (56PX) */}
      <AppTopHeader
        showGamificationStats={true}
        hideMobileSearch={true}
        rightDesktopContent={
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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

      {/* 2. Ngữ cảnh bài học tinh tế, chuẩn phong cách XP English */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 pt-2.5 sm:pt-3">
        <div className="flex items-center justify-between gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-sky-50/40 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-blue-100/90 dark:border-slate-800 shadow-2xs">
          {/* Left: Unit Amber Badge + Theme Emoji + Title */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-2xs">
              Unit {unitNumber}
            </span>
            <span className="text-base sm:text-lg leading-none shrink-0" aria-hidden>
              {themeIcon}
            </span>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-black font-display text-slate-800 dark:text-slate-100 truncate">
                {displayTitle}
              </h1>
            </div>
          </div>

          {/* Right: Stage Badge Pill */}
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-[#0059bb] dark:text-sky-400 text-[11px] sm:text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">Chặng 3 ·</span>
            <span className="font-extrabold">Ghép câu</span>
          </div>
        </div>
      </div>

      {/* 3. GAME ARENA WORKSPACE (Flex-1, fit screen, moderate margins) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-2 sm:py-3">
        <SentenceBuilderGame
          pool={themeVocabs}
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
          fullWidth
        />
      </div>
    </div>
  );
}

