"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShadowingAudioListingSkeleton } from "@/features/shadowing";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

function ShadowingRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawId = searchParams.get("id") || searchParams.get("lessonId");
    const params = new URLSearchParams(searchParams.toString());
    if (rawId) {
      params.set("id", rawId);
      const isVideo =
        rawId.startsWith("vid_") ||
        rawId.startsWith("yt_") ||
        rawId.startsWith("video_") ||
        MOCK_VIDEO_LESSONS.some(
          (v) => v.id === rawId || v.slug === rawId || v.externalId === rawId
        );
      if (isVideo) {
        router.replace(`/study/shadowing/video?${params.toString()}`);
        return;
      }
      router.replace(`/study/shadowing/audio?${params.toString()}`);
      return;
    }
    const queryStr = params.toString();
    router.replace(queryStr ? `/study/shadowing/audio?${queryStr}` : "/study/shadowing/audio");
  }, [router, searchParams]);

  return <ShadowingAudioListingSkeleton />;
}

export default function ShadowingRoutePage() {
  return (
    <Suspense fallback={<ShadowingAudioListingSkeleton />}>
      <ShadowingRedirector />
    </Suspense>
  );
}
