"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Timer, Zap, CheckCircle2 } from "lucide-react";

interface SpeedPair {
  id: string;
  word: string;
  definitionVn: string;
}

export function SpeedMatchGame({ pool, onBack }: { pool: any[]; onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [pairs, setPairs] = useState<SpeedPair[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const initGame = () => {
    if (pool && pool.length > 0) {
      const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
      setPairs(selected);
      setMatchedIds([]);
      setSelectedWord(null);
      setSelectedDef(null);
      setScore(0);
      setTimeLeft(30);
      setGameOver(false);
    }
  };

  useEffect(() => {
    initGame();
  }, [pool]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (matchedIds.length > 0 && matchedIds.length === pairs.length) {
      setGameOver(true);
      const bonus = timeLeft * 2;
      const totalXp = score + bonus + 20;
      awardXp(totalXp);
      addToast({
        type: "xp",
        title: `+${totalXp} XP ⚡`,
        message: `Hoàn thành Speed Match trong ${30 - timeLeft} giây!`,
      });
    }
  }, [matchedIds, pairs, score, timeLeft, awardXp, addToast]);

  const handleWordClick = (wordId: string) => {
    if (matchedIds.includes(wordId)) return;
    setSelectedWord(wordId);
    checkMatch(wordId, selectedDef);
  };

  const handleDefClick = (defId: string) => {
    if (matchedIds.includes(defId)) return;
    setSelectedDef(defId);
    checkMatch(selectedWord, defId);
  };

  const checkMatch = (wId: string | null, dId: string | null) => {
    if (wId && dId) {
      if (wId === dId) {
        setMatchedIds((prev) => [...prev, wId]);
        setScore((s) => s + 20);
      }
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedDef(null);
      }, 300);
    }
  };

  const wordsList = React.useMemo(() => [...pairs].sort(() => 0.5 - Math.random()), [pairs]);
  const defsList = React.useMemo(() => [...pairs].sort(() => 0.5 - Math.random()), [pairs]);

  if (gameOver) {
    return (
      <Card variant="bezel" className="p-8 text-center space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-[calc(var(--radius-3xl)-6px)] animate-fade-in">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
        <div className="text-3xl font-black text-slate-900 dark:text-white font-display">
          {matchedIds.length === pairs.length ? "Thắng Thuyết Phục!" : "Hết Giờ!"}
        </div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">
          Ghép đúng {matchedIds.length}/{pairs.length} cặp trong {30 - timeLeft}s
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={onBack}>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
          </Button>
          <Button variant="primary" size="sm" className="rounded-xl font-bold cursor-pointer text-white" onClick={initGame}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xl font-bold cursor-pointer" onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant="primary"><Zap className="h-3 w-3 mr-0.5 text-amber-400" />{score} điểm</Badge>
          <Badge variant={timeLeft <= 8 ? "danger" : "neutral"}><Timer className="h-3 w-3 mr-0.5" />{timeLeft}s</Badge>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-amber-500/10 to-blue-600/10 rounded-2xl border border-amber-200/50 dark:border-amber-800/30">
        <p className="text-xs font-black text-amber-700 dark:text-amber-300 text-center uppercase tracking-wider">
          ⚡ Speed Vocab Match - Nối 5 Cặp Từ Nhanh Tối Đa
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Words */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-black text-slate-400 uppercase text-center">Từ Tiếng Anh</p>
          {wordsList.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedWord === item.id;
            return (
              <motion.button
                whileTap={{ scale: 0.97 }}
                key={`word_${item.id}`}
                onClick={() => handleWordClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl text-xs font-extrabold border transition-all flex items-center justify-between text-left cursor-pointer ${
                  isMatched
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-600 opacity-60"
                    : isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30"
                    : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 hover:border-blue-400"
                }`}
              >
                <span>{item.word}</span>
                {isMatched && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Definitions */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-black text-slate-400 uppercase text-center">Nghĩa Tiếng Việt</p>
          {defsList.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedDef === item.id;
            return (
              <motion.button
                whileTap={{ scale: 0.97 }}
                key={`def_${item.id}`}
                onClick={() => handleDefClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between text-left cursor-pointer leading-tight ${
                  isMatched
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-600 opacity-60"
                    : isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30"
                    : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 hover:border-blue-400"
                }`}
              >
                <span>{item.definitionVn}</span>
                {isMatched && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
