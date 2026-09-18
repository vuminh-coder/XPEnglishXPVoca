"use client";

import React, { useState, useMemo } from "react";
import {
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Flame,
  RotateCcw,
  Trophy,
  Swords,
  Layers,
  ArrowRight,
} from "lucide-react";
import { MINIMAL_PAIRS, MinimalPair } from "../../data/ipaData";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";

export interface IpaMinimalPairsArenaProps {
  className?: string;
}

export const IpaMinimalPairsArena: React.FC<IpaMinimalPairsArenaProps> = ({
  className = "",
}) => {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    MINIMAL_PAIRS[0].id
  );

  const activeTopic = useMemo(() => {
    return MINIMAL_PAIRS.find((p) => p.id === selectedTopicId) || MINIMAL_PAIRS[0];
  }, [selectedTopicId]);

  // Quiz game states
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [targetChoice, setTargetChoice] = useState<"A" | "B">(() =>
    Math.random() > 0.5 ? "A" : "B"
  );
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | null>(null);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);

  const currentPair = activeTopic.pairs[currentQuizIndex % activeTopic.pairs.length];
  const targetWord = targetChoice === "A" ? currentPair.wordA : currentPair.wordB;

  // Handle User Answering
  const handleAnswer = (choice: "A" | "B") => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    const isCorrect = choice === targetChoice;

    if (isCorrect) {
      setQuizStreak((s) => s + 1);
      setTotalCorrect((c) => c + 1);
      awardXp(10, "dictation");
      if ((quizStreak + 1) % 3 === 0) {
        awardCoins(5);
      }
      addToast({
        type: "success",
        title: "Chính xác! (+10 XP) ⭐",
        message: `Bạn đã nhận diện chuẩn xác từ "${targetWord}".`,
      });
    } else {
      setQuizStreak(0);
      addToast({
        type: "warning",
        title: "Chưa chính xác!",
        message: `Từ đúng là "${targetWord}". Hãy nghe lại sự khác biệt nhé.`,
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTargetChoice(Math.random() > 0.5 ? "A" : "B");
    setCurrentQuizIndex((prev) => (prev + 1) % activeTopic.pairs.length);
  };

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* 1. TOPIC SELECTOR HORIZONTAL CHIPS */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
              Chọn cặp âm đối chiếu ({MINIMAL_PAIRS.length} cặp kinh điển)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Luyện tai nghe phân biệt âm dễ nhầm lẫn
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {MINIMAL_PAIRS.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setCurrentQuizIndex(0);
                  setSelectedAnswer(null);
                  setTargetChoice(Math.random() > 0.5 ? "A" : "B");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {topic.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN BATTLE ARENA (DOUBLE-BEZEL) */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        {/* Arena Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
              Đấu Trường Phản Xạ Tai Nghe
            </span>
            <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white mt-1.5 font-display">
              {activeTopic.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeTopic.description}
            </p>
          </div>

          {/* Gamification Streak & Score Badges */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Chuỗi {quizStreak}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-2xs">
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span>Đúng {totalCorrect}</span>
            </div>
          </div>
        </div>

        {/* Central Sound Mystery Speaker */}
        <div className="text-center py-6 sm:py-8 space-y-3 bg-slate-50/80 dark:bg-slate-950/50 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Bấm loa và lắng nghe cẩn thận:
          </div>

          <div className="flex items-center justify-center">
            <IpaAudioPlayButton
              text={targetWord}
              size="lg"
              variant="primary"
              className="!w-16 !h-16 shadow-lg shadow-[#0059bb]/25 hover:scale-105"
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            (Câu hỏi {currentQuizIndex + 1}/{activeTopic.pairs.length})
          </div>
        </div>

        {/* 2 Big Ergonomic Choice Buttons (A vs B) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* OPTION A */}
          <button
            type="button"
            onClick={() => handleAnswer("A")}
            disabled={selectedAnswer !== null}
            className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer select-none group relative overflow-hidden ${
              selectedAnswer === null
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-[#0059bb] hover:shadow-md active:scale-98"
                : selectedAnswer === "A"
                ? targetChoice === "A"
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-md"
                  : "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 shadow-md"
                : targetChoice === "A"
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400/80 text-emerald-800 dark:text-emerald-300"
                : "bg-slate-100/50 dark:bg-slate-800/30 border-transparent opacity-60"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Đáp án A
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white capitalize font-display">
              {currentPair.wordA}
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold mt-0.5">
              {currentPair.phoneticA}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentPair.meaningA}
            </div>
          </button>

          {/* OPTION B */}
          <button
            type="button"
            onClick={() => handleAnswer("B")}
            disabled={selectedAnswer !== null}
            className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer select-none group relative overflow-hidden ${
              selectedAnswer === null
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-[#0059bb] hover:shadow-md active:scale-98"
                : selectedAnswer === "B"
                ? targetChoice === "B"
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-md"
                  : "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 shadow-md"
                : targetChoice === "B"
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400/80 text-emerald-800 dark:text-emerald-300"
                : "bg-slate-100/50 dark:bg-slate-800/30 border-transparent opacity-60"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Đáp án B
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white capitalize font-display">
              {currentPair.wordB}
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold mt-0.5">
              {currentPair.phoneticB}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentPair.meaningB}
            </div>
          </button>
        </div>

        {/* Answer Reveal & Next Button */}
        {selectedAnswer !== null && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {selectedAnswer === targetChoice ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Từ chính xác là: <strong className="font-bold uppercase text-slate-900 dark:text-white">{targetWord}</strong>.
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. SIDE-BY-SIDE 1:1 COMPARISON TABLE */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
              Bảng so sánh đối chiếu đặc điểm 2 âm
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                  <th className="py-2.5 px-3 font-bold">Từ A</th>
                  <th className="py-2.5 px-3 font-bold">Phiên âm A</th>
                  <th className="py-2.5 px-3 font-bold">Nghĩa A</th>
                  <th className="py-2.5 px-3 font-bold border-l border-slate-200 dark:border-slate-700">Từ B</th>
                  <th className="py-2.5 px-3 font-bold">Phiên âm B</th>
                  <th className="py-2.5 px-3 font-bold">Nghĩa B</th>
                  <th className="py-2.5 px-3 font-bold text-center">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {activeTopic.pairs.map((p, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-bold capitalize text-slate-900 dark:text-white">
                      {p.wordA}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">
                      {p.phoneticA}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{p.meaningA}</td>
                    <td className="py-2.5 px-3 font-bold capitalize text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">
                      {p.wordB}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">
                      {p.phoneticB}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{p.meaningB}</td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <IpaAudioPlayButton text={p.wordA} size="sm" variant="ghost" />
                        <span className="text-slate-300">vs</span>
                        <IpaAudioPlayButton text={p.wordB} size="sm" variant="ghost" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
