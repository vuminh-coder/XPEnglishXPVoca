'use client';
import { useUiStore } from '@/lib/store/uiStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUiStore();
  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
      title="Đổi chủ đề"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}