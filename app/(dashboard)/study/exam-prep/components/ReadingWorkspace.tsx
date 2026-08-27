"use client";

import React, { useState } from "react";
import { BookOpen, Check } from "lucide-react";
import { ExamQuestion } from "@/lib/data/examPrepData";

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      
      {/* LEFT COLUMN (6/12 ON DESKTOP): READING PASSAGE PANEL */}
      <div className="lg:col-span-6 p-3 sm:p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
        
        {/* Header Title with Mobile Collapse Toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase font-display text-slate-900 dark:text-white">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" strokeWidth={1.8} />
            <span>Bài Đọc ({question.partTitle})</span>
          </div>

          {/* Mobile-only toggle button */}
          <button
            onClick={() => setIsPassageExpandedMobile(!isPassageExpandedMobile)}
            className="lg:hidden px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 cursor-pointer"
          >
            {isPassageExpandedMobile ? "Thu gọn ▲" : "Xem bài đọc ▼"}
          </button>
        </div>

        {/* TOEIC Part 7 Multi-Passage Tabs */}
        {question.partNumber === 7 && (
          <div className="flex items-center gap-1 border-b border-slate-100 dark:border-white/5 pb-1.5">
            <button
              onClick={() => setActivePassageTab(1)}
              className={`px-2.5 py-0.5 rounded-xs text-xs font-bold cursor-pointer ${
                activePassageTab === 1 ? "bg-emerald-500 text-white font-black" : "bg-slate-100 text-slate-600"
              }`}
            >
              Email 1
            </button>
            <button
              onClick={() => setActivePassageTab(2)}
              className={`px-2.5 py-0.5 rounded-xs text-xs font-bold cursor-pointer ${
                activePassageTab === 2 ? "bg-emerald-500 text-white font-black" : "bg-slate-100 text-slate-600"
              }`}
            >
              Invoice 2
            </button>
          </div>
        )}

        {/* Passage Text Box (Collapsible on mobile, always visible on desktop) */}
        <div className={`p-3 sm:p-3.5 rounded-xs bg-slate-50/80 dark:bg-slate-950/80 text-slate-900 dark:text-slate-100 text-sm sm:text-[15px] font-medium leading-relaxed whitespace-pre-line max-h-[35vh] sm:max-h-[45vh] lg:max-h-[60vh] overflow-y-auto border border-slate-200/70 dark:border-white/10 tracking-normal antialiased select-text font-sans ${
          !isPassageExpandedMobile ? "hidden lg:block" : "block"
        }`}>
          {samplePassageText}
        </div>
      </div>

      {/* RIGHT COLUMN (6/12): QUESTION & OPTIONS STREAM */}
      <div className="lg:col-span-6 p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase bg-emerald-500 text-white font-display">
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
          {question.questionText}
        </h3>

        {/* Options Stream */}
        <div className="space-y-2 pt-0.5">
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

    </div>
  );
}
