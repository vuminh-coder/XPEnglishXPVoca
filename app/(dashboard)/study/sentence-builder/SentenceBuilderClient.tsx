"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
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

      {/* 2. Ngữ cảnh bài học tinh gọn (Balanced width max-w-4xl / lg:max-w-5xl) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 pt-2 sm:pt-3">
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
          {unitParam && <span className="text-[#0059bb] dark:text-sky-400">Unit {unitParam}</span>}
          <span>· {displayTitle} · Chặng 3 · Ghép từ thành câu</span>
        </p>
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

