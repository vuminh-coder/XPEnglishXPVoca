"use client";

import React, { Suspense } from "react";
import SentenceBuilderClient from "./SentenceBuilderClient";
import SentenceBuilderLoading from "./loading";

export default function SentenceBuilderPage() {
  return (
    <Suspense fallback={<SentenceBuilderLoading />}>
      <SentenceBuilderClient />
    </Suspense>
  );
}
