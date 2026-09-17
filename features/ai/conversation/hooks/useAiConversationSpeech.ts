"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { speakLessonText } from "@/shared/utils/ttsEngine";

interface UseAiConversationSpeechProps {
  soundEnabled: boolean;
  selectedTopicId: string;
}

export function useAiConversationSpeech({
  soundEnabled,
  selectedTopicId,
}: UseAiConversationSpeechProps) {
  const { addToast } = useNotificationStore();

  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const isRecordingRef = useRef(false);
  const accumulatedTextRef = useRef("");
  const speechRecognitionRef = useRef<any>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio spectrum visualizer (16 frequency bars)
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>(new Array(16).fill(10));
  const animationFrameRef = useRef<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startAudioVisualizer = async () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }

      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }

      if (!micStreamRef.current && navigator.mediaDevices?.getUserMedia) {
        micStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      if (audioContextRef.current && micStreamRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(micStreamRef.current);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const updateFrequencies = () => {
          if (analyserRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const freqs = Array.from(dataArray.slice(0, 16)).map((v) =>
              Math.max(10, Math.min(100, Math.round((v / 255) * 100)))
            );
            setAudioFrequencies(freqs);
          }
          animationFrameRef.current = requestAnimationFrame(updateFrequencies);
        };
        updateFrequencies();
      }
    } catch (err) {
      console.warn("Audio visualizer notice:", err);
      const synthetic = () => {
        setAudioFrequencies(Array.from({ length: 16 }).map(() => Math.floor(Math.random() * 70) + 20));
        animationFrameRef.current = requestAnimationFrame(synthetic);
      };
      synthetic();
    }
  };

  const stopAudioVisualizer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    setAudioFrequencies(new Array(16).fill(10));
  }, []);

  const stopRecordingOnly = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    stopAudioVisualizer();
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }
  }, [stopAudioVisualizer]);

  const startRecording = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast({
        type: "error",
        title: "Trình duyệt không hỗ trợ Web Speech API",
        message: "Vui lòng sử dụng Google Chrome, Edge hoặc Safari để luyện nói trực tiếp qua Micro.",
      });
      return;
    }

    try {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      accumulatedTextRef.current = spokenText.trim() ? spokenText.trim() + " " : "";

      recognition.onstart = () => {
        setIsRecording(true);
        isRecordingRef.current = true;
        setRecordingTime(0);
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
        startAudioVisualizer();
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        let newFinals = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newFinals += transcript + " ";
          } else {
            currentInterim += transcript;
          }
        }

        if (newFinals) {
          accumulatedTextRef.current += newFinals;
        }

        const fullRecognized = (accumulatedTextRef.current + currentInterim).trim();
        setSpokenText(fullRecognized);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            stopRecordingOnly();
          }
        } else {
          stopRecordingOnly();
        }
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Speech Recognition initialization error:", e);
      addToast({
        type: "error",
        title: "Không thể kích hoạt Micro",
        message: "Hãy cấp quyền Micro trong trình duyệt để nói trực tiếp.",
      });
    }
  }, [addToast, spokenText, stopRecordingOnly]);

  const handleResetSpeech = useCallback(() => {
    accumulatedTextRef.current = "";
    setSpokenText("");
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!soundEnabled || !text) return;
      setIsSpeaking(true);
      speakLessonText(text, {
        lessonId: `ai_chat_${selectedTopicId}`,
        speakerIndex: 1,
        accent: "en-US",
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [soundEnabled, selectedTopicId]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecordingOnly();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, [stopRecordingOnly]);

  return {
    isRecording,
    spokenText,
    setSpokenText,
    recordingTime,
    audioFrequencies,
    isSpeaking,
    startRecording,
    stopRecordingOnly,
    handleResetSpeech,
    speakText,
  };
}
