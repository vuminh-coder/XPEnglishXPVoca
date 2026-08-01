"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useDailyChallengeStore } from "@/lib/store/dailyChallengeStore";
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
  Zap,
  Target,
  Shield,
  ArrowRight,
  CheckCircle2,
  Medal,
  Users,
  Flame,
  Bot,
  Clock,
  Copy,
  Check,
  KeyRound,
  UserPlus,
  Play,
  Share2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Opponent {
  name: string;
  avatarEmoji: string;
  level: number;
  title: string;
}

interface QuestionPackage {
  question: any;
  options: any[];
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
  const letters = word.toLowerCase().replace(/[^a-z0-9]/g, "").split("");
  return [...letters].sort(() => 0.5 - Math.random());
}

function normalizeWordForCheck(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function playWordAudio(word: string) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

export default function PvpQuizArenaPage() {
  const { user } = useAuthStore();
  const userAvatarUrl = user?.imageUrl || (user as any)?.avatar || (user as any)?.avatarUrl;
  const currentUserId = user?.id || "guest_pvp_user";

  // Main PvP flow state
  const [matchType, setMatchType] = useState<"quick" | "room">("quick");
  const [gameState, setGameState] = useState<"lobby" | "room_created" | "searching" | "starting_count" | "battle" | "results">("lobby");

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [gameMode, setGameMode] = useState<"quiz" | "spelling" | "listening">("quiz");

  // Room 1v1 State (5-digit code)
  const [roomSubTab, setRoomSubTab] = useState<"create" | "join">("create");
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomRole, setRoomRole] = useState<"host" | "guest" | null>(null);
  const [isRoomLoading, setIsRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [roomStartCountdown, setRoomStartCountdown] = useState(3);

  // Spelling clash state
  const [spellingInput, setSpellingInput] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);

  // Opponent matching state
  const [matchedOpponent, setMatchedOpponent] = useState<Opponent | null>(null);
  const [searchTime, setSearchTime] = useState(0);

  // Question & Battle state
  const [gameQuestions, setGameQuestions] = useState<QuestionPackage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [answered, setAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Track exact question status array for live battle dots
  const [userQuestionResults, setUserQuestionResults] = useState<(boolean | null)[]>([]);
  const [oppQuestionResults, setOppQuestionResults] = useState<(boolean | null)[]>([]);

  // Track opponent status indicator
  const [opponentStatus, setOpponentStatus] = useState<"thinking" | "answered_correct" | "answered_incorrect">("thinking");

  // Server results submission state
  const [serverMatchData, setServerMatchData] = useState<{ xpGained: number; levelUp: boolean } | null>(null);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);

  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const aiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize per-question state
  const startQuestion = useCallback((index: number, questionsList: QuestionPackage[]) => {
    setCurrentQuestionIndex(index);
    const settings = getDifficultySettings(difficulty);
    setTimer(settings.timeLimit);
    setAnswered(false);
    setSelectedOptionId(null);
    setOpponentStatus("thinking");
    setSpellingInput("");

    if (gameMode === "spelling" && questionsList[index]?.question?.word) {
      setScrambledLetters(scrambleWord(questionsList[index].question.word));
    }

    if (gameMode === "listening" && questionsList[index]?.question?.word) {
      playWordAudio(questionsList[index].question.word);
    }

    if (matchType === "quick") {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      const aiDelay = getAiDelay(difficulty);

      aiTimerRef.current = setTimeout(() => {
        const isCorrect = getAiIsCorrect(difficulty);
        setOpponentStatus(isCorrect ? "answered_correct" : "answered_incorrect");

        setOppQuestionResults((prev) => {
          const next = [...prev];
          next[index] = isCorrect;
          return next;
        });

        if (isCorrect) {
          setOpponentScore((prev) => prev + 1);
        }
      }, aiDelay);
    }
  }, [difficulty, gameMode, matchType]);

  // Submit real-time room progress to server
  const submitRoomProgress = useCallback((score: number, index: number, isCorrect: boolean) => {
    if (matchType !== "room" || !roomCode) return;
    fetch("/api/pvp/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUserId,
      },
      body: JSON.stringify({
        action: "submit-progress",
        code: roomCode,
        score,
        questionIndex: index,
        isCorrect,
        userId: currentUserId,
      }),
    }).catch((e) => console.error("Error submitting room progress:", e));
  }, [matchType, roomCode, currentUserId]);

  // REAL-TIME 1V1 ROOM POLLING EFFECT (Runs continuously while in a room)
  useEffect(() => {
    if (matchType !== "room" || !roomCode) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/pvp/room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": currentUserId,
          },
          body: JSON.stringify({ action: "get", code: roomCode, userId: currentUserId }),
        });
        const json = await res.json();

        if (json.success && json.room) {
          const r = json.room;

          // 1. Sync Opponent Profile
          if (json.role === "host" && r.guestName) {
            setMatchedOpponent({
              name: r.guestName,
              avatarEmoji: r.guestAvatar || "🦉",
              level: r.guestLevel || 1,
              title: "Guest Gladiator",
            });
          } else if (json.role === "guest" && r.hostName) {
            setMatchedOpponent({
              name: r.hostName,
              avatarEmoji: r.hostAvatar || "🦊",
              level: r.hostLevel || 1,
              title: "Host Gladiator",
            });
          }

          // 2. Sync Synchronized Start Countdown (3.. 2.. 1..)
          if (r.status === "STARTING") {
            if (r.startTime) {
              const diffMs = r.startTime - Date.now();
              const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));
              setRoomStartCountdown(secondsLeft);
              if (gameState !== "starting_count") {
                setGameState("starting_count");
              }
              if (secondsLeft <= 0) {
                setGameState("battle");
                setUserQuestionResults(Array(r.questions.length).fill(null));
                setOppQuestionResults(Array(r.questions.length).fill(null));
                startQuestion(0, r.questions);
              }
            }
          }

          // 3. Sync Realtime Battle Scores & Indicator Dots
          if (r.status === "BATTLE") {
            if (gameState !== "battle" && gameState !== "starting_count") {
              setGameState("battle");
              setUserQuestionResults(Array(r.questions.length).fill(null));
              setOppQuestionResults(Array(r.questions.length).fill(null));
              startQuestion(0, r.questions);
            }

            const isHost = json.role === "host";
            const oppScore = isHost ? r.guestScore : r.hostScore;
            const oppResults = isHost ? r.guestResults : r.hostResults;

            setOpponentScore(oppScore);
            if (Array.isArray(oppResults)) {
              setOppQuestionResults(oppResults);
              const currentOppRes = oppResults[currentQuestionIndex];
              if (currentOppRes === true) {
                setOpponentStatus("answered_correct");
              } else if (currentOppRes === false) {
                setOpponentStatus("answered_incorrect");
              } else {
                setOpponentStatus("thinking");
              }
            }
          }

          // 4. Sync Finish Match
          if (r.status === "FINISHED" && gameState === "battle") {
            setGameState("results");
            submitMatchResults();
          }
        }
      } catch (e) {
        console.error("Room sync error:", e);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [matchType, roomCode, gameState, currentQuestionIndex, startQuestion, currentUserId]);

  // Clean Countdown Timer for questions
  useEffect(() => {
    if (gameState !== "battle") return;

    if (timer <= 0) {
      if (!answered) {
        setAnswered(true);
        setUserQuestionResults((prev) => {
          const next = [...prev];
          next[currentQuestionIndex] = false;
          return next;
        });
        submitRoomProgress(userScore, currentQuestionIndex, false);
      }

      const timeoutId = setTimeout(() => {
        handleNextQuestionOrEnd(currentQuestionIndex, gameQuestions);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, timer, answered, currentQuestionIndex, gameQuestions, userScore, submitRoomProgress]);

  // Physical Keyboard Listener for Spelling Mode
  useEffect(() => {
    if (gameState !== "battle" || gameMode !== "spelling" || answered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        setSpellingInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSpellingSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSpellingInput("");
      } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        e.preventDefault();
        setSpellingInput((prev) => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, gameMode, answered, spellingInput, currentQuestionIndex, gameQuestions]);

  const handleNextQuestionOrEnd = (index: number, questionsList: QuestionPackage[]) => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    if (index < questionsList.length - 1) {
      startQuestion(index + 1, questionsList);
    } else {
      setGameState("results");
      submitMatchResults();
    }
  };

  const handleUserAnswer = (optionId: string, correctId: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptionId(optionId);

    const isCorrect = optionId === correctId;
    const newScore = isCorrect ? userScore + 1 : userScore;

    setUserQuestionResults((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = isCorrect;
      return next;
    });

    if (isCorrect) {
      setUserScore(newScore);
    }

    submitRoomProgress(newScore, currentQuestionIndex, isCorrect);

    setTimeout(() => {
      handleNextQuestionOrEnd(currentQuestionIndex, gameQuestions);
    }, 1200);
  };

  const handleSpellingSubmit = () => {
    const currentWord = gameQuestions[currentQuestionIndex]?.question;
    if (answered || !currentWord) return;

    setAnswered(true);
    const userClean = normalizeWordForCheck(spellingInput);
    const targetClean = normalizeWordForCheck(currentWord.word);
    const isCorrect = userClean === targetClean;
    const newScore = isCorrect ? userScore + 1 : userScore;

    setUserQuestionResults((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = isCorrect;
      return next;
    });

    if (isCorrect) {
      setUserScore(newScore);
    }

    submitRoomProgress(newScore, currentQuestionIndex, isCorrect);

    setTimeout(() => {
      handleNextQuestionOrEnd(currentQuestionIndex, gameQuestions);
    }, 1400);
  };

  // Start AI Matchmaking
  const startMatchmaking = () => {
    setMatchType("quick");
    setGameState("searching");
    setSearchTime(0);

    setCurrentQuestionIndex(0);
    setUserScore(0);
    setOpponentScore(0);
    setAnswered(false);
    setSelectedOptionId(null);
    setSpellingInput("");

    fetch("/api/vocabulary?limit=100&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (!res.success || !res.data || res.data.length === 0) {
          throw new Error("Empty vocabulary pool");
        }
        const pool = res.data;

        searchTimerRef.current = setInterval(() => {
          setSearchTime((prev) => {
            const nextTime = prev + 1;
            if (nextTime >= 3) {
              clearInterval(searchTimerRef.current!);
              const randomOpp = MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
              setMatchedOpponent(randomOpp);

              const settings = getDifficultySettings(difficulty);
              let filteredPool = pool.filter((v: any) => settings.vocabFilter(v.word));
              if (filteredPool.length < settings.totalQuestions) filteredPool = pool;
              if (filteredPool.length === 0) {
                filteredPool = [
                  { id: "mock1", word: "Victory", definitionVn: "Chiến thắng", definition: "Success in a struggle", pos: "noun", phonetic: "ˈvɪktəri" },
                  { id: "mock2", word: "Gladiator", definitionVn: "Đấu sĩ", definition: "A fighter in ancient Rome", pos: "noun", phonetic: "ˈɡlædieɪtər" },
                ];
              }

              const shuffledQuestions = [...filteredPool].sort(() => 0.5 - Math.random()).slice(0, settings.totalQuestions);
              const packages = shuffledQuestions.map((q) => {
                const otherWords = pool.filter((v: any) => v.id !== q.id);
                const decoys = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
                const options = [q, ...decoys].sort(() => 0.5 - Math.random());
                return { question: q, options };
              });

              setGameQuestions(packages);
              setUserQuestionResults(Array(packages.length).fill(null));
              setOppQuestionResults(Array(packages.length).fill(null));

              setTimeout(() => {
                setGameState("battle");
                startQuestion(0, packages);
              }, 1500);
            }
            return nextTime;
          });
        }, 1000);
      })
      .catch((e) => {
        console.error("Matchmaking fetch error:", e);
        const fallbackPool = [
          { id: "mock1", word: "Victory", definitionVn: "Chiến thắng", definition: "Success", pos: "noun", phonetic: "ˈvɪktəri" },
          { id: "mock2", word: "Champion", definitionVn: "Quán quân", definition: "Winner", pos: "noun", phonetic: "ˈtʃæmpiən" },
        ];
        const packages = fallbackPool.map((q) => ({ question: q, options: [q] }));
        setGameQuestions(packages);
        setUserQuestionResults(Array(packages.length).fill(null));
        setOppQuestionResults(Array(packages.length).fill(null));

        const randomOpp = MOCK_OPPONENTS[0];
        setMatchedOpponent(randomOpp);
        setGameState("battle");
        startQuestion(0, packages);
      });
  };

  // ROOM 1V1: Create 5-digit Room
  const handleCreateRoom = async () => {
    setIsRoomLoading(true);
    setRoomError(null);
    try {
      const vocabRes = await fetch("/api/vocabulary?limit=100&random=true");
      const vocabJson = await vocabRes.json();
      const pool = vocabJson.data || [];

      const settings = getDifficultySettings(difficulty);
      let filteredPool = pool.filter((v: any) => settings.vocabFilter(v.word));
      if (filteredPool.length < settings.totalQuestions) filteredPool = pool;
      if (filteredPool.length === 0) {
        filteredPool = [
          { id: "m1", word: "Challenge", definitionVn: "Thách thức", pos: "noun", phonetic: "ˈtʃælɪndʒ" },
          { id: "m2", word: "Arena", definitionVn: "Đấu trường", pos: "noun", phonetic: "əˈriːnə" },
        ];
      }

      const shuffledQuestions = [...filteredPool].sort(() => 0.5 - Math.random()).slice(0, settings.totalQuestions);
      const packages = shuffledQuestions.map((q) => {
        const otherWords = pool.filter((v: any) => v.id !== q.id);
        const decoys = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [q, ...decoys].sort(() => 0.5 - Math.random());
        return { question: q, options };
      });

      const res = await fetch("/api/pvp/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          action: "create",
          gameMode,
          difficulty,
          questions: packages,
          userId: currentUserId,
          userName: user?.fullName || "Chủ phòng",
          userAvatar: userAvatarUrl || "🦊",
        }),
      });

      const json = await res.json();
      if (!json.success || !json.room) {
        throw new Error(json.error || "Không thể tạo phòng thi đấu");
      }

      setMatchType("room");
      setRoomCode(json.room.code);
      setRoomRole("host");
      setGameQuestions(json.room.questions);
      setGameState("room_created");
    } catch (e: any) {
      setRoomError(e.message || "Lỗi tạo phòng 1v1");
    } finally {
      setIsRoomLoading(false);
    }
  };

  // ROOM 1V1: Join Room with 5-digit code
  const handleJoinRoom = async () => {
    if (!inputRoomCode || inputRoomCode.trim().length !== 5) {
      setRoomError("Vui lòng nhập đúng mã phòng 5 chữ số");
      return;
    }

    setIsRoomLoading(true);
    setRoomError(null);

    try {
      const res = await fetch("/api/pvp/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          action: "join",
          code: inputRoomCode.trim(),
          userId: currentUserId,
          userName: user?.fullName || "Khách gia nhập",
          userAvatar: userAvatarUrl || "🦉",
        }),
      });

      const json = await res.json();
      if (!json.success || !json.room) {
        throw new Error(json.error || "Không tìm thấy phòng");
      }

      setMatchType("room");
      setRoomCode(json.room.code);
      setRoomRole(json.role);
      setGameQuestions(json.room.questions);

      const hostOpponent: Opponent = {
        name: json.room.hostName,
        avatarEmoji: json.room.hostAvatar || "🦊",
        level: json.room.hostLevel || 1,
        title: "Host Gladiator",
      };
      setMatchedOpponent(hostOpponent);
      setGameState("room_created");
    } catch (e: any) {
      setRoomError(e.message || "Lỗi tham gia phòng");
    } finally {
      setIsRoomLoading(false);
    }
  };

  // ROOM 1V1: Start Match (Host Only)
  const handleHostStartRoomMatch = async () => {
    if (!roomCode) return;
    try {
      const res = await fetch("/api/pvp/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({ action: "start", code: roomCode, userId: currentUserId }),
      });
      const json = await res.json();
      if (json.success) {
        setGameState("starting_count");
        setRoomStartCountdown(3);
      }
    } catch (e) {
      console.error("Error starting room match:", e);
    }
  };

  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const cancelMatchmaking = () => {
    if (searchTimerRef.current) clearInterval(searchTimerRef.current);
    if (roomCode) {
      fetch("/api/pvp/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({ action: "leave", code: roomCode, userId: currentUserId }),
      }).catch((e) => console.error(e));
    }
    setRoomCode(null);
    setRoomRole(null);
    setGameState("lobby");
  };

  async function submitMatchResults() {
    const isWin = userScore > opponentScore;
    const isDraw = userScore === opponentScore;
    const result = isWin ? "WIN" : isDraw ? "DRAW" : "LOSE";

    try {
      const res = await fetch("/api/pvp/match-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          opponent: matchedOpponent?.name || "AI Opponent",
          userScore,
          oppScore: opponentScore,
          result,
          userId: currentUserId,
        }),
      });
      const json = await res.json();

      if (json.success && json.profile) {
        setServerMatchData({
          xpGained: json.data?.xpGained ?? (result === "WIN" ? 50 : result === "DRAW" ? 25 : 10),
          levelUp: !!json.levelUp,
        });

        if (result === "WIN") {
          useDailyChallengeStore.getState().incrementProgress("win_pvp");
        }
        if (gameMode === "spelling") {
          useDailyChallengeStore.getState().incrementProgress("write_essay", userScore);
        }

        const currentLocalUser = useAuthStore.getState().user;
        if (currentLocalUser) {
          const updatedUser = {
            ...currentLocalUser,
            totalXp: json.profile.totalXp,
            level: json.profile.level,
            title: json.profile.title,
            coins: json.profile.coins ?? currentLocalUser.coins,
          };
          useAuthStore.setState({ user: updatedUser });
          if (typeof window !== "undefined") {
            localStorage.setItem(`xp_voca_user_${currentLocalUser.id}`, JSON.stringify(updatedUser));
          }
        }
      }
    } catch (e) {
      console.error("Error submitting match results:", e);
    }
  }

  const confirmGiveUp = () => {
    setShowGiveUpModal(false);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    submitGiveUpResults();
  };

  async function submitGiveUpResults() {
    try {
      const res = await fetch("/api/pvp/match-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          opponent: matchedOpponent?.name || "AI Opponent",
          userScore: 0,
          oppScore: gameQuestions.length || 10,
          result: "LOSE",
          userId: currentUserId,
        }),
      });
      const json = await res.json();
      if (json.success && json.profile) {
        const currentLocalUser = useAuthStore.getState().user;
        if (currentLocalUser) {
          const updatedUser = {
            ...currentLocalUser,
            totalXp: json.profile.totalXp,
            level: json.profile.level,
            title: json.profile.title,
            coins: json.profile.coins ?? currentLocalUser.coins,
          };
          useAuthStore.setState({ user: updatedUser });
          if (typeof window !== "undefined") {
            localStorage.setItem(`xp_voca_user_${currentLocalUser.id}`, JSON.stringify(updatedUser));
          }
        }
      }
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
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleLetterClick = (char: string) => {
    if (answered) return;
    setSpellingInput((prev) => prev + char.toUpperCase());
  };

  const handleBackspace = () => {
    if (answered) return;
    setSpellingInput((prev) => prev.slice(0, -1));
  };

  const handleClearSpelling = () => {
    if (answered) return;
    setSpellingInput("");
  };

  return (
    <div className="space-y-3.5 sm:space-y-4 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>

      {/* 0. HERO SPOTLIGHT BANNER */}
      <div className="p-3.5 sm:p-5 rounded-md bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 sm:w-52 h-44 sm:h-52 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1 font-display">
                <Swords className="w-3.5 h-3.5 text-amber-300" /> PvP Arena Live
              </span>
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-white/15 text-white border border-white/20 font-mono">
                1v1 Match & Room 5-Digit
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-2 pt-0.5">
              Đấu Trường Từ Vựng PvP
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h1>
            <p className="text-[11px] sm:text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              So tài từ vựng 1v1 trực tuyến qua Ghép Nhanh AI hoặc Tạo Phòng 5 Số thách đấu bạn bè. ⚔️
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <Link href="/community/leaderboard">
              <button className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shadow-2xs flex items-center gap-1.5 cursor-pointer font-display">
                <Trophy className="w-3.5 h-3.5 text-amber-300" /> Bảng xếp hạng
              </button>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* 1. LOBBY STATE */}
        {gameState === "lobby" && (
          <motion.div
            key="lobby-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-3.5"
          >
            {/* LEFT COLUMN: MATCH CONFIGURATION */}
            <div className="lg:col-span-7 space-y-3.5">

              {/* Match Type Switcher */}
              <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setMatchType("quick")}
                  className={`py-2 rounded-xs text-[11px] sm:text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    matchType === "quick"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Ghép Nhanh PvP (AI)
                </button>
                <button
                  type="button"
                  onClick={() => setMatchType("room")}
                  className={`py-2 rounded-xs text-[11px] sm:text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    matchType === "room"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-indigo-500" /> Phòng 1v1 (Mã 5 Số)
                </button>
              </div>

              {/* Match Type A: QUICK MATCH MATCHMAKING */}
              {matchType === "quick" && (
                <>
                  {/* Game Mode Selection */}
                  <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                        <Brain className="w-3.5 h-3.5 stroke-[2.2]" /> CHỌN CHẾ ĐỘ THÁCH ĐẤU
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400">3 Chế độ đối kháng</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {[
                        { id: "quiz" as const, name: "Trắc nghiệm", desc: "Chọn nghĩa từ vựng nhanh nhất", icon: Brain, color: "text-[#0059bb]" },
                        { id: "spelling" as const, name: "Đồ chữ", desc: "Sắp xếp / Gõ chữ cái hoàn thiện từ", icon: PenTool, color: "text-emerald-500" },
                        { id: "listening" as const, name: "Âm thanh", desc: "Nghe phát âm chọn nghĩa đúng", icon: Volume2, color: "text-purple-500" },
                      ].map((mode) => {
                        const isSelected = gameMode === mode.id;
                        const IconComp = mode.icon;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setGameMode(mode.id)}
                            className={`p-2.5 sm:p-3 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                              isSelected
                                ? "bg-blue-50/60 dark:bg-blue-950/40 border-[#0059bb] text-slate-900 dark:text-white shadow-2xs"
                                : "bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`w-7 h-7 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 flex items-center justify-center ${mode.color} shadow-2xs`}>
                                <IconComp className="w-3.5 h-3.5 stroke-[2.2]" />
                              </div>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-[#0059bb] shadow-2xs" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold font-display text-slate-900 dark:text-white">
                                {mode.name}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5 leading-tight">
                                {mode.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty Tier Selection */}
                  <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                        <Target className="w-3.5 h-3.5 stroke-[2.2]" /> CẤP ĐỘ ĐẤU TRƯỜNG
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400">Chọn mức độ AI</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: "easy" as const, name: "Dễ (Easy)", desc: "5 câu hỏi · 15s/câu · AI dễ thở", xp: "+15 XP" },
                        { id: "medium" as const, name: "Trung bình (Medium)", desc: "10 câu hỏi · 10s/câu · AI chuẩn xác", xp: "+30 XP" },
                        { id: "hard" as const, name: "Khó (Hard)", desc: "15 câu hỏi · 7s/câu · AI thần tốc", xp: "+50 XP" },
                      ].map((tier) => {
                        const isSelected = difficulty === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setDifficulty(tier.id)}
                            className={`w-full p-2.5 sm:p-3 rounded-xs border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? "bg-blue-50/60 dark:bg-blue-950/40 border-[#0059bb] shadow-2xs"
                                : "bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                            }`}
                          >
                            <div className="space-y-0.5 min-w-0">
                              <div className="text-xs font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                                <span>{tier.name}</span>
                              </div>
                              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                {tier.desc}
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded-xs text-[10px] font-black shrink-0 ${
                              isSelected
                                ? "bg-[#0059bb] text-white"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            }`}>
                              {tier.xp}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Match Launch CTA */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={startMatchmaking}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer font-display"
                      >
                        <Swords className="w-4 h-4" /> Bắt đầu tìm trận
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Match Type B: PRIVATE 1V1 ROOM WITH 5-DIGIT CODE */}
              {matchType === "room" && (
                <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                      <Users className="w-3.5 h-3.5 stroke-[2.2]" /> PHÒNG THÁCH ĐẤU 1V1 RIÊNG TƯ
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400">Mã 5 Số Realtime</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setRoomSubTab("create"); setRoomError(null); }}
                      className={`px-3 py-1.5 rounded-xs text-[11px] sm:text-xs font-bold cursor-pointer transition-all ${
                        roomSubTab === "create"
                          ? "bg-[#0059bb] text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      Tạo Phòng Mới
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRoomSubTab("join"); setRoomError(null); }}
                      className={`px-3 py-1.5 rounded-xs text-[11px] sm:text-xs font-bold cursor-pointer transition-all ${
                        roomSubTab === "join"
                          ? "bg-[#0059bb] text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      Nhập Mã 5 Số Gia Nhập
                    </button>
                  </div>

                  {roomError && (
                    <div className="p-2.5 rounded-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
                      ⚠️ {roomError}
                    </div>
                  )}

                  {/* Option A: Create Room */}
                  {roomSubTab === "create" && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Chế độ thi đấu
                          </label>
                          <select
                            value={gameMode}
                            onChange={(e) => setGameMode(e.target.value as any)}
                            className="w-full p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white"
                          >
                            <option value="quiz">Trắc nghiệm</option>
                            <option value="spelling">Đồ chữ (Gõ phím)</option>
                            <option value="listening">Âm thanh (Nghe)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Cấp độ từ vựng
                          </label>
                          <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as any)}
                            className="w-full p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white"
                          >
                            <option value="easy">Dễ (5 câu)</option>
                            <option value="medium">Trung bình (10 câu)</option>
                            <option value="hard">Khó (15 câu)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCreateRoom}
                        disabled={isRoomLoading}
                        className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer font-display"
                      >
                        {isRoomLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                        {isRoomLoading ? "Đang tạo phòng..." : "Khởi Tạo Mã Phòng 5 Số"}
                      </button>
                    </div>
                  )}

                  {/* Option B: Join Room */}
                  {roomSubTab === "join" && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          MÃ PHÒNG THÁCH ĐẤU (5 CHỮ SỐ)
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={inputRoomCode}
                          onChange={(e) => setInputRoomCode(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="Ví dụ: 84920"
                          className="w-full p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-base sm:text-lg font-black tracking-widest font-mono text-center focus:border-[#0059bb] focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleJoinRoom}
                        disabled={isRoomLoading || inputRoomCode.length !== 5}
                        className="w-full py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer font-display"
                      >
                        {isRoomLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                        {isRoomLoading ? "Đang kết nối..." : "Gia Nhập Phòng Thi Đấu"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: GLADIATOR PROFILE & LEADERBOARD */}
            <div className="lg:col-span-5 space-y-3.5">

              {/* Gladiator Profile */}
              <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#0059bb]" /> Hồ Sơ Đấu Sĩ
                  </h3>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                    Lv.{user?.level || 1}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-2xs font-display overflow-hidden border border-slate-200/50 dark:border-white/10">
                    {userAvatarUrl ? (
                      <img src={userAvatarUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                    ) : (
                      user?.avatarEmoji || (user?.fullName || "X").charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {user?.fullName || "Học viên XP"}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {user?.title || "Word Apprentice"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[10px] text-slate-400 font-medium block">Tổng XP</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{user?.totalXp || 0} XP</span>
                  </div>
                  <div className="p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                    <span className="text-[10px] text-slate-400 font-medium block">Danh hiệu</span>
                    <span className="text-xs font-black text-[#0059bb] dark:text-sky-400 truncate block">{user?.title || "Tập sự"}</span>
                  </div>
                </div>
              </div>

              {/* Season Leaderboards Widget */}
              <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Trophy className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      Bảng Vàng Đấu Trường
                    </span>
                  </div>
                  <Link href="/community/leaderboard" className="text-[10px] font-bold text-[#0059bb] hover:underline">
                    Xem full ➔
                  </Link>
                </div>

                <div className="space-y-1.5">
                  {[
                    { rank: 1, name: "Gia Bảo", avatar: "🦉", trophy: 1420, style: "bg-amber-50 dark:bg-amber-950/30 border-amber-200/60 text-amber-700 dark:text-amber-300" },
                    { rank: 2, name: "Minh Thu", avatar: "🦊", trophy: 1350, style: "bg-slate-50 dark:bg-slate-950/40 border-slate-200/60 text-slate-700 dark:text-slate-300" },
                    { rank: 3, name: "Sarah Connor", avatar: "🦁", trophy: 1290, style: "bg-amber-900/10 border-amber-700/30 text-amber-800 dark:text-amber-400" },
                  ].map((player) => (
                    <div
                      key={player.rank}
                      className={`p-2 rounded-xs border flex items-center justify-between text-xs font-medium ${player.style}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-black text-xs w-4 text-center">#{player.rank}</span>
                        <span className="text-base select-none">{player.avatar}</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate">{player.name}</span>
                      </div>
                      <span className="font-black text-amber-500 shrink-0 font-mono">{player.trophy} 🏆</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* 1.5 ROOM CREATED WAITING VIEW */}
        {gameState === "room_created" && (
          <motion.div
            key="room-waiting-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 sm:p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 sm:space-y-5 max-w-xl mx-auto text-center"
          >
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-black uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-display">
                Phòng Thi Đấu 1v1
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display pt-1">
                {roomRole === "host" ? "Phòng Chờ Đấu Sĩ" : "Đã Vào Phòng Thi Đấu"}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {roomRole === "host"
                  ? "Chia sẻ mã 5 chữ số bên dưới để bạn bè truy cập thi đấu."
                  : "Chờ chủ phòng nhấn bắt đầu trận đấu."}
              </p>
            </div>

            {/* 5-Digit Display Box */}
            <div className="p-3.5 sm:p-4 rounded-xs bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MÃ PHÒNG 5 CHỮ SỐ</span>
              <div className="text-2xl sm:text-4xl font-black text-[#0059bb] dark:text-sky-400 font-mono tracking-widest">
                {roomCode}
              </div>
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={copyRoomCode}
                  className="px-3 py-1 rounded-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs font-display"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
                  {copiedCode ? "Đã sao chép!" : "Sao chép mã"}
                </button>
              </div>
            </div>

            {/* 1v1 Player vs Opponent Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              {/* Host Slot */}
              <div className="p-3 rounded-xs bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-sm shrink-0 font-display overflow-hidden">
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="Host" className="w-full h-full object-cover" />
                  ) : (
                    "🦊"
                  )}
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                    {user?.fullName || "Chủ phòng"} (Host)
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    🟢 Đã sẵn sàng
                  </span>
                </div>
              </div>

              {/* Guest Slot */}
              <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 flex items-center gap-3">
                {matchedOpponent ? (
                  <>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 font-display">
                      {matchedOpponent.avatarEmoji}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                        {matchedOpponent.name}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        🟢 Đã tham gia
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 shrink-0">
                      <UserPlus className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-xs w-24 animate-pulse" />
                      <span className="text-[10px] font-bold text-amber-500 block mt-1">
                        🟡 Chờ nhập mã 5 số...
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={cancelMatchmaking}
                className="px-3 py-1.5 rounded-xs bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold cursor-pointer"
              >
                ✕ Thoát phòng
              </button>

              {roomRole === "host" ? (
                <button
                  type="button"
                  onClick={handleHostStartRoomMatch}
                  disabled={!matchedOpponent}
                  className="px-4 py-2 sm:px-5 sm:py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-display"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Bắt Đầu Trận Đấu
                </button>
              ) : (
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1 animate-pulse font-display">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Chờ Host bắt đầu...
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* 1.8 SYNCHRONIZED COUNTDOWN OVERLAY (3.. 2.. 1.. GO!) */}
        {gameState === "starting_count" && (
          <motion.div
            key="starting-count-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-8 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xl max-w-sm mx-auto text-center space-y-4"
          >
            <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-widest font-mono">
              ⚡ ĐỒNG BỘ THI ĐẤU 1V1 REALTIME
            </span>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0059bb] to-sky-400 text-white flex items-center justify-center font-black text-4xl font-mono mx-auto shadow-lg animate-bounce">
              {roomStartCountdown > 0 ? roomStartCountdown : "GO!"}
            </div>
            <p className="text-xs text-slate-500 font-medium">Chuẩn bị thi đấu cùng đối thủ...</p>
          </motion.div>
        )}

        {/* 2. DASHBOARD-STYLE MATCHMAKING CARD */}
        {gameState === "searching" && (
          <motion.div
            key="searching-panel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-4 sm:p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 max-w-2xl mx-auto"
          >
            {/* Header Strip */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xs bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 text-[#0059bb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Swords className="w-3.5 h-3.5 stroke-[2.2] animate-pulse" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                    {matchedOpponent ? "Đã Tìm Thấy Đối Thủ!" : "Đang Ghép Trận PvP Realtime..."}
                  </h3>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {matchedOpponent ? "Chuẩn bị vào phòng thi đấu 1v1" : "Đang tìm kiếm học viên tương đồng cấp độ"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black font-mono shadow-2xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> {searchTime < 10 ? `0${searchTime}` : searchTime}s
                </span>
              </div>
            </div>

            {/* Side-by-Side 1v1 Matchup Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 sm:gap-3 items-center">
              {/* Player 1 (You) */}
              <div className="md:col-span-3 p-3 sm:p-3.5 rounded-xs bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs font-display overflow-hidden border border-slate-200/50 dark:border-white/10">
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                  ) : (
                    user?.avatarEmoji || (user?.fullName || "X").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                      {user?.fullName || "Bạn"}
                    </h4>
                    <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-[#0059bb] text-white">
                      Lv.{user?.level || 1}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    🟢 Đã sẵn sàng
                  </span>
                </div>
              </div>

              {/* Center VS Pulse Divider */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-0.5 sm:py-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-[11px] sm:text-xs font-display shadow-2xs ring-2 ring-amber-300">
                  VS
                </div>
                <div className="h-0.5 w-10 sm:w-12 bg-blue-500/20 my-0.5 sm:my-1 animate-pulse" />
              </div>

              {/* Player 2 (Opponent Slot with Rule 1 Skeleton Loading) */}
              <div className="md:col-span-3 p-3 sm:p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 flex items-center gap-3">
                {matchedOpponent ? (
                  <>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs font-display">
                      {matchedOpponent.avatarEmoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                          {matchedOpponent.name}
                        </h4>
                        <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-black bg-amber-500 text-white">
                          Lv.{matchedOpponent.level}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        🟢 Đã kết nối
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 shrink-0">
                      <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded-xs w-24 sm:w-28 animate-pulse" />
                      <div className="h-2.5 bg-slate-200/70 dark:bg-slate-800/70 rounded-xs w-16 sm:w-20 animate-pulse" />
                      <span className="text-[10px] font-bold text-amber-500 block animate-pulse">
                        🟡 Đang tìm học viên...
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Controls Strip */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
              <span className="text-[10px] font-medium text-slate-400">
                {matchedOpponent ? "⚡ Trận đấu sắp bắt đầu..." : "Gặp sự cố? Bạn có thể hủy tìm trận bất cứ lúc nào."}
              </span>

              {!matchedOpponent && (
                <button
                  type="button"
                  onClick={cancelMatchmaking}
                  className="px-3 py-1 rounded-xs bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer font-display"
                >
                  ✕ Hủy tìm trận
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* 3. BATTLE STATE */}
        {gameState === "battle" && matchedOpponent && currentWord && (
          <motion.div
            key="battle-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3 sm:space-y-3.5"
          >
            {/* Match Header Bar */}
            <div className="p-2.5 sm:p-3.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center justify-between gap-1.5 sm:gap-3">
              {/* Player Left */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-xs shrink-0 font-display overflow-hidden border border-slate-200/50 dark:border-white/10">
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                  ) : (
                    user?.avatarEmoji || (user?.fullName || "X").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display truncate flex items-center gap-1">
                    <span className="truncate max-w-[65px] sm:max-w-none">{user?.fullName || "Bạn"}</span>
                    <span className="px-1 py-0.2 rounded-xs text-[9px] font-mono font-black bg-blue-100 dark:bg-blue-950 text-[#0059bb]">
                      {userScore}đ
                    </span>
                  </div>
                  {/* Status dots */}
                  <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    {Array.from({ length: gameQuestions.length }).map((_, i) => {
                      const res = userQuestionResults[i];
                      return (
                        <div
                          key={i}
                          className={`h-1 sm:h-1.5 w-1.5 sm:w-2.5 rounded-full transition-all ${
                            res === true
                              ? "bg-emerald-500 shadow-2xs"
                              : res === false
                              ? "bg-rose-500 shadow-2xs"
                              : "bg-slate-200 dark:bg-slate-800"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Timer Center */}
              <div className="flex flex-col items-center shrink-0 relative">
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-50 dark:bg-slate-950 border flex items-center justify-center text-xs font-black font-mono shadow-2xs relative transition-all ${
                  timer <= 3
                    ? "border-rose-500 text-rose-600 dark:text-rose-400 animate-pulse ring-2 ring-rose-500/20"
                    : "border-slate-200 dark:border-white/10 text-[#0059bb] dark:text-sky-400"
                }`}>
                  {timer}s
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase mt-0.5 font-mono">
                  {currentQuestionIndex + 1}/{gameQuestions.length}
                </span>
              </div>

              {/* Opponent Right */}
              <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 min-w-0 text-right">
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white font-display truncate flex items-center justify-end gap-1">
                    <span className="px-1 py-0.2 rounded-xs text-[9px] font-mono font-black bg-amber-100 dark:bg-amber-950 text-amber-600">
                      {opponentScore}đ
                    </span>
                    <span className="truncate max-w-[65px] sm:max-w-none">{matchedOpponent.name}</span>
                  </div>
                  <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1 justify-end">
                    {Array.from({ length: gameQuestions.length }).map((_, i) => {
                      const res = oppQuestionResults[i];
                      return (
                        <div
                          key={i}
                          className={`h-1 sm:h-1.5 w-1.5 sm:w-2.5 rounded-full transition-all ${
                            res === true
                              ? "bg-emerald-500 shadow-2xs"
                              : res === false
                              ? "bg-rose-500 shadow-2xs"
                              : "bg-slate-200 dark:bg-slate-800"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 font-display">
                  {matchedOpponent.avatarEmoji}
                </div>
              </div>
            </div>

            {/* AI Opponent status indicator */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 text-center text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Đối thủ ({matchedOpponent.name}):</span>
              {opponentStatus === "thinking" ? (
                <span className="text-slate-400 font-bold animate-pulse">Đang suy nghĩ...</span>
              ) : opponentStatus === "answered_correct" ? (
                <span className="text-emerald-600 font-bold">✓ Đã trả lời ĐÚNG</span>
              ) : (
                <span className="text-rose-600 font-bold">✗ Đã trả lời SAI</span>
              )}
            </div>

            {/* Main Question Box */}
            <div className="p-4 sm:p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-center space-y-2.5 sm:space-y-3">
              {gameMode === "quiz" && (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Chọn nghĩa chính xác của từ</span>
                  <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">{currentWord.word}</h2>
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">[{currentWord.phonetic || "..."}] · {currentWord.pos}</p>
                </>
              )}

              {gameMode === "spelling" && (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gõ hoặc ghép chữ dịch sang tiếng Anh</span>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">“{currentWord.definitionVn}”</h2>
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">Từ loại: {currentWord.pos} · {currentWord.word.length} chữ cái</p>
                </>
              )}

              {gameMode === "listening" && (
                <div className="flex flex-col items-center space-y-2.5 sm:space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nghe phát âm và chọn nghĩa đúng</span>
                  <button
                    type="button"
                    onClick={() => playWordAudio(currentWord.word)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all border border-blue-400/30"
                  >
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                  </button>
                  <p className="font-mono text-xs text-slate-500">Bấm nút để nghe lại âm thanh</p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            {gameMode === "spelling" ? (
              <div className="p-3.5 sm:p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 text-center">
                  <span className="text-base sm:text-xl font-black tracking-widest uppercase font-mono text-slate-900 dark:text-white">
                    {spellingInput || "..."}
                  </span>
                </div>

                {!answered && (
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-md mx-auto">
                    {scrambledLetters.map((char, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 transition-all cursor-pointer"
                        onClick={() => handleLetterClick(char)}
                      >
                        {char.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 pt-1">
                  <button
                    onClick={handleClearSpelling}
                    disabled={answered}
                    className="py-2 px-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Xóa Hết (Esc)
                  </button>
                  <button
                    onClick={handleBackspace}
                    disabled={answered}
                    className="py-2 px-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Xóa Chữ (⌫)
                  </button>
                  <button
                    onClick={handleSpellingSubmit}
                    disabled={answered || !spellingInput}
                    className="py-2 px-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-2xs font-display"
                  >
                    Nộp Bài (↵)
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {currentOptions.map((opt) => {
                  let optStyle = "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-[#0059bb] hover:bg-blue-50/40 dark:hover:bg-blue-950/30";
                  if (answered) {
                    if (opt.id === currentWord.id) {
                      optStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold";
                    } else if (selectedOptionId === opt.id) {
                      optStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-400 font-bold";
                    } else {
                      optStyle = "opacity-40 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/5 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={answered}
                      onClick={() => handleUserAnswer(opt.id, currentWord.id)}
                      className={`p-3 sm:p-3.5 rounded-xs border text-left text-xs font-bold transition-all shadow-2xs cursor-pointer ${optStyle}`}
                    >
                      {opt.definitionVn}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Give Up Button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowGiveUpModal(true)}
                className="px-3 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <Flag className="w-3.5 h-3.5" /> Bỏ cuộc
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. RESULTS STATE */}
        {gameState === "results" && matchedOpponent && (
          <motion.div
            key="results-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-5 sm:p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-center space-y-4 sm:space-y-5 max-w-md mx-auto"
          >
            <div className="space-y-2">
              {userScore > opponentScore ? (
                <>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-2xs">
                    <Trophy className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                    CHIẾN THẮNG! 🎉
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Bạn đã thể hiện phong độ thi đấu xuất sắc.</p>
                </>
              ) : userScore === opponentScore ? (
                <>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 flex items-center justify-center mx-auto shadow-2xs">
                    <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-200 font-display">
                    HÒA NHAU! 🤝
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Trận đấu diễn ra cực kỳ gay cấn.</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto shadow-2xs">
                    <XCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 font-display">
                    THẤT BẠI! 💔
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Hãy ôn tập lại từ vựng và phục thù nhé!</p>
                </>
              )}
            </div>

            {/* Level Up Banner */}
            {serverMatchData?.levelUp && (
              <div className="p-3 rounded-xs bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> THĂNG CẤP DÙNG ĐẦU TƯ TIẾN BỘ MỚI!
              </div>
            )}

            {/* Scorecard */}
            <div className="p-3 sm:p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">KẾT QUẢ THƯỞNG</span>
                <span className="px-2 py-0.5 rounded-xs text-[10px] font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  +{serverMatchData?.xpGained ?? (userScore > opponentScore ? 50 : 10)} XP
                </span>
              </div>

              <div className="grid grid-cols-3 items-center pt-1">
                <div className="text-center flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0059bb] text-white flex items-center justify-center font-black text-xs shrink-0 font-display overflow-hidden border border-slate-200/50 dark:border-white/10 mb-1">
                    {userAvatarUrl ? (
                      <img src={userAvatarUrl} alt={user?.fullName || "User"} className="w-full h-full object-cover" />
                    ) : (
                      user?.avatarEmoji || (user?.fullName || "X").charAt(0).toUpperCase()
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">Bạn</h4>
                  <span className="text-sm sm:text-base font-black text-[#0059bb] font-mono">{userScore}</span>
                </div>
                <div className="text-xs font-black text-slate-400 font-display">VS</div>
                <div className="text-center flex flex-col items-center">
                  <span className="text-base sm:text-lg mb-1">{matchedOpponent.avatarEmoji}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">{matchedOpponent.name}</h4>
                  <span className="text-sm sm:text-base font-black text-amber-500 font-mono">{opponentScore}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link href="/dashboard" className="flex-1">
                <button className="w-full py-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer font-display">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => {
                  setMatchedOpponent(null);
                  setUserScore(0);
                  setOpponentScore(0);
                  setGameState("lobby");
                }}
                className="flex-1 py-2.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer font-display"
              >
                Tìm Trận Mới
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SLEEK GIVE UP CONFIRMATION MODAL */}
      <AnimatePresence>
        {showGiveUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-sm rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xl p-4 sm:p-5 space-y-4 text-center relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-center mx-auto shadow-2xs">
                <Flag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Xác Nhận Bỏ Cuộc?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Bạn có chắc chắn muốn dừng trận đấu giữa chừng? Kết quả sẽ tính là <span className="font-bold text-rose-600 dark:text-rose-400">THẤT BẠI</span> và không nhận được điểm XP.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGiveUpModal(false)}
                  className="py-2 px-3 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer font-display"
                >
                  Tiếp tục đấu
                </button>
                <button
                  type="button"
                  onClick={confirmGiveUp}
                  className="py-2 px-3 rounded-xs bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer font-display"
                >
                  Xác nhận bỏ cuộc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
