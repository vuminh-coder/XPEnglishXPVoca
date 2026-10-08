"use client";

import React, { Suspense } from "react";
import { ReadingCatalogView } from "./ReadingCatalogView";
import { ReadingListingSkeleton } from "./LoadingSkeletons";

export function ReadingStudioWorkspace() {
  return (
    <Suspense fallback={<ReadingListingSkeleton />}>
      <ReadingCatalogView />
    </Suspense>
  );
}

export default ReadingStudioWorkspace;
