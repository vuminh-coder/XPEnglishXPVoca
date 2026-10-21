"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Video, Headphones, Mic, ListOrdered } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface VideoSuiteNavTabsProps {
  className?: string;
}

export function VideoSuiteNavTabs({ className }: VideoSuiteNavTabsProps) {
  const pathname = usePathname();

  const isMyVideoActive =
    pathname === "/myvideo" || pathname?.startsWith("/myvideo/");
  const isDictationActive =
    pathname === "/study/dictation/video" || pathname?.startsWith("/study/dictation/video");
  const isShadowingActive =
    pathname === "/study/shadowing/video" || pathname?.startsWith("/study/shadowing/video");
  const isVocabActive =
    pathname === "/vocabulary" || pathname?.startsWith("/vocabulary/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isMyVideoActive}
        href="/myvideo"
        layoutId="videoSuiteNavActiveTab"
        icon={<Video className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Video của tôi"
      />
      <HeaderPillItem
        active={isDictationActive}
        href="/study/dictation/video"
        layoutId="videoSuiteNavActiveTab"
        icon={<Headphones className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
        label="Dictation"
      />
      <HeaderPillItem
        active={isShadowingActive}
        href="/study/shadowing/video"
        layoutId="videoSuiteNavActiveTab"
        icon={<Mic className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />}
        label="Shadowing"
      />
      <HeaderPillItem
        active={isVocabActive}
        href="/vocabulary"
        layoutId="videoSuiteNavActiveTab"
        icon={<ListOrdered className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
        label="Kho từ vựng"
      />
    </HeaderPillContainer>
  );
}

export default VideoSuiteNavTabs;
