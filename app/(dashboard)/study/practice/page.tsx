"use client";
import React, { useState, useMemo, useCallback, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore, recordSkillPractice } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useDailyChallengeStore } from "@/stores/dailyChallengeStore";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";

import {
  Brain,
  Layers,
  PenLine,
  Mic,
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
  BookOpen,
  Target,
  Clock,
  RefreshCw,
  Square,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  ArrowRight,
  Lightbulb,
  Headphones,
  FileText,
  Folder,
  Keyboard,
} from "lucide-react";

const SpeakingIcon = ({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

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

function PracticeQuizContent() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const themeParam = searchParams.get("themeId") || searchParams.get("theme");
  const levelParam = searchParams.get("level");
  const modeParam = searchParams.get("subMode") || searchParams.get("mode");

  const { practiceWord, submitReview, learned } = useVocabularyStore();
  const { addToast } = useNotificationStore();
  const { awardXp } = useAuthStore();
  const { incrementProgress } = useDailyChallengeStore();

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

  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  // Real-time backend practice time tracker
  useStudyTimeTracker("vocab", {
    activeCondition: !isLoading && dbVocabs.length > 0,
  });

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      if (elapsedTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
        const targetSkill = subMode === "writing" ? "writing" : subMode === "speaking" ? "speaking" : "vocab";
        useUserStore.getState().addPracticeTime(mins, targetSkill);
        elapsedTimeRef.current = 0;
      }
    };
  }, [subMode]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Sync modeParam from URL
  useEffect(() => {
    if (modeParam === "flashcard" || modeParam === "writing" || modeParam === "speaking" || modeParam === "quiz") {
      setSubMode(modeParam);
    }
  }, [modeParam]);

  // Load real live vocabularies from Backend API Database
  useEffect(() => {
    const loadVocabs = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        queryParams.set("limit", "25");
        queryParams.set("random", "true");
        if (themeParam) queryParams.set("themeId", themeParam);
        if (levelParam === "basic" || levelParam === "advanced") queryParams.set("level", levelParam);

        const res = await fetch(`/api/vocabulary?${queryParams.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json) ? json : json.data;
          if (Array.isArray(list) && list.length > 0) {
            const mapped = list.map((item: any, idx: number) => ({
              id: item.id || `vocab_${idx}`,
              word: item.word,
              meaning: item.definitionVn || item.definition,
              ipa: item.phonetic || item.ipa || "/.../",
              type: item.pos === "adj" ? "adjective" : item.pos || "noun",
              level: item.difficulty === 2 ? "B1" : item.difficulty === 3 ? "B2" : item.difficulty === 4 ? "C1" : "A2",
              topic: item.themeNameVn || item.themeNameEn || item.topic || "Từ vựng thường nhật",
              example: item.examples?.[0] || item.example || `Practice using the word ${item.word}.`,
              exampleVi: item.exampleTranslations?.[0] || item.exampleVi || `Hãy luyện tập sử dụng từ ${item.word}.`,
            }));
            setDbVocabs(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load vocabs for practice:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadVocabs();
  }, [dateParam, themeParam, levelParam]);

  // Fallback vocabs from store or rich BASIC_VOCABULARIES bank (25 questions session)
  const vocabs = useMemo(() => {
    if (dbVocabs.length >= 25) return dbVocabs.slice(0, 25);

    const fallbackList = BASIC_VOCABULARIES.slice(0, 25).map((item, idx) => ({
      id: item.id || `practice_vocab_${idx}`,
      word: item.word,
      meaning: item.definitionVn || item.definition,
      ipa: item.phonetic || "/.../",
      type: item.pos === "adj" ? "adjective" : item.pos || "noun",
      level: "A2",
      topic: item.themeNameVn || "Từ vựng thường nhật",
      example: item.examples?.[0] || `She learned how to use the word ${item.word}.`,
      exampleVi: item.exampleTranslations?.[0] || `Cô ấy đã học cách sử dụng từ ${item.word}.`,
    }));

    if (dbVocabs.length > 0) {
      const combined = [...dbVocabs, ...fallbackList];
      const uniqueMap = new Map();
      combined.forEach((w) => uniqueMap.set(w.word.toLowerCase(), w));
      return Array.from(uniqueMap.values()).slice(0, 25);
    }

    if (learned && learned.length > 0) {
      const storeList = learned.map((l: any, idx: number) => ({
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
      const uniqueMap = new Map();
      combined.forEach((w) => uniqueMap.set(w.word.toLowerCase(), w));
      return Array.from(uniqueMap.values()).slice(0, 25);
    }

    return fallbackList;
  }, [dbVocabs, learned]);

  // Overall session index tracker
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Bookmark tracking
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  useEffect(() => {
    setBookmarkedList(getBookmarkedWords());
  }, []);

  const currentWord = vocabs[currentIndex] || vocabs[0];
  const isCurrentBookmarked = bookmarkedList.includes(currentWord?.id || currentWord?.word);

  const handleToggleBookmark = () => {
    if (!currentWord) return;
    const wordKey = currentWord.id || currentWord.word;
    const isSaved = toggleBookmark(wordKey);
    setBookmarkedList(getBookmarkedWords());
    addToast({
      type: isSaved ? "success" : "info",
      title: isSaved ? "Đã lưu vào Sổ tay từ vựng 💾" : "Đã bỏ lưu từ vựng",
      message: isSaved ? `+5 XP cho từ "${currentWord.word}"` : `Đã gỡ "${currentWord.word}" khỏi danh sách lưu.`,
    });
    if (isSaved) awardXp(5);
  };

  const playWordAudio = (word: string, rate: number = 0.95, accent: string = "en-US") => {
    if (!word) return;
    speakLessonText(word, {
      speakerIndex: 1,
      accent,
      rate,
    });
  };

  // 1. QUIZ SUB-MODE STATE
  const [qSelectedOpt, setQSelectedOpt] = useState<string | null>(null);
  const [qIsAnswered, setQIsAnswered] = useState(false);
  const [qIsCorrect, setQIsCorrect] = useState(false);
  const [qXp, setQXp] = useState(0);
  const [qCorrectCount, setQCorrectCount] = useState(0);

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

  // 4. SPEAKING SUB-MODE STATE
  const [sIsListening, setSIsListening] = useState(false);
  const [sTranscript, setSTranscript] = useState("");
  const [sAccuracy, setSAccuracy] = useState(0);
  const [sIsCorrect, setSIsCorrect] = useState(false);
  const [sIsAnswered, setSIsAnswered] = useState(false);
  const [sXp, setSXp] = useState(0);
  const [sSpeechError, setSSpeechError] = useState<string | null>(null);
  const [sCorrectCount, setSCorrectCount] = useState(0);
  const recognitionRef = useRef<any>(null);

  // Per-question countdown timer (30s per question)
  const QUESTION_TIME_LIMIT = 30;
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);

  useEffect(() => {
    // Reset countdown on new question
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
  }, [currentIndex, subMode]);

  useEffect(() => {
    if (
      (subMode !== "quiz" && subMode !== "writing" && subMode !== "speaking") ||
      (subMode === "quiz" && qIsAnswered) ||
      (subMode === "writing" && wIsAnswered) ||
      (subMode === "speaking" && sIsAnswered) ||
      isCompleted
    )
      return;

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto timeout handling
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
            setSIsAnswered(true);
            setSIsCorrect(false);
            setSAccuracy(0);
            submitReview(currentWord.id || currentWord.word, 1);
            playWordAudio(currentWord.word);
            addToast({
              type: "warning",
              title: "Hết thời gian! ⏳",
              message: `Từ vựng chính xác là: "${currentWord.word}"`,
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subMode, qIsAnswered, wIsAnswered, sIsAnswered, isCompleted, currentWord, submitReview, addToast]);

  useEffect(() => {
    if (subMode === "writing" && !wIsAnswered) {
      setTimeout(() => {
        writingInputRef.current?.focus();
      }, 100);
    }
  }, [currentIndex, subMode, wIsAnswered]);

  const quizOptions = useMemo(() => {
    if (!currentWord) return [];
    const correctOpt = {
      id: "correct",
      text: currentWord.meaning,
      isCorrect: true,
    };
    const otherVocabs = vocabs.filter((v) => (v.id || v.word) !== (currentWord.id || currentWord.word));
    const shuffledOthers = [...otherVocabs].sort(() => 0.5 - Math.random()).slice(0, 3);
    const wrongOpts = shuffledOthers.map((v, i) => ({
      id: `wrong_${i}`,
      text: v.meaning,
      isCorrect: false,
    }));
    return [correctOpt, ...wrongOpts].sort(() => 0.5 - Math.random());
  }, [currentWord, vocabs]);

  const handleSelectQuizOption = (opt: { id: string; text: string; isCorrect: boolean }) => {
    if (qIsAnswered) return;
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
  };

  const handleFlashcardRating = (quality: "easy" | "good" | "again") => {
    setFIsFlipped(false);
    const xp = quality === "easy" ? 15 : quality === "good" ? 10 : 5;
    const qualityNum = quality === "easy" ? 5 : quality === "good" ? 4 : 1;
    awardXp(xp);
    setFXp((prev) => prev + xp);
    incrementProgress("review_cards", 1);
    submitReview(currentWord.id || currentWord.word, qualityNum);

    handleNextQuestion();
  };

  const handleCheckWriting = () => {
    if (wIsAnswered || !wInput.trim()) return;
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
  };

  const computeSimilarityScore = (target: string, spoken: string) => {
    const t = target.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
    const s = spoken.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
    if (!t || !s) return 0;
    if (t === s) return 100;
    if (s.includes(t) || t.includes(s)) return 85;

    let matches = 0;
    const minLen = Math.min(t.length, s.length);
    for (let i = 0; i < minLen; i++) {
      if (t[i] === s[i]) matches++;
    }
    return Math.min(100, Math.round((matches / Math.max(t.length, s.length)) * 100));
  };

  const handleStartSpeaking = () => {
    setSSpeechError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSSpeechError("Trình duyệt không hỗ trợ Web Speech API. Thử Chrome hoặc Edge!");
      // Simulate demo match for testing
      setSIsListening(true);
      setTimeout(() => {
        setSIsListening(false);
        setSTranscript(currentWord.word);
        setSAccuracy(96);
        setSIsCorrect(true);
        setSIsAnswered(true);
        awardXp(15);
        setSXp((prev) => prev + 15);
        setSCorrectCount((prev) => prev + 1);
        incrementProgress("practice_words", 1);
      }, 1200);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setSIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript || "";
        setSTranscript(spokenText);
        const score = computeSimilarityScore(currentWord.word, spokenText);
        setSAccuracy(score);
        const isPassed = score >= 60;
        setSIsCorrect(isPassed);
        setSIsAnswered(true);

        if (isPassed) {
          awardXp(15);
          setSXp((prev) => prev + 15);
          setSCorrectCount((prev) => prev + 1);
          incrementProgress("speak_practice", 1);
          incrementProgress("review_cards", 1);
          incrementProgress("learn_words", 1);
          submitReview(currentWord.id || currentWord.word, 4);
        } else {
          submitReview(currentWord.id || currentWord.word, 1);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setSIsListening(false);
        if (event.error === "no-speech") {
          setSSpeechError("Không nghe thấy âm thanh. Vui lòng nói to & rõ hơn!");
        } else if (event.error === "not-allowed") {
          setSSpeechError("Chưa cấp quyền Micro. Vui lòng mở quyền Micro trên trình duyệt!");
        } else {
          setSSpeechError("Lỗi nhận diện âm thanh: " + event.error);
        }
      };

      recognition.onend = () => {
        setSIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setSIsListening(false);
    }
  };

  // Previous question handler across all sub-modes
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      // Reset quiz
      setQSelectedOpt(null);
      setQIsAnswered(false);
      setQIsCorrect(false);
      // Reset flashcard
      setFIsFlipped(false);
      // Reset writing
      setWInput("");
      setWIsAnswered(false);
      setWIsCorrect(false);
      setWShowHint(false);
      // Reset speaking
      setSTranscript("");
      setSAccuracy(0);
      setSIsCorrect(false);
      setSIsAnswered(false);
      setSSpeechError(null);
    }
  };

  // Next question handler across all sub-modes
  const handleNextQuestion = () => {
    if (currentIndex + 1 < vocabs.length) {
      setCurrentIndex((prev) => prev + 1);
      // Reset quiz
      setQSelectedOpt(null);
      setQIsAnswered(false);
      setQIsCorrect(false);
      // Reset flashcard
      setFIsFlipped(false);
      // Reset writing
      setWInput("");
      setWIsAnswered(false);
      setWIsCorrect(false);
      setWShowHint(false);
      // Reset speaking
      setSTranscript("");
      setSAccuracy(0);
      setSIsCorrect(false);
      setSIsAnswered(false);
      setSSpeechError(null);
    } else {
      setIsCompleted(true);
      const user = useAuthStore.getState().user;
      recordSkillPractice(user?.id || "local_user", "Từ vựng", Math.max(1, Math.ceil(elapsedTime / 60)), totalEarnedXp);
      addToast({
        type: "success",
        title: "Hoàn thành buổi ôn tập từ vựng! 🎉",
        message: `Tổng điểm thưởng: +${totalEarnedXp} XP!`,
      });
    }
  };

  const handleRestartSession = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setElapsedTime(0);
    // Reset all sub-mode states
    setQSelectedOpt(null);
    setQIsAnswered(false);
    setQIsCorrect(false);
    setQXp(0);
    setQCorrectCount(0);
    setFIsFlipped(false);
    setFXp(0);
    setWInput("");
    setWIsAnswered(false);
    setWIsCorrect(false);
    setWXp(0);
    setWShowHint(false);
    setWCorrectCount(0);
    setSTranscript("");
    setSAccuracy(0);
    setSIsCorrect(false);
    setSIsAnswered(false);
    setSXp(0);
    setSCorrectCount(0);
    setSSpeechError(null);
  };

  // Keyboard Shortcut Listener for Quick Answer Selection (1-4, A-D, Numpad, Enter, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      // Quiz mode key shortcuts
      if (subMode === "quiz") {
        if (!qIsAnswered && quizOptions.length > 0) {
          const key = e.key;
          const code = e.code;
          if (key === "1" || code === "Numpad1" || key.toLowerCase() === "a") {
            e.preventDefault();
            if (quizOptions[0]) handleSelectQuizOption(quizOptions[0]);
          } else if (key === "2" || code === "Numpad2" || key.toLowerCase() === "b") {
            e.preventDefault();
            if (quizOptions[1]) handleSelectQuizOption(quizOptions[1]);
          } else if (key === "3" || code === "Numpad3" || key.toLowerCase() === "c") {
            e.preventDefault();
            if (quizOptions[2]) handleSelectQuizOption(quizOptions[2]);
          } else if (key === "4" || code === "Numpad4" || key.toLowerCase() === "d") {
            e.preventDefault();
            if (quizOptions[3]) handleSelectQuizOption(quizOptions[3]);
          }
        } else if (qIsAnswered) {
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
            e.preventDefault();
            handleNextQuestion();
          }
        }
      }

      // Flashcard mode shortcuts: Space to flip, 1-3 for quality
      if (subMode === "flashcard") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setFIsFlipped((prev) => !prev);
        } else if (e.key === "1" || e.code === "Numpad1") {
          e.preventDefault();
          handleFlashcardRating("again");
        } else if (e.key === "2" || e.code === "Numpad2") {
          e.preventDefault();
          handleFlashcardRating("good");
        } else if (e.key === "3" || e.code === "Numpad3") {
          e.preventDefault();
          handleFlashcardRating("easy");
        }
      }

      // Speaking mode shortcuts: Space to start recording, Enter/ArrowRight to next
      if (subMode === "speaking") {
        if (!sIsAnswered && !sIsListening && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          handleStartSpeaking();
        } else if (sIsAnswered && (e.key === "Enter" || e.key === "ArrowRight")) {
          e.preventDefault();
          handleNextQuestion();
        }
      }

      // Left arrow for Prev Question across all modes
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        handlePrevQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [subMode, qIsAnswered, quizOptions, currentIndex, handleSelectQuizOption, handleNextQuestion, handlePrevQuestion]);

  const totalEarnedXp = qXp + fXp + wXp + sXp;

  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      
      {/* 1. MASTER TOP HEADER (FIXED 56PX) */}
      <AppTopHeader
        rightDesktopContent={
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Progress Counter Badge */}
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Câu {Math.min(vocabs.length, currentIndex + 1)}/{vocabs.length}</span>
            </span>

            {/* Total XP Badge */}
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>+{totalEarnedXp} XP</span>
            </span>

            {/* Timer Badge */}
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{formatElapsedTime(elapsedTime)}</span>
            </span>

            {isCompleted ? (
              <button
                type="button"
                onClick={handleRestartSession}
                className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện lại</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCompleted(true)}
                className="h-9 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kết thúc</span>
              </button>
            )}
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Luyện từ vựng"
          />
          <HeaderPillItem
            href="/study/listening"
            icon={<Headphones className="w-3.5 h-3.5" />}
            label="Dictation"
          />
          <HeaderPillItem
            href="/study/shadowing"
            icon={<Mic className="w-3.5 h-3.5" />}
            label="Shadowing"
          />
          <HeaderPillItem
            href="/study/exam-prep"
            icon={<FileText className="w-3.5 h-3.5" />}
            label="Thi thử đề"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3.5 lg:py-3 flex flex-col min-h-0 lg:overflow-hidden space-y-2.5 sm:space-y-3 pb-24 lg:pb-3">
        
        {/* 2.1. SUB-MODE SEGMENTED TOOLBAR (QUIZ / FLASHCARD / WRITING / SPEAKING) */}
        <div className="p-1 sm:p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 shrink-0">
          
          {/* Segmented Switcher Buttons */}
          <div className="grid grid-cols-4 sm:flex sm:items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 w-full sm:w-auto">
            {[
              { id: "quiz", labelMobile: "Quiz", labelDesktop: "Quiz | Trắc nghiệm", icon: Brain },
              { id: "flashcard", labelMobile: "Flashcard", labelDesktop: "Flashcard | 3D SRS", icon: Layers },
              { id: "writing", labelMobile: "Chính tả", labelDesktop: "Writing | Gõ chính tả", icon: PenLine },
              { id: "speaking", labelMobile: "Phát âm", labelDesktop: "Speaking | Phát âm AI", icon: SpeakingIcon },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = subMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSubMode(m.id as any)}
                  className={`py-1.5 px-1.5 sm:px-3.5 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="sm:hidden text-center truncate">{m.labelMobile}</span>
                  <span className="hidden sm:inline">{m.labelDesktop}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Progress Indicator */}
          <div className="hidden sm:flex items-center gap-3 pr-2">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Tiến độ:</span>
              <span className="text-slate-900 dark:text-white font-mono">{currentIndex + 1}/{vocabs.length}</span>
            </div>
            <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0059bb] to-blue-500 transition-all duration-300"
                style={{ width: `${Math.round(((currentIndex + 1) / vocabs.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2.2. MAIN BENTO GRID: FITS STRICTLY IN DESKTOP VIEWPORT */}
        {!isCompleted ? (

          /* ===== VIEW 1: ACTIVE PRACTICE ARENA BENTO (8/12 Left - 4/12 Right) ===== */
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-stretch min-w-0">
            
            {/* CỘT TRÁI: PRACTICE ARENA (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-3">
                
                {/* Arena Sub-Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40 uppercase flex items-center gap-1">
                      {subMode === "quiz" && <Brain className="w-3.5 h-3.5" />}
                      {subMode === "flashcard" && <Layers className="w-3.5 h-3.5" />}
                      {subMode === "writing" && <PenLine className="w-3.5 h-3.5" />}
                      {subMode === "speaking" && <SpeakingIcon className="w-3.5 h-3.5" />}
                      <span>{subMode.toUpperCase()}</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {subMode === "quiz" && "Chọn nghĩa tiếng Việt chính xác"}
                      {subMode === "flashcard" && "Lật thẻ và tự đánh giá độ ghi nhớ"}
                      {subMode === "writing" && "Gõ chính xác từ vựng tiếng Anh"}
                      {subMode === "speaking" && "Luyện phát âm chuẩn xác qua Micro"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => playWordAudio(currentWord.word)}
                    className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#0059bb] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
                    title="Nghe phát âm từ vựng"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" />
                    <span className="hidden sm:inline">Phát âm</span>
                  </button>
                </div>

                {/* ===== SUB-MODE 1: QUIZ ARENA ===== */}
                {subMode === "quiz" && (
                  <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
                    
                    {/* Prompt Target Word Card - Generous, Balanced & Cohesive */}
                    <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden">
                      
                      {/* 1. TOP METADATA ROW */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5 shrink-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-black uppercase tracking-wider font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1">
                            <Brain className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />
                            <span>Từ vựng trọng tâm</span>
                          </span>

                          {currentWord.type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200/60 dark:border-slate-700/60">
                              {currentWord.type === "noun" && "Danh từ (n.)"}
                              {currentWord.type === "verb" && "Động từ (v.)"}
                              {currentWord.type === "adjective" && "Tính từ (adj.)"}
                              {currentWord.type === "adverb" && "Phó từ (adv.)"}
                              {!["noun", "verb", "adjective", "adverb"].includes(currentWord.type) && currentWord.type}
                            </span>
                          )}

                          {currentWord.level && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-black font-mono">
                              {currentWord.level}
                            </span>
                          )}
                        </div>

                        {/* Right Area: Question Countdown Timer + Bookmark Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Question Countdown Timer */}
                          <div
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
                              questionTimeLeft <= 3
                                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 animate-pulse"
                                : questionTimeLeft <= 6
                                ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
                                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={`Thời gian còn lại cho câu hỏi này: ${questionTimeLeft}s`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{questionTimeLeft}s</span>
                          </div>

                          {/* Fast Bookmark Button - Icon Only */}
                          <button
                            type="button"
                            onClick={handleToggleBookmark}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                              isCurrentBookmarked
                                ? "bg-amber-500 text-white shadow-amber-500/20"
                                : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={isCurrentBookmarked ? "Đã lưu vào Sổ tay từ vựng" : "Lưu từ vựng này vào Sổ tay (+5 XP)"}
                          >
                            {isCurrentBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 2. CENTERPIECE VOCABULARY & AUDIO FOCUS */}
                      <div className="py-2.5 sm:py-3.5 text-center space-y-1.5 flex-1 flex flex-col justify-center items-center">
                        <div className="relative inline-flex items-center justify-center">
                          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white font-display tracking-tight leading-none drop-shadow-2xs text-center">
                            {currentWord.word}
                          </h2>
                          <button
                            type="button"
                            onClick={() => playWordAudio(currentWord.word, 0.95)}
                            className="absolute left-full ml-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 dark:bg-blue-950/80 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
                            title="Phát âm chuẩn (US)"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {currentWord.ipa && (
                          <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide pt-0.5 text-center">
                            {currentWord.ipa}
                          </p>
                        )}
                      </div>

                      {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
                        {/* Góc Trái Dưới: Chủ đề từ vựng */}
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                          <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
                          <span>Chủ đề:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {currentWord.topic || "Cảm xúc & Đời sống"}
                          </span>
                        </div>

                        {/* Góc Phải Dưới: Phím nhanh chọn đáp án */}
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                            <span>Phím nhanh:</span>
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {["1", "2", "3", "4"].map((key, idx) => (
                              <button
                                key={key}
                                type="button"
                                disabled={qIsAnswered}
                                onClick={() => {
                                  if (quizOptions[idx]) handleSelectQuizOption(quizOptions[idx]);
                                }}
                                className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                                title={`Chọn đáp án ${String.fromCharCode(65 + idx)} (Phím ${key})`}
                              >
                                {key}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* 4 Quiz Option Cards (2x2 Grid on sm+) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                      {quizOptions.map((opt, idx) => {
                        const isSelected = qSelectedOpt === opt.id;
                        let btnStyle = "bg-slate-50/80 dark:bg-slate-950/60 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/50 dark:hover:bg-blue-950/30";

                        if (qIsAnswered) {
                          if (opt.isCorrect) {
                            btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
                          } else if (isSelected && !opt.isCorrect) {
                            btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 font-bold shadow-xs";
                          } else {
                            btnStyle = "opacity-40 border-slate-200 dark:border-slate-800 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={qIsAnswered}
                            onClick={() => handleSelectQuizOption(opt)}
                            className={`p-3.5 sm:p-4 rounded-xl border text-left text-sm sm:text-base font-bold transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-2xs active:scale-98 ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="truncate">{opt.text}</span>
                            </div>
                            {qIsAnswered && opt.isCorrect && (
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                            )}
                            {qIsAnswered && isSelected && !opt.isCorrect && (
                              <X className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400 shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                  </div>
                )}

                {/* ===== SUB-MODE 2: FLASHCARD 3D SRS ARENA ===== */}
                {subMode === "flashcard" && (
                  <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
                    
                    {/* 3D Flip Card - Generous, Balanced & Cohesive */}
                    <div
                      onClick={() => {
                        setFIsFlipped(!fIsFlipped);
                        playWordAudio(currentWord.word);
                      }}
                      className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden cursor-pointer transition-all hover:border-[#0059bb] select-none group"
                    >
                      {/* 1. TOP METADATA ROW */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5 shrink-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-black uppercase tracking-wider font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1">
                            <Layers className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />
                            <span>Flashcard 3D SRS</span>
                          </span>

                          {currentWord.type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200/60 dark:border-slate-700/60">
                              {currentWord.type === "noun" && "Danh từ (n.)"}
                              {currentWord.type === "verb" && "Động từ (v.)"}
                              {currentWord.type === "adjective" && "Tính từ (adj.)"}
                              {currentWord.type === "adverb" && "Phó từ (adv.)"}
                              {!["noun", "verb", "adjective", "adverb"].includes(currentWord.type) && currentWord.type}
                            </span>
                          )}

                          {currentWord.level && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-black font-mono">
                              {currentWord.level}
                            </span>
                          )}
                        </div>

                        {/* Right Area: Question Countdown Timer + Bookmark Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Fast Bookmark Button - Icon Only */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark();
                            }}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                              isCurrentBookmarked
                                ? "bg-amber-500 text-white shadow-amber-500/20"
                                : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={isCurrentBookmarked ? "Đã lưu vào Sổ tay từ vựng" : "Lưu từ vựng này vào Sổ tay (+5 XP)"}
                          >
                            {isCurrentBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 2. CENTERPIECE DEDICATED 3D FLIPPABLE CARD */}
                      <div className="flex-1 w-full flex items-center justify-center my-auto py-1 [perspective:1000px]">
                        <div
                          className={`w-full max-w-2xl min-h-[140px] sm:min-h-[160px] p-5 sm:p-6 rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] relative flex items-center justify-center text-center cursor-pointer select-none shadow-xs hover:border-[#0059bb]/60 ${
                            fIsFlipped
                              ? "[transform:rotateY(180deg)] bg-blue-50/70 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-800/60"
                              : "bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFIsFlipped((prev) => !prev);
                            playWordAudio(currentWord.word);
                          }}
                        >
                          {/* FRONT SIDE (Từ vựng + IPA + Audio) */}
                          <div className="w-full flex flex-col items-center justify-center space-y-2 [backface-visibility:hidden]">
                            <div className="relative inline-flex items-center justify-center">
                              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white tracking-tight font-display text-center">
                                {currentWord.word}
                              </h2>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playWordAudio(currentWord.word);
                                }}
                                className="absolute left-full ml-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 border border-blue-200/60 dark:border-blue-800/40"
                                title="Nghe phát âm từ vựng"
                              >
                                <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                              </button>
                            </div>

                            {currentWord.ipa && (
                              <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide text-center">
                                {currentWord.ipa}
                              </p>
                            )}
                          </div>

                          {/* BACK SIDE (Giải nghĩa + Ví dụ) */}
                          <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col items-center justify-center space-y-1.5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Giải nghĩa tiếng Việt
                            </span>
                            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0059bb] dark:text-sky-400 font-display leading-snug">
                              {currentWord.meaning}
                            </h3>
                            {currentWord.example && (
                              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 max-w-lg mx-auto line-clamp-2 pt-0.5">
                                "{currentWord.example}"
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
                        {/* Góc Trái Dưới: Chủ đề từ vựng */}
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                          <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
                          <span>Chủ đề:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {currentWord.topic || "Cảm xúc & Đời sống"}
                          </span>
                        </div>

                        {/* Góc Phải Dưới: Phím nhanh */}
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                            <span>Phím nhanh:</span>
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFIsFlipped(!fIsFlipped);
                                playWordAudio(currentWord.word);
                              }}
                              className="h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
                              title="Lật mặt thẻ (Phím Space)"
                            >
                              Space
                            </button>
                            {["1", "2", "3"].map((key, idx) => {
                              const ratings: ("again" | "good" | "easy")[] = ["again", "good", "easy"];
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFlashcardRating(ratings[idx]);
                                  }}
                                  className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
                                  title={`Đánh giá mức độ nhớ (Phím ${key})`}
                                >
                                  {key}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* SRS 3-Tier Rating Buttons - Harmonious Design System Style */}
                    <div className="grid grid-cols-3 gap-2 shrink-0">
                      {/* Button 1: Chưa nhớ (Again) */}
                      <button
                        type="button"
                        onClick={() => handleFlashcardRating("again")}
                        className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 hover:border-rose-300 dark:hover:border-rose-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs active:scale-98 group"
                        title="Đánh giá Chưa nhớ (Phím 1)"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800/80 flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                            1
                          </span>
                          <span className="text-xs sm:text-base font-bold truncate text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                            Chưa nhớ
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold shrink-0 border border-rose-200/60 dark:border-rose-800/40 shadow-2xs">
                          +5 XP
                        </span>
                      </button>

                      {/* Button 2: Nhớ tốt (Good) */}
                      <button
                        type="button"
                        onClick={() => handleFlashcardRating("good")}
                        className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:border-[#0059bb]/50 dark:hover:border-blue-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs active:scale-98 group"
                        title="Đánh giá Nhớ tốt (Phím 2)"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs text-[#0059bb] dark:text-sky-400 group-hover:scale-105 transition-transform">
                            2
                          </span>
                          <span className="text-xs sm:text-base font-bold truncate text-slate-800 dark:text-slate-200 group-hover:text-[#0059bb] dark:group-hover:text-sky-400">
                            Nhớ tốt
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono text-xs font-bold shrink-0 border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                          +10 XP
                        </span>
                      </button>

                      {/* Button 3: Rất dễ (Easy) */}
                      <button
                        type="button"
                        onClick={() => handleFlashcardRating("easy")}
                        className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-800/80 text-slate-800 dark:text-slate-200 font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs active:scale-98 group"
                        title="Đánh giá Rất dễ (Phím 3)"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-xs font-black font-mono shrink-0 shadow-2xs text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                            3
                          </span>
                          <span className="text-xs sm:text-base font-bold truncate text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            Rất dễ
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shrink-0 border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                          +15 XP
                        </span>
                      </button>
                    </div>

                  </div>
                )}

                {/* ===== SUB-MODE 3: WRITING ARENA ===== */}
                {subMode === "writing" && (
                  <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
                    
                    {/* Prompt Target Word Card - Generous, Balanced & Cohesive */}
                    <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden">
                      
                      {/* 1. TOP METADATA ROW */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5 shrink-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-black uppercase tracking-wider font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1">
                            <PenLine className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />
                            <span>Writing Chính Tả</span>
                          </span>

                          {currentWord.type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200/60 dark:border-slate-700/60">
                              {currentWord.type === "noun" && "Danh từ (n.)"}
                              {currentWord.type === "verb" && "Động từ (v.)"}
                              {currentWord.type === "adjective" && "Tính từ (adj.)"}
                              {currentWord.type === "adverb" && "Phó từ (adv.)"}
                              {!["noun", "verb", "adjective", "adverb"].includes(currentWord.type) && currentWord.type}
                            </span>
                          )}

                          {currentWord.level && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-black font-mono">
                              {currentWord.level}
                            </span>
                          )}
                        </div>

                        {/* Right Area: Question Countdown Timer + Bookmark Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Question Countdown Timer */}
                          <div
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
                              questionTimeLeft <= 3
                                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 animate-pulse"
                                : questionTimeLeft <= 6
                                ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
                                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={`Thời gian còn lại cho câu hỏi này: ${questionTimeLeft}s`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{questionTimeLeft}s</span>
                          </div>

                          {/* Fast Bookmark Button - Icon Only */}
                          <button
                            type="button"
                            onClick={handleToggleBookmark}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                              isCurrentBookmarked
                                ? "bg-amber-500 text-white shadow-amber-500/20"
                                : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={isCurrentBookmarked ? "Đã lưu vào Sổ tay từ vựng" : "Lưu từ vựng này vào Sổ tay (+5 XP)"}
                          >
                            {isCurrentBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 2. CENTERPIECE MEANING & HINT AREA */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2 space-y-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Nghĩa tiếng Việt cần dịch
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 dark:text-white font-display leading-snug">
                          {currentWord.meaning}
                        </h2>

                        {wShowHint && (
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 font-mono text-xs sm:text-sm font-bold shadow-2xs animate-fade-in">
                            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>
                              Gợi ý: <strong className="text-amber-900 dark:text-amber-100 uppercase tracking-widest">{currentWord.word[0]} {Array(Math.max(0, currentWord.word.length - 1)).fill("_").join(" ")}</strong> ({currentWord.word.length} ký tự)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
                        {/* Góc Trái Dưới: Chủ đề từ vựng */}
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                          <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
                          <span>Chủ đề:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {currentWord.topic || "Cảm xúc & Đời sống"}
                          </span>
                        </div>

                        {/* Góc Phải Dưới: Phím nhanh */}
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                            <span>Phím nhanh:</span>
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0">
                              Enter: Kiểm tra
                            </kbd>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* 4. WRITING INPUT BOX & ACTION BAR */}
                    <div className="space-y-2 shrink-0">
                      <div className="relative flex items-center">
                        <input
                          ref={writingInputRef}
                          type="text"
                          disabled={wIsAnswered}
                          value={wInput}
                          onChange={(e) => setWInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !wIsAnswered) {
                              e.preventDefault();
                              handleCheckWriting();
                            }
                          }}
                          placeholder="Gõ từ tiếng Anh tương ứng và nhấn Enter..."
                          className={`w-full h-12 sm:h-13 pl-4 pr-24 text-base sm:text-lg font-mono font-bold rounded-xl border transition-all placeholder:text-slate-400 focus:outline-none shadow-2xs ${
                            wIsAnswered
                              ? wIsCorrect
                                ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200"
                                : "bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200"
                              : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/10"
                          }`}
                        />
                        {!wShowHint && !wIsAnswered && (
                          <button
                            type="button"
                            onClick={() => setWShowHint(true)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/60 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Mở gợi ý chữ cái (-7 XP)"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                            <span>Gợi ý</span>
                          </button>
                        )}
                      </div>

                      {!wIsAnswered && (
                        <button
                          type="button"
                          onClick={handleCheckWriting}
                          disabled={!wInput.trim()}
                          className="w-full h-11 sm:h-12 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 disabled:pointer-events-none text-white text-sm sm:text-base font-black shadow-xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                        >
                          <span>Kiểm Tra Chính Tả</span>
                          <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-xs font-bold">Enter ↵</kbd>
                        </button>
                      )}
                    </div>

                  </div>
                )}

                {/* ===== SUB-MODE 4: SPEAKING ARENA ===== */}
                {subMode === "speaking" && (
                  <div className="flex-1 flex flex-col justify-between min-h-0 space-y-2.5">
                    
                    {/* Prompt Target Word Card - Generous, Balanced & Cohesive */}
                    <div className="flex-1 min-h-[160px] sm:min-h-[185px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/25 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden">
                      
                      {/* 1. TOP METADATA ROW */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5 shrink-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-black uppercase tracking-wider font-mono border border-blue-200/60 dark:border-blue-800/40 shadow-2xs flex items-center gap-1">
                            <Mic className="w-3 h-3 text-[#0059bb] dark:text-sky-300" />
                            <span>Phát Âm AI</span>
                          </span>

                          {currentWord.type && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono border border-slate-200/60 dark:border-slate-700/60">
                              {currentWord.type === "noun" && "Danh từ (n.)"}
                              {currentWord.type === "verb" && "Động từ (v.)"}
                              {currentWord.type === "adjective" && "Tính từ (adj.)"}
                              {currentWord.type === "adverb" && "Phó từ (adv.)"}
                              {!["noun", "verb", "adjective", "adverb"].includes(currentWord.type) && currentWord.type}
                            </span>
                          )}

                          {currentWord.level && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-black font-mono">
                              {currentWord.level}
                            </span>
                          )}
                        </div>

                        {/* Right Area: Question Countdown Timer + Bookmark Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Question Countdown Timer */}
                          <div
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
                              questionTimeLeft <= 3
                                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 animate-pulse"
                                : questionTimeLeft <= 6
                                ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
                                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={`Thời gian còn lại cho câu hỏi này: ${questionTimeLeft}s`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{questionTimeLeft}s</span>
                          </div>

                          {/* Fast Bookmark Button - Icon Only */}
                          <button
                            type="button"
                            onClick={handleToggleBookmark}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                              isCurrentBookmarked
                                ? "bg-amber-500 text-white shadow-amber-500/20"
                                : "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                            }`}
                            title={isCurrentBookmarked ? "Đã lưu vào Sổ tay từ vựng" : "Lưu từ vựng này vào Sổ tay (+5 XP)"}
                          >
                            {isCurrentBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 2. CENTERPIECE TARGET VOCABULARY & AUDIO */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2 space-y-1.5">
                        <div className="relative inline-flex items-center justify-center">
                          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white font-display tracking-tight leading-none text-center">
                            {currentWord.word}
                          </h2>
                          <button
                            type="button"
                            onClick={() => playWordAudio(currentWord.word)}
                            className="absolute left-full ml-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 border border-blue-200/60 dark:border-blue-800/40"
                            title="Nghe phát âm chuẩn bản xứ"
                          >
                            <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        {currentWord.ipa && (
                          <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-bold tracking-wide text-center">
                            {currentWord.ipa}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5 text-center">
                          Nghĩa: <strong className="text-slate-700 dark:text-slate-200">{currentWord.meaning}</strong>
                        </p>
                      </div>

                      {/* 3. BOTTOM METADATA ROW: TOPIC (LEFT) & KEYBOARD SHORTCUTS (RIGHT) */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 shrink-0 text-xs">
                        {/* Góc Trái Dưới: Chủ đề từ vựng */}
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                          <Folder className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />
                          <span>Chủ đề:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {currentWord.topic || "Cảm xúc & Đời sống"}
                          </span>
                        </div>

                        {/* Góc Phải Dưới: Phím nhanh */}
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium shrink-0">
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                            <span>Phím nhanh:</span>
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={handleStartSpeaking}
                              disabled={sIsListening}
                              className="h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-[#0059bb] hover:text-[#0059bb] border border-slate-300 dark:border-slate-700 font-mono text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition-all active:scale-95"
                              title="Thu âm phát âm (Phím Space)"
                            >
                              Space: Thu âm
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* 4. MICROPHONE ACTION & AI SPEECH ASSESSMENT HUB */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3 shrink-0 shadow-2xs">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleStartSpeaking}
                          disabled={sIsListening}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                            sIsListening
                              ? "bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/25 scale-105"
                              : "bg-[#0059bb] hover:bg-[#004899] text-white hover:scale-105 active:scale-95 shadow-[#0059bb]/25"
                          }`}
                          title="Bấm Micro để thu âm phát âm"
                        >
                          <Mic className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          {sIsListening
                            ? "🔴 Đang lắng nghe giọng bạn phát âm..."
                            : sIsAnswered
                            ? "Bấm Micro hoặc Space để phát âm lại"
                            : "Nhấn nút Micro hoặc bấm Space để bắt đầu nói"}
                        </p>

                        {sSpeechError && (
                          <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900/30">
                            {sSpeechError}
                          </p>
                        )}

                        {sIsAnswered && sTranscript && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
                            <span>Giọng thu: <strong>"{sTranscript}"</strong></span>
                            <span className="font-mono font-bold">•</span>
                            <span className={`font-bold font-mono ${sIsCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                              Độ khớp: {sAccuracy}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. DƯỚI CÂU TRẢ LỜI: BỘ 2 NÚT [ CÂU TRƯỚC ] VÀ [ CÂU TIẾP THEO ] + FEEDBACK */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 shrink-0">
                  {/* Nút Câu Trước */}
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={handlePrevQuestion}
                    className="h-9 px-3 sm:px-4 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
                    title="Quay lại câu trước đó"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {/* Feedback Status / Center Message */}
                  <div className="text-center px-1 flex-1 min-w-0 flex items-center justify-center">
                    {subMode === "quiz" && qIsAnswered && (
                      qIsCorrect ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                          <span>Chính xác! (+10 XP)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in max-w-full truncate">
                          <X className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
                          <span className="truncate">Chưa đúng! Đáp án: <strong className="font-black text-rose-900 dark:text-rose-100">{currentWord.meaning}</strong></span>
                        </div>
                      )
                    )}
                    {subMode === "writing" && wIsAnswered && (
                      wIsCorrect ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                          <span>Chính xác! (+15 XP)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in max-w-full truncate">
                          <X className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
                          <span className="truncate">Chưa đúng! Đáp án: <strong className="font-black text-rose-900 dark:text-rose-100">{currentWord.word}</strong></span>
                        </div>
                      )
                    )}
                    {subMode === "speaking" && sIsAnswered && (
                      sIsCorrect ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-xs animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                          <span>Chuẩn xác! ({sAccuracy}%)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-300/80 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold shadow-xs animate-scale-in">
                          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.5] shrink-0" />
                          <span>Độ khớp: {sAccuracy}%</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Nút Câu Tiếp Theo / Hoàn Thành */}
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="h-9 px-3.5 sm:px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 shrink-0"
                    title="Chuyển sang câu tiếp theo"
                  >
                    <span>{currentIndex + 1 < vocabs.length ? "Câu tiếp theo" : "Hoàn thành"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* CỘT PHẢI: WORD LAB & CONTEXT INSIGHTS (4/12) */}
            <div className="lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3 lg:h-full lg:min-h-0 overflow-y-auto">
                
                {/* 1. Main Word Profile Header */}
                <div className="space-y-2.5 shrink-0">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> THÔNG TIN TỪ VỰNG
                    </span>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={handleToggleBookmark}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                        isCurrentBookmarked
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0059bb]"
                      }`}
                      title={isCurrentBookmarked ? "Bỏ lưu từ" : "Lưu vào Sổ tay từ vựng"}
                    >
                      {isCurrentBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isCurrentBookmarked ? "Đã lưu" : "Lưu từ"}</span>
                    </button>
                  </div>

                  {/* Word Card Details */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white capitalize font-display">
                          {currentWord.word}
                        </h3>
                        {currentWord.type && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                            {currentWord.type}
                          </span>
                        )}
                      </div>
                      {currentWord.level && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-xs font-bold font-mono border border-blue-200/60 dark:border-blue-800/40">
                          {currentWord.level}
                        </span>
                      )}
                    </div>

                    {currentWord.ipa && (
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">{currentWord.ipa}</p>
                    )}

                    <p className="text-xs sm:text-sm font-bold text-[#0059bb] dark:text-sky-400 pt-0.5">
                      {currentWord.meaning}
                    </p>
                  </div>
                </div>

                {/* 2. Contextual Example Sentences */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0">
                  <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" /> VÍ DỤ NGỮ CẢNH THỰC TẾ
                  </span>

                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm shadow-2xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                        "{currentWord.example || "She used the new vocabulary in a clear sentence."}"
                      </p>
                      <button
                        type="button"
                        onClick={() => playWordAudio(currentWord.example || currentWord.word)}
                        className="p-1 text-slate-400 hover:text-[#0059bb] transition-colors shrink-0 cursor-pointer"
                        title="Nghe phát âm câu ví dụ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {currentWord.exampleVi && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {currentWord.exampleVi}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Spaced Repetition SRS Tip */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
                  <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 flex items-start gap-2 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      Ôn tập lại từ vựng sau <strong>1 ngày, 3 ngày, 7 ngày</strong> để chuyển từ vựng vào bộ nhớ dài hạn!
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        ) : (

          /* ===== VIEW 2: IN-PLACE SCORECARD & SUMMARY ===== */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 overflow-y-auto space-y-3"
          >
            {/* Top Score Banner Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-2xs shrink-0">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                        Hoàn Thành Buổi Ôn Tập Từ Vựng!
                      </h2>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                        Xuất sắc
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Đã hoàn thành <strong className="text-slate-900 dark:text-white">{vocabs.length} từ vựng</strong> trong thời gian <strong className="text-slate-900 dark:text-white">{formatElapsedTime(elapsedTime)}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Tổng Thưởng</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-display tabular-nums">
                      +{totalEarnedXp} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#0059bb]" /> Số từ đã ôn
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    {vocabs.length} từ
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tỷ lệ ghi nhớ
                  </span>
                  <p className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                    {Math.round(((qCorrectCount + wCorrectCount + sCorrectCount || vocabs.length) / Math.max(1, vocabs.length)) * 100)}%
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-2xs">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> Thời gian học
                  </span>
                  <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                    {formatElapsedTime(elapsedTime)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleRestartSession}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Luyện Lại Buổi Này
                </button>

                <Link
                  href="/study/listening"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <Headphones className="w-4 h-4" /> Sang Phòng Luyện Nghe
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  Về Bảng Điều Khiển
                </Link>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none animate-pulse">
          <div className="w-full h-14 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 px-6 flex items-center justify-between" />
        </div>
      }
    >
      <PracticeQuizContent />
    </Suspense>
  );
}
