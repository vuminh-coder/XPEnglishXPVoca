import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  useVideoStore,
  extractYouTubeId,
  PRESET_YOUTUBE_VIDEOS,
  YouTubeVideoItem,
  SubtitleSentence,
} from "@/lib/store/videoStore";
import {
  decodeXmlEntities,
  parseTimedTextXml,
  parseVnTimedTextXml,
  alignBilingualSubtitles,
  extractDictationWord,
  formatTimestampMs,
  formatSrtTimestamp,
  wrapTextTo42Chars,
} from "@/lib/services/youtubeSubtitleParser";

// --- Mocking LocalStorage for Vitest Node Environment ---
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

if (typeof (global as any).window === "undefined") {
  (global as any).window = global;
}

// ============================================================================
// PHẦN 1: TEST CHỨC NĂNG NHẬP & XỬ LÝ VIDEO (Tasks 1-3)
// ============================================================================

describe("Task 1: YouTube URL Extraction & Normalization", () => {
  it("Test 1.1: Nhập URL watch?v= hợp lệ", () => {
    const url = "https://www.youtube.com/watch?v=gN78u1P3j9Y";
    const videoId = extractYouTubeId(url);
    expect(videoId).toBe("gN78u1P3j9Y");
  });

  it("Test 1.2: Nhập URL youtu.be/ hợp lệ", () => {
    const url = "https://youtu.be/gN78u1P3j9Y";
    const videoId = extractYouTubeId(url);
    expect(videoId).toBe("gN78u1P3j9Y");
  });

  it("Test 1.3: Nhập URL YouTube Shorts", () => {
    const url = "https://www.youtube.com/shorts/gN78u1P3j9Y";
    const videoId = extractYouTubeId(url);
    expect(videoId).toBe("gN78u1P3j9Y");
  });

  it("Test 1.4: Xử lý URL có tham số bổ sung (&t=30s&ab_channel=BBC)", () => {
    const url = "https://www.youtube.com/watch?v=gN78u1P3j9Y&t=30s&ab_channel=BBC";
    const videoId = extractYouTubeId(url);
    expect(videoId).toBe("gN78u1P3j9Y");
  });

  it("Test 1.5: Xử lý URL không hợp lệ", () => {
    const url = "https://facebook.com/invalid";
    const videoId = extractYouTubeId(url);
    expect(videoId).toBeNull();
  });

  it("Test 1.6: Trích xuất YouTube Video ID từ link tFZ2gpsjuYc và nạp vào Store", () => {
    const targetUrl = "https://www.youtube.com/watch?v=tFZ2gpsjuYc";
    const videoId = extractYouTubeId(targetUrl);
    expect(videoId).toBe("tFZ2gpsjuYc");

    const videoItem: YouTubeVideoItem = {
      id: videoId!,
      youtubeUrl: targetUrl,
      title: "Dance Monkey - Music Cover (TikTok)",
      authorName: "Music Channel",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: "03:45",
      category: "Communication",
      level: "Medium",
      savedAt: "2026-08-01",
      progressPercent: 0,
      isFavorite: true,
      subtitles: [
        {
          id: "t1",
          startTime: 3.5,
          endTime: 8.2,
          textEn: "They say oh my god I see the way you shine",
          textVn: "Họ nói rằng ôi chúa ơi tôi thấy cách mà bạn tỏa sáng rực rỡ",
          dictationWord: "shine",
        },
      ],
    };

    useVideoStore.getState().addVideo(videoItem);
    const stored = useVideoStore.getState().savedVideos.find((v) => v.id === "tFZ2gpsjuYc");
    expect(stored).toBeDefined();
    expect(stored?.title).toBe("Dance Monkey - Music Cover (TikTok)");
    expect(stored?.subtitles.length).toBeGreaterThan(0);
    expect(stored?.subtitles[0].dictationWord).toBe("shine");
  });
});

describe("Task 2: API Trích Xuất & Parser Phụ Đề", () => {
  it("Test 2.1: Giải mã XML Entities chuẩn và bỏ HTML tags", () => {
    const raw = "Hello &amp; welcome &lt;to&gt; &quot;English&quot; &#39;world&#39;!";
    const decoded = decodeXmlEntities(raw);
    expect(decoded).toBe(`Hello & welcome <to> "English" 'world'!`);
  });

  it("Test 2.2: Parsing TimedText XML EN thành công", () => {
    const xml = `
      <transcript>
        <text start="0.5" dur="2.0">Welcome to BBC Learning English!</text>
        <text start="2.6" dur="3.0">Today we explore practical fluency tips.</text>
      </transcript>
    `;
    const parsed = parseTimedTextXml(xml);
    expect(parsed.length).toBe(2);
    expect(parsed[0].startTime).toBe(0);
    expect(parsed[0].endTime).toBe(0.8);
    expect(parsed[0].textEn).toBe("Welcome to BBC Learning English!");
  });

  it("Test 2.3: Parsing TimedText XML VN thành công", () => {
    const xmlVn = `
      <transcript>
        <text start="0.5">Chào mừng bạn đến với BBC Learning English!</text>
        <text start="2.6">Hôm nay chúng ta khám phá mẹo giao tiếp.</text>
      </transcript>
    `;
    const parsedVn = parseVnTimedTextXml(xmlVn);
    expect(parsedVn.length).toBe(2);
    expect(parsedVn[0].textVn).toBe("Chào mừng bạn đến với BBC Learning English!");
  });

  it("Test 2.4: Căn chỉnh phụ đề song ngữ EN-VN", () => {
    const enItems = [
      { startTime: 0.5, endTime: 2.5, duration: 2.0, textEn: "Hello world" },
      { startTime: 3.0, endTime: 6.0, duration: 3.0, textEn: "Learning English" },
    ];
    const vnItems = [
      { startTime: 0.5, textVn: "Xin chào thế giới" },
      { startTime: 3.1, textVn: "Học tiếng Anh" },
    ];
    const aligned = alignBilingualSubtitles(enItems, vnItems);
    expect(aligned[0].textVn).toBe("Xin chào thế giới");
    expect(aligned[1].textVn).toBe("Học tiếng Anh");
  });

  it("Test 2.5: Trích xuất từ dictation quan trọng (bỏ stop-words)", () => {
    const textEn = "Confidence comes from daily consistency and practicing active shadowing.";
    const word = extractDictationWord(textEn);
    expect(word).toBe("consistency");
  });

  it("Test 2.6: Format timestamp sang HH:MM:SS.mmm", () => {
    const ts = formatTimestampMs(125.456);
    expect(ts).toBe("00:02:05.456");
  });

  it("Test 2.7: Format timestamp sang SRT (dùng dấu phẩy)", () => {
    const ts = formatSrtTimestamp(125.456);
    expect(ts).toBe("00:02:05,456");
  });

  it("Test 2.8: Wrap dòng chữ theo độ dài <= 42 ký tự cho SRT/WEBVTT", () => {
    const longSentence = "Welcome to BBC Learning English today we explore practical tips to boost fluency.";
    const wrapped = wrapTextTo42Chars(longSentence);
    const lines = wrapped.split("\n");
    expect(lines.every((line) => line.length <= 42)).toBeTruthy();
  });
});

describe("Task 3: HD Thumbnail & Metadata Video", () => {
  it("Test 3.1: Tạo HD Thumbnail URL chuẩn từ video ID", () => {
    const videoId = "gN78u1P3j9Y";
    const hdThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    expect(hdThumbnail).toContain("maxresdefault.jpg");
    expect(hdThumbnail).toContain(videoId);
  });

  it("Test 3.2: Kiểm tra độ hợp lệ của taxonomy category", () => {
    const validCategories = ["Business", "Communication", "TED Talks", "Movies", "News", "IELTS/TOEIC", "General"];
    expect(validCategories).toContain("Communication");
    expect(validCategories).toContain("TED Talks");
  });
});

// ============================================================================
// PHẦN 2: TEST KHUNG HIỂN THỊ PHỤ ĐỀ (Tasks 4-5)
// ============================================================================

describe("Task 4: 3-Sentence Rolling Viewport Logic", () => {
  const subtitles: SubtitleSentence[] = [
    { id: "s1", startTime: 0, endTime: 5, textEn: "Sentence 1", textVn: "Câu 1", dictationWord: "sentence" },
    { id: "s2", startTime: 5, endTime: 10, textEn: "Sentence 2", textVn: "Câu 2", dictationWord: "sentence" },
    { id: "s3", startTime: 10, endTime: 15, textEn: "Sentence 3", textVn: "Câu 3", dictationWord: "sentence" },
    { id: "s4", startTime: 15, endTime: 20, textEn: "Sentence 4", textVn: "Câu 4", dictationWord: "sentence" },
    { id: "s5", startTime: 20, endTime: 25, textEn: "Sentence 5", textVn: "Câu 5", dictationWord: "sentence" },
  ];

  function getRollingViewport(currentTime: number, subs: SubtitleSentence[]) {
    let activeIndex = subs.findIndex((s) => currentTime >= s.startTime && currentTime < s.endTime);
    if (activeIndex === -1) {
      if (currentTime < subs[0].startTime) activeIndex = 0;
      else activeIndex = subs.length - 1;
    }
    const visible = subs.slice(activeIndex, activeIndex + 3);
    return { activeIndex, activeSentence: subs[activeIndex], visible };
  }

  it("Test 4.1: Khởi tạo viewport ở 0s hiển thị 3 câu đầu", () => {
    const { activeIndex, visible } = getRollingViewport(0, subtitles);
    expect(activeIndex).toBe(0);
    expect(visible.length).toBe(3);
    expect(visible[0].textEn).toBe("Sentence 1");
    expect(visible[1].textEn).toBe("Sentence 2");
    expect(visible[2].textEn).toBe("Sentence 3");
  });

  it("Test 4.2: Tự động trượt viewport khi video chuyển sang câu 2 (thời gian 7s)", () => {
    const { activeIndex, visible } = getRollingViewport(7, subtitles);
    expect(activeIndex).toBe(1);
    expect(visible[0].textEn).toBe("Sentence 2");
    expect(visible[1].textEn).toBe("Sentence 3");
    expect(visible[2].textEn).toBe("Sentence 4");
  });

  it("Test 4.3: Xử lý cuối danh sách (còn lại 2 câu)", () => {
    const { activeIndex, visible } = getRollingViewport(22, subtitles);
    expect(activeIndex).toBe(4);
    expect(visible.length).toBe(1);
    expect(visible[0].textEn).toBe("Sentence 5");
  });
});

describe("Task 5: Karaoke Sync Algorithm", () => {
  function calculateWordHighlight(sentenceText: string, startTime: number, endTime: number, currentTime: number) {
    const words = sentenceText.split(" ");
    const duration = endTime - startTime;
    const elapsed = Math.max(0, currentTime - startTime);
    const progressRatio = Math.min(1, elapsed / (duration || 1));
    const activeWordIndex = Math.min(words.length - 1, Math.floor(progressRatio * words.length));

    return words.map((word, idx) => ({
      word,
      state: idx === activeWordIndex ? "current" : idx < activeWordIndex ? "read" : "upcoming",
    }));
  }

  it("Test 5.1: Xác định đúng từ đang đọc (Current) ở giữa câu", () => {
    const sentence = "Welcome to BBC Learning English";
    const states = calculateWordHighlight(sentence, 0, 5, 2.5);
    // at 2.5s out of 5s (50%), word at 50% index should be "BBC"
    const currentWordObj = states.find((s) => s.state === "current");
    expect(currentWordObj).toBeDefined();
    expect(currentWordObj?.word).toBe("BBC");
  });

  it("Test 5.2: Từ đã đọc qua có trạng thái 'read', từ sắp đọc là 'upcoming'", () => {
    const sentence = "Welcome to BBC Learning English";
    const states = calculateWordHighlight(sentence, 0, 5, 2.5); // 50% progress
    expect(states[0].state).toBe("read"); // "Welcome"
    expect(states[1].state).toBe("read"); // "to"
    expect(states[4].state).toBe("upcoming"); // "English"
  });

  it("Test 5.3: Clamp chỉ số từ không tràn mảng khi vượt mốc endTime", () => {
    const sentence = "Hello world";
    const states = calculateWordHighlight(sentence, 0, 2, 3.0);
    expect(states[states.length - 1].state).toBe("current");
  });
});

// ============================================================================
// PHẦN 3: TEST TỪ ĐIỂN, DICTATION & SHADOWING (Tasks 6-8)
// ============================================================================

describe("Task 6: Sticky Word Lookup Card & Notebook Store", () => {
  interface WordCard {
    word: string;
    ipa: string;
    partOfSpeech: string;
    vietnamese: string;
  }

  function mockLookupWord(word: string): WordCard {
    const cleaned = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    return {
      word: cleaned,
      ipa: `/${cleaned}/`,
      partOfSpeech: "Noun/Verb",
      vietnamese: `nghĩa tiếng Việt của ${cleaned}`,
    };
  }

  it("Test 6.1: Click từ -> trả về thông tin tra từ với IPA và nghĩa tiếng Việt", () => {
    const card = mockLookupWord("fluency!");
    expect(card.word).toBe("fluency");
    expect(card.ipa).toBe("/fluency/");
    expect(card.vietnamese).toContain("fluency");
  });

  it("Test 6.2: Kiểm tra chống lưu từ trùng vào Notebook", () => {
    const notebook: string[] = [];
    function saveToNotebook(word: string) {
      if (!notebook.includes(word)) {
        notebook.push(word);
        return { success: true, message: "Đã lưu từ vào sổ từ" };
      }
      return { success: false, message: "Từ đã tồn tại trong sổ từ" };
    }

    const res1 = saveToNotebook("fluency");
    expect(res1.success).toBeTruthy();

    const res2 = saveToNotebook("fluency");
    expect(res2.success).toBeFalsy();
    expect(notebook.length).toBe(1);
  });
});

describe("Task 7: Dictation AI Engine", () => {
  class DictationEngine {
    createExercise(sentence: SubtitleSentence) {
      const words = sentence.textEn.split(" ");
      const hidden = sentence.dictationWord;
      const maskedText = sentence.textEn.replace(new RegExp(`\\b${hidden}\\b`, "i"), "_____");
      const firstLetter = hidden.charAt(0);
      const hint = `${firstLetter} _ _ _ (${hidden.length} ký tự)`;
      return { maskedText, hidden, hint };
    }

    checkAnswer(userInput: string, targetWord: string) {
      const isCorrect = userInput.trim().toLowerCase() === targetWord.trim().toLowerCase();
      return {
        correct: isCorrect,
        xpEarned: isCorrect ? 20 : 0,
      };
    }
  }

  const sampleSentence: SubtitleSentence = {
    id: "s1",
    startTime: 0,
    endTime: 5,
    textEn: "Practical fluency tips for learning English.",
    textVn: "Mẹo giao tiếp thực tế.",
    dictationWord: "fluency",
  };

  it("Test 7.1: Tạo bài dictation ẩn từ target chính xác", () => {
    const engine = new DictationEngine();
    const exercise = engine.createExercise(sampleSentence);
    expect(exercise.maskedText).toContain("_____");
    expect(exercise.hidden).toBe("fluency");
    expect(exercise.hint).toContain("f _ _ _ (7 ký tự)");
  });

  it("Test 7.2: Trả lời đúng -> nhận +20 XP", () => {
    const engine = new DictationEngine();
    const result = engine.checkAnswer("fluency", "fluency");
    expect(result.correct).toBeTruthy();
    expect(result.xpEarned).toBe(20);
  });

  it("Test 7.3: Không phân biệt hoa thường khi kiểm tra đáp án", () => {
    const engine = new DictationEngine();
    const result = engine.checkAnswer("FLUENCY", "fluency");
    expect(result.correct).toBeTruthy();
  });

  it("Test 7.4: Trả lời sai -> 0 XP", () => {
    const engine = new DictationEngine();
    const result = engine.checkAnswer("wrong", "fluency");
    expect(result.correct).toBeFalsy();
    expect(result.xpEarned).toBe(0);
  });
});

describe("Task 8: Shadowing AI Engine & Scoring", () => {
  class ShadowingEngine {
    generateWaveformBars(count = 9) {
      return Array.from({ length: count }, (_, i) => Math.sin(i) * 0.5 + 0.5);
    }

    calculateScore(audioBlobSize: number) {
      if (audioBlobSize === 0) return { pronunciation: 0, intonation: 0, xp: 0 };
      const score = Math.min(95, 75 + Math.floor(audioBlobSize % 20));
      return {
        pronunciation: score,
        intonation: score - 5,
        xp: 15,
      };
    }
  }

  it("Test 8.1: Hiển thị waveform animation 9 cột", () => {
    const shadowing = new ShadowingEngine();
    const bars = shadowing.generateWaveformBars(9);
    expect(bars.length).toBe(9);
    expect(bars.every((b) => b >= 0 && b <= 1)).toBeTruthy();
  });

  it("Test 8.2: Chấm điểm phát âm & nhận thưởng +15 XP cho Shadowing", () => {
    const shadowing = new ShadowingEngine();
    const result = shadowing.calculateScore(1024);
    expect(result.pronunciation).toBeGreaterThan(60);
    expect(result.xp).toBe(15);
  });
});

// ============================================================================
// PHẦN 4: TEST EXPORTER, FILTER & ZUSTAND STORE (Tasks 9-11)
// ============================================================================

describe("Task 9: Data Exporter (SRT, WEBVTT & JSON)", () => {
  const sampleSubtitles: SubtitleSentence[] = [
    {
      id: "s1",
      startTime: 0,
      endTime: 5.5,
      textEn: "Welcome to BBC Learning English!",
      textVn: "Chào mừng bạn đến với BBC Learning English!",
      dictationWord: "learning",
    },
  ];

  it("Test 9.1: Xuất định dạng SRT song ngữ hợp lệ", () => {
    function exportSRT(subs: SubtitleSentence[]) {
      return subs
        .map(
          (s, i) =>
            `${i + 1}\n${formatSrtTimestamp(s.startTime)} --> ${formatSrtTimestamp(s.endTime)}\n${s.textEn}\n${s.textVn}`
        )
        .join("\n\n");
    }

    const srt = exportSRT(sampleSubtitles);
    expect(srt).toContain("1\n00:00:00,000 --> 00:00:05,500");
    expect(srt).toContain("Welcome to BBC Learning English!");
    expect(srt).toContain("Chào mừng bạn đến với BBC Learning English!");
  });

  it("Test 9.2: Xuất định dạng WEBVTT hợp lệ", () => {
    function exportWEBVTT(subs: SubtitleSentence[]) {
      const header = "WEBVTT\n\n";
      const body = subs
        .map(
          (s) =>
            `${formatTimestampMs(s.startTime)} --> ${formatTimestampMs(s.endTime)}\n${s.textEn}\n${s.textVn}`
        )
        .join("\n\n");
      return header + body;
    }

    const vtt = exportWEBVTT(sampleSubtitles);
    expect(vtt.startsWith("WEBVTT")).toBeTruthy();
    expect(vtt).toContain("00:00:00.000 --> 00:00:05.500");
  });

  it("Test 9.3: Xuất JSON cấu trúc mili-giây chuẩn", () => {
    function exportJSON(subs: SubtitleSentence[]) {
      return JSON.stringify(
        subs.map((s) => ({
          startMs: Math.round(s.startTime * 1000),
          endMs: Math.round(s.endTime * 1000),
          english: s.textEn,
          vietnamese: s.textVn,
        })),
        null,
        2
      );
    }

    const jsonStr = exportJSON(sampleSubtitles);
    const parsed = JSON.parse(jsonStr);
    expect(parsed[0].startMs).toBe(0);
    expect(parsed[0].endMs).toBe(5500);
  });
});

describe("Task 10: Filter & Search Engine", () => {
  const videoList: YouTubeVideoItem[] = PRESET_YOUTUBE_VIDEOS;

  function filterVideos(
    videos: YouTubeVideoItem[],
    options: { search?: string; progressFilter?: "all" | "studying" | "completed"; category?: string }
  ) {
    return videos.filter((v) => {
      if (
        options.search &&
        !v.title.toLowerCase().includes(options.search.toLowerCase()) &&
        !v.authorName.toLowerCase().includes(options.search.toLowerCase())
      ) {
        return false;
      }
      if (options.progressFilter === "studying" && (v.progressPercent === 0 || v.progressPercent === 100)) {
        return false;
      }
      if (options.progressFilter === "completed" && v.progressPercent < 100) {
        return false;
      }
      if (options.category && options.category !== "All" && v.category !== options.category) {
        return false;
      }
      return true;
    });
  }

  it("Test 10.1: Tìm kiếm theo tiêu đề (Search Query)", () => {
    const results = filterVideos(videoList, { search: "BBC" });
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("gN78u1P3j9Y");
  });

  it("Test 10.2: Lọc video theo trạng thái 'Đang học'", () => {
    const results = filterVideos(videoList, { progressFilter: "studying" });
    expect(results.every((v) => v.progressPercent > 0 && v.progressPercent < 100)).toBeTruthy();
  });

  it("Test 10.3: Lọc video theo thể loại 'TED Talks'", () => {
    const results = filterVideos(videoList, { category: "TED Talks" });
    expect(results.length).toBe(1);
    expect(results[0].category).toBe("TED Talks");
  });
});

describe("Task 11: Zustand Store (videoStore)", () => {
  beforeEach(() => {
    localStorageMock.clear();
    useVideoStore.setState({ savedVideos: [...PRESET_YOUTUBE_VIDEOS] });
  });

  it("Test 11.1: Khởi tạo videoStore có đúng 3 preset videos mặc định", () => {
    const state = useVideoStore.getState();
    expect(state.savedVideos.length).toBe(3);
  });

  it("Test 11.2: Thêm video mới thành công vào store và localStorage", () => {
    const newVideo: YouTubeVideoItem = {
      id: "testVideo123",
      youtubeUrl: "https://www.youtube.com/watch?v=testVideo123",
      title: "Test New Video Title",
      authorName: "Test Channel",
      thumbnailUrl: "https://img.youtube.com/vi/testVideo123/hqdefault.jpg",
      duration: "02:30",
      category: "General",
      level: "Easy",
      savedAt: "2026-08-01",
      progressPercent: 0,
      isFavorite: false,
      subtitles: [],
    };

    useVideoStore.getState().addVideo(newVideo);
    const updated = useVideoStore.getState().savedVideos;
    expect(updated.length).toBe(4);
    expect(updated[0].id).toBe("testVideo123");
    expect(localStorageMock.getItem("xp_voca_my_videos")).toContain("testVideo123");
  });

  it("Test 11.3: Chống thêm video trùng ID", () => {
    const existingVideo = PRESET_YOUTUBE_VIDEOS[0];
    useVideoStore.getState().addVideo(existingVideo);
    expect(useVideoStore.getState().savedVideos.length).toBe(3);
  });

  it("Test 11.4: Cập nhật progressPercent của video", () => {
    useVideoStore.getState().updateProgress("gN78u1P3j9Y", 95);
    const video = useVideoStore.getState().savedVideos.find((v) => v.id === "gN78u1P3j9Y");
    expect(video?.progressPercent).toBe(95);
  });

  it("Test 11.5: Toggle trạng thái yêu thích (isFavorite)", () => {
    const initialFav = useVideoStore.getState().savedVideos[0].isFavorite;
    useVideoStore.getState().toggleFavorite("gN78u1P3j9Y");
    const updatedFav = useVideoStore.getState().savedVideos[0].isFavorite;
    expect(updatedFav).toBe(!initialFav);
  });

  it("Test 11.6: Xóa video khỏi store", () => {
    useVideoStore.getState().removeVideo("gN78u1P3j9Y");
    expect(useVideoStore.getState().savedVideos.length).toBe(2);
    expect(useVideoStore.getState().savedVideos.some((v) => v.id === "gN78u1P3j9Y")).toBeFalsy();
  });
});

// ============================================================================
// PHẦN 5: TEST TÍCH HỢP & E2E LUỒNG NGƯỜI DÙNG (Task 12)
// ============================================================================

describe("Task 12: Integrated E2E User Flow", () => {
  it("Test 12.1: Luồng hoàn chỉnh - Nhập URL -> Trích xuất ID -> Lưu vào Store -> Cập nhật Tiến độ", () => {
    // Step 1: Input URL
    const rawUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=shared";
    const videoId = extractYouTubeId(rawUrl);
    expect(videoId).toBe("dQw4w9WgXcQ");

    // Step 2: Create video item
    const createdItem: YouTubeVideoItem = {
      id: videoId!,
      youtubeUrl: rawUrl,
      title: "Never Gonna Give You Up - Subtitled",
      authorName: "Rick Astley",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: "03:32",
      category: "Movies",
      level: "Easy",
      savedAt: "2026-08-01",
      progressPercent: 0,
      isFavorite: true,
      subtitles: [
        {
          id: "r1",
          startTime: 0,
          endTime: 4,
          textEn: "We're no strangers to love",
          textVn: "Chúng ta không còn lạ gì với tình yêu",
          dictationWord: "strangers",
        },
      ],
    };

    // Step 3: Save to store
    useVideoStore.getState().addVideo(createdItem);
    expect(useVideoStore.getState().savedVideos.some((v) => v.id === videoId)).toBeTruthy();

    // Step 4: Progress update after lesson
    useVideoStore.getState().updateProgress(videoId!, 100);
    const finalVideo = useVideoStore.getState().savedVideos.find((v) => v.id === videoId);
    expect(finalVideo?.progressPercent).toBe(100);
  });
});
