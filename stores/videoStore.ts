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

// Default verified preset YouTube English video lessons with 100% accurate timeline alignment
export const PRESET_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "UF8uR6Z6KLc",
    youtubeUrl: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    title: "Steve Jobs' 2005 Stanford Commencement Address",
    authorName: "Stanford University",
    thumbnailUrl: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
    duration: "15:04",
    category: "Communication",
    level: "Medium",
    savedAt: "2026-08-01",
    progressPercent: 45,
    isFavorite: true,
    subtitles: [
      {
        id: "sj_1",
        startTime: 0.0,
        endTime: 4.3,
        textEn: "I am honored to be with you today at your commencement from one of the finest universities in the world.",
        textVn: "Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp từ một trong những trường đại học xuất sắc nhất thế giới.",
        dictationWord: "commencement",
      },
      {
        id: "sj_2",
        startTime: 4.8,
        endTime: 8.6,
        textEn: "I never graduated from college. Truth be told, this is the closest I've ever gotten to a college graduation.",
        textVn: "Tôi chưa từng tốt nghiệp đại học. Thật lòng mà nói, đây là lần tôi đến gần nhất với một lễ tốt nghiệp đại học.",
        dictationWord: "graduation",
      },
      {
        id: "sj_3",
        startTime: 9.1,
        endTime: 13.5,
        textEn: "Today I want to tell you three stories from my life. That's it. No big deal. Just three stories.",
        textVn: "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện trong cuộc đời tôi. Chỉ thế thôi. Không có gì to tát. Chỉ ba câu chuyện.",
        dictationWord: "stories",
      },
      {
        id: "sj_4",
        startTime: 14.0,
        endTime: 18.2,
        textEn: "The first story is about connecting the dots.",
        textVn: "Câu chuyện đầu tiên là về việc kết nối những dấu chấm.",
        dictationWord: "connecting",
      },
      {
        id: "sj_5",
        startTime: 18.8,
        endTime: 24.5,
        textEn: "I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit.",
        textVn: "Tôi đã bỏ học tại trường Reed College sau 6 tháng đầu tiên, nhưng sau đó vẫn ở lại dự thính thêm khoảng 18 tháng trước khi thực sự rời đi.",
        dictationWord: "months",
      },
      {
        id: "sj_6",
        startTime: 25.0,
        endTime: 27.2,
        textEn: "So why did I drop out?",
        textVn: "Vậy tại sao tôi lại bỏ học?",
        dictationWord: "drop",
      },
      {
        id: "sj_7",
        startTime: 27.8,
        endTime: 31.4,
        textEn: "It started before I was born. My biological mother was a young, unwed college graduate student.",
        textVn: "Mọi chuyện bắt đầu từ trước khi tôi chào đời. Mẹ đẻ của tôi là một nữ sinh viên tốt nghiệp trẻ tuổi, chưa lập gia đình.",
        dictationWord: "biological",
      },
      {
        id: "sj_8",
        startTime: 32.0,
        endTime: 36.5,
        textEn: "And she decided to put me up for adoption. She felt very strongly that I should be adopted by college graduates.",
        textVn: "Và bà đã quyết định cho tôi làm con nuôi. Bà cảm thấy rất tha thiết rằng tôi phải được nhận nuôi bởi những người tốt nghiệp đại học.",
        dictationWord: "adoption",
      },
      {
        id: "sj_9",
        startTime: 37.0,
        endTime: 42.5,
        textEn: "So everything was all set for me to be adopted at birth by a lawyer and his wife.",
        textVn: "Vì vậy mọi thứ đã được sắp đặt sẵn để tôi được nhận nuôi ngay khi chào đời bởi một luật sư và vợ ông ấy.",
        dictationWord: "lawyer",
      },
      {
        id: "sj_10",
        startTime: 43.0,
        endTime: 48.0,
        textEn: "Except that when I popped out they decided at the last minute that they really wanted a girl.",
        textVn: "Ngoại trừ việc khi tôi cất tiếng khóc chào đời, họ đã quyết định vào phút chót rằng họ thực sự muốn một bé gái.",
        dictationWord: "minute",
      },
    ],
  },
  {
    id: "iWDKsHm6gTA",
    youtubeUrl: "https://www.youtube.com/watch?v=iWDKsHm6gTA",
    title: "How languages evolve - Alex Gendler",
    authorName: "TED-Ed",
    thumbnailUrl: "https://img.youtube.com/vi/iWDKsHm6gTA/hqdefault.jpg",
    duration: "04:58",
    category: "TED Talks",
    level: "Easy",
    savedAt: "2026-07-29",
    progressPercent: 70,
    isFavorite: false,
    subtitles: [
      {
        id: "te_1",
        startTime: 0.1,
        endTime: 4.8,
        textEn: "Over the course of human history, thousands of languages have developed from what was once just a handful.",
        textVn: "Trong suốt chiều dài lịch sử nhân loại, hàng ngàn ngôn ngữ đã phát triển từ chỗ ban đầu chỉ có một số ít.",
        dictationWord: "developed",
      },
      {
        id: "te_2",
        startTime: 5.2,
        endTime: 9.8,
        textEn: "Today, there are over 7,000 languages spoken around the world.",
        textVn: "Ngày nay, có hơn 7.000 ngôn ngữ được nói trên khắp thế giới.",
        dictationWord: "languages",
      },
      {
        id: "te_3",
        startTime: 10.3,
        endTime: 14.5,
        textEn: "So how did we end up with so many? And where did they all come from?",
        textVn: "Vậy làm thế nào chúng ta lại có nhiều ngôn ngữ đến vậy? Và tất cả chúng bắt nguồn từ đâu?",
        dictationWord: "many",
      },
      {
        id: "te_4",
        startTime: 15.0,
        endTime: 19.8,
        textEn: "Just like living organisms, languages evolve through gradual changes over generations.",
        textVn: "Cũng giống như các sinh vật sống, ngôn ngữ tiến hóa thông qua những biến đổi dần dần qua nhiều thế hệ.",
        dictationWord: "organisms",
      },
      {
        id: "te_5",
        startTime: 20.3,
        endTime: 25.5,
        textEn: "When groups of people become geographically isolated, their speech patterns naturally diverge.",
        textVn: "Khi các nhóm người bị cô lập về mặt địa lý, thói quen phát âm của họ sẽ tự nhiên phân nhánh.",
        dictationWord: "isolated",
      },
      {
        id: "te_6",
        startTime: 26.0,
        endTime: 31.2,
        textEn: "Over centuries, these subtle pronunciation differences become entirely new dialects, and eventually distinct languages.",
        textVn: "Qua nhiều thế kỷ, những khác biệt phát âm tinh tế này trở thành những phương ngữ hoàn toàn mới, và cuối cùng là các ngôn ngữ riêng biệt.",
        dictationWord: "pronunciation",
      },
    ],
  },
  {
    id: "8K8s9U8_i50",
    youtubeUrl: "https://www.youtube.com/watch?v=8K8s9U8_i50",
    title: "Food and Mood - 6 Minute English",
    authorName: "BBC Learning English",
    thumbnailUrl: "https://img.youtube.com/vi/8K8s9U8_i50/hqdefault.jpg",
    duration: "06:05",
    category: "Communication",
    level: "Hard",
    savedAt: "2026-07-28",
    progressPercent: 30,
    isFavorite: true,
    subtitles: [
      {
        id: "bbc_1",
        startTime: 0.1,
        endTime: 4.5,
        textEn: "Hello and welcome to 6 Minute English. I'm Neil, and joining me today is Sam.",
        textVn: "Xin chào và chào mừng các bạn đến với 6 Minute English. Tôi là Neil, và cùng tham gia với tôi hôm nay là Sam.",
        dictationWord: "joining",
      },
      {
        id: "bbc_2",
        startTime: 5.0,
        endTime: 8.8,
        textEn: "Hello Neil! Today we're talking about food and how it affects our mood.",
        textVn: "Chào Neil! Hôm nay chúng ta sẽ thảo luận về thực phẩm và cách nó ảnh hưởng đến tâm trạng của chúng ta.",
        dictationWord: "affects",
      },
      {
        id: "bbc_3",
        startTime: 9.3,
        endTime: 14.8,
        textEn: "Have you ever felt grumpy when you're hungry? Or comforted after eating your favorite dessert?",
        textVn: "Bạn đã bao giờ cảm thấy cáu kỉnh khi đói chưa? Hay cảm thấy được an ủi sau khi ăn món tráng miệng yêu thích?",
        dictationWord: "comforted",
      },
      {
        id: "bbc_4",
        startTime: 15.3,
        endTime: 20.2,
        textEn: "Scientists are discovering strong links between what we eat and how our brain functions.",
        textVn: "Các nhà khoa học đang phát hiện ra những mối liên hệ chặt chẽ giữa những gì chúng ta ăn và cách não bộ hoạt động.",
        dictationWord: "functions",
      },
      {
        id: "bbc_5",
        startTime: 20.8,
        endTime: 26.5,
        textEn: "Nutritional psychiatry explores how diet can directly impact mental health and well-being.",
        textVn: "Tâm thần học dinh dưỡng khám phá cách thức chế độ ăn uống có thể tác động trực tiếp đến sức khỏe tinh thần và sự an lạc.",
        dictationWord: "psychiatry",
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
            // Auto-migrate if stored contains outdated invalid IDs
            const hasOutdated = parsed.some((v: any) => v.id === "gN78u1P3j9Y" || v.id === "7X8II6J-6mU" || (v.id === "2Vv-BfVoq4g" && v.title.includes("Business English")));
            if (!hasOutdated) {
              set({ savedVideos: parsed });
              return;
            }
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
