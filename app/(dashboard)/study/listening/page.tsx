"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DictationPageContent,
  DictationSuspenseFallback,
} from "@/features/listening";

function ListeningRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const destination = qs ? `/study/dictation?${qs}` : "/study/dictation";
    router.replace(destination);
  }, [router, searchParams]);

  return <DictationPageContent basePath="/study/dictation" />;
}

export default function ListeningPage() {
  return (
    <Suspense fallback={<DictationSuspenseFallback />}>
      <ListeningRedirectHandler />
    </Suspense>
  );
}
