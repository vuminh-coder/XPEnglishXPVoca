"use client";
import React from "react";
import { AppTopHeader, HeaderPillContainer } from "@/shared/components/layout/AppTopHeader";

export default function GrammarLoading() {
  return (
    <div className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans animate-pulse">
      {/* Top Header Skeleton */}
      <AppTopHeader
        rightDesktopContent={
          <div className="h-9 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
        }
      >
        <HeaderPillContainer>
          <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </HeaderPillContainer>
      </AppTopHeader>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 space-y-4 pt-1">
        {/* 1. Hero Compact Banner Skeleton */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 dark:bg-blue-500/10 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-5 w-48 sm:w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-64 sm:w-96 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 w-24 h-12"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Search Box Skeleton */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="h-9 w-full rounded-xl bg-slate-100 dark:bg-slate-800/60" />
        </div>

        {/* 3. Topics Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between h-44"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20" />
                  <div className="h-4 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-4 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-full rounded-md bg-slate-100 dark:bg-slate-800/60" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
