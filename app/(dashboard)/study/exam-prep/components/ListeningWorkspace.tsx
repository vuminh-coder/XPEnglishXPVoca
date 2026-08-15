"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Check, Headphones, Volume2, FileText, Sparkles } from "lucide-react";
import { ExamQuestion } from "@/lib/data/examPrepData";

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
  const [activeVoiceName, setActiveVoiceName] = useState<string>("");

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

  // Play AI Speech Synthesis with Randomized Voice per Question
  const playAiVoiceSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    if (speechTimerRef.current) clearInterval(speechTimerRef.current);

    const utterance = new SpeechSynthesisUtterance(spokenScript);
    utterance.rate = playbackSpeed;

    // Pick voices available in browser
    const availableVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
    if (availableVoices.length > 0) {
      // Hash question ID to deterministically select a different voice per question (Male / Female / UK / US)
      let hash = 0;
      for (let i = 0; i < question.id.length; i++) {
        hash = question.id.charCodeAt(i) + ((hash << 5) - hash);
      }
      const voiceIndex = Math.abs(hash) % availableVoices.length;
      const selectedVoice = availableVoices[voiceIndex];
      utterance.voice = selectedVoice;
      setActiveVoiceName(selectedVoice.name);
    } else {
      utterance.lang = "en-US";
      setActiveVoiceName("Standard English AI Voice");
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setProgressPercent(0);

      // Simulate smooth progress bar filling during speech
      const estimatedDurationMs = Math.max(4000, (spokenScript.length / 14) * 1000 / playbackSpeed);
      const stepMs = 100;
      let elapsed = 0;
      speechTimerRef.current = setInterval(() => {
        elapsed += stepMs;
        const currentPct = Math.min(100, Math.round((elapsed / estimatedDurationMs) * 100));
        setProgressPercent(currentPct);
        if (currentPct >= 100) {
          if (speechTimerRef.current) clearInterval(speechTimerRef.current);
        }
      }, stepMs);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgressPercent(100);
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Automatically trigger AI Speech playback when question changes
    const timer = setTimeout(() => {
      playAiVoiceSpeech();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    };
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
  }, [isPlaying]);

  const togglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      if (speechTimerRef.current) clearInterval(speechTimerRef.current);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        playAiVoiceSpeech();
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    // Restart playback at new speed
    setTimeout(() => {
      playAiVoiceSpeech();
    }, 100);
  };

  return (
    <div className="space-y-3">
      
      {/* AI VOICE AUDIO PLAYER ENGINE BAR */}
      <div className="p-3 rounded-xs bg-[#0059bb] text-white shadow-2xs space-y-2">
        <div className="flex items-center justify-between gap-3">
          
          {/* Play/Pause & Voice Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={togglePlay}
              title="Phát / Tạm dừng (Phím tắt: Space)"
              className={`w-9 h-9 rounded-full flex items-center justify-center font-black cursor-pointer transition-all duration-200 shrink-0 shadow-xs active:scale-95 ${
                isPlaying
                  ? "bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-300/50 shadow-md"
                  : "bg-amber-400 text-slate-950 hover:bg-amber-300 hover:scale-105"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase font-display text-white">
                <Headphones className="w-3.5 h-3.5 text-amber-300 shrink-0" strokeWidth={1.8} />
                <span className="truncate">{question.partTitle} — Câu {currentQuestionIndex + 1}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Replay, Speed & Transcript Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 text-[10px] font-mono">
              {[0.8, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-1.5 py-0.5 rounded-xs font-bold cursor-pointer ${
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
              <span>{showTranscript ? "Ẩn Lời Thoại" : "Lời Thoại"}</span>
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
        <div className="p-3.5 rounded-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-xs space-y-1.5">
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800/40 pb-1.5">
            <span className="font-black text-amber-700 dark:text-amber-300 uppercase font-display tracking-wider">
              📜 Lời Thoại AI Đang Phát (Full Spoken Audio Script)
            </span>
            <span className="text-xs sm:text-sm font-black text-amber-700 dark:text-amber-300 font-sans uppercase tracking-wider">Tiếng Anh chuẩn</span>
          </div>

          <div className="text-slate-900 dark:text-amber-100 font-sans font-bold whitespace-pre-line leading-relaxed text-xs sm:text-sm tracking-wide">
            {spokenScript}
          </div>
        </div>
      )}

      {/* PART 1: PHOTOGRAPHS (IMAGE LEFT, OPTIONS RIGHT) */}
      {question.partNumber === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 rounded-xs overflow-hidden border border-slate-200 dark:border-white/10">
            <img
              src={question.imageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"}
              alt="TOEIC Photograph"
              className="w-full h-44 sm:h-56 object-cover"
            />
          </div>

          <div className="md:col-span-6 space-y-2">
            {question.options.map((opt) => {
              const isSelected = userChoice === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => onSelectAnswer(opt.key)}
                  className={`w-full p-2.5 rounded-xs border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0059bb] text-white border-[#0059bb] shadow-2xs font-extrabold"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-xs flex items-center justify-center text-xs font-black border ${
                      isSelected ? "bg-white text-[#0059bb] border-white" : "bg-slate-100 dark:bg-slate-800 border-slate-200"
                    }`}>
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
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
                  className={`h-11 rounded-xs border text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
                  className={`w-full p-2.5 rounded-xs border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
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
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
