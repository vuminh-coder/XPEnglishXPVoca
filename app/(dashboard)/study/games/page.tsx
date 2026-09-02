"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "@/shared/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  Layers,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Zap,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

function scrambleWord(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === word ? scrambleWord(word) : result;
}

interface ScrambleWordPackage {
  word: string;
  definitionVn: string;
  scrambled: string;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const cardItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
} as const;

// ── Word Scramble Game ──
function WordScrambleGame({ pool, onBack }: { pool: any[]; onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [words, setWords] = useState<ScrambleWordPackage[]>([]);

  useEffect(() => {
    if (pool && pool.length > 0) {
      setWords(
        [...pool]
          .sort(() => 0.5 - Math.random())
          .slice(0, 8)
          .map((w) => ({
            word: w.word,
            definitionVn: w.definitionVn,
            scrambled: scrambleWord(w.word.toUpperCase()),
          }))
      );
    }
  }, [pool]);

  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) {
      awardXp(score);
      addToast({ type: "xp", title: `+${score} XP!`, message: "Hoàn thành Word Scramble!" });
    }
  }, [gameOver, score, awardXp, addToast]);

  const handleSkip = () => {
    setCombo(0);
    if (current < words.length - 1) {
      setCurrent((c) => c + 1);
      setInput("");
      setFeedback(null);
      setTimeLeft(30);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver || words.length === 0) return;
    const timerVal = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSkip();
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerVal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, gameOver, words]);

  const handleSubmit = () => {
    if (input.toLowerCase() === words[current].word.toLowerCase()) {
      const comboBonus = combo >= 3 ? 3 : combo >= 2 ? 2 : 1;
      setScore((s) => s + 10 * comboBonus);
      setCombo((c) => c + 1);
      setFeedback("correct");
    } else {
      setCombo(0);
      setFeedback("wrong");
    }
    setTimeout(() => {
      if (current < words.length - 1) {
        setCurrent((c) => c + 1);
        setInput("");
        setFeedback(null);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }, 800);
  };

  const handleRestart = () => {
    const selected = [...pool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
      .map((w) => ({
        word: w.word,
        definitionVn: w.definitionVn,
        scrambled: scrambleWord(w.word.toUpperCase()),
      }));
    setWords(selected);
    setCurrent(0);
    setScore(0);
    setCombo(0);
    setInput("");
    setFeedback(null);
    setTimeLeft(30);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <Card variant="bezel" className="p-8 text-center space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-md animate-fade-in">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
        <div className="text-3xl font-black text-slate-900 dark:text-white font-display">{score} điểm</div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">Bạn đã hoàn thành {words.length} từ!</p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="secondary" size="sm" className="rounded-xs font-bold cursor-pointer" onClick={onBack}>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
          </Button>
          <Button variant="primary" size="sm" className="rounded-xs font-bold cursor-pointer text-white dark:text-white" onClick={handleRestart}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại
          </Button>
        </div>
      </Card>
    );
  }

  const currentWord = words[current];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xs font-bold cursor-pointer" onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant="primary"><Zap className="h-3 w-3 mr-0.5 text-yellow-300" />{score} điểm</Badge>
          {combo >= 2 && <Badge variant="success">🔥 x{combo} Combo!</Badge>}
          <Badge variant={timeLeft <= 10 ? "danger" : "neutral"}><Timer className="h-3 w-3 mr-0.5" />{timeLeft}s</Badge>
        </div>
      </div>

      <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-850 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
          initial={{ width: 0 }}
          animate={{ width: words.length ? `${((current + 1) / words.length) * 100}%` : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {currentWord && (
          <motion.div
            key={`scramble-${current}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 95, damping: 16 }}
          >
            <Card variant="bezel" className={`p-8 text-center space-y-6 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-md transition-all ${
              feedback === "correct" 
                ? "ring-2 ring-emerald-400" 
                : feedback === "wrong" 
                ? "ring-2 ring-rose-400" 
                : ""
            }`}>
              <p className="text-xs text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wide">Sắp xếp lại các chữ cái</p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentWord.scrambled.split("").map((ch, i) => (
                  <span key={i} className="h-11 w-11 rounded-xs bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-850 flex items-center justify-center text-lg font-black text-indigo-700 dark:text-indigo-300 font-display">
                    {ch}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed font-semibold max-w-sm mx-auto">{currentWord.definitionVn}</p>
              
              <input
                type="text"
                className="w-full max-w-xs mx-auto py-3 px-4 text-center text-sm font-bold rounded-xs bg-slate-50 dark:bg-neutral-950 border border-slate-200/40 dark:border-neutral-850 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300/30 uppercase"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Nhập từ đúng..."
                autoFocus
              />
              <div className="flex gap-3 justify-center pt-2">
                <Button variant="secondary" size="sm" className="rounded-xs font-bold cursor-pointer text-xs" onClick={handleSkip}>Bỏ qua</Button>
                <Button variant="primary" size="sm" className="rounded-xs font-bold cursor-pointer text-xs shadow-glow text-white dark:text-white" onClick={handleSubmit} disabled={!input}>Xác nhận</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Memory Match Game ──
interface MemoryCard {
  id: number;
  text: string;
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

function MemoryMatchGame({ pool, onBack }: { pool: any[]; onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const totalPairs = 6;

  useEffect(() => {
    if (pool && pool.length > 0) {
      const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, totalPairs);
      const cardPairs: MemoryCard[] = [];
      selected.forEach((v, i) => {
        cardPairs.push({ id: i * 2, text: v.word, pairId: v.id, flipped: false, matched: false });
        cardPairs.push({ id: i * 2 + 1, text: v.definitionVn, pairId: v.id, flipped: false, matched: false });
      });
      setCards(cardPairs.sort(() => 0.5 - Math.random()));
    }
  }, [pool]);

  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) {
      const xp = Math.max(20, 60 - moves * 2);
      awardXp(xp);
      addToast({ type: "xp", title: `+${xp} XP!`, message: `Hoàn thành trong ${moves} lượt!` });
    }
  }, [gameOver, moves, awardXp, addToast]);

  const flipCard = (cardId: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)));

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId)!;
      const second = cards.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.pairId === first.pairId ? { ...c, matched: true } : c)));
          setMatchedPairs((m) => {
            const newCount = m + 1;
            if (newCount >= totalPairs) {
              setGameOver(true);
            }
            return newCount;
          });
          setFlippedIds([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)));
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameOver(false);
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, totalPairs);
    const cardPairs: MemoryCard[] = [];
    selected.forEach((v, i) => {
      cardPairs.push({ id: i * 2, text: v.word, pairId: v.id, flipped: false, matched: false });
      cardPairs.push({ id: i * 2 + 1, text: v.definitionVn, pairId: v.id, flipped: false, matched: false });
    });
    setCards(cardPairs.sort(() => 0.5 - Math.random()));
  };

  if (gameOver) {
    return (
      <Card variant="bezel" className="p-8 text-center space-y-5 bg-white dark:bg-neutral-900 border border-slate-200/40 dark:border-neutral-850 rounded-md animate-fade-in">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
        <div className="text-3xl font-black text-slate-900 dark:text-white font-display">Hoàn thành!</div>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">Ghép {totalPairs} cặp trong {moves} lượt lật</p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="secondary" size="sm" className="rounded-xs font-bold cursor-pointer" onClick={onBack}>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
          </Button>
          <Button variant="primary" size="sm" className="rounded-xs font-bold cursor-pointer shadow-glow text-white dark:text-white" onClick={resetGame}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" className="rounded-xs font-bold cursor-pointer" onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant="primary">{matchedPairs}/{totalPairs} cặp</Badge>
          <Badge variant="neutral">{moves} lượt lật</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isFlippedOrMatched = card.flipped || card.matched;
          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={card.id}
              onClick={() => flipCard(card.id)}
              className={`h-20 sm:h-24 rounded-md text-[10px] sm:text-xs font-black transition-all duration-300 border leading-relaxed px-2.5 flex items-center justify-center text-center cursor-pointer ${
                card.matched
                  ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 scale-95"
                  : card.flipped
                  ? "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                  : "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-800 text-transparent select-none"
              }`}
              disabled={isFlippedOrMatched}
            >
              {isFlippedOrMatched ? card.text : "?"}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Games Page ──
export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<"scramble" | "memory" | null>(null);
  const [pool, setPool] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/vocabulary?limit=100&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPool(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 pb-20 md:pb-6 select-none animate-pulse">
        <header className="sticky top-0 z-40 w-full h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="w-32 h-8 rounded-xl bg-blue-600/30 dark:bg-blue-500/30" />
        </header>
        <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
          <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="h-[240px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
            <div className="h-[240px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 md:pb-6 font-sans antialiased" suppressHydrationWarning>
      {/* ─── 1. STANDARDIZED APPTOPHEADER ─── */}
      <AppTopHeader
        onBack={activeGame ? () => setActiveGame(null) : undefined}
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeGame === null}
            onClick={() => setActiveGame(null)}
            icon={<Gamepad2 className="w-3.5 h-3.5 text-rose-500" />}
            label="Tất Cả Games"
          />
          <HeaderPillItem
            active={activeGame === "scramble"}
            onClick={() => setActiveGame("scramble")}
            icon={<Shuffle className="w-3.5 h-3.5" />}
            label="Word Scramble"
          />
          <HeaderPillItem
            active={activeGame === "memory"}
            onClick={() => setActiveGame("memory")}
            icon={<Layers className="w-3.5 h-3.5" />}
            label="Memory Match"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── 2. FLUID ULTRA-WIDE MAIN CONTAINER ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        
        <AnimatePresence mode="wait">
          {activeGame === "scramble" && (
            <motion.div
              key="scramble-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
              className="max-w-2xl mx-auto"
            >
              <WordScrambleGame pool={pool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === "memory" && (
            <motion.div
              key="memory-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
              className="max-w-2xl mx-auto"
            >
              <MemoryMatchGame pool={pool} onBack={() => setActiveGame(null)} />
            </motion.div>
          )}

          {activeGame === null && (
            <motion.div
              key="menu-panel"
              variants={listContainerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-4 sm:space-y-6"
            >
              {/* HERO SPOTLIGHT STAGE */}
              <motion.div
                variants={cardItemVariants}
                className="p-4 sm:p-6 rounded-2xl bg-linear-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-md shadow-[#0059bb]/15 relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 w-48 sm:w-60 h-48 sm:h-60 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
                        Gamified Learning
                      </span>
                      <span className="text-[11px] font-semibold text-blue-100/80">
                        Vừa chơi vừa nhớ từ vựng phản xạ cao
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
                      Mini Games Từ Vựng Tương Tác
                    </h1>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
                      Kích hoạt phản xạ liên kết từ và nghĩa qua các trò chơi giải đố nhanh, nhận điểm thưởng XP và duy trì cảm hứng học tập mỗi ngày.
                    </p>
                  </div>

                  <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Thưởng XP Tức Thì</div>
                      <div className="text-[11px] text-blue-100">+20 ~ 60 XP / Lượt</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GAME CARDS GRID */}
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <motion.div
                  variants={cardItemVariants}
                  whileHover={{ translateY: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveGame("scramble")}
                  className="cursor-pointer h-full"
                >
                  <Card variant="bezel" className="p-6 flex flex-col justify-between h-[230px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] rounded-2xl relative overflow-hidden group shadow-2xs hover:shadow-lg transition-all">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-linear-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                        <Shuffle className="h-6 w-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display group-hover:text-[#0059bb] transition-colors">
                        Word Scramble
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Xáo trộn chữ cái — sắp xếp lại thành từ đúng. Timer 30s/từ, combo streak tăng điểm.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">8 từ</Badge>
                        <Badge variant="neutral">~3 phút</Badge>
                      </div>
                      <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Chơi ngay →
                      </span>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  variants={cardItemVariants}
                  whileHover={{ translateY: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveGame("memory")}
                  className="cursor-pointer h-full"
                >
                  <Card variant="bezel" className="p-6 flex flex-col justify-between h-[230px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-purple-500 rounded-2xl relative overflow-hidden group shadow-2xs hover:shadow-lg transition-all">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                        <Layers className="h-6 w-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display group-hover:text-purple-600 transition-colors">
                        Memory Match
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Lật thẻ nối từ tiếng Anh với nghĩa tiếng Việt. Càng ít lượt lật = càng nhiều XP thưởng.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Badge variant="legendary">6 cặp</Badge>
                        <Badge variant="neutral">~2 phút</Badge>
                      </div>
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Chơi ngay →
                      </span>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

