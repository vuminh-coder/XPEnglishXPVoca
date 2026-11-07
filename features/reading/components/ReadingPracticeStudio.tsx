"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Volume2,
  Volume1,
  VolumeX,
  GraduationCap,
  FileText,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  Copy,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { syncRoadmapSessionProgress } from "@/features/roadmap";
import {
  ReadingPassage,
  READING_PASSAGES_DATA,
} from "@/features/reading/data/readingMockData";
import { formatReadingCategoryVi } from "./ReadingCatalogView";

/**
 * Extracts the real sentence from the reading passage containing the target word,
 * eliminating generic "Usage example of..." placeholders.
 */
function extractContextSentenceFromPassage(passageText: string, word: string): string {
  if (!passageText || !word) return "";
  const cleanTarget = word.trim().toLowerCase();
  const bodyLines = passageText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !/^subject:/i.test(line) &&
        !/^(dear|hi|hello|best regards|sincerely|warm regards)\b/i.test(line)
    );

  const sentences = bodyLines
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter((s) => s.length > 12);

  const regex = new RegExp(`\\b${cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[a-z]*\\b`, "i");
  const matched = sentences.find((s) => regex.test(s));
  return matched || sentences[0] || "";
}

function sanitizeDeepDefinition(
  def: DeepWordDefinition,
  passageText: string
): DeepWordDefinition {
  const isGenericDetail =
    !def.detailMeaning ||
    def.detailMeaning.includes("Nghĩa từ vựng trong ngữ cảnh bài đọc") ||
    def.detailMeaning.includes("Nghĩa của từ");

  const isGenericExample =
    !def.example ||
    def.example.includes("Usage example of") ||
    def.example.includes("Usage in reading passage context");

  const realSynonyms = (def.synonyms || []).filter(
    (s) => s && s.toLowerCase() !== "word" && s.toLowerCase() !== "vocabulary"
  );

  const contextSentence = extractContextSentenceFromPassage(passageText, def.word);

  return {
    ...def,
    detailMeaning: isGenericDetail ? "" : def.detailMeaning,
    example: isGenericExample ? contextSentence : def.example,
    synonyms: realSynonyms,
  };
}

export interface ReadingPracticeStudioProps {
  passage: ReadingPassage;
  allPassages?: ReadingPassage[];
  onBack?: () => void;
}

export function ReadingPracticeStudio({
  passage,
  allPassages = READING_PASSAGES_DATA,
  onBack,
}: ReadingPracticeStudioProps) {
  const router = useRouter();
  const { addToast } = useNotificationStore();
  const { awardXp } = useUserStore();

  // Full-width Studio Mode: collapse sidebar & hide bottom nav
  useEffect(() => {
    useUiStore.getState().setSidebarCollapsed(true);
    useUiStore.getState().setHideBottomNav(true);
    return () => {
      useUiStore.getState().setHideBottomNav(false);
      stopTTS();
    };
  }, []);

  // Back Navigation Handler
  const handleBack = useCallback(() => {
    stopTTS();
    if (onBack) {
      onBack();
    } else {
      router.push("/study/reading");
    }
  }, [onBack, router]);

  // Next Passage Resolution
  const currentIndex = allPassages.findIndex((p) => p.id === passage.id);
  const nextPassage =
    currentIndex >= 0 && currentIndex + 1 < allPassages.length ? allPassages[currentIndex + 1] : null;

  // Reading Studio States
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileViewTab, setMobileViewTab] = useState<"passage" | "questions" | "dictionary">("passage");

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setMobileViewTab("passage");
  }, [passage.id]);

  const [showBilingual, setShowBilingual] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg">("base");
  const [selectedDeepWord, setSelectedDeepWord] = useState<DeepWordDefinition | null>(() => {
    const firstVocab = passage.vocabularies?.[0];
    if (firstVocab) {
      const deep = lookupWordDeep(firstVocab.word);
      return sanitizeDeepDefinition(
        {
          ...deep,
          word: firstVocab.word,
          ipa: firstVocab.ipa || deep.ipa,
          pos: firstVocab.pos || deep.pos,
          meaning: firstVocab.meaning || deep.meaning,
        },
        passage.passage
      );
    }
    return sanitizeDeepDefinition(lookupWordDeep("reading"), passage.passage);
  });
  const [dictSearchQuery, setDictSearchQuery] = useState("");
  const [isSearchingDict, setIsSearchingDict] = useState(false);
  const [copiedIpa, setCopiedIpa] = useState(false);
  const [savedWordsSet, setSavedWordsSet] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("xp_voca_custom_notebook");
      if (stored) {
        const list = JSON.parse(stored);
        return new Set(list.map((item: any) => (item.word || "").toLowerCase()));
      }
    } catch {}
    return new Set();
  });

  useEffect(() => {
    const firstVocab = passage.vocabularies?.[0];
    if (firstVocab) {
      const deep = lookupWordDeep(firstVocab.word);
      setSelectedDeepWord(
        sanitizeDeepDefinition(
          {
            ...deep,
            word: firstVocab.word,
            ipa: firstVocab.ipa || deep.ipa,
            pos: firstVocab.pos || deep.pos,
            meaning: firstVocab.meaning || deep.meaning,
          },
          passage.passage
        )
      );
      setDictSearchQuery(firstVocab.word);
    }
  }, [passage.id, passage.vocabularies, passage.passage]);

  const [activeRightTab, setActiveRightTab] = useState<"questions" | "dictionary">("questions");
  const [isPlayingPassageAudio, setIsPlayingPassageAudio] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Active Passage Practice Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Level Badge Mapping
  const getLevelLabel = (level?: string): string => {
    const map: Record<string, string> = {
      Easy: "A1-A2",
      Beginner: "A1",
      A1: "A1",
      A2: "A2",
      Intermediate: "B1-B2",
      B1: "B1",
      B2: "B2",
      Hard: "C1-C2",
      Advanced: "C1",
      C1: "C1",
      C2: "C2",
    };
    return map[level || ""] || level || "A1";
  };

  // Deep Word Lookup Engine (Curated + Deep Lexicon + Context Sentence + Async Online Enricher)
  const handleWordClick = useCallback(
    async (rawWord: string) => {
      const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").trim().toLowerCase();
      if (!cleanWord) return;

      speakLessonText(cleanWord, { rate: 1.0 });

      setActiveRightTab("dictionary");
      setMobileViewTab("dictionary");
      setDictSearchQuery(cleanWord);
      setIsSearchingDict(true);

      const matchedCurated = passage.vocabularies?.find(
        (v) => v.word.toLowerCase() === cleanWord
      );

      const deepDef = lookupWordDeep(cleanWord);

      const merged = sanitizeDeepDefinition(
        {
          word: matchedCurated?.word || deepDef.word || cleanWord,
          ipa: matchedCurated?.ipa || deepDef.ipa || `/${cleanWord}/`,
          pos: matchedCurated?.pos || deepDef.pos || "Từ vựng",
          meaning: matchedCurated?.meaning || deepDef.meaning,
          detailMeaning: deepDef.detailMeaning,
          rootWord: deepDef.rootWord,
          collocations: deepDef.collocations,
          example: deepDef.example,
          synonyms: deepDef.synonyms,
        },
        passage.passage
      );

      setSelectedDeepWord(merged);
      setIsSearchingDict(false);

      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const entry = data[0];
            const onlineIpa = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text;
            const firstMeaning = entry.meanings?.[0];
            const onlinePos = firstMeaning?.partOfSpeech;
            const onlineDef = firstMeaning?.definitions?.[0]?.definition;
            const onlineExample = firstMeaning?.definitions?.[0]?.example;
            const onlineSynonyms =
              firstMeaning?.synonyms ||
              entry.meanings?.flatMap((m: any) => m.synonyms || []).slice(0, 5);

            setSelectedDeepWord((prev) => {
              if (!prev || prev.word.toLowerCase() !== cleanWord) return prev;
              return sanitizeDeepDefinition(
                {
                  ...prev,
                  ipa: prev.ipa && prev.ipa !== `/${cleanWord}/` ? prev.ipa : onlineIpa || prev.ipa,
                  pos:
                    prev.pos && prev.pos !== "Từ vựng"
                      ? prev.pos
                      : onlinePos || prev.pos,
                  detailMeaning: prev.detailMeaning || onlineDef || "",
                  example: prev.example || onlineExample || "",
                  synonyms:
                    prev.synonyms && prev.synonyms.length > 0
                      ? prev.synonyms
                      : onlineSynonyms?.length
                      ? onlineSynonyms.slice(0, 5)
                      : [],
                },
                passage.passage
              );
            });
          }
        }
      } catch {}
    },
    [passage.vocabularies, passage.passage]
  );

  // Save Word to Personal Notebook
  const handleSaveToNotebook = useCallback(
    (item: DeepWordDefinition) => {
      const wordKey = item.word.toLowerCase();
      try {
        const stored = localStorage.getItem("xp_voca_custom_notebook") || "[]";
        const parsed = JSON.parse(stored);
        if (parsed.some((w: any) => (w.word || "").toLowerCase() === wordKey)) {
          addToast({
            type: "info",
            title: "Từ đã có trong Sổ tay",
            message: `Từ "${item.word}" đã được lưu trong Sổ tay từ vựng trước đó.`,
          });
          return;
        }

        parsed.push({
          word: item.word,
          phonetic: item.ipa,
          pos: item.pos,
          definitionVn: item.meaning,
          detailMeaning: item.detailMeaning,
          example: item.example,
          savedAt: new Date().toISOString(),
          context: passage.title,
        });

        localStorage.setItem("xp_voca_custom_notebook", JSON.stringify(parsed));
        setSavedWordsSet((prev) => new Set([...prev, wordKey]));
        awardXp(5, "vocabulary");

        addToast({
          type: "success",
          title: "🎉 Đã lưu vào Sổ tay (+5 XP)",
          message: `Từ "${item.word}" đã được thêm vào Sổ tay ôn tập ngắt quãng Spaced Repetition của bạn.`,
        });
      } catch {
        addToast({
          type: "error",
          title: "Không thể lưu",
          message: "Lỗi lưu vào bộ nhớ cục bộ.",
        });
      }
    },
    [passage.title, awardXp, addToast]
  );

  const handleCopyIpa = (ipaText?: string) => {
    if (!ipaText) return;
    navigator.clipboard.writeText(ipaText);
    setCopiedIpa(true);
    setTimeout(() => setCopiedIpa(false), 1500);
  };

  // Quiz Selection Handler
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    if (currentQuestionIndex < passage.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, passage.questions.length - 1));
      }, 360);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverFeedback, setServerFeedback] = useState<{
    xpEarned?: number;
    accuracy?: number;
    persisted?: boolean;
  } | null>(null);

  // Quiz Score Calculation
  const quizScore = useMemo(() => {
    if (!passage.questions || passage.questions.length === 0)
      return { correct: 0, total: 0, percent: 0 };
    let correct = 0;
    passage.questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    return {
      correct,
      total: passage.questions.length,
      percent: Math.round((correct / passage.questions.length) * 100),
    };
  }, [answers, passage.questions]);

  // Submit Quiz Handler
  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;

    if (Object.keys(answers).length < passage.questions.length) {
      const firstUnansweredIndex = passage.questions.findIndex((q) => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredIndex);
        setActiveRightTab("questions");
      }
      addToast({
        type: "warning",
        title: "Chưa hoàn thành câu hỏi",
        message: `Bạn đã trả lời ${Object.keys(answers).length}/${passage.questions.length} câu. Vui lòng hoàn thành câu ${firstUnansweredIndex + 1} trước khi nộp.`,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/reading/${encodeURIComponent(passage.id)}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          timeSpentSeconds: elapsedSeconds,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.summary) {
          setIsSubmitted(true);
          try {
            const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
            syncRoadmapSessionProgress({
              themeId: params?.get("theme") || params?.get("themeId") || undefined,
              unitNumber: params?.get("unit") ? parseInt(params.get("unit")!, 10) : undefined,
              lessonId: passage.id,
              skillType: "STORY",
              completedPart: 1,
              totalParts: 1,
            });
          } catch {}
          setServerFeedback({
            xpEarned: data.summary.xpEarned,
            accuracy: data.summary.accuracy,
            persisted: !!data.persisted,
          });

          awardXp(data.summary.xpEarned, "reading");

          try {
            const saved = localStorage.getItem("xp_reading_completed_passages");
            const list: string[] = saved ? JSON.parse(saved) : [];
            if (!list.includes(passage.id)) {
              list.push(passage.id);
              localStorage.setItem("xp_reading_completed_passages", JSON.stringify(list));
            }
          } catch {}

          addToast({
            type: "success",
            title: `🎉 Hoàn thành bài đọc: ${data.summary.accuracy}%`,
            message: `Bạn làm đúng ${data.summary.correctCount}/${data.summary.totalQuestions} câu! +${data.summary.xpEarned} XP đã được xác thực${data.persisted ? " và đồng bộ máy chủ" : ""}.`,
          });
          return;
        }
      }

      throw new Error("Lỗi kết nối máy chủ chấm điểm");
    } catch {
      setIsSubmitted(true);
      try {
        const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        syncRoadmapSessionProgress({
          themeId: params?.get("theme") || params?.get("themeId") || undefined,
          unitNumber: params?.get("unit") ? parseInt(params.get("unit")!, 10) : undefined,
          lessonId: passage.id,
          skillType: "STORY",
          completedPart: 1,
          totalParts: 1,
        });
      } catch {}
      const xpReward = quizScore.correct * 15 + 20;
      awardXp(xpReward, "reading");

      try {
        const saved = localStorage.getItem("xp_reading_completed_passages");
        const list: string[] = saved ? JSON.parse(saved) : [];
        if (!list.includes(passage.id)) {
          list.push(passage.id);
          localStorage.setItem("xp_reading_completed_passages", JSON.stringify(list));
        }
      } catch {}

      addToast({
        type: "success",
        title: `🎉 Hoàn thành bài đọc: ${quizScore.percent}%`,
        message: `Bạn làm đúng ${quizScore.correct}/${quizScore.total} câu! +${xpReward} XP thưởng.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setAnswers({});
    setIsSubmitted(false);
    setServerFeedback(null);
    setCurrentQuestionIndex(0);
    addToast({
      type: "info",
      title: "Làm lại bài đọc",
      message: "Tiến độ câu trả lời đã được đặt lại.",
    });
  };

  // Toggle Read Passage Audio
  const handleTogglePassageAudio = () => {
    if (isPlayingPassageAudio) {
      stopTTS();
      setIsPlayingPassageAudio(false);
    } else {
      setIsPlayingPassageAudio(true);
      speakLessonText(passage.passage, {
        onEnd: () => setIsPlayingPassageAudio(false),
      });
    }
  };

  // Parse paragraphs and translation
  const paragraphs = useMemo(() => {
    return passage.passage.split("\n\n").filter(Boolean);
  }, [passage.passage]);

  const translationParagraphs = useMemo(() => {
    return (passage.translation || "").split("\n\n").filter(Boolean);
  }, [passage.translation]);

  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden bg-[#fffefb] dark:bg-slate-950 font-sans select-none">
      {/* 1A. MOBILE APPTOPHEADER (Visible on Mobile/Tablet < 1024px, Hidden on Desktop lg:hidden) */}
      <AppTopHeader
        className="lg:hidden"
        onBack={handleBack}
        showGamificationStats={false}
        hideMobileSearch={true}
        rightExtraActions={
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleTogglePassageAudio}
              className={`h-8 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                isPlayingPassageAudio
                  ? "bg-[#0059bb] text-white border-[#0059bb]"
                  : "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              }`}
              title={isPlayingPassageAudio ? "Dừng đọc audio" : "Nghe toàn bộ bài đọc qua audio"}
            >
              {isPlayingPassageAudio ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
              )}
              <span className="hidden sm:inline">{isPlayingPassageAudio ? "Dừng nghe" : "Nghe bài"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBilingual((prev) => !prev)}
              className={`h-8 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                showBilingual
                  ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 font-extrabold"
                  : "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              }`}
              title="Bật/Tắt chế độ xem song ngữ"
            >
              {showBilingual ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
              )}
              <span className="hidden sm:inline">{showBilingual ? "Ẩn dịch" : "Song ngữ"}</span>
            </button>
          </div>
        }
      >
        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-[280px] font-display">
          {passage.title}
        </span>
      </AppTopHeader>

      {/* 1B. DESKTOP FLOATING STUDIO BAR (No AppTopHeader on Desktop) */}
      <header className="hidden lg:flex w-full max-w-6xl xl:max-w-7xl mx-auto px-8 pt-4 pb-2 items-center justify-between gap-3 shrink-0 z-20">
        {/* Left: Back Button */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="h-9 px-3.5 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 active:scale-95 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-1.5 font-bold text-xs"
            title="Quay lại danh mục bài đọc"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Danh mục bài đọc</span>
          </button>
        </div>

        {/* Right: Audio, Font Sizer & Bilingual Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Read Whole Passage Audio Toggle */}
          <button
            type="button"
            onClick={handleTogglePassageAudio}
            className={`h-9 px-3.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
              isPlayingPassageAudio
                ? "bg-[#0059bb] text-white border-[#0059bb]"
                : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/40 hover:text-[#0059bb]"
            }`}
            title={isPlayingPassageAudio ? "Dừng đọc audio" : "Nghe toàn bộ bài đọc qua audio"}
          >
            {isPlayingPassageAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Dừng nghe</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <span>Nghe bài đọc</span>
              </>
            )}
          </button>

          {/* Font Size Adjuster: A- A A+ */}
          <div className="flex items-center bg-white dark:bg-slate-900 p-0.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            {(["sm", "base", "lg"] as const).map((lvl, idx) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFontSizeLevel(lvl)}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                  fontSizeLevel === lvl
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 font-extrabold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {idx === 0 ? "A-" : idx === 1 ? "A" : "A+"}
              </button>
            ))}
          </div>

          {/* Inline Bilingual Mode Toggle */}
          <button
            type="button"
            onClick={() => setShowBilingual((prev) => !prev)}
            className={`h-9 px-3.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
              showBilingual
                ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 font-extrabold"
                : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/40"
            }`}
            title="Bật/Tắt chế độ xem song ngữ"
          >
            {showBilingual ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
            )}
            <span>{showBilingual ? "Ẩn dịch" : "Song ngữ"}</span>
          </button>
        </div>
      </header>

      {/* 1.5. MOBILE VIEWPORT SEGMENTED CAPSULE (< 1024px) */}
      <div className="block lg:hidden shrink-0 px-4 pt-2.5 pb-2 z-10">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setMobileViewTab("passage")}
            className={`h-8 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileViewTab === "passage"
                ? "bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bài đọc</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileViewTab("questions");
              setActiveRightTab("questions");
            }}
            className={`h-8 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileViewTab === "questions"
                ? "bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Câu hỏi ({Object.keys(answers).length}/{passage.questions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileViewTab("dictionary");
              setActiveRightTab("dictionary");
            }}
            className={`h-8 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileViewTab === "dictionary"
                ? "bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tra từ</span>
          </button>
        </div>
      </div>

      {/* 2. SPACIOUS CENTERED STUDIO WORKSPACE (Both Left & Right Cards Align 1:1 at the Top!) */}
      <div className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 pb-4 sm:pb-6 pt-1 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-8 min-h-0 overflow-hidden">
        {/* CỘT TRÁI: TRANG GIẤY BÀI ĐỌC THOÁNG ĐÃNG (EDITORIAL SHEET) */}
        <div
          className={`${
            mobileViewTab === "passage" ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          } h-full min-h-0 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xs overflow-hidden`}
        >
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-9 sm:py-8 lg:px-11 lg:py-9">
            <div className="max-w-[65ch] mx-auto space-y-6">
              {/* Editorial Header */}
              <div className="space-y-2.5 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/60">
                      Level {getLevelLabel(passage.level)}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {formatReadingCategoryVi(passage.category)} · {passage.wordCount} từ
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs text-[#0059bb] dark:text-sky-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chạm từ bất kỳ để tra nghĩa</span>
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display leading-snug tracking-tight">
                  {passage.title}
                </h1>
              </div>

              {/* Reading Paragraphs */}
              <div
                className={`space-y-5 font-sans text-slate-800 dark:text-slate-200 ${
                  fontSizeLevel === "sm"
                    ? "text-sm leading-[1.85]"
                    : fontSizeLevel === "lg"
                    ? "text-lg leading-[2.0]"
                    : "text-[15.5px] sm:text-base leading-[1.95]"
                }`}
              >
                {paragraphs.map((paragraph, pIdx) => {
                  const transPara = translationParagraphs[pIdx] || "";
                  const lines = paragraph.split("\n");

                  return (
                    <div key={pIdx} className="space-y-2.5">
                      <div className="space-y-2">
                        {lines.map((line, lIdx) => {
                          const trimmedLine = line.trim();
                          const isListItem = /^[0-9]+\.\s|^[-•*]\s/.test(trimmedLine);

                          return (
                            <p
                              key={lIdx}
                              className={
                                isListItem
                                  ? "pl-4 border-l-2 border-[#0059bb]/30 dark:border-sky-400/30 my-1 font-medium"
                                  : ""
                              }
                            >
                              {line.split(" ").map((token, wIdx) => {
                                if (!token) return null;
                                const match = token.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
                                const lead = match ? match[1] : "";
                                const core = match ? match[2] : token;
                                const trail = match ? match[3] : "";

                                const cleanWord = core.toLowerCase();
                                const isKeyVocab = passage.vocabularies?.some(
                                  (v) => v.word.toLowerCase() === cleanWord
                                );
                                // Only highlight with solid blue when in Dictionary tab
                                const isSelected =
                                  activeRightTab === "dictionary" &&
                                  selectedDeepWord?.word.toLowerCase() === cleanWord;

                                return (
                                  <React.Fragment key={wIdx}>
                                    {lead && <span>{lead}</span>}
                                    {core && (
                                      <span
                                        onClick={() => handleWordClick(core)}
                                        className={`cursor-pointer transition-colors duration-150 rounded-md inline ${
                                          isSelected
                                            ? "bg-[#0059bb] text-white font-medium px-1.5 py-0.5 shadow-2xs"
                                            : isKeyVocab
                                            ? "text-[#0059bb] dark:text-sky-300 font-semibold underline underline-offset-4 decoration-[#0059bb]/40 dark:decoration-sky-400/45 hover:bg-blue-50 dark:hover:bg-blue-950/60 px-0.5 py-0.5"
                                            : "hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-[#0059bb] dark:hover:text-sky-300 px-0.5 py-0.5"
                                        }`}
                                      >
                                        {core}
                                      </span>
                                    )}
                                    {trail}{" "}
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {showBilingual && transPara && (
                        <div className="pl-4 py-2 border-l-2 border-[#0059bb]/60 dark:border-sky-400/60 bg-slate-50/80 dark:bg-slate-800/40 rounded-r-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                          {transPara}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Bottom Action to Jump to Questions */}
          <div className="block lg:hidden shrink-0 p-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => {
                setMobileViewTab("questions");
                setActiveRightTab("questions");
              }}
              className="w-full h-11 rounded-2xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
            >
              <span>Làm câu hỏi đọc hiểu ({Object.keys(answers).length}/{passage.questions.length})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: KHUNG TƯƠNG TÁC CÂU HỎI & TỪ ĐIỂN (CĂN THẲNG HÀNG ĐỈNH 1:1 VỚI CỘT TRÁI) */}
        <div
          className={`${
            mobileViewTab !== "passage" ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          } h-full min-h-0 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xs overflow-hidden`}
        >
          {/* Integrated Top Tab Bar Inside the Right Card */}
          <div className="hidden lg:flex items-center justify-between gap-2 px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70">
              <button
                type="button"
                onClick={() => setActiveRightTab("questions")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRightTab === "questions"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Câu hỏi ({Object.keys(answers).length}/{passage.questions.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRightTab("dictionary")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRightTab === "dictionary"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Tra từ điển</span>
              </button>
            </div>
          </div>

          {/* Right Card Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-5 flex flex-col justify-between gap-5 min-h-0">
            {activeRightTab === "questions" ? (
              (() => {
                const q = passage.questions[currentQuestionIndex] || passage.questions[0];
                if (!q) return null;

                const selectedOption = answers[q.id];

                return (
                  <>
                    <div className="space-y-4">
                      {/* Clickable Question Step Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {passage.questions.map((item, idx) => {
                          const isCurrent = idx === currentQuestionIndex;
                          const isAnsweredItem = answers[item.id] !== undefined;
                          const isCorrectItem = isSubmitted && answers[item.id] === item.correct;
                          const isWrongItem =
                            isSubmitted &&
                            answers[item.id] !== undefined &&
                            answers[item.id] !== item.correct;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setCurrentQuestionIndex(idx)}
                              className={`h-7 px-3 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                                isCorrectItem
                                  ? "bg-emerald-500 text-white"
                                  : isWrongItem
                                  ? "bg-rose-500 text-white"
                                  : isCurrent
                                  ? "bg-[#0059bb] text-white shadow-2xs"
                                  : isAnsweredItem
                                  ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70"
                              }`}
                            >
                              Câu {idx + 1}
                            </button>
                          );
                        })}
                      </div>

                      {/* Question Prompt */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        {q.text}
                      </h3>

                      {/* 4 Answer Options */}
                      <div className="space-y-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionChosen = selectedOption === optIdx;
                          const isThisCorrect = isSubmitted && optIdx === q.correct;
                          const isThisWrongChosen =
                            isSubmitted && isOptionChosen && optIdx !== q.correct;

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left text-xs sm:text-[13.5px] font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${
                                isThisCorrect
                                  ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold"
                                  : isThisWrongChosen
                                  ? "bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100 font-bold"
                                  : isOptionChosen
                                  ? "bg-blue-50/80 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-200 font-bold shadow-2xs"
                                  : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/40 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                                    isThisCorrect
                                      ? "bg-emerald-600 text-white"
                                      : isThisWrongChosen
                                      ? "bg-rose-600 text-white"
                                      : isOptionChosen
                                      ? "bg-[#0059bb] text-white"
                                      : "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="leading-snug">{opt}</span>
                              </div>

                              {isThisCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              )}
                              {isThisWrongChosen && (
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after submission */}
                      {isSubmitted && (
                        <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                          <span className="font-bold text-[#0059bb] dark:text-sky-400 block font-display">
                            Giải thích đáp án:
                          </span>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>

                    {/* Unified Question Footer Navigation & Submission CTA (Never overflows) */}
                    <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 shrink-0">
                      {!isSubmitted ? (
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                            className="h-10 px-3.5 rounded-full border border-slate-200/90 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-all shrink-0"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Trước</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting}
                            className="flex-1 h-10 px-4 rounded-full bg-[#0059bb] hover:bg-blue-700 disabled:opacity-75 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all"
                          >
                            {isSubmitting ? (
                              <>
                                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                                <span>Đang chấm...</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Nộp bài ({Object.keys(answers).length}/{passage.questions.length})</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={currentQuestionIndex >= passage.questions.length - 1}
                            onClick={() =>
                              setCurrentQuestionIndex((prev) =>
                                Math.min(passage.questions.length - 1, prev + 1)
                              )
                            }
                            className="h-10 px-3.5 rounded-full border border-slate-200/90 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-all shrink-0"
                          >
                            <span>Tiếp</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 flex items-center justify-center font-black text-xs">
                                {serverFeedback?.accuracy ?? quizScore.percent}%
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                  Đúng {quizScore.correct}/{quizScore.total} câu
                                </p>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                  +{serverFeedback?.xpEarned ?? quizScore.correct * 15 + 20} XP Đọc hiểu
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleResetQuiz}
                              className="px-3 py-1.5 rounded-full border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Làm lại</span>
                            </button>
                          </div>

                          {nextPassage ? (
                            <button
                              type="button"
                              onClick={() => router.push(`/study/reading/${nextPassage.id}`)}
                              className="w-full h-10 rounded-full bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all"
                            >
                              <span>Bài đọc tiếp theo</span>
                              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleBack}
                              className="w-full h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Quay lại danh mục</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                );
              })()
            ) : (
              /* TAB 2: STREAMLINED, REAL-CONTEXT DICTIONARY INSPECTOR */
              <div className="space-y-5">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nhập từ vựng bất kỳ để tra nghĩa..."
                    value={dictSearchQuery}
                    onChange={(e) => setDictSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && dictSearchQuery.trim()) {
                        handleWordClick(dictSearchQuery.trim());
                      }
                    }}
                    className="w-full h-10 pl-10 pr-20 text-xs sm:text-sm font-medium rounded-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                  {dictSearchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => handleWordClick(dictSearchQuery.trim())}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#0059bb] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      Tra từ
                    </button>
                  )}
                </div>

                {isSearchingDict ? (
                  <div className="py-8 space-y-4 animate-pulse">
                    <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                    <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                  </div>
                ) : selectedDeepWord ? (
                  <div className="space-y-5">
                    {/* Unified Word Header: Word + POS + IPA + Audio + Save */}
                    <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white capitalize font-display">
                              {selectedDeepWord.word}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300">
                              {selectedDeepWord.pos}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold text-xs sm:text-sm">
                              {selectedDeepWord.ipa}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyIpa(selectedDeepWord.ipa)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                              title="Sao chép phiên âm IPA"
                            >
                              {copiedIpa ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSaveToNotebook(selectedDeepWord)}
                          className={`h-8 px-3 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 ${
                            savedWordsSet.has(selectedDeepWord.word.toLowerCase())
                              ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50 hover:text-[#0059bb]"
                          }`}
                        >
                          {savedWordsSet.has(selectedDeepWord.word.toLowerCase()) ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Đã lưu</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Lưu sổ tay</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Audio Buttons Row */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakLessonText(selectedDeepWord.word, { rate: 1.0 })}
                          className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-[#0059bb] text-[#0059bb] dark:text-sky-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe chuẩn (1.0x)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => speakLessonText(selectedDeepWord.word, { rate: 0.75 })}
                          className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Volume1 className="w-3.5 h-3.5" />
                          <span>Nghe chậm (0.75x)</span>
                        </button>
                      </div>
                    </div>

                    {/* Meaning & Real Detail Meaning */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                        Nghĩa tiếng Việt
                      </span>
                      <p className="text-sm sm:text-base text-slate-900 dark:text-white font-bold leading-relaxed">
                        {selectedDeepWord.meaning}
                      </p>
                      {selectedDeepWord.detailMeaning && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {selectedDeepWord.detailMeaning}
                        </p>
                      )}
                    </div>

                    {/* Real Context Sentence from the Reading Passage */}
                    {selectedDeepWord.example && (
                      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            Ngữ cảnh trong bài đọc
                          </span>
                          <button
                            type="button"
                            onClick={() => speakLessonText(selectedDeepWord.example)}
                            className="p-1 rounded-md text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer"
                            title="Nghe câu ví dụ"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          &ldquo;{selectedDeepWord.example}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Real Synonyms Only */}
                    {selectedDeepWord.synonyms && selectedDeepWord.synonyms.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          Từ đồng nghĩa
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDeepWord.synonyms.map((s, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => handleWordClick(s)}
                              className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#0059bb] hover:text-white cursor-pointer transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Key Vocabularies Shelf */}
                {passage.vocabularies && passage.vocabularies.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                      Từ vựng trọng tâm trong bài ({passage.vocabularies.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {passage.vocabularies.map((v, i) => {
                        const isThisSelected =
                          selectedDeepWord?.word.toLowerCase() === v.word.toLowerCase();
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleWordClick(v.word)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              isThisSelected
                                ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs"
                                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50"
                            }`}
                          >
                            {v.word}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
