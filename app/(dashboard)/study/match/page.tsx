"use client";

import React, { Suspense } from "react";
import MatchPairsClient from "./MatchPairsClient";

export default function MatchPairsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-2xl space-y-4">
            <div className="h-10 w-48 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-20 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <MatchPairsClient />
    </Suspense>
  );
}
