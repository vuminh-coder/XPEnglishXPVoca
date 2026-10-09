"use client";

import React, { use, Suspense } from "react";
import { VideoComprehensionStudioView } from "@/features/listening";
import { ShimmerBox } from "@/shared/components/feedback/ShimmerSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

function VideoComprehensionPageInner({ lessonId }: { lessonId: string }) {
  return (
    <VideoComprehensionStudioView
      lessonId={lessonId}
      onBackUrl={`/study/dictation/video?lessonId=${lessonId}`}
    />
  );
}

export default function VideoComprehensionRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams?.id || "";

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center">
          <ShimmerBox className="w-64 h-8 rounded-xl mb-4" />
          <ShimmerBox className="w-96 h-48 rounded-2xl" />
        </div>
      }
    >
      <VideoComprehensionPageInner lessonId={lessonId} />
    </Suspense>
  );
}
