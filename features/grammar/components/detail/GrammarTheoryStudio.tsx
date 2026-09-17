"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Tag,
  Target,
  Lightbulb,
  FlaskConical,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { VietnamFlag } from "@/shared/components/ui";
import { GrammarLesson, GrammarTopic } from "../../types/grammarTypes";

interface GrammarTheoryStudioProps {
  topic: GrammarTopic;
  lessonData: GrammarLesson | null;
  onStartPractice: () => void;
  loadingPractice: boolean;
}

export function GrammarTheoryStudio({
  topic,
  lessonData,
  onStartPractice,
  loadingPractice,
}: GrammarTheoryStudioProps) {
  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-6">
      {/* 1. Overview & Memory Tip */}
      {lessonData?.memoryTip && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/40 dark:from-slate-850 dark:to-slate-900 border border-blue-200/80 dark:border-blue-800/60 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span>Mẹo Ghi Nhớ Nhanh & Trọng Tâm:</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
            {lessonData.memoryTip}
          </p>
        </div>
      )}

      {/* 2. Color-coded Formulas Section */}
      {lessonData?.formulas && lessonData.formulas.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0059bb]" /> Cấu Trúc & Công Thức Cốt Lõi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lessonData.formulas.map((formula, fIdx) => {
              const isAffirmative =
                formula.includes("(+)") || formula.toLowerCase().includes("khẳng định");
              const isNegative =
                formula.includes("(-)") || formula.toLowerCase().includes("phủ định");

              let colorStyle =
                "bg-blue-50/70 dark:bg-slate-800/60 border-blue-200/70 dark:border-blue-900/60 text-[#0059bb] dark:text-sky-300";
              let badgeText = "Nghi vấn (?)";
              let badgeStyle =
                "bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border-[#0059bb]/20";

              if (isAffirmative) {
                colorStyle =
                  "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/70 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300";
                badgeText = "Khẳng định (+)";
                badgeStyle =
                  "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
              } else if (isNegative) {
                colorStyle =
                  "bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/70 dark:border-rose-900/60 text-rose-800 dark:text-rose-300";
                badgeText = "Phủ định (-)";
                badgeStyle =
                  "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
              }

              return (
                <div
                  key={fIdx}
                  className={`p-4 rounded-2xl border space-y-2.5 shadow-2xs ${colorStyle}`}
                >
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase border inline-block ${badgeStyle}`}
                  >
                    {badgeText}
                  </span>
                  <div className="text-xs sm:text-sm font-bold tracking-tight leading-relaxed">
                    {formula}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Signal Words */}
      {lessonData?.signalWords && lessonData.signalWords.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#0059bb]" /> Từ Nhận Biết & Trạng Từ Chỉ Thời Gian:
          </h4>
          <div className="flex flex-wrap gap-2">
            {lessonData.signalWords.map((word, wIdx) => (
              <span
                key={wIdx}
                className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Exam Usages Contexts */}
      {lessonData?.usages && lessonData.usages.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-sky-500" /> Ứng Dụng Trong Đề Thi TOEIC & IELTS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessonData.usages.map((u, uIdx) => (
              <div
                key={uIdx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 hover:border-[#0059bb]/40 transition-all shadow-2xs"
              >
                <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40 inline-block">
                  {u.context}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  &quot;{u.example}&quot;
                </p>
                {u.note && (
                  <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{u.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Real Examples */}
      {lessonData?.examples && lessonData.examples.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-emerald-500" /> Ví Dụ Minh Họa Ngữ Cảnh Thực Tế
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessonData.examples.map((ex, eIdx) => (
              <div
                key={eIdx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 space-y-2 group hover:border-[#0059bb]/40 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    Ví dụ {eIdx + 1}
                  </span>
                  {ex.highlight && (
                    <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/40">
                      Trọng tâm: {ex.highlight}
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                  &quot;{ex.en}&quot;
                </div>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2">
                  <VietnamFlag className="w-4.5 h-3 shrink-0" /> <span>{ex.vi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Common Mistakes Alert */}
      {lessonData?.commonMistakes && lessonData.commonMistakes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Bẫy Đề Thi & Các Lỗi Sai Phổ Biến
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessonData.commonMistakes.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 space-y-2 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 line-through">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{m.wrong}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{m.correct}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-1.5 border-t border-rose-200/60 dark:border-rose-900/40 font-medium">
                  {m.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Extra Rules */}
      {lessonData?.extraRules && lessonData.extraRules.length > 0 && (
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-950 border border-blue-200/60 dark:border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quy Tắc Bổ Sung & Lưu Ý Đặc Biệt:
          </h4>
          <ul className="space-y-1.5 pl-1">
            {lessonData.extraRules.map((ruleStr, rIdx) => (
              <li
                key={rIdx}
                className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-start gap-2"
              >
                <span className="text-[#0059bb] font-bold">•</span>
                <span>{ruleStr}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 8. Bottom Footer Action Dock */}
      <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <Link
          href="/study/grammar"
          className="group inline-flex items-center gap-2.5 h-11 px-4 sm:px-5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] shrink-0 justify-center"
        >
          <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 transition-transform shadow-2xs">
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
          </div>
          <span>Trở về kho ngữ pháp</span>
        </Link>

        <button
          type="button"
          onClick={onStartPractice}
          disabled={loadingPractice}
          className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0059bb]/25 hover:shadow-lg hover:shadow-[#0059bb]/30 transition-all duration-200 font-display active:scale-[0.98] disabled:opacity-50 cursor-pointer shrink-0"
        >
          {loadingPractice && (
            <Loader2 className="w-4 h-4 animate-spin text-white shrink-0" />
          )}

          <span className="tracking-tight">Bắt đầu bài thi thử AI</span>

          <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform border border-white/20 shadow-2xs">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
