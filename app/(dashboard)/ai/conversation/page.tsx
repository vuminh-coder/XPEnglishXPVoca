"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
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
} from "lucide-react";

import {
  aiTopics,
  Topic,
  Message,
  SuggestedWord,
  WordLookupData,
  useAiConversationSpeech,
  useAiConversationSession,
  AiConversationTopBar,
  AiConversationChatStream,
  AiConversationInputDock,
  AiConversationInspectorDock,
  AiConversationScoreCard,
  AiConversationHistoryDrawer,
  WordLookupModal,
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

  // Conversation Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `welcome_${aiTopics[0].id}`,
      role: "ai",
      text: aiTopics[0].welcomeMessage.text,
      vietnameseTranslation: aiTopics[0].welcomeMessage.vi,
      suggestedWords: aiTopics[0].suggestedWords,
      suggestedPhrases: aiTopics[0].suggestions,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  // Active suggestions & dictionary
  const [currentSuggestions, setCurrentSuggestions] = useState<{
    words: SuggestedWord[];
    phrases: string[];
  }>({
    words: aiTopics[0].suggestedWords,
    phrases: aiTopics[0].suggestions,
  });

  const [selectedWordData, setSelectedWordData] = useState<WordLookupData | null>(null);
  const [mobileActiveTab, setMobileActiveTab] = useState<"chat" | "inspector">("chat");
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

  // Initial Hydration from LocalStorage & DB
  useEffect(() => {
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
          addToast({
            type: "info",
            title: "Khôi phục buổi hội thoại ✨",
            message: "Đã nạp lại phiên hội thoại dở dang của bạn.",
          });
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
      try {
        localStorage.setItem("xp_voca_ai_conversation_topic", topic.id);
      } catch {}
      setIsSessionCompleted(false);
      setElapsedTime(0);
      setMessages([
        {
          id: `welcome_${topic.id}_${Date.now()}`,
          role: "ai",
          text: topic.welcomeMessage.text,
          vietnameseTranslation: topic.welcomeMessage.vi,
          suggestedWords: topic.suggestedWords,
          suggestedPhrases: topic.suggestions,
        },
      ]);
      setCurrentSuggestions({
        words: topic.suggestedWords,
        phrases: topic.suggestions,
      });
      addToast({
        type: "info",
        title: "Đã chuyển chủ đề! ✨",
        message: `${topic.name} (${topic.nameEn})`,
      });
    },
    [setSelectedTopicId, setIsSessionCompleted, setElapsedTime, addToast]
  );

  // Goal Tracking Engine
  const completedGoalIds = useMemo(() => {
    const completed = new Set<string>();
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
  }, [messages, currentTopic.goals]);

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
          }),
        });

        const data = await res.json();
        if (data.success && data.reply) {
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
  ]);

  const handleRestartNewSession = useCallback(() => {
    fetch(`/api/ai/sessions?sessionId=${sessionId}`, { method: "DELETE" }).catch(() => {});
    resetSession();
    setMessages([
      {
        id: `welcome_${currentTopic.id}_${Date.now()}`,
        role: "ai",
        text: currentTopic.welcomeMessage.text,
        vietnameseTranslation: currentTopic.welcomeMessage.vi,
        suggestedWords: currentTopic.suggestedWords,
        suggestedPhrases: currentTopic.suggestions,
      },
    ]);
    setCurrentSuggestions({
      words: currentTopic.suggestedWords,
      phrases: currentTopic.suggestions,
    });
    addToast({
      type: "info",
      title: "Bắt đầu buổi mới! ✨",
      message: `Chủ đề: ${currentTopic.name}`,
    });
  }, [sessionId, resetSession, currentTopic, addToast]);

  return (
    <div className="w-full h-full min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. APP TOP HEADER (FIXED 56PX) */}
      <AppTopHeader
        showGamificationStats={true}
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

            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-xs font-bold font-mono tabular-nums flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{formatElapsedTime(elapsedTime)}</span>
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
      >
        <AiSuiteNavTabs />
      </AppTopHeader>

      {/* 2. MAIN DASHBOARD-STYLE VIEWPORT CANVAS (FITS IN 1 SCREEN ON DESKTOP) */}
      <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-2 flex flex-col min-h-0 lg:overflow-hidden space-y-2 sm:space-y-2.5 pb-20 lg:pb-2">
        {/* 2.1. SLIM HERO TOPIC STATUS STRIP */}
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
        />

        {/* 2.2. MOBILE SEGMENTED VIEW SWITCHER (Mobile only: sm/md, hidden on lg+) */}
        {!isSessionCompleted && (
          <div className="flex lg:hidden items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shrink-0">
            <button
              type="button"
              onClick={() => setMobileActiveTab("chat")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileActiveTab === "chat"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hội thoại ({userTurnsCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileActiveTab("inspector")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileActiveTab === "inspector"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Mục tiêu ({completedGoalsCount}/{currentTopic.goals.length})</span>
            </button>
          </div>
        )}

        {/* 2.3. MAIN BENTO GRID: FITS STRICTLY IN DESKTOP VIEWPORT */}
        {!isSessionCompleted ? (
          /* ===== VIEW 1: STUDIO BENTO GRID (8/12 - 4/12) ===== */
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3 items-stretch min-w-0">
            {/* CỘT TRÁI: AI CHAT COMPANION & INPUT DOCK (8/12) */}
            <div
              className={`lg:col-span-8 flex flex-col min-w-0 lg:h-full lg:min-h-0 ${
                mobileActiveTab === "chat" ? "flex" : "hidden lg:flex"
              }`}
            >
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col min-w-0 flex-1 lg:h-full lg:min-h-0 space-y-2">
                <AiConversationChatStream
                  messages={messages}
                  currentTopic={currentTopic}
                  isAiTyping={isAiTyping}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => setSoundEnabled(!soundEnabled)}
                  showTranslations={showTranslations}
                  onToggleTranslation={toggleTranslation}
                  onWordClick={handleWordClick}
                  onSpeakText={speakText}
                  user={user}
                  chatBottomRef={chatBottomRef}
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
                />
              </div>
            </div>

            {/* CỘT PHẢI: GOALS & CONTEXTUAL VOCABULARY DECK (4/12) */}
            <div
              className={`lg:col-span-4 flex flex-col min-w-0 lg:h-full lg:min-h-0 ${
                mobileActiveTab === "inspector" ? "flex" : "hidden lg:flex"
              }`}
            >
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
          <AiConversationScoreCard
            currentTopic={currentTopic}
            sessionEvaluation={sessionEvaluation}
            completedGoalsCount={completedGoalsCount}
            userTurnsCount={userTurnsCount}
            elapsedTime={elapsedTime}
            formatElapsedTime={formatElapsedTime}
            grammarCorrections={grammarCorrections}
            messages={messages}
            onRestartNewSession={handleRestartNewSession}
          />
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
    </div>
  );
}
