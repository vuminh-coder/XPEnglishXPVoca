import { create } from 'zustand';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  toggleTheme: () => set((state) => {
    const next = state.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
    return { theme: next };
  }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}));