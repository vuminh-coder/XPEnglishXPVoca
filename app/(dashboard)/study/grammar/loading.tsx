"use client";

import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

function TopicCardShimmerItem() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col overflow-hidden select-none">
      {/* 16:10 Aspect Ratio Visual Banner Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-2.5 left-2.5 w-14 h-5 rounded-lg bg-slate-300 dark:bg-slate-700" />
        <div className="absolute top-2.5 right-2.5 w-16 h-5 rounded-lg bg-slate-300 dark:bg-slate-700" />
        <div className="absolute bottom-2.5 left-2.5 w-32 h-4 rounded-md bg-slate-300 dark:bg-slate-700" />
      </div>
      {/* Body & Footer Skeleton */}
      <div className="px-3 pt-2.5 pb-3 sm:px-3.5 sm:pt-2.5 sm:pb-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

export default function GrammarCatalogLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      {/* Top Header Skeleton matching AiSuiteNavTabs */}
      <AppTopHeader
        hideMobileSearch={false}
        rightDesktopContent={
          <div className="h-9 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
        }
      >
        <HeaderPillContainer>
          <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-24 rounded-lg bg-[#0059bb]/20 dark:bg-sky-400/20" />
        </HeaderPillContainer>
      </AppTopHeader>

      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. Slim Title & Progress Tracker Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0059bb]/10 shrink-0" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-48 sm:w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-20 rounded-full bg-slate-100 dark:bg-slate-800 hidden xs:block" />
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto h-8 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-16 rounded bg-emerald-500/20" />
            <div className="w-20 sm:w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* 2. Toolbar Skeleton */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl">
            <div className="h-7 w-20 rounded-lg bg-white dark:bg-slate-800" />
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
            <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
            <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-20 rounded-xl bg-slate-100 dark:bg-slate-950 shrink-0" />
          </div>
        </div>

        {/* 3. 3 Curated Rows Skeleton matching ListeningListingView */}
        <div className="space-y-8">
          {/* Row 1: Basic A1-A2 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-16 rounded-md bg-blue-500/20" />
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {Array.from({ length: 8 }, (_, i) => (
                <TopicCardShimmerItem key={`b-${i}`} />
              ))}
            </div>
          </div>

          {/* Row 2: Intermediate B1-B2 */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-16 rounded-md bg-amber-500/20" />
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {Array.from({ length: 8 }, (_, i) => (
                <TopicCardShimmerItem key={`i-${i}`} />
              ))}
            </div>
          </div>

          {/* Row 3: Advanced C1-C2 */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-16 rounded-md bg-purple-500/20" />
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-7 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {Array.from({ length: 8 }, (_, i) => (
                <TopicCardShimmerItem key={`a-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

