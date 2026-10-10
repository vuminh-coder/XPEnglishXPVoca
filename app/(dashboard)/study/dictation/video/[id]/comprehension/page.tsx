"use client";

import React, { use, Suspense } from "react";
import {
  VideoComprehensionStudioView,
  VideoComprehensionStudioSkeleton,
} from "@/features/listening";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function VideoComprehensionDirectRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams?.id || "";

  return (
    <Suspense fallback={<VideoComprehensionStudioSkeleton />}>
      <VideoComprehensionStudioView
        lessonId={lessonId}
        onBackUrl={`/study/dictation/video?id=${lessonId}`}
      />
    </Suspense>
  );
}
