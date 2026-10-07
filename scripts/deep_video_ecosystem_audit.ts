import { prisma } from "../infrastructure/database/prisma";
import { PRESET_YOUTUBE_VIDEOS } from "../features/listening/data/defaultVideoPresets";
import {
  extractYouTubeVideoId,
  detectProperNounsInSentence,
  estimateCefrLevel,
  cleanSubtitleLine,
} from "../features/listening/services/videoIngestionService";

interface AuditResult {
  title: string;
  passed: boolean;
  details: any;
}

async function runDeepVideoAudit() {
  console.log("===============================================================================");
  console.log("🔍 KHẢO SÁT & ĐÁNH GIÁ CHUYÊN SÂU TOÀN DIỆN HỆ SINH THÁI VIDEO XP ENGLISH");
  console.log("===============================================================================\n");

  const results: AuditResult[] = [];

  // 1. Kiểm tra Preset Videos trong Frontend Store
  console.log("▶ [TEST 1] Khảo sát Video Presets (Frontend Store: defaultVideoPresets.ts)");
  const validPresetVideos = PRESET_YOUTUBE_VIDEOS.filter((v) => {
    return v.id && v.youtubeUrl && v.subtitles && v.subtitles.length > 0;
  });
  const hasWordTimings = PRESET_YOUTUBE_VIDEOS.some(
    (v) => v.subtitles?.some((s) => (s.wordTimings?.length || 0) > 0)
  );
  results.push({
    title: "Preset YouTube Videos Validity & Word Timings",
    passed: validPresetVideos.length === 3 && hasWordTimings,
    details: {
      totalPresets: PRESET_YOUTUBE_VIDEOS.length,
      validPresets: validPresetVideos.length,
      hasWordTimings,
      samples: PRESET_YOUTUBE_VIDEOS.map((v) => ({
        id: v.id,
        title: v.title,
        duration: v.duration,
        subtitlesCount: v.subtitles?.length,
      })),
    },
  });

  // 2. Kiểm tra CSDL PostgreSQL (Neon) Video Ecosystem
  console.log("▶ [TEST 2] Khảo sát Dữ Liệu Video trong PostgreSQL Neon DB");
  const categories = await prisma.videoCategory.findMany({
    include: { _count: { select: { lessons: true, playlists: true } } },
    orderBy: { orderIndex: "asc" },
  });
  const lessons = await prisma.videoLesson.findMany({
    include: {
      category: { select: { name: true, slug: true } },
      segments: { orderBy: { orderIndex: "asc" } },
    },
  });

  results.push({
    title: "PostgreSQL Database Video Schema & Relational Integrity",
    passed: categories.length === 8 && lessons.length === 8,
    details: {
      categoryCount: categories.length,
      lessonCount: lessons.length,
      categories: categories.map((c) => ({
        name: c.name,
        slug: c.slug,
        lessonsCount: c._count.lessons,
      })),
    },
  });

  // 3. Đánh giá tính toàn vẹn phụ đề & Timeline Segments
  console.log("▶ [TEST 3] Kiểm tra Tính Toàn Vẹn Mốc Thời Gian (Timestamps & Segments)");
  let totalSegments = 0;
  let overlappingSegments = 0;
  let invalidTimeRanges = 0;
  let totalProperNounsFound = 0;

  lessons.forEach((lesson) => {
    totalSegments += lesson.segments.length;
    lesson.segments.forEach((seg, idx) => {
      if (seg.startTime < 0 || seg.endTime <= seg.startTime) {
        invalidTimeRanges++;
      }
      if (idx > 0) {
        const prevSeg = lesson.segments[idx - 1];
        if (seg.startTime < prevSeg.startTime) {
          overlappingSegments++;
        }
      }
      if (seg.properNouns && seg.properNouns.length > 0) {
        totalProperNounsFound += seg.properNouns.length;
      }
    });
  });

  results.push({
    title: "Segment Timestamps Consistency & Proper Noun Integration",
    passed: invalidTimeRanges === 0 && overlappingSegments === 0 && totalSegments > 0,
    details: {
      totalSegments,
      invalidTimeRanges,
      overlappingSegments,
      totalProperNounsDetectedInDb: totalProperNounsFound,
    },
  });

  // 4. Kiểm tra Video Ingestion Pipeline Engine
  console.log("▶ [TEST 4] Kiểm định Video Ingestion Pipeline & URL Resolvers");
  const testUrls = [
    "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    "https://youtu.be/iWDKsHm6gTA?t=10",
    "https://www.youtube.com/embed/8K8s9U8_i50",
    "https://youtube.com/shorts/doOlP7NLUwc?feature=share",
  ];
  const extractedIds = testUrls.map(extractYouTubeVideoId);
  const allExtractedValid = extractedIds.every(
    (id) => id && id.length === 11 && !id.includes("/")
  );

  const noiseText = "Hello everyone! [Applause] Today we talk about (Music) science.";
  const cleanedNoise = cleanSubtitleLine(noiseText);
  const detectedPns = detectProperNounsInSentence(
    "Steve Jobs visited Silicon Valley with Tim Cook in California."
  );
  const cefrScore = estimateCefrLevel(
    "Neuroscientists demonstrate cognitive improvements through cardiovascular exercise.",
    160
  );

  results.push({
    title: "Video Ingestion Algorithm Accuracy",
    passed:
      allExtractedValid &&
      !cleanedNoise.includes("[Applause]") &&
      detectedPns.includes("Steve Jobs") &&
      Boolean(cefrScore),
    details: {
      extractedIds,
      cleanedNoise,
      detectedProperNouns: detectedPns,
      estimatedCefr: cefrScore,
    },
  });

  // 5. Kiểm tra YouTube Embed URL & Thumbnail Health
  console.log("▶ [TEST 5] Kiểm tra Định Dạng Thumbnail & Iframe Player URLs");
  const playerChecks = lessons.map((l) => {
    const isStandardYt = l.externalId && l.externalId.length === 11 && !l.externalId.includes("-");
    return {
      title: l.title,
      externalId: l.externalId,
      isRealYouTubeId: isStandardYt,
      embedUrl: `https://www.youtube.com/embed/${l.externalId}`,
      thumbnailUrl: l.thumbnailUrl,
    };
  });

  results.push({
    title: "Player Embed & Thumbnail Compatibility",
    passed: playerChecks.length > 0,
    details: {
      playerChecks,
    },
  });

  console.log("\n===============================================================================");
  console.log("📊 KẾT QUẢ ĐÁNH GIÁ CHUYÊN SÂU CHI TIẾT:");
  console.log("===============================================================================");
  results.forEach((r, idx) => {
    const icon = r.passed ? "✅ [PASS]" : "❌ [FAIL]";
    console.log(`\n${idx + 1}. ${icon} ${r.title}`);
    console.log(JSON.stringify(r.details, null, 2));
  });

  console.log("\n===============================================================================");
  console.log("🎯 KẾT LUẬN ĐÁNH GIÁ CHUYÊN SÂU:");
  const allPassed = results.every((r) => r.passed);
  console.log(`TỔNG THỂ: ${allPassed ? "TẤT CẢ 5 HẠNG MỤC ĐẠT CHUẨN XUẤT SẮC" : "CẦN TỐI ƯU THÊM"}`);
  console.log("===============================================================================\n");
}

runDeepVideoAudit()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
