"use client";

import React, { useState } from "react";
import { Wand2, Send, RefreshCw } from "lucide-react";
import { ExamQuestion } from "@/lib/data/examPrepData";
import { useNotificationStore } from "@/lib/store/notificationStore";

interface WritingStudioWorkspaceProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSelectAnswer: (choice: "A" | "B" | "C" | "D") => void;
}

export function WritingStudioWorkspace({
  question,
  currentQuestionIndex,
  totalQuestions,
  onSelectAnswer
}: WritingStudioWorkspaceProps) {
  const { addToast } = useNotificationStore();
  const [essayText, setEssayText] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
  const targetWordCount = question.minWordCount || 250;
  const progressPercent = Math.min(100, Math.round((wordCount / targetWordCount) * 100));

  const handleEvaluate = async () => {
    if (wordCount < 10) {
      addToast({ type: "warning", title: "Bài viết quá ngắn", message: "Vui lòng viết ít nhất 10 từ để AI chấm điểm." });
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await fetch("/api/ai/exam-writing-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: question.writingPrompt || question.questionText,
          userEssay: essayText,
          examType: "IELTS"
        })
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
        onSelectAnswer("A");
        addToast({ type: "success", title: `🎉 AI Chấm Điểm Bài Luận: Band ${data.evaluation.overallBand}` });
      } else {
        throw new Error(data.error || "Lỗi chấm bài AI");
      }
    } catch (err: any) {
      addToast({ type: "error", title: "Lỗi chấm bài AI", message: err.message });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      
      {/* LEFT COLUMN (6/12): PROMPT & VISUAL CHART */}
      <div className="lg:col-span-6 p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
          <Wand2 className="w-4 h-4 text-purple-500" strokeWidth={1.8} />
          <h3 className="text-xs font-black uppercase font-display text-slate-900 dark:text-white">
            Writing Studio — {question.partTitle}
          </h3>
        </div>

        <p className="text-xs text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
          {question.writingPrompt || question.questionText}
        </p>

        {question.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Task Chart"
            className="w-full h-44 object-cover rounded-xs border border-slate-200"
          />
        )}
      </div>

      {/* RIGHT COLUMN (6/12): ESSAY EDITOR & LIVE METRICS */}
      <div className="lg:col-span-6 p-3.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5">
        
        {/* Header Word Count */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 text-xs font-bold font-sans">
          <span className="text-slate-700 dark:text-slate-300">
            Số từ: <span className="text-purple-600 font-black">{wordCount}</span> / {targetWordCount}
          </span>
          <span className="text-[11px] text-slate-400">
            {progressPercent}% mục tiêu
          </span>
        </div>

        {/* Textarea Editor */}
        <textarea
          rows={9}
          placeholder="Nhập bài luận tiếng Anh tại đây..."
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            onSelectAnswer("A");
          }}
          className="w-full p-2.5 text-xs sm:text-sm font-sans rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 leading-relaxed"
        />

        {/* Action Button */}
        <div className="flex justify-end pt-0.5">
          <button
            disabled={isEvaluating}
            onClick={handleEvaluate}
            className="px-4 py-1.5 rounded-xs bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang chấm...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span>Chấm Bài Bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* AI Evaluation Report Modal */}
        {evaluation && (
          <div className="p-3 rounded-xs bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-500/30 text-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-purple-200 pb-1">
              <span className="font-black text-purple-700 dark:text-purple-300 font-display">
                Báo Cáo AI
              </span>
              <span className="px-2 py-0.5 rounded-xs bg-purple-600 text-white font-extrabold">
                Band {evaluation.overallBand}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {evaluation.feedbackText}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
