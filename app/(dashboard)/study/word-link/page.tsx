"use client";

import React, { Suspense } from "react";
import WordLinkClient from "./WordLinkClient";
import WordLinkLoading from "./loading";

export default function WordLinkPage() {
  return (
    <Suspense fallback={<WordLinkLoading />}>
      <WordLinkClient />
    </Suspense>
  );
}
