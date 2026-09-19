"use client";

import React, { useState } from "react";
import {
  ListeningListingSkeleton,
  ListeningStudioSkeleton,
} from "@/features/listening/components/LoadingSkeletons";

/**
 * Next.js loading.tsx — Thích ứng thông minh theo URL:
 * - Khi có ?id= hoặc ?lessonId= (truy cập thẳng hoặc chuyển hướng vào bài học): Render ListeningStudioSkeleton (1:1 với Studio).
 * - Khi không có tham số id (vào danh mục bài học): Render ListeningListingSkeleton.
 */
export default function ListeningLoading() {
  const [isStudio] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      return search.includes("id=") || search.includes("lessonId=");
    }
    return false;
  });

  if (isStudio) {
    return <ListeningStudioSkeleton />;
  }

  return <ListeningListingSkeleton />;
}
