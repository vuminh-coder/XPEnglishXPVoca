"use client";

import React, { useState } from "react";
import { Wand2, Send, RefreshCw, BookOpen, ChevronDown, ChevronUp, Award } from "lucide-react";
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
  onSelectAnswer,
}: WritingStudioWorkspaceProps) {
  const { addToast } = useNotificationStore();
  const [essayText, setEssayText] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showSample, setShowSample] = useState<boolean>(false);

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
  const targetWordCount = question.minWordCount || (question.partNumber === 6 ? 20 : question.partNumber === 7 ? 120 : 300);
  const progressPercent = Math.min(100, Math.round((wordCount / targetWordCount) * 100));

  const handleEvaluate = async () => {
    if (wordCount < 5) {
      addToast({
        type: "warning",
        title: "Bài viết quá ngắn",
        message: "Vui lòng nhập câu trả lời đầy đủ để AI chấm điểm.",
      });
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
          examType: "TOEIC",
        }),
      });
      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
        onSelectAnswer("A");
        addToast({
          type: "success",
          title: `🎉 AI Chấm Điểm Bài Viết: Score ${data.evaluation.overallBand || "4/4"}`,
        });
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
      {/* LEFT COLUMN (6/12): PROMPT, VISUAL & INCOMING PASSAGE */}
      <div className="lg:col-span-6 p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
          <div className="w-6 h-6 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0">
            <Wand2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" strokeWidth={2} />
          </div>
          <h3 className="text-xs font-black uppercase font-display text-slate-900 dark:text-white truncate">
            Writing AI Studio — {question.partTitle}
          </h3>
        </div>

        {/* Prompt Instruction */}
        <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
          {question.writingPrompt || question.questionText}
        </p>

        {/* Task Image (Writing Part 1) */}
        {question.imageUrl && (
          <div className="w-full max-w-md mx-auto aspect-[4/3] max-h-[240px] sm:max-h-[280px] rounded-xs overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-2xs bg-slate-100 dark:bg-slate-900/90 p-1 sm:p-1.5 flex items-center justify-center relative">
            <img
              src={question.imageUrl}
              alt="Writing Task Image"
              className="w-full h-full object-contain object-center rounded-xs select-none transition-all duration-200"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-xs bg-slate-950/75 backdrop-blur-xs text-[10px] font-bold text-white tracking-wider uppercase font-sans shadow-xs pointer-events-none">
              Ảnh Bài Viết Câu {currentQuestionIndex + 1}
            </div>
          </div>
        )}

        {/* Incoming Email / Text Passage (Writing Part 2) */}
        {question.passageText && (
          <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs sm:text-[13px] font-mono leading-relaxed text-slate-900 dark:text-slate-100 whitespace-pre-line select-text">
            {question.passageText}
          </div>
        )}

        {/* Sample Essay / Model Answer Accordion */}
        {question.sampleEssay && (
          <div className="rounded-xs border border-purple-200 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20 overflow-hidden">
            <button
              onClick={() => setShowSample(!showSample)}
              className="w-full p-2.5 px-3 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300 cursor-pointer hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-all"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tham Khảo Bài Mẫu Điểm Tuyệt Đối (ETS Sample)</span>
              </span>
              {showSample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSample && (
              <div className="p-3 border-t border-purple-200 dark:border-purple-900/30 bg-white dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {question.sampleEssay}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN (6/12): ESSAY EDITOR & LIVE METRICS */}
      <div className="lg:col-span-6 p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3">
        {/* Word Count Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold font-sans">
            <span className="text-slate-700 dark:text-slate-300">
              Số từ: <span className="text-purple-600 dark:text-purple-400 font-black">{wordCount}</span> / {targetWordCount} từ
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {progressPercent}% chỉ tiêu
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Textarea Editor */}
        <textarea
          rows={8}
          placeholder="Nhập câu trả lời hoặc bài viết tiếng Anh của bạn tại đây..."
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            onSelectAnswer("A");
          }}
          className="w-full p-3 text-xs sm:text-sm font-sans rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 leading-relaxed min-h-[160px] sm:min-h-[220px]"
        />

        {/* Evaluation Action Button */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">
            Tự động lưu câu trả lời khi nhập
          </span>

          <button
            disabled={isEvaluating}
            onClick={handleEvaluate}
            className="px-4 py-2 rounded-xs bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ml-auto"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI Đang Phân Tích...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Chấm Điểm Bằng Gemini AI</span>
              </>
            )}
          </button>
        </div>

        {/* AI Evaluation Report Card */}
        {evaluation && (
          <div className="p-3.5 rounded-xs bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-500/30 text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800/40 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-black text-purple-800 dark:text-purple-300 font-display text-xs sm:text-sm">
                  Báo Cáo Điểm Viết AI Chuẩn ETS
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-xs bg-purple-600 text-white font-black text-xs font-sans">
                Band {evaluation.overallBand || "7.5"}
              </span>
            </div>

            {/* Criteria Score Metrics */}
            {evaluation.criteria && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/30">
                  <span className="text-[10px] font-bold text-slate-400 block">Nội Dung / Đề Bài</span>
                  <span className="font-black text-xs sm:text-sm text-purple-600 font-sans">
                    {evaluation.criteria.taskAchievement || 7.5}
                  </span>
                </div>
                <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/30">
                  <span className="text-[10px] font-bold text-slate-400 block">Liên Kết Đoạn</span>
                  <span className="font-black text-xs sm:text-sm text-purple-600 font-sans">
                    {evaluation.criteria.coherenceCohesion || 7.0}
                  </span>
                </div>
                <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/30">
                  <span className="text-[10px] font-bold text-slate-400 block">Từ Vựng C1/C2</span>
                  <span className="font-black text-xs sm:text-sm text-purple-600 font-sans">
                    {evaluation.criteria.lexicalResource || 8.0}
                  </span>
                </div>
                <div className="p-1.5 rounded-xs bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/30">
                  <span className="text-[10px] font-bold text-slate-400 block">Ngữ Pháp</span>
                  <span className="font-black text-xs sm:text-sm text-purple-600 font-sans">
                    {evaluation.criteria.grammaticalAccuracy || 7.5}
                  </span>
                </div>
              </div>
            )}

            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-xs sm:text-[13px] font-sans">
              {evaluation.feedbackText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

