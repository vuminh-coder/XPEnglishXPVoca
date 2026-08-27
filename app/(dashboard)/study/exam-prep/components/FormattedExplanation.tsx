"use client";

import React from "react";

interface FormattedExplanationProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting: **bold**, `code`, IPA phonetics, *"quotes"*, and *italic*
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match **bold**, `code`, *"quotes"*, IPA phonetics like (/.../), and *italic*
  const regex = /(\*\*.*?\*\*|`.*?`|\*".*?"\*|\(\/[^)]+\/\)|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={index}
          className="font-bold text-slate-950 dark:text-white font-sans"
        >
          {parseInlineFormatting(inner)}
        </strong>
      );
    }

    // Code / Highlighted keyword: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded-xs bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 font-mono text-[11px] sm:text-xs font-semibold border border-amber-300/80 dark:border-amber-700/50 select-text inline align-baseline"
        >
          {inner}
        </code>
      );
    }

    // Phonetic transcription: (/.../) -> keep strictly on the same line without breaking
    if (part.startsWith("(/") && part.endsWith("/)")) {
      return (
        <span
          key={index}
          className="whitespace-nowrap text-slate-600 dark:text-slate-400 font-sans text-[11.5px] sm:text-xs ml-1"
        >
          {part}
        </span>
      );
    }

    // Highlighted quotes: *"text"*
    if (part.startsWith('*"') && part.endsWith('"*') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <span
          key={index}
          className="text-slate-800 dark:text-slate-200 font-medium px-1 bg-amber-100/50 dark:bg-amber-950/40 rounded-xs border border-amber-200/60 dark:border-amber-900/30 inline"
        >
          &ldquo;{inner}&rdquo;
        </span>
      );
    }

    // Emphasized: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <span
          key={index}
          className="text-slate-800 dark:text-slate-200 font-medium"
        >
          {inner}
        </span>
      );
    }

    // Plain text
    return <span key={index}>{part}</span>;
  });
}

export function FormattedExplanation({
  content,
  className = "",
}: FormattedExplanationProps) {
  if (!content) return null;

  // Split into lines
  const lines = content.split("\n");

  return (
    <div
      className={`space-y-2 text-xs sm:text-[13.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans select-text ${className}`}
    >
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();

        // Empty line - add clean breathing room
        if (!line) {
          return <div key={idx} className="h-1" />;
        }

        // Dedicated Quote Line: starts with `*"` or `"` and ends with `"*` or `"`
        const isQuoteLine =
          (line.startsWith('*"') && line.endsWith('"*')) ||
          (line.startsWith('"') && line.endsWith('"'));

        if (isQuoteLine) {
          const cleanQuote = line.replace(/^\*?"|"\*?$/g, "");
          return (
            <div
              key={idx}
              className="my-1.5 pl-3 py-1.5 border-l-2 border-amber-400 bg-white/70 dark:bg-slate-900/70 rounded-r-xs text-xs sm:text-[13px] text-slate-900 dark:text-slate-100 font-medium shadow-2xs leading-relaxed"
            >
              &ldquo;{cleanQuote}&rdquo;
            </div>
          );
        }

        // Section standalone header with emoji or brackets (e.g. 🗣️ **Kỹ thuật...**, 🔍 **Dịch nghĩa...**)
        // Only treat as standalone header if the line is relatively short (under 80 chars) and ends with `:` or `**`
        const isStandaloneHeader =
          /^(🎯|🗣️|🔍|💡|⚡|📚|📝|✅|⚠️)\s*(.*)(:\s*|\*\*\s*)$/.test(line) ||
          /^\[.*\]$/.test(line);

        if (isStandaloneHeader) {
          return (
            <div
              key={idx}
              className="mt-3 first:mt-0 pt-2 first:pt-0 border-t border-amber-200/60 dark:border-white/10 first:border-0 text-xs sm:text-[13px] font-bold text-slate-950 dark:text-white leading-snug"
            >
              {parseInlineFormatting(line)}
            </div>
          );
        }

        // Bullet point line starting with `- ` or `• `
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const textWithoutBullet = line.replace(/^[-•]\s*/, "");
          return (
            <div
              key={idx}
              className="flex items-start gap-2 pl-2 sm:pl-2.5 py-0.5 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0 mt-2" />
              <div className="flex-1 min-w-0">
                {parseInlineFormatting(textWithoutBullet)}
              </div>
            </div>
          );
        }

        // Numbered list item: `1. `, `2. `, etc.
        if (/^\d+\.\s+/.test(line)) {
          const numMatch = line.match(/^(\d+\.)\s+(.*)/);
          if (numMatch) {
            return (
              <div
                key={idx}
                className="flex items-start gap-2 pl-2 sm:pl-2.5 py-0.5 leading-relaxed"
              >
                <span className="font-bold text-amber-700 dark:text-amber-300 shrink-0 text-xs mt-0.5">
                  {numMatch[1]}
                </span>
                <div className="flex-1 min-w-0">
                  {parseInlineFormatting(numMatch[2])}
                </div>
              </div>
            );
          }
        }

        // Standard paragraph line (including lines like 🎯 **Mục tiêu điểm số:** Nội dung...)
        return (
          <p key={idx} className="leading-relaxed">
            {parseInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}
