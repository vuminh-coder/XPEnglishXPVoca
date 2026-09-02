"use client";

import React from "react";

interface FormattedAiTextProps {
  content: string;
  className?: string;
}

/**
 * Parses inline markdown (*highlight*, **bold**, `code`, "quotes") into React nodes
 * Strictly NO italic styling — uses normal font-style with high-contrast font-weight or pill background.
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Split by bold (**text**), single-asterisk / quotes highlight (*text*), code (`text`), or "quoted text"
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|"[^"]+")/g);

  return parts.map((part, index) => {
    // 1. Double Asterisk: **Bold Heading / Term**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={index}
          className="font-bold text-[#0059bb] dark:text-sky-400 not-italic"
        >
          {inner}
        </strong>
      );
    }

    // 2. Single Asterisk: *Term / Example* -> Styled in clean non-italic pill
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <span
          key={index}
          className="not-italic font-semibold text-slate-900 dark:text-slate-100 bg-slate-200/70 dark:bg-slate-800/90 px-1.5 py-0.5 rounded-md mx-0.5 border border-slate-300/60 dark:border-slate-700/60"
        >
          {inner}
        </span>
      );
    }

    // 3. Inline Code: `code` -> Clean mono pill
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="not-italic px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-mono text-[11px] font-bold border border-blue-200/60 dark:border-blue-800/60"
        >
          {inner}
        </code>
      );
    }

    // 4. Double Quotes: "English Example Sentence" -> Crisp highlight
    if (part.startsWith('"') && part.endsWith('"') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <span
          key={index}
          className="not-italic font-semibold text-[#0059bb] dark:text-sky-300 bg-blue-50/60 dark:bg-blue-950/40 px-1.5 py-0.5 rounded-md border border-blue-200/40 dark:border-blue-800/40"
        >
          &ldquo;{inner}&rdquo;
        </span>
      );
    }

    return <span key={index} className="not-italic">{part}</span>;
  });
}

/**
 * FormattedAiText: Renders AI Tutor responses cleanly without raw markdown symbols (*, **, `).
 * Strict adherence to: NO ITALICS, 60-30-10 color scheme, high scannability.
 */
export const FormattedAiText: React.FC<FormattedAiTextProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className={`space-y-2 text-xs sm:text-sm leading-relaxed not-italic select-text ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-0.5" />;
        }

        // 1. Numbered Section Headers (1. / 2. / 3.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          const number = numberedMatch[1];
          const text = numberedMatch[2];
          return (
            <div
              key={idx}
              className="flex items-start gap-2.5 pt-1.5 pb-0.5 font-medium not-italic"
            >
              <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-[#0059bb]/10 dark:bg-blue-500/20 text-[#0059bb] dark:text-sky-400 font-mono font-black text-xs border border-[#0059bb]/20 dark:border-blue-500/30 shadow-2xs">
                {number}
              </span>
              <div className="flex-1 text-slate-900 dark:text-white font-bold leading-tight pt-0.5 not-italic">
                {parseInlineMarkdown(text)}
              </div>
            </div>
          );
        }

        // 2. Bullet Point Lines (- or * or •)
        if (
          trimmed.startsWith("- ") ||
          trimmed.startsWith("* ") ||
          trimmed.startsWith("• ")
        ) {
          const bulletText = trimmed.replace(/^[-*•]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-3 not-italic">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb] dark:bg-sky-400 mt-2 shrink-0" />
              <div className="flex-1 text-slate-700 dark:text-slate-200 leading-normal not-italic">
                {parseInlineMarkdown(bulletText)}
              </div>
            </div>
          );
        }

        // 3. Subheaders (### or ##)
        if (trimmed.startsWith("###") || trimmed.startsWith("##")) {
          const headerText = trimmed.replace(/^#+\s*/, "");
          return (
            <h4
              key={idx}
              className="font-bold text-slate-900 dark:text-white pt-2 text-xs sm:text-sm tracking-tight not-italic"
            >
              {parseInlineMarkdown(headerText)}
            </h4>
          );
        }

        // 4. Standard Paragraph
        return (
          <p
            key={idx}
            className="text-slate-700 dark:text-slate-300 leading-normal not-italic"
          >
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};

export default FormattedAiText;
