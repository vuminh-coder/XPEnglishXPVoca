import { create } from "zustand";

export interface AppNotification {
  id: string;
  icon: string;
  title: string;
  body: string;
  type: "study" | "social" | "system";
  isRead: boolean;
  createdAt: string;
  routeLink?: string;
}

interface NotificationCenterState {
  notifications: AppNotification[];
  unreadCount: number;
  loadFromStorage: () => void;
  addNotification: (notification: Omit<AppNotification, "id" | "isRead" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const LOCAL_STORAGE_KEY = "xp_app_notifications";

const defaultNotifications: AppNotification[] = [
  {
    id: "n1",
    icon: "🏆",
    title: "Thành tựu mới!",
    body: 'Bạn đã đạt được "5 Ngày Liên"! +100 XP',
    type: "study",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    routeLink: "/profile",
  },
  {
    id: "n2",
    icon: "👋",
    title: "Lời mời kết bạn",
    body: "HoangAnh muốn kết bạn với bạn",
    type: "social",
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    routeLink: "/community",
  },
  {
    id: "n3",
    icon: "📚",
    title: "Đừng quên ôn tập!",
    body: "Bạn có 12 từ cần ôn lại hôm nay",
    type: "study",
    isRead: true,
    createdAt: new Date(Date.now() - 240 * 60000).toISOString(),
    routeLink: "/review",
  },
];

export const useNotificationCenterStore = create<NotificationCenterState>((set, get) => {
  const updateLocalStorage = (notifications: AppNotification[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notifications));
    }
  };

  return {
    notifications: [],
    unreadCount: 0,

    loadFromStorage: () => {
      if (typeof window === "undefined") return;
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as AppNotification[];
          set({
            notifications: parsed,
            unreadCount: parsed.filter((n) => !n.isRead).length,
          });
        } else {
          // Initialize with default notifications if no storage exists
          set({
            notifications: defaultNotifications,
            unreadCount: defaultNotifications.filter((n) => !n.isRead).length,
          });
          updateLocalStorage(defaultNotifications);
        }
      } catch (err) {
        console.error("Failed to load notifications from local storage", err);
      }
    },

    addNotification: (notification) => {
      const newNotif: AppNotification = {
        ...notification,
        id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      set((state) => {
        const list = [newNotif, ...state.notifications];
        updateLocalStorage(list);
        return {
          notifications: list,
          unreadCount: list.filter((n) => !n.isRead).length,
        };
      });
    },

    markAsRead: (id) => {
      set((state) => {
        const list = state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        );
        updateLocalStorage(list);
        return {
          notifications: list,
          unreadCount: list.filter((n) => !n.isRead).length,
        };
      });
    },

    markAllAsRead: () => {
      set((state) => {
        const list = state.notifications.map((n) => ({ ...n, isRead: true }));
        updateLocalStorage(list);
        return {
          notifications: list,
          unreadCount: 0,
        };
      });
    },

    deleteNotification: (id) => {
      set((state) => {
        const list = state.notifications.filter((n) => n.id !== id);
        updateLocalStorage(list);
        return {
          notifications: list,
          unreadCount: list.filter((n) => !n.isRead).length,
        };
      });
    },

    clearAll: () => {
      set(() => {
        updateLocalStorage([]);
        return {
          notifications: [],
          unreadCount: 0,
        };
      });
    },
  };
});
