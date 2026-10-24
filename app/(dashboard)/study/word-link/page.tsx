"use client";

import React, { Suspense } from "react";
import WordLinkClient from "./WordLinkClient";

export default function WordLinkPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#0059bb]/30 border-t-[#0059bb] rounded-full animate-spin" />
        </div>
      }
    >
      <WordLinkClient />
    </Suspense>
  );
}
