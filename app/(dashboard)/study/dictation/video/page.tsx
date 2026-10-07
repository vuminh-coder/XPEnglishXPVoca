"use client";

import React, { Suspense } from "react";
import {
  DictationPageContent,
  VideoListingSkeleton,
} from "@/features/listening";

export default function DictationVideoPage() {
  return (
    <Suspense fallback={<VideoListingSkeleton />}>
      <DictationPageContent basePath="/study/dictation/video" initialMode="video" />
    </Suspense>
  );
}
