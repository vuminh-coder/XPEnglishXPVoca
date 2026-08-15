"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useUserStore } from "@/lib/store/userStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useListeningStore } from "@/lib/store/listeningStore";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText, stopTTS } from "@/lib/utils/ttsEngine";
import { LessonCoverImage } from "@/components/shared/LessonCoverImage";


import {
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  RotateCcw,
  RotateCw,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Volume2,
  Zap,
  Trophy,
  Mic,
  Globe,
  Eye,
  EyeOff,
  BookOpen,
  ChevronRight,
  Bookmark,
  Sparkles,
  BookMarked,
  Sliders,
  Check,
  Award,
  Heart,
  Star,
  Share2,
  Download,
  Bot,
  Square,
  RefreshCw,
  MessageSquare,
  FileText,
  PieChart,
  SlidersHorizontal,
  Wand2,
  Plus,
  Image as ImageIcon,
  Layers,
  ListFilter,
  Lock,
  HelpCircle,
  Clock,
  Brain,
  PenLine,
  GraduationCap,
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/lib/data/listeningMockData";
import { lookupWordDeep, DeepWordDefinition } from "@/lib/utils/deepDictionary";
import { pick10RandomLessons } from "@/lib/utils/randomLessonPicker";

const getWordMaskDots = (word: string) => {
  const len = word.replace(/[^a-zA-Z0-9]/g, "").length;
  if (len <= 2) return "••";
  if (len <= 4) return "••••";
  if (len <= 7) return "••••••";
  return "••••••••";
};

const getTooltipCoords = (rect: DOMRect | null) => {
  if (!rect) return { top: 0, left: 0 };
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const tooltipHalfWidth = 110;
  const rawLeft = rect.left + rect.width / 2;
  const clampedLeft = Math.max(
    tooltipHalfWidth + 20,
    Math.min(screenWidth - tooltipHalfWidth - 20, rawLeft),
  );
  const top = Math.max(10, rect.top - 76);
  return { top, left: clampedLeft };
};

export default function ListeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdFromUrl = searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    currentLessonId,
    setCurrentLessonId,
    markLessonCompleted,
    completedLessonIds,
  } = useListeningStore();

  // Lessons list state (combines mock data + user generated lessons)
  const [lessonsList, setLessonsList] = useState<any[]>(MOCK_LESSONS_DATA);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    lessonIdFromUrl || null,
  );

  const currentLesson =
    lessonsList.find((l) => l.id === selectedLessonId) || null;

  // Sync URL & LocalStorage Persistence
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (lessonIdFromUrl) {
      setSelectedLessonId(lessonIdFromUrl);
      setCurrentLessonId(lessonIdFromUrl);
      localStorage.setItem("xp_voca_last_listening_lesson", lessonIdFromUrl);
    } else {
      const savedLesson = localStorage.getItem("xp_voca_last_listening_lesson");
      if (savedLesson && !selectedLessonId) {
        setSelectedLessonId(savedLesson);
        setCurrentLessonId(savedLesson);
      }
    }
  }, [lessonIdFromUrl, setCurrentLessonId]);

  // Randomized 10-Lesson Picker State (Prioritizes unlearned lessons)
  const [displayed10Lessons, setDisplayed10Lessons] = useState<any[]>([]);

  useEffect(() => {
    setDisplayed10Lessons(
      pick10RandomLessons(lessonsList, completedLessonIds || []),
    );
  }, [lessonsList, completedLessonIds]);

  const handleShuffle10Lessons = () => {
    setDisplayed10Lessons(
      pick10RandomLessons(lessonsList, completedLessonIds || []),
    );
    addToast({ type: "info", title: "Đã bốc 10 bài ngẫu nhiên mới! 🎲" });
  };

  // Form State: Create New Article
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newAccent, setNewAccent] = useState("en-US");
  const [newLevel, setNewLevel] = useState("B1");
  const [newVoice, setNewVoice] = useState("Teacher");

  // 2 PRACTICE LISTEN MODES: "full" (Nghe toàn bộ) vs "chunk3" (Luyện 3 câu một lần)
  const [practiceListenMode, setPracticeListenMode] = useState<
    "full" | "chunk3"
  >("chunk3");
  const [chunkIndex, setChunkIndex] = useState(0);

  // INTERACTIVE TEXT BLUR & REVEAL STATE
  const [revealedBlocks, setRevealedBlocks] = useState<{
    [id: string]: boolean;
  }>({});
  const [revealedWords, setRevealedWords] = useState<{
    [key: string]: boolean;
  }>({});
  const [globalRevealAll, setGlobalRevealAll] = useState(false);

  const toggleRevealBlock = (blockId: string) => {
    setRevealedBlocks((prev) => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  const toggleRevealWord = (wordKey: string) => {
    setRevealedWords((prev) => ({ ...prev, [wordKey]: !prev[wordKey] }));
  };

  // Word Hover Tooltip State (Hides translation while masked)
  const [hoveredWordData, setHoveredWordData] = useState<{
    word: string;
    meaning: string;
    ipa: string;
    isRevealed: boolean;
    rect: DOMRect | null;
  } | null>(null);

  const handleWordMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    word: string,
    isRevealed: boolean,
  ) => {
    // Trên Mobile (< 768px): Chặn hoàn toàn hover tooltip!
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setHoveredWordData(null);
      return;
    }

    // If unrevealed, do NOT show any hover tooltip at all!
    if (!isRevealed) {
      setHoveredWordData(null);
      return;
    }

    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const deepDef = lookupWordDeep(cleanWord);

    setHoveredWordData({
      word: cleanWord,
      meaning: deepDef.meaning,
      ipa: deepDef.ipa,
      isRevealed: true,
      rect,
    });
  };

  const handleWordMouseLeave = () => {
    setHoveredWordData(null);
  };

  const speakSingleWord = (word: string) => {
    speakLessonText(word, {
      lessonId: currentLesson?.id,
      rate: 1.0,
    });
  };


  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(
    null,
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [toggledSentenceTranslations, setToggledSentenceTranslations] =
    useState<{ [actualIdx: number]: boolean }>({});
  const [toggledFullTranslation, setToggledFullTranslation] = useState(false);

  const [rightSidebarTab, setRightSidebarTab] = useState<
    "quiz" | "vocab" | "notes"
  >("quiz");
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>(
    {},
  );

  const handleSelectQuizOption = (
    qIdx: number,
    optionIdx: number,
    correctIdx: number,
  ) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...quizAnswers, [qIdx]: optionIdx };
    setQuizAnswers(nextAnswers);

    const isCorrect = optionIdx === correctIdx;
    if (isCorrect) {
      awardXp(10, "dictation");
      addToast({ type: "success", title: "Chính xác! +10 XP 🎯" });
    } else {
      addToast({
        type: "error",
        title: "Chưa chính xác, hãy đọc kỹ giải thích!",
      });
    }

    if (currentLesson) {
      fetch("/api/listening/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest-user",
          lessonId: currentLesson.id,
          xpEarned: isCorrect ? 10 : 0,
        }),
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    addToast({ type: "info", title: "Đã làm mới bài kiểm tra Quiz! 🔄" });
  };

  // Inline Shadowing state per sentence
  const [inlineRecordingSentenceId, setInlineRecordingSentenceId] = useState<
    number | null
  >(null);
  const [inlineRecordingTime, setInlineRecordingTime] = useState(0);
  const [inlineAiScore, setInlineAiScore] = useState<{ [key: number]: number }>(
    {},
  );
  const [isInlineAnalyzing, setIsInlineAnalyzing] = useState(false);

  // Interactive 3-Sentence Word Matching State (Real-time Word Tokenizer & Instant Green Border Reveal)
  const [sentenceInputs, setSentenceInputs] = useState<{
    [sentenceId: string | number]: string;
  }>({});
  const [inputMatchStatus, setInputMatchStatus] = useState<{
    [sentenceId: string | number]: "idle" | "correct" | "incorrect";
  }>({});
  const [activeInputSentenceId, setActiveInputSentenceId] = useState<
    number | string | null
  >(null);
  const [matchedWordsPerSentence, setMatchedWordsPerSentence] = useState<{
    [sentenceId: string | number]: { [wordIdx: number]: boolean };
  }>({});

  const handleSentenceInputChange = (
    sentenceId: number | string,
    val: string,
  ) => {
    setSentenceInputs((prev) => ({ ...prev, [sentenceId]: val }));
    if (!val.trim()) {
      setInputMatchStatus((prev) => ({
        ...prev,
        [sentenceId]: "idle" as const,
      }));
    }
  };

  const handleSentenceInputCheck = (
    sentenceId: number | string,
    sentenceText: string,
  ) => {
    const rawVal = sentenceInputs[sentenceId] || "";
    const cleanInput = rawVal.trim().toLowerCase();
    if (!cleanInput) {
      setInputMatchStatus((prev) => ({
        ...prev,
        [sentenceId]: "idle" as const,
      }));
      return;
    }

    // Split input into words
    const inputWords = cleanInput.split(/\s+/).filter(Boolean);
    const latestWord = inputWords[inputWords.length - 1]?.replace(
      /[^a-z0-9]/gi,
      "",
    );

    if (!latestWord) return;

    const targetWords = sentenceText.split(/\s+/);
    let foundMatchIndex = -1;

    const currentMatched = matchedWordsPerSentence[sentenceId] || {};

    // Find the FIRST unmatched occurrence of latestWord in sequential order
    for (let wIdx = 0; wIdx < targetWords.length; wIdx++) {
      const cleanTarget = targetWords[wIdx]
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "");
      const wordKey =
        sentenceId === "full" ? `full-${wIdx}` : `s-${sentenceId}-${wIdx}`;
      const isAlreadyMatched = currentMatched[wIdx] || revealedWords[wordKey];

      if (cleanTarget === latestWord && !isAlreadyMatched) {
        foundMatchIndex = wIdx;
        break;
      }
    }

    if (foundMatchIndex !== -1) {
      const wordKey =
        sentenceId === "full"
          ? `full-${foundMatchIndex}`
          : `s-${sentenceId}-${foundMatchIndex}`;
      setRevealedWords((prev) => ({ ...prev, [wordKey]: true }));

      const newlyMatched = {
        ...(matchedWordsPerSentence[sentenceId] || {}),
        [foundMatchIndex]: true,
      };

      setMatchedWordsPerSentence((prev) => ({
        ...prev,
        [sentenceId]: newlyMatched,
      }));

      setInputMatchStatus((prev) => ({
        ...prev,
        [sentenceId]: "correct" as const,
      }));
      awardXp(5);
      addToast({
        type: "success",
        title: `Chính xác từ: "${latestWord}"! +5 XP 🎯`,
      });

      // Kiểm tra nếu gõ đúng 100% các từ trong câu:
      const isAllMatched = targetWords.every(
        (_, wIdx) =>
          newlyMatched[wIdx] ||
          revealedWords[
            sentenceId === "full" ? `full-${wIdx}` : `s-${sentenceId}-${wIdx}`
          ],
      );

      if (isAllMatched) {
        // 1. Ẩn lập tức ô nhập liệu trước
        setActiveInputSentenceId(null);

        // 2. Mở toàn bộ văn bản Tiếng Anh và đưa bản dịch lên thế chỗ
        const blockKey =
          sentenceId === "full" ? "full-block" : `sentence-${sentenceId}`;
        setRevealedBlocks((prev) => ({ ...prev, [blockKey]: true }));
        awardXp(20);
        addToast({
          type: "success",
          title: "🎉 Xuất sắc! Bạn đã gõ đúng 100% bài nghe (+20 XP)",
        });
      }

      setTimeout(() => {
        setInputMatchStatus((prev) => ({
          ...prev,
          [sentenceId]: "idle" as const,
        }));
      }, 1500);
    } else {
      setInputMatchStatus((prev) => ({
        ...prev,
        [sentenceId]: "incorrect" as const,
      }));
      setTimeout(() => {
        setInputMatchStatus((prev) => ({
          ...prev,
          [sentenceId]: "idle" as const,
        }));
      }, 1200);
    }
  };

  const handleSentenceInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    sentenceId: number | string,
    sentenceText: string,
  ) => {
    if (e.key === " " || e.key === "Enter" || e.code === "Space") {
      handleSentenceInputCheck(sentenceId, sentenceText);
    }
  };

  // Cloud notes state
  const [cloudNoteText, setCloudNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState<{
    [sentenceId: number]: string;
  }>({});

  const saveUserNote = async (text: string) => {
    if (!currentLesson) return;
    try {
      await fetch("/api/listening/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest-user",
          lessonId: currentLesson.id,
          content: text,
        }),
      });
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  // Bookmarks
  const [bookmarkedSentences, setBookmarkedSentences] = useState<number[]>([]);

  // Selected word dictionary modal/popup state (Deep AI Word Breakdown)
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(
    null,
  );

  const inlineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = React.useRef(0);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (selectedLessonId) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
      elapsedTimeRef.current = 0;
    }

    return () => {
      if (timer) clearInterval(timer);
      if (elapsedTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "dictation");
        elapsedTimeRef.current = 0;
      }
    };
  }, [selectedLessonId]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetLessonState = () => {
    stopTTS();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }


    setIsPlaying(false);
    setPlayingSentenceText(null);
    setCurrentSentenceIndex(0);
    setChunkIndex(0);
    setRevealedBlocks({});
    setRevealedWords({});
    setMatchedWordsPerSentence({});
    setSentenceInputs({});
    setInputMatchStatus({});
    setGlobalRevealAll(false);
    setQuizAnswers({});
    setInlineAiScore({});
    setToggledSentenceTranslations({});
    setToggledFullTranslation(false);
    setElapsedTime(0);
    elapsedTimeRef.current = 0;
  };

  // Automatically stop audio on lesson change or component unmount
  useEffect(() => {
    return () => {
      stopTTS();
    };
  }, [selectedLessonId]);


  const handleBackToListing = () => {

    if (elapsedTimeRef.current > 5) {
      const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
      useUserStore.getState().addPracticeTime(mins, "dictation");
    }
    resetLessonState();
    setSelectedLessonId(null);
  };

  const handleSelectLesson = (lessonId: string) => {
    resetLessonState();
    setSelectedLessonId(lessonId);
    markLessonCompleted(lessonId);
    scrollToWorkspace();
  };

  const scrollToWorkspace = () => {
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  useEffect(() => {
    if (selectedLessonId) {
      setCurrentLessonId(selectedLessonId);
    }
  }, [selectedLessonId, setCurrentLessonId]);

  // Space key to toggle play/pause current sentence audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();

      const isSpeechSpeaking =
        typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        window.speechSynthesis.speaking;
      const isAudioPlaying = audioRef.current && !audioRef.current.paused;

      if (
        isPlaying ||
        playingSentenceText ||
        isSpeechSpeaking ||
        isAudioPlaying
      ) {
        // Stop/Pause audio on 2nd press (even count)
        if (audioRef.current) audioRef.current.pause();
        stopTTS();
        setIsPlaying(false);
        setPlayingSentenceText(null);
      } else {

        // Play audio on 1st press (odd count)
        const sentence = currentLesson?.transcript?.[currentSentenceIndex];
        if (sentence?.text) {
          playSingleSentence(sentence.text);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLesson, currentSentenceIndex, isPlaying, playingSentenceText]);

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const vocabList =
    currentLesson?.vocabulary || currentLesson?.vocabularyList || [];

  const totalSentencesCount = currentLesson?.transcript?.length || 0;
  const totalChunksCount = Math.ceil(totalSentencesCount / 3);

  // Get displayed sentences based on practice mode
  const displayedSentences = currentLesson?.transcript
    ? practiceListenMode === "chunk3"
      ? currentLesson.transcript.slice(chunkIndex * 3, (chunkIndex + 1) * 3)
      : currentLesson.transcript
    : [];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakParagraph = (text: string) => {
    if (!text) {
      setIsPlaying(false);
      return;
    }
    if (audioRef.current) audioRef.current.pause();
    stopTTS();
    setPlayingSentenceText(null);
    setIsPlaying(true);
    speakLessonText(text, {
      lessonId: currentLesson?.id,
      rate: playbackSpeed,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };



  // Helper to ensure audio HTML5 element is ready
  const ensureAudioElement = () => {
    const fullText = currentLesson?.transcript
      ? currentLesson.transcript.map((s: any) => s.text).join(" ")
      : "";

    if (
      !audioRef.current &&
      currentLesson?.audioUrl &&
      !currentLesson.audioUrl.includes("soundhelix")
    ) {
      const audio = new Audio(currentLesson.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => speakParagraph(fullText);
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // Dedicated Rewind (-10s / -5s) Handler
  const handleRewind = (seconds = 10, currentSentenceText?: string) => {
    const audio = ensureAudioElement();
    if (audio && !isNaN(audio.duration) && audio.duration > 0) {
      let newTime = (audio.currentTime || 0) - seconds;
      if (newTime < 0) newTime = 0;
      audio.currentTime = newTime;
      audio.playbackRate = playbackSpeed;
      audio.play().catch(() => {});
      setIsPlaying(true);
      addToast({
        type: "info",
        title: `⏪ Đã lùi lại ${seconds}s (${formatElapsedTime(Math.floor(newTime))})`,
      });
    } else {
      if (currentSentenceText) {
        playSingleSentence(currentSentenceText);
        addToast({ type: "info", title: `⏪ Phát lại câu thoại!` });
      } else {
        const fullText =
          currentLesson?.transcript?.map((s: any) => s.text).join(" ") || "";
        speakParagraph(fullText);
        addToast({ type: "info", title: `⏪ Phát lại bài nghe từ đầu!` });
      }
    }
  };

  // Dedicated FastForward (+10s / +5s) Handler
  const handleFastForward = (seconds = 10, currentSentenceText?: string) => {
    const audio = ensureAudioElement();
    if (audio && !isNaN(audio.duration) && audio.duration > 0) {
      let newTime = (audio.currentTime || 0) + seconds;
      if (newTime > audio.duration) newTime = audio.duration;
      audio.currentTime = newTime;
      audio.playbackRate = playbackSpeed;
      audio.play().catch(() => {});
      setIsPlaying(true);
      addToast({
        type: "info",
        title: `⏩ Đã tua tới ${seconds}s (${formatElapsedTime(Math.floor(newTime))})`,
      });
    } else {
      if (currentSentenceText) {
        playSingleSentence(currentSentenceText);
        addToast({ type: "info", title: `⏩ Tua tới / Phát lại câu thoại!` });
      } else {
        const fullText =
          currentLesson?.transcript?.map((s: any) => s.text).join(" ") || "";
        speakParagraph(fullText);
        addToast({ type: "info", title: `⏩ Phát bài nghe!` });
      }
    }
  };

  const playSingleSentence = (text: string, index: number = 0) => {
    if (!text) return;
    if (audioRef.current) audioRef.current.pause();
    stopTTS();
    setIsPlaying(false);

    setPlayingSentenceText(text);
    speakLessonText(text, {
      lessonId: currentLesson?.id,
      speakerIndex: index % 2,
      rate: playbackSpeed,
      onEnd: () => setPlayingSentenceText(null),
      onError: () => setPlayingSentenceText(null),
    });
  };



  const togglePlay = () => {
    if (isPlaying) {
      if (activeUtteranceRef.current) {
        activeUtteranceRef.current.onend = null;
        activeUtteranceRef.current.onerror = null;
        activeUtteranceRef.current = null;
      }
      if (audioRef.current) audioRef.current.pause();
      stopTTS();
      setIsPlaying(false);

    } else {
      setIsPlaying(true);
      const fullText = currentLesson?.transcript
        ? currentLesson.transcript.map((s: any) => s.text).join(" ")
        : "";

      if (
        currentLesson?.audioUrl &&
        !currentLesson.audioUrl.includes("soundhelix")
      ) {
        if (!audioRef.current) {
          const audio = new Audio(currentLesson.audioUrl);
          audio.onended = () => setIsPlaying(false);
          audio.onerror = () => speakParagraph(fullText);
          audioRef.current = audio;
        }
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.play().catch(() => {
          speakParagraph(fullText);
        });
      } else {
        speakParagraph(fullText);
      }
    }
  };

  // Helper to generate Initial Letter Avatar
  const getInitialAvatar = (title: string) => {
    const clean = title.trim();
    const firstChar = clean ? clean.charAt(0).toUpperCase() : "A";
    const gradients = [
      "from-blue-600 via-indigo-600 to-purple-600",
      "from-[#1d6ee6] via-sky-500 to-cyan-500",
      "from-purple-600 via-pink-600 to-rose-600",
      "from-emerald-600 via-teal-600 to-cyan-600",
      "from-amber-500 via-orange-600 to-red-600",
    ];
    const charCode = firstChar.charCodeAt(0);
    const gradIndex = charCode % gradients.length;
    return { firstChar, gradient: gradients[gradIndex] };
  };

  // Handle Form Submission: Create New AI Lesson
  const handleCreateArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) {
      addToast({
        type: "error",
        title: "Vui lòng nhập Tên bài và Nội dung văn bản!",
      });
      return;
    }

    const sentences = newText
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .map((sec, idx) => ({
        id: idx + 1,
        sentenceId: `sent-${idx + 1}`,
        startTime: idx * 4,
        endTime: (idx + 1) * 4,
        text: sec.trim(),
        ipa: "/ˈsæm.pəl/",
        vietnamese: `Bản dịch câu ${idx + 1}`,
        translation: `Bản dịch câu ${idx + 1}`,
      }));

    const newArticle = {
      id: `custom-lesson-${Date.now()}`,
      title: newTitle.trim(),
      imageUrl: newThumbnail.trim() || null,
      level: newLevel,
      accent: newAccent,
      voice: newVoice,
      duration: `${Math.max(1, Math.ceil(sentences.length * 0.4))} phút`,
      transcript: sentences,
      vocabulary: [
        {
          word: newTitle.split(" ")[0] || "English",
          ipa: "/ˈɪŋ.ɡlɪʃ/",
          meaning: "Tiếng Anh",
          example: newTitle,
        },
      ],
      quizzes: [],
    };

    setLessonsList([newArticle, ...lessonsList]);
    resetLessonState();
    setSelectedLessonId(newArticle.id);
    setCurrentLessonId(newArticle.id);

    setNewTitle("");
    setNewText("");
    setNewThumbnail("");
    setShowCreateForm(false);
    scrollToWorkspace();

    awardXp(30);
    addToast({
      type: "success",
      title: "Tạo bài nghe AI thành công! 🚀",
      message: `+30 XP! Bài '${newArticle.title}' đã sẵn sàng để luyện nghe.`,
    });
  };

  const speakWord = (word: string, accent = "en-US") => {
    speakLessonText(word, {
      lessonId: currentLesson?.id,
      accent: accent as any,
      rate: 1.15,
    });
  };


  // Word Click Handler (Instant 0ms lookup using lesson vocabulary & internal dictionary)
  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    // Play native audio pronunciation automatically
    speakWord(cleanWord, currentLesson?.accent || "en-US");

    // 1. Check if word exists in the lesson's vocabularyList / vocabList
    const vocabList: any[] =
      (currentLesson as any)?.vocabularyList ||
      (currentLesson as any)?.vocabList ||
      [];
    const vocabMatch = vocabList.find(
      (v: any) => v.word?.toLowerCase() === cleanWord.toLowerCase(),
    );

    if (vocabMatch) {
      setSelectedWord({
        word: vocabMatch.word || cleanWord,
        ipa: vocabMatch.ipa || `/${cleanWord}/`,
        pos: vocabMatch.pos || "Từ vựng",
        meaning:
          vocabMatch.vietnamese || vocabMatch.meaning || "Nghĩa tiếng Việt",
        detailMeaning: vocabMatch.example
          ? `Ví dụ: "${vocabMatch.example}"`
          : undefined,
        example: vocabMatch.example || `Example with ${cleanWord}`,
      });
      return;
    }

    // 2. Perform Deep Dictionary Lookup (Instant 0ms)
    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWord(deepDef);
  };

  const toggleBookmarkSentence = (idx: number) => {
    if (bookmarkedSentences.includes(idx)) {
      setBookmarkedSentences(bookmarkedSentences.filter((i) => i !== idx));
      addToast({ type: "info", title: "Đã bỏ bookmark câu!" });
    } else {
      setBookmarkedSentences([...bookmarkedSentences, idx]);
      addToast({ type: "success", title: "Đã bookmark câu thoại! 🔖" });
    }
  };

  // Inline Shadowing Recording
  const startInlineRecording = (sentenceId: number) => {
    setInlineRecordingSentenceId(sentenceId);
    setInlineRecordingTime(0);
    inlineTimerRef.current = setInterval(() => {
      setInlineRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopInlineRecording = (sentenceId: number) => {
    if (inlineTimerRef.current) clearInterval(inlineTimerRef.current);
    setInlineRecordingSentenceId(null);
    setIsInlineAnalyzing(true);

    setTimeout(() => {
      setIsInlineAnalyzing(false);
      const score = Math.floor(Math.random() * 15) + 85;
      setInlineAiScore((prev) => ({ ...prev, [sentenceId]: score }));
      awardXp(15);
      addToast({
        type: "success",
        title: "AI Chấm điểm nhại giọng!",
        message: `+15 XP! Điểm phát âm câu ${sentenceId + 1}: ${score}%`,
      });
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      {!selectedLessonId && (
        <>
          {/* 1. TOP HERO HEADER & CREATE ARTICLE TOGGLE BAR */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 sm:p-5 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Headphones className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black bg-[#1d6ee6] text-white">
                    AI LISTENING WORKSPACE
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500">
                    10 Bài đọc hàng ngang & Tạo bài AI
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold tracking-tight font-display text-slate-900 dark:text-white truncate">
                  Hệ Thống Luyện Nghe & Tạo Bài Đọc Tiếng Anh
                </h1>
              </div>
            </div>

            {/* Create Article Toggle Button */}
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-3 py-1.5 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-[11px] sm:text-xs font-extrabold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              {showCreateForm ? "Đóng form tạo bài" : "Tạo bài nghe mới"}
            </button>
          </motion.div>

          {/* 2. FORM TẠO BÀI NGHE AI MỚI */}
          <AnimatePresence>
            {showCreateForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateArticleSubmit}
                className="p-3.5 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/40 shadow-2xs space-y-3 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-purple-600" /> TẠO BÀI NGHE
                    TIẾNG ANH AI TÙY CHỈNH
                  </h2>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20">
                    +30 XP / Bài tạo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="new-article-title-input"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      1. Tên bài nghe (Article Title):
                    </label>
                    <input
                      id="new-article-title-input"
                      type="text"
                      required
                      className="w-full h-8 px-2.5 text-xs font-semibold rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                      placeholder="Ví dụ: Coffee Culture in Vietnam..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="new-article-thumbnail-input"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between"
                    >
                      <span>2. Ảnh đại diện (URL Image):</span>
                      <span className="text-[9px] font-medium text-slate-400">
                        Nếu trống = Tự sinh Avatar Chữ cái
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="new-article-thumbnail-input"
                        type="text"
                        className="w-full h-8 px-2.5 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                        placeholder="https://example.com/thumbnail.jpg"
                        value={newThumbnail}
                        onChange={(e) => setNewThumbnail(e.target.value)}
                      />
                      {newTitle && !newThumbnail && (
                        <div
                          className={`w-8 h-8 rounded-xs shrink-0 bg-gradient-to-br ${getInitialAvatar(newTitle).gradient} text-white font-black text-xs flex items-center justify-center shadow-2xs`}
                        >
                          {getInitialAvatar(newTitle).firstChar}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="new-article-text-textarea"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    3. Nội dung văn bản đoạn văn (English Text Content):
                  </label>
                  <textarea
                    id="new-article-text-textarea"
                    rows={3}
                    required
                    className="w-full p-2.5 text-xs font-medium rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 shadow-inner"
                    placeholder="Today is a beautiful day. I really love learning English with AI..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      aria-label="Chọn Accent"
                      value={newAccent}
                      onChange={(e) => setNewAccent(e.target.value)}
                      className="h-7 px-2 text-xs font-bold rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                    >
                      <option value="en-US">US Accent</option>
                      <option value="en-UK">UK Accent</option>
                      <option value="en-AU">AU Accent</option>
                    </select>

                    <select
                      aria-label="Chọn Trình độ Level"
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      className="h-7 px-2 text-xs font-bold rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                    >
                      <option value="A1">Level A1</option>
                      <option value="A2">Level A2</option>
                      <option value="B1">Level B1</option>
                      <option value="B2">Level B2</option>
                      <option value="C1">Level C1</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="h-8 px-4 text-xs font-black rounded-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs hover:scale-102 active:scale-98 transition-transform cursor-pointer"
                  >
                    🚀 TẠO BÀI NGHE AI NGAY
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* 3. DANH SÁCH 10 BÀI NGHE NẰM NGANG (BỐC NGẪU NHIÊN & TỰ ĐỘNG ĐÁNH DẤU ĐÃ HỌC) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />{" "}
                DANH SÁCH 10 BÀI ĐỌC (BẤM ĐỂ CHỌN BÀI HỌC)
              </h2>
              <button
                onClick={handleShuffle10Lessons}
                className="text-[10px] font-bold text-slate-500 hover:text-[#1d6ee6] dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Đổi 10 bài ngẫu nhiên
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {(displayed10Lessons.length > 0
                ? displayed10Lessons
                : lessonsList.slice(0, 10)
              ).map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                const isCompleted = completedLessonIds.includes(lesson.id);
                const { firstChar, gradient } = getInitialAvatar(lesson.title);

                return (
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    key={lesson.id}
                    onClick={() => {
                      handleSelectLesson(lesson.id);
                    }}
                    className={`p-2.5 rounded-xs border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-blue-500/20 shadow-xs"
                        : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 shadow-2xs"
                    }`}
                  >
                    <div className="relative w-full h-24 rounded-xs overflow-hidden shrink-0">
                      <LessonCoverImage lesson={lesson} className="w-full h-full" showBadge={false} />

                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-slate-900/80 text-white backdrop-blur-xs z-20">
                        {lesson.level || "B1"}
                      </span>

                      {isCompleted && (
                        <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-emerald-600 text-white flex items-center gap-0.5 shadow-2xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" /> Đã học
                        </span>
                      )}

                      {isSelected && (
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-[#1d6ee6] text-white flex items-center gap-1 shadow-2xs">
                          <Play className="w-2.5 h-2.5 fill-white" /> Đang chọn
                        </span>
                      )}
                    </div>

                    <div className="mt-2 space-y-1 flex-1 flex flex-col justify-between">
                      <h3
                        className={`text-xs font-bold font-display truncate ${
                          isSelected
                            ? "text-blue-600 dark:text-sky-400"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {lesson.title}
                      </h3>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 dark:border-white/5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />{" "}
                          {lesson.duration || "5 min"}
                        </span>
                        <span>{lesson.accent || "US"}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 4. MAIN BENTO GRID WORKSPACE */}
      {!selectedLessonId || !currentLesson ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xs bg-slate-50/80 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-white/10 text-center space-y-2.5 my-2"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
            <Headphones className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Vui lòng chọn 1 bài đọc trên danh sách 10 bài để bắt đầu luyện nghe
          </h3>
          <p className="text-xs font-medium text-slate-500 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2">
            Bấm chọn bất kỳ thẻ bài đọc nào ở dải 10 bài nằm ngang ở trên hoặc
            bấm nút{" "}
            <strong className="text-[#1d6ee6] dark:text-sky-400 font-bold whitespace-nowrap">
              "✨ Tạo bài nghe mới"
            </strong>{" "}
            để hệ thống hiển thị khu vực luyện nghe!
          </p>
        </motion.div>
      ) : (
        <div
          ref={workspaceRef}
          id="active-listening-workspace"
          className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-2 min-w-0"
        >
          {/* CỘT TRÁI: PRACTICE MODE SWITCHER & SENTENCE CARDS (7/12 Width) */}
          <div className="lg:col-span-8 space-y-3.5 min-w-0">
            {/* Active Lesson Header & Timer & Global Masking Toggle */}
            <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 min-w-0">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5 gap-1.5 min-w-0 w-full flex-nowrap">
                <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                  <button
                    onClick={handleBackToListing}
                    className="px-2 sm:px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0 whitespace-nowrap"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Quay lại</span>
                  </button>
                  <h2
                    className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate min-w-0 flex-1"
                    title={currentLesson.title}
                  >
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                    {formatElapsedTime(elapsedTime)}
                  </span>
                </div>
              </div>

              {/* 2 PRACTICE LISTEN MODES SWITCHER */}
              <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-xs grid grid-cols-2 gap-1 border border-slate-200/50 dark:border-white/5 w-full">
                <button
                  onClick={() => setPracticeListenMode("full")}
                  className={`py-1.5 px-1.5 sm:px-2 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                    practiceListenMode === "full"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span className="sm:hidden">1. Toàn Bài</span>
                  <span className="hidden sm:inline">1. Nghe Toàn Bộ Bài</span>
                </button>

                <button
                  onClick={() => {
                    setPracticeListenMode("chunk3");
                    setChunkIndex(0);
                  }}
                  className={`py-1.5 px-1.5 sm:px-2 rounded-xs text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                    practiceListenMode === "chunk3"
                      ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span className="sm:hidden">2. Luyện 3 Câu</span>
                  <span className="hidden sm:inline">
                    2. Luyện 3 Câu Một Lần (Khuyên dùng)
                  </span>
                </button>
              </div>
            </div>

            {/* MODE 1: SINGLE UNIFIED BLOCK FOR FULL LESSON PRACTICE */}
            {practiceListenMode === "full" &&
              (() => {
                const fullBlockKey = "full-block";
                const isFullRevealed =
                  globalRevealAll || revealedBlocks[fullBlockKey];
                const isFullTranslationVisible =
                  globalRevealAll || isFullRevealed || toggledFullTranslation;
                const fullText = currentLesson.transcript
                  .map((s: any) => s.text)
                  .join(" ");
                const allWords = fullText.split(/\s+/);

                return (
                  <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
                    {/* Header Control Bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-[#1d6ee6] dark:text-sky-400 font-display flex items-center gap-1.5">
                          <Headphones className="w-4 h-4" /> TOÀN BỘ BÀI NGHE
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setToggledFullTranslation((prev) => !prev)
                          }
                          title={
                            toggledFullTranslation
                              ? "Ẩn bản dịch toàn bộ bài"
                              : "Bật bản dịch toàn bộ bài"
                          }
                          className="p-1 text-slate-400 hover:text-[#1d6ee6] dark:hover:text-sky-400 cursor-pointer transition-colors"
                        >
                          {toggledFullTranslation ? (
                            <Eye className="w-3.5 h-3.5 text-[#1d6ee6] dark:text-sky-400" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>

                      <Link
                        href={`/study/shadowing?lessonId=${currentLesson.id}`}
                      >
                        <button className="px-2.5 sm:px-3 py-1.5 rounded-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95">
                          <Mic className="w-3.5 h-3.5 text-purple-200" />
                          <span className="sm:hidden">Shadowing AI</span>
                          <span className="hidden sm:inline">
                            Chuyển sang Shadowing
                          </span>
                        </button>
                      </Link>
                    </div>

                    {/* Paragraph Content Card */}
                    {!isFullRevealed ? (
                      <div className="p-3.5 sm:p-4 rounded-xs bg-slate-50/90 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                        <div className="flex flex-wrap gap-1.5 leading-relaxed">
                          {allWords.map((word: string, wIdx: number) => {
                            const wordKey = `full-${wIdx}`;
                            const isWordRevealed = revealedWords[wordKey];
                            const isMatchedGreen =
                              matchedWordsPerSentence["full"]?.[wIdx];

                            return (
                              <span
                                key={wordKey}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const isMobile =
                                    typeof window !== "undefined" &&
                                    window.innerWidth < 768;
                                  if (isMatchedGreen) {
                                    if (isMobile) {
                                      handleWordClick(word);
                                    } else {
                                      speakSingleWord(word);
                                    }
                                  } else {
                                    toggleRevealWord(wordKey);
                                  }
                                }}
                                onMouseEnter={(e) =>
                                  handleWordMouseEnter(
                                    e,
                                    word,
                                    Boolean(isMatchedGreen),
                                  )
                                }
                                onMouseLeave={handleWordMouseLeave}
                                className={`px-2 py-1 rounded-xs text-xs sm:text-sm transition-all cursor-pointer inline-block select-none ${
                                  isMatchedGreen || isWordRevealed
                                    ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-extrabold border-2 border-emerald-500 ring-2 ring-emerald-400/40 shadow-xs"
                                    : "bg-slate-200/70 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 font-mono font-bold hover:bg-[#1d6ee6]/10 hover:text-[#1d6ee6]"
                                }`}
                              >
                                {isWordRevealed || isMatchedGreen
                                  ? word
                                  : getWordMaskDots(word)}
                              </span>
                            );
                          })}
                        </div>

                        {/* Vietnamese Translation Micro-Card when toggled by Eye icon */}
                        {isFullTranslationVisible && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-r-xs bg-white dark:bg-slate-900 border-l-3 border-[#1d6ee6] space-y-0.5 mt-2 shadow-2xs"
                          >
                            <span className="text-[9px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                              🇻🇳 BẢN DỊCH TIẾNG VIỆT TOÀN BỘ BÀI NGHE:
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                              {currentLesson.transcript
                                .map((s: any) => s.translation || s.vietnamese)
                                .join(" ")}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Full English Paragraph Text */}
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display flex flex-wrap gap-1.5 p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5">
                          {allWords.map((word: string, wIdx: number) => (
                            <span
                              key={wIdx}
                              onClick={() => handleWordClick(word)}
                              onMouseEnter={(e) =>
                                handleWordMouseEnter(e, word, true)
                              }
                              onMouseLeave={handleWordMouseLeave}
                              className="hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-sky-400 px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer border border-transparent hover:border-blue-500/20"
                            >
                              {word}
                            </span>
                          ))}
                        </div>

                        {/* Vietnamese Full Translation Card */}
                        {isFullTranslationVisible && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3.5 rounded-r-xs bg-slate-50 dark:bg-slate-950 border-l-3 border-[#1d6ee6] space-y-1 shadow-2xs"
                          >
                            <span className="text-[10px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                              🇻🇳 BẢN DỊCH TIẾNG VIỆT TOÀN BỘ BÀI NGHE:
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                              {currentLesson.transcript
                                .map((s: any) => s.translation || s.vietnamese)
                                .join(" ")}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SINGLE INTERACTIVE INPUT FIELD FOR FULL LESSON */}
                    {!isFullRevealed && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xs bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="sentence-input-full-lesson"
                            className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-700 dark:text-sky-300 font-display flex items-center gap-1.5 shrink-0"
                          >
                            <PenLine className="w-3.5 h-3.5 text-blue-600" />
                            <span className="sm:hidden">Ô NHẬP TỪ</span>
                            <span className="hidden sm:inline">
                              Ô nhập phân tách từ cho toàn bộ bài:
                            </span>
                          </label>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 shrink-0">
                            <span className="sm:hidden">Gõ từ + Space</span>
                            <span className="hidden sm:inline">
                              Gõ từ + Space ➔ Khớp mở từ viền xanh vĩnh viễn
                            </span>
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <input
                              id="sentence-input-full-lesson"
                              type="text"
                              autoComplete="off"
                              spellCheck={false}
                              value={sentenceInputs["full"] || ""}
                              onChange={(e) =>
                                handleSentenceInputChange("full", e.target.value)
                              }
                              onKeyDown={(e) =>
                                handleSentenceInputKeyDown(e, "full", fullText)
                              }
                              placeholder="Gõ các từ bạn nghe được vào đây (VD: welcome, english...)"
                              className={`w-full px-3 py-2 text-xs font-bold rounded-xs transition-all shadow-2xs outline-none ${
                                inputMatchStatus["full"] === "correct"
                                  ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/40"
                                  : inputMatchStatus["full"] === "incorrect"
                                    ? "border-2 border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400/40 animate-pulse"
                                    : "border border-blue-400 dark:border-blue-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/30"
                              }`}
                            />
                            {sentenceInputs["full"] && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSentenceInputs((prev) => ({
                                    ...prev,
                                    full: "",
                                  }))
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {inputMatchStatus["full"] === "correct" && (
                          <div className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Từ đúng! Đã
                            mở từ trên đoạn văn với viền xanh (+5 XP)
                          </div>
                        )}
                        {inputMatchStatus["full"] === "incorrect" && (
                          <div className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Từ không khớp
                            với bài nghe, hãy thử từ khác!
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* FULL LESSON AUDIO CONTROLLER & SPEED BUTTONS */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 flex-nowrap gap-1.5 w-full">
                      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRewind(10)}
                          className="p-1.5 sm:p-2 rounded-xs bg-blue-50/90 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#1d6ee6] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0"
                        >
                          <Rewind className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        </button>

                        <button
                          type="button"
                          onClick={togglePlay}
                          className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white font-black text-xs flex items-center gap-1 sm:gap-2 shadow-2xs cursor-pointer active:scale-98 transition-all shrink-0"
                        >
                          {isPlaying ? (
                            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                          )}
                          <span className="sm:hidden">
                            {isPlaying ? "Tạm dừng" : "Phát"}
                          </span>
                          <span className="hidden sm:inline">
                            {isPlaying
                              ? "Tạm dừng toàn bộ bài"
                              : "Phát toàn bộ bài nghe"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFastForward(10)}
                          className="p-1.5 sm:p-2 rounded-xs bg-blue-50/90 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#1d6ee6] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0"
                        >
                          <FastForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto">
                        {[0.5, 0.75, 1.0, 1.5].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xs text-[10px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                              playbackSpeed === spd
                                ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#1d6ee6] hover:bg-slate-200/80"
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

            {/* MODE 2: 3-SENTENCE CHUNK PRACTICE CARDS */}
            {practiceListenMode === "chunk3" && (
              <div className="space-y-3">
                {displayedSentences.map(
                  (sentence: any, relativeIdx: number) => {
                    const actualIdx = chunkIndex * 3 + relativeIdx;
                    const isCurrent = actualIdx === currentSentenceIndex;
                    const isBookmarked =
                      bookmarkedSentences.includes(actualIdx);
                    const isRecordingThis =
                      inlineRecordingSentenceId === actualIdx;
                    const score = inlineAiScore[actualIdx];
                    const blockKey = `sentence-${actualIdx}`;
                    const isSentenceRevealed =
                      globalRevealAll || revealedBlocks[blockKey];
                    const isTranslationVisible =
                      globalRevealAll ||
                      toggledSentenceTranslations[actualIdx] ||
                      (isCurrent && isSentenceRevealed);

                    return (
                      <motion.div
                        key={actualIdx}
                        onClick={() => {
                          setCurrentSentenceIndex(actualIdx);
                          setActiveInputSentenceId(actualIdx);
                        }}
                        className={`p-3.5 sm:p-4 rounded-xs transition-all cursor-pointer ${
                          isSentenceRevealed
                            ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-blue-500/20 shadow-2xs"
                            : "bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-black uppercase ${
                                isSentenceRevealed
                                  ? "text-[#1d6ee6] dark:text-sky-400"
                                  : "text-slate-500"
                              }`}
                            >
                              Sentence {actualIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setToggledSentenceTranslations((prev) => ({
                                  ...prev,
                                  [actualIdx]: !prev[actualIdx],
                                }));
                              }}
                              title={
                                toggledSentenceTranslations[actualIdx]
                                  ? "Ẩn bản dịch câu này"
                                  : "Bật bản dịch câu này"
                              }
                              className="p-1 text-slate-400 hover:text-[#1d6ee6] dark:hover:text-sky-400 cursor-pointer transition-colors"
                            >
                              {toggledSentenceTranslations[actualIdx] ? (
                                <Eye className="w-3.5 h-3.5 text-[#1d6ee6] dark:text-sky-400" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {score && (
                              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-emerald-500 text-white shadow-2xs">
                                AI Score: {score}%
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmarkSentence(actualIdx);
                              }}
                              className="p-1 text-slate-400 hover:text-amber-500 cursor-pointer"
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* WORD-LEVEL GRAY MASK PILLS WHEN UNREVEALED (WITH INSTANT GREEN BORDER REVEAL) */}
                        {!isSentenceRevealed ? (
                          <div className="p-3 rounded-xs bg-slate-100/70 dark:bg-slate-950 border border-slate-200/50 cursor-pointer space-y-2">
                            <div className="flex flex-wrap gap-1.5">
                              {sentence.text
                                .split(" ")
                                .map((word: string, wIdx: number) => {
                                  const wordKey = `s-${actualIdx}-${wIdx}`;
                                  const isWordRevealed = revealedWords[wordKey];
                                  const isMatchedGreen =
                                    matchedWordsPerSentence[actualIdx]?.[wIdx];

                                  return (
                                    <span
                                      key={wordKey}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const isMobile =
                                          typeof window !== "undefined" &&
                                          window.innerWidth < 768;
                                        if (isMatchedGreen) {
                                          if (isMobile) {
                                            handleWordClick(word);
                                          } else {
                                            speakSingleWord(word);
                                          }
                                        } else {
                                          toggleRevealWord(wordKey);
                                        }
                                      }}
                                      onMouseEnter={(e) =>
                                        handleWordMouseEnter(
                                          e,
                                          word,
                                          Boolean(isMatchedGreen),
                                        )
                                      }
                                      onMouseLeave={handleWordMouseLeave}
                                      className={`px-2 py-1 rounded-xs text-xs transition-all cursor-pointer inline-block select-none ${
                                        isMatchedGreen || isWordRevealed
                                          ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-extrabold border-2 border-emerald-500 ring-2 ring-emerald-400/40 shadow-xs"
                                          : "bg-slate-200/70 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 font-mono font-bold hover:bg-[#1d6ee6]/10 hover:text-[#1d6ee6]"
                                      }`}
                                    >
                                      {isWordRevealed || isMatchedGreen
                                        ? word
                                        : getWordMaskDots(word)}
                                    </span>
                                  );
                                })}
                            </div>

                            {/* Polished Vietnamese Translation Left-Bordered Micro-Card */}
                            {isTranslationVisible && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-2.5 rounded-r-xs bg-white dark:bg-slate-900 border-l-3 border-[#1d6ee6] space-y-0.5 mt-2 shadow-2xs"
                              >
                                <span className="text-[9px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                                  🇻🇳 BẢN DỊCH CÂU:
                                </span>
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                                  {sentence.translation || sentence.vietnamese}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {/* English Text */}
                            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display flex flex-wrap gap-1.5">
                              {sentence.text
                                .split(" ")
                                .map((word: string, wIdx: number) => (
                                  <span
                                    key={wIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleWordClick(word);
                                    }}
                                    onMouseEnter={(e) =>
                                      handleWordMouseEnter(e, word, true)
                                    }
                                    onMouseLeave={handleWordMouseLeave}
                                    className="hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-sky-400 px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer border border-transparent hover:border-blue-500/20"
                                  >
                                    {word}
                                  </span>
                                ))}
                            </div>

                            {/* IPA */}
                            <p className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                              IPA: {sentence.ipa || "/ˈsæm.pəl/"}
                            </p>

                            {/* Polished Vietnamese Translation Left-Bordered Micro-Card */}
                            {isTranslationVisible && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-r-xs bg-slate-50 dark:bg-slate-950 border-l-3 border-[#1d6ee6] space-y-0.5 mt-2 shadow-2xs"
                              >
                                <span className="text-[10px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                                  🇻🇳 BẢN DỊCH CÂU:
                                </span>
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                                  {sentence.translation || sentence.vietnamese}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* INTERACTIVE WORD INPUT FIELD FOR THIS SENTENCE BLOCK */}
                        {activeInputSentenceId === actualIdx && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-3 p-3 rounded-xs bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor={`sentence-input-${actualIdx}`}
                                className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-700 dark:text-sky-300 font-display flex items-center gap-1.5 shrink-0"
                              >
                                <PenLine className="w-3.5 h-3.5 text-blue-600" />
                                <span className="sm:hidden">Ô NHẬP TỪ</span>
                                <span className="hidden sm:inline">
                                  Ô nhập phân tách từ (Gõ từ nghe được):
                                </span>
                              </label>
                              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 shrink-0">
                                <span className="sm:hidden">Gõ từ + Space</span>
                                <span className="hidden sm:inline">
                                  Gõ từ + Space ➔ Khớp mở chữ viền xanh
                                </span>
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <input
                                  id={`sentence-input-${actualIdx}`}
                                  type="text"
                                  autoComplete="off"
                                  spellCheck={false}
                                  value={sentenceInputs[actualIdx] || ""}
                                  onChange={(e) =>
                                    handleSentenceInputChange(
                                      actualIdx,
                                      e.target.value,
                                    )
                                  }
                                  onKeyDown={(e) =>
                                    handleSentenceInputKeyDown(
                                      e,
                                      actualIdx,
                                      sentence.text,
                                    )
                                  }
                                  placeholder="Gõ từ bạn nghe được vào đây (VD: welcome, english...)"
                                  className={`w-full px-3 py-2 text-xs font-bold rounded-xs transition-all shadow-2xs outline-none ${
                                    inputMatchStatus[actualIdx] === "correct"
                                      ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/40"
                                      : inputMatchStatus[actualIdx] ===
                                          "incorrect"
                                        ? "border-2 border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400/40 animate-pulse"
                                        : "border border-blue-400 dark:border-blue-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/30"
                                  }`}
                                />
                                {sentenceInputs[actualIdx] && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSentenceInputs((prev) => ({
                                        ...prev,
                                        [actualIdx]: "",
                                      }))
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {inputMatchStatus[actualIdx] === "correct" && (
                              <div className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Từ đúng!
                                Đã mở chữ với viền xanh lá (+5 XP)
                              </div>
                            )}
                            {inputMatchStatus[actualIdx] === "incorrect" && (
                              <div className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Từ không
                                khớp với câu này, hãy thử từ khác!
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* ONLY SHOW AUDIO & SPEED CONTROLLERS WHEN SENTENCE IS SELECTED/ACTIVE OR REVEALED */}
                        {(isSentenceRevealed || isCurrent) && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 flex-nowrap gap-1.5 mt-2 w-full"
                          >
                            {/* XP English High-End Audio Controller (Single Sentence: -5s, Play/Pause, +5s) */}
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 sm:gap-1.5 shrink-0"
                            >
                              <button
                                type="button"
                                onClick={() => handleRewind(5, sentence.text)}
                                className="p-1.5 sm:p-2 rounded-xs bg-blue-50/90 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#1d6ee6] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0"
                              >
                                <Rewind className="w-3.5 h-3.5 fill-current" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (playingSentenceText === sentence.text) {
                                    if (
                                      typeof window !== "undefined" &&
                                      "speechSynthesis" in window
                                    ) {
                                      window.speechSynthesis.cancel();
                                    }
                                    if (audioRef.current)
                                      audioRef.current.pause();
                                    setPlayingSentenceText(null);
                                  } else {
                                    setPlayingSentenceText(sentence.text);
                                    playSingleSentence(sentence.text);
                                  }
                                }}
                                className="px-2.5 sm:px-3.5 py-1.5 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-black flex items-center gap-1 sm:gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-98 shrink-0"
                              >
                                {playingSentenceText === sentence.text ? (
                                  <>
                                    <Pause className="w-3.5 h-3.5 fill-current" />
                                    <span className="sm:hidden">Tạm dừng</span>
                                    <span className="hidden sm:inline">
                                      Tạm dừng
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span className="sm:hidden">Phát</span>
                                    <span className="hidden sm:inline">
                                      Phát âm câu
                                    </span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleFastForward(5, sentence.text)
                                }
                                className="p-1.5 sm:p-2 rounded-xs bg-blue-50/90 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#1d6ee6] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs cursor-pointer transition-all active:scale-95 flex items-center justify-center shrink-0"
                              >
                                <FastForward className="w-3.5 h-3.5 fill-current" />
                              </button>
                            </div>

                            {/* ULTRA MINIMALIST BALANCED SPEED BUTTONS: 0.5x, 0.75x, 1.0x, 1.5x */}
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto"
                            >
                              {[0.5, 0.75, 1.0, 1.5].map((spd) => (
                                <button
                                  key={spd}
                                  type="button"
                                  onClick={() => setPlaybackSpeed(spd)}
                                  className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-xs text-[10px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                                    playbackSpeed === spd
                                      ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#1d6ee6] hover:bg-slate-200/80"
                                  }`}
                                >
                                  {spd}x
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  },
                )}
              </div>
            )}

            {/* CHUNK NAVIGATION FOOTER BUTTONS IN CHUNK3 MODE */}
            {practiceListenMode === "chunk3" &&
              (() => {
                const totalChunksCount = Math.ceil(
                  currentLesson.transcript.length / 3,
                );

                // Check if all words in current 3 sentences are revealed/matched
                const isCurrentChunkCompleted = displayedSentences.every(
                  (sentence: any, relativeIdx: number) => {
                    const actualIdx = chunkIndex * 3 + relativeIdx;
                    const sentenceWords = sentence.text
                      .split(" ")
                      .filter(Boolean);
                    return sentenceWords.every((_: string, wIdx: number) => {
                      const wordKey = `s-${actualIdx}-${wIdx}`;
                      return (
                        revealedWords[wordKey] ||
                        matchedWordsPerSentence[actualIdx]?.[wIdx]
                      );
                    });
                  },
                );

                return (
                  <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                    <button
                      disabled={chunkIndex === 0}
                      onClick={() =>
                        setChunkIndex((prev) => Math.max(0, prev - 1))
                      }
                      className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all shadow-2xs ${
                        chunkIndex === 0
                          ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 cursor-pointer"
                      }`}
                    >
                      ← Cụm 3 câu trước
                    </button>

                    {chunkIndex < totalChunksCount - 1 ? (
                      <button
                        onClick={() => {
                          if (isCurrentChunkCompleted) {
                            setChunkIndex((prev) => prev + 1);
                            addToast({
                              type: "success",
                              title: "Đã chuyển sang 3 câu tiếp theo! 🎧",
                            });
                          } else {
                            addToast({
                              type: "warning",
                              title: "Mẹo chuyển tiếp 💡",
                              message:
                                "Bạn hãy gõ từ hoặc bấm vào các từ ẩn '...' để xem hết 3 câu này trước khi chuyển tiếp nhé!",
                            });
                          }
                        }}
                        className={`px-3.5 sm:px-4 py-2 rounded-xs font-black text-xs shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCurrentChunkCompleted
                            ? "bg-[#1d6ee6] hover:bg-[#155bc5] text-white active:scale-98"
                            : "bg-blue-100 dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 hover:bg-blue-200 dark:hover:bg-slate-700 border border-blue-200/80 dark:border-white/10"
                        }`}
                      >
                        {isCurrentChunkCompleted ? (
                          <>
                            Chuyển sang 3 câu tiếp theo{" "}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            3 câu tiếp theo{" "}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={`/study/shadowing?lessonId=${currentLesson.id}`}
                      >
                        <button className="px-4 py-2 rounded-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer">
                          🎉 Hoàn thành bài nghe & Chuyển sang Shadowing{" "}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    )}
                  </div>
                );
              })()}
          </div>

          {/* CỘT PHẢI: INTERACTIVE MULTI-TAB PANEL (QUIZ, VOCAB & GRAMMAR, NOTES, SHADOWING CTA) */}
          <div className="lg:col-span-4 space-y-3.5 min-w-0">
            {/* TAB HEADER SWITCHER (SINGLE-LINE SEGMENTED CONTROLLER WITH REDUCED BORDER-RADIUS) */}
            <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-1 shadow-2xs">
              <button
                onClick={() => setRightSidebarTab("quiz")}
                className={`flex-1 py-1.5 px-1 sm:px-1.5 rounded-xs text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  rightSidebarTab === "quiz"
                    ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="sm:hidden">Trắc nghiệm</span>
                <span className="hidden sm:inline">Trắc Nghiệm</span>
              </button>

              <button
                onClick={() => setRightSidebarTab("vocab")}
                className={`flex-1 py-1.5 px-1 sm:px-1.5 rounded-xs text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  rightSidebarTab === "vocab"
                    ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BookMarked className="w-3.5 h-3.5 text-[#1d6ee6] dark:text-sky-400 shrink-0" />
                Gợi ý bài học
              </button>

              <button
                onClick={() => setRightSidebarTab("notes")}
                className={`flex-1 py-1.5 px-1 sm:px-1.5 rounded-xs text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  rightSidebarTab === "notes"
                    ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <PenLine className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="sm:hidden">Ghi chú</span>
                <span className="hidden sm:inline">Ghi Chú Bài Học</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
            {/* TAB 1: INTERACTIVE QUIZ PANEL */}
            {rightSidebarTab === "quiz" && (
              <motion.div
                key="tab-quiz"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5 font-sans"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xs shrink-0">
                      <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                        <span className="sm:hidden">Kiểm tra độ hiểu bài</span>
                        <span className="hidden sm:inline">
                          Kiểm Tra Độ Hiểu Bài (Quiz Interactive)
                        </span>
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 block">
                        <span className="sm:hidden">
                          Trả lời đúng nhận +10 XP/câu
                        </span>
                        <span className="hidden sm:inline">
                          Trả lời chính xác để nhận +10 XP mỗi câu!
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {Object.keys(quizAnswers).length > 0 && (
                      <button
                        onClick={resetQuiz}
                        className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#1d6ee6] text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Làm lại
                      </button>
                    )}
                    <Badge
                      variant="neutral"
                      className="text-[10px] font-bold border-purple-500/30 text-purple-600 rounded-xs shrink-0"
                    >
                      <span className="sm:hidden">
                        {currentLesson.quizzes?.length || 0} câu
                      </span>
                      <span className="hidden sm:inline">
                        {currentLesson.quizzes?.length || 0} CÂU HỎI
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* QUIZ SCORE SUMMARY CARD WHEN ALL COMPLETED */}
                {currentLesson.quizzes &&
                  currentLesson.quizzes.length > 0 &&
                  Object.keys(quizAnswers).length ===
                    currentLesson.quizzes.length &&
                  (() => {
                    const correctCount = currentLesson.quizzes.reduce(
                      (acc: number, quiz: any, qIdx: number) => {
                        const selectedOpt = quizAnswers[qIdx];
                        const correctIdx = quiz.correctIndex ?? 0;
                        return selectedOpt === correctIdx ? acc + 1 : acc;
                      },
                      0,
                    );
                    const totalCount = currentLesson.quizzes.length;
                    const totalXp = correctCount * 10;

                    return (
                      <div className="p-3 rounded-xs bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <h4 className="text-xs font-black text-slate-900 dark:text-white">
                              🎉 Hoàn Thành Bài Kiểm Tra Quiz!
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-emerald-500 text-white shadow-2xs">
                            +{totalXp} XP TỔNG CỘNG
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Bạn đã trả lời đúng{" "}
                          <strong className="text-emerald-600 dark:text-emerald-400">
                            {correctCount}/{totalCount}
                          </strong>{" "}
                          câu hỏi. Hãy đọc kỹ phần giải thích chi tiết bên dưới
                          để củng cố kiến thức nhé!
                        </p>
                      </div>
                    );
                  })()}

                {currentLesson.quizzes && currentLesson.quizzes.length > 0 ? (
                  <div className="space-y-3">
                    {currentLesson.quizzes.map((quiz: any, qIdx: number) => {
                      const selectedOpt = quizAnswers[qIdx];
                      const isAnswered = selectedOpt !== undefined;
                      const correctIndex = quiz.correctIndex ?? 0;

                      return (
                        <div
                          key={quiz.id || qIdx}
                          className="p-3 rounded-xs bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 space-y-2.5 shadow-2xs"
                        >
                          <div className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded-xs text-[10px] font-black bg-[#1d6ee6] text-white shrink-0 shadow-2xs">
                              Q{qIdx + 1}
                            </span>
                            <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-relaxed font-display">
                              {quiz.question}
                            </p>
                          </div>

                          {/* Options list with A, B, C, D letters & reduced border radius rounded-xs */}
                          <div className="space-y-1.5">
                            {quiz.options.map(
                              (optionText: string, optIdx: number) => {
                                const letter = String.fromCharCode(65 + optIdx);
                                const isThisSelected = selectedOpt === optIdx;
                                const isThisCorrect = optIdx === correctIndex;

                                let btnClasses =
                                  "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] hover:bg-blue-50/50 dark:hover:bg-blue-950/30";
                                let letterBadge =
                                  "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

                                if (isAnswered) {
                                  if (isThisCorrect) {
                                    btnClasses =
                                      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-500 font-bold shadow-xs";
                                    letterBadge =
                                      "bg-emerald-500 text-white font-black";
                                  } else if (isThisSelected && !isThisCorrect) {
                                    btnClasses =
                                      "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-400 font-bold";
                                    letterBadge =
                                      "bg-rose-500 text-white font-black";
                                  } else {
                                    btnClasses =
                                      "bg-slate-50/80 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-slate-200/40";
                                    letterBadge =
                                      "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={isAnswered}
                                    onClick={() =>
                                      handleSelectQuizOption(
                                        qIdx,
                                        optIdx,
                                        correctIndex,
                                      )
                                    }
                                    className={`w-full p-2.5 rounded-xs border text-left text-xs font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClasses}`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span
                                        className={`w-5 h-5 rounded-xs font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-2xs ${letterBadge}`}
                                      >
                                        {letter}
                                      </span>
                                      <span className="leading-snug">
                                        {optionText}
                                      </span>
                                    </div>
                                    {isAnswered && isThisCorrect && (
                                      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                        <Check className="w-3.5 h-3.5" /> Đúng
                                        +10XP
                                      </span>
                                    )}
                                    {isAnswered &&
                                      isThisSelected &&
                                      !isThisCorrect && (
                                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                      )}
                                  </button>
                                );
                              },
                            )}
                          </div>

                          {/* Explanation Box (Strongly Reduced Border Radius) */}
                          {isAnswered && quiz.explanation && (
                            <div className="p-3 rounded-r-xs bg-purple-50/80 dark:bg-purple-950/40 border-l-3 border-purple-500 space-y-1 animate-in fade-in duration-200 shadow-2xs">
                              <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> GIẢI THÍCH
                                ĐÁP ÁN CHI TIẾT:
                              </span>
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                                {quiz.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-purple-500 mx-auto" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bài nghe này chưa có câu hỏi Quiz!
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Hãy bấm nút "➕ Tạo bài nghe AI" ở góc trên để nạp bài
                      nghe có trắc nghiệm.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: GỢI Ý BÀI HỌC (Theo chủ đề / Khám phá / Dành cho bạn) */}
            {rightSidebarTab === "vocab" &&
              (() => {
                // Sub-tab state is managed via a simple local approach
                const currentCategory =
                  currentLesson?.category ||
                  currentLesson?.tags?.[0] ||
                  "General";

                // Filter lessons by category (same topic as current lesson)
                const sameCategoryLessons = lessonsList
                  .filter(
                    (l) =>
                      l.id !== currentLesson?.id &&
                      (l.category === currentCategory ||
                        l.tags?.some((t: string) =>
                          currentLesson?.tags?.includes(t),
                        )),
                  )
                  .slice(0, 5);

                // Explore: lessons from different categories (stable order)
                const exploreLessons = lessonsList
                  .filter(
                    (l) =>
                      l.id !== currentLesson?.id &&
                      l.category !== currentCategory,
                  )
                  .slice(0, 5);

                // For you: unfinished lessons prioritized
                const forYouLessons = lessonsList
                  .filter(
                    (l) =>
                      l.id !== currentLesson?.id &&
                      !(completedLessonIds || []).includes(l.id),
                  )
                  .slice(0, 5);

                return (
                  <motion.div
                    key="tab-vocab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs font-sans overflow-hidden">
                    {/* Sub-tab switcher */}
                    <div className="flex items-center border-b border-slate-100 dark:border-white/5">
                      {[
                        { key: "topic", label: "Theo chủ đề" },
                        { key: "explore", label: "Khám phá" },
                        { key: "foryou", label: "Dành cho bạn" },
                      ].map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => {
                            const el =
                              document.querySelector(`[data-suggest-panel]`);
                            el?.setAttribute("data-active-sub", sub.key);
                            // Force re-render via DOM
                            document
                              .querySelectorAll(`[data-sub-content]`)
                              .forEach((c) => {
                                (c as HTMLElement).style.display =
                                  c.getAttribute("data-sub-content") === sub.key
                                    ? "block"
                                    : "none";
                              });
                            document
                              .querySelectorAll(`[data-sub-btn]`)
                              .forEach((b) => {
                                const isActive =
                                  b.getAttribute("data-sub-btn") === sub.key;
                                (b as HTMLElement).className = isActive
                                  ? "flex-1 py-2 px-1 text-[11px] sm:text-xs font-extrabold cursor-pointer flex items-center justify-center gap-1 border-b-2 border-[#1d6ee6] text-[#1d6ee6] dark:text-sky-400 dark:border-sky-400 transition-all"
                                  : "flex-1 py-2 px-1 text-[11px] sm:text-xs font-extrabold cursor-pointer flex items-center justify-center gap-1 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all";
                              });
                          }}
                          data-sub-btn={sub.key}
                          className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-extrabold cursor-pointer flex items-center justify-center gap-1 border-b-2 transition-all ${
                            sub.key === "topic"
                              ? "border-[#1d6ee6] text-[#1d6ee6] dark:text-sky-400 dark:border-sky-400"
                              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>

                    <div
                      className="p-3.5 space-y-2.5"
                      data-suggest-panel
                      data-active-sub="topic"
                    >
                      {/* THEO CHỦ ĐỀ */}
                      <div
                        data-sub-content="topic"
                        style={{ display: "block" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            Bài nghe cùng chủ đề: {currentCategory}
                          </span>
                          <span className="text-[9px] font-extrabold text-[#1d6ee6] dark:text-sky-400 bg-blue-500/10 px-1.5 py-0.5 rounded-xs">
                            {sameCategoryLessons.length} bài
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sameCategoryLessons.length > 0 ? (
                            sameCategoryLessons.map((lesson, idx) => {
                              const avatar = getInitialAvatar(lesson.title);
                              const isCompleted = (
                                completedLessonIds || []
                              ).includes(lesson.id);
                              return (
                                <div
                                  key={idx}
                                  onClick={() => { handleSelectLesson(lesson.id); }}
                                  className="p-2.5 rounded-xs bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 hover:border-[#1d6ee6] dark:hover:border-sky-500/50 transition-all cursor-pointer group flex items-start gap-2.5"
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xs bg-gradient-to-br ${avatar.gradient} flex items-center justify-center shrink-0 shadow-2xs`}
                                  >
                                    <span className="text-white text-xs font-black">
                                      {avatar.firstChar}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 space-y-0.5">
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1d6ee6] dark:group-hover:text-sky-400 transition-colors truncate">
                                      {lesson.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-[9px] font-extrabold px-1 py-0.5 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/15">
                                        {lesson.level}
                                      </span>
                                      {lesson.duration && (
                                        <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                                          <Clock className="w-2.5 h-2.5" />
                                          {lesson.duration}
                                        </span>
                                      )}
                                      {isCompleted && (
                                        <span className="text-[9px] font-extrabold text-emerald-500 flex items-center gap-0.5">
                                          <CheckCircle className="w-2.5 h-2.5" />
                                          Đã học
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-[#1d6ee6] shrink-0 mt-1 transition-colors" />
                                </div>
                              );
                            })
                          ) : (
                            <div className="p-4 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
                              Không tìm thấy bài nghe cùng chủ đề. Thử khám phá
                              chủ đề mới!
                            </div>
                          )}
                        </div>
                      </div>

                      {/* KHÁM PHÁ */}
                      <div
                        data-sub-content="explore"
                        style={{ display: "none" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            Khám phá chủ đề mới
                          </span>
                          <button
                            onClick={handleShuffle10Lessons}
                            className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-xs cursor-pointer hover:bg-purple-500/20 transition-colors flex items-center gap-0.5"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Trộn mới
                          </button>
                        </div>
                        <div className="space-y-2">
                          {exploreLessons.map((lesson, idx) => {
                            const avatar = getInitialAvatar(lesson.title);
                            const isCompleted = (
                              completedLessonIds || []
                            ).includes(lesson.id);
                            return (
                              <div
                                key={idx}
                                onClick={() => { handleSelectLesson(lesson.id); }}
                                className="p-2.5 rounded-xs bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all cursor-pointer group flex items-start gap-2.5"
                              >
                                <div
                                  className={`w-9 h-9 rounded-xs bg-gradient-to-br ${avatar.gradient} flex items-center justify-center shrink-0 shadow-2xs`}
                                >
                                  <span className="text-white text-xs font-black">
                                    {avatar.firstChar}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 space-y-0.5">
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                    {lesson.title}
                                  </h4>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[9px] font-extrabold px-1 py-0.5 rounded-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15">
                                      {lesson.category || "General"}
                                    </span>
                                    <span className="text-[9px] font-extrabold px-1 py-0.5 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15">
                                      {lesson.level}
                                    </span>
                                    {isCompleted && (
                                      <span className="text-[9px] font-extrabold text-emerald-500 flex items-center gap-0.5">
                                        <CheckCircle className="w-2.5 h-2.5" />
                                        Đã học
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-purple-500 shrink-0 mt-1 transition-colors" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* DÀNH CHO BẠN */}
                      <div
                        data-sub-content="foryou"
                        style={{ display: "none" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            Gợi ý riêng cho bạn
                          </span>
                          <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" /> AI picks
                          </span>
                        </div>
                        <div className="space-y-2">
                          {forYouLessons.length > 0 ? (
                            forYouLessons.map((lesson, idx) => {
                              const avatar = getInitialAvatar(lesson.title);
                              return (
                                <div
                                  key={idx}
                                  onClick={() => { handleSelectLesson(lesson.id); }}
                                  className="p-2.5 rounded-xs bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all cursor-pointer group flex items-start gap-2.5"
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xs bg-gradient-to-br ${avatar.gradient} flex items-center justify-center shrink-0 shadow-2xs`}
                                  >
                                    <span className="text-white text-xs font-black">
                                      {avatar.firstChar}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 space-y-0.5">
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                                      {lesson.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-[9px] font-extrabold px-1 py-0.5 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                                        Chưa hoàn thành
                                      </span>
                                      <span className="text-[9px] font-extrabold px-1 py-0.5 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/15">
                                        {lesson.level}
                                      </span>
                                      {lesson.duration && (
                                        <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                                          <Clock className="w-2.5 h-2.5" />
                                          {lesson.duration}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 shrink-0 mt-1 transition-colors" />
                                </div>
                              );
                            })
                          ) : (
                            <div className="p-4 rounded-xs bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/30 text-center space-y-1">
                              <Trophy className="w-5 h-5 text-emerald-500 mx-auto" />
                              <p className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                                Tuyệt vời!
                              </p>
                              <p className="text-[11px] font-medium text-emerald-600/80 dark:text-emerald-400/70">
                                Bạn đã hoàn thành tất cả bài nghe!
                              </p>
                            </div>
                          )}
                        </div>

                        {/* AI tip */}
                        <div className="mt-3 p-2.5 rounded-xs bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/20 border border-amber-200/60 dark:border-amber-800/30">
                          <div className="flex items-start gap-2">
                            <Bot className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] font-semibold text-amber-700/90 dark:text-amber-400/80 leading-relaxed">
                              💡 Luyện nghe 15 phút/ngày + Shadowing sau mỗi bài
                              sẽ tăng khả năng ghi nhớ lên 3 lần!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

            {/* TAB 3: STUDY NOTES AUTO-SAVER */}
            {rightSidebarTab === "notes" && (
              <motion.div
                key="tab-notes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#1d6ee6]" />
                    <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                      Sổ Tay Ghi Chú Bài Nghe Cá Nhân
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Tự động lưu
                  </span>
                </div>

                <textarea
                  value={cloudNoteText}
                  onChange={(e) => {
                    setCloudNoteText(e.target.value);
                    saveUserNote(e.target.value);
                  }}
                  placeholder="Nhập ghi chú từ vựng, cấu trúc hay hoặc thắc mắc của bạn tại đây... (Tự động đồng bộ server)"
                  className="w-full h-44 p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d6ee6] resize-none"
                />
              </motion.div>
            )}
            </AnimatePresence>

            {/* SHADOWING CTA BUTTON */}
            <Link
              href={`/study/shadowing?lessonId=${currentLesson.id}`}
              className="block"
            >
              <button className="w-full py-2 px-3 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white font-black text-xs shadow-2xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <Mic className="w-3.5 h-3.5 stroke-[2]" />
                Chuyển sang Shadowing
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* DEEP AI DICTIONARY & TRANSLATION CARD MODAL */}
      {/* DEEP WORD DEFINITION DICTIONARY MODAL */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="fixed bottom-[72px] sm:bottom-6 right-4 sm:right-6 z-50 w-[86vw] max-w-[270px] sm:w-[400px] sm:max-w-[400px] p-2.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border-2 border-[#1d6ee6] shadow-2xl space-y-2 sm:space-y-3 font-sans max-h-[50vh] sm:max-h-[80vh] overflow-y-auto"
          >
            {/* Header: Word + Close */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-[#1d6ee6]/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1d6ee6]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-display capitalize truncate">
                    {selectedWord.word}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
                    {selectedWord.pos || "Từ vựng"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-0.5 rounded-xs text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            {/* IPA + Pronounce */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-1.5 sm:p-2 rounded-xs border border-slate-200/80 dark:border-white/10">
              <span className="font-mono text-[#1d6ee6] dark:text-sky-400 font-extrabold text-[11px] sm:text-xs">
                {selectedWord.ipa}
              </span>
              <button
                onClick={() =>
                  speakWord(selectedWord.word, currentLesson?.accent || "en-US")
                }
                className="px-2 py-1 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95 transition-transform"
              >
                <Volume2 className="w-3 h-3 fill-white" /> Phát âm
              </button>
            </div>

            {/* Clean Structured Definition Box */}
            <div className="p-2.5 sm:p-3 rounded-xs bg-[#ebf3fe] dark:bg-blue-950/50 border border-[#d5e5fe] dark:border-blue-900/40 space-y-2">
              {/* 1. Vietnamese Meaning */}
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {selectedWord.meaning || "Chưa có bản dịch"}
                </p>
              </div>

              {/* 2. English Definition */}
              {selectedWord.detailMeaning && (
                <div className="pt-1.5 border-t border-[#d5e5fe]/60 dark:border-blue-900/40">
                  <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                    "{selectedWord.detailMeaning}"
                  </p>
                </div>
              )}

              {/* 3. Example Sentence */}
              {selectedWord.example && (
                <div className="pt-1.5 border-t border-[#d5e5fe]/60 dark:border-blue-900/40 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-normal">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Ex:
                  </span>{" "}
                  {selectedWord.example}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP HOVER WORD TOOLTIP POPUP CARD */}
      <AnimatePresence>
        {hoveredWordData && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            style={{
              position: "fixed",
              top: `${getTooltipCoords(hoveredWordData.rect).top}px`,
              left: `${getTooltipCoords(hoveredWordData.rect).left}px`,
              transform: "translateX(-50%)",
            }}
            className="z-50 pointer-events-none p-2.5 rounded-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white shadow-xl dark:shadow-2xl border border-slate-200/90 dark:border-white/10 font-sans space-y-1.5 min-w-[180px] max-w-[260px]"
          >
            {/* Header: Word + IPA */}
            <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-1.5">
              <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white font-display capitalize tracking-tight">
                {hoveredWordData.word}
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#1d6ee6] dark:text-sky-400">
                {hoveredWordData.ipa}
              </span>
            </div>

            {/* Vietnamese Meaning */}
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
              {hoveredWordData.meaning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
