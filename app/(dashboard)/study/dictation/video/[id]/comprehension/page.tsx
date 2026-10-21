"use client";

import React, { use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  VideoComprehensionStudioView,
  VideoComprehensionStudioSkeleton,
} from "@/features/listening";

interface PageProps {
  params: Promise<{ id: string }>;
}

function VideoComprehensionDirectInner({ lessonId }: { lessonId: string }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const onBackUrl = from === "shadowing"
    ? `/study/shadowing/video?id=${lessonId}`
    : `/study/dictation/video?id=${lessonId}`;

  return (
    <VideoComprehensionStudioView
      lessonId={lessonId}
      onBackUrl={onBackUrl}
    />
  );
}

export default function VideoComprehensionDirectRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams?.id || "";

  return (
    <Suspense fallback={<VideoComprehensionStudioSkeleton />}>
      <VideoComprehensionDirectInner lessonId={lessonId} />
    </Suspense>
  );
}
