import React from "react";

// Helper pulse class
const pulseClass = "animate-pulse bg-slate-200 dark:bg-neutral-850 rounded-xl";

export function SkeletonCard() {
  return (
    <div className="bezel p-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-full">
      <div className="space-y-3 animate-pulse">
        <div className="h-5 w-2/3 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
        <div className="h-3 w-1/3 bg-slate-100 dark:bg-neutral-900 rounded-md" />
        <div className="space-y-2 pt-2">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-neutral-850 rounded-md" />
          <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-neutral-850 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* Upper stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bezel p-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-neutral-850" />
              <div className="w-12 h-4 rounded bg-slate-100 dark:bg-neutral-900" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-6 w-16 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
              <div className="h-3 w-24 bg-slate-100 dark:bg-neutral-900 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main sections grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bezel p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-64">
            <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-850 rounded-lg mb-4" />
            <div className="h-full w-full bg-slate-100/50 dark:bg-neutral-950/20 rounded-2xl" />
          </div>
        </div>
        <div className="bezel p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-[350px]">
          <div className="h-5 w-32 bg-slate-200 dark:bg-neutral-850 rounded-lg mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-neutral-850" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-1/2 bg-slate-200 dark:bg-neutral-850 rounded" />
                  <div className="h-3 w-1/3 bg-slate-100 dark:bg-neutral-900 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonVocabList() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
          <div className="h-3.5 w-32 bg-slate-100 dark:bg-neutral-900 rounded-md" />
        </div>
        <div className="w-24 h-8 rounded-full bg-slate-200 dark:bg-neutral-850" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bezel p-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-44 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-32 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-900" />
              </div>
              <div className="h-3.5 w-2/3 bg-slate-200 dark:bg-neutral-850 rounded-md" />
              <div className="h-3 w-5/6 bg-slate-100 dark:bg-neutral-900 rounded-md" />
            </div>
            <div className="h-8 bg-slate-50 dark:bg-neutral-950 rounded-xl mt-4 border border-slate-100 dark:border-neutral-850" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChat() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex gap-3 justify-start max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-neutral-850 shrink-0" />
        <div className="rounded-[20px] p-4 bg-slate-100 dark:bg-neutral-900 flex-1 space-y-2">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-neutral-850 rounded" />
          <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-neutral-850 rounded" />
        </div>
      </div>
      <div className="flex gap-3 justify-end max-w-[80%] ml-auto">
        <div className="rounded-[20px] p-4 bg-cyan-50 dark:bg-cyan-950/20 text-right flex-1 space-y-2">
          <div className="h-3.5 w-3/4 bg-cyan-200 dark:bg-cyan-900/40 rounded ml-auto" />
          <div className="h-3.5 w-1/2 bg-cyan-200 dark:bg-cyan-900/40 rounded ml-auto" />
        </div>
        <div className="w-8 h-8 rounded-full bg-cyan-400 dark:bg-cyan-800 shrink-0" />
      </div>
      <div className="flex gap-3 justify-start max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-neutral-850 shrink-0" />
        <div className="rounded-[20px] p-4 bg-slate-100 dark:bg-neutral-900 flex-1 space-y-2">
          <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-neutral-850 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonExercise() {
  return (
    <div className="space-y-6 max-w-lg mx-auto animate-pulse">
      <div className="bezel p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 h-56 flex flex-col justify-center items-center gap-4">
        <div className="h-4 w-24 bg-slate-100 dark:bg-neutral-900 rounded" />
        <div className="h-8 w-48 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
        <div className="h-4 w-32 bg-slate-100 dark:bg-neutral-900 rounded" />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bezel p-4 bg-slate-50 dark:bg-neutral-950 border border-slate-100 dark:border-neutral-850 h-14 flex items-center">
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-neutral-850 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
