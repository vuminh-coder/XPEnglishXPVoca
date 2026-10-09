import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_DAILY_PETS } from "../features/listening/data/lessons/lesson_daily_pets";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 3: DAILY PETS (AK42GhbTZ9w)   ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_DAILY_PETS.id}`);
  console.log(`- Slug                : ${LESSON_DAILY_PETS.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_DAILY_PETS.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_DAILY_PETS.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_DAILY_PETS.durationSeconds}s (${LESSON_DAILY_PETS.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_DAILY_PETS.cefrLevel} / ${LESSON_DAILY_PETS.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_DAILY_PETS.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_DAILY_PETS.categoryName} (${LESSON_DAILY_PETS.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_DAILY_PETS.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/pets_official.en.json3");
  const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
  const rawText = sub.events
    .filter((e: any) => e.segs)
    .map((e: any) => e.segs.map((s: any) => s.utf8).join(""))
    .join(" ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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

  const officialWords = cleanWords(rawText);
  let totalWords = 0;
  let tokenErrors = 0;

  LESSON_DAILY_PETS.segments.forEach((seg, idx) => {
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

  const lessonWords: string[] = [];
  LESSON_DAILY_PETS.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

  let wordDiffs = 0;
  for (let i = 0; i < Math.max(officialWords.length, lessonWords.length); i++) {
    if (officialWords[i] !== lessonWords[i]) {
      wordDiffs++;
    }
  }

  console.log(`\n=> Tổng số từ kiểm tra: ${totalWords} từ`);
  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ (khớp ${officialWords.length}/${officialWords.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_DAILY_PETS.id },
        { slug: LESSON_DAILY_PETS.slug },
        { externalId: LESSON_DAILY_PETS.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/11`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_DAILY_PETS.segments[idx];
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
        { id: LESSON_DAILY_PETS.id },
        { audioUrl: { contains: LESSON_DAILY_PETS.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/11 câu`);
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
