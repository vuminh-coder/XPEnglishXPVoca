import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  useStudyRoomStore,
  getInitialStudyRoomsProbe,
  getInitialActiveRoomProbe,
  getInitialRoomCategoryProbe,
  getInitialPomodoroProbe,
  getInitialRoomMessagesProbe,
  PRE_SEEDED_STUDY_ROOMS,
  StudyRoom,
} from "../stores/studyRoomStore";

describe("Study Rooms State Retention & Frame-0 Probe (Page 9: /study/rooms)", () => {
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
    useStudyRoomStore.setState({
      rooms: PRE_SEEDED_STUDY_ROOMS,
      roomsLoadedAt: 0,
      selectedCategory: "ALL",
      isCreateOpen: false,
      activeRoom: null,
      pomodoro: {
        timerSeconds: 25 * 60,
        isTimerRunning: false,
        timerMode: "FOCUS",
        lastTickTimestamp: 0,
      },
      roomMessages: {},
      draftMessage: "",
    });
  });

  afterEach(() => {
    storeMap = {};
  });

  describe("1. useStudyRoomStore Core Behavior", () => {
    it("should initialize with pre-seeded rooms and default state", () => {
      const state = useStudyRoomStore.getState();
      expect(state.rooms.length).toBeGreaterThanOrEqual(4);
      expect(state.selectedCategory).toBe("ALL");
      expect(state.activeRoom).toBeNull();
      expect(state.pomodoro.timerSeconds).toBe(25 * 60);
      expect(state.pomodoro.isTimerRunning).toBe(false);
      expect(state.pomodoro.timerMode).toBe("FOCUS");
    });

    it("should persist selectedCategory across navigation", () => {
      useStudyRoomStore.getState().setSelectedCategory("IELTS");
      expect(useStudyRoomStore.getState().selectedCategory).toBe("IELTS");
      expect(localStorageMock.getItem("xp_study_rooms_category")).toBe("IELTS");
    });

    it("should enter and leave room correctly", () => {
      const mockRoom: StudyRoom = {
        id: "room_test_1",
        name: "Phòng Kiểm Thử",
        description: "Mô tả phòng",
        category: "TOEIC",
        maxMembers: 10,
        isPrivate: false,
        createdAt: new Date().toISOString(),
        creator: { fullName: "User Test", username: "tester", avatarEmoji: "🦊" },
        members: [],
      };

      useStudyRoomStore.getState().enterRoom(mockRoom);
      expect(useStudyRoomStore.getState().activeRoom?.id).toBe("room_test_1");
      expect(localStorageMock.getItem("xp_active_study_room")).toContain("room_test_1");

      useStudyRoomStore.getState().leaveRoom();
      expect(useStudyRoomStore.getState().activeRoom).toBeNull();
      expect(localStorageMock.getItem("xp_active_study_room")).toBeNull();
    });

    it("should append and preserve room messages per roomId", () => {
      const roomId = "room_test_chat";
      useStudyRoomStore.getState().setRoomMessages(roomId, [
        { id: "m1", content: "Xin chào cả phòng!", isAi: false, isSystem: false, createdAt: new Date().toISOString() },
      ]);

      useStudyRoomStore.getState().appendRoomMessage(roomId, {
        id: "m2",
        content: "Chào bạn, hãy cùng học nhé!",
        isAi: false,
        isSystem: false,
        createdAt: new Date().toISOString(),
      });

      const msgs = useStudyRoomStore.getState().roomMessages[roomId];
      expect(msgs).toHaveLength(2);
      expect(msgs[0].content).toBe("Xin chào cả phòng!");
      expect(msgs[1].content).toBe("Chào bạn, hãy cùng học nhé!");
    });

    it("should handle Pomodoro timer ticks and mode reset", () => {
      useStudyRoomStore.getState().setPomodoro({
        timerSeconds: 1500,
        isTimerRunning: true,
        timerMode: "FOCUS",
      });

      useStudyRoomStore.getState().tickPomodoro();
      expect(useStudyRoomStore.getState().pomodoro.timerSeconds).toBe(1499);
      expect(useStudyRoomStore.getState().pomodoro.isTimerRunning).toBe(true);

      useStudyRoomStore.getState().resetPomodoro("BREAK");
      expect(useStudyRoomStore.getState().pomodoro.timerSeconds).toBe(5 * 60);
      expect(useStudyRoomStore.getState().pomodoro.isTimerRunning).toBe(false);
      expect(useStudyRoomStore.getState().pomodoro.timerMode).toBe("BREAK");
    });
  });

  describe("2. Frame-0 Probes (0ms Instant Render & No Kick-Out)", () => {
    it("getInitialStudyRoomsProbe should return pre-seeded rooms instantly (hasData = true)", () => {
      const probe = getInitialStudyRoomsProbe();
      expect(probe.hasData).toBe(true);
      expect(probe.rooms.length).toBeGreaterThanOrEqual(4);
      expect(probe.rooms[0].category).toBe("TOEIC");
    });

    it("getInitialActiveRoomProbe should preserve active room when returning to page (No Kick-Out)", () => {
      const mockSavedRoom: StudyRoom = {
        id: "room_saved_persistence",
        name: "Luyện Đề Khẩn Cấp",
        description: "Đang làm dở",
        category: "SPEAKING",
        maxMembers: 15,
        isPrivate: false,
        createdAt: new Date().toISOString(),
        creator: { fullName: "Alex", username: "alex", avatarEmoji: "🦁" },
        members: [],
      };

      // User was in a room, saved to localStorage
      localStorageMock.setItem("xp_active_study_room", JSON.stringify(mockSavedRoom));
      useStudyRoomStore.setState({ activeRoom: null });

      // Frame 0 probe restores active room immediately without kicking user out to lobby
      const probe = getInitialActiveRoomProbe();
      expect(probe).not.toBeNull();
      expect(probe?.id).toBe("room_saved_persistence");
      expect(probe?.category).toBe("SPEAKING");
      expect(useStudyRoomStore.getState().activeRoom?.id).toBe("room_saved_persistence");
    });

    it("getInitialRoomCategoryProbe should restore saved category on Frame 0", () => {
      localStorageMock.setItem("xp_study_rooms_category", "VOCAB");
      useStudyRoomStore.setState({ selectedCategory: "ALL" });

      const cat = getInitialRoomCategoryProbe();
      expect(cat).toBe("VOCAB");
    });

    it("getInitialPomodoroProbe should automatically deduct elapsed time if timer was running", () => {
      const tenSecondsAgo = Date.now() - 10000;
      useStudyRoomStore.setState({
        pomodoro: {
          timerSeconds: 1500,
          isTimerRunning: true,
          timerMode: "FOCUS",
          lastTickTimestamp: tenSecondsAgo,
        },
      });

      const pomodoroProbe = getInitialPomodoroProbe();
      // Should deduct approximately 10 seconds
      expect(pomodoroProbe.timerSeconds).toBeLessThanOrEqual(1491);
      expect(pomodoroProbe.timerSeconds).toBeGreaterThanOrEqual(1488);
      expect(pomodoroProbe.isTimerRunning).toBe(true);
    });

    it("getInitialRoomMessagesProbe should retrieve messages for active room from localStorage", () => {
      const roomId = "room_probe_msgs";
      const sampleMsgs = [
        { id: "m10", content: "Tin nhắn lưu trữ", isAi: true, isSystem: false, createdAt: new Date().toISOString() },
      ];
      localStorageMock.setItem(`xp_study_room_messages_${roomId}`, JSON.stringify(sampleMsgs));

      const msgs = getInitialRoomMessagesProbe(roomId);
      expect(msgs).toHaveLength(1);
      expect(msgs[0].content).toBe("Tin nhắn lưu trữ");
    });
  });
});
