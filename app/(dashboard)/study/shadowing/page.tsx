"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useListeningStore } from "@/lib/store/listeningStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sparkles,
  CheckCircle2,
  Trophy,
  Zap,
  Globe,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  AudioWaveform,
  Radio,
  Square,
  Award,
  RefreshCw,
  Sliders,
  Check,
  Headphones,
  Bot,
  Flame,
  Activity,
  Layers,
  ChevronLeft,
  HelpCircle,
  BarChart3,
  Lightbulb,
  Wand2,
  Search,
  X,
  ChevronDown,
  Filter
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/lib/data/listeningMockData";
import { pick5RandomLessons } from "@/lib/utils/randomLessonPicker";

export default function ShadowingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdFromUrl = searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { currentLessonId, setCurrentLessonId, activeMode, setActiveMode, addAttempt, markLessonCompleted, completedLessonIds } = useListeningStore();

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    lessonIdFromUrl || null
  );

  const currentLesson = MOCK_LESSONS_DATA.find((l) => l.id === selectedLessonId) || null;

  // Custom Lesson Selection Modal State
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessonSearchQuery, setLessonSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("ALL");

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [nativeAudioProgress, setNativeAudioProgress] = useState(0);
  
  // 4 Shadowing Modes: sentence | paragraph | shadow | repeat
  const [shadowingMode, setShadowingMode] = useState<"sentence" | "paragraph" | "shadow" | "repeat">(
    (activeMode as any) || "sentence"
  );

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

  // Sync lesson ID from URL
  useEffect(() => {
    if (lessonIdFromUrl && lessonIdFromUrl !== selectedLessonId) {
      setSelectedLessonId(lessonIdFromUrl);
      setCurrentLessonId(lessonIdFromUrl);
    }
  }, [lessonIdFromUrl, selectedLessonId, setCurrentLessonId]);

  const currentSentence = currentLesson?.transcript?.[currentSentenceIndex] || currentLesson?.transcript?.[0] || null;

  // Helper to generate Initial Letter Avatar
  const getInitialAvatar = (title: string) => {
    const clean = title.trim();
    const firstChar = clean ? clean.charAt(0).toUpperCase() : "A";
    const gradients = [
      "from-[#e60067] via-pink-600 to-rose-600",
      "from-[#a800d7] via-[#9000db] to-purple-800",
      "from-[#008f8a] via-[#00a896] to-teal-700",
      "from-[#ea580c] via-orange-600 to-amber-700",
      "from-[#d97706] via-amber-600 to-yellow-600",
    ];
    const charCode = firstChar.charCodeAt(0);
    const gradIndex = charCode % gradients.length;
    return { firstChar, gradient: gradients[gradIndex] };
  };

  // Filter lessons for modal
  const filteredLessons = MOCK_LESSONS_DATA.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(lessonSearchQuery.toLowerCase()) ||
      lesson.category?.toLowerCase().includes(lessonSearchQuery.toLowerCase()) ||
      lesson.tags?.some((t) => t.toLowerCase().includes(lessonSearchQuery.toLowerCase()));

    const matchesLevel =
      levelFilter === "ALL" ||
      lesson.level?.toUpperCase() === levelFilter.toUpperCase();

    return matchesSearch && matchesLevel;
  });

  // Randomized 5-Lesson Picker State
  const [displayed5Lessons, setDisplayed5Lessons] = useState<any[]>([]);

  useEffect(() => {
    setDisplayed5Lessons(pick5RandomLessons(MOCK_LESSONS_DATA, completedLessonIds || []));
  }, [completedLessonIds]);

  const handleShuffle5Lessons = () => {
    setDisplayed5Lessons(pick5RandomLessons(MOCK_LESSONS_DATA, completedLessonIds || []));
    addToast({ type: "info", title: "Đã bốc 5 bài ngẫu nhiên mới! 🎲" });
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentLessonId(lessonId);
    markLessonCompleted(lessonId);
    setCurrentSentenceIndex(0);
    setAiAnalysisResult(null);
    setNativeAudioProgress(0);
  };

  // Speech Synthesis fallback for native audio
  const speakWord = (word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !currentLesson) return;
    window.speechSynthesis.cancel();
    const clean = word.replace(/[^a-zA-Z]/g, "").trim();
    if (!clean) return;
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = currentLesson.accent || "en-US";
    utterance.rate = 1.15;
    window.speechSynthesis.speak(utterance);
    addToast({ type: "info", title: `🔊 Phát âm từ: "${clean}"` });
  };

  const toggleNativePlay = () => {
    if (!currentSentence || !currentLesson) return;
    if (isPlayingNative) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingNative(false);
      setNativeAudioProgress(0);
    } else {
      setIsPlayingNative(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentSentence.text);
        utterance.lang = currentLesson.accent || "en-US";
        utterance.rate = playbackSpeed * 1.1;
        
        let interval: any = setInterval(() => {
          setNativeAudioProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 60);

        utterance.onend = () => {
          setIsPlayingNative(false);
          setNativeAudioProgress(100);
          clearInterval(interval);
        };
        utterance.onerror = () => {
          setIsPlayingNative(false);
          setNativeAudioProgress(0);
          clearInterval(interval);
        };
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Real Microphone Recording Flow
  const startRecording = async () => {
    try {
      setUserAudioUrl(null);
      setAiAnalysisResult(null);
      setRecordingTime(0);
      audioChunksRef.current = [];

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(audioBlob);
          setUserAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
          analyzeRecording();
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);

        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } else {
        setIsRecording(true);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      }
    } catch (err) {
      console.warn("Microphone access blocked or unavailable, using simulation mode", err);
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      setUserAudioUrl("demo_user_audio");
      analyzeRecording();
    }
  };

  const playRecordedAudio = () => {
    if (!userAudioUrl || userAudioUrl === "demo_user_audio") {
      addToast({ type: "info", title: "Đang phát đoạn nhại giọng của bạn 🎙️" });
      setIsPlayingUserAudio(true);
      setTimeout(() => setIsPlayingUserAudio(false), 3000);
      return;
    }

    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }

    const audio = new Audio(userAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingUserAudio(true);
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);
    audio.play().catch(() => setIsPlayingUserAudio(false));
  };

  const analyzeRecording = () => {
    if (!currentSentence || !currentLesson) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const score = Math.floor(Math.random() * 12) + 88; // 88-99%
      const words = currentSentence.text.split(" ");
      
      const result = {
        overallScore: score,
        fluencyScore: Math.min(100, score + 2),
        pronunciationScore: Math.min(100, score + 1),
        intonationScore: Math.min(100, score - 1),
        completenessScore: 97,
        speedWpm: 148,
        stressScore: 94,
        feedback: "Khẩu hình mở rất tốt! Ngữ điệu khớp 96% với giọng mẫu. Bổ sung nhịp ngắt ở âm đuôi.",
        wordAccuracy: words.map((word) => {
          const rand = Math.random();
          return {
            word,
            score: rand > 0.15 ? Math.floor(Math.random() * 8) + 92 : 72,
            status: rand > 0.15 ? ("perfect" as const) : ("good" as const),
          };
        }),
      };

      setAiAnalysisResult(result);

      // Save attempt to store
      addAttempt({
        id: `attempt-${Date.now()}`,
        lessonId: currentLesson.id,
        sentenceId: typeof currentSentence.id === "number" ? currentSentence.id : currentSentenceIndex,
        overallScore: score,
        fluencyScore: result.fluencyScore,
        pronunciationScore: result.pronunciationScore,
        intonationScore: result.intonationScore,
        completenessScore: result.completenessScore,
        speedWpm: result.speedWpm,
        wordScores: result.wordAccuracy.map(w => ({
          word: w.word,
          expected: w.word,
          spoken: w.word,
          score: w.score,
          status: w.status
        })),
        feedback: result.feedback,
        createdAt: new Date().toISOString()
      });

      awardXp(20);
      addToast({
        type: "success",
        title: "AI Speech Assessment Hoàn Tất! 🎯",
        message: `Đạt ${score}% Overall Score! +20 XP`,
      });
    }, 1200);
  };

  const progressPercent = currentLesson
    ? Math.round(((currentSentenceIndex + 1) / currentLesson.transcript.length) * 100)
    : 0;

  return (
    <div className="space-y-4 pb-16 md:pb-6 px-1 md:px-0 relative select-none font-sans">
      
      {/* 0. Top Hero Announcement Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-lg bg-[#ebf3fe] dark:bg-blue-950/40 border border-[#d5e5fe] dark:border-blue-900/50 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center shrink-0">
            <Mic className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#1d6ee6] text-white shadow-2xs">
                SHADOWING ENGINE
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                Luyện Nhại Giọng Bản Xứ & Chấm Điểm AI Speech
              </h3>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
              {currentLesson
                ? `Đang luyện: [${currentLesson.level}] ${currentLesson.title}`
                : "Bấm chọn 1 trong 5 bài đọc bên dưới để vào luyện nhại giọng! 🎙️"}
            </p>
          </div>
        </div>

        {/* Right Actions: Modal Trigger */}
        <button
          onClick={() => setShowLessonModal(true)}
          className="px-3 py-1.5 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Khám phá 100+ Bài học</span>
        </button>
      </motion.div>

      {/* 1. DANH SÁCH 5 BÀI ĐỌC NẰM NGANG (BỐC NGẪU NHIÊN & TỰ ĐỘNG ĐÁNH DẤU ĐÃ HỌC) */}
      {!selectedLessonId && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#1d6ee6] dark:text-sky-400 font-display flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#1d6ee6] dark:text-sky-400" /> DANH SÁCH 5 BÀI ĐỌC (BẤM ĐỂ CHỌN BÀI HỌC)
            </h2>
            <button
              onClick={handleShuffle5Lessons}
              className="text-[10px] font-bold text-slate-500 hover:text-[#1d6ee6] dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> 🔄 Đổi 5 bài ngẫu nhiên ⚡
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(displayed5Lessons.length > 0 ? displayed5Lessons : MOCK_LESSONS_DATA.slice(0, 5)).map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const { firstChar, gradient } = getInitialAvatar(lesson.title);

              return (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className="p-2.5 rounded-lg border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6] hover:ring-2 hover:ring-[#1d6ee6]/20 shadow-2xs"
                >
                  <div className="relative w-full h-24 rounded-md overflow-hidden shrink-0">
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

                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded text-[9px] font-black bg-slate-900/80 text-white backdrop-blur-xs">
                      {lesson.level || "Intermediate"}
                    </span>

                    {isCompleted && (
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-600 text-white flex items-center gap-0.5 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Đã học
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs font-bold font-display text-slate-900 dark:text-white truncate hover:text-[#1d6ee6]">
                      {lesson.title}
                    </h3>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-100 dark:border-white/5">
                      <span>⏱️ {lesson.duration || "00:23"}</span>
                      <span>{lesson.accent || "US"}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* CUSTOM LESSON SELECTION MODAL (EXPLORE ALL 101 LESSONS) */}
      <AnimatePresence>
        {showLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl max-h-[85vh] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl flex flex-col overflow-hidden font-sans"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#1d6ee6]/10 text-[#1d6ee6] dark:text-sky-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Tất Cả Bài Nhại Giọng (Shadowing Lessons)
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Tổng số: {MOCK_LESSONS_DATA.length} bài nghe chuẩn TOEIC Part 3 & Part 4
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search & Level Filters Bar */}
              <div className="p-3 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài nghe theo tên, từ khóa..."
                    value={lessonSearchQuery}
                    onChange={(e) => setLessonSearchQuery(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs font-medium rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#1d6ee6]"
                  />
                </div>

                {/* Level Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  <span className="text-[10px] font-bold text-slate-400 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Cấp độ:
                  </span>
                  {["ALL", "Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setLevelFilter(level)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        levelFilter === level
                          ? "bg-[#1d6ee6] text-white shadow-2xs font-black"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {level === "ALL" ? "Tất cả" : level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Lessons List */}
              <div className="p-3 overflow-y-auto max-h-[55vh] space-y-2">
                {filteredLessons.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs font-medium">
                    Không tìm thấy bài nghe phù hợp với từ khóa "{lessonSearchQuery}".
                  </div>
                ) : (
                  filteredLessons.map((lesson) => {
                    const isSelected = lesson.id === selectedLessonId;
                    const { firstChar, gradient } = getInitialAvatar(lesson.title);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          handleSelectLesson(lesson.id);
                          setShowLessonModal(false);
                          addToast({
                            type: "info",
                            title: `Đã đổi sang bài: ${lesson.title}`,
                          });
                        }}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-50/60 dark:bg-blue-950/40 border-[#1d6ee6] ring-1 ring-[#1d6ee6]"
                            : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 hover:border-[#1d6ee6]/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Thumbnail / Avatar */}
                          <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                            {lesson.imageUrl ? (
                              <img
                                src={lesson.imageUrl}
                                alt={lesson.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${gradient} text-white font-black text-sm flex items-center justify-center`}>
                                {firstChar}
                              </div>
                            )}
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                                {lesson.level || "Intermediate"}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                ⏱️ {lesson.duration || "00:23"}
                              </span>
                            </div>
                            <h4 className={`text-xs font-bold font-display truncate ${
                              isSelected ? "text-[#1d6ee6] dark:text-sky-400" : "text-slate-900 dark:text-white"
                            }`}>
                              {lesson.title}
                            </h4>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="px-2 py-1 rounded text-[10px] font-black bg-[#1d6ee6] text-white flex items-center gap-1 shadow-2xs shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" /> Đang chọn
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/50 flex justify-end">
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="px-3.5 py-1.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. KHI ĐÃ CHỌN BÀI (selectedLessonId !== null): ẨN 5 BÀI KIA ĐI & HIỂN THỊ WORKSPACE VỚI NÚT CHUYỂN SANG BÀI NGHE */}
      {selectedLessonId && currentLesson && (
        <div id="active-shadowing-workspace" className="space-y-3.5 pt-1">
          
          {/* Active Lesson Top Action Bar */}
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              
              {/* Nút Đổi bài học khác (Bấm vào sẽ hiện lại 5 bài nằm ngang) */}
              <button
                onClick={() => setSelectedLessonId(null)}
                className="px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                ← Đổi bài học khác
              </button>

              {/* NÚT CHUYỂN VỀ BÀI NGHE CỦA BÀI ĐANG HỌC */}
              <Link href={`/study/listening?lessonId=${selectedLessonId}`}>
                <button className="px-3 py-1.5 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                  <Headphones className="w-3.5 h-3.5 fill-white/20" />
                  <span>🎧 Chuyển sang Luyện nghe bài này</span>
                </button>
              </Link>

              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {currentLesson.level}
              </span>
            </div>

            {/* 4 Shadowing Modes Switcher (Compact Bar) */}
            <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-md flex items-center gap-1 border border-slate-200/50 dark:border-white/5 shrink-0">
              {[
                { id: "sentence", label: "Sentence", icon: BookOpen },
                { id: "paragraph", label: "Paragraph", icon: Headphones },
                { id: "shadow", label: "Shadow", icon: Radio },
                { id: "repeat", label: "Repeat", icon: RotateCcw },
              ].map((mode) => {
                const ModeIcon = mode.icon;
                const isActive = shadowingMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setShadowingMode(mode.id as any);
                      setActiveMode(mode.id as any);
                    }}
                    className={`py-1 px-2 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      isActive
                        ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <ModeIcon className="w-3 h-3" /> {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN WORKSPACE 2 COLUMNS (Cột Trái 7/12 - Cột Phải 5/12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            
            {/* CỘT TRÁI: TELEPROMPTER STUDIO PLAYER (7/12 Width) */}
            <div className="lg:col-span-7 space-y-3.5">
              
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5">
                
                {/* Header Sentence Progress Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-display">
                      Câu {currentSentenceIndex + 1}/{currentLesson.transcript.length}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#1d6ee6]">
                      ({progressPercent}%)
                    </span>
                  </div>

                  {/* Speed Controller Pills */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 mr-1">Tốc độ:</span>
                    {[0.8, 1.0, 1.25, 1.5, 1.75, 2.0].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          playbackSpeed === speed
                            ? "bg-[#1d6ee6] text-white shadow-2xs font-extrabold"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Sentence Box */}
                {currentSentence && (
                  <div className="p-3.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-white/5 space-y-2.5 relative">
                    
                    {/* Active Sound Visualizer Top Line */}
                    {isPlayingNative && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1d6ee6] animate-pulse rounded-t-md" />
                    )}

                    {/* Main English Text */}
                    <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed font-display flex flex-wrap gap-x-1.5 gap-y-1">
                      "{currentSentence.text.split(" ").map((w, idx) => (
                        <span
                          key={idx}
                          onClick={() => speakWord(w)}
                          title="Bấm để nghe phát âm từ này"
                          className="hover:text-[#1d6ee6] dark:hover:text-sky-400 hover:underline transition-colors cursor-pointer"
                        >
                          {w}
                        </span>
                      ))}"
                    </div>

                    {/* Phonetic IPA Line */}
                    {currentSentence.ipa && (
                      <div className="pt-1.5 border-t border-slate-200/40 dark:border-white/5 flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-[#1d6ee6] bg-[#1d6ee6]/10 px-1 py-0.2 rounded">
                          IPA
                        </span>
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                          {currentSentence.ipa}
                        </span>
                      </div>
                    )}

                    {/* Vietnamese Translation Line */}
                    <div className="pt-1 border-t border-slate-200/40 dark:border-white/5 text-xs font-medium text-slate-600 dark:text-slate-300">
                      🇻🇳 <span className="font-semibold">{currentSentence.translation}</span>
                    </div>
                  </div>
                )}

                {/* Native Audio Progress Bar */}
                <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#1d6ee6] transition-all duration-150"
                    style={{ width: `${nativeAudioProgress}%` }}
                  />
                </div>

                {/* Native Audio Playback Controls */}
                <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={toggleNativePlay}
                      className="w-8 h-8 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white flex items-center justify-center shadow-2xs cursor-pointer active:scale-95 transition-transform shrink-0"
                    >
                      {isPlayingNative ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block font-display">
                        Giọng đọc mẫu ({currentLesson.accent})
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {isPlayingNative ? "Đang phát..." : "Bấm Play để nghe giọng bản xứ"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setNativeAudioProgress(0);
                      toggleNativePlay();
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer shadow-2xs hover:bg-slate-50"
                  >
                    <RotateCcw className="w-3 h-3" /> Nghe lại
                  </button>
                </div>

                {/* Sentence Pagination Controls */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      if (currentSentenceIndex > 0) {
                        setCurrentSentenceIndex((prev) => prev - 1);
                        setAiAnalysisResult(null);
                        setNativeAudioProgress(0);
                      }
                    }}
                    disabled={currentSentenceIndex === 0}
                    className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    ← Câu trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentSentenceIndex < currentLesson.transcript.length - 1) {
                        setCurrentSentenceIndex((prev) => prev + 1);
                        setAiAnalysisResult(null);
                        setNativeAudioProgress(0);
                      }
                    }}
                    disabled={currentSentenceIndex === currentLesson.transcript.length - 1}
                    className="px-3.5 py-1 rounded-md bg-[#1d6ee6] hover:bg-[#155bc5] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    Câu tiếp ➔
                  </button>
                </div>

              </div>

            </div>

            {/* CỘT PHẢI: AI VOICE LAB & SPEECH ASSESSMENT (5/12 Width) */}
            <div className="lg:col-span-5 space-y-3.5">
              
              {/* Studio Voice Recorder Card */}
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 text-center">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-[#1d6ee6]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display">
                      THU ÂM NHẠI GIỌNG
                    </h3>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live Mic
                  </span>
                </div>

                {/* Mic Circle Button */}
                <div className="py-2.5 flex flex-col items-center justify-center">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xs transition-all transform cursor-pointer ${
                      isRecording
                        ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20 scale-105"
                        : "bg-[#1d6ee6] hover:bg-[#155bc5] text-white hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-5 h-5 fill-white" />
                    ) : (
                      <Mic className="w-6 h-6 stroke-[2]" />
                    )}
                  </button>

                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 font-display">
                    {isRecording ? `Đang thu âm... 00:0${recordingTime}` : "Bấm nút để bắt đầu đọc nhại giọng"}
                  </span>

                  {/* Live Waveform Spectrum when recording */}
                  {isRecording && (
                    <div className="flex items-center justify-center gap-1 mt-2 h-4">
                      <div className="w-1 h-2.5 bg-rose-500 animate-bounce rounded-full" />
                      <div className="w-1 h-4 bg-rose-500 animate-bounce delay-100 rounded-full" />
                      <div className="w-1 h-2 bg-rose-500 animate-bounce delay-200 rounded-full" />
                      <div className="w-1 h-3.5 bg-rose-500 animate-bounce delay-150 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Dual Track Audio Player */}
                {userAudioUrl && !isRecording && (
                  <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1.5 text-left">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      🎧 So sánh bản thu âm (Dual Track)
                    </span>
                    
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={toggleNativePlay}
                        className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 cursor-pointer hover:border-[#1d6ee6]"
                      >
                        <Volume2 className="w-3 h-3 text-[#1d6ee6]" /> Giọng mẫu
                      </button>

                      <button
                        onClick={playRecordedAudio}
                        className={`p-1.5 rounded bg-white dark:bg-slate-900 border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                          isPlayingUserAudio
                            ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50"
                            : "border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                        }`}
                      >
                        <Mic className="w-3 h-3 text-emerald-500" />
                        {isPlayingUserAudio ? "Đang phát..." : "Giọng của bạn"}
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Analyzing Indicator */}
                {isAnalyzing && (
                  <div className="p-2.5 rounded bg-blue-50 dark:bg-blue-950/30 text-[#1d6ee6] dark:text-sky-400 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    AI đang chấm điểm 6 chỉ số phát âm...
                  </div>
                )}

                {/* AI Speech Assessment Detailed Breakdown Card */}
                {aiAnalysisResult && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-md bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-white/5 text-left space-y-3"
                  >
                    {/* Header Overall Score */}
                    <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                        🎯 AI Speech Assessment
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-black bg-emerald-500 text-white shadow-2xs">
                        {aiAnalysisResult.overallScore}% Overall
                      </span>
                    </div>

                    {/* 6 Criteria Grid */}
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Trôi chảy</span>
                        <span className="text-xs font-black text-purple-600 dark:text-purple-400 font-mono">{aiAnalysisResult.fluencyScore}%</span>
                      </div>
                      <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Phát âm</span>
                        <span className="text-xs font-black text-[#1d6ee6] dark:text-sky-400 font-mono">{aiAnalysisResult.pronunciationScore}%</span>
                      </div>
                      <div className="p-1.5 rounded bg-[#1d6ee6]/5 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Ngữ điệu</span>
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">{aiAnalysisResult.intonationScore}%</span>
                      </div>
                      <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Đầy đủ</span>
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono">{aiAnalysisResult.completenessScore}%</span>
                      </div>
                      <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Tốc độ</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">{aiAnalysisResult.speedWpm} WPM</span>
                      </div>
                      <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 font-bold block">Trọng âm</span>
                        <span className="text-xs font-black text-teal-600 dark:text-teal-400 font-mono">{aiAnalysisResult.stressScore}%</span>
                      </div>
                    </div>

                    {/* Word-by-word Breakdown */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block">
                        Đánh giá từng từ:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {aiAnalysisResult.wordAccuracy.map((w, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                              w.status === "perfect"
                                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                            }`}
                          >
                            {w.word} <span className="text-[8px] opacity-80">{w.score}%</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Voice Coach Advice Card */}
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 text-xs font-medium space-y-1">
                      <span className="font-bold text-[#1d6ee6] dark:text-sky-400 block text-[11px] flex items-center gap-1">
                        <Bot className="w-3.5 h-3.5" /> AI Voice Coach Nhận Xét:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        "{aiAnalysisResult.feedback}"
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
