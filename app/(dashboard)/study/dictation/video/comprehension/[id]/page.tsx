"use client";

import React, { use, Suspense } from "react";
import {
  VideoComprehensionStudioView,
  VideoComprehensionStudioSkeleton,
} from "@/features/listening";

interface PageProps {
  params: Promise<{ id: string }>;
}

function VideoComprehensionPageInner({ lessonId }: { lessonId: string }) {
  return (
    <VideoComprehensionStudioView
      lessonId={lessonId}
      onBackUrl={`/study/dictation/video?id=${lessonId}`}
    />
  );
}

export default function VideoComprehensionCanonicalRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams?.id || "";

  return (
    <Suspense fallback={<VideoComprehensionStudioSkeleton />}>
      <VideoComprehensionPageInner lessonId={lessonId} />
    </Suspense>
  );
}
