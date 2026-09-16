import { create } from "zustand";
import { useUserStore } from "./userStore";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
  cardType?: "roadmap" | "recommendation" | "welcome";
  cardData?: any;
  suggestedActions?: {
    label: string;
    action?: string;
    path?: string;
    prompt?: string;
  }[];
}

export interface ChatbotNudge {
  id: string;
  text: string;
  actionText?: string;
  actionPrompt?: string;
  actionPath?: string;
}

export interface BubblePosition {
  x: number;
  y: number;
  side: "left" | "right";
}

export interface ChatbotDbData {
  user: {
    level: number;
    totalXp: number;
    currentStreak: number;
    coins: number;
  };
  targetGoal: {
    exam: string;
    score: number;
    currentLevel: string;
    weeklyHours: number;
    completionPercentage: number;
  };
  dailyQuests: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    target: number;
    xpReward: number;
    coinReward: number;
    isCompleted: boolean;
    link: string;
    icon: string;
  }>;
  rewardChest: {
    canClaim: boolean;
    isClaimed: boolean;
    xpReward: number;
    coinReward: number;
  };
  recommendations: {
    weakestSkill?: {
      skill: string;
      label: string;
      minutes7d: number;
      advice: string;
      link: string;
    };
    srsDue?: {
      count: number;
      advice: string;
      link: string;
    };
    nextListening?: {
      lessonId: string;
      title: string;
      category: string;
      progressText: string;
      link: string;
    };
    nextGrammar?: {
      topicId: string;
      title: string;
      advice: string;
      link: string;
    };
    contextualTip?: {
      badge: string;
      title: string;
      description: string;
      actionText: string;
      link: string;
    };
  };
}

interface AiChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  bubblePosition: BubblePosition;
  isDismissed: boolean;
  isDragging: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  nudge: ChatbotNudge | null;
  dbData: ChatbotDbData | null;
  isDbLoading: boolean;
  lastFetchedAt: number;

  // Actions
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  setIsMinimized: (minimized: boolean) => void;
  setBubblePosition: (pos: Partial<BubblePosition>) => void;
  setIsDismissed: (dismissed: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => string;
  updateLastAiMessage: (chunk: string) => void;
  sendMessage: (text: string, pageContext?: string) => Promise<void>;
  clearMessages: () => void;
  setNudge: (nudge: ChatbotNudge | null) => void;
  dismissNudge: () => void;
  initPositionFromStorage: () => void;
  fetchDbRecommendations: (pathname?: string, force?: boolean) => Promise<void>;
  claimDailyChest: () => Promise<boolean>;
  triggerRoadmapCard: () => void;
  triggerRecommendationCard: () => void;
  openWithRoadmapCard: () => void;
  openRoadmapDirectly: () => void;
  openWithQuestion: (question: string) => void;
}

const STORAGE_KEY_POS = "xp_voca_chatbot_bubble_pos";
const STORAGE_KEY_DISMISSED = "xp_voca_chatbot_dismissed";

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "msg_welcome",
  role: "ai",
  text: "Xin chào bạn! Mình là **XP AI Mentor** 🤖. Mình theo dõi sát sao tiến độ học của bạn từ hệ thống và sẵn sàng giải đáp ngữ pháp, gợi ý bài học tối ưu nhất mỗi ngày!",
  timestamp: Date.now(),
  cardType: "welcome",
  suggestedActions: [
    { label: "🗺️ Lộ trình hôm nay", prompt: "Xem lộ trình và nhiệm vụ hôm nay" },
    { label: "⚡ Gợi ý học gì tiếp theo?", prompt: "Gợi ý bài học tiếp theo cho tôi" },
    { label: "🔄 Ôn tập từ vựng SRS", path: "/review" },
    { label: "❓ Giải thích ngữ pháp câu này", prompt: "Giải thích ngữ pháp một câu tiếng Anh" },
  ],
};

export const useAiChatbotStore = create<AiChatbotState>((set, get) => ({
  isOpen: false,
  isMinimized: false,
  bubblePosition: {
    x: 0,
    y: 0,
    side: "right",
  },
  isDismissed: false,
  isDragging: false,
  messages: [DEFAULT_WELCOME_MESSAGE],
  isLoading: false,
  nudge: null,
  dbData: null,
  isDbLoading: false,
  lastFetchedAt: 0,

  setIsOpen: (isOpen) => {
    set({ isOpen, isDismissed: false });
    if (isOpen) {
      set({ nudge: null });
      // Fetch fresh DB recommendations if stale (> 30s)
      get().fetchDbRecommendations();
    }
  },

  toggleOpen: () => {
    const nextState = !get().isOpen;
    set({ isOpen: nextState, isDismissed: false });
    if (nextState) {
      set({ nudge: null });
      get().fetchDbRecommendations();
    }
  },

  setIsMinimized: (isMinimized) => set({ isMinimized }),

  setBubblePosition: (pos) => {
    const updated = { ...get().bubblePosition, ...pos };
    set({ bubblePosition: updated });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  },

  setIsDismissed: (isDismissed) => {
    set({ isDismissed, isOpen: isDismissed ? false : get().isOpen });
    if (typeof window !== "undefined") {
      try {
        if (isDismissed) {
          localStorage.setItem(STORAGE_KEY_DISMISSED, "true");
        } else {
          localStorage.removeItem(STORAGE_KEY_DISMISSED);
        }
      } catch {
        // ignore
      }
    }
  },

  setIsDragging: (isDragging) => set({ isDragging }),

  addMessage: (msg) => {
    const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newMsg: ChatMessage = {
      ...msg,
      id,
      timestamp: Date.now(),
    };
    set((state) => ({ messages: [...state.messages, newMsg] }));
    return id;
  },

  updateLastAiMessage: (chunk) => {
    set((state) => {
      const messages = [...state.messages];
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === "ai") {
        lastMsg.text = chunk;
      }
      return { messages };
    });
  },

  fetchDbRecommendations: async (pathname?: string, force = false) => {
    const now = Date.now();
    // Cache for 20 seconds unless forced
    if (!force && get().dbData && now - get().lastFetchedAt < 20000) {
      return;
    }

    const currentPath =
      pathname || (typeof window !== "undefined" ? window.location.pathname : "/dashboard");

    set({ isDbLoading: true });
    try {
      const res = await fetch(
        `/api/ai/chatbot/recommendations?pathname=${encodeURIComponent(currentPath)}`
      );
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          set({
            dbData: json.data,
            lastFetchedAt: now,
          });

          // Proactive nudge trigger if quests are uncompleted or chest is claimable
          if (json.data.rewardChest?.canClaim) {
            set({
              nudge: {
                id: "chest_claimable",
                text: "🎁 Rương thưởng của bạn đã sẵn sàng (+50 XP & +20 Coins)!",
                actionText: "Mở rương ngay",
                actionPrompt: "Xem lộ trình và nhận thưởng",
              },
            });
          } else if ((json.data.recommendations?.srsDue?.count || 0) > 0) {
            set({
              nudge: {
                id: "srs_due",
                text: `⚡ Bạn có ${json.data.recommendations.srsDue.count} từ vựng cần ôn tập hôm nay!`,
                actionText: "Ôn tập ngay",
                actionPath: "/review",
              },
            });
          }
        }
      }
    } catch (err) {
      console.warn("fetchDbRecommendations error:", err);
    } finally {
      set({ isDbLoading: false });
    }
  },

  claimDailyChest: async () => {
    try {
      const res = await fetch("/api/user/challenges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "daily_chest" }),
      });

      // Award XP & Coins to client user store optimistically
      useUserStore.getState().awardXp(50);
      useUserStore.getState().awardCoins(20);

      // Update local dbData state
      set((state) => {
        if (!state.dbData) return state;
        return {
          dbData: {
            ...state.dbData,
            rewardChest: {
              ...state.dbData.rewardChest,
              canClaim: false,
              isClaimed: true,
            },
          },
        };
      });

      get().addMessage({
        role: "ai",
        text: "🎉 **Chúc mừng bạn!** Bạn đã nhận thành công phần thưởng **+50 XP** & **+20 Coins** cho nỗ lực hoàn thành nhiệm vụ hôm nay! Tiếp tục phát huy nhé! 🚀",
      });

      return true;
    } catch (e) {
      // Fallback optimistic reward
      useUserStore.getState().awardXp(50);
      useUserStore.getState().awardCoins(20);
      set((state) => {
        if (!state.dbData) return state;
        return {
          dbData: {
            ...state.dbData,
            rewardChest: {
              ...state.dbData.rewardChest,
              canClaim: false,
              isClaimed: true,
            },
          },
        };
      });
      return true;
    }
  },

  triggerRoadmapCard: () => {
    get().addMessage({
      role: "ai",
      text: "Dưới đây là **Lộ trình cá nhân hóa & 3 nhiệm vụ ngày** được đồng bộ trực tiếp từ hồ sơ học tập của bạn:",
      cardType: "roadmap",
      cardData: get().dbData,
      suggestedActions: [
        { label: "⚡ Gợi ý bài học tiếp", prompt: "Gợi ý bài học tiếp theo cho tôi" },
        { label: "🔄 Ôn từ vựng SRS", path: "/review" },
      ],
    });
  },

  triggerRecommendationCard: () => {
    get().addMessage({
      role: "ai",
      text: "Dựa trên dữ liệu học tập thực tế 7 ngày qua của bạn, đây là **những bài học ưu tiên cao nhất** cần thực hiện ngay:",
      cardType: "recommendation",
      cardData: get().dbData?.recommendations,
      suggestedActions: [
        { label: "🗺️ Xem lộ trình hôm nay", prompt: "Xem lộ trình và nhiệm vụ hôm nay" },
        { label: "💡 Mẹo tăng điểm TOEIC/IELTS", prompt: "Mẹo luyện thi hiệu quả" },
      ],
    });
  },

  openWithRoadmapCard: () => {
    set({ isOpen: true, isMinimized: false, isDismissed: false });
    get().fetchDbRecommendations();
    get().triggerRoadmapCard();
  },

  openRoadmapDirectly: () => {
    get().openWithRoadmapCard();
  },

  openWithQuestion: (question: string) => {
    set({ isOpen: true, isMinimized: false, isDismissed: false });
    get().sendMessage(question);
  },

  sendMessage: async (text: string, pageContext?: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    get().addMessage({
      role: "user",
      text,
    });

    set({ isLoading: true });

    const lower = text.toLowerCase().trim();

    // Check if user is asking about Roadmap or Quests
    if (
      lower.includes("lộ trình") ||
      lower.includes("nhiệm vụ") ||
      lower.includes("hôm nay") ||
      lower.includes("mục tiêu")
    ) {
      await get().fetchDbRecommendations(pageContext);
      setTimeout(() => {
        set({ isLoading: false });
        get().triggerRoadmapCard();
      }, 400);
      return;
    }

    // Check if user is asking for Lesson Recommendations
    if (
      lower.includes("gợi ý") ||
      lower.includes("học gì") ||
      lower.includes("tiếp theo") ||
      lower.includes("nên học") ||
      lower.includes("bài học")
    ) {
      await get().fetchDbRecommendations(pageContext);
      setTimeout(() => {
        set({ isLoading: false });
        get().triggerRecommendationCard();
      }, 400);
      return;
    }

    // 2. Query Real Gemini AI Backend (/api/ai/chat)
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "quick_ask",
          messages: [
            ...get().messages.map((m) => ({ role: m.role, text: m.text })),
            { role: "user", text },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        let replyText = data.reply || "";

        if (data.vietnameseTranslation && !replyText.includes(data.vietnameseTranslation)) {
          replyText += `\n\n📌 **Tóm tắt cốt lõi:** ${data.vietnameseTranslation}`;
        }
        if (data.betterPhrasing) {
          replyText += `\n\n✨ **Cách diễn đạt bản ngữ tự nhiên:**\n> *"${data.betterPhrasing}"*`;
        }
        if (Array.isArray(data.suggestedWords) && data.suggestedWords.length > 0) {
          replyText += `\n\n📚 **Từ vựng liên quan nên nhớ:**\n` +
            data.suggestedWords
              .map((w: any) => `- **${w.word}** \`${w.ipa || ""}\`: ${w.meaning}`)
              .join("\n");
        }

        get().addMessage({
          role: "ai",
          text: replyText || "Mình đã nhận được câu hỏi. Bạn cần làm rõ thêm phần nào không?",
          suggestedActions: [
            { label: "⚡ Gợi ý bài học tiếp", prompt: "Gợi ý bài học tiếp theo cho tôi" },
            { label: "🗺️ Lộ trình hôm nay", prompt: "Xem lộ trình và nhiệm vụ hôm nay" },
          ],
        });
      } else {
        throw new Error("Chat response failed");
      }
    } catch (error) {
      // Smart offline fallback
      get().addMessage({
        role: "ai",
        text: `Về câu hỏi **"${text}"**:\n\n1. **Quy tắc cốt lõi:** Luôn xác định ngữ cảnh câu, chủ ngữ và thì động từ phù hợp.\n2. **Ví dụ thực tế:** *"Consistent daily practice brings long-term mastery."* (Luyện tập đều đặn mỗi ngày sẽ mang lại sự thành thạo lâu dài).\n3. **Lời khuyên học tập:** Hãy lưu từ vựng mới vào sổ từ và làm bài tập trắc nghiệm liên quan ngay để củng cố phản xạ!`,
        suggestedActions: [
          { label: "🗺️ Xem lộ trình hôm nay", prompt: "Xem lộ trình và nhiệm vụ hôm nay" },
          { label: "⚡ Gợi ý bài học", prompt: "Gợi ý bài học tiếp theo cho tôi" },
        ],
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [DEFAULT_WELCOME_MESSAGE] });
  },

  setNudge: (nudge) => set({ nudge }),
  dismissNudge: () => set({ nudge: null }),

  initPositionFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const savedPos = localStorage.getItem(STORAGE_KEY_POS);
      if (savedPos) {
        const parsed = JSON.parse(savedPos);
        set({ bubblePosition: parsed });
      }
      const isDismissed = localStorage.getItem(STORAGE_KEY_DISMISSED) === "true";
      if (isDismissed) {
        set({ isDismissed: true });
      }
    } catch {
      // ignore
    }
  },
}));
