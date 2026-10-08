"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Headphones, Mic, FileText, BookText } from "lucide-react";
import { HeaderPillContainer, HeaderPillItem } from "../AppTopHeader";

export interface StudySuiteNavTabsProps {
  className?: string;
}

export function StudySuiteNavTabs({ className }: StudySuiteNavTabsProps) {
  const pathname = usePathname();

  const isPracticeActive =
    pathname === "/study/practice" || pathname?.startsWith("/study/practice/");
  const isDictationActive =
    pathname === "/study/dictation" ||
    pathname?.startsWith("/study/dictation/") ||
    pathname === "/study/listening" ||
    pathname?.startsWith("/study/listening/");
  const isShadowingActive =
    pathname === "/study/shadowing" || pathname?.startsWith("/study/shadowing/");
  const isReadingActive =
    pathname === "/study/reading" || pathname?.startsWith("/study/reading/");
  const isExamActive =
    pathname === "/study/exam-prep" ||
    pathname?.startsWith("/study/exam-prep/") ||
    pathname?.startsWith("/study/exams");

  return (
    <HeaderPillContainer className={className}>
      <HeaderPillItem
        active={isDictationActive}
        href="/study/dictation/audio"
        layoutId="studySuiteNavActiveTab"
        icon={<Headphones className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
        label="Dictation"
      />
      <HeaderPillItem
        active={isShadowingActive}
        href="/study/shadowing/audio"
        layoutId="studySuiteNavActiveTab"
        icon={<Mic className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />}
        label="Shadowing"
      />
      <HeaderPillItem
        active={isReadingActive}
        href="/study/reading"
        layoutId="studySuiteNavActiveTab"
        icon={<BookText className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />}
        label="Đọc hiểu"
      />
      <HeaderPillItem
        active={isPracticeActive}
        href="/study/practice"
        layoutId="studySuiteNavActiveTab"
        icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
        label="Luyện từ vựng"
      />
      <HeaderPillItem
        active={isExamActive}
        href="/study/exam-prep"
        layoutId="studySuiteNavActiveTab"
        icon={<FileText className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />}
        label="Thi thử đề"
      />
    </HeaderPillContainer>
  );
}

export default StudySuiteNavTabs;
