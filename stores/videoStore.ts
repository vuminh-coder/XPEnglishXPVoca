import { create } from "zustand";

export interface SubtitleSentence {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  textEn: string;
  textVn: string;
  dictationWord: string;
  wordTimings?: { word: string; start: number; end: number }[];
}

export interface YouTubeVideoItem {
  id: string; // YouTube Video ID
  youtubeUrl: string;
  title: string;
  authorName: string;
  thumbnailUrl: string;
  duration: string;
  category: "Business" | "Communication" | "TED Talks" | "Movies" | "News" | "IELTS/TOEIC" | "General";
  level: "Easy" | "Medium" | "Hard";
  savedAt: string;
  progressPercent: number;
  isFavorite: boolean;
  subtitles: SubtitleSentence[];
}

import { PRESET_YOUTUBE_VIDEOS } from "@/features/listening/data/defaultVideoPresets";
export { PRESET_YOUTUBE_VIDEOS };

interface VideoState {
  savedVideos: YouTubeVideoItem[];
  addVideo: (video: YouTubeVideoItem) => void;
  removeVideo: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateProgress: (id: string, percent: number) => void;
  updateVideoSubtitles: (id: string, subtitles: SubtitleSentence[]) => void;
  loadSavedVideos: () => void;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  savedVideos: PRESET_YOUTUBE_VIDEOS,

  loadSavedVideos: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("xp_voca_my_videos");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Auto-migrate if stored contains outdated invalid IDs or truncated Steve Jobs subtitles (< 50 cues)
            const needsUpgrade = parsed.some(
              (v: any) =>
                v.id === "gN78u1P3j9Y" ||
                v.id === "7X8II6J-6mU" ||
                (v.id === "2Vv-BfVoq4g" && v.title?.includes("Business English")) ||
                (v.id === "UF8uR6Z6KLc" && (!v.subtitles || v.subtitles.length < 50))
            );
            if (!needsUpgrade) {
              set({ savedVideos: parsed });
              return;
            }

            // Upgrade presets to full-length authentic subtitles while preserving favorites & progress
            const upgradedVideos = PRESET_YOUTUBE_VIDEOS.map((preset) => {
              const existing = parsed.find((p: any) => p.id === preset.id);
              if (existing) {
                return {
                  ...preset,
                  isFavorite: existing.isFavorite ?? preset.isFavorite,
                  progressPercent: existing.progressPercent ?? preset.progressPercent,
                };
              }
              return preset;
            });
            // Keep user's custom-added videos
            const customVideos = parsed.filter(
              (p: any) => !PRESET_YOUTUBE_VIDEOS.some((pr) => pr.id === p.id)
            );
            const nextVideos = [...upgradedVideos, ...customVideos];
            localStorage.setItem("xp_voca_my_videos", JSON.stringify(nextVideos));
            set({ savedVideos: nextVideos });
            return;
          }
        }
        // Save upgraded clean verified presets
        localStorage.setItem("xp_voca_my_videos", JSON.stringify(PRESET_YOUTUBE_VIDEOS));
        set({ savedVideos: PRESET_YOUTUBE_VIDEOS });
      } catch (e) {
        console.error("Error loading saved videos:", e);
      }
    }
  },

  addVideo: (video) => {
    const current = get().savedVideos;
    if (current.some((v) => v.id === video.id)) return;
    const next = [video, ...current];
    set({ savedVideos: next });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_my_videos", JSON.stringify(next));
    }
  },

  removeVideo: (id) => {
    const next = get().savedVideos.filter((v) => v.id !== id);
    set({ savedVideos: next });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_my_videos", JSON.stringify(next));
    }
  },

  toggleFavorite: (id) => {
    const next = get().savedVideos.map((v) =>
      v.id === id ? { ...v, isFavorite: !v.isFavorite } : v
    );
    set({ savedVideos: next });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_my_videos", JSON.stringify(next));
    }
  },

  updateProgress: (id, percent) => {
    const next = get().savedVideos.map((v) =>
      v.id === id ? { ...v, progressPercent: Math.min(100, Math.max(v.progressPercent, percent)) } : v
    );
    set({ savedVideos: next });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_my_videos", JSON.stringify(next));
    }
  },

  updateVideoSubtitles: (id, subtitles) => {
    const next = get().savedVideos.map((v) =>
      v.id === id ? { ...v, subtitles } : v
    );
    set({ savedVideos: next });
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_voca_my_videos", JSON.stringify(next));
    }
  },
}));

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.trim().match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function extractYouTubeStartTimestamp(url: string): number {
  if (!url) return 0;
  const match = url.match(/[?&](?:t|start)=([0-9hms]+)/i);
  if (!match || !match[1]) return 0;
  const val = match[1].toLowerCase();

  if (/^\d+$/.test(val)) return parseInt(val, 10);
  if (/^\d+s$/.test(val)) return parseInt(val.replace("s", ""), 10);

  let seconds = 0;
  const hMatch = val.match(/(\d+)h/);
  const mMatch = val.match(/(\d+)m/);
  const sMatch = val.match(/(\d+)s/);
  if (hMatch) seconds += parseInt(hMatch[1], 10) * 3600;
  if (mMatch) seconds += parseInt(mMatch[1], 10) * 60;
  if (sMatch) seconds += parseInt(sMatch[1], 10);
  return seconds;
}
