"use client";

import React, { useState } from "react";
import { BookOpen, Check } from "lucide-react";
import { ExamQuestion } from "@/features/exam-prep";

interface ReadingWorkspaceProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  userChoice?: "A" | "B" | "C" | "D";
  onSelectAnswer: (choice: "A" | "B" | "C" | "D") => void;
}

export function ReadingWorkspace({
  question,
  currentQuestionIndex,
  totalQuestions,
  userChoice,
  onSelectAnswer
}: ReadingWorkspaceProps) {
  const [activePassageTab, setActivePassageTab] = useState<number>(1);
  const [isPassageExpandedMobile, setIsPassageExpandedMobile] = useState<boolean>(true);

  const samplePassageText = question.passageText || `[A] Climate change and global warming have emerged as the most pressingly formidable environmental challenges of the twenty-first century. Academic researchers across international institutes continuously monitor atmospheric carbon dioxide concentrations to project long-term weather anomaly patterns.

[B] Renewable energy infrastructure, particularly solar photovoltaics and offshore wind turbine arrays, has experienced exponential technological refinement over the preceding decade. Cost reductions have rendered clean power generation competitive with traditional fossil fuel extraction.

[C] Furthermore, governmental regulatory frameworks play a pivotal role in accelerating clean energy transitions through carbon taxation, subsidies for electric vehicle adoption, and strict industrial emissions caps.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
      
      {/* LEFT COLUMN (6/12 ON DESKTOP): READING PASSAGE PANEL */}
      <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        
        {/* Header Title with Mobile Collapse Toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase font-display text-slate-900 dark:text-white">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <span>Bài Đọc ({question.partTitle})</span>
          </div>

          {/* Mobile-only toggle button */}
          <button
            type="button"
            onClick={() => setIsPassageExpandedMobile(!isPassageExpandedMobile)}
            className="lg:hidden px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            {isPassageExpandedMobile ? "Thu gọn ▲" : "Xem bài đọc ▼"}
          </button>
        </div>

        {/* TOEIC Part 7 Multi-Passage Tabs */}
        {question.partNumber === 7 && (
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setActivePassageTab(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePassageTab === 1
                  ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              Email 1
            </button>
            <button
              type="button"
              onClick={() => setActivePassageTab(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePassageTab === 2
                  ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              Invoice 2
            </button>
          </div>
        )}

        {/* Passage Text Box (Collapsible on mobile, always visible on desktop) */}
        <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm sm:text-[15px] font-normal leading-relaxed whitespace-pre-line max-h-[35vh] sm:max-h-[45vh] lg:max-h-[60vh] overflow-y-auto border border-slate-200/80 dark:border-slate-800 tracking-normal antialiased select-text font-sans ${
          !isPassageExpandedMobile ? "hidden lg:block" : "block"
        }`}>
          {samplePassageText}
        </div>
      </div>

      {/* RIGHT COLUMN (6/12): QUESTION & OPTIONS STREAM */}
      <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display leading-snug">
          {question.questionText}
        </h3>

        {/* Options Stream */}
        <div className="space-y-2 pt-1">
          {question.options.map((opt) => {
            const isSelected = userChoice === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectAnswer(opt.key)}
                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-[13px] font-medium transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                  isSelected
                    ? "bg-[#0059bb] text-white border-[#0059bb] shadow-xs font-bold"
                    : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] hover:bg-blue-50/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black border shrink-0 ${
                    isSelected
                      ? "bg-white text-[#0059bb] border-white"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}>
                    {opt.key}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
