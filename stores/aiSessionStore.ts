import { create } from "zustand";

export interface AiSuggestedWord {
  word: string;
  meaning?: string;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  pronunciationScore?: number;
  grammarCorrection?: {
    hasError?: boolean;
    original: string;
    corrected: string;
    explanation: string;
  };
  betterPhrasing?: string;
  vietnameseTranslation?: string;
  suggestedWords?: AiSuggestedWord[];
  suggestedPhrases?: string[];
}

export interface AiTutorSessionState {
  sessionId: string;
  personaId: "emma" | "alex" | "chloe";
  speechSpeed: number;
  soundEnabled: boolean;
  messages: AiChatMessage[];
  elapsedTime: number;
  currentSuggestions: {
    words: AiSuggestedWord[];
    phrases: string[];
  };
  spokenText?: string;
  isSessionCompleted?: boolean;
  savedAt?: number;
}

export interface AiConversationSessionState {
  sessionId: string;
  selectedTopicId: string;
  selectedPersonaId: string;
  selectedDifficulty: "Beginner" | "Intermediate" | "Advanced" | null;
  soundEnabled: boolean;
  messages: AiChatMessage[];
  elapsedTime: number;
  currentSuggestions: {
    words: AiSuggestedWord[];
    phrases: string[];
  };
  spokenText?: string;
  isSessionCompleted?: boolean;
  savedAt?: number;
}

interface AiSessionStore {
  tutorSession: AiTutorSessionState | null;
  conversationSession: AiConversationSessionState | null;

  // Actions for AI Tutor
  setTutorSession: (session: Partial<AiTutorSessionState>) => void;
  updateTutorMessages: (messages: AiChatMessage[]) => void;
  resetTutorSession: () => void;

  // Actions for AI Conversation
  setConversationSession: (session: Partial<AiConversationSessionState>) => void;
  updateConversationMessages: (messages: AiChatMessage[]) => void;
  resetConversationSession: () => void;
}

// Helpers for synchronous Frame-0 probing
export function getInitialTutorSessionProbe(): AiTutorSessionState | null {
  // 1. RAM Store probe
  const ram = useAiSessionStore.getState().tutorSession;
  if (ram && ram.messages && ram.messages.length > 0) {
    return ram;
  }

  // 2. Synchronous client localStorage probe (Frame-0 fallback)
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("xp_active_tutor_session");
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (parsed.sessionId && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          const session: AiTutorSessionState = {
            sessionId: parsed.sessionId,
            personaId: (parsed.personaId === "emma" || parsed.personaId === "alex" || parsed.personaId === "chloe") ? parsed.personaId : "emma",
            speechSpeed: typeof parsed.speechSpeed === "number" ? parsed.speechSpeed : 1.0,
            soundEnabled: parsed.soundEnabled ?? true,
            messages: parsed.messages,
            elapsedTime: typeof parsed.elapsedTime === "number" ? parsed.elapsedTime : 0,
            currentSuggestions: parsed.currentSuggestions || { words: [], phrases: [] },
            isSessionCompleted: parsed.isSessionCompleted ?? false,
            savedAt: parsed.savedAt || Date.now(),
          };
          // Hydrate RAM
          useAiSessionStore.getState().setTutorSession(session);
          return session;
        }
      }
    } catch {}
  }

  return null;
}

export function getInitialConversationSessionProbe(): AiConversationSessionState | null {
  // 1. RAM Store probe
  const ram = useAiSessionStore.getState().conversationSession;
  if (ram && ram.messages && ram.messages.length > 0) {
    return ram;
  }

  // 2. Synchronous client localStorage probe (Frame-0 fallback)
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("xp_active_conv_session");
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (parsed.sessionId && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          const session: AiConversationSessionState = {
            sessionId: parsed.sessionId,
            selectedTopicId: parsed.topicId || "at1",
            selectedPersonaId: parsed.personaId || "native_friend",
            selectedDifficulty: parsed.selectedDifficulty || null,
            soundEnabled: parsed.soundEnabled ?? true,
            messages: parsed.messages,
            elapsedTime: typeof parsed.elapsedTime === "number" ? parsed.elapsedTime : 0,
            currentSuggestions: parsed.currentSuggestions || { words: [], phrases: [] },
            isSessionCompleted: parsed.isSessionCompleted ?? false,
            savedAt: parsed.savedAt || Date.now(),
          };
          // Hydrate RAM
          useAiSessionStore.getState().setConversationSession(session);
          return session;
        }
      }
    } catch {}
  }

  return null;
}

export const useAiSessionStore = create<AiSessionStore>((set) => ({
  tutorSession: null,
  conversationSession: null,

  setTutorSession: (session) =>
    set((state) => ({
      tutorSession: state.tutorSession
        ? { ...state.tutorSession, ...session }
        : {
            sessionId: session.sessionId || `ai_tutor_${Date.now()}`,
            personaId: session.personaId || "emma",
            speechSpeed: session.speechSpeed ?? 1.0,
            soundEnabled: session.soundEnabled ?? true,
            messages: session.messages || [],
            elapsedTime: session.elapsedTime ?? 0,
            currentSuggestions: session.currentSuggestions || { words: [], phrases: [] },
            spokenText: session.spokenText || "",
            isSessionCompleted: session.isSessionCompleted ?? false,
            savedAt: session.savedAt || Date.now(),
            ...session,
          },
    })),

  updateTutorMessages: (messages) =>
    set((state) => ({
      tutorSession: state.tutorSession
        ? { ...state.tutorSession, messages, savedAt: Date.now() }
        : null,
    })),

  resetTutorSession: () =>
    set(() => {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("xp_active_tutor_session");
        } catch {}
      }
      return { tutorSession: null };
    }),

  setConversationSession: (session) =>
    set((state) => ({
      conversationSession: state.conversationSession
        ? { ...state.conversationSession, ...session }
        : {
            sessionId: session.sessionId || `ai_conv_${Date.now()}`,
            selectedTopicId: session.selectedTopicId || "at1",
            selectedPersonaId: session.selectedPersonaId || "native_friend",
            selectedDifficulty: session.selectedDifficulty ?? null,
            soundEnabled: session.soundEnabled ?? true,
            messages: session.messages || [],
            elapsedTime: session.elapsedTime ?? 0,
            currentSuggestions: session.currentSuggestions || { words: [], phrases: [] },
            spokenText: session.spokenText || "",
            isSessionCompleted: session.isSessionCompleted ?? false,
            savedAt: session.savedAt || Date.now(),
            ...session,
          },
    })),

  updateConversationMessages: (messages) =>
    set((state) => ({
      conversationSession: state.conversationSession
        ? { ...state.conversationSession, messages, savedAt: Date.now() }
        : null,
    })),

  resetConversationSession: () =>
    set(() => {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("xp_active_conv_session");
        } catch {}
      }
      return { conversationSession: null };
    }),
}));
