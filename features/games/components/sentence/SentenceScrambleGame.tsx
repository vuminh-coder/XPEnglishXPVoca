"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Timer, Zap, Check, RotateCcw, SkipForward, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { SentenceScramblePackage } from "../../types";
import { gameAudio } from "../../utils/gameAudio";
import { GameResultScreen } from "../shared/GameResultScreen";

export interface SentenceScrambleGameProps {
  onBack: () => void;
}

const SENTENCE_BANK: SentenceScramblePackage[] = [
  {
    id: "sent_1",
    originalSentence: "She often reads books in the evening.",
    vietnameseMeaning: "Cô ấy thường đọc sách vào buổi tối.",
    tokens: ["She", "often", "reads", "books", "in", "the", "evening."],
    grammarNote: "Chủ ngữ (She) + Trạng từ tần suất (often) + Động từ số ít (reads) + Tân ngữ (books) + Trạng ngữ thời gian (in the evening).",
  },
  {
    id: "sent_2",
    originalSentence: "They have lived in this city for ten years.",
    vietnameseMeaning: "Họ đã sống ở thành phố này được mười năm.",
    tokens: ["They", "have", "lived", "in", "this", "city", "for", "ten", "years."],
    grammarNote: "Thì Hiện tại hoàn thành: S + have + V3/ed + for + khoảng thời gian.",
  },
  {
    id: "sent_3",
    originalSentence: "He is working hard to improve his English.",
    vietnameseMeaning: "Anh ấy đang nỗ lực học tập để nâng cao tiếng Anh của mình.",
    tokens: ["He", "is", "working", "hard", "to", "improve", "his", "English."],
    grammarNote: "Hiện tại tiếp diễn: S + is working + Trạng từ (hard) + Mục đích (to improve...).",
  },
  {
    id: "sent_4",
    originalSentence: "The company will launch a new product next month.",
    vietnameseMeaning: "Công ty sẽ ra mắt một sản phẩm mới vào tháng tới.",
    tokens: ["The", "company", "will", "launch", "a", "new", "product", "next", "month."],
    grammarNote: "Thì Tương lai đơn: S + will + V_nguyên thể + Tân ngữ + Thời gian.",
  },
  {
    id: "sent_5",
    originalSentence: "Eating healthy food helps protect your heart.",
    vietnameseMeaning: "Ăn thực phẩm lành mạnh giúp bảo vệ trái tim của bạn.",
    tokens: ["Eating", "healthy", "food", "helps", "protect", "your", "heart."],
    grammarNote: "Danh động từ làm chủ ngữ: Gerund (Eating healthy food) + Động từ số ít (helps).",
  },
  {
    id: "sent_6",
    originalSentence: "She decided to study abroad in Canada.",
    vietnameseMeaning: "Cô ấy đã quyết định đi du học ở Canada.",
    tokens: ["She", "decided", "to", "study", "abroad", "in", "Canada."],
    grammarNote: "Cấu trúc: decide + to V (quyết định làm gì đó).",
  },
  {
    id: "sent_7",
    originalSentence: "He speaks three languages fluently and confidently.",
    vietnameseMeaning: "Anh ấy nói ba ngôn ngữ một cách trôi chảy và tự tin.",
    tokens: ["He", "speaks", "three", "languages", "fluently", "and", "confidently."],
    grammarNote: "Cặp trạng từ cách thức: fluently and confidently bổ nghĩa cho động từ speaks.",
  },
  {
    id: "sent_8",
    originalSentence: "Regular exercise is essential for good health.",
    vietnameseMeaning: "Tập thể dục đều đặn là điều thiết yếu cho sức khỏe tốt.",
    tokens: ["Regular", "exercise", "is", "essential", "for", "good", "health."],
    grammarNote: "Cấu trúc: S + to be + Adjective (essential) + for + Noun phrase.",
  },
];

export function SentenceScrambleGame({ onBack }: SentenceScrambleGameProps) {
  const { awardXp, awardCoins } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [questions, setQuestions] = useState<SentenceScramblePackage[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false);

  // Initialize randomized questions
  const initGame = useCallback(() => {
    const shuffled = [...SENTENCE_BANK].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setFeedback(null);
    setGameOver(false);

    if (shuffled[0]) {
      const scrambled = [...shuffled[0].tokens].sort(() => 0.5 - Math.random());
      setAvailableTokens(scrambled);
      setSelectedTokens([]);
    }
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const loadQuestion = useCallback((idx: number, list: SentenceScramblePackage[]) => {
    if (!list[idx]) return;
    const scrambled = [...list[idx].tokens].sort(() => 0.5 - Math.random());
    setAvailableTokens(scrambled);
    setSelectedTokens([]);
    setFeedback(null);
    setTimeLeft(30);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameOver || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Timeout
          handleSkip();
          return 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, feedback, currentIdx]);

  // Token click handlers
  const handleSelectToken = (token: string, tokenIdx: number) => {
    gameAudio.playFlipSound();
    setSelectedTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, i) => i !== tokenIdx));
  };

  const handleDeselectToken = (token: string, tokenIdx: number) => {
    gameAudio.playFlipSound();
    setAvailableTokens((prev) => [...prev, token]);
    setSelectedTokens((prev) => prev.filter((_, i) => i !== tokenIdx));
  };

  const handleResetCurrent = () => {
    if (!questions[currentIdx]) return;
    const all = [...questions[currentIdx].tokens].sort(() => 0.5 - Math.random());
    setAvailableTokens(all);
    setSelectedTokens([]);
  };

  const handleSkip = () => {
    gameAudio.playWrongBuzzer();
    setCombo(0);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      loadQuestion(currentIdx + 1, questions);
    } else {
      setGameOver(true);
    }
  };

  const handleVerify = () => {
    if (!questions[currentIdx]) return;
    const constructed = selectedTokens.join(" ").trim();
    const target = questions[currentIdx].originalSentence.trim();

    if (constructed.toLowerCase() === target.toLowerCase()) {
      // Correct!
      gameAudio.playCorrectDing();
      setFeedback("correct");
      const multiplier = combo >= 3 ? 2 : 1;
      const pts = 15 * multiplier;
      setScore((s) => s + pts);
      setCombo((c) => c + 1);

      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx((c) => c + 1);
          loadQuestion(currentIdx + 1, questions);
        } else {
          setGameOver(true);
        }
      }, 1300);
    } else {
      // Wrong
      gameAudio.playWrongBuzzer();
      setFeedback("wrong");
      setShake(true);
      setCombo(0);
      setTimeout(() => {
        setShake(false);
        setFeedback(null);
      }, 700);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter" && availableTokens.length === 0) {
        handleVerify();
      } else if (e.key === "Backspace" && selectedTokens.length > 0) {
        const lastToken = selectedTokens[selectedTokens.length - 1];
        handleDeselectToken(lastToken, selectedTokens.length - 1);
      } else if (/^[1-9]$/.test(e.key)) {
        const num = parseInt(e.key, 10) - 1;
        if (availableTokens[num]) {
          handleSelectToken(availableTokens[num], num);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [availableTokens, selectedTokens, gameOver]);

  // When game finishes, award XP and sync to DB
  useEffect(() => {
    if (gameOver && score > 0) {
      gameAudio.playVictoryFanfare();
      awardXp(score);
      awardCoins?.(5);

      fetch("/api/games/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameType: "sentence",
          score,
          xpGained: score,
          coinsGained: 5,
          wordsCompleted: currentIdx + 1,
        }),
      }).catch((err) => console.warn("Failed to record sentence scramble game:", err));

      addToast({
        type: "xp",
        title: `+${score} XP & +5 Vàng!`,
        message: "Chúc mừng bạn đã hoàn thành Thợ Xây Ngữ Pháp!",
      });
    }
  }, [gameOver, score, awardXp, awardCoins, addToast, currentIdx]);

  if (gameOver) {
    return (
      <GameResultScreen
        title="Bậc Thầy Ngữ Pháp!"
        subtitle={`Bạn đã chinh phục thành công ${questions.length} câu ngữ pháp hoàn chỉnh.`}
        score={score}
        xpEarned={score}
        coinsEarned={5}
        onBack={onBack}
        onRestart={initGame}
      />
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="space-y-4 sm:space-y-5 select-none max-w-2xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            <Zap className="w-3 h-3 mr-1 text-amber-400 stroke-[2.5]" />
            {score} điểm
          </Badge>

          {combo >= 2 && (
            <Badge variant="warning" size="sm">
              x{combo} Combo!
            </Badge>
          )}

          <Badge variant={timeLeft <= 7 ? "danger" : "neutral"} size="sm">
            <Timer className="w-3 h-3 mr-1 stroke-[2.2]" />
            {timeLeft}s
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#0059bb]"
          initial={{ width: 0 }}
          animate={{
            width: questions.length ? `${((currentIdx + 1) / questions.length) * 100}%` : 0,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      {/* Main Interactive Stage */}
      {currentQ && (
        <div
          className={`p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 space-y-5 shadow-2xs ${
            feedback === "correct"
              ? "border-emerald-500 ring-2 ring-emerald-500/20"
              : feedback === "wrong"
              ? "border-rose-500 ring-2 ring-rose-500/20"
              : "border-slate-200/90 dark:border-slate-800"
          } ${shake ? "animate-shake" : ""}`}
        >
          {/* Vietnamese Meaning Prompt */}
          <div className="text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Câu {currentIdx + 1}/{questions.length} • Sắp xếp trật tự từ đúng
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              "{currentQ.vietnameseMeaning}"
            </h2>
          </div>

          {/* Constructed Sentence Box */}
          <div className="min-h-[72px] p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 justify-center">
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-slate-400 font-semibold select-none">
                Chạm vào các từ bên dưới để ghép câu...
              </span>
            ) : (
              selectedTokens.map((token, i) => (
                <button
                  key={`sel_${i}`}
                  type="button"
                  onClick={() => handleDeselectToken(token, i)}
                  className="py-1.5 px-3 rounded-xl bg-[#0059bb] hover:bg-rose-600 text-white text-xs sm:text-sm font-bold shadow-2xs transition-all active:scale-90 cursor-pointer"
                  title="Bấm để bỏ từ này"
                >
                  {token}
                </button>
              ))
            )}
          </div>

          {/* Grammar Note when Correct */}
          {feedback === "correct" && currentQ.grammarNote && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentQ.grammarNote}</span>
            </motion.div>
          )}

          {/* Available Word Tokens */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400 font-bold uppercase text-center">
              Kho từ vựng có sẵn (Bấm phím 1-9 hoặc click):
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {availableTokens.map((token, i) => (
                <button
                  key={`avail_${i}`}
                  type="button"
                  onClick={() => handleSelectToken(token, i)}
                  className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:border-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold border border-slate-200/90 dark:border-slate-700 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] flex items-center justify-center text-slate-500 dark:text-slate-400 font-mono">
                    {i + 1}
                  </span>
                  <span>{token}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleResetCurrent}
              className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xếp lại</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSkip}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Bỏ qua</span>
              </button>

              <button
                type="button"
                onClick={handleVerify}
                disabled={availableTokens.length > 0}
                className="py-2 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/20"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                <span>Kiểm tra</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
