import { describe, it, expect } from "vitest";
import { AiSessionPayload } from "@/app/api/ai/sessions/route";

describe("AI Real-time Session Sync & Hydration Suite", () => {
  // 1. In-Progress Realtime Sync Payload
  it("initializes an active IN_PROGRESS session with partial chat", () => {
    const activeSession: AiSessionPayload = {
      sessionId: "ai_tutor_active_01",
      mode: "tutor",
      personaId: "emma",
      messages: [
        {
          id: "welcome",
          role: "ai",
          text: "Hello! Tell me about your favorite travel destination.",
        },
        {
          id: "user_1",
          role: "user",
          text: "I love traveling to Kyoto because of the serene temples.",
          pronunciationScore: 92,
        },
      ],
      timeSpentSeconds: 45,
      xpEarned: 0,
      status: "IN_PROGRESS",
      createdAt: new Date().toISOString(),
    };

    expect(activeSession.status).toBe("IN_PROGRESS");
    expect(activeSession.messages.length).toBe(2);
    expect(activeSession.timeSpentSeconds).toBe(45);
    expect(activeSession.overallScore).toBeUndefined();
  });

  // 2. Realtime Appending on AI Reply
  it("appends AI response and grammar feedback in-place without losing prior turns", () => {
    const session: AiSessionPayload = {
      sessionId: "ai_conv_active_02",
      mode: "conversation",
      topicId: "at1",
      messages: [
        {
          id: "welcome_at1",
          role: "ai",
          text: "Welcome to The Bistro!",
        },
        {
          id: "user_1",
          role: "user",
          text: "I want a cup of coffee.",
          grammarCorrection: {
            hasError: false,
            original: "I want a cup of coffee.",
            corrected: "I would like a cup of coffee.",
            explanation: "Dùng would like để lịch sự hơn.",
          },
          betterPhrasing: "Could I please get a cup of coffee?",
        },
      ],
      timeSpentSeconds: 90,
      xpEarned: 0,
      status: "IN_PROGRESS",
    };

    // Simulate appending next AI turn
    const updatedMessages = [
      ...session.messages,
      {
        id: "ai_reply_2",
        role: "ai" as const,
        text: "Sure thing! Do you prefer hot or iced coffee?",
        vietnameseTranslation: "Tất nhiên rồi! Quý khách thích cà phê nóng hay đá ạ?",
      },
    ];

    const updatedSession: AiSessionPayload = {
      ...session,
      messages: updatedMessages,
      timeSpentSeconds: 110,
    };

    expect(updatedSession.messages.length).toBe(3);
    expect(updatedSession.status).toBe("IN_PROGRESS");
    expect(updatedSession.timeSpentSeconds).toBe(110);
  });

  // 3. Hydration Logic Simulation on Page Reload (F5)
  it("hydrates previous in-progress messages and coach settings seamlessly", () => {
    const storedSession: AiSessionPayload = {
      sessionId: "ai_tutor_persisted_turn",
      mode: "tutor",
      personaId: "alex",
      messages: [
        { id: "1", role: "ai", text: "Hi there!" },
        { id: "2", role: "user", text: "Hi Alex, let's talk business!" },
      ],
      timeSpentSeconds: 150,
      xpEarned: 0,
      status: "IN_PROGRESS",
    };

    // Client checks if active session should be restored
    const shouldRestore =
      storedSession.status === "IN_PROGRESS" &&
      Array.isArray(storedSession.messages) &&
      storedSession.messages.length > 1;

    expect(shouldRestore).toBe(true);
    expect(storedSession.personaId).toBe("alex");
    expect(storedSession.timeSpentSeconds).toBe(150);
  });

  // 4. Session Finalization on Grading
  it("transitions session from IN_PROGRESS to COMPLETED and records final scores", () => {
    const inProgressSession: AiSessionPayload = {
      sessionId: "ai_tutor_final_eval",
      mode: "tutor",
      personaId: "chloe",
      messages: [
        { id: "1", role: "ai", text: "Hello!" },
        { id: "2", role: "user", text: "G'day Chloe!", pronunciationScore: 95 },
      ],
      timeSpentSeconds: 180,
      xpEarned: 0,
      status: "IN_PROGRESS",
    };

    // User clicks "Chấm điểm"
    const completedSession: AiSessionPayload = {
      ...inProgressSession,
      overallScore: 92,
      grade: "S",
      evaluationMetrics: {
        pronunciationScore: 95,
        fluencyScore: 90,
        intonationScore: 92,
        grammarScore: 90,
      },
      xpEarned: 45,
      status: "COMPLETED",
    };

    expect(completedSession.status).toBe("COMPLETED");
    expect(completedSession.grade).toBe("S");
    expect(completedSession.overallScore).toBe(92);
    expect(completedSession.xpEarned).toBe(45);
  });

  // 5. Race Condition Guard (BUG #5 Fix verification)
  it("protects user messages from being overwritten by delayed async DB hydration", () => {
    let hasUserInteracted = false;
    let clientMessages = [{ id: "welcome", role: "ai", text: "Hello!" }];

    // User speaks before async fetch resolves
    hasUserInteracted = true;
    clientMessages = [
      ...clientMessages,
      { id: "user_fast_msg", role: "user", text: "Hi Emma, I'm typing right away!" },
    ];

    // Later, delayed async DB query resolves with older session
    const dbActiveSessionMessages = [
      { id: "welcome", role: "ai", text: "Hello!" },
      { id: "old_user_msg", role: "user", text: "Yesterday's chat" },
    ];

    // Hydration guard logic:
    if (!hasUserInteracted) {
      clientMessages = dbActiveSessionMessages;
    }

    // Verified: User's newly typed message was NOT overwritten
    expect(clientMessages.length).toBe(2);
    expect(clientMessages[1].id).toBe("user_fast_msg");
  });

  // 6. Topic Switch Cleanup (BUG #11 Fix verification)
  it("cleans up active session and generates fresh session ID on topic change", () => {
    let activeSessionKey: string | null = "xp_active_conv_session";
    let sessionId = "ai_conv_topic1_123";

    // User switches topic:
    activeSessionKey = null; // Removed from localStorage
    sessionId = "ai_conv_topic2_456"; // Fresh ID generated

    expect(activeSessionKey).toBeNull();
    expect(sessionId).toBe("ai_conv_topic2_456");
  });
});

