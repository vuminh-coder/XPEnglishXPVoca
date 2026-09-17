"use client";

import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

export default function GrammarCatalogLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      {/* Top Header Skeleton matching AiSuiteNavTabs */}
      <AppTopHeader
        rightDesktopContent={
          <div className="h-9 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
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
        {/* 1. Hero 5 Bento Metric Cards Skeleton */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#0059bb]/10 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-5 w-52 sm:w-72 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-64 sm:w-96 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
            <div className="h-8 w-36 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 h-16 flex items-center justify-between"
              >
                <div className="space-y-1.5">
                  <div className="h-2.5 w-14 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Toolbar Skeleton */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl">
            <div className="h-7 w-20 rounded-lg bg-white dark:bg-slate-800" />
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
            <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-800/60" />
          </div>
          <div className="h-9 w-full md:max-w-md rounded-xl bg-slate-100 dark:bg-slate-950" />
        </div>

        {/* 3. Topics Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between h-48"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20" />
                  <div className="h-5 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-4 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800/60" />
                  <div className="h-3 w-full rounded-md bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
