import React from "react";
import { ReadingListingSkeleton } from "@/features/reading/components/LoadingSkeletons";

/**
 * Next.js loading.tsx — hiển thị Listing skeleton mặc định khi tải route /study/reading.
 */
export default function ReadingLoading() {
  return <ReadingListingSkeleton />;
}
