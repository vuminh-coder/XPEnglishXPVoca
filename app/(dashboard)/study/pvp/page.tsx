"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { Button, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Timer,
  Trophy,
  XCircle,
  RotateCcw,
  Brain,
  PenTool,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  Crown,
  ChevronRight,
  Flag,
} from "lucide-react";
import Link from "next/link";

interface Opponent {
  name: string;
  avatarEmoji: string;
  level: number;
  title: string;
}

interface QuestionPackage {
  question: typeof MOCK_VOCABULARIES[0];
  options: typeof MOCK_VOCABULARIES;
}

const MOCK_OPPONENTS: Opponent[] = [
  { name: "Minh Thu", avatarEmoji: "🦊", level: 6, title: "Word Apprentice" },
  { name: "Sarah Connor", avatarEmoji: "🦁", level: 11, title: "Vocabulary Scholar" },
  { name: "Gia Bảo", avatarEmoji: "🦉", level: 8, title: "English Seeker" },
  { name: "Alex Mercer", avatarEmoji: "🐼", level: 12, title: "Language Specialist" },
];

interface DifficultySettings {
  totalQuestions: number;
  timeLimit: number;
  aiAccuracy: number;
  aiDelay: [number, number];
  vocabFilter: (word: string) => boolean;
}

function getDifficultySettings(diff: "easy" | "medium" | "hard"): DifficultySettings {
  switch (diff) {
    case "easy":
      return {
        totalQuestions: 5,
        timeLimit: 15,
        aiAccuracy: 0.55,
        aiDelay: [4000, 8000],
        vocabFilter: (w) => w.length <= 6,
      };
    case "hard":
      return {
        totalQuestions: 15,
        timeLimit: 7,
        aiAccuracy: 0.92,
        aiDelay: [1000, 2500],
        vocabFilter: (w) => w.length > 9,
      };
    default: // medium
      return {
        totalQuestions: 10,
        timeLimit: 10,
        aiAccuracy: 0.75,
        aiDelay: [2000, 5000],
        vocabFilter: (w) => w.length > 6 && w.length <= 9,
      };
  }
}

function getAiDelay(diff: "easy" | "medium" | "hard"): number {
  const settings = getDifficultySettings(diff);
  const [min, max] = settings.aiDelay;
  return Math.random() * (max - min) + min;
}

function getAiIsCorrect(diff: "easy" | "medium" | "hard"): boolean {
  const settings = getDifficultySettings(diff);
  return Math.random() < settings.aiAccuracy;
}

function scrambleWord(word: string): string[] {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "").split("");
  return [...letters].sort(() => 0.5 - Math.random());
}

function playWordAudio(word: string) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
}

export default function PvpQuizArenaPage() {
  const { user } = useAuthStore();
  const [gameState, setGameState] = useState<"lobby" | "searching" | "battle" | "results">("lobby");
  
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [gameMode, setGameMode] = useState<"quiz" | "spelling" | "listening">("quiz");
  
  // Spelling clash state
  const [spellingInput, setSpellingInput] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  
  // Opponent matching state
  const [matchedOpponent, setMatchedOpponent] = useState<Opponent | null>(null);
  const [searchTime, setSearchTime] = useState(0);
  
  // Game state
  const [gameQuestions, setGameQuestions] = useState<QuestionPackage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [answered, setAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  
  // Tracking AI opponent responses
  const [opponentStatus, setOpponentStatus] = useState<"thinking" | "answered_correct" | "answered_incorrect">("thinking");

  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);

  function startQuestion(index: number, questionsList: QuestionPackage[]) {
    setCurrentQuestionIndex(index);
    const settings = getDifficultySettings(difficulty);
    setTimer(settings.timeLimit);
    setAnswered(false);
    setSelectedOptionId(null);
    setOpponentStatus("thinking");

    // Reset spelling inputs and generate letters if needed
    setSpellingInput("");
    if (gameMode === "spelling") {
      setScrambledLetters(scrambleWord(questionsList[index].question.word));
    }

    // Auto play TTS audio in listening mode
    if (gameMode === "listening") {
      playWordAudio(questionsList[index].question.word);
    }

    // Start 10 seconds timer
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    
    gameTimerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(gameTimerRef.current!);
          // Timeout, move to next question automatically
          handleNextQuestionOrEnd(index, questionsList);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // AI opponent answers with random delay and accuracy based on difficulty
    const aiDelay = getAiDelay(difficulty);
    aiTimerRef.current = setTimeout(() => {
      const isCorrect = getAiIsCorrect(difficulty);
      setOpponentStatus(isCorrect ? "answered_correct" : "answered_incorrect");
      if (isCorrect) {
        setOpponentScore((prev) => prev + 1);
      }
    }, aiDelay);
  }

  function handleNextQuestionOrEnd(index: number, questionsList: QuestionPackage[]) {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    const settings = getDifficultySettings(difficulty);
    if (index < settings.totalQuestions - 1) {
      startQuestion(index + 1, questionsList);
    } else {
      // Game Over: submit results
      setGameState("results");
      submitMatchResults();
    }
  }

  const handleUserAnswer = (optionId: string, correctId: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptionId(optionId);
    
    const isCorrect = optionId === correctId;
    if (isCorrect) {
      setUserScore((prev) => prev + 1);
    }

    // Delay a bit before moving to show correct/incorrect state
    setTimeout(() => {
      handleNextQuestionOrEnd(currentQuestionIndex, gameQuestions);
    }, 1500);
  };

  // 1. MATCHMAKING PROCESS
  const startMatchmaking = () => {
    setGameState("searching");
    setSearchTime(0);
    
    // Clear state parameters to prevent leakage
    setCurrentQuestionIndex(0);
    setUserScore(0);
    setOpponentScore(0);
    setAnswered(false);
    setSelectedOptionId(null);
    setSpellingInput("");
    
    searchTimerRef.current = setInterval(() => {
      setSearchTime((prev) => {
        if (prev >= 4) {
          // Found Match!
          clearInterval(searchTimerRef.current!);
          const randomOpp = MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
          setMatchedOpponent(randomOpp);
          
          // Select vocab pool based on difficulty settings
          const settings = getDifficultySettings(difficulty);
          let pool = MOCK_VOCABULARIES.filter((v) => settings.vocabFilter(v.word));
          if (pool.length < settings.totalQuestions) pool = MOCK_VOCABULARIES; // fallback safety
          
          // Select random questions and pre-generate options
          const shuffledQuestions = [...pool].sort(() => 0.5 - Math.random()).slice(0, settings.totalQuestions);
          const packages = shuffledQuestions.map((q) => {
            const otherWords = MOCK_VOCABULARIES.filter((v) => v.id !== q.id);
            const decoys = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [q, ...decoys].sort(() => 0.5 - Math.random());
            return { question: q, options };
          });
          setGameQuestions(packages);
          
          setTimeout(() => {
            setGameState("battle");
            startQuestion(0, packages);
          }, 2000);
          
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const cancelMatchmaking = () => {
    if (searchTimerRef.current) clearInterval(searchTimerRef.current);
    setGameState("lobby");
  };

  // 3. SUBMIT RESULTS
  async function submitMatchResults() {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    
    const isWin = userScore > opponentScore;
    const isDraw = userScore === opponentScore;
    const result = isWin ? "WIN" : isDraw ? "DRAW" : "LOSE";
    
    // XP multipliers based on tier difficulty
    let baseWinXp = 30; // medium default
    let baseDrawXp = 15;
    let baseLoseXp = 5;
    
    if (difficulty === "easy") {
      baseWinXp = 15;
      baseDrawXp = 8;
      baseLoseXp = 3;
    } else if (difficulty === "hard") {
      baseWinXp = 50;
      baseDrawXp = 25;
      baseLoseXp = 10;
    }
    
    const xpGained = isWin ? baseWinXp : isDraw ? baseDrawXp : baseLoseXp;

    try {
      const res = await fetch("/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: matchedOpponent?.name || "AI Opponent",
          userScore,
          oppScore: opponentScore,
          result,
          xpGained,
        }),
      });
      const json = await res.json();
      
      if (json.success && json.profile) {
        // Sync to Zustand Auth Store
        const currentLocalUser = useAuthStore.getState().user;
        if (currentLocalUser) {
          useAuthStore.setState({
            user: {
              ...currentLocalUser,
              totalXp: json.profile.totalXp,
              level: json.profile.level,
              title: json.profile.title,
            },
          });
          localStorage.setItem(
            `xp_voca_user_${currentLocalUser.id}`,
            JSON.stringify({
              ...currentLocalUser,
              totalXp: json.profile.totalXp,
              level: json.profile.level,
              title: json.profile.title,
            })
          );
        }
      }
    } catch (e) {
      console.error("Error submitting match results:", e);
    }
  }

  const handleGiveUp = () => {
    if (typeof window !== "undefined" && window.confirm("Bạn có chắc chắn muốn bỏ cuộc giữa chừng? Kết quả trận đấu sẽ được tính là THẤT BẠI và không nhận được XP.")) {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      submitGiveUpResults();
    }
  };

  async function submitGiveUpResults() {
    try {
      await fetch("/api/pvp/match-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opponent: matchedOpponent?.name || "AI Opponent",
          userScore: 0,
          oppScore: getDifficultySettings(difficulty).totalQuestions,
          result: "LOSE",
          xpGained: 0,
        }),
      });
    } catch (e) {
      console.error(e);
    }
    setGameState("lobby");
  }

  const currentPackage = gameQuestions[currentQuestionIndex];
  const currentWord = currentPackage?.question;
  const currentOptions = currentPackage?.options || [];

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Keyboard support for Spelling Duel mode
  useEffect(() => {
    if (gameState !== "battle" || gameMode !== "spelling" || answered || !currentWord) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter") {
        handleSpellingSubmit();
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        handleLetterClick(e.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, gameMode, answered, spellingInput, currentWord]);

  const handleLetterClick = (char: string) => {
    if (answered) return;
    setSpellingInput((prev) => prev + char);
  };

  const handleBackspace = () => {
    if (answered) return;
    setSpellingInput((prev) => prev.slice(0, -1));
  };

  const handleClearSpelling = () => {
    if (answered) return;
    setSpellingInput("");
  };

  const handleSpellingSubmit = () => {
    if (answered || !currentWord) return;
    setAnswered(true);
    const isCorrect = spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase();
    if (isCorrect) {
      setUserScore((prev) => prev + 1);
    }
    setTimeout(() => {
      handleNextQuestionOrEnd(currentQuestionIndex, gameQuestions);
    }, 2000);
  };

  const calculatedXpGained = () => {
    const isWin = userScore > opponentScore;
    const isDraw = userScore === opponentScore;
    let baseWinXp = 30;
    let baseDrawXp = 15;
    let baseLoseXp = 5;
    
    if (difficulty === "easy") {
      baseWinXp = 15;
      baseDrawXp = 8;
      baseLoseXp = 3;
    } else if (difficulty === "hard") {
      baseWinXp = 50;
      baseDrawXp = 25;
      baseLoseXp = 10;
    }
    return isWin ? baseWinXp : isDraw ? baseDrawXp : baseLoseXp;
  };

  // UI rendering based on gameState
  return (
    <div className="mx-auto max-w-4xl space-y-6" suppressHydrationWarning>
      <AnimatePresence mode="wait">
        {/* 1. LOBBY STATE */}
        {gameState === "lobby" && (
          <motion.div
            key="lobby-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 text-left"
          >
            {/* Premium Hero Banner */}
            <div className="bezel overflow-hidden">
              <div className="bezel-inner bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-indigo-950 dark:to-cyan-950 p-4 sm:p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
                  <div>
                    <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-500/30 bg-cyan-100/60 dark:bg-cyan-500/15 text-[9px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400 animate-pulse">
                      <Swords className="h-3.5 w-3.5" /> Multiplayer Battle Arena
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight font-display text-slate-900 dark:text-white">Đấu trường PvP Từ Vựng</h1>
                    <p className="text-slate-650 dark:text-white/70 text-xs md:text-sm mt-2 max-w-xl font-medium leading-relaxed">
                      Thách đấu trực tuyến thời gian thực cùng bạn học toàn quốc. Chiến thắng để leo hạng cúp, nhận bội phần XP và làm chủ từ vựng!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Left Column: Gladiator Profile & Weekly Leaderboards */}
              <div className="md:col-span-1 space-y-6">
                {/* Profile Box */}
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Hồ sơ Đấu sĩ</span>
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-2xl bg-cyan-50 dark:bg-neutral-950 border border-slate-100 dark:border-neutral-850 flex items-center justify-center text-3xl shadow-sm">
                        {user?.avatarEmoji || "🦉"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                          {user?.fullName || "Học viên"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">
                          Cấp độ {user?.level || 1} · {user?.title || "Newbie"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-neutral-850 pt-3.5 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Tích lũy:</span>
                        <span className="text-slate-900 dark:text-slate-200 font-bold">{user?.totalXp || 0} XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Danh hiệu:</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-black">{user?.title || "Tập sự"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Season Leaderboards */}
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-5 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Bảng Vàng Đấu Trường</span>
                    <div className="space-y-2.5">
                      {[
                        { rank: 1, name: "Gia Bảo", avatar: "🦉", trophy: 1420, badgeColor: "text-amber-500" },
                        { rank: 2, name: "Minh Thu", avatar: "🦊", trophy: 1350, badgeColor: "text-slate-400" },
                        { rank: 3, name: "Sarah Connor", avatar: "🦁", trophy: 1290, badgeColor: "text-amber-700" },
                      ].map((player) => (
                        <div key={player.rank} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50/50 dark:bg-neutral-950/50 border border-slate-100/50 dark:border-neutral-855/50">
                          <div className="flex items-center gap-2">
                            <span className={`font-black w-4 text-center ${player.badgeColor}`}>#{player.rank}</span>
                            <span className="text-base select-none">{player.avatar}</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[80px]">{player.name}</span>
                          </div>
                          <span className="font-black text-cyan-600 dark:text-cyan-400 shrink-0">{player.trophy} 🏆</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Columns: Match configurations & Battle Launch */}
              <div className="md:col-span-2 space-y-6">
                <div className="bezel">
                  <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-6">
                    {/* Selectors grid */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Difficulty Selection */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">Cấp Độ Đấu</h3>
                        <div className="space-y-2.5">
                          {[
                            { id: "easy" as const, name: "Dễ (Easy)", desc: "5 câu hỏi · 15s/câu · AI dễ thở · Thắng +15 XP" },
                            { id: "medium" as const, name: "Trung bình (Medium)", desc: "10 câu hỏi · 10s/câu · AI vừa sức · Thắng +30 XP" },
                            { id: "hard" as const, name: "Khó (Hard)", desc: "15 câu hỏi · 7s/câu · AI siêu tốc · Thắng +50 XP" },
                          ].map((tier) => {
                            const isSelected = difficulty === tier.id;
                            return (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => setDifficulty(tier.id)}
                                className={`bezel w-full text-left cursor-pointer transition-all ${
                                  isSelected ? "ring-2 ring-cyan-500" : ""
                                }`}
                              >
                                <div className={`bezel-inner p-3.5 space-y-1 transition-all ${
                                  isSelected ? "bg-cyan-50/15 dark:bg-cyan-950/20" : "bg-white/40 dark:bg-neutral-900/40"
                                }`}>
                                  <div className="font-bold text-xs md:text-sm flex items-center gap-1.5">
                                    {tier.name}
                                  </div>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    {tier.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Game Mode Selection */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">Trò Chơi</h3>
                        <div className="space-y-2.5">
                          {[
                            { id: "quiz" as const, name: "Trắc nghiệm tốc độ", desc: "Chọn nghĩa từ vựng nhanh nhất", icon: <Brain className="h-4 w-4 text-sky-500" /> },
                            { id: "spelling" as const, name: "Đồ chữ đối kháng", desc: "Sắp xếp chữ cái để hoàn thiện từ vựng", icon: <PenTool className="h-4 w-4 text-emerald-500" /> },
                            { id: "listening" as const, name: "Đấu trường âm thanh", desc: "Nghe phát âm bản xứ để chọn nghĩa đúng", icon: <Volume2 className="h-4 w-4 text-purple-500" /> },
                          ].map((mode) => {
                            const isSelected = gameMode === mode.id;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setGameMode(mode.id)}
                                className={`bezel w-full text-left cursor-pointer transition-all ${
                                  isSelected ? "ring-2 ring-cyan-500" : ""
                                }`}
                              >
                                <div className={`bezel-inner p-3.5 space-y-1 transition-all ${
                                  isSelected 
                                    ? "bg-sky-50/30 dark:bg-sky-950/20" 
                                    : "bg-white/40 dark:bg-neutral-900/40"
                                }`}>
                                  <div className="font-bold text-xs md:text-sm flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                    {mode.icon}
                                    <span>{mode.name}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    {mode.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Launch Match Button */}
                    <div className="pt-4 flex justify-end">
                      <Button
                        variant="primary"
                        className="px-6 py-2.5 font-bold text-xs cursor-pointer shadow-glow rounded-xl flex flex-row items-center gap-1.5 justify-center tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white select-none whitespace-nowrap shrink-0"
                        onClick={startMatchmaking}
                      >
                        <Swords className="h-3.5 w-3.5 shrink-0" /> <span>Bắt đầu tìm trận</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. SEARCHING STATE */}
        {gameState === "searching" && (
          <motion.div
            key="searching-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16 space-y-8 animate-fade-in"
          >
            <div className="relative mx-auto h-40 w-40 flex items-center justify-center">
              {/* Radar pulse rings */}
              <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-ping opacity-60 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-sky-500/20 animate-pulse pointer-events-none" />
              <div className="h-24 w-24 rounded-full bg-sky-50 dark:bg-sky-950 border border-sky-200/50 flex items-center justify-center relative z-10">
                <Swords className="h-8 w-8 text-sky-500 animate-pulse" strokeWidth={1.3} />
              </div>
            </div>
            
            <div className="space-y-2">
              {matchedOpponent ? (
                <div className="space-y-4">
                  <Badge variant="success" className="animate-bounce font-bold px-3.5 py-1">ĐÃ TÌM THẤY ĐỐI THỦ</Badge>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="text-right">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{user?.fullName || "Bạn"}</h4>
                      <span className="text-xs text-slate-500">LV {user?.level || 1}</span>
                    </div>
                    <span className="text-xl font-bold text-sky-500 animate-pulse">VS</span>
                    <div className="text-left flex items-center gap-2">
                      <span className="text-2xl">{matchedOpponent.avatarEmoji}</span>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{matchedOpponent.name}</h4>
                        <span className="text-xs text-slate-550">LV {matchedOpponent.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-200">Đang tìm kiếm đối thủ...</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Thời gian chờ: {searchTime} giây</p>
                </>
              )}
            </div>

            {!matchedOpponent && (
              <Button
                variant="ghost"
                className="text-xs text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/15 cursor-pointer rounded-xl"
                onClick={cancelMatchmaking}
              >
                Hủy tìm trận
              </Button>
            )}
          </motion.div>
        )}

        {/* 3. BATTLE STATE */}
        {gameState === "battle" && matchedOpponent && currentWord && (
          <motion.div
            key="battle-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Top stats bar: User vs Opponent */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-3xl border border-slate-200/60 dark:border-neutral-850 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan-500" />
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-amber-500" />

              {/* Player Left (User) */}
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="h-11 w-11 rounded-2xl bg-cyan-50 dark:bg-neutral-950 border border-cyan-100 dark:border-cyan-950 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {user?.avatarEmoji || "🦉"}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 max-w-[90px] truncate leading-tight">
                    {user?.fullName || "Bạn"}
                  </h4>
                  {/* Segmented points */}
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {Array.from({ length: getDifficultySettings(difficulty).totalQuestions }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          getDifficultySettings(difficulty).totalQuestions <= 5
                            ? "w-4"
                            : getDifficultySettings(difficulty).totalQuestions <= 10
                            ? "w-2.5"
                            : "w-1.5"
                        } ${
                          i < userScore
                            ? "bg-cyan-500 shadow-sm shadow-cyan-400/50"
                            : "bg-slate-100 dark:bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Timer Center Circular */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="relative h-14 w-14 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-neutral-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-cyan-500 transition-all duration-1000"
                      strokeDasharray={`${(timer / getDifficultySettings(difficulty).timeLimit) * 100}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="text-xs font-black text-slate-800 dark:text-white leading-none relative z-10">{timer}s</span>
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase mt-1 tracking-wider">CÂU {currentQuestionIndex + 1}/{getDifficultySettings(difficulty).totalQuestions}</span>
                
                {/* Surrender Button */}
                <button
                  type="button"
                  onClick={handleGiveUp}
                  className="mt-2.5 inline-flex flex-row items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/10 text-[9px] font-black text-rose-550 dark:text-rose-455 uppercase tracking-wide cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/20 active:scale-95 transition-all whitespace-nowrap"
                >
                  <Flag className="h-3 w-3 shrink-0" />
                  <span>Bỏ cuộc</span>
                </button>
              </div>

              {/* Opponent Right */}
              <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3 text-right">
                <div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate leading-tight max-w-[90px]">
                    {matchedOpponent.name}
                  </h4>
                  {/* Segmented points */}
                  <div className="flex gap-1 mt-1.5 justify-end flex-wrap">
                    {Array.from({ length: getDifficultySettings(difficulty).totalQuestions }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          getDifficultySettings(difficulty).totalQuestions <= 5
                            ? "w-4"
                            : getDifficultySettings(difficulty).totalQuestions <= 10
                            ? "w-2.5"
                            : "w-1.5"
                        } ${
                          i < opponentScore
                            ? "bg-amber-500 shadow-sm shadow-amber-400/50"
                            : "bg-slate-100 dark:bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-amber-50 dark:bg-neutral-950 border border-amber-100 dark:border-amber-950 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {matchedOpponent.avatarEmoji}
                </div>
              </div>
            </div>

            {/* AI Opponent action card overlay */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-850 text-center flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-555">Đối thủ:</span>
              {opponentStatus === "thinking" ? (
                <span className="text-xs font-semibold text-slate-400 animate-pulse">{matchedOpponent.name} đang suy nghĩ...</span>
              ) : opponentStatus === "answered_correct" ? (
                <Badge variant="success" className="text-[10px] font-bold">Đã trả lời đúng</Badge>
              ) : (
                <Badge variant="danger" className="text-[10px] font-bold">Đã trả lời sai</Badge>
              )}
            </div>
            <div className="bezel">
              <div className="bezel-inner bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md border border-slate-200/50 dark:border-neutral-800/80 p-5 sm:p-8 rounded-[30px] text-center space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

                {gameMode === "quiz" && (
                  <>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Chọn nghĩa chính xác của từ</span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">{currentWord.word}</h2>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">[{currentWord.phonetic}] · {currentWord.pos}</p>
                  </>
                )}
                {gameMode === "spelling" && (
                  <>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Hãy dịch từ này sang tiếng Anh</span>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">“{currentWord.definitionVn}”</h2>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">Từ loại: {currentWord.pos} · {currentWord.word.length} chữ cái</p>
                  </>
                )}
                {gameMode === "listening" && (
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Nghe phát âm và chọn nghĩa đúng</span>
                    <button
                      type="button"
                      onClick={() => playWordAudio(currentWord.word)}
                      className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/10 cursor-pointer active:scale-95 transition-all relative group"
                    >
                      <span className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping group-hover:block" />
                      <Volume2 className="h-7 w-7 animate-pulse" />
                    </button>
                    <p className="font-mono text-xs text-slate-450 dark:text-slate-500">Nhấp để phát lại âm thanh</p>
                  </div>
                )}
              </div>
            </div>

            {/* Answers & Interaction Panels */}
            {gameMode === "spelling" ? (
              <div className="bezel overflow-hidden">
                <div className="bezel-inner bg-white/65 dark:bg-neutral-900/60 backdrop-blur-md border border-slate-200/50 dark:border-neutral-800/80 p-6 rounded-[26px] space-y-5">
                  {/* Word slot placeholder display */}
                  <div className="flex items-center justify-center gap-1.5 min-h-[48px] py-2 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-850 shadow-inner px-4">
                    {answered ? (
                      <span className={`text-lg md:text-xl font-black ${
                        spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase()
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}>
                        {spellingInput || "(Không nhập)"}
                      </span>
                    ) : (
                      <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase font-mono">
                        {spellingInput || "..."}
                      </span>
                    )}
                  </div>

                  {/* Keyboard typewriter button suggestion layout */}
                  {!answered && (
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto py-2">
                      {scrambledLetters.map((char, index) => (
                        <button
                          key={index}
                          type="button"
                          className="h-11 w-11 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center shadow-[0_2.5px_0_rgba(0,0,0,0.06)] dark:shadow-[0_2px_0_rgba(255,255,255,0.04)] active:translate-y-[2px] active:shadow-none hover:bg-slate-50 dark:hover:bg-neutral-850 cursor-pointer select-none transition-all"
                          onClick={() => handleLetterClick(char)}
                        >
                          {char.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Spelling status text */}
                  {answered && (
                    <div className="text-center font-bold text-xs">
                      {spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase() ? (
                        <div className="text-emerald-600 dark:text-emerald-400 font-black">✓ ĐÚNG CHÍNH XÁC! Từ vựng: {currentWord.word}</div>
                      ) : (
                        <div className="text-rose-600 dark:text-rose-455 font-black">✗ SAI MẤT RỒI! Từ đúng là: <span className="underline font-mono">{currentWord.word}</span></div>
                      )}
                    </div>
                  )}

                  {/* Action buttons (Clear / Backspace / Submit) */}
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="bezel"
                      size="sm"
                      className="rounded-xl font-bold py-3 text-xs text-slate-555 select-none"
                      onClick={handleClearSpelling}
                      disabled={answered}
                    >
                      Xóa Hết
                    </Button>
                    <Button
                      variant="bezel"
                      size="sm"
                      className="rounded-xl font-bold py-3 text-xs text-slate-555 select-none"
                      onClick={handleBackspace}
                      disabled={answered}
                    >
                      Xóa chữ
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="rounded-xl font-bold py-3 text-xs shadow-md shadow-emerald-500/10 select-none"
                      onClick={handleSpellingSubmit}
                      disabled={answered}
                    >
                      Nộp Bài
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Options Grid for Quiz & Listening Modes */
              <div className="grid gap-3.5 md:grid-cols-2">
                {currentOptions.map((opt) => {
                  let optStyle = "border-slate-250 dark:border-neutral-850 bg-white/70 dark:bg-neutral-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 cursor-pointer shadow-sm";
                  if (answered) {
                    if (opt.id === currentWord.id) {
                      optStyle = "border-emerald-350 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-300/30 font-black";
                    } else if (selectedOptionId === opt.id) {
                      optStyle = "border-rose-350 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-455 ring-1 ring-rose-300/30 font-black";
                    } else {
                      optStyle = "opacity-40 border-slate-100 dark:border-neutral-850 text-slate-400";
                    }
                  }

                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={opt.id}
                      type="button"
                      className={`rounded-2xl border px-5 py-4 text-left text-xs md:text-sm font-bold transition-all leading-snug select-none ${optStyle}`}
                      onClick={() => handleUserAnswer(opt.id, currentWord.id)}
                      disabled={answered}
                    >
                      {opt.definitionVn}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* 4. RESULTS STATE */}
        {gameState === "results" && matchedOpponent && (
          <motion.div
            key="results-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="text-center py-12 max-w-md mx-auto space-y-8 animate-fade-in"
          >
            <div className="space-y-4">
              {userScore > opponentScore ? (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
                    <Trophy className="h-10 w-10 animate-bounce" strokeWidth={1.3} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">CHIẾN THẮNG! 🎉</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Bạn đã áp đảo đối thủ hoàn toàn.</p>
                </>
              ) : userScore === opponentScore ? (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-850 text-slate-555">
                    <RotateCcw className="h-10 w-10 animate-pulse" strokeWidth={1.3} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-200 font-display">HÒA NHAU! 🤝</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Kẻ tám lạng người nửa cân.</p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500">
                    <XCircle className="h-10 w-10 animate-pulse" strokeWidth={1.3} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-rose-600 dark:text-rose-455 font-display">THẤT BẠI! 💔</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Hãy rèn luyện thêm và phục thù.</p>
                </>
              )}
            </div>

            <div className="max-w-md mx-auto bezel-outer p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-3xl">
              <div className="bezel-inner rounded-[calc(1.5rem-6px)] bg-white dark:bg-neutral-900 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-850 pb-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">Báo cáo trận đấu</span>
                  <Badge variant={userScore > opponentScore ? "success" : "neutral"} className="font-bold">
                    +{calculatedXpGained()} XP
                  </Badge>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <div className="text-center">
                    <span className="text-2xl">{user?.avatarEmoji || "🦉"}</span>
                    <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-1 max-w-[80px] mx-auto truncate">
                      Bạn
                    </h4>
                    <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white block mt-1 font-display">{userScore}</span>
                  </div>

                  <div className="text-center text-xs font-black text-slate-400 uppercase tracking-widest">VS</div>

                  <div className="text-center">
                    <span className="text-2xl">{matchedOpponent.avatarEmoji}</span>
                    <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-1 max-w-[80px] mx-auto truncate">
                      {matchedOpponent.name}
                    </h4>
                    <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white block mt-1 font-display">{opponentScore}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/dashboard" className="w-full">
                <Button variant="bezel" className="w-full py-3.5 text-xs md:text-sm font-bold cursor-pointer rounded-2xl">
                  Trang chủ
                </Button>
              </Link>
              <Button
                variant="primary"
                className="w-full py-3.5 text-xs md:text-sm font-bold cursor-pointer rounded-2xl shadow-glow"
                onClick={() => {
                  setMatchedOpponent(null);
                  setUserScore(0);
                  setOpponentScore(0);
                  setGameState("lobby");
                }}
              >
                Tìm Trận Mới
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
