"use client";

import React from "react";
import { Bot, Sparkles, Search, Lightbulb, Send } from "lucide-react";

export interface AiCoachPaneProps {
  themeName: string;
  aiQuestion: string;
  setAiQuestion: (question: string) => void;
  aiResponse: string | null;
  isAiLoading: boolean;
  onAiAsk: (queryText?: string) => void;
}

export function AiCoachPane({
  themeName,
  aiQuestion,
  setAiQuestion,
  aiResponse,
  isAiLoading,
  onAiAsk,
}: AiCoachPaneProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-2xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Cố Vấn Học Tập AI Tutor
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Hỏi đáp về nghĩa, cách dùng hoặc nhờ AI đặt câu mẫu cho từ trong chủ đề {themeName}.
            </p>
          </div>
        </div>

        {/* 1-Click Quick Prompts */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Gợi ý câu hỏi 1-Click:
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const q = `Hãy cho 3 câu ví dụ thực tế giao tiếp tiếng Anh với các từ thuộc chủ đề ${themeName}`;
                setAiQuestion(q);
                onAiAsk(q);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-50/90 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Cho 3 ví dụ thực tế</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const q = `Phân biệt cách dùng và ngữ cảnh cụ thể của các từ vựng tiêu biểu trong chủ đề ${themeName}`;
                setAiQuestion(q);
                onAiAsk(q);
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 hover:bg-blue-100 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Phân biệt ngữ cảnh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const q = `Chia sẻ mẹo ghi nhớ nhanh và phản xạ từ vựng dễ hiểu cho bộ từ ${themeName}`;
                setAiQuestion(q);
                onAiAsk(q);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Mẹo ghi nhớ nhanh</span>
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAiAsk();
          }}
          className="space-y-3 pt-2"
        >
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              Đặt câu hỏi tự do cho AI Tutor:
            </label>
            <textarea
              rows={3}
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={`Ví dụ: Hãy phân biệt cách dùng các từ vựng trong chủ đề ${themeName} hoặc cho tôi 3 câu ví dụ giao tiếp thực tế...`}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isAiLoading || !aiQuestion.trim()}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 font-display"
          >
            {isAiLoading ? (
              <span>Đang suy nghĩ câu trả lời...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Gửi Câu Hỏi (+10 XP)</span>
              </>
            )}
          </button>
        </form>

        {aiResponse && (
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-xs text-slate-800 dark:text-slate-200 space-y-2">
            <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Câu trả lời từ Cố Vấn AI:</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed pt-1 font-medium">{aiResponse}</div>
          </div>
        )}
      </div>
    </div>
  );
}
