import { useUserStore } from "./userStore";

// Compatibility wrapper for useAuthStore forwarding all calls to useUserStore safely without circular initialization
export const useAuthStore: typeof useUserStore = ((...args: Parameters<typeof useUserStore>) => (useUserStore as any)(...args)) as any;

Object.defineProperty(useAuthStore, "getState", {
  get: () => useUserStore.getState,
});
Object.defineProperty(useAuthStore, "setState", {
  get: () => useUserStore.setState,
});
Object.defineProperty(useAuthStore, "subscribe", {
  get: () => useUserStore.subscribe,
});
