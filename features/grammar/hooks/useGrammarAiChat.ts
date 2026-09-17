"use client";

import { useState, useCallback } from "react";
import { GrammarChatMessage, GrammarTopic } from "../types/grammarTypes";
import { useUserStore } from "@/stores/userStore";

interface UseGrammarAiChatProps {
  topic?: GrammarTopic;
}

export const GRAMMAR_AI_PROMPTS = [
  "Giải thích ngữ cảnh trong đề TOEIC",
  "Phân biệt với các cấu trúc dễ nhầm",
  "Cho 3 ví dụ thực tế có dịch nghĩa",
  "Mẹo nhận biết nhanh trong 5s",
];

export function useGrammarAiChat({ topic }: UseGrammarAiChatProps) {
  const { awardXp } = useUserStore();
  const [chatMessages, setChatMessages] = useState<GrammarChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendChatMessage = useCallback(
    async (textToSend: string) => {
      const text = textToSend.trim();
      if (!text || chatLoading || !topic) return;

      const userMsg: GrammarChatMessage = { role: "user", text };
      setChatMessages((prev) => [...prev, userMsg]);
      setChatInput("");
      setChatLoading(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...chatMessages.map((m) => ({ role: m.role, text: m.text })),
              {
                role: "user",
                text: `[Chuyên đề ngữ pháp: ${topic.name} (${topic.nameEn}) - Trọng tâm: ${topic.focus}] Người học hỏi: ${text}. Hãy trả lời ngắn gọn, chuẩn sư phạm, có ví dụ song ngữ và mẹo đề thi TOEIC/IELTS thực tế.`,
              },
            ],
          }),
        });

        const data = await res.json();
        if (data.success && data.reply) {
          setChatMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
          awardXp(10, "writing");
        } else {
          setChatMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text: "Xin lỗi, AI Tutor đang bận phân tích đề. Vui lòng bấm lại câu hỏi nhé!",
            },
          ]);
        }
      } catch {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Mất kết nối mạng. Vui lòng thử lại sau giây lát!",
          },
        ]);
      } finally {
        setChatLoading(false);
      }
    },
    [chatLoading, topic, chatMessages, awardXp]
  );

  const handleClearChat = useCallback(() => {
    setChatMessages([]);
  }, []);

  return {
    chatMessages,
    chatInput,
    setChatInput,
    chatLoading,
    handleSendChatMessage,
    handleClearChat,
    prompts: GRAMMAR_AI_PROMPTS,
  };
}
