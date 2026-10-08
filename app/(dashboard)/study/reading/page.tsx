"use client";

import React, { Suspense } from "react";
import { ReadingCatalogView, ReadingListingSkeleton } from "@/features/reading";

export default function ReadingCatalogPage() {
  return (
    <Suspense fallback={<ReadingListingSkeleton />}>
      <ReadingCatalogView />
    </Suspense>
  );
}
