"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { GrammarChatMessage, GrammarTopic } from "../types/grammarTypes";
import { useUserStore } from "@/stores/userStore";
import { useGrammarProgressStore } from "@/stores/grammarProgressStore";

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
  const topicId = topic?.id || "";

  // Frame 0 Synchronous Cache Probe from Zustand RAM Store
  const initialSavedChat = useMemo(() => {
    if (!topicId) return null;
    return useGrammarProgressStore.getState().getAiChatSession(topicId);
  }, [topicId]);

  const [chatMessages, setChatMessages] = useState<GrammarChatMessage[]>(() => initialSavedChat?.messages || []);
  const [chatInput, setChatInput] = useState<string>(() => initialSavedChat?.draftInput || "");
  const [chatLoading, setChatLoading] = useState(false);

  // Switch session if topicId changes dynamically
  const activeTopicIdRef = useRef(topicId);
  useEffect(() => {
    if (activeTopicIdRef.current !== topicId) {
      activeTopicIdRef.current = topicId;
      const s = useGrammarProgressStore.getState().getAiChatSession(topicId);
      if (s) {
        setChatMessages(s.messages || []);
        setChatInput(s.draftInput || "");
      } else {
        setChatMessages([]);
        setChatInput("");
      }
    }
  }, [topicId]);

  // Synchronize chat state updates to Zustand RAM store
  useEffect(() => {
    if (topicId && (chatMessages.length > 0 || chatInput)) {
      useGrammarProgressStore.getState().saveAiChatSession(topicId, {
        messages: chatMessages,
        draftInput: chatInput,
      });
    }
  }, [topicId, chatMessages, chatInput]);

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
    setChatInput("");
    if (topicId) {
      useGrammarProgressStore.getState().clearAiChatSession(topicId);
    }
  }, [topicId]);

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
