import { create } from "zustand";

export interface SubtitleSentence {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  textEn: string;
  textVn: string;
  dictationWord: string;
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

// Default preset YouTube English video lessons
export const PRESET_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "gN78u1P3j9Y",
    youtubeUrl: "https://www.youtube.com/watch?v=gN78u1P3j9Y",
    title: "How to Speak English Fluently & Confidently in 2025",
    authorName: "BBC Learning English",
    thumbnailUrl: "https://img.youtube.com/vi/gN78u1P3j9Y/hqdefault.jpg",
    duration: "04:15",
    category: "Communication",
    level: "Easy",
    savedAt: "2026-07-30",
    progressPercent: 45,
    isFavorite: true,
    subtitles: [
      {
        id: "s1",
        startTime: 0,
        endTime: 6,
        textEn: "Welcome to BBC Learning English! Today we explore practical tips to boost your fluency.",
        textVn: "Chào mừng bạn đến với BBC Learning English! Hôm nay chúng ta cùng khám phá các mẹo thực tế để tăng sự lưu loát.",
        dictationWord: "fluency",
      },
      {
        id: "s2",
        startTime: 7,
        endTime: 14,
        textEn: "Confidence comes from daily consistency and practicing active shadowing with native speakers.",
        textVn: "Sự tự tin đến từ sự kiên trì hàng ngày và luyện nhại giọng chủ động cùng người bản xứ.",
        dictationWord: "consistency",
      },
      {
        id: "s3",
        startTime: 15,
        endTime: 22,
        textEn: "Never fear making mistakes, because every error is a stepping stone to mastery.",
        textVn: "Đừng bao giờ sợ mắc lỗi, vì mỗi sai lầm đều là bước đệm tiến tới sự thành thạo.",
        dictationWord: "mastery",
      },
      {
        id: "s4",
        startTime: 23,
        endTime: 30,
        textEn: "Immerse yourself in English podcasts and daily interactive video dictation exercises.",
        textVn: "Hãy đắm mình trong các bài nghe podcast tiếng Anh và bài tập chép chính tả video hàng ngày.",
        dictationWord: "interactive",
      },
    ],
  },
  {
    id: "7X8II6J-6mU",
    youtubeUrl: "https://www.youtube.com/watch?v=7X8II6J-6mU",
    title: "The Power of Mindfulness in Daily Work Life",
    authorName: "TED Talks",
    thumbnailUrl: "https://img.youtube.com/vi/7X8II6J-6mU/hqdefault.jpg",
    duration: "05:30",
    category: "TED Talks",
    level: "Medium",
    savedAt: "2026-07-29",
    progressPercent: 80,
    isFavorite: false,
    subtitles: [
      {
        id: "t1",
        startTime: 0,
        endTime: 7,
        textEn: "Mindfulness is not about clearing your mind, but noticing where your focus goes.",
        textVn: "Chánh niệm không phải là làm rỗng tâm trí, mà là nhận biết nơi sự tập trung của bạn hướng tới.",
        dictationWord: "mindfulness",
      },
      {
        id: "t2",
        startTime: 8,
        endTime: 15,
        textEn: "When you cultivate deep focus, your productivity and peace of mind dramatically improve.",
        textVn: "Khi bạn rèn luyện sự tập trung sâu sắc, năng suất và sự bình an tâm trí sẽ tăng lên rõ rệt.",
        dictationWord: "productivity",
      },
      {
        id: "t3",
        startTime: 16,
        endTime: 24,
        textEn: "Embrace small moments of reflection during busy workdays to maintain emotional resilience.",
        textVn: "Hãy trân trọng những phút giây lắng đọng trong ngày làm việc bận rộn để duy trì sự kiên cường cảm xúc.",
        dictationWord: "resilience",
      },
    ],
  },
  {
    id: "2Vv-BfVoq4g",
    youtubeUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    title: "Business English: Professional Email Writing Secrets",
    authorName: "Business English Pod",
    thumbnailUrl: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    duration: "06:10",
    category: "Business",
    level: "Hard",
    savedAt: "2026-07-28",
    progressPercent: 20,
    isFavorite: true,
    subtitles: [
      {
        id: "b1",
        startTime: 0,
        endTime: 8,
        textEn: "Writing professional emails requires clarity, concise vocabulary, and an appropriate tone.",
        textVn: "Viết email chuyên nghiệp đòi hỏi sự rõ ràng, từ vựng cô đọng và văn phong phù hợp.",
        dictationWord: "concise",
      },
      {
        id: "b2",
        startTime: 9,
        endTime: 16,
        textEn: "Always end your proposal with a clear call to action to accelerate decision making.",
        textVn: "Luôn kết thúc đề xuất của bạn bằng lời kêu gọi hành động rõ ràng để đẩy nhanh quyết định.",
        dictationWord: "accelerate",
      },
    ],
  },
];

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
            set({ savedVideos: parsed });
          }
        }
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
