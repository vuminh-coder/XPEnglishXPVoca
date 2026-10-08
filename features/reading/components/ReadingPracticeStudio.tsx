"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
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
  Lightbulb,
  Layers,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import {
  ReadingPassage,
  ReadingVocab,
  READING_PASSAGES_DATA,
} from "@/features/reading/data/readingMockData";

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

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [passage.id]);
  const [showBilingual, setShowBilingual] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg">("base");
  const [selectedDeepWord, setSelectedDeepWord] = useState<DeepWordDefinition | null>(() => {
    const firstVocab = passage.vocabularies?.[0];
    if (firstVocab) {
      const deep = lookupWordDeep(firstVocab.word);
      return {
        ...deep,
        word: firstVocab.word,
        ipa: firstVocab.ipa || deep.ipa,
        pos: firstVocab.pos || deep.pos,
        meaning: firstVocab.meaning || deep.meaning,
      };
    }
    return lookupWordDeep("reading");
  });
  const [dictSearchQuery, setDictSearchQuery] = useState("");
  const [isSearchingDict, setIsSearchingDict] = useState(false);
  const [keyVocabFilter, setKeyVocabFilter] = useState("");
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
      setSelectedDeepWord({
        ...deep,
        word: firstVocab.word,
        ipa: firstVocab.ipa || deep.ipa,
        pos: firstVocab.pos || deep.pos,
        meaning: firstVocab.meaning || deep.meaning,
      });
      setDictSearchQuery(firstVocab.word);
    }
  }, [passage.id, passage.vocabularies]);
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

  const formatElapsed = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

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

  // Deep Word Lookup Engine (Curated + Deep Lexicon + Async Online Enricher)
  const handleWordClick = useCallback(
    async (rawWord: string) => {
      const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").trim().toLowerCase();
      if (!cleanWord) return;

      // Pronounce clicked word immediately via TTS
      speakLessonText(cleanWord, { rate: 1.0 });

      // Switch right dock tab to dictionary inspector
      setActiveRightTab("dictionary");
      setDictSearchQuery(cleanWord);
      setIsSearchingDict(true);

      // Check if word exists in key vocabularies
      const matchedCurated = passage.vocabularies?.find(
        (v) => v.word.toLowerCase() === cleanWord
      );

      // Deep morphological & lexical lookup
      const deepDef = lookupWordDeep(cleanWord);

      const merged: DeepWordDefinition = {
        word: matchedCurated?.word || deepDef.word || cleanWord,
        ipa: matchedCurated?.ipa || deepDef.ipa || `/${cleanWord}/`,
        pos: matchedCurated?.pos || deepDef.pos || "Từ vựng (Word)",
        meaning: matchedCurated?.meaning || deepDef.meaning,
        detailMeaning: deepDef.detailMeaning || `Nghĩa của từ "${cleanWord}" trong ngữ cảnh bài đọc.`,
        rootWord: deepDef.rootWord,
        collocations: deepDef.collocations,
        example: deepDef.example || `Usage in reading passage context.`,
        synonyms: deepDef.synonyms,
      };

      setSelectedDeepWord(merged);
      setIsSearchingDict(false);

      // Async enrichment from online dictionary API
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
            const onlineSynonyms = firstMeaning?.synonyms || entry.meanings?.flatMap((m: any) => m.synonyms || []).slice(0, 5);

            setSelectedDeepWord((prev) => {
              if (!prev || prev.word.toLowerCase() !== cleanWord) return prev;
              return {
                ...prev,
                ipa: prev.ipa && prev.ipa !== `/${cleanWord}/` ? prev.ipa : onlineIpa || prev.ipa,
                pos: prev.pos && prev.pos !== "Từ vựng (Word)" ? prev.pos : onlinePos ? `${onlinePos} (${prev.pos})` : prev.pos,
                detailMeaning: prev.detailMeaning || onlineDef,
                example: prev.example && prev.example !== `Usage in reading passage context.` ? prev.example : onlineExample || prev.example,
                synonyms: prev.synonyms && prev.synonyms.length > 0 ? prev.synonyms : onlineSynonyms?.length ? onlineSynonyms : prev.synonyms,
              };
            });
          }
        }
      } catch {}
    },
    [passage.vocabularies]
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

  // Quiz Selection Handler (Tự động chuyển mượt sang câu tiếp theo khi chọn đáp án)
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    // Tự động chuyển tiếp câu hỏi sau 360ms để người học kịp thấy phản hồi thị giác
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

  // Submit Quiz Handler (Calls Server-side Grading API)
  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;

    if (Object.keys(answers).length < passage.questions.length) {
      // Tự động nhảy đến câu hỏi đầu tiên chưa được trả lời
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
          setServerFeedback({
            xpEarned: data.summary.xpEarned,
            accuracy: data.summary.accuracy,
            persisted: !!data.persisted,
          });

          // Award verified XP in user store
          awardXp(data.summary.xpEarned, "reading");

          // Save completed passage to localStorage
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

      // If server response not OK, fallback to client-side scoring
      throw new Error("Lỗi kết nối máy chủ chấm điểm");
    } catch {
      // Offline fallback
      setIsSubmitted(true);
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
    <div className="w-full h-screen max-h-screen flex flex-col overflow-hidden bg-slate-50/50 dark:bg-slate-950 font-sans select-none">
      {/* 1. TOP STUDIO HEADER (CHUẨN FORM STUDIO, ĐỒNG BỘ HOÀN TOÀN VỚI DICTATION & LISTENING) */}
      <header className="h-14 min-h-[56px] border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 sm:px-6 flex items-center justify-between gap-3 shrink-0 shadow-2xs z-10">
        {/* Left: Back Button & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 active:scale-95 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs flex items-center gap-1.5 font-bold text-xs"
            title="Quay lại danh mục bài đọc"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs shrink-0">
            {getLevelLabel(passage.level)}
          </span>

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm lg:text-[15px] font-bold text-slate-900 dark:text-white truncate font-sans max-w-[150px] xs:max-w-xs sm:max-w-md lg:max-w-lg">
              {passage.title}
            </h1>
          </div>
        </div>

        {/* Right: Timer, Font Sizer & Bilingual Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Practice Timer */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
            <span>{formatElapsed(elapsedSeconds)}</span>
          </div>

          {/* Read Whole Passage Audio Toggle */}
          <button
            type="button"
            onClick={handleTogglePassageAudio}
            className={`h-8 px-2.5 sm:px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
              isPlayingPassageAudio
                ? "bg-[#0059bb] text-white border-[#0059bb]"
                : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0059bb]"
            }`}
            title={isPlayingPassageAudio ? "Dừng đọc audio" : "Nghe toàn bộ bài đọc qua audio"}
          >
            {isPlayingPassageAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Dừng audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <span className="hidden md:inline">Nghe bài</span>
              </>
            )}
          </button>

          {/* Font Size Adjuster: A- A A+ */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setFontSizeLevel("sm")}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                fontSizeLevel === "sm"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Cỡ chữ nhỏ"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel("base")}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                fontSizeLevel === "base"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Cỡ chữ chuẩn"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel("lg")}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                fontSizeLevel === "lg"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Cỡ chữ lớn"
            >
              A+
            </button>
          </div>

          {/* Inline Bilingual Mode Toggle */}
          <button
            type="button"
            onClick={() => setShowBilingual((prev) => !prev)}
            className={`h-8 px-2.5 sm:px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
              showBilingual
                ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 font-extrabold"
                : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Bật/Tắt chế độ xem song ngữ"
          >
            {showBilingual ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
            )}
            <span className="hidden sm:inline">{showBilingual ? "Văn bản gốc" : "Song ngữ"}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 2-COLUMN SPLIT PANE STUDIO (ZERO FLOATING BLOCKS) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* CỘT TRÁI (60%): BÀI ĐỌC VĂN BẢN (EDITORIAL STYLED PASSAGE) */}
        <div className="flex-1 lg:flex-[6] h-full overflow-y-auto p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 space-y-6 bg-white dark:bg-slate-950">
          {/* Passage Meta Card (Double-Bezel Agency Design) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                {passage.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold font-mono bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/60">
                    {getLevelLabel(passage.level)}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    {passage.category} · {passage.duration || "4 min"}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-tight truncate">
                  {passage.title}
                </h2>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 block tabular-nums">
                {passage.wordCount} từ
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#0059bb] dark:text-sky-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Chạm từ để tra nghĩa</span>
              </span>
            </div>
          </div>

          {/* Reading Paragraphs with Editorial Typography & Inline Bilingual Support */}
          <div
            className={`space-y-6 font-sans text-slate-800 dark:text-slate-200 ${
              fontSizeLevel === "sm"
                ? "text-xs sm:text-sm leading-[1.8] sm:leading-[1.9]"
                : fontSizeLevel === "lg"
                ? "text-base sm:text-lg leading-[1.9] sm:leading-[2.0]"
                : "text-[14.5px] sm:text-base leading-[1.85] sm:leading-[1.95]"
            }`}
          >
            {paragraphs.map((paragraph, pIdx) => {
              const transPara = translationParagraphs[pIdx] || "";
              const lines = paragraph.split("\n");

              return (
                <div key={pIdx} className="space-y-3">
                  {/* English Paragraph Lines */}
                  <div className="space-y-2">
                    {lines.map((line, lIdx) => {
                      const trimmedLine = line.trim();
                      const isListItem = /^[0-9]+\.\s|^[-•*]\s/.test(trimmedLine);

                      return (
                        <p
                          key={lIdx}
                          className={`${
                            isListItem
                              ? "pl-3 sm:pl-4 border-l-2 border-[#0059bb]/30 dark:border-sky-400/30 my-1 font-medium text-slate-800 dark:text-slate-200"
                              : ""
                          }`}
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
                            const isSelected = selectedDeepWord?.word.toLowerCase() === cleanWord;

                            return (
                              <React.Fragment key={wIdx}>
                                {lead && <span>{lead}</span>}
                                {core && (
                                  <span
                                    onClick={() => handleWordClick(core)}
                                    className={`cursor-pointer transition-colors duration-150 rounded-[3px] inline ${
                                      isSelected
                                        ? "bg-[#0059bb] text-white font-medium px-1 py-[0.5px] shadow-2xs"
                                        : isKeyVocab
                                        ? "text-[#0059bb] dark:text-sky-300 font-semibold underline underline-offset-[3px] decoration-[#0059bb]/45 dark:decoration-sky-400/50 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-[#0059bb] dark:hover:text-sky-200 hover:decoration-[#0059bb] px-0.5 py-[0.5px]"
                                        : "hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-[#0059bb] dark:hover:text-sky-300 px-0.5 py-[0.5px] text-slate-800 dark:text-slate-200"
                                    }`}
                                  >{core}</span>
                                )}{trail}{" "}
                              </React.Fragment>
                            );
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Inline Bilingual Translation (UI như cũ, chuẩn form, ZERO chữ nghiêng) */}
                  {showBilingual && transPara && (
                    <div className="pl-4 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-2">
                      {transPara}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CỘT PHẢI (40%): DOCK TƯƠNG TÁC (TÍCH HỢP TAB CÂU HỎI & TAB TRA TỪ LIỀN MẠCH) */}
        <div className="flex-1 lg:flex-[4] h-full flex flex-col bg-slate-50/40 dark:bg-slate-900/70 border-t lg:border-t-0 min-h-0 relative overflow-hidden">
          {/* Header Tab Switcher (CỐ ĐỊNH Ở TRÊN CÙNG - TINH GỌN 1 HÀNG DUY NHẤT) */}
          <div className="p-3 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 z-10 shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveRightTab("questions")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeRightTab === "questions"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Câu hỏi ({passage.questions.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRightTab("dictionary")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeRightTab === "dictionary"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Tra từ điển</span>
                </button>
              </div>

              {activeRightTab === "questions" && (
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {Object.keys(answers).length}/{passage.questions.length} đã làm
                </span>
              )}
            </div>
          </div>

          {/* VÙNG NỘI DUNG CUỘN TRỌN GÓI (CHỈ HIỂN THỊ 1 CÂU DUY NHẤT TẠI MỘT THỜI ĐIỂM) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0 pb-28 lg:pb-5">
            {activeRightTab === "questions" && (
              (() => {
                const q = passage.questions[currentQuestionIndex] || passage.questions[0];
                if (!q) return null;

                const selectedOption = answers[q.id];
                const isCorrect = isSubmitted && selectedOption === q.correct;
                const isWrong =
                  isSubmitted && selectedOption !== undefined && selectedOption !== q.correct;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-4 ${
                      isCorrect
                        ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 shadow-2xs"
                        : isWrong
                        ? "bg-rose-50/50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 shadow-2xs"
                        : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-2xs"
                    }`}
                  >
                    {/* Header Câu Hỏi Hiện Tại */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 font-mono font-bold text-xs">
                        Câu {currentQuestionIndex + 1} / {passage.questions.length}
                      </span>

                      {selectedOption !== undefined ? (
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã chọn đáp án</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400">
                          Chưa trả lời
                        </span>
                      )}
                    </div>

                    {/* Nội dung câu hỏi */}
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {q.text}
                    </p>

                    {/* 4 Lựa chọn trắc nghiệm */}
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
                            className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-[13px] font-medium flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                              isThisCorrect
                                ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold ring-1 ring-emerald-500/40 shadow-xs"
                                : isThisWrongChosen
                                ? "bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100 font-bold ring-1 ring-rose-500/40 shadow-xs"
                                : isOptionChosen
                                ? "bg-blue-50 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-200 font-bold shadow-2xs ring-1 ring-[#0059bb]/30"
                                : "bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/40 hover:bg-slate-100/80"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold shrink-0 transition-colors ${
                                  isThisCorrect
                                    ? "bg-emerald-600 text-white"
                                    : isThisWrongChosen
                                    ? "bg-rose-600 text-white"
                                    : isOptionChosen
                                    ? "bg-[#0059bb] text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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

                    {/* Giải thích sau khi nộp bài */}
                    {isSubmitted && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                        <span className="font-bold text-[#0059bb] dark:text-sky-400 block font-display">
                          Giải thích đáp án:
                        </span>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}

                    {/* Thanh điều hướng: Câu trước / Số câu / Câu tiếp theo (Căn chỉnh cân đối) */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-2">
                      <button
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        className="h-8 px-3 rounded-lg border border-slate-200/90 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Câu trước</span>
                      </button>

                      <div className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {currentQuestionIndex + 1} / {passage.questions.length}
                      </div>

                      <button
                        type="button"
                        disabled={currentQuestionIndex >= passage.questions.length - 1}
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(passage.questions.length - 1, prev + 1)
                          )
                        }
                        className="h-8 px-3 rounded-lg border border-slate-200/90 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <span>Câu tiếp</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()
            )}

            {/* TAB 2: INTEGRATED DEEP DICTIONARY INSPECTOR (CHUYÊN SÂU TOÀN DIỆN, 0% POPUP NỔI) */}
            {activeRightTab === "dictionary" && (
              <div className="space-y-4">
                {/* 1. THANH TÌM KIẾM TỪ ĐIỂN CHỦ ĐỘNG */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Gõ từ bất kỳ để tra cứu chuyên sâu..."
                    value={dictSearchQuery}
                    onChange={(e) => setDictSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && dictSearchQuery.trim()) {
                        handleWordClick(dictSearchQuery.trim());
                      }
                    }}
                    className="w-full h-10 pl-9 pr-20 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/15 transition-all shadow-2xs"
                  />
                  {dictSearchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => handleWordClick(dictSearchQuery.trim())}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0059bb] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                    >
                      Tra từ
                    </button>
                  )}
                </div>

                {/* 2. TRẠNG THÁI TẢI SKELETON KHI ĐANG TRA CỨU */}
                {isSearchingDict ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 animate-pulse">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="space-y-2">
                        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded-md" />
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded-md" />
                      </div>
                      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    </div>
                    <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                    <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl" />
                  </div>
                ) : selectedDeepWord ? (
                  /* 3. THẺ TRA CỨU TỪ ĐIỂN CHUYÊN SÂU (BENTO BOX AGENCY DESIGN) */
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
                    {/* Header: Từ vựng + Loại từ + Nút lưu sổ tay */}
                    <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white capitalize font-display">
                            {selectedDeepWord.word}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 border border-blue-200/70 dark:border-blue-800/70">
                            {selectedDeepWord.pos}
                          </span>
                        </div>
                        {savedWordsSet.has(selectedDeepWord.word.toLowerCase()) && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            <span>Đã có trong Sổ tay</span>
                          </span>
                        )}
                      </div>

                      {/* Nút lưu vào Sổ tay cá nhân (+5 XP) */}
                      <button
                        type="button"
                        onClick={() => handleSaveToNotebook(selectedDeepWord)}
                        className={`h-8 px-2.5 sm:px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0 active:scale-95 ${
                          savedWordsSet.has(selectedDeepWord.word.toLowerCase())
                            ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50 hover:text-[#0059bb]"
                        }`}
                        title="Lưu từ vào sổ tay ôn tập Spaced Repetition (+5 XP)"
                      >
                        {savedWordsSet.has(selectedDeepWord.word.toLowerCase()) ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã lưu</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Lưu từ (+5 XP)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Thanh Phát âm đa tốc độ & Phiên âm IPA */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#0059bb] dark:text-sky-400 font-bold text-xs sm:text-sm">
                          {selectedDeepWord.ipa}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyIpa(selectedDeepWord.ipa)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                          title="Sao chép phiên âm IPA"
                        >
                          {copiedIpa ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => speakLessonText(selectedDeepWord.word, { rate: 1.0 })}
                          className="px-2.5 py-1 rounded-lg bg-[#0059bb] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs active:scale-95"
                          title="Phát âm tốc độ chuẩn (1.0x)"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>1.0x</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => speakLessonText(selectedDeepWord.word, { rate: 0.75 })}
                          className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                          title="Phát âm chậm luyện nghe (0.75x)"
                        >
                          <Volume1 className="w-3.5 h-3.5" />
                          <span>0.75x</span>
                        </button>
                      </div>
                    </div>

                    {/* Giải nghĩa tiếng Việt chuẩn ngữ cảnh */}
                    <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/50 space-y-1">
                      <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-300 uppercase tracking-wider font-display block">
                        Giải nghĩa tiếng Việt chuẩn ngữ cảnh:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
                        {selectedDeepWord.meaning}
                      </p>
                    </div>

                    {/* Định nghĩa chuyên sâu & Sắc thái ngữ nghĩa */}
                    {selectedDeepWord.detailMeaning && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-display flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Định nghĩa chi tiết:</span>
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {selectedDeepWord.detailMeaning}
                        </p>
                      </div>
                    )}

                    {/* Gốc từ & Phân tích hình thái */}
                    {selectedDeepWord.rootWord && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gốc từ & biến thể:</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                          {selectedDeepWord.rootWord}
                        </span>
                      </div>
                    )}

                    {/* Cụm từ kết hợp tự nhiên (Collocations) */}
                    {selectedDeepWord.collocations && selectedDeepWord.collocations.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-display block">
                          Cụm từ kết hợp tự nhiên (Collocations):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDeepWord.collocations.map((c, cIdx) => (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={() => speakLessonText(c)}
                              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50 hover:text-[#0059bb] flex items-center gap-1 cursor-pointer transition-colors"
                              title="Nhấn để nghe phát âm cả cụm"
                            >
                              <span>{c}</span>
                              <Volume2 className="w-3 h-3 opacity-60" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Câu ví dụ thực tế */}
                    {selectedDeepWord.example && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-display block">
                            Ví dụ thực tế:
                          </span>
                          <button
                            type="button"
                            onClick={() => speakLessonText(selectedDeepWord.example)}
                            className="p-1 rounded-md text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Nghe đọc cả câu ví dụ"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed font-sans">
                          &quot;{selectedDeepWord.example}&quot;
                        </p>
                      </div>
                    )}

                    {/* Từ đồng nghĩa (Synonyms) - Bấm để chuyển nhanh */}
                    {selectedDeepWord.synonyms && selectedDeepWord.synonyms.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-display block">
                          Từ đồng nghĩa (Chạm để tra cứu ngay):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDeepWord.synonyms.map((s, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => handleWordClick(s)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold text-[#0059bb] dark:text-sky-300 hover:bg-[#0059bb] hover:text-white cursor-pointer transition-all active:scale-95"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quay lại trả lời câu hỏi */}
                    <button
                      type="button"
                      onClick={() => setActiveRightTab("questions")}
                      className="w-full py-2.5 rounded-xl border border-slate-200/90 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0059bb] hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Quay lại trả lời câu hỏi ➔</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-xs font-medium">
                      Chạm vào bất kỳ từ nào trong bài đọc để tra cứu từ điển chuyên sâu tại đây.
                    </p>
                  </div>
                )}

                {/* 4. KỆ TỪ VỰNG TRỌNG TÂM BÀI ĐỌC (TÍCH HỢP TÌM KIẾM NHANH) */}
                {passage.vocabularies && passage.vocabularies.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display">
                        <Bookmark className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                        <span>Từ vựng trọng tâm bài này ({passage.vocabularies.length})</span>
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">Chạm từ để phân tích</span>
                    </div>

                    {/* Bộ lọc từ vựng trọng tâm nếu nhiều hơn 4 từ */}
                    {passage.vocabularies.length > 4 && (
                      <input
                        type="text"
                        placeholder="Lọc từ trọng tâm..."
                        value={keyVocabFilter}
                        onChange={(e) => setKeyVocabFilter(e.target.value)}
                        className="w-full h-8 px-2.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                      />
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {passage.vocabularies
                        .filter((v) =>
                          keyVocabFilter
                            ? v.word.toLowerCase().includes(keyVocabFilter.toLowerCase()) ||
                              v.meaning.toLowerCase().includes(keyVocabFilter.toLowerCase())
                            : true
                        )
                        .map((v, i) => {
                          const isThisSelected =
                            selectedDeepWord?.word.toLowerCase() === v.word.toLowerCase();
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleWordClick(v.word)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                                isThisSelected
                                  ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs font-bold"
                                  : "bg-slate-50 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]/50 hover:bg-blue-50/50"
                              }`}
                            >
                              <span>{v.word}</span>
                              {v.pos && (
                                <span className="text-[10px] opacity-75 font-mono font-normal">
                                  · {v.pos}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BOTTOM SUBMISSION ACTION BAR (GẮN CỐ ĐỊNH Ở ĐÁY CỘT PHẢI & MÀN HÌNH, 0% XÊ DỊCH) */}
          <div className="fixed bottom-0 left-0 right-0 lg:static shrink-0 p-3.5 sm:p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg lg:shadow-none z-30 space-y-2.5">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#0059bb] hover:bg-blue-700 disabled:opacity-75 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0059bb]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Đang chấm bài & xác thực</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Nộp bài & Chấm điểm tức thì</span>
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                {/* Result Score Bento Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 flex items-center justify-center font-black text-sm">
                      {serverFeedback?.accuracy ?? quizScore.percent}%
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Đúng {quizScore.correct}/{quizScore.total} câu hỏi
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs text-[#0059bb] dark:text-sky-400 font-semibold">
                          +{serverFeedback?.xpEarned ?? quizScore.correct * 15 + 20} XP Đọc hiểu
                        </span>
                        {serverFeedback?.persisted && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                            Đã lưu máy chủ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại</span>
                  </button>
                </div>

                {/* Next Passage or Back to Listing Actions */}
                <div className="flex items-center gap-2">
                  {nextPassage ? (
                    <button
                      type="button"
                      onClick={() => router.push(`/study/reading/${nextPassage.id}`)}
                      className="flex-1 h-10 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Bài đọc tiếp theo</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Quay lại danh mục</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
