"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListeningListingSkeleton } from "@/features/listening";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

function DictationRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawId = searchParams.get("id") || searchParams.get("lessonId");
    if (rawId) {
      const isVideo =
        rawId === "122" ||
        rawId.startsWith("vid_") ||
        rawId.startsWith("yt_") ||
        rawId.startsWith("video_") ||
        MOCK_VIDEO_LESSONS.some(
          (v) => v.id === rawId || v.slug === rawId || v.externalId === rawId
        );
      if (isVideo) {
        router.replace(`/study/dictation/video?id=${rawId}`);
        return;
      }
      router.replace(`/study/dictation/audio?id=${rawId}`);
      return;
    }
    router.replace("/study/dictation/audio");
  }, [router, searchParams]);

  return <ListeningListingSkeleton />;
}

export default function DictationRoutePage() {
  return (
    <Suspense fallback={<ListeningListingSkeleton />}>
      <DictationRedirector />
    </Suspense>
  );
}
