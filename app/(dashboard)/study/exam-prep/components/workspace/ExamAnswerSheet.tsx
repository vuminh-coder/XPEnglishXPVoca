import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  CircleDashed,
  Star,
  X,
} from "lucide-react";
import { ExamQuestion } from "@/features/exam-prep/data/exam-papers/types";
import { UserExamAnswers } from "@/features/exam-prep/utils/examScoringEngine";

export interface ExamAnswerSheetProps {
  questions: ExamQuestion[];
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  userAnswers: UserExamAnswers;
  flaggedQuestions: Record<string, boolean>;
}

export function ExamDesktopAnswerSheet({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  userAnswers,
  flaggedQuestions,
}: ExamAnswerSheetProps) {
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <div className="hidden lg:block lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0059bb]" /> Phiếu Trả Lời
        </h3>
        <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-mono">
          {answeredCount}/{questions.length} Đã làm
        </span>
      </div>

      {/* 3 Segmented Legend Badges with Live Counts & Expressive Icons */}
      <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="px-2 py-1.5 rounded-lg bg-[#0059bb]/10 dark:bg-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/25 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
          <span>
            Đã làm: <strong className="font-mono font-bold text-xs">{answeredCount}</strong>
          </span>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
          <CircleDashed className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
          <span>
            Chưa: <strong className="font-mono font-bold text-xs">{unansweredCount}</strong>
          </span>
        </div>
        <div className="px-2 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
          <Star className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400 fill-amber-400 stroke-[1.5]" />
          <span>
            Gắn cờ: <strong className="font-mono font-bold text-xs">{flaggedCount}</strong>
          </span>
        </div>
      </div>

      {/* Answer Grid with Safe Padding to prevent border clipping */}
      <div className="max-h-[52vh] overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="grid grid-cols-6 gap-1.5">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const userChoice = userAnswers[q.id];
            const isAnswered = !!userChoice;
            const isFlagged = !!flaggedQuestions[q.id];

            let btnStyle =
              "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105";

            if (isCurrent) {
              if (isFlagged) {
                btnStyle =
                  "bg-amber-400 text-slate-950 font-bold border-2 border-amber-600 shadow-md shadow-amber-500/20 scale-[1.04] z-10";
              } else if (isAnswered) {
                btnStyle =
                  "bg-[#0059bb] text-white font-bold border-2 border-blue-400 dark:border-sky-300 shadow-md shadow-blue-500/25 scale-[1.04] z-10";
              } else {
                btnStyle =
                  "bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 font-bold border-2 border-[#0059bb] shadow-sm shadow-blue-500/15 scale-[1.04] z-10";
              }
            } else {
              if (isFlagged) {
                btnStyle =
                  "bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs";
              } else if (isAnswered) {
                btnStyle =
                  "bg-[#0059bb] text-white font-bold border-[#0059bb] shadow-2xs";
              }
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={`h-10 sm:h-10.5 rounded-xl font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${btnStyle}`}
              >
                <span className={`text-xs font-bold leading-none ${isAnswered ? "text-white" : ""}`}>
                  {idx + 1}
                </span>
                {isAnswered && (
                  <span className="text-[10px] font-black uppercase text-blue-100 dark:text-sky-200 leading-none mt-0.5 font-mono">
                    {userChoice}
                  </span>
                )}
                {!isAnswered && isFlagged && (
                  <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface ExamMobileAnswerDrawerProps extends ExamAnswerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExamMobileAnswerDrawer({
  isOpen,
  onClose,
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  userAnswers,
  flaggedQuestions,
}: ExamMobileAnswerDrawerProps) {
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg max-h-[82vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-5 space-y-3.5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0059bb]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-display">
                  Phiếu Trả Lời ({answeredCount}/{questions.length} Đã làm)
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Segmented Legend Badges with Live Counts & Expressive Icons */}
            <div className="grid grid-cols-3 gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="px-2 py-1.5 rounded-lg bg-[#0059bb]/10 dark:bg-[#0059bb]/20 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/25 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                <span>
                  Đã làm: <strong className="font-mono font-bold text-xs">{answeredCount}</strong>
                </span>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                <CircleDashed className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400 stroke-[2.2]" />
                <span>
                  Chưa: <strong className="font-mono font-bold text-xs">{unansweredCount}</strong>
                </span>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 font-sans shadow-2xs">
                <Star className="w-3.5 h-3.5 shrink-0 text-amber-500 dark:text-amber-400 fill-amber-400 stroke-[1.5]" />
                <span>
                  Gắn cờ: <strong className="font-mono font-bold text-xs">{flaggedCount}</strong>
                </span>
              </div>
            </div>

            {/* Answer Grid in Mobile Modal with Safe Padding */}
            <div className="max-h-[50vh] overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <div className="grid grid-cols-6 gap-1.5">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const userChoice = userAnswers[q.id];
                  const isAnswered = !!userChoice;
                  const isFlagged = !!flaggedQuestions[q.id];

                  let btnStyle =
                    "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60";

                  if (isCurrent) {
                    if (isFlagged) {
                      btnStyle =
                        "bg-amber-400 text-slate-950 font-bold border-2 border-amber-600 shadow-md scale-[1.04] z-10";
                    } else if (isAnswered) {
                      btnStyle =
                        "bg-[#0059bb] text-white font-bold border-2 border-blue-400 dark:border-sky-300 shadow-md scale-[1.04] z-10";
                    } else {
                      btnStyle =
                        "bg-blue-50 dark:bg-blue-950/70 text-[#0059bb] dark:text-sky-300 font-bold border-2 border-[#0059bb] shadow-sm scale-[1.04] z-10";
                    }
                  } else {
                    if (isFlagged) {
                      btnStyle =
                        "bg-amber-400 text-slate-950 font-bold border-amber-500 shadow-2xs";
                    } else if (isAnswered) {
                      btnStyle =
                        "bg-[#0059bb] text-white font-bold border-[#0059bb] shadow-2xs";
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onSelectQuestion(idx);
                        onClose();
                      }}
                      className={`h-10 rounded-xl font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative ${btnStyle}`}
                    >
                      <span className={`text-xs font-bold leading-none ${isAnswered ? "text-white" : ""}`}>
                        {idx + 1}
                      </span>
                      {isAnswered && (
                        <span className="text-[10px] font-black uppercase text-blue-100 dark:text-sky-200 leading-none mt-0.5 font-mono">
                          {userChoice}
                        </span>
                      )}
                      {!isAnswered && isFlagged && (
                        <Star className="w-2.5 h-2.5 text-slate-950 fill-slate-950 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
