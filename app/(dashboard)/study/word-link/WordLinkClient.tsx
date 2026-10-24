"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WordLinkGame } from "@/features/games";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";

export default function WordLinkClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || searchParams.get("themeId");

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

  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* GAME ARENA WORKSPACE (Full single viewport fold, no AppTopHeader) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-3 sm:py-5">
        <WordLinkGame
          pool={themeVocabs}
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
        />
      </div>
    </div>
  );
}
