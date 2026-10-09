import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_STEVE_JOBS } from "../features/listening/data/lessons/lesson_steve_jobs";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 5: STEVE JOBS (UF8uR6Z6KLc)   ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_STEVE_JOBS.id}`);
  console.log(`- Slug                : ${LESSON_STEVE_JOBS.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_STEVE_JOBS.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_STEVE_JOBS.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_STEVE_JOBS.durationSeconds}s (${LESSON_STEVE_JOBS.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_STEVE_JOBS.cefrLevel} / ${LESSON_STEVE_JOBS.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_STEVE_JOBS.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_STEVE_JOBS.categoryName} (${LESSON_STEVE_JOBS.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_STEVE_JOBS.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/steve_jobs_official.en-eEY6OEpapPo.json3");
  const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));

  function cleanWords(s: string): string[] {
    return s
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/--/g, " ")
      .replace(/—/g, " ")
      .replace(/['"]+/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  let totalWords = 0;
  let tokenErrors = 0;

  LESSON_STEVE_JOBS.segments.forEach((seg, idx) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalWords += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex + 1} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : /${seg.ipaUs}/`);
    console.log(`  • Phân tích AI Tutor: "${seg.explanationAi}"`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  const officialEvents = sub.events.filter((e: any) => {
    const t = (e.tStartMs || 0) / 1000;
    return t >= 22.0 && t < 173.0 && e.segs;
  });

  const rawOfficialText = officialEvents
    .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
    .join(" ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const officialWords = cleanWords(rawOfficialText);
  const lessonWords: string[] = [];
  LESSON_STEVE_JOBS.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

  console.log(`\n=> Tổng số từ bài học: ${lessonWords.length} từ`);
  console.log(`=> Tổng số từ phụ đề YouTube gốc (t < 173s): ${officialWords.length} từ`);

  let wordDiffs = 0;
  for (let i = 0; i < Math.max(officialWords.length, lessonWords.length); i++) {
    if (officialWords[i] !== lessonWords[i]) {
      wordDiffs++;
      if (wordDiffs <= 10) {
        console.log(`   Khác biệt tại index ${i}: Official="${officialWords[i]}" vs Lesson="${lessonWords[i]}"`);
      }
    }
  }

  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ (khớp ${officialWords.length - wordDiffs}/${officialWords.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_STEVE_JOBS.id },
        { slug: LESSON_STEVE_JOBS.slug },
        { externalId: LESSON_STEVE_JOBS.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/18`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_STEVE_JOBS.segments[idx];
      if (!mockSeg || dbSeg.text !== mockSeg.text) {
        dbMismatches++;
        console.log(`   ❌ Khác biệt ở câu #${idx + 1}: DB="${dbSeg.text}" vs Mock="${mockSeg?.text}"`);
      }
    });
    console.log(`   => Số phân đoạn sai lệch giữa DB và Mock: ${dbMismatches}`);
  } else {
    console.log("❌ VideoLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
  }

  const dbListening = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_STEVE_JOBS.id },
        { audioUrl: { contains: LESSON_STEVE_JOBS.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/18 câu`);
  } else {
    console.log("❌ ListeningLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
  }

  console.log("\n================================================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi khi kiểm thử:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
