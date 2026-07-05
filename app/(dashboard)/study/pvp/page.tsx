"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { MOCK_VOCABULARIES } from "@/lib/constants/vocabularies";
import { Button, Card, Badge } from "@/components/ui";
import {
  Swords,
  User as UserIcon,
  Zap,
  Timer,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface Opponent {
  name: string;
  avatarEmoji: string;
  level: number;
  title: string;
}

const MOCK_OPPONENTS: Opponent[] = [
  { name: "Minh Thu", avatarEmoji: "🦊", level: 6, title: "Word Apprentice" },
  { name: "Sarah Connor", avatarEmoji: "🦁", level: 11, title: "Vocabulary Scholar" },
  { name: "Gia Bảo", avatarEmoji: "🦉", level: 8, title: "English Seeker" },
  { name: "Alex Mercer", avatarEmoji: "🐼", level: 12, title: "Language Specialist" },
];

export default function PvpQuizArenaPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [gameState, setGameState] = useState<"lobby" | "searching" | "battle" | "results">("lobby");
  
  // Opponent matching state
  const [matchedOpponent, setMatchedOpponent] = useState<Opponent | null>(null);
  const [searchTime, setSearchTime] = useState(0);
  
  // Game state
  const [gameQuestions, setGameQuestions] = useState<typeof MOCK_VOCABULARIES>([]);
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

  // 1. MATCHMAKING PROCESS
  const startMatchmaking = () => {
    setGameState("searching");
    setSearchTime(0);
    
    searchTimerRef.current = setInterval(() => {
      setSearchTime((prev) => {
        if (prev >= 4) {
          // Found Match!
          clearInterval(searchTimerRef.current!);
          const randomOpp = MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
          setMatchedOpponent(randomOpp);
          
          // Select 5 random questions
          const shuffled = [...MOCK_VOCABULARIES].sort(() => 0.5 - Math.random());
          setGameQuestions(shuffled.slice(0, 5));
          
          setTimeout(() => {
            setGameState("battle");
            startQuestion(0);
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

  // 2. BATTLE STAGE LOOP
  const startQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setTimer(10);
    setAnswered(false);
    setSelectedOptionId(null);
    setOpponentStatus("thinking");

    // Start 10 seconds timer
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    
    gameTimerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(gameTimerRef.current!);
          // Timeout, move to next question automatically
          handleNextQuestionOrEnd(index);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // AI opponent answers with some random delay (2 to 5 seconds)
    const aiDelay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      // AI accuracy chance based on level
      const accuracy = matchedOpponent ? 0.5 + matchedOpponent.level * 0.03 : 0.7;
      const isCorrect = Math.random() < accuracy;
      
      setOpponentStatus(isCorrect ? "answered_correct" : "answered_incorrect");
      if (isCorrect) {
        setOpponentScore((prev) => prev + 1);
      }
    }, aiDelay);
  };

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
      handleNextQuestionOrEnd(currentQuestionIndex);
    }, 1500);
  };

  const handleNextQuestionOrEnd = (index: number) => {
    if (index < 4) {
      startQuestion(index + 1);
    } else {
      // Game Over: submit results
      setGameState("results");
      submitMatchResults();
    }
  };

  // 3. SUBMIT RESULTS
  const submitMatchResults = async () => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    
    const isWin = userScore > opponentScore;
    const isDraw = userScore === opponentScore;
    const result = isWin ? "WIN" : isDraw ? "DRAW" : "LOSE";
    const xpGained = isWin ? 30 : isDraw ? 15 : 5;

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
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, []);

  const currentWord = gameQuestions[currentQuestionIndex];
  
  // Options generation for current battle question
  const currentOptions = React.useMemo(() => {
    if (!currentWord) return [];
    const otherWords = MOCK_VOCABULARIES.filter((v) => v.id !== currentWord.id);
    const decoys = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentWord, ...decoys].sort(() => 0.5 - Math.random());
  }, [currentWord, currentQuestionIndex]);

  // UI rendering based on gameState
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 1. LOBBY STATE */}
      {gameState === "lobby" && (
        <div className="text-center py-12 space-y-8 animate-fade-in">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500">
            <Swords className="h-10 w-10 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Đấu trường PvP Từ Vựng
            </h1>
            <p className="text-muted text-sm max-w-sm mx-auto">
              So tài kiến thức từ vựng tiếng Anh thời gian thực. Thắng trận để nhận cúp, tích lũy XP cực đỉnh!
            </p>
          </div>

          <div className="max-w-md mx-auto bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <span className="text-xs font-black uppercase text-slate-400">Hồ sơ thi đấu</span>
                <Badge variant="primary">Trực tuyến</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-xl">
                  {user?.avatarEmoji || "🦉"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {user?.fullName || "Học viên"}
                  </h4>
                  <p className="text-xs text-muted">
                    Cấp độ {user?.level || 1} · {user?.title || "Newbie"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button
              variant="primary"
              className="px-10 py-4 font-bold text-sm"
              onClick={startMatchmaking}
            >
              Tìm Trận Đấu Ngay
            </Button>
          </div>
        </div>
      )}

      {/* 2. SEARCHING STATE */}
      {gameState === "searching" && (
        <div className="text-center py-16 space-y-8 animate-fade-in">
          <div className="relative mx-auto h-40 w-40 flex items-center justify-center">
            {/* Pulsing Radar rings */}
            <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-ping opacity-60"></div>
            <div className="absolute inset-4 rounded-full border border-sky-500/20 animate-pulse"></div>
            <div className="h-24 w-24 rounded-full bg-sky-50 dark:bg-sky-950/20 border border-sky-200/50 flex items-center justify-center relative z-10">
              <Swords className="h-8 w-8 text-sky-500 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-2">
            {matchedOpponent ? (
              <div className="space-y-4">
                <Badge variant="success" className="animate-bounce">ĐÃ TÌM THẤY ĐỐI THỦ</Badge>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="text-right">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{user?.fullName || "Bạn"}</h4>
                    <span className="text-xs text-muted">LV {user?.level || 1}</span>
                  </div>
                  <span className="text-xl font-bold text-sky-500 animate-pulse">VS</span>
                  <div className="text-left flex items-center gap-2">
                    <span className="text-2xl">{matchedOpponent.avatarEmoji}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{matchedOpponent.name}</h4>
                      <span className="text-xs text-muted">LV {matchedOpponent.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-200">Đang tìm kiếm đối thủ...</h3>
                <p className="text-xs text-muted">Thời gian chờ: {searchTime} giây</p>
              </>
            )}
          </div>

          {!matchedOpponent && (
            <Button
              variant="ghost"
              className="text-xs text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/10"
              onClick={cancelMatchmaking}
            >
              Hủy tìm trận
            </Button>
          )}
        </div>
      )}

      {/* 3. BATTLE STATE */}
      {gameState === "battle" && matchedOpponent && currentWord && (
        <div className="space-y-6 animate-fade-in">
          {/* Top stats bar: User vs Opponent */}
          <div className="grid grid-cols-3 items-center bg-white dark:bg-neutral-900 p-4 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm">
            {/* Player Left (User) */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{user?.avatarEmoji || "🦉"}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                  {user?.fullName || "Bạn"}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${(userScore / 5) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">{userScore}/5</span>
                </div>
              </div>
            </div>

            {/* Timer Center */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-black text-slate-700 dark:text-slate-200">
                <Timer className="h-3.5 w-3.5 text-sky-500 animate-spin" />
                <span>{timer}s</span>
              </div>
              <span className="text-[10px] text-muted font-bold uppercase mt-1">Câu {currentQuestionIndex + 1}/5</span>
            </div>

            {/* Opponent Right */}
            <div className="flex items-center justify-end gap-2 text-right">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {matchedOpponent.name}
                </h4>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">{opponentScore}/5</span>
                  <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${(opponentScore / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <span className="text-2xl">{matchedOpponent.avatarEmoji}</span>
            </div>
          </div>

          {/* AI Opponent action card overlay */}
          <div className="bg-slate-50 dark:bg-neutral-950/40 p-3 rounded-2xl border border-slate-100 dark:border-neutral-900 text-center flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-slate-500">Đối thủ:</span>
            {opponentStatus === "thinking" ? (
              <span className="text-xs font-semibold text-slate-400 animate-pulse">Minh Thu đang trả lời...</span>
            ) : opponentStatus === "answered_correct" ? (
              <Badge variant="success" className="text-[10px]">Đã trả lời đúng</Badge>
            ) : (
              <Badge variant="danger" className="text-[10px]">Đã trả lời sai</Badge>
            )}
          </div>

          {/* Question Text block */}
          <div className="bezel">
            <div className="bezel-inner bg-gradient-to-br from-indigo-50/20 to-sky-50/20 dark:from-indigo-950/10 dark:to-sky-950/10 p-8 rounded-[30px] text-center space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Chọn nghĩa chính xác của từ</span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{currentWord.word}</h2>
              <p className="font-mono text-sm text-slate-500">[{currentWord.phonetic}] · {currentWord.pos}</p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid gap-3 md:grid-cols-2">
            {currentOptions.map((opt) => {
              let optStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300";
              if (answered) {
                if (opt.id === currentWord.id) {
                  optStyle = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-300";
                } else if (selectedOptionId === opt.id) {
                  optStyle = "border-rose-400 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 ring-2 ring-rose-300";
                } else {
                  optStyle = "opacity-50";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all ${optStyle}`}
                  onClick={() => handleUserAnswer(opt.id, currentWord.id)}
                  disabled={answered}
                >
                  {opt.definitionVn}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. RESULTS STATE */}
      {gameState === "results" && matchedOpponent && (
        <div className="text-center py-12 max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            {userScore > opponentScore ? (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20">
                  <Trophy className="h-10 w-10 animate-bounce" />
                </div>
                <h1 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">CHIẾN THẮNG! 🎉</h1>
                <p className="text-xs text-muted">Bạn đã áp đảo đối thủ hoàn toàn.</p>
              </>
            ) : userScore === opponentScore ? (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
                  <RotateCcw className="h-10 w-10 animate-pulse" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-200">HÒA NHAU! 🤝</h1>
                <p className="text-xs text-muted">Kẻ tám lạng người nửa cân.</p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950/20">
                  <XCircle className="h-10 w-10 animate-pulse" />
                </div>
                <h1 className="text-3xl font-black text-rose-600 dark:text-rose-400 font-extrabold">THẤT BẠI! 💔</h1>
                <p className="text-xs text-muted">Hãy rèn luyện thêm và phục thù.</p>
              </>
            )}
          </div>

          <div className="bezel">
            <div className="bezel-inner bg-white dark:bg-neutral-900 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                <span className="text-xs font-black uppercase text-slate-400">Báo cáo trận đấu</span>
                <Badge variant={userScore > opponentScore ? "success" : "neutral"}>
                  +{userScore > opponentScore ? 30 : userScore === opponentScore ? 15 : 5} XP
                </Badge>
              </div>

              <div className="grid grid-cols-3 items-center">
                <div className="text-center">
                  <span className="text-2xl">{user?.avatarEmoji || "🦉"}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 max-w-[80px] mx-auto truncate">
                    Bạn
                  </h4>
                  <span className="text-xl font-black text-slate-900 dark:text-slate-100 block mt-1">{userScore}</span>
                </div>

                <div className="text-center text-xs font-bold text-slate-400">VS</div>

                <div className="text-center">
                  <span className="text-2xl">{matchedOpponent.avatarEmoji}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 max-w-[80px] mx-auto truncate">
                    {matchedOpponent.name}
                  </h4>
                  <span className="text-xl font-black text-slate-900 dark:text-slate-100 block mt-1">{opponentScore}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard" className="w-full">
              <Button variant="bezel" className="w-full py-3.5 text-sm font-bold">
                Trang chủ
              </Button>
            </Link>
            <Button
              variant="primary"
              className="w-full py-3.5 text-sm font-bold"
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
        </div>
      )}
    </div>
  );
}
