"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  X,
  Languages,
  PenLine,
  Copy,
  Check,
  Speech,
} from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import {
  checkNearMissTypo,
  checkEquivalenceMatch,
  playSyntheticAudioFeedback,
  loadSentenceDraft,
  saveSentenceDraft,
  clearSentenceDraft,
} from "@/features/listening/utils/dictationEngine";

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
  onSentenceCompleted?: (stats?: { matchedCount: number; totalCount: number }) => void;
  onPlayAudio?: () => void;
  onWordClick?: (word: string) => void;
  isActive?: boolean;
  customProperNouns?: string[];
  showTranslationByDefault?: boolean;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  fontSizeLevel?: number;
  hideTranslation?: boolean;
  onToggleTranslation?: () => void;
  isSidebarCollapsed?: boolean;
  lessonId?: string;
  sentenceIndex?: number;
}

// Well-known proper nouns, months, days for robust extraction
const COMMON_PROPER_NOUNS = new Set([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december",
  "ali", "sarah", "john", "mary", "david", "emma", "alex", "michael",
  "london", "tokyo", "paris", "new york", "vietnam", "hanoi", "saigon",
  "france", "germany", "spain", "italy",
  "english", "vietnamese", "american", "british", "french", "japanese",
]);

/**
 * Extracts proper nouns from an English sentence
 */
export function extractProperNouns(sentence: string, customList?: string[]): string[] {
  if (Array.isArray(customList)) return customList;
  if (!sentence) return [];

  const words = sentence.trim().split(/\s+/);
  const properNouns = new Set<string>();

  words.forEach((w, idx) => {
    const clean = w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
    if (!clean) return;

    // Skip standalone 'I'
    if (clean === "I") return;

    const prevWord = idx > 0 ? words[idx - 1] : "";
    const isAfterSentenceEnd = /[.!?]["'”’]?$/.test(prevWord) || /:[“"'’]?$/.test(prevWord);

    // Words starting with uppercase that are NOT the first word or start of a new sentence
    const isCapitalized = /^[A-Z][a-zA-Z0-9]*$/.test(clean);
    const isKnownProper = COMMON_PROPER_NOUNS.has(clean.toLowerCase());

    if ((isCapitalized && idx > 0 && !isAfterSentenceEnd) || isKnownProper) {
      properNouns.add(clean);
    }
  });

  return Array.from(properNouns);
}

const COMMON_STOP_WORDS = new Set([
  "the", "a", "an", "of", "in", "on", "at", "to", "for", "and", "or", "but", "by",
  "from", "with", "about", "me", "my", "our", "your", "its", "his", "her", "their",
  "is", "was", "are", "were", "it", "this", "that"
]);

/**
 * Tokenizes sentence text into individual interactive word tokens
 */
export function tokenizeSentence(sentence: string, properNouns: string[]): WordToken[] {
  if (!sentence) return [];
  const rawWords = sentence.trim().split(/\s+/);
  const properNounSet = new Set<string>();

  properNouns.forEach((p) => {
    const fullClean = p.toLowerCase().trim();
    if (fullClean) properNounSet.add(fullClean);

    // Also index individual words for multi-word proper nouns (e.g. "Steve Jobs" -> "steve", "jobs")
    // Skip common grammatical stop words so "the" or "of" aren't erroneously marked as proper nouns elsewhere
    fullClean.split(/\s+/).forEach((w) => {
      const cleanW = w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      if (cleanW && cleanW.length > 1 && !COMMON_STOP_WORDS.has(cleanW)) {
        properNounSet.add(cleanW);
      }
    });
  });

  const tokens: WordToken[] = [];
  rawWords.forEach((rawWord) => {
    // Separate punctuation (with Unicode letters support)
    const leadingMatch = rawWord.match(/^([^a-zA-Z0-9\p{L}]*)/u);
    const trailingMatch = rawWord.match(/([^a-zA-Z0-9\p{L}]*)$/u);

    const leadingPunc = leadingMatch ? leadingMatch[1] : "";
    const trailingPunc = trailingMatch ? trailingMatch[1] : "";
    const clean = rawWord.slice(
      leadingPunc.length,
      rawWord.length - trailingPunc.length
    );

    if (clean.length === 0) {
      if (tokens.length > 0) {
        tokens[tokens.length - 1].trailingPunc += " " + rawWord;
        tokens[tokens.length - 1].original += " " + rawWord;
      }
      return;
    }

    const length = clean.length;
    const dots = "•".repeat(Math.max(1, length));
    const isProperNoun = properNounSet.has(clean.toLowerCase());

    tokens.push({
      id: `word-${tokens.length}-${clean}`,
      original: rawWord,
      clean,
      leadingPunc,
      trailingPunc,
      length,
      dots,
      isProperNoun,
      status: "masked",
    });
  });

  return tokens;
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
  fontSizeLevel = 0,
  hideTranslation,
  onToggleTranslation,
  isSidebarCollapsed,
  lessonId,
  sentenceIndex,
}: DictationWorkspaceProps) {
  const { sidebarCollapsed: globalSidebarCollapsed } = useUiStore();
  const isCollapsed = isSidebarCollapsed !== undefined ? isSidebarCollapsed : globalSidebarCollapsed;
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState<"idle" | "correct" | "shake">("idle");
  const [showTranslation, setShowTranslation] = useState(
    hideTranslation !== undefined ? !hideTranslation : showTranslationByDefault
  );
  const [isCompleted, setIsCompleted] = useState(false);

  // Active Tab for Helper Card: "translation" | "ipa" (with persistent user preference)
  const [activeHelperTab, setActiveHelperTab] = useState<"translation" | "ipa">(() => {
    if (typeof window === "undefined") return "translation";
    try {
      const saved = localStorage.getItem("xp_dictation_helper_tab");
      if (saved === "ipa" || saved === "translation") return saved;
    } catch {}
    return "translation";
  });
  const [copiedHelperText, setCopiedHelperText] = useState(false);

  const handleSelectHelperTab = useCallback((tab: "translation" | "ipa") => {
    setActiveHelperTab(tab);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_dictation_helper_tab", tab);
      } catch {}
    }
  }, []);

  const handleCopyHelperText = useCallback((text: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHelperText(true);
      setTimeout(() => setCopiedHelperText(false), 1500);
    }
  }, []);

  // Web Audio Synthetic Dopamine Sound Feedback Toggle
  const [isSoundFeedbackEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("xp_sound_feedback");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Near-miss Typo feedback & Contraction equivalence note
  const [nearMissHint, setNearMissHint] = useState<string | null>(null);
  const [equivalenceNote, setEquivalenceNote] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const tokenContainerRef = useRef<HTMLDivElement>(null);
  const tokenItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hydrate sentence draft from sessionStorage
  /* eslint-disable react-hooks/set-state-in-effect -- Hydrating draft from external sessionStorage */
  useEffect(() => {
    if (lessonId && sentenceIndex !== undefined) {
      const draft = loadSentenceDraft(lessonId, sentenceIndex);
      if (draft) {
        setInputValue(draft);
      }
    }
  }, [lessonId, sentenceIndex]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync hideTranslation prop changes
  /* eslint-disable react-hooks/set-state-in-effect -- Prop synchronization */
  useEffect(() => {
    if (hideTranslation !== undefined) {
      setShowTranslation(!hideTranslation);
    }
  }, [hideTranslation]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
  /* eslint-disable react-hooks/set-state-in-effect -- Resetting workspace state on sentence change */
  useEffect(() => {
    setTokens(tokenizeSentence(sentenceText, properNouns));
    setInputValue("");
    setInputStatus("idle");
    setIsCompleted(false);
  }, [sentenceText, properNouns]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Auto-focus dictation input whenever sentence changes or mounts
  useEffect(() => {
    if (isActive && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [sentenceId, sentenceText, isActive]);

  // Handle sentence completion
  const checkCompletion = useCallback(
    (currentTokens: WordToken[]) => {
      const allSolved = currentTokens.every(
        (t) => t.status === "matched" || t.status === "revealed"
      );

      if (allSolved && !isCompleted) {
        setIsCompleted(true);
        if (isSoundFeedbackEnabled) {
          playSyntheticAudioFeedback("sentence_complete");
        }
        if (lessonId && sentenceIndex !== undefined) {
          clearSentenceDraft(lessonId, sentenceIndex);
        }
        if (!hideTranslation) {
          setShowTranslation(true);
        }
        if (onSentenceCompleted) {
          const matchedCount = currentTokens.filter((t) => t.status === "matched").length;
          const totalCount = currentTokens.length;
          onSentenceCompleted({ matchedCount, totalCount });
        }
      }
    },
    [isCompleted, hideTranslation, onSentenceCompleted, isSoundFeedbackEnabled, lessonId, sentenceIndex]
  );

  // Handle typing matching (with Fuzzy Typo and Contraction Equivalence)
  const handleCheckWord = useCallback(
    (val: string): boolean => {
      const trimmed = val.trim();
      if (!trimmed) return false;

      const rawParts = trimmed.split(/\s+/).filter(Boolean);
      if (rawParts.length === 0) return false;

      let nextTokens = [...tokens];
      let anyMatchFound = false;
      let detectedNearMiss: string | null = null;
      let detectedEquiv: string | null = null;

      for (const typedRaw of rawParts) {
        const typedClean = typedRaw.replace(/[^a-zA-Z0-9'\p{L}]/gu, "").toLowerCase();
        if (!typedClean) continue;

        let matched = false;
        nextTokens = nextTokens.map((token, idx) => {
          if (
            !matched &&
            (token.status === "masked" || token.status === "first-letter" || token.status === "revealed")
          ) {
            const tokenClean = token.clean.toLowerCase();
            const normTokenClean = tokenClean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const normTypedClean = typedClean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // 1. Direct or Equivalence Match (with diacritic tolerance)
            const isDirect = tokenClean === typedClean || normTokenClean === normTypedClean;
            const isEquiv = !isDirect && checkEquivalenceMatch(typedClean, tokenClean);

            if (isDirect || isEquiv) {
              matched = true;
              anyMatchFound = true;
              if (isEquiv) {
                detectedEquiv = `Đã chuẩn hóa: "${typedRaw}" tương đương "${token.clean}"`;
              }
              if (onWordMatched) {
                onWordMatched(token.clean, idx);
              }
              return { ...token, status: "matched" as const };
            }

            // 2. Near-miss typo check on remaining unsolved words
            if (!matched && !detectedNearMiss) {
              const typoRes = checkNearMissTypo(typedClean, tokenClean);
              if (typoRes.isNearMiss && typoRes.hint) {
                detectedNearMiss = typoRes.hint;
              }
            }
          }
          return token;
        });
      }

      if (anyMatchFound) {
        setTokens(nextTokens);
        setInputStatus("correct");
        setInputValue("");
        setNearMissHint(null);
        if (detectedEquiv) {
          setEquivalenceNote(detectedEquiv);
          setTimeout(() => setEquivalenceNote(null), 3000);
        }

        if (isSoundFeedbackEnabled) {
          playSyntheticAudioFeedback("correct");
        }

        if (lessonId && sentenceIndex !== undefined) {
          clearSentenceDraft(lessonId, sentenceIndex);
        }

        setTimeout(() => {
          setInputStatus("idle");
        }, 800);

        checkCompletion(nextTokens);
        return true;
      } else {
        // Near-miss hint or shake
        if (detectedNearMiss) {
          setNearMissHint(detectedNearMiss);
        }
        if (isSoundFeedbackEnabled) {
          playSyntheticAudioFeedback("incorrect");
        }

        setInputStatus("shake");
        setTimeout(() => {
          setInputStatus("idle");
        }, 600);
        return false;
      }
    },
    [tokens, onWordMatched, checkCompletion, isSoundFeedbackEnabled, lessonId, sentenceIndex]
  );

  // Handle key down in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      const matched = handleCheckWord(inputValue);
      if (matched || e.key === "Enter") {
        e.preventDefault();
      }
    }
  };

  // Action: Hint first letter (Alt + H)
  const handleHintFirstLetter = useCallback(() => {
    let targetIndex = -1;
    const nextTokens = tokens.map((token, idx) => {
      if (targetIndex === -1 && token.status === "masked") {
        targetIndex = idx;
        return { ...token, status: "first-letter" as const };
      }
      return token;
    });

    if (targetIndex !== -1) {
      setTokens(nextTokens);
      // Điền chữ cái đầu nếu ô input đang trống
      if (!inputValue.trim()) {
        setInputValue(tokens[targetIndex].clean[0]);
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // Cuộn mượt mà đến khối từ đang được gợi ý
      tokenItemRefs.current[targetIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [tokens, inputValue]);

  // Action: Reveal next word (Alt + R) - Tự động điền, giữ focus, chống nhảy mất câu đột ngột
  const handleRevealNextWord = useCallback(() => {
    let targetIndex = -1;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].status === "masked" || tokens[i].status === "first-letter") {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) return;

    const targetToken = tokens[targetIndex];
    const nextTokens = [...tokens];
    nextTokens[targetIndex] = { ...targetToken, status: "revealed" as const };
    setTokens(nextTokens);

    // Điền từ đúng vào ô input để người học thấy rõ và chỉ cần gõ Space/Enter để xác nhận
    setInputValue(targetToken.clean);

    // Luôn giữ focus trong ô input để người học tiếp tục thao tác không bị gián đoạn
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Cuộn mượt mà đến vị trí từ vừa mở
    tokenItemRefs.current[targetIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [tokens]);

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
    if (lessonId && sentenceIndex !== undefined) {
      clearSentenceDraft(lessonId, sentenceIndex);
    }
    setInputStatus("idle");
    setIsCompleted(false);
  }, [sentenceText, properNouns, lessonId, sentenceIndex]);

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
    if (token.status === "masked" || token.status === "first-letter") {
      // Nhấp vào khối từ bị che: hiển thị từ, điền vào input và focus ngay
      const nextTokens = [...tokens];
      nextTokens[index] = { ...token, status: "revealed" };
      setTokens(nextTokens);

      setInputValue(token.clean);
      if (inputRef.current) {
        inputRef.current.focus();
      }

      tokenItemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    } else {
      // Already revealed or matched: trigger pronounce/dictionary
      if (onWordClick) {
        onWordClick(token.clean);
      }
    }
  };

  const handleInsertProperNoun = (noun: string) => {
    setInputValue((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${noun}` : noun;
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const solvedCount = tokens.filter(
    (t) => t.status === "matched" || t.status === "revealed"
  ).length;
  const progressPercent =
    tokens.length > 0 ? Math.round((solvedCount / tokens.length) * 100) : 0;

  return (
    <div className="w-full space-y-2 font-sans transition-all">
      {/* 2. WORD MASK TOKENS SECTION (Đưa lên trên theo yêu cầu) */}
      <div className="space-y-1.5 pt-0">
        {/* Sub-bar: [ⓘ Nhấn để xem từ] + [✨ Tên riêng: Buster] on left and [👁 Hiện tất cả] on right */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium flex-wrap">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Nhấn để xem từ</span>
            <span className="text-slate-400 dark:text-slate-500">
              ({solvedCount}/{tokens.length} - {progressPercent}%)
            </span>

            {/* Smart Proper Nouns Inline Pill (Thiết kế thanh mảnh, không chiếm dòng riêng, có thể nhấp để điền nhanh) */}
            {properNouns.length > 0 && (
              <div className="inline-flex items-center gap-1.5 ml-1 sm:ml-2.5 px-2.5 py-0.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-slate-700 dark:text-slate-200 transition-all">
                <Sparkles className="w-3 h-3 text-[#0059bb] dark:text-sky-400 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Tên riêng:</span>
                <div className="inline-flex items-center gap-1 flex-wrap">
                  {properNouns.map((noun, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertProperNoun(noun)}
                      title={`Nhấp để điền "${noun}" vào ô chính tả`}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 font-bold text-xs border border-blue-200/90 dark:border-blue-700/80 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-[#0059bb] shadow-2xs transition-all cursor-pointer select-none active:scale-95"
                    >
                      {noun}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRevealAll}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none group shrink-0"
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
                let displayContent: React.ReactNode = token.dots;
                if (isSolved) {
                  displayContent = token.clean;
                } else if (isFirstLetter) {
                  displayContent =
                    token.clean[0] + "•".repeat(Math.max(0, token.length - 1));
                } else if (token.isProperNoun) {
                  displayContent = (
                    <span className="inline-flex items-center gap-1 text-[#0059bb] dark:text-sky-300 font-bold">
                      <Sparkles className="w-2.5 h-2.5 shrink-0 text-[#0059bb] dark:text-sky-400" />
                      <span>{token.dots}</span>
                    </span>
                  );
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
                      title={
                        token.isProperNoun && !isSolved
                          ? `Tên riêng: Nhấn để xem (${token.clean})`
                          : isSolved
                          ? `Từ: ${token.clean}`
                          : "Nhấn để xem từ"
                      }
                      className={`${tokenSizeClass} relative ${
                        isSolved ? "font-sans tracking-normal" : "font-mono tracking-wide"
                      } rounded-lg transition-all cursor-pointer select-none flex items-center justify-center ${
                        isMatched
                          ? "bg-emerald-500 text-white font-bold border-2 border-emerald-600 shadow-xs"
                          : isRevealed
                          ? token.isProperNoun
                            ? "bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-200 font-bold border-2 border-blue-300 dark:border-blue-700 shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-300 dark:border-slate-600 shadow-2xs"
                          : isFirstLetter
                          ? "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold border border-amber-400 shadow-2xs"
                          : token.isProperNoun
                          ? "bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/90 dark:border-blue-800/80 text-[#0059bb] dark:text-sky-300 font-semibold hover:border-[#0059bb] dark:hover:border-sky-400 shadow-2xs"
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
          </div>
        </div>

        {/* 3. DICTATION INPUT FIELD (Tuân thủ Rule 6 Wadhah Aloui: Nhãn Ngoài Rõ Nét) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5 text-xs font-bold text-slate-700 dark:text-slate-200 select-none">
            <label
              htmlFor={`dictation-input-${sentenceId}`}
              className="flex items-center gap-1.5 cursor-pointer hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors"
            >
              <PenLine className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Nội dung nghe chép chính tả</span>
            </label>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
              Gõ phím Space để tự động chuyển từ
            </span>
          </div>

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
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                if (lessonId && sentenceIndex !== undefined) {
                  saveSentenceDraft(lessonId, sentenceIndex, val);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Điền câu đã nghe..."
              className={`w-full ${inputSizeClass} px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all outline-none bg-white dark:bg-slate-900 border ${
                inputStatus === "correct"
                  ? "border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-4 ring-emerald-500/10"
                  : inputStatus === "shake"
                  ? "border-2 border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-4 ring-rose-500/10"
                  : "border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0059bb] dark:focus:border-sky-500 focus:ring-4 focus:ring-[#0059bb]/15 dark:focus:ring-sky-500/15 shadow-2xs"
              }`}
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("");
                  if (lessonId && sentenceIndex !== undefined) {
                    clearSentenceDraft(lessonId, sentenceIndex);
                  }
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                title="Xóa nội dung"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {/* Near Miss Hint or Contraction Note Feedback */}
          <AnimatePresence>
            {nearMissHint && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium"
              >
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Gần đúng! Có thể bạn gõ sai chính tả: <strong>{nearMissHint}</strong>
                </span>
              </motion.div>
            )}
            {equivalenceNote && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{equivalenceNote}</span>
              </motion.div>
            )}
          </AnimatePresence>
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

          {/* Right side utilities: Toggle translation / IPA & Reset */}
          <div className="flex items-center gap-1.5">
            {(translation || ipa) && (
              <button
                type="button"
                onClick={() => {
                  if (onToggleTranslation) {
                    onToggleTranslation();
                  } else {
                    setShowTranslation((prev) => !prev);
                  }
                }}
                className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs min-h-[34px] sm:min-h-[36px] active:scale-95 ${
                  showTranslation
                    ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 font-bold"
                    : "text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800"
                }`}
              >
                {showTranslation ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400" />
                    <span>Ẩn gợi ý</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>Dịch / IPA</span>
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

        {/* 5. IPA & VIETNAMESE TRANSLATION ACCORDION HELPER CARD WITH DUAL TAB */}
        <AnimatePresence>
          {showTranslation && (translation || ipa) && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100/90 dark:border-slate-800 shadow-2xs space-y-2.5 overflow-hidden"
            >
              {/* TAB CHUYỂN BÊN DỊCH VÀ BÊN IPA (KHI CÓ CẢ 2) */}
              {translation && ipa && (
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleSelectHelperTab("translation")}
                      className={`px-3 py-1.5 rounded-md text-xs sm:text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeHelperTab === "translation"
                          ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Languages className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                      <span>Bản dịch</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectHelperTab("ipa")}
                      className={`px-3 py-1.5 rounded-md text-xs sm:text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeHelperTab === "ipa"
                          ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Speech className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                      <span>Phiên âm IPA</span>
                    </button>
                  </div>

                  {/* Nút sao chép nội dung đang xem */}
                  <button
                    type="button"
                    onClick={() => {
                      const textToCopy =
                        activeHelperTab === "ipa"
                          ? (ipa.startsWith("/") ? ipa : `/${ipa}/`)
                          : translation.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim();
                      handleCopyHelperText(textToCopy);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Sao chép nội dung"
                  >
                    {copiedHelperText ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[2.5]" /> Đã chép
                      </span>
                    ) : (
                      <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-[11px] font-medium flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Sao chép
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* NỘI DUNG TAB HIỂN THỊ */}
              {/* Tab 1: Bản dịch tiếng Việt (Phong cách song ngữ Reading, loại bỏ nhãn Dịch) */}
              {((activeHelperTab === "translation" && translation) || (!ipa && translation)) && (
                <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                  {translation.replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim()}
                </div>
              )}

              {/* Tab 2: Phiên âm IPA (ĐẬM HƠN, RÕ NÉT HƠN THEO YÊU CẦU NGƯỜI DÙNG) */}
              {((activeHelperTab === "ipa" && ipa) || (!translation && ipa)) && (
                <div className="flex items-start gap-2.5 text-xs sm:text-sm py-0.5">
                  <div className="flex items-center gap-1 font-bold text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5">
                    <Speech className="w-4 h-4 shrink-0 text-[#0059bb] dark:text-sky-400" />
                    <span>IPA:</span>
                  </div>
                  <p className="font-mono font-bold tracking-wide text-slate-900 dark:text-white leading-relaxed text-xs sm:text-[14px] selection:bg-blue-100 dark:selection:bg-blue-900/40 select-all">
                    {ipa.startsWith("/") ? ipa : `/${ipa}/`}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
