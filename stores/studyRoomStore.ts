import { create } from "zustand";

export interface StudyRoomMember {
  id?: string;
  userId?: string;
  status: "FOCUSING" | "RESTING" | "OFFLINE";
  user: {
    id: string;
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
    title: string;
    totalXp: number;
  };
}

export interface RoomMessage {
  id: string;
  content: string;
  isAi: boolean;
  isSystem: boolean;
  createdAt: string;
  user?: {
    id: string;
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
  } | null;
}

export interface StudyRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  accentColor?: string;
  maxMembers: number;
  isPrivate: boolean;
  passcode?: string | null;
  createdAt: string;
  creator: {
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
  };
  members: StudyRoomMember[];
  _count?: {
    members: number;
  };
}

export interface PomodoroSessionState {
  timerSeconds: number;
  isTimerRunning: boolean;
  timerMode: "FOCUS" | "BREAK";
  lastTickTimestamp: number;
}

export const PRE_SEEDED_STUDY_ROOMS: StudyRoom[] = [
  {
    id: "room_toeic_800",
    name: "Cày 200 từ vựng TOEIC 800+ mỗi ngày",
    description: "Cùng nhau giải đề ETS và luyện phản xạ từ vựng trọng tâm Part 5, 6, 7.",
    category: "TOEIC",
    accentColor: "#0059bb",
    maxMembers: 20,
    isPrivate: false,
    createdAt: new Date().toISOString(),
    creator: { fullName: "Minh Vũ (IELTS 8.0)", username: "minhvu", avatarEmoji: "🦉" },
    members: [
      {
        status: "FOCUSING",
        user: { id: "u_host", fullName: "Minh Vũ", username: "minhvu", avatarEmoji: "🦉", title: "Study Leader", totalXp: 12500 }
      }
    ],
    _count: { members: 6 }
  },
  {
    id: "room_ielts_speaking",
    name: "Phòng Luyện Nói IELTS 7.0+ Cùng Gemini AI",
    description: "Tập trung luyện phản xạ Part 2 & Part 3, nhận góp ý từ vựng ngữ pháp tự động.",
    category: "SPEAKING",
    accentColor: "#8b5cf6",
    maxMembers: 15,
    isPrivate: false,
    createdAt: new Date().toISOString(),
    creator: { fullName: "Sarah Connor", username: "sarah_c", avatarEmoji: "🦊" },
    members: [
      {
        status: "FOCUSING",
        user: { id: "u_sarah", fullName: "Sarah Connor", username: "sarah_c", avatarEmoji: "🦊", title: "Speaking Pro", totalXp: 9800 }
      }
    ],
    _count: { members: 8 }
  },
  {
    id: "room_vocab_deep",
    name: "SuperMemo SM-2 Focus Room • Nhớ 3000 Từ Cốt Lõi",
    description: "Pomodoro 25 phút không ngắt quãng, ôn tập ngắt quãng flashcards và chia sẻ mẹo nhớ dai.",
    category: "VOCAB",
    accentColor: "#10b981",
    maxMembers: 25,
    isPrivate: false,
    createdAt: new Date().toISOString(),
    creator: { fullName: "Alex Nguyen", username: "alex_n", avatarEmoji: "🦁" },
    members: [
      {
        status: "FOCUSING",
        user: { id: "u_alex", fullName: "Alex Nguyen", username: "alex_n", avatarEmoji: "🦁", title: "Vocab Master", totalXp: 14200 }
      }
    ],
    _count: { members: 12 }
  },
  {
    id: "room_ielts_academic",
    name: "IELTS Academic Reading & Writing Task 2",
    description: "Phân tích bài đọc chuyên sâu, bóc tách cấu trúc câu nâng cao và collocations C1.",
    category: "IELTS",
    accentColor: "#f59e0b",
    maxMembers: 20,
    isPrivate: false,
    createdAt: new Date().toISOString(),
    creator: { fullName: "Elena Rostova", username: "elena_r", avatarEmoji: "🐨" },
    members: [
      {
        status: "FOCUSING",
        user: { id: "u_elena", fullName: "Elena Rostova", username: "elena_r", avatarEmoji: "🐨", title: "Grammar Wizard", totalXp: 8900 }
      }
    ],
    _count: { members: 5 }
  }
];

interface StudyRoomStoreState {
  // Lobby state
  rooms: StudyRoom[];
  roomsLoadedAt: number;
  selectedCategory: string;
  isCreateOpen: boolean;

  // Active room workspace state
  activeRoom: StudyRoom | null;
  pomodoro: PomodoroSessionState;
  roomMessages: Record<string, RoomMessage[]>;
  draftMessage: string;

  // Actions
  setRooms: (rooms: StudyRoom[]) => void;
  setSelectedCategory: (cat: string) => void;
  setIsCreateOpen: (open: boolean) => void;

  enterRoom: (room: StudyRoom) => void;
  leaveRoom: () => void;
  updateActiveRoom: (roomPartial: Partial<StudyRoom>) => void;

  setRoomMessages: (roomId: string, messages: RoomMessage[]) => void;
  appendRoomMessage: (roomId: string, message: RoomMessage) => void;

  setPomodoro: (pomodoroPartial: Partial<PomodoroSessionState>) => void;
  tickPomodoro: () => void;
  resetPomodoro: (mode?: "FOCUS" | "BREAK") => void;

  setDraftMessage: (msg: string) => void;
}

// ─── Frame 0 Fast Probe Helpers ───

export function getInitialStudyRoomsProbe(): { rooms: StudyRoom[]; hasData: boolean } {
  const ramRooms = useStudyRoomStore.getState().rooms;
  if (ramRooms && ramRooms.length > 0) {
    return { rooms: ramRooms, hasData: true };
  }

  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("xp_study_rooms_cache");
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          useStudyRoomStore.getState().setRooms(parsed);
          return { rooms: parsed, hasData: true };
        }
      }
    } catch {}
  }

  // Fallback to pre-seeded rooms at Frame 0
  return { rooms: PRE_SEEDED_STUDY_ROOMS, hasData: true };
}

export function getInitialActiveRoomProbe(): StudyRoom | null {
  const ramActive = useStudyRoomStore.getState().activeRoom;
  if (ramActive) {
    return ramActive;
  }

  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("xp_active_study_room");
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (parsed && parsed.id) {
          useStudyRoomStore.getState().enterRoom(parsed);
          return parsed;
        }
      }
    } catch {}
  }

  return null;
}

export function getInitialRoomCategoryProbe(): string {
  const ramCat = useStudyRoomStore.getState().selectedCategory;
  if (ramCat && ramCat !== "ALL") {
    return ramCat;
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("xp_study_rooms_category");
      if (saved) {
        useStudyRoomStore.getState().setSelectedCategory(saved);
        return saved;
      }
    } catch {}
  }

  return "ALL";
}

export function getInitialPomodoroProbe(): PomodoroSessionState {
  const ramPomodoro = useStudyRoomStore.getState().pomodoro;

  // Calculate elapsed time if timer was running
  if (ramPomodoro.isTimerRunning && ramPomodoro.lastTickTimestamp > 0) {
    const elapsedSeconds = Math.floor((Date.now() - ramPomodoro.lastTickTimestamp) / 1000);
    if (elapsedSeconds > 0) {
      const remainingSeconds = Math.max(0, ramPomodoro.timerSeconds - elapsedSeconds);
      const isStillRunning = remainingSeconds > 0;
      const updatedPomodoro = {
        ...ramPomodoro,
        timerSeconds: remainingSeconds,
        isTimerRunning: isStillRunning,
        lastTickTimestamp: Date.now(),
      };
      useStudyRoomStore.getState().setPomodoro(updatedPomodoro);
      return updatedPomodoro;
    }
  }

  return ramPomodoro;
}

export function getInitialRoomMessagesProbe(roomId?: string): RoomMessage[] {
  if (!roomId) return [];
  const ramMsgs = useStudyRoomStore.getState().roomMessages[roomId];
  if (ramMsgs && ramMsgs.length > 0) {
    return ramMsgs;
  }

  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem(`xp_study_room_messages_${roomId}`);
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          useStudyRoomStore.getState().setRoomMessages(roomId, parsed);
          return parsed;
        }
      }
    } catch {}
  }

  return [];
}

export const useStudyRoomStore = create<StudyRoomStoreState>((set) => ({
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

  setRooms: (rooms) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_study_rooms_cache", JSON.stringify(rooms));
      } catch {}
    }
    set({ rooms, roomsLoadedAt: Date.now() });
  },

  setSelectedCategory: (selectedCategory) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_study_rooms_category", selectedCategory);
      } catch {}
    }
    set({ selectedCategory });
  },

  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),

  enterRoom: (room) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_active_study_room", JSON.stringify(room));
      } catch {}
    }
    set({ activeRoom: room });
  },

  leaveRoom: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("xp_active_study_room");
      } catch {}
    }
    set({
      activeRoom: null,
      pomodoro: {
        timerSeconds: 25 * 60,
        isTimerRunning: false,
        timerMode: "FOCUS",
        lastTickTimestamp: 0,
      },
      draftMessage: "",
    });
  },

  updateActiveRoom: (roomPartial) =>
    set((state) => {
      if (!state.activeRoom) return state;
      const updated = { ...state.activeRoom, ...roomPartial };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("xp_active_study_room", JSON.stringify(updated));
        } catch {}
      }
      return { activeRoom: updated };
    }),

  setRoomMessages: (roomId, messages) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`xp_study_room_messages_${roomId}`, JSON.stringify(messages));
      } catch {}
    }
    set((state) => ({
      roomMessages: {
        ...state.roomMessages,
        [roomId]: messages,
      },
    }));
  },

  appendRoomMessage: (roomId, message) =>
    set((state) => {
      const current = state.roomMessages[roomId] || [];
      const updated = [...current, message];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`xp_study_room_messages_${roomId}`, JSON.stringify(updated));
        } catch {}
      }
      return {
        roomMessages: {
          ...state.roomMessages,
          [roomId]: updated,
        },
      };
    }),

  setPomodoro: (pomodoroPartial) =>
    set((state) => ({
      pomodoro: {
        ...state.pomodoro,
        ...pomodoroPartial,
        lastTickTimestamp: Date.now(),
      },
    })),

  tickPomodoro: () =>
    set((state) => {
      if (!state.pomodoro.isTimerRunning) return state;
      const nextSeconds = Math.max(0, state.pomodoro.timerSeconds - 1);
      return {
        pomodoro: {
          ...state.pomodoro,
          timerSeconds: nextSeconds,
          lastTickTimestamp: Date.now(),
        },
      };
    }),

  resetPomodoro: (mode) =>
    set((state) => {
      const targetMode = mode || state.pomodoro.timerMode;
      const defaultSeconds = targetMode === "FOCUS" ? 25 * 60 : 5 * 60;
      return {
        pomodoro: {
          timerSeconds: defaultSeconds,
          isTimerRunning: false,
          timerMode: targetMode,
          lastTickTimestamp: 0,
        },
      };
    }),

  setDraftMessage: (draftMessage) => set({ draftMessage }),
}));
