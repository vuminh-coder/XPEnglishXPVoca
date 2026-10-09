import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_BBC_WHY_WE_LAUGH } from "../features/listening/data/lessons/lesson_bbc_why_we_laugh";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 7: BBC WHY LAUGHTER (Fez57g8jMNM)       ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_BBC_WHY_WE_LAUGH.id}`);
  console.log(`- Slug                : ${LESSON_BBC_WHY_WE_LAUGH.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_BBC_WHY_WE_LAUGH.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_BBC_WHY_WE_LAUGH.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_BBC_WHY_WE_LAUGH.durationSeconds}s (${LESSON_BBC_WHY_WE_LAUGH.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_BBC_WHY_WE_LAUGH.cefrLevel} / ${LESSON_BBC_WHY_WE_LAUGH.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_BBC_WHY_WE_LAUGH.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_BBC_WHY_WE_LAUGH.categoryName} (${LESSON_BBC_WHY_WE_LAUGH.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_BBC_WHY_WE_LAUGH.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/bbc_laughter_medicine.en-GB.json3");
  const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));

  function cleanWords(s: string): string[] {
    return s
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/--/g, " ")
      .replace(/—/g, " ")
      .replace(/['"]+/g, "")
      .replace(/[?¿!,.:;]+/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  let totalWords = 0;
  let tokenErrors = 0;

  LESSON_BBC_WHY_WE_LAUGH.segments.forEach((seg, idx) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalWords += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex + 1} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : /${seg.ipaUs}/`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  const eventsInRange = sub.events.slice(0, 59);
  const rawOfficialText = eventsInRange
    .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
    .join(" ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const officialWords = cleanWords(rawOfficialText);
  const lessonWords: string[] = [];
  LESSON_BBC_WHY_WE_LAUGH.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

  console.log(`\n=> Tổng số từ bài học: ${lessonWords.length} từ`);
  console.log(`=> Tổng số từ phụ đề YouTube gốc (Events 0..58): ${officialWords.length} từ`);

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
        { id: LESSON_BBC_WHY_WE_LAUGH.id },
        { slug: LESSON_BBC_WHY_WE_LAUGH.slug },
        { externalId: LESSON_BBC_WHY_WE_LAUGH.externalId },
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
      const mockSeg = LESSON_BBC_WHY_WE_LAUGH.segments[idx];
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
        { id: LESSON_BBC_WHY_WE_LAUGH.id },
        { audioUrl: { contains: LESSON_BBC_WHY_WE_LAUGH.externalId } },
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
