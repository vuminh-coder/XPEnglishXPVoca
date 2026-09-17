import React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ExamQuestion } from "@/features/exam-prep/data/exam-papers/types";
import { ListeningWorkspace } from "../ListeningWorkspace";
import { ReadingWorkspace } from "../ReadingWorkspace";
import { SpeakingStudioWorkspace } from "../SpeakingStudioWorkspace";
import { WritingStudioWorkspace } from "../WritingStudioWorkspace";

export interface ExamQuestionWorkspaceProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  userChoice?: string;
  onSelectAnswer: (choice: any) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  showAnswerSheet: boolean;
}

export function ExamQuestionWorkspace({
  question,
  currentQuestionIndex,
  totalQuestions,
  userChoice,
  onSelectAnswer,
  isFlagged,
  onToggleFlag,
  onPrevQuestion,
  onNextQuestion,
  showAnswerSheet,
}: ExamQuestionWorkspaceProps) {
  return (
    <div
      className={`${showAnswerSheet ? "lg:col-span-8" : "lg:col-span-12"} space-y-3.5 pb-16 lg:pb-0`}
    >
      <div className="space-y-4">
        {/* 1. LISTENING WORKSPACE */}
        {question.section === "LISTENING" && (
          <ListeningWorkspace
            question={question}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            userChoice={userChoice as any}
            onSelectAnswer={onSelectAnswer}
          />
        )}

        {/* 2. READING WORKSPACE (ALWAYS-VISIBLE SIDE-BY-SIDE PASSAGE) */}
        {question.section === "READING" && (
          <ReadingWorkspace
            question={question}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            userChoice={userChoice as any}
            onSelectAnswer={onSelectAnswer}
          />
        )}

        {/* 3. SPEAKING AI STUDIO WORKSPACE */}
        {question.section === "SPEAKING" && (
          <SpeakingStudioWorkspace
            question={question}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onSelectAnswer={onSelectAnswer}
          />
        )}

        {/* 4. WRITING AI STUDIO WORKSPACE */}
        {question.section === "WRITING" && (
          <WritingStudioWorkspace
            question={question}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onSelectAnswer={onSelectAnswer}
          />
        )}

        {/* Desktop-Only In-flow Navigation Buttons */}
        <div className="hidden lg:flex p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm items-center justify-between">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={onPrevQuestion}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-2xs font-sans"
          >
            <ChevronLeft className="w-4 h-4" /> Câu trước
          </button>

          {/* Right action group: Flag + Next question */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleFlag}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs font-sans ${
                isFlagged
                  ? "bg-amber-400 text-slate-950 border-amber-500 font-bold"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{isFlagged ? "Đã Đánh Dấu" : "Đánh Dấu Câu"}</span>
            </button>

            <button
              type="button"
              disabled={currentQuestionIndex === totalQuestions - 1}
              onClick={onNextQuestion}
              className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-sm font-display transition-all"
            >
              Câu tiếp <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
