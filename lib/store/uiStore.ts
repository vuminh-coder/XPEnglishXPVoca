import { create } from 'zustand';

interface UiState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set, get) => {
  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    if (typeof window === 'undefined') return;
    let targetTheme = theme;
    if (theme === 'system') {
      const isDarkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;
      targetTheme = isDarkOS ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
  };

  return {
    theme: 'light',
    sidebarOpen: false,

    setTheme: (theme) => {
      applyTheme(theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem("xp_theme_preference", theme);
      }
      set({ theme });
    },

    toggleTheme: () => {
      const current = get().theme;
      const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
      applyTheme(next);
      if (typeof window !== 'undefined') {
        localStorage.setItem("xp_theme_preference", next);
      }
      set({ theme: next });
    },

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
  };
});