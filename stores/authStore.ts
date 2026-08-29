import { useUserStore } from "./userStore";

// Compatibility wrapper for useAuthStore forwarding all calls to useUserStore
export const useAuthStore = useUserStore;
