"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  HelpCircle,
  FileText,
  Volume2,
  CheckCircle2,
  BookmarkCheck,
  RotateCw,
  Award,
  Zap,
  Check,
  AlertCircle,
} from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";
import { useVideoStudySet } from "../../hooks/useVideoStudySet";

export interface StudySetTabPaneProps {
  activeVideo: YouTubeVideoItem;
  studySetHook: ReturnType<typeof useVideoStudySet>;
}

export const StudySetTabPane: React.FC<StudySetTabPaneProps> = ({
  activeVideo,
  studySetHook,
}) => {
  const {
    isLoading,
    studySet,
    error,
    subTab,
    setSubTab,
    selectedCardIds,
    flippedCards,
    isSavedAll,
    quizAnswers,
    quizSubmitted,
    quizScore,
    handleGenerateStudySet,
    toggleCardSelection,
    toggleSelectAll,
    toggleFlipCard,
    speakWord,
    handleBatchSave,
    handleSelectQuizAnswer,
    handleSubmitQuiz,
    handleRetryQuiz,
  } = studySetHook;

  // RULE 1: SKELETON LOADING INSTEAD OF CLASSIC SPINNER
  if (isLoading) {
    return (
      <div className="space-y-4 py-2 animate-pulse" aria-busy="true" aria-label="Đang phân tích video">
        <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-200 dark:bg-purple-800/60 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-purple-200 dark:bg-purple-800/60 rounded w-3/4" />
            <div className="h-3 bg-purple-100 dark:bg-purple-900/40 rounded w-1/2" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
              </div>
              <div className="h-4 bg-slate-200/80 dark:bg-slate-700/80 rounded w-5/6" />
              <div className="h-3 bg-slate-200/60 dark:bg-slate-700/60 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // EMPTY STATE: VIDEO READY TO BE ANALYZED
  if (!studySet) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 dark:from-purple-500/30 dark:to-indigo-500/30 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
          <Sparkles className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display">
            AI Trích Xuất Flashcards & Quiz
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Tự động quét toàn bộ {activeVideo.subtitles?.length || 0} câu phụ đề trong video, lọc ra các từ vựng đắt giá nhất kèm phiên âm IPA, nghĩa tiếng Việt chuẩn và sinh bài tập trắc nghiệm.
          </p>
        </div>

        {error && (
          <div className="w-full max-w-sm p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* RULE 18: SINGLE PROMINENT PRIMARY BUTTON */}
        <button
          type="button"
          onClick={handleGenerateStudySet}
          className="w-full max-w-xs py-3 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Tạo Bộ Thẻ & Bài Tập AI Ngay</span>
        </button>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-2">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> 8-12 Thẻ từ vựng cốt lõi
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> 3-5 Câu hỏi Quiz video
          </span>
        </div>
      </div>
    );
  }

  // ACTIVE STUDY SET VIEW
  return (
    <div className="space-y-3.5">
      {/* 1. SUB-TABS SELECTOR */}
      <div className="flex items-center justify-between gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
        <button
          type="button"
          onClick={() => setSubTab("flashcards")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            subTab === "flashcards"
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Thẻ Từ ({studySet.flashcards.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("quiz")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            subTab === "quiz"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Video Quiz ({studySet.quizzes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("summary")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            subTab === "summary"
              ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Tóm Tắt</span>
        </button>
      </div>

      {/* 2. SUB-TAB CONTENT: FLASHCARDS */}
      {subTab === "flashcards" && (
        <div className="space-y-3">
          {/* Action Bar for Batch Save */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="select-all-cards"
                checked={selectedCardIds.size === studySet.flashcards.length && studySet.flashcards.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-[#0059bb] rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="select-all-cards" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Đã chọn {selectedCardIds.size}/{studySet.flashcards.length} từ
              </label>
            </div>

            {/* RULE 18: SINGLE PROMINENT PRIMARY BUTTON WITH DYNAMIC REWARD */}
            <button
              type="button"
              onClick={handleBatchSave}
              disabled={selectedCardIds.size === 0}
              className={`w-full sm:w-auto py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                isSavedAll
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : selectedCardIds.size > 0
                  ? "bg-[#0059bb] hover:bg-[#004899] text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isSavedAll ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" /> Đã Lưu Vào Sổ Từ
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Lưu {selectedCardIds.size} Từ Vào Sổ Từ (+{selectedCardIds.size * 3} XP)
                </>
              )}
            </button>
          </div>

          {/* Flashcard Items List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {studySet.flashcards.map((card) => {
              const isSelected = selectedCardIds.has(card.id);
              const isFlipped = Boolean(flippedCards[card.id]);

              return (
                <div
                  key={card.id}
                  className={`group relative rounded-xl border transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? "border-purple-300 dark:border-purple-800 bg-white dark:bg-slate-900 shadow-sm"
                      : "border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 opacity-75"
                  }`}
                >
                  <div className="p-3.5 space-y-2.5">
                    {/* Top row: Checkbox, Word, IPA, POS, Audio */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCardSelection(card.id)}
                          className="w-4 h-4 text-[#0059bb] rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                          aria-label={`Chọn từ ${card.word}`}
                        />
                        <div className="truncate">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight mr-2 font-display">
                            {card.word}
                          </span>
                          <span className="text-xs text-purple-600 dark:text-purple-400 font-mono mr-2">
                            {card.phonetic}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {card.pos}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakWord(card.word)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0059bb] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Nghe phát âm chuẩn"
                          aria-label={`Phát âm ${card.word}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFlipCard(card.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Lật thẻ xem chi tiết"
                          aria-label="Lật thẻ"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Middle row: Definition in Vietnamese */}
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {card.definitionVn}
                    </p>

                    {/* Detailed contextual drawer (shown on click flip or expanded) */}
                    {isFlipped && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          <p className="text-slate-800 dark:text-slate-200 italic font-serif">
                            &ldquo;{card.contextSentence}&rdquo;
                          </p>
                          {card.contextTranslation && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              👉 {card.contextTranslation}
                            </p>
                          )}
                        </div>

                        {card.memoryTip && (
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded border border-amber-200 dark:border-amber-800/40">
                            💡 <strong>Mẹo nhớ:</strong> {card.memoryTip}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SUB-TAB CONTENT: QUIZ */}
      {subTab === "quiz" && (
        <div className="space-y-4">
          {quizSubmitted && quizScore && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800 text-center space-y-2">
              <div className="inline-flex p-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                Kết Quả: {quizScore.correct}/{quizScore.total} Câu Đúng
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bạn đã nhận được <strong className="text-amber-600 dark:text-amber-400 font-bold">+{quizScore.xp} XP</strong> thành tích học tập!
              </p>
              <button
                type="button"
                onClick={handleRetryQuiz}
                className="mt-2 py-1.5 px-4 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" /> Làm lại bài trắc nghiệm
              </button>
            </div>
          )}

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {studySet.quizzes.map((quiz, qIdx) => {
              const selectedOpt = quizAnswers[quiz.id];
              const isAnswered = typeof selectedOpt === "number";

              return (
                <div
                  key={quiz.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {quiz.question}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {quiz.options.map((opt, oIdx) => {
                      let btnStyle = "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800";

                      if (quizSubmitted) {
                        if (oIdx === quiz.correctAnswerIndex) {
                          btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold";
                        } else if (selectedOpt === oIdx) {
                          btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 line-through";
                        }
                      } else if (selectedOpt === oIdx) {
                        btnStyle = "border-[#0059bb] bg-blue-50 dark:bg-blue-950/30 text-[#0059bb] dark:text-sky-300 font-bold";
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizAnswer(quiz.id, oIdx)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-slate-400">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {quizSubmitted && oIdx === quiz.correctAnswerIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-800/40 p-2 rounded-lg">
                      <strong className="text-purple-600 dark:text-purple-400">Giải thích:</strong> {quiz.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < studySet.quizzes.length}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                Object.keys(quizAnswers).length === studySet.quizzes.length
                  ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-blue-500/20"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Nộp Bài & Nhận Điểm XP ({Object.keys(quizAnswers).length}/{studySet.quizzes.length})</span>
            </button>
          )}
        </div>
      )}

      {/* 4. SUB-TAB CONTENT: SUMMARY */}
      {subTab === "summary" && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs leading-relaxed">
          <div className="space-y-1">
            <h6 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-500" /> English Summary:
            </h6>
            <p className="text-slate-600 dark:text-slate-300 font-serif italic bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
              {studySet.summary.en}
            </p>
          </div>

          <div className="space-y-1">
            <h6 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Bản Dịch Tiếng Việt:
            </h6>
            <p className="text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
              {studySet.summary.vn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
