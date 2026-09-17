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
import { PracticeWord, SubMode, QuizOption, FlashcardRating } from "../types";
import { getBookmarkedWords, toggleBookmark } from "../utils/bookmark";
import { getDeterministicRandom } from "../utils/shuffle";
import { usePracticeSpeech } from "./usePracticeSpeech";

const QUESTION_TIME_LIMIT = 30;

export function usePracticeSession() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const themeParam = searchParams.get("themeId") || searchParams.get("theme");
  const levelParam = searchParams.get("level");
  const modeParam = searchParams.get("subMode") || searchParams.get("mode");

  const { submitReview, learned } = useVocabularyStore();
  const { addToast } = useNotificationStore();
  const { awardXp } = useAuthStore();
  const { incrementProgress } = useDailyChallengeStore();

  const [dbVocabs, setDbVocabs] = useState<PracticeWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subMode, setSubMode] = useState<SubMode>("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer tracking
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  // Active study time tracker for analytics
  useStudyTimeTracker("vocab", {
    activeCondition: !isLoading && dbVocabs.length > 0,
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

  // Record practice time on page exit only
  const subModeRef = useRef(subMode);
  useEffect(() => {
    subModeRef.current = subMode;
  }, [subMode]);

  useEffect(() => {
    return () => {
      if (elapsedTimeRef.current > 10) {
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
  }, []);

  // Sync modeParam from URL
  useEffect(() => {
    if (
      modeParam === "flashcard" ||
      modeParam === "writing" ||
      modeParam === "speaking" ||
      modeParam === "quiz"
    ) {
      setSubMode(modeParam as SubMode);
    }
  }, [modeParam]);

  // Load vocabularies from Backend API
  useEffect(() => {
    let isCancelled = false;
    const loadVocabs = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        queryParams.set("limit", "25");
        queryParams.set("random", "true");
        if (themeParam) queryParams.set("themeId", themeParam);
        if (levelParam === "basic" || levelParam === "advanced")
          queryParams.set("level", levelParam);

        const res = await fetch(`/api/vocabulary?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json) ? json : json.data;
          if (Array.isArray(list) && list.length > 0 && !isCancelled) {
            const mapped: PracticeWord[] = list.map((item: any, idx: number) => ({
              id: item.id || `vocab_${idx}`,
              word: item.word,
              meaning: item.definitionVn || item.definition,
              ipa: item.phonetic || item.ipa || "/.../",
              type: item.pos === "adj" ? "adjective" : item.pos || "noun",
              level:
                item.difficulty === 2
                  ? "B1"
                  : item.difficulty === 3
                  ? "B2"
                  : item.difficulty === 4
                  ? "C1"
                  : "A2",
              topic: item.themeNameVn || item.themeNameEn || item.topic || "Từ vựng thường nhật",
              example:
                item.examples?.[0] || item.example || `Practice using the word ${item.word}.`,
              exampleVi:
                item.exampleTranslations?.[0] ||
                item.exampleVi ||
                `Hãy luyện tập sử dụng từ ${item.word}.`,
            }));
            setDbVocabs(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load vocabs for practice:", err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    loadVocabs();
    return () => {
      isCancelled = true;
    };
  }, [dateParam, themeParam, levelParam]);

  // Fallback vocabularies ensuring rich 25 items session
  const vocabs: PracticeWord[] = useMemo(() => {
    if (dbVocabs.length >= 25) return dbVocabs.slice(0, 25);

    const fallbackList: PracticeWord[] = BASIC_VOCABULARIES.slice(0, 25).map((item, idx) => ({
      id: item.id || `practice_vocab_${idx}`,
      word: item.word,
      meaning: item.definitionVn || item.definition,
      ipa: item.phonetic || "/.../",
      type: item.pos === "adj" ? "adjective" : item.pos || "noun",
      level: "A2",
      topic: item.themeNameVn || "Từ vựng thường nhật",
      example: item.examples?.[0] || `She learned how to use the word ${item.word}.`,
      exampleVi:
        item.exampleTranslations?.[0] || `Cô ấy đã học cách sử dụng từ ${item.word}.`,
    }));

    if (dbVocabs.length > 0) {
      const combined = [...dbVocabs, ...fallbackList];
      const uniqueMap = new Map<string, PracticeWord>();
      combined.forEach((w) => uniqueMap.set(w.word.toLowerCase(), w));
      return Array.from(uniqueMap.values()).slice(0, 25);
    }

    if (learned && learned.length > 0) {
      const storeList: PracticeWord[] = learned.map((l: any, idx: number) => ({
        id: l.wordId || `vocab_learned_${idx}`,
        word: l.word || "example",
        meaning: l.meaning || "ví dụ",
        ipa: l.ipa || "/ɪɡˈzæm.pəl/",
        type: l.type || "noun",
        level: l.level || "A2",
        topic: l.category || l.topic || "Cảm xúc & Đời sống",
        example: l.example || "This is a practical example sentence.",
        exampleVi: l.exampleVi || "Đây là một câu ví dụ thực tế.",
      }));
      const combined = [...storeList, ...fallbackList];
      const uniqueMap = new Map<string, PracticeWord>();
      combined.forEach((w) => uniqueMap.set(w.word.toLowerCase(), w));
      return Array.from(uniqueMap.values()).slice(0, 25);
    }

    return fallbackList;
  }, [dbVocabs, learned]);

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
      title: isSaved ? "Đã lưu vào Sổ tay từ vựng 💾" : "Đã bỏ lưu từ vựng",
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
      text: currentWord.meaning,
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
      text: v.meaning,
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

  const handleStartSpeaking = useCallback(() => {
    if (!currentWord) return;
    speech.startSpeaking(currentWord.word);
  }, [currentWord, speech]);

  // Per-question countdown timer (30s)
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);

  useEffect(() => {
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
  }, [currentIndex]);

  useEffect(() => {
    if (
      (subMode !== "quiz" && subMode !== "writing" && subMode !== "speaking") ||
      (subMode === "quiz" && qIsAnswered) ||
      (subMode === "writing" && wIsAnswered) ||
      (subMode === "speaking" && speech.isAnswered) ||
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
  }, [subMode, qIsAnswered, wIsAnswered, speech.isAnswered, isCompleted]);

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
        title: "Hết thời gian! ⏳",
        message: `Đáp án đúng là: ${currentWord.meaning}`,
      });
    } else if (subMode === "writing") {
      setWIsAnswered(true);
      setWIsCorrect(false);
      submitReview(currentWord.id || currentWord.word, 1);
      playWordAudio(currentWord.word);
      addToast({
        type: "warning",
        title: "Hết thời gian! ⏳",
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
        title: "Hết thời gian! ⏳",
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

  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < vocabs.length) {
      setCurrentIndex((prev) => prev + 1);
      resetCurrentQuestionState();
    } else {
      setIsCompleted(true);
      const user = useAuthStore.getState().user;
      recordSkillPractice(
        user?.id || "local_user",
        "Từ vựng",
        Math.max(1, Math.ceil(elapsedTime / 60)),
        totalEarnedXp
      );
      addToast({
        type: "success",
        title: "Hoàn thành buổi ôn tập từ vựng! 🎉",
        message: `Tổng điểm thưởng: +${totalEarnedXp} XP!`,
      });
    }
  }, [currentIndex, vocabs.length, resetCurrentQuestionState, elapsedTime, totalEarnedXp, addToast]);

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
    setCurrentIndex(0);
    setIsCompleted(false);
    setElapsedTime(0);
    setQXp(0);
    setQCorrectCount(0);
    setFXp(0);
    setWXp(0);
    setWCorrectCount(0);
    setSXp(0);
    setSCorrectCount(0);
    resetCurrentQuestionState();
  }, [resetCurrentQuestionState]);

  const formatElapsedTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const setSubModeWithUrl = useCallback((newMode: SubMode) => {
    setSubMode(newMode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("subMode", newMode);
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

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
  };
}
