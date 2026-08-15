"use client";

import React, { useState, useEffect } from "react";
import { Mic, Check } from "lucide-react";
import { ExamQuestion } from "@/lib/data/examPrepData";

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
  onSelectAnswer
}: SpeakingStudioWorkspaceProps) {
  const [phase, setPhase] = useState<"PREP" | "RECORDING" | "FEEDBACK">("PREP");
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState<number>(question.preparationTimeSeconds || 45);
  const [speechSecondsRemaining, setSpeechSecondsRemaining] = useState<number>(question.speakingTimeSeconds || 45);
  const [transcriptText, setTranscriptText] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "PREP" && prepSecondsRemaining > 0) {
      timer = setInterval(() => {
        setPrepSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase("RECORDING");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, prepSecondsRemaining]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "RECORDING" && speechSecondsRemaining > 0) {
      timer = setInterval(() => {
        setSpeechSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, speechSecondsRemaining]);

  const handleStartRecordingNow = () => {
    setPhase("RECORDING");
    setTranscriptText("Good morning! I am delighted to share my thoughts on this topic today...");
    onSelectAnswer("A");
  };

  const handleFinishRecording = () => {
    setPhase("FEEDBACK");
    onSelectAnswer("A");
  };

  return (
    <div className="p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3.5">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-amber-500" strokeWidth={1.8} />
          <h3 className="text-xs font-black uppercase font-display text-slate-900 dark:text-white">
            Speaking Studio — {question.partTitle}
          </h3>
        </div>

        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase font-sans ${
          phase === "PREP"
            ? "bg-amber-400 text-slate-950"
            : phase === "RECORDING"
            ? "bg-rose-500 text-white animate-pulse"
            : "bg-emerald-500 text-white"
        }`}>
          {phase === "PREP" ? "Chuẩn bị" : phase === "RECORDING" ? "Thu âm" : "Hoàn thành"}
        </span>
      </div>

      {/* Prompt Card */}
      <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1.5">
        <p className="text-xs text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
          {question.speakingPrompt || question.questionText}
        </p>

        {question.passageText && (
          <div className="p-3 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-sm sm:text-[15px] font-medium leading-relaxed text-slate-900 dark:text-slate-100 whitespace-pre-line select-text font-sans">
            {question.passageText}
          </div>
        )}
      </div>

      {/* Phase 1: Preparation Timer */}
      {phase === "PREP" && (
        <div className="p-4 rounded-xs bg-amber-500/10 border border-amber-300/60 text-center space-y-2.5">
          <div className="text-2xl font-black font-sans text-amber-600">
            {prepSecondsRemaining}s
          </div>

          <button
            onClick={handleStartRecordingNow}
            className="px-4 py-1.5 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer font-display inline-flex items-center gap-1.5"
          >
            <Mic className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span>Nói Ngay</span>
          </button>
        </div>
      )}

      {/* Phase 2: Live Recording */}
      {phase === "RECORDING" && (
        <div className="p-4 rounded-xs bg-rose-500/10 border border-rose-300/60 text-center space-y-2.5">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center animate-pulse">
              <Mic className="w-4 h-4" strokeWidth={1.8} />
            </div>
            <span className="text-xl font-black font-sans text-rose-600">
              {speechSecondsRemaining}s
            </span>
          </div>

          <div className="p-2.5 rounded-xs bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 text-left font-sans border border-rose-200">
            {transcriptText || "Đang cất giọng nói..."}
          </div>

          <button
            onClick={handleFinishRecording}
            className="px-3.5 py-1.5 rounded-xs bg-rose-600 hover:bg-rose-500 text-white text-xs font-black cursor-pointer shadow-2xs"
          >
            Xong Bài Nói
          </button>
        </div>
      )}

      {/* Phase 3: AI Speech Feedback */}
      {phase === "FEEDBACK" && (
        <div className="p-3.5 rounded-xs bg-emerald-500/10 border border-emerald-300 text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-emerald-300 pb-1.5">
            <span className="font-black text-emerald-700 dark:text-emerald-300 font-display">
              Báo Cáo Giọng Nói AI
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-emerald-500 text-white font-extrabold">
              Band 7.5
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border">
              <span className="text-[10px] text-slate-400 block">Trôi chảy</span>
              <span className="font-bold text-emerald-600">8.0</span>
            </div>
            <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border">
              <span className="text-[10px] text-slate-400 block">Phát âm</span>
              <span className="font-bold text-emerald-600">7.5</span>
            </div>
            <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border">
              <span className="text-[10px] text-slate-400 block">Từ vựng</span>
              <span className="font-bold text-emerald-600">7.0</span>
            </div>
            <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border">
              <span className="text-[10px] text-slate-400 block">Ngữ pháp</span>
              <span className="font-bold text-emerald-600">7.5</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
