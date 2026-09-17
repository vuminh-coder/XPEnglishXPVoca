"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, Sparkles, Zap, Loader2 } from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { useUserStore } from "@/stores/userStore";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";
import {
  getGrammarTopicById,
  GRAMMAR_TOPICS,
  getGrammarLesson,
  useGrammarExercise,
  useGrammarAiChat,
  GrammarTopicHero,
  GrammarTheoryStudio,
  GrammarPracticeStudio,
} from "@/features/grammar";

export default function GrammarTopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "present_simple";

  const topic = useMemo(() => {
    return getGrammarTopicById(rawId) || GRAMMAR_TOPICS[0];
  }, [rawId]);

  const lessonData = useMemo(() => {
    return getGrammarLesson(topic.id) || null;
  }, [topic.id]);

  const [activeTab, setActiveTab] = useState<"lesson" | "practice">("lesson");
  const activeTimeRef = useRef(0);

  // Real-time backend practice time tracker for Grammar / Writing
  useStudyTimeTracker("writing", {
    activeCondition: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      activeTimeRef.current += 1;
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activeTimeRef.current > 10) {
        const mins = Math.max(1, Math.ceil(activeTimeRef.current / 60));
        useUserStore.getState().addPracticeTime(mins, "writing");
        activeTimeRef.current = 0;
      }
    };
  }, []);

  // Mark topic started in grammar progress store
  useEffect(() => {
    if (topic?.id) {
      useGrammarProgressStore.getState().markTopicStarted(topic.id);
    }
  }, [topic?.id]);

  // Exercise & AI Chat Hooks
  const {
    exercises,
    currentIndex,
    answers,
    loading: loadingExercises,
    submitted,
    generateExercises,
    handleSelectOption,
    handleSubmitQuiz,
    handleNext,
    handlePrev,
  } = useGrammarExercise({
    topicId: topic.id,
    topicLevel: topic.level,
    isActive: activeTab === "practice",
    onSuccessGenerate: () => setActiveTab("practice"),
  });

  const {
    chatMessages,
    chatInput,
    setChatInput,
    chatLoading,
    handleSendChatMessage,
    prompts,
  } = useGrammarAiChat({ topic });

  return (
    <PageEntranceWrapper
      className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans"
      suppressHydrationWarning
    >
      {/* Top Header with Back Button and 2 Mode Pills (max 4 tabs rule compliant) */}
      <AppTopHeader
        onBack={() => router.push("/study/grammar")}
        rightDesktopContent={
          <button
            type="button"
            onClick={generateExercises}
            disabled={loadingExercises}
            className="h-9 px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer font-display active:scale-95 shrink-0 disabled:opacity-50"
          >
            {loadingExercises ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            )}
            <span>Thi Thử AI +15 XP</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeTab === "lesson"}
            onClick={() => setActiveTab("lesson")}
            layoutId="grammarLessonActiveTab"
            icon={<BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Lý Thuyết"
          />
          <HeaderPillItem
            active={activeTab === "practice"}
            onClick={() => {
              setActiveTab("practice");
              if (exercises.length === 0 && !loadingExercises) {
                generateExercises();
              }
            }}
            layoutId="grammarLessonActiveTab"
            icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            label="Luyện Tập AI"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* Main Studio Container */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        {/* 1. Topic Hero Banner */}
        <GrammarTopicHero
          topic={topic}
          lesson={lessonData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onGenerateExercises={generateExercises}
          loadingExercises={loadingExercises}
          exerciseCount={exercises.length}
        />

        {/* 2. TAB 1: Theory Studio */}
        {activeTab === "lesson" && (
          <GrammarTheoryStudio
            topic={topic}
            lessonData={lessonData}
            onStartPractice={() => {
              setActiveTab("practice");
              if (exercises.length === 0 && !loadingExercises) {
                generateExercises();
              }
            }}
            loadingPractice={loadingExercises}
          />
        )}

        {/* 3. TAB 2: AI Practice & AI Tutor Companion */}
        {activeTab === "practice" && (
          <GrammarPracticeStudio
            topic={topic}
            exercises={exercises}
            currentIndex={currentIndex}
            answers={answers}
            loading={loadingExercises}
            submitted={submitted}
            onGenerateExercises={generateExercises}
            onSelectOption={(opt) => {
              const currentEx = exercises[currentIndex];
              if (currentEx) handleSelectOption(currentEx.id, opt);
            }}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmitQuiz}
            onReviewTheory={() => setActiveTab("lesson")}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            chatLoading={chatLoading}
            onSendMessage={handleSendChatMessage}
            prompts={prompts}
          />
        )}
      </div>
    </PageEntranceWrapper>
  );
}
