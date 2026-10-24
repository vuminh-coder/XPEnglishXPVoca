"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { computeSimilarityScore } from "../utils/similarity";

interface UsePracticeSpeechProps {
  onSuccess?: (accuracy: number) => void;
  onFail?: (accuracy: number) => void;
}

export function usePracticeSpeech({ onSuccess, onFail }: UsePracticeSpeechProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  const resetSpeech = useCallback(() => {
    setTranscript("");
    setAccuracy(0);
    setIsCorrect(false);
    setIsAnswered(false);
    setSpeechError(null);
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }
  }, []);

  const startSpeaking = useCallback((targetWord: string) => {
    if (typeof window === "undefined") return;

    // Always clear the previous attempt so a retry never shows stale
    // "wrong answer" feedback while the microphone is listening again.
    setTranscript("");
    setAccuracy(0);
    setIsCorrect(false);
    setIsAnswered(false);
    setSpeechError(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // No fake pass: the learner can skip this word instead of earning XP without speaking.
      setIsListening(false);
      setSpeechError(
        "Trình duyệt chưa hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge, hoặc bấm Bỏ qua."
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      // Ignore events coming from a recognizer that has already been replaced/aborted.
      const isStale = () => recognitionRef.current !== recognition;

      recognition.onstart = () => {
        if (isStale()) return;
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        if (isStale()) return;
        const spokenText = event.results?.[0]?.[0]?.transcript || "";
        setTranscript(spokenText);
        const score = computeSimilarityScore(targetWord, spokenText);
        setAccuracy(score);
        const passed = score >= 60;
        setIsCorrect(passed);
        setIsAnswered(true);

        if (passed) {
          onSuccess?.(score);
        } else {
          onFail?.(score);
        }
      };

      recognition.onerror = (event: any) => {
        if (isStale()) return;
        setIsListening(false);
        if (event.error === "aborted") return;
        if (event.error === "no-speech") {
          setSpeechError("Không nghe thấy âm thanh. Vui lòng nói to & rõ hơn!");
        } else if (event.error === "not-allowed") {
          setSpeechError("Chưa cấp quyền Micro. Vui lòng mở quyền Micro trên trình duyệt!");
        } else {
          setSpeechError("Lỗi nhận diện âm thanh: " + event.error);
        }
      };

      recognition.onend = () => {
        if (isStale()) return;
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
      setSpeechError("Không thể khởi động micro. Vui lòng thử lại!");
    }
  }, [onSuccess, onFail]);

  /** Stop recording early; the recognizer still returns whatever it has captured. */
  const stopSpeaking = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
  }, []);

  return {
    isListening,
    transcript,
    accuracy,
    isCorrect,
    isAnswered,
    speechError,
    startSpeaking,
    stopSpeaking,
    resetSpeech,
    setIsAnswered,
    setIsCorrect,
    setAccuracy,
  };
}
