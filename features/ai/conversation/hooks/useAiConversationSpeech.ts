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

  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopRecordingOnly = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }
  }, []);

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
    };
  }, [stopRecordingOnly]);

  return {
    isRecording,
    spokenText,
    setSpokenText,
    recordingTime,
    isSpeaking,
    startRecording,
    stopRecordingOnly,
    handleResetSpeech,
    speakText,
  };
}
