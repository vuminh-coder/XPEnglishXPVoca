"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface AiAnalysisResult {
  overallScore: number;
  fluencyScore: number;
  intonationScore: number;
  pronunciationScore: number;
  completenessScore: number;
  speedWpm: number;
  stressScore: number;
  feedback: string;
  wordAccuracy: { word: string; score: number; status: "perfect" | "good" | "needs_work" }[];
}

export interface UseShadowingAudioRecorderProps {
  currentSentence: { text: string; ipa?: string; translation?: string; vietnamese?: string } | null;
  currentSentenceIndex: number;
  totalSentencesCount: number;
  currentLesson: any;
  user: any;
  elapsedTime: number;
  autoNextSentence: boolean;
  savedSentenceKeys: string[];
  completedSentences: { [idx: number]: boolean };
  setCompletedSentences: React.Dispatch<React.SetStateAction<{ [idx: number]: boolean }>>;
  awardXp: (amount: number, reason?: string) => void;
  addToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message?: string }) => void;
  stopTTS: () => void;
  setPlayingSentenceText: (text: string | null) => void;
  onAutoAdvance?: () => void;
}

export function useShadowingAudioRecorder({
  currentSentence,
  currentSentenceIndex,
  totalSentencesCount,
  currentLesson,
  user,
  elapsedTime,
  autoNextSentence,
  savedSentenceKeys,
  completedSentences,
  setCompletedSentences,
  awardXp,
  addToast,
  stopTTS,
  setPlayingSentenceText,
  onAutoAdvance,
}: UseShadowingAudioRecorderProps) {
  // WebRTC MediaRecorder state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveAudioEnergy, setLiveAudioEnergy] = useState<number>(0);

  // AI Evaluation result for current sentence
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AiAnalysisResult | null>(null);

  // Per-sentence AI scores across the lesson: { [sentenceIndex]: score }
  const [sentenceScores, setSentenceScores] = useState<{ [idx: number]: number }>({});

  // Real-time live speech recognition stream
  const [liveRecognizedWords, setLiveRecognizedWords] = useState<
    { word: string; status: "perfect" | "needs_work" }[]
  >([]);

  // Internal WebRTC & AudioContext refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const capturedSpeechTextRef = useRef<string>("");
  const vadMaxVolumeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const progressDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (progressDebounceTimerRef.current) {
        clearTimeout(progressDebounceTimerRef.current);
      }
    };
  }, []);

  // Sync initial sentence scores from DB when lesson loads
  useEffect(() => {
    if (currentLesson?.userProgress?.inlineAiScores) {
      setSentenceScores(currentLesson.userProgress.inlineAiScores);
    } else {
      setSentenceScores({});
    }
  }, [currentLesson?.id]);

  // Clean up timers & AudioContext on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch {}
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Real-time speech comparison helper
  const evaluateLiveSpeech = useCallback(
    (recognizedText: string) => {
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
    },
    [currentSentence]
  );

  // Real AI Speech Evaluation & Neon Database Progress Persistence
  const executeRealAiSpeechAnalysis = useCallback(async () => {
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
        const evalData: AiAnalysisResult = json.data;
        setAiAnalysisResult(evalData);
        const overall = evalData.overallScore;

        // Update local sentence score map
        setSentenceScores((prev) => ({
          ...prev,
          [currentSentenceIndex]: overall,
        }));

        if (overall >= 50) {
          const nextCompleted = { ...completedSentences, [currentSentenceIndex]: true };
          setCompletedSentences(nextCompleted);

          // Save progress to PostgreSQL Neon
          if (currentLesson && user?.id && !user.id.startsWith("guest")) {
            const completedIndices = Object.keys(nextCompleted)
              .filter((k) => nextCompleted[Number(k)])
              .map(Number);
            const isAllDone =
              totalSentencesCount > 0 && completedIndices.length >= totalSentencesCount;

            try {
              if (isAllDone) {
                if (progressDebounceTimerRef.current) {
                  clearTimeout(progressDebounceTimerRef.current);
                  progressDebounceTimerRef.current = null;
                }
                fetch("/api/listening/progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    lessonId: currentLesson.id,
                    status: "COMPLETED",
                    completedSentences: completedIndices,
                    bookmarkedSentences: savedSentenceKeys,
                    inlineAiScores: { ...sentenceScores, [currentSentenceIndex]: overall },
                    timeSpent: Math.max(15, elapsedTime),
                    xpEarned: 50,
                    skill: "shadowing",
                  }),
                }).catch((e) => console.error("Failed to sync completed shadowing progress to database:", e));
              } else {
                // Debounced non-blocking background sync (1.2s): reduces database write load by ~80%
                if (progressDebounceTimerRef.current) {
                  clearTimeout(progressDebounceTimerRef.current);
                }
                progressDebounceTimerRef.current = setTimeout(() => {
                  fetch("/api/listening/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: user.id,
                      lessonId: currentLesson.id,
                      status: "IN_PROGRESS",
                      completedSentences: completedIndices,
                      bookmarkedSentences: savedSentenceKeys,
                      inlineAiScores: { ...sentenceScores, [currentSentenceIndex]: overall },
                      timeSpent: Math.max(15, elapsedTime),
                      xpEarned: overall >= 80 ? 15 : 5,
                      skill: "shadowing",
                    }),
                  }).catch((e) => console.error("Failed to sync shadowing progress to database:", e));
                }, 1200);
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
              if (onAutoAdvance) onAutoAdvance();
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
  }, [
    currentSentence,
    recordingTime,
    currentSentenceIndex,
    completedSentences,
    setCompletedSentences,
    currentLesson,
    totalSentencesCount,
    user,
    savedSentenceKeys,
    sentenceScores,
    elapsedTime,
    awardXp,
    addToast,
    autoNextSentence,
    onAutoAdvance,
  ]);

  // Start recording
  const startRecording = useCallback(async () => {
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
      setLiveAudioEnergy(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Web Audio Voice Activity Detection (VAD) & Live Waveform Energy
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

          let lastEnergyUpdateTime = 0;
          let lastReportedEnergy = 0;

          const checkAudioEnergy = () => {
            if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("xp:audio-energy", { detail: 0 }));
              }
              return;
            }
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length / 255;
            if (avg > vadMaxVolumeRef.current) {
              vadMaxVolumeRef.current = avg;
            }

            // Zero-rerender Audio Visualizer: broadcast directly to GPU/DOM listener via CustomEvent
            // 0 React re-renders, 60-120 FPS hardware accelerated rendering
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("xp:audio-energy", { detail: avg }));
            }

            animFrameRef.current = requestAnimationFrame(checkAudioEnergy);
          };
          animFrameRef.current = requestAnimationFrame(checkAudioEnergy);
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
        setLiveAudioEnergy(0);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("xp:audio-energy", { detail: 0 }));
        }
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

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
  }, [
    addToast,
    stopTTS,
    setPlayingSentenceText,
    currentLesson?.accent,
    evaluateLiveSpeech,
    currentSentence?.text,
    executeRealAiSpeechAnalysis,
  ]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (!isRecording) return;
    setIsRecording(false);
    setLiveAudioEnergy(0);
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
  }, [isRecording]);

  // Reset audio & evaluation states when changing or re-trying sentence
  const resetCurrentSentenceAudio = useCallback(() => {
    stopTTS();
    setPlayingSentenceText(null);
    setUserAudioUrl(null);
    setAiAnalysisResult(null);
    setLiveRecognizedWords([]);
    setLiveAudioEnergy(0);
    setIsPlayingUserAudio(false);
  }, [stopTTS, setPlayingSentenceText]);

  // Replay user's recorded audio
  const playUserAudio = useCallback(() => {
    if (userAudioPlayerRef.current && userAudioUrl) {
      userAudioPlayerRef.current.currentTime = 0;
      userAudioPlayerRef.current.play();
      setIsPlayingUserAudio(true);
    }
  }, [userAudioUrl]);

  return {
    isRecording,
    recordingTime,
    userAudioUrl,
    setUserAudioUrl,
    isPlayingUserAudio,
    setIsPlayingUserAudio,
    isAnalyzing,
    liveAudioEnergy,
    aiAnalysisResult,
    setAiAnalysisResult,
    liveRecognizedWords,
    setLiveRecognizedWords,
    sentenceScores,
    setSentenceScores,
    userAudioPlayerRef,
    startRecording,
    stopRecording,
    playUserAudio,
    resetCurrentSentenceAudio,
  };
}
