"use client";

import React, { Suspense } from "react";
import {
  ShadowingPageContent,
  ShadowingAudioSuspenseFallback,
} from "@/features/shadowing";

export default function ShadowingAudioPage() {
  return (
    <Suspense fallback={<ShadowingAudioSuspenseFallback />}>
      <ShadowingPageContent basePath="/study/shadowing/audio" initialMode="audio" />
    </Suspense>
  );
}
