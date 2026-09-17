"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import {
  ShadowingListingSkeleton,
  ShadowingStudioSkeleton,
  ShadowingListingView,
  ShadowingStudioWorkspace,
  ShadowingCompletionScreen,
  DeepDictionaryModal,
  SentenceReportModal,
  LessonExplorerModal,
} from "@/features/shadowing";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";

// Helper to resolve query id (e.g. ?id=52 -> 52nd lesson or listen_052)
const resolveLessonId = (
  queryId: string | null | undefined,
  list: any[]
): string | null => {
  if (!queryId || !list || list.length === 0) return null;

  // 1. Direct match by lesson id
  const exact = list.find((l) => l.id === queryId);
  if (exact) return exact.id;

  // 2. Numeric match (e.g. ?id=52 -> 52nd lesson or listen_052)
  const num = parseInt(queryId, 10);
  if (!isNaN(num)) {
    if (num >= 1 && num <= list.length) {
      return list[num - 1].id;
    }
    const formatted = `listen_${String(num).padStart(3, "0")}`;
    const foundFormatted = list.find((l) => l.id === formatted);
    if (foundFormatted) return foundFormatted.id;
  }

  return null;
};

function ShadowingStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setCurrentLessonId, completedLessonIds } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // 1. Database-backed lessons state
  const [lessonsList, setLessonsList] = useState<any[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(!rawIdParam);
  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState<boolean>(!!rawIdParam);
  const [singleLessonDb, setSingleLessonDb] = useState<any | null>(null);

  // 2. Selected lesson state
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Fetch all lessons from PostgreSQL database
  useEffect(() => {
    let isMounted = true;
    async function fetchLessons() {
      try {
        if (!rawIdParam) setIsLoadingLessons(true);
        const res = await fetch(`/api/listening/lessons?userId=${user?.id || ""}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setLessonsList(json.data);
        }
      } catch (err) {
        console.error("Failed to load lessons from database:", err);
      } finally {
        // High-end smooth grace period (Rule 1 Wadhah Aloui)
        await new Promise((r) => setTimeout(r, 240));
        if (isMounted) setIsLoadingLessons(false);
      }
    }
    fetchLessons();
    return () => {
      isMounted = false;
    };
  }, [user?.id, rawIdParam]);

  // Sync URL ?id= param with database lessons
  useEffect(() => {
    if (!rawIdParam) {
      setSelectedLessonId(null);
      setCurrentLessonId("");
      setIsLoadingLessonDetail(false);
      return;
    }

    setIsLoadingLessonDetail(true);

    if (lessonsList.length > 0) {
      const resolved = resolveLessonId(rawIdParam, lessonsList);
      if (resolved) {
        setSelectedLessonId(resolved);
        setCurrentLessonId(resolved);
        setSidebarCollapsed(true);
      }
    }

    // Fetch individual lesson if not found or directly via param
    async function fetchSingle() {
      try {
        const res = await fetch(`/api/listening/lessons/${rawIdParam}?userId=${user?.id || ""}`);
        const json = await res.json();
        if (json.success && json.data) {
          setSingleLessonDb(json.data);
          setSelectedLessonId(json.data.id);
          setCurrentLessonId(json.data.id);
          setSidebarCollapsed(true);
        }
      } catch (e) {
        console.error("Error fetching single lesson:", e);
      } finally {
        await new Promise((r) => setTimeout(r, 200));
        setIsLoadingLessonDetail(false);
      }
    }

    fetchSingle();
  }, [rawIdParam, lessonsList, setCurrentLessonId, setSidebarCollapsed, user?.id]);

  // Automatically ensure sidebar is collapsed when in studio workspace
  useEffect(() => {
    if (selectedLessonId) {
      setSidebarCollapsed(true);
      setHideBottomNav(true);
    } else {
      setHideBottomNav(false);
    }
  }, [selectedLessonId, setSidebarCollapsed, setHideBottomNav]);

  // Cleanup: restore BottomNav when leaving the page
  useEffect(() => {
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const currentLesson = useMemo(() => {
    if (singleLessonDb && singleLessonDb.id === selectedLessonId) {
      return singleLessonDb;
    }
    return lessonsList.find((l) => l.id === selectedLessonId) || singleLessonDb || null;
  }, [lessonsList, selectedLessonId, singleLessonDb]);

  // Practice state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{ [idx: number]: boolean }>({});
  const [mobileStudioTab, setMobileStudioTab] = useState<"practice" | "transcript">("practice");

  // Overall practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);

  // Real-time backend practice time tracker for Shadowing
  useStudyTimeTracker("shadowing", {
    activeCondition: !!selectedLessonId && !isLessonFinished,
  });

  useEffect(() => {
    if (!selectedLessonId || isLessonFinished) return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedLessonId, isLessonFinished]);

  // Sentence Utility Toolbar States
  const [savedSentenceKeys, setSavedSentenceKeys] = useState<string[]>([]);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [autoNextSentence, setAutoNextSentence] = useState<boolean>(true);
  const [hideTranslation, setHideTranslation] = useState<boolean>(false);

  // Sync user progress from DB when lesson loads
  useEffect(() => {
    if (currentLesson?.userProgress) {
      const p = currentLesson.userProgress;
      if (Array.isArray(p.completedSentences)) {
        const completedMap: { [idx: number]: boolean } = {};
        p.completedSentences.forEach((idx: number) => {
          completedMap[idx] = true;
        });
        setCompletedSentences(completedMap);
      }
      if (Array.isArray(p.bookmarkedSentences)) {
        setSavedSentenceKeys(p.bookmarkedSentences);
      }
    }
  }, [currentLesson]);

  // Custom Lesson Selection Modal & Search
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [listingSearch, setListingSearch] = useState("");

  // Sentence Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);

  // Real WebRTC MediaRecorder States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // AI Speech Analysis Result
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    overallScore: number;
    fluencyScore: number;
    intonationScore: number;
    pronunciationScore: number;
    completenessScore: number;
    speedWpm: number;
    stressScore: number;
    feedback: string;
    wordAccuracy: { word: string; score: number; status: "perfect" | "good" | "needs_work" }[];
  } | null>(null);

  // Deep Word Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  // Live Speech Recognition States
  const [liveRecognizedWords, setLiveRecognizedWords] = useState<
    { word: string; status: "perfect" | "needs_work" }[]
  >([]);
  const speechRecognitionRef = useRef<any>(null);
  const capturedSpeechTextRef = useRef<string>("");
  const vadMaxVolumeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Single-Row Horizontal Word Track Auto-Scroll Refs & Playback Tracking
  const wordTrackContainerRef = useRef<HTMLDivElement>(null);
  const wordTokenRefs = useRef<(HTMLElement | null)[]>([]);
  const [activePlaybackWordIndex, setActivePlaybackWordIndex] = useState<number | null>(null);

  // Direct Word Lookup
  const handleWordClick = (rawWord: string) => {
    const clean = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
    if (!clean) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(clean, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(clean);
    setSelectedWord(deepDef);
  };

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // 1. Auto-scroll word track during speech recognition
  useEffect(() => {
    if (!isRecording) return;
    const targetIdx = Math.max(
      0,
      Math.min(
        (currentSentence?.text.split(/\s+/).length || 1) - 1,
        liveRecognizedWords.length > 0 ? liveRecognizedWords.length - 1 : 0
      )
    );
    const targetEl = wordTokenRefs.current[targetIdx];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isRecording, liveRecognizedWords.length, currentSentence?.text]);

  // 2. Auto-scroll word track during sample audio playback
  useEffect(() => {
    if (activePlaybackWordIndex === null) return;
    const targetEl = wordTokenRefs.current[activePlaybackWordIndex];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activePlaybackWordIndex]);

  // 3. Reset scroll position on sentence change
  useEffect(() => {
    setActivePlaybackWordIndex(null);
    if (wordTrackContainerRef.current) {
      wordTrackContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [currentSentenceIndex]);

  // 2-Row Listing State
  const BASIC_LEVELS = useMemo(() => new Set(["Easy", "Beginner", "A1", "A2"]), []);
  const ADVANCED_LEVELS = useMemo(() => new Set(["Hard", "Advanced", "C1", "C2"]), []);

  const [displayedBasicLessons, setDisplayedBasicLessons] = useState<any[]>([]);
  const [displayedAdvancedLessons, setDisplayedAdvancedLessons] = useState<any[]>([]);

  useEffect(() => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicLessons(
        safeBasic
          .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
      setDisplayedAdvancedLessons(
        safeAdv
          .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
    } else {
      setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
      setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    }
  }, [lessonsList, completedLessonIds, listingSearch, BASIC_LEVELS, ADVANCED_LEVELS]);

  const handleShuffleBasic = () => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học cơ bản ngẫu nhiên mới! ↺" });
  };

  const handleShuffleAdvanced = () => {
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));
    setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học nâng cao ngẫu nhiên mới! ↺" });
  };

  // Select lesson with Router sync
  const handleSelectLesson = (lessonId: string | number) => {
    const strId = String(lessonId);
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(strId);
    setCurrentLessonId(strId);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setIsLessonFinished(false);
    setAiAnalysisResult(null);
    setUserAudioUrl(null);
    setCompletedSentences({});
    setSidebarCollapsed(true);
    setIsLoadingLessonDetail(true);

    const lessonIdx = lessonsList.findIndex((l) => l.id === strId);
    if (lessonIdx !== -1) {
      router.push(`/study/shadowing?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/shadowing?id=${strId}`);
    }
  };

  // Back to listing with Router sync
  const handleBackToListing = () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    setIsLoadingLessonDetail(false);
    router.push("/study/shadowing");
  };

  // Sentence Bookmark with Database Persistence
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = async () => {
    let nextKeys: string[];
    if (isCurrentSentenceBookmarked) {
      nextKeys = savedSentenceKeys.filter((k) => k !== currentSentenceKey);
      addToast({ type: "info", title: "Đã bỏ lưu câu khỏi sổ tay! 🔖" });
    } else {
      nextKeys = [...savedSentenceKeys, currentSentenceKey];
      awardXp(5, "shadowing");
      addToast({
        type: "success",
        title: "⭐ Đã lưu câu vào sổ tay luyện nói! (+5 XP)",
        message: currentSentence?.text
          ? `"${currentSentence.text.slice(0, 45)}..."`
          : "Đã lưu câu thành công!",
      });
    }
    setSavedSentenceKeys(nextKeys);

    if (currentLesson) {
      try {
        await fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || "guest_user",
            lessonId: currentLesson.id,
            bookmarkedSentences: nextKeys,
            skill: "shadowing",
          }),
        });
      } catch (e) {
        console.error("Error persisting bookmark to DB:", e);
      }
    }
  };

  // Sentence Report Modal submission
  const handleSubmitReport = (
    e: React.FormEvent,
    _reason: string,
    _description: string
  ) => {
    setShowReportModal(false);
    addToast({
      type: "success",
      title: "🚩 Đã gửi phản ánh thành công!",
      message: "Cảm ơn bạn đã đóng góp! Ban biên tập sẽ kiểm tra và cập nhật câu trong 24h.",
    });
  };

  const handleAdjustFontSize = (delta: number) => {
    const nextLevel = Math.max(0, Math.min(3, fontSizeLevel + delta));
    setFontSizeLevel(nextLevel);
  };

  // WebRTC Audio Recording Logic
  const startRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        addToast({
          type: "error",
          title: "Thiết bị không hỗ trợ Micro",
          message: "Trình duyệt của bạn không hỗ trợ thu âm WebRTC.",
        });
        return;
      }

      stopTTS();
      setPlayingSentenceText(null);
      setUserAudioUrl(null);
      setAiAnalysisResult(null);
      setLiveRecognizedWords([]);
      capturedSpeechTextRef.current = "";
      vadMaxVolumeRef.current = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Web Audio Voice Activity Detection (VAD) Analyser
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const checkAudioEnergy = () => {
            if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length / 255;
            if (avg > vadMaxVolumeRef.current) {
              vadMaxVolumeRef.current = avg;
            }
            requestAnimationFrame(checkAudioEnergy);
          };
          requestAnimationFrame(checkAudioEnergy);
        }
      } catch (e) {
        console.warn("VAD AudioContext init skipped:", e);
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current) {
          try {
            audioContextRef.current.close();
          } catch {}
          audioContextRef.current = null;
        }

        // Voice Activity Detection Check: Reject pure silence or background noise
        if (vadMaxVolumeRef.current < 0.012 && !capturedSpeechTextRef.current.trim()) {
          addToast({
            type: "warning",
            title: "Chưa phát hiện giọng nói",
            message: "Micro chưa thu được âm thanh rõ ràng. Hãy thử đọc to và dứt khoát hơn nhé!",
          });
          setAiAnalysisResult({
            overallScore: 0,
            fluencyScore: 0,
            intonationScore: 0,
            pronunciationScore: 0,
            completenessScore: 0,
            speedWpm: 0,
            stressScore: 0,
            feedback: "Chưa phát hiện giọng nói rõ ràng. Hãy bấm ghi âm và đọc to theo câu mẫu nhé!",
            wordAccuracy: (currentSentence?.text || "").split(/\s+/).map((w: string) => ({
              word: w,
              score: 0,
              status: "needs_work" as const,
            })),
          });
          return;
        }

        executeRealAiSpeechAnalysis();
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);

      // Start Real SpeechRecognition if available
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = currentLesson?.accent || "en-US";

          recognition.onresult = (event: any) => {
            let transcriptText = "";
            for (let i = 0; i < event.results.length; ++i) {
              transcriptText += event.results[i][0].transcript + " ";
            }
            const cleanText = transcriptText.trim();
            capturedSpeechTextRef.current = cleanText;
            evaluateLiveSpeech(cleanText);
          };

          recognition.onerror = () => {};
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch {
          // Fallback gracefully
        }
      }

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      addToast({
        type: "info",
        title: "🎙️ Đang ghi âm...",
        message: "Hãy phát âm to và rõ ràng câu tiếng Anh này nhé!",
      });
    } catch {
      addToast({
        type: "error",
        title: "Không thể truy cập Micro",
        message: "Vui lòng cho phép quyền truy cập Micro trên trình duyệt.",
      });
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }
  };

  const evaluateLiveSpeech = (recognizedText: string) => {
    if (!currentSentence?.text) return;
    const targetWords = currentSentence.text.toLowerCase().split(/\s+/);
    const spokenWords = recognizedText.toLowerCase().split(/\s+/);

    const evaluated = targetWords.map((target: string) => {
      const cleanTarget = target.replace(/[^a-zA-Z]/g, "");
      const isMatched = spokenWords.some(
        (spk: string) => spk.replace(/[^a-zA-Z]/g, "") === cleanTarget
      );
      return {
        word: target,
        status: isMatched ? ("perfect" as const) : ("needs_work" as const),
      };
    });

    setLiveRecognizedWords(evaluated);
  };

  // Real AI Speech Analysis & Database Progress Sync
  const executeRealAiSpeechAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      if (!currentSentence?.text) return;

      const recognized = capturedSpeechTextRef.current || "";
      const res = await fetch("/api/listening/evaluate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetText: currentSentence.text,
          recognizedText: recognized,
          durationSec: Math.max(1, recordingTime),
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const evalData = json.data;
        setAiAnalysisResult(evalData);
        const overall = evalData.overallScore;

        if (overall >= 50) {
          const nextCompleted = { ...completedSentences, [currentSentenceIndex]: true };
          setCompletedSentences(nextCompleted);

          // Save progress to PostgreSQL Neon
          if (currentLesson) {
            const completedIndices = Object.keys(nextCompleted)
              .filter((k) => nextCompleted[Number(k)])
              .map(Number);
            const isAllDone = totalSentencesCount > 0 && completedIndices.length >= totalSentencesCount;

            try {
              if (isAllDone) {
                await fetch(
                  `/api/listening/progress?userId=${user?.id || "guest_user"}&lessonId=${currentLesson.id}`,
                  { method: "DELETE" }
                );
              } else {
                await fetch("/api/listening/progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user?.id || "guest_user",
                    lessonId: currentLesson.id,
                    status: "IN_PROGRESS",
                    completedSentences: completedIndices,
                    bookmarkedSentences: savedSentenceKeys,
                    inlineAiScores: { [currentSentenceIndex]: overall },
                    timeSpent: Math.max(15, elapsedTime),
                    xpEarned: overall >= 80 ? 15 : 5,
                    skill: "shadowing",
                  }),
                });
              }
            } catch (e) {
              console.error("Failed to sync shadowing progress to database:", e);
            }
          }
        }

        if (overall >= 80) {
          awardXp(15, "shadowing");
          addToast({
            type: "success",
            title: `🎉 XUẤT SẮC! ${overall} điểm (+15 XP)`,
            message: "Bạn đã vượt qua câu này với phát âm chuẩn xác!",
          });

          if (autoNextSentence && currentSentenceIndex < totalSentencesCount - 1) {
            setTimeout(() => {
              handleNextSentence();
            }, 1600);
          }
        } else if (overall >= 50) {
          awardXp(5, "shadowing");
          addToast({
            type: "info",
            title: `👍 Hoàn thành câu! (${overall} điểm, +5 XP)`,
            message: "Hãy nghe lại âm thanh mẫu để phát âm chuẩn hơn nhé!",
          });
        } else {
          addToast({
            type: "warning",
            title: `⚠️ Chưa đạt (${overall} điểm)`,
            message: "Hãy nghe lại câu mẫu và thử đọc lại lần nữa nhé!",
          });
        }
      }
    } catch (err) {
      console.error("Real AI speech evaluation error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reusable Sample Audio Player
  const handlePlaySampleAudio = () => {
    if (!currentSentence) return;
    if (playingSentenceText === currentSentence.text) {
      stopTTS();
      setPlayingSentenceText(null);
      setActivePlaybackWordIndex(null);
    } else {
      setPlayingSentenceText(currentSentence.text);
      setActivePlaybackWordIndex(0);
      speakLessonText(currentSentence.text, {
        rate: playbackSpeed,
        lessonId: currentLesson?.id,
        speakerIndex: currentSentenceIndex % 2,
        accent: currentLesson?.accent,
        onWordBoundary: (_charIndex, wordIdx) => {
          setActivePlaybackWordIndex(wordIdx);
        },
        onEnd: () => {
          setPlayingSentenceText(null);
          setActivePlaybackWordIndex(null);
        },
      });
    }
  };

  const handleNextSentence = async () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSentencePlaybackTime(0);
    setUserAudioUrl(null);
    setAiAnalysisResult(null);
    setLiveRecognizedWords([]);

    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      if (currentLesson) {
        awardXp(50, "shadowing");
        try {
          // Auto-delete the in-progress database record to reset the lesson clean for subsequent practice sessions
          await fetch(
            `/api/listening/progress?userId=${user?.id || "guest_user"}&lessonId=${currentLesson.id}`,
            { method: "DELETE" }
          );
        } catch (e) {
          console.error("Error resetting completed lesson progress in database:", e);
        }
      }
      addToast({
        type: "success",
        title: "🎉 HOÀN THÀNH BÀI LUYỆN NÓI!",
        message: "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài Shadowing! +50 XP thưởng.",
      });
    }
  };

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      stopTTS();
      setPlayingSentenceText(null);
      setSentencePlaybackTime(0);
      setUserAudioUrl(null);
      setAiAnalysisResult(null);
      setLiveRecognizedWords([]);
      setCurrentSentenceIndex((prev) => prev - 1);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    if (!selectedLessonId || isLessonFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          (document.activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleNextSentence();
      } else if (
        e.code === "Space" ||
        e.key === "Control" ||
        (e.ctrlKey && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        handlePlaySampleAudio();
      } else if (
        (e.altKey && (e.key === "s" || e.key === "S" || e.key === "m" || e.key === "M")) ||
        e.key === "F2"
      ) {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedLessonId,
    isLessonFinished,
    currentSentenceIndex,
    currentSentence,
    playbackSpeed,
    currentLesson,
    totalSentencesCount,
    isRecording,
  ]);

  // Loading Studio Mode (with query param or lessonDetail fetching)
  if (selectedLessonId && (isLoadingLessonDetail || !currentLesson)) {
    return <ShadowingStudioSkeleton />;
  }

  // Loading Listing Mode
  if (isLoadingLessons && !selectedLessonId) {
    return <ShadowingListingSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans relative select-none ${
        selectedLessonId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. LISTING VIEW */}
      {!selectedLessonId && (
        <ShadowingListingView
          lessonsList={lessonsList}
          completedLessonIds={completedLessonIds}
          selectedLessonId={selectedLessonId}
          listingSearch={listingSearch}
          setListingSearch={setListingSearch}
          onSelectLesson={handleSelectLesson}
          onOpenExplorerModal={() => setShowLessonModal(true)}
          displayedBasicLessons={displayedBasicLessons}
          displayedAdvancedLessons={displayedAdvancedLessons}
          handleShuffleBasic={handleShuffleBasic}
          handleShuffleAdvanced={handleShuffleAdvanced}
        />
      )}

      {/* 2. STUDIO WORKSPACE OR COMPLETION SUMMARY */}
      {selectedLessonId && currentLesson && (
        <>
          {isLessonFinished ? (
            <ShadowingCompletionScreen
              currentLesson={currentLesson}
              elapsedTime={elapsedTime}
              totalSentencesCount={totalSentencesCount}
              lessonsList={lessonsList}
              onBackToListing={handleBackToListing}
              onRepeatLesson={() => {
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                setAiAnalysisResult(null);
                setCompletedSentences({});
              }}
              onSelectLesson={(id) => {
                handleSelectLesson(id);
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                setAiAnalysisResult(null);
                setCompletedSentences({});
              }}
            />
          ) : (
            <ShadowingStudioWorkspace
              currentLesson={currentLesson}
              rawIdParam={rawIdParam}
              selectedLessonId={selectedLessonId}
              elapsedTime={elapsedTime}
              currentSentenceIndex={currentSentenceIndex}
              totalSentencesCount={totalSentencesCount}
              sentencePlaybackTime={sentencePlaybackTime}
              setSentencePlaybackTime={setSentencePlaybackTime}
              playingSentenceText={playingSentenceText}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              isRecording={isRecording}
              recordingTime={recordingTime}
              userAudioUrl={userAudioUrl}
              isPlayingUserAudio={isPlayingUserAudio}
              setIsPlayingUserAudio={setIsPlayingUserAudio}
              userAudioPlayerRef={userAudioPlayerRef}
              isAnalyzing={isAnalyzing}
              aiAnalysisResult={aiAnalysisResult}
              liveRecognizedWords={liveRecognizedWords}
              activePlaybackWordIndex={activePlaybackWordIndex}
              wordTrackContainerRef={wordTrackContainerRef}
              wordTokenRefs={wordTokenRefs}
              mobileStudioTab={mobileStudioTab}
              setMobileStudioTab={setMobileStudioTab}
              isCurrentSentenceBookmarked={isCurrentSentenceBookmarked}
              handleToggleBookmark={handleToggleBookmark}
              handleBackToListing={handleBackToListing}
              onOpenReportModal={() => setShowReportModal(true)}
              fontSizeLevel={fontSizeLevel}
              handleAdjustFontSize={handleAdjustFontSize}
              autoNextSentence={autoNextSentence}
              setAutoNextSentence={setAutoNextSentence}
              hideTranslation={hideTranslation}
              setHideTranslation={setHideTranslation}
              handleWordClick={handleWordClick}
              handlePlaySampleAudio={handlePlaySampleAudio}
              handlePrevSentence={handlePrevSentence}
              handleNextSentence={handleNextSentence}
              startRecording={startRecording}
              stopRecording={stopRecording}
              handleResetCurrentSentence={() => {
                stopTTS();
                setPlayingSentenceText(null);
                setSentencePlaybackTime(0);
                setUserAudioUrl(null);
                setAiAnalysisResult(null);
                setLiveRecognizedWords([]);
              }}
              completedSentences={completedSentences}
              onSelectTranscriptSentence={(idx) => {
                stopTTS();
                setPlayingSentenceText(null);
                setSentencePlaybackTime(0);
                setUserAudioUrl(null);
                setAiAnalysisResult(null);
                setCurrentSentenceIndex(idx);
              }}
              onReplayTranscriptSentence={(idx) => {
                const text = currentLesson.transcript?.[idx]?.text;
                if (text) {
                  speakLessonText(text, {
                    rate: playbackSpeed,
                    lessonId: currentLesson.id,
                    speakerIndex: idx % 2,
                    accent: currentLesson.accent,
                  });
                }
              }}
              onResetProgress={() => {
                setCompletedSentences({});
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                addToast({
                  type: "info",
                  title: "Đã đặt lại tiến độ bài học này ↺",
                });
              }}
              recommendedLessons={lessonsList
                .filter((l) => l.id !== currentLesson.id)
                .slice(0, 5)}
              onSelectLesson={handleSelectLesson}
              onShuffleRecommendations={() => {
                setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
                addToast({
                  type: "info",
                  title: "Đã làm mới danh sách gợi ý bài học! ↺",
                });
              }}
            />
          )}
        </>
      )}

      {/* 3. MODALS */}
      <DeepDictionaryModal
        selectedWord={selectedWord}
        onClose={() => setSelectedWord(null)}
        lessonId={currentLesson?.id}
      />

      <SentenceReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        sentenceIndex={currentSentenceIndex}
        onSubmit={handleSubmitReport}
      />

      <LessonExplorerModal
        isOpen={showLessonModal}
        onClose={() => setShowLessonModal(false)}
        lessonsList={lessonsList}
        selectedLessonId={selectedLessonId}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}

export default function ShadowingPage() {
  return (
    <Suspense fallback={<ShadowingListingSkeleton />}>
      <ShadowingStudioContent />
    </Suspense>
  );
}
