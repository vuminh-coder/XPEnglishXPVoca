import { describe, it } from "vitest";
import { ALL_MODULAR_MOVIE_LESSONS } from "../features/listening/data/topics";
import { ALL_MODULAR_LESSONS } from "../features/listening/data/lessons";
import { MOCK_VIDEO_CATEGORIES } from "../features/listening/data/categories";

describe("Audit All Listening Lessons Status", () => {
  it("Audits all movie lessons and non-movie lessons", () => {
    console.log(`\n======================================================`);
    console.log(`🎬 1. KHO BÀI HỌC ĐIỆN ẢNH (ALL_MODULAR_MOVIE_LESSONS):`);
    console.log(`Tổng số video điện ảnh: ${ALL_MODULAR_MOVIE_LESSONS.length}`);
    const movieCats: Record<string, number> = {};
    ALL_MODULAR_MOVIE_LESSONS.forEach(l => {
      movieCats[l.categoryId] = (movieCats[l.categoryId] || 0) + 1;
    });
    console.table(movieCats);

    console.log(`\n======================================================`);
    console.log(`📚 2. KHO BÀI HỌC KIẾN THỨC / ĐỜI SỐNG (ALL_MODULAR_LESSONS):`);
    console.log(`Tổng số bài học non-movie: ${ALL_MODULAR_LESSONS.length}`);
    
    // Group non-movie lessons by categoryId
    const nonMovieCats: Record<string, any[]> = {};
    ALL_MODULAR_LESSONS.forEach(l => {
      const cat = l.categoryId || "MISSING_CATEGORY";
      if (!nonMovieCats[cat]) nonMovieCats[cat] = [];
      nonMovieCats[cat].push({
        id: l.id,
        title: l.title,
        duration: l.durationSeconds,
        durationFormatted: l.durationFormatted,
        segments: l.segments?.length || 0,
        quizzes: l.quiz?.questions?.length || 0,
        externalId: l.externalId
      });
    });

    Object.entries(nonMovieCats).forEach(([cat, list]) => {
      console.log(`\n--- Danh mục: ${cat} (${list.length} bài) ---`);
      list.forEach(item => {
        const isMasterStandard = item.segments >= 30 && item.quizzes >= 8 && item.duration >= 180;
        const statusBadge = isMasterStandard ? "✅ ĐẠT CHUẨN MASTER" : "⚠️ CẦN NÂNG CẤP (Bản ngắn/stub)";
        console.log(`  * [${item.id}] "${item.title}" (${item.durationFormatted} / ${item.duration}s | ${item.segments} segs | ${item.quizzes} quiz) [${item.externalId}] -> ${statusBadge}`);
      });
    });

    console.log(`\n======================================================`);
    console.log(`📑 3. DANH SÁCH DANH MỤC TRONG CATEGORIES.TS:`);
    MOCK_VIDEO_CATEGORIES.forEach(c => {
      console.log(`- [${c.id}] ${c.name}: Định mức ${c.lessonsCount} bài`);
    });
  });
});
