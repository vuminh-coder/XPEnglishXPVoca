import React, { Suspense } from "react";
import { AdaptiveExamPrepSkeleton, ExamHubSkeleton } from "@/features/exam-prep";

export default function ExamPrepLoading() {
  return (
    <Suspense fallback={<ExamHubSkeleton />}>
      <AdaptiveExamPrepSkeleton />
    </Suspense>
  );
}

