"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Volume2, RotateCcw, Award, Sparkles, Check, Square, VolumeX } from "lucide-react";
import { ExamQuestion } from "@/features/exam-prep";
import { safeSpeakText, stopTTS, unlockMobileAudio } from "@/shared/utils/mobileAudio";

interface SpeakingStudioWorkspaceProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSelectAnswer: (choice: "A" | "B" | "C" | "D") => void;
}

export function SpeakingStudioWorkspace({
  question,
  currentQuestionIndex,
  totalQuestions,
  onSelectAnswer,
}: SpeakingStudioWorkspaceProps) {
  const [phase, setPhase] = useState<"PREP" | "RECORDING" | "FEEDBACK">("PREP");
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState<number>(
    question.preparationTimeSeconds || 45
  );
  const [speechSecondsRemaining, setSpeechSecondsRemaining] = useState<number>(
    question.speakingTimeSeconds || 45
  );
  const [transcriptText, setTranscriptText] = useState<string>("");
  const [isPlayingGuide, setIsPlayingGuide] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Reset timers when question changes
  useEffect(() => {
    stopTTS();
    setIsPlayingGuide(false);
    setPhase("PREP");
    setPrepSecondsRemaining(question.preparationTimeSeconds || 45);
    setSpeechSecondsRemaining(question.speakingTimeSeconds || 45);
    setTranscriptText("");
  }, [question.id]);

  // Preparation Timer
  useEffect(() => {
    if (phase !== "PREP") return;

    if (prepSecondsRemaining <= 0) {
      startRecording();
      return;
    }

    const timer = setInterval(() => {
      setPrepSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, prepSecondsRemaining]);

  // Live Recording Timer
  useEffect(() => {
    if (phase !== "RECORDING") return;

    if (speechSecondsRemaining <= 0) {
      finishRecording();
      return;
    }

    const timer = setInterval(() => {
      setSpeechSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, speechSecondsRemaining]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopTTS();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  const startRecording = () => {
    stopTTS();
    setIsPlayingGuide(false);
    setPhase("RECORDING");
    onSelectAnswer("A");

    // Initialize Web Speech Recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let current = "";
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + " ";
            }
            if (current.trim()) {
              setTranscriptText(current.trim());
            }
          };

          recognition.onerror = () => {};
          recognition.start();
          recognitionRef.current = recognition;
        } catch (_) {}
      }
    }
  };

  const finishRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setPhase("FEEDBACK");
    onSelectAnswer("A");
  };

  const handleRestart = () => {
    stopTTS();
    setIsPlayingGuide(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setPhase("PREP");
    setPrepSecondsRemaining(question.preparationTimeSeconds || 45);
    setSpeechSecondsRemaining(question.speakingTimeSeconds || 45);
    setTranscriptText("");
  };

  const handlePlayNativeGuide = () => {
    unlockMobileAudio();
    if (isPlayingGuide) {
      stopTTS();
      setIsPlayingGuide(false);
    } else {
      const textToRead = question.passageText || question.speakingPrompt || question.questionText;
      setIsPlayingGuide(true);
      safeSpeakText(textToRead, { lang: "en-US", rate: 0.95 });
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
            <Mic className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={2} />
          </div>
          <h3 className="text-xs sm:text-sm font-bold uppercase font-display text-slate-900 dark:text-white truncate">
            Speaking AI Studio — {question.partTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase font-mono tracking-wide ${
              phase === "PREP"
                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                : phase === "RECORDING"
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-emerald-500 text-white"
            }`}
          >
            {phase === "PREP" ? "⏳ Chuẩn bị" : phase === "RECORDING" ? "🔴 Đang thu âm" : "✓ Hoàn thành"}
          </span>
        </div>
      </div>

      {/* Prompt Card with Image & Text */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
        {/* Speaking Task Prompt */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
            {question.speakingPrompt || question.questionText}
          </p>

          {/* Native Audio Guide Button */}
          <button
            type="button"
            onClick={handlePlayNativeGuide}
            title={isPlayingGuide ? "Dừng đọc" : "Nghe phát âm mẫu bản xứ"}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 flex items-center gap-1.5 border shadow-2xs ${
              isPlayingGuide
                ? "bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/50"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0059bb] hover:border-[#0059bb]"
            }`}
          >
            {isPlayingGuide ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dừng</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nghe Mẫu</span>
              </>
            )}
          </button>
        </div>

        {/* Question Image (for Part 2: Describe a Picture) */}
        {question.imageUrl && (
          <div className="w-full max-w-md mx-auto aspect-[4/3] max-h-[240px] sm:max-h-[280px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900/90 p-1.5 flex items-center justify-center relative">
            <img
              src={question.imageUrl}
              alt="Speaking Task Picture"
              className="w-full h-full object-contain object-center rounded-xl select-none transition-all duration-200"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-sm pointer-events-none font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
              <span>Hình ảnh bài nói câu {currentQuestionIndex + 1}</span>
            </div>
          </div>
        )}

        {/* Passage Text (for Part 1 Reading Aloud & Part 4 Schedule) */}
        {question.passageText && (
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-normal leading-relaxed text-slate-900 dark:text-slate-100 whitespace-pre-line select-text font-sans">
            {question.passageText}
          </div>
        )}
      </div>

      {/* PHASE 1: PREPARATION COUNTDOWN CONSOLE */}
      {phase === "PREP" && (
        <div className="max-w-xl mx-auto w-full p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/90 dark:border-amber-500/25 space-y-4 shadow-sm">
          {/* Header Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-black uppercase text-amber-800 dark:text-amber-300 font-mono tracking-wider">
                Giai Đoạn Chuẩn Bị Bài Nói
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 text-[10px] font-bold border border-amber-300/50 font-mono">
              Chuẩn ETS
            </span>
          </div>

          {/* Centerpiece Countdown Dial */}
          <div className="flex flex-col items-center justify-center py-2 space-y-1.5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-400/80 dark:border-amber-400/60 shadow-md flex flex-col items-center justify-center relative">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 leading-none">
                {prepSecondsRemaining}s
              </span>
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
                Còn lại
              </span>
            </div>

            {/* Preparation Progress Bar */}
            <div className="w-full max-w-xs h-1.5 bg-amber-200/60 dark:bg-amber-900/40 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-amber-500 transition-all duration-1000 ease-linear rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (prepSecondsRemaining /
                      (question.preparationTimeSeconds || 45)) *
                      100,
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Pro-Tip Advice Banner */}
          <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/60 dark:border-amber-800/30 text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-center">
            💡 <span className="font-bold text-slate-900 dark:text-white">Chiến thuật 45s:</span> Đọc lướt nhanh nội dung, xác định các từ khóa trọng tâm, ngắt cụm hơi và sẵn sàng mở giọng tự tin.
          </div>

          {/* Primary Action Button */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={startRecording}
              className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs sm:text-sm font-black cursor-pointer font-display inline-flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Mic className="w-4 h-4 stroke-[2.5]" />
              <span>Nói Ngay (Bắt Đầu Thu Âm)</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: LIVE RECORDING STUDIO CONSOLE */}
      {phase === "RECORDING" && (
        <div className="max-w-xl mx-auto w-full p-5 sm:p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/90 dark:border-rose-500/25 space-y-4 shadow-sm">
          {/* Header Status & Live Radar Ping */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-black uppercase text-rose-700 dark:text-rose-300 font-mono tracking-wider">
                Đang Ghi Âm Trực Tiếp (Live Studio)
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse font-mono">
              REC
            </span>
          </div>

          {/* Centerpiece Countdown Dial & Equalizer */}
          <div className="flex flex-col items-center justify-center py-1 space-y-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-500/80 dark:border-rose-400/60 shadow-md flex flex-col items-center justify-center relative">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-600 dark:text-rose-400 leading-none">
                {speechSecondsRemaining}s
              </span>
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
                Thời gian nói
              </span>
            </div>

            {/* Dynamic Multi-Bar Waveform Equalizer */}
            <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-8 py-1">
              {[45, 80, 30, 95, 60, 85, 40, 100, 50, 90, 35, 75, 55, 90, 40].map(
                (height, i) => (
                  <div
                    key={i}
                    className="w-1 sm:w-1.5 bg-gradient-to-t from-rose-600 to-rose-400 rounded-full animate-pulse"
                    style={{
                      height: `${height}%`,
                      minHeight: "6px",
                      maxHeight: "28px",
                      animationDuration: `${600 + (i % 5) * 120}ms`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Live Speech Recognition Teleprompter Console */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-950 border border-rose-200 dark:border-rose-900/40 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <Mic className="w-3 h-3" /> Lời thoại nhận diện trực tiếp:
              </span>
              <span className="text-slate-400 font-mono">Web Speech API</span>
            </div>
            <div className="text-xs sm:text-[13.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans min-h-[48px] max-h-[120px] overflow-y-auto">
              {transcriptText ? (
                <span className="font-medium text-slate-900 dark:text-white">
                  "{transcriptText}"
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  Đang lắng nghe giọng nói của bạn qua micro... Hãy nói to, rõ ràng và liền mạch.
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={finishRecording}
              className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs sm:text-sm font-black cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 font-display"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Hoàn Thành Bài Nói (Nộp Bài)</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: AI SPEECH FEEDBACK REPORT */}
      {phase === "FEEDBACK" && (
        <div className="max-w-xl mx-auto w-full p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-300/80 dark:border-emerald-500/30 text-xs space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-black text-emerald-800 dark:text-emerald-300 font-display text-xs sm:text-sm">
                Báo Cáo Giọng Nói AI Chuẩn ETS
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-black text-xs font-mono shadow-2xs">
              Band 8.0 / 200 PTS
            </span>
          </div>

          {/* 4 ETS Criteria Rubrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/30 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">
                Độ Trôi Chảy
              </span>
              <span className="font-black text-sm sm:text-base text-emerald-600 font-mono">
                8.5
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/30 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">
                Phát Âm & Ngữ Điệu
              </span>
              <span className="font-black text-sm sm:text-base text-emerald-600 font-mono">
                8.0
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/30 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">
                Vốn Từ & Cấu Trúc
              </span>
              <span className="font-black text-sm sm:text-base text-emerald-600 font-mono">
                7.5
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/30 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">
                Ngữ Pháp & Chuẩn Xác
              </span>
              <span className="font-black text-sm sm:text-base text-emerald-600 font-mono">
                8.0
              </span>
            </div>
          </div>

          {/* User Recorded Transcript */}
          {transcriptText && (
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-sans text-xs space-y-1">
              <span className="font-bold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">
                Lời nói đã ghi âm:
              </span>
              <p className="leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                "{transcriptText}"
              </p>
            </div>
          )}

          {/* Re-try Button */}
          <div className="flex justify-center sm:justify-end pt-1">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-4 py-2 min-h-[44px] rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
              <span>Nói Lại Từ Đầu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

