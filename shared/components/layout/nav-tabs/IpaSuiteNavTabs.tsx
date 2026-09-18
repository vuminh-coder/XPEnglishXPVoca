"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Volume2, Mic, Swords } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface IpaSuiteNavTabsProps {
  className?: string;
}

export function IpaSuiteNavTabs({ className }: IpaSuiteNavTabsProps) {
  const pathname = usePathname();

  const isMatrixActive = pathname === "/study/ipa";
  const isPracticeActive =
    pathname === "/study/ipa/practice" || pathname?.startsWith("/study/ipa/practice/");
  const isPairsActive =
    pathname === "/study/ipa/minimal-pairs" || pathname?.startsWith("/study/ipa/minimal-pairs/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isMatrixActive}
        href="/study/ipa"
        layoutId="ipaSuiteNavActiveTab"
        icon={<Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Bảng 44 Âm"
      />
      <HeaderPillItem
        active={isPracticeActive}
        href="/study/ipa/practice"
        layoutId="ipaSuiteNavActiveTab"
        icon={<Mic className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />}
        label="Luyện Âm AI"
      />
      <HeaderPillItem
        active={isPairsActive}
        href="/study/ipa/minimal-pairs"
        layoutId="ipaSuiteNavActiveTab"
        icon={<Swords className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />}
        label="Đấu Trường Cặp Âm"
      />
    </HeaderPillContainer>
  );
}

export default IpaSuiteNavTabs;
