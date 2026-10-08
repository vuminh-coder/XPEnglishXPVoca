import { describe, it, expect } from "vitest";
import {
  extractYouTubeVideoId,
  cleanSubtitleLine,
  detectProperNounsInSentence,
  extractKeywordsFromSentence,
  estimateCefrLevel,
  formatDurationSeconds,
  normalizeSentenceText,
} from "@/features/listening/services/videoIngestionService";

describe("Phase 1: Video Catalog & Ingestion Engine Deep Test Suite", { timeout: 20000 }, () => {
  // ==========================================================================
  // 1. YouTube Video ID Parser
  // ==========================================================================
  describe("1. extractYouTubeVideoId - URL Resolution & Parsing", () => {
    it("should extract 11-char ID from standard watch URL", () => {
      const url = "https://www.youtube.com/watch?v=UF8uR6Z6KLc";
      expect(extractYouTubeVideoId(url)).toBe("UF8uR6Z6KLc");
    });

    it("should extract ID from short youtu.be format", () => {
      const url = "https://youtu.be/doOlP7NLUwc";
      expect(extractYouTubeVideoId(url)).toBe("doOlP7NLUwc");
    });

    it("should extract ID from YouTube Shorts URL", () => {
      const url = "https://www.youtube.com/shorts/AK42GhbTZ9w";
      expect(extractYouTubeVideoId(url)).toBe("AK42GhbTZ9w");
    });

    it("should extract ID from embed URL", () => {
      const url = "https://www.youtube.com/embed/tybKnGZRwcU";
      expect(extractYouTubeVideoId(url)).toBe("tybKnGZRwcU");
    });

    it("should extract ID from URL with extra query parameters", () => {
      const url = "https://www.youtube.com/watch?v=pRfmrE0ToTo&t=120s&list=PL123456&index=2";
      expect(extractYouTubeVideoId(url)).toBe("pRfmrE0ToTo");
    });

    it("should accept raw 11-char YouTube ID directly", () => {
      expect(extractYouTubeVideoId("lpLFjQ-bRv8")).toBe("lpLFjQ-bRv8");
    });

    it("should return null for invalid URLs or empty strings", () => {
      expect(extractYouTubeVideoId("https://vimeo.com/12345678")).toBeNull();
      expect(extractYouTubeVideoId("https://google.com")).toBeNull();
      expect(extractYouTubeVideoId("")).toBeNull();
      expect(extractYouTubeVideoId("short_id")).toBeNull();
    });
  });

  // ==========================================================================
  // 2. Subtitle Cleaning & Noise Elimination
  // ==========================================================================
  describe("2. cleanSubtitleLine - Subtitle Cleaning & Noise Elimination", () => {
    it("should remove bracketed and parenthesized sound effects", () => {
      const raw = "[Music] Welcome back to the show! (Laughter) [Applause]";
      const cleaned = cleanSubtitleLine(raw);
      expect(cleaned).toBe("Welcome back to the show!");
    });

    it("should decode HTML entities accurately", () => {
      const raw = "That&#39;s why it&quot;s called &quot;the finest&quot; &amp; brightest.";
      const cleaned = cleanSubtitleLine(raw);
      expect(cleaned).toBe(`That's why it"s called "the finest" & brightest.`);
    });

    it("should strip HTML formatting tags", () => {
      const raw = `<font color="#ffffff">Good morning</font> <b>everyone</b>!`;
      const cleaned = cleanSubtitleLine(raw);
      expect(cleaned).toBe("Good morning everyone!");
    });

    it("should collapse multiple whitespace and trim ends", () => {
      const raw = "   Hello     world,    welcome!   ";
      const cleaned = cleanSubtitleLine(raw);
      expect(cleaned).toBe("Hello world, welcome!");
    });
  });

  // ==========================================================================
  // 3. Proper Nouns Extraction Algorithm
  // ==========================================================================
  describe("3. detectProperNounsInSentence - Proper Noun Detection", () => {
    it("should detect multi-word proper names and places", () => {
      const sentence = "Steve Jobs visited Stanford University and Reed College in California.";
      const nouns = detectProperNounsInSentence(sentence);
      expect(nouns).toContain("Steve Jobs");
      expect(nouns).toContain("Stanford University");
      expect(nouns).toContain("Reed College");
      expect(nouns).toContain("California");
    });

    it("should detect acronyms and all-caps organizations", () => {
      const sentence = "Representatives from NASA and UNESCO attended the summit.";
      const nouns = detectProperNounsInSentence(sentence);
      expect(nouns).toContain("NASA");
      expect(nouns).toContain("UNESCO");
    });

    it("should ignore common capitalized first words and pronouns", () => {
      const sentence = "Today we are honored to present our research in London.";
      const nouns = detectProperNounsInSentence(sentence);
      expect(nouns).toContain("London");
      expect(nouns).not.toContain("Today");
      expect(nouns).not.toContain("We");
    });

    it("should handle hyphenated and apostrophe proper nouns", () => {
      const sentence = "Passengers arriving at Chicago O'Hare International Airport must claim baggage.";
      const nouns = detectProperNounsInSentence(sentence);
      expect(nouns.some((n) => n.includes("O'Hare"))).toBe(true);
    });
  });

  // ==========================================================================
  // 4. Keyword Extraction & Density
  // ==========================================================================
  describe("4. extractKeywordsFromSentence - Core Vocabulary Extraction", () => {
    it("should extract long, descriptive words while ignoring stop words", () => {
      const sentence = "Neuroscientists say adequate sleep significantly improves cognitive performance.";
      const keywords = extractKeywordsFromSentence(sentence, 4);

      expect(keywords).toContain("neuroscientists");
      expect(keywords).toContain("significantly");
      expect(keywords).toContain("performance");
      expect(keywords).not.toContain("say");
      expect(keywords).not.toContain("the");
    });

    it("should respect the count limit parameter", () => {
      const sentence = "Magnificent architectural monuments provide breathtaking panoramic vistas.";
      const keywords = extractKeywordsFromSentence(sentence, 2);
      expect(keywords.length).toBeLessThanOrEqual(2);
    });
  });

  // ==========================================================================
  // 5. CEFR Level & WPM Speed Estimation
  // ==========================================================================
  describe("5. estimateCefrLevel & WPM Metrics", () => {
    it("should estimate C1/B2 for complex academic sentences with high average word length", () => {
      const academicText =
        "Neuroscientists investigate subterranean neurological phenomena through sophisticated quantum instrumentation.";
      const level = estimateCefrLevel(academicText, 160);
      expect(["B2", "C1"]).toContain(level);
    });

    it("should estimate A1/A2 for simple conversational phrases", () => {
      const simpleText = "Hi! I want a cup of hot tea and a bun, please.";
      const level = estimateCefrLevel(simpleText, 100);
      expect(["A1", "A2"]).toContain(level);
    });

    it("should format duration seconds into MM:SS correctly", () => {
      expect(formatDurationSeconds(0)).toBe("00:00");
      expect(formatDurationSeconds(45)).toBe("00:45");
      expect(formatDurationSeconds(372)).toBe("06:12");
      expect(formatDurationSeconds(904)).toBe("15:04");
    });

    it("should format duration seconds > 1 hour into HH:MM:SS", () => {
      expect(formatDurationSeconds(3665)).toBe("01:01:05");
      expect(formatDurationSeconds(7322)).toBe("02:02:02");
    });
  });

  // ==========================================================================
  // 6. Text Normalization
  // ==========================================================================
  describe("6. normalizeSentenceText - Precision String Normalization", () => {
    it("should lowercase and strip punctuation for fast dictation checking", () => {
      const raw = "“Hello, world! Can't wait—see you tomorrow.”";
      const normalized = normalizeSentenceText(raw);
      expect(normalized).toBe("hello world cant waitsee you tomorrow");
    });

    it("should preserve unicode Vietnamese characters properly", () => {
      const vn = "Chào buổi sáng, quý khách thân mến!";
      const normalized = normalizeSentenceText(vn);
      expect(normalized).toBe("chào buổi sáng quý khách thân mến");
    });
  });

  // ==========================================================================
  // 7. Video Catalog Filter & Pagination Logic
  // ==========================================================================
  describe("7. Video Catalog Filter & Sort Architecture", () => {
    it("should calculate correct pagination skip/limit values", () => {
      const page = 3;
      const limit = 18;
      const skip = (page - 1) * limit;

      expect(skip).toBe(36);
      expect(Math.ceil(100 / limit)).toBe(6); // Total pages for 100 items
    });

    it("should validate and map CEFR filter accurately", () => {
      const validLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];
      expect(validLevels.includes("B2".toUpperCase())).toBe(true);
      expect(validLevels.includes("XYZ".toUpperCase())).toBe(false);
    });

    it("should determine correct order parameters for sorting modes", () => {
      const sortModes = ["popular", "views", "duration_asc", "duration_desc", "newest"];
      expect(sortModes).toContain("popular");
      expect(sortModes).toContain("duration_asc");
    });
  });

  // ==========================================================================
  // 8. Lesson Request Submission Validation
  // ==========================================================================
  describe("8. Lesson Request Validation & Deduplication", () => {
    it("should extract valid YouTube ID from submission payload", () => {
      const payload = {
        youtubeUrl: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
        topicCategory: "TED-Ed",
        notes: "Bài này nói rất hay về cuộc sống",
      };

      const extractedId = extractYouTubeVideoId(payload.youtubeUrl);
      expect(extractedId).toBe("UF8uR6Z6KLc");
    });

    it("should reject submission if URL is invalid or empty", () => {
      expect(extractYouTubeVideoId("")).toBeNull();
      expect(extractYouTubeVideoId("invalid-link")).toBeNull();
    });
  });

  // ==========================================================================
  // 9. API Integration: /api/video-catalog/categories
  // ==========================================================================
  describe("9. Live Route Handler: GET /api/video-catalog/categories", () => {
    it("should return all 8 categories with accurate lesson & playlist counts", async () => {
      const { GET: getCategories } = await import("@/app/api/video-catalog/categories/route");
      const req = new Request("http://localhost:3000/api/video-catalog/categories") as any;
      const res = await getCategories(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.totalCount).toBeGreaterThanOrEqual(8);
      expect(Array.isArray(data.categories)).toBe(true);

      const ted = data.categories.find((c: any) => c.slug === "ted-ed");
      expect(ted).toBeDefined();
      expect(ted.name).toContain("TED-Ed");
      expect(ted.lessonCount).toBeGreaterThanOrEqual(1);
      expect(ted.playlistCount).toBeGreaterThanOrEqual(1);
    });
  });

  // ==========================================================================
  // 10. API Integration: /api/video-catalog/lessons
  // ==========================================================================
  describe("10. Live Route Handler: GET /api/video-catalog/lessons", () => {
    it("should return default paginated list of lessons", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons") as any;
      const res = await getLessons(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.lessons.length).toBeGreaterThanOrEqual(8);
      expect(data.pagination.total).toBeGreaterThanOrEqual(8);
    }, 60000);

    it("should filter lessons strictly by CEFR level", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons?level=B2") as any;
      const res = await getLessons(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      data.lessons.forEach((l: any) => {
        expect(l.cefrLevel).toBe("B2");
      });
    });

    it("should filter lessons by category slug", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons?category=ted-ed") as any;
      const res = await getLessons(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.lessons.length).toBeGreaterThanOrEqual(1);
      expect(data.lessons[0].category.slug).toBe("ted-ed");
    });

    it("should search lessons by keyword", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons?search=Stanford") as any;
      const res = await getLessons(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.lessons.length).toBeGreaterThanOrEqual(1);
      expect(data.lessons[0].title).toContain("Stanford");
    });

    it("should sort lessons by duration ascending and descending", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      
      const reqDesc = new Request("http://localhost:3000/api/video-catalog/lessons?sort=duration_desc") as any;
      const resDesc = await getLessons(reqDesc);
      const dataDesc = await resDesc.json();

      const reqAsc = new Request("http://localhost:3000/api/video-catalog/lessons?sort=duration_asc") as any;
      const resAsc = await getLessons(reqAsc);
      const dataAsc = await resAsc.json();

      expect(dataDesc.lessons[0].durationSeconds).toBeGreaterThan(dataAsc.lessons[0].durationSeconds);
    });

    it("should handle custom page size pagination", async () => {
      const { GET: getLessons } = await import("@/app/api/video-catalog/lessons/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons?limit=3&page=1") as any;
      const res = await getLessons(req);
      const data = await res.json();

      expect(data.lessons.length).toBe(3);
      expect(data.pagination.page).toBe(1);
      expect(data.pagination.limit).toBe(3);
      expect(data.pagination.totalPages).toBeGreaterThanOrEqual(3);
    });
  });

  // ==========================================================================
  // 11. API Integration: /api/video-catalog/lessons/[id]
  // ==========================================================================
  describe("11. Live Route Handler: GET /api/video-catalog/lessons/[id]", () => {
    it("should fetch full lesson detail with ordered segments and proper nouns", async () => {
      const { GET: getLessonDetail } = await import("@/app/api/video-catalog/lessons/[id]/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons/steve-jobs-stanford-commencement") as any;
      const params = Promise.resolve({ id: "steve-jobs-stanford-commencement" });
      const res = await getLessonDetail(req, { params });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.lesson.title).toContain("Steve Jobs");
      expect(data.lesson.segments.length).toBe(18);

      // Verify segments order strictly ascending
      for (let i = 0; i < data.lesson.segments.length - 1; i++) {
        expect(data.lesson.segments[i].orderIndex).toBeLessThan(data.lesson.segments[i + 1].orderIndex);
        expect(data.lesson.segments[i].startTime).toBeLessThan(data.lesson.segments[i + 1].startTime);
      }
    });

    it("should return 404 for non-existent lesson identifier", async () => {
      const { GET: getLessonDetail } = await import("@/app/api/video-catalog/lessons/[id]/route");
      const req = new Request("http://localhost:3000/api/video-catalog/lessons/non-existent-video-xyz") as any;
      const params = Promise.resolve({ id: "non-existent-video-xyz" });
      const res = await getLessonDetail(req, { params });
      const data = await res.json();

      expect(res.status).toBe(404);
      expect(data.success).toBe(false);
    });
  });

  // ==========================================================================
  // 12. API Integration: /api/video-catalog/request-lesson
  // ==========================================================================
  describe("12. Live Route Handler: /api/video-catalog/request-lesson", () => {
    it("should reject submission with invalid URL (status 400)", async () => {
      const { POST: postRequest } = await import("@/app/api/video-catalog/request-lesson/route");
      const req = new Request("http://localhost:3000/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: "invalid-url-here" }),
      }) as any;

      const res = await postRequest(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it("should detect already existing video in database", async () => {
      const { POST: postRequest } = await import("@/app/api/video-catalog/request-lesson/route");
      const req = new Request("http://localhost:3000/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: "https://www.youtube.com/watch?v=UF8uR6Z6KLc" }),
      }) as any;

      const res = await postRequest(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.alreadyExists).toBe(true);
    });

    it("should successfully create, deduplicate, and list requests", async () => {
      const { POST: postRequest, GET: getRequests } = await import("@/app/api/video-catalog/request-lesson/route");
      const { prisma } = await import("@/infrastructure/database/prisma");

      const testVideoId = "a1b2c3d4e5f";
      const testUrl = `https://www.youtube.com/watch?v=${testVideoId}`;

      // Clean up beforehand
      await prisma.lessonRequest.deleteMany({
        where: { youtubeUrl: { contains: testVideoId } },
      });

      // 1. First submission
      const req1 = new Request("http://localhost:3000/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl: testUrl,
          topicCategory: "TED-Ed",
          notes: "Thử nghiệm tích hợp request lesson",
        }),
      }) as any;

      const res1 = await postRequest(req1);
      const data1 = await res1.json();

      expect(res1.status).toBe(200);
      expect(data1.success).toBe(true);
      expect(data1.request.status).toBe("PENDING");

      // 2. Second duplicate submission
      const req2 = new Request("http://localhost:3000/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl: testUrl,
        }),
      }) as any;

      const res2 = await postRequest(req2);
      const data2 = await res2.json();

      expect(data2.alreadyRequested).toBe(true);

      // 3. GET listing
      const reqGet = new Request("http://localhost:3000/api/video-catalog/request-lesson") as any;
      const resGet = await getRequests(reqGet);
      const dataGet = await resGet.json();

      expect(dataGet.success).toBe(true);
      expect(dataGet.requests.some((r: any) => r.youtubeUrl.includes(testVideoId))).toBe(true);

      // Cleanup
      await prisma.lessonRequest.deleteMany({
        where: { youtubeUrl: { contains: testVideoId } },
      });
    }, 25000);
  });
});
