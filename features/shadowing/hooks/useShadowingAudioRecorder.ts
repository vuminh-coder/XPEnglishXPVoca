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

// Normalized Levenshtein distance string similarity algorithm
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const maxLength = Math.max(s1.length, s2.length);
  const distance = track[s2.length][s1.length];
  return Math.max(0, (maxLength - distance) / maxLength);
}

// Common conversational filler words to ignore at the start of speech
const FILLER_WORDS = new Set(["um", "uh", "mh", "ah", "er", "oh"]);

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
    { word: string; status: "perfect" | "good" | "needs_work" | "active" | "unspoken"; score?: number }[]
  >([]);
  const [liveWordStatuses, setLiveWordStatuses] = useState<{
    [wordIdx: number]: "perfect" | "good" | "needs_work" | "active";
  }>({});
  const [activeSpeechWordIndex, setActiveSpeechWordIndex] = useState<number | null>(null);

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

  // Real-time progressive sequential speech alignment (Cursor tracking like Dictation)
  const evaluateLiveSpeech = useCallback(
    (recognizedText: string) => {
      if (!currentSentence?.text) return;
      const targetTokens = currentSentence.text.trim().split(/\s+/).filter(Boolean);
      const targetCleanWords = targetTokens.map((w) =>
        w.toLowerCase().replace(/[^a-z0-9]/g, "")
      );

      const spokenRawWords = recognizedText.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const spokenCleanWords = spokenRawWords
        .map((w) => w.replace(/[^a-z0-9]/g, ""))
        .filter(Boolean);

      if (spokenCleanWords.length === 0) {
        setLiveRecognizedWords([]);
        setLiveWordStatuses({});
        setActiveSpeechWordIndex(0);
        return;
      }

      // Filter out leading common conversational filler words unless target starts with them
      let startSpokenIdx = 0;
      while (
        startSpokenIdx < spokenCleanWords.length &&
        FILLER_WORDS.has(spokenCleanWords[startSpokenIdx]) &&
        !FILLER_WORDS.has(targetCleanWords[0])
      ) {
        startSpokenIdx++;
      }
      const effectiveSpoken = spokenCleanWords.slice(startSpokenIdx);

      const newStatuses: { [idx: number]: "perfect" | "good" | "needs_work" | "active" } = {};
      const newLiveWords: {
        word: string;
        status: "perfect" | "good" | "needs_work" | "active" | "unspoken";
        score?: number;
      }[] = [];

      let targetIdx = 0;
      let spokenIdx = 0;

      // Sequential cursor alignment: Evaluate word-by-word without jumping to the end
      while (targetIdx < targetCleanWords.length && spokenIdx < effectiveSpoken.length) {
        const tWord = targetCleanWords[targetIdx];
        const sWord = effectiveSpoken[spokenIdx];

        const sim = calculateSimilarity(tWord, sWord);

        if (sim >= 0.78) {
          newStatuses[targetIdx] = "perfect";
          targetIdx++;
          spokenIdx++;
        } else if (sim >= 0.55) {
          newStatuses[targetIdx] = "good";
          targetIdx++;
          spokenIdx++;
        } else {
          // Lookahead 1 word to detect skipped word or extra spoken sound/stutter
          const nextTargetWord = targetCleanWords[targetIdx + 1];
          const nextSpokenWord = effectiveSpoken[spokenIdx + 1];

          const simSkipTarget = nextTargetWord ? calculateSimilarity(nextTargetWord, sWord) : 0;
          const simStutterSpoken = nextSpokenWord ? calculateSimilarity(tWord, nextSpokenWord) : 0;

          if (simStutterSpoken >= 0.55) {
            // Extra filler/stutter in speech, skip spoken sound
            spokenIdx++;
          } else if (simSkipTarget >= 0.55) {
            // Speaker skipped targetIdx, mark as needs_work and advance target
            newStatuses[targetIdx] = "needs_work";
            targetIdx++;
          } else {
            // ANCHOR RULE: If spokenIdx is the last word in the current interim recognition stream,
            // the speaker is in the middle of pronouncing this word or Chrome is giving interim hypotheses.
            // DO NOT eagerly advance targetIdx! Anchor cursor at current target word so the speaker has time to speak.
            if (spokenIdx === effectiveSpoken.length - 1) {
              break;
            } else {
              // Speaker has clearly moved on to subsequent words, so mark as needs_work and advance
              newStatuses[targetIdx] = "needs_work";
              targetIdx++;
              spokenIdx++;
            }
          }
        }
      }

      // Current active cursor word (word currently being expected / spoken)
      const nextActiveIndex = targetIdx < targetCleanWords.length ? targetIdx : null;
      if (nextActiveIndex !== null) {
        newStatuses[nextActiveIndex] = "active";
      }

      // Build live tokens list
      for (let i = 0; i < targetTokens.length; i++) {
        const status = newStatuses[i] || (i === nextActiveIndex ? "active" : "unspoken");
        newLiveWords.push({
          word: targetTokens[i],
          status,
        });
      }

      setLiveWordStatuses(newStatuses);
      setActiveSpeechWordIndex(nextActiveIndex);
      setLiveRecognizedWords(newLiveWords);
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

        if (overall >= 80) {
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
                      xpEarned: 15,
                      skill: "shadowing",
                    }),
                  }).catch((e) => console.error("Failed to sync shadowing progress to database:", e));
                }, 1200);
              }
            } catch (e) {
              console.error("Failed to sync shadowing progress to database:", e);
            }
          }

          awardXp(15, "shadowing");
          addToast({
            type: "success",
            title: `Đã đạt - ${overall} điểm (+15 XP)`,
            message: `Chúc mừng bạn đã đạt chuẩn phát âm (${overall} điểm)! Đang chuyển sang câu tiếp theo...`,
          });

          // Tự động chuyển câu khi đạt chuẩn (>= 80)
          if (onAutoAdvance) {
            setTimeout(() => {
              onAutoAdvance();
            }, 1200);
          }
        } else {
          // Chưa đạt (< 80): Giữ nguyên câu đó
          if (completedSentences[currentSentenceIndex]) {
            const nextCompleted = { ...completedSentences };
            delete nextCompleted[currentSentenceIndex];
            setCompletedSentences(nextCompleted);
          }

          // Vẫn đồng bộ điểm inlineAiScores vào DB ở trạng thái IN_PROGRESS
          if (currentLesson && user?.id && !user.id.startsWith("guest")) {
            const completedIndices = Object.keys(completedSentences)
              .filter((k) => completedSentences[Number(k)])
              .map(Number);
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
                xpEarned: 0,
                skill: "shadowing",
              }),
            }).catch((e) => console.error("Failed to sync in-progress shadowing progress to database:", e));
          }

          addToast({
            type: "warning",
            title: `Chưa đạt - ${overall} điểm`,
            message: `Bạn đạt ${overall}/100 điểm (cần từ 80 điểm trở lên để qua câu). Vui lòng giữ nguyên câu và luyện phát âm lại nhé!`,
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
      setLiveWordStatuses({});
      setActiveSpeechWordIndex(0);
      capturedSpeechTextRef.current = "";
      vadMaxVolumeRef.current = 0;
      setLiveAudioEnergy(0);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
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
    setLiveWordStatuses({});
    setActiveSpeechWordIndex(null);
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
    liveWordStatuses,
    activeSpeechWordIndex,
    sentenceScores,
    setSentenceScores,
    userAudioPlayerRef,
    startRecording,
    stopRecording,
    playUserAudio,
    resetCurrentSentenceAudio,
  };
}
