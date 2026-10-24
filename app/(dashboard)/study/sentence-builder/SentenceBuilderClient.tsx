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


