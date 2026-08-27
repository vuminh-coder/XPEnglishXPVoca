"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Check, Headphones, Volume2, FileText, Sparkles } from "lucide-react";
import { ExamQuestion } from "@/lib/data/examPrepData";

import { speakLessonText, stopTTS } from "@/lib/utils/ttsEngine";
import { unlockMobileAudio } from "@/lib/utils/mobileAudio";

interface ListeningWorkspaceProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  userChoice?: "A" | "B" | "C" | "D";
  onSelectAnswer: (choice: "A" | "B" | "C" | "D") => void;
}

export function ListeningWorkspace({
  question,
  currentQuestionIndex,
  totalQuestions,
  userChoice,
  onSelectAnswer
}: ListeningWorkspaceProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [activeVoiceName, setActiveVoiceName] = useState<string>("Native English AI Voice");

  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Construct full spoken script for Text-to-Speech Engine
  const constructSpokenScript = (): string => {
    const qNum = currentQuestionIndex + 1;
    const cleanText = (txt?: string) => (txt || "").trim().replace(/\.+$/, "");
    
    if (question.partNumber === 1) {
      return `Part 1 Photographs. Question number ${qNum}. Look at the picture marked number ${qNum} in your test book.\nOption A: ${cleanText(question.options[0]?.text)}.\nOption B: ${cleanText(question.options[1]?.text)}.\nOption C: ${cleanText(question.options[2]?.text)}.\nOption D: ${cleanText(question.options[3]?.text)}.`;
    }
    
    if (question.partNumber === 2) {
      return `Part 2 Question-Response. Question number ${qNum}. ${cleanText(question.questionText)}.\nResponse A: ${cleanText(question.options[0]?.text)}.\nResponse B: ${cleanText(question.options[1]?.text)}.\nResponse C: ${cleanText(question.options[2]?.text)}.`;
    }

    if (question.partNumber === 3) {
      const dialogue = question.passageText || "Man: Good morning Sandra, did the bulk shipment of ergonomic office chairs arrive this morning?\nWoman: Hi Thomas. Unfortunately no, the logistics vendor reported a minor delay due to highway maintenance. The truck will reach our warehouse by 3:00 PM today.";
      return `Part 3 Conversations.\n${dialogue}\n\nQuestion number ${qNum}. ${cleanText(question.questionText)}.`;
    }

    if (question.partNumber === 4) {
      const talk = question.passageText || "Attention all passengers traveling on TransGlobal Airways flight A320 bound for London Heathrow. Boarding is now taking place at Gate 14 on Departure Level 2.";
      return `Part 4 Short Talks.\n${talk}\n\nQuestion number ${qNum}. ${cleanText(question.questionText)}.`;
    }

    return `Question number ${qNum}. ${cleanText(question.questionText)}.`;
  };

  const spokenScript = constructSpokenScript();

  // Play AI Speech Synthesis with Deterministic Voice per Question & Google TTS Fallback
  const playAiVoiceSpeech = () => {
    if (typeof window === "undefined") return;

    stopTTS();
    if (speechTimerRef.current) clearInterval(speechTimerRef.current);

    unlockMobileAudio();
    setIsPlaying(true);
    setProgressPercent(0);

    const estimatedDurationMs = Math.max(3500, (spokenScript.length / 13) * 1000 / playbackSpeed);
    const stepMs = 100;
    let elapsed = 0;
    speechTimerRef.current = setInterval(() => {
      elapsed += stepMs;
      const currentPct = Math.min(98, Math.round((elapsed / estimatedDurationMs) * 100));
      setProgressPercent(currentPct);
    }, stepMs);

    speakLessonText(spokenScript, {
      lessonId: question.id,
      speakerIndex: question.partNumber % 2,
      rate: playbackSpeed,
      onEnd: () => {
        setIsPlaying(false);
        setProgressPercent(100);
        if (speechTimerRef.current) clearInterval(speechTimerRef.current);
      },
      onError: () => {
        setIsPlaying(false);
        if (speechTimerRef.current) clearInterval(speechTimerRef.current);
      }
    });
  };

  useEffect(() => {
    // Reset audio state when question changes
    setIsPlaying(false);
    setProgressPercent(0);
    stopTTS();
    if (speechTimerRef.current) clearInterval(speechTimerRef.current);
  }, [question.id]);

  // Handle Spacebar hotkey to toggle audio Play/Pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable) {
          return;
        }
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, spokenScript, playbackSpeed]);

  const togglePlay = () => {
    if (typeof window === "undefined") return;

    if (isPlaying) {
      stopTTS();
      setIsPlaying(false);
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    } else {
      playAiVoiceSpeech();
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      setTimeout(() => {
        playAiVoiceSpeech();
      }, 100);
    }
  };

  return (
    <div className="space-y-3">
      
      {/* AI VOICE AUDIO PLAYER ENGINE BAR */}
      <div className="p-3 rounded-xs bg-[#0059bb] text-white shadow-2xs space-y-2">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
          
          {/* Play/Pause & Voice Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={togglePlay}
              title="Phát / Tạm dừng (Phím tắt: Space)"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black cursor-pointer transition-all duration-200 shrink-0 shadow-xs active:scale-95 ${
                isPlaying
                  ? "bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-300/50 shadow-md"
                  : "bg-amber-400 text-slate-950 hover:bg-amber-300 hover:scale-105"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase font-display text-white">
                <Headphones className="w-3.5 h-3.5 text-amber-300 shrink-0" strokeWidth={1.8} />
                <span className="truncate">{question.partTitle} — Câu {currentQuestionIndex + 1}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Replay, Speed & Transcript Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto sm:ml-0">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 text-[10px] font-sans">
              {[0.8, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-1.5 py-0.5 rounded-xs font-bold cursor-pointer transition-all ${
                    playbackSpeed === speed
                      ? "bg-amber-400 text-slate-950 font-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Toggle Transcript */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-2 py-1 rounded-xs text-[10.5px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                showTranscript ? "bg-white text-[#0059bb] font-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span className="hidden sm:inline">{showTranscript ? "Ẩn Lời Thoại" : "Lời Thoại"}</span>
              <span className="sm:hidden">{showTranscript ? "Ẩn" : "Lời"}</span>
            </button>
          </div>

        </div>

        {/* Audio Seekbar Progress Indicator */}
        <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full bg-amber-300 transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* AUDIO TRANSCRIPT BOX (EXPANDABLE) */}
      {showTranscript && (
        <div className="p-3.5 rounded-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 space-y-1.5">
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800/40 pb-1.5">
            <span className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase font-display tracking-wider">
              📜 Lời Thoại AI Đang Phát (Spoken Script)
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-300 font-sans uppercase tracking-wider">
              Audio Tiêu Chuẩn
            </span>
          </div>

          <div className="text-slate-900 dark:text-amber-100 font-sans font-medium whitespace-pre-line leading-relaxed text-xs sm:text-sm tracking-normal">
            {spokenScript}
          </div>
        </div>
      )}

      {/* PART 1: PHOTOGRAPHS (PERFECT-FIT RESPONSIVE IMAGE CONTAINER & OPTIONS) */}
      {question.partNumber === 1 && (
        <div className="space-y-3">
          {/* Question Prompt Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded-xs bg-[#0059bb] text-white text-[10.5px] font-black uppercase font-sans shrink-0">
                Part 1 • Photo
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200 font-display leading-snug break-words">
                {question.questionText || `Look at the picture marked No. ${currentQuestionIndex + 1} in your test book.`}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-sans shrink-0 hidden sm:inline">
              Chọn phát biểu mô tả đúng nhất
            </span>
          </div>

          {/* Responsive Side-by-side Photo & Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center md:items-stretch">
            {/* Left Column: Perfectly-Fitted Photograph Container */}
            <div className="md:col-span-6 w-full max-w-md mx-auto md:max-w-none rounded-xs overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-100 dark:bg-slate-900/90 shadow-2xs relative flex items-center justify-center p-1 sm:p-1.5 aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-full md:min-h-[250px] md:max-h-[300px] max-h-[240px] sm:max-h-[280px]">
              <img
                src={question.imageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"}
                alt={`TOEIC Part 1 Photo Question ${currentQuestionIndex + 1}`}
                className="w-full h-full object-contain object-center rounded-xs transition-all duration-200 select-none"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-xs bg-slate-950/75 backdrop-blur-xs text-[10px] font-bold text-white tracking-wider uppercase font-sans shadow-xs pointer-events-none">
                Ảnh Câu {currentQuestionIndex + 1}
              </div>
            </div>

            {/* Right Column: 4 Balanced Option Cards */}
            <div className="md:col-span-6 flex flex-col justify-between gap-2">
              {question.options.map((opt) => {
                const isSelected = userChoice === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => onSelectAnswer(opt.key)}
                    className={`w-full min-h-[44px] md:flex-1 p-2.5 sm:p-3 rounded-xs border text-left text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99] ${
                      isSelected
                        ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-extrabold"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#0059bb] hover:bg-blue-50/50 dark:hover:bg-slate-800/80 active:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-1">
                      <span className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-black shrink-0 border transition-all ${
                        isSelected 
                          ? "bg-white text-[#0059bb] border-white shadow-xs" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 group-hover:border-[#0059bb] group-hover:text-[#0059bb]"
                      }`}>
                        {opt.key}
                      </span>
                      <span className="leading-relaxed break-words">{opt.text}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 stroke-[2.5] shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PART 2: QUESTION-RESPONSE (3 CLEAN FLAT OPTIONS) */}
      {question.partNumber === 2 && (
        <div className="p-4 rounded-xs bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-3">
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-1">
            {(["A", "B", "C"] as const).map((keyChoice) => {
              const isSelected = userChoice === keyChoice;
              return (
                <button
                  key={keyChoice}
                  onClick={() => onSelectAnswer(keyChoice)}
                  className={`h-11 rounded-xs border text-xs sm:text-[13px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs"
                      : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                  }`}
                >
                  <span>Đáp án ({keyChoice})</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STANDARD LISTENING QUESTIONS (PART 3, 4 & SECTION 1-4) */}
      {question.partNumber > 2 && (
        <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
            {question.questionText}
          </h3>

          <div className="space-y-2">
            {question.options.map((opt) => {
              const isSelected = userChoice === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => onSelectAnswer(opt.key)}
                  className={`w-full p-2.5 sm:p-3 rounded-xs border text-left text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-extrabold"
                      : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-xs flex items-center justify-center text-xs font-black border ${
                      isSelected ? "bg-white text-[#0059bb] border-white" : "bg-slate-100 dark:bg-slate-800 border-slate-200"
                    }`}>
                      {opt.key}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
