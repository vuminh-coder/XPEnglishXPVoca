"use client";
import React, { useState, useMemo, useCallback, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVocabularyStore } from "@/lib/store/vocabularyStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
import { Button } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Layers,
  PenLine,
  Mic,
  MicOff,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Volume2,
} from "lucide-react";

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const optionItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
} as const;

const BOOKMARK_KEY = "xp_bookmarked_words";

function getBookmarkedWords(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

function toggleBookmark(wordId: string): boolean {
  const current = getBookmarkedWords();
  const idx = current.indexOf(wordId);
  if (idx >= 0) {
    current.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return false;
  } else {
    current.push(wordId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return true;
  }
}

interface QuestionResult {
  selectedOptId: string | null;
  isCorrect: boolean;
  xpAwarded: number;
}

function PracticeQuizContent() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const modeParam = searchParams.get("subMode") || searchParams.get("mode");

  const { practiceWord, submitReview, learned } = useVocabularyStore();
  const { addToast } = useNotificationStore();
  const { awardXp } = useAuthStore();

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [dbVocabs, setDbVocabs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [subMode, setSubMode] = useState<"quiz" | "flashcard" | "writing" | "speaking">("quiz");

  useEffect(() => {
    if (modeParam === "writing" || modeParam === "speaking" || modeParam === "quiz" || modeParam === "flashcard") {
      setSubMode(modeParam as any);
    }
  }, [modeParam]);

  useEffect(() => {
    setHasInitialized(false);
  }, [modeParam, dateParam]);

  useEffect(() => {
    if (hasInitialized) return;

    if (modeParam === "bookmark") {
      const bookmarked = getBookmarkedWords();
      if (bookmarked.length > 0) {
        setIsLoading(true);
        fetch(`/api/vocabulary?ids=${bookmarked.join(",")}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.success && res.data) {
              setDbVocabs(res.data.sort(() => 0.5 - Math.random()));
              setHasInitialized(true);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
        return;
      } else {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
    }

    if (modeParam === "review") {
      let filteredLearned = [];
      if (dateParam) {
        filteredLearned = learned.filter((l) => {
          if (!l.nextReview) return false;
          const nextDateStr = formatLocalDate(new Date(l.nextReview));
          return nextDateStr === dateParam;
        });
      } else {
        filteredLearned = learned.filter(
          (l) => l.nextReview && new Date(l.nextReview) <= new Date()
        );
      }

      if (filteredLearned.length > 0) {
        const mapped = filteredLearned.map((l) => ({
          ...l,
          id: l.vocabId,
        }));
        setDbVocabs(mapped.sort(() => 0.5 - Math.random()));
        setIsLoading(false);
        setHasInitialized(true);
        return;
      } else if (learned.length > 0) {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
      return;
    }

    if (modeParam === "early-review") {
      const filteredLearned = learned.filter(
        (l) => l.nextReview && new Date(l.nextReview) > new Date()
      );
      if (filteredLearned.length > 0) {
        const mapped = filteredLearned.map((l) => ({
          ...l,
          id: l.vocabId,
        }));
        setDbVocabs(mapped.sort(() => 0.5 - Math.random()).slice(0, 20));
        setIsLoading(false);
        setHasInitialized(true);
        return;
      } else {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
    }

    if (modeParam === "focus-review") {
      const filteredLearned = learned.filter((l) => l.proficiency < 3);
      if (filteredLearned.length > 0) {
        const mapped = filteredLearned.map((l) => ({
          ...l,
          id: l.vocabId,
        }));
        setDbVocabs(mapped.sort(() => 0.5 - Math.random()).slice(0, 20));
        setIsLoading(false);
        setHasInitialized(true);
        return;
      } else {
        setDbVocabs([]);
        setIsLoading(false);
        setHasInitialized(true);
        return;
      }
    }

    setIsLoading(true);
    fetch("/api/vocabulary?limit=20&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setDbVocabs(res.data.sort(() => 0.5 - Math.random()));
          setHasInitialized(true);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [modeParam, dateParam, learned, hasInitialized]);

  const vocabs = dbVocabs;

  // ─── Quiz state ───
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qXp, setQXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Map<number, QuestionResult>
  >(new Map());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    return new Set(getBookmarkedWords());
  });

  // ─── Flashcard state ───
  const [fIndex, setFIndex] = useState(0);
  const [fXp, setFXp] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFSummary, setShowFSummary] = useState(false);

  // ─── Writing state ───
  const [wIndex, setWIndex] = useState(0);
  const [wScore, setWScore] = useState(0);
  const [wXp, setWXp] = useState(0);
  const [wUserAnswer, setWUserAnswer] = useState("");
  const [wIsAnswered, setWIsAnswered] = useState(false);
  const [wIsCorrect, setWIsCorrect] = useState(false);
  const [showWSummary, setShowWSummary] = useState(false);
  const wInputRef = useRef<HTMLInputElement | null>(null);

  // ─── Speaking state ───
  const [sIndex, setSIndex] = useState(0);
  const [sWordCountCorrect, setSWordCountCorrect] = useState(0);
  const [sXp, setSXp] = useState(0);
  const [sIsListening, setSIsListening] = useState(false);
  const [sTranscript, setSTranscript] = useState("");
  const [sIsAnswered, setSIsAnswered] = useState(false);
  const [sScore, setSScore] = useState<number | null>(null);
  const [showSSummary, setShowSSummary] = useState(false);

  const recognitionRef = useRef<any>(null);

  const currentWord = vocabs[qIndex];
  const options = useMemo(() => {
    if (!currentWord || vocabs.length === 0) return [];
    const otherWords = vocabs.filter((v) => v.id !== currentWord.id);
    const decoys = otherWords.slice(0, 3);
    const combined = [currentWord, ...decoys];
    return combined.sort((a, b) =>
      (a.word || "").localeCompare(b.word || "")
    );
  }, [currentWord, vocabs]);

  const handleToggleBookmark = useCallback(() => {
    const word =
      subMode === "quiz"
        ? vocabs[qIndex]
        : subMode === "flashcard"
        ? vocabs[fIndex]
        : subMode === "writing"
        ? vocabs[wIndex]
        : vocabs[sIndex];

    if (!word) return;
    const added = toggleBookmark(word.id);
    setBookmarkedIds((prev) => {
      const updated = new Set(prev);
      if (added) {
        updated.add(word.id);
      } else {
        updated.delete(word.id);
      }
      return updated;
    });
    addToast({
      type: added ? "success" : "info",
      title: added ? "Đã ghi nhớ!" : "Đã bỏ ghi nhớ",
      message: added
        ? `"${word.word}" đã được thêm vào danh sách ôn lại.`
        : `"${word.word}" đã được xoá khỏi danh sách ghi nhớ.`,
    });
  }, [subMode, vocabs, qIndex, fIndex, wIndex, sIndex, addToast]);

  const handleQuizAnswer = useCallback(
    (optId: string) => {
      if (isAnswered) return;
      setSelectedOpt(optId);
      setIsAnswered(true);

      const correctId = vocabs[qIndex].id;
      const isCorrect = optId === correctId;

      practiceWord(correctId, isCorrect);

      let xpEarned = 0;
      if (isCorrect) {
        xpEarned = 15;
        awardXp(xpEarned);
        setQXp((prev) => prev + xpEarned);
        setQScore((prev) => prev + 1);
        setConsecutiveWrong(0);
      } else {
        const newStreak = consecutiveWrong + 1;
        setConsecutiveWrong(newStreak);

        if (newStreak >= 3) {
          xpEarned = -10;
          awardXp(xpEarned);
          setQXp((prev) => prev + xpEarned);
          setConsecutiveWrong(0);
          addToast({
            type: "warning",
            title: "Mất 10 XP!",
            message: "Bạn đã trả lời sai 3 lần liên tiếp. Hãy tập trung hơn nhé!",
          });
        }
      }

      setAnsweredQuestions((prev) => {
        const updated = new Map(prev);
        updated.set(qIndex, { selectedOptId: optId, isCorrect, xpAwarded: xpEarned });
        return updated;
      });
    },
    [isAnswered, vocabs, qIndex, practiceWord, awardXp, consecutiveWrong, addToast]
  );

  const goToNextQuestion = useCallback(() => {
    if (qIndex >= vocabs.length - 1) {
      setShowSummary(true);
    } else {
      const nextIdx = qIndex + 1;
      setQIndex(nextIdx);
      const prev = answeredQuestions.get(nextIdx);
      if (prev) {
        setSelectedOpt(prev.selectedOptId);
        setIsAnswered(true);
      } else {
        setSelectedOpt(null);
        setIsAnswered(false);
      }
    }
  }, [qIndex, vocabs.length, answeredQuestions]);

  const goToPrevQuestion = useCallback(() => {
    if (qIndex <= 0) return;
    const prevIdx = qIndex - 1;
    setQIndex(prevIdx);
    const prev = answeredQuestions.get(prevIdx);
    if (prev) {
      setSelectedOpt(prev.selectedOptId);
      setIsAnswered(true);
    } else {
      setSelectedOpt(null);
      setIsAnswered(false);
    }
  }, [qIndex, answeredQuestions]);

  const handleFlashcardReview = async (quality: number) => {
    const wordId = vocabs[fIndex].id;
    await submitReview(wordId, quality);
    const xpEarned = quality >= 3 ? 15 : 5;
    awardXp(xpEarned);
    setFXp((prev) => prev + xpEarned);
    setIsFlipped(false);

    if (fIndex >= vocabs.length - 1) {
      setShowFSummary(true);
    } else {
      setFIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (subMode === "writing" && !wIsAnswered && wInputRef.current) {
      wInputRef.current.focus();
    }
  }, [subMode, wIndex, wIsAnswered]);

  const handleWritingCheck = () => {
    if (wIsAnswered || !wUserAnswer.trim()) return;

    const currentWord = vocabs[wIndex];
    const targetWord = currentWord.word.trim().toLowerCase();
    const cleanAnswer = wUserAnswer.trim().toLowerCase();
    const correct = cleanAnswer === targetWord;

    setWIsCorrect(correct);
    setWIsAnswered(true);

    if (correct) {
      setWScore((prev) => prev + 1);
      const earnedXp = 15;
      setWXp((prev) => prev + earnedXp);
      awardXp(earnedXp);
      useDailyChallengeStore.getState().incrementProgress("write_essay");

      addToast({
        type: "success",
        title: "Chính xác! 🎉",
        message: `Đã viết đúng từ. +15 XP`,
        duration: 2000,
      });
    } else {
      addToast({
        type: "error",
        title: "Chưa chính xác ❌",
        message: `Từ đúng phải là: "${currentWord.word}"`,
        duration: 3000,
      });
    }
  };

  const handleWritingNext = () => {
    if (wIndex >= vocabs.length - 1) {
      setShowWSummary(true);
    } else {
      setWIndex((prev) => prev + 1);
      setWUserAnswer("");
      setWIsAnswered(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setSIsListening(true);
          setSTranscript("");
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          setSTranscript(resultText);
          evaluatePronunciation(resultText);
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setSIsListening(false);
          addToast({
            type: "warning",
            title: "Lỗi microphone 🎤",
            message: event.error === "not-allowed" ? "Vui lòng cho phép quyền truy cập micro." : "Không thể nhận diện giọng nói. Hãy thử lại.",
          });
        };

        rec.onend = () => {
          setSIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, [addToast, sIndex, dbVocabs]);

  useEffect(() => {
    if (subMode !== "speaking" && sIsListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setSIsListening(false);
    }
  }, [subMode, sIsListening]);

  const startSpeakingListening = () => {
    if (!recognitionRef.current) {
      addToast({
        type: "error",
        title: "Trình duyệt không hỗ trợ",
        message: "Trình duyệt của bạn không hỗ trợ nhận diện giọng nói tiếng Anh.",
      });
      return;
    }
    if (sIsListening) return;
    setSIsListening(true);
    setSScore(null);
    setSIsAnswered(false);
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error(e);
      setSIsListening(false);
    }
  };

  const stopSpeakingListening = () => {
    if (recognitionRef.current && sIsListening) {
      recognitionRef.current.stop();
      setSIsListening(false);
    }
  };

  const evaluatePronunciation = async (spokenText: string) => {
    const currentWord = vocabs[sIndex];
    if (!currentWord) return;
    const targetWord = currentWord.word;
    setSIsAnswered(true);

    try {
      const res = await fetch("/api/ai/pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spokenText, targetText: targetWord }),
      });
      const json = await res.json();
      if (json.success) {
        const finalScore = json.score;
        setSScore(finalScore);
        
        if (finalScore >= 80) {
          setSWordCountCorrect((prev) => prev + 1);
          const earnedXp = 15;
          setSXp((prev) => prev + earnedXp);
          awardXp(earnedXp);
          useDailyChallengeStore.getState().incrementProgress("speak_practice");

          addToast({
            type: "success",
            title: "Phát âm xuất sắc! 🌟",
            message: `Điểm số: ${finalScore}/100. +15 XP`,
            duration: 2500,
          });
        } else {
          addToast({
            type: "info",
            title: "Cố gắng lên! 💪",
            message: `Điểm số: ${finalScore}/100. Hãy thử phát âm lại rõ hơn.`,
            duration: 3000,
          });
        }
      } else {
        addToast({
          type: "error",
          title: "Lỗi AI Coach",
          message: "Không thể chấm điểm phát âm lúc này.",
        });
      }
    } catch (e) {
      console.error("Pronunciation evaluation error:", e);
    }
  };

  const handleSpeakingNext = () => {
    if (sIndex >= vocabs.length - 1) {
      setShowSSummary(true);
    } else {
      setSIndex((prev) => prev + 1);
      setSTranscript("");
      setSScore(null);
      setSIsAnswered(false);
    }
  };

  const speakWord = () => {
    const word =
      subMode === "writing"
        ? vocabs[wIndex]
        : subMode === "speaking"
        ? vocabs[sIndex]
        : vocabs[qIndex];

    if (!word) return;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const leftModes = [
    {
      key: "quiz" as const,
      label: "Trắc nghiệm",
      desc: "Chọn nghĩa đúng của từ vựng.",
      icon: <Brain className="h-4 w-4" strokeWidth={1.8} />,
    },
    {
      key: "flashcard" as const,
      label: "Thẻ học",
      desc: "Phương pháp lật hai mặt ghi nhớ.",
      icon: <Layers className="h-4 w-4" strokeWidth={1.8} />,
    },
  ];

  const rightModes = [
    {
      key: "writing" as const,
      label: "Luyện viết",
      desc: "Gõ đúng chính tả tiếng Anh.",
      icon: <PenLine className="h-4 w-4" strokeWidth={1.8} />,
    },
    {
      key: "speaking" as const,
      label: "Luyện phát âm",
      desc: "Phát âm chuẩn từ vựng.",
      icon: <Mic className="h-4 w-4" strokeWidth={1.8} />,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-6 select-none animate-pulse">
        <div className="h-8 w-48 rounded bg-slate-200 dark:bg-neutral-850" />
        <div className="h-4 w-72 rounded bg-slate-200 dark:bg-neutral-850 mt-2" />
        <div className="bezel mt-6 h-[250px] max-w-lg mx-auto">
          <div className="bezel-inner bg-slate-50 dark:bg-neutral-900 h-full" />
        </div>
      </div>
    );
  }

  const qProgressPercent = Math.round((qIndex / Math.max(1, vocabs.length)) * 100);
  const wProgressPercent = Math.round((wIndex / Math.max(1, vocabs.length)) * 100);
  const sProgressPercent = Math.round((sIndex / Math.max(1, vocabs.length)) * 100);

  const isCurrentBookmarked =
    vocabs.length > 0
      ? subMode === "quiz"
        ? bookmarkedIds.has(vocabs[qIndex]?.id)
        : subMode === "flashcard"
        ? bookmarkedIds.has(vocabs[fIndex]?.id)
        : subMode === "writing"
        ? bookmarkedIds.has(vocabs[wIndex]?.id)
        : bookmarkedIds.has(vocabs[sIndex]?.id)
      : false;

  return (
    <div className="space-y-6 pb-28 md:pb-6" suppressHydrationWarning>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 85, damping: 15 }}
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display font-sans">
          Học tập và rèn luyện
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium max-w-xl font-sans">
          Một phiên học ngắn, tập trung và có phản hồi ngay lập tức.
        </p>
      </motion.div>

      {/* Dynamic subMode navigation tabs using framer-motion bubble background */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-850 pb-4"
      >
        {/* Left group: Quiz modes */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-950 p-1 rounded-full border border-slate-200/60 dark:border-neutral-850 overflow-x-auto no-scrollbar w-full sm:w-auto shrink-0">
          {leftModes.map((m) => {
            const isActive = subMode === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setSubMode(m.key)}
                className={`flex-1 sm:flex-initial relative flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black rounded-full transition-colors duration-250 select-none z-10 cursor-pointer whitespace-nowrap shrink-0 font-sans ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-500 dark:text-slate-550"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubModeIndicator"
                    className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  />
                )}
                <span className="relative z-10">{m.icon}</span>
                <span className="relative z-10">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right group: Writing & Speaking modes */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-950 p-1 rounded-full border border-slate-200/60 dark:border-neutral-850 overflow-x-auto no-scrollbar w-full sm:w-auto shrink-0">
          {rightModes.map((m) => {
            const isActive = subMode === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setSubMode(m.key)}
                className={`flex-1 sm:flex-initial relative flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black rounded-full transition-colors duration-250 select-none z-10 cursor-pointer whitespace-nowrap shrink-0 font-sans ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-500 dark:text-slate-555 hover:text-cyan-650 dark:hover:text-cyan-350"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubModeIndicator"
                    className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-full shadow-sm border border-slate-100 dark:border-neutral-850"
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  />
                )}
                <span className="relative z-10">{m.icon}</span>
                <span className="relative z-10">{m.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Practice arena area */}
      <div id="practice-arena">
        <AnimatePresence mode="wait">
          {vocabs.length === 0 ? (
            <motion.div
              key="empty-practice"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="mx-auto max-w-md text-center"
            >
              <div className="bezel">
                <div className="bezel-inner flex flex-col items-center gap-5 p-8 bg-white dark:bg-neutral-900">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center text-3xl">
                    📚
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white font-sans">
                      Không có từ vựng cần ôn
                    </h2>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      Tuyệt vời! Bạn đã hoàn thành việc ôn tập tất cả các từ vựng cần thiết.
                    </p>
                  </div>
                  <Link href="/vocabulary" className="w-full">
                    <Button
                      variant="primary"
                      className="w-full py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                    >
                      Khám phá từ vựng mới
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : subMode === "quiz" ? (
            /* ─── QUIZ TAB ─── */
            showSummary ? (
              <motion.div
                key="quiz-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto max-w-2xl text-center"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col items-center gap-6 p-8 bg-white dark:bg-neutral-900">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-3xl animate-bounce">
                      🏆
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                        Hoàn thành phiên trắc nghiệm!
                      </h2>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-350 font-sans">
                        Bạn đã trả lời xong danh sách từ vựng ôn tập hôm nay.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Chính xác
                        </div>
                        <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 font-sans">
                          {qScore} / {vocabs.length}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Điểm thưởng
                        </div>
                        <div className={`text-2xl font-black mt-1 font-sans ${qXp >= 0 ? "text-amber-550" : "text-rose-500"}`}>
                          {qXp >= 0 ? "+" : ""}{qXp} XP
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Ghi nhớ
                        </div>
                        <div className="text-2xl font-black text-indigo-500 dark:text-indigo-400 mt-1 font-sans">
                          {bookmarkedIds.size}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full max-w-md pt-2">
                      <Button
                        variant="primary"
                        className="flex-1 py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        onClick={() => {
                          setQIndex(0);
                          setQScore(0);
                          setQXp(0);
                          setConsecutiveWrong(0);
                          setAnsweredQuestions(new Map());
                          setSelectedOpt(null);
                          setIsAnswered(false);
                          setShowSummary(false);
                        }}
                      >
                        Luyện tập tiếp
                      </Button>
                      <Link href="/dashboard" className="flex-1">
                        <Button
                          variant="secondary"
                          className="w-full py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        >
                          Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`quiz-arena-${qIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 85, damping: 15 }}
                className="mx-auto max-w-2xl"
              >
                <div className="p-2.5 rounded-3xl bg-slate-200/60 dark:bg-neutral-800/60 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="rounded-[calc(1.5rem-0.3rem)] p-5 sm:p-7 bg-white dark:bg-neutral-900 space-y-5">
                    
                    {/* Top Status Header Row */}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-3">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                          CÂU {qIndex + 1}/{vocabs.length}
                        </p>
                        <div className="mt-0.5 text-xs font-black text-slate-600 dark:text-slate-300">
                          Điểm: <span className="text-blue-600 dark:text-sky-400">{qScore}</span> ·{" "}
                          <span className={qXp >= 0 ? "text-amber-500" : "text-rose-500"}>
                            {qXp >= 0 ? "+" : ""}{qXp} XP
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleToggleBookmark}
                          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                            isCurrentBookmarked
                              ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700/40"
                              : "bg-slate-50 dark:bg-neutral-950 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-neutral-800 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                        >
                          {isCurrentBookmarked ? (
                            <BookmarkCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" strokeWidth={2.2} />
                          )}
                          <span>{isCurrentBookmarked ? "ĐÃ GHI NHỚ" : "GHI NHỚ"}</span>
                        </button>

                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-amber-950/30 px-3.5 py-1.5 text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Trophy className="h-3.5 w-3.5 text-amber-500 animate-bounce" />
                          <span>MỤC TIÊU NGÀY</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${qProgressPercent}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      />
                    </div>

                    {/* Vocabulary Display Center Box */}
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 dark:bg-neutral-950/40 p-6 text-center relative shadow-2xs">
                      <span className="absolute top-3 right-3 text-[10px] uppercase font-black tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                        {vocabs[qIndex]?.pos || "NOUN"}
                      </span>

                      <div className="flex items-center justify-center gap-2">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                          {vocabs[qIndex]?.word}
                        </h2>
                        {vocabs[qIndex]?.word && (
                          <button
                            type="button"
                            onClick={() => speakWord()}
                            className="p-1.5 rounded-full text-blue-600 dark:text-sky-400 hover:bg-blue-100/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Phát âm"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        Phiên âm: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{vocabs[qIndex]?.phonetic || "/.../"}</span>
                      </div>
                    </div>

                    {/* 2x2 Choice Answer Grid (Rule 14 & Rule 15) */}
                    <motion.div
                      variants={optionsContainerVariants}
                      initial="hidden"
                      animate="show"
                      key={`options-${qIndex}`}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {options.map((opt) => {
                        const correctId = vocabs[qIndex]?.id;
                        let statusClass =
                          "border border-slate-200/80 bg-white dark:bg-neutral-950 text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:bg-blue-50/40 hover:text-blue-600 shadow-2xs";

                        if (isAnswered) {
                          if (opt.id === correctId) {
                            statusClass = "border-2 border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black shadow-sm";
                          } else if (opt.id === selectedOpt) {
                            statusClass = "border-2 border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black shadow-sm";
                          } else {
                            statusClass = "border border-slate-100 bg-slate-50/50 text-slate-400 dark:border-neutral-850 dark:bg-neutral-950/20 dark:text-slate-600 pointer-events-none";
                          }
                        }

                        return (
                          <motion.button
                            variants={optionItemVariants}
                            key={opt.id}
                            type="button"
                            onClick={() => handleQuizAnswer(opt.id)}
                            disabled={isAnswered}
                            className={`w-full p-4 rounded-2xl transition-all duration-200 cursor-pointer font-bold text-center text-xs sm:text-sm min-h-[56px] flex items-center justify-center ${statusClass}`}
                          >
                            <span>{opt.definitionVn || opt.definition}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>

                    {/* Answer Feedback Banner */}
                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className={`rounded-2xl p-3.5 text-center text-xs font-bold border ${
                            selectedOpt === vocabs[qIndex]?.id
                              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400"
                              : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-400"
                          }`}
                        >
                          {selectedOpt === vocabs[qIndex]?.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-4 w-4 stroke-[3]" />
                              <span>Chính xác! +15 XP</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center justify-center gap-2">
                                <X className="h-4 w-4 stroke-[3]" />
                                <span>Sai rồi! {consecutiveWrong >= 2 ? `(Sai liên tiếp ${consecutiveWrong}/3)` : ""}</span>
                              </div>
                              <div className="text-[11px] font-semibold opacity-80">
                                Đáp án đúng: <span className="font-black">{vocabs[qIndex]?.definitionVn}</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Card Footer Bar: Single Primary CTA (Rule 18 & Rule 13) */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                      <button
                        type="button"
                        disabled={qIndex === 0}
                        onClick={goToPrevQuestion}
                        className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2]" />
                        <span>Câu trước</span>
                      </button>

                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 tabular-nums">
                        {qIndex + 1}/{vocabs.length}
                      </span>

                      <button
                        type="button"
                        onClick={goToNextQuestion}
                        disabled={!isAnswered}
                        className="px-6 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 border border-blue-400/20"
                      >
                        <span>{qIndex >= vocabs.length - 1 ? "Hoàn thành" : "Câu tiếp"}</span>
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ) : subMode === "flashcard" ? (
            /* ─── FLASHCARD TAB ─── */
            showFSummary ? (
              <motion.div
                key="flashcard-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto max-w-md text-center"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col items-center gap-6 p-8 bg-white dark:bg-neutral-900">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-3xl animate-bounce">
                      ✨
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-black text-slate-900 dark:text-white font-sans">
                        Hoàn thành thẻ ghi nhớ!
                      </h2>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-350 font-sans">
                        Bạn đã ôn tập xong toàn bộ danh sách thẻ học.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30 w-full max-w-xs">
                      <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                        Tổng điểm thưởng
                      </div>
                      <div className="text-2xl font-black text-indigo-650 dark:text-indigo-400 mt-1 font-sans">
                        +{fXp} XP
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full max-w-xs pt-2">
                      <Button
                        variant="primary"
                        className="py-3 rounded-xl font-black cursor-pointer text-xs font-sans"
                        onClick={() => {
                          setFIndex(0);
                          setFXp(0);
                          setShowFSummary(false);
                        }}
                      >
                        Học lại lượt này
                      </Button>
                      <Link href="/dashboard" className="w-full">
                        <Button
                          variant="secondary"
                          className="w-full py-3 rounded-xl font-black cursor-pointer text-xs font-sans"
                        >
                          Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="flashcard-arena"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 85, damping: 15 }}
                className="mx-auto max-w-md space-y-4"
              >
                <div className="bezel">
                  <div className="bezel-inner p-4 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between text-xs font-black text-slate-450 dark:text-slate-400 select-none font-sans">
                      <span>Thẻ ghi nhớ</span>
                      <span>
                        {fIndex + 1}/{vocabs.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bezel shadow-md">
                  <div className="w-full" style={{ borderRadius: "calc(var(--radius-3xl) - 6px)", perspective: "1500px" }}>
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 70, damping: 15 }}
                      className="relative h-80 w-full cursor-pointer select-none"
                      style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      {/* Front cover */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[calc(var(--radius-3xl)-6px)] bg-white p-5 sm:p-8 text-center border border-slate-100 dark:border-neutral-850 dark:bg-neutral-900 overflow-y-auto"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                      >
                        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400 border border-cyan-500/5 font-sans">
                          <RotateCcw className="h-3 w-3 animate-spin-slow" />
                          Bấm để lật
                        </span>
                        <div className="mb-3 rounded-full bg-slate-100 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:bg-neutral-850 dark:text-slate-400 border border-black/[0.02] font-sans">
                          {vocabs[fIndex]?.pos}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display font-sans">
                          {vocabs[fIndex]?.word}
                        </h3>
                        <p className="mt-2 font-mono text-xs font-bold text-slate-400 dark:text-slate-400 font-sans">
                          {vocabs[fIndex]?.phonetic}
                        </p>
                      </div>

                      {/* Back details */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[calc(var(--radius-3xl)-6px)] p-5 sm:p-8 text-center border border-slate-100 dark:border-neutral-850 overflow-y-auto"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%), var(--bg-card)",
                        }}
                      >
                        <span className="mb-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 border border-emerald-500/5 font-sans">
                          Ý nghĩa của từ
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-tight font-sans">
                          {vocabs[fIndex]?.definitionVn}
                        </h3>
                        <p className="mt-2.5 text-xs font-medium text-slate-500 dark:text-slate-350 leading-relaxed max-w-xs font-sans">
                          {vocabs[fIndex]?.definition}
                        </p>
                        {vocabs[fIndex]?.examples && vocabs[fIndex].examples.length > 0 && (
                          <div className="mt-4 rounded-2xl bg-slate-50/50 px-4 py-3 text-xs text-slate-500 font-bold border border-slate-200/40 shadow-sm dark:bg-neutral-950/40 dark:text-slate-300 dark:border-neutral-850 max-w-xs italic leading-relaxed font-sans">
                            &ldquo;{vocabs[fIndex]?.examples[0]}&rdquo;
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bezel">
                  <div className="bezel-inner flex flex-col gap-3.5 p-4 bg-white dark:bg-neutral-900">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 text-center select-none font-sans">
                      Đánh giá độ nhớ của bạn
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        className="rounded-xl font-bold py-2.5 cursor-pointer text-[11px] sm:text-xs px-2 sm:px-4 font-sans"
                        onClick={() => handleFlashcardReview(1)}
                      >
                        Quên
                      </Button>
                      <Button
                        variant="bezel"
                        size="sm"
                        className="rounded-xl border-amber-200 dark:border-amber-700/50 hover:bg-amber-50 dark:hover:bg-amber-955/20 text-amber-650 dark:text-amber-400 py-2.5 cursor-pointer text-[11px] sm:text-xs px-2 sm:px-4 font-bold font-sans"
                        onClick={() => handleFlashcardReview(3)}
                      >
                        Mơ hồ
                      </Button>
                      <Button
                        variant="bezel"
                        size="sm"
                        className="rounded-xl border-sky-200 dark:border-sky-700/50 hover:bg-sky-50 dark:hover:bg-sky-955/20 text-sky-650 dark:text-sky-400 py-2.5 cursor-pointer text-[11px] sm:text-xs px-2 sm:px-4 font-bold font-sans"
                        onClick={() => handleFlashcardReview(4)}
                      >
                        Nhớ tốt
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="rounded-xl font-bold py-2.5 cursor-pointer text-[11px] sm:text-xs px-2 sm:px-4 font-sans"
                        onClick={() => handleFlashcardReview(5)}
                      >
                        Thành thạo
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ) : subMode === "writing" ? (
            /* ─── WRITING TAB ─── */
            showWSummary ? (
              <motion.div
                key="writing-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto max-w-2xl text-center"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col items-center gap-6 p-8 bg-white dark:bg-neutral-900">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-955/30 flex items-center justify-center text-3xl animate-bounce">
                      🏆
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                        Hoàn thành phiên viết chính tả!
                      </h2>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
                        Bạn đã viết chính tả xong toàn bộ từ vựng ngày hôm nay.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Đúng chính tả
                        </div>
                        <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 font-sans">
                          {wScore} / {vocabs.length}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Kinh nghiệm nhận
                        </div>
                        <div className="text-2xl font-black text-amber-550 mt-1 font-sans">
                          +{wXp} XP
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full max-w-md pt-2">
                      <Button
                        variant="primary"
                        className="flex-1 py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        onClick={() => {
                          setWIndex(0);
                          setWScore(0);
                          setWXp(0);
                          setWUserAnswer("");
                          setWIsAnswered(false);
                          setShowWSummary(false);
                        }}
                      >
                        Luyện tập tiếp
                      </Button>
                      <Link href="/dashboard" className="flex-1">
                        <Button
                          variant="secondary"
                          className="w-full py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        >
                          Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`writing-arena-${wIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 85, damping: 15 }}
                className="mx-auto max-w-2xl"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col gap-5 p-6 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 font-sans">
                          Từ {wIndex + 1}/{vocabs.length}
                        </p>
                        <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                          Đúng:{" "}
                          <span className="text-cyan-500 font-extrabold font-sans">{wScore}</span> ·{" "}
                          <span className="text-amber-500 font-extrabold font-sans">+{wXp} XP</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleToggleBookmark}
                          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer font-sans ${
                            isCurrentBookmarked
                              ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700/40"
                              : "bg-slate-50 dark:bg-neutral-900 text-slate-400 dark:text-slate-400 border-slate-200 dark:border-neutral-800 hover:border-indigo-300 hover:text-indigo-500"
                          }`}
                        >
                          {isCurrentBookmarked ? (
                            <BookmarkCheck className="h-3.5 w-3.5" strokeWidth={2} />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
                          )}
                          <span className="hidden sm:inline">
                            {isCurrentBookmarked ? "Đã ghi nhớ" : "Ghi nhớ"}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/20 px-3 py-1 text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 border border-sky-500/10 font-sans">
                          <Trophy className="h-3.5 w-3.5 text-amber-550 animate-bounce" />
                          <span className="hidden sm:inline">Luyện viết</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-850">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${wProgressPercent}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      />
                    </div>

                    <div className="rounded-[24px] border border-sky-100/50 bg-gradient-to-br from-sky-50/40 to-white p-5 sm:p-6 text-center dark:border-neutral-800 dark:from-neutral-950/30 dark:to-neutral-900 relative space-y-4">
                      <div className="absolute top-2 right-3 text-[10px] uppercase font-black tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/5 font-sans">
                        {vocabs[wIndex]?.pos}
                      </div>

                      <div className="flex flex-col items-center gap-1.5 pt-2">
                        <button
                          type="button"
                          onClick={speakWord}
                          className="w-12 h-12 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-neutral-850 dark:hover:bg-neutral-805 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                        >
                          <Volume2 className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
                        </button>
                        <span className="text-[9px] font-black uppercase text-indigo-500 tracking-wider">Bấm để nghe phát âm</span>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-100 dark:border-neutral-850/50 pt-3">
                        <h3 className="text-base font-black text-slate-850 dark:text-white font-sans leading-relaxed">
                          {vocabs[wIndex]?.definitionVn}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 italic">
                          ({vocabs[wIndex]?.definition})
                        </p>
                        {vocabs[wIndex]?.phonetic && (
                          <span className="inline-block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                            Phiên âm: {vocabs[wIndex]?.phonetic}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wide text-slate-450 dark:text-slate-450 block">
                        Gõ từ tiếng Anh tương ứng
                      </label>
                      <input
                        ref={wInputRef}
                        type="text"
                        value={wUserAnswer}
                        onChange={(e) => setWUserAnswer(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (wIsAnswered) {
                              handleWritingNext();
                            } else {
                              handleWritingCheck();
                            }
                          }
                        }}
                        disabled={wIsAnswered}
                        className={`w-full py-3.5 px-4 text-sm font-bold rounded-xl border focus:outline-none transition-all duration-200 ${
                          wIsAnswered
                            ? wIsCorrect
                              ? "bg-emerald-50/50 border-emerald-300 text-emerald-700 dark:bg-emerald-955/10 dark:border-emerald-800 dark:text-emerald-400"
                              : "bg-rose-50/50 border-rose-300 text-rose-700 dark:bg-rose-955/10 dark:border-rose-800 dark:text-rose-400"
                            : "bg-slate-50/50 border-slate-200 focus:border-indigo-500 dark:bg-neutral-900/30 dark:border-neutral-800 dark:text-white"
                        }`}
                        placeholder={wIsAnswered ? "" : "Gõ từ vựng tiếng Anh..."}
                      />

                      <AnimatePresence>
                        {wIsAnswered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-start gap-2.5 overflow-hidden ${
                              wIsCorrect
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400"
                                : "bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-400"
                            }`}
                          >
                            {wIsCorrect ? (
                              <>
                                <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                                <div>
                                  <p className="font-extrabold text-sm">Chính xác!</p>
                                  <p className="mt-0.5">Bạn đã viết chính tả hoàn toàn đúng.</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <X className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" strokeWidth={3} />
                                <div>
                                  <p className="font-extrabold text-sm">Chưa đúng rồi!</p>
                                  <p className="mt-0.5">
                                    Đáp án chính xác: <strong className="font-black underline text-sm select-all text-rose-600 dark:text-rose-400">{vocabs[wIndex]?.word}</strong>
                                  </p>
                                </div>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl font-bold cursor-pointer text-xs px-4 py-2.5 font-sans whitespace-nowrap"
                        onClick={() => {
                          if (wIndex > 0) {
                            setWIndex(wIndex - 1);
                            setWUserAnswer("");
                            setWIsAnswered(false);
                          }
                        }}
                        disabled={wIndex === 0}
                        leftIcon={<ChevronLeft className="h-4 w-4" strokeWidth={2} />}
                      >
                        Từ trước
                      </Button>
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-400 tabular-nums font-sans">
                        {wIndex + 1} / {vocabs.length}
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-xl font-bold cursor-pointer text-xs px-4 py-2.5 font-sans whitespace-nowrap text-white dark:text-white"
                        onClick={wIsAnswered ? handleWritingNext : handleWritingCheck}
                        disabled={!wUserAnswer.trim() && !wIsAnswered}
                        rightIcon={<ChevronRight className="h-4 w-4" strokeWidth={2} />}
                      >
                        {wIsAnswered ? (wIndex >= vocabs.length - 1 ? "Hoàn thành" : "Từ tiếp") : "Kiểm tra"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ) : (
            /* ─── SPEAKING TAB ─── */
            showSSummary ? (
              <motion.div
                key="speaking-summary"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto max-w-2xl text-center"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col items-center gap-6 p-8 bg-white dark:bg-neutral-900">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-955/30 flex items-center justify-center text-3xl animate-bounce">
                      🏆
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                        Hoàn thành luyện phát âm!
                      </h2>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-350 font-sans">
                        Bạn đã thực hành nói xong danh sách từ vựng.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Đạt chuẩn (&gt;=80%)
                        </div>
                        <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 font-sans">
                          {sWordCountCorrect} / {vocabs.length}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950/30">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-sans">
                          Kinh nghiệm nhận
                        </div>
                        <div className="text-2xl font-black text-amber-550 mt-1 font-sans">
                          +{sXp} XP
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full max-w-md pt-2">
                      <Button
                        variant="primary"
                        className="flex-1 py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        onClick={() => {
                          setSIndex(0);
                          setSWordCountCorrect(0);
                          setSXp(0);
                          setSTranscript("");
                          setSScore(null);
                          setSIsAnswered(false);
                          setShowSSummary(false);
                        }}
                      >
                        Luyện tập tiếp
                      </Button>
                      <Link href="/dashboard" className="flex-1">
                        <Button
                          variant="secondary"
                          className="w-full py-3.5 rounded-xl font-black cursor-pointer text-sm font-sans"
                        >
                          Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`speaking-arena-${sIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 85, damping: 15 }}
                className="mx-auto max-w-2xl"
              >
                <div className="bezel">
                  <div className="bezel-inner flex flex-col gap-5 p-6 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 font-sans">
                          Từ {sIndex + 1}/{vocabs.length}
                        </p>
                        <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">
                          Đạt chuẩn:{" "}
                          <span className="text-cyan-500 font-extrabold font-sans">{sWordCountCorrect}</span> ·{" "}
                          <span className="text-amber-500 font-extrabold font-sans">+{sXp} XP</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleToggleBookmark}
                          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer font-sans ${
                            isCurrentBookmarked
                              ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700/40"
                              : "bg-slate-50 dark:bg-neutral-900 text-slate-400 dark:text-slate-400 border-slate-200 dark:border-neutral-800 hover:border-indigo-300 hover:text-indigo-500"
                          }`}
                        >
                          {isCurrentBookmarked ? (
                            <BookmarkCheck className="h-3.5 w-3.5" strokeWidth={2} />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
                          )}
                          <span className="hidden sm:inline">
                            {isCurrentBookmarked ? "Đã ghi nhớ" : "Ghi nhớ"}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/20 px-3 py-1 text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 border border-sky-500/10 font-sans">
                          <Trophy className="h-3.5 w-3.5 text-amber-550 animate-bounce" />
                          <span className="hidden sm:inline">Luyện nói</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-850">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${sProgressPercent}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      />
                    </div>

                    <div className="rounded-[24px] border border-sky-100/50 bg-gradient-to-br from-sky-50/40 to-white p-5 sm:p-8 text-center dark:border-neutral-800 dark:from-neutral-950/30 dark:to-neutral-900 relative space-y-4">
                      <div className="absolute top-2 right-3 text-[10px] uppercase font-black tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/5 font-sans">
                        {vocabs[sIndex]?.pos}
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display font-sans pt-3 select-all">
                        {vocabs[sIndex]?.word}
                      </h2>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-450 dark:text-slate-400">
                          Phiên âm: {vocabs[sIndex]?.phonetic || "/.../"}
                        </span>
                        <button
                          type="button"
                          onClick={speakWord}
                          className="w-7 h-7 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-neutral-850 dark:hover:bg-neutral-800 flex items-center justify-center cursor-pointer transition-colors shadow-inner"
                        >
                          <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </button>
                      </div>

                      <div className="space-y-1 border-t border-slate-100 dark:border-neutral-850/50 pt-3">
                        <p className="text-sm font-black text-slate-855 dark:text-slate-200">
                          {vocabs[sIndex]?.definitionVn}
                        </p>
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-400 max-w-md mx-auto italic">
                          ({vocabs[sIndex]?.definition})
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-3 pt-1">
                      <div className="relative">
                        {sIsListening && (
                          <motion.div
                            animate={{ scale: [1, 1.35, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute inset-0 bg-rose-500/20 dark:bg-rose-500/10 rounded-full"
                          />
                        )}
                        <button
                          type="button"
                          onClick={sIsListening ? stopSpeakingListening : startSpeakingListening}
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
                            sIsListening 
                              ? "bg-rose-500 hover:bg-rose-600 text-white" 
                              : "bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/20 text-cyan-650 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-900/30"
                          }`}
                        >
                          {sIsListening ? (
                            <MicOff className="h-6 w-6 animate-pulse" />
                          ) : (
                            <Mic className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400">
                        {sIsListening ? "Đang lắng nghe..." : "Bấm Micro để ghi âm phát âm"}
                      </span>
                    </div>

                    {sIsAnswered && (
                      <div className="w-full space-y-3">
                        <div className="p-3 bg-slate-50 dark:bg-neutral-900/40 rounded-xl border border-slate-100 dark:border-neutral-850/50">
                          <span className="text-[9px] font-black uppercase text-slate-450 dark:text-slate-400 block">Bạn vừa nói:</span>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-350 italic mt-0.5">
                            "{sTranscript || "(Không nhận diện được âm thanh)"}"
                          </p>
                        </div>

                        {sScore !== null && (
                          <div
                            className={`p-4 rounded-2xl border text-xs font-semibold flex items-start gap-2.5 ${
                              sScore >= 80
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400"
                                : "bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-400"
                            }`}
                          >
                            {sScore >= 80 ? (
                              <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                            ) : (
                              <X className="h-4.5 w-4.5 text-amber-550 shrink-0 mt-0.5" strokeWidth={3} />
                            )}
                            <div>
                              <p className="font-extrabold text-sm">
                                {sScore >= 80 ? "Phát âm chuẩn xác!" : "Phát âm chưa đạt chuẩn"}
                              </p>
                              <p className="mt-0.5 leading-relaxed font-medium">
                                Độ tương đồng: <strong className="font-black text-sm">{sScore}%</strong>.{" "}
                                {sScore >= 80
                                  ? "Tuyệt vời, giọng phát âm rất tốt!"
                                  : "Hãy thu âm lại, nhấn giọng đúng âm tiết và đọc rõ các phụ âm cuối."}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl font-bold cursor-pointer text-xs px-4 py-2.5 font-sans whitespace-nowrap"
                        onClick={() => {
                          if (sIndex > 0) {
                            setSIndex(sIndex - 1);
                            setSTranscript("");
                            setSScore(null);
                            setSIsAnswered(false);
                          }
                        }}
                        disabled={sIndex === 0}
                        leftIcon={<ChevronLeft className="h-4 w-4" strokeWidth={2} />}
                      >
                        Từ trước
                      </Button>
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-400 tabular-nums font-sans">
                        {sIndex + 1} / {vocabs.length}
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-xl font-bold cursor-pointer text-xs px-4 py-2.5 font-sans whitespace-nowrap text-white dark:text-white"
                        onClick={handleSpeakingNext}
                        disabled={!sIsAnswered}
                        rightIcon={<ChevronRight className="h-4 w-4" strokeWidth={2} />}
                      >
                        {sIndex >= vocabs.length - 1 ? "Hoàn thành" : "Từ tiếp"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PracticeQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl p-8 text-center text-xs font-bold text-slate-400 dark:text-neutral-600 animate-pulse font-sans">
          Đang tải phòng học ôn tập...
        </div>
      }
    >
      <PracticeQuizContent />
    </Suspense>
  );
}
