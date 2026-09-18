"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Shuffle,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { MINIMAL_PAIRS, MinimalPair } from "../data/ipaData";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";

interface IpaMinimalPairsTrainerProps {
  onPlaySound: (text: string, rate?: number) => void;
}

export const IpaMinimalPairsTrainer: React.FC<IpaMinimalPairsTrainerProps> = ({
  onPlaySound,
}) => {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [selectedPairTopicId, setSelectedPairTopicId] = useState<string>(
    MINIMAL_PAIRS[0].id
  );

  const activeTopic =
    MINIMAL_PAIRS.find((p) => p.id === selectedPairTopicId) || MINIMAL_PAIRS[0];

  // Quiz Game State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [targetChoice, setTargetChoice] = useState<"A" | "B">(() =>
    Math.random() > 0.5 ? "A" : "B"
  );
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | null>(null);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);

  const currentPair = activeTopic.pairs[currentQuizIndex % activeTopic.pairs.length];

  // Play Quiz Audio
  const handlePlayQuizAudio = () => {
    const textToPlay = targetChoice === "A" ? currentPair.wordA : currentPair.wordB;
    onPlaySound(textToPlay, 1.0);
  };

  // User Chooses Answer
  const handleAnswer = (choice: "A" | "B") => {
    if (selectedAnswer !== null) return; // Prevent double answer

    setSelectedAnswer(choice);
    const isCorrect = choice === targetChoice;

    if (isCorrect) {
      setQuizStreak((s) => s + 1);
      setTotalCorrect((c) => c + 1);
      awardXp(10, "dictation");
      addToast({
        type: "success",
        title: "Chính xác! (+10 XP) ⭐",
        message: `Bạn đã nhận diện chuẩn xác từ "${choice === "A" ? currentPair.wordA : currentPair.wordB}".`,
      });
    } else {
      setQuizStreak(0);
      addToast({
        type: "warning",
        title: "Chưa chính xác!",
        message: `Từ đúng là "${targetChoice === "A" ? currentPair.wordA : currentPair.wordB}". Hãy nghe lại sự khác biệt nhé.`,
      });
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTargetChoice(Math.random() > 0.5 ? "A" : "B");
    setCurrentQuizIndex((prev) => (prev + 1) % activeTopic.pairs.length);
  };

  return (
    <div className="space-y-6 select-none">
      {/* 1. TOPIC PILL BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {MINIMAL_PAIRS.map((topic) => {
          const isSelected = topic.id === activeTopic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                setSelectedPairTopicId(topic.id);
                setCurrentQuizIndex(0);
                setSelectedAnswer(null);
                setTargetChoice(Math.random() > 0.5 ? "A" : "B");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0059bb] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>

      {/* 2. MAIN BATTLE & QUIZ ARENA (DOUBLE-BEZEL) */}
      <div className="p-2.5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 shadow-xs">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-[#0059bb] dark:text-sky-400 font-display">
                Đấu Trường Luyện Tai Nghe
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {activeTopic.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTopic.description}
              </p>
            </div>

            {/* Streak & Score Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Flame className="w-4 h-4 fill-current text-amber-500" />
                <span>Chuỗi {quizStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <Trophy className="w-4 h-4 text-emerald-500" />
                <span>Đúng {totalCorrect}</span>
              </div>
            </div>
          </div>

          {/* Audio Listening Prompt Area */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/60 to-slate-50 dark:from-slate-800/60 dark:to-slate-900 border border-blue-100/80 dark:border-white/5 text-center flex flex-col items-center justify-center space-y-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Lắng nghe và chọn từ bạn vừa nghe thấy:
            </span>

            <button
              type="button"
              onClick={handlePlayQuizAudio}
              className="w-16 h-16 rounded-full bg-[#0059bb] hover:bg-blue-700 text-white shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Phát âm thanh"
            >
              <Volume2 className="w-8 h-8" />
            </button>

            <span className="text-[11px] text-slate-400">
              Bấm loa để nghe lại (không giới hạn lượt nghe)
            </span>
          </div>

          {/* 2 Big Choice Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Option A */}
            <motion.button
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
              type="button"
              onClick={() => handleAnswer("A")}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden ${
                selectedAnswer === null
                  ? "bg-slate-50 hover:bg-blue-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                  : selectedAnswer === "A" && targetChoice === "A"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500"
                  : selectedAnswer === "A" && targetChoice !== "A"
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 ring-2 ring-rose-500"
                  : targetChoice === "A"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400"
                  : "bg-slate-100 dark:bg-slate-800/30 opacity-60 border-transparent"
              }`}
            >
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white capitalize">
                {currentPair.wordA}
              </div>
              <div className="text-xs font-mono text-[#0059bb] dark:text-sky-400 font-bold mt-1">
                {currentPair.phoneticA}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {currentPair.meaningA}
              </div>

              {selectedAnswer !== null && targetChoice === "A" && (
                <div className="absolute top-2 right-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {selectedAnswer === "A" && targetChoice !== "A" && (
                <div className="absolute top-2 right-2 text-rose-500">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
            </motion.button>

            {/* Option B */}
            <motion.button
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
              type="button"
              onClick={() => handleAnswer("B")}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden ${
                selectedAnswer === null
                  ? "bg-slate-50 hover:bg-blue-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200 dark:border-white/10 hover:border-[#0059bb]"
                  : selectedAnswer === "B" && targetChoice === "B"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500"
                  : selectedAnswer === "B" && targetChoice !== "B"
                  ? "bg-rose-50 dark:bg-rose-950/60 border-rose-500 ring-2 ring-rose-500"
                  : targetChoice === "B"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400"
                  : "bg-slate-100 dark:bg-slate-800/30 opacity-60 border-transparent"
              }`}
            >
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white capitalize">
                {currentPair.wordB}
              </div>
              <div className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold mt-1">
                {currentPair.phoneticB}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {currentPair.meaningB}
              </div>

              {selectedAnswer !== null && targetChoice === "B" && (
                <div className="absolute top-2 right-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {selectedAnswer === "B" && targetChoice !== "B" && (
                <div className="absolute top-2 right-2 text-rose-500">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
            </motion.button>
          </div>

          {/* Feedback & Next Challenge CTA */}
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-white/5"
            >
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span>So sánh hai âm: </span>
                <button
                  type="button"
                  onClick={() => onPlaySound(currentPair.wordA, 0.8)}
                  className="font-bold text-[#0059bb] hover:underline mx-1 cursor-pointer"
                >
                  🔊 {currentPair.wordA} ({currentPair.phoneticA})
                </button>
                <span>vs</span>
                <button
                  type="button"
                  onClick={() => onPlaySound(currentPair.wordB, 0.8)}
                  className="font-bold text-purple-600 hover:underline mx-1 cursor-pointer"
                >
                  🔊 {currentPair.wordB} ({currentPair.phoneticB})
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="btn-primary !px-5 !py-2.5 !rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* 3. FULL COMPARISON TABLE FOR THIS TOPIC */}
      <div className="p-2 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
            Bảng Đối Chiếu Toàn Bộ Cặp Âm: {activeTopic.title}
          </h4>

          <div className="space-y-2">
            {activeTopic.pairs.map((pair, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2"
              >
                {/* Word A */}
                <div className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() => onPlaySound(pair.wordA, 1.0)}
                    className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    title={`Nghe ${pair.wordA}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                      {pair.wordA}
                    </div>
                    <div className="text-[10.5px] font-mono text-[#0059bb] dark:text-sky-400">
                      {pair.phoneticA}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {pair.meaningA}
                    </div>
                  </div>
                </div>

                <div className="text-slate-300 dark:text-slate-600 font-black text-xs px-2">
                  VS
                </div>

                {/* Word B */}
                <div className="flex items-center gap-2 flex-1 justify-end text-right">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                      {pair.wordB}
                    </div>
                    <div className="text-[10.5px] font-mono text-purple-600 dark:text-purple-400">
                      {pair.phoneticB}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {pair.meaningB}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlaySound(pair.wordB, 1.0)}
                    className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    title={`Nghe ${pair.wordB}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
