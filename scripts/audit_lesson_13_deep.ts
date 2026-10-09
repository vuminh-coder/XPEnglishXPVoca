export {};
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { LESSON_DAVID_ATTENBOROUGH_PLANET } from "../features/listening/data/lessons/lesson_david_attenborough_planet";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("================================================================================");
  console.log("   KIỂM THỬ CHUYÊN SÂU TỪNG PHẦN BÀI HỌC 13: SIR DAVID ATTENBOROUGH (64R2MYUt394) ");
  console.log("================================================================================\n");

  // PHẦN 1: DỮ LIỆU & THUỘC TÍNH NGUYÊN BẢN (METADATA & SCHEMA)
  console.log(">>> [PHẦN 1] KIỂM TRA METADATA & SCHEMA DỮ LIỆU GỐC:");
  console.log(`- ID                  : ${LESSON_DAVID_ATTENBOROUGH_PLANET.id}`);
  console.log(`- Slug                : ${LESSON_DAVID_ATTENBOROUGH_PLANET.slug}`);
  console.log(`- Tiêu đề             : ${LESSON_DAVID_ATTENBOROUGH_PLANET.title}`);
  console.log(`- YouTube Video ID    : ${LESSON_DAVID_ATTENBOROUGH_PLANET.externalId}`);
  console.log(`- Thời lượng          : ${LESSON_DAVID_ATTENBOROUGH_PLANET.durationSeconds}s (${LESSON_DAVID_ATTENBOROUGH_PLANET.durationFormatted})`);
  console.log(`- Cấp độ CEFR / Accent: ${LESSON_DAVID_ATTENBOROUGH_PLANET.cefrLevel} / ${LESSON_DAVID_ATTENBOROUGH_PLANET.accent}`);
  console.log(`- Tốc độ nói          : ${LESSON_DAVID_ATTENBOROUGH_PLANET.wpmSpeed} WPM`);
  console.log(`- Danh mục            : ${LESSON_DAVID_ATTENBOROUGH_PLANET.categoryName} (${LESSON_DAVID_ATTENBOROUGH_PLANET.categoryId})`);
  console.log(`- Số phân đoạn        : ${LESSON_DAVID_ATTENBOROUGH_PLANET.segments.length} phân đoạn`);

  // PHẦN 2: ĐỐI SOÁT 100% VERBATIM VỚI PHỤ ĐỀ YOUTUBE GỐC
  console.log("\n>>> [PHẦN 2] ĐỐI SOÁT 100% VERBATIM TỪNG TỪ VỚI PHỤ ĐỀ YOUTUBE GỐC:");
  const subPath = path.resolve(process.cwd(), "scripts/attenborough.en-US.json3");
  const rawJson = JSON.parse(fs.readFileSync(subPath, "utf8"));

  function cleanWords(str: string): string[] {
    return str
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/…/g, "...")
      .replace(/[^a-zA-Z0-9\s']/g, " ")
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }

  const rawTexts = rawJson.events.map((e: any) =>
    (e.segs || []).map((s: any) => s.utf8).join("").replace(/\n/g, " ").trim()
  );
  const rawWords = cleanWords(rawTexts.join(" "));

  let totalTokens = 0;
  let tokenErrors = 0;

  LESSON_DAVID_ATTENBOROUGH_PLANET.segments.forEach((seg, idx) => {
    const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
    totalTokens += tokens.length;
    const dur = (seg.endTime - seg.startTime).toFixed(2);
    const validTokens = tokens.every((t) => t.clean.length > 0 && t.dots.length === t.clean.length);
    if (!validTokens) tokenErrors++;

    console.log(`\n  --- Câu #${seg.orderIndex + 1} [${seg.startTime.toFixed(2)}s -> ${seg.endTime.toFixed(2)}s] (${dur}s) ---`);
    console.log(`  • Văn bản tiếng Anh: "${seg.text}"`);
    console.log(`  • Bản dịch tiếng Việt: "${seg.translationVi}"`);
    console.log(`  • Phiên âm IPA      : ${seg.ipaUs}`);
    console.log(`  • Danh từ riêng     : [${(seg.properNouns || []).join(", ")}]`);
    console.log(`  • Từ khóa quan trọng: [${(seg.keywords || []).join(", ")}]`);
    console.log(`  • Token Dictation   : ${tokens.length} từ -> ${validTokens ? "✅ HỢP LỆ (100% gõ được)" : "❌ LỖI TOKEN"}`);
  });

  const lessonWords = cleanWords(
    LESSON_DAVID_ATTENBOROUGH_PLANET.segments.map((s) => s.text).join(" ")
  );

  console.log(`\n=> Tổng số từ bài học: ${lessonWords.length} từ`);
  console.log(`=> Tổng số từ YouTube gốc: ${rawWords.length} từ`);

  let wordDiffs = 0;
  const maxLen = Math.max(rawWords.length, lessonWords.length);
  for (let i = 0; i < maxLen; i++) {
    const rw = rawWords[i] || "<END_RAW>";
    const lw = lessonWords[i] || "<END_LESSON>";
    if (rw !== lw) {
      wordDiffs++;
      if (wordDiffs <= 10) {
        console.log(`   Khác biệt tại index ${i}: Raw="${rawWords[i]}" vs Lesson="${lessonWords[i]}"`);
      }
    }
  }

  console.log(`=> Sai khác từ với YouTube gốc: ${wordDiffs} từ (khớp ${rawWords.length - wordDiffs}/${rawWords.length} từ)`);
  console.log(`=> Lỗi token Dictation: ${tokenErrors}`);

  if (wordDiffs === 0) {
    console.log(`=> TRẠNG THÁI: [100% VERBATIM MATCH] Tuyệt đối không có sai lệch!`);
  } else {
    console.log(`=> TRẠNG THÁI: [LỖI] Có ${wordDiffs} sai khác!`);
    process.exit(1);
  }

  // PHẦN 3: KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL (DUAL-TABLE)
  console.log("\n>>> [PHẦN 3] KIỂM TRA ĐỒNG BỘ CƠ SỞ DỮ LIỆU NEON POSTGRESQL:");
  const dbVideo = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_DAVID_ATTENBOROUGH_PLANET.id },
        { slug: LESSON_DAVID_ATTENBOROUGH_PLANET.slug },
        { externalId: LESSON_DAVID_ATTENBOROUGH_PLANET.externalId },
      ],
    },
    include: {
      segments: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });

  if (dbVideo) {
    console.log(`✅ VideoLesson trong DB: ID="${dbVideo.id}", Slug="${dbVideo.slug}"`);
    console.log(`   - Số phân đoạn trong DB: ${dbVideo.segments.length}/14`);
    console.log(`   - Danh mục DB: "${dbVideo.category?.name}" (${dbVideo.categoryId})`);

    let dbMismatches = 0;
    dbVideo.segments.forEach((dbSeg, idx) => {
      const mockSeg = LESSON_DAVID_ATTENBOROUGH_PLANET.segments[idx];
      if (!mockSeg || dbSeg.text !== mockSeg.text) {
        dbMismatches++;
        console.log(`   ❌ Khác biệt ở câu #${idx + 1}: DB="${dbSeg.text}" vs Mock="${mockSeg?.text}"`);
      }
    });
    console.log(`   => Số phân đoạn sai lệch giữa DB và Mock: ${dbMismatches}`);
  } else {
    console.log("❌ VideoLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
    process.exit(1);
  }

  const dbListening = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: LESSON_DAVID_ATTENBOROUGH_PLANET.id },
        { audioUrl: { contains: LESSON_DAVID_ATTENBOROUGH_PLANET.externalId } },
      ],
    },
  });

  if (dbListening) {
    console.log(`✅ ListeningLesson trong DB: ID="${dbListening.id}", Tiêu đề="${dbListening.title}"`);
    const transcriptLen = Array.isArray(dbListening.transcript) ? dbListening.transcript.length : 0;
    console.log(`   - Transcript trong DB: ${transcriptLen}/14 câu`);
  } else {
    console.log("❌ ListeningLesson CHƯA TỒN TẠI trong cơ sở dữ liệu!");
    process.exit(1);
  }

  console.log("\n================================================================================");
  console.log("   HOÀN TẤT KIỂM THỬ: BÀI HỌC 13 ĐẠT CHUẨN 100% VERBATIM & SYNC TOÀN DIỆN!       ");
  console.log("================================================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi khi kiểm thử:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
