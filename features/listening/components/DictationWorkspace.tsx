"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Volume2,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  HelpCircle,
  Keyboard,
  ArrowRight,
  X,
  Zap,
  Languages,
} from "lucide-react";
import { useUiStore } from "@/stores/uiStore";

export interface WordToken {
  id: string;
  original: string;
  clean: string;
  leadingPunc: string;
  trailingPunc: string;
  length: number;
  dots: string;
  isProperNoun: boolean;
  status: "masked" | "first-letter" | "revealed" | "matched";
}

interface DictationWorkspaceProps {
  sentenceText: string;
  sentenceId: string | number;
  translation?: string;
  ipa?: string;
  onWordMatched?: (word: string, index: number) => void;
  onSentenceCompleted?: () => void;
  onPlayAudio?: () => void;
  onWordClick?: (word: string) => void;
  isActive?: boolean;
  customProperNouns?: string[];
  showTranslationByDefault?: boolean;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  fontSizeLevel?: number;
  hideTranslation?: boolean;
  isSidebarCollapsed?: boolean;
}

// Well-known proper nouns, months, days for robust extraction
const COMMON_PROPER_NOUNS = new Set([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december",
  "ali", "sarah", "john", "mary", "david", "emma", "alex", "michael",
  "london", "tokyo", "paris", "new york", "vietnam", "hanoi", "saigon",
  "english", "vietnamese", "american", "british", "french", "japanese",
]);

/**
 * Extracts proper nouns from an English sentence
 */
export function extractProperNouns(sentence: string, customList?: string[]): string[] {
  if (customList && customList.length > 0) return customList;
  if (!sentence) return [];

  const words = sentence.trim().split(/\s+/);
  const properNouns = new Set<string>();

  words.forEach((w, idx) => {
    const clean = w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
    if (!clean) return;

    // Skip standalone 'I'
    if (clean === "I") return;

    // Words starting with uppercase that are NOT the first word of sentence
    const isCapitalized = /^[A-Z][a-zA-Z0-9]*$/.test(clean);
    const isKnownProper = COMMON_PROPER_NOUNS.has(clean.toLowerCase());

    if ((isCapitalized && idx > 0) || isKnownProper) {
      properNouns.add(clean);
    }
  });

  return Array.from(properNouns);
}

/**
 * Tokenizes sentence text into individual interactive word tokens
 */
export function tokenizeSentence(sentence: string, properNouns: string[]): WordToken[] {
  if (!sentence) return [];
  const rawWords = sentence.trim().split(/\s+/);
  const properNounSet = new Set(properNouns.map((p) => p.toLowerCase()));

  return rawWords.map((rawWord, idx) => {
    // Separate punctuation
    const leadingMatch = rawWord.match(/^([^a-zA-Z0-9]*)/);
    const trailingMatch = rawWord.match(/([^a-zA-Z0-9]*)$/);

    const leadingPunc = leadingMatch ? leadingMatch[1] : "";
    const trailingPunc = trailingMatch ? trailingMatch[1] : "";
    const clean = rawWord.slice(
      leadingPunc.length,
      rawWord.length - trailingPunc.length
    );

    const length = clean.length;
    const dots = "•".repeat(Math.max(1, length));
    const isProperNoun = properNounSet.has(clean.toLowerCase());

    return {
      id: `word-${idx}-${clean}`,
      original: rawWord,
      clean,
      leadingPunc,
      trailingPunc,
      length,
      dots,
      isProperNoun,
      status: "masked",
    };
  });
}

export function DictationWorkspace({
  sentenceText,
  sentenceId,
  translation,
  ipa,
  onWordMatched,
  onSentenceCompleted,
  onPlayAudio,
  onWordClick,
  isActive = true,
  customProperNouns,
  showTranslationByDefault = false,
  playbackSpeed = 1.0,
  onSpeedChange,
  fontSizeLevel = 0,
  hideTranslation = false,
  isSidebarCollapsed,
}: DictationWorkspaceProps) {
  const { sidebarCollapsed: globalSidebarCollapsed } = useUiStore();
  const isCollapsed = isSidebarCollapsed !== undefined ? isSidebarCollapsed : globalSidebarCollapsed;
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState<"idle" | "correct" | "shake">("idle");
  const [showTranslation, setShowTranslation] = useState(
    hideTranslation ? false : showTranslationByDefault
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tokenContainerRef = useRef<HTMLDivElement>(null);
  const tokenItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync hideTranslation prop changes
  useEffect(() => {
    if (hideTranslation) {
      setShowTranslation(false);
    }
  }, [hideTranslation]);

  // Dynamic font sizing classes based on fontSizeLevel (to rõ, dễ đọc)
  const tokenSizeClass = useMemo(() => {
    switch (fontSizeLevel) {
      case 1:
        return "min-h-[38px] sm:min-h-[40px] px-3.5 sm:px-4 py-1.5 text-base sm:text-[17px] font-bold";
      case 2:
        return "min-h-[42px] sm:min-h-[44px] px-4 sm:px-4.5 py-2 text-[17px] sm:text-lg font-bold";
      case 3:
        return "min-h-[46px] sm:min-h-[48px] px-4.5 sm:px-5 py-2.5 text-lg sm:text-xl font-bold";
      default:
        return "min-h-[34px] sm:min-h-[36px] px-3 sm:px-3.5 py-1 sm:py-1.5 text-sm sm:text-base font-bold";
    }
  }, [fontSizeLevel]);

  const inputSizeClass = useMemo(() => {
    switch (fontSizeLevel) {
      case 1:
        return "h-12 sm:h-13 text-base sm:text-lg font-medium";
      case 2:
        return "h-13 sm:h-14 text-lg sm:text-xl font-medium";
      case 3:
        return "h-14 sm:h-15 text-xl sm:text-2xl font-medium";
      default:
        return "h-11 sm:h-12 text-sm sm:text-base font-medium";
    }
  }, [fontSizeLevel]);

  // Extract proper nouns
  const properNouns = useMemo(
    () => extractProperNouns(sentenceText, customProperNouns),
    [sentenceText, customProperNouns]
  );

  // Tokenize words
  const [tokens, setTokens] = useState<WordToken[]>(() =>
    tokenizeSentence(sentenceText, properNouns)
  );

  // Auto-scroll the token row to keep the current/next active unsolved word centered in view
  useEffect(() => {
    if (!isCollapsed || !tokenContainerRef.current) return;

    // Find the next active word token (masked or first-letter)
    const nextUnsolvedIndex = tokens.findIndex(
      (t) => t.status === "masked" || t.status === "first-letter"
    );

    const targetIndex = nextUnsolvedIndex !== -1 ? nextUnsolvedIndex : tokens.length - 1;
    const targetElement = tokenItemRefs.current[targetIndex];

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [tokens, isCollapsed]);

  // Reset tokens whenever sentenceText changes
  useEffect(() => {
    setTokens(tokenizeSentence(sentenceText, properNouns));
    setInputValue("");
    setInputStatus("idle");
    setIsCompleted(false);
  }, [sentenceText, properNouns]);

  // Check if all words are solved
  const checkCompletion = useCallback(
    (currentTokens: WordToken[]) => {
      const allSolved = currentTokens.every(
        (t) => t.status === "matched" || t.status === "revealed"
      );
      if (allSolved && !isCompleted && currentTokens.length > 0) {
        setIsCompleted(true);
        if (!hideTranslation) {
          setShowTranslation(true);
        }
        if (onSentenceCompleted) {
          onSentenceCompleted();
        }
      }
    },
    [isCompleted, hideTranslation, onSentenceCompleted]
  );

  // Handle typing matching (supports single word or multi-word continuous input)
  const handleCheckWord = useCallback(
    (val: string) => {
      const trimmed = val.trim();
      if (!trimmed) return;

      const parts = trimmed
        .split(/\s+/)
        .map((p) => p.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
        .filter(Boolean);

      if (parts.length === 0) return;

      let nextTokens = [...tokens];
      let anyMatchFound = false;

      // Check each typed word against available unsolved tokens
      for (const typedWord of parts) {
        let matched = false;
        nextTokens = nextTokens.map((token, idx) => {
          if (
            !matched &&
            (token.status === "masked" || token.status === "first-letter") &&
            token.clean.toLowerCase() === typedWord
          ) {
            matched = true;
            anyMatchFound = true;
            if (onWordMatched) {
              onWordMatched(token.clean, idx);
            }
            return { ...token, status: "matched" as const };
          }
          return token;
        });
      }

      if (anyMatchFound) {
        setTokens(nextTokens);
        setInputStatus("correct");
        setInputValue(""); // Clear input on successful match

        setTimeout(() => {
          setInputStatus("idle");
        }, 800);

        checkCompletion(nextTokens);
      } else {
        // Shake feedback
        setInputStatus("shake");
        setTimeout(() => {
          setInputStatus("idle");
        }, 600);
      }
    },
    [tokens, onWordMatched, checkCompletion]
  );

  // Handle key down in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleCheckWord(inputValue);
    }
  };

  // Action: Hint first letter (Alt + H)
  const handleHintFirstLetter = useCallback(() => {
    let updated = false;
    const nextTokens = tokens.map((token) => {
      if (!updated && token.status === "masked") {
        updated = true;
        return { ...token, status: "first-letter" as const };
      }
      return token;
    });

    if (updated) {
      setTokens(nextTokens);
    }
  }, [tokens]);

  // Action: Reveal next word (Alt + R)
  const handleRevealNextWord = useCallback(() => {
    let updated = false;
    const nextTokens = tokens.map((token) => {
      if (
        !updated &&
        (token.status === "masked" || token.status === "first-letter")
      ) {
        updated = true;
        return { ...token, status: "revealed" as const };
      }
      return token;
    });

    if (updated) {
      setTokens(nextTokens);
      checkCompletion(nextTokens);
    }
  }, [tokens, checkCompletion]);

  // Action: Reveal all words (Alt + A)
  const handleRevealAll = useCallback(() => {
    const nextTokens = tokens.map((token) => ({
      ...token,
      status:
        token.status === "matched" ? ("matched" as const) : ("revealed" as const),
    }));
    setTokens(nextTokens);
    setShowTranslation(true);
    checkCompletion(nextTokens);
  }, [tokens, checkCompletion]);

  // Action: Reset this sentence
  const handleResetSentence = useCallback(() => {
    setTokens(tokenizeSentence(sentenceText, properNouns));
    setInputValue("");
    setInputStatus("idle");
    setIsCompleted(false);
  }, [sentenceText, properNouns]);

  // Global Keyboard Shortcuts (Alt+H, Alt+R, Alt+A, Alt+P, Ctrl+Space)
  useEffect(() => {
    if (!isActive) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in another input/textarea outside this component
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA") &&
        activeEl !== inputRef.current;

      if (isInputFocused) return;

      if (e.altKey && (e.key === "h" || e.key === "H")) {
        e.preventDefault();
        handleHintFirstLetter();
      } else if (e.altKey && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        handleRevealNextWord();
      } else if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        handleRevealAll();
      } else if ((e.altKey && (e.key === "p" || e.key === "P")) || (e.ctrlKey && e.code === "Space")) {
        e.preventDefault();
        if (onPlayAudio) onPlayAudio();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [
    isActive,
    handleHintFirstLetter,
    handleRevealNextWord,
    handleRevealAll,
    onPlayAudio,
  ]);

  // Single word click handler (reveal or pronunciation)
  const handleTokenClick = (index: number) => {
    const token = tokens[index];
    if (token.status === "masked") {
      // Single click reveals word
      const nextTokens = [...tokens];
      nextTokens[index] = { ...token, status: "revealed" };
      setTokens(nextTokens);
      checkCompletion(nextTokens);
    } else if (token.status === "first-letter") {
      const nextTokens = [...tokens];
      nextTokens[index] = { ...token, status: "revealed" };
      setTokens(nextTokens);
      checkCompletion(nextTokens);
    } else {
      // Already revealed or matched: trigger pronounce/dictionary
      if (onWordClick) {
        onWordClick(token.clean);
      }
    }
  };

  const solvedCount = tokens.filter(
    (t) => t.status === "matched" || t.status === "revealed"
  ).length;
  const progressPercent =
    tokens.length > 0 ? Math.round((solvedCount / tokens.length) * 100) : 0;

  return (
    <div className="w-full space-y-2 font-sans transition-all">
      {/* 1. PROPER NOUNS BAR (ⓘ Danh từ riêng: [ Ali ]) */}
      {properNouns.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 shrink-0 text-xs">
            <Info className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Danh từ riêng:</span>
          </div>
          <div className="flex items-center flex-wrap gap-1.5">
            {properNouns.map((noun, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs border border-slate-200/90 dark:border-slate-700 shadow-2xs"
              >
                {noun}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 2. WORD MASK TOKENS SECTION (Đưa lên trên theo yêu cầu) */}
      <div className="space-y-1.5 pt-0">
        {/* Sub-bar: [ⓘ Nhấn để xem] on left and [👁 Hiện tất cả] on right */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Nhấn để xem từ</span>
          </div>

          <button
            type="button"
            onClick={handleRevealAll}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none group"
            title="Hiện tất cả các từ trong câu"
          >
            <EyeOff className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            <span className="font-semibold">Hiện tất cả</span>
          </button>
        </div>

        {/* Masked / Revealed Token Row (Hidden Scrollbar + Auto-Centered Track) */}
        <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div
            ref={tokenContainerRef}
            style={isCollapsed ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
            className={`gap-1.5 sm:gap-2 items-center py-1.5 sm:py-2 px-1 ${
              isCollapsed
                ? "flex flex-nowrap overflow-x-auto scroll-smooth hide-scrollbar [&::-webkit-scrollbar]:hidden"
                : "flex flex-wrap"
            }`}
          >
            {tokens.map((token, idx) => {
              const isMatched = token.status === "matched";
              const isRevealed = token.status === "revealed";
              const isFirstLetter = token.status === "first-letter";
              const isSolved = isMatched || isRevealed;

              // Render text inside block
              let displayContent = token.dots;
              if (isSolved) {
                displayContent = token.clean;
              } else if (isFirstLetter) {
                displayContent =
                  token.clean[0] + "•".repeat(Math.max(0, token.length - 1));
              }

              return (
                <div
                  key={token.id}
                  ref={(el) => {
                    tokenItemRefs.current[idx] = el;
                  }}
                  className="inline-flex items-center shrink-0"
                >
                  {token.leadingPunc && (
                    <span className="text-slate-400 dark:text-slate-500 font-semibold mr-0.5 text-xs sm:text-sm">
                      {token.leadingPunc}
                    </span>
                  )}

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleTokenClick(idx)}
                    className={`${tokenSizeClass} ${
                      isSolved ? "font-sans tracking-normal" : "font-mono tracking-wide"
                    } rounded-md transition-all cursor-pointer select-none flex items-center justify-center ${
                      isMatched
                        ? "bg-emerald-500 text-white font-bold border-2 border-emerald-600 shadow-xs"
                        : isRevealed
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-300 dark:border-slate-600 shadow-2xs"
                        : isFirstLetter
                        ? "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold border border-amber-400 shadow-2xs"
                        : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:border-slate-400 hover:text-slate-900 dark:hover:border-slate-500 dark:hover:text-white shadow-2xs"
                    }`}
                  >
                    {displayContent}
                  </motion.button>

                  {token.trailingPunc && (
                    <span className="text-slate-400 dark:text-slate-500 font-semibold ml-0.5 text-xs sm:text-sm">
                      {token.trailingPunc}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* IPA & Vietnamese Translation Accordion */}
          <AnimatePresence>
            {showTranslation && translation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 overflow-hidden"
              >
                {ipa && (
                  <p className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400">
                    IPA: {ipa}
                  </p>
                )}
                <div className="p-3 rounded-lg bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 shadow-2xs leading-relaxed">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 font-sans">
                    <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Bản dịch câu:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {translation.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. DICTATION INPUT FIELD (Đưa xuống dưới theo yêu cầu) */}
      <div>
        <motion.div
          animate={
            inputStatus === "shake"
              ? { x: [-4, 4, -3, 3, -1, 1, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <input
            ref={inputRef}
            id={`dictation-input-${sentenceId}`}
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Điền câu đã nghe..."
            className={`w-full ${inputSizeClass} px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all outline-none bg-white dark:bg-slate-900 border ${
              inputStatus === "correct"
                ? "border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-4 ring-emerald-500/10"
                : inputStatus === "shake"
                ? "border-2 border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-4 ring-rose-500/10"
                : "border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-slate-900 dark:focus:border-white focus:ring-4 focus:ring-slate-900/10 dark:focus:ring-white/10 shadow-2xs"
            }`}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
              title="Xóa nội dung"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>

      {/* 4. ACTION SHORTCUT BUTTONS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial">
          {/* First letter hint */}
          <button
            type="button"
            onClick={handleHintFirstLetter}
            className="inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[34px] sm:min-h-[36px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Chữ cái đầu</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
              Alt+H
            </kbd>
          </button>

          {/* Reveal next word */}
          <button
            type="button"
            onClick={handleRevealNextWord}
            className="inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[34px] sm:min-h-[36px]"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Xem từ</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
              Alt+R
            </kbd>
          </button>
        </div>

        {/* Right side utilities: Toggle translation & Reset */}
        <div className="flex items-center gap-1.5">
          {translation && (
            <button
              type="button"
              onClick={() => setShowTranslation((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer min-h-[34px] sm:min-h-[36px]"
            >
              {showTranslation ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 shrink-0" />
                  <span>Ẩn dịch</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span>Xem dịch</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleResetSentence}
            title="Làm lại câu này"
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer min-h-[34px] sm:min-h-[36px] min-w-[34px] sm:min-w-[36px] flex items-center justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Celebratory Completion Banner */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between gap-3 text-emerald-900 dark:text-emerald-200 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold">
                  🎉 Xuất sắc! Bạn đã hoàn thành chính xác câu này!
                </p>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  +15 XP thưởng hoàn thành câu
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
