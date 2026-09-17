"use client";

import { useState, useCallback } from "react";

export interface UseVocabularyAiCoachProps {
  themeName: string;
  themeNameEn?: string;
  awardXp: (amount: number) => void;
  showToastMsg: (title: string, body: string) => void;
}

export function useVocabularyAiCoach({
  themeName,
  themeNameEn,
  awardXp,
  showToastMsg,
}: UseVocabularyAiCoachProps) {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = useCallback(
    async (queryText?: string) => {
      const textToSend = queryText || aiQuestion;
      if (!textToSend.trim() || isAiLoading) return;

      setIsAiLoading(true);
      setAiResponse(null);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                text: `Hỏi về từ vựng thuộc chủ đề ${themeName} (${themeNameEn || ""}): ${textToSend}`,
              },
            ],
          }),
        });
        const data = await res.json();
        if (data.success && data.reply) {
          setAiResponse(data.reply);
          awardXp(10);
          showToastMsg("AI Tutor trả lời! 🤖", "+10 XP chủ động học hỏi.");
        } else {
          setAiResponse("Hệ thống AI đang bận. Vui lòng thử lại sau giây lát!");
        }
      } catch (err) {
        console.error(err);
        setAiResponse("Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.");
      } finally {
        setIsAiLoading(false);
      }
    },
    [aiQuestion, isAiLoading, themeName, themeNameEn, awardXp, showToastMsg]
  );

  return {
    aiQuestion,
    setAiQuestion,
    aiResponse,
    setAiResponse,
    isAiLoading,
    handleAiAsk,
  };
}
