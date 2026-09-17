"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ListOrdered, BookMarked, Zap, Video } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface VocabSuiteNavTabsProps {
  className?: string;
}

export function VocabSuiteNavTabs({ className }: VocabSuiteNavTabsProps) {
  const pathname = usePathname();

  const isVocabActive =
    pathname === "/vocabulary" ||
    (pathname?.startsWith("/vocabulary/") && !pathname?.startsWith("/vocabulary/themes"));
  const isMyVocabActive =
    pathname === "/myvocab" || pathname?.startsWith("/myvocab/");
  const isReviewActive =
    pathname === "/review" || pathname?.startsWith("/review/");
  const isMyVideoActive =
    pathname === "/myvideo" || pathname?.startsWith("/myvideo/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isVocabActive}
        href="/vocabulary"
        layoutId="vocabSuiteNavActiveTab"
        icon={<ListOrdered className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Danh sách từ"
      />
      <HeaderPillItem
        active={isMyVocabActive}
        href="/myvocab"
        layoutId="vocabSuiteNavActiveTab"
        icon={<BookMarked className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
        label="Sổ từ của tôi"
      />
      <HeaderPillItem
        active={isReviewActive}
        href="/review"
        layoutId="vocabSuiteNavActiveTab"
        icon={<Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />}
        label="Lịch ôn tập"
      />
      <HeaderPillItem
        active={isMyVideoActive}
        href="/myvideo"
        layoutId="vocabSuiteNavActiveTab"
        icon={<Video className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />}
        label="Video của tôi"
      />
    </HeaderPillContainer>
  );
}

export default VocabSuiteNavTabs;
