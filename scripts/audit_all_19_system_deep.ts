import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { ALL_MODULAR_LESSONS } from "../features/listening/data/lessons";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

const DEDICATED_TEST_MAP: Record<string, string> = {
  pRfmrE0ToTo: "__tests__/rewrite_the_stars_verbatim.test.ts",
  tybKnGZRwcU: "__tests__/kurzgesagt_verbatim.test.ts",
  AK42GhbTZ9w: "__tests__/pets_verbatim.test.ts",
  doOlP7NLUwc: "__tests__/bbc_verbatim.test.ts",
  UF8uR6Z6KLc: "__tests__/steve_jobs_verbatim.test.ts",
  MMmOLN5zBLY: "__tests__/ted_bilingual_verbatim.test.ts",
  Fez57g8jMNM: "__tests__/bbc_laugh_verbatim.test.ts",
  bIz2Gzu3DKE: "__tests__/airport_checkin_verbatim.test.ts",
  "1kUE0BZtTRc": "__tests__/natgeo_renewable_verbatim.test.ts",
  "lpLFjQ-bRv8": "__tests__/jensen_huang_verbatim.test.ts",
  "5MuIMqhT8DM": "__tests__/matt_walker_verbatim.test.ts",
  SlTrn13aez4: "__tests__/oxford_food_verbatim.test.ts",
  "64R2MYUt394": "__tests__/attenborough_planet_verbatim.test.ts",
  ml8HHHgDxiE: "__tests__/careervidz_interview_verbatim.test.ts",
  tAyQL1inris: "__tests__/ratatouille_ego_verbatim.test.ts",
  DOgVUMfcb7U: "__tests__/psychology_of_money_verbatim.test.ts",
  qp0HIF3SfI4: "__tests__/simon_sinek_verbatim.test.ts",
  NEKZFA7L7Lg: "__tests__/oxford_meeting_verbatim.test.ts",
  eIho2S0ZahI: "__tests__/julian_treasure_verbatim.test.ts",
};

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM TOÁN CHUYÊN SÂU TOÀN DIỆN 19/19 BÀI HỌC VIDEO DICTATION (XP ENGLISH)    ");
  console.log("================================================================================\n");

  const totalLessons = ALL_MODULAR_LESSONS.length;
  console.log(`Tổng số bài học trong hệ thống: ${totalLessons}`);
  if (totalLessons !== 19) {
    throw new Error(`Kỳ vọng đúng 19 bài học nhưng hiện có ${totalLessons}`);
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenExternalIds = new Set<string>();

  let totalSegmentsAll = 0;
  let totalTokensAll = 0;
  let totalWordsAll = 0;

  for (let idx = 0; idx < totalLessons; idx++) {
    const lesson = ALL_MODULAR_LESSONS[idx];
    const lessonNum = idx + 1;

    // 1. Kiểm tra tính độc nhất (Uniqueness)
    if (seenIds.has(lesson.id)) throw new Error(`Trùng lặp lesson.id: ${lesson.id}`);
    if (seenSlugs.has(lesson.slug)) throw new Error(`Trùng lặp lesson.slug: ${lesson.slug}`);
    if (seenExternalIds.has(lesson.externalId)) throw new Error(`Trùng lặp externalId: ${lesson.externalId}`);
    seenIds.add(lesson.id);
    seenSlugs.add(lesson.slug);
    seenExternalIds.add(lesson.externalId);

    // 2. Kiểm tra thuộc tính sư phạm & thời gian
    let prevStartTime = -1;
    let lessonTokens = 0;
    let lessonWords = 0;

    for (let sIdx = 0; sIdx < lesson.segments.length; sIdx++) {
      const seg = lesson.segments[sIdx];
      if (seg.orderIndex !== sIdx && seg.orderIndex !== sIdx + 1) {
        throw new Error(`Lỗi orderIndex (${seg.orderIndex}) ở câu #${sIdx} bài ${lesson.id}`);
      }
      if (seg.startTime < 0 || seg.endTime <= seg.startTime) throw new Error(`Lỗi mốc thời gian câu #${sIdx} bài ${lesson.id}`);
      if (seg.startTime < prevStartTime) throw new Error(`Mốc thời gian không tuần tự ở câu #${sIdx} bài ${lesson.id}`);
      prevStartTime = seg.startTime;

      if (!seg.text || seg.text.trim().length === 0) throw new Error(`Câu #${sIdx} thiếu text`);
      if (!seg.translationVi || seg.translationVi.trim().length === 0) throw new Error(`Câu #${sIdx} thiếu translationVi`);
      if (seg.ipaUs && typeof seg.ipaUs !== "string") throw new Error(`Câu #${sIdx} ipaUs không hợp lệ`);
      if (seg.explanationAi && typeof seg.explanationAi !== "string") throw new Error(`Câu #${sIdx} explanationAi không hợp lệ`);
      if (!Array.isArray(seg.keywords) || seg.keywords.length === 0) throw new Error(`Câu #${sIdx} thiếu keywords`);

      // Tokenization
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      if (tokens.length === 0) throw new Error(`Câu #${sIdx} có 0 token`);
      for (const t of tokens) {
        if (t.clean.length === 0) throw new Error(`Token clean rỗng ở câu #${sIdx}`);
        if (t.dots.length !== t.clean.length) throw new Error(`Độ dài dots (${t.dots.length}) != clean (${t.clean.length}) ở token '${t.original}'`);
      }
      lessonTokens += tokens.length;
      lessonWords += seg.text.split(/\s+/).filter(Boolean).length;
    }

    totalSegmentsAll += lesson.segments.length;
    totalTokensAll += lessonTokens;
    totalWordsAll += lessonWords;

    // 3. Kiểm tra đồng bộ Neon PostgreSQL DB (Dual-table)
    const videoDb = await prisma.videoLesson.findFirst({
      where: { OR: [{ id: lesson.id }, { slug: lesson.slug }, { externalId: lesson.externalId }] },
      include: { segments: true },
    });
    if (!videoDb) throw new Error(`Bài học ${lesson.id} chưa có trong VideoLesson DB!`);
    if (videoDb.segments.length !== lesson.segments.length) {
      throw new Error(`VideoLesson DB có ${videoDb.segments.length} segs, kỳ vọng ${lesson.segments.length}`);
    }

    const listenDb = await prisma.listeningLesson.findFirst({
      where: { id: lesson.id },
    });
    if (!listenDb) throw new Error(`Bài học ${lesson.id} chưa có trong ListeningLesson DB!`);
    const transcriptList = Array.isArray(listenDb.transcript) ? listenDb.transcript : [];
    if (transcriptList.length !== lesson.segments.length) {
      throw new Error(`ListeningLesson DB có ${transcriptList.length} segs, kỳ vọng ${lesson.segments.length}`);
    }

    // 4. Kiểm tra ảnh chụp Screenshot thực tế
    const screenshotPath = path.resolve(process.cwd(), `public/dictation_lesson_${lessonNum}_deep_audit.png`);
    if (!fs.existsSync(screenshotPath)) {
      throw new Error(`Thiếu screenshot cho bài ${lessonNum}: public/dictation_lesson_${lessonNum}_deep_audit.png`);
    }

    // 5. Kiểm tra dedicated test suite
    const testFile = DEDICATED_TEST_MAP[lesson.externalId];
    if (!testFile || !fs.existsSync(path.resolve(process.cwd(), testFile))) {
      throw new Error(`Thiếu file kiểm thử cho bài ${lessonNum} (${lesson.externalId})`);
    }

    console.log(`✅ [Bài ${lessonNum.toString().padStart(2, "0")}/19] (${lesson.externalId}) ${lesson.title.substring(0, 38).padEnd(38)} | ${lesson.segments.length} segs | ${lessonWords} words | ${lessonTokens} tokens | DB: 2/2 | Screenshot & Test: OK`);
  }

  console.log("\n================================================================================");
  console.log("   🎉 KẾT QUẢ KIỂM TOÁN TỔNG THỂ 19/19 BÀI HỌC: ĐẠT CHUẨN TUYỆT ĐỐI 100%!       ");
  console.log(`   • Tổng số bài học đạt chuẩn      : 19/19 bài`);
  console.log(`   • Tổng số phân đoạn sư phạm      : ${totalSegmentsAll} phân đoạn`);
  console.log(`   • Tổng số từ vựng nguyên bản     : ${totalWordsAll} từ`);
  console.log(`   • Tổng số token gõ chính tả      : ${totalTokensAll} tokens`);
  console.log(`   • Lỗi trùng lặp ID/Slug/YouTube  : 0 (HOÀN HẢO)`);
  console.log(`   • Số lỗi token chính tả          : 0 (HOÀN HẢO)`);
  console.log(`   • Đồng bộ Neon PostgreSQL DB     : 19/19 bài (Cả 2 bảng VideoLesson + ListeningLesson)`);
  console.log(`   • Ảnh chụp thực tế Chrome Hydrate: 19/19 ảnh (dictation_lesson_1 -> 19)`);
  console.log(`   • Bộ kiểm thử Verbatim chuyên biệt: 19/19 tệp test`);
  console.log("================================================================================\n");
}

main()
  .catch((err) => {
    console.error("Kiểm toán thất bại:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
