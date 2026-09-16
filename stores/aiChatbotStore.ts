import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
  suggestedActions?: {
    label: string;
    action?: string;
    path?: string;
    tab?: "chat" | "roadmap" | "suggestions";
  }[];
}

export interface ChatbotNudge {
  id: string;
  text: string;
  actionText?: string;
  actionTab?: "chat" | "roadmap" | "suggestions";
  actionPath?: string;
}

export interface BubblePosition {
  x: number;
  y: number;
  side: "left" | "right";
}

interface AiChatbotState {
  isOpen: boolean;
  activeTab: "chat" | "roadmap" | "suggestions";
  isMinimized: boolean;
  bubblePosition: BubblePosition;
  isDismissed: boolean;
  isDragging: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  nudge: ChatbotNudge | null;

  // Actions
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  setActiveTab: (tab: "chat" | "roadmap" | "suggestions") => void;
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
  openRoadmapDirectly: () => void;
  openWithQuestion: (question: string) => void;
  initPositionFromStorage: () => void;
}

const STORAGE_KEY_POS = "xp_voca_chatbot_bubble_pos";
const STORAGE_KEY_DISMISSED = "xp_voca_chatbot_dismissed";

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "msg_welcome",
  role: "ai",
  text: "Xin chào bạn! Mình là **XP AI Mentor** 🤖. Mình ở đây để đồng hành cùng bạn chinh phục lộ trình học tập, giải đáp ngữ pháp, tra cứu từ vựng và gợi ý bài học thông minh mỗi ngày!",
  timestamp: Date.now(),
  suggestedActions: [
    { label: "🗺️ Lộ trình hôm nay của tôi", tab: "roadmap" },
    { label: "⚡ Kiểm tra 5 từ vựng vừa học", action: "quiz_vocab" },
    { label: "💡 Tôi nên học gì tiếp theo?", tab: "suggestions" },
  ],
};

export const useAiChatbotStore = create<AiChatbotState>((set, get) => ({
  isOpen: false,
  activeTab: "chat",
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

  setIsOpen: (isOpen) => {
    set({ isOpen, isDismissed: false });
    if (isOpen) {
      set({ nudge: null });
    }
  },

  toggleOpen: () => {
    const nextState = !get().isOpen;
    set({ isOpen: nextState, isDismissed: false });
    if (nextState) {
      set({ nudge: null });
    }
  },

  setActiveTab: (activeTab) => set({ activeTab }),

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
      const msgs = [...state.messages];
      if (msgs.length === 0) return state;
      const lastIdx = msgs.length - 1;
      if (msgs[lastIdx].role === "ai") {
        msgs[lastIdx] = {
          ...msgs[lastIdx],
          text: msgs[lastIdx].text + chunk,
        };
      }
      return { messages: msgs };
    });
  },

  sendMessage: async (text: string, pageContext?: string) => {
    const trimmed = text.trim();
    if (!trimmed || get().isLoading) return;

    // 1. Add user message
    get().addMessage({
      role: "user",
      text: trimmed,
    });

    set({ isLoading: true });

    try {
      // 2. Add empty AI placeholder message
      const aiMsgId = get().addMessage({
        role: "ai",
        text: "",
      });

      // 3. Call API
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          context: pageContext || "",
          history: get().messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API error: ${res.status}`);
      }

      const json = await res.json();
      const reply = json.reply || json.response || json.message || "Xin lỗi bạn, mình chưa phản hồi được lúc này. Hãy thử lại nhé!";

      // Update AI message
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === aiMsgId ? { ...m, text: reply } : m
        ),
        isLoading: false,
      }));
    } catch (err) {
      console.error("Error in AI Chat:", err);
      // Fallback friendly response
      set((state) => {
        const msgs = [...state.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === "ai" && !last.text) {
          last.text = "Mình đã ghi nhận câu hỏi! Hiện tại mạng có chút chậm, bạn có thể kiểm tra lại kết nối hoặc hỏi lại về lộ trình học hôm nay nhé! ✨";
        }
        return { messages: msgs, isLoading: false };
      });
    }
  },

  clearMessages: () => set({ messages: [DEFAULT_WELCOME_MESSAGE] }),

  setNudge: (nudge) => set({ nudge }),

  dismissNudge: () => set({ nudge: null }),

  openRoadmapDirectly: () => {
    set({
      isOpen: true,
      activeTab: "roadmap",
      isDismissed: false,
      nudge: null,
    });
  },

  openWithQuestion: (question: string) => {
    set({
      isOpen: true,
      activeTab: "chat",
      isDismissed: false,
      nudge: null,
    });
    get().sendMessage(question);
  },

  initPositionFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const savedPos = localStorage.getItem(STORAGE_KEY_POS);
      if (savedPos) {
        const parsed = JSON.parse(savedPos);
        set({ bubblePosition: parsed });
      }
      const savedDismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (savedDismissed === "true") {
        set({ isDismissed: false }); // Bring back so user is not stuck
      }
    } catch {
      // ignore
    }
  },
}));
