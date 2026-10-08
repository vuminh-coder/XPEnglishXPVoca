"use client";

import React, { Suspense } from "react";
import {
  ShadowingPageContent,
  ShadowingVideoSuspenseFallback,
} from "@/features/shadowing";

export default function ShadowingVideoPage() {
  return (
    <Suspense fallback={<ShadowingVideoSuspenseFallback />}>
      <ShadowingPageContent basePath="/study/shadowing/video" initialMode="video" />
    </Suspense>
  );
}
