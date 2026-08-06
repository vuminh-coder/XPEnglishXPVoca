import React from "react";

// Helper pulse class - Micro-Sharp UI standard (rounded-xs)
const pulseClass = "animate-pulse bg-slate-200 dark:bg-neutral-850 rounded-xs";

export function SkeletonCard() {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-full">
      <div className="space-y-3 animate-pulse">
        <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        <div className="h-3 w-1/3 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
        <div className="space-y-2 pt-2">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-xs" />
          <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-xs" />
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
          <div key={i} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
              <div className="w-12 h-4 rounded-xs bg-slate-100 dark:bg-slate-800/60" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-xs" />
              <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
            </div>
          </div>
        ))}
      </div>

      {/* Main sections grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-64">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded-xs mb-4" />
            <div className="h-full w-full bg-slate-100/50 dark:bg-slate-950/20 rounded-xs" />
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-[350px]">
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-xs mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                  <div className="h-3 w-1/3 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
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
          <div className="h-7 w-48 bg-slate-200 dark:bg-slate-800 rounded-xs" />
          <div className="h-3.5 w-32 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
        </div>
        <div className="w-24 h-8 rounded-xs bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-44 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="h-3.5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xs" />
              <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
            </div>
            <div className="h-8 bg-slate-50 dark:bg-slate-950 rounded-xs mt-4 border border-slate-100 dark:border-slate-800" />
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
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        <div className="rounded-xs p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex-1 space-y-2">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-xs" />
          <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        </div>
      </div>
      <div className="flex gap-3 justify-end max-w-[80%] ml-auto">
        <div className="rounded-xs p-4 bg-[#0059bb]/10 dark:bg-[#0059bb]/20 border border-[#0059bb]/20 text-right flex-1 space-y-2">
          <div className="h-3.5 w-3/4 bg-[#0059bb]/30 dark:bg-sky-900/40 rounded-xs ml-auto" />
          <div className="h-3.5 w-1/2 bg-[#0059bb]/30 dark:bg-sky-900/40 rounded-xs ml-auto" />
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0059bb] shrink-0 opacity-80" />
      </div>
      <div className="flex gap-3 justify-start max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        <div className="rounded-xs p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex-1 space-y-2">
          <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonExercise() {
  return (
    <div className="space-y-6 max-w-lg mx-auto animate-pulse">
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-xs shadow-2xs h-56 flex flex-col justify-center items-center gap-4">
        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xs" />
        <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xs h-14 flex items-center">
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  );
}
