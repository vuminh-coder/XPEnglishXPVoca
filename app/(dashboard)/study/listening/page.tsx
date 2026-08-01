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
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  ArrowRight,
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
  GraduationCap
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
  const clampedLeft = Math.max(tooltipHalfWidth + 20, Math.min(screenWidth - tooltipHalfWidth - 20, rawLeft));
  const top = Math.max(10, rect.top - 56);
  return { top, left: clampedLeft };
};

export default function ListeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdFromUrl = searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { currentLessonId, setCurrentLessonId, markLessonCompleted, completedLessonIds } = useListeningStore();

  // Lessons list state (combines mock data + user generated lessons)
  const [lessonsList, setLessonsList] = useState<any[]>(MOCK_LESSONS_DATA);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    lessonIdFromUrl || null
  );

  const currentLesson = lessonsList.find((l) => l.id === selectedLessonId) || null;

  // Randomized 10-Lesson Picker State (Prioritizes unlearned lessons)
  const [displayed10Lessons, setDisplayed10Lessons] = useState<any[]>([]);

  useEffect(() => {
    setDisplayed10Lessons(pick10RandomLessons(lessonsList, completedLessonIds || []));
  }, [lessonsList, completedLessonIds]);

  const handleShuffle10Lessons = () => {
    setDisplayed10Lessons(pick10RandomLessons(lessonsList, completedLessonIds || []));
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
  const [practiceListenMode, setPracticeListenMode] = useState<"full" | "chunk3">("chunk3");
  const [chunkIndex, setChunkIndex] = useState(0);

  // INTERACTIVE TEXT BLUR & REVEAL STATE
  const [revealedBlocks, setRevealedBlocks] = useState<{ [id: string]: boolean }>({});
  const [revealedWords, setRevealedWords] = useState<{ [key: string]: boolean }>({});
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
    isRevealed: boolean
  ) => {
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

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  
  const [rightSidebarTab, setRightSidebarTab] = useState<"quiz" | "vocab" | "notes">("quiz");
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});

  const handleSelectQuizOption = (qIdx: number, optionIdx: number, correctIdx: number) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...quizAnswers, [qIdx]: optionIdx };
    setQuizAnswers(nextAnswers);

    const isCorrect = optionIdx === correctIdx;
    if (isCorrect) {
      awardXp(10);
      addToast({ type: "success", title: "Chính xác! +10 XP 🎯" });
    } else {
      addToast({ type: "error", title: "Chưa chính xác, hãy đọc kỹ giải thích!" });
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
  const [inlineRecordingSentenceId, setInlineRecordingSentenceId] = useState<number | null>(null);
  const [inlineRecordingTime, setInlineRecordingTime] = useState(0);
  const [inlineAiScore, setInlineAiScore] = useState<{ [key: number]: number }>({});
  const [isInlineAnalyzing, setIsInlineAnalyzing] = useState(false);

  // Cloud notes state
  const [cloudNoteText, setCloudNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState<{ [sentenceId: number]: string }>({});

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
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

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

  const handleBackToListing = () => {
    if (elapsedTimeRef.current > 5) {
      const mins = Math.max(1, Math.ceil(elapsedTimeRef.current / 60));
      useUserStore.getState().addPracticeTime(mins, "dictation");
      elapsedTimeRef.current = 0;
    }
    setSelectedLessonId(null);
    setElapsedTime(0);
    setIsPlaying(false);
    setChunkIndex(0);
    setRevealedBlocks({});
    setGlobalRevealAll(false);
  };

  const scrollToWorkspace = () => {
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    if (selectedLessonId) {
      setCurrentLessonId(selectedLessonId);
    }
  }, [selectedLessonId, setCurrentLessonId]);

  const currentSentence = currentLesson?.transcript?.[currentSentenceIndex] || currentLesson?.transcript?.[0] || null;
  const vocabList = currentLesson?.vocabulary || currentLesson?.vocabularyList || [];

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
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) {
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLesson?.accent || "en-US";
    utterance.rate = playbackSpeed;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const playSingleSentence = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    if (audioRef.current) audioRef.current.pause();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLesson?.accent || "en-US";
    utterance.rate = playbackSpeed;
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const fullText = currentLesson?.transcript
        ? currentLesson.transcript.map((s: any) => s.text).join(" ")
        : "";

      if (currentLesson?.audioUrl && !currentLesson.audioUrl.includes("soundhelix")) {
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
      addToast({ type: "error", title: "Vui lòng nhập Tên bài và Nội dung văn bản!" });
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
        { word: newTitle.split(" ")[0] || "English", ipa: "/ˈɪŋ.ɡlɪʃ/", meaning: "Tiếng Anh", example: newTitle },
      ],
      quizzes: [],
    };

    setLessonsList([newArticle, ...lessonsList]);
    setSelectedLessonId(newArticle.id);
    setCurrentLessonId(newArticle.id);
    setCurrentSentenceIndex(0);
    setChunkIndex(0);

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

  // Speech Synthesis for Native Word Audio
  const speakWord = (word: string, accent = "en-US") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
      if (!cleanWord) return;
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = accent;
      utterance.rate = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    // Play native audio pronunciation automatically
    speakWord(cleanWord, currentLesson?.accent || "en-US");

    // Perform Deep AI Dictionary Lookup
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
            className="p-3.5 sm:p-5 rounded-md bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Headphones className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black bg-[#1d6ee6] text-white">
                    AI LISTENING WORKSPACE
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500">10 Bài đọc hàng ngang & Tạo bài AI</span>
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
                className="p-3.5 sm:p-5 rounded-md bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/40 shadow-2xs space-y-3 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <h2 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-purple-600" /> TẠO BÀI NGHE TIẾNG ANH AI TÙY CHỈNH
                  </h2>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20">
                    +30 XP / Bài tạo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="new-article-title-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
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
                    <label htmlFor="new-article-thumbnail-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>2. Ảnh đại diện (URL Image):</span>
                      <span className="text-[9px] font-medium text-slate-400">Nếu trống = Tự sinh Avatar Chữ cái</span>
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
                        <div className={`w-8 h-8 rounded-xs shrink-0 bg-gradient-to-br ${getInitialAvatar(newTitle).gradient} text-white font-black text-xs flex items-center justify-center shadow-2xs`}>
                          {getInitialAvatar(newTitle).firstChar}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="new-article-text-textarea" className="text-xs font-bold text-slate-700 dark:text-slate-300">
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
                <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" /> DANH SÁCH 10 BÀI ĐỌC (BẤM ĐỂ CHỌN BÀI HỌC)
              </h2>
              <button
                onClick={handleShuffle10Lessons}
                className="text-[10px] font-bold text-slate-500 hover:text-[#1d6ee6] dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Đổi 10 bài ngẫu nhiên
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {(displayed10Lessons.length > 0 ? displayed10Lessons : lessonsList.slice(0, 10)).map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                const isCompleted = completedLessonIds.includes(lesson.id);
                const { firstChar, gradient } = getInitialAvatar(lesson.title);

                return (
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      markLessonCompleted(lesson.id);
                      setCurrentSentenceIndex(0);
                      setChunkIndex(0);
                      setRevealedBlocks({});
                      scrollToWorkspace();
                    }}
                    className={`p-2.5 rounded-xs border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-blue-500/20 shadow-xs"
                        : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 shadow-2xs"
                    }`}
                  >
                    <div className="relative w-full h-24 rounded-xs overflow-hidden shrink-0">
                      {lesson.imageUrl ? (
                        <img
                          src={lesson.imageUrl}
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient} text-white font-black text-3xl flex items-center justify-center shadow-inner`}>
                          {firstChar}
                        </div>
                      )}

                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-slate-900/80 text-white backdrop-blur-xs">
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
                      <h3 className={`text-xs font-bold font-display truncate ${
                        isSelected ? "text-blue-600 dark:text-sky-400" : "text-slate-900 dark:text-white"
                      }`}>
                        {lesson.title}
                      </h3>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 dark:border-white/5">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {lesson.duration || "5 min"}</span>
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
          className="p-6 rounded-md bg-slate-50/80 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-white/10 text-center space-y-2.5 my-2"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
            <Headphones className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Vui lòng chọn 1 bài đọc trên danh sách 5 bài để bắt đầu luyện nghe
          </h3>
          <p className="text-xs font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            Bấm chọn bất kỳ thẻ bài đọc nào ở dải 5 bài nằm ngang ở trên hoặc bấm nút <strong className="text-blue-600 dark:text-sky-400 font-bold">"✨ Tạo bài nghe mới"</strong> để hệ thống hiển thị khu vực luyện nghe!
          </p>
        </motion.div>
      ) : (
        <div ref={workspaceRef} id="active-listening-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-2 min-w-0">
        
        {/* CỘT TRÁI: PRACTICE MODE SWITCHER & SENTENCE CARDS (7/12 Width) */}
        <div className="lg:col-span-7 space-y-3.5 min-w-0">
          
          {/* Active Lesson Header & Timer & Global Masking Toggle */}
          <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5 gap-2 min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                <button
                  onClick={handleBackToListing}
                  className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs shrink-0 whitespace-nowrap"
                >
                  ← Quay lại
                </button>
                <span className="px-2 py-0.5 rounded-xs text-[9px] font-black bg-[#1d6ee6] text-white shrink-0 whitespace-nowrap">
                  ĐANG LUYỆN BÀI
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate min-w-0 flex-1" title={currentLesson.title}>
                  {currentLesson.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <button
                  onClick={() => setGlobalRevealAll(!globalRevealAll)}
                  className={`px-2.5 py-1 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border whitespace-nowrap ${
                    globalRevealAll
                      ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                      : "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 border-blue-200 dark:border-blue-900/30"
                  }`}
                >
                  {globalRevealAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {globalRevealAll ? "Ẩn chữ" : "Hiện toàn bộ chữ & Dịch"}
                </button>

                <span className="px-2.5 py-1 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-black flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" /> {formatElapsedTime(elapsedTime)}
                </span>
              </div>
            </div>

            {/* 2 PRACTICE LISTEN MODES SWITCHER */}
            <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-xs flex items-center gap-1 border border-slate-200/50 dark:border-white/5">
              <button
                onClick={() => setPracticeListenMode("full")}
                className={`flex-1 py-1.5 px-2 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  practiceListenMode === "full"
                    ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Headphones className="w-3.5 h-3.5" /> 1. Nghe Toàn Bộ Bài (1 Khối)
              </button>

              <button
                onClick={() => {
                  setPracticeListenMode("chunk3");
                  setChunkIndex(0);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  practiceListenMode === "chunk3"
                    ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" /> 2. Luyện 3 Câu Một Lần (Khuyên dùng)
              </button>
            </div>
          </div>

          {/* MODE 1: UNIFIED SINGLE PARAGRAPH BLOCK FOR FULL LISTEN (WITH BORDER TRANSITION MATCHING SCREENSHOT) */}
          {practiceListenMode === "full" && (() => {
            const isFullRevealed = globalRevealAll || revealedBlocks["full-block"];

            return (
              <div
                onClick={() => toggleRevealBlock("full-block")}
                className={`p-4 rounded-md transition-all cursor-pointer space-y-3.5 ${
                  isFullRevealed
                    ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-blue-500/20 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <span className={`text-xs font-black uppercase font-display flex items-center gap-1.5 ${
                    isFullRevealed ? "text-[#1d6ee6] dark:text-sky-400" : "text-slate-600 dark:text-slate-400"
                  }`}>
                    <Headphones className="w-4 h-4" /> TOÀN BỘ BÀI NGHE (NẰM TRONG MỘT KHỐI DUY NHẤT)
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRevealBlock("full-block");
                    }}
                    className="text-xs font-bold text-[#1d6ee6] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isFullRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {isFullRevealed ? "Ẩn chữ khối này" : "Bấm mở chữ & Dịch"}
                  </button>
                </div>

                {/* Single Unified Paragraph Card */}
                <div className={`p-4 rounded-xs transition-all relative ${
                  isFullRevealed
                    ? "bg-[#f8fafc] dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-3"
                    : "bg-slate-50/90 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10 relative p-4 space-y-3"
                }`}>
                  {!isFullRevealed ? (
                    <div className="space-y-3">
                      {/* Natural Redacted Paragraph Flow Grouped by Sentences */}
                      <div className="space-y-2.5 leading-relaxed">
                        {currentLesson.transcript.map((sentence: any, sIdx: number) => (
                          <div key={sIdx} className="flex items-start gap-2 flex-wrap">
                            <span className="text-[10px] font-bold text-slate-400 shrink-0 pt-0.5 select-none font-mono">
                              #{sIdx + 1}
                            </span>
                            <div className="flex flex-wrap gap-1 flex-1">
                              {sentence.text.split(" ").map((word: string, wIdx: number) => {
                                const wordKey = `full-${sIdx}-${wIdx}`;
                                const isWordRevealed = revealedWords[wordKey];

                                return (
                                  <span
                                    key={wordKey}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleRevealWord(wordKey);
                                    }}
                                    onMouseEnter={(e) => handleWordMouseEnter(e, word, isWordRevealed || isFullRevealed)}
                                    onMouseLeave={handleWordMouseLeave}
                                    className={`px-1.5 py-0.5 rounded-xs text-xs font-mono font-bold transition-all cursor-pointer inline-block select-none ${
                                      isWordRevealed
                                        ? "bg-blue-500/10 text-blue-600 dark:text-sky-400 font-sans"
                                        : "bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 hover:bg-[#1d6ee6]/10 hover:text-[#1d6ee6]"
                                    }`}
                                  >
                                    {isWordRevealed ? word : getWordMaskDots(word)}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* English Text (Clickable & Hoverable words) */}
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display flex flex-wrap gap-1.5">
                        {currentLesson.transcript.map((sentence: any, sIdx: number) => (
                          <React.Fragment key={sIdx}>
                            {sentence.text.split(" ").map((word: string, wIdx: number) => (
                              <span
                                key={`${sIdx}-${wIdx}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWordClick(word);
                                }}
                                onMouseEnter={(e) => handleWordMouseEnter(e, word, true)}
                                onMouseLeave={handleWordMouseLeave}
                                className="hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-sky-400 px-1 py-0.5 rounded-xs transition-colors cursor-pointer border border-transparent hover:border-blue-500/20"
                              >
                                {word}
                              </span>
                            ))}
                            <span className="mr-1"> </span>
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Polished Vietnamese Translation Left-Bordered Micro-Card */}
                      <div className="p-3.5 rounded-r-xs bg-slate-50 dark:bg-slate-950 border-l-3 border-[#1d6ee6] space-y-1 mt-3 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider">
                          <span>🇻🇳</span>
                          <span>BẢN DỊCH TIẾNG VIỆT</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                          {currentLesson.transcript.map((s: any) => s.translation || s.vietnamese).join(" ")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Single Play Button Bar */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="px-4 py-2 rounded-xs bg-[#1d6ee6] hover:bg-[#155bc5] text-white font-extrabold text-xs flex items-center gap-2 shadow-2xs cursor-pointer active:scale-98 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    {isPlaying ? "Tạm dừng phát toàn bộ" : "▶ BẤM MỘT LẦN NGHE TOÀN BỘ BÀI"}
                  </button>

                  <Link href={`/study/shadowing?lessonId=${currentLesson.id}`}>
                    <button className="px-3.5 py-2 rounded-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer">
                      🎙️ Chuyển sang Shadowing <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })()}

          {/* MODE 2: 3-SENTENCE CHUNK PRACTICE CARDS */}
          {practiceListenMode === "chunk3" && (
            <div className="space-y-3">
              {displayedSentences.map((sentence: any, relativeIdx: number) => {
                const actualIdx = chunkIndex * 3 + relativeIdx;
                const isCurrent = actualIdx === currentSentenceIndex;
                const isBookmarked = bookmarkedSentences.includes(actualIdx);
                const isRecordingThis = inlineRecordingSentenceId === actualIdx;
                const score = inlineAiScore[actualIdx];
                const blockKey = `sentence-${actualIdx}`;
                const isSentenceRevealed = globalRevealAll || revealedBlocks[blockKey];

                return (
                  <motion.div
                    key={actualIdx}
                    onClick={() => {
                      setCurrentSentenceIndex(actualIdx);
                      toggleRevealBlock(blockKey);
                      if (!isSentenceRevealed) {
                        playSingleSentence(sentence.text);
                      }
                    }}
                    className={`p-3.5 sm:p-4 rounded-md transition-all cursor-pointer ${
                      isSentenceRevealed
                        ? "bg-white dark:bg-slate-900 border-[#1d6ee6] ring-2 ring-blue-500/20 shadow-2xs"
                        : "bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase ${
                          isSentenceRevealed ? "text-[#1d6ee6] dark:text-sky-400" : "text-slate-500"
                        }`}>
                          Sentence {actualIdx + 1}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRevealBlock(blockKey);
                          }}
                          className="text-[11px] font-bold text-[#1d6ee6] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer ml-2"
                        >
                          {isSentenceRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isSentenceRevealed ? "Ẩn câu này" : "Mở câu này"}
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
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* WORD-LEVEL GRAY MASK PILLS WHEN UNREVEALED */}
                    {!isSentenceRevealed ? (
                      <div className="p-3 rounded-xs bg-slate-100/70 dark:bg-slate-950 border border-slate-200/50 cursor-pointer space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {sentence.text.split(" ").map((word: string, wIdx: number) => {
                            const wordKey = `s-${actualIdx}-${wIdx}`;
                            const isWordRevealed = revealedWords[wordKey];

                            return (
                              <span
                                key={wordKey}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRevealWord(wordKey);
                                }}
                                onMouseEnter={(e) => handleWordMouseEnter(e, word, isWordRevealed)}
                                onMouseLeave={handleWordMouseLeave}
                                className={`px-1.5 py-0.5 rounded-xs text-xs font-mono font-bold transition-all cursor-pointer inline-block select-none ${
                                  isWordRevealed
                                    ? "bg-blue-500/10 text-blue-600 dark:text-sky-400 font-sans"
                                    : "bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 hover:bg-[#1d6ee6]/10 hover:text-[#1d6ee6]"
                                }`}
                              >
                                {isWordRevealed ? word : getWordMaskDots(word)}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {/* English Text */}
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display flex flex-wrap gap-1">
                          {sentence.text.split(" ").map((word: string, wIdx: number) => (
                            <span
                              key={wIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWordClick(word);
                              }}
                              onMouseEnter={(e) => handleWordMouseEnter(e, word, true)}
                              onMouseLeave={handleWordMouseLeave}
                              className="hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-sky-400 px-1 py-0.5 rounded-xs transition-colors cursor-pointer border border-transparent hover:border-blue-500/20"
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
                        <div className="p-3 rounded-r-xs bg-slate-50 dark:bg-slate-950 border-l-3 border-[#1d6ee6] space-y-0.5 mt-2 shadow-2xs">
                          <span className="text-[10px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                            🇻🇳 BẢN DỊCH CÂU:
                          </span>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                            {sentence.translation || sentence.vietnamese}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 flex-wrap gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSingleSentence(sentence.text);
                        }}
                        className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 text-xs font-bold flex items-center gap-1 hover:bg-blue-100"
                      >
                        <Play className="w-3 h-3 fill-current" /> Play
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isRecordingThis) {
                            stopInlineRecording(actualIdx);
                          } else {
                            startInlineRecording(actualIdx);
                          }
                        }}
                        className={`px-3 py-1 rounded text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                          isRecordingThis
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        }`}
                      >
                        {isRecordingThis ? <Square className="w-3.5 h-3.5 fill-white" /> : <Mic className="w-3.5 h-3.5 stroke-[2]" />}
                        {isRecordingThis ? `Đang nhại... 00:0${inlineRecordingTime}` : "Speak (Nhại câu này)"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CHUNK NAVIGATION FOOTER BUTTONS IN CHUNK3 MODE */}
          {practiceListenMode === "chunk3" && (
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center justify-between">
              <button
                onClick={() => setChunkIndex((prev) => Math.max(0, prev - 1))}
                disabled={chunkIndex === 0}
                className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                ← Cụm 3 câu trước
              </button>

              {chunkIndex < totalChunksCount - 1 ? (
                <button
                  onClick={() => setChunkIndex((prev) => prev + 1)}
                  className="px-4 py-2 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white font-black text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-98 transition-transform"
                >
                  Chuyển sang 3 câu tiếp theo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link href={`/study/shadowing?lessonId=${currentLesson.id}`}>
                  <button className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer">
                    🎉 Hoàn thành bài nghe & Chuyển sang Shadowing <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          )}

        </div>

        {/* CỘT PHẢI: INTERACTIVE MULTI-TAB PANEL (QUIZ, VOCAB & GRAMMAR, NOTES, SHADOWING CTA) */}
        <div className="lg:col-span-5 space-y-3.5 min-w-0">
          
          {/* TAB HEADER SWITCHER (SINGLE-LINE SEGMENTED CONTROLLER) */}
          <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-1 shadow-2xs">
            <button
              onClick={() => setRightSidebarTab("quiz")}
              className={`flex-1 py-2 px-1.5 rounded-md text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                rightSidebarTab === "quiz"
                  ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-xs border border-slate-200/60 dark:border-white/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" /> Trắc Nghiệm
            </button>

            <button
              onClick={() => setRightSidebarTab("vocab")}
              className={`flex-1 py-2 px-1.5 rounded-md text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                rightSidebarTab === "vocab"
                  ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-xs border border-slate-200/60 dark:border-white/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" /> Từ Vựng & Ngữ Pháp
            </button>

            <button
              onClick={() => setRightSidebarTab("notes")}
              className={`flex-1 py-2 px-1.5 rounded-md text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 ${
                rightSidebarTab === "notes"
                  ? "bg-white dark:bg-slate-800 text-[#1d6ee6] dark:text-sky-400 shadow-xs border border-slate-200/60 dark:border-white/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <PenLine className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" /> Ghi Chú Bài Học
            </button>
          </div>

          {/* TAB 1: INTERACTIVE QUIZ PANEL */}
          {rightSidebarTab === "quiz" && (
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xs shrink-0">
                    <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                      Kiểm Tra Độ Hiểu Bài (Quiz Interactive)
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 block">
                      Trả lời chính xác để nhận +10 XP mỗi câu!
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {Object.keys(quizAnswers).length > 0 && (
                    <button
                      onClick={resetQuiz}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#1d6ee6] text-[10px] font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Làm lại
                    </button>
                  )}
                  <Badge variant="neutral" className="text-[10px] font-bold border-purple-500/30 text-purple-600">
                    {currentLesson.quizzes?.length || 0} CÂU HỎI
                  </Badge>
                </div>
              </div>

              {/* QUIZ SCORE SUMMARY CARD WHEN ALL COMPLETED */}
              {currentLesson.quizzes &&
                currentLesson.quizzes.length > 0 &&
                Object.keys(quizAnswers).length === currentLesson.quizzes.length && (() => {
                  const correctCount = currentLesson.quizzes.reduce((acc: number, quiz: any, qIdx: number) => {
                    const selectedOpt = quizAnswers[qIdx];
                    const correctIdx = quiz.correctIndex ?? 0;
                    return selectedOpt === correctIdx ? acc + 1 : acc;
                  }, 0);
                  const totalCount = currentLesson.quizzes.length;
                  const totalXp = correctCount * 10;

                  return (
                    <div className="p-3.5 rounded-lg bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-amber-500" />
                          <h4 className="text-xs font-black text-slate-900 dark:text-white">
                            🎉 Hoàn Thành Bài Kiểm Tra Quiz!
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-white shadow-2xs">
                          +{totalXp} XP TỔNG CỘNG
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Bạn đã trả lời đúng <strong className="text-emerald-600 dark:text-emerald-400">{correctCount}/{totalCount}</strong> câu hỏi. Hãy đọc kỹ phần giải thích chi tiết bên dưới để củng cố kiến thức nhé!
                      </p>
                    </div>
                  );
                })()}

              {currentLesson.quizzes && currentLesson.quizzes.length > 0 ? (
                <div className="space-y-4">
                  {currentLesson.quizzes.map((quiz: any, qIdx: number) => {
                    const selectedOpt = quizAnswers[qIdx];
                    const isAnswered = selectedOpt !== undefined;
                    const correctIndex = quiz.correctIndex ?? 0;

                    return (
                      <div
                        key={quiz.id || qIdx}
                        className="p-3.5 rounded-lg bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 space-y-3 shadow-2xs"
                      >
                        <div className="flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#1d6ee6] text-white shrink-0 shadow-2xs">
                            Q{qIdx + 1}
                          </span>
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-relaxed font-display">
                            {quiz.question}
                          </p>
                        </div>

                        {/* Options list with A, B, C, D letters & high contrast */}
                        <div className="space-y-1.5">
                          {quiz.options.map((optionText: string, optIdx: number) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const isThisSelected = selectedOpt === optIdx;
                            const isThisCorrect = optIdx === correctIndex;

                            let btnClasses = "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] hover:bg-blue-50/50 dark:hover:bg-blue-950/30";
                            let letterBadge = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

                            if (isAnswered) {
                              if (isThisCorrect) {
                                btnClasses = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-500 font-bold shadow-xs";
                                letterBadge = "bg-emerald-500 text-white font-black";
                              } else if (isThisSelected && !isThisCorrect) {
                                btnClasses = "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-400 font-bold";
                                letterBadge = "bg-rose-500 text-white font-black";
                              } else {
                                btnClasses = "bg-slate-50/80 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-slate-200/40";
                                letterBadge = "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isAnswered}
                                onClick={() => handleSelectQuizOption(qIdx, optIdx, correctIndex)}
                                className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClasses}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className={`w-6 h-6 rounded-md font-extrabold text-[11px] flex items-center justify-center shrink-0 shadow-2xs ${letterBadge}`}>
                                    {letter}
                                  </span>
                                  <span className="leading-snug">{optionText}</span>
                                </div>
                                {isAnswered && isThisCorrect && (
                                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                    <Check className="w-3.5 h-3.5" /> Đúng +10XP
                                  </span>
                                )}
                                {isAnswered && isThisSelected && !isThisCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        {isAnswered && quiz.explanation && (
                          <div className="p-3 rounded-r-lg bg-purple-50/80 dark:bg-purple-950/40 border-l-3 border-purple-500 space-y-1 animate-in fade-in duration-200 shadow-2xs">
                            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" /> GIẢI THÍCH ĐÁP ÁN CHI TIẾT:
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
                <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-purple-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Bài nghe này chưa có câu hỏi Quiz!
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Hãy bấm nút "➕ Tạo bài nghe AI" ở góc trên để nạp bài nghe có trắc nghiệm.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VOCABULARY & GRAMMAR BREAKDOWN */}
          {rightSidebarTab === "vocab" && (
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 font-sans">
              {/* Vocab Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                  <BookOpen className="w-4 h-4 text-[#1d6ee6]" />
                  <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                    Từ Vựng Trọng Tâm Bài Nghe
                  </h3>
                </div>

                <div className="space-y-2">
                  {(currentLesson.vocabList || currentLesson.vocabularyList || currentLesson.vocabulary || []).map((v: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => handleWordClick(v.word)}
                      className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/5 hover:border-[#1d6ee6] transition-all cursor-pointer space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1d6ee6] dark:text-sky-400 group-hover:underline">
                            {v.word}
                          </span>
                          <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                            ({v.ipa})
                          </span>
                        </div>
                        <span className="text-[9px] font-black uppercase text-slate-400">
                          {v.pos || "Word"}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        🇻🇳 {v.meaning || v.vietnamese}
                      </p>
                      {v.example && (
                        <p className="text-[11px] font-medium italic text-slate-500 dark:text-slate-400 pt-0.5">
                          "{v.example}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar Section */}
              {currentLesson.grammarNotes && currentLesson.grammarNotes.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-black text-slate-900 dark:text-white font-display">
                      Điểm Ngữ Pháp Quan Trọng
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {currentLesson.grammarNotes.map((g: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1">
                        <h4 className="text-xs font-black text-amber-800 dark:text-amber-300">
                          📌 {g.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                          {g.explanation}
                        </p>
                        {g.example && (
                          <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 italic pt-0.5">
                            Ví dụ: "{g.example}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STUDY NOTES AUTO-SAVER */}
          {rightSidebarTab === "notes" && (
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 font-sans">
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
                className="w-full h-44 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d6ee6] resize-none"
              />
            </div>
          )}

          {/* HERO UNLOCK SHADOWING CTA BUTTON */}
          <div className="p-4 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] flex items-center justify-center shrink-0">
                <Mic className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Sẵn sàng luyện phát âm chuyên sâu?
                </h3>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Tự động kế thừa bài nghe này sang chế độ nhại giọng với AI!
                </p>
              </div>
            </div>

            <Link href={`/study/shadowing?lessonId=${currentLesson.id}`} className="block">
              <button className="w-full py-2.5 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white font-bold text-xs shadow-2xs hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <Mic className="w-4 h-4 stroke-[2]" /> CHUYỂN SANG LUYỆN NHẠI GIỌNG CHUYÊN SÂU (SHADOWING) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

        </div>

      </div>
      )}

      {/* DEEP AI DICTIONARY & TRANSLATION CARD MODAL */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 p-4.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#1d6ee6] shadow-2xl space-y-3 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center font-black text-sm">
                  <GraduationCap className="w-4.5 h-4.5 text-[#1d6ee6] dark:text-sky-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white font-display">
                    {selectedWord.word}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {selectedWord.pos}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* IPA & Pronounce Button */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2 rounded-md border border-slate-200/60 dark:border-white/5 text-xs">
              <span className="font-mono text-[#1d6ee6] dark:text-sky-400 font-extrabold">
                IPA: {selectedWord.ipa}
              </span>
              <button
                onClick={() => speakWord(selectedWord.word, currentLesson?.accent || "en-US")}
                className="px-2.5 py-1 rounded bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-[10px] font-black flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95 transition-transform"
              >
                <Volume2 className="w-3.5 h-3.5 fill-white" /> Phát âm từ
              </button>
            </div>

            {/* Vietnamese Meaning Box */}
            <div className="p-3 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/50 border border-[#d5e5fe] dark:border-blue-900/40 space-y-1">
              <span className="text-[10px] font-black uppercase text-[#1d6ee6] dark:text-sky-400 tracking-wider block">
                🇻🇳 BẢN DỊCH TIẾNG VIỆT CHUYÊN SÂU:
              </span>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                {selectedWord.meaning}
              </p>
              {selectedWord.detailMeaning && (
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed pt-1">
                  {selectedWord.detailMeaning}
                </p>
              )}
            </div>

            {/* Collocations & Phrases */}
            {selectedWord.collocations && selectedWord.collocations.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider block">
                  💡 CỤM TỪ HAY GẶP (COLLOCATIONS):
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedWord.collocations.map((phrase: string, pIdx: number) => (
                    <span key={pIdx} className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/50">
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Real World Example */}
            {selectedWord.example && (
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 block">Ví dụ thực tế:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic font-medium">
                  "{selectedWord.example}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* FLOATING HOVER WORD TOOLTIP BUBBLE (GLASSMORPHISM AGENCY CARD WITH EDGE CLAMPING) */}
      <AnimatePresence>
        {hoveredWordData && hoveredWordData.rect && hoveredWordData.isRevealed && (() => {
          const coords = getTooltipCoords(hoveredWordData.rect);
          return (
            <motion.div
              key="word-hover-tooltip"
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              style={{
                position: "fixed",
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                transform: "translateX(-50%)",
              }}
              className="z-50 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-2xl space-y-0.5 pointer-events-none min-w-[170px] max-w-[280px]"
            >
              <div className="flex items-center gap-1.5 font-sans">
                <span className="text-[#1d6ee6] dark:text-sky-400 font-extrabold font-mono text-xs sm:text-sm">
                  {hoveredWordData.word}
                </span>
                {hoveredWordData.ipa && (
                  <span className="text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold">
                    ({hoveredWordData.ipa})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-slate-800 dark:text-slate-100 font-semibold text-xs leading-snug">
                <span className="text-[#1d6ee6] text-[10px]">🇻🇳</span>
                <span>{hoveredWordData.meaning}</span>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
