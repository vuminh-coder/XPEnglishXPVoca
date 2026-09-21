"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Cpu, MessageSquare, BookMarked } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

export interface AiSuiteNavTabsProps {
  className?: string;
}

export function AiSuiteNavTabs({ className }: AiSuiteNavTabsProps) {
  const pathname = usePathname();

  const isHubActive = pathname === "/ai";
  const isTutorActive = pathname === "/ai/tutor" || pathname?.startsWith("/ai/tutor/");
  const isConversationActive =
    pathname === "/ai/conversation" || pathname?.startsWith("/ai/conversation/");
  const isGrammarActive =
    pathname === "/study/grammar" || pathname?.startsWith("/study/grammar/");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isHubActive}
        href="/ai"
        layoutId="aiSuiteNavActiveTab"
        icon={<Cpu className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />}
        label="Trung tâm AI"
      />
      <HeaderPillItem
        active={isTutorActive}
        href="/ai/tutor"
        layoutId="aiSuiteNavActiveTab"
        icon={<SpeakingIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
        label="Luyện nói"
      />
      <HeaderPillItem
        active={isConversationActive}
        href="/ai/conversation"
        layoutId="aiSuiteNavActiveTab"
        icon={<MessageSquare className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
        label="Hội thoại AI"
      />
      <HeaderPillItem
        active={isGrammarActive}
        href="/study/grammar"
        layoutId="aiSuiteNavActiveTab"
        icon={<BookMarked className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
        label="Ngữ pháp AI"
      />
    </HeaderPillContainer>
  );
}

export default AiSuiteNavTabs;
