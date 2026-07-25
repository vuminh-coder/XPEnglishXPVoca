"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { lookupWordDeep, DeepWordDefinition } from "@/lib/utils/deepDictionary";
import { useAuthStore } from "@/lib/store/authStore";

export interface ListeningLessonData {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  accent: string;
  audioUrl: string;
  imageUrl?: string;
  transcript: Array<{
    id: number;
    speaker: string;
    text: string;
    translation: string;
    timestamp?: [number, number];
    ipa?: string;
  }>;
  vocabList?: Array<any>;
  grammarNotes?: Array<any>;
  userProgress?: {
    status: string;
    completedSentences: number[];
    bookmarkedSentences: number[];
    inlineAiScores: Record<string, number>;
    timeSpent: number;
    lastPracticedAt?: string;
  } | null;
  userNote?: string;
}

export function useListeningEngine(initialLessonId?: string | null) {
  const { user, awardXp } = useAuthStore();
  const userId = user?.id || "guest-user";

  // Lessons list & selected lesson
  const [lessonsList, setLessonsList] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<ListeningLessonData | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLevel, setSelectedLevel] = useState("ALL");

  // Mode & Audio state
  const [practiceListenMode, setPracticeListenMode] = useState<"full" | "chunk3">("full");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Masking state
  const [globalRevealAll, setGlobalRevealAll] = useState(false);
  const [revealedBlocks, setRevealedBlocks] = useState<Record<string, boolean>>({});
  const [revealedWords, setRevealedWords] = useState<Record<string, boolean>>({});

  // Navigation state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [bookmarkedSentences, setBookmarkedSentences] = useState<number[]>([]);

  // Right sidebar & Notes
  const [sidebarTab, setSidebarTab] = useState<"vocab" | "grammar" | "notes" | "bookmarks" | "stats">("vocab");
  const [userNoteText, setUserNoteText] = useState("");

  // AI Recording state
  const [inlineRecordingSentenceId, setInlineRecordingSentenceId] = useState<number | null>(null);
  const [inlineRecordingTime, setInlineRecordingTime] = useState(0);
  const [inlineAiScore, setInlineAiScore] = useState<Record<number, number>>({});
  const [isInlineAnalyzing, setIsInlineAnalyzing] = useState(false);

  // Hover & Dictionary Modal
  const [hoveredWordData, setHoveredWordData] = useState<{
    word: string;
    meaning: string;
    ipa: string;
    isRevealed: boolean;
    rect: DOMRect | null;
  } | null>(null);
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  // 1. Fetch all lessons
  const fetchLessons = useCallback(async () => {
    try {
      const url = new URL("/api/listening/lessons", window.location.origin);
      if (selectedCategory !== "ALL") url.searchParams.set("category", selectedCategory);
      if (selectedLevel !== "ALL") url.searchParams.set("level", selectedLevel);
      if (searchQuery) url.searchParams.set("search", searchQuery);
      url.searchParams.set("userId", userId);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setLessonsList(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch lessons list:", err);
    }
  }, [selectedCategory, selectedLevel, searchQuery, userId]);

  // 2. Fetch single lesson detail
  const fetchLessonDetail = useCallback(async (lessonId: string) => {
    setIsLoadingLesson(true);
    try {
      const url = `/api/listening/lessons/${lessonId}?userId=${userId}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.success && json.data) {
        const lesson = json.data;
        setCurrentLesson(lesson);

        if (lesson.userProgress) {
          setBookmarkedSentences(lesson.userProgress.bookmarkedSentences || []);
          const scoreMap: Record<number, number> = {};
          if (lesson.userProgress.inlineAiScores) {
            Object.entries(lesson.userProgress.inlineAiScores).forEach(([k, v]) => {
              scoreMap[Number(k)] = Number(v);
            });
          }
          setInlineAiScore(scoreMap);
        }
        if (lesson.userNote) {
          setUserNoteText(lesson.userNote);
        }
      }
    } catch (err) {
      console.error("Failed to fetch lesson detail:", err);
    } finally {
      setIsLoadingLesson(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    if (initialLessonId) {
      fetchLessonDetail(initialLessonId);
    } else if (lessonsList.length > 0) {
      fetchLessonDetail(lessonsList[0].id);
    }
  }, [initialLessonId, lessonsList, fetchLessonDetail]);

  // Audio Playback Controller
  const togglePlay = () => {
    if (!audioRef.current && currentLesson) {
      const audio = new Audio(currentLesson.audioUrl);
      audio.playbackRate = playbackSpeed;
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Masking Toggles
  const toggleRevealBlock = (blockId: string) => {
    setRevealedBlocks((prev) => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  const toggleRevealWord = (wordKey: string) => {
    setRevealedWords((prev) => ({ ...prev, [wordKey]: !prev[wordKey] }));
  };

  // Bookmark Toggle
  const toggleBookmarkSentence = async (idx: number) => {
    const nextBookmarks = bookmarkedSentences.includes(idx)
      ? bookmarkedSentences.filter((i) => i !== idx)
      : [...bookmarkedSentences, idx];

    setBookmarkedSentences(nextBookmarks);

    if (currentLesson) {
      fetch("/api/listening/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          lessonId: currentLesson.id,
          bookmarkedSentences: nextBookmarks,
        }),
      });
    }
  };

  // Speech Synthesis Pronunciation
  const speakWord = (word: string, accent = "en-US") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    const utterance = new SpeechSynthesisUtterance(cleanWord);
    utterance.lang = accent;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Word Hover Handler
  const handleWordMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    word: string,
    isRevealed: boolean
  ) => {
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

  // Word Click Handler (Deep AI Modal + Speech)
  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    speakWord(cleanWord, currentLesson?.accent || "en-US");
    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWord(deepDef);
  };

  // AI Recording Handler
  const startInlineRecording = (sentenceIdx: number) => {
    setInlineRecordingSentenceId(sentenceIdx);
    setInlineRecordingTime(0);
  };

  const stopInlineRecording = async (sentenceIdx: number) => {
    setInlineRecordingSentenceId(null);
    setIsInlineAnalyzing(true);

    try {
      const formData = new FormData();
      const sentence = currentLesson?.transcript[sentenceIdx];
      formData.append("targetText", sentence?.text || "");

      const res = await fetch("/api/listening/evaluate-speech", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.data) {
        const score = json.data.score;
        setInlineAiScore((prev) => ({ ...prev, [sentenceIdx]: score }));

        // Award XP
        if (awardXp) awardXp(15);

        // Persist to Server
        if (currentLesson) {
          fetch("/api/listening/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              lessonId: currentLesson.id,
              inlineAiScores: { ...inlineAiScore, [sentenceIdx]: score },
              xpEarned: 15,
            }),
          });
        }
      }
    } catch (err) {
      console.error("AI Evaluation error:", err);
    } finally {
      setIsInlineAnalyzing(false);
    }
  };

  // Note Saver
  const saveUserNote = async (text: string) => {
    setUserNoteText(text);
    if (!currentLesson) return;

    try {
      await fetch("/api/listening/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          lessonId: currentLesson.id,
          content: text,
        }),
      });
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return {
    lessonsList,
    currentLesson,
    isLoadingLesson,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    practiceListenMode,
    setPracticeListenMode,
    isPlaying,
    togglePlay,
    playbackSpeed,
    changePlaybackSpeed,
    globalRevealAll,
    setGlobalRevealAll,
    revealedBlocks,
    revealedWords,
    toggleRevealBlock,
    toggleRevealWord,
    currentSentenceIndex,
    setCurrentSentenceIndex,
    chunkIndex,
    setChunkIndex,
    bookmarkedSentences,
    toggleBookmarkSentence,
    sidebarTab,
    setSidebarTab,
    userNoteText,
    saveUserNote,
    inlineRecordingSentenceId,
    inlineRecordingTime,
    inlineAiScore,
    isInlineAnalyzing,
    startInlineRecording,
    stopInlineRecording,
    hoveredWordData,
    handleWordMouseEnter,
    handleWordMouseLeave,
    selectedWord,
    setSelectedWord,
    handleWordClick,
    speakWord,
    fetchLessonDetail,
  };
}
