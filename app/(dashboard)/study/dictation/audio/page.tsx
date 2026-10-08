"use client";

import React, { Suspense } from "react";
import {
  DictationPageContent,
  DictationAudioSuspenseFallback,
} from "@/features/listening";

export default function DictationAudioPage() {
  return (
    <Suspense fallback={<DictationAudioSuspenseFallback />}>
      <DictationPageContent basePath="/study/dictation/audio" initialMode="audio" />
    </Suspense>
  );
}
