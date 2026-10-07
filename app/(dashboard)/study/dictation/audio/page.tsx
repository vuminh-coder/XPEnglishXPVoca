"use client";

import React, { Suspense } from "react";
import {
  DictationPageContent,
  ListeningListingSkeleton,
} from "@/features/listening";

export default function DictationAudioPage() {
  return (
    <Suspense fallback={<ListeningListingSkeleton />}>
      <DictationPageContent basePath="/study/dictation/audio" initialMode="audio" />
    </Suspense>
  );
}
