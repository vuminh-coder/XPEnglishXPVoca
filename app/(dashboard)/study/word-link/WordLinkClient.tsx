"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WordLinkGame } from "@/features/games";
import {
  resolveActiveRoadmapContext,
  getPureThemeVocabularyPool,
} from "@/features/roadmap";
import {
  partitionVocabularyPool,
  buildPartitionUrl,
} from "@/features/vocabulary/utils/vocabularyPartition";

export default function WordLinkClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const themeParam = searchParams.get("theme") || searchParams.get("themeId");
  const unitParam = searchParams.get("unit");
  const partParam = searchParams.get("part");
  const totalPartsParam = searchParams.get("totalParts");

  // Resolve active Roadmap Unit/Theme/Part (supports both explicit URL params and direct Sidebar navigation)
  const resolvedContext = useMemo(
    () =>
      resolveActiveRoadmapContext({
        themeId: themeParam,
        unit: unitParam,
        part: partParam,
        totalParts: totalPartsParam,
        skillType: "MATCH",
      }),
    [themeParam, unitParam, partParam, totalPartsParam]
  );

  // Extract pure vocabulary pool matching the resolved theme (identical to Practice & Sentence Builder)
  const rawThemeVocabs = useMemo(() => {
    return getPureThemeVocabularyPool(resolvedContext.themeId);
  }, [resolvedContext.themeId]);

  // Partition vocabulary pool according to resolved part and totalParts
  const partitionResult = useMemo(() => {
    return partitionVocabularyPool(rawThemeVocabs, {
      part: resolvedContext.part,
      totalParts: resolvedContext.totalParts,
    });
  }, [rawThemeVocabs, resolvedContext.part, resolvedContext.totalParts]);

  const handleSelectPart = (targetPart: number) => {
    const nextUrl = buildPartitionUrl(
      "/study/word-link",
      {
        theme: resolvedContext.themeId,
        unit: resolvedContext.unitNumber,
        totalParts: resolvedContext.totalParts,
      },
      targetPart
    );
    router.push(nextUrl);
  };

  return (
    <div className="w-full min-h-dvh h-dvh flex flex-col justify-between bg-[#fffefb] dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* GAME ARENA WORKSPACE (Full single viewport fold, matching container max-width & margins) */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-3 sm:py-5">
        <WordLinkGame
          pool={partitionResult.items}
          themeId={resolvedContext.themeId}
          unitNumber={resolvedContext.unitNumber}
          currentPart={partitionResult.currentPart}
          totalParts={partitionResult.totalParts}
          onNextPart={
            partitionResult.hasNextPart
              ? () => handleSelectPart(partitionResult.nextPartNumber!)
              : undefined
          }
          onBack={() => router.push("/roadmap")}
          backLabel="Tiếp tục Lộ trình"
        />
      </div>
    </div>
  );
}
