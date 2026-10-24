"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import { partitionVocabularyPool } from "@/features/vocabulary/utils/vocabularyPartition";
import { syncRoadmapSessionProgress } from "@/features/roadmap";
import { usePracticeCatalogStore, INITIAL_PRACTICE_VOCABS } from "@/stores/practiceCatalogStore";
import { PracticeWord, SubMode, QuizOption, FlashcardRating } from "../types";
import { getBookmarkedWords, toggleBookmark } from "../utils/bookmark";
import { getDeterministicRandom } from "../utils/shuffle";
import { stripParentheses } from "../utils/cleanText";
import { usePracticeSpeech } from "./usePracticeSpeech";

const QUESTION_TIME_LIMIT = 30;

export function usePracticeSession() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const themeParam = searchParams.get("themeId") || searchParams.get("theme");
  const unitParam = searchParams.get("unit");
  const partParam = searchParams.get("part");
  const totalPartsParam = searchParams.get("totalParts");
  const levelParam = searchParams.get("level");
  const modeParam = searchParams.get("subMode") || searchParams.get("mode");
  const isCheckpoint = searchParams.get("mode") === "checkpoint" || modeParam === "checkpoint";

  const { submitReview, learned } = useVocabularyStore();
  const { addToast } = useNotificationStore();
  const { awardXp } = useAuthStore();
  const { incrementProgress } = useDailyChallengeStore();

  // SWR In-Memory Store & Persistent Session State
  const {
    practiceVocabs,
    fetchPracticeVocabs,
    subMode,
    setSubMode,
    currentIndex,
    setCurrentIndex,
    elapsedTime,
    setElapsedTime,
    isCompleted,
    setIsCompleted,
    restartSession,
  } = usePracticeCatalogStore();

  const [isLoading, setIsLoading] = useState(false);

  // Timer tracking reference
  const elapsedTimeRef = useRef(0);

  // Active study time tracker for analytics (stops when completed)
  useStudyTimeTracker("vocab", {
    activeCondition: !isLoading && practiceVocabs.length > 0 && !isCompleted,
  });

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  // Timer runs continuously without restarting on sub-mode switches
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  // Record practice time on page exit only if session was not completed
  const subModeRef = useRef(subMode);
  useEffect(() => {
    subModeRef.current = subMode;
  }, [subMode]);

  useEffect(() => {
    return () => {
      if (!isCompleted && elapsedTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
        const targetSkill =
          subModeRef.current === "writing"
            ? "writing"
            : subModeRef.current === "speaking"
            ? "speaking"
            : "vocab";
        useUserStore.getState().addPracticeTime(mins, targetSkill);
      }
    };
  }, [isCompleted]);

  // Sync modeParam from URL
  useEffect(() => {
    if (
      modeParam === "flashcard" ||
      modeParam === "writing" ||
      modeParam === "speaking" ||
      modeParam === "quiz" ||
      modeParam === "match_pairs" ||
      modeParam === "sentence_builder"
    ) {
      setSubMode(modeParam as SubMode);
    }
  }, [modeParam]);

  // Extract vocabulary pool matching this theme if specified
  const rawThemeVocabs = useMemo(() => {
    if (!themeParam) return null;
    const basicMatches = BASIC_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (basicMatches.length > 0) return basicMatches;
    const advMatches = ADVANCED_VOCABULARIES.filter((v) => v.themeId === themeParam);
    if (advMatches.length > 0) return advMatches;
    return null;
  }, [themeParam]);

  // Partition vocabulary pool according to partParam and totalPartsParam
  const partitionResult = useMemo(() => {
    if (!rawThemeVocabs || rawThemeVocabs.length === 0) {
      return {
        items: [] as typeof rawThemeVocabs,
        currentPart: 1,
        totalParts: 1,
        hasNextPart: false,
        nextPartNumber: undefined as number | undefined,
        hasPrevPart: false,
        prevPartNumber: undefined as number | undefined,
      };
    }
    if (isCheckpoint) {
      // Checkpoint mode: 15 curated questions across the theme pool
      return {
        items: rawThemeVocabs.slice(0, 15),
        currentPart: 1,
        totalParts: 1,
        hasNextPart: false,
        nextPartNumber: undefined,
        hasPrevPart: false,
        prevPartNumber: undefined,
      };
    }
    return partitionVocabularyPool(rawThemeVocabs, {
      part: partParam,
      totalParts: totalPartsParam,
    });
  }, [rawThemeVocabs, partParam, totalPartsParam, isCheckpoint]);

  // Load vocabularies from Backend API via SWR Store (only when no themeParam provided)
  useEffect(() => {
    if (themeParam) return;
    let isCancelled = false;
    fetchPracticeVocabs({ themeId: themeParam, level: levelParam }).then((items) => {
      if (!isCancelled && items && items.length > 0) {
        setIsLoading(false);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [dateParam, themeParam, levelParam, fetchPracticeVocabs]);

  // Guaranteed partitioned or 25 items session with 0ms Frame-0 render
  const vocabs: PracticeWord[] = useMemo(() => {
    if (rawThemeVocabs && partitionResult.items && partitionResult.items.length > 0) {
      return partitionResult.items.map((item, idx) => ({
        id: item.id || `practice_vocab_${idx}`,
        word: item.word,
        meaning: stripParentheses(item.definitionVn || item.definition),
        ipa: item.phonetic || "/.../",
        type: item.pos === "adj" ? "adjective" : item.pos || "noun",
        level: (item as any).level || (item.difficulty === 1 ? "A1" : item.difficulty === 2 ? "A2" : "B1"),
        topic: stripParentheses((item as any).themeNameVn || (item as any).themeId || "Từ vựng theo chủ đề"),
        example: item.examples?.[0] || `Practice using ${item.word}.`,
        exampleVi: item.exampleTranslations?.[0] || `Luyện tập từ ${item.word}.`,
      }));
    }
    if (practiceVocabs && practiceVocabs.length >= 25) return practiceVocabs.slice(0, 25);
    if (practiceVocabs && practiceVocabs.length > 0) {
      const combined = [...practiceVocabs, ...INITIAL_PRACTICE_VOCABS];
      const uniqueMap = new Map<string, PracticeWord>();
      combined.forEach((w) => uniqueMap.set(w.word.toLowerCase(), w));
      return Array.from(uniqueMap.values()).slice(0, 25);
    }
    return INITIAL_PRACTICE_VOCABS;
  }, [rawThemeVocabs, partitionResult.items, practiceVocabs]);

  const currentWord = vocabs[currentIndex] || vocabs[0];

  // Bookmarks
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  useEffect(() => {
    setBookmarkedList(getBookmarkedWords());
  }, []);

  const isCurrentBookmarked = Boolean(
    currentWord && bookmarkedList.includes(currentWord.id || currentWord.word)
  );

  const handleToggleBookmark = useCallback(() => {
    if (!currentWord) return;
    const wordKey = currentWord.id || currentWord.word;
    const isSaved = toggleBookmark(wordKey);
    setBookmarkedList(getBookmarkedWords());
    addToast({
      type: isSaved ? "success" : "info",
      title: isSaved ? "Đã lưu vào Sổ tay từ vựng" : "Đã bỏ lưu từ vựng",
      message: isSaved
        ? `+5 XP cho từ "${currentWord.word}"`
        : `Đã gỡ "${currentWord.word}" khỏi danh sách lưu.`,
    });
    if (isSaved) awardXp(5);
  }, [currentWord, addToast, awardXp]);

  // Audio helper
  const playWordAudio = useCallback(
    (word: string, rate: number = 0.95, accent: string = "en-US") => {
      if (!word) return;
      speakLessonText(word, {
        speakerIndex: 1,
        accent,
        rate,
      });
    },
    []
  );

  // 1. QUIZ SUB-MODE STATE
  const [qSelectedOpt, setQSelectedOpt] = useState<string | null>(null);
  const [qIsAnswered, setQIsAnswered] = useState(false);
  const [qIsCorrect, setQIsCorrect] = useState(false);
  const [qXp, setQXp] = useState(0);
  const [qCorrectCount, setQCorrectCount] = useState(0);

  // Deterministic 2x2 quiz options
  const quizOptions: QuizOption[] = useMemo(() => {
    if (!currentWord) return [];
    const correctOpt: QuizOption = {
      id: "correct",
      text: stripParentheses(currentWord.meaning),
      isCorrect: true,
    };
    const otherVocabs = vocabs.filter(
      (v) => (v.id || v.word) !== (currentWord.id || currentWord.word)
    );

    const seed = `${currentWord.id || currentWord.word}_${currentIndex}`;
    const prng1 = getDeterministicRandom(seed + "_others");
    const shuffledOthers = [...otherVocabs].sort(() => 0.5 - prng1()).slice(0, 3);
    const wrongOpts: QuizOption[] = shuffledOthers.map((v, i) => ({
      id: `wrong_${i}`,
      text: stripParentheses(v.meaning),
      isCorrect: false,
    }));

    const prng2 = getDeterministicRandom(seed + "_final");
    return [correctOpt, ...wrongOpts].sort(() => 0.5 - prng2());
  }, [currentWord, vocabs, currentIndex]);

  const handleSelectQuizOption = useCallback(
    (opt: QuizOption) => {
      if (qIsAnswered || !currentWord) return;
      setQSelectedOpt(opt.id);
      setQIsAnswered(true);
      setQIsCorrect(opt.isCorrect);

      if (opt.isCorrect) {
        awardXp(10);
        setQXp((prev) => prev + 10);
        setQCorrectCount((prev) => prev + 1);
        incrementProgress("practice_words", 1);
        incrementProgress("learn_words", 1);
        submitReview(currentWord.id || currentWord.word, 4);
        playWordAudio(currentWord.word);
      } else {
        submitReview(currentWord.id || currentWord.word, 1);
      }
    },
    [qIsAnswered, currentWord, awardXp, incrementProgress, submitReview, playWordAudio]
  );

  // 2. FLASHCARD SUB-MODE STATE
  const [fIsFlipped, setFIsFlipped] = useState(false);
  const [fXp, setFXp] = useState(0);

  // 3. WRITING SUB-MODE STATE
  const writingInputRef = useRef<HTMLInputElement | null>(null);
  const [wInput, setWInput] = useState("");
  const [wIsAnswered, setWIsAnswered] = useState(false);
  const [wIsCorrect, setWIsCorrect] = useState(false);
  const [wXp, setWXp] = useState(0);
  const [wShowHint, setWShowHint] = useState(false);
  const [wCorrectCount, setWCorrectCount] = useState(0);

  const handleCheckWriting = useCallback(() => {
    if (wIsAnswered || !wInput.trim() || !currentWord) return;
    const cleanInput = wInput.trim().toLowerCase();
    const cleanTarget = currentWord.word.trim().toLowerCase();
    const isPassed = cleanInput === cleanTarget;

    setWIsAnswered(true);
    setWIsCorrect(isPassed);

    if (isPassed) {
      const earned = wShowHint ? 8 : 15;
      awardXp(earned);
      setWXp((prev) => prev + earned);
      setWCorrectCount((prev) => prev + 1);
      incrementProgress("write_practice", 1);
      incrementProgress("practice_words", 1);
      submitReview(currentWord.id || currentWord.word, 4);
      playWordAudio(currentWord.word);
    } else {
      submitReview(currentWord.id || currentWord.word, 1);
    }
  }, [wIsAnswered, wInput, currentWord, wShowHint, awardXp, incrementProgress, submitReview, playWordAudio]);

  // 4. SPEAKING SUB-MODE STATE
  const [sXp, setSXp] = useState(0);
  const [sCorrectCount, setSCorrectCount] = useState(0);

  const handleSpeechSuccess = useCallback(
    (_accuracyScore: number) => {
      if (!currentWord) return;
      awardXp(15);
      setSXp((prev) => prev + 15);
      setSCorrectCount((prev) => prev + 1);
      incrementProgress("speak_practice", 1);
      incrementProgress("review_cards", 1);
      incrementProgress("learn_words", 1);
      submitReview(currentWord.id || currentWord.word, 4);
    },
    [currentWord, awardXp, incrementProgress, submitReview]
  );

  const handleSpeechFail = useCallback(
    (_accuracyScore: number) => {
      if (!currentWord) return;
      submitReview(currentWord.id || currentWord.word, 1);
    },
    [currentWord, submitReview]
  );

  const speech = usePracticeSpeech({
    onSuccess: handleSpeechSuccess,
    onFail: handleSpeechFail,
  });

  // Per-question countdown timer (30s)
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);

  const handleStartSpeaking = useCallback(() => {
    if (!currentWord) return;
    // Retrying after a failed / timed-out attempt gets a fresh countdown.
    if (speech.isAnswered) {
      setQuestionTimeLeft(QUESTION_TIME_LIMIT);
    }
    speech.startSpeaking(currentWord.word);
  }, [currentWord, speech]);

  useEffect(() => {
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
  }, [currentIndex]);

  useEffect(() => {
    if (
      (subMode !== "quiz" && subMode !== "writing" && subMode !== "speaking") ||
      (subMode === "quiz" && qIsAnswered) ||
      (subMode === "writing" && wIsAnswered) ||
      (subMode === "speaking" && (speech.isAnswered || speech.isListening)) ||
      isCompleted
    )
      return;

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subMode, qIsAnswered, wIsAnswered, speech.isAnswered, speech.isListening, isCompleted]);

  // Trigger timeout on 0s
  useEffect(() => {
    if (questionTimeLeft !== 0) return;
    if (
      (subMode !== "quiz" && subMode !== "writing" && subMode !== "speaking") ||
      (subMode === "quiz" && qIsAnswered) ||
      (subMode === "writing" && wIsAnswered) ||
      (subMode === "speaking" && speech.isAnswered) ||
      isCompleted ||
      !currentWord
    )
      return;

    if (subMode === "quiz") {
      setQIsAnswered(true);
      setQIsCorrect(false);
      submitReview(currentWord.id || currentWord.word, 1);
      addToast({
        type: "warning",
        title: "Hết thời gian!",
        message: `Đáp án đúng là: ${currentWord.meaning}`,
      });
    } else if (subMode === "writing") {
      setWIsAnswered(true);
      setWIsCorrect(false);
      submitReview(currentWord.id || currentWord.word, 1);
      playWordAudio(currentWord.word);
      addToast({
        type: "warning",
        title: "Hết thời gian!",
        message: `Từ vựng chính xác là: "${currentWord.word}"`,
      });
    } else if (subMode === "speaking") {
      speech.setIsAnswered(true);
      speech.setIsCorrect(false);
      speech.setAccuracy(0);
      submitReview(currentWord.id || currentWord.word, 1);
      playWordAudio(currentWord.word);
      addToast({
        type: "warning",
        title: "Hết thời gian!",
        message: `Từ vựng chính xác là: "${currentWord.word}"`,
      });
    }
  }, [questionTimeLeft, subMode, qIsAnswered, wIsAnswered, speech, isCompleted, currentWord, submitReview, addToast, playWordAudio]);

  // Autofocus writing input
  useEffect(() => {
    if (subMode === "writing" && !wIsAnswered) {
      setTimeout(() => {
        writingInputRef.current?.focus();
      }, 100);
    }
  }, [currentIndex, subMode, wIsAnswered]);

  // Navigation handlers
  const resetCurrentQuestionState = useCallback(() => {
    setQSelectedOpt(null);
    setQIsAnswered(false);
    setQIsCorrect(false);
    setFIsFlipped(false);
    setWInput("");
    setWIsAnswered(false);
    setWIsCorrect(false);
    setWShowHint(false);
    speech.resetSpeech();
  }, [speech]);

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetCurrentQuestionState();
    }
  }, [currentIndex, resetCurrentQuestionState]);

  const totalEarnedXp = qXp + fXp + wXp + sXp;

  const finishSession = useCallback(async () => {
    setIsCompleted(true);
    const user = useAuthStore.getState().user;
    const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
    const targetSkill =
      subModeRef.current === "writing"
        ? "writing"
        : subModeRef.current === "speaking"
        ? "speaking"
        : "vocab";

    // 1. Immediately record in client stores
    useUserStore.getState().addPracticeTime(mins, targetSkill);
    recordSkillPractice(
      user?.id || "local_user",
      "Từ vựng",
      mins,
      totalEarnedXp
    );

    // 2. Sync to PostgreSQL Neon DailySkillPractice and Profile + atomic cache invalidation
    try {
      await fetch("/api/user/skill-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: targetSkill,
          minutes: mins,
          xp: totalEarnedXp,
        }),
      });
    } catch (e) {
      console.warn("[PracticeSession] Background DB sync notice:", e);
    }

    // 3. Automatically synchronize session progress with Roadmap S-Curve pathway
    if (themeParam || unitParam) {
      syncRoadmapSessionProgress({
        themeId: themeParam || undefined,
        unitNumber: unitParam ? parseInt(unitParam, 10) : undefined,
        skillType: isCheckpoint ? "CHECKPOINT" : "VOCAB",
        completedPart: partitionResult.currentPart,
        totalParts: partitionResult.totalParts,
      });
    }

    addToast({
      type: "success",
      title: isCheckpoint
        ? "Vượt qua Cột mốc Unit thành công!"
        : partitionResult.totalParts > 1
        ? `Hoàn thành Phần ${partitionResult.currentPart}/${partitionResult.totalParts}!`
        : "Hoàn thành buổi ôn tập từ vựng!",
      message: `Tổng điểm thưởng: +${totalEarnedXp} XP • ${mins} phút thực hành!`,
    });
  }, [totalEarnedXp, addToast, themeParam, unitParam, isCheckpoint, partitionResult.currentPart, partitionResult.totalParts]);

  // Reset question & session state when partition params change (e.g. advancing from Part 1 to Part 2)
  const prevPartitionKeyRef = useRef<string | null>(null);
  useEffect(() => {
    const key = `${themeParam || ""}_${unitParam || ""}_${partitionResult.currentPart}_${isCheckpoint ? "cp" : ""}`;
    if (prevPartitionKeyRef.current !== null && prevPartitionKeyRef.current !== key) {
      restartSession();
      setQXp(0);
      setQCorrectCount(0);
      setFXp(0);
      setWXp(0);
      setWCorrectCount(0);
      setSXp(0);
      setSCorrectCount(0);
      resetCurrentQuestionState();
    }
    prevPartitionKeyRef.current = key;
  }, [themeParam, unitParam, partitionResult.currentPart, isCheckpoint, restartSession, resetCurrentQuestionState]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < vocabs.length) {
      setCurrentIndex((prev) => prev + 1);
      resetCurrentQuestionState();
    } else {
      finishSession();
    }
  }, [currentIndex, vocabs.length, resetCurrentQuestionState, finishSession]);

  const handleFlashcardRating = useCallback(
    (quality: FlashcardRating) => {
      if (!currentWord) return;
      setFIsFlipped(false);
      const xp = quality === "easy" ? 15 : quality === "good" ? 10 : 5;
      const qualityNum = quality === "easy" ? 5 : quality === "good" ? 4 : 1;
      awardXp(xp);
      setFXp((prev) => prev + xp);
      incrementProgress("review_cards", 1);
      submitReview(currentWord.id || currentWord.word, qualityNum);

      handleNextQuestion();
    },
    [currentWord, awardXp, incrementProgress, submitReview, handleNextQuestion]
  );

  const handleRestartSession = useCallback(() => {
    restartSession();
    setQXp(0);
    setQCorrectCount(0);
    setFXp(0);
    setWXp(0);
    setWCorrectCount(0);
    setSXp(0);
    setSCorrectCount(0);
    resetCurrentQuestionState();
  }, [restartSession, resetCurrentQuestionState]);

  const formatElapsedTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const setSubModeWithUrl = useCallback(
    (newMode: SubMode) => {
      setSubMode(newMode);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("subMode", newMode);
        window.history.replaceState(null, "", url.toString());
      }
    },
    [setSubMode]
  );

  return {
    vocabs,
    isLoading,
    subMode,
    setSubMode: setSubModeWithUrl,
    currentIndex,
    currentWord,
    isCompleted,
    setIsCompleted,
    elapsedTime,
    formatElapsedTime,
    questionTimeLeft,
    isCurrentBookmarked,
    handleToggleBookmark,
    playWordAudio,
    totalEarnedXp,
    // Partition & Roadmap Sync
    themeParam,
    unitParam,
    currentPart: partitionResult.currentPart,
    totalParts: partitionResult.totalParts,
    hasNextPart: partitionResult.hasNextPart,
    nextPartNumber: partitionResult.nextPartNumber,
    isCheckpoint,
    // Quiz
    qSelectedOpt,
    qIsAnswered,
    qIsCorrect,
    qCorrectCount,
    quizOptions,
    handleSelectQuizOption,
    // Flashcard
    fIsFlipped,
    setFIsFlipped,
    handleFlashcardRating,
    // Writing
    writingInputRef,
    wInput,
    setWInput,
    wIsAnswered,
    wIsCorrect,
    wShowHint,
    setWShowHint,
    wCorrectCount,
    handleCheckWriting,
    // Speaking
    speech,
    sCorrectCount,
    handleStartSpeaking,
    // Navigation
    handlePrevQuestion,
    handleNextQuestion,
    handleRestartSession,
    finishSession,
  };
}
