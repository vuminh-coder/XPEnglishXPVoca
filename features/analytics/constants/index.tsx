import React from "react";
import { Headphones, Mic, BookOpen, Wand2 } from "lucide-react";
import { SkillMode, SkillThemeConfig } from "../types";

export const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
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

export const SKILL_THEMES: Record<SkillMode, SkillThemeConfig> = {
  Dictation: {
    label: "Dictation",
    color: "#0059bb",
    gradientId: "dictationAnalyticsGradient",
    Icon: Headphones,
  },
  Shadowing: {
    label: "Shadowing",
    color: "#8b5cf6",
    gradientId: "shadowingAnalyticsGradient",
    Icon: Mic,
  },
  "Nói": {
    label: "Nói (AI)",
    color: "#10b981",
    gradientId: "speakingAnalyticsGradient",
    Icon: SpeakingIcon,
  },
  "Từ vựng": {
    label: "Từ vựng",
    color: "#f59e0b",
    gradientId: "vocabAnalyticsGradient",
    Icon: BookOpen,
  },
  "Viết": {
    label: "Viết (AI)",
    color: "#ec4899",
    gradientId: "writingAnalyticsGradient",
    Icon: Wand2,
  },
};
