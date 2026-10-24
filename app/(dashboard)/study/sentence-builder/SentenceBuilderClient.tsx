"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SentenceBuilderGame } from "@/features/games";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import {
  partitionVocabularyPool,
  buildPartitionUrl,
} from "@/features/vocabulary/utils/vocabularyPartition";

export default function SentenceBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || searchParams.get("themeId");
  const unitParam = searchParams.get("unit");
  const partParam = searchParams.get("part");
  const totalPartsParam = searchParams.get("totalParts");

  // Extract vocabulary pool matching this theme
  const rawThemeVocabs = useMemo(() => {
    if (!themeParam) {
      return BASIC_VOCABULARIES.slice(0, 30);
    }
    const basicMatches = BASIC_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (basicMatches.length > 0) return basicMatches;

    const advMatches = ADVANCED_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (advMatches.length > 0) return advMatches;

    return BASIC_VOCABULARIES.slice(0, 30);
  }, [themeParam]);

  // Partition vocabulary pool according to partParam
  const partitionResult = useMemo(() => {
    return partitionVocabularyPool(rawThemeVocabs, {
      part: partParam,
      totalParts: totalPartsParam,
    });
  }, [rawThemeVocabs, partParam, totalPartsParam]);

  const handleSelectPart = (targetPart: number) => {
    const nextUrl = buildPartitionUrl(
      "/study/sentence-builder",
      {
        theme: themeParam || undefined,
        unit: unitParam || undefined,
        totalParts: totalPartsParam || undefined,
      },
      targetPart
    );
    router.push(nextUrl);
  };

  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* GAME ARENA WORKSPACE (Full single viewport fold, matching container max-width & margins) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-3 sm:py-5">
        {/* Quick Part Switcher if multiple parts exist */}
        {partitionResult.totalParts > 1 && (
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Chủ đề: {partitionResult.totalThemeWords} từ
            </span>
            <div className="flex items-center gap-1.5">
              {partitionResult.partRanges.map((pr) => {
                const isActive = pr.part === partitionResult.currentPart;
                return (
                  <button
                    key={pr.part}
                    type="button"
                    onClick={() => handleSelectPart(pr.part)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold font-display transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0059bb] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    Phần {pr.part} ({pr.count} từ)
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <SentenceBuilderGame
          pool={partitionResult.items}
          themeId={themeParam || undefined}
          unitNumber={unitParam ? parseInt(unitParam, 10) : undefined}
          currentPart={partitionResult.currentPart}
          totalParts={partitionResult.totalParts}
          onNextPart={
            partitionResult.hasNextPart
              ? () => handleSelectPart(partitionResult.nextPartNumber!)
              : undefined
          }
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
          fullWidth
        />
      </div>
    </div>
  );
}


