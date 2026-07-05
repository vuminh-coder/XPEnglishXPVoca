"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import {
  Shuffle,
  Layers,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Zap,
  Gamepad2,
} from "lucide-react";

// ── Word Scramble Game ──
function WordScrambleGame({ onBack }: { onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [words] = useState(() =>
    [...MOCK_VOCABULARIES].sort(() => 0.5 - Math.random()).slice(0, 8)
  );
  const [current, setCurrent] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const scrambleWord = useCallback((word: string): string => {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result = arr.join("");
    return result === word ? scrambleWord(word) : result;
  }, []);

  useEffect(() => {
    if (words[current]) {
      setScrambled(scrambleWord(words[current].word.toUpperCase()));
      setInput("");
      setFeedback(null);
      setTimeLeft(30);
    }
  }, [current, words, scrambleWord]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSkip();
          return 30;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, gameOver]);

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
      } else {
        finishGame();
      }
    }, 800);
  };

  const handleSkip = () => {
    setCombo(0);
    if (current < words.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameOver(true);
    awardXp(score);
    addToast({ type: "xp", title: `+${score} XP!`, message: "Hoàn thành Word Scramble!" });
  };

  if (gameOver) {
    return (
      <Card variant="bezel" className="p-8 text-center space-y-4">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
        <div className="text-3xl font-black text-slate-900 dark:text-white">{score} điểm</div>
        <p className="text-sm text-muted">Bạn đã hoàn thành {words.length} từ!</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={onBack}><ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại</Button>
          <Button variant="primary" size="sm" onClick={() => { setCurrent(0); setScore(0); setCombo(0); setGameOver(false); }}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" onClick={onBack}><ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại</Button>
        <div className="flex items-center gap-3">
          <Badge variant="primary"><Zap className="h-3 w-3 mr-0.5" />{score} điểm</Badge>
          {combo >= 2 && <Badge variant="success">🔥 x{combo} Combo!</Badge>}
          <Badge variant={timeLeft <= 10 ? "danger" : "neutral"}><Timer className="h-3 w-3 mr-0.5" />{timeLeft}s</Badge>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      <Card variant="bezel" className={`p-8 text-center space-y-5 transition-all ${feedback === "correct" ? "ring-2 ring-emerald-400" : feedback === "wrong" ? "ring-2 ring-rose-400" : ""}`}>
        <p className="text-xs text-muted font-bold">Sắp xếp lại các chữ cái</p>
        <div className="flex justify-center gap-2">
          {scrambled.split("").map((ch, i) => (
            <span key={i} className="h-11 w-11 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-lg font-black text-indigo-700 dark:text-indigo-300">
              {ch}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted">{words[current].definitionVn}</p>
        <input
          type="text"
          className="w-full max-w-xs mx-auto py-3 px-4 text-center text-sm font-bold rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Nhập từ đúng..."
          autoFocus
        />
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={handleSkip}>Bỏ qua</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!input}>Xác nhận</Button>
        </div>
      </Card>
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

function MemoryMatchGame({ onBack }: { onBack: () => void }) {
  const { awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const totalPairs = 6;

  useEffect(() => {
    const selected = [...MOCK_VOCABULARIES].sort(() => 0.5 - Math.random()).slice(0, totalPairs);
    const cardPairs: MemoryCard[] = [];
    selected.forEach((v, i) => {
      cardPairs.push({ id: i * 2, text: v.word, pairId: v.id, flipped: false, matched: false });
      cardPairs.push({ id: i * 2 + 1, text: v.definitionVn, pairId: v.id, flipped: false, matched: false });
    });
    setCards(cardPairs.sort(() => 0.5 - Math.random()));
  }, []);

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
              const xp = Math.max(20, 60 - moves * 2);
              awardXp(xp);
              addToast({ type: "xp", title: `+${xp} XP!`, message: `Hoàn thành trong ${moves + 1} lượt!` });
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
    const selected = [...MOCK_VOCABULARIES].sort(() => 0.5 - Math.random()).slice(0, totalPairs);
    const cardPairs: MemoryCard[] = [];
    selected.forEach((v, i) => {
      cardPairs.push({ id: i * 2, text: v.word, pairId: v.id, flipped: false, matched: false });
      cardPairs.push({ id: i * 2 + 1, text: v.definitionVn, pairId: v.id, flipped: false, matched: false });
    });
    setCards(cardPairs.sort(() => 0.5 - Math.random()));
  };

  if (gameOver) {
    return (
      <Card variant="bezel" className="p-8 text-center space-y-4">
        <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
        <div className="text-3xl font-black text-slate-900 dark:text-white">Hoàn thành!</div>
        <p className="text-sm text-muted">Ghép {totalPairs} cặp trong {moves} lượt lật</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={onBack}><ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại</Button>
          <Button variant="primary" size="sm" onClick={resetGame}><RotateCcw className="h-3.5 w-3.5 mr-1" /> Chơi lại</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" onClick={onBack}><ArrowLeft className="h-3.5 w-3.5 mr-1" /> Quay lại</Button>
        <div className="flex items-center gap-3">
          <Badge variant="primary">{matchedPairs}/{totalPairs} cặp</Badge>
          <Badge variant="neutral">{moves} lượt lật</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            className={`h-20 sm:h-24 rounded-2xl text-xs font-bold transition-all duration-300 border ${
              card.matched
                ? "bg-emerald-100 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 scale-95"
                : card.flipped
                ? "bg-indigo-100 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                : "bg-slate-100 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-700 text-transparent cursor-pointer hover:scale-105"
            }`}
            disabled={card.matched || card.flipped}
          >
            {card.flipped || card.matched ? card.text : "?"}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Games Page ──
export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<"scramble" | "memory" | null>(null);

  if (activeGame === "scramble") {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto pb-20 md:pb-6">
        <WordScrambleGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  if (activeGame === "memory") {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto pb-20 md:pb-6">
        <MemoryMatchGame onBack={() => setActiveGame(null)} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="page-header animate-fade-in-down">
        <h1 className="page-title text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Gamepad2 className="h-7 w-7 text-rose-500" /> Mini Games từ vựng
        </h1>
        <p className="page-subtitle text-muted mt-1">Học từ vựng qua trò chơi tương tác — vui hơn, nhớ lâu hơn!</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card variant="bezel" hoverable className="p-6 cursor-pointer group" onClick={() => setActiveGame("scramble")}>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white mb-4">
            <Shuffle className="h-7 w-7" />
          </div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">Word Scramble</h3>
          <p className="text-xs text-muted mt-1 leading-relaxed">Xáo trộn chữ cái — sắp xếp lại thành từ đúng. Timer 30s/từ, combo streak tăng điểm.</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="primary">8 từ</Badge>
            <Badge variant="neutral">~3 phút</Badge>
          </div>
        </Card>

        <Card variant="bezel" hoverable className="p-6 cursor-pointer group" onClick={() => setActiveGame("memory")}>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-4">
            <Layers className="h-7 w-7" />
          </div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">Memory Match</h3>
          <p className="text-xs text-muted mt-1 leading-relaxed">Lật thẻ nối từ tiếng Anh với nghĩa tiếng Việt. Ít lượt lật = nhiều XP hơn.</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="primary">6 cặp</Badge>
            <Badge variant="neutral">~2 phút</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
