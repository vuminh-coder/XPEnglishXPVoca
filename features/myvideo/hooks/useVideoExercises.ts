"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { YouTubeVideoItem } from "@/stores/videoStore";

export interface UseVideoExercisesProps {
  activeVideo: YouTubeVideoItem | null;
  activeSubIndex: number;
  jumpToSubtitleIndex: (index: number) => void;
  updateProgress: (id: string, progress: number) => void;
  awardXp: (amount: number) => void;
  addToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message: string }) => void;
}

export function useVideoExercises({
  activeVideo,
  activeSubIndex,
  jumpToSubtitleIndex,
  updateProgress,
  awardXp,
  addToast,
}: UseVideoExercisesProps) {
  // Dictation Exercise State
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [dictationInput, setDictationInput] = useState("");
  const [dictationAnswered, setDictationAnswered] = useState(false);
  const [dictationCorrect, setDictationCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Shadowing Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [shadowingScore, setShadowingScore] = useState<number | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([40, 65, 30, 85, 50, 95, 70, 45, 60]);
  const speechRecognitionRef = useRef<any>(null);
  const recordedTranscriptRef = useRef<string>("");

  // Waveform animation during recording
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setWaveformBars(
          Array.from({ length: 9 }, () => Math.floor(Math.random() * 70) + 30)
        );
      }, 120);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Dictation Check Answer
  const handleCheckDictation = useCallback(() => {
    if (!activeVideo || dictationAnswered) return;
    const currentSub = activeVideo.subtitles[currentSubIndex];
    if (!currentSub) return;

    const userClean = dictationInput.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetClean = currentSub.dictationWord.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const isRight = userClean === targetClean;

    setDictationAnswered(true);
    setDictationCorrect(isRight);

    if (isRight) {
      awardXp(20);
      const newProgress = Math.round(((currentSubIndex + 1) / activeVideo.subtitles.length) * 100);
      updateProgress(activeVideo.id, newProgress);
      addToast({
        type: "success",
        title: "Chính xác! +20 XP",
        message: `Bạn đã nghe đúng từ "${currentSub.dictationWord}"!`,
      });
    }
  }, [activeVideo, dictationAnswered, currentSubIndex, dictationInput, awardXp, updateProgress, addToast]);

  const handleNextDictation = useCallback(() => {
    if (!activeVideo) return;
    const nextIdx = currentSubIndex + 1;
    if (nextIdx < activeVideo.subtitles.length) {
      setDictationInput("");
      setDictationAnswered(false);
      setDictationCorrect(null);
      setShowHint(false);
      jumpToSubtitleIndex(nextIdx);
    } else {
      updateProgress(activeVideo.id, 100);
      addToast({
        type: "success",
        title: "Hoàn thành Dictation!",
        message: "Bạn đã hoàn thành toàn bộ bài chép chính tả cho video này!",
      });
    }
  }, [activeVideo, currentSubIndex, jumpToSubtitleIndex, updateProgress, addToast]);

  // Shadowing Toggle
  const toggleShadowingRecord = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
        speechRecognitionRef.current = null;
      }

      const targetSentence =
        activeVideo?.subtitles[activeSubIndex]?.textEn ||
        activeVideo?.subtitles[currentSubIndex]?.textEn ||
        "";

      const spoken = recordedTranscriptRef.current.trim();
      if (!spoken) {
        setShadowingScore(null);
        addToast({
          type: "warning",
          title: "Chưa ghi nhận giọng nói",
          message: "Hệ thống chưa nghe rõ giọng của bạn. Vui lòng đọc to hơn!",
        });
        return;
      }

      const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      const cleanTarget = targetSentence.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
      const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

      let matchedCount = 0;
      for (const sw of spokenWords) {
        if (targetWords.includes(sw)) matchedCount++;
      }

      const wordAccuracy = targetWords.length > 0 ? matchedCount / targetWords.length : 0;
      const lengthRatio =
        targetWords.length > 0
          ? Math.max(0, 1 - Math.abs(spokenWords.length - targetWords.length) / targetWords.length)
          : 0;

      const calculatedScore = Math.min(
        100,
        Math.max(25, Math.round((wordAccuracy * 0.7 + lengthRatio * 0.3) * 100))
      );

      setShadowingScore(calculatedScore);
      const xpEarned = calculatedScore >= 70 ? 15 : 5;
      awardXp(xpEarned);
      addToast({
        type: calculatedScore >= 70 ? "success" : "info",
        title: `Phát âm đạt ${calculatedScore}%! (+${xpEarned} XP)`,
        message: `Bạn vừa đọc: "${spoken}". ${
          calculatedScore >= 70 ? "Rất chuẩn xác!" : "Hãy luyện tập thêm để đọc mượt hơn!"
        }`,
      });
    } else {
      recordedTranscriptRef.current = "";
      setShadowingScore(null);

      if (typeof window !== "undefined") {
        const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (SpeechRec) {
          try {
            const rec = new SpeechRec();
            rec.lang = "en-US";
            rec.continuous = true;
            rec.interimResults = true;
            rec.onresult = (event: any) => {
              let finalTranscript = "";
              for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript + " ";
              }
              recordedTranscriptRef.current = finalTranscript.trim();
            };
            rec.start();
            speechRecognitionRef.current = rec;
          } catch (e) {}
        }
      }

      setIsRecording(true);
    }
  }, [isRecording, activeVideo, activeSubIndex, currentSubIndex, awardXp, addToast]);

  const resetExercises = useCallback(() => {
    setCurrentSubIndex(0);
    setDictationInput("");
    setDictationAnswered(false);
    setDictationCorrect(null);
    setShowHint(false);
    setShadowingScore(null);
  }, []);

  return {
    currentSubIndex,
    setCurrentSubIndex,
    dictationInput,
    setDictationInput,
    dictationAnswered,
    setDictationAnswered,
    dictationCorrect,
    setDictationCorrect,
    showHint,
    setShowHint,
    handleCheckDictation,
    handleNextDictation,
    isRecording,
    shadowingScore,
    waveformBars,
    toggleShadowingRecord,
    resetExercises,
  };
}
