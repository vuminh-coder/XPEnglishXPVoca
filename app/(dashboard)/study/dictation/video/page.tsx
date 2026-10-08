"use client";

import React, { Suspense } from "react";
import {
  DictationPageContent,
  DictationVideoSuspenseFallback,
} from "@/features/listening";

export default function DictationVideoPage() {
  return (
    <Suspense fallback={<DictationVideoSuspenseFallback />}>
      <DictationPageContent basePath="/study/dictation/video" initialMode="video" />
    </Suspense>
  );
}
