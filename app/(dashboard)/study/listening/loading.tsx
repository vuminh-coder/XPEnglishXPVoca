"use client";

import React, { useState, useEffect } from "react";
import {
  ListeningListingSkeleton,
  ListeningStudioSkeleton,
} from "@/features/listening/components/LoadingSkeletons";

/**
 * Next.js loading.tsx — Thích ứng thông minh theo URL:
 * - Khi có ?id= hoặc ?lessonId=: Render ListeningStudioSkeleton (1:1 với Studio).
 * - Mặc định / listing: Render ListeningListingSkeleton.
 * - An toàn 100% với React 19 SSR Hydration.
 */
export default function ListeningLoading() {
  const [isStudio, setIsStudio] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const search = window.location.search;
    return search.includes("id=") || search.includes("lessonId=");
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      if (search.includes("id=") || search.includes("lessonId=")) {
        setIsStudio(true);
      }
    }
  }, []);

  if (isStudio) {
    return <ListeningStudioSkeleton />;
  }

  return <ListeningListingSkeleton />;
}
