import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  useAiSessionStore,
  getInitialTutorSessionProbe,
  getInitialConversationSessionProbe,
} from "../stores/aiSessionStore";

describe("AI State Retention & Frame-0 Probe (Page 8: /ai/tutor & /ai/conversation)", () => {
  let storeMap: Record<string, string> = {};

  const localStorageMock = {
    getItem: (key: string) => storeMap[key] || null,
    setItem: (key: string, value: string) => {
      storeMap[key] = String(value);
    },
    removeItem: (key: string) => {
      delete storeMap[key];
    },
    clear: () => {
      storeMap = {};
    },
  };

  beforeEach(() => {
    storeMap = {};
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = localStorageMock;

    // Reset Zustand store
    useAiSessionStore.setState({
      tutorSession: null,
      conversationSession: null,
    });
  });

  afterEach(() => {
    storeMap = {};
  });

  describe("1. useAiSessionStore Core Behavior", () => {
    it("should initialize with null sessions", () => {
      const state = useAiSessionStore.getState();
      expect(state.tutorSession).toBeNull();
      expect(state.conversationSession).toBeNull();
    });

    it("should set and update tutor session state accurately", () => {
      useAiSessionStore.getState().setTutorSession({
        sessionId: "tutor_test_1",
        personaId: "alex",
        speechSpeed: 1.25,
        soundEnabled: false,
        messages: [
          { id: "m1", role: "ai", text: "Hello there!" },
          { id: "m2", role: "user", text: "Hi Alex, let us practice business pitch." },
        ],
        elapsedTime: 45,
      });

      const session = useAiSessionStore.getState().tutorSession;
      expect(session).not.toBeNull();
      expect(session?.sessionId).toBe("tutor_test_1");
      expect(session?.personaId).toBe("alex");
      expect(session?.speechSpeed).toBe(1.25);
      expect(session?.soundEnabled).toBe(false);
      expect(session?.messages).toHaveLength(2);
      expect(session?.elapsedTime).toBe(45);
    });

    it("should reset tutor session correctly", () => {
      useAiSessionStore.getState().setTutorSession({
        sessionId: "tutor_test_to_reset",
        personaId: "chloe",
      });
      expect(useAiSessionStore.getState().tutorSession).not.toBeNull();

      useAiSessionStore.getState().resetTutorSession();
      expect(useAiSessionStore.getState().tutorSession).toBeNull();
    });

    it("should set and update conversation session state accurately", () => {
      useAiSessionStore.getState().setConversationSession({
        sessionId: "conv_test_1",
        selectedTopicId: "at3",
        selectedPersonaId: "ielts_examiner",
        selectedDifficulty: "Advanced",
        soundEnabled: true,
        messages: [
          { id: "cm1", role: "ai", text: "Tell me about your hometown." },
          { id: "cm2", role: "user", text: "I was born in a vibrant coastal city." },
        ],
        elapsedTime: 120,
      });

      const session = useAiSessionStore.getState().conversationSession;
      expect(session).not.toBeNull();
      expect(session?.sessionId).toBe("conv_test_1");
      expect(session?.selectedTopicId).toBe("at3");
      expect(session?.selectedPersonaId).toBe("ielts_examiner");
      expect(session?.selectedDifficulty).toBe("Advanced");
      expect(session?.messages).toHaveLength(2);
      expect(session?.elapsedTime).toBe(120);
    });

    it("should reset conversation session correctly", () => {
      useAiSessionStore.getState().setConversationSession({
        sessionId: "conv_test_to_reset",
        selectedTopicId: "at2",
      });
      expect(useAiSessionStore.getState().conversationSession).not.toBeNull();

      useAiSessionStore.getState().resetConversationSession();
      expect(useAiSessionStore.getState().conversationSession).toBeNull();
    });
  });

  describe("2. Frame-0 Probes (Instant 0ms Render)", () => {
    it("getInitialTutorSessionProbe should return RAM session immediately when available", () => {
      useAiSessionStore.getState().setTutorSession({
        sessionId: "probe_ram_session",
        personaId: "emma",
        messages: [{ id: "1", role: "ai", text: "Welcome back!" }],
        elapsedTime: 30,
      });

      const probeResult = getInitialTutorSessionProbe();
      expect(probeResult).not.toBeNull();
      expect(probeResult?.sessionId).toBe("probe_ram_session");
      expect(probeResult?.personaId).toBe("emma");
      expect(probeResult?.elapsedTime).toBe(30);
    });

    it("getInitialTutorSessionProbe should fallback to localStorage probe and hydrate RAM on Frame 0", () => {
      useAiSessionStore.setState({ tutorSession: null });

      const mockSavedSession = {
        sessionId: "local_storage_tutor_session",
        personaId: "alex",
        speechSpeed: 1.1,
        soundEnabled: true,
        messages: [
          { id: "1", role: "ai", text: "Previous chat" },
          { id: "2", role: "user", text: "Previous answer" },
        ],
        elapsedTime: 65,
        savedAt: Date.now(),
      };
      localStorageMock.setItem("xp_active_tutor_session", JSON.stringify(mockSavedSession));

      const probeResult = getInitialTutorSessionProbe();
      expect(probeResult).not.toBeNull();
      expect(probeResult?.sessionId).toBe("local_storage_tutor_session");
      expect(probeResult?.personaId).toBe("alex");
      expect(probeResult?.elapsedTime).toBe(65);

      // Verify RAM store is also hydrated
      expect(useAiSessionStore.getState().tutorSession?.sessionId).toBe("local_storage_tutor_session");
    });

    it("getInitialConversationSessionProbe should return RAM session immediately when available", () => {
      useAiSessionStore.getState().setConversationSession({
        sessionId: "probe_conv_ram",
        selectedTopicId: "at4",
        selectedPersonaId: "traveler",
        messages: [{ id: "1", role: "ai", text: "At airport" }],
        elapsedTime: 80,
      });

      const probeResult = getInitialConversationSessionProbe();
      expect(probeResult).not.toBeNull();
      expect(probeResult?.sessionId).toBe("probe_conv_ram");
      expect(probeResult?.selectedTopicId).toBe("at4");
      expect(probeResult?.selectedPersonaId).toBe("traveler");
      expect(probeResult?.elapsedTime).toBe(80);
    });

    it("getInitialConversationSessionProbe should fallback to localStorage probe and hydrate RAM on Frame 0", () => {
      useAiSessionStore.setState({ conversationSession: null });

      const mockSavedConv = {
        sessionId: "local_storage_conv_session",
        topicId: "at5",
        personaId: "interviewer",
        selectedDifficulty: "Intermediate",
        soundEnabled: true,
        messages: [
          { id: "c1", role: "ai", text: "Welcome to the interview." },
          { id: "c2", role: "user", text: "Thank you, glad to be here." },
        ],
        elapsedTime: 150,
        savedAt: Date.now(),
      };
      localStorageMock.setItem("xp_active_conv_session", JSON.stringify(mockSavedConv));

      const probeResult = getInitialConversationSessionProbe();
      expect(probeResult).not.toBeNull();
      expect(probeResult?.sessionId).toBe("local_storage_conv_session");
      expect(probeResult?.selectedTopicId).toBe("at5");
      expect(probeResult?.selectedPersonaId).toBe("interviewer");
      expect(probeResult?.elapsedTime).toBe(150);

      // Verify RAM store is also hydrated
      expect(useAiSessionStore.getState().conversationSession?.selectedTopicId).toBe("at5");
    });
  });
});
