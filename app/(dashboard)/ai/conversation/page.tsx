"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { useAiSessionStore, getInitialConversationSessionProbe } from "@/stores/aiSessionStore";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { AiSuiteNavTabs } from "@/shared/components/layout/nav-tabs";
import {
  History,
  Clock,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  Target,
  ChevronDown,
  X,
  SlidersHorizontal,
  Check,
  Bot,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  aiTopics,
  Topic,
  Message,
  SuggestedWord,
  WordLookupData,
  AI_PERSONAS,
  DEFAULT_AI_PERSONA,
  AiPersona,
  ConversationDifficulty,
  useAiConversationSpeech,
  useAiConversationSession,
  AiConversationTopBar,
  AiConversationChatStream,
  AiConversationInputDock,
  AiConversationInspectorDock,
  AiConversationScoreCard,
  AiConversationHistoryDrawer,
  WordLookupModal,
  TOPIC_ICONS,
} from "@/features/ai/conversation";

const SpeakingIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 15a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M17 9a3 3 0 0 1 0 6" />
    <path d="M20 7a6 6 0 0 1 0 10" />
  </svg>
);

export default function AiConversationPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  // Auto collapse sidebar for focused studio space
  useEffect(() => {
    setSidebarCollapsed(true);
    return () => {
      setSidebarCollapsed(false);
    };
  }, [setSidebarCollapsed]);

  // Session & Persistence Hook
  const {
    selectedTopicId,
    setSelectedTopicId,
    selectedPersonaId,
    setSelectedPersonaId,
    selectedDifficulty,
    setSelectedDifficulty,
    sessionId,
    elapsedTime,
    setElapsedTime,
    isSessionCompleted,
    setIsSessionCompleted,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    pastSessions,
    selectedPastSession,
    setSelectedPastSession,
    isLoadingHistory,
    handleOpenHistoryDrawer,
    syncActiveSessionToDb,
    markUserInteracted,
    hasUserInteractedRef,
    resetSession,
  } = useAiConversationSession();

  const currentTopic = useMemo(() => {
    return aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];
  }, [selectedTopicId]);

  const currentPersona: AiPersona = useMemo(() => {
    return (
      AI_PERSONAS.find((p) => p.id === selectedPersonaId) || DEFAULT_AI_PERSONA
    );
  }, [selectedPersonaId]);

  const effectiveDifficulty: ConversationDifficulty = useMemo(() => {
    return (selectedDifficulty || currentTopic.level) as ConversationDifficulty;
  }, [selectedDifficulty, currentTopic.level]);

  // Conversation Messages (Frame 0 Probe - Instant Render 0ms)
  const [messages, setMessages] = useState<Message[]>(() => {
    const probe = getInitialConversationSessionProbe();
    if (probe?.messages && probe.messages.length > 0) {
      return probe.messages as Message[];
    }
    const topic = aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];
    return [
      {
        id: `welcome_${topic.id}`,
        role: "ai",
        text: topic.welcomeMessage.text,
        vietnameseTranslation: topic.welcomeMessage.vi,
        suggestedWords: topic.suggestedWords,
        suggestedPhrases: topic.suggestions,
      },
    ];
  });

  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const probe = getInitialConversationSessionProbe();
    return probe?.soundEnabled ?? true;
  });
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [serverCompletedGoalIds, setServerCompletedGoalIds] = useState<string[]>([]);

  // Active suggestions & dictionary (Frame 0 Probe)
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>(() => {
    const probe = getInitialConversationSessionProbe();
    if (probe?.currentSuggestions && (probe.currentSuggestions.words?.length || probe.currentSuggestions.phrases?.length)) {
      return probe.currentSuggestions as { words: SuggestedWord[]; phrases: string[] };
    }
    const topic = aiTopics.find((t) => t.id === selectedTopicId) || aiTopics[0];
    return {
      words: topic.suggestedWords,
      phrases: topic.suggestions,
    };
  });

  const [selectedWordData, setSelectedWordData] = useState<WordLookupData | null>(null);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Speech & Visualizer Hook
  const {
    isRecording,
    spokenText,
    setSpokenText,
    recordingTime,
    audioFrequencies,
    isSpeaking,
    startRecording,
    stopRecordingOnly,
    handleResetSpeech,
    speakText,
  } = useAiConversationSpeech({
    soundEnabled,
    selectedTopicId,
  });

  // Background Revalidation from LocalStorage & DB (Non-blocking)
  useEffect(() => {
    // 1. If not hydrated via Frame-0 probe yet, check localStorage
    const ramMessages = useAiSessionStore.getState().conversationSession?.messages;
    if (!ramMessages || ramMessages.length <= 1) {
      try {
        const localStr = localStorage.getItem("xp_active_conv_session");
        if (localStr) {
          const parsed = JSON.parse(localStr);
          if (parsed.sessionId && Array.isArray(parsed.messages) && parsed.messages.length > 1) {
            setMessages(parsed.messages);
            if (parsed.topicId && aiTopics.some((t) => t.id === parsed.topicId)) {
              setSelectedTopicId(parsed.topicId);
            }
            if (typeof parsed.elapsedTime === "number") {
              setElapsedTime(parsed.elapsedTime);
            }
          }
        }
      } catch {}
    }

    // 2. Authoritative background sync from DB
    fetch("/api/ai/sessions?mode=conversation&status=active")
      .then((res) => res.json())
      .then((data) => {
        if (hasUserInteractedRef.current) return;
        if (
          data.success &&
          data.activeSession &&
          Array.isArray(data.activeSession.messages) &&
          data.activeSession.messages.length > 1 &&
          data.activeSession.messages.some((m: any) => m.role === "user")
        ) {
          const act = data.activeSession;
          const currentCount = useAiSessionStore.getState().conversationSession?.messages?.length || 0;
          if (act.messages.length > currentCount) {
            setMessages(act.messages);
            if (act.topicId && aiTopics.some((t) => t.id === act.topicId)) {
              setSelectedTopicId(act.topicId);
            }
            if (typeof act.timeSpentSeconds === "number") {
              setElapsedTime(act.timeSpentSeconds);
            }
            const lastAi = [...act.messages].reverse().find((m: any) => m.role === "ai");
            if (lastAi?.suggestedWords?.length || lastAi?.suggestedPhrases?.length) {
              setCurrentSuggestions({
                words: lastAi.suggestedWords || [],
                phrases: lastAi.suggestedPhrases || [],
              });
            }
            useAiSessionStore.getState().setConversationSession({
              sessionId: act.sessionId,
              selectedTopicId: act.topicId,
              messages: act.messages,
              elapsedTime: act.timeSpentSeconds,
            });
            addToast({
              type: "info",
              title: "Khôi phục buổi hội thoại ✨",
              message: "Đã nạp lại phiên hội thoại dở dang của bạn.",
            });
          }
        }
      })
      .catch((err) => console.warn("[AiConversation] Active session hydration notice:", err));
  }, [addToast, hasUserInteractedRef, setElapsedTime, setSelectedTopicId]);

  // Auto scroll chat
  useEffect(() => {
    if (!isSessionCompleted) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiTyping, spokenText, isSessionCompleted]);

  const formatElapsedTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const toggleTranslation = useCallback((msgId: string) => {
    setShowTranslations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  }, []);

  // 1-Click Interactive Deep Dictionary
  const handleWordClick = useCallback(
    (rawWord: string) => {
      const cleanWord = rawWord.replace(/^[^a-zA-Z]+|[^a-zA-Z']+$/g, "").toLowerCase();
      if (!cleanWord || cleanWord.length < 2) return;

      speakText(cleanWord);
      const deepDef = lookupWordDeep(cleanWord);
      setSelectedWordData({
        word: cleanWord,
        ipa: deepDef.ipa || `/${cleanWord}/`,
        meaning: deepDef.meaning || `Nghĩa Tiếng Việt của từ "${cleanWord}"`,
        example: deepDef.example || `Used naturally in context: "${cleanWord}"`,
      });
    },
    [speakText]
  );

  const handleSaveWordToVocab = useCallback(async () => {
    if (!selectedWordData) return;
    awardXp(5, "vocab");
    addToast({
      type: "success",
      title: "Đã lưu vào Sổ tay từ vựng! 💾",
      message: `+5 XP cho từ "${selectedWordData.word}"`,
    });

    try {
      await fetch("/api/user/vocab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabId: selectedWordData.word.toLowerCase(),
          isFavorite: true,
        }),
      });
    } catch {}

    setSelectedWordData(null);
  }, [selectedWordData, awardXp, addToast]);

  const handleSelectTopic = useCallback(
    (topic: Topic) => {
      setSelectedTopicId(topic.id);
      setServerCompletedGoalIds([]);
      try {
        localStorage.setItem("xp_voca_ai_conversation_topic", topic.id);
      } catch {}
      setIsSessionCompleted(false);
      setElapsedTime(0);
      const initialTopicMessages: Message[] = [
        {
          id: `welcome_${topic.id}_${Date.now()}`,
          role: "ai",
          text: topic.welcomeMessage.text,
          vietnameseTranslation: topic.welcomeMessage.vi,
          suggestedWords: topic.suggestedWords,
          suggestedPhrases: topic.suggestions,
        },
      ];
      const initialTopicSuggestions = {
        words: topic.suggestedWords,
        phrases: topic.suggestions,
      };
      setMessages(initialTopicMessages);
      setCurrentSuggestions(initialTopicSuggestions);
      useAiSessionStore.getState().setConversationSession({
        selectedTopicId: topic.id,
        messages: initialTopicMessages,
        currentSuggestions: initialTopicSuggestions,
        elapsedTime: 0,
        isSessionCompleted: false,
      });
      addToast({
        type: "info",
        title: "Đã chuyển chủ đề! ✨",
        message: `${topic.name} (${topic.nameEn})`,
      });
    },
    [setSelectedTopicId, setIsSessionCompleted, setElapsedTime, addToast]
  );

  // Goal Tracking Engine (Combines AI semantic detection and keyword triggers)
  const completedGoalIds = useMemo(() => {
    const completed = new Set<string>(serverCompletedGoalIds);
    const userTextCombined = messages
      .filter((m) => m.role === "user")
      .map((m) => m.text.toLowerCase())
      .join(" ");

    currentTopic.goals.forEach((goal) => {
      const isMatched = goal.keywords.some((kw) => userTextCombined.includes(kw.toLowerCase()));
      if (isMatched) {
        completed.add(goal.id);
      }
    });

    return Array.from(completed);
  }, [messages, currentTopic.goals, serverCompletedGoalIds]);

  // Send Message (Text or Spoken)
  const handleSendMessage = useCallback(
    async (customMessage?: string) => {
      const rawText =
        customMessage !== undefined ? customMessage : spokenText.trim() || inputText.trim();
      const messageText = rawText.trim();
      if (!messageText || isAiTyping) return;

      if (isRecording) {
        stopRecordingOnly();
      }
      handleResetSpeech();
      setInputText("");

      let grammarFix:
        | { hasError?: boolean; original: string; corrected: string; explanation: string }
        | undefined = undefined;
      let naturalWay: string | undefined = undefined;

      if (/\bi go to\b/i.test(messageText) && /\byesterday\b/i.test(messageText)) {
        grammarFix = {
          hasError: true,
          original: messageText,
          corrected: messageText.replace(/i go to/i, "I went to"),
          explanation: "Dùng quá khứ đơn 'went' thay vì 'go' khi có trạng từ 'yesterday'.",
        };
        naturalWay = messageText.replace(/i go to/i, "I visited");
      } else if (/\bi am go\b/i.test(messageText)) {
        grammarFix = {
          hasError: true,
          original: messageText,
          corrected: messageText.replace(/i am go/i, "I am going"),
          explanation: "Thì hiện tại tiếp diễn cần 'going' thay vì 'go'.",
        };
        naturalWay = messageText.replace(/i am go/i, "I'm heading");
      }

      const userMsg: Message = {
        id: `user_${Date.now()}`,
        role: "user",
        text: messageText,
        grammarCorrection: grammarFix,
        betterPhrasing: naturalWay,
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      markUserInteracted();
      syncActiveSessionToDb(updatedMessages);
      setIsAiTyping(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({ role: m.role, text: m.text })),
              { role: "user", text: messageText },
            ],
            topicId: selectedTopicId,
            topicName: currentTopic.nameEn,
            topicGoals: currentTopic.goals,
            userLevel: effectiveDifficulty,
            userTurnsCount: messages.filter((m) => m.role === "user").length + 1,
            personaId: currentPersona.id,
            personaName: currentPersona.name,
            personaTone: currentPersona.tonePrompt,
          }),
        });

        const data = await res.json();
        if (data.success && data.reply) {
          if (Array.isArray(data.goalsCompleted) && data.goalsCompleted.length > 0) {
            setServerCompletedGoalIds((prev) => {
              const merged = new Set([...prev, ...data.goalsCompleted]);
              return Array.from(merged);
            });
          }

          const dynamicWords: SuggestedWord[] =
            data.suggestedWords && data.suggestedWords.length > 0
              ? data.suggestedWords.slice(0, 3)
              : currentTopic.suggestedWords.slice(0, 3);

          const dynamicPhrases: string[] =
            data.suggestedPhrases && data.suggestedPhrases.length > 0
              ? data.suggestedPhrases.slice(0, 2)
              : currentTopic.suggestions.slice(0, 2);

          const aiMsg: Message = {
            id: `ai_${Date.now()}`,
            role: "ai",
            text: data.reply,
            vietnameseTranslation: data.vietnameseTranslation || data.translation || "",
            suggestedWords: dynamicWords,
            suggestedPhrases: dynamicPhrases,
          };

          let currentList = updatedMessages;
          if (data.grammarCorrection?.hasError || data.betterPhrasing) {
            currentList = currentList.map((m) =>
              m.id === userMsg.id
                ? {
                    ...m,
                    grammarCorrection: data.grammarCorrection?.hasError
                      ? data.grammarCorrection
                      : m.grammarCorrection,
                    betterPhrasing: data.betterPhrasing || m.betterPhrasing,
                  }
                : m
            );
          }

          const finalMessages = [...currentList, aiMsg];
          setMessages(finalMessages);
          syncActiveSessionToDb(finalMessages);
          speakText(data.reply);
          setCurrentSuggestions({
            words: dynamicWords,
            phrases: dynamicPhrases,
          });

          awardXp(15, "speaking");
        }
      } catch (err) {
        console.error(err);
        const fallbackReply = `That's very clear! Could you elaborate a little more about your preference?`;
        const fallbackVi = `Ý của bạn rất rõ ràng! Bạn có thể chia sẻ thêm một chút về sở thích của mình không?`;

        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          role: "ai",
          text: fallbackReply,
          vietnameseTranslation: fallbackVi,
          suggestedWords: currentTopic.suggestedWords.slice(0, 3),
          suggestedPhrases: currentTopic.suggestions.slice(0, 2),
        };
        const fallbackMessages = [...updatedMessages, aiMsg];
        setMessages(fallbackMessages);
        syncActiveSessionToDb(fallbackMessages);
        speakText(fallbackReply);
      } finally {
        setIsAiTyping(false);
      }
    },
    [
      spokenText,
      inputText,
      isAiTyping,
      isRecording,
      messages,
      selectedTopicId,
      currentTopic,
      stopRecordingOnly,
      handleResetSpeech,
      markUserInteracted,
      syncActiveSessionToDb,
      speakText,
      awardXp,
    ]
  );

  const handleMicrophoneToggle = useCallback(() => {
    if (isRecording) {
      if (spokenText.trim()) {
        handleSendMessage();
      } else {
        stopRecordingOnly();
      }
    } else {
      startRecording();
    }
  }, [isRecording, spokenText, handleSendMessage, stopRecordingOnly, startRecording]);

  // Session Statistics & Evaluation
  const userMessages = useMemo(() => messages.filter((m) => m.role === "user"), [messages]);
  const userTurnsCount = userMessages.length;
  const grammarCorrections = useMemo(() => {
    return messages
      .filter((m) => m.grammarCorrection?.hasError || m.betterPhrasing)
      .map((m) => ({
        original: m.grammarCorrection?.original || m.text,
        corrected: m.grammarCorrection?.corrected || "",
        explanation: m.grammarCorrection?.explanation,
        betterPhrasing: m.betterPhrasing,
      }));
  }, [messages]);

  const completedGoalsCount = useMemo(() => {
    return completedGoalIds.filter((id) => id.startsWith(currentTopic.id)).length;
  }, [completedGoalIds, currentTopic.id]);

  const sessionEvaluation = useMemo(() => {
    if (userTurnsCount === 0) {
      return {
        overallScore: 0,
        goalsScore: 0,
        grammarScore: 0,
        interactionScore: 0,
        vocabScore: 0,
        grade: "C" as const,
        label: "Chưa Đánh Giá",
        color:
          "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
        xpAward: 0,
      };
    }

    const totalGoals = currentTopic.goals.length || 3;
    const goalsScore = Math.min(100, Math.round((completedGoalsCount / totalGoals) * 100));
    const errorsCount = grammarCorrections.filter((g) => g.corrected).length;
    const grammarScore = Math.max(50, Math.min(100, 100 - errorsCount * 15));
    const interactionScore = Math.min(100, Math.max(60, userTurnsCount * 25));
    const vocabScore = Math.min(100, Math.max(65, 60 + userTurnsCount * 10));

    const overallScore = Math.round(
      0.4 * goalsScore + 0.3 * grammarScore + 0.2 * interactionScore + 0.1 * vocabScore
    );

    let grade: "S" | "A" | "B" | "C" = "C";
    let label = "Cần Cố Gắng";
    let color = "text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/30";
    let xpAward = 15;

    if (overallScore >= 90) {
      grade = "S";
      label = "Xuất Sắc";
      color = "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/30";
      xpAward = 45;
    } else if (overallScore >= 80) {
      grade = "A";
      label = "Thành Thạo";
      color = "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30";
      xpAward = 35;
    } else if (overallScore >= 70) {
      grade = "B";
      label = "Khá Tốt";
      color = "text-[#0059bb] dark:text-sky-300 bg-[#0059bb]/10 border-[#0059bb]/30";
      xpAward = 25;
    }

    return {
      overallScore,
      goalsScore,
      grammarScore,
      interactionScore,
      vocabScore,
      grade,
      label,
      color,
      xpAward,
    };
  }, [userTurnsCount, completedGoalsCount, currentTopic.goals.length, grammarCorrections]);

  const handleFinishConversation = useCallback(async () => {
    if (userTurnsCount === 0) {
      addToast({
        type: "warning",
        title: "Chưa có dữ liệu trò chuyện ✍️",
        message: "Bạn hãy nhập hoặc nói ít nhất 1 câu để AI có thể đánh giá và chấm điểm nhé!",
      });
      return;
    }

    if (isRecording) {
      stopRecordingOnly();
    }
    setIsSessionCompleted(true);
    awardXp(sessionEvaluation.xpAward, "speaking");
    addToast({
      type: "success",
      title: `Hoàn Thành Buổi Hội Thoại (Hạng ${sessionEvaluation.grade})! 🎉`,
      message: `+${sessionEvaluation.xpAward} XP cho chủ đề "${currentTopic.name}"!`,
    });

    try {
      try {
        localStorage.removeItem("xp_active_conv_session");
      } catch {}

      await fetch("/api/ai/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          mode: "conversation",
          topicId: selectedTopicId,
          messages,
          overallScore: sessionEvaluation.overallScore,
          grade: sessionEvaluation.grade,
          evaluationMetrics: {
            goalsScore: sessionEvaluation.goalsScore,
            grammarScore: sessionEvaluation.grammarScore,
            interactionScore: sessionEvaluation.interactionScore,
            vocabScore: sessionEvaluation.vocabScore,
          },
          timeSpentSeconds: elapsedTime,
          xpEarned: sessionEvaluation.xpAward,
          status: "COMPLETED",
        }),
      });

      // Auto-sync grammar corrections & native phrasings into SM-2 review deck
      const itemsToSync = grammarCorrections.filter((g) => g.corrected || g.betterPhrasing);
      if (itemsToSync.length > 0) {
        Promise.allSettled(
          itemsToSync.map((item, idx) => {
            const cleanWord = (item.betterPhrasing || item.corrected || "").trim();
            const cleanId = `ai_fix_${Date.now()}_${idx}_${cleanWord.slice(0, 15).replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;
            return fetch("/api/user/vocab", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                vocabId: cleanId,
                word: cleanWord,
                definition: item.betterPhrasing || item.corrected,
                definitionVn: item.explanation || "Mẫu câu đàm thoại chuẩn từ AI Tutor",
                examples: [item.original, item.betterPhrasing || item.corrected].filter(Boolean),
                pos: "phrase",
                themeId: "t_ai_speaking_fixes",
                isFavorite: true,
                proficiency: 0,
                nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              }),
            });
          })
        )
          .then(() => {
            addToast({
              type: "info",
              title: "Đã đồng bộ Thẻ Ôn Tập SM-2! 🧠",
              message: `Đã tự động lưu ${itemsToSync.length} câu sửa vào Sổ tay để ôn tập ngắt quãng tại /review.`,
            });
          })
          .catch((e) => console.warn("[AiConversation] Error auto-syncing SM-2 fixes:", e));
      }
    } catch (err) {
      console.warn("Could not save conversation session to server:", err);
    }
  }, [
    userTurnsCount,
    isRecording,
    setIsSessionCompleted,
    awardXp,
    sessionEvaluation,
    addToast,
    currentTopic.name,
    sessionId,
    selectedTopicId,
    messages,
    elapsedTime,
    stopRecordingOnly,
    grammarCorrections,
  ]);

  const handleRestartNewSession = useCallback(() => {
    fetch(`/api/ai/sessions?sessionId=${sessionId}`, { method: "DELETE" }).catch(() => {});
    resetSession();
    setServerCompletedGoalIds([]);
    const initialTopicMessages: Message[] = [
      {
        id: `welcome_${currentTopic.id}_${Date.now()}`,
        role: "ai",
        text: currentTopic.welcomeMessage.text,
        vietnameseTranslation: currentTopic.welcomeMessage.vi,
        suggestedWords: currentTopic.suggestedWords,
        suggestedPhrases: currentTopic.suggestions,
      },
    ];
    const initialTopicSuggestions = {
      words: currentTopic.suggestedWords,
      phrases: currentTopic.suggestions,
    };
    setMessages(initialTopicMessages);
    setCurrentSuggestions(initialTopicSuggestions);
    useAiSessionStore.getState().setConversationSession({
      selectedTopicId: currentTopic.id,
      messages: initialTopicMessages,
      currentSuggestions: initialTopicSuggestions,
      elapsedTime: 0,
      isSessionCompleted: false,
    });
    addToast({
      type: "info",
      title: "Bắt đầu buổi mới! ✨",
      message: `Chủ đề: ${currentTopic.name}`,
    });
  }, [sessionId, resetSession, currentTopic, addToast]);

  const handleInsertWord = useCallback(
    (word: string) => {
      setInputText((prev) => (prev ? `${prev.trim()} ${word}` : word));
      addToast({
        type: "info",
        title: "Đã chèn từ vựng! ✍️",
        message: `"${word}" đã được thêm vào ô nhập để bạn đặt câu.`,
      });
    },
    [addToast]
  );

  return (
    <div
      suppressHydrationWarning
      className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none"
    >
      {/* 1. APP TOP HEADER (FIXED 56PX) */}
      <AppTopHeader
        showGamificationStats={false}
        hideMobileSearch={true}
        rightDesktopContent={
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Lịch Sử Buổi Học Button */}
            <button
              type="button"
              onClick={handleOpenHistoryDrawer}
              className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shrink-0"
              title="Xem lại lịch sử các buổi hội thoại trước"
            >
              <History className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span className="hidden sm:inline">Lịch sử</span>
            </button>

            {/* Time badge hidden to eliminate time pressure per user ergonomics standard */}
            <span className="hidden" aria-hidden="true">
              <span suppressHydrationWarning>{formatElapsedTime(elapsedTime)}</span>
            </span>

            {isSessionCompleted ? (
              <button
                type="button"
                onClick={handleRestartNewSession}
                className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Buổi mới</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishConversation}
                className="h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Chấm điểm</span>
              </button>
            )}
          </div>
        }
        customMobileSearchReplacement={
          <button
            type="button"
            onClick={handleOpenHistoryDrawer}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full sm:rounded-xl bg-transparent sm:bg-slate-100/90 hover:bg-transparent sm:hover:bg-slate-200/90 dark:bg-transparent dark:sm:bg-slate-800/90 dark:sm:hover:bg-slate-700/90 text-slate-800 dark:text-slate-200 border-0 sm:border sm:border-slate-200/60 dark:border-0 dark:sm:border-slate-700/60 shadow-none sm:shadow-2xs flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
            title="Lịch sử buổi hội thoại"
            aria-label="Lịch sử buổi hội thoại"
          >
            <History className="w-5 h-5 sm:w-4.5 sm:h-4.5 stroke-[2.2] sm:stroke-[2]" />
          </button>
        }
      >
        <AiSuiteNavTabs />
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP & DOCKED ABOVE BOTTOMNAV ON MOBILE) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-2 sm:px-5 lg:px-6 pt-1.5 sm:pt-3 lg:pt-3 pb-[50px] lg:pb-3 flex flex-col min-h-0 overflow-hidden space-y-1.5 sm:space-y-3">
        {/* 2.1. SLIM HERO TOPIC STATUS STRIP (DESKTOP ONLY) */}
        <div className="hidden lg:block shrink-0">
          <AiConversationTopBar
            currentTopic={currentTopic}
            allTopics={aiTopics}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
            isSessionCompleted={isSessionCompleted}
            elapsedTime={elapsedTime}
            formatElapsedTime={formatElapsedTime}
            onRestartNewSession={handleRestartNewSession}
            onFinishConversation={handleFinishConversation}
            currentPersona={currentPersona}
            allPersonas={AI_PERSONAS}
            onSelectPersona={(persona) => setSelectedPersonaId(persona.id)}
            currentDifficulty={effectiveDifficulty}
            onSelectDifficulty={(diff) => setSelectedDifficulty(diff)}
          />
        </div>

        {/* 2.2. MAIN BENTO GRID: FITS STRICTLY IN VIEWPORT */}
        {!isSessionCompleted ? (
          /* ===== VIEW 1: STUDIO BENTO GRID (8/12 - 4/12) ===== */
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 lg:gap-3 items-stretch min-w-0">
            {/* CỘT TRÁI: AI CHAT COMPANION & INPUT DOCK (8/12) */}
            <div className="lg:col-span-8 flex flex-col min-w-0 h-full min-h-0">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 h-full min-h-0 space-y-1.5 sm:space-y-2 overflow-hidden">
                <AiConversationChatStream
                  messages={messages}
                  currentTopic={currentTopic}
                  isAiTyping={isAiTyping}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    useAiSessionStore.getState().setConversationSession({ soundEnabled: next });
                  }}
                  showTranslations={showTranslations}
                  onToggleTranslation={toggleTranslation}
                  onWordClick={handleWordClick}
                  onSpeakText={speakText}
                  isSpeaking={isSpeaking}
                  user={user}
                  chatBottomRef={chatBottomRef}
                  headerLeftMobileContent={
                    <button
                      type="button"
                      onClick={() => setShowTopicModal(true)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer active:scale-95 text-xs font-bold truncate max-w-[130px] xs:max-w-[160px] sm:max-w-[200px]"
                      title="Đổi chủ đề / Giọng AI / Trình độ"
                    >
                      <span className="shrink-0 text-sm">
                        {TOPIC_ICONS[currentTopic.id] || "💬"}
                      </span>
                      <span className="truncate">{currentTopic.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  }
                  headerRightMobileContent={
                    <>
                      {/* Timer capsule (Hidden to remove time pressure) */}
                      <span className="hidden" aria-hidden="true">
                        <span suppressHydrationWarning>{formatElapsedTime(elapsedTime)}</span>
                      </span>

                      {/* Goals Pill */}
                      <button
                        type="button"
                        onClick={() => setShowGoalsModal(true)}
                        className="h-7 px-1.5 xs:px-2 rounded-md bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/50 text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-all cursor-pointer shadow-2xs"
                        title="Xem mục tiêu hội thoại & gợi ý từ vựng"
                      >
                        <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span className="tabular-nums font-mono font-bold">
                          {completedGoalsCount}/{currentTopic.goals.length}
                        </span>
                      </button>

                      {/* Chấm điểm button */}
                      <button
                        type="button"
                        onClick={handleFinishConversation}
                        className="h-7 px-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 text-xs font-bold flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer shrink-0"
                        title="Hoàn thành và chấm điểm buổi nói"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span className="hidden xs:inline">Chấm điểm</span>
                      </button>
                    </>
                  }
                />

                <AiConversationInputDock
                  inputText={inputText}
                  setInputText={setInputText}
                  spokenText={spokenText}
                  isRecording={isRecording}
                  recordingTime={recordingTime}
                  isSpeaking={isSpeaking}
                  isAiTyping={isAiTyping}
                  audioFrequencies={audioFrequencies}
                  currentSuggestions={currentSuggestions}
                  onMicrophoneToggle={handleMicrophoneToggle}
                  onResetSpeech={handleResetSpeech}
                  onSendMessage={handleSendMessage}
                  onInsertWord={handleInsertWord}
                />
              </div>
            </div>

            {/* CỘT PHẢI: GOALS & CONTEXTUAL VOCABULARY DECK (4/12 - DESKTOP ONLY) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col min-w-0 h-full min-h-0">
              <AiConversationInspectorDock
                currentTopic={currentTopic}
                completedGoalIds={completedGoalIds}
                completedGoalsCount={completedGoalsCount}
                currentSuggestions={currentSuggestions}
                onWordClick={handleWordClick}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        ) : (
          /* ===== VIEW 2: IN-PLACE SCORECARD & SUMMARY ===== */
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
            <AiConversationScoreCard
              currentTopic={currentTopic}
              allTopics={aiTopics}
              onSelectTopic={handleSelectTopic}
              sessionEvaluation={sessionEvaluation}
              completedGoalsCount={completedGoalsCount}
              userTurnsCount={userTurnsCount}
              elapsedTime={elapsedTime}
              formatElapsedTime={formatElapsedTime}
              grammarCorrections={grammarCorrections}
              messages={messages}
              onRestartNewSession={handleRestartNewSession}
              currentPersona={currentPersona}
              difficulty={effectiveDifficulty}
              userName={user?.fullName || user?.username || "Học viên XP"}
            />
          </div>
        )}
      </div>

      {/* 3. 1-CLICK INTERACTIVE DEEP WORD DICTIONARY FLOATING MODAL */}
      <WordLookupModal
        wordData={selectedWordData}
        onClose={() => setSelectedWordData(null)}
        onSpeak={speakText}
        onSaveWord={handleSaveWordToVocab}
      />

      {/* 4. SESSION HISTORY DRAWER & TRANSCRIPT PREVIEW */}
      <AiConversationHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        pastSessions={pastSessions}
        selectedPastSession={selectedPastSession}
        onSelectPastSession={setSelectedPastSession}
        isLoadingHistory={isLoadingHistory}
      />

      {/* 5. MOBILE GOALS & VOCABULARY BOTTOM SHEET / MODAL */}
      <AnimatePresence>
        {showGoalsModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGoalsModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Target className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Mục Tiêu & Từ Vựng Ngữ Cảnh
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Đạt {completedGoalsCount}/{currentTopic.goals.length} mục tiêu trong chủ đề này
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoalsModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Inspector Dock */}
              <div className="p-3 overflow-y-auto flex-1 min-h-0 space-y-3">
                <AiConversationInspectorDock
                  currentTopic={currentTopic}
                  completedGoalIds={completedGoalIds}
                  completedGoalsCount={completedGoalsCount}
                  currentSuggestions={currentSuggestions}
                  onWordClick={(w) => {
                    handleWordClick(w);
                    setShowGoalsModal(false);
                  }}
                  onSendMessage={(ph) => {
                    handleSendMessage(ph);
                    setShowGoalsModal(false);
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. MOBILE TOPIC & AI SETTINGS BOTTOM SHEET / MODAL */}
      <AnimatePresence>
        {showTopicModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTopicModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400">
                    <SlidersHorizontal className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Cài Đặt Buổi Hội Thoại
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Chọn chủ đề, huấn luyện viên và độ khó
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTopicModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-3.5 overflow-y-auto flex-1 min-h-0 space-y-4">
                {/* Section A: Trình độ */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Độ khó phản xạ
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Beginner", "Intermediate", "Advanced"] as ConversationDifficulty[]).map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                          effectiveDifficulty === diff
                            ? "bg-blue-50 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-300 shadow-2xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section B: Huấn luyện viên AI Persona */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Huấn luyện viên AI
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AI_PERSONAS.map((persona) => {
                      const isSelected = currentPersona.id === persona.id;
                      return (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => setSelectedPersonaId(persona.id)}
                          className={`p-2 rounded-xl border transition-all flex items-center gap-2 cursor-pointer text-left ${
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-300 shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                            {persona.id === "strict_interviewer" ? (
                              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            ) : persona.id === "patient_tutor" ? (
                              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                            ) : persona.id === "challenging_debater" ? (
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            ) : (
                              <Bot className="w-3.5 h-3.5 text-[#0059bb]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold truncate">{persona.name}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {persona.roleTitle}
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section C: Chọn Chủ Đề */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Chủ đề hội thoại ({aiTopics.length})
                  </label>
                  <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                    {aiTopics.map((topic) => {
                      const isSelected = topic.id === selectedTopicId;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => {
                            handleSelectTopic(topic);
                            setShowTopicModal(false);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-950/60 border-[#0059bb] text-[#0059bb] dark:text-sky-300 shadow-2xs"
                              : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                              {TOPIC_ICONS[topic.id] || <MessageSquare className="w-4 h-4 text-[#0059bb]" />}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {topic.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {topic.nameEn} • {topic.level}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
