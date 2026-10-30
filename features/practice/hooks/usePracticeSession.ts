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
import {
  syncRoadmapSessionProgress,
  saveStageMatchedVocab,
  getStageMatchedVocab,
  resolveActiveRoadmapContext,
  getPureThemeVocabularyPool,
} from "@/features/roadmap";
import { gameAudio } from "@/features/games/utils/gameAudio";
import { usePracticeCatalogStore, INITIAL_PRACTICE_VOCABS } from "@/stores/practiceCatalogStore";
import { PracticeWord, SubMode, QuizOption, FlashcardRating } from "../types";
import { getBookmarkedWords, toggleBookmark } from "../utils/bookmark";
import { seededShuffle } from "../utils/shuffle";
import {
  stripParentheses,
  extractConciseMeaning,
  isPureVocabularyWord,
} from "../utils/cleanText";
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

  const { submitReview } = useVocabularyStore();
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
  }, [isCompleted, setElapsedTime]);

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
    } else if (isCheckpoint) {
      setSubMode("quiz");
    }
  }, [modeParam, isCheckpoint, setSubMode]);

  // Resolve active Roadmap context (from URL params if present, or active Roadmap step in localStorage)
  const resolvedContext = useMemo(
    () =>
      resolveActiveRoadmapContext({
        themeId: themeParam,
        unit: unitParam,
        part: partParam,
        totalParts: totalPartsParam,
        skillType: isCheckpoint ? "CHECKPOINT" : "VOCAB",
      }),
    [themeParam, unitParam, partParam, totalPartsParam, isCheckpoint]
  );

  // Extract pure vocabulary pool matching the theme when navigated with Roadmap params or Checkpoint
  const rawThemeVocabs = useMemo(() => {
    if (!resolvedContext.isExplicitUrl && !isCheckpoint) return null;
    return getPureThemeVocabularyPool(resolvedContext.themeId);
  }, [resolvedContext.isExplicitUrl, resolvedContext.themeId, isCheckpoint]);

  // Partition vocabulary pool according to resolved part and totalParts
  const partitionResult = useMemo(() => {
    if (!rawThemeVocabs || rawThemeVocabs.length === 0) {
      return {
        items: [] as typeof rawThemeVocabs,
        currentPart: resolvedContext.part,
        totalParts: resolvedContext.totalParts,
        hasNextPart: resolvedContext.part < resolvedContext.totalParts,
        nextPartNumber:
          resolvedContext.part < resolvedContext.totalParts
            ? resolvedContext.part + 1
            : (undefined as number | undefined),
        hasPrevPart: resolvedContext.part > 1,
        prevPartNumber:
          resolvedContext.part > 1 ? resolvedContext.part - 1 : (undefined as number | undefined),
      };
    }
    if (isCheckpoint) {
      // Checkpoint mode: 15 curated questions balanced across Part 1 & Part 2, prioritizing past mistakes
      const unitNum = resolvedContext.unitNumber;
      const b1 = getStageMatchedVocab({
        themeId: resolvedContext.themeId,
        unitNumber: unitNum,
        part: 1,
      });
      const b2 = getStageMatchedVocab({
        themeId: resolvedContext.themeId,
        unitNumber: unitNum,
        part: 2,
      });
      const priorityMistakes = new Set([...(b1.mistakeIds || []), ...(b2.mistakeIds || [])]);
      const mistakePool = rawThemeVocabs.filter((v) => priorityMistakes.has(v.id));

      const mid = Math.ceil(rawThemeVocabs.length / 2);
      const part1Pool = rawThemeVocabs.slice(0, mid);
      const part2Pool = rawThemeVocabs.slice(mid);
      const interleaved: typeof rawThemeVocabs = [];
      const seenIds = new Set<string>();

      for (const m of mistakePool) {
        if (!seenIds.has(m.id)) {
          seenIds.add(m.id);
          interleaved.push(m);
        }
      }
      const maxHalf = Math.max(part1Pool.length, part2Pool.length);
      for (let i = 0; i < maxHalf && interleaved.length < 15; i++) {
        if (part1Pool[i] && !seenIds.has(part1Pool[i].id)) {
          seenIds.add(part1Pool[i].id);
          interleaved.push(part1Pool[i]);
        }
        if (interleaved.length < 15 && part2Pool[i] && !seenIds.has(part2Pool[i].id)) {
          seenIds.add(part2Pool[i].id);
          interleaved.push(part2Pool[i]);
        }
      }

      return {
        items: interleaved.slice(0, 15),
        currentPart: 1,
        totalParts: 1,
        hasNextPart: false,
        nextPartNumber: undefined,
        hasPrevPart: false,
        prevPartNumber: undefined,
      };
    }
    return partitionVocabularyPool(rawThemeVocabs, {
      part: resolvedContext.part,
      totalParts: resolvedContext.totalParts,
    });
  }, [rawThemeVocabs, resolvedContext, isCheckpoint]);

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
        meaning: extractConciseMeaning(item.definitionVn || item.definition),
        ipa: item.phonetic || "/.../",
        type: item.pos === "adj" ? "adjective" : item.pos || "noun",
        level:
          (item as any).level ||
          (item.difficulty === 1 ? "A1" : item.difficulty === 2 ? "A2" : "B1"),
        topic: stripParentheses(
          (item as any).themeNameVn || (item as any).themeId || "Từ vựng theo chủ đề"
        ),
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

  // Mute-aware Audio helper
  const playWordAudio = useCallback(
    (word: string, rate: number = 0.95, accent: string = "en-US") => {
      if (!word || gameAudio.isMuted()) return;
      speakLessonText(word, {
        speakerIndex: 1,
        accent,
        rate,
      });
    },
    []
  );

  // Session-wide mistake & mastery tracking for Roadmap Bridge and accurate ScoreCard
  const mistakeIdsRef = useRef<Set<string>>(new Set());
  const [lastEarnedXp, setLastEarnedXp] = useState<number>(10);

  // 1. QUIZ SUB-MODE STATE
  const [qSelectedOpt, setQSelectedOpt] = useState<string | null>(null);
  const [qIsAnswered, setQIsAnswered] = useState(false);
  const [qIsCorrect, setQIsCorrect] = useState(false);
  const [qXp, setQXp] = useState(0);
  const [qCorrectCount, setQCorrectCount] = useState(0);

  // Deterministic 2x2 quiz options with strict meaning deduplication & Fisher-Yates shuffle
  const quizOptions: QuizOption[] = useMemo(() => {
    if (!currentWord) return [];
    const correctText = stripParentheses(currentWord.meaning);
    const correctOpt: QuizOption = {
      id: "correct",
      text: correctText,
      isCorrect: true,
    };
    const otherVocabs = vocabs.filter(
      (v) => (v.id || v.word) !== (currentWord.id || currentWord.word)
    );

    const seed = `${currentWord.id || currentWord.word}_${currentIndex}`;
    const seenMeanings = new Set<string>([correctText.toLowerCase().trim()]);
    const uniqueCandidates: PracticeWord[] = [];

    for (const v of seededShuffle([...otherVocabs, ...INITIAL_PRACTICE_VOCABS], seed + "_others")) {
      const mClean = stripParentheses(v.meaning).toLowerCase().trim();
      if (!mClean || seenMeanings.has(mClean)) continue;
      seenMeanings.add(mClean);
      uniqueCandidates.push(v);
      if (uniqueCandidates.length >= 3) break;
    }

    const wrongOpts: QuizOption[] = uniqueCandidates.map((v, i) => ({
      id: `wrong_${i}`,
      text: stripParentheses(v.meaning),
      isCorrect: false,
    }));

    return seededShuffle([correctOpt, ...wrongOpts], seed + "_final");
  }, [currentWord, vocabs, currentIndex]);

  const evaluateQuizOption = useCallback(
    (opt: QuizOption) => {
      if (qIsAnswered || !currentWord) return;
      const wordKey = currentWord.id || currentWord.word;
      setQSelectedOpt(opt.id);
      setQIsAnswered(true);
      setQIsCorrect(opt.isCorrect);

      if (opt.isCorrect) {
        gameAudio.playCorrectDing();
        setLastEarnedXp(10);
        awardXp(10);
        setQXp((prev) => prev + 10);
        setQCorrectCount((prev) => prev + 1);
        incrementProgress("practice_words", 1);
        incrementProgress("learn_words", 1);
        submitReview(wordKey, 4);
        playWordAudio(currentWord.word);
      } else {
        gameAudio.playWrongBuzzer();
        mistakeIdsRef.current.add(wordKey);
        submitReview(wordKey, 1);
      }
    },
    [qIsAnswered, currentWord, awardXp, incrementProgress, submitReview, playWordAudio]
  );

  // Clicking an option selects it (lighting up "KIỂM TRA"); clicking the already-selected option grades immediately
  const handleSelectQuizOption = useCallback(
    (opt: QuizOption) => {
      if (qIsAnswered || !currentWord) return;
      if (qSelectedOpt === opt.id) {
        evaluateQuizOption(opt);
        return;
      }
      gameAudio.playTap();
      setQSelectedOpt(opt.id);
    },
    [qIsAnswered, currentWord, qSelectedOpt, evaluateQuizOption]
  );

  const handleCheckQuiz = useCallback(() => {
    if (qIsAnswered || !qSelectedOpt || !currentWord) return;
    const selected = quizOptions.find((o) => o.id === qSelectedOpt);
    if (selected) {
      evaluateQuizOption(selected);
    }
  }, [qIsAnswered, qSelectedOpt, currentWord, quizOptions, evaluateQuizOption]);

  // 2. FLASHCARD SUB-MODE STATE
  const [fIsFlipped, setFIsFlipped] = useState(false);
  const [fXp, setFXp] = useState(0);
  const [fCorrectCount, setFCorrectCount] = useState(0);

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
    const wordKey = currentWord.id || currentWord.word;
    const cleanInput = wInput.trim().toLowerCase();
    const cleanTarget = currentWord.word.trim().toLowerCase();
    const isPassed = cleanInput === cleanTarget;

    setWIsAnswered(true);
    setWIsCorrect(isPassed);

    if (isPassed) {
      gameAudio.playCorrectDing();
      const earned = wShowHint ? 8 : 15;
      setLastEarnedXp(earned);
      awardXp(earned);
      setWXp((prev) => prev + earned);
      setWCorrectCount((prev) => prev + 1);
      incrementProgress("write_practice", 1);
      incrementProgress("practice_words", 1);
      submitReview(wordKey, 4);
      playWordAudio(currentWord.word);
    } else {
      gameAudio.playWrongBuzzer();
      mistakeIdsRef.current.add(wordKey);
      submitReview(wordKey, 1);
    }
  }, [
    wIsAnswered,
    wInput,
    currentWord,
    wShowHint,
    awardXp,
    incrementProgress,
    submitReview,
    playWordAudio,
  ]);

  // 4. SPEAKING SUB-MODE STATE
  const [sXp, setSXp] = useState(0);
  const [sCorrectCount, setSCorrectCount] = useState(0);

  const handleSpeechSuccess = useCallback(
    (_accuracyScore: number) => {
      if (!currentWord) return;
      gameAudio.playCorrectDing();
      setLastEarnedXp(15);
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
      gameAudio.playWrongBuzzer();
      const wordKey = currentWord.id || currentWord.word;
      mistakeIdsRef.current.add(wordKey);
      submitReview(wordKey, 1);
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
  }, [currentIndex, subMode]);

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

    const wordKey = currentWord.id || currentWord.word;
    mistakeIdsRef.current.add(wordKey);
    gameAudio.playWrongBuzzer();

    if (subMode === "quiz") {
      setQIsAnswered(true);
      setQIsCorrect(false);
      submitReview(wordKey, 1);
      addToast({
        type: "warning",
        title: "Hết thời gian!",
        message: `Đáp án đúng là: ${currentWord.meaning}`,
      });
    } else if (subMode === "writing") {
      setWIsAnswered(true);
      setWIsCorrect(false);
      submitReview(wordKey, 1);
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
      submitReview(wordKey, 1);
      playWordAudio(currentWord.word);
      addToast({
        type: "warning",
        title: "Hết thời gian!",
        message: `Từ vựng chính xác là: "${currentWord.word}"`,
      });
    }
  }, [
    questionTimeLeft,
    subMode,
    qIsAnswered,
    wIsAnswered,
    speech,
    isCompleted,
    currentWord,
    submitReview,
    addToast,
    playWordAudio,
  ]);

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
  }, [currentIndex, setCurrentIndex, resetCurrentQuestionState]);

  const totalEarnedXp = qXp + fXp + wXp + sXp;
  const sessionCorrectCount = Math.min(
    vocabs.length,
    qCorrectCount + fCorrectCount + wCorrectCount + sCorrectCount
  );

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
    recordSkillPractice(user?.id || "local_user", "Từ vựng", mins, totalEarnedXp);

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

    // 3. Save practiced words & mistake words into Roadmap Vocab Bridge so Stage 2 (Word Link)
    // and Stage 3 (Sentence Builder) reinforce weak words from Stage 1
    saveStageMatchedVocab({
      themeId: resolvedContext.themeId,
      unitNumber: resolvedContext.unitNumber,
      part: partitionResult.currentPart || 1,
      matchedIds: vocabs.map((v) => v.id).filter(Boolean),
      matchedWords: vocabs.map((v) => v.word).filter(Boolean),
      mistakeIds: Array.from(mistakeIdsRef.current),
      mergeExistingMistakes: true,
    });

    syncRoadmapSessionProgress({
      themeId: resolvedContext.themeId,
      unitNumber: resolvedContext.unitNumber,
      skillType: isCheckpoint ? "CHECKPOINT" : "VOCAB",
      completedPart: partitionResult.currentPart,
      totalParts: partitionResult.totalParts,
    });

    addToast({
      type: "success",
      title: isCheckpoint
        ? "Vượt qua Cột mốc Unit thành công!"
        : partitionResult.totalParts > 1
        ? `Hoàn thành Phần ${partitionResult.currentPart}/${partitionResult.totalParts}!`
        : "Hoàn thành buổi ôn tập từ vựng!",
      message: `Tổng điểm thưởng: +${totalEarnedXp} XP • ${mins} phút thực hành!`,
    });
  }, [
    setIsCompleted,
    totalEarnedXp,
    addToast,
    resolvedContext.themeId,
    resolvedContext.unitNumber,
    isCheckpoint,
    partitionResult.currentPart,
    partitionResult.totalParts,
    vocabs,
  ]);

  // Reset question & session state when partition params change (e.g. advancing from Part 1 to Part 2)
  const prevPartitionKeyRef = useRef<string | null>(null);
  useEffect(() => {
    const key = `${themeParam || ""}_${unitParam || ""}_${partitionResult.currentPart}_${
      isCheckpoint ? "cp" : ""
    }`;
    if (prevPartitionKeyRef.current !== null && prevPartitionKeyRef.current !== key) {
      restartSession();
      setQXp(0);
      setQCorrectCount(0);
      setFXp(0);
      setFCorrectCount(0);
      setWXp(0);
      setWCorrectCount(0);
      setSXp(0);
      setSCorrectCount(0);
      mistakeIdsRef.current.clear();
      resetCurrentQuestionState();
    }
    prevPartitionKeyRef.current = key;
  }, [
    themeParam,
    unitParam,
    partitionResult.currentPart,
    isCheckpoint,
    restartSession,
    resetCurrentQuestionState,
  ]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < vocabs.length) {
      setCurrentIndex((prev) => prev + 1);
      resetCurrentQuestionState();
    } else {
      finishSession();
    }
  }, [currentIndex, vocabs.length, setCurrentIndex, resetCurrentQuestionState, finishSession]);

  const handleFlashcardRating = useCallback(
    (quality: FlashcardRating) => {
      if (!currentWord) return;
      const wordKey = currentWord.id || currentWord.word;
      setFIsFlipped(false);
      const xp = quality === "easy" ? 15 : quality === "good" ? 10 : 5;
      const qualityNum = quality === "easy" ? 5 : quality === "good" ? 4 : 1;
      setLastEarnedXp(xp);
      awardXp(xp);
      setFXp((prev) => prev + xp);
      if (quality === "easy" || quality === "good") {
        gameAudio.playCorrectDing();
        setFCorrectCount((prev) => prev + 1);
      } else {
        gameAudio.playTap();
        mistakeIdsRef.current.add(wordKey);
      }
      incrementProgress("review_cards", 1);
      submitReview(wordKey, qualityNum);

      handleNextQuestion();
    },
    [currentWord, awardXp, incrementProgress, submitReview, handleNextQuestion]
  );

  const handleRestartSession = useCallback(() => {
    restartSession();
    setQXp(0);
    setQCorrectCount(0);
    setFXp(0);
    setFCorrectCount(0);
    setWXp(0);
    setWCorrectCount(0);
    setSXp(0);
    setSCorrectCount(0);
    mistakeIdsRef.current.clear();
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
    lastEarnedXp,
    sessionCorrectCount,
    // Partition & Roadmap Sync
    themeParam: themeParam || resolvedContext.themeId,
    unitParam: unitParam || String(resolvedContext.unitNumber),
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
    handleCheckQuiz,
    // Flashcard
    fIsFlipped,
    setFIsFlipped,
    fCorrectCount,
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
